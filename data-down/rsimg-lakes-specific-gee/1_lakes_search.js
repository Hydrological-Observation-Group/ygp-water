//////////////////////////////////////////////////////////////
// Author: xin luo
// Create: 2025.2.10
// Description: This code help us to select the optical image for lakes in yunnan plateau
//////////////////////////////////////////////////////////////


var start_time = '2024-2-1';
var end_time = '2024-10-30';

var region = ee.Geometry.Rectangle(100.71, 27.63, 100.87, 27.77) //
print('scene region area:', region.area())

var s1_vis = ['VV','VH','VV']       // sentinel-1
var s2_vis = ['B4', 'B3', 'B2']    // sentinel-2
var ls_vis = ['SR_B4', 'SR_B3', 'SR_B2']   // landsat 5,7, 8,9

// var s1_bands= ['VV','VH']
var s2_bands = ['B2', 'B3', 'B4', 'B8', 'B11', 'B12']
var l57_bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7']  // landsat 5, 7
var l8_bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']   // landsat 8
var l9_bands =['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']   // landsat 9

// Ensure the region is fully covered by an image.
var condition = function(image){
    var footprint = ee.Geometry(image.get('system:footprint'))
    var condition = ee.Geometry.Polygon(footprint.coordinates()).contains(region)
    return ee.Algorithms.If(condition, 
                            image.set('data', 'true'), 
                            ee.Image([]).set('data', 'false'))};

// ----- Landsat 5789 images selection ----- 
// var ls_img_col = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
// var ls_img_col = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
// var ls_img_col = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
// var ls_img_col = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  // .filter(ee.Filter.lt('CLOUD_COVER_LAND', 20))
  // .filter(ee.Filter.gt('CLOUD_COVER_LAND', 0))
  // .filterBounds(region)
  // .filterDate(start_time, end_time);
// var ls_img_col = ls_img_col.map(condition).filterMetadata('data', 'equals','true')
// print(ls_img_col)

// // s1 image
// var s1_img_col = ee.ImageCollection('COPERNICUS/S1_GRD')
//       .filter(ee.Filter.eq('instrumentMode', 'IW'))
//       .filterBounds(region)
//       .filterDate(start_time, end_time);
// var s1_img_col = s1_img_col.map(condition).filterMetadata('data', 'equals','true')
// print(s1_img_col)



// s2, note: before 2017, sen2 image should be searched with the TOA data.
var s2_img_col = ee.ImageCollection('COPERNICUS/S2_SR')
// var s2_img_col = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')  // TOA data
                  .filterBounds(region)
                  .filterDate(start_time, end_time)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .sort('CLOUDY_PIXEL_PERCENTAGE');
var s2_img_col = s2_img_col.map(condition).filterMetadata('data', 'equals','true')
print(s2_img_col)

var img_sel = ee.Image('COPERNICUS/S2_SR/20240523T034531_20240523T035538_T47RPL')


var empty = ee.Image().byte();
var scene_outline = empty.paint({
    featureCollection: region, color: 1, width: 3});

Map.centerObject(region, 10);
Map.addLayer(img_sel, {bands: s2_vis, min:0, max:2500}, 'img_sel')
// Map.addLayer(s2_img_col, {bands: s2_vis, min:0, max:2500}, 's2_img_col')
Map.addLayer(scene_outline, {palette: 'FF0000'}, 'training region')



