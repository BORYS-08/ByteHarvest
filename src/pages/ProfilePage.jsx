import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, ROLES } from '../context/AppContext';
import {
  LuUser,
  LuMail,
  LuShield,
  LuMapPin,
  LuClock,
  LuLogOut,
  LuExternalLink,
  LuCheck,
} from 'react-icons/lu';

const translations = {
  en: {
    openDashboard: 'Open My Dashboard',
    signOut: 'Sign Out',

    accountDetails: 'Account Details',
    activeMember: 'Active Member',

    yourRole: 'Your Role',
    region: 'Region & Farming Zone',

    regionName:
      'Nashik Farming Region, Maharashtra',

    network:
      'Krishi Vigyan Kendra Network',

    accountInformation:
      'Account Information',

    signInVerification:
      'Sign-in Verification',

    emailCode:
      'Email Verification Code',

    accountStatus:
      'Account Status',

    verifiedActive:
      'Verified & Active',

    lastSignedIn:
      'Last Signed In',

    today: 'Today',
  },

  hi: {
    openDashboard:
      'मेरा डैशबोर्ड खोलें',

    signOut:
      'साइन आउट',

    accountDetails:
      'खाता विवरण',

    activeMember:
      'सक्रिय सदस्य',

    yourRole:
      'आपकी भूमिका',

    region:
      'क्षेत्र और कृषि क्षेत्र',

    regionName:
      'नासिक कृषि क्षेत्र, महाराष्ट्र',

    network:
      'कृषि विज्ञान केंद्र नेटवर्क',

    accountInformation:
      'खाता जानकारी',

    signInVerification:
      'साइन-इन सत्यापन',

    emailCode:
      'ईमेल सत्यापन कोड',

    accountStatus:
      'खाता स्थिति',

    verifiedActive:
      'सत्यापित और सक्रिय',

    lastSignedIn:
      'अंतिम बार लॉगिन',

    today:
      'आज',
  },

  mr: {
    openDashboard:
      'माझे डॅशबोर्ड उघडा',

    signOut:
      'साइन आउट',

    accountDetails:
      'खाते तपशील',

    activeMember:
      'सक्रिय सदस्य',

    yourRole:
      'तुमची भूमिका',

    region:
      'प्रदेश आणि शेती क्षेत्र',

    regionName:
      'नाशिक कृषी क्षेत्र, महाराष्ट्र',

    network:
      'कृषी विज्ञान केंद्र नेटवर्क',

    accountInformation:
      'खाते माहिती',

    signInVerification:
      'साइन-इन सत्यापन',

    emailCode:
      'ईमेल सत्यापन कोड',

    accountStatus:
      'खाते स्थिती',

    verifiedActive:
      'सत्यापित आणि सक्रिय',

    lastSignedIn:
      'शेवटचे साइन-इन',

    today:
      'आज',
  },
};

export const ProfilePage = () => {
  const navigate = useNavigate();

  const {
    currentUser,
    logout,
    language,
  } = useApp();

  const text =
    translations[language] ||
    translations.en;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', {
        replace: true,
      });
    }
  }, [
    currentUser,
    navigate,
  ]);

  if (!currentUser) {
    return null;
  }

  const currentRoleConfig =
    ROLES[
      currentUser.role?.toUpperCase()
    ] || ROLES.FARMER;

  const roleNames = {
    en: {
      farmer: 'Farmer / Grower',
      extension: 'Field Extension Worker',
      expert: 'Agri-Expert Reviewer',
      official: 'Agri-Official Surveillance',
    },

    hi: {
      farmer: 'किसान / उत्पादक',
      extension: 'फील्ड एक्सटेंशन कर्मचारी',
      expert: 'कृषि विशेषज्ञ',
      official: 'कृषि अधिकारी निगरानी',
    },

    mr: {
      farmer: 'शेतकरी / उत्पादक',
      extension: 'फील्ड विस्तार कर्मचारी',
      expert: 'कृषी तज्ज्ञ',
      official: 'कृषी अधिकारी निगराणी',
    },
  };

  const roleTaglines = {
    en: {
      farmer:
        'AI Scan Diagnostics, Weather Spore Risk & Crop Remedies',

      extension:
        'Field Visit Scheduler, Sync Queue & Lab Referrals',

      expert:
        'AI Diagnostics Verification Queue & Prescription Builder',

      official:
        'Geospatial Outbreak Heatmaps & Regional Intervention Planner',
    },

    hi: {
      farmer:
        'AI स्कैन निदान, मौसम जोखिम और फसल उपचार',

      extension:
        'फील्ड विजिट शेड्यूलर, सिंक क्यू और लैब रेफरल',

      expert:
        'AI निदान सत्यापन और उपचार सलाह',

      official:
        'भौगोलिक प्रकोप मानचित्र और क्षेत्रीय हस्तक्षेप योजना',
    },

    mr: {
      farmer:
        'AI स्कॅन निदान, हवामान धोका आणि पीक उपचार',

      extension:
        'फील्ड भेट नियोजन, सिंक क्यू आणि लॅब रेफरल',

      expert:
        'AI निदान सत्यापन आणि उपचार सल्ला',

      official:
        'भौगोलिक प्रादुर्भाव नकाशे आणि प्रादेशिक हस्तक्षेप योजना',
    },
  };

  const roleId =
    currentUser.role?.toLowerCase() ||
    'farmer';

  const localizedRole =
    roleNames[language]?.[roleId] ||
    roleNames.en[roleId] ||
    currentRoleConfig.name;

  const localizedTagline =
    roleTaglines[language]?.[roleId] ||
    roleTaglines.en[roleId] ||
    currentRoleConfig.tagline;

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleLaunchWorkspace = () => {
    navigate(
      currentRoleConfig.defaultRoute ||
        '/farmer'
    );
  };

  const formattedLoginTime =
    currentUser.loginTime
      ? new Date(
          currentUser.loginTime
        ).toLocaleDateString(
          'en-IN',
          {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        )
      : text.today;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-8">

      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 shrink-0">
            <LuUser className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">

            <h1 className="text-2xl font-bold text-(--text-primary)">
              {currentUser.name}
            </h1>

            <p className="text-sm text-(--text-secondary) flex items-center gap-2">
              <LuMail className="w-4 h-4 text-(--text-tertiary)" />

              <span>
                {currentUser.email}
              </span>
            </p>

          </div>

        </div>


        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2.5">

          <button
            type="button"
            onClick={
              handleLaunchWorkspace
            }
            className="btn-primary-action px-4 py-3 text-base flex items-center gap-2 cursor-pointer"
          >
            <span>
              {text.openDashboard}
            </span>

            <LuExternalLink className="w-5 h-5" />
          </button>


          <button
            type="button"
            onClick={
              handleSignOut
            }
            className="px-4 py-3 rounded-md text-base font-medium border border-(--border-mid) bg-(--bg-canvas) text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
          >

            <LuLogOut className="w-5 h-5" />

            <span>
              {text.signOut}
            </span>

          </button>

        </div>

      </div>


      {/* =====================================================
          ACCOUNT DETAILS
      ====================================================== */}

      <div className="card p-6 space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <h2 className="text-lg font-semibold text-(--text-primary) flex items-center gap-2">

            <LuShield className="w-5 h-5 text-green-600" />

            <span>
              {text.accountDetails}
            </span>

          </h2>


          <span className="text-sm px-3 py-1.5 rounded-md bg-green-50 text-green-700 border border-green-200 font-semibold uppercase tracking-wide">
            {text.activeMember}
          </span>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Role */}
          <div className="p-4 rounded-md bg-(--bg-canvas) border border-(--border-base) space-y-1.5">

            <p className="text-sm uppercase font-semibold text-(--text-tertiary)">
              {text.yourRole}
            </p>

            <p className="text-base font-semibold text-(--text-primary)">
              {localizedRole}
            </p>

            <p className="text-sm text-(--text-secondary)">
              {localizedTagline}
            </p>

          </div>


          {/* Region */}
          <div className="p-4 rounded-md bg-(--bg-canvas) border border-(--border-base) space-y-1.5">

            <p className="text-sm uppercase font-semibold text-(--text-tertiary)">
              {text.region}
            </p>

            <p className="text-base font-semibold text-(--text-primary) flex items-center gap-2">

              <LuMapPin className="w-4 h-4 text-(--text-tertiary)" />

              <span>
                {text.regionName}
              </span>

            </p>

            <p className="text-sm text-(--text-secondary)">
              {text.network}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          ACCOUNT INFORMATION
      ====================================================== */}

      <div className="card p-6 space-y-5">

        <h2 className="text-lg font-semibold text-(--text-primary) flex items-center gap-2">

          <LuClock className="w-5 h-5 text-sky-600" />

          <span>
            {text.accountInformation}
          </span>

        </h2>


        <div className="space-y-3 text-sm text-(--text-secondary)">

          {/* Verification */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-(--border-base)">

            <span>
              {text.signInVerification}
            </span>

            <span className="text-(--text-primary) font-medium">
              {text.emailCode}
            </span>

          </div>


          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-(--border-base)">

            <span>
              {text.accountStatus}
            </span>

            <span className="text-green-700 font-medium flex items-center gap-2">

              <LuCheck className="w-4 h-4" />

              <span>
                {text.verifiedActive}
              </span>

            </span>

          </div>


          {/* Last Sign In */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">

            <span>
              {text.lastSignedIn}
            </span>

            <span className="text-(--text-primary) text-sm">
              {formattedLoginTime}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;