import traitlets
import traittypes
import ipywidgets


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeView").tag(sync=True)

    _view_module = traitlets.Unicode("volume").tag(sync=True)

    _view_module_version = traitlets.Unicode("1.0.0").tag(sync=True)

    image = traittypes.Array([])

    metadata = traitlets.Dict({"foo": "bar"})


def volread(image):
    volume_widget = VolumeWidget()

    volume_widget.image = image

    return volume_widget
