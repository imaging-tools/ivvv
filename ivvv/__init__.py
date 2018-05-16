from ._version import version_info, __version__

from .volume import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'ivvv',
        'require': 'ivvv/extension'
    }]
