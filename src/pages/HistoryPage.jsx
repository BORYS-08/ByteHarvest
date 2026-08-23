import React, {
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { useScans } from '../context/ScanContext';
import {
  useApp,
} from '../context/AppContext';

import { Btn } from '../components/common/GlowButton';

import {
  LuSearch,
  LuFilter,
  LuDownload,
  LuEye,
  LuArrowLeft,
  LuFileText,
  LuSprout,
  LuBug,
  LuShieldAlert,
  LuX,
  LuImageOff,
  LuFlaskConical,
  LuTriangleAlert,
  LuCircleCheck,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow:
      'Crop Health Records',

    title:
      'History & Reports',

    subtitle:
      'View previous crop analyses, disease cases, pest detections and advisory records.',

    search:
      'Search',

    searchPlaceholder:
      'Search crop, disease, pest or farmer...',

    crop:
      'Crop',

    allCrops:
      'All Crops',

    allTypes:
      'All Types',

    allSeverity:
      'All Severity',

    allStatus:
      'All Status',

    disease:
      'Disease',

    pest:
      'Pest',

    healthy:
      'Healthy',

    critical:
      'Critical',

    high:
      'High',

    medium:
      'Medium',

    low:
      'Low',

    identified:
      'AI Identified',

    verified:
      'Expert Verified',

    rejected:
      'Rejected by Expert',

    records:
      'records',

    noResults:
      'No matching records found.',

    clearFilters:
      'Clear Filters',

    details:
      'Case Details',

    close:
      'Close',

    result:
      'Detection Result',

    confidence:
      'Confidence',

    severity:
      'Severity',

    date:
      'Date',

    status:
      'Status',

    location:
      'Location',

    notes:
      'Expert Notes',

    pestCount:
      'Estimated Pest Count',

    damage:
      'Observed Damage',

    symptoms:
      'Observed Symptoms',

    organicRemedy:
      'Organic / Bio-Control',

    chemicalRemedy:
      'Chemical Intervention',

    dosage:
      'Dosage',

    prevention:
      'Prevention',

    beforeAfter:
      'Before / After Recovery',

    before:
      'Before Treatment',

    after:
      'After Treatment',

    download:
      'Download Report',

    view:
      'View Details',

    reportPreparing:
      'Report download is currently a frontend preview. The backend can later connect this action to real PDF generation.',

    noNotes:
      'No expert notes available.',

    noValue:
      'Not available',

    imageUnavailable:
      'Image unavailable',

    back:
      'Back to Dashboard',

    farmer:
      'Farmer',

    extension:
      'Extension',

    expert:
      'Expert',

    official:
      'Official',

    admin:
      'Admin',
  },


  hi: {
    eyebrow:
      'फसल स्वास्थ्य रिकॉर्ड',

    title:
      'इतिहास और रिपोर्ट',

    subtitle:
      'पिछली फसल जाँच, रोग मामलों, कीट पहचान और सलाह रिकॉर्ड देखें।',

    search:
      'खोजें',

    searchPlaceholder:
      'फसल, रोग, कीट या किसान खोजें...',

    crop:
      'फसल',

    allCrops:
      'सभी फसलें',

    allTypes:
      'सभी प्रकार',

    allSeverity:
      'सभी गंभीरता',

    allStatus:
      'सभी स्थिति',

    disease:
      'रोग',

    pest:
      'कीट',

    healthy:
      'स्वस्थ',

    critical:
      'गंभीर',

    high:
      'उच्च',

    medium:
      'मध्यम',

    low:
      'कम',

    identified:
      'AI द्वारा पहचाना गया',

    verified:
      'विशेषज्ञ द्वारा सत्यापित',

    rejected:
      'विशेषज्ञ द्वारा अस्वीकार',

    records:
      'रिकॉर्ड',

    noResults:
      'कोई मिलान रिकॉर्ड नहीं मिला।',

    clearFilters:
      'फ़िल्टर साफ़ करें',

    details:
      'मामले का विवरण',

    close:
      'बंद करें',

    result:
      'पहचान परिणाम',

    confidence:
      'विश्वसनीयता',

    severity:
      'गंभीरता',

    date:
      'तारीख',

    status:
      'स्थिति',

    location:
      'स्थान',

    notes:
      'विशेषज्ञ टिप्पणियाँ',

    pestCount:
      'अनुमानित कीट संख्या',

    damage:
      'देखा गया नुकसान',

    symptoms:
      'देखे गए लक्षण',

    organicRemedy:
      'जैविक / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मात्रा',

    prevention:
      'बचाव',

    beforeAfter:
      'उपचार से पहले / बाद',

    before:
      'उपचार से पहले',

    after:
      'उपचार के बाद',

    download:
      'रिपोर्ट डाउनलोड करें',

    view:
      'विवरण देखें',

    reportPreparing:
      'रिपोर्ट डाउनलोड अभी फ्रंटएंड प्रीव्यू है। बाद में बैकएंड इसे वास्तविक PDF निर्माण से जोड़ सकता है।',

    noNotes:
      'कोई विशेषज्ञ टिप्पणी उपलब्ध नहीं है।',

    noValue:
      'उपलब्ध नहीं',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',

    back:
      'डैशबोर्ड पर वापस जाएँ',

    farmer:
      'किसान',

    extension:
      'एक्सटेंशन',

    expert:
      'विशेषज्ञ',

    official:
      'अधिकारी',

    admin:
      'एडमिन',
  },


  mr: {
    eyebrow:
      'पीक आरोग्य नोंदी',

    title:
      'इतिहास आणि अहवाल',

    subtitle:
      'मागील पीक तपासण्या, रोग प्रकरणे, किडीची ओळख आणि सल्ला नोंदी पहा.',

    search:
      'शोधा',

    searchPlaceholder:
      'पीक, रोग, कीड किंवा शेतकरी शोधा...',

    crop:
      'पीक',

    allCrops:
      'सर्व पिके',

    allTypes:
      'सर्व प्रकार',

    allSeverity:
      'सर्व तीव्रता',

    allStatus:
      'सर्व स्थिती',

    disease:
      'रोग',

    pest:
      'कीड',

    healthy:
      'निरोगी',

    critical:
      'गंभीर',

    high:
      'उच्च',

    medium:
      'मध्यम',

    low:
      'कमी',

    identified:
      'AI ने ओळखले',

    verified:
      'तज्ज्ञांनी सत्यापित',

    rejected:
      'तज्ज्ञांनी नाकारले',

    records:
      'नोंदी',

    noResults:
      'जुळणाऱ्या नोंदी सापडल्या नाहीत.',

    clearFilters:
      'फिल्टर साफ करा',

    details:
      'प्रकरण तपशील',

    close:
      'बंद करा',

    result:
      'निदान परिणाम',

    confidence:
      'विश्वास पातळी',

    severity:
      'तीव्रता',

    date:
      'तारीख',

    status:
      'स्थिती',

    location:
      'ठिकाण',

    notes:
      'तज्ज्ञांच्या नोंदी',

    pestCount:
      'अंदाजे किडींची संख्या',

    damage:
      'दिसलेले नुकसान',

    symptoms:
      'दिसणारी लक्षणे',

    organicRemedy:
      'सेंद्रिय / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मात्रा',

    prevention:
      'प्रतिबंध',

    beforeAfter:
      'उपचारापूर्वी / नंतर',

    before:
      'उपचारापूर्वी',

    after:
      'उपचारानंतर',

    download:
      'अहवाल डाउनलोड करा',

    view:
      'तपशील पहा',

    reportPreparing:
      'अहवाल डाउनलोड सध्या फ्रंटएंड प्रिव्ह्यू आहे. नंतर बॅकएंडशी जोडून वास्तविक PDF तयार करता येईल.',

    noNotes:
      'तज्ज्ञांच्या नोंदी उपलब्ध नाहीत.',

    noValue:
      'उपलब्ध नाही',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',

    back:
      'डॅशबोर्डवर परत जा',

    farmer:
      'शेतकरी',

    extension:
      'विस्तार',

    expert:
      'तज्ज्ञ',

    official:
      'अधिकारी',

    admin:
      'अॅडमिन',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getStatusLabel = (
  status,
  text
) => {

  const map = {
    'AI Identified':
      text.identified,

    'Expert Verified':
      text.verified,

    'Rejected by Expert':
      text.rejected,
  };

  return (
    map[status] ||
    status ||
    text.noValue
  );
};


const getSeverityLabel = (
  severity,
  text
) => {

  const map = {
    Critical:
      text.critical,

    High:
      text.high,

    Medium:
      text.medium,

    Moderate:
      text.medium,

    Low:
      text.low,

    Healthy:
      text.healthy,
  };

  return (
    map[severity] ||
    severity ||
    text.noValue
  );
};


const getRoleLabel = (
  role,
  text
) => {

  const map = {
    farmer:
      text.farmer,

    extension:
      text.extension,

    expert:
      text.expert,

    official:
      text.official,

    admin:
      text.admin,
  };

  return (
    map[role] ||
    role ||
    ''
  );
};


/* ============================================================
   HISTORY PAGE
   ============================================================ */

export const HistoryPage = () => {

  const navigate =
    useNavigate();


  const {
    scans = [],
  } = useScans();


  const {
    language,
    roleConfig,
    activeRole,
  } = useApp();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');


  const [
    selectedCrop,
    setSelectedCrop,
  ] = useState('all');


  const [
    selectedType,
    setSelectedType,
  ] = useState('all');


  const [
    selectedSeverity,
    setSelectedSeverity,
  ] = useState('all');


  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState('all');


  const [
    selectedScan,
    setSelectedScan,
  ] = useState(null);


  /* ==========================================================
     CROPS
     ========================================================== */

  const crops =
    useMemo(() => {

      return [
        ...new Set(
          scans
            .map(
              (scan) =>
                scan.crop
            )
            .filter(Boolean)
        ),
      ];

    }, [scans]);


  /* ==========================================================
     FILTERED SCANS
     ========================================================== */

  const filteredScans =
    useMemo(() => {

      const normalizedSearch =
        searchTerm
          .toLowerCase()
          .trim();


      return scans.filter(
        (scan) => {

          const isPest =
            scan.detectionType ===
            'pest';


          const resultName =
            isPest
              ? scan.pest
              : scan.disease;


          const searchValue = `
            ${scan.crop || ''}
            ${resultName || ''}
            ${scan.farmerName || ''}
            ${scan.location || ''}
            ${scan.scientificName || ''}
            ${scan.expertNotes || ''}
          `.toLowerCase();


          const matchesSearch =
            !normalizedSearch ||
            searchValue.includes(
              normalizedSearch
            );


          const matchesCrop =
            selectedCrop ===
              'all' ||
            scan.crop ===
              selectedCrop;


          const scanType =
            scan.detectionType ||
            'disease';


          const matchesType =
            selectedType ===
              'all' ||
            scanType ===
              selectedType;


          const matchesSeverity =
            selectedSeverity ===
              'all' ||
            scan.severity ===
              selectedSeverity;


          const matchesStatus =
            selectedStatus ===
              'all' ||
            scan.status ===
              selectedStatus;


          return (
            matchesSearch &&
            matchesCrop &&
            matchesType &&
            matchesSeverity &&
            matchesStatus
          );

        }
      );

    }, [
      scans,
      searchTerm,
      selectedCrop,
      selectedType,
      selectedSeverity,
      selectedStatus,
    ]);


  /* ==========================================================
     CLEAR FILTERS
     ========================================================== */

  const clearFilters =
    () => {

      setSearchTerm('');

      setSelectedCrop(
        'all'
      );

      setSelectedType(
        'all'
      );

      setSelectedSeverity(
        'all'
      );

      setSelectedStatus(
        'all'
      );

    };


  /* ==========================================================
     DOWNLOAD REPORT
     ========================================================== */

  const handleDownload = (
    scan
  ) => {

    const isPest =
      scan.detectionType ===
      'pest';


    const resultName =
      isPest
        ? scan.pest
        : scan.disease;


    const report = [
      'ByteHarvest — Crop Health Report',
      '================================',
      '',
      `Crop: ${
        scan.crop ||
        'N/A'
      }`,
      `Detection Type: ${
        isPest
          ? 'Pest'
          : 'Disease'
      }`,
      `Detection: ${
        resultName ||
        'N/A'
      }`,
      `Scientific Name: ${
        scan.scientificName ||
        'N/A'
      }`,
      `Confidence: ${
        scan.confidence ??
        'N/A'
      }%`,
      `Severity: ${
        scan.severity ||
        'N/A'
      }`,
      `Date: ${
        scan.date ||
        'N/A'
      }`,
      `Status: ${
        scan.status ||
        'N/A'
      }`,
      `Location: ${
        scan.location ||
        'N/A'
      }`,
      `Estimated Pest Count: ${
        scan.pestCount ??
        'N/A'
      }`,
      '',
      `Symptoms: ${
        scan.symptoms ||
        'N/A'
      }`,
      '',
      `Damage: ${
        scan.damage ||
        'N/A'
      }`,
      '',
      `Organic / Bio-Control: ${
        scan.organicRemedy ||
        'N/A'
      }`,
      '',
      `Chemical Intervention: ${
        scan.chemicalRemedy ||
        'N/A'
      }`,
      '',
      `Dosage: ${
        scan.dosagePerAcre ||
        'N/A'
      }`,
      '',
      `Prevention: ${
        scan.preventiveTips ||
        'N/A'
      }`,
      '',
      `Expert Notes: ${
        scan.expertNotes ||
        'N/A'
      }`,
    ].join('\n');


    const blob =
      new Blob(
        [report],
        {
          type:
            'text/plain;charset=utf-8',
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        'a'
      );


    link.href = url;


    link.download =
      `ByteHarvest-${(
        resultName ||
        'Crop-Report'
      )
        .replace(
          /\s+/g,
          '-'
        )
        .replace(
          /[^a-zA-Z0-9-_]/g,
          ''
        )}.txt`;


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  };


  /* ==========================================================
     IMAGE FALLBACK
     ========================================================== */

  const handleImageError = (
    event
  ) => {

    event.currentTarget.style.display =
      'none';


    const fallback =
      event.currentTarget
        .nextSibling;


    if (fallback) {
      fallback.style.display =
        'flex';
    }

  };


  /* ==========================================================
     BACK TO WORKSPACE
     ========================================================== */

  const handleBack =
    () => {

      navigate(
        roleConfig?.defaultRoute ||
        (activeRole ===
        'admin'
          ? '/admin'
          : activeRole ===
              'expert'
            ? '/expert'
            : activeRole ===
                'official'
              ? '/official'
              : activeRole ===
                  'extension'
                ? '/extension'
                : '/farmer')
      );

    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-4"
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
            {text.eyebrow}
          </p>


          <h1
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <LuFileText className="w-6 h-6 text-green-600" />

            {text.title}

          </h1>


          <p
            className="text-sm mt-2 max-w-3xl"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {text.subtitle}
          </p>


          {activeRole && (
            <p
              className="text-xs mt-2"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >
              {getRoleLabel(
                activeRole,
                text
              )}
            </p>
          )}

        </div>


        <Btn
          variant="secondary"
          size="sm"
          onClick={
            handleBack
          }
        >

          <LuArrowLeft className="w-4 h-4" />

          {text.back}

        </Btn>

      </div>


      {/* ======================================================
          FILTER BAR
      ======================================================= */}

      <div className="card p-4 space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3">


          {/* Search */}

          <div className="xl:col-span-4">

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.search}
            </label>


            <div className="relative">

              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-tertiary)" />


              <input
                type="text"
                value={
                  searchTerm
                }
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                placeholder={
                  text.searchPlaceholder
                }
                className="field-input field-input-icon"
              />

            </div>

          </div>


          {/* Crop */}

          <div className="xl:col-span-2">

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.crop}
            </label>


            <select
              value={
                selectedCrop
              }
              onChange={(e) =>
                setSelectedCrop(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {text.allCrops}
              </option>


              {crops.map(
                (crop) => (
                  <option
                    key={
                      crop
                    }
                    value={
                      crop
                    }
                  >
                    {crop}
                  </option>
                )
              )}

            </select>

          </div>


          {/* Type */}

          <div className="xl:col-span-2">

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.allTypes}
            </label>


            <select
              value={
                selectedType
              }
              onChange={(e) =>
                setSelectedType(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {text.allTypes}
              </option>

              <option value="disease">
                {text.disease}
              </option>

              <option value="pest">
                {text.pest}
              </option>

            </select>

          </div>


          {/* Severity */}

          <div className="xl:col-span-2">

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.severity}
            </label>


            <select
              value={
                selectedSeverity
              }
              onChange={(e) =>
                setSelectedSeverity(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {text.allSeverity}
              </option>

              <option value="Critical">
                {text.critical}
              </option>

              <option value="High">
                {text.high}
              </option>

              <option value="Medium">
                {text.medium}
              </option>

              <option value="Moderate">
                {text.medium}
              </option>

              <option value="Low">
                {text.low}
              </option>

              <option value="Healthy">
                {text.healthy}
              </option>

            </select>

          </div>


          {/* Status */}

          <div className="xl:col-span-2">

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.status}
            </label>


            <select
              value={
                selectedStatus
              }
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {text.allStatus}
              </option>

              <option value="AI Identified">
                {text.identified}
              </option>

              <option value="Expert Verified">
                {text.verified}
              </option>

              <option value="Rejected by Expert">
                {text.rejected}
              </option>

            </select>

          </div>

        </div>


        {/* Filter Footer */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div
            className="flex items-center gap-2 text-sm"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >

            <LuFilter className="w-4 h-4" />

            <span>
              {
                filteredScans.length
              }{' '}
              {
                text.records
              }
            </span>

          </div>


          <button
            type="button"
            onClick={
              clearFilters
            }
            className="text-sm font-medium text-green-700 hover:underline cursor-pointer"
          >
            {
              text.clearFilters
            }
          </button>

        </div>

      </div>


      {/* ======================================================
          HISTORY LIST
      ======================================================= */}

      {filteredScans.length ===
      0 ? (

        <div
          className="card p-10 text-center"
          style={{
            color:
              'var(--text-secondary)',
          }}
        >

          <LuFileText className="w-10 h-10 mx-auto mb-3 opacity-30" />


          <p className="font-medium">
            {
              text.noResults
            }
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {filteredScans.map(
            (scan) => {

              const isPest =
                scan.detectionType ===
                'pest';


              const resultName =
                isPest
                  ? scan.pest
                  : scan.disease;


              const ResultIcon =
                isPest
                  ? LuBug
                  : LuShieldAlert;


              return (
                <article
                  key={
                    scan.id
                  }
                  className="card card-hover p-4"
                >


                  {/* =================================================
                      HEADER
                  ================================================== */}

                  <div className="flex items-start gap-4">


                    {/* Image */}

                    <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 bg-(--bg-raised) border border-(--border-base)">

                      {scan.image ? (

                        <img
                          src={
                            scan.image
                          }
                          alt={
                            resultName ||
                            scan.crop ||
                            text.crop
                          }
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={
                            handleImageError
                          }
                        />

                      ) : null}


                      <div
                        className="w-full h-full hidden items-center justify-center"
                        style={{
                          color:
                            'var(--text-tertiary)',
                        }}
                      >

                        <LuImageOff className="w-6 h-6" />

                      </div>

                    </div>


                    {/* Basic Info */}

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <p className="text-sm font-semibold text-green-600 truncate">

                            {
                              scan.crop ||
                              text.noValue
                            }

                          </p>


                          <p
                            className="text-base font-semibold truncate mt-0.5"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >

                            {
                              resultName ||
                              text.noValue
                            }

                          </p>

                        </div>


                        <span
                          className="mono text-sm px-2 py-1 rounded-md shrink-0"
                          style={{
                            background:
                              'var(--bg-raised)',

                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            scan.date ||
                            '—'
                          }
                        </span>

                      </div>


                      {/* Type + Severity */}

                      <div className="flex flex-wrap items-center gap-2 mt-2">

                        <span
                          className="text-sm px-2 py-1 rounded-md font-medium"
                          style={{
                            background:
                              isPest
                                ? 'rgba(245,158,11,0.1)'
                                : 'rgba(34,197,94,0.1)',

                            color:
                              isPest
                                ? '#b45309'
                                : '#15803d',
                          }}
                        >

                          <span className="inline-flex items-center gap-1.5">

                            <ResultIcon className="w-3.5 h-3.5" />

                            {
                              isPest
                                ? text.pest
                                : text.disease
                            }

                          </span>

                        </span>


                        {scan.severity && (
                          <span
                            className="text-sm"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                          >
                            {
                              getSeverityLabel(
                                scan.severity,
                                text
                              )
                            }
                          </span>
                        )}

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      METADATA
                  ================================================== */}

                  <div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 text-sm"
                    style={{
                      borderTop:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <div>

                      <p className="text-(--text-tertiary)">
                        {
                          text.confidence
                        }
                      </p>


                      <p className="font-semibold text-(--text-primary) mt-0.5">

                        {
                          scan.confidence ??
                          '—'
                        }

                        {scan.confidence !==
                          undefined &&
                          scan.confidence !==
                            null &&
                          '%'}

                      </p>

                    </div>


                    <div>

                      <p className="text-(--text-tertiary)">
                        {
                          text.status
                        }
                      </p>


                      <p className="font-medium text-(--text-primary) mt-0.5">

                        {
                          getStatusLabel(
                            scan.status,
                            text
                          )
                        }

                      </p>

                    </div>


                    <div>

                      <p className="text-(--text-tertiary)">
                        {
                          text.location
                        }
                      </p>


                      <p className="font-medium text-(--text-primary) mt-0.5 truncate">

                        {
                          scan.location ||
                          '—'
                        }

                      </p>

                    </div>


                    {isPest ? (

                      <div>

                        <p className="text-(--text-tertiary)">
                          {
                            text.pestCount
                          }
                        </p>


                        <p className="font-medium text-(--text-primary) mt-0.5">

                          {
                            scan.pestCount ??
                            '—'
                          }

                        </p>

                      </div>

                    ) : (

                      <div>

                        <p className="text-(--text-tertiary)">
                          {
                            text.date
                          }
                        </p>


                        <p className="font-medium text-(--text-primary) mt-0.5">
                          {
                            scan.date ||
                            '—'
                          }
                        </p>

                      </div>

                    )}

                  </div>


                  {/* =================================================
                      ACTIONS
                  ================================================== */}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedScan(
                          scan
                        )
                      }
                      className="text-sm font-semibold text-green-700 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >

                      <LuEye className="w-4 h-4" />

                      {
                        text.view
                      }

                    </button>


                    <Btn
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        handleDownload(
                          scan
                        )
                      }
                    >

                      <LuDownload className="w-4 h-4" />

                      {
                        text.download
                      }

                    </Btn>

                  </div>

                </article>
              );
            }
          )}

        </div>

      )}


      {/* ======================================================
          DETAILS MODAL
      ======================================================= */}

      {selectedScan && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto surface-overlay"
            style={{
              background:
                'var(--bg-surface)',
            }}
          >


            {/* ==================================================
                MODAL HEADER
            =================================================== */}

            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{
                background:
                  'var(--bg-surface)',

                borderBottom:
                  '1px solid var(--border-base)',
              }}
            >

              <div>

                <p className="text-sm text-(--text-tertiary)">
                  {
                    text.details
                  }
                </p>


                <h2 className="text-xl font-bold text-(--text-primary) mt-0.5">

                  {
                    selectedScan.crop
                  }

                  {' — '}

                  {
                    selectedScan.detectionType ===
                    'pest'
                      ? selectedScan.pest
                      : selectedScan.disease
                  }

                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedScan(
                    null
                  )
                }
                className="w-9 h-9 rounded-md flex items-center justify-center text-(--text-secondary) hover:bg-black/5 cursor-pointer"
                aria-label={
                  text.close
                }
              >

                <LuX className="w-5 h-5" />

              </button>

            </div>


            <div className="p-5 space-y-5">


              {/* =================================================
                  MAIN IMAGE
              ================================================== */}

              {selectedScan.image && (

                <div className="relative rounded-lg overflow-hidden border border-(--border-base) bg-(--bg-raised)">

                  <img
                    src={
                      selectedScan.image
                    }
                    alt={
                      selectedScan.disease ||
                      selectedScan.pest ||
                      selectedScan.crop
                    }
                    className="w-full max-h-80 object-cover"
                    onError={
                      handleImageError
                    }
                  />


                  <div
                    className="w-full h-64 hidden items-center justify-center"
                    style={{
                      color:
                        'var(--text-tertiary)',
                    }}
                  >

                    <div className="flex flex-col items-center gap-2">

                      <LuImageOff className="w-8 h-8" />

                      <span className="text-sm">
                        {
                          text.imageUnavailable
                        }
                      </span>

                    </div>

                  </div>

                </div>

              )}


              {/* =================================================
                  CORE DETAILS
              ================================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                {[
                  [
                    text.crop,
                    selectedScan.crop,
                  ],

                  [
                    text.result,
                    selectedScan.detectionType ===
                    'pest'
                      ? selectedScan.pest
                      : selectedScan.disease,
                  ],

                  [
                    text.confidence,
                    selectedScan.confidence !==
                    undefined &&
                    selectedScan.confidence !==
                    null
                      ? `${selectedScan.confidence}%`
                      : '—',
                  ],

                  [
                    text.severity,
                    getSeverityLabel(
                      selectedScan.severity,
                      text
                    ),
                  ],

                  [
                    text.date,
                    selectedScan.date ||
                      '—',
                  ],

                  [
                    text.status,
                    getStatusLabel(
                      selectedScan.status,
                      text
                    ),
                  ],

                  [
                    text.location,
                    selectedScan.location ||
                      '—',
                  ],

                  [
                    text.notes,
                    selectedScan.expertNotes ||
                      text.noNotes,
                  ],

                  ...(selectedScan.detectionType ===
                  'pest'
                    ? [
                        [
                          text.pestCount,
                          selectedScan.pestCount ??
                            '—',
                        ],
                      ]
                    : []),
                ].map(
                  ([label, value]) => (

                    <div
                      key={
                        label
                      }
                      className="p-4 rounded-md bg-(--bg-raised) border border-(--border-base)"
                    >

                      <p className="text-sm text-(--text-tertiary)">
                        {
                          label
                        }
                      </p>


                      <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                        {
                          value
                        }
                      </p>

                    </div>

                  )
                )}

              </div>


              {/* =================================================
                  SYMPTOMS
              ================================================== */}

              {selectedScan.symptoms && (

                <div
                  className="p-4 rounded-md"
                  style={{
                    background:
                      'var(--bg-raised)',

                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <div className="flex items-center gap-2 mb-2">

                    <LuTriangleAlert className="w-5 h-5 text-amber-500" />

                    <h3
                      className="font-semibold"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        text.symptoms
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
                      selectedScan.symptoms
                    }
                  </p>

                </div>

              )}


              {/* =================================================
                  DAMAGE
              ================================================== */}

              {selectedScan.detectionType ===
                'pest' &&
                selectedScan.damage && (

                  <div
                    className="p-4 rounded-md"
                    style={{
                      background:
                        'rgba(245,158,11,0.06)',

                      border:
                        '1px solid rgba(245,158,11,0.18)',
                    }}
                  >

                    <div className="flex items-center gap-2 mb-2">

                      <LuBug className="w-5 h-5 text-amber-600" />

                      <h3
                        className="font-semibold"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {
                          text.damage
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
                        selectedScan.damage
                      }
                    </p>

                  </div>
                )}


              {/* =================================================
                  TREATMENT
              ================================================== */}

              {(selectedScan.organicRemedy ||
                selectedScan.chemicalRemedy) && (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


                  {selectedScan.organicRemedy && (

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'rgba(34,197,94,0.06)',

                        border:
                          '1px solid rgba(34,197,94,0.18)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-2">

                        <LuSprout className="w-5 h-5 text-green-600" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.organicRemedy
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
                          selectedScan.organicRemedy
                        }
                      </p>

                    </div>

                  )}


                  {selectedScan.chemicalRemedy && (

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'rgba(245,158,11,0.06)',

                        border:
                          '1px solid rgba(245,158,11,0.18)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-2">

                        <LuFlaskConical className="w-5 h-5 text-amber-600" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.chemicalRemedy
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
                          selectedScan.chemicalRemedy
                        }
                      </p>

                    </div>

                  )}

                </div>
              )}


              {/* =================================================
                  DOSAGE + PREVENTION
              ================================================== */}

              {(selectedScan.dosagePerAcre ||
                selectedScan.preventiveTips) && (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


                  {selectedScan.dosagePerAcre && (

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-2">

                        <LuFlaskConical className="w-4 h-4 text-amber-500" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.dosage
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
                          selectedScan.dosagePerAcre
                        }
                      </p>

                    </div>

                  )}


                  {selectedScan.preventiveTips && (

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-2">

                        <LuCircleCheck className="w-4 h-4 text-green-600" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.prevention
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
                          selectedScan.preventiveTips
                        }
                      </p>

                    </div>

                  )}

                </div>
              )}


              {/* =================================================
                  BEFORE / AFTER
              ================================================== */}

              {selectedScan.beforeAfterImage && (

                <div className="space-y-3">

                  <h3 className="text-base font-semibold text-(--text-primary)">
                    {
                      text.beforeAfter
                    }
                  </h3>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">


                    {/* Before */}

                    <div>

                      <p className="text-sm text-(--text-secondary) mb-2">
                        {
                          text.before
                        }
                      </p>


                      <div className="relative aspect-video rounded-md overflow-hidden border border-(--border-base) bg-(--bg-raised)">

                        <img
                          src={
                            selectedScan
                              .beforeAfterImage
                              .before
                          }
                          alt={
                            text.before
                          }
                          className="w-full h-full object-cover"
                          onError={
                            handleImageError
                          }
                        />


                        <div className="hidden w-full h-full items-center justify-center text-(--text-tertiary)">

                          <LuImageOff className="w-6 h-6" />

                        </div>

                      </div>

                    </div>


                    {/* After */}

                    <div>

                      <p className="text-sm text-(--text-secondary) mb-2">
                        {
                          text.after
                        }
                      </p>


                      <div className="relative aspect-video rounded-md overflow-hidden border border-(--border-base) bg-(--bg-raised)">

                        <img
                          src={
                            selectedScan
                              .beforeAfterImage
                              .after
                          }
                          alt={
                            text.after
                          }
                          className="w-full h-full object-cover"
                          onError={
                            handleImageError
                          }
                        />


                        <div className="hidden w-full h-full items-center justify-center text-(--text-tertiary)">

                          <LuImageOff className="w-6 h-6" />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )}


              {/* =================================================
                  REPORT NOTICE
              ================================================== */}

              <div
                className="p-4 rounded-md text-sm"
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
                  text.reportPreparing
                }
              </div>


              {/* =================================================
                  MODAL ACTIONS
              ================================================== */}

              <div className="flex flex-col sm:flex-row justify-end gap-2">

                <Btn
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    handleDownload(
                      selectedScan
                    )
                  }
                >

                  <LuDownload className="w-4 h-4" />

                  {
                    text.download
                  }

                </Btn>


                <Btn
                  variant="primary"
                  size="md"
                  onClick={() =>
                    setSelectedScan(
                      null
                    )
                  }
                >
                  {
                    text.close
                  }
                </Btn>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


export default HistoryPage;