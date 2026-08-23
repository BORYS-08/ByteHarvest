/*
  ByteHarvest Frontend Mock Data
  --------------------------------
  Frontend-only demo data.

  The image helpers below generate local SVG-based agricultural
  placeholder images so the UI does not depend on external
  image URLs during development/demo.
*/


/* ============================================================
   LOCAL AGRICULTURE IMAGE HELPERS
   ============================================================ */

const svgToDataUri = (svg) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;


const createCropImage = ({
  type = 'rice',
  healthy = false,
}) => {
  const palettes = {
    rice: {
      sky: healthy ? '#dff5df' : '#d8ead7',
      field: healthy ? '#4b9b42' : '#607b46',
      leaf: healthy ? '#2f9e44' : '#6b8f4e',
      stem: healthy ? '#74b64b' : '#8f9a58',
      lesion: '#7b3f2a',
      soil: '#8f6b4f',
    },

    tomato: {
      sky: healthy ? '#e6f5df' : '#e9eee0',
      field: healthy ? '#5da34d' : '#7d9256',
      leaf: healthy ? '#248a3d' : '#677e45',
      stem: '#4d7d3d',
      lesion: '#7a3529',
      soil: '#8d694d',
    },

    cotton: {
      sky: '#e6f1f7',
      field: healthy ? '#5f9d58' : '#727f55',
      leaf: healthy ? '#3c833f' : '#69754c',
      stem: '#5f7045',
      lesion: '#8b4930',
      soil: '#916b50',
    },

    maize: {
      sky: '#e8f3dc',
      field: healthy ? '#5d9e36' : '#71854a',
      leaf: healthy ? '#2f8d3f' : '#76845a',
      stem: '#799b41',
      lesion: '#7a4930',
      soil: '#906c4f',
    },
  };

  const c = palettes[type] || palettes.rice;

  const diseaseMarks = healthy
    ? ''
    : `
      <path
        d="M115 145 C128 134, 142 136, 151 148"
        stroke="${c.lesion}"
        stroke-width="9"
        stroke-linecap="round"
        opacity="0.85"
      />
      <path
        d="M180 108 C194 100, 209 104, 219 117"
        stroke="${c.lesion}"
        stroke-width="8"
        stroke-linecap="round"
        opacity="0.8"
      />
      <path
        d="M250 158 C262 146, 276 149, 285 159"
        stroke="${c.lesion}"
        stroke-width="10"
        stroke-linecap="round"
        opacity="0.78"
      />
    `;

  let cropSvg = '';

  if (type === 'rice') {
    cropSvg = `
      <g stroke="${c.stem}" stroke-width="6" stroke-linecap="round">
        <path d="M125 250 Q115 182 130 95" />
        <path d="M175 250 Q165 174 184 74" />
        <path d="M225 250 Q216 173 240 92" />
        <path d="M275 250 Q270 182 292 112" />
        <path d="M325 250 Q319 180 343 88" />
      </g>

      <g fill="${c.leaf}">
        <path d="M128 154 Q80 124 78 98 Q118 108 132 130 Z" />
        <path d="M184 137 Q139 104 140 76 Q178 91 191 114 Z" />
        <path d="M241 157 Q197 125 198 94 Q236 108 249 133 Z" />
        <path d="M293 148 Q260 113 269 83 Q304 98 305 124 Z" />
        <path d="M344 160 Q313 128 321 98 Q353 111 360 136 Z" />
      </g>

      <g fill="${c.stem}">
        <ellipse cx="135" cy="91" rx="7" ry="12" />
        <ellipse cx="145" cy="106" rx="7" ry="12" />
        <ellipse cx="186" cy="70" rx="7" ry="12" />
        <ellipse cx="194" cy="87" rx="7" ry="12" />
        <ellipse cx="241" cy="90" rx="7" ry="12" />
        <ellipse cx="250" cy="108" rx="7" ry="12" />
        <ellipse cx="292" cy="105" rx="7" ry="12" />
        <ellipse cx="302" cy="122" rx="7" ry="12" />
      </g>
    `;
  }

  if (type === 'tomato') {
    cropSvg = `
      <g stroke="${c.stem}" stroke-width="8" stroke-linecap="round">
        <path d="M225 248 Q220 171 227 108" />
        <path d="M225 168 Q190 140 171 118" />
        <path d="M227 164 Q267 138 289 113" />
      </g>

      <g fill="${c.leaf}">
        <path d="M175 119 Q139 95 122 115 Q148 120 168 139 Z" />
        <path d="M288 113 Q319 89 335 110 Q310 116 292 132 Z" />
        <path d="M203 110 Q186 80 198 65 Q222 82 220 103 Z" />
        <path d="M250 111 Q271 80 262 64 Q238 82 238 102 Z" />
      </g>

      <circle cx="225" cy="161" r="30" fill="#dc433d" />
      <circle cx="185" cy="193" r="25" fill="#e44d42" />
      <circle cx="268" cy="204" r="26" fill="#d9443d" />

      <g fill="#3f7d35">
        <path d="M216 128 L225 111 L234 129 L225 123 Z" />
        <path d="M176 169 L185 154 L194 170 L185 164 Z" />
        <path d="M258 180 L268 163 L277 182 L267 174 Z" />
      </g>

      ${diseaseMarks}
    `;
  }

  if (type === 'cotton') {
    cropSvg = `
      <g stroke="${c.stem}" stroke-width="8" stroke-linecap="round">
        <path d="M215 250 Q213 173 224 116" />
        <path d="M224 174 Q187 143 163 121" />
        <path d="M227 172 Q264 140 292 118" />
      </g>

      <g fill="${c.leaf}">
        <path d="M163 122 Q124 102 111 127 Q138 132 163 143 Z" />
        <path d="M293 119 Q329 98 345 123 Q319 127 294 141 Z" />
        <path d="M224 115 Q206 78 223 59 Q240 81 233 109 Z" />
      </g>

      <g fill="#fff">
        <circle cx="221" cy="151" r="27" />
        <circle cx="177" cy="183" r="23" />
        <circle cx="269" cy="188" r="23" />
      </g>

      <g fill="#e9e4d2">
        <circle cx="214" cy="147" r="5" />
        <circle cx="229" cy="153" r="5" />
        <circle cx="176" cy="178" r="4" />
        <circle cx="268" cy="183" r="4" />
      </g>

      ${diseaseMarks}
    `;
  }

  if (type === 'maize') {
    cropSvg = `
      <g fill="${c.leaf}">
        <path d="M220 248 Q168 183 188 83 Q228 137 231 248 Z" />
        <path d="M224 248 Q285 179 271 91 Q226 145 224 248 Z" />
        <path d="M214 248 Q146 213 133 143 Q190 158 222 228 Z" />
        <path d="M236 248 Q306 210 321 145 Q261 162 230 228 Z" />
      </g>

      <rect
        x="214"
        y="88"
        width="18"
        height="162"
        rx="8"
        fill="${c.stem}"
      />

      <path
        d="M205 108 Q177 89 162 104 Q178 127 204 126"
        fill="${c.leaf}"
      />

      <path
        d="M242 114 Q271 91 288 108 Q272 126 244 131"
        fill="${c.leaf}"
      />

      <ellipse
        cx="223"
        cy="170"
        rx="17"
        ry="31"
        fill="#e6b64f"
      />

      ${diseaseMarks}
    `;
  }

  return svgToDataUri(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="640"
      height="400"
      viewBox="0 0 640 400"
    >

      <defs>
        <linearGradient
          id="sky"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stop-color="${c.sky}"
          />
          <stop
            offset="100%"
            stop-color="#ffffff"
          />
        </linearGradient>

        <linearGradient
          id="field"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stop-color="${c.field}"
          />
          <stop
            offset="100%"
            stop-color="${c.soil}"
          />
        </linearGradient>
      </defs>

      <rect
        width="640"
        height="400"
        fill="url(#sky)"
      />

      <circle
        cx="520"
        cy="70"
        r="34"
        fill="#f5c75c"
        opacity="0.8"
      />

      <path
        d="M0 215 Q145 185 320 220 Q470 250 640 205 L640 400 L0 400 Z"
        fill="url(#field)"
      />

      <path
        d="M0 280 Q170 240 340 275 Q500 305 640 270"
        fill="none"
        stroke="#aacb8c"
        stroke-width="25"
        opacity="0.35"
      />

      ${cropSvg}

      <text
        x="28"
        y="365"
        font-family="Arial, sans-serif"
        font-size="20"
        font-weight="700"
        fill="#ffffff"
        opacity="0.92"
      >
        ${type === 'rice'
          ? 'RICE FIELD'
          : type === 'tomato'
            ? 'TOMATO CROP'
            : type === 'cotton'
              ? 'COTTON CROP'
              : 'MAIZE CROP'}
      </text>

      ${
        healthy
          ? ''
          : `
            <rect
              x="462"
              y="320"
              width="142"
              height="34"
              rx="17"
              fill="#7c2d12"
              opacity="0.9"
            />

            <text
              x="533"
              y="343"
              text-anchor="middle"
              font-family="Arial, sans-serif"
              font-size="15"
              font-weight="700"
              fill="#ffffff"
            >
              DISEASE DETECTED
            </text>
          `
      }

    </svg>
  `);
};


/* ============================================================
   REUSABLE LOCAL IMAGE SET
   ============================================================ */

const cropImages = {
  rice: {
    healthy: createCropImage({
      type: 'rice',
      healthy: true,
    }),

    diseased: createCropImage({
      type: 'rice',
      healthy: false,
    }),
  },

  tomato: {
    healthy: createCropImage({
      type: 'tomato',
      healthy: true,
    }),

    diseased: createCropImage({
      type: 'tomato',
      healthy: false,
    }),
  },

  cotton: {
    healthy: createCropImage({
      type: 'cotton',
      healthy: true,
    }),

    diseased: createCropImage({
      type: 'cotton',
      healthy: false,
    }),
  },

  maize: {
    healthy: createCropImage({
      type: 'maize',
      healthy: true,
    }),

    diseased: createCropImage({
      type: 'maize',
      healthy: false,
    }),
  },
};


/* ============================================================
   CROP CATALOG
   ============================================================ */

export const initialCropsData = [
  {
    id: 'crop-1',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A major food-grain crop cultivated widely under irrigated and rainfed systems.',
    soil:
      'Clay loam to loam soils with good water-holding capacity.',
    waterRequirement:
      'High; varies with cultivation system.',
    commonDiseases: [
      'Rice Blast',
      'Bacterial Leaf Blight',
      'Sheath Blight',
    ],
    commonPests: [
      'Stem Borer',
      'Brown Planthopper',
      'Leaf Folder',
    ],
  },

  {
    id: 'crop-2',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A major rabi cereal used extensively for food-grain production.',
    soil:
      'Well-drained loam to clay-loam soils.',
    waterRequirement:
      'Moderate with timely irrigation.',
    commonDiseases: [
      'Leaf Rust',
      'Stripe Rust',
      'Powdery Mildew',
    ],
    commonPests: [
      'Aphids',
      'Termites',
      'Armyworm',
    ],
  },

  {
    id: 'crop-3',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    category: 'Cereals',
    icon: '🌽',
    description:
      'A versatile cereal crop used for food, feed, fodder and industrial applications.',
    soil:
      'Well-drained fertile loam soils.',
    waterRequirement:
      'Moderate to high depending on season.',
    commonDiseases: [
      'Northern Corn Leaf Blight',
      'Rust',
      'Downy Mildew',
    ],
    commonPests: [
      'Fall Armyworm',
      'Stem Borer',
      'Aphids',
    ],
  },

  {
    id: 'crop-4',
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A cool-season cereal used for food, feed, malt and industrial purposes.',
    soil:
      'Well-drained loam and sandy-loam soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Stripe Disease',
      'Powdery Mildew',
      'Leaf Rust',
    ],
    commonPests: [
      'Aphids',
      'Armyworms',
      'Termites',
    ],
  },

  {
    id: 'crop-5',
    name: 'Pearl Millet (Bajra)',
    scientificName: 'Pennisetum glaucum',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A hardy cereal suited to hot, dry and low-rainfall environments.',
    soil:
      'Light to medium, well-drained soils.',
    waterRequirement:
      'Low; drought tolerant.',
    commonDiseases: [
      'Downy Mildew',
      'Ergot',
      'Rust',
    ],
    commonPests: [
      'Shoot Fly',
      'Stem Borer',
      'Aphids',
    ],
  },

  {
    id: 'crop-6',
    name: 'Sorghum (Jowar)',
    scientificName: 'Sorghum bicolor',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A drought-tolerant cereal grown for grain, fodder and food products.',
    soil:
      'Well-drained loam to clay-loam soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Downy Mildew',
      'Grain Mold',
      'Anthracnose',
    ],
    commonPests: [
      'Shoot Fly',
      'Stem Borer',
      'Aphids',
    ],
  },

  {
    id: 'crop-7',
    name: 'Finger Millet (Ragi)',
    scientificName: 'Eleusine coracana',
    category: 'Cereals',
    icon: '🌾',
    description:
      'A nutritious millet valued for drought tolerance and grain quality.',
    soil:
      'Red loams, sandy loams and well-drained soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Blast',
      'Leaf Spot',
      'Smut',
    ],
    commonPests: [
      'Shoot Fly',
      'Aphids',
      'Grasshoppers',
    ],
  },

  {
    id: 'crop-8',
    name: 'Chickpea',
    scientificName: 'Cicer arietinum',
    category: 'Pulses',
    icon: '🫘',
    description:
      'A major pulse crop commonly cultivated during the rabi season.',
    soil:
      'Well-drained loam and sandy-loam soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Fusarium Wilt',
      'Ascochyta Blight',
      'Root Rot',
    ],
    commonPests: [
      'Gram Pod Borer',
      'Cutworms',
      'Aphids',
    ],
  },

  {
    id: 'crop-9',
    name: 'Pigeon Pea (Tur)',
    scientificName: 'Cajanus cajan',
    category: 'Pulses',
    icon: '🫘',
    description:
      'A major kharif pulse crop important for protein-rich food and soil health.',
    soil:
      'Well-drained medium soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Wilt',
      'Sterility Mosaic',
      'Phytophthora Blight',
    ],
    commonPests: [
      'Pod Borer',
      'Pod Fly',
      'Plume Moth',
    ],
  },

  {
    id: 'crop-10',
    name: 'Green Gram (Moong)',
    scientificName: 'Vigna radiata',
    category: 'Pulses',
    icon: '🫘',
    description:
      'A short-duration pulse crop grown in kharif, rabi and summer seasons.',
    soil:
      'Well-drained sandy loam to loam soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Yellow Mosaic Virus',
      'Powdery Mildew',
      'Cercospora Leaf Spot',
    ],
    commonPests: [
      'Aphids',
      'Whitefly',
      'Thrips',
    ],
  },

  {
    id: 'crop-11',
    name: 'Black Gram (Urad)',
    scientificName: 'Vigna mungo',
    category: 'Pulses',
    icon: '🫘',
    description:
      'A protein-rich pulse crop grown mainly during warm seasons.',
    soil:
      'Well-drained loam to sandy-loam soils.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'Yellow Mosaic Virus',
      'Cercospora Leaf Spot',
      'Powdery Mildew',
    ],
    commonPests: [
      'Whitefly',
      'Aphids',
      'Pod Borer',
    ],
  },

  {
    id: 'crop-12',
    name: 'Lentil',
    scientificName: 'Lens culinaris',
    category: 'Pulses',
    icon: '🫘',
    description:
      'A cool-season pulse crop grown for nutritious split and whole grain.',
    soil:
      'Well-drained loam and sandy-loam soils.',
    waterRequirement:
      'Low.',
    commonDiseases: [
      'Wilt',
      'Rust',
      'Stemphylium Blight',
    ],
    commonPests: [
      'Aphids',
      'Pod Borer',
      'Cutworms',
    ],
  },

  {
    id: 'crop-13',
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseeds',
    icon: '🥜',
    description:
      'An important oilseed and food crop grown across several Indian regions.',
    soil:
      'Light, friable and well-drained soils.',
    waterRequirement:
      'Moderate; avoid waterlogging.',
    commonDiseases: [
      'Tikka Disease',
      'Rust',
      'Stem Rot',
    ],
    commonPests: [
      'Aphids',
      'White Grubs',
      'Thrips',
    ],
  },

  {
    id: 'crop-14',
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Oilseeds',
    icon: '🌱',
    description:
      'A major protein and oilseed crop cultivated mainly during the kharif season.',
    soil:
      'Well-drained loamy soils.',
    waterRequirement:
      'Moderate; drainage is important.',
    commonDiseases: [
      'Yellow Mosaic',
      'Rust',
      'Charcoal Rot',
    ],
    commonPests: [
      'Stem Fly',
      'Girdle Beetle',
      'Defoliating Caterpillars',
    ],
  },

  {
    id: 'crop-15',
    name: 'Mustard',
    scientificName: 'Brassica juncea',
    category: 'Oilseeds',
    icon: '🌼',
    description:
      'A major winter oilseed crop widely cultivated across northern India.',
    soil:
      'Loam to sandy-loam soils with good drainage.',
    waterRequirement:
      'Low to moderate.',
    commonDiseases: [
      'White Rust',
      'Alternaria Blight',
      'Downy Mildew',
    ],
    commonPests: [
      'Mustard Aphid',
      'Painted Bug',
      'Sawfly',
    ],
  },

  {
    id: 'crop-16',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'Oilseeds',
    icon: '🌻',
    description:
      'An oilseed crop valued for its high-quality edible oil.',
    soil:
      'Well-drained loam to sandy-loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Downy Mildew',
      'Alternaria Blight',
      'Rust',
    ],
    commonPests: [
      'Head Borer',
      'Aphids',
      'White Grubs',
    ],
  },

  {
    id: 'crop-17',
    name: 'Sesame',
    scientificName: 'Sesamum indicum',
    category: 'Oilseeds',
    icon: '🌱',
    description:
      'A warm-season oilseed crop suited to relatively dry conditions.',
    soil:
      'Light, well-drained soils.',
    waterRequirement:
      'Low.',
    commonDiseases: [
      'Phyllody',
      'Alternaria Leaf Spot',
      'Root Rot',
    ],
    commonPests: [
      'Leaf Roller',
      'Gall Fly',
      'Aphids',
    ],
  },

  {
    id: 'crop-18',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Commercial Crops',
    icon: '☁️',
    description:
      'A major fibre crop supporting textile and related industries.',
    soil:
      'Deep, fertile and well-drained soils.',
    waterRequirement:
      'Moderate depending on region.',
    commonDiseases: [
      'Bacterial Blight',
      'Leaf Curl',
      'Fusarium Wilt',
    ],
    commonPests: [
      'Pink Bollworm',
      'Whitefly',
      'Aphids',
    ],
  },

  {
    id: 'crop-19',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'Commercial Crops',
    icon: '🎋',
    description:
      'A long-duration commercial crop primarily cultivated for sugar production.',
    soil:
      'Deep fertile loam with good drainage.',
    waterRequirement:
      'High.',
    commonDiseases: [
      'Red Rot',
      'Smut',
      'Wilt',
    ],
    commonPests: [
      'Early Shoot Borer',
      'Top Borer',
      'White Grub',
    ],
  },

  {
    id: 'crop-20',
    name: 'Jute',
    scientificName: 'Corchorus olitorius',
    category: 'Commercial Crops',
    icon: '🌿',
    description:
      'A bast-fibre crop important for natural fibre and biodegradable products.',
    soil:
      'Alluvial loam and clay-loam soils.',
    waterRequirement:
      'Moderate to high.',
    commonDiseases: [
      'Stem Rot',
      'Anthracnose',
      'Root Rot',
    ],
    commonPests: [
      'Jute Hairy Caterpillar',
      'Aphids',
      'Stem Weevil',
    ],
  },

  {
    id: 'crop-21',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetables',
    icon: '🥔',
    description:
      'A major vegetable crop cultivated for its edible tubers.',
    soil:
      'Loose, well-drained sandy-loam soils.',
    waterRequirement:
      'Moderate with consistent moisture.',
    commonDiseases: [
      'Late Blight',
      'Early Blight',
      'Black Scurf',
    ],
    commonPests: [
      'Aphids',
      'Potato Tuber Moth',
      'Cutworms',
    ],
  },

  {
    id: 'crop-22',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    icon: '🍅',
    description:
      'A widely cultivated vegetable crop used fresh and in processed products.',
    soil:
      'Well-drained fertile loam soils.',
    waterRequirement:
      'Moderate and consistent moisture.',
    commonDiseases: [
      'Late Blight',
      'Early Blight',
      'Leaf Curl Virus',
    ],
    commonPests: [
      'Fruit Borer',
      'Whitefly',
      'Thrips',
    ],
  },

  {
    id: 'crop-23',
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetables',
    icon: '🧅',
    description:
      'An important bulb crop used extensively as food and seasoning.',
    soil:
      'Well-drained sandy-loam to loam soils.',
    waterRequirement:
      'Moderate with careful drainage.',
    commonDiseases: [
      'Purple Blotch',
      'Downy Mildew',
      'Basal Rot',
    ],
    commonPests: [
      'Thrips',
      'Onion Maggot',
      'Cutworms',
    ],
  },

  {
    id: 'crop-24',
    name: 'Brinjal (Eggplant)',
    scientificName: 'Solanum melongena',
    category: 'Vegetables',
    icon: '🍆',
    description:
      'A warm-season vegetable crop cultivated widely across India.',
    soil:
      'Fertile, well-drained loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Bacterial Wilt',
      'Phomopsis Blight',
      'Little Leaf',
    ],
    commonPests: [
      'Shoot and Fruit Borer',
      'Aphids',
      'Whitefly',
    ],
  },

  {
    id: 'crop-25',
    name: 'Chilli',
    scientificName: 'Capsicum annuum',
    category: 'Spices & Vegetables',
    icon: '🌶️',
    description:
      'An important spice and vegetable crop grown in many Indian regions.',
    soil:
      'Well-drained fertile loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Leaf Curl Virus',
      'Powdery Mildew',
      'Dieback',
    ],
    commonPests: [
      'Thrips',
      'Mites',
      'Aphids',
    ],
  },

  {
    id: 'crop-26',
    name: 'Okra (Bhindi)',
    scientificName: 'Abelmoschus esculentus',
    category: 'Vegetables',
    icon: '🌿',
    description:
      'A warm-season vegetable valued for edible tender pods.',
    soil:
      'Well-drained sandy-loam to loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Yellow Vein Mosaic',
      'Powdery Mildew',
      'Wilt',
    ],
    commonPests: [
      'Shoot and Fruit Borer',
      'Jassids',
      'Whitefly',
    ],
  },

  {
    id: 'crop-27',
    name: 'Cabbage',
    scientificName:
      'Brassica oleracea var. capitata',
    category: 'Vegetables',
    icon: '🥬',
    description:
      'A cool-season leafy vegetable grown for its compact head.',
    soil:
      'Fertile, well-drained loam soils.',
    waterRequirement:
      'Moderate to high.',
    commonDiseases: [
      'Downy Mildew',
      'Black Rot',
      'Clubroot',
    ],
    commonPests: [
      'Diamondback Moth',
      'Aphids',
      'Cabbage Caterpillar',
    ],
  },

  {
    id: 'crop-28',
    name: 'Cauliflower',
    scientificName:
      'Brassica oleracea var. botrytis',
    category: 'Vegetables',
    icon: '🥦',
    description:
      'A cool-season vegetable crop cultivated for its edible curd.',
    soil:
      'Fertile loam with good drainage.',
    waterRequirement:
      'Moderate to high.',
    commonDiseases: [
      'Downy Mildew',
      'Black Rot',
      'Clubroot',
    ],
    commonPests: [
      'Diamondback Moth',
      'Aphids',
      'Cabbage Caterpillar',
    ],
  },

  {
    id: 'crop-29',
    name: 'Peas',
    scientificName: 'Pisum sativum',
    category: 'Vegetables',
    icon: '🫛',
    description:
      'A cool-season pulse and vegetable crop grown for green peas and seed.',
    soil:
      'Well-drained loam and sandy-loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Powdery Mildew',
      'Downy Mildew',
      'Wilt',
    ],
    commonPests: [
      'Aphids',
      'Pod Borer',
      'Leaf Miner',
    ],
  },

  {
    id: 'crop-30',
    name: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Vegetables',
    icon: '🥕',
    description:
      'A root vegetable crop grown mainly during cooler seasons.',
    soil:
      'Deep loose sandy-loam soils are preferred.',
    waterRequirement:
      'Moderate and uniform.',
    commonDiseases: [
      'Alternaria Leaf Blight',
      'Cavity Spot',
      'Root Rot',
    ],
    commonPests: [
      'Aphids',
      'Cutworms',
      'Root-Knot Nematodes',
    ],
  },

  {
    id: 'crop-31',
    name: 'Banana',
    scientificName: 'Musa spp.',
    category: 'Fruits',
    icon: '🍌',
    description:
      'A major tropical fruit crop cultivated throughout many parts of India.',
    soil:
      'Deep fertile loam with good drainage.',
    waterRequirement:
      'High and regular.',
    commonDiseases: [
      'Panama Wilt',
      'Sigatoka Leaf Spot',
      'Bunchy Top',
    ],
    commonPests: [
      'Banana Weevil',
      'Thrips',
      'Aphids',
    ],
  },

  {
    id: 'crop-32',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruits',
    icon: '🥭',
    description:
      'A major perennial fruit crop with high commercial and nutritional importance.',
    soil:
      'Deep well-drained soils.',
    waterRequirement:
      'Moderate depending on tree age and climate.',
    commonDiseases: [
      'Powdery Mildew',
      'Anthracnose',
      'Dieback',
    ],
    commonPests: [
      'Mango Hopper',
      'Fruit Fly',
      'Mealybug',
    ],
  },

  {
    id: 'crop-33',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruits',
    icon: '🍇',
    description:
      'A high-value fruit crop important for table grapes, processing and export markets.',
    soil:
      'Deep well-drained soils.',
    waterRequirement:
      'Carefully managed irrigation.',
    commonDiseases: [
      'Downy Mildew',
      'Powdery Mildew',
      'Anthracnose',
    ],
    commonPests: [
      'Mealybugs',
      'Thrips',
      'Flea Beetles',
    ],
  },

  {
    id: 'crop-34',
    name: 'Citrus',
    scientificName: 'Citrus spp.',
    category: 'Fruits',
    icon: '🍊',
    description:
      'A group of important fruit crops including orange, mandarin and lemon.',
    soil:
      'Well-drained loam to sandy-loam soils.',
    waterRequirement:
      'Moderate with irrigation during dry periods.',
    commonDiseases: [
      'Citrus Canker',
      'Gummosis',
      'Greening',
    ],
    commonPests: [
      'Citrus Psylla',
      'Leaf Miner',
      'Aphids',
    ],
  },

  {
    id: 'crop-35',
    name: 'Guava',
    scientificName: 'Psidium guajava',
    category: 'Fruits',
    icon: '🍐',
    description:
      'A hardy fruit crop valued for fresh consumption and processing.',
    soil:
      'Well-drained loam to sandy-loam soils.',
    waterRequirement:
      'Moderate.',
    commonDiseases: [
      'Wilt',
      'Anthracnose',
      'Fruit Rot',
    ],
    commonPests: [
      'Fruit Fly',
      'Bark Eating Caterpillar',
      'Mealybug',
    ],
  },

  {
    id: 'crop-36',
    name: 'Papaya',
    scientificName: 'Carica papaya',
    category: 'Fruits',
    icon: '🍈',
    description:
      'A fast-growing tropical fruit crop cultivated for fresh fruit and papain.',
    soil:
      'Light, fertile and well-drained soils.',
    waterRequirement:
      'Moderate to high with drainage.',
    commonDiseases: [
      'Papaya Ring Spot',
      'Damping Off',
      'Powdery Mildew',
    ],
    commonPests: [
      'Whitefly',
      'Aphids',
      'Mites',
    ],
  },

  {
    id: 'crop-37',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'Fruits',
    icon: '🍎',
    description:
      'A high-value fruit crop suited to relatively dry and irrigated regions.',
    soil:
      'Well-drained medium to light soils.',
    waterRequirement:
      'Moderate and carefully managed.',
    commonDiseases: [
      'Bacterial Blight',
      'Leaf Spot',
      'Fruit Rot',
    ],
    commonPests: [
      'Fruit Borer',
      'Aphids',
      'Thrips',
    ],
  },

  {
    id: 'crop-38',
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruits',
    icon: '🍎',
    description:
      'A temperate fruit crop widely associated with hill and highland production.',
    soil:
      'Deep well-drained loam soils rich in organic matter.',
    waterRequirement:
      'Moderate with reliable irrigation.',
    commonDiseases: [
      'Apple Scab',
      'Powdery Mildew',
      'Fire Blight',
    ],
    commonPests: [
      'Aphids',
      'Codling Moth',
      'San Jose Scale',
    ],
  },

  {
    id: 'crop-39',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    category: 'Spices',
    icon: '🟡',
    description:
      'A major spice and rhizome crop valued for food, colour and curcumin.',
    soil:
      'Well-drained fertile loam soils.',
    waterRequirement:
      'Moderate to high moisture without waterlogging.',
    commonDiseases: [
      'Rhizome Rot',
      'Leaf Spot',
      'Leaf Blotch',
    ],
    commonPests: [
      'Shoot Borer',
      'Rhizome Scale',
    ],
  },

  {
    id: 'crop-40',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Spices',
    icon: '🫚',
    description:
      'A rhizomatous spice crop used widely in food, beverages and traditional preparations.',
    soil:
      'Loose, fertile and well-drained soils.',
    waterRequirement:
      'Regular moisture without waterlogging.',
    commonDiseases: [
      'Soft Rot',
      'Leaf Spot',
      'Bacterial Wilt',
    ],
    commonPests: [
      'Shoot Borer',
      'Rhizome Scale',
    ],
  },

  {
    id: 'crop-41',
    name: 'Tea',
    scientificName: 'Camellia sinensis',
    category: 'Plantation Crops',
    icon: '🍵',
    description:
      'A perennial plantation crop grown for young leaves used to produce tea.',
    soil:
      'Acidic, deep and well-drained soils rich in organic matter.',
    waterRequirement:
      'High and well-distributed rainfall or irrigation.',
    commonDiseases: [
      'Blister Blight',
      'Grey Blight',
      'Root Rot',
    ],
    commonPests: [
      'Tea Mosquito Bug',
      'Red Spider Mite',
      'Looper Caterpillar',
    ],
  },

  {
    id: 'crop-42',
    name: 'Coffee',
    scientificName: 'Coffea arabica',
    category: 'Plantation Crops',
    icon: '☕',
    description:
      'A perennial plantation crop grown for coffee beans in suitable hill and shaded environments.',
    soil:
      'Deep, well-drained slightly acidic soils.',
    waterRequirement:
      'Moderate to high depending on rainfall.',
    commonDiseases: [
      'Coffee Leaf Rust',
      'Berry Disease',
      'Root Rot',
    ],
    commonPests: [
      'Coffee Berry Borer',
      'White Stem Borer',
      'Aphids',
    ],
  },

  {
    id: 'crop-43',
    name: 'Coconut',
    scientificName: 'Cocos nucifera',
    category: 'Plantation Crops',
    icon: '🥥',
    description:
      'A tropical perennial crop providing food, oil, fibre and many value-added products.',
    soil:
      'Well-drained sandy loam to coastal soils.',
    waterRequirement:
      'Moderate to high.',
    commonDiseases: [
      'Bud Rot',
      'Stem Bleeding',
      'Leaf Rot',
    ],
    commonPests: [
      'Rhinoceros Beetle',
      'Red Palm Weevil',
      'Coconut Eriophyid Mite',
    ],
  },
];


/* ============================================================
   DISEASE CATALOG
   ============================================================ */

export const sampleDiseaseCatalog = {
  'rice-blast': {
    id: 'disease-1',
    name: 'Rice Blast',
    scientificName:
      'Magnaporthe oryzae',
    severity: 'High',
    severityColor: '#EF4444',
    confidence: 94.8,

    symptoms:
      'Spindle or diamond-shaped lesions with grayish centers and dark brown reddish borders on leaf blades.',

    organicRemedy:
      'Spray Neem Seed Kernel Extract (5%) or Pseudomonas fluorescens @ 10g/liter water twice at 10-day intervals.',

    chemicalRemedy:
      'Apply Tricyclazole 75% WP @ 0.6 g/liter or Isoprothiolane 40% EC @ 1.5 ml/liter water.',

    dosagePerAcre:
      'Tricyclazole 75% WP: 120 grams in 200 Liters water per Acre.',

    preventiveTips:
      'Avoid excessive nitrogenous fertilizers. Maintain optimum field water level during tillering.',

    audioScript:
      'Rice blast detected with 94.8 percent confidence. Recommended immediate application of Neem Seed Extract or Tricyclazole 120 grams per acre.',

    sampleImage:
      cropImages.rice.diseased,
  },

  'tomato-late-blight': {
    id: 'disease-2',
    name: 'Tomato Late Blight',
    scientificName:
      'Phytophthora infestans',
    severity: 'Critical',
    severityColor: '#DC2626',
    confidence: 97.2,

    symptoms:
      'Large dark green to black water-soaked patches expanding rapidly on foliage with white fungal mold underneath.',

    organicRemedy:
      'Apply Copper Hydroxide / Bordeaux mixture (1%) every 7 days during humid foggy weather.',

    chemicalRemedy:
      'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2g/liter or Dimethomorph 50% WP @ 1g/liter water.',

    dosagePerAcre:
      'Metalaxyl + Mancozeb: 400 grams in 200 Liters water per Acre.',

    preventiveTips:
      'Ensure proper row spacing to enhance airflow. Avoid overhead sprinkler irrigation.',

    audioScript:
      'Critical Alert: Tomato Late Blight detected. Spray Metalaxyl Mancozeb 400g in 200 liters water per acre immediately.',

    sampleImage:
      cropImages.tomato.diseased,
  },

  'cotton-pink-bollworm': {
    id: 'disease-3',
    name: 'Pink Bollworm',
    scientificName:
      'Pectinophora gossypiella',
    severity: 'High',
    severityColor: '#F59E0B',
    confidence: 91.5,

    symptoms:
      'Rosetted flowers that fail to open fully, entry holes plugged with frass, damaged lint and seeds in green bolls.',

    organicRemedy:
      'Install Pheromone traps @ 8 traps/acre. Spray Bacillus thuringiensis (Bt) @ 2 ml/liter water.',

    chemicalRemedy:
      'Spray Profenofos 50% EC @ 2 ml/liter or Emamectin Benzoate 5% SG @ 0.4 g/liter water.',

    dosagePerAcre:
      'Profenofos 50% EC: 400 ml in 200 Liters water per Acre.',

    preventiveTips:
      'Deploy Pheromone traps for male moth surveillance. Avoid late sowing.',

    audioScript:
      'Pink bollworm infestation identified. Deploy 8 pheromone traps per acre and apply Profenofos 400 ml per acre.',

    sampleImage:
      cropImages.cotton.diseased,
  },

  'healthy-maize': {
    id: 'disease-4',
    name: 'Healthy Leaf - No Pathogen',
    scientificName:
      'Vigorous Crop Tissue',
    severity: 'Healthy',
    severityColor: '#10B981',
    confidence: 99.1,

    symptoms:
      'Clean green leaf surface with optimal chlorophyll distribution. No pest larvae or fungal spore activity.',

    organicRemedy:
      'Maintain balanced bio-fertilizer application (Azospirillum & Phosphate Solubilizing Bacteria).',

    chemicalRemedy:
      'No chemical intervention required.',

    dosagePerAcre: 'N/A',

    preventiveTips:
      'Continue regular field scouting and maintain standard crop rotation.',

    audioScript:
      'Crop scan clean. No active disease or pest infection detected.',

    sampleImage:
      cropImages.maize.healthy,
  },
};


/* ============================================================
   PEST CATALOG
   ============================================================ */

export const samplePestCatalog = {
  'cotton-pink-bollworm': {
    id: 'pest-1',
    name: 'Pink Bollworm',
    scientificName:
      'Pectinophora gossypiella',
    crop: 'Cotton',
    severity: 'High',
    confidence: 92.6,

    symptoms:
      'Rosetted flowers, entry holes in green bolls, frass around feeding sites, and damaged lint and seeds.',

    damage:
      'Larvae feed inside flower buds and bolls, reducing lint and seed quality.',

    organicRemedy:
      'Use pheromone traps for monitoring and combine scouting with approved biological control measures.',

    chemicalRemedy:
      'Use only a registered crop-labeled insecticide according to the approved product label and local agricultural recommendations.',

    dosagePerAcre:
      'Follow the registered product label for the exact dose and spray volume.',

    preventiveTips:
      'Scout flowering and boll development regularly, deploy pheromone traps, and avoid late sowing where recommended.',

    audioScript:
      'Pink bollworm infestation identified. Inspect cotton bolls regularly and use integrated pest management measures.',

    sampleImage:
      cropImages.cotton.diseased,
  },

  'fall-armyworm': {
    id: 'pest-2',
    name: 'Fall Armyworm',
    scientificName:
      'Spodoptera frugiperda',
    crop: 'Maize (Corn)',
    severity: 'High',
    confidence: 95.1,

    symptoms:
      'Ragged holes, windowing and heavy feeding damage around the whorl of young maize plants; frass may accumulate inside the whorl.',

    damage:
      'Larvae feed on maize leaves and whorl tissue and can severely reduce crop growth when infestations are high.',

    organicRemedy:
      'Use frequent field scouting, hand removal where practical, and approved biological control or biopesticide options.',

    chemicalRemedy:
      'Use only a registered crop-labeled insecticide according to the approved product label and local agricultural recommendations.',

    dosagePerAcre:
      'Follow the registered product label for the exact dose and spray volume.',

    preventiveTips:
      'Scout maize early, inspect whorls, destroy heavily infested plant material where appropriate, and use integrated pest management.',

    audioScript:
      'Fall armyworm signs detected in maize. Inspect plant whorls regularly and follow integrated pest management guidance.',

    sampleImage:
      cropImages.maize.diseased,
  },

  'brown-planthopper': {
    id: 'pest-3',
    name: 'Brown Planthopper',
    scientificName:
      'Nilaparvata lugens',
    crop: 'Rice (Paddy)',
    severity: 'High',
    confidence: 90.8,

    symptoms:
      'Yellowing and drying of rice plants in patches, often starting from the base, with hopper populations around the plant stem.',

    damage:
      'Nymphs and adults suck plant sap and can cause hopper burn and rapid crop decline.',

    organicRemedy:
      'Avoid excessive nitrogen, maintain suitable spacing and monitor lower plant stems regularly.',

    chemicalRemedy:
      'Use only a registered rice-labeled insecticide according to the approved product label and local recommendations.',

    dosagePerAcre:
      'Follow the registered product label for exact application rate.',

    preventiveTips:
      'Avoid excessive nitrogen fertilizer, maintain field hygiene, monitor hopper populations and conserve beneficial insects.',

    audioScript:
      'Brown planthopper risk detected in rice. Inspect plant bases and follow integrated pest management practices.',

    sampleImage:
      cropImages.rice.diseased,
  },

  'whitefly': {
    id: 'pest-4',
    name: 'Whitefly',
    scientificName:
      'Bemisia tabaci',
    crop: 'Cotton',
    severity: 'Moderate',
    confidence: 89.4,

    symptoms:
      'Small white insects on leaf undersides, yellowing, honeydew deposition and possible sooty mould.',

    damage:
      'Adults and nymphs suck sap and may also contribute to virus transmission in susceptible crops.',

    organicRemedy:
      'Use yellow sticky traps, conserve natural enemies and remove heavily infested leaves where practical.',

    chemicalRemedy:
      'Use only a registered crop-labeled insecticide according to the approved product label and local agricultural recommendations.',

    dosagePerAcre:
      'Follow the registered product label for exact application rate.',

    preventiveTips:
      'Monitor leaf undersides, avoid unnecessary broad-spectrum sprays and maintain field sanitation.',

    audioScript:
      'Whitefly pressure detected. Inspect leaf undersides and use integrated pest management measures.',

    sampleImage:
      cropImages.cotton.diseased,
  },

  'fruit-borer': {
    id: 'pest-5',
    name: 'Tomato Fruit Borer',
    scientificName:
      'Helicoverpa armigera',
    crop: 'Tomato',
    severity: 'High',
    confidence: 91.7,

    symptoms:
      'Circular bore holes in developing fruits, feeding damage around the entry point and frass near damaged tissue.',

    damage:
      'Larvae bore into fruits and can cause direct yield loss and secondary rotting.',

    organicRemedy:
      'Use pheromone traps, bird perches, regular scouting and approved biological control options.',

    chemicalRemedy:
      'Use only a registered tomato-labeled insecticide according to the approved product label and local agricultural recommendations.',

    dosagePerAcre:
      'Follow the registered product label for exact application rate.',

    preventiveTips:
      'Scout flowering and fruiting stages, remove damaged fruits and use integrated pest management.',

    audioScript:
      'Fruit borer signs detected in tomato. Inspect developing fruits and follow integrated pest management.',

    sampleImage:
      cropImages.tomato.diseased,
  },
};


/* ============================================================
   OUTBREAK DATA
   ============================================================ */

export const initialOutbreaks = [
  {
    id: 'ob-101',
    district: 'Ludhiana, Punjab',
    lat: 30.901,
    lng: 75.8573,
    crop: 'Rice (Paddy)',
    disease: 'Rice Blast',
    severity: 'High',
    infectedAcres: 1420,
    activeFarms: 38,
    status: 'Active Warning',
    updatedAt: '2 hours ago',
  },

  {
    id: 'ob-102',
    district:
      'Nashik, Maharashtra',
    lat: 19.9975,
    lng: 73.7898,
    crop: 'Tomato',
    disease: 'Tomato Late Blight',
    severity: 'Critical',
    infectedAcres: 890,
    activeFarms: 52,
    status: 'Emergency Alert',
    updatedAt: '30 mins ago',
  },

  {
    id: 'ob-103',
    district:
      'Guntur, Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    crop: 'Cotton',
    disease: 'Pink Bollworm',
    severity: 'Moderate',
    infectedAcres: 640,
    activeFarms: 21,
    status: 'Surveillance Active',
    updatedAt: '5 hours ago',
  },

  {
    id: 'ob-104',
    district:
      'Varanasi, Uttar Pradesh',
    lat: 25.3176,
    lng: 82.9739,
    crop: 'Rice (Paddy)',
    disease: 'Bacterial Blight',
    severity: 'Moderate',
    infectedAcres: 410,
    activeFarms: 14,
    status: 'Under Control',
    updatedAt: '1 day ago',
  },

  {
    id: 'ob-105',
    district:
      'Salem, Tamil Nadu',
    lat: 11.6643,
    lng: 78.146,
    crop: 'Maize',
    disease: 'Fall Armyworm',
    severity: 'High',
    infectedAcres: 780,
    activeFarms: 29,
    status: 'Active Warning',
    updatedAt: '3 hours ago',
  },
];


/* ============================================================
   INITIAL SCANS
   ============================================================ */

export const initialScans = [
  {
    id: 'scan-8801',

    farmerName:
      'Ramesh Patel',

    location:
      'Ludhiana, Block B',

    lat:
      30.901,

    lng:
      75.8573,

    crop:
      'Rice (Paddy)',

    disease:
      'Rice Blast',

    detectionType:
      'disease',

    confidence:
      94.8,

    severity:
      'High',

    date:
      '2026-08-22',

    status:
      'Expert Verified',

    expertNotes:
      'Confirmed Rice Blast symptoms. Approved Tricyclazole treatment plan.',

    image:
      cropImages.rice.diseased,

    recoveryWeek:
      2,

    beforeAfterImage: {
      before:
        cropImages.rice.diseased,

      after:
        cropImages.rice.healthy,
    },
  },

  {
    id: 'scan-8802',

    farmerName:
      'Suresh Kumar',

    location:
      'Nashik, Sector 4',

    lat:
      19.9975,

    lng:
      73.7898,

    crop:
      'Tomato',

    disease:
      'Tomato Late Blight',

    detectionType:
      'disease',

    confidence:
      97.2,

    severity:
      'Critical',

    date:
      '2026-08-22',

    status:
      'AI Identified',

    expertNotes:
      'Pending review by Dr. V. Sharma',

    image:
      cropImages.tomato.diseased,

    recoveryWeek:
      1,

    beforeAfterImage: {
      before:
        cropImages.tomato.diseased,

      after:
        cropImages.tomato.healthy,
    },
  },
];


/* ============================================================
   FIELD VISITS
   ============================================================ */

export const initialFieldVisits = [
  {
    id:
      'visit-301',

    farmerName:
      'Gurpreet Singh',

    phone:
      '+91 98765 43210',

    village:
      'Gill Village, Ludhiana',

    crop:
      'Rice (Paddy)',

    scheduledDate:
      '2026-08-23',

    priority:
      'High',

    status:
      'Scheduled',

    purpose:
      'Verify suspected Sheath Blight outbreak and collect soil sample for central agri-lab testing.',

    lat:
      30.85,

    lng:
      75.82,
  },

  {
    id:
      'visit-302',

    farmerName:
      'Kavita Devi',

    phone:
      '+91 98123 76543',

    village:
      'Pimpalgaon, Nashik',

    crop:
      'Tomato',

    scheduledDate:
      '2026-08-23',

    priority:
      'Urgent',

    status:
      'In Progress',

    purpose:
      'Deploy pheromone traps and inspect late blight fungus spread on 4-acre field.',

    lat:
      20.1,

    lng:
      73.9,
  },
];