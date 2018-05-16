import ipydatawidgets
import ipywidgets
import numpy
import traitlets


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeView").tag(sync=True)

    _view_module = traitlets.Unicode("volume").tag(sync=True)

    _view_module_version = traitlets.Unicode("1.0.0").tag(sync=True)

    image = ipydatawidgets.NDArray(numpy.zeros(0)).tag(sync=True, **ipydatawidgets.array_serialization)

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)


def volshow(image):
    volume_widget = VolumeWidget()

    volume_widget.image = image

    return volume_widget
