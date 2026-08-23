import React, {
  useEffect,
  useState,
} from 'react';

import {
  useApp,
} from '../../context/AppContext';

import {
  LuPlay,
  LuPause,
  LuRotateCcw,
  LuCalendar,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    title:
      '30-Day Outbreak Temporal Spread Simulation',

    day:
      'Day',

    of:
      'of',

    pause:
      'Pause timeline',

    play:
      'Play timeline',

    reset:
      'Reset timeline',

    slider:
      'Outbreak timeline day',

    firstDay:
      'Day 1',

    lastDay:
      'Day 30',

    playing:
      'Timeline playing',

    stopped:
      'Timeline paused',

    speed:
      'Playback speed',
  },

  hi: {
    title:
      '30-दिन का प्रकोप फैलाव सिमुलेशन',

    day:
      'दिन',

    of:
      'में से',

    pause:
      'टाइमलाइन रोकें',

    play:
      'टाइमलाइन चलाएँ',

    reset:
      'टाइमलाइन रीसेट करें',

    slider:
      'प्रकोप टाइमलाइन दिन',

    firstDay:
      'दिन 1',

    lastDay:
      'दिन 30',

    playing:
      'टाइमलाइन चल रही है',

    stopped:
      'टाइमलाइन रुकी हुई है',

    speed:
      'प्लेबैक गति',
  },

  mr: {
    title:
      '30 दिवसांचा प्रादुर्भाव प्रसार सिम्युलेशन',

    day:
      'दिवस',

    of:
      'पैकी',

    pause:
      'टाइमलाइन थांबवा',

    play:
      'टाइमलाइन सुरू करा',

    reset:
      'टाइमलाइन रीसेट करा',

    slider:
      'प्रादुर्भाव टाइमलाइन दिवस',

    firstDay:
      'दिवस 1',

    lastDay:
      'दिवस 30',

    playing:
      'टाइमलाइन सुरू आहे',

    stopped:
      'टाइमलाइन थांबलेली आहे',

    speed:
      'प्लेबॅक गती',
  },
};


/* ============================================================
   CONSTANTS
   ============================================================ */

const TOTAL_DAYS = 30;

const PLAYBACK_INTERVAL_MS = 500;


/* ============================================================
   TIMELINE SLIDER
   ============================================================ */

export const TimelineSlider = () => {

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
    currentDay,
    setCurrentDay,
  ] = useState(
    TOTAL_DAYS
  );


  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);


  /* ==========================================================
     PLAYBACK
     ========================================================== */

  useEffect(() => {

    if (!isPlaying) {
      return undefined;
    }


    const interval =
      setInterval(
        () => {

          setCurrentDay(
            (previousDay) =>
              previousDay >=
              TOTAL_DAYS
                ? 1
                : previousDay + 1
          );

        },
        PLAYBACK_INTERVAL_MS
      );


    return () =>
      clearInterval(
        interval
      );

  }, [
    isPlaying,
  ]);


  /* ==========================================================
     STOP WHEN COMPONENT IS UNMOUNTED
     ========================================================== */

  useEffect(() => {

    return () => {
      setIsPlaying(
        false
      );
    };

  }, []);


  /* ==========================================================
     HANDLERS
     ========================================================== */

  const handleTogglePlayback =
    () => {

      setIsPlaying(
        (previous) =>
          !previous
      );

    };


  const handleSliderChange =
    (event) => {

      setCurrentDay(
        Number(
          event.target.value
        )
      );


      /*
        Manual slider movement pauses playback.
        Otherwise the animation can immediately
        overwrite the user's selected day.
      */

      setIsPlaying(
        false
      );

    };


  const handleReset =
    () => {

      setIsPlaying(
        false
      );

      setCurrentDay(
        1
      );

    };


  const handleKeyDown =
    (event) => {

      if (
        event.key ===
        ' '
      ) {

        event.preventDefault();

        handleTogglePlayback();

      }

    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="card p-4 sm:p-5 space-y-4">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div className="flex items-center gap-2 min-w-0">

          <LuCalendar className="w-5 h-5 text-amber-500 shrink-0" />


          <span
            className="text-sm font-semibold uppercase tracking-wide truncate"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.title
            }
          </span>

        </div>


        <div
          className="flex items-center gap-2"
          aria-live="polite"
        >

          <span
            className="mono text-sm font-semibold px-3 py-1.5 rounded-md shrink-0"
            style={{
              background:
                'rgba(245,158,11,0.1)',

              color:
                '#d97706',

              border:
                '1px solid rgba(245,158,11,0.2)',
            }}
          >
            {
              text.day
            }{' '}

            {
              currentDay
            }{' '}

            {
              text.of
            }{' '}

            {
              TOTAL_DAYS
            }

          </span>


          <span
            className="sr-only"
            aria-live="polite"
          >
            {
              isPlaying
                ? text.playing
                : text.stopped
            }
          </span>

        </div>

      </div>


      {/* ======================================================
          CONTROLS
      ======================================================= */}

      <div className="flex items-center gap-3">


        {/* Play / Pause */}

        <button
          type="button"
          onClick={
            handleTogglePlayback
          }
          onKeyDown={
            handleKeyDown
          }
          className="p-2.5 rounded-md transition-colors cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label={
            isPlaying
              ? text.pause
              : text.play
          }
          aria-pressed={
            isPlaying
          }
          title={
            isPlaying
              ? text.pause
              : text.play
          }
          style={{
            background:
              isPlaying
                ? 'rgba(245,158,11,0.12)'
                : 'var(--bg-raised)',

            color:
              isPlaying
                ? '#d97706'
                : 'var(--text-primary)',

            border:
              isPlaying
                ? '1px solid rgba(245,158,11,0.3)'
                : '1px solid var(--border-base)',
          }}
        >

          {isPlaying ? (
            <LuPause className="w-5 h-5" />
          ) : (
            <LuPlay className="w-5 h-5" />
          )}

        </button>


        {/* Timeline */}

        <div className="flex-1 min-w-0">

          <input
            type="range"
            min="1"
            max={
              TOTAL_DAYS
            }
            step="1"
            value={
              currentDay
            }
            onChange={
              handleSliderChange
            }
            className="w-full accent-amber-500 cursor-pointer h-2 rounded-md"
            style={{
              background:
                'var(--bg-canvas)',
            }}
            aria-label={
              text.slider
            }
            aria-valuemin={
              1
            }
            aria-valuemax={
              TOTAL_DAYS
            }
            aria-valuenow={
              currentDay
            }
            aria-valuetext={`${text.day} ${currentDay} ${text.of} ${TOTAL_DAYS}`}
          />


          {/* Timeline endpoints */}

          <div
            className="flex items-center justify-between mt-1 text-xs mono"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >

            <span>
              {
                text.firstDay
              }
            </span>


            <span>
              {
                text.lastDay
              }
            </span>

          </div>

        </div>


        {/* Reset */}

        <button
          type="button"
          onClick={
            handleReset
          }
          className="p-2.5 rounded-md transition-colors cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label={
            text.reset
          }
          title={
            text.reset
          }
          style={{
            background:
              'var(--bg-raised)',

            color:
              'var(--text-secondary)',

            border:
              '1px solid var(--border-base)',
          }}
        >

          <LuRotateCcw className="w-5 h-5" />

        </button>

      </div>


      {/* ======================================================
          PLAYBACK STATUS
      ======================================================= */}

      <div
        className="flex items-center justify-between gap-3 text-xs"
        style={{
          color:
            'var(--text-tertiary)',
        }}
      >

        <span>
          {
            isPlaying
              ? text.playing
              : text.stopped
          }
        </span>


        <span className="mono">
          {
            currentDay ===
            TOTAL_DAYS
              ? text.lastDay
              : `${text.day} ${currentDay}`
          }
        </span>

      </div>

    </div>
  );
};


export default TimelineSlider;