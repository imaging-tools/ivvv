import math
import numpy
import scipy.ndimage

__all__ = ["img_prep"]


def atlas_dimensions(aics_image, max_edge=2048, channel_names=None, physical_pixel_size=(1.0, 1.0, 1.0)):
    tile_width, tile_height, stack_height = aics_image.shape[1], aics_image.shape[2], aics_image.shape[0]
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
        new_ratio = float(max(adjusted_width, adjusted_height)) / float(min(adjusted_width, adjusted_height))
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
        tile_width = math.floor(max_edge/cols)
        tile_height = math.floor(max_edge/rows)
        atlas_width = tile_width * cols
        atlas_height = tile_height * rows

    dims = {
        "tile_width": int(tile_width),
        "tile_height": int(tile_height),
        "rows": int(rows),
        "cols": int(cols),
        "atlas_width": int(atlas_width),
        "atlas_height": int(atlas_height),
        "width": aics_image.shape[1],
        "height": aics_image.shape[2],
        "channels": aics_image.shape[3],
        "tiles": aics_image.shape[0]
    }

    if channel_names is not None:
        dims["channel_names"] = channel_names
    else:
        dims["channel_names"] = ['CH_'+str(i) for i in range(aics_image.shape[3])]

    if physical_pixel_size is not None:
        dims["pixel_size_x"] = physical_pixel_size[0]
        dims["pixel_size_y"] = physical_pixel_size[1]
        dims["pixel_size_z"] = physical_pixel_size[2]
    else:
        dims["pixel_size_x"] = 1
        dims["pixel_size_y"] = 1
        dims["pixel_size_z"] = 1

    return dims


def _normalize(img):
    """Convert to zero-one"""
    return numpy.divide(img - numpy.min(img), numpy.max(img) - numpy.min(img))


def _resize(img, max_dim=128):
    """Resize (plane, row, column, channel) image
    such that the max size in any dimension is max_dim
    """
    if max(img.shape[:3]) <= max_dim:
        return img
    else:
        new_size = [max_dim / s if s >= max_dim else 1.0 for s in img.shape[:3]]
        new_size.append(1.0)  # for channel
        return scipy.ndimage.zoom(img, new_size)


def img_prep(img, max_dim=128):
    """Given an input n dimensional image, prep for display

    Parameters
    ----------
    img : array
        Numpy array in (plane, row, column, channel) format
    size_lim : int
        largest dimension allowed
    
    Returns
    -------
    img : list of arrays
        one channel to each entry in the list
    """
    # Norm and convert to 8 bit
    img = numpy.multiply(255, _normalize(img)).astype(numpy.uint8)
    #  Resize
    img = _resize(img, max_dim)

    return img
