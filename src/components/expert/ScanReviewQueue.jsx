import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useScans,
} from '../../context/ScanContext';

import {
  useApp,
} from '../../context/AppContext';

import {
  Btn,
} from '../common/GlowButton';

import {
  LuCheck,
  LuX,
  LuShieldCheck,
  LuBug,
  LuSprout,
  LuImageOff,
  LuCircleAlert,
  LuClock3,
  LuFileCheck2,
} from 'react-icons/lu';

import {
  FiAward,
} from 'react-icons/fi';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow:
      'Diagnostician Review Canvas',

    title:
      'AI Scan Verification Queue',

    scansInSystem:
      'Scans in System',

    unverified:
      'Unverified & Flagged Scans',

    inspecting:
      'Inspecting Scan',

    farm:
      "'s Farm",

    aiDiagnosis:
      'AI Diagnosis',

    aiPestDiagnosis:
      'AI Pest Diagnosis',

    confidence:
      'confidence',

    prescribedTreatment:
      'Prescribed Treatment',

    prescriptionPlaceholder:
      'Enter prescribed fungicide, dosage, and application schedule...',

    clinicalNotes:
      'Diagnostician Clinical Notes',

    notesPlaceholder:
      'Add specific notes on fungal spread, pest activity, field conditions, or referral instructions...',

    stampApplied:
      'Prescription Stamp Applied & Synced!',

    signedPrescription:
      'Issues a signed digital prescription to the farmer app',

    reject:
      'Reject',

    issuePrescription:
      'Issue Prescription',

    empty:
      'Select a scan from the queue to inspect and issue advisories.',

    verified:
      'Expert Verified',

    rejected:
      'Rejected by Expert',

    aiIdentified:
      'AI Identified',

    allReviewed:
      'All scans have been reviewed.',

    noScans:
      'No scans are currently available.',

    pest:
      'Pest',

    disease:
      'Disease',

    crop:
      'Crop',

    severity:
      'Severity',

    risk:
      'Risk',

    symptoms:
      'Symptoms',

    damage:
      'Observed Damage',

    dosage:
      'Dosage',

    prevention:
      'Prevention',

    organicRemedy:
      'Organic / Bio-Control',

    chemicalRemedy:
      'Chemical Intervention',

    scanStatus:
      'Status',

    location:
      'Location',

    date:
      'Date',

    expertReview:
      'Expert Review',

    required:
      'Please enter clinical notes or a prescription before submitting.',

    verifying:
      'Updating Scan...',

    verificationFailed:
      'Unable to update this scan. Please try again.',

    imageUnavailable:
      'Image unavailable',

    noImage:
      'No image available',

    selected:
      'Selected',

    pendingReview:
      'Pending Review',

    reviewComplete:
      'Review Complete',
  },


  hi: {
    eyebrow:
      'निदान समीक्षा डेस्क',

    title:
      'AI स्कैन सत्यापन कतार',

    scansInSystem:
      'सिस्टम में स्कैन',

    unverified:
      'असत्यापित और चिन्हित स्कैन',

    inspecting:
      'स्कैन की समीक्षा',

    farm:
      ' का खेत',

    aiDiagnosis:
      'AI निदान',

    aiPestDiagnosis:
      'AI कीट निदान',

    confidence:
      'विश्वसनीयता',

    prescribedTreatment:
      'निर्धारित उपचार',

    prescriptionPlaceholder:
      'निर्धारित फफूंदनाशक, मात्रा और उपयोग का समय दर्ज करें...',

    clinicalNotes:
      'निदान विशेषज्ञ की क्लिनिकल टिप्पणियाँ',

    notesPlaceholder:
      'फसल रोग, कीट गतिविधि, खेत की स्थिति या रेफरल निर्देश दर्ज करें...',

    stampApplied:
      'प्रिस्क्रिप्शन लागू और सिंक हो गया!',

    signedPrescription:
      'किसान ऐप पर हस्ताक्षरित डिजिटल प्रिस्क्रिप्शन जारी करता है',

    reject:
      'अस्वीकार करें',

    issuePrescription:
      'प्रिस्क्रिप्शन जारी करें',

    empty:
      'समीक्षा और सलाह के लिए कतार से एक स्कैन चुनें।',

    verified:
      'विशेषज्ञ द्वारा सत्यापित',

    rejected:
      'विशेषज्ञ द्वारा अस्वीकार',

    aiIdentified:
      'AI द्वारा पहचाना गया',

    allReviewed:
      'सभी स्कैन की समीक्षा हो चुकी है।',

    noScans:
      'अभी कोई स्कैन उपलब्ध नहीं है।',

    pest:
      'कीट',

    disease:
      'रोग',

    crop:
      'फसल',

    severity:
      'गंभीरता',

    risk:
      'जोखिम',

    symptoms:
      'लक्षण',

    damage:
      'देखा गया नुकसान',

    dosage:
      'मात्रा',

    prevention:
      'बचाव',

    organicRemedy:
      'जैविक / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    scanStatus:
      'स्थिति',

    location:
      'स्थान',

    date:
      'तारीख',

    expertReview:
      'विशेषज्ञ समीक्षा',

    required:
      'जमा करने से पहले क्लिनिकल नोट्स या प्रिस्क्रिप्शन दर्ज करें।',

    verifying:
      'स्कैन अपडेट हो रहा है...',

    verificationFailed:
      'स्कैन अपडेट नहीं हो सका। कृपया फिर प्रयास करें।',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',

    noImage:
      'कोई चित्र उपलब्ध नहीं है',

    selected:
      'चयनित',

    pendingReview:
      'समीक्षा लंबित',

    reviewComplete:
      'समीक्षा पूर्ण',
  },


  mr: {
    eyebrow:
      'निदान पुनरावलोकन डेस्क',

    title:
      'AI स्कॅन सत्यापन रांग',

    scansInSystem:
      'सिस्टममधील स्कॅन',

    unverified:
      'असत्यापित आणि चिन्हांकित स्कॅन',

    inspecting:
      'स्कॅनची तपासणी',

    farm:
      ' यांचे शेत',

    aiDiagnosis:
      'AI निदान',

    aiPestDiagnosis:
      'AI कीड निदान',

    confidence:
      'विश्वास पातळी',

    prescribedTreatment:
      'निर्धारित उपचार',

    prescriptionPlaceholder:
      'निर्धारित बुरशीनाशक, मात्रा आणि वापराचे वेळापत्रक भरा...',

    clinicalNotes:
      'निदान तज्ज्ञांच्या क्लिनिकल नोंदी',

    notesPlaceholder:
      'पीक रोग, किडीची हालचाल, शेताची स्थिती किंवा रेफरल सूचना भरा...',

    stampApplied:
      'प्रिस्क्रिप्शन लागू करून सिंक केले!',

    signedPrescription:
      'शेतकरी अॅपवर स्वाक्षरी केलेले डिजिटल प्रिस्क्रिप्शन जारी केले जाईल',

    reject:
      'नाकारावे',

    issuePrescription:
      'प्रिस्क्रिप्शन जारी करा',

    empty:
      'तपासणी आणि सल्ल्यासाठी रांगेमधून स्कॅन निवडा.',

    verified:
      'तज्ज्ञांनी सत्यापित',

    rejected:
      'तज्ज्ञांनी नाकारले',

    aiIdentified:
      'AI ने ओळखले',

    allReviewed:
      'सर्व स्कॅनचे पुनरावलोकन पूर्ण झाले आहे.',

    noScans:
      'सध्या कोणतेही स्कॅन उपलब्ध नाहीत.',

    pest:
      'कीड',

    disease:
      'रोग',

    crop:
      'पीक',

    severity:
      'तीव्रता',

    risk:
      'धोका',

    symptoms:
      'लक्षणे',

    damage:
      'दिसलेले नुकसान',

    dosage:
      'मात्रा',

    prevention:
      'प्रतिबंध',

    organicRemedy:
      'सेंद्रिय / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    scanStatus:
      'स्थिती',

    location:
      'ठिकाण',

    date:
      'तारीख',

    expertReview:
      'तज्ज्ञ पुनरावलोकन',

    required:
      'जमा करण्यापूर्वी क्लिनिकल नोंदी किंवा प्रिस्क्रिप्शन भरा.',

    verifying:
      'स्कॅन अपडेट करत आहे...',

    verificationFailed:
      'स्कॅन अपडेट करता आला नाही. कृपया पुन्हा प्रयत्न करा.',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',

    noImage:
      'प्रतिमा उपलब्ध नाही',

    selected:
      'निवडलेले',

    pendingReview:
      'पुनरावलोकन प्रलंबित',

    reviewComplete:
      'पुनरावलोकन पूर्ण',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const isPendingScan = (
  scan
) => {
  const status =
    String(
      scan?.status || ''
    ).toLowerCase();

  return (
    status !==
      'expert verified' &&
    status !==
      'rejected by expert'
  );
};


const getResultName = (
  scan
) => {

  if (
    scan?.detectionType ===
    'pest'
  ) {
    return (
      scan.pest ||
      scan.disease ||
      '—'
    );
  }

  return (
    scan?.disease ||
    scan?.pest ||
    '—'
  );
};


const getResultType = (
  scan
) => {

  return (
    scan?.detectionType ===
    'pest'
      ? 'pest'
      : 'disease'
  );
};


const getSeverityColor = (
  severity
) => {

  switch (
    severity
  ) {

    case 'Critical':
      return '#dc2626';

    case 'High':
      return '#d97706';

    case 'Moderate':
      return '#2563eb';

    case 'Healthy':
      return '#15803d';

    case 'Low':
      return '#16a34a';

    default:
      return 'var(--text-secondary)';
  }
};


/* ============================================================
   COMPONENT
   ============================================================ */

export const ScanReviewQueue = () => {

  const {
    scans = [],
    verifyScanByExpert,
  } = useScans();


  const {
    language,
  } = useApp();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     PENDING QUEUE
     ========================================================== */

  const pendingScans =
    useMemo(
      () =>
        Array.isArray(
          scans
        )
          ? scans.filter(
              isPendingScan
            )
          : [],
      [scans]
    );


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    selectedScanId,
    setSelectedScanId,
  ] = useState(
    pendingScans[0]?.id ||
      null
  );


  const [
    expertNotes,
    setExpertNotes,
  ] = useState('');


  const [
    customPrescription,
    setCustomPrescription,
  ] = useState(
    'Tricyclazole 75% WP @ 0.6g/L'
  );


  const [
    verifiedSuccess,
    setVerifiedSuccess,
  ] = useState(false);


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  /* ==========================================================
     SELECTED SCAN
     ========================================================== */

  const selectedScan =
    useMemo(
      () => {

        if (
          !pendingScans.length
        ) {
          return null;
        }


        return (
          pendingScans.find(
            (scan) =>
              scan.id ===
              selectedScanId
          ) ||
          pendingScans[0]
        );

      },
      [
        pendingScans,
        selectedScanId,
      ]
    );


  /* ==========================================================
     KEEP SELECTION VALID
     ========================================================== */

  useEffect(() => {

    if (
      !pendingScans.length
    ) {

      setSelectedScanId(
        null
      );

      return;
    }


    const stillExists =
      pendingScans.some(
        (scan) =>
          scan.id ===
          selectedScanId
      );


    if (
      !stillExists
    ) {

      setSelectedScanId(
        pendingScans[0].id
      );

    }

  }, [
    pendingScans,
    selectedScanId,
  ]);


  /* ==========================================================
     SYNC NOTES WHEN SCAN CHANGES
     ========================================================== */

  useEffect(() => {

    setVerifiedSuccess(
      false
    );

    setErrorMessage('');


    if (
      !selectedScan
    ) {

      setExpertNotes('');

      return;
    }


    setExpertNotes(
      selectedScan.expertNotes ||
        ''
    );


    /*
      Preserve the existing prescription
      if one exists; otherwise start with
      a sensible demo default.
    */

    setCustomPrescription(
      selectedScan.dosagePerAcre ||
        selectedScan.chemicalRemedy ||
        'Tricyclazole 75% WP @ 0.6g/L'
    );

  }, [
    selectedScan?.id,
  ]);


  /* ==========================================================
     SELECT SCAN
     ========================================================== */

  const handleSelectScan =
    (scan) => {

      setSelectedScanId(
        scan.id
      );

      setErrorMessage(
        ''
      );

      setVerifiedSuccess(
        false
      );

    };


  /* ==========================================================
     VERIFY / REJECT
     ========================================================== */

  const handleVerify =
    async (
      status =
        'Expert Verified'
    ) => {

      if (
        !selectedScan
      ) {
        return;
      }


      const cleanPrescription =
        customPrescription.trim();

      const cleanNotes =
        expertNotes.trim();


      if (
        !cleanPrescription &&
        !cleanNotes
      ) {

        setErrorMessage(
          text.required
        );

        return;
      }


      setIsSubmitting(
        true
      );

      setErrorMessage('');

      setVerifiedSuccess(
        false
      );


      try {

        const generatedNotes =
          cleanNotes ||
          (
            status ===
            'Expert Verified'
              ? `Verified by Agri-Expert. Approved treatment: ${cleanPrescription}`
              : `Rejected by Agri-Expert. Review required before treatment.`
          );


        await verifyScanByExpert(
          selectedScan.id,
          generatedNotes,
          status
        );


        setVerifiedSuccess(
          true
        );


        /*
          The scan disappears from the
          pending queue after refresh.
        */

        setTimeout(
          () => {

            setVerifiedSuccess(
              false
            );

          },
          3000
        );

      } catch (
        error
      ) {

        console.error(
          'Expert verification failed:',
          error
        );

        setErrorMessage(
          text.verificationFailed
        );

      } finally {

        setIsSubmitting(
          false
        );

      }
    };


  /* ==========================================================
     IMAGE FALLBACK
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
     SAFE SCANS COUNT
     ========================================================== */

  const totalScans =
    Array.isArray(
      scans
    )
      ? scans.length
      : 0;


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="space-y-6">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3"
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

            <FiAward className="w-6 h-6 text-amber-500 shrink-0" />

            {
              text.title
            }

          </h2>

        </div>


        <div className="flex flex-wrap items-center gap-2">

          <span
            className="mono text-sm px-3 py-2 rounded-md"
            style={{
              background:
                'rgba(245,158,11,0.1)',

              color:
                '#d97706',

              border:
                '1px solid rgba(245,158,11,0.2)',
            }}
          >
            {totalScans}{' '}
            {
              text.scansInSystem
            }
          </span>


          <span
            className="mono text-sm px-3 py-2 rounded-md flex items-center gap-2"
            style={{
              background:
                'rgba(56,189,248,0.08)',

              color:
                '#0284c7',

              border:
                '1px solid rgba(56,189,248,0.18)',
            }}
          >

            <LuClock3 className="w-4 h-4" />

            {
              pendingScans.length
            }{' '}

            {
              text.unverified
            }

          </span>

        </div>

      </div>


      {/* ======================================================
          MAIN LAYOUT
      ======================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">


        {/* ====================================================
            QUEUE
        ===================================================== */}

        <div className="lg:col-span-5 space-y-3">

          <div className="flex items-center justify-between gap-2">

            <h3
              className="text-sm font-semibold uppercase tracking-wide"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >
              {
                text.unverified
              }
            </h3>


            <span
              className="text-sm mono"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >
              {
                pendingScans.length
              }
            </span>

          </div>


          {pendingScans.length ===
          0 ? (

            <div
              className="card p-8 text-center space-y-3"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >

              <LuFileCheck2 className="w-10 h-10 mx-auto opacity-25 text-green-600" />


              <p className="text-base font-medium">
                {
                  text.allReviewed
                }
              </p>


              <p className="text-sm">
                {
                  totalScans ===
                  0
                    ? text.noScans
                    : text.reviewComplete
                }
              </p>

            </div>

          ) : (

            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">

              {pendingScans.map(
                (scan) => {

                  const isSelected =
                    selectedScan &&
                    selectedScan.id ===
                      scan.id;


                  const resultType =
                    getResultType(
                      scan
                    );


                  const resultName =
                    getResultName(
                      scan
                    );


                  return (
                    <button
                      key={
                        scan.id
                      }
                      type="button"
                      onClick={() =>
                        handleSelectScan(
                          scan
                        )
                      }
                      className="w-full text-left card p-4 flex items-center gap-3 cursor-pointer transition-colors"
                      style={{
                        borderLeft:
                          isSelected
                            ? '3px solid #d97706'
                            : '1px solid var(--border-base)',

                        background:
                          isSelected
                            ? 'var(--bg-raised)'
                            : 'var(--bg-surface)',
                      }}
                    >

                      {/* Thumbnail */}

                      <div
                        className="w-16 h-16 rounded-md overflow-hidden shrink-0 flex items-center justify-center"
                        style={{
                          background:
                            'var(--bg-raised)',

                          border:
                            '1px solid var(--border-base)',
                        }}
                      >

                        {scan.image ? (

                          <img
                            src={
                              scan.image
                            }
                            alt={
                              resultName
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

                          {resultType ===
                          'pest' ? (
                            <LuBug className="w-6 h-6 text-amber-500" />
                          ) : (
                            <LuSprout className="w-6 h-6 text-green-600" />
                          )}

                        </div>

                      </div>


                      <div className="flex-1 min-w-0 space-y-1">

                        <div className="flex items-center justify-between gap-2">

                          <span
                            className="text-sm font-semibold truncate"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              scan.farmerName ||
                              '—'
                            }
                          </span>


                          <span
                            className="text-xs px-2 py-1 rounded-md font-semibold shrink-0"
                            style={{
                              background:
                                'rgba(245,158,11,0.1)',

                              color:
                                '#d97706',
                            }}
                          >
                            {
                              text.pendingReview
                            }
                          </span>

                        </div>


                        <p
                          className="text-sm font-medium truncate"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            scan.crop ||
                            '—'
                          }
                          {' — '}

                          {
                            resultName
                          }
                        </p>


                        <div className="flex flex-wrap items-center gap-2 text-xs">

                          <span
                            className="inline-flex items-center gap-1"
                            style={{
                              color:
                                resultType ===
                                'pest'
                                  ? '#b45309'
                                  : '#15803d',
                            }}
                          >

                            {resultType ===
                            'pest' ? (
                              <LuBug className="w-3.5 h-3.5" />
                            ) : (
                              <LuSprout className="w-3.5 h-3.5" />
                            )}

                            {
                              resultType ===
                              'pest'
                                ? text.pest
                                : text.disease
                            }

                          </span>


                          <span
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            ·
                          </span>


                          <span
                            className="mono"
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            {
                              scan.confidence ??
                              '—'
                            }%

                            {' '}

                            {
                              text.confidence
                            }

                          </span>

                        </div>

                      </div>

                    </button>
                  );

                }
              )}

            </div>

          )}

        </div>


        {/* ====================================================
            INSPECTION PANEL
        ===================================================== */}

        <div className="lg:col-span-7 space-y-4">

          {selectedScan ? (

            <div
              className="card p-5 space-y-4"
              style={{
                borderLeft:
                  '3px solid rgba(245,158,11,0.4)',
              }}
            >

              {/* =================================================
                  HEADER
              ================================================== */}

              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3"
                style={{
                  borderBottom:
                    '1px solid var(--border-base)',
                }}
              >

                <div>

                  <span className="text-sm font-semibold uppercase text-amber-600">

                    {
                      text.inspecting
                    }{' '}

                    #{selectedScan.id}

                  </span>


                  <h3
                    className="text-lg font-bold"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >

                    {
                      selectedScan.farmerName ||
                      '—'
                    }

                    {
                      text.farm
                    }

                  </h3>

                </div>


                <div className="text-left sm:text-right">

                  <span
                    className="text-sm block"
                    style={{
                      color:
                        'var(--text-tertiary)',
                    }}
                  >
                    {
                      selectedScan.location ||
                      '—'
                    }
                  </span>


                  <span
                    className="text-xs mt-1 block"
                    style={{
                      color:
                        'var(--text-tertiary)',
                    }}
                  >
                    {
                      selectedScan.date ||
                      '—'
                    }
                  </span>

                </div>

              </div>


              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="relative aspect-video rounded-md overflow-hidden"
                style={{
                  background:
                    '#eef4ea',

                  border:
                    '1px solid var(--border-base)',
                }}
              >

                {selectedScan.image ? (

                  <img
                    src={
                      selectedScan.image
                    }
                    alt={
                      getResultName(
                        selectedScan
                      )
                    }
                    className="w-full h-full object-cover"
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

                  <div className="flex flex-col items-center gap-2">

                    <LuImageOff className="w-8 h-8" />

                    <span className="text-sm">
                      {
                        text.noImage
                      }
                    </span>

                  </div>

                </div>


                {/* AI label */}

                <div
                  className="absolute bottom-2 left-2 right-2 sm:right-auto px-3 py-2 rounded-md text-sm font-medium mono"
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
                    getResultType(
                      selectedScan
                    ) ===
                    'pest'
                      ? text.aiPestDiagnosis
                      : text.aiDiagnosis
                  }

                  :{' '}

                  {
                    getResultName(
                      selectedScan
                    )
                  }

                  {' '}

                  (
                  {
                    selectedScan.confidence ??
                    '—'
                  }%

                  {' '}

                  {
                    text.confidence
                  })

                </div>

              </div>


              {/* =================================================
                  RESULT SUMMARY
              ================================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {[
                  {
                    label:
                      text.crop,

                    value:
                      selectedScan.crop ||
                      '—',
                  },

                  {
                    label:
                      getResultType(
                        selectedScan
                      ) ===
                      'pest'
                        ? text.risk
                        : text.severity,

                    value:
                      selectedScan.severity ||
                      selectedScan.riskLevel ||
                      '—',
                  },

                  {
                    label:
                      text.location,

                    value:
                      selectedScan.location ||
                      '—',
                  },

                  {
                    label:
                      text.scanStatus,

                    value:
                      selectedScan.status ||
                      text.aiIdentified,
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
                          label
                        }
                      </p>


                      <p
                        className="text-sm font-semibold mt-1 truncate"
                        style={{
                          color:
                            getSeverityColor(
                              value
                            ),
                        }}
                        title={
                          value
                        }
                      >
                        {
                          value
                        }
                      </p>

                    </div>

                  )
                )}

              </div>


              {/* =================================================
                  SCIENTIFIC NAME
              ================================================== */}

              {selectedScan.scientificName && (

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
                      getResultType(
                        selectedScan
                      ) ===
                      'pest'
                        ? text.pest
                        : text.disease
                  }{' '}
                  · Scientific Name
                  </p>


                  <p
                    className="text-sm font-semibold italic mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      selectedScan.scientificName
                    }
                  </p>

                </div>
              )}


              {/* =================================================
                  PEST COUNT
              ================================================== */}

              {getResultType(
                selectedScan
              ) ===
                'pest' &&
                selectedScan.pestCount !=
                  null && (

                  <div
                    className="p-4 rounded-md"
                    style={{
                      background:
                        'rgba(245,158,11,0.07)',

                      border:
                        '1px solid rgba(245,158,11,0.18)',
                    }}
                  >

                    <p className="metric-label">
                      Estimated Pest Count
                    </p>


                    <p
                      className="text-2xl font-bold mono mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {
                        selectedScan.pestCount
                      }
                    </p>

                  </div>
                )}


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

                  <p className="metric-label mb-2">
                    {
                      text.symptoms
                    }
                  </p>


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

              {getResultType(
                selectedScan
              ) ===
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

                    <p className="metric-label mb-2">
                      {
                        text.damage
                      }
                    </p>


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
                  EXISTING TREATMENT INFORMATION
              ================================================== */}

              {(selectedScan.organicRemedy ||
                selectedScan.chemicalRemedy ||
                selectedScan.dosagePerAcre ||
                selectedScan.preventiveTips) && (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                  {selectedScan.organicRemedy && (

                    <div
                      className="p-4 rounded-md"
                      style={{
                        background:
                          'rgba(34,197,94,0.06)',

                        border:
                          '1px solid rgba(34,197,94,0.16)',
                      }}
                    >

                      <p className="metric-label mb-2">
                        {
                          text.organicRemedy
                        }
                      </p>


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
                          '1px solid rgba(245,158,11,0.16)',
                      }}
                    >

                      <p className="metric-label mb-2">
                        {
                          text.chemicalRemedy
                        }
                      </p>


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

                      <p className="metric-label mb-2">
                        {
                          text.dosage
                        }
                      </p>


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

                      <p className="metric-label mb-2">
                        {
                          text.prevention
                        }
                      </p>


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
                  PRESCRIPTION BUILDER
              ================================================== */}

              <div className="space-y-4 pt-1">

                <div className="space-y-2">

                  <label
                    className="block text-sm font-medium"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      text.prescribedTreatment
                    }
                  </label>


                  <input
                    type="text"
                    value={
                      customPrescription
                    }
                    onChange={(e) =>
                      setCustomPrescription(
                        e.target.value
                      )
                    }
                    disabled={
                      isSubmitting
                    }
                    className="field-input text-base disabled:opacity-60"
                    placeholder={
                      text.prescriptionPlaceholder
                    }
                  />

                </div>


                <div className="space-y-2">

                  <label
                    className="block text-sm font-medium"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      text.clinicalNotes
                    }
                  </label>


                  <textarea
                    rows="4"
                    value={
                      expertNotes
                    }
                    onChange={(e) =>
                      setExpertNotes(
                        e.target.value
                      )
                    }
                    disabled={
                      isSubmitting
                    }
                    placeholder={
                      text.notesPlaceholder
                    }
                    className="field-input text-base resize-none disabled:opacity-60"
                  />

                </div>


                {/* Error */}

                {errorMessage && (

                  <div
                    className="p-3 rounded-md flex items-start gap-2 text-sm"
                    style={{
                      background:
                        'rgba(239,68,68,0.07)',

                      border:
                        '1px solid rgba(239,68,68,0.18)',

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


                {/* Actions */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">

                  {verifiedSuccess ? (

                    <span className="text-sm text-green-700 font-medium flex items-center gap-2">

                      <LuShieldCheck className="w-5 h-5" />

                      {
                        text.stampApplied
                      }

                    </span>

                  ) : (

                    <span
                      className="text-sm"
                      style={{
                        color:
                          'var(--text-tertiary)',
                      }}
                    >
                      {
                        text.signedPrescription
                      }
                    </span>

                  )}


                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

                    <Btn
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleVerify(
                          'Rejected by Expert'
                        )
                      }
                      disabled={
                        isSubmitting
                      }
                    >

                      {isSubmitting ? (
                        <LuClock3 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LuX className="w-4 h-4" />
                      )}

                      {
                        text.reject
                      }

                    </Btn>


                    <Btn
                      variant="amber"
                      size="md"
                      onClick={() =>
                        handleVerify(
                          'Expert Verified'
                        )
                      }
                      disabled={
                        isSubmitting
                      }
                    >

                      {isSubmitting ? (
                        <>
                          <LuClock3 className="w-4 h-4 animate-spin" />

                          {
                            text.verifying
                          }
                        </>
                      ) : (
                        <>
                          <LuCheck className="w-4 h-4" />

                          {
                            text.issuePrescription
                          }
                        </>
                      )}

                    </Btn>

                  </div>

                </div>

              </div>

            </div>

          ) : (

            <div
              className="card p-10 text-center space-y-3"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >

              <FiAward className="w-10 h-10 mx-auto opacity-30 text-amber-500" />


              <p className="text-base font-medium">
                {
                  pendingScans.length ===
                  0
                    ? text.allReviewed
                    : text.empty
                }
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};


export default ScanReviewQueue;