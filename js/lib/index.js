//import {AICSview3d, ACISmakeVolumes, AICSvolumeDrawable} from 'volume-viewer';
//require.undef("ivvv");

define("ivvv", ["@jupyter-widgets/base", "volume-viewer"], function(widgets, volumeViewerPackage) {
    var VolumeWidgetView = widgets.DOMWidgetView.extend({
        render: function () {
            const metadata = this.model.get("metadata");

            const volume = this.model.get("image");

            const size = this.model.get("size");

            const dimensions = this.model.get("dimensions");

            var volsize = volume.shape[1]*volume.shape[2]*volume.shape[3];
            var channels = volume.shape[0];
            var tiles = volume.shape[1]; // slices

            debugger;

            let context = new volumeViewerPackage.AICSview3d(this.el);

            // PREPARE SOME TEST DATA TO TRY TO DISPLAY A VOLUME.
            let imgdata = dimensions;
            // let imgdata = {
            //     "width": 256,
            //     "height": 256,
            //     "channels": channels,
            //     "channel_names": ["DRAQ5", "EGFP", "Hoechst 33258", "TL Brightfield", "SEG_STRUCT", "SEG_Memb", "SEG_DNA", "CON_Memb", "CON_DNA"],
            //     "rows": 2,
            //     "cols": 5,
            //     "tiles": tiles,
            //     "tile_width": volume.shape[2],
            //     "tile_height": volume.shape[3],
            //     "atlas_width": 5 * volume.shape[2],
            //     "atlas_height": 2 * volume.shape[3],
            //     "pixel_size_x": 1,
            //     "pixel_size_y": 1,
            //     "pixel_size_z": 1,
            //     // atlas_width === cols*tile_width
            //     // atlas_height === rows*tile_height
            //     // for webgl reasons, it is best for atlas_width and atlas_height to be <= 2048 
            //     // and ideally a power of 2.
            //     // tiles <= rows*cols, tiles is number of z slices
            //     // width := original full size image width
            //     // height := original full size image height

            //     "name": "AICS-10_5_5",
            //     "version": "0.0.0",
            //     "aicsImageVersion": "0.3.0"
            // };

            // where volumedata is an array of channels, where each channel is a flat Uint8Array of xyz data
            // according to tile_width*tile_height*tiles (first row of first plane is the first data in 
            // the layout, then second row of first plane, etc)
            var channelVolumes = [];
            for (var i = 0; i < imgdata.channels; ++i) {
                channelVolumes.push(new Uint8Array(volume.buffer.buffer, i*volsize, volsize));
            }

            imgdata.volumedata = channelVolumes;

            const aimg = new volumeViewerPackage.AICSvolumeDrawable(imgdata, "test");

            context.setCameraMode("3D");

            context.setImage(aimg, () => {console.log("data channel loaded")});

            aimg.setDensity(0.1);
            aimg.setBrightness(1.0);

            setTimeout(() => {
                context.resize(this.el, size[0], size[1]);
            }, 100);
        }
    });

    return {
        VolumeWidgetView: VolumeWidgetView
    }
});
