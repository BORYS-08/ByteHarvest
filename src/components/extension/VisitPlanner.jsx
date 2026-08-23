import React, {
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
  LuCalendar,
  LuMapPin,
  LuPhone,
  LuPlus,
  LuCloudOff,
  LuUser,
  LuCircleAlert,
  LuCircleCheck,
  LuClock3,
  LuX,
} from 'react-icons/lu';

import {
  FiUsers,
} from 'react-icons/fi';


/* ============================================================
   CONSTANTS
   ============================================================ */

const translations = {
  en: {
    desk:
      'Field Operations Desk',

    title:
      'Extension Worker Visit Scheduler & Lab Referrals',

    offlineQueue:
      'Offline Queue',

    pending:
      'Pending',

    scheduleVisit:
      'Schedule Visit',

    newVisit:
      'Schedule New Field Visit',

    farmerName:
      'Farmer Name',

    phone:
      'Contact Phone',

    village:
      'Village / Location',

    crop:
      'Target Crop',

    purpose:
      'Visit Purpose / Symptoms',

    farmerPlaceholder:
      'e.g. Balwinder Singh',

    villagePlaceholder:
      'e.g. Gill Village, Ludhiana',

    purposePlaceholder:
      'e.g. Collect physical leaf sample for central lab testing...',

    cancel:
      'Cancel',

    confirm:
      'Confirm Schedule',

    purposeLabel:
      'Purpose:',

    priority:
      'Priority',

    urgent:
      'Urgent',

    high:
      'High',

    medium:
      'Medium',

    low:
      'Low',

    scheduled:
      'Scheduled Visits',

    visitStatus:
      'Visit Status',

    scheduledStatus:
      'Scheduled',

    inProgress:
      'In Progress',

    completed:
      'Completed',

    cancelled:
      'Cancelled',

    defaultVillage:
      'Local Village',

    defaultPurpose:
      'Routine crop health scouting & sample collection.',

    phoneInvalid:
      'Please enter a valid Indian phone number.',

    farmerRequired:
      'Please enter the farmer name.',

    villageRequired:
      'Please enter the village or location.',

    purposeRequired:
      'Please enter the visit purpose.',

    scheduling:
      'Scheduling...',

    scheduleSuccess:
      'Field visit scheduled successfully.',

    scheduleFailed:
      'Unable to schedule the field visit. Please try again.',

    noVisits:
      'No field visits scheduled yet.',

    date:
      'Visit Date',

    actions:
      'Actions',

    close:
      'Close',

    maize:
      'Maize (Corn)',

    extension:
      'Extension',

    contact:
      'Contact Farmer',
  },


  hi: {
    desk:
      'फील्ड संचालन डेस्क',

    title:
      'एक्सटेंशन कर्मचारी विजिट शेड्यूलर और लैब रेफरल',

    offlineQueue:
      'ऑफलाइन कतार',

    pending:
      'लंबित',

    scheduleVisit:
      'विजिट शेड्यूल करें',

    newVisit:
      'नई फील्ड विजिट शेड्यूल करें',

    farmerName:
      'किसान का नाम',

    phone:
      'संपर्क फोन',

    village:
      'गाँव / स्थान',

    crop:
      'लक्षित फसल',

    purpose:
      'विजिट का उद्देश्य / लक्षण',

    farmerPlaceholder:
      'जैसे बलविंदर सिंह',

    villagePlaceholder:
      'जैसे गिल गाँव, लुधियाना',

    purposePlaceholder:
      'जैसे केंद्रीय कृषि लैब के लिए पत्ती का नमूना एकत्र करना...',

    cancel:
      'रद्द करें',

    confirm:
      'शेड्यूल की पुष्टि करें',

    purposeLabel:
      'उद्देश्य:',

    priority:
      'प्राथमिकता',

    urgent:
      'तत्काल',

    high:
      'उच्च',

    medium:
      'मध्यम',

    low:
      'कम',

    scheduled:
      'निर्धारित विजिट',

    visitStatus:
      'विजिट स्थिति',

    scheduledStatus:
      'निर्धारित',

    inProgress:
      'प्रगति में',

    completed:
      'पूर्ण',

    cancelled:
      'रद्द',

    defaultVillage:
      'स्थानीय गाँव',

    defaultPurpose:
      'नियमित फसल स्वास्थ्य निरीक्षण और नमूना संग्रह।',

    phoneInvalid:
      'कृपया एक मान्य भारतीय फोन नंबर दर्ज करें।',

    farmerRequired:
      'कृपया किसान का नाम दर्ज करें।',

    villageRequired:
      'कृपया गाँव या स्थान दर्ज करें।',

    purposeRequired:
      'कृपया विजिट का उद्देश्य दर्ज करें।',

    scheduling:
      'शेड्यूल हो रहा है...',

    scheduleSuccess:
      'फील्ड विजिट सफलतापूर्वक शेड्यूल हो गई।',

    scheduleFailed:
      'फील्ड विजिट शेड्यूल नहीं हो सकी। कृपया फिर प्रयास करें।',

    noVisits:
      'अभी कोई फील्ड विजिट शेड्यूल नहीं है।',

    date:
      'विजिट तिथि',

    actions:
      'कार्रवाई',

    close:
      'बंद करें',

    maize:
      'मक्का (कॉर्न)',

    extension:
      'एक्सटेंशन',

    contact:
      'किसान से संपर्क करें',
  },


  mr: {
    desk:
      'फील्ड ऑपरेशन्स डेस्क',

    title:
      'फील्ड विस्तार कर्मचारी भेट नियोजक आणि लॅब रेफरल',

    offlineQueue:
      'ऑफलाइन रांग',

    pending:
      'प्रलंबित',

    scheduleVisit:
      'भेट नियोजित करा',

    newVisit:
      'नवीन फील्ड भेट नियोजित करा',

    farmerName:
      'शेतकऱ्याचे नाव',

    phone:
      'संपर्क फोन',

    village:
      'गाव / ठिकाण',

    crop:
      'लक्षित पीक',

    purpose:
      'भेटीचा उद्देश / लक्षणे',

    farmerPlaceholder:
      'उदा. बलविंदर सिंग',

    villagePlaceholder:
      'उदा. गिल गाव, लुधियाना',

    purposePlaceholder:
      'उदा. केंद्रीय कृषी प्रयोगशाळेसाठी पानाचा नमुना गोळा करणे...',

    cancel:
      'रद्द करा',

    confirm:
      'नियोजन निश्चित करा',

    purposeLabel:
      'उद्देश:',

    priority:
      'प्राधान्य',

    urgent:
      'तातडीचे',

    high:
      'उच्च',

    medium:
      'मध्यम',

    low:
      'कमी',

    scheduled:
      'नियोजित भेटी',

    visitStatus:
      'भेट स्थिती',

    scheduledStatus:
      'नियोजित',

    inProgress:
      'प्रगतीत',

    completed:
      'पूर्ण',

    cancelled:
      'रद्द',

    defaultVillage:
      'स्थानिक गाव',

    defaultPurpose:
      'नियमित पीक आरोग्य तपासणी आणि नमुना संकलन.',

    phoneInvalid:
      'कृपया वैध भारतीय फोन नंबर भरा.',

    farmerRequired:
      'कृपया शेतकऱ्याचे नाव भरा.',

    villageRequired:
      'कृपया गाव किंवा ठिकाण भरा.',

    purposeRequired:
      'कृपया भेटीचा उद्देश भरा.',

    scheduling:
      'नियोजन सुरू आहे...',

    scheduleSuccess:
      'फील्ड भेट यशस्वीरित्या नियोजित केली.',

    scheduleFailed:
      'फील्ड भेट नियोजित करता आली नाही. कृपया पुन्हा प्रयत्न करा.',

    noVisits:
      'अद्याप कोणत्याही फील्ड भेटी नियोजित नाहीत.',

    date:
      'भेट दिनांक',

    actions:
      'कृती',

    close:
      'बंद करा',

    maize:
      'मका (कॉर्न)',

    extension:
      'विस्तार',

    contact:
      'शेतकऱ्याशी संपर्क करा',
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getPriorityStyle = (
  priority
) => {

  if (
    priority ===
    'Urgent'
  ) {
    return {
      background:
        'rgba(239,68,68,0.1)',

      color:
        '#dc2626',

      border:
        '1px solid rgba(239,68,68,0.2)',
    };
  }


  if (
    priority ===
    'High'
  ) {
    return {
      background:
        'rgba(245,158,11,0.1)',

      color:
        '#b45309',

      border:
        '1px solid rgba(245,158,11,0.2)',
    };
  }


  return {
    background:
      'rgba(56,189,248,0.1)',

    color:
      '#0284c7',

    border:
      '1px solid rgba(56,189,248,0.2)',
  };
};


const getStatusStyle = (
  status
) => {

  switch (status) {

    case 'Completed':
      return {
        background:
          'rgba(34,197,94,0.1)',

        color:
          '#15803d',
      };

    case 'In Progress':
      return {
        background:
          'rgba(56,189,248,0.1)',

        color:
          '#0284c7',
      };

    case 'Cancelled':
      return {
        background:
          'rgba(239,68,68,0.1)',

        color:
          '#dc2626',
      };

    default:
      return {
        background:
          'var(--bg-raised)',

        color:
          'var(--text-secondary)',
      };
  }
};


const getStatusLabel = (
  status,
  text
) => {

  switch (status) {

    case 'In Progress':
      return text.inProgress;

    case 'Completed':
      return text.completed;

    case 'Cancelled':
      return text.cancelled;

    default:
      return text.scheduledStatus;
  }
};


/* ============================================================
   VISIT PLANNER
   ============================================================ */

export const VisitPlanner = () => {

  const {
    fieldVisits = [],
    scheduleVisit,
  } = useScans();


  const {
    language,
  } = useApp();


  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);


  const [
    farmerName,
    setFarmerName,
  ] = useState('');


  const [
    village,
    setVillage,
  ] = useState('');


  const [
    phone,
    setPhone,
  ] = useState('');


  const [
    crop,
    setCrop,
  ] = useState(
    'Rice (Paddy)'
  );


  const [
    purpose,
    setPurpose,
  ] = useState('');


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  const [
    successMessage,
    setSuccessMessage,
  ] = useState('');


  /* ==========================================================
     SAFE VISIT DATA
     ========================================================== */

  const safeVisits =
    useMemo(
      () =>
        Array.isArray(
          fieldVisits
        )
          ? fieldVisits
          : [],
      [fieldVisits]
    );


  /* ==========================================================
     OFFLINE QUEUE
     ========================================================== */

  const offlineQueueCount = 0;


  /* ==========================================================
     CREATE VISIT
     ========================================================== */

  const handleCreateVisit =
    async (e) => {

      e.preventDefault();

      setErrorMessage('');
      setSuccessMessage('');


      const cleanFarmerName =
        farmerName.trim();

      const cleanVillage =
        village.trim();

      const cleanPhone =
        phone.trim();

      const cleanPurpose =
        purpose.trim();


      if (
        !cleanFarmerName
      ) {

        setErrorMessage(
          text.farmerRequired
        );

        return;
      }


      if (
        !cleanVillage
      ) {

        setErrorMessage(
          text.villageRequired
        );

        return;
      }


      if (
        !cleanPurpose
      ) {

        setErrorMessage(
          text.purposeRequired
        );

        return;
      }


      if (
        cleanPhone
      ) {

        const normalizedPhone =
          cleanPhone.replace(
            /[\s()-]/g,
            ''
          );


        if (
          !/^\+?91?\d{10}$/.test(
            normalizedPhone
          )
        ) {

          setErrorMessage(
            text.phoneInvalid
          );

          return;
        }
      }


      setIsSubmitting(
        true
      );


      try {

        await scheduleVisit({

          farmerName:
            cleanFarmerName,

          phone:
            cleanPhone ||
            '+91 98765 00000',

          village:
            cleanVillage,

          crop,

          scheduledDate:
            new Date()
              .toISOString()
              .split('T')[0],

          priority:
            'High',

          status:
            'Scheduled',

          purpose:
            cleanPurpose,
        });


        setShowAddModal(
          false
        );


        setFarmerName('');

        setVillage('');

        setPhone('');

        setPurpose('');


        setSuccessMessage(
          text.scheduleSuccess
        );


        setTimeout(
          () => {
            setSuccessMessage(
              ''
            );
          },
          3500
        );

      } catch (
        error
      ) {

        console.error(
          'Failed to schedule field visit:',
          error
        );


        setErrorMessage(
          text.scheduleFailed
        );

      } finally {

        setIsSubmitting(
          false
        );

      }
    };


  /* ==========================================================
     PRIORITY LABEL
     ========================================================== */

  const getPriorityLabel =
    (
      priority
    ) => {

      if (
        priority ===
        'Urgent'
      ) {
        return text.urgent;
      }


      if (
        priority ===
        'High'
      ) {
        return text.high;
      }


      if (
        priority ===
        'Medium'
      ) {
        return text.medium;
      }


      if (
        priority ===
        'Low'
      ) {
        return text.low;
      }


      return priority ||
        text.medium;
    };


  /* ==========================================================
     CLOSE FORM
     ========================================================== */

  const handleCancel =
    () => {

      if (
        isSubmitting
      ) {
        return;
      }


      setShowAddModal(
        false
      );

      setErrorMessage('');

    };


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
              text.desk
            }
          </p>


          <h2
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <FiUsers className="w-6 h-6 text-sky-500" />

            {
              text.title
            }

          </h2>

        </div>


        <div className="flex flex-wrap items-center gap-2">

          <span
            className="mono text-sm px-3 py-2 rounded-md flex items-center gap-2"
            style={{
              background:
                'var(--bg-surface)',

              color:
                'var(--text-tertiary)',

              border:
                '1px solid var(--border-base)',
            }}
          >

            <LuCloudOff className="w-4 h-4" />

            {
              text.offlineQueue
            }:
            {' '}

            {
              offlineQueueCount
            }{' '}

            {
              text.pending
            }

          </span>


          <Btn
            variant="cyan"
            size="sm"
            onClick={() => {

              setShowAddModal(
                (prev) =>
                  !prev
              );

              setErrorMessage('');

            }}
          >

            <LuPlus className="w-4 h-4" />

            {
              text.scheduleVisit
            }

          </Btn>

        </div>

      </div>


      {/* ======================================================
          SUCCESS MESSAGE
      ======================================================= */}

      {successMessage && (

        <div
          className="p-4 rounded-md flex items-center gap-2"
          style={{
            background:
              'rgba(34,197,94,0.08)',

            border:
              '1px solid rgba(34,197,94,0.18)',

            color:
              '#15803d',
          }}
        >

          <LuCircleCheck className="w-5 h-5" />

          <span className="text-sm font-medium">
            {
              successMessage
            }
          </span>

        </div>

      )}


      {/* ======================================================
          ADD VISIT FORM
      ======================================================= */}

      {showAddModal && (

        <div
          className="card p-5 space-y-4 animate-fade-in"
          style={{
            borderLeft:
              '3px solid rgba(56,189,248,0.4)',
          }}
        >

          <div className="flex items-center justify-between gap-3">

            <h3
              className="text-lg font-semibold flex items-center gap-2"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >

              <LuCalendar className="w-5 h-5 text-sky-500" />

              {
                text.newVisit
              }

            </h3>


            <button
              type="button"
              onClick={
                handleCancel
              }
              disabled={
                isSubmitting
              }
              className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-black/5 cursor-pointer disabled:opacity-50"
              aria-label={
                text.close
              }
            >

              <LuX className="w-5 h-5" />

            </button>

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


          <form
            onSubmit={
              handleCreateVisit
            }
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >

            {/* Farmer */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.farmerName
                }
              </label>


              <input
                type="text"
                value={
                  farmerName
                }
                onChange={(e) =>
                  setFarmerName(
                    e.target.value
                  )
                }
                placeholder={
                  text.farmerPlaceholder
                }
                required
                disabled={
                  isSubmitting
                }
                className="field-input disabled:opacity-60"
              />

            </div>


            {/* Phone */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.phone
                }
              </label>


              <input
                type="tel"
                value={
                  phone
                }
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="+91 98765 12345"
                disabled={
                  isSubmitting
                }
                className="field-input disabled:opacity-60"
              />

            </div>


            {/* Village */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.village
                }
              </label>


              <input
                type="text"
                value={
                  village
                }
                onChange={(e) =>
                  setVillage(
                    e.target.value
                  )
                }
                placeholder={
                  text.villagePlaceholder
                }
                required
                disabled={
                  isSubmitting
                }
                className="field-input disabled:opacity-60"
              />

            </div>


            {/* Crop */}

            <div>

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.crop
                }
              </label>


              <select
                value={
                  crop
                }
                onChange={(e) =>
                  setCrop(
                    e.target.value
                  )
                }
                disabled={
                  isSubmitting
                }
                className="field-select disabled:opacity-60"
              >

                <option value="Rice (Paddy)">
                  Rice (Paddy)
                </option>

                <option value="Tomato">
                  Tomato
                </option>

                <option value="Cotton">
                  Cotton
                </option>

                <option value="Maize (Corn)">
                  {
                    text.maize
                  }
                </option>

              </select>

            </div>


            {/* Purpose */}

            <div className="sm:col-span-2">

              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color:
                    'var(--text-secondary)',
                }}
              >
                {
                  text.purpose
                }
              </label>


              <input
                type="text"
                value={
                  purpose
                }
                onChange={(e) =>
                  setPurpose(
                    e.target.value
                  )
                }
                placeholder={
                  text.purposePlaceholder
                }
                required
                disabled={
                  isSubmitting
                }
                className="field-input disabled:opacity-60"
              />

            </div>


            {/* Actions */}

            <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 pt-1">

              <Btn
                variant="ghost"
                size="sm"
                type="button"
                onClick={
                  handleCancel
                }
                disabled={
                  isSubmitting
                }
              >
                {
                  text.cancel
                }
              </Btn>


              <Btn
                variant="cyan"
                size="md"
                type="submit"
                disabled={
                  isSubmitting
                }
              >

                {isSubmitting ? (
                  <>
                    <LuClock3 className="w-4 h-4 animate-spin" />

                    {
                      text.scheduling
                    }
                  </>
                ) : (
                  <>
                    <LuCalendar className="w-4 h-4" />

                    {
                      text.confirm
                    }
                  </>
                )}

              </Btn>

            </div>

          </form>

        </div>
      )}


      {/* ======================================================
          SCHEDULED VISITS
      ======================================================= */}

      <div className="space-y-3">

        <div className="flex items-center justify-between gap-3">

          <h3
            className="text-base font-semibold"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {
              text.scheduled
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
              safeVisits.length
            }
          </span>

        </div>


        {safeVisits.length ===
        0 ? (

          <div
            className="card p-8 text-center"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >

            <LuCalendar className="w-8 h-8 mx-auto mb-3 opacity-30" />

            <p className="text-sm">
              {
                text.noVisits
              }
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {safeVisits.map(
              (visit) => {

                const priorityStyle =
                  getPriorityStyle(
                    visit.priority
                  );


                const statusStyle =
                  getStatusStyle(
                    visit.status
                  );


                return (
                  <div
                    key={
                      visit.id
                    }
                    className="card p-4 space-y-3"
                  >

                    {/* Header */}

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-center gap-2.5 min-w-0">

                        <div
                          className="p-2 rounded-md"
                          style={{
                            background:
                              'var(--bg-raised)',
                          }}
                        >

                          <LuUser className="w-5 h-5 text-sky-500" />

                        </div>


                        <div className="min-w-0">

                          <h4
                            className="text-base font-semibold truncate"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              visit.farmerName
                            }
                          </h4>


                          <p
                            className="text-sm flex items-center gap-1 mt-1"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                          >

                            <LuMapPin className="w-4 h-4 text-sky-500 shrink-0" />

                            {
                              visit.village ||
                              text.defaultVillage
                            }

                          </p>

                        </div>

                      </div>


                      {/* Priority */}

                      <span
                        className="mono text-sm px-2 py-1 rounded-md font-semibold uppercase whitespace-nowrap"
                        style={
                          priorityStyle
                        }
                      >
                        {
                          getPriorityLabel(
                            visit.priority
                          )
                        }{' '}
                        {
                          text.priority
                        }
                      </span>

                    </div>


                    {/* Visit metadata */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-raised)',
                        }}
                      >

                        <p
                          className="text-xs uppercase font-semibold"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            text.visitStatus
                          }
                        </p>


                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-medium mt-1 px-2 py-1 rounded-md"
                          style={
                            statusStyle
                          }
                        >

                          {visit.status ===
                          'Completed' ? (
                            <LuCircleCheck className="w-3.5 h-3.5" />
                          ) : visit.status ===
                              'In Progress' ? (
                            <LuClock3 className="w-3.5 h-3.5" />
                          ) : (
                            <LuCalendar className="w-3.5 h-3.5" />
                          )}

                          {
                            getStatusLabel(
                              visit.status
                            )
                          }

                        </span>

                      </div>


                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-raised)',
                        }}
                      >

                        <p
                          className="text-xs uppercase font-semibold"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            text.date
                          }
                        </p>


                        <p
                          className="text-sm font-medium mt-1"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            visit.scheduledDate ||
                            '—'
                          }
                        </p>

                      </div>

                    </div>


                    {/* Purpose */}

                    <p
                      className="text-sm leading-relaxed p-3 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',

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
                        {
                          text.purposeLabel
                        }
                      </strong>{' '}

                      {
                        visit.purpose ||
                        text.defaultPurpose
                      }

                    </p>


                    {/* Contact + Date */}

                    <div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm pt-2"
                      style={{
                        borderTop:
                          '1px solid var(--border-base)',

                        color:
                          'var(--text-tertiary)',
                      }}
                    >

                      <a
                        href={
                          visit.phone
                            ? `tel:${visit.phone}`
                            : undefined
                        }
                        className="flex items-center gap-1.5 hover:text-sky-600"
                      >

                        <LuPhone className="w-4 h-4 text-sky-500" />

                        {
                          visit.phone ||
                          '—'
                        }

                      </a>


                      <span
                        className="mono font-medium"
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {
                          visit.crop
                        }
                      </span>

                    </div>

                  </div>
                );

              }
            )}

          </div>

        )}

      </div>

    </div>
  );
};


export default VisitPlanner;