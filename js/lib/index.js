// import "./style.css";

define(
    'ivvv',
    [
      '@jupyter-widgets/base',
      '@aics/volume-viewer',
      '/Users/danielt/src/website-3d-cell-viewer/dist/index.js',  //"ac-3d-viewer",
      'react-dom',
      'antd/dist/antd.css',
      './style.scss',
    ],
    function(
        widgets,
        volumeViewerPackage,
        ImageViewerApp,
        ReactDOM,
        antdcss,
        stylecss,
    ) {
      var VolumeWidgetView = widgets.DOMWidgetView.extend({
        render: function() {
          const metadata = this.model.get('metadata');

          const volume = this.model.get('image');

          const size = this.model.get('size');

          const density = this.model.get('density');
          const brightness = this.model.get('brightness');

          const dimensions = this.model.get('dimensions');

          var volsize = volume.shape[1] * volume.shape[2] * volume.shape[3];
          var channels = volume.shape[0];
          var tiles = volume.shape[1];  // slices

          ReactDOM.render(
              React.createElement(
                  'div', {className: 'cell-viewer'},

                  React.createElement(
                      ImageViewerApp.ImageViewerApp, {
                        rawData: volume,
                        rawDims: dimensions,
                        appHeight: '50vh',
                        defaultSurfacesOn: [],
                        defaultVolumesOn: [0],
                        initialChannelAcc: {Channels: []},
                        keyList: ['Channels'],
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
                      null)),
              this.el);
        },
      });

      return {
        VolumeWidgetView: VolumeWidgetView,
      };
    });