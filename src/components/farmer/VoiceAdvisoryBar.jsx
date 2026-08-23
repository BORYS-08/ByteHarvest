import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LuVolume2,
  LuPlay,
  LuPause,
} from 'react-icons/lu';

export const VoiceAdvisoryBar = ({
  text,
  audioScript,
  diseaseName,
}) => {
  const {
    audioAdvisory,
    playVoiceAdvisory,
    stopVoiceAdvisory,
    language,
    languageConfig,
  } = useApp();

  const fallbackNames = {
    en: 'Crop Health',
    hi: 'फसल स्वास्थ्य',
    mr: 'पीक आरोग्य',
  };

  const fallbackName =
    fallbackNames[language] || fallbackNames.en;

  const scriptToPlay =
    audioScript ||
    text ||
    `Advisory for ${
      diseaseName || fallbackName
    }. Please follow safe crop protection guidelines.`;

  const isCurrentPlaying =
    audioAdvisory.isPlaying &&
    audioAdvisory.text === scriptToPlay;

  const handleTogglePlay = () => {
    if (isCurrentPlaying) {
      stopVoiceAdvisory();
    } else {
      playVoiceAdvisory(
        scriptToPlay,
        languageConfig?.speechLocale || 'en-IN'
      );
    }
  };

  const languageLabel =
    languageConfig?.label || 'English';

  const playLabel =
    language === 'hi'
      ? 'सलाह सुनें'
      : language === 'mr'
        ? 'सल्ला ऐका'
        : 'Listen to advisory';

  const pauseLabel =
    language === 'hi'
      ? 'सलाह रोकें'
      : language === 'mr'
        ? 'सल्ला थांबवा'
        : 'Pause advisory';

  const speakingLabel =
    language === 'hi'
      ? 'बोल रहा है...'
      : language === 'mr'
        ? 'बोलत आहे...'
        : 'Speaking...';

  return (
    <div
      className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        borderLeft:
          '3px solid rgba(56, 189, 248, 0.35)',
      }}
    >

      {/* Voice Advisory Content */}
      <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">

        {/* Play / Pause */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={
            isCurrentPlaying
              ? pauseLabel
              : playLabel
          }
          className="p-3 rounded-md cursor-pointer transition-colors shrink-0"
          style={{
            background: isCurrentPlaying
              ? 'rgba(56, 189, 248, 0.15)'
              : 'var(--bg-raised)',

            color: isCurrentPlaying
              ? '#0284c7'
              : 'var(--text-primary)',

            border: isCurrentPlaying
              ? '1px solid rgba(56, 189, 248, 0.35)'
              : '1px solid var(--border-base)',
          }}
        >
          {isCurrentPlaying ? (
            <LuPause className="w-5 h-5" />
          ) : (
            <LuPlay className="w-5 h-5 ml-0.5" />
          )}
        </button>


        {/* Advisory Text */}
        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <span
              className="text-sm font-semibold uppercase tracking-wide flex items-center gap-2"
              style={{
                color: 'var(--text-primary)',
              }}
            >
              <LuVolume2 className="text-sky-400 w-4 h-4" />

              {language === 'hi'
                ? 'बहुभाषी ऑडियो सलाह'
                : language === 'mr'
                  ? 'बहुभाषिक ऑडिओ सल्ला'
                  : 'Multilingual Audio Advisory'}
            </span>

            <span
              className="mono text-sm px-2 py-1 rounded-md"
              style={{
                background:
                  'var(--bg-raised)',
                color:
                  'var(--text-tertiary)',
              }}
            >
              {languageLabel}
            </span>
          </div>


          <p
            className="text-sm line-clamp-2 mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {scriptToPlay}
          </p>

        </div>
      </div>


      {/* Speaking Indicator */}
      {isCurrentPlaying && (
        <div
          className="flex items-center gap-1.5 text-sm text-sky-600 font-medium px-3 py-2 rounded-md shrink-0"
          style={{
            background:
              'rgba(56, 189, 248, 0.08)',
          }}
        >
          <span className="w-1 h-3 bg-sky-400" />
          <span className="w-1 h-4 bg-sky-400" />
          <span className="w-1 h-2 bg-sky-400" />

          <span className="ml-1 mono text-sm">
            {speakingLabel}
          </span>
        </div>
      )}

    </div>
  );
};