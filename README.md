# ivvv
[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/kmader/ivvv/patch-2)

The *image voxel volume viewer* (pronounced _ivy_).  

## What?
*ivvv* is an attmept to provide a lightweight, minimal volume viewer for interactive data exploration in jupyter.
(This is a jupyter widget that provide volumetric rendering given a multiple channel zstack as a numpy array.)

## Why?
~We wanna look at stuff in notebooks~
Most 3D viewers are far too heavyweight to use for quick visualization tasks when experimenting with tractably-sized (analyzing, checking, ...) 3D volumetric datasets. 

## Who?
Envisioned user group is anyone who wants a robust and quick way to interactively interrogate volumetric data as part of their workflows; domain which motivated development is multi-channel volumetric light/fluorescence microscopy datasets.

Stripped down version of 3D renderes used 3D cell viewer.
Standard scientific python toolkit.

## How?
We've used a stripped down version of 3D rendering provided by the [Allen Cell Explorer's](https://allencell.org) [3D Cell Viewer.](https://github.com/dmt-aics/volume-viewer)



### Demo Notebooks

- [Foam 3D](https://mybinder.org/v2/gh/kmader/ivvv/patch-2?filepath=examples%2Ffoam_3d.ipynb)

#### Under development

- [Demo](https://mybinder.org/v2/gh/kmader/ivvv/patch-2?filepath=examples%2Fdemo.ipynb)
- [Hello World](https://mybinder.org/v2/gh/kmader/ivvv/patch-2?filepath=examples%2Fhello_world.ipynb)

### Install

`pip install ivvv` <- would be nice if it worked
`jupyter nbextension install --py ivvv`
`jupyter nbextension enable ivvv --py`


## Detailed docs

#### Schema
``` json
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "Allen Volume Format image",
    "description": "An image from e.g. the Allen Cell Explorer Collection defined for render by 3D Cell Viewer (ACE)",
    "type": "object",
    "properties": {
        "width": {
            "description": "Width of original volumetric data prior to downsampling.",
            "type": "integer"
        },
        "height": {
            "description": "Height of original volumetric data prior to downsampling.",
            "type": "integer"
        },
        "channels": {
            "description": "Specifies number of channels.",
            "type": "integer",
        },
        "channel_names": {
            "description": "Names of each of the channels to be rendered, in order. Unique identifier expected.",
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        }
         "rows": {
            "description": "Number of rows in tile array in each image.",
            "type": "integer"
        },
         "cols": {
            "description": "Number of columns in tile array in each image.",
            "type": "integer"
        },
        "tiles": {
            "description": "Number of tiles, which must be equal to the number of z-slices in original volumetric data.",
            "type": "integer"
        },
        "tile_width": {
            "description": "Width of each tile in volumetric dataset to be rendered, in pixels.",
            "type": "integer"
        },
        "tile_height": {
            "description": "Height of each tile in volumetric dataset to be rendered, in pixels.",
            "type": "integer"
        },
        "atlas_width": {
            "description": "Total width of volumetric object containing all the tiles, in pixels.",
            "type": "integer"
        },
        "atlas_height": {
            "description": "Total height of volumetric object containing all the tiles, in pixels.",
            "type": "integer"
        },
        "pixel_size_x": {
            "description": "Size of pixels in volumetric data to be rendered, in x-dimension, unitless.",
            "type": "float"
        },
        "pixel_size_y": {
            "description": "Size of pixels in volumetric data to be rendered, in y-dimension, unitless.",
            "type": "float"
        },
         "pixel_size_z": {
            "description": "Size of pixels in volumetric data to be rendered, in z-dimension, unitless.",
            "type": "float"
        },
         "name": {
            "description": "Base name of images.",
            "type": "string"
        },
        "images": {
            "description": "List of images as defined by name and channel array; should correspond to *name*.",
            "type": "array",
            "items": {             
                "name": {
                    "description": "Name of single image item.",
                    "type": "string",
             },
                "channels": {
                "description": "Channels to be rendered. Unique identifiers expected.",
                "type": "array",
                "items": {
                "type": "integer"
             },
                "minItems": 1,
                "uniqueItems": true
             }
            "minItems": 1,
            "uniqueItems": true
            }
        } 
         "version": {
            "description": "Current version of the schema.",
            "type": "string"
        },
         "aicsImageVersion": {
            "description": "Version of aicsImage python library that generated the employed texture map.",
            "type": "string"
        },
    },
    "required": ["width", "height", "channels", "channel_names", "rows", "cols", "tiles", "tile_width", "tile_height", "atlas_width", "atlas_height", "pixel_size_x", "pixel_size_y", "pixel_size_z", "name", "images", "version"]
}
``` 
#### Nice example

AICS-10_5_5.ome.tif_atlas.json
``` json
{
  "width":306,
  "height":494,
  "channels":9,
  "channel_names":["DRAQ5","EGFP","Hoechst 33258","TL Brightfield","SEG_STRUCT","SEG_Memb","SEG_DNA","CON_Memb","CON_DNA"],
  "rows":7,
  "cols":10,
  "tiles":65,
  "tile_width":204,
  "tile_height":292,
  "atlas_width":2040,
  "atlas_height":2044,
  "pixel_size_x":0.065,
  "pixel_size_y":0.065,
  "pixel_size_z":0.29,
  "images":[{"name":"AICS-10_5_5.ome.tif_atlas_0.png","channels":[0,1,2]},{"name":"AICS-10_5_5.ome.tif_atlas_1.png","channels":[3,4,5]},{"name":"AICS-10_5_5.ome.tif_atlas_2.png","channels":[6,7,8]}],
  "name":"AICS-10_5_5",
  "version":"0.0.0",
  "aicsImageVersion":"0.3.0"
  }
  ```
