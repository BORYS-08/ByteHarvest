import {
  initialCropsData,
  sampleDiseaseCatalog,
  samplePestCatalog,
  initialOutbreaks,
  initialScans,
  initialFieldVisits,
} from './mockData';


/* ============================================================
   LOCAL STORAGE HELPERS
   ============================================================ */

const STORAGE_PREFIX =
  'agrivision_';


const getStored = (
  key,
  fallback
) => {
  try {
    const item =
      localStorage.getItem(
        `${STORAGE_PREFIX}${key}`
      );

    return item
      ? JSON.parse(item)
      : fallback;

  } catch (err) {

    console.warn(
      `LocalStorage read failed for ${key}`,
      err
    );

    return fallback;
  }
};


const setStored = (
  key,
  data
) => {

  try {

    localStorage.setItem(
      `${STORAGE_PREFIX}${key}`,
      JSON.stringify(data)
    );

  } catch (err) {

    console.warn(
      `LocalStorage write failed for ${key}`,
      err
    );

  }
};


/* ============================================================
   SIMULATED API LATENCY
   ============================================================ */

const delay = (
  ms = 150
) =>
  new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );


/* ============================================================
   HELPERS
   ============================================================ */

const createScanId = () =>
  `scan-${Math.floor(
    1000 +
      Math.random() * 9000
  )}`;


const createOutbreakId = () =>
  `ob-${Date.now()}`;


const createVisitId = () =>
  `visit-${Date.now()}`;


const getToday = () =>
  new Date()
    .toISOString()
    .split('T')[0];


const getRandomIndianCoordinates = () => ({
  lat:
    20.5937 +
    (Math.random() - 0.5) * 5,

  lng:
    78.9629 +
    (Math.random() - 0.5) * 5,
});


/* ============================================================
   NORMALIZE PEST RESULT
   ============================================================ */

const normalizePestResult = (
  pestInfo
) => {

  if (!pestInfo) {
    return null;
  }

  return {
    id:
      pestInfo.id,

    name:
      pestInfo.name,

    pest:
      pestInfo.name,

    scientificName:
      pestInfo.scientificName,

    crop:
      pestInfo.crop,

    severity:
      pestInfo.severity ||
      pestInfo.riskLevel ||
      'Moderate',

    riskLevel:
      pestInfo.riskLevel ||
      pestInfo.severity ||
      'Moderate',

    confidence:
      pestInfo.confidence ??
      null,

    pestCount:
      pestInfo.pestCount ??
      null,

    symptoms:
      pestInfo.symptoms ||
      '',

    damage:
      pestInfo.damage ||
      '',

    organicRemedy:
      pestInfo.organicRemedy ||
      '',

    chemicalRemedy:
      pestInfo.chemicalRemedy ||
      '',

    dosagePerAcre:
      pestInfo.dosagePerAcre ||
      null,

    preventiveTips:
      pestInfo.preventiveTips ||
      '',

    audioScript:
      pestInfo.audioScript ||
      '',

    sampleImage:
      pestInfo.sampleImage ||
      null,
  };
};


/* ============================================================
   NORMALIZE DISEASE RESULT
   ============================================================ */

const normalizeDiseaseResult = (
  diseaseInfo
) => {

  if (!diseaseInfo) {
    return null;
  }

  return {
    id:
      diseaseInfo.id,

    name:
      diseaseInfo.name,

    disease:
      diseaseInfo.name,

    scientificName:
      diseaseInfo.scientificName,

    severity:
      diseaseInfo.severity ||
      'Moderate',

    riskLevel:
      diseaseInfo.severity ||
      'Moderate',

    confidence:
      diseaseInfo.confidence ??
      null,

    severityColor:
      diseaseInfo.severityColor ||
      null,

    symptoms:
      diseaseInfo.symptoms ||
      '',

    organicRemedy:
      diseaseInfo.organicRemedy ||
      '',

    chemicalRemedy:
      diseaseInfo.chemicalRemedy ||
      '',

    dosagePerAcre:
      diseaseInfo.dosagePerAcre ||
      null,

    preventiveTips:
      diseaseInfo.preventiveTips ||
      '',

    audioScript:
      diseaseInfo.audioScript ||
      '',

    sampleImage:
      diseaseInfo.sampleImage ||
      null,
  };
};


/* ============================================================
   MOCK API
   ============================================================ */

export const mockApi = {

  /* ==========================================================
     1. CROP CATALOG
     ========================================================== */

  async getCropCatalog() {

    await delay();

    return initialCropsData;
  },


  /* ==========================================================
     2. DISEASE CATALOG
     ========================================================== */

  async getDiseaseCatalog() {

    await delay();

    return sampleDiseaseCatalog;
  },


  /* ==========================================================
     3. PEST CATALOG
     ========================================================== */

  async getPestCatalog() {

    await delay();

    return samplePestCatalog;
  },


  /* ==========================================================
     4. OUTBREAKS
     ========================================================== */

  async getOutbreaks() {

    await delay();

    return getStored(
      'outbreaks',
      initialOutbreaks
    );
  },


  /* ==========================================================
     5. CREATE OUTBREAK
     ========================================================== */

  async createOutbreak(
    outbreak
  ) {

    await delay();

    const current =
      getStored(
        'outbreaks',
        initialOutbreaks
      );


    const newEntry = {
      ...outbreak,

      id:
        outbreak?.id ||
        createOutbreakId(),

      updatedAt:
        'Just now',
    };


    const updated = [
      newEntry,
      ...current,
    ];


    setStored(
      'outbreaks',
      updated
    );


    return newEntry;
  },


  /* ==========================================================
     6. SCAN HISTORY
     ========================================================== */

  async getScans() {

    await delay();

    return getStored(
      'scans',
      initialScans
    );
  },


  /* ==========================================================
     7. AI SCAN
     ========================================================== */

  async analyzeLeafScan({
    sampleKey,
    customImage,
    cropName,
    farmerName =
      'Farmer Demo',
    location =
      'Local Field',
    detectionType =
      'disease',
  }) {

    await delay(600);


    /* ========================================================
       DISEASE DETECTION
       ======================================================== */

    if (
      detectionType ===
      'disease'
    ) {

      const diseaseInfo =
        normalizeDiseaseResult(
          sampleDiseaseCatalog[
            sampleKey
          ] ||
            sampleDiseaseCatalog[
              'rice-blast'
            ]
        );


      if (!diseaseInfo) {
        throw new Error(
          'Disease analysis data is unavailable.'
        );
      }


      const coordinates =
        getRandomIndianCoordinates();


      const newScan = {

        id:
          createScanId(),

        farmerName,

        location,

        lat:
          coordinates.lat,

        lng:
          coordinates.lng,

        crop:
          cropName ||
          (
            diseaseInfo.name
              ?.toLowerCase()
              .includes(
                'tomato'
              )
              ? 'Tomato'
              : diseaseInfo.name
                  ?.toLowerCase()
                  .includes(
                    'pink bollworm'
                  )
                ? 'Cotton'
                : 'Rice (Paddy)'
          ),

        detectionType:
          'disease',

        disease:
          diseaseInfo.disease,

        pest:
          null,

        scientificName:
          diseaseInfo.scientificName,

        confidence:
          diseaseInfo.confidence,

        severity:
          diseaseInfo.severity,

        riskLevel:
          diseaseInfo.riskLevel,

        pestCount:
          null,

        severityColor:
          diseaseInfo.severityColor,

        date:
          getToday(),

        status:
          'AI Identified',

        expertNotes:
          'Flagged for expert verification',

        image:
          customImage ||
          diseaseInfo.sampleImage,

        symptoms:
          diseaseInfo.symptoms,

        organicRemedy:
          diseaseInfo.organicRemedy,

        chemicalRemedy:
          diseaseInfo.chemicalRemedy,

        dosagePerAcre:
          diseaseInfo.dosagePerAcre,

        preventiveTips:
          diseaseInfo.preventiveTips,

        audioScript:
          diseaseInfo.audioScript,

      };


      /* ======================================================
         SAVE SCAN
      ======================================================= */

      const currentScans =
        getStored(
          'scans',
          initialScans
        );


      const updatedScans = [
        newScan,
        ...currentScans,
      ];


      setStored(
        'scans',
        updatedScans
      );


      /* ======================================================
         OUTBREAK CREATION
      ======================================================= */

      if (
        newScan.severity ===
          'High' ||
        newScan.severity ===
          'Critical'
      ) {

        const outbreaks =
          getStored(
            'outbreaks',
            initialOutbreaks
          );


        const newOutbreak = {

          id:
            createOutbreakId(),

          district:
            location,

          lat:
            newScan.lat,

          lng:
            newScan.lng,

          crop:
            newScan.crop,

          disease:
            newScan.disease,

          pest:
            null,

          detectionType:
            'disease',

          severity:
            newScan.severity,

          riskLevel:
            newScan.riskLevel,

          infectedAcres:
            Math.floor(
              50 +
                Math.random() *
                  300
            ),

          activeFarms:
            1,

          status:
            'Active Warning',

          updatedAt:
            'Just now',

        };


        setStored(
          'outbreaks',
          [
            newOutbreak,
            ...outbreaks,
          ]
        );

      }


      return newScan;
    }


    /* ========================================================
       PEST DETECTION
       ======================================================== */

    const pestInfo =
      normalizePestResult(
        samplePestCatalog[
          sampleKey
        ] ||
          samplePestCatalog[
            'cotton-pink-bollworm'
          ]
      );


    if (!pestInfo) {
      throw new Error(
        'Pest analysis data is unavailable.'
      );
    }


    const coordinates =
      getRandomIndianCoordinates();


    const newPestScan = {

      id:
        createScanId(),

      farmerName,

      location,

      lat:
        coordinates.lat,

      lng:
        coordinates.lng,

      crop:
        cropName ||
        pestInfo.crop ||
        'Unknown Crop',

      detectionType:
        'pest',

      disease:
        null,

      pest:
        pestInfo.pest,

      scientificName:
        pestInfo.scientificName,

      confidence:
        pestInfo.confidence,

      severity:
        pestInfo.severity,

      riskLevel:
        pestInfo.riskLevel,

      pestCount:
        pestInfo.pestCount,

      severityColor:
        pestInfo.riskLevel ===
        'Critical'
          ? '#DC2626'
          : pestInfo.riskLevel ===
              'High'
            ? '#F59E0B'
            : pestInfo.riskLevel ===
                'Moderate'
              ? '#3B82F6'
              : '#22C55E',

      date:
        getToday(),

      status:
        'AI Identified',

      expertNotes:
        'Flagged for expert verification',

      image:
        customImage ||
        pestInfo.sampleImage,

      symptoms:
        pestInfo.symptoms,

      damage:
        pestInfo.damage,

      organicRemedy:
        pestInfo.organicRemedy,

      chemicalRemedy:
        pestInfo.chemicalRemedy,

      dosagePerAcre:
        pestInfo.dosagePerAcre,

      preventiveTips:
        pestInfo.preventiveTips,

      audioScript:
        pestInfo.audioScript,

    };


    /* ========================================================
       SAVE PEST SCAN
    ======================================================== */

    const currentScans =
      getStored(
        'scans',
        initialScans
      );


    const updatedScans = [
      newPestScan,
      ...currentScans,
    ];


    setStored(
      'scans',
      updatedScans
    );


    /* ========================================================
       PEST OUTBREAK
    ======================================================== */

    if (
      newPestScan.riskLevel ===
        'High' ||
      newPestScan.riskLevel ===
        'Critical'
    ) {

      const outbreaks =
        getStored(
          'outbreaks',
          initialOutbreaks
        );


      const newOutbreak = {

        id:
          createOutbreakId(),

        district:
          location,

        lat:
          newPestScan.lat,

        lng:
          newPestScan.lng,

        crop:
          newPestScan.crop,

        disease:
          null,

        pest:
          newPestScan.pest,

        detectionType:
          'pest',

        severity:
          newPestScan.severity,

        riskLevel:
          newPestScan.riskLevel,

        infectedAcres:
          Math.floor(
            20 +
              Math.random() *
                200
          ),

        activeFarms:
          1,

        status:
          'Active Warning',

        updatedAt:
          'Just now',

      };


      setStored(
        'outbreaks',
        [
          newOutbreak,
          ...outbreaks,
        ]
      );

    }


    return newPestScan;
  },


  /* ==========================================================
     8. VERIFY SCAN
     ========================================================== */

  async verifyScan(
    scanId,
    expertNotes,
    status =
      'Expert Verified'
  ) {

    await delay();


    const scans =
      getStored(
        'scans',
        initialScans
      );


    const updated =
      scans.map(
        (scan) =>
          scan.id ===
          scanId
            ? {
                ...scan,

                status,

                expertNotes:
                  expertNotes ||
                  scan.expertNotes,
              }
            : scan
      );


    setStored(
      'scans',
      updated
    );


    return updated.find(
      (scan) =>
        scan.id ===
        scanId
    );
  },


  /* ==========================================================
     9. FIELD VISITS
     ========================================================== */

  async getFieldVisits() {

    await delay();

    return getStored(
      'visits',
      initialFieldVisits
    );
  },


  /* ==========================================================
     10. CREATE FIELD VISIT
     ========================================================== */

  async createFieldVisit(
    visit
  ) {

    await delay();


    const visits =
      getStored(
        'visits',
        initialFieldVisits
      );


    const newVisit = {

      ...visit,

      id:
        visit?.id ||
        createVisitId(),

      status:
        visit?.status ||
        'Scheduled',

    };


    const updated = [
      newVisit,
      ...visits,
    ];


    setStored(
      'visits',
      updated
    );


    return newVisit;
  },

};