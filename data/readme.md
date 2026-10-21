# 数据目录说明

本目录用于存放云南-贵州高原（YGP）水体制图与水体识别相关的数据资产。该项目的数据主要包括：研究区边界、底图、DEM、遥感影像、河流/湖泊要素、以及训练、验证所需的样本数据。

## 当前目录结构

```text
data/
├── basemap/
│   ├── HYP_50M_SR.tif
│   ├── HYP_50M_SR_W.tif
│   └── natural-earth-1_large4096px.png
├── boundary/
│   ├── china_province.geojson
│   ├── hydro_basin_lev04_ygp_clip.gpkg
│   ├── hydro_basin_lev04_ygp_wide.gpkg
│   ├── hydro_basin_lev05_ygp_clip.gpkg
│   ├── hydro_basin_lev05_ygp_wide.gpkg
│   ├── ygp_region-del.gpkg
│   ├── ygp_region.gpkg
│   ├── ygp_tiles_100km_buf10km.gpkg
│   ├── ygp_tiles_1deg_buf01deg.gpkg
│   └── yunnan_guizhou_sichuan_provinces.gpkg
├── dem/
│   ├── SRTMGL3.tif
│   ├── SRTMGL3_005deg.tif
│   ├── SRTMGL3_005deg_ygp.tif
│   └── tiles/
├── rsimg/
│   ├── specific-lakes/
│   └── ygp-region/
├── swot/
│   ├── pixc/
│   └── raster/
├── watset/
│   ├── ESWD/
│   │   ├── tra/
│   │   ├── val/
│   │   └── tmp/
│   ├── tmp/
│   └── watset-ygp/
├── reference/
│   └── WR(2020)_Analysis on driving factors of lake surface water temperature for major lakes in Yunnan-Guizhou Plateau.pdf
├── river/
│   ├── sword_reaches_ygp_clip.gpkg
│   └── sword_reaches_ygp_wide.gpkg
├── readme.md
└── .DS_Store
```

## 数据用途说明

- `basemap/`: 底图、背景图和参考影像，用于区划、可视化和地图配图。
- `boundary/`: 研究区边界、流域边界、省份边界及区块分割图层，常用于裁剪和掩膜。
- `dem/`: DEM / 高程数据，用于地形分析、地表特征提取和辅助水体识别。
- `rsimg/`: 遥感影像数据，按湖泊和研究区进行组织，适合影像处理与模型输入。
- `swot/`: SWOT 相关数据，包括 `pixc` 和 `raster` 子目录，适合水位和水体相关研究。
- `watset/`: 训练/验证数据目录，按 ESWD 等样本来源分层，包含 `tra/`、`val/` 等子目录。
- `reference/`: 参考文献和辅助资料，用于方法对照、研究支撑和结果解释。
- `river/`: 河网和水系矢量数据，用于水文分析和水体边界辅助判断。

## 使用建议

- 本目录主要存放原始数据、中间处理结果和大文件地理数据，通常不适合全部提交到 Git。
- 若需要版本控制，建议保留说明文件、少量元数据及关键样例数据，而将大文件放在本地或云端存储。
- 训练和验证脚本通常会读取 `watset/`、`rsimg/` 与 `dem/` 中的数据，并结合 `boundary/`、`river/` 等辅助数据完成处理。

## 典型应用

该数据目录主要用于：

- 研究区裁剪和边界掩膜
- DEM 与遥感影像预处理
- 湖泊/河流信息提取
- 水体分割模型训练与验证
