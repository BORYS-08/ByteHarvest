import React, {
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  useApp,
} from '../context/AppContext';

import {
  initialCropsData,
  sampleDiseaseCatalog,
  samplePestCatalog,
} from '../services/mockData';

import {
  Btn,
} from '../components/common/GlowButton';

import {
  LuArrowLeft,
  LuBookOpen,
  LuSearch,
  LuFilter,
  LuSprout,
  LuBug,
  LuShieldAlert,
  LuChevronRight,
  LuTriangleAlert,
  LuCircleCheck,
  LuX,
  LuDroplets,
  LuLandmark,
  LuImageOff,
  LuFlaskConical,
  LuScanLine,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow:
      'Farmer Knowledge Hub',

    title:
      'Knowledge Center',

    subtitle:
      'Explore crops, diseases, pests, symptoms, treatments and prevention strategies.',

    crops:
      'Crops',

    diseases:
      'Diseases',

    pests:
      'Pests',

    search:
      'Search',

    searchPlaceholder:
      'Search crop, disease, pest or symptom...',

    category:
      'Category',

    crop:
      'Crop',

    type:
      'Type',

    severity:
      'Severity',

    allCategories:
      'All Categories',

    allCrops:
      'All Crops',

    allTypes:
      'All Types',

    allSeverity:
      'All Severity',

    cereals:
      'Cereals',

    pulses:
      'Pulses',

    oilseeds:
      'Oilseeds',

    commercial:
      'Commercial Crops',

    vegetables:
      'Vegetables',

    fruits:
      'Fruits',

    spices:
      'Spices',

    plantation:
      'Plantation Crops',

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

    moderate:
      'Moderate',

    low:
      'Low',

    results:
      'results',

    learnMore:
      'Learn More',

    noResults:
      'No matching knowledge entries found.',

    clearFilters:
      'Clear Filters',

    aboutCrop:
      'About This Crop',

    growingConditions:
      'Growing Conditions',

    soil:
      'Soil',

    waterRequirement:
      'Water Requirement',

    majorDiseases:
      'Major Diseases',

    majorPests:
      'Major Pests',

    scientificName:
      'Scientific Name',

    symptoms:
      'Symptoms',

    damage:
      'Damage',

    organicRemedy:
      'Organic / Bio-Control',

    chemicalRemedy:
      'Chemical Intervention',

    dosage:
      'Standard Dosage',

    prevention:
      'Prevention',

    close:
      'Close',

    back:
      'Back to Workspace',

    scanCrop:
      'Scan This Crop',

    agriculturalLibrary:
      'Agricultural Knowledge Library',

    reference:
      'Reference',

    diseaseCount:
      'Disease Entries',

    pestCount:
      'Pest Entries',

    severityLabel:
      'Severity',

    noInformation:
      'Information not available.',

    imageUnavailable:
      'Image unavailable',
  },


  hi: {
    eyebrow:
      'किसान ज्ञान केंद्र',

    title:
      'ज्ञान केंद्र',

    subtitle:
      'फसलों, रोगों, कीटों, लक्षणों, उपचार और बचाव की जानकारी प्राप्त करें।',

    crops:
      'फसलें',

    diseases:
      'रोग',

    pests:
      'कीट',

    search:
      'खोजें',

    searchPlaceholder:
      'फसल, रोग, कीट या लक्षण खोजें...',

    category:
      'श्रेणी',

    crop:
      'फसल',

    type:
      'प्रकार',

    severity:
      'गंभीरता',

    allCategories:
      'सभी श्रेणियाँ',

    allCrops:
      'सभी फसलें',

    allTypes:
      'सभी प्रकार',

    allSeverity:
      'सभी गंभीरता',

    cereals:
      'अनाज',

    pulses:
      'दलहन',

    oilseeds:
      'तिलहन',

    commercial:
      'व्यावसायिक फसलें',

    vegetables:
      'सब्जियाँ',

    fruits:
      'फल',

    spices:
      'मसाले',

    plantation:
      'बागान फसलें',

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

    moderate:
      'मध्यम',

    low:
      'कम',

    results:
      'परिणाम',

    learnMore:
      'अधिक जानें',

    noResults:
      'कोई मिलती-जुलती जानकारी नहीं मिली।',

    clearFilters:
      'फ़िल्टर साफ़ करें',

    aboutCrop:
      'इस फसल के बारे में',

    growingConditions:
      'उगाने की परिस्थितियाँ',

    soil:
      'मिट्टी',

    waterRequirement:
      'पानी की आवश्यकता',

    majorDiseases:
      'मुख्य रोग',

    majorPests:
      'मुख्य कीट',

    scientificName:
      'वैज्ञानिक नाम',

    symptoms:
      'लक्षण',

    damage:
      'नुकसान',

    organicRemedy:
      'जैविक / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मानक मात्रा',

    prevention:
      'बचाव',

    close:
      'बंद करें',

    back:
      'वर्कस्पेस पर वापस जाएँ',

    scanCrop:
      'इस फसल को स्कैन करें',

    agriculturalLibrary:
      'कृषि ज्ञान पुस्तकालय',

    reference:
      'संदर्भ',

    diseaseCount:
      'रोग प्रविष्टियाँ',

    pestCount:
      'कीट प्रविष्टियाँ',

    severityLabel:
      'गंभीरता',

    noInformation:
      'जानकारी उपलब्ध नहीं है।',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',
  },


  mr: {
    eyebrow:
      'शेतकरी ज्ञान केंद्र',

    title:
      'ज्ञान केंद्र',

    subtitle:
      'पिके, रोग, कीड, लक्षणे, उपचार आणि प्रतिबंध यांची माहिती मिळवा.',

    crops:
      'पिके',

    diseases:
      'रोग',

    pests:
      'कीड',

    search:
      'शोधा',

    searchPlaceholder:
      'पीक, रोग, कीड किंवा लक्षणे शोधा...',

    category:
      'वर्ग',

    crop:
      'पीक',

    type:
      'प्रकार',

    severity:
      'तीव्रता',

    allCategories:
      'सर्व वर्ग',

    allCrops:
      'सर्व पिके',

    allTypes:
      'सर्व प्रकार',

    allSeverity:
      'सर्व तीव्रता',

    cereals:
      'तृणधान्ये',

    pulses:
      'डाळी',

    oilseeds:
      'तेलबिया',

    commercial:
      'व्यावसायिक पिके',

    vegetables:
      'भाज्या',

    fruits:
      'फळे',

    spices:
      'मसाले',

    plantation:
      'बागायती पिके',

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

    moderate:
      'कमी-जास्त',

    low:
      'कमी',

    results:
      'परिणाम',

    learnMore:
      'अधिक जाणून घ्या',

    noResults:
      'जुळणारी माहिती सापडली नाही.',

    clearFilters:
      'फिल्टर साफ करा',

    aboutCrop:
      'या पिकाबद्दल',

    growingConditions:
      'वाढीच्या परिस्थिती',

    soil:
      'माती',

    waterRequirement:
      'पाण्याची गरज',

    majorDiseases:
      'मुख्य रोग',

    majorPests:
      'मुख्य किडी',

    scientificName:
      'शास्त्रीय नाव',

    symptoms:
      'लक्षणे',

    damage:
      'नुकसान',

    organicRemedy:
      'सेंद्रिय / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मानक मात्रा',

    prevention:
      'प्रतिबंध',

    close:
      'बंद करा',

    back:
      'वर्कस्पेसवर परत जा',

    scanCrop:
      'हे पीक स्कॅन करा',

    agriculturalLibrary:
      'कृषी ज्ञान ग्रंथालय',

    reference:
      'संदर्भ',

    diseaseCount:
      'रोग नोंदी',

    pestCount:
      'कीड नोंदी',

    severityLabel:
      'तीव्रता',

    noInformation:
      'माहिती उपलब्ध नाही.',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getCategoryLabel = (
  category,
  text
) => {

  const map = {
    Cereals:
      text.cereals,

    Pulses:
      text.pulses,

    Oilseeds:
      text.oilseeds,

    'Commercial Crops':
      text.commercial,

    Vegetables:
      text.vegetables,

    Fruits:
      text.fruits,

    Spices:
      text.spices,

    'Spices & Vegetables':
      text.spices,

    'Plantation Crops':
      text.plantation,
  };

  return (
    map[category] ||
    category ||
    ''
  );
};


const getSeverityStyle = (
  severity
) => {

  switch (severity) {

    case 'Critical':
      return {
        background:
          'rgba(239,68,68,0.10)',
        color:
          '#dc2626',
        border:
          'rgba(239,68,68,0.20)',
      };

    case 'High':
      return {
        background:
          'rgba(245,158,11,0.10)',
        color:
          '#b45309',
        border:
          'rgba(245,158,11,0.20)',
      };

    case 'Moderate':
      return {
        background:
          'rgba(59,130,246,0.10)',
        color:
          '#2563eb',
        border:
          'rgba(59,130,246,0.20)',
      };

    case 'Healthy':
      return {
        background:
          'rgba(34,197,94,0.10)',
        color:
          '#15803d',
        border:
          'rgba(34,197,94,0.20)',
      };

    default:
      return {
        background:
          'var(--bg-raised)',
        color:
          'var(--text-secondary)',
        border:
          'var(--border-base)',
      };
  }
};


const inferDiseaseCrop = (
  item
) => {

  const explicitCrop =
    item.crop;

  if (explicitCrop) {
    return explicitCrop;
  }

  const name =
    String(
      item.name || ''
    ).toLowerCase();


  if (
    name.includes('rice') ||
    name.includes('bacterial blight')
  ) {
    return 'Rice (Paddy)';
  }


  if (
    name.includes('tomato')
  ) {
    return 'Tomato';
  }


  if (
    name.includes(
      'pink bollworm'
    )
  ) {
    return 'Cotton';
  }


  if (
    name.includes('maize') ||
    name.includes('corn') ||
    name.includes('healthy')
  ) {
    return 'Maize (Corn)';
  }


  return '';
};


const translateSeverity =
  (
    severity,
    text
  ) => {

    const map = {
      Critical:
        text.critical,

      High:
        text.high,

      Moderate:
        text.moderate,

      Healthy:
        text.healthy,

      Low:
        text.low,
    };

    return (
      map[severity] ||
      severity ||
      '—'
    );
  };


/* ============================================================
   PAGE
   ============================================================ */

export const KnowledgeCenterPage = () => {

  const navigate =
    useNavigate();


  const {
    language,
    roleConfig,
  } = useApp();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    activeSection,
    setActiveSection,
  ] = useState(
    'crops'
  );


  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');


  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    'all'
  );


  const [
    selectedCrop,
    setSelectedCrop,
  ] = useState(
    'all'
  );


  const [
    selectedType,
    setSelectedType,
  ] = useState(
    'all'
  );


  const [
    selectedSeverity,
    setSelectedSeverity,
  ] = useState(
    'all'
  );


  const [
    selectedEntry,
    setSelectedEntry,
  ] = useState(null);


  /* ==========================================================
     CROP ENTRIES
     ========================================================== */

  const cropEntries =
    useMemo(
      () =>
        Array.isArray(
          initialCropsData
        )
          ? initialCropsData
          : [],
      []
    );


  /* ==========================================================
     DISEASE ENTRIES
     ========================================================== */

  const diseaseEntries =
    useMemo(
      () =>
        Object.values(
          sampleDiseaseCatalog ||
            {}
        ).map(
          (item) => ({
            ...item,

            crop:
              inferDiseaseCrop(
                item
              ),

            type:
              'disease',
          })
        ),
      []
    );


  /* ==========================================================
     PEST ENTRIES
     ========================================================== */

  const pestEntries =
    useMemo(
      () =>
        Object.values(
          samplePestCatalog ||
            {}
        ).map(
          (item) => ({
            ...item,

            type:
              'pest',
          })
        ),
      []
    );


  /* ==========================================================
     ACTIVE ENTRIES
     ========================================================== */

  const activeEntries =
    useMemo(() => {

      if (
        activeSection ===
        'crops'
      ) {
        return cropEntries;
      }


      if (
        activeSection ===
        'diseases'
      ) {
        return diseaseEntries;
      }


      return pestEntries;

    }, [
      activeSection,
      cropEntries,
      diseaseEntries,
      pestEntries,
    ]);


  /* ==========================================================
     FILTERED ENTRIES
     ========================================================== */

  const filteredEntries =
    useMemo(() => {

      const query =
        searchTerm
          .trim()
          .toLowerCase();


      return activeEntries.filter(
        (entry) => {

          const searchableText = [
            entry.name,
            entry.scientificName,
            entry.category,
            entry.description,
            entry.crop,
            entry.symptoms,
            entry.damage,
            entry.preventiveTips,
            entry.waterRequirement,
            ...(entry.commonDiseases ||
              []),
            ...(entry.commonPests ||
              []),
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();


          const matchesSearch =
            !query ||
            searchableText.includes(
              query
            );


          const matchesCategory =
            activeSection ===
              'crops'
              ? selectedCategory ===
                  'all' ||
                entry.category ===
                  selectedCategory
              : true;


          const matchesCrop =
            activeSection !==
              'crops'
              ? selectedCrop ===
                  'all' ||
                entry.crop ===
                  selectedCrop
              : true;


          const matchesType =
            activeSection !==
              'crops'
              ? selectedType ===
                  'all' ||
                entry.type ===
                  selectedType
              : true;


          const matchesSeverity =
            activeSection !==
              'crops'
              ? selectedSeverity ===
                  'all' ||
                entry.severity ===
                  selectedSeverity
              : true;


          return (
            matchesSearch &&
            matchesCategory &&
            matchesCrop &&
            matchesType &&
            matchesSeverity
          );

        }
      );

    }, [
      activeEntries,
      activeSection,
      searchTerm,
      selectedCategory,
      selectedCrop,
      selectedType,
      selectedSeverity,
    ]);


  /* ==========================================================
     RESET
     ========================================================== */

  const clearFilters =
    () => {

      setSearchTerm('');

      setSelectedCategory(
        'all'
      );

      setSelectedCrop(
        'all'
      );

      setSelectedType(
        'all'
      );

      setSelectedSeverity(
        'all'
      );

    };


  /* ==========================================================
     SECTION CHANGE
     ========================================================== */

  const changeSection =
    (section) => {

      setActiveSection(
        section
      );

      setSearchTerm('');

      setSelectedCategory(
        'all'
      );

      setSelectedCrop(
        'all'
      );

      setSelectedType(
        'all'
      );

      setSelectedSeverity(
        'all'
      );

      setSelectedEntry(
        null
      );

    };


  /* ==========================================================
     BACK
     ========================================================== */

  const handleBack =
    () => {

      navigate(
        roleConfig?.defaultRoute ||
        '/farmer'
      );

    };


  /* ==========================================================
     SCAN SELECTED CROP
     ========================================================== */

  const handleScanCrop =
    (crop) => {

      setSelectedEntry(
        null
      );


      navigate(
        '/scanner',
        {
          state: {
            crop:
              crop?.name ||
              '',
          },
        }
      );

    };


  /* ==========================================================
     IMAGE ERROR
     ========================================================== */

  const handleImageError =
    (event) => {

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
            {
              text.eyebrow
            }
          </p>


          <h1
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <LuBookOpen className="w-6 h-6 text-green-600" />

            {
              text.title
            }

          </h1>


          <p
            className="text-sm mt-2 max-w-3xl"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.subtitle
            }
          </p>

        </div>


        <Btn
          variant="secondary"
          size="sm"
          onClick={
            handleBack
          }
        >

          <LuArrowLeft className="w-4 h-4" />

          {
            text.back
          }

        </Btn>

      </div>


      {/* ======================================================
          SECTION SWITCHER
      ======================================================= */}

      <div className="card p-2">

        <div className="grid grid-cols-3 gap-2">

          {[
            {
              key:
                'crops',

              label:
                text.crops,

              icon:
                LuSprout,
            },

            {
              key:
                'diseases',

              label:
                text.diseases,

              icon:
                LuShieldAlert,
            },

            {
              key:
                'pests',

              label:
                text.pests,

              icon:
                LuBug,
            },
          ].map(
            ({
              key,
              label,
              icon:
                Icon,
            }) => {

              const active =
                activeSection ===
                key;


              return (
                <button
                  key={
                    key
                  }
                  type="button"
                  onClick={() =>
                    changeSection(
                      key
                    )
                  }
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-md text-sm font-semibold cursor-pointer transition-colors"
                  style={{
                    background:
                      active
                        ? 'var(--accent-green-muted)'
                        : 'transparent',

                    color:
                      active
                        ? 'var(--accent-green)'
                        : 'var(--text-secondary)',

                    border:
                      active
                        ? '1px solid rgba(34,197,94,0.25)'
                        : '1px solid transparent',
                  }}
                >

                  <Icon className="w-4 h-4" />

                  {
                    label
                  }

                </button>
              );

            }
          )}

        </div>

      </div>


      {/* ======================================================
          SEARCH + FILTERS
      ======================================================= */}

      <div className="card p-4 space-y-4">

        <div
          className={
            activeSection ===
            'crops'
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-3'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3'
          }
        >

          {/* Search */}

          <div
            className={
              activeSection ===
              'crops'
                ? 'lg:col-span-8'
                : 'lg:col-span-5'
            }
          >

            <label
              className="block text-sm font-medium mb-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.search
              }
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


          {/* Crop category */}

          {activeSection ===
            'crops' && (

            <div className="lg:col-span-4">

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.category
                }
              </label>


              <select
                value={
                  selectedCategory
                }
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="field-select"
              >

                <option value="all">
                  {
                    text.allCategories
                  }
                </option>

                <option value="Cereals">
                  {
                    text.cereals
                  }
                </option>

                <option value="Pulses">
                  {
                    text.pulses
                  }
                </option>

                <option value="Oilseeds">
                  {
                    text.oilseeds
                  }
                </option>

                <option value="Commercial Crops">
                  {
                    text.commercial
                  }
                </option>

                <option value="Vegetables">
                  {
                    text.vegetables
                  }
                </option>

                <option value="Fruits">
                  {
                    text.fruits
                  }
                </option>

                <option value="Spices">
                  {
                    text.spices
                  }
                </option>

                <option value="Spices & Vegetables">
                  {
                    text.spices
                  }
                </option>

                <option value="Plantation Crops">
                  {
                    text.plantation
                  }
                </option>

              </select>

            </div>
          )}


          {/* Crop filter */}

          {activeSection !==
            'crops' && (

            <div className="lg:col-span-3">

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.crop
                }
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
                  {
                    text.allCrops
                  }
                </option>


                {initialCropsData.map(
                  (crop) => (

                    <option
                      key={
                        crop.id
                      }
                      value={
                        crop.name
                      }
                    >
                      {
                        crop.name
                      }
                    </option>

                  )
                )}

              </select>

            </div>
          )}


          {/* Type */}

          {activeSection !==
            'crops' && (

            <div className="lg:col-span-2">

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.type
                }
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
                  {
                    text.allTypes
                  }
                </option>

                <option value="disease">
                  {
                    text.disease
                  }
                </option>

                <option value="pest">
                  {
                    text.pest
                  }
                </option>

              </select>

            </div>
          )}


          {/* Severity */}

          {activeSection !==
            'crops' && (

            <div className="lg:col-span-2">

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.severity
                }
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
                  {
                    text.allSeverity
                  }
                </option>

                <option value="Critical">
                  {
                    text.critical
                  }
                </option>

                <option value="High">
                  {
                    text.high
                  }
                </option>

                <option value="Moderate">
                  {
                    text.moderate
                  }
                </option>

                <option value="Low">
                  {
                    text.low
                  }
                </option>

                <option value="Healthy">
                  {
                    text.healthy
                  }
                </option>

              </select>

            </div>
          )}

        </div>


        {/* Filter footer */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

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
                filteredEntries.length
              }{' '}
              {
                text.results
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
          RESULT CARDS
      ======================================================= */}

      {filteredEntries.length ===
      0 ? (

        <div className="card p-10 text-center">

          <LuBookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" />


          <p
            className="text-sm"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.noResults
            }
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {filteredEntries.map(
            (entry) => {

              /* ==================================================
                 CROP CARD
              =================================================== */

              if (
                activeSection ===
                'crops'
              ) {

                return (
                  <button
                    key={
                      entry.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedEntry(
                        {
                          kind:
                            'crop',
                          data:
                            entry,
                        }
                      )
                    }
                    className="card card-hover p-5 text-left cursor-pointer"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div
                        className="w-14 h-14 rounded-md flex items-center justify-center text-3xl"
                        style={{
                          background:
                            'var(--accent-green-muted)',

                          border:
                            '1px solid rgba(34,197,94,0.18)',
                        }}
                      >
                        {
                          entry.icon
                        }
                      </div>


                      <span
                        className="text-xs px-2 py-1 rounded-md font-semibold"
                        style={{
                          background:
                            'var(--bg-raised)',

                          color:
                            'var(--text-tertiary)',
                        }}
                      >
                        {
                          getCategoryLabel(
                            entry.category,
                            text
                          )
                        }
                      </span>

                    </div>


                    <h3
                      className="text-lg font-bold mt-4"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        entry.name
                      }
                    </h3>


                    <p
                      className="text-sm italic mt-1"
                      style={{
                        color:
                          'var(--text-tertiary)',
                      }}
                    >
                      {
                        entry.scientificName
                      }
                    </p>


                    <p
                      className="text-sm leading-relaxed mt-3 line-clamp-3"
                      style={{
                        color:
                          'var(--text-secondary)',
                      }}
                    >
                      {
                        entry.description ||
                        text.noInformation
                      }
                    </p>


                    <div className="grid grid-cols-2 gap-2 mt-4">

                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-raised)',
                        }}
                      >

                        <p className="metric-label">
                          {
                            text.majorDiseases
                          }
                        </p>


                        <p
                          className="text-sm font-semibold mt-1"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            entry.commonDiseases
                              ?.length ||
                            0
                          }
                        </p>

                      </div>


                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-raised)',
                        }}
                      >

                        <p className="metric-label">
                          {
                            text.majorPests
                          }
                        </p>


                        <p
                          className="text-sm font-semibold mt-1"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            entry.commonPests
                              ?.length ||
                            0
                          }
                        </p>

                      </div>

                    </div>


                    <div
                      className="flex items-center justify-between mt-4 pt-3"
                      style={{
                        borderTop:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <span className="text-sm font-medium text-green-700">
                        {
                          text.learnMore
                        }
                      </span>


                      <LuChevronRight className="w-4 h-4 text-green-600" />

                    </div>

                  </button>
                );
              }


              /* ==================================================
                 DISEASE / PEST CARD
              =================================================== */

              const isPest =
                entry.type ===
                'pest';


              const severity =
                getSeverityStyle(
                  entry.severity
                );


              return (
                <button
                  key={
                    entry.id
                  }
                  type="button"
                  onClick={() =>
                    setSelectedEntry(
                      {
                        kind:
                          isPest
                            ? 'pest'
                            : 'disease',
                        data:
                          entry,
                      }
                    )
                  }
                  className="card card-hover p-4 text-left cursor-pointer"
                >

                  <div className="relative h-40 rounded-md overflow-hidden mb-4 bg-(--bg-raised)">

                    {entry.sampleImage ? (

                      <img
                        src={
                          entry.sampleImage
                        }
                        alt={
                          entry.name
                        }
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={
                          handleImageError
                        }
                      />

                    ) : null}


                    <div
                      className="w-full h-full hidden absolute inset-0 items-center justify-center"
                      style={{
                        background:
                          'var(--bg-raised)',
                      }}
                    >

                      {isPest ? (

                        <LuBug className="w-12 h-12 text-amber-500 opacity-60" />

                      ) : (

                        <LuShieldAlert className="w-12 h-12 text-green-600 opacity-60" />

                      )}

                    </div>


                    <div
                      className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5"
                      style={{
                        background:
                          'rgba(255,255,255,0.94)',

                        color:
                          isPest
                            ? '#b45309'
                            : '#15803d',
                      }}
                    >

                      {isPest ? (
                        <LuBug className="w-3.5 h-3.5" />
                      ) : (
                        <LuShieldAlert className="w-3.5 h-3.5" />
                      )}

                      {
                        isPest
                          ? text.pest
                          : text.disease
                      }

                    </div>


                    <span
                      className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold"
                      style={{
                        background:
                          severity.background,

                        color:
                          severity.color,

                        border:
                          `1px solid ${severity.border}`,
                      }}
                    >
                      {
                        translateSeverity(
                          entry.severity,
                          text
                        )
                      }
                    </span>

                  </div>


                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        'var(--accent-green)',
                    }}
                  >
                    {
                      entry.crop ||
                      '—'
                    }
                  </p>


                  <h3
                    className="text-lg font-semibold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      entry.name
                    }
                  </h3>


                  <p
                    className="text-sm italic mt-1"
                    style={{
                      color:
                        'var(--text-tertiary)',
                    }}
                  >
                    {
                      entry.scientificName ||
                      '—'
                    }
                  </p>


                  <p
                    className="text-sm leading-relaxed mt-3 line-clamp-3"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      entry.symptoms ||
                      entry.damage ||
                      text.noInformation
                    }
                  </p>


                  <div
                    className="flex items-center justify-between mt-4 pt-3"
                    style={{
                      borderTop:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <span className="text-sm font-medium text-green-700">
                      {
                        text.learnMore
                      }
                    </span>


                    <LuChevronRight className="w-4 h-4 text-green-600" />

                  </div>

                </button>
              );

            }
          )}

        </div>
      )}


      {/* ======================================================
          MODAL
      ======================================================= */}

      {selectedEntry && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{
              background:
                'var(--bg-surface)',

              border:
                '1px solid var(--border-base)',

              borderRadius:
                '0.75rem',

              boxShadow:
                '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >

            {/* Modal Header */}

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

                <p
                  className="text-xs uppercase tracking-wide"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.reference
                  }
                </p>


                <h2
                  className="text-xl sm:text-2xl font-bold mt-1"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    selectedEntry.data.name
                  }
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedEntry(
                    null
                  )
                }
                className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-black/5 cursor-pointer"
                aria-label={
                  text.close
                }
              >

                <LuX className="w-5 h-5" />

              </button>

            </div>


            <div className="p-5 space-y-6">


              {/* =================================================
                  CROP DETAILS
              ================================================== */}

              {selectedEntry.kind ===
                'crop' && (

                <>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                    <div className="lg:col-span-2">

                      <div
                        className="aspect-square rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            'var(--accent-green-muted)',

                          border:
                            '1px solid rgba(34,197,94,0.18)',
                        }}
                      >

                        <span className="text-8xl">
                          {
                            selectedEntry
                              .data
                              .icon
                          }
                        </span>

                      </div>

                    </div>


                    <div className="lg:col-span-3 space-y-4">

                      <div>

                        <p className="metric-label">
                          {
                            getCategoryLabel(
                              selectedEntry
                                .data
                                .category,
                              text
                            )
                          }
                        </p>


                        <h3
                          className="text-2xl font-bold mt-1"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            selectedEntry
                              .data
                              .name
                          }
                        </h3>


                        <p
                          className="text-sm italic mt-1"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            selectedEntry
                              .data
                              .scientificName
                          }
                        </p>

                      </div>


                      <div>

                        <p className="metric-label">
                          {
                            text.aboutCrop
                          }
                        </p>


                        <p
                          className="text-sm leading-relaxed mt-2"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            selectedEntry
                              .data
                              .description ||
                            text.noInformation
                          }
                        </p>

                      </div>


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

                          <LuLandmark className="w-4 h-4 text-green-600" />

                          <p className="metric-label">
                            {
                              text.growingConditions
                            }
                          </p>

                        </div>


                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            selectedEntry
                              .data
                              .growingConditions ||
                            text.noInformation
                          }
                        </p>

                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <div
                          className="p-3 rounded-md"
                          style={{
                            background:
                              'var(--bg-raised)',
                          }}
                        >

                          <div className="flex items-center gap-2">

                            <LuLandmark className="w-4 h-4 text-green-600" />

                            <p className="metric-label">
                              {
                                text.soil
                              }
                            </p>

                          </div>


                          <p
                            className="text-sm mt-2 leading-relaxed"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                          >
                            {
                              selectedEntry
                                .data
                                .soil ||
                              text.noInformation
                            }
                          </p>

                        </div>


                        <div
                          className="p-3 rounded-md"
                          style={{
                            background:
                              'var(--bg-raised)',
                          }}
                        >

                          <div className="flex items-center gap-2">

                            <LuDroplets className="w-4 h-4 text-sky-600" />

                            <p className="metric-label">
                              {
                                text.waterRequirement
                              }
                            </p>

                          </div>


                          <p
                            className="text-sm mt-2 leading-relaxed"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                          >
                            {
                              selectedEntry
                                .data
                                .waterRequirement ||
                              text.noInformation
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Diseases + Pests */}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'rgba(239,68,68,0.05)',

                        border:
                          '1px solid rgba(239,68,68,0.15)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-3">

                        <LuShieldAlert className="w-5 h-5 text-red-500" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.majorDiseases
                          }
                        </h3>

                      </div>


                      <div className="space-y-2">

                        {(selectedEntry
                          .data
                          .commonDiseases ||
                          []
                        ).length > 0 ? (

                          selectedEntry
                            .data
                            .commonDiseases
                            .map(
                              (
                                disease
                              ) => (

                                <div
                                  key={
                                    disease
                                  }
                                  className="text-sm p-2 rounded-md"
                                  style={{
                                    background:
                                      'var(--bg-surface)',

                                    color:
                                      'var(--text-secondary)',
                                  }}
                                >
                                  {
                                    disease
                                  }
                                </div>

                              )
                            )

                        ) : (

                          <p
                            className="text-sm"
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            {
                              text.noInformation
                            }
                          </p>

                        )}

                      </div>

                    </div>


                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'rgba(245,158,11,0.05)',

                        border:
                          '1px solid rgba(245,158,11,0.15)',
                      }}
                    >

                      <div className="flex items-center gap-2 mb-3">

                        <LuBug className="w-5 h-5 text-amber-600" />

                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            text.majorPests
                          }
                        </h3>

                      </div>


                      <div className="space-y-2">

                        {(selectedEntry
                          .data
                          .commonPests ||
                          []
                        ).length > 0 ? (

                          selectedEntry
                            .data
                            .commonPests
                            .map(
                              (
                                pest
                              ) => (

                                <div
                                  key={
                                    pest
                                  }
                                  className="text-sm p-2 rounded-md"
                                  style={{
                                    background:
                                      'var(--bg-surface)',

                                    color:
                                      'var(--text-secondary)',
                                  }}
                                >
                                  {
                                    pest
                                  }
                                </div>

                              )
                            )

                        ) : (

                          <p
                            className="text-sm"
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            {
                              text.noInformation
                            }
                          </p>

                        )}

                      </div>

                    </div>

                  </div>


                  {/* Scan action */}

                  <Btn
                    variant="primary"
                    size="md"
                    onClick={() =>
                      handleScanCrop(
                        selectedEntry.data
                      )
                    }
                    className="w-full justify-center"
                  >

                    <LuScanLine className="w-4 h-4" />

                    {
                      text.scanCrop
                    }

                  </Btn>

                </>

              )}


              {/* =================================================
                  DISEASE / PEST DETAILS
              ================================================== */}

              {selectedEntry.kind !==
                'crop' && (

                <>

                  {selectedEntry
                    .data
                    .sampleImage && (

                    <div className="relative rounded-lg overflow-hidden bg-(--bg-raised)">

                      <img
                        src={
                          selectedEntry
                            .data
                            .sampleImage
                        }
                        alt={
                          selectedEntry
                            .data
                            .name
                        }
                        className="w-full h-56 sm:h-72 object-cover"
                        onError={
                          handleImageError
                        }
                      />


                      <div className="hidden absolute inset-0 items-center justify-center">

                        <div className="flex flex-col items-center gap-2 text-(--text-tertiary)">

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


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div
                      className="p-4 rounded-md"
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
                        className="text-sm font-semibold mt-1"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {
                          selectedEntry
                            .data
                            .crop ||
                          text.noInformation
                        }
                      </p>

                    </div>


                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <p className="metric-label">
                        {
                          text.scientificName
                        }
                      </p>


                      <p
                        className="text-sm font-semibold mt-1"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {
                          selectedEntry
                            .data
                            .scientificName ||
                          text.noInformation
                        }
                      </p>

                    </div>


                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <p className="metric-label">
                        {
                          text.severityLabel
                        }
                      </p>


                      <p
                        className="text-sm font-semibold mt-1"
                        style={{
                          color:
                            getSeverityStyle(
                              selectedEntry
                                .data
                                .severity
                            ).color,
                        }}
                      >
                        {
                          translateSeverity(
                            selectedEntry
                              .data
                              .severity,
                            text
                          )
                        }
                      </p>

                    </div>


                    {selectedEntry
                      .kind ===
                      'pest' &&
                      selectedEntry
                        .data
                        .pestCount !=
                        null && (

                        <div
                          className="p-4 rounded-md"
                          style={{
                            background:
                              'var(--bg-raised)',

                            border:
                              '1px solid var(--border-base)',
                          }}
                        >

                          <p className="metric-label">
                            {
                              text.pestCount
                            }
                          </p>


                          <p
                            className="text-sm font-semibold mt-1"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              selectedEntry
                                .data
                                .pestCount
                            }
                          </p>

                        </div>

                      )}

                  </div>


                  {/* Symptoms */}

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
                        selectedEntry
                          .data
                          .symptoms ||
                        text.noInformation
                      }
                    </p>

                  </div>


                  {/* Damage */}

                  {selectedEntry.kind ===
                    'pest' &&
                    selectedEntry
                      .data
                      .damage && (

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
                            selectedEntry
                              .data
                              .damage
                          }
                        </p>

                      </div>
                    )}


                  {/* Remedies */}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

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
                          selectedEntry
                            .data
                            .organicRemedy ||
                          text.noInformation
                        }
                      </p>

                    </div>


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
                          selectedEntry
                            .data
                            .chemicalRemedy ||
                          text.noInformation
                        }
                      </p>

                    </div>

                  </div>


                  {/* Dosage + Prevention */}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

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
                          selectedEntry
                            .data
                            .dosagePerAcre ||
                          text.noInformation
                        }
                      </p>

                    </div>


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
                          selectedEntry
                            .data
                            .preventiveTips ||
                          text.noInformation
                        }
                      </p>

                    </div>

                  </div>

                </>

              )}


              <Btn
                variant="primary"
                size="md"
                onClick={() =>
                  setSelectedEntry(
                    null
                  )
                }
                className="w-full justify-center"
              >
                {
                  text.close
                }
              </Btn>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


export default KnowledgeCenterPage;