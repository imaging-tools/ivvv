//import {AICSview3d, ACISmakeVolumes, AICSvolumeDrawable} from 'volume-viewer';
//require.undef("ivvv");

define("ivvv", ["@jupyter-widgets/base", "volume-viewer"], function(widgets, volumeViewerPackage) {
    var VolumeWidgetView = widgets.DOMWidgetView.extend({
        render: function () {
            const metadata = this.model.get("metadata");

            const volume = this.model.get("image");

            var volsize = volume.shape[1]*volume.shape[2]*volume.shape[3];
            var channels = volume.shape[0];
            var tiles = volume.shape[1]; // slices

            debugger;

            let context = new volumeViewerPackage.AICSview3d(this.el);

            // PREPARE SOME TEST DATA TO TRY TO DISPLAY A VOLUME.
            let imgdata = {
                "width": 256,
                "height": 256,
                "channels": channels,
                "channel_names": ["DRAQ5", "EGFP", "Hoechst 33258", "TL Brightfield", "SEG_STRUCT", "SEG_Memb", "SEG_DNA", "CON_Memb", "CON_DNA"],
                "rows": 2,
                "cols": 5,
                "tiles": tiles,
                "tile_width": volume.shape[2],
                "tile_height": volume.shape[3],
                "atlas_width": 5 * volume.shape[2],
                "atlas_height": 2 * volume.shape[3],
                "pixel_size_x": 1,
                "pixel_size_y": 1,
                "pixel_size_z": 1,
                // "images" is now optional and could be replaced with "volumedata"
                // where volumedata is an array of channels, where each channel is a flat Uint8Array of xyz data
                // according to tile_width*tile_height*tiles (first row of first plane is the first data in 
                // the layout, then second row of first plane, etc)
                // atlas_width === cols*tile_width
                // atlas_height === rows*tile_height
                // for webgl reasons, it is best for atlas_width and atlas_height to be <= 2048 
                // and ideally a power of 2.
                // tiles <= rows*cols, tiles is number of z slices
                // width := original full size image width
                // height := original full size image height

                // (an alternate volumedata input format could be "atlasdata" where the data is laid out as
                // a pre-tiled atlas image ready for upload. Arguably this data layout is an implementation-
                // specific detail / optimization that clients don't need to know about)
                "images": [{
                    "name": "AICS-10_5_5.ome.tif_atlas_0.png",
                    "channels": [0, 1, 2]
                }, {
                    "name": "AICS-10_5_5.ome.tif_atlas_1.png",
                    "channels": [3, 4, 5]
                }, {
                    "name": "AICS-10_5_5.ome.tif_atlas_2.png",
                    "channels": [6, 7, 8]
                }],
                "name": "AICS-10_5_5",
                "status": "OK",
                "version": "0.0.0",
                "aicsImageVersion": "0.3.0"
            };

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

            context.setAutoRotate(true);
        }
    });

    return {
        VolumeWidgetView: VolumeWidgetView
    }
});
