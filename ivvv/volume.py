import ipydatawidgets
import ipywidgets
from ipywidgets import interact, interactive, fixed, interact_manual
import ivvv.img_prep
import numpy
import traitlets


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeWidgetView").tag(sync=True)

    _view_module = traitlets.Unicode("ivvv").tag(sync=True)

    _view_module_version = traitlets.Unicode("1.0.0").tag(sync=True)

    image = ipydatawidgets.NDArray(numpy.zeros(0, dtype=numpy.uint8)).tag(
        sync=True, **ipydatawidgets.array_serialization
    )

    size = traitlets.Tuple().tag(sync=True)

    dimensions = traitlets.Dict().tag(sync=True)

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)

    density = traitlets.Float(0.1).tag(sync=True)
    brightness = traitlets.Float(0.1).tag(sync=True)


# expect CZYX
def volshow(image, spacing=(1.0, 1.0, 1.0), density=0.1, brightness=1.0):
    volume_widget = VolumeWidget()

    dims_object = ivvv.img_prep.atlas_dimensions(image, physical_pixel_size=spacing)
    # image MUST have a name
    dims_object["name"] = "Image0"
    volume_widget.dimensions = dims_object

    # downsample and normalize for browser rendering
    image = ivvv.img_prep.img_prep(
        image,  # CZYX
        shape=(
            volume_widget.dimensions["tile_width"],
            volume_widget.dimensions["tile_height"],
        ),
    )
    # image = image.transpose([0, 1, 3, 2])

    # pass to javascript as array of ZYX volumes, one per channel
    volume_widget.image = [image[index] for index in range(image.shape[0])]
    return volume_widget
