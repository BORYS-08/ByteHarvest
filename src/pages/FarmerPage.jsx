import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useScans } from '../context/ScanContext';
import { useApp } from '../context/AppContext';

import { Btn } from '../components/common/GlowButton';

import { WeatherRiskWidget } from '../components/farmer/WeatherRiskWidget';
import { CropHealthRiskPanel } from '../components/farmer/CropHealthRiskPanel';
import { TreatmentTracker } from '../components/tracker/TreatmentTracker';

import {
  LuSprout,
  LuArrowRight,
  LuLandmark,
  LuImageOff,
} from 'react-icons/lu';

import { GiDna2 } from 'react-icons/gi';


/* ============================================================
   LOCAL PAGE TRANSLATIONS
   ============================================================ */

const farmerPageTranslations = {
  en: {
    region: 'Punjab / North India Zone',
    records: 'records',

    noScans:
      'No crop scans have been recorded yet.',

    unknownDisease:
      'No disease identified',

    unknownPest:
      'No pest identified',

    unknownCrop:
      'Unknown crop',

    status:
      'Status',

    verified:
      'Expert Verified',

    aiIdentified:
      'AI Identified',

    pending:
      'Pending Review',

    imageUnavailable:
      'Image unavailable',
  },

  hi: {
    region: 'पंजाब / उत्तर भारत क्षेत्र',
    records: 'रिकॉर्ड',

    noScans:
      'अभी तक कोई फसल स्कैन रिकॉर्ड नहीं किया गया है।',

    unknownDisease:
      'रोग की पहचान नहीं हुई',

    unknownPest:
      'कीट की पहचान नहीं हुई',

    unknownCrop:
      'अज्ञात फसल',

    status:
      'स्थिति',

    verified:
      'विशेषज्ञ द्वारा सत्यापित',

    aiIdentified:
      'AI द्वारा पहचान',

    pending:
      'समीक्षा लंबित',

    imageUnavailable:
      'चित्र उपलब्ध नहीं है',
  },

  mr: {
    region: 'पंजाब / उत्तर भारत विभाग',
    records: 'नोंदी',

    noScans:
      'अद्याप कोणतेही पीक स्कॅन नोंदवलेले नाहीत.',

    unknownDisease:
      'रोग ओळखला गेला नाही',

    unknownPest:
      'कीड ओळखली गेली नाही',

    unknownCrop:
      'अज्ञात पीक',

    status:
      'स्थिती',

    verified:
      'तज्ज्ञांनी सत्यापित केले',

    aiIdentified:
      'AI द्वारे ओळखले',

    pending:
      'पुनरावलोकन प्रलंबित',

    imageUnavailable:
      'प्रतिमा उपलब्ध नाही',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getTranslatedStatus = (
  status,
  text
) => {
  switch (status) {
    case 'Expert Verified':
      return text.verified;

    case 'AI Identified':
      return text.aiIdentified;

    case 'Pending Review':
      return text.pending;

    default:
      return status || text.pending;
  }
};


const getFallbackName = (
  scan,
  detectionType,
  text
) => {
  if (detectionType === 'pest') {
    return (
      scan.pest ||
      text.unknownPest
    );
  }

  return (
    scan.disease ||
    text.unknownDisease
  );
};


/* ============================================================
   FARMER PAGE
   ============================================================ */

export const FarmerPage = () => {
  const navigate = useNavigate();

  const {
    scans,
  } = useScans();

  const {
    t,
    language,
  } = useApp();


  const text =
    farmerPageTranslations[
      language
    ] ||
    farmerPageTranslations.en;


  const safeScans =
    Array.isArray(scans)
      ? scans
      : [];


  const latestScan =
    safeScans.length > 0
      ? safeScans[0]
      : null;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">


      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div
        className="flex flex-col xl:flex-row xl:items-center justify-between gap-5"
        style={{
          borderBottom:
            '1px solid var(--border-base)',
          paddingBottom:
            '1rem',
        }}
      >

        <div className="min-w-0">

          <p
            className="text-sm mono"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {t('farmer.dashboard')}:{' '}

            <span
              style={{
                color:
                  'var(--accent-green)',
              }}
            >
              {text.region}
            </span>
          </p>


          <h1
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <LuSprout className="w-6 h-6 text-green-500 shrink-0" />

            <span>
              {t('farmer.dashboard')}
            </span>

          </h1>

        </div>


        {/* ====================================================
            DASHBOARD ACTIONS
        ===================================================== */}

        <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full xl:w-auto">

          <Btn
            variant="secondary"
            size="md"
            onClick={() =>
              navigate('/farms')
            }
          >
            <LuLandmark className="w-5 h-5" />

            <span>
              {t('farmer.manageFarms')}
            </span>
          </Btn>


          <Btn
            variant="secondary"
            size="md"
            onClick={() =>
              navigate('/crops')
            }
          >
            <LuSprout className="w-5 h-5" />

            <span>
              {t('farmer.manageCrops')}
            </span>
          </Btn>


          <Btn
            variant="primary"
            size="md"
            onClick={() =>
              navigate('/scanner')
            }
          >
            <GiDna2 className="w-5 h-5" />

            <span>
              {t('farmer.scanner')}
            </span>

            <LuArrowRight className="w-4 h-4" />

          </Btn>

        </div>

      </div>


      {/* ======================================================
          WEATHER RISK
      ======================================================= */}

      <WeatherRiskWidget />


      {/* ======================================================
          CROP HEALTH + RISK FORECAST
      ======================================================= */}

      <CropHealthRiskPanel />


      {/* ======================================================
          RECOVERY TRACKER
      ======================================================= */}

      <TreatmentTracker
        scan={
          latestScan
        }
      />


      {/* ======================================================
          SCAN HISTORY
      ======================================================= */}

      <section className="space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

          <h3
            className="text-base font-semibold"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {t(
              'farmer.recentDiagnoses'
            )}
          </h3>


          <span
            className="text-sm mono"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {
              safeScans.length
            }{' '}

            {
              text.records
            }

          </span>

        </div>


        {/* ====================================================
            SCAN RECORDS
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {safeScans.length > 0 ? (

            safeScans.map(
              (scan) => {

                const detectionType =
                  scan.detectionType ||
                  'disease';


                const resultName =
                  getFallbackName(
                    scan,
                    detectionType,
                    text
                  );


                const resultLabel =
                  detectionType ===
                  'pest'
                    ? t(
                        'scanner.pestResult'
                      )
                    : t(
                        'scanner.diseaseResult'
                      );


                const statusLabel =
                  getTranslatedStatus(
                    scan.status,
                    text
                  );


                return (
                  <article
                    key={
                      scan.id
                    }
                    className="card card-hover p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >

                    {/* =================================================
                        IMAGE
                    ================================================== */}

                    <div
                      className="w-full sm:w-16 sm:h-16 h-36 rounded-md overflow-hidden shrink-0 flex items-center justify-center"
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
                            resultName ||
                            scan.crop ||
                            text.unknownCrop
                          }
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(
                            e
                          ) => {

                            e.currentTarget.style.display =
                              'none';

                            const fallback =
                              e.currentTarget
                                .nextSibling;

                            if (
                              fallback
                            ) {
                              fallback.style.display =
                                'flex';
                            }

                          }}
                        />

                      ) : null}


                      <div
                        className="w-full h-full hidden items-center justify-center"
                        style={{
                          color:
                            'var(--text-tertiary)',
                        }}
                      >

                        <div className="flex flex-col items-center justify-center gap-1 text-center px-2">

                          <LuImageOff className="w-5 h-5" />

                          <span className="text-xs">
                            {
                              text.imageUnavailable
                            }
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================== */}

                    <div className="flex-1 min-w-0 w-full space-y-1.5">

                      {/* Crop + Date */}

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <span
                          className="text-sm font-medium text-green-600 truncate"
                          title={
                            scan.crop ||
                            text.unknownCrop
                          }
                        >
                          {
                            scan.crop ||
                            text.unknownCrop
                          }
                        </span>


                        {scan.date && (
                          <span
                            className="text-xs sm:text-sm mono px-2 py-1 rounded-md shrink-0"
                            style={{
                              background:
                                'var(--bg-raised)',

                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            {
                              scan.date
                            }
                          </span>
                        )}

                      </div>


                      {/* Detection label */}

                      <p
                        className="text-sm"
                        style={{
                          color:
                            'var(--text-tertiary)',
                        }}
                      >
                        {
                          resultLabel
                        }
                      </p>


                      {/* Disease / Pest */}

                      <p
                        className="text-base font-semibold truncate"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                        title={
                          resultName
                        }
                      >
                        {
                          resultName
                        }
                      </p>


                      {/* Confidence / Status */}

                      <div className="flex flex-wrap items-center gap-2 text-sm">

                        {typeof scan.confidence ===
                          'number' && (
                          <span className="text-green-600 mono">
                            {
                              scan.confidence
                            }%
                            {' '}
                            {
                              t(
                                'scanner.confidence'
                              )
                            }
                          </span>
                        )}


                        {typeof scan.confidence ===
                          'number' &&
                          scan.status && (
                            <span
                              style={{
                                color:
                                  'var(--text-tertiary)',
                              }}
                            >
                              ·
                            </span>
                          )}


                        {scan.status && (
                          <span
                            className="truncate"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                            title={
                              statusLabel
                            }
                          >
                            {
                              statusLabel
                            }
                          </span>
                        )}

                      </div>

                    </div>

                  </article>
                );
              }
            )

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================== */

            <div
              className="card p-8 sm:p-10 text-center lg:col-span-2"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >

              <LuSprout className="w-8 h-8 mx-auto mb-3 text-green-600 opacity-60" />

              <p className="text-sm sm:text-base">
                {
                  text.noScans
                }
              </p>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/scanner'
                  )
                }
                className="mt-3 text-sm font-semibold text-green-700 hover:underline cursor-pointer"
              >
                {
                  t(
                    'farmer.scanner'
                  )
                }
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};


export default FarmerPage;