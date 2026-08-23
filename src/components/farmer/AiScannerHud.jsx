import React, {
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  useScans,
} from '../../context/ScanContext';

import {
  useApp,
} from '../../context/AppContext';

import {
  sampleDiseaseCatalog,
  samplePestCatalog,
} from '../../services/mockData';

import { Btn } from '../common/GlowButton';
import { VoiceAdvisoryBar } from './VoiceAdvisoryBar';
import { RemedyCard } from './RemedyCard';

import {
  LuUpload,
  LuScanLine,
  LuRefreshCw,
  LuBug,
  LuSprout,
  LuMessageSquare,
  LuImageOff,
  LuCircleAlert,
} from 'react-icons/lu';

import { GiDna2 } from 'react-icons/gi';


/* ============================================================
   SCANNER CONFIGURATION
   ============================================================ */

const MAX_IMAGE_SIZE_MB = 5;

const MAX_IMAGE_SIZE_BYTES =
  MAX_IMAGE_SIZE_MB * 1024 * 1024;


/* ============================================================
   PEST PRESETS
   ============================================================ */

const fallbackPestPresets = {
  'cotton-pink-bollworm': {
    pest:
      'Pink Bollworm',

    crop:
      'Cotton',

    scientificName:
      'Pectinophora gossypiella',

    confidence:
      92.6,

    riskLevel:
      'High',

    pestCount:
      12,
  },

  'fall-armyworm': {
    pest:
      'Fall Armyworm',

    crop:
      'Maize (Corn)',

    scientificName:
      'Spodoptera frugiperda',

    confidence:
      95.1,

    riskLevel:
      'High',

    pestCount:
      9,
  },
};


/* ============================================================
   SEVERITY COLORS
   ============================================================ */

const severityColor = {
  Critical:
    '#ef4444',

  High:
    '#f59e0b',

  Moderate:
    '#3b82f6',

  Low:
    '#22c55e',

  Healthy:
    '#22c55e',
};


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const scannerTranslations = {
  en: {
    eyebrow:
      'Smart Crop Check · AI-Assisted Analysis',

    title:
      'Crop Health Scanner',

    description:
      'Upload a crop image and choose what you want to check.',

    disease:
      'Check Disease',

    pest:
      'Check Pest',

    examples:
      'Example cases:',

    cropInspection:
      'Crop inspection',

    diseaseDetected:
      'Disease Detected',

    pestDetected:
      'Pest Detected',

    checkingCrop:
      'Checking your crop...',

    checkingPest:
      'Checking for pests...',

    aiProgress:
      'AI analysis in progress',

    uploadCrop:
      'Upload Crop Photo',

    uploadPest:
      'Upload Pest Photo',

    checking:
      'Checking...',

    checkCrop:
      'Check My Crop',

    checkPest:
      'Check for Pest',

    cropResult:
      'Crop Health Result',

    pestResult:
      'Pest Check Result',

    ready:
      'Ready',

    detectedDisease:
      'Detected Disease',

    detectedPest:
      'Detected Pest',

    confidence:
      'Confidence',

    severity:
      'Severity',

    riskLevel:
      'Risk Level',

    estimatedPestCount:
      'Estimated Pest Count',

    visiblePests:
      'visible pests detected',

    crop:
      'Crop',

    checkTime:
      'Check Time',

    imageQuality:
      'Image Quality',

    scanId:
      'Scan ID',

    uploaded:
      'Uploaded',

    preset:
      'Example',

    custom:
      'Custom image',

    pestSigns:
      'Observed Pest Signs',

    symptoms:
      'Observed Symptom Pattern',

    noObservations:
      'No additional observations available.',

    selectPest:
      'Upload or select a pest example, then check the image.',

    selectCrop:
      'Upload or select a crop example, then check the image.',

    consultExpert:
      'Consult Expert',

    imageTooLarge:
      `Image is too large. Please choose an image under ${MAX_IMAGE_SIZE_MB} MB.`,

    invalidImage:
      'Please select a valid image file.',

    imageReadError:
      'The image could not be loaded. Please try another image.',

    imageUnavailable:
      'Image unavailable',

    resetScan:
      'Reset scan',

    confidenceUnavailable:
      'Not available',
  },


  hi: {
    eyebrow:
      'स्मार्ट फसल जाँच · AI आधारित विश्लेषण',

    title:
      'फसल स्वास्थ्य स्कैनर',

    description:
      'फसल की फोटो अपलोड करें और चुनें कि आप क्या जाँचना चाहते हैं।',

    disease:
      'रोग जाँचें',

    pest:
      'कीट जाँचें',

    examples:
      'उदाहरण:',

    cropInspection:
      'फसल निरीक्षण',

    diseaseDetected:
      'रोग पाया गया',

    pestDetected:
      'कीट पाया गया',

    checkingCrop:
      'आपकी फसल की जाँच हो रही है...',

    checkingPest:
      'कीट की जाँच हो रही है...',

    aiProgress:
      'AI विश्लेषण जारी है',

    uploadCrop:
      'फसल की फोटो अपलोड करें',

    uploadPest:
      'कीट की फोटो अपलोड करें',

    checking:
      'जाँच हो रही है...',

    checkCrop:
      'मेरी फसल जाँचें',

    checkPest:
      'कीट जाँचें',

    cropResult:
      'फसल स्वास्थ्य परिणाम',

    pestResult:
      'कीट जाँच परिणाम',

    ready:
      'तैयार',

    detectedDisease:
      'पहचाना गया रोग',

    detectedPest:
      'पहचाना गया कीट',

    confidence:
      'विश्वसनीयता',

    severity:
      'गंभीरता',

    riskLevel:
      'जोखिम स्तर',

    estimatedPestCount:
      'अनुमानित कीट संख्या',

    visiblePests:
      'दिखाई देने वाले कीट',

    crop:
      'फसल',

    checkTime:
      'जाँच समय',

    imageQuality:
      'फोटो गुणवत्ता',

    scanId:
      'स्कैन ID',

    uploaded:
      'अपलोड की गई',

    preset:
      'उदाहरण',

    custom:
      'कस्टम फोटो',

    pestSigns:
      'देखे गए कीट के संकेत',

    symptoms:
      'देखे गए लक्षण',

    noObservations:
      'अतिरिक्त जानकारी उपलब्ध नहीं है।',

    selectPest:
      'कीट का उदाहरण चुनें या फोटो अपलोड करें और जाँच शुरू करें।',

    selectCrop:
      'फसल का उदाहरण चुनें या फोटो अपलोड करें और जाँच शुरू करें।',

    consultExpert:
      'विशेषज्ञ से परामर्श करें',

    imageTooLarge:
      `चित्र बहुत बड़ा है। ${MAX_IMAGE_SIZE_MB} MB से कम का चित्र चुनें।`,

    invalidImage:
      'कृपया एक मान्य चित्र फ़ाइल चुनें।',

    imageReadError:
      'चित्र लोड नहीं हो सका। कृपया दूसरा चित्र चुनें।',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',

    resetScan:
      'स्कैन रीसेट करें',

    confidenceUnavailable:
      'उपलब्ध नहीं',
  },


  mr: {
    eyebrow:
      'स्मार्ट पीक तपासणी · AI आधारित विश्लेषण',

    title:
      'पीक आरोग्य स्कॅनर',

    description:
      'पिकाचा फोटो अपलोड करा आणि तुम्हाला काय तपासायचे ते निवडा.',

    disease:
      'रोग तपासा',

    pest:
      'कीड तपासा',

    examples:
      'उदाहरणे:',

    cropInspection:
      'पीक तपासणी',

    diseaseDetected:
      'रोग आढळला',

    pestDetected:
      'कीड आढळली',

    checkingCrop:
      'तुमच्या पिकाची तपासणी सुरू आहे...',

    checkingPest:
      'किडीची तपासणी सुरू आहे...',

    aiProgress:
      'AI विश्लेषण सुरू आहे',

    uploadCrop:
      'पिकाचा फोटो अपलोड करा',

    uploadPest:
      'किडीचा फोटो अपलोड करा',

    checking:
      'तपासणी सुरू...',

    checkCrop:
      'माझे पीक तपासा',

    checkPest:
      'कीड तपासा',

    cropResult:
      'पीक आरोग्य निकाल',

    pestResult:
      'कीड तपासणी निकाल',

    ready:
      'तयार',

    detectedDisease:
      'ओळखलेला रोग',

    detectedPest:
      'ओळखलेली कीड',

    confidence:
      'विश्वास पातळी',

    severity:
      'तीव्रता',

    riskLevel:
      'धोका पातळी',

    estimatedPestCount:
      'अंदाजे किडींची संख्या',

    visiblePests:
      'दिसलेल्या किडी',

    crop:
      'पीक',

    checkTime:
      'तपासणी वेळ',

    imageQuality:
      'फोटो गुणवत्ता',

    scanId:
      'स्कॅन ID',

    uploaded:
      'अपलोड केलेला',

    preset:
      'उदाहरण',

    custom:
      'कस्टम फोटो',

    pestSigns:
      'दिसणारी किडीची चिन्हे',

    symptoms:
      'दिसणारी लक्षणे',

    noObservations:
      'अतिरिक्त माहिती उपलब्ध नाही.',

    selectPest:
      'किडीचे उदाहरण निवडा किंवा फोटो अपलोड करा आणि तपासणी सुरू करा.',

    selectCrop:
      'पिकाचे उदाहरण निवडा किंवा फोटो अपलोड करा आणि तपासणी सुरू करा.',

    consultExpert:
      'तज्ज्ञांचा सल्ला घ्या',

    imageTooLarge:
      `प्रतिमा खूप मोठी आहे. ${MAX_IMAGE_SIZE_MB} MB पेक्षा कमी प्रतिमा निवडा.`,

    invalidImage:
      'कृपया वैध प्रतिमा फाइल निवडा.',

    imageReadError:
      'प्रतिमा लोड होऊ शकली नाही. कृपया दुसरी प्रतिमा निवडा.',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',

    resetScan:
      'स्कॅन रीसेट करा',

    confidenceUnavailable:
      'उपलब्ध नाही',
  },
};


/* ============================================================
   PEST PRESET BUILDER
   ============================================================ */

const buildPestPresets = () => {
  const catalog =
    samplePestCatalog || {};

  const entries =
    Object.entries(catalog);

  return entries.reduce(
    (acc, [key, item]) => {

      const fallback =
        fallbackPestPresets[key] ||
        {};

      acc[key] = {
        ...fallback,
        ...item,

        pest:
          item.pest ||
          item.name ||
          fallback.pest,

        crop:
          item.crop ||
          fallback.crop,

        scientificName:
          item.scientificName ||
          fallback.scientificName,

        confidence:
          item.confidence ??
          fallback.confidence,

        riskLevel:
          item.riskLevel ||
          item.severity ||
          fallback.riskLevel,

        pestCount:
          item.pestCount ??
          fallback.pestCount,

        sampleImage:
          item.sampleImage ||
          fallback.sampleImage,
      };

      return acc;
    },
    {}
  );
};


/* ============================================================
   SCANNER COMPONENT
   ============================================================ */

export const AiScannerHud = () => {
  const navigate =
    useNavigate();


  const {
    runAiAnalysis,
    isScanning,
    activeScanResult,
  } = useScans();


  const {
    language,
  } = useApp();


  const text =
    scannerTranslations[language] ||
    scannerTranslations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    detectionType,
    setDetectionType,
  ] = useState('disease');


  const [
    selectedPreset,
    setSelectedPreset,
  ] = useState('rice-blast');


  const [
    uploadedImage,
    setUploadedImage,
  ] = useState(null);


  const [
    customCropName,
    setCustomCropName,
  ] = useState('Rice (Paddy)');


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  const [
    hasPendingInput,
    setHasPendingInput,
  ] = useState(false);


  /* ==========================================================
     DATA
     ========================================================== */

  const pestPresets =
    useMemo(
      () => buildPestPresets(),
      []
    );


  const currentModeResult =
    activeScanResult &&
    activeScanResult.detectionType ===
      detectionType &&
    !hasPendingInput
      ? activeScanResult
      : null;


  const diseaseSample =
    selectedPreset &&
    detectionType ===
      'disease'
      ? sampleDiseaseCatalog[
          selectedPreset
        ]
      : null;


  const pestSample =
    selectedPreset &&
    detectionType ===
      'pest'
      ? pestPresets[
          selectedPreset
        ]
      : null;


  const currentSampleInfo =
    diseaseSample ||
    pestSample ||
    {
      name:
        detectionType ===
        'pest'
          ? text.custom
          : text.custom,

      sampleImage:
        uploadedImage ||
        null,
    };


  const resultName =
    currentModeResult
      ? currentModeResult
          .detectionType ===
        'pest'
        ? currentModeResult.pest
        : currentModeResult.disease
      : null;


  const resultRisk =
    currentModeResult?.riskLevel ||
    currentModeResult?.severity;


  /* ==========================================================
     DETECTION TYPE CHANGE
     ========================================================== */

  const handleDetectionTypeChange = (
    type
  ) => {

    setDetectionType(type);

    setUploadedImage(null);

    setErrorMessage('');

    setHasPendingInput(false);


    if (
      type === 'disease'
    ) {

      setSelectedPreset(
        'rice-blast'
      );

      setCustomCropName(
        'Rice (Paddy)'
      );

    } else {

      const firstPestKey =
        Object.keys(
          pestPresets
        )[0] ||
        'cotton-pink-bollworm';

      setSelectedPreset(
        firstPestKey
      );

      setCustomCropName(
        pestPresets[
          firstPestKey
        ]?.crop ||
        'Cotton'
      );

    }
  };


  /* ==========================================================
     RUN SCAN
     ========================================================== */

  const handleRunScan = async (
    presetKey =
      selectedPreset
  ) => {

    if (isScanning) {
      return;
    }


    setErrorMessage('');


    if (
      !presetKey &&
      !uploadedImage
    ) {

      setErrorMessage(
        detectionType ===
          'pest'
          ? text.selectPest
          : text.selectCrop
      );

      return;
    }


    try {

      await runAiAnalysis({
        sampleKey:
          presetKey,
        customImage:
          uploadedImage,
        cropName:
          customCropName,
        detectionType,
      });

      setHasPendingInput(
        false
      );

    } catch (error) {

      console.error(
        'AI scan failed:',
        error
      );

      setErrorMessage(
        text.imageReadError
      );

    }
  };


  /* ==========================================================
     IMAGE UPLOAD
     ========================================================== */

  const handleFileUpload = (
    e
  ) => {

    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    setErrorMessage('');


    if (
      !file.type.startsWith(
        'image/'
      )
    ) {

      setErrorMessage(
        text.invalidImage
      );

      e.target.value =
        '';

      return;
    }


    if (
      file.size >
      MAX_IMAGE_SIZE_BYTES
    ) {

      setErrorMessage(
        text.imageTooLarge
      );

      e.target.value =
        '';

      return;
    }


    const reader =
      new FileReader();


    reader.onloadend = () => {

      setUploadedImage(
        reader.result
      );

      setSelectedPreset(
        null
      );

      setHasPendingInput(
        true
      );

    };


    reader.onerror = () => {

      setErrorMessage(
        text.imageReadError
      );

    };


    reader.readAsDataURL(
      file
    );
  };


  /* ==========================================================
     SELECT PRESET
     ========================================================== */

  const handleDiseasePreset = (
    key
  ) => {

    const item =
      sampleDiseaseCatalog[
        key
      ];

    if (!item) {
      return;
    }


    setSelectedPreset(key);

    setUploadedImage(null);

    setErrorMessage('');

    setHasPendingInput(true);


    if (
      item.name
        ?.toLowerCase()
        .includes('tomato')
    ) {

      setCustomCropName(
        'Tomato'
      );

    } else if (
      item.name
        ?.toLowerCase()
        .includes('cotton')
    ) {

      setCustomCropName(
        'Cotton'
      );

    } else {

      setCustomCropName(
        'Rice (Paddy)'
      );
    }
  };


  const handlePestPreset = (
    key
  ) => {

    const item =
      pestPresets[
        key
      ];

    if (!item) {
      return;
    }


    setSelectedPreset(key);

    setUploadedImage(null);

    setErrorMessage('');

    setHasPendingInput(true);

    setCustomCropName(
      item.crop ||
      'Cotton'
    );
  };


  /* ==========================================================
     CONSULT EXPERT
     ========================================================== */

  const handleConsultExpert = () => {

    if (!currentModeResult) {
      return;
    }


    navigate(
      '/consultation',
      {
        state: {
          scan:
            currentModeResult,
        },
      }
    );
  };


  /* ==========================================================
     RESET
     ========================================================== */

  const handleReset = () => {

    setUploadedImage(null);

    setErrorMessage('');

    setHasPendingInput(
      false
    );


    if (
      detectionType ===
      'disease'
    ) {

      setSelectedPreset(
        'rice-blast'
      );

      setCustomCropName(
        'Rice (Paddy)'
      );

    } else {

      const firstPestKey =
        Object.keys(
          pestPresets
        )[0] ||
        'cotton-pink-bollworm';

      setSelectedPreset(
        firstPestKey
      );

      setCustomCropName(
        pestPresets[
          firstPestKey
        ]?.crop ||
        'Cotton'
      );
    }
  };


  /* ==========================================================
     IMAGE ERROR FALLBACK
     ========================================================== */

  const handlePreviewImageError = (
    e
  ) => {

    e.currentTarget.style.display =
      'none';

    const fallback =
      e.currentTarget
        .nextSibling;

    if (fallback) {
      fallback.style.display =
        'flex';
    }
  };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">


      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div
        className="flex flex-col gap-4"
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
            {
              text.eyebrow
            }
          </p>


          <h2
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <GiDna2 className="w-6 h-6 text-green-600 shrink-0" />

            {
              text.title
            }

          </h2>


          <p
            className="text-base mt-2"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.description
            }
          </p>

        </div>


        {/* ====================================================
            DETECTION TYPE
        ===================================================== */}

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={() =>
              handleDetectionTypeChange(
                'disease'
              )
            }
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-base font-semibold cursor-pointer transition-colors"
            style={{
              background:
                detectionType ===
                'disease'
                  ? 'var(--accent-green-muted)'
                  : 'var(--bg-surface)',

              color:
                detectionType ===
                'disease'
                  ? 'var(--accent-green)'
                  : 'var(--text-secondary)',

              border:
                detectionType ===
                'disease'
                  ? '1px solid var(--accent-green)'
                  : '1px solid var(--border-base)',
            }}
          >

            <LuSprout className="w-5 h-5" />

            {
              text.disease
            }

          </button>


          <button
            type="button"
            onClick={() =>
              handleDetectionTypeChange(
                'pest'
              )
            }
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-base font-semibold cursor-pointer transition-colors"
            style={{
              background:
                detectionType ===
                'pest'
                  ? 'rgba(245,158,11,0.1)'
                  : 'var(--bg-surface)',

              color:
                detectionType ===
                'pest'
                  ? '#b45309'
                  : 'var(--text-secondary)',

              border:
                detectionType ===
                'pest'
                  ? '1px solid rgba(245,158,11,0.4)'
                  : '1px solid var(--border-base)',
            }}
          >

            <LuBug className="w-5 h-5" />

            {
              text.pest
            }

          </button>

        </div>


        {/* ====================================================
            PRESETS
        ===================================================== */}

        <div className="space-y-2">

          <div className="flex flex-wrap items-center gap-2">

            <span
              className="text-sm font-medium"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >
              {
                text.examples
              }
            </span>


            {detectionType ===
            'disease'
              ? Object.keys(
                  sampleDiseaseCatalog
                ).map((key) => {

                  const item =
                    sampleDiseaseCatalog[
                      key
                    ];

                  const isSelected =
                    selectedPreset ===
                    key;


                  return (
                    <button
                      key={
                        key
                      }
                      type="button"
                      onClick={() =>
                        handleDiseasePreset(
                          key
                        )
                      }
                      className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                      style={{
                        border:
                          isSelected
                            ? '1px solid rgba(34,197,94,0.4)'
                            : '1px solid var(--border-base)',

                        background:
                          isSelected
                            ? 'var(--accent-green-muted)'
                            : 'transparent',

                        color:
                          isSelected
                            ? 'var(--accent-green)'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {
                        item.name
                      }
                    </button>
                  );
                })

              : Object.keys(
                  pestPresets
                ).map((key) => {

                  const pest =
                    pestPresets[
                      key
                    ];

                  const isSelected =
                    selectedPreset ===
                    key;


                  return (
                    <button
                      key={
                        key
                      }
                      type="button"
                      onClick={() =>
                        handlePestPreset(
                          key
                        )
                      }
                      className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                      style={{
                        border:
                          isSelected
                            ? '1px solid rgba(245,158,11,0.4)'
                            : '1px solid var(--border-base)',

                        background:
                          isSelected
                            ? 'rgba(245,158,11,0.1)'
                            : 'transparent',

                        color:
                          isSelected
                            ? '#b45309'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {
                        pest.pest
                      }
                    </button>
                  );
                })}

          </div>

        </div>


        {/* ====================================================
            ERROR MESSAGE
        ===================================================== */}

        {errorMessage && (
          <div
            className="flex items-start gap-2.5 p-3 rounded-md text-sm"
            style={{
              background:
                'rgba(239,68,68,0.06)',

              border:
                '1px solid rgba(239,68,68,0.18)',

              color:
                '#b91c1c',
            }}
          >

            <LuCircleAlert className="w-5 h-5 shrink-0 mt-0.5" />

            <span>
              {
                errorMessage
              }
            </span>

          </div>
        )}

      </div>


      {/* ======================================================
          MAIN SCANNER
      ======================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">


        {/* ====================================================
            IMAGE AREA
        ===================================================== */}

        <div className="lg:col-span-7 space-y-3">

          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              background:
                '#eef4ea',

              border:
                '1px solid var(--border-base)',
            }}
          >

            {/* Scanner corners */}

            <div
              className="absolute top-3 left-3 w-5 h-5 border-t border-l z-20"
              style={{
                borderColor:
                  'rgba(34,197,94,0.5)',
              }}
            />

            <div
              className="absolute top-3 right-3 w-5 h-5 border-t border-r z-20"
              style={{
                borderColor:
                  'rgba(34,197,94,0.5)',
              }}
            />

            <div
              className="absolute bottom-14 left-3 w-5 h-5 border-b border-l z-20"
              style={{
                borderColor:
                  'rgba(34,197,94,0.5)',
              }}
            />

            <div
              className="absolute bottom-14 right-3 w-5 h-5 border-b border-r z-20"
              style={{
                borderColor:
                  'rgba(34,197,94,0.5)',
              }}
            />


            {/* Scan laser */}

            {isScanning && (
              <div
                className="absolute left-0 right-0 h-px z-30 animate-laser"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(34,197,94,0.7), transparent)',
                }}
              />
            )}


            {/* Preview */}

            <div className="relative aspect-video sm:aspect-4/3 overflow-hidden flex items-center justify-center">

              <img
                src={
                  uploadedImage ||
                  currentSampleInfo?.sampleImage
                }
                alt={
                  text.cropInspection
                }
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isScanning
                    ? 'scale-[1.02] brightness-110'
                    : ''
                }`}
                onError={
                  handlePreviewImageError
                }
              />


              <div
                className="w-full h-full hidden items-center justify-center absolute inset-0"
                style={{
                  background:
                    'var(--bg-raised)',
                }}
              >

                <div className="flex flex-col items-center gap-2 text-center">

                  <LuImageOff className="w-10 h-10 text-(--text-tertiary)" />

                  <span className="text-sm text-(--text-tertiary)">
                    {
                      text.imageUnavailable
                    }
                  </span>

                </div>

              </div>


              {/* =================================================
                  RESULT BOUNDING BOX
              ================================================== */}

              {currentModeResult &&
                !isScanning && (
                  <div
                    className="absolute inset-8 sm:inset-12 z-20 animate-fade-in flex flex-col justify-between p-3"
                    style={{
                      border:
                        '1px dashed rgba(34,197,94,0.5)',

                      borderRadius:
                        '6px',

                      background:
                        'rgba(34,197,94,0.05)',
                    }}
                  >

                    <div className="flex items-center justify-between gap-2">

                      <span
                        className="px-2 py-1 text-xs sm:text-sm font-bold uppercase tracking-wide"
                        style={{
                          background:
                            'rgba(34,197,94,0.9)',

                          color:
                            '#ffffff',

                          borderRadius:
                            '4px',
                        }}
                      >
                        {
                          currentModeResult
                            .detectionType ===
                          'pest'
                            ? text.pestDetected
                            : text.diseaseDetected
                        }
                      </span>


                      <span
                        className="mono text-xs sm:text-sm font-bold"
                        style={{
                          background:
                            'rgba(38,50,56,0.85)',

                          color:
                            '#ffffff',

                          padding:
                            '4px 8px',

                          borderRadius:
                            '4px',
                        }}
                      >
                        {
                          currentModeResult.confidence
                        }%
                      </span>

                    </div>


                    <div
                      className="self-end mono text-xs sm:text-sm font-medium px-2 py-1 rounded-md max-w-[85%] truncate"
                      style={{
                        background:
                          'rgba(38,50,56,0.85)',

                        color:
                          '#ffffff',

                        border:
                          '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {
                        resultName
                      }
                    </div>

                  </div>
                )}


              {/* =================================================
                  SCANNING OVERLAY
              ================================================== */}

              {isScanning && (
                <div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
                  style={{
                    background:
                      'rgba(38,50,56,0.75)',
                  }}
                >

                  <div className="relative w-12 h-12">

                    <div
                      className="absolute inset-0 rounded-full border-2 animate-spin-slow"
                      style={{
                        borderColor:
                          'rgba(34,197,94,0.2)',

                        borderTopColor:
                          'rgba(34,197,94,0.9)',
                      }}
                    />

                    {detectionType ===
                    'pest' ? (
                      <LuBug className="w-6 h-6 text-amber-400 absolute inset-0 m-auto" />
                    ) : (
                      <GiDna2 className="w-6 h-6 text-green-500 absolute inset-0 m-auto" />
                    )}

                  </div>


                  <div className="text-center">

                    <p
                      className="text-base font-semibold"
                      style={{
                        color:
                          '#ffffff',
                      }}
                    >
                      {
                        detectionType ===
                        'pest'
                          ? text.checkingPest
                          : text.checkingCrop
                      }
                    </p>


                    <p
                      className="text-sm mt-1"
                      style={{
                        color:
                          '#E8F0E5',
                      }}
                    >
                      {
                        text.aiProgress
                      }
                    </p>

                  </div>

                </div>
              )}

            </div>


            {/* =================================================
                CONTROLS
            ================================================== */}

            <div
              className="px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              style={{
                borderTop:
                  '1px solid var(--border-base)',
              }}
            >

              <div className="flex flex-col sm:flex-row gap-2">

                <label
                  className="flex items-center justify-center gap-2 text-sm font-medium cursor-pointer px-3 py-2.5 rounded-md"
                  style={{
                    color:
                      'var(--text-secondary)',

                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <LuUpload className="w-4 h-4" />

                  {
                    detectionType ===
                    'pest'
                      ? text.uploadPest
                      : text.uploadCrop
                  }


                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileUpload
                    }
                    className="hidden"
                    disabled={
                      isScanning
                    }
                  />

                </label>


                {hasPendingInput && (
                  <button
                    type="button"
                    onClick={
                      handleReset
                    }
                    disabled={
                      isScanning
                    }
                    className="px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50"
                    style={{
                      background:
                        'var(--bg-surface)',

                      border:
                        '1px solid var(--border-base)',

                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      text.resetScan
                    }
                  </button>
                )}

              </div>


              <Btn
                variant="primary"
                size="md"
                onClick={() =>
                  handleRunScan()
                }
                disabled={
                  isScanning
                }
              >

                {isScanning ? (
                  <>
                    <LuRefreshCw className="w-4 h-4 animate-spin-slow" />

                    {
                      text.checking
                    }
                  </>
                ) : (
                  <>
                    <LuScanLine className="w-4 h-4" />

                    {
                      detectionType ===
                      'pest'
                        ? text.checkPest
                        : text.checkCrop
                    }
                  </>
                )}

              </Btn>

            </div>

          </div>

        </div>


        {/* ====================================================
            RESULTS
        ===================================================== */}

        <div className="lg:col-span-5">

          <div
            className="card p-4 sm:p-5 space-y-5"
            style={{
              borderLeft:
                detectionType ===
                'pest'
                  ? '3px solid rgba(245,158,11,0.35)'
                  : '3px solid rgba(34,197,94,0.3)',
            }}
          >

            <div
              className="flex items-center justify-between gap-2"
              style={{
                borderBottom:
                  '1px solid var(--border-base)',

                paddingBottom:
                  '0.75rem',
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
                  detectionType ===
                  'pest'
                    ? text.pestResult
                    : text.cropResult
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
                  currentModeResult
                    ? currentModeResult.date
                    : text.ready
                }
              </span>

            </div>


            {currentModeResult ? (

              <div className="space-y-4 animate-fade-in">


                {/* =============================================
                    DETECTION
                ============================================== */}

                <div>

                  <p className="metric-label">
                    {
                      currentModeResult
                        .detectionType ===
                      'pest'
                        ? text.detectedPest
                        : text.detectedDisease
                    }
                  </p>


                  <h3
                    className="text-xl font-bold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      resultName
                    }
                  </h3>


                  <p
                    className="text-sm mono italic mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      currentModeResult
                        .scientificName ||
                      text.confidenceUnavailable
                    }
                  </p>

                </div>


                {/* =============================================
                    METRICS
                ============================================== */}

                <div className="grid grid-cols-2 gap-3">


                  {/* Confidence */}

                  <div
                    className="p-3 rounded-md space-y-2"
                    style={{
                      background:
                        'var(--bg-raised)',

                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {
                        text.confidence
                      }
                    </p>


                    <p
                      className="text-xl font-bold mono"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        currentModeResult
                          .confidence ??
                        '—'
                      }
                      {
                        currentModeResult
                          .confidence != null
                          ? '%'
                          : ''
                      }
                    </p>


                    {typeof currentModeResult.confidence ===
                      'number' && (
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{
                          background:
                            'var(--border-base)',
                        }}
                      >

                        <div
                          className="h-full rounded-full bg-green-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                currentModeResult.confidence
                              )
                            )}%`,
                          }}
                        />

                      </div>
                    )}

                  </div>


                  {/* Risk */}

                  <div
                    className="p-3 rounded-md space-y-2"
                    style={{
                      background:
                        'var(--bg-raised)',

                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {
                        currentModeResult
                          .detectionType ===
                        'pest'
                          ? text.riskLevel
                          : text.severity
                      }
                    </p>


                    <div className="flex items-center gap-2">

                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background:
                            severityColor[
                              resultRisk
                            ] ||
                            '#ef4444',
                        }}
                      />


                      <span
                        className="text-base font-bold truncate"
                        style={{
                          color:
                            severityColor[
                              resultRisk
                            ] ||
                            '#ef4444',
                        }}
                      >
                        {
                          resultRisk ||
                          '—'
                        }
                      </span>

                    </div>

                  </div>

                </div>


                {/* =============================================
                    PEST COUNT
                ============================================== */}

                {currentModeResult
                  .detectionType ===
                  'pest' && (

                  <div
                    className="p-4 rounded-md"
                    style={{
                      background:
                        'rgba(245,158,11,0.08)',

                      border:
                        '1px solid rgba(245,158,11,0.2)',
                    }}
                  >

                    <p className="metric-label">
                      {
                        text.estimatedPestCount
                      }
                    </p>


                    <div className="flex items-baseline gap-2 mt-1">

                      <span
                        className="text-2xl font-bold mono"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {
                          currentModeResult
                            .pestCount ??
                          '—'
                        }
                      </span>


                      <span
                        className="text-sm"
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {
                          text.visiblePests
                        }
                      </span>

                    </div>

                  </div>
                )}


                {/* =============================================
                    CROP
                ============================================== */}

                <div
                  className="p-3 rounded-md"
                  style={{
                    background:
                      'var(--bg-raised)',

                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <p className="metric-label">
                    {
                      text.crop
                    }
                  </p>


                  <p
                    className="text-base font-semibold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      currentModeResult.crop ||
                      '—'
                    }
                  </p>

                </div>


                {/* =============================================
                    ANALYSIS INFORMATION
                ============================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                  {[
                    {
                      label:
                        text.checkTime,

                      value:
                        '0.6s',
                    },

                    {
                      label:
                        text.imageQuality,

                      value:
                        uploadedImage
                          ? text.uploaded
                          : text.preset,
                    },

                    {
                      label:
                        text.scanId,

                      value:
                        currentModeResult
                          .id
                          ?.replace(
                            'scan-',
                            ''
                          ) ||
                        '—',
                    },

                  ].map(
                    ({
                      label,
                      value,
                    }) => (

                      <div
                        key={
                          label
                        }
                        className="p-3 rounded-md text-center"
                        style={{
                          background:
                            'var(--bg-raised)',

                          border:
                            '1px solid var(--border-base)',
                        }}
                      >

                        <p className="metric-label">
                          {
                            label
                          }
                        </p>


                        <p
                          className="text-sm font-medium mt-1"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            value
                          }
                        </p>

                      </div>

                    )
                  )}

                </div>


                {/* =============================================
                    SYMPTOMS
                ============================================== */}

                <div>

                  <p className="metric-label mb-2">
                    {
                      currentModeResult
                        .detectionType ===
                      'pest'
                        ? text.pestSigns
                        : text.symptoms
                    }
                  </p>


                  <p
                    className="text-sm leading-relaxed p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',

                      border:
                        '1px solid var(--border-base)',

                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      currentModeResult
                        .symptoms ||
                      text.noObservations
                    }
                  </p>

                </div>


                {/* =============================================
                    CONSULT EXPERT
                ============================================== */}

                <div
                  className="pt-4"
                  style={{
                    borderTop:
                      '1px solid var(--border-base)',
                  }}
                >

                  <Btn
                    variant="secondary"
                    size="md"
                    onClick={
                      handleConsultExpert
                    }
                    className="w-full justify-center"
                  >

                    <LuMessageSquare className="w-4 h-4" />

                    {
                      text.consultExpert
                    }

                  </Btn>

                </div>

              </div>

            ) : (

              /* ===============================================
                 EMPTY / READY STATE
              ================================================ */

              <div className="py-10 text-center space-y-3">

                <div className="flex justify-center">

                  {detectionType ===
                  'pest' ? (
                    <LuBug className="w-10 h-10 opacity-20 text-amber-600" />
                  ) : (
                    <LuScanLine
                      className="w-10 h-10 opacity-20"
                      style={{
                        color:
                          'var(--text-secondary)',
                      }}
                    />
                  )}

                </div>


                <p
                  className="text-base"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    detectionType ===
                    'pest'
                      ? text.selectPest
                      : text.selectCrop
                  }
                </p>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ======================================================
          ADVISORY
      ======================================================= */}

      {currentModeResult && (
        <>
          <VoiceAdvisoryBar
            audioScript={
              currentModeResult.audioScript
            }
            diseaseName={
              currentModeResult.disease ||
              currentModeResult.pest
            }
          />


          <RemedyCard
            scanResult={
              currentModeResult
            }
          />
        </>
      )}

    </div>
  );
};


export default AiScannerHud;