import ipydatawidgets
import ipywidgets
import numpy
import traitlets


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeWidgetView").tag(sync=True)

    _view_module = traitlets.Unicode("ivvv").tag(sync=True)

    _view_module_version = traitlets.Unicode("1.0.0").tag(sync=True)

    image = ipydatawidgets.NDArray(numpy.zeros(0)).tag(sync=True, **ipydatawidgets.array_serialization)

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)

    @traitlets.default('layout')
    def _default_layout(self):
        return ipywidgets.Layout(height='300px', width='300px')


def volshow(image):
    volume_widget = VolumeWidget()

    volume_widget.image = image

    return volume_widget
