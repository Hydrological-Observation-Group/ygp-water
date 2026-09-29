# Data overview       
This folder stores the raw geospatial data used in the YGP water project.     
## Directory structure      
```text
data/
├── basemap/
├── boundary/
│   ├── china_province.geojson
│   ├── hydro_basin_lev04_ygp_clip.gpkg
│   ├── hydro_basin_lev04_ygp_wide.gpkg
│   ├── hydro_basin_lev05_ygp_clip.gpkg
│   ├── hydro_basin_lev05_ygp_wide.gpkg
│   ├── ygp_region.gpkg
│   └── yunnan_guizhou_sichuan_provinces.gpkg
├── dem/
│   └── tiles/
├── lakes-specific/
│   ├── rsimg/
│   └── vector-by-rsimg/
│       ├── chenghai_s2_20240418.gpkg
│       ├── dianchi_s2_20240415.gpkg
│       ├── erhai_s2_20240801.gpkg
│       ├── fuxian_s2_20240415.gpkg
│       ├── lugu_s2_20240523.gpkg
│       ├── qilu_s2_20240415.gpkg
│       ├── xingyun_s2_20240415.gpkg
│       ├── yangzonghai_s2_20240415.gpkg
│       └── yilong_s2_20240415.gpkg
├── lakes-ygp/
│   ├── HydroLAKES_ygp_clip.gpkg
│   └── HydroLAKES_ygp_wide.gpkg
├── reference/
├── river/
│   ├── sword_reaches_ygp_clip.gpkg
│   └── sword_reaches_ygp_wide.gpkg
├── watset/
└── README.md
```

## Data folders    
- `basemap/`: base maps and background layers.   
- `boundary/`: provincial, basin, and regional boundary data.     
- `dem/`: DEM and terrain data.     
- `lakes-specific/`: lake-specific remote-sensing and vector datasets.     
- `lakes-ygp/`: YGP lake dataset.    
- `reference/`: reference and auxiliary datasets.    
- `river/`: river network and hydrological data.    
- `watset/`: water dataset for model training.     

