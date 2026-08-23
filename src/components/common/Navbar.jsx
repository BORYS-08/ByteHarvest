import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

import {
  LuBell,
  LuVolume2,
  LuVolumeX,
  LuMenu,
  LuX,
  LuShieldAlert,
  LuSprout,
  LuLogIn,
  LuUser,
  LuScanLine,
  LuMapPin,
  LuCalculator,
  LuLandmark,
  LuLanguages,
  LuCheck,
  LuChevronDown,
  LuLayoutDashboard,
  LuFileText,
  LuBookOpen,
  LuBriefcaseBusiness,
  LuShield,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const navbarTranslations = {
  en: {
    home: 'Home',

    dashboard: 'Farmer Dashboard',
    scanner: 'AI Scanner',
    heatmap: 'Outbreak Radar',

    extension: 'Extension Workspace',
    expert: 'Expert Workspace',
    official: 'Official Workspace',
    admin: 'Admin Dashboard',

    more: 'More',
    farms: 'My Farms',
    crops: 'My Crops',
    calculator: 'Dosage Calculator',
    history: 'History & Reports',
    knowledge: 'Knowledge Center',
    consultation: 'Consultation',

    language: 'Language',
    chooseLanguage: 'Choose your language',

    playing: 'Playing',
    audioActive: 'Audio Advisory Active',

    bulletins: 'Outbreak Bulletins',
    active: 'active',

    profile: 'Profile',
    login: 'Login',

    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hi: {
    home: 'होम',

    dashboard: 'किसान डैशबोर्ड',
    scanner: 'AI स्कैनर',
    heatmap: 'प्रकोप रडार',

    extension: 'एक्सटेंशन वर्कस्पेस',
    expert: 'विशेषज्ञ वर्कस्पेस',
    official: 'अधिकारी वर्कस्पेस',
    admin: 'एडमिन डैशबोर्ड',

    more: 'और',
    farms: 'मेरे खेत',
    crops: 'मेरी फसलें',
    calculator: 'दवा मात्रा कैलकुलेटर',
    history: 'इतिहास और रिपोर्ट',
    knowledge: 'ज्ञान केंद्र',
    consultation: 'परामर्श',

    language: 'भाषा',
    chooseLanguage: 'अपनी भाषा चुनें',

    playing: 'चल रहा है',
    audioActive: 'ऑडियो सलाह सक्रिय',

    bulletins: 'प्रकोप सूचनाएँ',
    active: 'सक्रिय',

    profile: 'प्रोफ़ाइल',
    login: 'लॉगिन',

    openMenu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
  },

  mr: {
    home: 'मुख्यपृष्ठ',

    dashboard: 'शेतकरी डॅशबोर्ड',
    scanner: 'AI स्कॅनर',
    heatmap: 'प्रादुर्भाव रडार',

    extension: 'एक्स्टेंशन वर्कस्पेस',
    expert: 'तज्ज्ञ वर्कस्पेस',
    official: 'अधिकारी वर्कस्पेस',
    admin: 'अॅडमिन डॅशबोर्ड',

    more: 'अधिक',
    farms: 'माझी शेते',
    crops: 'माझी पिके',
    calculator: 'औषध मात्रा कॅल्क्युलेटर',
    history: 'इतिहास आणि अहवाल',
    knowledge: 'ज्ञान केंद्र',
    consultation: 'सल्ला',

    language: 'भाषा',
    chooseLanguage: 'तुमची भाषा निवडा',

    playing: 'सुरू आहे',
    audioActive: 'ऑडिओ सल्ला सक्रिय',

    bulletins: 'प्रादुर्भाव सूचना',
    active: 'सक्रिय',

    profile: 'प्रोफाइल',
    login: 'लॉगिन',

    openMenu: 'मेनू उघडा',
    closeMenu: 'मेनू बंद करा',
  },
};


/* ============================================================
   NAVBAR
   ============================================================ */

export const Navbar = () => {
  const {
    notifications,
    audioAdvisory,
    stopVoiceAdvisory,
    currentUser,
    activeRole,
    language,
    languageConfig,
    languages,
    setLanguage,
  } = useApp();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showLanguageMenu, setShowLanguageMenu] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  const text =
    navbarTranslations[language] ||
    navbarTranslations.en;


  /* ==========================================================
     ROLE NORMALIZATION
     ========================================================== */

  const role =
    String(activeRole || 'farmer')
      .toLowerCase();


  /* ==========================================================
     MENU HELPERS
     ========================================================== */

  const hasRole = (...roles) =>
    roles.includes(role);


  /* ==========================================================
     PRIMARY NAVIGATION
     ========================================================== */

  const primaryNav = [
    {
      to: '/',
      label: text.home,
      icon: LuLayoutDashboard,
    },

    /* --------------------------------------------
       FARMER
    --------------------------------------------- */

    ...(hasRole('farmer')
      ? [
          {
            to: '/farmer',
            label: text.dashboard,
            icon: LuSprout,
          },

          {
            to: '/scanner',
            label: text.scanner,
            icon: LuScanLine,
          },
        ]
      : []),


    /* --------------------------------------------
       EXTENSION
    --------------------------------------------- */

    ...(hasRole('extension')
      ? [
          {
            to: '/extension',
            label: text.extension,
            icon: LuBriefcaseBusiness,
          },

          {
            to: '/heatmap',
            label: text.heatmap,
            icon: LuMapPin,
          },
        ]
      : []),


    /* --------------------------------------------
       EXPERT
    --------------------------------------------- */

    ...(hasRole('expert')
      ? [
          {
            to: '/expert',
            label: text.expert,
            icon: LuBriefcaseBusiness,
          },

          {
            to: '/heatmap',
            label: text.heatmap,
            icon: LuMapPin,
          },
        ]
      : []),


    /* --------------------------------------------
       OFFICIAL
    --------------------------------------------- */

    ...(hasRole('official')
      ? [
          {
            to: '/official',
            label: text.official,
            icon: LuShieldAlert,
          },

          {
            to: '/heatmap',
            label: text.heatmap,
            icon: LuMapPin,
          },
        ]
      : []),


    /* --------------------------------------------
       ADMIN
    --------------------------------------------- */

    ...(hasRole('admin')
      ? [
          {
            to: '/admin',
            label: text.admin,
            icon: LuShield,
          },

          {
            to: '/heatmap',
            label: text.heatmap,
            icon: LuMapPin,
          },
        ]
      : []),
  ];


  /* ==========================================================
     MORE MENU
     ========================================================== */

  const moreItems = [

    /* --------------------------------------------
       FARMER
    --------------------------------------------- */

    ...(hasRole('farmer')
      ? [
          {
            to: '/farms',
            label: text.farms,
            icon: LuLandmark,
          },

          {
            to: '/crops',
            label: text.crops,
            icon: LuSprout,
          },

          {
            to: '/calculator',
            label: text.calculator,
            icon: LuCalculator,
          },

          {
            to: '/history',
            label: text.history,
            icon: LuFileText,
          },

          {
            to: '/consultation',
            label: text.consultation,
            icon: LuBriefcaseBusiness,
          },

          {
            to: '/knowledge',
            label: text.knowledge,
            icon: LuBookOpen,
          },
        ]
      : []),


    /* --------------------------------------------
       EXTENSION
    --------------------------------------------- */

    ...(hasRole('extension')
      ? [
          {
            to: '/history',
            label: text.history,
            icon: LuFileText,
          },

          {
            to: '/consultation',
            label: text.consultation,
            icon: LuBriefcaseBusiness,
          },

          {
            to: '/knowledge',
            label: text.knowledge,
            icon: LuBookOpen,
          },
        ]
      : []),


    /* --------------------------------------------
       EXPERT
    --------------------------------------------- */

    ...(hasRole('expert')
      ? [
          {
            to: '/history',
            label: text.history,
            icon: LuFileText,
          },

          {
            to: '/consultation',
            label: text.consultation,
            icon: LuBriefcaseBusiness,
          },

          {
            to: '/knowledge',
            label: text.knowledge,
            icon: LuBookOpen,
          },
        ]
      : []),


    /* --------------------------------------------
       OFFICIAL
    --------------------------------------------- */

    ...(hasRole('official')
      ? [
          {
            to: '/history',
            label: text.history,
            icon: LuFileText,
          },

          {
            to: '/knowledge',
            label: text.knowledge,
            icon: LuBookOpen,
          },
        ]
      : []),


    /* --------------------------------------------
       ADMIN
    --------------------------------------------- */

    ...(hasRole('admin')
      ? [
          {
            to: '/history',
            label: text.history,
            icon: LuFileText,
          },

          {
            to: '/knowledge',
            label: text.knowledge,
            icon: LuBookOpen,
          },
        ]
      : []),
  ];


  /* ==========================================================
     HANDLERS
     ========================================================== */

  const handleLanguageChange = (
    languageId
  ) => {
    setLanguage(languageId);
    setShowLanguageMenu(false);
  };


  const closeMenus = () => {
    setShowMoreMenu(false);
    setShowNotifications(false);
    setShowLanguageMenu(false);
  };


  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowMoreMenu(false);
  };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background:
          'rgba(255,255,255,0.94)',
        borderColor:
          'var(--border-base)',
      }}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between gap-4">


          {/* ==================================================
              BRAND
          =================================================== */}

          <button
            type="button"
            onClick={() => {
              closeMenus();
              navigate('/');
            }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >

            <div className="brand-icon-box w-9 h-9 flex items-center justify-center">
              <LuSprout className="w-5 h-5 text-green-600" />
            </div>


            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-(--text-primary)">
                Byte
                <span className="text-green-600">
                  Harvest
                </span>
              </span>
            </div>


            <div className="hidden xl:block h-5 w-px bg-(--border-mid)" />


            <span className="hidden xl:block text-xs font-medium text-(--text-tertiary) whitespace-nowrap">
              SIH 2026 · Ministry of Agriculture
            </span>

          </button>


          {/* ==================================================
              DESKTOP NAV
          =================================================== */}

          <nav className="hidden lg:flex items-center gap-1">

            {primaryNav.map(
              (item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-black/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}


            {/* More */}

            {moreItems.length >
              0 && (
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setShowMoreMenu(
                      (prev) =>
                        !prev
                    )
                  }
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 whitespace-nowrap text-(--text-secondary) hover:text-(--text-primary) hover:bg-black/5"
                >

                  {text.more}

                  <LuChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showMoreMenu
                        ? 'rotate-180'
                        : ''
                    }`}
                  />

                </button>


                {showMoreMenu && (
                  <div className="absolute left-0 top-full mt-2 w-64 surface-overlay p-2 z-50">

                    {moreItems.map(
                      (item) => (
                        <NavLink
                          key={
                            item.to
                          }
                          to={
                            item.to
                          }
                          onClick={() =>
                            setShowMoreMenu(
                              false
                            )
                          }
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-green-50 text-green-700'
                                : 'text-(--text-secondary) hover:bg-black/5 hover:text-(--text-primary)'
                            }`
                          }
                        >

                          <item.icon className="w-4 h-4" />

                          {
                            item.label
                          }

                        </NavLink>
                      )
                    )}

                  </div>
                )}

              </div>
            )}

          </nav>


          {/* ==================================================
              RIGHT SIDE
          =================================================== */}

          <div className="flex items-center gap-2 shrink-0">


            {/* ==================================================
                LANGUAGE
            =================================================== */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowLanguageMenu(
                    (prev) =>
                      !prev
                  )
                }
                className="h-10 px-3 rounded-md border flex items-center gap-2 text-sm font-medium"
                style={{
                  background:
                    'var(--bg-surface)',
                  borderColor:
                    'var(--border-base)',
                  color:
                    'var(--text-secondary)',
                }}
              >

                <LuLanguages className="w-4 h-4 text-green-600" />

                <span>
                  {
                    languageConfig?.shortLabel ||
                    language
                  }
                </span>

              </button>


              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 surface-overlay p-2 z-50">

                  <div className="px-2 py-2">

                    <p className="text-sm font-semibold text-(--text-primary)">
                      {
                        text.language
                      }
                    </p>

                    <p className="text-xs mt-1 text-(--text-tertiary)">
                      {
                        text.chooseLanguage
                      }
                    </p>

                  </div>


                  <div className="space-y-1">

                    {Object.values(
                      languages
                    ).map(
                      (lang) => {

                        const selected =
                          language ===
                          lang.id;

                        return (
                          <button
                            key={
                              lang.id
                            }
                            type="button"
                            onClick={() =>
                              handleLanguageChange(
                                lang.id
                              )
                            }
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium"
                            style={{
                              background:
                                selected
                                  ? 'var(--accent-green-muted)'
                                  : 'transparent',

                              color:
                                selected
                                  ? 'var(--accent-green)'
                                  : 'var(--text-secondary)',
                            }}
                          >

                            <span>
                              {
                                lang.label
                              }
                            </span>

                            {selected && (
                              <LuCheck className="w-4 h-4" />
                            )}

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            </div>


            {/* ==================================================
                VOICE
            =================================================== */}

            {audioAdvisory?.isPlaying && (
              <button
                type="button"
                onClick={
                  stopVoiceAdvisory
                }
                className="hidden sm:flex h-10 px-3 rounded-md items-center gap-2 text-sm font-medium text-sky-600 border"
                style={{
                  borderColor:
                    'rgba(56,189,248,0.25)',
                }}
                title={
                  text.audioActive
                }
              >

                <LuVolume2 className="w-4 h-4" />

                <span>
                  {text.playing}
                </span>

                <LuVolumeX className="w-4 h-4 opacity-60" />

              </button>
            )}


            {/* ==================================================
                NOTIFICATIONS
            =================================================== */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowNotifications(
                    (prev) =>
                      !prev
                  )
                }
                className="relative w-10 h-10 rounded-md flex items-center justify-center text-(--text-secondary) hover:bg-black/5 hover:text-(--text-primary)"
                title={
                  text.bulletins
                }
              >

                <LuBell className="w-5 h-5" />

                {notifications?.length >
                  0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
                )}

              </button>


              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 surface-overlay p-3 z-50">

                  <div className="flex items-center justify-between pb-2 mb-2 divider-t">

                    <span className="text-sm font-semibold text-(--text-primary) flex items-center gap-2">

                      <LuShieldAlert className="w-4 h-4 text-red-500" />

                      {
                        text.bulletins
                      }

                    </span>


                    <span className="text-xs text-(--text-tertiary)">
                      {
                        notifications.length
                      }{' '}
                      {
                        text.active
                      }
                    </span>

                  </div>


                  <div className="space-y-2 max-h-60 overflow-y-auto">

                    {notifications.map(
                      (
                        notification
                      ) => (

                        <div
                          key={
                            notification.id
                          }
                          className="card-raised px-3 py-2 rounded-md"
                        >

                          <p className="text-sm text-(--text-primary)">
                            {
                              notification.text
                            }
                          </p>

                          <span className="text-xs text-(--text-tertiary)">
                            {
                              notification.time
                            }
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>
              )}

            </div>


            {/* ==================================================
                PROFILE / LOGIN
            =================================================== */}

            {currentUser ? (

              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/profile'
                  )
                }
                className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-600"
                title={`${text.profile}: ${currentUser.name}`}
              >

                <LuUser className="w-5 h-5" />

              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/login'
                  )
                }
                className="btn-primary-action h-10 px-4 inline-flex items-center gap-2 text-sm"
              >

                <LuLogIn className="w-4 h-4" />

                <span className="hidden sm:inline">
                  {text.login}
                </span>

              </button>

            )}


            {/* ==================================================
                MOBILE BUTTON
            =================================================== */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (prev) =>
                    !prev
                )
              }
              className="lg:hidden w-10 h-10 rounded-md flex items-center justify-center text-(--text-secondary) hover:bg-black/5"
              aria-label={
                mobileMenuOpen
                  ? text.closeMenu
                  : text.openMenu
              }
            >

              {mobileMenuOpen ? (
                <LuX className="w-5 h-5" />
              ) : (
                <LuMenu className="w-5 h-5" />
              )}

            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-3">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">

              {primaryNav.map(
                (item) => (
                  <NavLink
                    key={
                      item.to
                    }
                    to={
                      item.to
                    }
                    onClick={
                      closeMobileMenu
                    }
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-(--text-secondary) hover:bg-black/5'
                      }`
                    }
                  >

                    <item.icon className="w-5 h-5" />

                    {
                      item.label
                    }

                  </NavLink>
                )
              )}


              {moreItems.map(
                (item) => (
                  <NavLink
                    key={
                      item.to
                    }
                    to={
                      item.to
                    }
                    onClick={
                      closeMobileMenu
                    }
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-(--text-secondary) hover:bg-black/5'
                      }`
                    }
                  >

                    <item.icon className="w-5 h-5" />

                    {
                      item.label
                    }

                  </NavLink>
                )
              )}

            </div>


            {/* ==================================================
                MOBILE LANGUAGE
            =================================================== */}

            <div className="mt-3 pt-3 border-t">

              <div className="flex items-center gap-2 mb-2 px-1">

                <LuLanguages className="w-4 h-4 text-green-600" />

                <span className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.language
                  }
                </span>

              </div>


              <div className="grid grid-cols-3 gap-2">

                {Object.values(
                  languages
                ).map(
                  (lang) => {

                    const selected =
                      language ===
                      lang.id;

                    return (
                      <button
                        key={
                          lang.id
                        }
                        type="button"
                        onClick={() => {

                          setLanguage(
                            lang.id
                          );

                          setMobileMenuOpen(
                            false
                          );

                        }}
                        className="py-2.5 rounded-md text-sm font-semibold"
                        style={{
                          background:
                            selected
                              ? 'var(--accent-green-muted)'
                              : 'var(--bg-surface)',

                          color:
                            selected
                              ? 'var(--accent-green)'
                              : 'var(--text-secondary)',

                          border:
                            selected
                              ? '1px solid var(--accent-green)'
                              : '1px solid var(--border-base)',
                        }}
                      >

                        {
                          lang.shortLabel
                        }

                      </button>
                    );
                  }
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </header>
  );
};


export default Navbar;