//import "./style.css";

define("ivvv", [
  "@jupyter-widgets/base",
  "@aics/volume-viewer",
  "D:/website-3d-cell-viewer/dist/index.js", //"ac-3d-viewer",
  "react-dom",
  "./style.scss",
  "antd/dist/antd.css",
], function (
  widgets,
  volumeViewerPackage,
  ImageViewerApp,
  ReactDOM,
  stylecss,
  antdcss
) {
  var VolumeWidgetView = widgets.DOMWidgetView.extend({
    render: function () {
      const metadata = this.model.get("metadata");

      const volume = this.model.get("image");

      const size = this.model.get("size");

      const density = this.model.get("density");
      const brightness = this.model.get("brightness");

      const dimensions = this.model.get("dimensions");

      var volsize = volume.shape[1] * volume.shape[2] * volume.shape[3];
      var channels = volume.shape[0];
      var tiles = volume.shape[1]; // slices
      /*
      ReactDOM.render(
        <ImageViewerApp
          baseUrl="https://s3-us-west-2.amazonaws.com/bisque.allencell.org/v1.4.0/Cell-Viewer_Thumbnails"
          cellDownloadHref="https://files.allencell.org/api/2.0/file/download?collection=cellviewer-1-4&id=C40515"
          cellId={40515}
          cellPath="AICS-25/AICS-25_5561_40515"
          defaultSurfacesOn={[]}
          defaultVolumesOn={[0, 1, 2]}
          fovDownloadHref="https://files.allencell.org/api/2.0/file/download?collection=cellviewer-1-4&id=F5561"
          fovPath="AICS-25/AICS-25_5561"
          //keyList={["observed", "segmentation", "contour"]}
          renderConfig={{
            alphaMask: true,
            autoRotateButton: true,
            axisClipSliders: true,
            brightnessSlider: true,
            colorPicker: true,
            colorPresetsDropdown: true,
            densitySlider: true,
            fovCellSwitchControls: true,
            levelsSliders: true,
            saveSurfaceButtons: true,
            viewModeRadioButtons: true,
          }}
        />,
        this.el
      );
      */
      ReactDOM.render(
        React.createElement(
          "div",
          { className: "cell-viewer" },

          React.createElement(
            ImageViewerApp.ImageViewerApp,
            {
              rawData: volume,
              rawDims: dimensions,
              //appHeight: "30vh",
              //   baseUrl:
              //     "https://s3-us-west-2.amazonaws.com/bisque.allencell.org/v1.4.0/Cell-Viewer_Thumbnails",
              //   cellDownloadHref:
              //     "https://files.allencell.org/api/2.0/file/download?collection=cellviewer-1-4&id=C40515",
              //   cellId: 40515,
              //   cellPath: "AICS-25/AICS-25_5561_40515",
              defaultSurfacesOn: [],
              defaultVolumesOn: [0],
              //   fovDownloadHref:
              //     "https://files.allencell.org/api/2.0/file/download?collection=cellviewer-1-4&id=F5561",
              //   fovPath: "AICS-25/AICS-25_5561",
              initialChannelAcc: { Channels: [] },
              keyList: ["Channels"],
              groupToChannelNameMap: {
                Channels: dimensions.channel_names,
              },
              renderConfig: {
                alphaMask: true,
                autoRotateButton: true,
                axisClipSliders: true,
                brightnessSlider: true,
                colorPicker: true,
                colorPresetsDropdown: true,
                densitySlider: true,
                fovCellSwitchControls: false,
                levelsSliders: true,
                saveSurfaceButtons: true,
                viewModeRadioButtons: true,
              },
            },
            null
          )
        ),
        this.el
      );
      /*
      this.context = new volumeViewerPackage.View3d(this.el);

      // PREPARE SOME TEST DATA TO TRY TO DISPLAY A VOLUME.
      let imgdata = dimensions;

      // where volumedata is an array of channels, where each channel is a flat Uint8Array of xyz data
      // according to tile_width*tile_height*tiles (first row of first plane is the first data in
      // the layout, then second row of first plane, etc)

      this.aimg = new volumeViewerPackage.Volume(imgdata, "test");

      this.context.setCameraMode("3D");

      this.context.addVolume(this.aimg);
      // pass the volume data into the image.
      for (var i = 0; i < imgdata.channels; ++i) {
        this.aimg.setChannelDataFromVolume(
          i,
          new Uint8Array(volume.buffer.buffer, i * volsize, volsize)
        );
        this.aimg.channels[i].lutGenerator_percentiles(0.5, 0.998);
      }
      // enable only the first channel
      //   for (var ch = 0; ch < this.aimg.num_channels; ++ch) {
      //     this.context.setVolumeChannelEnabled(this.aimg, ch, ch < 1);
      //   }

      this.context.updateDensity(this.aimg, density);
      this.context.updateExposure(brightness);

      // this resize is being delayed so that parent elements have had a chance
      // to reflow and receive their sizing
      setTimeout(() => {
        this.context.resize(this.el, size[0], size[1]);
      }, 100);

      // tell the viewer to update because new data has been added.
      this.context.updateActiveChannels(this.aimg);
      this.context.updateLuts(this.aimg);

      this.update();
      this.listenTo(this.model, "change:density", this._density_changed);
      this.listenTo(this.model, "change:brightness", this._brightness_changed);
      */
    },
    // _density_changed: function () {
    //   //const olddensity = this.model.previous("density");
    //   if (this.context) {
    //     this.context.updateDensity(this.aimg, this.model.get("density"));
    //   }
    // },
    // _brightness_changed: function () {
    //   //const olddensity = this.model.previous("density");
    //   if (this.context) {
    //     this.context.updateExposure(this.model.get("brightness"));
    //   }
    // },
  });

  return {
    VolumeWidgetView: VolumeWidgetView,
  };
});
