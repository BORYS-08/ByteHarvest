import React, {
  useMemo,
  useState,
} from 'react';

import { useApp } from '../../context/AppContext';

import {
  initialCropsData,
  sampleDiseaseCatalog,
  samplePestCatalog,
} from '../../services/mockData';

import {
  LuCalculator,
  LuDroplets,
  LuShieldCheck,
  LuSprout,
  LuFlaskConical,
  LuBug,
  LuCircleAlert,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    engine:
      'Safe Input Optimization Engine',

    title:
      'Precision Pesticide & Dilution Calculator',

    badge:
      'Prevents Overuse & Residue Loss',

    fieldParameters:
      'Field Parameters',

    target:
      'Target Pathogen / Pest',

    treatment:
      'Treatment Protocol',

    organic:
      'Organic / Bio',

    chemical:
      'Chemical',

    plotSize:
      'Plot Size (Land Acreage)',

    acres:
      'Acres',

    calculated:
      'Calculated Mix Requirements',

    precision:
      'Precision Dosage',

    bioRequired:
      'Bio-Pesticide Required',

    chemicalQuantity:
      'Active Chemical Quantity',

    unit:
      'Unit',

    activeIngredient:
      'Treatment',

    totalWater:
      'Total Spray Water',

    waterCoverage:
      'Water for optimal coverage',

    tanks:
      '15L Knapsack Tanks',

    tanksRequired:
      'Tanks',

    fullSprays:
      'Full pump sprays required',

    inputCost:
      'Estimated Input Cost',

    marketRates:
      'Based on configured demo rates',

    safetyRule:
      'Safe Application Rule:',

    safetyText:
      'Apply spray early morning (6:00 - 9:00 AM) or late evening to reduce rapid evaporation and protect beneficial pollinators.',

    acreageLabel:
      'Land acreage',

    noNumericConfig:
      'This target does not have a numeric dosage configuration yet.',

    unavailable:
      'Not configured',

    configureMessage:
      'The treatment information exists in the knowledge catalog, but a numeric field dosage is not configured for this target.',

    disease:
      'Disease',

    pest:
      'Pest',

    crop:
      'Crop',

    category:
      'Category',

    reset:
      'Reset',

    selectTarget:
      'Select a treatment target',

    amount:
      'Amount',

    perAcre:
      'Per acre',

    organicUnit:
      'Configured organic unit',

    chemicalUnit:
      'Configured chemical unit',

    noCost:
      'Cost not configured',

    additionalInfo:
      'Additional Information',
  },

  hi: {
    engine:
      'सुरक्षित इनपुट अनुकूलन इंजन',

    title:
      'सटीक कीटनाशक और घोल कैलकुलेटर',

    badge:
      'अधिक उपयोग और अवशेष हानि से बचाएँ',

    fieldParameters:
      'खेत के मानदंड',

    target:
      'रोग / कीट',

    treatment:
      'उपचार विधि',

    organic:
      'जैविक / बायो',

    chemical:
      'रासायनिक',

    plotSize:
      'खेत का क्षेत्रफल',

    acres:
      'एकड़',

    calculated:
      'मिश्रण की आवश्यक मात्रा',

    precision:
      'सटीक मात्रा',

    bioRequired:
      'आवश्यक जैव-कीटनाशक',

    chemicalQuantity:
      'सक्रिय रासायनिक मात्रा',

    unit:
      'इकाई',

    activeIngredient:
      'उपचार',

    totalWater:
      'कुल स्प्रे पानी',

    waterCoverage:
      'बेहतर कवरेज के लिए पानी',

    tanks:
      '15 लीटर पंप टैंक',

    tanksRequired:
      'टैंक',

    fullSprays:
      'आवश्यक पूर्ण स्प्रे',

    inputCost:
      'अनुमानित इनपुट लागत',

    marketRates:
      'कॉन्फ़िगर किए गए डेमो दरों के आधार पर',

    safetyRule:
      'सुरक्षित उपयोग नियम:',

    safetyText:
      'सुबह 6:00 से 9:00 बजे या शाम को स्प्रे करें ताकि तेज वाष्पीकरण कम हो और लाभकारी परागणकों की रक्षा हो सके।',

    acreageLabel:
      'खेत का क्षेत्रफल',

    noNumericConfig:
      'इस लक्ष्य के लिए अभी संख्यात्मक मात्रा कॉन्फ़िगर नहीं की गई है।',

    unavailable:
      'कॉन्फ़िगर नहीं',

    configureMessage:
      'उपचार की जानकारी ज्ञान कैटलॉग में उपलब्ध है, लेकिन इस लक्ष्य के लिए संख्यात्मक खेत मात्रा कॉन्फ़िगर नहीं है।',

    disease:
      'रोग',

    pest:
      'कीट',

    crop:
      'फसल',

    category:
      'श्रेणी',

    reset:
      'रीसेट',

    selectTarget:
      'उपचार लक्ष्य चुनें',

    amount:
      'मात्रा',

    perAcre:
      'प्रति एकड़',

    organicUnit:
      'कॉन्फ़िगर की गई जैविक इकाई',

    chemicalUnit:
      'कॉन्फ़िगर की गई रासायनिक इकाई',

    noCost:
      'लागत कॉन्फ़िगर नहीं',

    additionalInfo:
      'अतिरिक्त जानकारी',
  },

  mr: {
    engine:
      'सुरक्षित इनपुट ऑप्टिमायझेशन इंजिन',

    title:
      'अचूक कीटकनाशक आणि द्रावण कॅल्क्युलेटर',

    badge:
      'अति वापर आणि अवशेष नुकसान टाळा',

    fieldParameters:
      'शेताचे मापदंड',

    target:
      'रोग / कीड',

    treatment:
      'उपचार पद्धत',

    organic:
      'सेंद्रिय / जैविक',

    chemical:
      'रासायनिक',

    plotSize:
      'शेताचे क्षेत्रफळ',

    acres:
      'एकर',

    calculated:
      'मिश्रणाची आवश्यक मात्रा',

    precision:
      'अचूक मात्रा',

    bioRequired:
      'आवश्यक जैव-कीटकनाशक',

    chemicalQuantity:
      'सक्रिय रासायनिक मात्रा',

    unit:
      'एकक',

    activeIngredient:
      'उपचार',

    totalWater:
      'एकूण फवारणीचे पाणी',

    waterCoverage:
      'योग्य कव्हरेजसाठी पाणी',

    tanks:
      '15 लिटर पंप टाक्या',

    tanksRequired:
      'टाक्या',

    fullSprays:
      'आवश्यक पूर्ण फवारण्या',

    inputCost:
      'अंदाजे इनपुट खर्च',

    marketRates:
      'कॉन्फिगर केलेल्या डेमो दरांवर आधारित',

    safetyRule:
      'सुरक्षित वापर नियम:',

    safetyText:
      'फवारणी सकाळी 6:00 ते 9:00 किंवा संध्याकाळी करा, ज्यामुळे जलद बाष्पीभवन कमी होईल आणि उपयुक्त परागीभवन करणाऱ्या कीटकांचे संरक्षण होईल.',

    acreageLabel:
      'शेताचे क्षेत्रफळ',

    noNumericConfig:
      'या लक्ष्यासाठी अद्याप संख्यात्मक मात्रा कॉन्फिगर केलेली नाही.',

    unavailable:
      'कॉन्फिगर केलेले नाही',

    configureMessage:
      'उपचाराची माहिती ज्ञान कॅटलॉगमध्ये उपलब्ध आहे, परंतु या लक्ष्याकरिता संख्यात्मक शेत मात्रा कॉन्फिगर केलेली नाही.',

    disease:
      'रोग',

    pest:
      'कीड',

    crop:
      'पीक',

    category:
      'वर्ग',

    reset:
      'रीसेट',

    selectTarget:
      'उपचार लक्ष्य निवडा',

    amount:
      'मात्रा',

    perAcre:
      'प्रति एकर',

    organicUnit:
      'कॉन्फिगर केलेले जैविक एकक',

    chemicalUnit:
      'कॉन्फिगर केलेले रासायनिक एकक',

    noCost:
      'खर्च कॉन्फिगर केलेला नाही',

    additionalInfo:
      'अतिरिक्त माहिती',
  },
};


/* ============================================================
   NUMERIC CALCULATOR CONFIGURATION
   ============================================================

   These values preserve the existing calibrated demo presets
   from the original calculator.

   Additional knowledge-catalog entries appear automatically,
   but remain marked as unavailable until numeric field dosage
   data is configured.
   ============================================================ */

const calculatorConfig = {
  'Rice Blast': {
    treatmentType: 'disease',

    chemicalName:
      'Tricyclazole 75% WP',

    chemicalPerAcre:
      120,

    chemicalUnit:
      'grams',

    waterPerAcre:
      200,

    organicName:
      'Neem Seed Kernel Extract (5%)',

    organicPerAcre:
      5,

    organicUnit:
      '%',

    costPerAcre:
      350,
  },

  'Tomato Late Blight': {
    treatmentType: 'disease',

    chemicalName:
      'Metalaxyl 8% + Mancozeb 64% WP',

    chemicalPerAcre:
      400,

    chemicalUnit:
      'grams',

    waterPerAcre:
      200,

    organicName:
      'Copper Hydroxide (1%)',

    organicPerAcre:
      2,

    organicUnit:
      'grams/L',

    costPerAcre:
      520,
  },

  'Pink Bollworm': {
    treatmentType: 'pest',

    chemicalName:
      'Profenofos 50% EC',

    chemicalPerAcre:
      400,

    chemicalUnit:
      'ml',

    waterPerAcre:
      200,

    organicName:
      'Bacillus thuringiensis (Bt)',

    organicPerAcre:
      800,

    organicUnit:
      'ml',

    costPerAcre:
      480,
  },

  'Fall Armyworm': {
    treatmentType: 'pest',

    chemicalName:
      'Emamectin Benzoate 5% SG',

    chemicalPerAcre:
      80,

    chemicalUnit:
      'grams',

    waterPerAcre:
      200,

    organicName:
      'Metarhizium anisopliae',

    organicPerAcre:
      1,

    organicUnit:
      'kg',

    costPerAcre:
      410,
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getTargetCrop = (
  targetName
) => {

  const disease =
    Object.values(
      sampleDiseaseCatalog || {}
    ).find(
      (item) =>
        item.name ===
        targetName
    );

  if (disease) {

    if (
      targetName
        .toLowerCase()
        .includes('tomato')
    ) {
      return 'Tomato';
    }

    if (
      targetName
        .toLowerCase()
        .includes(
          'pink bollworm'
        )
    ) {
      return 'Cotton';
    }

    return 'Rice (Paddy)';
  }


  const pest =
    Object.values(
      samplePestCatalog || {}
    ).find(
      (item) =>
        item.name ===
        targetName
    );

  return (
    pest?.crop ||
    '—'
  );
};


const getTargetMeta = (
  targetName
) => {

  const disease =
    Object.values(
      sampleDiseaseCatalog || {}
    ).find(
      (item) =>
        item.name ===
        targetName
    );

  if (disease) {
    return {
      type: 'disease',
      data: disease,
    };
  }


  const pest =
    Object.values(
      samplePestCatalog || {}
    ).find(
      (item) =>
        item.name ===
        targetName
    );

  if (pest) {
    return {
      type: 'pest',
      data: pest,
    };
  }


  return {
    type: null,
    data: null,
  };
};


/* ============================================================
   COMPONENT
   ============================================================ */

export const DosageCalculator = () => {

  const {
    language,
  } = useApp();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    selectedTarget,
    setSelectedTarget,
  ] = useState(
    'Rice Blast'
  );


  const [
    acreage,
    setAcreage,
  ] = useState(2.5);


  const [
    treatmentType,
    setTreatmentType,
  ] = useState('organic');


  /* ==========================================================
     ALL TARGETS
     ========================================================== */

  const targets =
    useMemo(() => {

      const diseaseNames =
        Object.values(
          sampleDiseaseCatalog || {}
        )
          .map(
            (item) =>
              item.name
          )
          .filter(Boolean);


      const pestNames =
        Object.values(
          samplePestCatalog || {}
        )
          .map(
            (item) =>
              item.name
          )
          .filter(Boolean);


      return [
        ...new Set([
          ...diseaseNames,
          ...pestNames,
        ]),
      ];

    }, []);


  /* ==========================================================
     CURRENT TARGET METADATA
     ========================================================== */

  const targetMeta =
    useMemo(
      () =>
        getTargetMeta(
          selectedTarget
        ),
      [selectedTarget]
    );


  const currentPreset =
    calculatorConfig[
      selectedTarget
    ] || null;


  /* ==========================================================
     DERIVED VALUES
     ========================================================== */

  const hasNumericConfig =
    Boolean(
      currentPreset &&
        Number.isFinite(
          currentPreset
            .chemicalPerAcre
        ) &&
        Number.isFinite(
          currentPreset
            .waterPerAcre
        )
    );


  const totalChemical =
    hasNumericConfig
      ? Math.round(
          currentPreset
            .chemicalPerAcre *
            acreage
        )
      : null;


  const totalOrganic =
    hasNumericConfig &&
    Number.isFinite(
      currentPreset
        ?.organicPerAcre
    )
      ? (
          currentPreset
            .organicPerAcre *
          acreage
        ).toFixed(1)
      : null;


  const totalWater =
    hasNumericConfig
      ? Math.round(
          currentPreset
            .waterPerAcre *
            acreage
        )
      : null;


  const knapsackTanks =
    totalWater !== null
      ? Math.ceil(
          totalWater / 15
        )
      : null;


  const estimatedCost =
    hasNumericConfig &&
    Number.isFinite(
      currentPreset
        ?.costPerAcre
    )
      ? Math.round(
          currentPreset
            .costPerAcre *
          acreage
        )
      : null;


  /* ==========================================================
     HANDLERS
     ========================================================== */

  const handleTargetChange =
    (e) => {

      const nextTarget =
        e.target.value;

      setSelectedTarget(
        nextTarget
      );


      const nextPreset =
        calculatorConfig[
          nextTarget
        ];


      if (
        nextPreset?.treatmentType
      ) {

        setTreatmentType(
          'organic'
        );

      }

    };


  const handleAcreageChange =
    (e) => {

      const value =
        parseFloat(
          e.target.value
        );


      if (
        Number.isNaN(
          value
        )
      ) {
        return;
      }


      setAcreage(
        Math.min(
          25,
          Math.max(
            0.5,
            value
          )
        )
      );

    };


  const resetCalculator =
    () => {

      setSelectedTarget(
        'Rice Blast'
      );

      setAcreage(2.5);

      setTreatmentType(
        'organic'
      );

    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-3"
        style={{
          borderBottom:
            '1px solid var(--border-base)',

          paddingBottom:
            '1rem',
        }}
      >

        <div>

          <p
            className="text-sm uppercase tracking-wide font-semibold"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {text.engine}
          </p>


          <h2
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <LuCalculator className="w-6 h-6 text-green-600 shrink-0" />

            {text.title}

          </h2>

        </div>


        <div className="flex items-center gap-2">

          <span
            className="mono text-sm px-3 py-2 rounded-md"
            style={{
              background:
                'rgba(34,197,94,0.1)',

              color:
                'var(--accent-green)',

              border:
                '1px solid rgba(34,197,94,0.2)',
            }}
          >
            {text.badge}
          </span>


          <button
            type="button"
            onClick={
              resetCalculator
            }
            className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            style={{
              background:
                'var(--bg-surface)',

              color:
                'var(--text-secondary)',

              border:
                '1px solid var(--border-base)',
            }}
          >
            {text.reset}
          </button>

        </div>

      </div>


      {/* ======================================================
          MAIN GRID
      ======================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">


        {/* ====================================================
            INPUTS
        ===================================================== */}

        <div className="lg:col-span-6 space-y-4">

          <div className="card p-5 space-y-5">

            <h3
              className="text-lg font-semibold flex items-center gap-2 pb-3"
              style={{
                borderBottom:
                  '1px solid var(--border-base)',

                color:
                  'var(--text-primary)',
              }}
            >

              <LuSprout className="w-5 h-5 text-green-600" />

              {text.fieldParameters}

            </h3>


            {/* =================================================
                TARGET
            ================================================== */}

            <div className="space-y-2">

              <label
                className="block text-sm font-medium"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {text.target}
              </label>


              <select
                value={
                  selectedTarget
                }
                onChange={
                  handleTargetChange
                }
                className="field-select"
              >

                {targets.map(
                  (target) => (
                    <option
                      key={
                        target
                      }
                      value={
                        target
                      }
                    >
                      {target}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* =================================================
                TARGET INFORMATION
            ================================================== */}

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >

              <div
                className="p-3 rounded-md"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <p className="text-xs uppercase font-semibold text-(--text-tertiary)">
                  {text.category}
                </p>


                <p
                  className="text-sm font-semibold mt-1"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {targetMeta.type ===
                  'pest'
                    ? text.pest
                    : text.disease}
                </p>

              </div>


              <div
                className="p-3 rounded-md"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <p className="text-xs uppercase font-semibold text-(--text-tertiary)">
                  {text.crop}
                </p>


                <p
                  className="text-sm font-semibold mt-1 truncate"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    getTargetCrop(
                      selectedTarget
                    )
                  }
                </p>

              </div>


              <div
                className="p-3 rounded-md"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <p className="text-xs uppercase font-semibold text-(--text-tertiary)">
                  {text.severity}
                </p>


                <p
                  className="text-sm font-semibold mt-1 truncate"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    targetMeta.data
                      ?.severity ||
                    targetMeta.data
                      ?.riskLevel ||
                    '—'
                  }
                </p>

              </div>

            </div>


            {/* =================================================
                TREATMENT
            ================================================== */}

            <div className="space-y-2">

              <label
                className="block text-sm font-medium"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {text.treatment}
              </label>


              <div className="grid grid-cols-2 gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setTreatmentType(
                      'organic'
                    )
                  }
                  className="p-3 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background:
                      treatmentType ===
                      'organic'
                        ? 'var(--bg-overlay)'
                        : 'transparent',

                    color:
                      treatmentType ===
                      'organic'
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',

                    border:
                      treatmentType ===
                      'organic'
                        ? '1px solid var(--border-hi)'
                        : '1px solid var(--border-base)',
                  }}
                >

                  <LuSprout className="w-4 h-4 text-green-600" />

                  {text.organic}

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setTreatmentType(
                      'chemical'
                    )
                  }
                  className="p-3 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background:
                      treatmentType ===
                      'chemical'
                        ? 'var(--bg-overlay)'
                        : 'transparent',

                    color:
                      treatmentType ===
                      'chemical'
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',

                    border:
                      treatmentType ===
                      'chemical'
                        ? '1px solid var(--border-hi)'
                        : '1px solid var(--border-base)',
                  }}
                >

                  <LuFlaskConical className="w-4 h-4 text-sky-600" />

                  {text.chemical}

                </button>

              </div>

            </div>


            {/* =================================================
                ACREAGE
            ================================================== */}

            <div className="space-y-2 pt-1">

              <div className="flex items-center justify-between gap-3">

                <label
                  className="text-sm font-medium"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {text.plotSize}
                </label>


                <span
                  className="mono text-lg font-bold"
                  style={{
                    color:
                      'var(--accent-green)',
                  }}
                >
                  {
                    acreage
                  }{' '}
                  {
                    text.acres
                  }
                </span>

              </div>


              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={
                  acreage
                }
                onChange={
                  handleAcreageChange
                }
                className="w-full accent-green-500 cursor-pointer h-2 rounded-md"
                style={{
                  background:
                    'var(--bg-canvas)',
                }}
                aria-label={
                  text.acreageLabel
                }
              />


              <div
                className="flex justify-between text-sm mono"
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >

                <span>
                  0.5 ac
                </span>

                <span>
                  5 ac
                </span>

                <span>
                  15 ac
                </span>

                <span>
                  25 ac
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            OUTPUT
        ===================================================== */}

        <div className="lg:col-span-6 space-y-4">

          <div
            className="card p-5 space-y-4"
            style={{
              borderLeft:
                '3px solid rgba(34,197,94,0.3)',
            }}
          >

            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3"
              style={{
                borderBottom:
                  '1px solid var(--border-base)',
              }}
            >

              <span
                className="text-sm font-semibold uppercase tracking-wide"
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  text.calculated
                }
              </span>


              <span
                className="mono text-sm px-2 py-1 rounded-md"
                style={{
                  background:
                    'var(--bg-raised)',

                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  hasNumericConfig
                    ? text.precision
                    : text.unavailable
                }
              </span>

            </div>


            {/* =================================================
                CONFIGURATION STATUS
            ================================================== */}

            {!hasNumericConfig && (
              <div
                className="p-4 rounded-md flex items-start gap-3"
                style={{
                  background:
                    'rgba(245,158,11,0.08)',

                  border:
                    '1px solid rgba(245,158,11,0.2)',
                }}
              >

                <LuCircleAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />


                <div>

                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      text.noNumericConfig
                    }
                  </p>


                  <p
                    className="text-sm mt-1 leading-relaxed"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      text.configureMessage
                    }
                  </p>

                </div>

              </div>
            )}


            {/* =================================================
                PRIMARY QUANTITY
            ================================================== */}

            <div
              className="p-4 rounded-md space-y-1.5"
              style={{
                background:
                  'var(--bg-raised)',

                border:
                  '1px solid var(--border-base)',
              }}
            >

              <span
                className="text-sm font-semibold uppercase tracking-wide block"
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  treatmentType ===
                  'organic'
                    ? text.bioRequired
                    : text.chemicalQuantity
                }
              </span>


              {hasNumericConfig ? (

                <>

                  <div className="flex items-baseline gap-2 flex-wrap">

                    <span
                      className="mono text-3xl font-bold"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        treatmentType ===
                        'organic'
                          ? totalOrganic
                          : totalChemical
                      }
                    </span>


                    <span
                      className="text-base font-medium"
                      style={{
                        color:
                          'var(--text-secondary)',
                      }}
                    >
                      {
                        treatmentType ===
                        'organic'
                          ? currentPreset
                              .organicUnit
                          : currentPreset
                              .chemicalUnit
                      }
                    </span>

                  </div>


                  <p
                    className="text-sm italic"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {text.activeIngredient}:{' '}

                    {
                      treatmentType ===
                      'organic'
                        ? currentPreset
                            .organicName
                        : currentPreset
                            .chemicalName
                    }
                  </p>

                </>

              ) : (

                <p
                  className="text-2xl font-bold"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  —
                </p>

              )}

            </div>


            {/* =================================================
                WATER + TANK
            ================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div
                className="p-4 rounded-md space-y-1"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <span
                  className="text-sm font-semibold uppercase tracking-wide flex items-center gap-2"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >

                  <LuDroplets className="w-4 h-4 text-sky-600" />

                  {
                    text.totalWater
                  }

                </span>


                <p
                  className="mono text-xl font-bold"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    totalWater !==
                    null
                      ? `${totalWater} L`
                      : '—'
                  }
                </p>


                <p
                  className="text-sm"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.waterCoverage
                  }
                </p>

              </div>


              <div
                className="p-4 rounded-md space-y-1"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <span
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.tanks
                  }
                </span>


                <p
                  className="mono text-xl font-bold text-sky-600"
                >
                  {
                    knapsackTanks !==
                    null
                      ? `${knapsackTanks} ${text.tanksRequired}`
                      : '—'
                  }
                </p>


                <p
                  className="text-sm"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.fullSprays
                  }
                </p>

              </div>

            </div>


            {/* =================================================
                COST
            ================================================== */}

            <div
              className="p-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              style={{
                background:
                  'var(--bg-raised)',

                border:
                  '1px solid var(--border-base)',
              }}
            >

              <div>

                <span
                  className="text-base font-semibold block"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    text.inputCost
                  }
                </span>


                <span
                  className="text-sm"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.marketRates
                  }
                </span>

              </div>


              <span
                className="mono text-xl font-bold text-amber-600"
              >
                {
                  estimatedCost !==
                  null
                    ? `₹${estimatedCost.toLocaleString(
                        'en-IN'
                      )}`
                    : text.noCost
                }
              </span>

            </div>


            {/* =================================================
                KNOWLEDGE DETAILS
            ================================================== */}

            {targetMeta.data && (
              <div
                className="p-4 rounded-md space-y-3"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <span
                  className="text-sm font-semibold uppercase tracking-wide block"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.additionalInfo
                  }
                </span>


                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    targetMeta.data
                      .preventiveTips ||
                    targetMeta.data
                      .symptoms ||
                    '—'
                  }
                </p>

              </div>
            )}


            {/* =================================================
                SAFETY
            ================================================== */}

            <div
              className="p-4 rounded-md text-sm flex items-start gap-2.5"
              style={{
                background:
                  'rgba(34,197,94,0.06)',

                border:
                  '1px solid rgba(34,197,94,0.15)',

                color:
                  'var(--text-secondary)',
              }}
            >

              <LuShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />


              <p>

                <strong
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    text.safetyRule
                  }
                </strong>{' '}

                {
                  text.safetyText
                }

              </p>

            </div>

          </div>


          {/* =================================================
              TREATMENT SUMMARY
          ================================================== */}

          {targetMeta.data && (
            <div
              className="card p-5"
              style={{
                borderLeft:
                  targetMeta.type ===
                  'pest'
                    ? '3px solid rgba(245,158,11,0.35)'
                    : '3px solid rgba(34,197,94,0.3)',
              }}
            >

              <div className="flex items-center gap-2 mb-3">

                {targetMeta.type ===
                'pest' ? (
                  <LuBug className="w-5 h-5 text-amber-600" />
                ) : (
                  <LuFlaskConical className="w-5 h-5 text-green-600" />
                )}


                <h3
                  className="text-base font-semibold"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    targetMeta.type ===
                    'pest'
                      ? text.pest
                      : text.disease
                  }{' '}
                  ·{' '}
                  {
                    selectedTarget
                  }
                </h3>

              </div>


              <p
                className="text-sm leading-relaxed"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  treatmentType ===
                  'organic'
                    ? targetMeta.data
                        .organicRemedy ||
                      '—'
                    : targetMeta.data
                        .chemicalRemedy ||
                      '—'
                }
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};


export default DosageCalculator;