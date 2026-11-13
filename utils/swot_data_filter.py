### author: xin luo, 
### create: 2025.7.28; modified: 2025.7.29
### des: some useful functions for swot data filtering or smoothing.


import numpy as np
from scipy.spatial import cKDTree
from utils.functions_swot import meter2deg

def IQR_filter(arr):
  '''
  param: 1d or 2d np.array(), the swot height.
  retrun: numpy MaskedArray, the filtered swot height.
  '''
  Q1, Q3 = np.nanpercentile(arr, (25, 75))
  IQR = Q3 - Q1
  wse_low_thre, wse_high_thre = Q1 - 1.5*IQR, Q3 + 1.5*IQR 
  arr_masked = np.ma.masked_where(np.logical_or(arr>wse_high_thre, arr<wse_low_thre), arr)
  return arr_masked, IQR

def iter_IQR(arr, IQR_thre=0.5, iter_max=5):
  iter = 0
  arr_IQR, IQR = IQR_filter(arr)
  while IQR > IQR_thre and iter < iter_max:    
      iter += 1
      arr_IQR_mask = arr_IQR.mask
      arr_IQR, IQR = IQR_filter(arr_IQR.filled(np.nan))
      arr_IQR.mask = arr_IQR.mask | arr_IQR_mask
  return arr_IQR, IQR

def iter_sigma(arr, sigma_scale=1, count_min=5, mode="mean"):
    ''' 
    des: 迭代剔除中心 ±sigma_scale*sigma 之外的像元, 当数据标准差小于std_thre,   
         或数据数量小于count_min时停止
    args:
        arr: 1d/2d array-like input data        
        sigma_scale: float, the sigma scale for outlier removal
        count_min: int, the minimum number of data points to continue iteration
        mode: str, "mean" or "median" to determine the central value calculation
    '''    
    if mode not in ("mean", "median"):
        raise ValueError("mode must be 'mean' or 'median'")
    data = np.asarray(arr, copy=True)
    if np.isfinite(data).sum() == 0:
        return data
    center = np.nanmean if mode == "mean" else np.nanmedian
    data_center, data_std = center(data), np.nanstd(data)
    while np.isfinite(data).sum() > count_min:
        num_valid = np.isfinite(data).sum()
        i_valid_new = np.abs(data - data_center) < sigma_scale * data_std
        data[~i_valid_new] = np.nan  ## update 
        if np.isfinite(data).sum() < count_min or num_valid == i_valid_new.sum():
            break
        data_center, data_std = center(data), np.nanstd(data) # update
    return data


def pixc_height_local_filtering(pixc_height, pixc_lonlat, 
                                thre=0.3, radius_m=500, bin_point = 1000):
    """
    des: 
        filter height values based on a local region within a specified radius.
    Params:
        pixc_height: array of height values to be processed
        pixc_lonlat: tuple/list, dataset containing longitude and latitude
        thre: median difference threshold (default 0.3)
        radius_m: neighborhood radius in meters (default 500), smaller, faster
        bin_point: number of points in each bin (default 1000)
    Returns:
        Filtered height array
    """
    lon, lat = pixc_lonlat
    valid_mask = ~np.isnan(pixc_height)
    if not np.any(valid_mask):
        return np.full_like(pixc_height, np.nan)
    height_valid = pixc_height[valid_mask]
    lon_valid, lat_valid = lon[valid_mask], lat[valid_mask]
    # 1. calculate geographic parameters
    lat_center = np.mean(lat_valid)
    dlon, dlat = meter2deg(radius_m, lat_center)
    radius_deg = max(dlon, dlat)  # Use the maximum change as the search radius
    # 2. build KDTree and query neighbors
    lon_lat = np.column_stack((lon_valid, lat_valid))    
    tree = cKDTree(lon_lat)    
    # 3. calculate neighbor medians using    
    bins = len(lon_lat)//bin_point
    neighbor_means = np.full(len(lon_lat), np.nan, dtype=np.float32)
    for i in range(0, bins):
        ids = tree.query_ball_point(lon_lat[i*bin_point:(i+1)*bin_point], r=radius_deg, return_sorted=True)
        neighbor_means_i = np.full(len(ids), np.nan, dtype=np.float32)
        for j, idx in enumerate(ids):
            neighbor_means_i[j] = np.mean(height_valid[idx])
        neighbor_means[i*bin_point:(i+1)*bin_point] = neighbor_means_i

    # 4. apply filtering (vectorized operation)
    full_means = np.full_like(pixc_height, np.nan, dtype=np.float32)
    full_means[valid_mask] = neighbor_means
    diff = np.abs(pixc_height - full_means)
    filtered = np.where(diff < thre, pixc_height, np.nan)

    return filtered