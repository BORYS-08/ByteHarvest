import React, { useState } from 'react';
import { Btn } from '../common/GlowButton';
import {
  LuSprout,
  LuFlaskConical,
  LuCalculator,
  LuInfo,
  LuBug,
} from 'react-icons/lu';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const RemedyCard = ({ scanResult }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('organic');

  if (!scanResult) return null;

  const isPest = scanResult.detectionType === 'pest';

  const resultName = isPest
    ? scanResult.pest
    : scanResult.disease;

  const riskLevel =
    scanResult.riskLevel || scanResult.severity;

  const isHealthy =
    !isPest && riskLevel === 'Healthy';

  return (
    <div
      className="card p-5 space-y-5"
      style={{
        borderLeft: isPest
          ? '3px solid rgba(245, 158, 11, 0.35)'
          : '3px solid rgba(34, 197, 94, 0.3)',
      }}
    >

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{
          borderBottom: '1px solid var(--border-base)',
          paddingBottom: '1rem',
        }}
      >
        <div>

          <p className="metric-label">
            {isPest
              ? 'Integrated Pest Management'
              : 'Integrated Pest & Disease Management'}
          </p>

          <h3
            className="text-lg font-semibold mt-1 flex items-center gap-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {isPest ? (
              <LuBug className="w-5 h-5 text-amber-500" />
            ) : (
              <LuSprout className="w-5 h-5 text-green-600" />
            )}

            {isPest
              ? 'Pest Management Plan —'
              : 'Treatment Plan —'}

            <span
              style={{
                color: isPest
                  ? '#b45309'
                  : 'var(--accent-green)',
              }}
            >
              {resultName}
            </span>
          </h3>
        </div>

        {/* Dosage button only makes sense for disease/chemical result */}
        {!isHealthy && !isPest && (
          <Btn
            variant="secondary"
            size="sm"
            onClick={() => navigate('/calculator')}
          >
            <LuCalculator className="w-4 h-4" />
            Calculate Dosage
          </Btn>
        )}
      </div>


      {/* Healthy State */}
      {isHealthy ? (

        <div
          className="p-4 rounded-md flex items-start gap-3"
          style={{
            background: 'var(--accent-green-muted)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <FiCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />

          <div>
            <p
              className="text-base font-semibold"
              style={{
                color: 'var(--text-primary)',
              }}
            >
              Optimal Crop Health
            </p>

            <p
              className="text-sm mt-1.5 leading-relaxed"
              style={{
                color: 'var(--text-secondary)',
              }}
            >
              {scanResult.organicRemedy ||
                'No active disease detected. Continue regular crop scouting and preventive field care.'}
            </p>
          </div>
        </div>

      ) : (

        <div className="space-y-4">

          {/* Pest Risk Summary */}
          {isPest && (
            <div
              className="p-4 rounded-md"
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}
            >

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                <div>
                  <p className="metric-label">
                    Pest Risk Level
                  </p>

                  <p
                    className="text-xl font-bold mt-1"
                    style={{
                      color:
                        riskLevel === 'Critical'
                          ? '#dc2626'
                          : riskLevel === 'High'
                            ? '#b45309'
                            : '#2563eb',
                    }}
                  >
                    {riskLevel}
                  </p>
                </div>

                <div className="text-left sm:text-right">

                  <p className="metric-label">
                    Estimated Pest Count
                  </p>

                  <p
                    className="text-xl font-bold mt-1 mono"
                    style={{
                      color: 'var(--text-primary)',
                    }}
                  >
                    {scanResult.pestCount ?? '—'}
                  </p>

                </div>

              </div>

            </div>
          )}


          {/* Treatment Tabs */}
          <div
            className="flex flex-col sm:flex-row gap-1 p-1 rounded-md w-fit"
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-base)',
            }}
          >

            <button
              type="button"
              onClick={() => setActiveTab('organic')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
              style={{
                background:
                  activeTab === 'organic'
                    ? 'var(--bg-overlay)'
                    : 'transparent',

                color:
                  activeTab === 'organic'
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)',

                border:
                  activeTab === 'organic'
                    ? '1px solid var(--border-mid)'
                    : '1px solid transparent',
              }}
            >
              <LuSprout className="w-4 h-4 text-green-500" />
              {isPest
                ? 'Biological Pest Control'
                : 'Organic & Bio-Control'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chemical')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
              style={{
                background:
                  activeTab === 'chemical'
                    ? 'var(--bg-overlay)'
                    : 'transparent',

                color:
                  activeTab === 'chemical'
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)',

                border:
                  activeTab === 'chemical'
                    ? '1px solid var(--border-mid)'
                    : '1px solid transparent',
              }}
            >
              <LuFlaskConical className="w-4 h-4 text-amber-500" />
              {isPest
                ? 'Insect Control'
                : 'Fungicide / Insecticide'}
            </button>

          </div>


          {/* Organic / Biological Treatment */}
          {activeTab === 'organic' && (
            <div
              className="p-4 rounded-md space-y-3 animate-fade-in"
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-base)',
              }}
            >

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <span
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                >
                  <LuSprout className="w-4 h-4 text-green-500" />
                  {isPest
                    ? 'Biological Pest Control'
                    : 'Biological Treatment'}
                </span>

                <span
                  className="mono text-sm px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: 'var(--accent-green)',
                    border:
                      '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  Lower Residue
                </span>

              </div>

              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--text-secondary)',
                }}
              >
                {scanResult.organicRemedy ||
                  (isPest
                    ? 'Use approved biological control methods and monitor pest activity regularly.'
                    : 'Continue recommended biological crop protection measures.')}
              </p>

            </div>
          )}


          {/* Chemical Treatment */}
          {activeTab === 'chemical' && (
            <div
              className="p-4 rounded-md space-y-3 animate-fade-in"
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-base)',
              }}
            >

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <span
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                >
                  <LuFlaskConical className="w-4 h-4 text-amber-500" />

                  {isPest
                    ? 'Chemical Pest Control'
                    : 'Chemical Intervention'}
                </span>

                <span
                  className="mono text-sm px-2 py-1 rounded-md"
                  style={{
                    background:
                      'rgba(245, 158, 11, 0.1)',
                    color: '#b45309',
                    border:
                      '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                >
                  Targeted Use Only
                </span>

              </div>

              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--text-secondary)',
                }}
              >
                {scanResult.chemicalRemedy ||
                  (isPest
                    ? 'Use only a registered crop-specific insecticide according to the approved label and expert recommendation.'
                    : 'No chemical recommendation available.')}
              </p>


              {/* Dosage */}
              {scanResult.dosagePerAcre && (
                <div
                  className="pt-3 flex items-start gap-2 text-sm"
                  style={{
                    borderTop:
                      '1px solid var(--border-base)',
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  <LuInfo className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />

                  <span>
                    <strong
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      Standard Acreage Ratio:
                    </strong>{' '}
                    {scanResult.dosagePerAcre}
                  </span>
                </div>
              )}

            </div>
          )}


          {/* Preventive Advisory */}
          <div
            className="p-4 rounded-md"
            style={{
              background: 'var(--bg-raised)',
              border:
                '1px solid var(--border-base)',
            }}
          >

            <p className="metric-label mb-2">
              {isPest
                ? 'Preventive Pest Advisory'
                : 'Preventive Field Advisory'}
            </p>

            <p
              className="text-sm leading-relaxed"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {scanResult.preventiveTips ||
                (isPest
                  ? 'Scout the field regularly, remove heavily infested plant parts when appropriate, and monitor pest levels before taking control measures.'
                  : 'Maintain regular field scouting and follow recommended crop protection practices.')}
            </p>

          </div>

        </div>
      )}

    </div>
  );
};