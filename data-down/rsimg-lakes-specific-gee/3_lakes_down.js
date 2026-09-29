// author: xin luo
// create: 2025.10.11
// des: This code export the selected s2 image to the google drive.
/////////////////////////////////////////

var s2_bands_sel = ['B2', 'B3', 'B4', 'B8', 'B11', 'B12']

// var region = ee.Geometry.Rectangle(102.41, 24.58, 102.93, 25.12)  // dianchi lake
// var region = ee.Geometry.Rectangle(102.67, 24.34, 103.04, 24.68)  // fuxian lake
// var region = ee.Geometry.Rectangle(102.91, 24.82, 103.05, 25.0)   // yangzonghai lake
var region = ee.Geometry.Rectangle(102.69, 24.28, 102.88, 24.41)  // xinyun lake
// var region = ee.Geometry.Rectangle(102.69, 24.1, 102.85, 24.23)   // qilu lake
// var region = ee.Geometry.Rectangle(102.44, 23.6, 102.67, 23.75)   // yilong lake
// var region = ee.Geometry.Rectangle(100.0, 25.53, 100.4, 26.03)    // erhai lake
// var region =  ee.Geometry.Rectangle(100.56, 26.42, 100.75, 26.68)  // chenghai lake
// var region =  ee.Geometry.Rectangle(100.71, 27.63, 100.87, 27.77)    // lugu lake


var id =  'COPERNICUS/S2_SR/20240415T033539_20240415T034512_T47RRH'   // dianchi, fuxian, qilu, yangzonghai lakes
// var id =  'COPERNICUS/S2_SR/20240415T033539_20240415T034512_T48QTM'    /// qilu, yilong lakes
// var id = 'COPERNICUS/S2_SR/20240801T034541_20240801T040045_T47RPJ'     // erhai lake
// var id = 'COPERNICUS/S2_SR/20240418T034539_20240418T040000_T47RPK'     // chenghai lake
// var id = 'COPERNICUS/S2_SR/20240523T034531_20240523T035538_T47RPL'     // lugu lake

var img = ee.Image(id).select(s2_bands_sel)
   
var empty = ee.Image().byte();
var region_outline = empty.paint({
    featureCollection: region, color: 1, width: 3});

Map.centerObject(region, 8);
Map.addLayer(img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'sen2 image');
Map.addLayer(region_outline, {palette: '0000FF'}, 'lake_outline');


// Export.image.toDrive({
//     image: img,
//     description: 'xinyun_s2_20240306',
//     // folder: 'WatNet',
//     scale: 20,
//     fileFormat: 'GeoTIFF',
//     region: region
//     });

