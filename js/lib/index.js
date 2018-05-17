import {AICSview3d, ACISmakeVolumes, AICSvolumeDrawable} from 'volume-viewer';
import {DOMWidgetView} from '@jupyter-widgets/base';

require.undef("ivvv");

define("ivvv", ["@jupyter-widgets/base"], function(widgets) {
    const VolumeWidgetView = widgets.DOMWidgetView.extend({
        render: function () {
            const metadata = this.model.get("metadata");

            const volume = this.model.get("image");

            let context = new AICSview3d(this.el);

            context.resize();

            const aimg = new AICSvolumeDrawable({}, "test");

            context.setCameraMode("3D");

            context.setImage(aimg, () => {console.log("")});

            context.setUniform("DENSITY", 0.1, true, true);

            context.setUniform("BRIGHTNESS", 1.0, true, true);
        }
    });

    return {
        VolumeWidgetView: VolumeWidgetView
    }
});
