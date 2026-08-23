import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LuActivity } from 'react-icons/lu';
import { FiCheckCircle } from 'react-icons/fi';

const FARM_HEALTH_IMAGES = {
  before:
    'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1200&q=85',

  after:
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85',
};

export const TreatmentTracker = ({ scan }) => {
  const { language } = useApp();

  const [sliderPosition, setSliderPosition] =
    useState(50);

  const sampleScan = scan || {
    disease: 'Rice Blast',
    crop: 'Rice (Paddy)',
    date: '2026-08-10',
    recoveryWeek: 3,

    beforeImage:
      FARM_HEALTH_IMAGES.before,

    afterImage:
      FARM_HEALTH_IMAGES.after,

    beforeAfterImage: {
      before:
        FARM_HEALTH_IMAGES.before,

      after:
        FARM_HEALTH_IMAGES.after,
    },
  };

  /*
    Support all image formats currently used
    by the frontend.

    Priority:
    1. beforeAfterImage.before / after
    2. beforeImage / afterImage
    3. scan.image for "before"
    4. default fallback images
  */

  const beforeImage =
    scan?.beforeAfterImage?.before ||
    scan?.beforeImage ||
    scan?.image ||
    sampleScan.beforeImage ||
    FARM_HEALTH_IMAGES.before;

  const afterImage =
    scan?.beforeAfterImage?.after ||
    scan?.afterImage ||
    sampleScan.afterImage ||
    FARM_HEALTH_IMAGES.after;

  const translations = {
    en: {
      storyboard:
        'Crop Health Recovery Storyboard',

      tracker:
        'Treatment Recovery Tracker',

      active:
        'Week 3 of 4 Active',

      before:
        'Before Treatment (Infected Foliage)',

      after:
        'After Treatment (Recovered Tissue)',

      recoveredAlt:
        'Recovered crop foliage',

      infectedAlt:
        'Infected crop foliage',

      instruction:
        'Drag the slider left or right to compare foliage recovery.',

      week:
        'Week',

      completed:
        'Completed',

      inProgress:
        'In Progress',

      scheduled:
        'Scheduled',

      initialSpray:
        'Diagnosis & Initial Spray',

      lesionDrying:
        'Fungal Lesion Drying',

      shootGrowth:
        'New Shoot Growth',

      fullRecovery:
        'Full Recovery Clearance',

      sprayDesc:
        'Applied Neem extract + Tricyclazole 120g/acre.',

      lesionDesc:
        'Lesion spread halted. Active spore count down 85%.',

      shootDesc:
        'Healthy green tillers emerging across plot.',

      recoveryDesc:
        'Final field verification by Extension Agent.',
    },

    hi: {
      storyboard:
        'फसल स्वास्थ्य सुधार',

      tracker:
        'उपचार सुधार ट्रैकर',

      active:
        'सप्ताह 3 / 4 सक्रिय',

      before:
        'उपचार से पहले (संक्रमित पत्तियाँ)',

      after:
        'उपचार के बाद (स्वस्थ पत्तियाँ)',

      recoveredAlt:
        'ठीक हुई फसल की पत्तियाँ',

      infectedAlt:
        'संक्रमित फसल की पत्तियाँ',

      instruction:
        'फसल की स्थिति की तुलना करने के लिए स्लाइडर को बाएँ या दाएँ खींचें।',

      week:
        'सप्ताह',

      completed:
        'पूरा',

      inProgress:
        'चल रहा है',

      scheduled:
        'निर्धारित',

      initialSpray:
        'रोग पहचान और पहला छिड़काव',

      lesionDrying:
        'फंगल घाव सूखना',

      shootGrowth:
        'नई कोंपल वृद्धि',

      fullRecovery:
        'पूर्ण सुधार जाँच',

      sprayDesc:
        'नीम अर्क + ट्राइसाइक्लाज़ोल 120 ग्राम/एकड़ का प्रयोग किया गया।',

      lesionDesc:
        'घाव का फैलाव रुक गया। सक्रिय बीजाणु संख्या 85% कम हुई।',

      shootDesc:
        'खेत में स्वस्थ हरे कल्ले दिखाई दे रहे हैं।',

      recoveryDesc:
        'विस्तार अधिकारी द्वारा अंतिम खेत जाँच।',
    },

    mr: {
      storyboard:
        'पीक आरोग्य पुनर्प्राप्ती',

      tracker:
        'उपचार पुनर्प्राप्ती ट्रॅकर',

      active:
        'आठवडा 3 / 4 सक्रिय',

      before:
        'उपचारापूर्वी (संक्रमित पाने)',

      after:
        'उपचारानंतर (निरोगी पाने)',

      recoveredAlt:
        'बरे झालेल्या पिकाची पाने',

      infectedAlt:
        'संक्रमित पिकाची पाने',

      instruction:
        'पिकाच्या सुधारण्याची तुलना करण्यासाठी स्लाइडर डावीकडे किंवा उजवीकडे ओढा.',

      week:
        'आठवडा',

      completed:
        'पूर्ण',

      inProgress:
        'सुरू आहे',

      scheduled:
        'नियोजित',

      initialSpray:
        'रोग निदान आणि पहिली फवारणी',

      lesionDrying:
        'बुरशीजन्य डाग सुकणे',

      shootGrowth:
        'नवीन कोंब वाढ',

      fullRecovery:
        'पूर्ण पुनर्प्राप्ती तपासणी',

      sprayDesc:
        'नीम अर्क + ट्रायसायक्लाझोल 120 ग्रॅम/एकर वापरण्यात आला.',

      lesionDesc:
        'डागांचा प्रसार थांबला. सक्रिय बीजाणूंची संख्या 85% कमी झाली.',

      shootDesc:
        'शेतात निरोगी हिरवे कोंब दिसत आहेत.',

      recoveryDesc:
        'विस्तार अधिकाऱ्यांकडून अंतिम शेत तपासणी.',
    },
  };

  const text =
    translations[language] ||
    translations.en;

  const timelineSteps = [
    {
      week: 1,
      title: text.initialSpray,
      status: 'Completed',
      date: 'Aug 10',
      desc: text.sprayDesc,
    },

    {
      week: 2,
      title: text.lesionDrying,
      status: 'Completed',
      date: 'Aug 17',
      desc: text.lesionDesc,
    },

    {
      week: 3,
      title: text.shootGrowth,
      status: 'In Progress',
      date: 'Aug 24',
      desc: text.shootDesc,
    },

    {
      week: 4,
      title: text.fullRecovery,
      status: 'Scheduled',
      date: 'Aug 31',
      desc: text.recoveryDesc,
    },
  ];

  const getStatusLabel = (status) => {
    if (status === 'Completed') {
      return text.completed;
    }

    if (status === 'In Progress') {
      return text.inProgress;
    }

    return text.scheduled;
  };

  return (
    <div
      className="card p-5 space-y-5"
      style={{
        borderLeft:
          '3px solid rgba(34, 197, 94, 0.3)',
      }}
    >

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3"
        style={{
          borderBottom:
            '1px solid var(--border-base)',
        }}
      >

        <div>

          <span
            className="text-sm uppercase tracking-wide font-semibold"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {text.storyboard}
          </span>

          <h3
            className="text-lg font-semibold mt-1 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            <LuActivity className="text-green-500 w-5 h-5" />

            {sampleScan.crop} — {text.tracker}
          </h3>

        </div>

        <span
          className="mono text-sm px-3 py-1.5 rounded-md font-semibold"
          style={{
            background:
              'rgba(34, 197, 94, 0.1)',
            color:
              'var(--accent-green)',
            border:
              '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          {text.active}
        </span>

      </div>


      {/* Before / After Comparison */}
      <div className="space-y-3">

        <div
          className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm font-medium"
          style={{
            color:
              'var(--text-secondary)',
          }}
        >
          <span>
            {text.before}
          </span>

          <span>
            {text.after}
          </span>
        </div>


        <div
          className="relative aspect-video sm:aspect-21/9 rounded-md overflow-hidden select-none"
          style={{
            border:
              '1px solid var(--border-base)',
            background:
              '#eef4ea',
          }}
        >

          {/* After Image */}
          <img
            src={afterImage}
            alt={text.recoveredAlt}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                FARM_HEALTH_IMAGES.after;
            }}
          />


          {/* Before Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width:
                `${sliderPosition}%`,
              borderRight:
                '2px solid #38bdf8',
            }}
          >

            <img
              src={beforeImage}
              alt={text.infectedAlt}
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: '100%',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  FARM_HEALTH_IMAGES.before;
              }}
            />

          </div>


          {/* Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) =>
              setSliderPosition(
                Number(e.target.value)
              )
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label={
              text.instruction
            }
          />

        </div>


        <p
          className="text-sm text-center"
          style={{
            color:
              'var(--text-tertiary)',
          }}
        >
          {text.instruction}
        </p>

      </div>


      {/* Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">

        {timelineSteps.map((step) => (

          <div
            key={step.week}
            className="p-4 rounded-md space-y-2"
            style={{
              background:
                'var(--bg-raised)',
              border:
                step.status ===
                'In Progress'
                  ? '1px solid rgba(56, 189, 248, 0.4)'
                  : '1px solid var(--border-base)',
            }}
          >

            <div className="flex items-center justify-between font-semibold">

              <span
                className="text-sm"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {text.week}{' '}
                {step.week}
              </span>


              {step.status ===
              'Completed' ? (

                <span className="flex items-center gap-1.5 text-sm text-green-600">

                  <FiCheckCircle className="w-4 h-4" />

                  {getStatusLabel(
                    step.status
                  )}

                </span>

              ) : (

                <span
                  className="mono text-sm"
                  style={{
                    color:
                      step.status ===
                      'In Progress'
                        ? '#38bdf8'
                        : 'var(--text-tertiary)',
                  }}
                >
                  {getStatusLabel(
                    step.status
                  )}{' '}
                  · {step.date}
                </span>

              )}

            </div>


            <h5
              className="text-base font-semibold leading-snug"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {step.title}
            </h5>


            <p
              className="text-sm leading-relaxed"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {step.desc}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default TreatmentTracker;