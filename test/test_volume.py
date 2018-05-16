import numpy

import ivvv.volume


class TestVolume:
    def test_image(self):
        widget = ivvv.volume.VolumeWidget()

        assert widget.image.size == 0

    def test_metadata(self):
        widget = ivvv.volume.VolumeWidget()

        assert widget.metadata == {"foo": "bar"}


def test_volshow():
    image = numpy.random.random((10, 256, 256, 3))

    widget = ivvv.volume.volshow(image)

    numpy.testing.assert_array_equal(widget.image, image)
