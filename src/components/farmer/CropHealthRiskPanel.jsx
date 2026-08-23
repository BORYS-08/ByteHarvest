import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LuActivity,
  LuBug,
  LuCloudRain,
  LuShieldAlert,
  LuTrendingUp,
  LuTrendingDown,
  LuCircleCheck,
  LuTriangleAlert,
} from 'react-icons/lu';

const translations = {
  en: {
    health: 'Crop Health Score',
    overall: 'Overall crop condition',
    diseaseRisk: 'Disease Risk',
    pestRisk: 'Pest Risk',
    weatherRisk: 'Weather Risk',

    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',

    forecast: 'Risk Forecast',
    forecastSubtitle:
      'Expected crop risk over the next 72 hours',

    today: 'Today',
    hours24: '+24h',
    hours48: '+48h',
    hours72: '+72h',

    earlyWarning: 'Early Warning',
    warning:
      'High humidity and moderate temperature may increase fungal disease pressure over the next 48 hours.',

    action:
      'Recommended action:',
    actionText:
      'Inspect affected leaves and avoid unnecessary irrigation during humid periods.',

    improving: 'Improving',
    increasing: 'Increasing',
    stable: 'Stable',

    scoreGood:
      'Crop health is currently good.',
    scoreWatch:
      'Crop requires closer monitoring.',
    scoreRisk:
      'Immediate crop inspection is recommended.',
  },

  hi: {
    health: 'फसल स्वास्थ्य स्कोर',
    overall: 'फसल की समग्र स्थिति',
    diseaseRisk: 'रोग जोखिम',
    pestRisk: 'कीट जोखिम',
    weatherRisk: 'मौसम जोखिम',

    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    critical: 'गंभीर',

    forecast: 'जोखिम पूर्वानुमान',
    forecastSubtitle:
      'अगले 72 घंटों में संभावित फसल जोखिम',

    today: 'आज',
    hours24: '+24 घंटे',
    hours48: '+48 घंटे',
    hours72: '+72 घंटे',

    earlyWarning: 'प्रारंभिक चेतावनी',
    warning:
      'अधिक नमी और मध्यम तापमान अगले 48 घंटों में फंगल रोग का खतरा बढ़ा सकते हैं।',

    action:
      'सुझाई गई कार्रवाई:',
    actionText:
      'प्रभावित पत्तियों की जाँच करें और अधिक नमी के दौरान अनावश्यक सिंचाई से बचें।',

    improving: 'सुधार हो रहा है',
    increasing: 'बढ़ रहा है',
    stable: 'स्थिर',

    scoreGood:
      'फसल का स्वास्थ्य अभी अच्छा है।',
    scoreWatch:
      'फसल की अधिक निगरानी आवश्यक है।',
    scoreRisk:
      'तुरंत फसल निरीक्षण की सलाह दी जाती है।',
  },

  mr: {
    health: 'पीक आरोग्य स्कोअर',
    overall: 'पिकाची एकूण स्थिती',
    diseaseRisk: 'रोगाचा धोका',
    pestRisk: 'किडीचा धोका',
    weatherRisk: 'हवामानाचा धोका',

    low: 'कमी',
    medium: 'मध्यम',
    high: 'उच्च',
    critical: 'गंभीर',

    forecast: 'जोखीम अंदाज',
    forecastSubtitle:
      'पुढील 72 तासांतील अपेक्षित पीक जोखीम',

    today: 'आज',
    hours24: '+24 तास',
    hours48: '+48 तास',
    hours72: '+72 तास',

    earlyWarning: 'पूर्वसूचना',
    warning:
      'जास्त आर्द्रता आणि मध्यम तापमानामुळे पुढील 48 तासांत बुरशीजन्य रोगाचा धोका वाढू शकतो.',

    action:
      'शिफारस केलेली कृती:',
    actionText:
      'बाधित पानांची तपासणी करा आणि जास्त आर्द्रतेच्या काळात अनावश्यक सिंचन टाळा.',

    improving: 'सुधारणा होत आहे',
    increasing: 'वाढत आहे',
    stable: 'स्थिर',

    scoreGood:
      'पिकाचे आरोग्य सध्या चांगले आहे.',
    scoreWatch:
      'पिकाचे अधिक निरीक्षण आवश्यक आहे.',
    scoreRisk:
      'तातडीने पीक तपासणी करण्याची शिफारस आहे.',
  },
};

const riskStyles = {
  Low: {
    color: '#16a34a',
    background: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.18)',
  },

  Medium: {
    color: '#ca8a04',
    background: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.18)',
  },

  High: {
    color: '#ea580c',
    background: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.18)',
  },

  Critical: {
    color: '#dc2626',
    background: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.18)',
  },
};

const getRiskLabel = (risk, text) => {
  const map = {
    Low: text.low,
    Medium: text.medium,
    High: text.high,
    Critical: text.critical,
  };

  return map[risk] || risk;
};

export const CropHealthRiskPanel = ({
  healthScore = 82,
  diseaseRisk = 'Medium',
  pestRisk = 'Low',
  weatherRisk = 'High',
}) => {
  const { language } = useApp();

  const text =
    translations[language] ||
    translations.en;

  const healthMessage =
    healthScore >= 80
      ? text.scoreGood
      : healthScore >= 60
        ? text.scoreWatch
        : text.scoreRisk;

  const forecast = [
    {
      label: text.today,
      disease: 46,
      pest: 24,
      weather: 68,
      overall: 52,
    },
    {
      label: text.hours24,
      disease: 58,
      pest: 28,
      weather: 74,
      overall: 60,
    },
    {
      label: text.hours48,
      disease: 67,
      pest: 36,
      weather: 81,
      overall: 69,
    },
    {
      label: text.hours72,
      disease: 61,
      pest: 34,
      weather: 72,
      overall: 63,
    },
  ];

  const maxValue = 100;

  return (
    <section className="space-y-4">

      {/* =====================================================
          HEALTH SUMMARY
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Health Score */}
        <div
          className="card p-5 lg:col-span-5"
          style={{
            borderLeft:
              '3px solid rgba(34,197,94,0.35)',
          }}
        >
          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="metric-label">
                {text.health}
              </p>

              <p
                className="text-sm mt-1"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {text.overall}
              </p>
            </div>

            <div
              className="p-2 rounded-md"
              style={{
                background:
                  'rgba(34,197,94,0.08)',
              }}
            >
              <LuActivity className="w-5 h-5 text-green-600" />
            </div>

          </div>

          <div className="flex items-end gap-2 mt-5">

            <span
              className="text-5xl font-bold mono"
              style={{
                color:
                  healthScore >= 80
                    ? 'var(--accent-green)'
                    : healthScore >= 60
                      ? '#ca8a04'
                      : '#dc2626',
              }}
            >
              {healthScore}
            </span>

            <span
              className="text-lg mb-1"
              style={{
                color:
                  'var(--text-tertiary)',
              }}
            >
              /100
            </span>

          </div>

          <div
            className="h-2 rounded-full overflow-hidden mt-4"
            style={{
              background:
                'var(--bg-raised)',
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${healthScore}%`,
                background:
                  healthScore >= 80
                    ? '#22c55e'
                    : healthScore >= 60
                      ? '#eab308'
                      : '#ef4444',
              }}
            />
          </div>

          <p
            className="text-sm mt-3"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {healthMessage}
          </p>

        </div>


        {/* Risk Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">

          {[
            {
              label: text.diseaseRisk,
              risk: diseaseRisk,
              icon: LuShieldAlert,
            },
            {
              label: text.pestRisk,
              risk: pestRisk,
              icon: LuBug,
            },
            {
              label: text.weatherRisk,
              risk: weatherRisk,
              icon: LuCloudRain,
            },
          ].map((item) => {

            const style =
              riskStyles[item.risk] ||
              riskStyles.Low;

            const Icon =
              item.icon;

            return (
              <div
                key={item.label}
                className="card p-4"
              >

                <div className="flex items-center justify-between gap-2">

                  <span className="metric-label">
                    {item.label}
                  </span>

                  <Icon
                    className="w-5 h-5"
                    style={{
                      color:
                        style.color,
                    }}
                  />

                </div>

                <div className="mt-5">

                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold"
                    style={{
                      color:
                        style.color,
                      background:
                        style.background,
                      border:
                        `1px solid ${style.border}`,
                    }}
                  >
                    {getRiskLabel(
                      item.risk,
                      text
                    )}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* =====================================================
          FORECAST
      ====================================================== */}

      <div className="card p-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

          <div>
            <h3
              className="text-base font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {text.forecast}
            </h3>

            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.forecastSubtitle}
            </p>
          </div>

          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium"
            style={{
              color:
                weatherRisk === 'High'
                  ? '#ea580c'
                  : 'var(--accent-green)',
            }}
          >
            {weatherRisk === 'High' ? (
              <>
                <LuTrendingUp className="w-4 h-4" />
                {text.increasing}
              </>
            ) : (
              <>
                <LuTrendingDown className="w-4 h-4" />
                {text.improving}
              </>
            )}
          </span>

        </div>


        {/* Chart */}
        <div className="mt-6">

          <div
            className="relative h-56"
            style={{
              borderBottom:
                '1px solid var(--border-base)',
              borderLeft:
                '1px solid var(--border-base)',
            }}
          >

            {/* Horizontal grid */}
            {[25, 50, 75].map((line) => (
              <div
                key={line}
                className="absolute left-0 right-0 border-t border-dashed"
                style={{
                  bottom: `${line}%`,
                  borderColor:
                    'var(--border-base)',
                }}
              />
            ))}


            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-3 px-3">

              {forecast.map((item) => (
                <div
                  key={item.label}
                  className="flex-1 h-full flex items-end justify-center gap-1.5"
                >

                  <div
                    className="w-2.5 rounded-t bg-red-400"
                    style={{
                      height: `${item.disease}%`,
                    }}
                    title={`${text.diseaseRisk}: ${item.disease}%`}
                  />

                  <div
                    className="w-2.5 rounded-t bg-amber-400"
                    style={{
                      height: `${item.pest}%`,
                    }}
                    title={`${text.pestRisk}: ${item.pest}%`}
                  />

                  <div
                    className="w-2.5 rounded-t bg-sky-400"
                    style={{
                      height: `${item.weather}%`,
                    }}
                    title={`${text.weatherRisk}: ${item.weather}%`}
                  />

                </div>
              ))}

            </div>

          </div>


          {/* X Axis */}
          <div className="grid grid-cols-4 gap-3 mt-2">

            {forecast.map((item) => (
              <div
                key={item.label}
                className="text-center text-sm mono"
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >
                {item.label}
              </div>
            ))}

          </div>


          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">

            <span className="flex items-center gap-1.5 text-(--text-secondary)">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              {text.diseaseRisk}
            </span>

            <span className="flex items-center gap-1.5 text-(--text-secondary)">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              {text.pestRisk}
            </span>

            <span className="flex items-center gap-1.5 text-(--text-secondary)">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              {text.weatherRisk}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          EARLY WARNING
      ====================================================== */}

      <div
        className="card p-5"
        style={{
          borderLeft:
            '3px solid rgba(245,158,11,0.45)',
        }}
      >

        <div className="flex items-start gap-3">

          <div
            className="p-2 rounded-md shrink-0"
            style={{
              background:
                'rgba(245,158,11,0.1)',
            }}
          >
            <LuTriangleAlert className="w-5 h-5 text-amber-500" />
          </div>

          <div>

            <h3
              className="text-base font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {text.earlyWarning}
            </h3>

            <p
              className="text-sm mt-1 leading-relaxed"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.warning}
            </p>

            <p
              className="text-sm mt-3"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              <strong
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {text.action}
              </strong>{' '}
              {text.actionText}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CropHealthRiskPanel;