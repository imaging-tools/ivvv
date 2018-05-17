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

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)

    @traitlets.default('layout')
    def _default_layout(self):
        return ipywidgets.Layout(height=self.size[0], width=self.size[1])


def volshow(image, size=(256, 256)):
    volume_widget = VolumeWidget()

    volume_widget.image = ivvv.img_prep.img_prep(image)

    if size:
        volume_widget.size = size

    return volume_widget
