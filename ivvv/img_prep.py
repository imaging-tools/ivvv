import math
import numpy
import scipy.ndimage
import skimage.transform
import scipy.misc

__all__ = ["img_prep"]


def resize(image, output_shape):
    # YX
    scale = (
        float(output_shape[1]) / float(image.shape[1]),
        float(output_shape[0]) / float(image.shape[2]),
    )

    # ZYX
    response = numpy.zeros((image.shape[0], output_shape[1], output_shape[0]))

    for index, image_plane in enumerate(image):
        response[index] = skimage.transform.rescale(
            image_plane, scale, preserve_range=True
        )
        # response[index] = skimage.transform.resize(
        #     image_plane, output_shape, mode="reflect", anti_aliasing=downsampling
        # )

    return response


def atlas_dimensions(
    aics_image, max_edge=2048, channel_names=None, physical_pixel_size=(1.0, 1.0, 1.0)
):
    # incoming is CZYX
    tile_width, tile_height, stack_height = (
        aics_image.shape[3],
        aics_image.shape[2],
        aics_image.shape[1],
    )
    # maintain aspect ratio of images
    # initialize atlas with one row of all slices
    atlas_width = tile_width * stack_height
    atlas_height = tile_height
    ratio = float(atlas_width) / float(atlas_height)

    # these next steps attempt to optimize the atlas into a square shape
    # TODO - there must be a way to do this with a single calculation
    for r in range(2, stack_height):
        new_rows = math.ceil(float(stack_height) / r)
        adjusted_width = int(tile_width * new_rows)
        adjusted_height = int(tile_height * r)
        new_ratio = float(max(adjusted_width, adjusted_height)) / float(
            min(adjusted_width, adjusted_height)
        )
        if new_ratio < ratio:
            ratio = new_ratio
            atlas_width = adjusted_width
            atlas_height = adjusted_height
        else:
            # we've found the rows and columns that make this the most square image
            break

    cols = int(atlas_width // tile_width)
    rows = int(atlas_height // tile_height)

    if max_edge < atlas_width or max_edge < atlas_height:
        tile_width = math.floor(max_edge / cols)
        tile_height = math.floor(max_edge / rows)
        atlas_width = tile_width * cols
        atlas_height = tile_height * rows

    dims = {
        "tile_width": int(tile_width),
        "tile_height": int(tile_height),
        "rows": int(rows),
        "cols": int(cols),
        "atlas_width": int(atlas_width),
        "atlas_height": int(atlas_height),
        "width": aics_image.shape[3],
        "height": aics_image.shape[2],
        "channels": aics_image.shape[0],
        "tiles": aics_image.shape[1],
    }

    if channel_names is not None:
        dims["channel_names"] = channel_names
    else:
        dims["channel_names"] = ["CH_" + str(i) for i in range(aics_image.shape[0])]

    if physical_pixel_size is not None:
        dims["pixel_size_x"] = physical_pixel_size[0]
        dims["pixel_size_y"] = physical_pixel_size[1]
        dims["pixel_size_z"] = physical_pixel_size[2]
    else:
        dims["pixel_size_x"] = 1
        dims["pixel_size_y"] = 1
        dims["pixel_size_z"] = 1

    return dims


def img_prep(img, shape=(128, 128)):
    """Given an input n dimensional image, prep for display

    Parameters
    ----------
    img : array
        Numpy array in CZYX (channel, plane, row, column) format
    size_lim : int
        largest dimension allowed
    shape : tuple(int)
        This is the volume's preferred xy size for texture atlassing for realtime display
        as computed by atlas_dimemsions

    Returns
    -------
    img : list of arrays
        one channel to each entry in the list
    """

    # C Z Y X
    channels = img.shape[0]

    # C Z Y X
    response = numpy.zeros(
        (channels, img.shape[1], shape[1], shape[0]), dtype=numpy.uint8
    )

    for channel_index in range(channels):
        channel_data = img[channel_index]
        channel_data = channel_data.astype(numpy.float32)

        resized_channel = resize(channel_data, (shape[0], shape[1]))

        mn = min(0, resized_channel.min())
        mx = resized_channel.max()
        resized_channel = 255.0 * (resized_channel - mn) / (mx - mn)
        # atlas = np.interp(atlas, (min(0, atlas.min()), atlas.max()), (0.0, 255.0))
        resized_channel = resized_channel.astype(numpy.uint8)

        response[channel_index] = resized_channel

    return response
