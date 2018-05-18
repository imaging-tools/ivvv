import ivvv.img_prep
import ipydatawidgets
import ipywidgets
import numpy
import traitlets


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeWidgetView").tag(sync=True)

    _view_module = traitlets.Unicode("ivvv").tag(sync=True)

    _view_module_version = traitlets.Unicode("1.0.0").tag(sync=True)

    image = ipydatawidgets.NDArray(numpy.zeros(0, dtype=numpy.uint8)).tag(sync=True, **ipydatawidgets.array_serialization)

    size = traitlets.Tuple().tag(sync=True)

    dimensions = traitlets.Dict().tag(sync=True)

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)


def volshow(image, size=(256, 256), spacing=(1.0, 1.0, 1.0)):
    volume_widget = VolumeWidget()

    volume_widget.dimensions = ivvv.img_prep.atlas_dimensions(image, physical_pixel_size=spacing)
    print(image.shape)
    image = ivvv.img_prep.img_prep(image, shape=(volume_widget.dimensions["tile_width"], volume_widget.dimensions["tile_height"]))
    print(image.shape)
    image = image.transpose([0,2,1,3])
    volume_widget.image = [image[:, :, :, index] for index in range(image.shape[-1])]

    if size:
        volume_widget.size = size

    return volume_widget
