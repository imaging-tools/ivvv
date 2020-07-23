ivvv
====

The *image voxel volume viewer* (pronounced *ivy*).

Wat?
----

*ivvv* is an attempt to provide a lightweight, minimal volume viewer for interactive data exploration in jupyter. (This is a jupyter widget that provide volumetric rendering given a multiple channel zstack as a numpy array.)

Why?
----

~We wanna look at stuff in notebooks~ Most 3D viewers are too heavyweight to use for quick visualization tasks when experimenting with tractably-sized (analyzing, checking, ...) 3D volumetric datasets.


How?
----

We've used a stripped down version of 3D rendering provided by the `Allen Cell Explorer’s`_ `3D Cell Viewer.`_

Install
~~~~~~~

``pip install ivvv`` 
``jupyter nbextension install --py ivvv``
``jupyter nbextension enable ivvv --py``

.. _Allen Cell Explorer’s: https://allencell.org
.. _3D Cell Viewer.: https://github.com/AllenInstitute/volume-viewer
