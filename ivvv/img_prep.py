import numpy as np
import scipy.ndimage
import skimage.exposure


__all__ = ["img_prep"]

def _normalize(img):
    """Convert to zero-one"""
    return np.divide(img-np.min(img),np.max(img)-np.min(img))

def _resize(img, max_dim=128):
    """Resize (plane, row, column, channel) image
    such that the max size in any dimension is max_dim
    """
    if max(img.shape[:3])<=max_dim:
        return img
    else:
        new_size = [max_dim/s if s>=max_dim else 1.0 for s in img.shape[:3]]
        new_size.append(1.0) # for channel
        return scipy.ndimage.zoom(img, new_size)

def img_prep(img, max_dim=128):
    """Given an input n dimensional image, prep for display

    Parameters
    ----------
    img : array
        Numpy array in (plane, row, column, channel) format
    size_lim : int
        largest dimension allowed
    
    Returns
    -------
    img : list of arrays
        one channel to each entry in the list
    """
    # Norm and convert to 8 bit
    img = np.multiply(255, _normalize(img)).astype(np.uint8)
    #  Resize
    img = _resize(img, max_dim)

    return [img[:,:,:,i] for i in range(img.shape[-1])]
