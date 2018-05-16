# ivvv
The image voxel volume viewer (pronounced ivy)

## Wat?

DescribeMe

## Why?

B/c (but more too)

## How?

UseUseUse

### Install

`pip install ivvv` <- would be nice if it worked

## Detailed docs

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
            "description": "XXX",
            "type": "integer",
        },
        "channel_names": {
            "description": "XXX",
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        }
         "rows": {
            "description": "XXX",
            "type": "integer"
        },
         "cols": {
            "description": "XXX",
            "type": "integer"
        },
        "tiles": {
            "description": "XXX",
            "type": "integer"
        },
        "tile_width": {
            "description": "XXX",
            "type": "integer"
        },
        "tile_height": {
            "description": "XXX",
            "type": "integer"
        },
        "atlas_width": {
            "description": "XXX",
            "type": "integer"
        },
        "atlas_height": {
            "description": "XXX",
            "type": "integer"
        },
        "pixel_size_x": {
            "description": "XXX",
            "type": "float"
        },
        "pixel_size_y": {
            "description": "XXX",
            "type": "float"
        },
         "pixel_size_z": {
            "description": "XXX",
            "type": "float"
        },
        "images": {
            "XXX": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        }
        "name": {
            "description": "XXX",
            "type": "string"
        },
        "status": {
            "description": "XXX",
            "type": "string"
        },
         "version": {
            "description": "XXX",
            "type": "string"
        },
         "aicsImageVersion": {
            "description": "XXX",
            "type": "string"
        },
    },
    "required": ["XXX", "XXX", "XXX"]
}

AICS-10_5_5.ome.tif_atlas.json
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
  "status":"OK",
  "version":"0.0.0",
  "aicsImageVersion":"0.3.0"
  }
