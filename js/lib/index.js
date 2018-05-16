require.undef("volume");

define("volume", ["@jupyter-widgets/base"], function(widgets) {
    const VolumeWidgetView = widgets.DOMWidgetView.extend({
        render: function () {
            const metadata = this.model.get("metadata");

            const volume = this.model.get("image");

            this.el.textContent = "do stuff on `this.el`";
        }
    });

    return {
        VolumeWidgetView: VolumeWidgetView
    }
});
