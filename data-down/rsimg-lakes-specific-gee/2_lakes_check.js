// author: xin luo
// created: 2025.10.11
// des: check the selected images

////////////////////////////////////////////////////////////////
// ----------- Lake
// dianchi lake 
var lake_dianchi_outline = ee.Geometry.Rectangle(102.41, 24.58, 102.93, 25.12)
var lake_dianchi = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T47RRH').clip(lake_dianchi_outline)
print('dianchi:',lake_dianchi)

// fuxian
var lake_fuxian_outline = ee.Geometry.Rectangle(102.67, 24.34, 103.04, 24.68)
var lake_fuxian = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T47RRH').clip(lake_fuxian_outline)
print('fuxian:',lake_fuxian)

// yangzonghai
var lake_yangzonghai_outline = ee.Geometry.Rectangle(102.91, 24.82, 103.05, 25.0)
var lake_yangzonghai = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T47RRH').clip(lake_yangzonghai_outline)
print('yangzonghai:',lake_yangzonghai)

// xingyun
var lake_xinyun_outline = ee.Geometry.Rectangle(102.69, 24.28, 102.88, 24.41)
var lake_xinyun = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T47RRH').clip(lake_xinyun_outline)
print('xingyun:',lake_xinyun)

// qilu
var lake_qilu_outline =  ee.Geometry.Rectangle(102.69, 24.1, 102.85, 24.23)
var lake_qilu = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T48QTM').clip(lake_qilu_outline)
print('qilu:',lake_qilu)

// yilong 
var lake_yilong_outline =  ee.Geometry.Rectangle(102.44, 23.6, 102.67, 23.75)
var lake_yilong = ee.Image('COPERNICUS/S2_SR/20240415T033539_20240415T034512_T48QTM').clip(lake_yilong_outline)
print('yilong:',lake_yilong)

// erhai
var lake_erhai_outline =  ee.Geometry.Rectangle(100.0, 25.53, 100.4, 26.03)
var lake_erhai = ee.Image('COPERNICUS/S2_SR/20240801T034541_20240801T040045_T47RPJ').clip(lake_erhai_outline)
print('erhai:',lake_erhai)

// chenghai
var lake_chenghai_outline =  ee.Geometry.Rectangle(100.56, 26.42, 100.75, 26.68)
var lake_chenghai = ee.Image('COPERNICUS/S2_SR/20240418T034539_20240418T040000_T47RPK').clip(lake_chenghai_outline)
print('chenghai:',lake_chenghai)

// lugu
var lake_lugu_outline =  ee.Geometry.Rectangle(100.71, 27.63, 100.87, 27.77)
var lake_lugu = ee.Image('COPERNICUS/S2_SR/20240523T034531_20240523T035538_T47RPL').clip(lake_lugu_outline)
print('lugu:',lake_lugu)



// Map.centerObject(region, 9);
Map.setCenter(102.5, 24.7, 8);
var empty = ee.Image().byte();

// dianchi
var lake_dianchi_outline = empty.paint({
    featureCollection: lake_dianchi_outline, color: 1, width: 3});
Map.addLayer(lake_dianchi_outline, {palette: '0000FF'}, 'lake_dianchi_outline');
Map.addLayer(lake_dianchi, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_dianchi');

// fuxian 
var lake_fuxian_outline = empty.paint({
    featureCollection: lake_fuxian_outline, color: 1, width: 3});
Map.addLayer(lake_fuxian_outline, {palette: '0000FF'}, 'lake_fuxian_outline');
Map.addLayer(lake_fuxian, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_fuxian');

// yangzonghai
var lake_yangzonghai_outline = empty.paint({
    featureCollection: lake_yangzonghai_outline, color: 1, width: 3});
Map.addLayer(lake_yangzonghai_outline, {palette: '0000FF'}, 'lake_yangzonghai_outline');
Map.addLayer(lake_yangzonghai, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_yangzonghai');

// xinyun
var lake_xinyun_outline = empty.paint({
    featureCollection: lake_xinyun_outline, color: 1, width: 3});
Map.addLayer(lake_xinyun_outline, {palette: '0000FF'}, 'lake_xinyun_outline');
Map.addLayer(lake_xinyun, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_xinyun');

// qilu
var lake_qilu_outline = empty.paint({
    featureCollection: lake_qilu_outline, color: 1, width: 3});
Map.addLayer(lake_qilu_outline, {palette: '0000FF'}, 'lake_qilu_outline');
Map.addLayer(lake_qilu, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_qilu');

// yilong
var lake_yilong_outline = empty.paint({
    featureCollection: lake_yilong_outline, color: 1, width: 3});
Map.addLayer(lake_yilong_outline, {palette: '0000FF'}, 'lake_yilong_outline');
Map.addLayer(lake_yilong, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_yilong');

// erhai
var lake_erhai_outline = empty.paint({
    featureCollection: lake_erhai_outline, color: 1, width: 3});
Map.addLayer(lake_erhai_outline, {palette: '0000FF'}, 'lake_erhai_outline');
Map.addLayer(lake_erhai, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_erhai');

// chenghai
var lake_chenghai_outline = empty.paint({
    featureCollection: lake_chenghai_outline, color: 1, width: 3});
Map.addLayer(lake_chenghai_outline, {palette: '0000FF'}, 'lake_chenghai_outline');
Map.addLayer(lake_chenghai, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_chenghai');

// lugu
var lake_lugu_outline = empty.paint({
    featureCollection: lake_lugu_outline, color: 1, width: 3});
Map.addLayer(lake_lugu_outline, {palette: '0000FF'}, 'lake_lugu_outline');
Map.addLayer(lake_lugu, {bands:['B4','B3','B2'], max:3000, min:0}, 'lake_lugu');



