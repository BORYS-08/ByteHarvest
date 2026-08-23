import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AppContext = createContext();


/* ============================================================
   ROLES
   ============================================================ */

export const ROLES = {
  FARMER: {
    id: 'farmer',
    name: 'Farmer / Grower',
    tagline:
      'AI Scan Diagnostics, Weather Spore Risk & Crop Remedies',
    badgeColor:
      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    accentColor: '#10B981',
    defaultRoute: '/farmer',

    allowedRoutes: [
      '/',
      '/farmer',
      '/farms',
      '/crops',
      '/scanner',
      '/calculator',
      '/history',
      '/consultation',
      '/knowledge',
      '/profile',
    ],
  },

  EXTENSION: {
    id: 'extension',
    name: 'Field Extension Worker',
    tagline:
      'Field Visit Scheduler, Sync Queue & Lab Referrals',
    badgeColor:
      'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    accentColor: '#00F0FF',
    defaultRoute: '/extension',

    allowedRoutes: [
      '/',
      '/extension',
      '/history',
      '/consultation',
      '/knowledge',
      '/heatmap',
      '/profile',
    ],
  },

  EXPERT: {
    id: 'expert',
    name: 'Agri-Expert Reviewer',
    tagline:
      'AI Diagnostics Verification Queue & Prescription Builder',
    badgeColor:
      'bg-amber-500/20 text-amber-400 border-amber-500/30',
    accentColor: '#F59E0B',
    defaultRoute: '/expert',

    allowedRoutes: [
      '/',
      '/expert',
      '/history',
      '/consultation',
      '/knowledge',
      '/heatmap',
      '/profile',
    ],
  },

  OFFICIAL: {
    id: 'official',
    name: 'Agri-Official Surveillance',
    tagline:
      'Geospatial Outbreak Heatmaps & Regional Intervention Planner',
    badgeColor:
      'bg-rose-500/20 text-rose-400 border-rose-500/30',
    accentColor: '#EF4444',
    defaultRoute: '/official',

    allowedRoutes: [
      '/',
      '/official',
      '/heatmap',
      '/history',
      '/knowledge',
      '/profile',
    ],
  },

  ADMIN: {
    id: 'admin',
    name: 'Platform Administrator',
    tagline:
      'User Management, System Monitoring & Platform Administration',
    badgeColor:
      'bg-red-500/20 text-red-400 border-red-500/30',
    accentColor: '#EF4444',
    defaultRoute: '/admin',

    allowedRoutes: [
      '/',
      '/admin',
      '/history',
      '/knowledge',
      '/heatmap',
      '/profile',
    ],
  },
};


/* ============================================================
   LANGUAGE CONFIGURATION
   ============================================================ */

export const LANGUAGES = {
  en: {
    id: 'en',
    label: 'English',
    shortLabel: 'EN',
    speechLocale: 'en-IN',
  },

  hi: {
    id: 'hi',
    label: 'हिन्दी',
    shortLabel: 'हिं',
    speechLocale: 'hi-IN',
  },

  mr: {
    id: 'mr',
    label: 'मराठी',
    shortLabel: 'मरा',
    speechLocale: 'mr-IN',
  },
};


/* ============================================================
   BASIC UI TRANSLATIONS
   ============================================================ */

export const translations = {
  en: {
    common: {
      home: 'Home',
      login: 'Login',
      logout: 'Sign Out',
      profile: 'Profile',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      edit: 'Edit',
      delete: 'Delete',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      search: 'Search',
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success',
    },

    farmer: {
      dashboard: 'Farm Health & Disease Hub',
      manageFarms: 'Manage My Farms',
      manageCrops: 'Manage My Crops',
      scanner: 'Launch AI Scanner',
      cropCheck: 'Check My Crop',
      diseaseCheck: 'Check Disease',
      pestCheck: 'Check Pest',
      recentDiagnoses: 'Recent Crop Diagnoses',
      weatherRisk: 'Weather Risk',
      treatment: 'Treatment Advice',
      history: 'History',
    },

    scanner: {
      title: 'Crop Health Scanner',
      uploadCrop: 'Upload Crop Photo',
      uploadPest: 'Upload Pest Photo',
      diseaseResult: 'Detected Disease',
      pestResult: 'Detected Pest',
      confidence: 'Confidence',
      severity: 'Severity',
      riskLevel: 'Risk Level',
      pestCount: 'Estimated Pest Count',
      symptoms: 'Observed Symptom Pattern',
      pestSigns: 'Observed Pest Signs',
      checkingCrop: 'Checking your crop...',
      checkingPest: 'Checking for pests...',
    },

    auth: {
      signIn: 'Sign In',
      register: 'Create Account',
      forgotPassword: 'Forgot Password?',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    },

    roles: {
      farmer: 'Farmer',
      extension: 'Extension Worker',
      expert: 'Agri-Expert',
      official: 'Agri-Official',
      admin: 'Administrator',
    },

    access: {
      deniedTitle: 'Access Restricted',
      deniedMessage:
        'You do not have permission to access this workspace.',
      returnToWorkspace:
        'Return to My Workspace',
    },
  },

  hi: {
    common: {
      home: 'होम',
      login: 'लॉगिन',
      logout: 'साइन आउट',
      profile: 'प्रोफ़ाइल',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      edit: 'संपादित करें',
      delete: 'हटाएँ',
      back: 'वापस',
      next: 'आगे',
      submit: 'जमा करें',
      search: 'खोजें',
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हो गया',
      success: 'सफलता',
    },

    farmer: {
      dashboard: 'फसल स्वास्थ्य केंद्र',
      manageFarms: 'मेरे खेत प्रबंधित करें',
      manageCrops: 'मेरी फसलें प्रबंधित करें',
      scanner: 'फसल स्कैन करें',
      cropCheck: 'मेरी फसल जाँचें',
      diseaseCheck: 'रोग जाँचें',
      pestCheck: 'कीट जाँचें',
      recentDiagnoses: 'हाल की फसल जाँच',
      weatherRisk: 'मौसम जोखिम',
      treatment: 'उपचार सलाह',
      history: 'इतिहास',
    },

    scanner: {
      title: 'फसल स्वास्थ्य स्कैनर',
      uploadCrop: 'फसल की फोटो अपलोड करें',
      uploadPest: 'कीट की फोटो अपलोड करें',
      diseaseResult: 'पहचाना गया रोग',
      pestResult: 'पहचाना गया कीट',
      confidence: 'विश्वसनीयता',
      severity: 'गंभीरता',
      riskLevel: 'जोखिम स्तर',
      pestCount: 'अनुमानित कीट संख्या',
      symptoms: 'देखे गए लक्षण',
      pestSigns: 'देखे गए कीट के लक्षण',
      checkingCrop: 'आपकी फसल की जाँच हो रही है...',
      checkingPest: 'कीट की जाँच हो रही है...',
    },

    auth: {
      signIn: 'साइन इन करें',
      register: 'खाता बनाएँ',
      forgotPassword: 'पासवर्ड भूल गए?',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
    },

    roles: {
      farmer: 'किसान',
      extension: 'विस्तार कार्यकर्ता',
      expert: 'कृषि विशेषज्ञ',
      official: 'कृषि अधिकारी',
      admin: 'प्रशासक',
    },

    access: {
      deniedTitle: 'प्रवेश प्रतिबंधित',
      deniedMessage:
        'आपको इस कार्यक्षेत्र तक पहुँचने की अनुमति नहीं है।',
      returnToWorkspace:
        'मेरे कार्यक्षेत्र पर लौटें',
    },
  },

  mr: {
    common: {
      home: 'मुख्यपृष्ठ',
      login: 'लॉगिन',
      logout: 'साइन आउट',
      profile: 'प्रोफाइल',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      close: 'बंद करा',
      edit: 'संपादित करा',
      delete: 'हटवा',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      search: 'शोधा',
      loading: 'लोड होत आहे...',
      error: 'काहीतरी चूक झाली',
      success: 'यशस्वी',
    },

    farmer: {
      dashboard: 'पीक आरोग्य केंद्र',
      manageFarms: 'माझी शेती व्यवस्थापित करा',
      manageCrops: 'माझी पिके व्यवस्थापित करा',
      scanner: 'पीक स्कॅन करा',
      cropCheck: 'माझे पीक तपासा',
      diseaseCheck: 'रोग तपासा',
      pestCheck: 'कीड तपासा',
      recentDiagnoses: 'अलीकडील पीक तपासण्या',
      weatherRisk: 'हवामानाचा धोका',
      treatment: 'उपचार सल्ला',
      history: 'इतिहास',
    },

    scanner: {
      title: 'पीक आरोग्य स्कॅनर',
      uploadCrop: 'पिकाचा फोटो अपलोड करा',
      uploadPest: 'किडीचा फोटो अपलोड करा',
      diseaseResult: 'ओळखलेला रोग',
      pestResult: 'ओळखलेली कीड',
      confidence: 'विश्वास पातळी',
      severity: 'तीव्रता',
      riskLevel: 'धोका पातळी',
      pestCount: 'अंदाजे किडींची संख्या',
      symptoms: 'दिसणारी लक्षणे',
      pestSigns: 'दिसणारी किडीची लक्षणे',
      checkingCrop: 'तुमच्या पिकाची तपासणी सुरू आहे...',
      checkingPest: 'किडीची तपासणी सुरू आहे...',
    },

    auth: {
      signIn: 'साइन इन करा',
      register: 'खाते तयार करा',
      forgotPassword: 'पासवर्ड विसरलात?',
      email: 'ईमेल पत्ता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्डची पुष्टी करा',
    },

    roles: {
      farmer: 'शेतकरी',
      extension: 'विस्तार कर्मचारी',
      expert: 'कृषी तज्ज्ञ',
      official: 'कृषी अधिकारी',
      admin: 'प्रशासक',
    },

    access: {
      deniedTitle: 'प्रवेश प्रतिबंधित',
      deniedMessage:
        'तुम्हाला या कार्यक्षेत्रात प्रवेश करण्याची परवानगी नाही.',
      returnToWorkspace:
        'माझ्या कार्यक्षेत्रावर परत जा',
    },
  },
};


/* ============================================================
   APP PROVIDER
   ============================================================ */

export const AppProvider = ({ children }) => {

  /* ==========================================================
     AUTHENTICATION
     ========================================================== */

  const [currentUser, setCurrentUser] =
    useState(() => {
      const saved =
        localStorage.getItem(
          'agrivision_auth_user'
        );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          return null;
        }
      }

      return null;
    });


  /* ==========================================================
     ACTIVE ROLE
     ========================================================== */

  const [activeRole, setActiveRole] =
    useState(() => {
      const savedRole =
        localStorage.getItem(
          'agrivision_role'
        );

      return ROLES[
        String(savedRole || 'farmer')
          .toUpperCase()
      ]
        ? savedRole
        : 'farmer';
    });


  /* ==========================================================
     LANGUAGE
     ========================================================== */

  const [language, setLanguageState] =
    useState(() => {
      return (
        localStorage.getItem(
          'agrivision_language'
        ) || 'en'
      );
    });


  /* ==========================================================
     NOTIFICATIONS
     ========================================================== */

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        text:
          'Emergency Alert: Late Blight outbreak reported in Nashik District',
        type: 'critical',
        time: '10m ago',
      },
      {
        id: 2,
        text:
          'New AI Scan awaiting expert validation',
        type: 'info',
        time: '25m ago',
      },
    ]);


  /* ==========================================================
     VOICE ADVISORY
     ========================================================== */

  const [audioAdvisory, setAudioAdvisory] =
    useState({
      isPlaying: false,
      text: '',
      language: 'en-IN',
    });


  /* ==========================================================
     DERIVED ROLE CONFIG
     ========================================================== */

  const roleConfig =
    ROLES[
      String(activeRole)
        .toUpperCase()
    ] || ROLES.FARMER;


  /* ==========================================================
     ROLE ACCESS HELPERS
     ========================================================== */

  const hasRole = (roleId) => {
    return (
      String(activeRole)
        .toLowerCase() ===
      String(roleId)
        .toLowerCase()
    );
  };


  const hasAnyRole = (
    roleIds = []
  ) => {
    return roleIds.some(
      (roleId) =>
        String(activeRole)
          .toLowerCase() ===
        String(roleId)
          .toLowerCase()
    );
  };


  const canAccessRoute = (
    routePath
  ) => {
    const allowedRoutes =
      roleConfig.allowedRoutes ||
      [];

    return allowedRoutes.some(
      (route) => {
        if (route === routePath) {
          return true;
        }

        return (
          routePath.startsWith(
            `${route}/`
          ) &&
          route !== '/'
        );
      }
    );
  };


  const isAdmin =
    activeRole ===
    ROLES.ADMIN.id;


  /* ==========================================================
     PERSIST ROLE
     ========================================================== */

  useEffect(() => {
    localStorage.setItem(
      'agrivision_role',
      activeRole
    );
  }, [activeRole]);


  /* ==========================================================
     PERSIST LANGUAGE
     ========================================================== */

  useEffect(() => {
    localStorage.setItem(
      'agrivision_language',
      language
    );
  }, [language]);


  /* ==========================================================
     PERSIST AUTHENTICATION
     ========================================================== */

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        'agrivision_auth_user',
        JSON.stringify(
          currentUser
        )
      );

      if (currentUser.role) {
        const incomingRole =
          String(
            currentUser.role
          ).toLowerCase();

        if (
          ROLES[
            incomingRole.toUpperCase()
          ]
        ) {
          setActiveRole(
            incomingRole
          );
        }
      }
    } else {
      localStorage.removeItem(
        'agrivision_auth_user'
      );
    }
  }, [currentUser]);


  /* ============================================================
     AUTH ACTIONS
     ============================================================ */

  const login = (userData) => {
    const requestedRole =
      String(
        userData?.role ||
          'farmer'
      ).toLowerCase();

    const safeRole =
      ROLES[
        requestedRole.toUpperCase()
      ]
        ? requestedRole
        : 'farmer';

    const normalizedUser = {
      ...userData,
      role: safeRole,
      loginTime:
        userData?.loginTime ||
        new Date().toISOString(),
    };

    setCurrentUser(
      normalizedUser
    );

    setActiveRole(
      safeRole
    );
  };


  const logout = () => {
    setCurrentUser(null);
    setActiveRole('farmer');
  };


  /* ============================================================
     ROLE ACTIONS
     ============================================================ */

  const switchRole = (roleId) => {
    const normalizedRole =
      String(
        roleId || 'farmer'
      ).toLowerCase();

    if (
      !ROLES[
        normalizedRole.toUpperCase()
      ]
    ) {
      return;
    }

    setActiveRole(
      normalizedRole
    );

    if (currentUser) {
      setCurrentUser(
        (prev) => ({
          ...prev,
          role: normalizedRole,
        })
      );
    }
  };


  /* ============================================================
     LANGUAGE ACTIONS
     ============================================================ */

  const setLanguage = (
    languageId
  ) => {
    if (!LANGUAGES[languageId]) {
      return;
    }

    setLanguageState(
      languageId
    );
  };


  const toggleLanguage = () => {
    const languageIds =
      Object.keys(
        LANGUAGES
      );

    const currentIndex =
      languageIds.indexOf(
        language
      );

    const nextIndex =
      (currentIndex + 1) %
      languageIds.length;

    setLanguage(
      languageIds[nextIndex]
    );
  };


  /* ============================================================
     TRANSLATION HELPER
     ============================================================ */

  const t = (path) => {
    const parts =
      path.split('.');

    let value =
      translations[
        language
      ];

    for (
      const part of parts
    ) {
      value =
        value?.[part];
    }

    if (
      value !== undefined
    ) {
      return value;
    }

    value =
      translations.en;

    for (
      const part of parts
    ) {
      value =
        value?.[part];
    }

    return (
      value || path
    );
  };


  /* ============================================================
     NOTIFICATIONS
     ============================================================ */

  const addNotification = (
    text,
    type = 'info'
  ) => {
    const newNotif = {
      id: Date.now(),
      text,
      type,
      time: 'Just now',
    };

    setNotifications(
      (prev) => [
        newNotif,
        ...prev,
      ]
    );
  };


  const dismissNotification = (
    id
  ) => {
    setNotifications(
      (prev) =>
        prev.filter(
          (n) =>
            n.id !== id
        )
    );
  };


  /* ============================================================
     VOICE ADVISORY
     ============================================================ */

  const playVoiceAdvisory = (
    text,
    languageOverride = null
  ) => {
    const selectedLanguage =
      languageOverride ||
      LANGUAGES[language]
        ?.speechLocale ||
      'en-IN';

    setAudioAdvisory({
      isPlaying: true,
      text,
      language:
        selectedLanguage,
    });

    if (
      'speechSynthesis' in
      window
    ) {
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          text
        );

      utterance.rate = 0.9;
      utterance.lang =
        selectedLanguage;

      utterance.onend = () => {
        setAudioAdvisory(
          (prev) => ({
            ...prev,
            isPlaying:
              false,
          })
        );
      };

      utterance.onerror =
        () => {
          setAudioAdvisory(
            (prev) => ({
              ...prev,
              isPlaying:
                false,
            })
          );
        };

      window.speechSynthesis.speak(
        utterance
      );
    } else {
      setTimeout(() => {
        setAudioAdvisory(
          (prev) => ({
            ...prev,
            isPlaying:
              false,
          })
        );
      }, 4000);
    }
  };


  const stopVoiceAdvisory =
    () => {
      if (
        'speechSynthesis' in
        window
      ) {
        window.speechSynthesis.cancel();
      }

      setAudioAdvisory(
        (prev) => ({
          ...prev,
          isPlaying:
            false,
        })
      );
    };


  /* ============================================================
     CONTEXT
     ============================================================ */

  return (
    <AppContext.Provider
      value={{
        /* Authentication */
        currentUser,
        isAuthenticated:
          Boolean(currentUser),
        login,
        logout,

        /* Roles */
        activeRole,
        roleConfig,
        switchRole,
        isAdmin,
        hasRole,
        hasAnyRole,
        canAccessRoute,

        /* Language */
        language,
        languageConfig:
          LANGUAGES[
            language
          ] || LANGUAGES.en,
        languages:
          LANGUAGES,
        setLanguage,
        toggleLanguage,
        t,

        /* Notifications */
        notifications,
        addNotification,
        dismissNotification,

        /* Voice */
        audioAdvisory,
        playVoiceAdvisory,
        stopVoiceAdvisory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () =>
  useContext(AppContext);