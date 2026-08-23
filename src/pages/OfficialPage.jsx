import React, {
  useMemo,
  useState,
} from 'react';

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
  MetricCard,
} from '../components/common/StatBadge';

import {
  OutbreakMap,
} from '../components/official/OutbreakMap';

import {
  TimelineSlider,
} from '../components/official/TimelineSlider';

import {
  LuShieldAlert,
  LuSend,
  LuActivity,
  LuMapPin,
  LuCircleAlert,
  LuClock3,
} from 'react-icons/lu';

import {
  FiCheckCircle,
} from 'react-icons/fi';

import {
  TbRadar2,
} from 'react-icons/tb';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow:
      'Agri-Official Surveillance Desk',

    title:
      'Outbreak Intelligence & Intervention Center',

    lastSync:
      'Last sync',

    session:
      'Session',

    synced:
      'Live',

    infectedArea:
      'Infected Area',

    infectedAreaSubtitle:
      'Active surveillance field',

    activeHotspots:
      'Active Hotspots',

    activeHotspotsSubtitle:
      'Districts flagged',

    farmsAffected:
      'Farms Affected',

    farmsAffectedSubtitle:
      'Under direct advisory',

    responseTime:
      'Response Time',

    responseTimeSubtitle:
      'Current benchmark',

    emergencyTitle:
      'Broadcast Emergency Outbreak Alert',

    emergencyDescription:
      'Dispatch SMS and in-app warnings to registered farmers and extension staff in high-risk zones.',

    targetDistrict:
      'Target District',

    alertMessage:
      'Alert Message',

    alertPlaceholder:
      'e.g. Immediate spray warning: High fungal humidity detected. Apply approved treatment within 24h.',

    alertSuccess:
      'Alert dispatched successfully',

    reachEstimate:
      'Estimated recipients based on the selected outbreak zone',

    dispatch:
      'Dispatch Alert',

    dispatching:
      'Dispatching...',

    emergencyAlert:
      'Emergency Alert',

    notificationSent:
      'Emergency alert dispatched successfully.',

    messageRequired:
      'Please enter an alert message before dispatching.',

    districtRequired:
      'Please select a target district.',

    noOutbreaks:
      'No active outbreak zones are currently available.',

    disease:
      'Disease',

    pest:
      'Pest',

    affectedFarms:
      'active farms',

    estimatedRecipients:
      'estimated farmers',

    reviewMap:
      'Review outbreak zones and timeline below.',

    healthy:
      'No active alerts',
  },

  hi: {
    eyebrow:
      'कृषि अधिकारी निगरानी डेस्क',

    title:
      'प्रकोप खुफिया एवं हस्तक्षेप केंद्र',

    lastSync:
      'अंतिम सिंक',

    session:
      'सत्र',

    synced:
      'लाइव',

    infectedArea:
      'प्रभावित क्षेत्र',

    infectedAreaSubtitle:
      'सक्रिय निगरानी क्षेत्र',

    activeHotspots:
      'सक्रिय जोखिम क्षेत्र',

    activeHotspotsSubtitle:
      'चिन्हित जिले',

    farmsAffected:
      'प्रभावित खेत',

    farmsAffectedSubtitle:
      'प्रत्यक्ष सलाह के अंतर्गत',

    responseTime:
      'प्रतिक्रिया समय',

    responseTimeSubtitle:
      'वर्तमान बेंचमार्क',

    emergencyTitle:
      'आपातकालीन प्रकोप चेतावनी प्रसारित करें',

    emergencyDescription:
      'उच्च जोखिम वाले क्षेत्रों में पंजीकृत किसानों और एक्सटेंशन कर्मचारियों को SMS और ऐप चेतावनी भेजें।',

    targetDistrict:
      'लक्षित जिला',

    alertMessage:
      'चेतावनी संदेश',

    alertPlaceholder:
      'जैसे: तत्काल छिड़काव चेतावनी: फंगल नमी का स्तर अधिक है। 24 घंटे के भीतर स्वीकृत उपचार करें।',

    alertSuccess:
      'चेतावनी सफलतापूर्वक भेज दी गई',

    reachEstimate:
      'चयनित प्रकोप क्षेत्र के आधार पर अनुमानित प्राप्तकर्ता',

    dispatch:
      'चेतावनी भेजें',

    dispatching:
      'भेजा जा रहा है...',

    emergencyAlert:
      'आपातकालीन चेतावनी',

    notificationSent:
      'आपातकालीन चेतावनी सफलतापूर्वक भेज दी गई।',

    messageRequired:
      'कृपया चेतावनी संदेश दर्ज करें।',

    districtRequired:
      'कृपया लक्षित जिला चुनें।',

    noOutbreaks:
      'वर्तमान में कोई सक्रिय प्रकोप क्षेत्र उपलब्ध नहीं है।',

    disease:
      'रोग',

    pest:
      'कीट',

    affectedFarms:
      'सक्रिय खेत',

    estimatedRecipients:
      'अनुमानित किसान',

    reviewMap:
      'नीचे प्रकोप क्षेत्रों और टाइमलाइन की समीक्षा करें।',

    healthy:
      'कोई सक्रिय चेतावनी नहीं',
  },

  mr: {
    eyebrow:
      'कृषी अधिकारी निगराणी डेस्क',

    title:
      'प्रादुर्भाव माहिती आणि हस्तक्षेप केंद्र',

    lastSync:
      'शेवटचा सिंक',

    session:
      'सत्र',

    synced:
      'लाइव्ह',

    infectedArea:
      'बाधित क्षेत्र',

    infectedAreaSubtitle:
      'सक्रिय निगराणी क्षेत्र',

    activeHotspots:
      'सक्रिय जोखीम क्षेत्रे',

    activeHotspotsSubtitle:
      'चिन्हांकित जिल्हे',

    farmsAffected:
      'बाधित शेते',

    farmsAffectedSubtitle:
      'थेट सल्ल्याखाली',

    responseTime:
      'प्रतिसाद वेळ',

    responseTimeSubtitle:
      'सध्याचा बेंचमार्क',

    emergencyTitle:
      'आपत्कालीन प्रादुर्भाव सूचना प्रसारित करा',

    emergencyDescription:
      'उच्च जोखीम क्षेत्रातील नोंदणीकृत शेतकरी आणि विस्तार कर्मचाऱ्यांना SMS आणि अॅप सूचना पाठवा.',

    targetDistrict:
      'लक्षित जिल्हा',

    alertMessage:
      'सूचना संदेश',

    alertPlaceholder:
      'उदा. तात्काळ फवारणी सूचना: बुरशीजन्य आर्द्रता जास्त आहे. 24 तासांच्या आत मान्य उपचार करा.',

    alertSuccess:
      'सूचना यशस्वीरित्या पाठवली',

    reachEstimate:
      'निवडलेल्या प्रादुर्भाव क्षेत्रावर आधारित अंदाजे प्राप्तकर्ते',

    dispatch:
      'सूचना पाठवा',

    dispatching:
      'पाठवत आहे...',

    emergencyAlert:
      'आपत्कालीन सूचना',

    notificationSent:
      'आपत्कालीन सूचना यशस्वीरित्या पाठवली.',

    messageRequired:
      'कृपया सूचना संदेश भरा.',

    districtRequired:
      'कृपया लक्षित जिल्हा निवडा.',

    noOutbreaks:
      'सध्या कोणतेही सक्रिय प्रादुर्भाव क्षेत्र उपलब्ध नाही.',

    disease:
      'रोग',

    pest:
      'कीड',

    affectedFarms:
      'सक्रिय शेते',

    estimatedRecipients:
      'अंदाजे शेतकरी',

    reviewMap:
      'खालील प्रादुर्भाव क्षेत्रे आणि टाइमलाइन तपासा.',

    healthy:
      'सक्रिय सूचना नाही',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getOutbreakLabel = (
  outbreak,
  text
) => {

  if (
    outbreak?.detectionType ===
    'pest' ||
    outbreak?.pest
  ) {
    return (
      outbreak.pest ||
      text.pest
    );
  }

  return (
    outbreak.disease ||
    text.disease
  );
};


const getNowLabel = () =>
  new Date().toLocaleTimeString(
    'en-IN',
    {
      hour12: false,
      timeZone: 'UTC',
    }
  );


/* ============================================================
   OFFICIAL PAGE
   ============================================================ */

export const OfficialPage = () => {

  const {
    addNotification,
    language,
  } = useApp();


  const {
    outbreaks = [],
  } = useScans();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    broadcastMessage,
    setBroadcastMessage,
  ] = useState('');


  const [
    targetDistrict,
    setTargetDistrict,
  ] = useState('');


  const [
    isSent,
    setIsSent,
  ] = useState(false);


  const [
    isDispatching,
    setIsDispatching,
  ] = useState(false);


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  const [
    lastSync,
    setLastSync,
  ] = useState(
    getNowLabel()
  );


  /* ==========================================================
     SAFE DATA
     ========================================================== */

  const safeOutbreaks =
    Array.isArray(
      outbreaks
    )
      ? outbreaks
      : [];


  /* ==========================================================
     DEFAULT DISTRICT
     ========================================================== */

  React.useEffect(() => {

    if (
      !targetDistrict &&
      safeOutbreaks.length > 0
    ) {

      setTargetDistrict(
        safeOutbreaks[0].district
      );

    }

  }, [
    targetDistrict,
    safeOutbreaks,
  ]);


  /* ==========================================================
     KPI DATA
     ========================================================== */

  const totalInfected =
    useMemo(
      () =>
        safeOutbreaks.reduce(
          (
            total,
            outbreak
          ) =>
            total +
            (
              Number(
                outbreak
                  .infectedAcres
              ) ||
              0
            ),
          0
        ),
      [
        safeOutbreaks,
      ]
    );


  const totalAffectedFarms =
    useMemo(
      () =>
        safeOutbreaks.reduce(
          (
            total,
            outbreak
          ) =>
            total +
            (
              Number(
                outbreak
                  .activeFarms
              ) ||
              0
            ),
          0
        ),
      [
        safeOutbreaks,
      ]
    );


  const estimatedRecipients =
    useMemo(() => {

      const selected =
        safeOutbreaks.find(
          (outbreak) =>
            outbreak.district ===
            targetDistrict
        );


      if (
        selected
      ) {

        return Math.max(
          0,
          Number(
            selected
              .activeFarms
          ) || 0
        ) * 20;

      }


      return totalAffectedFarms *
        20;

    }, [
      safeOutbreaks,
      targetDistrict,
      totalAffectedFarms,
    ]);


  /* ==========================================================
     TARGET OUTBREAK
     ========================================================== */

  const selectedOutbreak =
    useMemo(
      () =>
        safeOutbreaks.find(
          (outbreak) =>
            outbreak.district ===
            targetDistrict
        ) ||
        safeOutbreaks[0] ||
        null,
      [
        safeOutbreaks,
        targetDistrict,
      ]
    );


  /* ==========================================================
     BROADCAST
     ========================================================== */

  const handleSendBroadcast =
    async (e) => {

      e.preventDefault();

      setErrorMessage('');
      setIsSent(false);


      if (
        !targetDistrict
      ) {

        setErrorMessage(
          text.districtRequired
        );

        return;
      }


      if (
        !broadcastMessage.trim()
      ) {

        setErrorMessage(
          text.messageRequired
        );

        return;
      }


      setIsDispatching(
        true
      );


      try {

        /*
          This is currently a frontend notification
          dispatch through AppContext. Real SMS/push
          delivery will be connected to the backend later.
        */

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              450
            )
        );


        addNotification(
          `${text.emergencyAlert} (${targetDistrict}): ${broadcastMessage.trim()}`,
          'critical'
        );


        setIsSent(
          true
        );


        setLastSync(
          getNowLabel()
        );


        setBroadcastMessage('');


        setTimeout(
          () => {
            setIsSent(
              false
            );
          },
          3500
        );

      } catch (
        error
      ) {

        console.error(
          'Emergency broadcast failed:',
          error
        );


        setErrorMessage(
          text.messageRequired
        );

      } finally {

        setIsDispatching(
          false
        );

      }
    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">


      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div
        className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4"
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

            <LuShieldAlert className="w-6 h-6 text-red-500 shrink-0" />

            {
              text.title
            }

          </h1>


          <p
            className="text-sm mt-2"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.reviewMap
            }
          </p>

        </div>


        <div className="text-left lg:text-right">

          <p
            className="text-sm mono"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >

            {
              text.lastSync
            }:{' '}

            <span
              style={{
                color:
                  'var(--accent-green)',
              }}
            >
              {
                lastSync
              } UTC · {
                text.synced
              }
            </span>

          </p>


          <p
            className="text-sm mono mt-1"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {
              text.session
            } · AGRI-OPS-2841
          </p>

        </div>

      </div>


      {/* ======================================================
          KPI RIBBON
      ======================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <MetricCard
          title={
            text.infectedArea
          }
          value={`${totalInfected.toLocaleString(
            'en-IN'
          )} ac`}
          subtitle={
            text.infectedAreaSubtitle
          }
          icon={
            TbRadar2
          }
          color="red"
        />


        <MetricCard
          title={
            text.activeHotspots
          }
          value={
            safeOutbreaks.length
          }
          subtitle={
            text.activeHotspotsSubtitle
          }
          icon={
            LuMapPin
          }
          color="amber"
        />


        <MetricCard
          title={
            text.farmsAffected
          }
          value={
            totalAffectedFarms
          }
          subtitle={
            text.farmsAffectedSubtitle
          }
          icon={
            LuActivity
          }
          color="blue"
        />


        <MetricCard
          title={
            text.responseTime
          }
          value="4.2 h"
          subtitle={
            text.responseTimeSubtitle
          }
          icon={
            FiCheckCircle
          }
          color="green"
        />

      </div>


      {/* ======================================================
          OUTBREAK MAP
      ======================================================= */}

      <OutbreakMap />


      {/* ======================================================
          TIMELINE
      ======================================================= */}

      <TimelineSlider />


      {/* ======================================================
          BROADCAST
      ======================================================= */}

      <div
        className="card p-5 sm:p-6 space-y-4"
        style={{
          borderLeft:
            '3px solid rgba(239,68,68,0.45)',
        }}
      >

        <div className="flex items-start gap-3">

          <div
            className="p-2 rounded-md shrink-0"
            style={{
              background:
                'rgba(239,68,68,0.1)',
            }}
          >

            <LuShieldAlert className="w-5 h-5 text-red-500" />

          </div>


          <div>

            <h3
              className="text-lg font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.emergencyTitle
              }
            </h3>


            <p
              className="text-sm mt-1 leading-relaxed"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.emergencyDescription
              }
            </p>

          </div>

        </div>


        {/* No outbreaks */}

        {safeOutbreaks.length ===
        0 ? (

          <div
            className="p-4 rounded-md flex items-center gap-2 text-sm"
            style={{
              background:
                'var(--bg-raised)',

              border:
                '1px solid var(--border-base)',

              color:
                'var(--text-tertiary)',
            }}
          >

            <LuCircleAlert className="w-4 h-4" />

            {
              text.noOutbreaks
            }

          </div>

        ) : (

          <form
            onSubmit={
              handleSendBroadcast
            }
            className="space-y-4 pt-1"
          >

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


              {/* Target District */}

              <div>

                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    text.targetDistrict
                  }
                </label>


                <select
                  value={
                    targetDistrict
                  }
                  onChange={(e) =>
                    setTargetDistrict(
                      e.target.value
                    )
                  }
                  className="field-select"
                  disabled={
                    isDispatching
                  }
                >

                  {safeOutbreaks.map(
                    (outbreak) => (

                      <option
                        key={
                          outbreak.id
                        }
                        value={
                          outbreak.district
                        }
                      >
                        {
                          outbreak.district
                        }
                        {' — '}

                        {
                          getOutbreakLabel(
                            outbreak,
                            text
                          )
                        }
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* Alert Message */}

              <div className="sm:col-span-2">

                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    text.alertMessage
                  }
                </label>


                <input
                  type="text"
                  value={
                    broadcastMessage
                  }
                  onChange={(e) =>
                    setBroadcastMessage(
                      e.target.value
                    )
                  }
                  placeholder={
                    text.alertPlaceholder
                  }
                  className="field-input"
                  disabled={
                    isDispatching
                  }
                />

              </div>

            </div>


            {/* Selected outbreak summary */}

            {selectedOutbreak && (

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

                  <p className="metric-label">
                    {
                      text.activeHotspots
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
                      selectedOutbreak
                        .district
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
                      text.farmsAffected
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
                      selectedOutbreak
                        .activeFarms ??
                      0
                    }
                    {' '}
                    {
                      text.affectedFarms
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
                      text.estimatedRecipients
                    }
                  </p>


                  <p
                    className="text-sm font-semibold mt-1"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    ~
                    {
                      estimatedRecipients.toLocaleString(
                        'en-IN'
                      )
                    }
                  </p>

                </div>

              </div>
            )}


            {/* Error */}

            {errorMessage && (

              <div
                className="flex items-start gap-2 p-3 rounded-md text-sm"
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              {isSent ? (

                <span className="text-sm text-green-700 font-medium flex items-center gap-2">

                  <FiCheckCircle className="w-5 h-5" />

                  {
                    text.notificationSent
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
                    text.reachEstimate
                  }
                </span>

              )}


              <Btn
                variant="danger"
                size="md"
                type="submit"
                disabled={
                  isDispatching
                }
              >

                {isDispatching ? (
                  <>
                    <LuClock3 className="w-4 h-4 animate-spin" />

                    {
                      text.dispatching
                    }
                  </>
                ) : (
                  <>
                    <LuSend className="w-4 h-4" />

                    {
                      text.dispatch
                    }
                  </>
                )}

              </Btn>

            </div>

          </form>

        )}

      </div>

    </div>
  );
};


export default OfficialPage;