import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LuCloudRain,
  LuThermometer,
  LuDroplets,
  LuWind,
} from 'react-icons/lu';
import { FiAlertTriangle } from 'react-icons/fi';

export const WeatherRiskWidget = () => {
  const { language } = useApp();

  const weatherText = {
    en: {
      localEngine: 'Local Weather Check',
      riskAssessment: 'Weather-Based Disease Risk',
      fungalRisk: 'Fungal Risk: High',
      avgTemp: 'Avg Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall (24h)',
      wind: 'Spore Dispersion',
      forecastNote: 'Forecasting Note:',
      forecast:
        'High relative humidity (>85%) coupled with moderate temperatures (25-30°C) creates ideal conditions for Rice Blast and Tomato Late Blight spore germination over the next 48 hours.',
    },

    hi: {
      localEngine: 'स्थानीय मौसम जाँच',
      riskAssessment: 'मौसम आधारित रोग जोखिम',
      fungalRisk: 'फंगल जोखिम: अधिक',
      avgTemp: 'औसत तापमान',
      humidity: 'नमी',
      rainfall: 'बारिश (24 घंटे)',
      wind: 'बीजाणु फैलाव',
      forecastNote: 'पूर्वानुमान:',
      forecast:
        '85% से अधिक नमी और 25-30°C तापमान अगले 48 घंटों में राइस ब्लास्ट और टमाटर लेट ब्लाइट के बीजाणु बनने के लिए अनुकूल स्थिति पैदा कर सकते हैं।',
    },

    mr: {
      localEngine: 'स्थानिक हवामान तपासणी',
      riskAssessment: 'हवामानावर आधारित रोगाचा धोका',
      fungalRisk: 'बुरशीचा धोका: जास्त',
      avgTemp: 'सरासरी तापमान',
      humidity: 'आर्द्रता',
      rainfall: 'पाऊस (24 तास)',
      wind: 'बीजाणू प्रसार',
      forecastNote: 'अंदाज:',
      forecast:
        '85% पेक्षा जास्त आर्द्रता आणि 25-30°C तापमान पुढील 48 तासांत राईस ब्लास्ट आणि टोमॅटो लेट ब्लाइटच्या बीजाणूंसाठी अनुकूल परिस्थिती निर्माण करू शकते.',
    },
  };

  const text = weatherText[language] || weatherText.en;

  return (
    <div className="card p-4 space-y-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div>
          <span
            className="text-sm uppercase tracking-wide font-semibold"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.localEngine}
          </span>

          <h4
            className="text-lg font-semibold mt-1"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {text.riskAssessment}
          </h4>
        </div>

        <span
          className="text-sm font-semibold px-3 py-2 rounded-md flex items-center gap-2"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#d97706',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <FiAlertTriangle className="w-4 h-4" />
          {text.fungalRisk}
        </span>

      </div>


      {/* Weather Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {/* Temperature */}
        <div
          className="p-3 rounded-md flex flex-col items-center text-center space-y-1"
          style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-base)',
          }}
        >
          <LuThermometer className="w-5 h-5 text-amber-400" />

          <span
            className="text-lg font-bold mono"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            29°C
          </span>

          <span
            className="text-sm"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.avgTemp}
          </span>
        </div>


        {/* Humidity */}
        <div
          className="p-3 rounded-md flex flex-col items-center text-center space-y-1"
          style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-base)',
          }}
        >
          <LuDroplets className="w-5 h-5 text-sky-400" />

          <span
            className="text-lg font-bold mono"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            86%
          </span>

          <span
            className="text-sm"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.humidity}
          </span>
        </div>


        {/* Rainfall */}
        <div
          className="p-3 rounded-md flex flex-col items-center text-center space-y-1"
          style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-base)',
          }}
        >
          <LuCloudRain className="w-5 h-5 text-blue-400" />

          <span
            className="text-lg font-bold mono"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            14 mm
          </span>

          <span
            className="text-sm"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.rainfall}
          </span>
        </div>


        {/* Wind */}
        <div
          className="p-3 rounded-md flex flex-col items-center text-center space-y-1"
          style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-base)',
          }}
        >
          <LuWind className="w-5 h-5 text-green-400" />

          <span
            className="text-lg font-bold mono"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            12 km/h
          </span>

          <span
            className="text-sm"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.wind}
          </span>
        </div>

      </div>


      {/* Forecasting Note */}
      <p
        className="text-sm leading-relaxed p-3 rounded-md"
        style={{
          background: 'var(--bg-raised)',
          border: '1px solid var(--border-base)',
          color: 'var(--text-secondary)',
        }}
      >
        <strong
          style={{
            color: 'var(--text-primary)',
          }}
        >
          {text.forecastNote}
        </strong>{' '}
        {text.forecast}
      </p>

    </div>
  );
};