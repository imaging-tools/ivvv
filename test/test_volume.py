import ivvv.volume


class TestVolume:
    def test_image(self):
        widget = ivvv.volume.Volume()

        assert widget.image.size == 0

    def test_metadata(self):
        widget = ivvv.volume.Volume()

        assert widget.metadata == {"foo": "bar"}
