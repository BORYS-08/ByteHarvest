import React, {
  useMemo,
  useState,
} from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import L from 'leaflet';

import {
  useScans,
} from '../../context/ScanContext';

import {
  useApp,
} from '../../context/AppContext';

import {
  LuFilter,
  LuLayers,
  LuCircleAlert,
  LuBug,
  LuSprout,
} from 'react-icons/lu';

import {
  TbRadar2,
} from 'react-icons/tb';

import 'leaflet/dist/leaflet.css';


/* ============================================================
   LEAFLET DEFAULT ICON
   ============================================================ */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',

  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',

  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


/* ============================================================
   MARKER ICON
   ============================================================ */

const createMarkerIcon = (
  severity
) => {

  const colorMap = {
    Critical:
      '#ef4444',

    High:
      '#f59e0b',

    Moderate:
      '#3b82f6',

    Healthy:
      '#22c55e',
  };


  const color =
    colorMap[
      severity
    ] ||
    '#22c55e';


  return L.divIcon({
    className:
      'custom-pulse-marker',

    html: `
      <div style="
        position:relative;
        width:20px;
        height:20px;
      ">
        <span style="
          position:absolute;
          top:2px;
          left:2px;
          width:16px;
          height:16px;
          border-radius:50%;
          background-color:${color};
          border:2px solid #ffffff;
          box-shadow:0 0 0 4px ${color}22;
        "></span>
      </div>
    `,

    iconSize:
      [20, 20],

    iconAnchor:
      [10, 10],
  });
};


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    title:
      'Geospatial Outbreak Heatmap',

    description:
      'Active disease and pest outbreak clusters across monitored districts.',

    crop:
      'Crop',

    severity:
      'Severity',

    allCrops:
      'All Crops',

    allSeverities:
      'All Severities',

    critical:
      'Critical Emergency',

    high:
      'High Risk',

    moderate:
      'Moderate',

    healthy:
      'Healthy',

    hotspots:
      'Hotspots',

    popupCrop:
      'Crop',

    popupOutbreak:
      'Outbreak',

    popupPest:
      'Pest',

    popupInfected:
      'Infected',

    popupFarms:
      'farms',

    popupStatus:
      'Status',

    popupUpdated:
      'Updated',

    diseaseOutbreak:
      'Disease Outbreak',

    pestOutbreak:
      'Pest Outbreak',

    noResults:
      'No outbreak zones match the selected filters.',

    active:
      'Active',

    controlled:
      'Under Control',

    allStatus:
      'All Status',
  },


  hi: {
    title:
      'भौगोलिक प्रकोप मानचित्र',

    description:
      'निगरानी वाले जिलों में सक्रिय रोग और कीट प्रकोप क्षेत्र।',

    crop:
      'फसल',

    severity:
      'गंभीरता',

    allCrops:
      'सभी फसलें',

    allSeverities:
      'सभी जोखिम स्तर',

    critical:
      'गंभीर आपातकाल',

    high:
      'उच्च जोखिम',

    moderate:
      'मध्यम',

    healthy:
      'स्वस्थ',

    hotspots:
      'जोखिम क्षेत्र',

    popupCrop:
      'फसल',

    popupOutbreak:
      'प्रकोप',

    popupPest:
      'कीट',

    popupInfected:
      'प्रभावित',

    popupFarms:
      'खेत',

    popupStatus:
      'स्थिति',

    popupUpdated:
      'अपडेट',

    diseaseOutbreak:
      'रोग प्रकोप',

    pestOutbreak:
      'कीट प्रकोप',

    noResults:
      'चयनित फ़िल्टर से कोई प्रकोप क्षेत्र नहीं मिला।',

    active:
      'सक्रिय',

    controlled:
      'नियंत्रण में',

    allStatus:
      'सभी स्थिति',
  },


  mr: {
    title:
      'भौगोलिक प्रादुर्भाव नकाशा',

    description:
      'नियंत्रणाखालील जिल्ह्यांमधील सक्रिय रोग आणि किडीचे प्रादुर्भाव क्षेत्र.',

    crop:
      'पीक',

    severity:
      'तीव्रता',

    allCrops:
      'सर्व पिके',

    allSeverities:
      'सर्व जोखीम स्तर',

    critical:
      'गंभीर आपत्काल',

    high:
      'उच्च धोका',

    moderate:
      'मध्यम',

    healthy:
      'निरोगी',

    hotspots:
      'जोखीम क्षेत्रे',

    popupCrop:
      'पीक',

    popupOutbreak:
      'प्रादुर्भाव',

    popupPest:
      'कीड',

    popupInfected:
      'बाधित',

    popupFarms:
      'शेते',

    popupStatus:
      'स्थिती',

    popupUpdated:
      'अपडेट',

    diseaseOutbreak:
      'रोगाचा प्रादुर्भाव',

    pestOutbreak:
      'किडीचा प्रादुर्भाव',

    noResults:
      'निवडलेल्या फिल्टरशी जुळणारे प्रादुर्भाव क्षेत्र सापडले नाही.',

    active:
      'सक्रिय',

    controlled:
      'नियंत्रणात',

    allStatus:
      'सर्व स्थिती',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const normalizeCrop =
  (crop) => {

    const value =
      String(
        crop || ''
      )
        .trim()
        .toLowerCase();


    if (
      value === 'maize' ||
      value === 'maize (corn)'
    ) {
      return 'Maize (Corn)';
    }


    if (
      value === 'rice' ||
      value === 'rice (paddy)'
    ) {
      return 'Rice (Paddy)';
    }


    return crop || '';
  };


const getSeverityLabel = (
  severity,
  text
) => {

  if (
    severity ===
    'Critical'
  ) {
    return text.critical;
  }


  if (
    severity ===
    'High'
  ) {
    return text.high;
  }


  if (
    severity ===
    'Moderate'
  ) {
    return text.moderate;
  }


  if (
    severity ===
    'Healthy'
  ) {
    return text.healthy;
  }


  return (
    severity ||
    '—'
  );
};


const getStatusLabel = (
  status,
  text
) => {

  if (
    status ===
    'Under Control'
  ) {
    return text.controlled;
  }


  if (
    status ===
    'Active Warning' ||
    status ===
    'Emergency Alert' ||
    status ===
    'Surveillance Active'
  ) {
    return text.active;
  }


  return (
    status ||
    '—'
  );
};


/* ============================================================
   OUTBREAK MAP
   ============================================================ */

export const OutbreakMap = () => {

  const {
    outbreaks = [],
  } = useScans();


  const {
    language,
  } = useApp();


  const text =
    translations[
      language
    ] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    selectedCrop,
    setSelectedCrop,
  ] = useState(
    'All'
  );


  const [
    selectedSeverity,
    setSelectedSeverity,
  ] = useState(
    'All'
  );


  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState(
    'All'
  );


  /* ==========================================================
     SAFE OUTBREAK DATA
     ========================================================== */

  const safeOutbreaks =
    useMemo(
      () =>
        Array.isArray(
          outbreaks
        )
          ? outbreaks.map(
              (outbreak) => ({
                ...outbreak,

                crop:
                  normalizeCrop(
                    outbreak.crop
                  ),
              })
            )
          : [],
      [outbreaks]
    );


  /* ==========================================================
     CROP OPTIONS
     ========================================================== */

  const cropOptions =
    useMemo(() => {

      const values = [
        'Rice (Paddy)',
        'Tomato',
        'Cotton',
        'Maize (Corn)',
      ];


      const extraValues =
        safeOutbreaks
          .map(
            (outbreak) =>
              outbreak.crop
          )
          .filter(
            Boolean
          );


      return [
        ...new Set([
          ...values,
          ...extraValues,
        ]),
      ];

    }, [
      safeOutbreaks,
    ]);


  /* ==========================================================
     FILTERED DATA
     ========================================================== */

  const filteredOutbreaks =
    useMemo(() => {

      return safeOutbreaks.filter(
        (outbreak) => {

          const matchCrop =
            selectedCrop ===
              'All' ||
            outbreak.crop ===
              selectedCrop;


          const matchSeverity =
            selectedSeverity ===
              'All' ||
            outbreak.severity ===
              selectedSeverity;


          const matchStatus =
            selectedStatus ===
              'All' ||
            outbreak.status ===
              selectedStatus;


          return (
            matchCrop &&
            matchSeverity &&
            matchStatus
          );
        }
      );

    }, [
      safeOutbreaks,
      selectedCrop,
      selectedSeverity,
      selectedStatus,
    ]);


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="space-y-3">


      {/* ======================================================
          CONTROL BAR
      ======================================================= */}

      <div className="card p-4 space-y-4">

        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">


          {/* Header */}

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="p-2 rounded-md shrink-0"
              style={{
                background:
                  'rgba(245,158,11,0.1)',
              }}
            >

              <TbRadar2 className="w-5 h-5 text-amber-600" />

            </div>


            <div className="min-w-0">

              <h3
                className="text-lg font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.title
                }
              </h3>


              <p
                className="text-sm mt-1"
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

          </div>


          {/* Filters */}

          <div className="flex flex-wrap items-stretch gap-2 w-full xl:w-auto">


            {/* Crop */}

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm"
              style={{
                background:
                  'var(--bg-surface)',

                border:
                  '1px solid var(--border-mid)',
              }}
            >

              <LuFilter className="w-4 h-4 text-green-600 shrink-0" />


              <span
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  text.crop
                }:
              </span>


              <select
                value={
                  selectedCrop
                }
                onChange={(e) =>
                  setSelectedCrop(
                    e.target.value
                  )
                }
                className="bg-transparent font-medium cursor-pointer focus:outline-none max-w-40"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >

                <option value="All">
                  {
                    text.allCrops
                  }
                </option>


                {cropOptions.map(
                  (
                    crop
                  ) => (

                    <option
                      key={
                        crop
                      }
                      value={
                        crop
                      }
                    >
                      {
                        crop
                      }
                    </option>

                  )
                )}

              </select>

            </div>


            {/* Severity */}

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm"
              style={{
                background:
                  'var(--bg-surface)',

                border:
                  '1px solid var(--border-mid)',
              }}
            >

              <LuLayers className="w-4 h-4 text-sky-600 shrink-0" />


              <span
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  text.severity
                }:
              </span>


              <select
                value={
                  selectedSeverity
                }
                onChange={(e) =>
                  setSelectedSeverity(
                    e.target.value
                  )
                }
                className="bg-transparent font-medium cursor-pointer focus:outline-none"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >

                <option value="All">
                  {
                    text.allSeverities
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

              </select>

            </div>


            {/* Status */}

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm"
              style={{
                background:
                  'var(--bg-surface)',

                border:
                  '1px solid var(--border-mid)',
              }}
            >

              <LuCircleAlert className="w-4 h-4 text-red-500 shrink-0" />


              <span
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {
                  text.popupStatus
                }:
              </span>


              <select
                value={
                  selectedStatus
                }
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value
                  )
                }
                className="bg-transparent font-medium cursor-pointer focus:outline-none"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >

                <option value="All">
                  {
                    text.allStatus
                  }
                </option>

                <option value="Active Warning">
                  {
                    text.active
                  }
                </option>

                <option value="Emergency Alert">
                  {
                    text.active
                  }
                </option>

                <option value="Surveillance Active">
                  {
                    text.active
                  }
                </option>

                <option value="Under Control">
                  {
                    text.controlled
                  }
                </option>

              </select>

            </div>


            {/* Count */}

            <span
              className="mono text-sm px-3 py-2 rounded-md flex items-center justify-center"
              style={{
                background:
                  'rgba(34,197,94,0.1)',

                color:
                  'var(--accent-green)',

                border:
                  '1px solid rgba(34,197,94,0.2)',
              }}
            >
              {
                filteredOutbreaks.length
              }{' '}
              {
                text.hotspots
              }
            </span>

          </div>

        </div>

      </div>


      {/* ======================================================
          MAP
      ======================================================= */}

      <div className="card p-1.5 h-[420px] sm:h-[460px] relative overflow-hidden">

        <MapContainer
          center={[
            22.5937,
            78.9629,
          ]}
          zoom={5}
          scrollWheelZoom={
            true
          }
          className="w-full h-full rounded-md z-10"
        >

          {/* ==================================================
              TILE LAYER
          =================================================== */}

          <TileLayer
            attribution={
              '&copy; <a href="https://carto.com/">CARTO</a>'
            }
            url={
              'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            }
          />


          {/* ==================================================
              HOTSPOTS
          =================================================== */}

          {filteredOutbreaks.map(
            (
              outbreak
            ) => {

              const isPest =
                outbreak.detectionType ===
                  'pest' ||
                Boolean(
                  outbreak.pest
                );


              const outbreakName =
                isPest
                  ? (
                      outbreak.pest ||
                      text.pestOutbreak
                    )
                  : (
                      outbreak.disease ||
                      text.diseaseOutbreak
                    );


              return (
                <Marker
                  key={
                    outbreak.id
                  }
                  position={[
                    Number(
                      outbreak.lat
                    ),
                    Number(
                      outbreak.lng
                    ),
                  ]}
                  icon={
                    createMarkerIcon(
                      outbreak.severity
                    )
                  }
                >

                  <Popup>

                    <div className="space-y-2 p-1 font-sans min-w-[220px]">

                      {/* Header */}

                      <div
                        className="flex items-start justify-between gap-2 pb-2"
                        style={{
                          borderBottom:
                            '1px solid var(--border-base)',
                        }}
                      >

                        <div className="min-w-0">

                          <span
                            className="font-bold text-base block truncate"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              outbreak.district
                            }
                          </span>


                          <span
                            className="text-xs mt-1 flex items-center gap-1.5"
                            style={{
                              color:
                                isPest
                                  ? '#b45309'
                                  : '#15803d',
                            }}
                          >

                            {isPest ? (
                              <LuBug className="w-3.5 h-3.5" />
                            ) : (
                              <LuSprout className="w-3.5 h-3.5" />
                            )}

                            {
                              isPest
                                ? text.pestOutbreak
                                : text.diseaseOutbreak
                            }

                          </span>

                        </div>


                        <span
                          className="text-xs uppercase font-mono px-2 py-1 rounded-md whitespace-nowrap"
                          style={{
                            background:
                              'rgba(239,68,68,0.1)',

                            color:
                              '#dc2626',
                          }}
                        >
                          {
                            getSeverityLabel(
                              outbreak.severity,
                              text
                            )
                          }
                        </span>

                      </div>


                      {/* Details */}

                      <div
                        className="text-sm space-y-1.5"
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >

                        <p>

                          <strong
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              text.popupCrop
                            }:
                          </strong>{' '}

                          {
                            outbreak.crop ||
                            '—'
                          }

                        </p>


                        <p>

                          <strong
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              isPest
                                ? text.popupPest
                                : text.popupOutbreak
                            }:
                          </strong>{' '}

                          {
                            outbreakName
                          }

                        </p>


                        <p>

                          <strong
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              text.popupInfected
                            }:
                          </strong>{' '}

                          {
                            Number(
                              outbreak
                                .infectedAcres
                            ) || 0
                          }{' '}

                          ac (
                          {
                            Number(
                              outbreak
                                .activeFarms
                            ) || 0
                          }{' '}

                          {
                            text.popupFarms
                          })

                        </p>


                        <p className="text-sm mono mt-2">

                          {
                            text.popupStatus
                          }:{' '}

                          {
                            getStatusLabel(
                              outbreak.status,
                              text
                            )
                          }

                        </p>


                        <p
                          className="text-xs mono"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >

                          {
                            text.popupUpdated
                          }:{' '}

                          {
                            outbreak.updatedAt ||
                            '—'
                          }

                        </p>

                      </div>

                    </div>

                  </Popup>

                </Marker>
              );

            }
          )}

        </MapContainer>


        {/* ==================================================
            EMPTY STATE
        =================================================== */}

        {filteredOutbreaks.length ===
          0 && (

          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6">

            <div
              className="px-5 py-4 rounded-lg text-center max-w-sm"
              style={{
                background:
                  'rgba(255,255,255,0.94)',

                border:
                  '1px solid var(--border-base)',

                boxShadow:
                  '0 10px 35px rgba(0,0,0,0.12)',
              }}
            >

              <LuCircleAlert className="w-7 h-7 mx-auto mb-2 text-amber-600" />


              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.noResults
                }
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};


export default OutbreakMap;