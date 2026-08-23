import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  useApp,
} from '../context/AppContext';

import {
  useScans,
} from '../context/ScanContext';

import {
  Btn,
} from '../components/common/GlowButton';

import {
  LuArrowLeft,
  LuUpload,
  LuSend,
  LuUserRound,
  LuFileImage,
  LuCircleCheck,
  LuClock3,
  LuMessageSquare,
  LuShieldAlert,
  LuBug,
  LuSprout,
  LuScanLine,
  LuX,
  LuImageOff,
  LuCircleAlert,
  LuFlaskConical,
} from 'react-icons/lu';


/* ============================================================
   CONFIG
   ============================================================ */

const MAX_IMAGE_SIZE_MB = 5;

const MAX_IMAGE_SIZE_BYTES =
  MAX_IMAGE_SIZE_MB * 1024 * 1024;


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow: 'Expert Support',

    title: 'Consult an Agricultural Expert',

    subtitle:
      'Submit your crop case for expert review and recommendations.',

    caseDetails: 'Case Details',

    crop: 'Crop',

    cropPlaceholder:
      'Select crop',

    issueType: 'Issue Type',

    disease: 'Disease',

    pest: 'Pest',

    issue: 'Detected Disease / Pest',

    issuePlaceholder:
      'Enter detected disease or pest',

    priority: 'Priority',

    low: 'Low',

    medium: 'Medium',

    high: 'High',

    urgent: 'Urgent',

    symptoms:
      'Symptoms / Field Observations',

    symptomsPlaceholder:
      'Describe what you observed in the field...',

    farmerNotes:
      'Additional Notes',

    farmerNotesPlaceholder:
      'Add any additional information for the expert...',

    image:
      'Case Image',

    uploadImage:
      'Upload Image',

    replaceImage:
      'Replace Image',

    imageHint:
      'Upload a clear crop or pest image for expert review.',

    submit:
      'Submit for Expert Review',

    submitting:
      'Submitting Case...',

    recentCases:
      'My Consultation Cases',

    noCases:
      'You have not submitted any consultation cases yet.',

    submitted:
      'Submitted',

    underReview:
      'Under Review',

    responded:
      'Expert Responded',

    closed:
      'Closed',

    viewCase:
      'View Case',

    back:
      'Back to Workspace',

    caseSubmitted:
      'Your case has been submitted successfully.',

    caseNumber:
      'Case ID',

    expertResponse:
      'Expert Response',

    waiting:
      'Waiting for expert response.',

    status:
      'Status',

    date:
      'Submitted',

    resultFromScan:
      'Use Latest Scan',

    scanImported:
      'Scan imported automatically',

    uploadRequired:
      'Please upload an image before submitting.',

    cropRequired:
      'Please select a crop.',

    issueRequired:
      'Please enter the detected disease or pest.',

    symptomsRequired:
      'Please describe the symptoms or field observations.',

    notes:
      'Notes',

    confidence:
      'Confidence',

    severity:
      'Severity',

    risk:
      'Risk',

    noResponse:
      'No expert response yet.',

    close:
      'Close',

    imageTooLarge:
      `Image is too large. Please choose an image under ${MAX_IMAGE_SIZE_MB} MB.`,

    invalidImage:
      'Please select a valid image file.',

    imageReadError:
      'The image could not be loaded. Please try another image.',

    imageUnavailable:
      'Image unavailable',

    maize:
      'Maize (Corn)',

    scanId:
      'Scan ID',

    farmer:
      'Farmer',

    extension:
      'Extension Worker',

    expert:
      'Agri-Expert',

    official:
      'Agri-Official',

    admin:
      'Administrator',
  },


  hi: {
    eyebrow:
      'विशेषज्ञ सहायता',

    title:
      'कृषि विशेषज्ञ से परामर्श',

    subtitle:
      'अपनी फसल की समस्या विशेषज्ञ समीक्षा और सलाह के लिए भेजें।',

    caseDetails:
      'मामले का विवरण',

    crop:
      'फसल',

    cropPlaceholder:
      'फसल चुनें',

    issueType:
      'समस्या का प्रकार',

    disease:
      'रोग',

    pest:
      'कीट',

    issue:
      'पहचाना गया रोग / कीट',

    issuePlaceholder:
      'पहचाने गए रोग या कीट का नाम दर्ज करें',

    priority:
      'प्राथमिकता',

    low:
      'कम',

    medium:
      'मध्यम',

    high:
      'उच्च',

    urgent:
      'तत्काल',

    symptoms:
      'लक्षण / खेत का निरीक्षण',

    symptomsPlaceholder:
      'खेत में दिखाई देने वाले लक्षणों का वर्णन करें...',

    farmerNotes:
      'अतिरिक्त जानकारी',

    farmerNotesPlaceholder:
      'विशेषज्ञ के लिए कोई अतिरिक्त जानकारी दर्ज करें...',

    image:
      'मामले की तस्वीर',

    uploadImage:
      'तस्वीर अपलोड करें',

    replaceImage:
      'तस्वीर बदलें',

    imageHint:
      'विशेषज्ञ समीक्षा के लिए साफ फसल या कीट की तस्वीर अपलोड करें।',

    submit:
      'विशेषज्ञ समीक्षा के लिए भेजें',

    submitting:
      'मामला भेजा जा रहा है...',

    recentCases:
      'मेरे परामर्श मामले',

    noCases:
      'आपने अभी तक कोई परामर्श मामला जमा नहीं किया है।',

    submitted:
      'जमा किया गया',

    underReview:
      'समीक्षा में',

    responded:
      'विशेषज्ञ ने उत्तर दिया',

    closed:
      'बंद',

    viewCase:
      'मामला देखें',

    back:
      'वर्कस्पेस पर वापस जाएँ',

    caseSubmitted:
      'आपका मामला सफलतापूर्वक जमा हो गया है।',

    caseNumber:
      'मामला ID',

    expertResponse:
      'विशेषज्ञ का उत्तर',

    waiting:
      'विशेषज्ञ के उत्तर की प्रतीक्षा है।',

    status:
      'स्थिति',

    date:
      'जमा किया गया',

    resultFromScan:
      'नवीनतम स्कैन का उपयोग करें',

    scanImported:
      'स्कैन स्वतः आयात हो गया',

    uploadRequired:
      'कृपया जमा करने से पहले तस्वीर अपलोड करें।',

    cropRequired:
      'कृपया फसल चुनें।',

    issueRequired:
      'कृपया पहचाने गए रोग या कीट का नाम दर्ज करें।',

    symptomsRequired:
      'कृपया लक्षण या खेत का निरीक्षण दर्ज करें।',

    notes:
      'नोट्स',

    confidence:
      'विश्वसनीयता',

    severity:
      'गंभीरता',

    risk:
      'जोखिम',

    noResponse:
      'अभी तक कोई विशेषज्ञ उत्तर नहीं है।',

    close:
      'बंद करें',

    imageTooLarge:
      `चित्र बहुत बड़ा है। ${MAX_IMAGE_SIZE_MB} MB से कम का चित्र चुनें।`,

    invalidImage:
      'कृपया एक मान्य चित्र फ़ाइल चुनें।',

    imageReadError:
      'चित्र लोड नहीं हो सका। कृपया दूसरा चित्र चुनें।',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',

    maize:
      'मक्का (कॉर्न)',

    scanId:
      'स्कैन ID',

    farmer:
      'किसान',

    extension:
      'फील्ड एक्सटेंशन',

    expert:
      'कृषि विशेषज्ञ',

    official:
      'कृषि अधिकारी',

    admin:
      'प्रशासक',
  },


  mr: {
    eyebrow:
      'तज्ज्ञ सहाय्य',

    title:
      'कृषी तज्ज्ञांचा सल्ला घ्या',

    subtitle:
      'तुमच्या पिकाचे प्रकरण तज्ज्ञ तपासणी आणि सल्ल्यासाठी पाठवा.',

    caseDetails:
      'प्रकरण तपशील',

    crop:
      'पीक',

    cropPlaceholder:
      'पीक निवडा',

    issueType:
      'समस्येचा प्रकार',

    disease:
      'रोग',

    pest:
      'कीड',

    issue:
      'ओळखलेला रोग / कीड',

    issuePlaceholder:
      'ओळखलेला रोग किंवा किडीचे नाव भरा',

    priority:
      'प्राधान्य',

    low:
      'कमी',

    medium:
      'मध्यम',

    high:
      'उच्च',

    urgent:
      'तातडीचे',

    symptoms:
      'लक्षणे / शेत निरीक्षण',

    symptomsPlaceholder:
      'शेतात दिसणाऱ्या लक्षणांचे वर्णन करा...',

    farmerNotes:
      'अतिरिक्त माहिती',

    farmerNotesPlaceholder:
      'तज्ज्ञांसाठी अतिरिक्त माहिती भरा...',

    image:
      'प्रकरणाचा फोटो',

    uploadImage:
      'फोटो अपलोड करा',

    replaceImage:
      'फोटो बदला',

    imageHint:
      'तज्ज्ञ तपासणीसाठी स्पष्ट पीक किंवा किडीचा फोटो अपलोड करा.',

    submit:
      'तज्ज्ञ तपासणीसाठी पाठवा',

    submitting:
      'प्रकरण पाठवत आहे...',

    recentCases:
      'माझी तज्ज्ञ प्रकरणे',

    noCases:
      'तुम्ही अद्याप कोणतेही तज्ज्ञ प्रकरण पाठवलेले नाही.',

    submitted:
      'पाठवले',

    underReview:
      'तपासणीमध्ये',

    responded:
      'तज्ज्ञांनी उत्तर दिले',

    closed:
      'बंद',

    viewCase:
      'प्रकरण पहा',

    back:
      'वर्कस्पेसवर परत जा',

    caseSubmitted:
      'तुमचे प्रकरण यशस्वीरित्या पाठवले आहे.',

    caseNumber:
      'प्रकरण ID',

    expertResponse:
      'तज्ज्ञांचा प्रतिसाद',

    waiting:
      'तज्ज्ञांच्या प्रतिसादाची प्रतीक्षा आहे.',

    status:
      'स्थिती',

    date:
      'पाठवले',

    resultFromScan:
      'नवीनतम स्कॅन वापरा',

    scanImported:
      'स्कॅन आपोआप आयात झाला',

    uploadRequired:
      'कृपया पाठवण्यापूर्वी फोटो अपलोड करा.',

    cropRequired:
      'कृपया पीक निवडा.',

    issueRequired:
      'कृपया ओळखलेल्या रोग किंवा किडीचे नाव भरा.',

    symptomsRequired:
      'कृपया लक्षणे किंवा शेत निरीक्षण भरा.',

    notes:
      'नोंदी',

    confidence:
      'विश्वास पातळी',

    severity:
      'तीव्रता',

    risk:
      'धोका',

    noResponse:
      'अजून तज्ज्ञांचा प्रतिसाद उपलब्ध नाही.',

    close:
      'बंद करा',

    imageTooLarge:
      `प्रतिमा खूप मोठी आहे. ${MAX_IMAGE_SIZE_MB} MB पेक्षा कमी प्रतिमा निवडा.`,

    invalidImage:
      'कृपया वैध प्रतिमा फाइल निवडा.',

    imageReadError:
      'प्रतिमा लोड होऊ शकली नाही. कृपया दुसरी प्रतिमा निवडा.',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',

    maize:
      'मका (कॉर्न)',

    scanId:
      'स्कॅन ID',

    farmer:
      'शेतकरी',

    extension:
      'विस्तार कर्मचारी',

    expert:
      'कृषी तज्ज्ञ',

    official:
      'कृषी अधिकारी',

    admin:
      'प्रशासक',
  },
};


/* ============================================================
   STORAGE HELPERS
   ============================================================ */

const buildStorageKey = (
  user
) => {

  const userId =
    user?.email ||
    user?.name ||
    'guest';

  return (
    'byteharvest_consultation_cases_' +
    String(userId)
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        '_'
      )
  );
};


const loadStoredCases = (
  user
) => {

  try {

    const key =
      buildStorageKey(
        user
      );

    const stored =
      localStorage.getItem(
        key
      );

    return stored
      ? JSON.parse(stored)
      : [];

  } catch {
    return [];
  }
};


const saveStoredCases = (
  user,
  cases
) => {

  try {

    localStorage.setItem(
      buildStorageKey(
        user
      ),
      JSON.stringify(
        cases
      )
    );

  } catch {
    // Frontend demo storage.
  }
};


/* ============================================================
   ROLE LABEL
   ============================================================ */

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
    ''
  );
};


/* ============================================================
   CONSULTATION PAGE
   ============================================================ */

export const ConsultationPage = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  const {
    language,
    currentUser,
    roleConfig,
    activeRole,
  } = useApp();


  const {
    scans,
  } = useScans();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     IMPORTED SCAN
     ========================================================== */

  const incomingScan =
    location.state?.scan ||
    null;


  const latestScan =
    incomingScan ||
    scans?.[0] ||
    null;


  /* ==========================================================
     FORM STATE
     ========================================================== */

  const [
    issueType,
    setIssueType,
  ] = useState(
    latestScan?.detectionType ===
      'pest'
      ? 'pest'
      : 'disease'
  );


  const [
    crop,
    setCrop,
  ] = useState(
    latestScan?.crop ||
      ''
  );


  const [
    issue,
    setIssue,
  ] = useState(
    latestScan?.detectionType ===
      'pest'
      ? latestScan?.pest ||
        ''
      : latestScan?.disease ||
        ''
  );


  const [
    priority,
    setPriority,
  ] = useState(
    latestScan?.severity ===
      'Critical'
      ? 'Urgent'
      : latestScan?.severity ===
          'High'
        ? 'High'
        : 'Medium'
  );


  const [
    symptoms,
    setSymptoms,
  ] = useState(
    latestScan?.symptoms ||
      ''
  );


  const [
    notes,
    setNotes,
  ] = useState('');


  const [
    image,
    setImage,
  ] = useState(
    latestScan?.image ||
      null
  );


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  const [
    successMessage,
    setSuccessMessage,
  ] = useState('');


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  const [
    cases,
    setCases,
  ] = useState(
    () =>
      loadStoredCases(
        currentUser
      )
  );


  const [
    selectedCase,
    setSelectedCase,
  ] = useState(null);


  /* ==========================================================
     CROP OPTIONS
     ========================================================== */

  const cropOptions =
    useMemo(
      () => [
        {
          value:
            'Rice (Paddy)',

          label:
            language === 'hi'
              ? 'धान'
              : language === 'mr'
                ? 'भात'
                : 'Rice (Paddy)',
        },

        {
          value:
            'Tomato',

          label:
            'Tomato',
        },

        {
          value:
            'Cotton',

          label:
            'Cotton',
        },

        {
          value:
            'Maize (Corn)',

          label:
            text.maize,
        },
      ],
      [
        language,
        text.maize,
      ]
    );


  /* ==========================================================
     SYNC STORED CASES WHEN USER CHANGES
     ========================================================== */

  useEffect(() => {

    setCases(
      loadStoredCases(
        currentUser
      )
    );

  }, [
    currentUser?.email,
    currentUser?.name,
  ]);


  /* ==========================================================
     SYNC INCOMING SCAN
     ========================================================== */

  useEffect(() => {

    if (!incomingScan) {
      return;
    }


    const incomingIsPest =
      incomingScan.detectionType ===
      'pest';


    setIssueType(
      incomingIsPest
        ? 'pest'
        : 'disease'
    );


    setCrop(
      incomingScan.crop ||
        ''
    );


    setIssue(
      incomingIsPest
        ? incomingScan.pest ||
            ''
        : incomingScan.disease ||
            ''
    );


    setSymptoms(
      incomingScan.symptoms ||
        ''
    );


    setImage(
      incomingScan.image ||
        null
    );


    setPriority(
      incomingScan.severity ===
        'Critical'
        ? 'Urgent'
        : incomingScan.severity ===
            'High'
          ? 'High'
          : 'Medium'
    );


    setErrorMessage(
      ''
    );

  }, [
    incomingScan,
  ]);


  /* ==========================================================
     USE LATEST SCAN
     ========================================================== */

  const handleUseLatestScan =
    () => {

      if (!latestScan) {
        return;
      }


      const latestIsPest =
        latestScan.detectionType ===
        'pest';


      setCrop(
        latestScan.crop ||
          ''
      );


      setIssueType(
        latestIsPest
          ? 'pest'
          : 'disease'
      );


      setIssue(
        latestIsPest
          ? latestScan.pest ||
              ''
          : latestScan.disease ||
              ''
      );


      setSymptoms(
        latestScan.symptoms ||
          ''
      );


      setImage(
        latestScan.image ||
          null
      );


      setPriority(
        latestScan.severity ===
          'Critical'
          ? 'Urgent'
          : latestScan.severity ===
              'High'
            ? 'High'
            : 'Medium'
      );


      setErrorMessage(
        ''
      );

    };


  /* ==========================================================
     IMAGE UPLOAD
     ========================================================== */

  const handleImageUpload =
    (e) => {

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


      reader.onloadend =
        () => {

          setImage(
            reader.result
          );

        };


      reader.onerror =
        () => {

          setErrorMessage(
            text.imageReadError
          );

        };


      reader.readAsDataURL(
        file
      );

    };


  /* ==========================================================
     SUBMIT CASE
     ========================================================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();


      setErrorMessage('');

      setSuccessMessage('');


      if (!crop) {

        setErrorMessage(
          text.cropRequired
        );

        return;
      }


      if (!issue.trim()) {

        setErrorMessage(
          text.issueRequired
        );

        return;
      }


      if (!symptoms.trim()) {

        setErrorMessage(
          text.symptomsRequired
        );

        return;
      }


      if (!image) {

        setErrorMessage(
          text.uploadRequired
        );

        return;
      }


      setIsSubmitting(
        true
      );


      try {

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              700
            )
        );


        const newCase = {

          id:
            `CASE-${Date.now()}`,

          farmerName:
            currentUser?.name ||
            'Farmer Demo',

          email:
            currentUser?.email ||
            '',

          role:
            activeRole ||
            currentUser?.role ||
            'farmer',

          crop,

          issueType,

          issue,

          priority,

          symptoms,

          notes,

          image,

          status:
            'Under Review',

          expertResponse:
            '',

          submittedAt:
            new Date()
              .toISOString(),

          sourceScanId:
            latestScan?.id ||
            null,

          sourceScanConfidence:
            latestScan?.confidence ??
            null,

          sourceScanSeverity:
            latestScan?.severity ||
            latestScan?.riskLevel ||
            null,

          sourceScanRisk:
            latestScan?.riskLevel ||
            latestScan?.severity ||
            null,

        };


        const updatedCases = [
          newCase,
          ...cases,
        ];


        setCases(
          updatedCases
        );


        saveStoredCases(
          currentUser,
          updatedCases
        );


        setIsSubmitting(
          false
        );


        setSuccessMessage(
          text.caseSubmitted
        );


        setIssue('');

        setSymptoms('');

        setNotes('');

        setImage(null);

        setPriority(
          'Medium'
        );


        setTimeout(
          () => {
            setSuccessMessage(
              ''
            );
          },
          4000
        );

      } catch (error) {

        console.error(
          'Failed to submit consultation case:',
          error
        );

        setIsSubmitting(
          false
        );

        setErrorMessage(
          'Unable to submit the case. Please try again.'
        );

      }

    };


  /* ==========================================================
     STATUS LABEL
     ========================================================== */

  const getStatusLabel =
    (status) => {

      const map = {

        Submitted:
          text.submitted,

        'Under Review':
          text.underReview,

        'Expert Responded':
          text.responded,

        Closed:
          text.closed,

      };


      return (
        map[status] ||
        status
      );

    };


  /* ==========================================================
     WORKSPACE BACK
     ========================================================== */

  const handleBack =
    () => {

      navigate(
        roleConfig?.defaultRoute ||
        '/farmer'
      );

    };


  /* ==========================================================
     IMAGE ERROR
     ========================================================== */

  const handleImageError =
    (e) => {

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

            <LuUserRound className="w-6 h-6 text-amber-500" />

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
          IMPORTED SCAN BANNER
      ======================================================= */}

      {incomingScan && (

        <div
          className="p-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{
            background:
              'rgba(34,197,94,0.08)',

            border:
              '1px solid rgba(34,197,94,0.2)',
          }}
        >

          <div className="flex items-center gap-3">

            <div
              className="p-2 rounded-md"
              style={{
                background:
                  'rgba(34,197,94,0.12)',
              }}
            >

              <LuScanLine className="w-5 h-5 text-green-600" />

            </div>


            <div>

              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.scanImported
                }
              </p>


              <p
                className="text-xs mt-1"
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >

                {
                  incomingScan.crop
                }
                {' · '}

                {
                  incomingScan.detectionType ===
                  'pest'
                    ? incomingScan.pest
                    : incomingScan.disease
                }

                {' · '}

                {
                  incomingScan.confidence ??
                  '—'
                }%

              </p>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          SUCCESS
      ======================================================= */}

      {successMessage && (

        <div
          className="p-4 rounded-md flex items-center gap-3"
          style={{
            background:
              'rgba(34,197,94,0.08)',

            border:
              '1px solid rgba(34,197,94,0.2)',

            color:
              'var(--accent-green)',
          }}
        >

          <LuCircleCheck className="w-5 h-5" />

          <span className="text-sm font-medium">
            {
              successMessage
            }
          </span>

        </div>

      )}


      {/* ======================================================
          FORM + CASES
      ======================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">


        {/* ====================================================
            FORM
        ===================================================== */}

        <div className="lg:col-span-7">

          <form
            onSubmit={
              handleSubmit
            }
            className="card p-5 space-y-6"
          >

            <div
              className="flex items-center gap-2 pb-3"
              style={{
                borderBottom:
                  '1px solid var(--border-base)',
              }}
            >

              <LuMessageSquare className="w-5 h-5 text-amber-500" />


              <h2
                className="text-lg font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.caseDetails
                }
              </h2>

            </div>


            {/* Error */}

            {errorMessage && (

              <div
                className="p-3 rounded-md text-sm flex items-start gap-2"
                style={{
                  background:
                    'rgba(239,68,68,0.08)',

                  border:
                    '1px solid rgba(239,68,68,0.2)',

                  color:
                    '#dc2626',
                }}
              >

                <LuCircleAlert className="w-4 h-4 mt-0.5 shrink-0" />

                <span>
                  {
                    errorMessage
                  }
                </span>

              </div>

            )}


            {/* Latest Scan Shortcut */}

            {latestScan && (

              <button
                type="button"
                onClick={
                  handleUseLatestScan
                }
                className="w-full p-3 rounded-md text-left flex items-center justify-between gap-3 cursor-pointer"
                style={{
                  background:
                    'var(--bg-raised)',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="p-2 rounded-md"
                    style={{
                      background:
                        'var(--accent-green-muted)',
                    }}
                  >

                    <LuSprout className="w-5 h-5 text-green-600" />

                  </div>


                  <div>

                    <p
                      className="text-sm font-semibold"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        text.resultFromScan
                      }
                    </p>


                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          'var(--text-tertiary)',
                      }}
                    >

                      {
                        latestScan.crop
                      }
                      {' · '}

                      {
                        latestScan.detectionType ===
                        'pest'
                          ? latestScan.pest
                          : latestScan.disease
                      }

                    </p>

                  </div>

                </div>


                <LuArrowLeft className="w-4 h-4 rotate-180 text-green-600" />

              </button>

            )}


            {/* Crop */}

            <div>

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
                  crop
                }
                onChange={(e) =>
                  setCrop(
                    e.target.value
                  )
                }
                className="field-select"
              >

                <option value="">
                  {
                    text.cropPlaceholder
                  }
                </option>


                {cropOptions.map(
                  (option) => (

                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>

                  )
                )}

              </select>

            </div>


            {/* Issue Type */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.issueType
                }
              </label>


              <div className="grid grid-cols-2 gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setIssueType(
                      'disease'
                    )
                  }
                  className="p-3 rounded-md border flex items-center gap-2 font-medium cursor-pointer"
                  style={{
                    background:
                      issueType ===
                      'disease'
                        ? 'var(--accent-green-muted)'
                        : 'var(--bg-surface)',

                    borderColor:
                      issueType ===
                      'disease'
                        ? 'var(--accent-green)'
                        : 'var(--border-base)',

                    color:
                      issueType ===
                      'disease'
                        ? 'var(--accent-green)'
                        : 'var(--text-secondary)',
                  }}
                >

                  <LuShieldAlert className="w-4 h-4" />

                  {
                    text.disease
                  }

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setIssueType(
                      'pest'
                    )
                  }
                  className="p-3 rounded-md border flex items-center gap-2 font-medium cursor-pointer"
                  style={{
                    background:
                      issueType ===
                      'pest'
                        ? 'rgba(245,158,11,0.08)'
                        : 'var(--bg-surface)',

                    borderColor:
                      issueType ===
                      'pest'
                        ? 'rgba(245,158,11,0.4)'
                        : 'var(--border-base)',

                    color:
                      issueType ===
                      'pest'
                        ? '#b45309'
                        : 'var(--text-secondary)',
                  }}
                >

                  <LuBug className="w-4 h-4" />

                  {
                    text.pest
                  }

                </button>

              </div>

            </div>


            {/* Issue */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.issue
                }
              </label>


              <input
                type="text"
                value={
                  issue
                }
                onChange={(e) =>
                  setIssue(
                    e.target.value
                  )
                }
                placeholder={
                  text.issuePlaceholder
                }
                className="field-input"
              />

            </div>


            {/* Priority */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.priority
                }
              </label>


              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                {[
                  [
                    'Low',
                    text.low,
                  ],
                  [
                    'Medium',
                    text.medium,
                  ],
                  [
                    'High',
                    text.high,
                  ],
                  [
                    'Urgent',
                    text.urgent,
                  ],
                ].map(
                  ([value, label]) => (

                    <button
                      key={
                        value
                      }
                      type="button"
                      onClick={() =>
                        setPriority(
                          value
                        )
                      }
                      className="py-2.5 rounded-md border text-sm font-medium cursor-pointer"
                      style={{
                        background:
                          priority ===
                          value
                            ? 'var(--accent-green-muted)'
                            : 'var(--bg-surface)',

                        borderColor:
                          priority ===
                          value
                            ? 'var(--accent-green)'
                            : 'var(--border-base)',

                        color:
                          priority ===
                          value
                            ? 'var(--accent-green)'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {
                        label
                      }
                    </button>

                  )
                )}

              </div>

            </div>


            {/* Scan Metadata */}

            {incomingScan && (

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

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
                      text.confidence
                    }
                  </p>


                  <p
                    className="text-base font-bold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      incomingScan.confidence ??
                      '—'
                    }

                    {
                      incomingScan.confidence !=
                      null
                        ? '%'
                        : ''
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

                  <p className="metric-label">
                    {
                      incomingScan.detectionType ===
                      'pest'
                        ? text.risk
                        : text.severity
                    }
                  </p>


                  <p
                    className="text-base font-bold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      incomingScan.severity ||
                      incomingScan.riskLevel ||
                      '—'
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

                  <p className="metric-label">
                    {
                      text.scanId
                    }
                  </p>


                  <p
                    className="text-sm font-bold mt-1 truncate"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      incomingScan.id ||
                      '—'
                    }
                  </p>

                </div>

              </div>

            )}


            {/* Symptoms */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.symptoms
                }
              </label>


              <textarea
                rows="4"
                value={
                  symptoms
                }
                onChange={(e) =>
                  setSymptoms(
                    e.target.value
                  )
                }
                placeholder={
                  text.symptomsPlaceholder
                }
                className="field-input resize-none"
              />

            </div>


            {/* Notes */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.farmerNotes
                }
              </label>


              <textarea
                rows="3"
                value={
                  notes
                }
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                placeholder={
                  text.farmerNotesPlaceholder
                }
                className="field-input resize-none"
              />

            </div>


            {/* Image */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.image
                }
              </label>


              {image ? (

                <div className="relative rounded-lg overflow-hidden border border-(--border-base) bg-(--bg-raised)">

                  <img
                    src={
                      image
                    }
                    alt={
                      text.image
                    }
                    className="w-full h-56 object-cover"
                    onError={
                      handleImageError
                    }
                  />


                  <div className="hidden w-full h-56 items-center justify-center text-(--text-tertiary)">

                    <div className="flex flex-col items-center gap-2">

                      <LuImageOff className="w-8 h-8" />

                      <span className="text-sm">
                        {
                          text.imageUnavailable
                        }
                      </span>

                    </div>

                  </div>


                  <label className="absolute bottom-3 right-3 cursor-pointer">

                    <span className="px-3 py-2 rounded-md bg-white text-sm font-medium shadow inline-flex items-center gap-2">

                      <LuUpload className="w-4 h-4" />

                      {
                        text.replaceImage
                      }

                    </span>


                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                      className="hidden"
                    />

                  </label>

                </div>

              ) : (

                <label
                  className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer"
                  style={{
                    borderColor:
                      'var(--border-base)',

                    background:
                      'var(--bg-raised)',
                  }}
                >

                  <LuFileImage className="w-10 h-10 text-green-600" />


                  <div className="text-center">

                    <p
                      className="text-sm font-semibold"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        text.uploadImage
                      }
                    </p>


                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          'var(--text-tertiary)',
                      }}
                    >
                      {
                        text.imageHint
                      }
                    </p>

                  </div>


                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    className="hidden"
                  />

                </label>

              )}

            </div>


            {/* Submit */}

            <Btn
              variant="primary"
              size="md"
              type="submit"
              disabled={
                isSubmitting
              }
              className="w-full justify-center"
            >

              {isSubmitting ? (

                <>
                  <LuClock3 className="w-4 h-4 animate-spin" />

                  {
                    text.submitting
                  }
                </>

              ) : (

                <>
                  <LuSend className="w-4 h-4" />

                  {
                    text.submit
                  }
                </>

              )}

            </Btn>

          </form>

        </div>


        {/* ====================================================
            RECENT CASES
        ===================================================== */}

        <div className="lg:col-span-5">

          <div className="card p-5 space-y-4">

            <div
              className="pb-3"
              style={{
                borderBottom:
                  '1px solid var(--border-base)',
              }}
            >

              <h2
                className="text-lg font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.recentCases
                }
              </h2>

            </div>


            {cases.length ===
            0 ? (

              <div className="py-10 text-center">

                <LuMessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20 text-amber-500" />


                <p
                  className="text-sm"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.noCases
                  }
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {cases.map(
                  (
                    consultationCase
                  ) => (

                    <button
                      key={
                        consultationCase.id
                      }
                      type="button"
                      onClick={() =>
                        setSelectedCase(
                          consultationCase
                        )
                      }
                      className="w-full text-left p-4 rounded-md cursor-pointer hover:shadow-sm transition-shadow"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p
                            className="text-sm font-semibold truncate"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              consultationCase.issue
                            }
                          </p>


                          <p
                            className="text-xs mt-1"
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >

                            {
                              consultationCase.crop
                            }

                            {' · '}

                            {
                              consultationCase.priority
                            }

                          </p>

                        </div>


                        <span
                          className="text-xs px-2 py-1 rounded-md font-medium shrink-0"
                          style={{
                            background:
                              consultationCase.status ===
                              'Expert Responded'
                                ? 'rgba(34,197,94,0.1)'
                                : 'rgba(245,158,11,0.1)',

                            color:
                              consultationCase.status ===
                              'Expert Responded'
                                ? '#15803d'
                                : '#b45309',
                          }}
                        >
                          {
                            getStatusLabel(
                              consultationCase.status
                            )
                          }
                        </span>

                      </div>


                      <div className="flex items-center justify-between mt-3 text-xs">

                        <span
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            consultationCase.id
                          }
                        </span>


                        <span
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >

                          {
                            new Date(
                              consultationCase.submittedAt
                            ).toLocaleDateString(
                              'en-IN'
                            )
                          }

                        </span>

                      </div>

                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ======================================================
          CASE DETAILS MODAL
      ======================================================= */}

      {selectedCase && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto surface-overlay"
            style={{
              background:
                'var(--bg-surface)',
            }}
          >

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

                <p className="text-xs text-(--text-tertiary)">
                  {
                    text.caseNumber
                  }
                </p>


                <h2
                  className="text-lg font-bold mt-1"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    selectedCase.id
                  }
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedCase(
                    null
                  )
                }
                className="w-9 h-9 rounded-md hover:bg-black/5 flex items-center justify-center cursor-pointer"
                aria-label={
                  text.close
                }
              >

                <LuX className="w-5 h-5" />

              </button>

            </div>


            <div className="p-5 space-y-5">


              {/* =================================================
                  IMAGE
              ================================================== */}

              {selectedCase.image && (

                <div className="relative rounded-lg overflow-hidden border border-(--border-base) bg-(--bg-raised)">

                  <img
                    src={
                      selectedCase.image
                    }
                    alt={
                      selectedCase.issue
                    }
                    className="w-full h-56 object-cover"
                    onError={
                      handleImageError
                    }
                  />


                  <div className="hidden w-full h-56 items-center justify-center text-(--text-tertiary)">

                    <LuImageOff className="w-8 h-8" />

                  </div>

                </div>

              )}


              {/* =================================================
                  CASE INFO
              ================================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                  <p className="text-xs text-(--text-tertiary)">
                    {
                      text.crop
                    }
                  </p>

                  <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                    {
                      selectedCase.crop
                    }
                  </p>

                </div>


                <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                  <p className="text-xs text-(--text-tertiary)">
                    {
                      text.status
                    }
                  </p>

                  <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                    {
                      getStatusLabel(
                        selectedCase.status
                      )
                    }
                  </p>

                </div>


                <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                  <p className="text-xs text-(--text-tertiary)">
                    {
                      text.priority
                    }
                  </p>

                  <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                    {
                      selectedCase.priority
                    }
                  </p>

                </div>


                <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                  <p className="text-xs text-(--text-tertiary)">
                    {
                      text.issueType
                    }
                  </p>

                  <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                    {
                      selectedCase.issueType ===
                      'pest'
                        ? text.pest
                        : text.disease
                    }
                  </p>

                </div>


                {selectedCase.sourceScanConfidence !=
                  null && (

                  <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                    <p className="text-xs text-(--text-tertiary)">
                      {
                        text.confidence
                      }
                    </p>

                    <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                      {
                        selectedCase.sourceScanConfidence
                      }%
                    </p>

                  </div>

                )}


                {selectedCase.sourceScanSeverity && (

                  <div className="p-3 rounded-md bg-(--bg-raised) border border-(--border-base)">

                    <p className="text-xs text-(--text-tertiary)">
                      {
                        selectedCase.sourceScanSeverity
                          ? text.severity
                          : text.risk
                      }
                    </p>

                    <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                      {
                        selectedCase.sourceScanSeverity
                      }
                    </p>

                  </div>

                )}

              </div>


              {/* =================================================
                  ISSUE
              ================================================== */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.issue
                  }
                </p>


                <p
                  className="text-sm mt-1"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    selectedCase.issue
                  }
                </p>

              </div>


              {/* =================================================
                  SYMPTOMS
              ================================================== */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.symptoms
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
                    selectedCase.symptoms
                  }
                </p>

              </div>


              {/* =================================================
                  NOTES
              ================================================== */}

              {selectedCase.notes && (

                <div>

                  <p className="text-sm font-semibold text-(--text-primary)">
                    {
                      text.notes
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
                      selectedCase.notes
                    }
                  </p>

                </div>

              )}


              {/* =================================================
                  EXPERT RESPONSE
              ================================================== */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.expertResponse
                  }
                </p>


                <div
                  className="mt-2 p-4 rounded-md"
                  style={{
                    background:
                      'var(--bg-raised)',

                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      selectedCase.expertResponse ||
                      text.noResponse
                    }
                  </p>

                </div>

              </div>


              <Btn
                variant="primary"
                size="md"
                onClick={() =>
                  setSelectedCase(
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


export default ConsultationPage;