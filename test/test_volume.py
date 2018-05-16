import ivvv.volume


class TestVolume:
    def test_image(self):
        widget = ivvv.volume.VolumeWidget()

        assert widget.image.size == 0

    def test_metadata(self):
        widget = ivvv.volume.VolumeWidget()

        assert widget.metadata == {"foo": "bar"}
