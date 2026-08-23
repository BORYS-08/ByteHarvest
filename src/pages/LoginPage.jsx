import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import {
  useApp,
  ROLES,
} from '../context/AppContext';

import {
  LuSprout,
  LuMail,
  LuArrowRight,
  LuArrowLeft,
  LuCheck,
  LuShieldCheck,
  LuRefreshCw,
} from 'react-icons/lu';


/* ============================================================
   DEMO AUTH CONFIGURATION
   ============================================================ */

const DEFAULT_AUTH_CODE = '12345';


/* ============================================================
   DIRECTORY PROFILES
   ============================================================ */

const DIRECTORY_PROFILES = [
  {
    name: 'Rajesh Verma',
    email: 'rajesh.farmer@agrivision.in',
    role: 'farmer',
    label: 'Farmer',
    desc: 'Crop Diagnostics & Remedies',
  },

  {
    name: 'Sunil Mehta',
    email: 'sunil.ext@agri-dept.gov.in',
    role: 'extension',
    label: 'Field Officer',
    desc: 'Visits & Lab Referrals',
  },

  {
    name: 'Dr. Ananya Rao',
    email: 'ananya.pathology@icar.gov.in',
    role: 'expert',
    label: 'Agri-Expert',
    desc: 'Scan Verification & Prescriptions',
  },

  {
    name: 'P. K. Deshmukh',
    email: 'deshmukh.surveillance@gov.in',
    role: 'official',
    label: 'Agri-Official',
    desc: 'GIS Outbreak Radar',
  },

  {
    name: 'ByteHarvest Administrator',
    email: 'admin@byteharvest.in',
    role: 'admin',
    label: 'Administrator',
    desc: 'Platform Administration & System Monitoring',
  },
];


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    portal:
      'National Crop Health & Outbreak Intelligence Portal',

    signInTitle:
      'Sign In to Your Workspace',

    signInDescription:
      'Enter your registered work email to receive a single-use verification code.',

    email:
      'Email Address',

    emailPlaceholder:
      'user@agri-domain.gov.in',

    role:
      'Target Operational Role',

    roles: {
      farmer: 'Farmer / Grower',
      extension: 'Field Extension',
      expert: 'Agri-Expert',
      official: 'Surveillance Official',
      admin: 'Platform Administrator',
    },

    sendCode:
      'Send Verification Code',

    sending:
      'Sending Code...',

    forgot:
      'Forgot Password?',

    noAccount:
      "Don't have an account?",

    createAccount:
      'Create an account',

    directory:
      'Directory Accounts',

    quickSelect:
      'Quick Select',

    changeEmail:
      'Change email',

    verifyTitle:
      'Enter Verification Code',

    codeSent:
      'Verification code sent to',

    verify:
      'Verify & Launch Portal',

    verifying:
      'Verifying Code...',

    resendIn:
      'Resend code in',

    seconds:
      's',

    resend:
      'Resend verification code',

    support:
      'Farmer Advisory & Field Support Network',

    footer:
      'Smart India Hackathon 2026 · Ministry of Agriculture & Farmers Welfare',

    invalidEmail:
      'Please enter a valid email address.',

    fullCode:
      'Please enter the full 5-digit verification code.',

    invalidCode:
      'Invalid verification code. Please check and try again.',

    directoryDescriptions: {
      farmer:
        'Crop Diagnostics & Remedies',

      extension:
        'Visits & Lab Referrals',

      expert:
        'Scan Verification & Prescriptions',

      official:
        'GIS Outbreak Radar',

      admin:
        'Platform Administration & System Monitoring',
    },
  },

  hi: {
    portal:
      'राष्ट्रीय फसल स्वास्थ्य एवं प्रकोप निगरानी पोर्टल',

    signInTitle:
      'अपने वर्कस्पेस में लॉगिन करें',

    signInDescription:
      'सत्यापन कोड प्राप्त करने के लिए अपना पंजीकृत कार्य ईमेल दर्ज करें।',

    email:
      'ईमेल पता',

    emailPlaceholder:
      'user@agri-domain.gov.in',

    role:
      'भूमिका चुनें',

    roles: {
      farmer:
        'किसान / उत्पादक',

      extension:
        'फील्ड एक्सटेंशन',

      expert:
        'कृषि विशेषज्ञ',

      official:
        'निगरानी अधिकारी',

      admin:
        'प्लेटफ़ॉर्म प्रशासक',
    },

    sendCode:
      'सत्यापन कोड भेजें',

    sending:
      'कोड भेजा जा रहा है...',

    forgot:
      'पासवर्ड भूल गए?',

    noAccount:
      'क्या आपका खाता नहीं है?',

    createAccount:
      'खाता बनाएँ',

    directory:
      'डायरेक्टरी खाते',

    quickSelect:
      'त्वरित चयन',

    changeEmail:
      'ईमेल बदलें',

    verifyTitle:
      'सत्यापन कोड दर्ज करें',

    codeSent:
      'सत्यापन कोड भेजा गया है',

    verify:
      'सत्यापित करें और पोर्टल खोलें',

    verifying:
      'सत्यापन हो रहा है...',

    resendIn:
      'कोड दोबारा भेजें',

    seconds:
      'सेकंड',

    resend:
      'सत्यापन कोड दोबारा भेजें',

    support:
      'किसान सलाह एवं फील्ड सहायता नेटवर्क',

    footer:
      'स्मार्ट इंडिया हैकाथॉन 2026 · कृषि एवं किसान कल्याण मंत्रालय',

    invalidEmail:
      'कृपया सही ईमेल पता दर्ज करें।',

    fullCode:
      'कृपया पूरा 5 अंकों का सत्यापन कोड दर्ज करें।',

    invalidCode:
      'गलत सत्यापन कोड। कृपया दोबारा जाँचें।',

    directoryDescriptions: {
      farmer:
        'फसल जाँच और उपचार',

      extension:
        'फील्ड विजिट और लैब रेफरल',

      expert:
        'स्कैन सत्यापन और उपचार सलाह',

      official:
        'GIS प्रकोप निगरानी',

      admin:
        'प्लेटफ़ॉर्म प्रशासन और सिस्टम मॉनिटरिंग',
    },
  },

  mr: {
    portal:
      'राष्ट्रीय पीक आरोग्य आणि प्रादुर्भाव माहिती पोर्टल',

    signInTitle:
      'तुमच्या वर्कस्पेसमध्ये साइन इन करा',

    signInDescription:
      'सत्यापन कोड मिळवण्यासाठी तुमचा नोंदणीकृत कार्य ईमेल भरा.',

    email:
      'ईमेल पत्ता',

    emailPlaceholder:
      'user@agri-domain.gov.in',

    role:
      'भूमिका निवडा',

    roles: {
      farmer:
        'शेतकरी / उत्पादक',

      extension:
        'फील्ड विस्तार',

      expert:
        'कृषी तज्ज्ञ',

      official:
        'निगराणी अधिकारी',

      admin:
        'प्लॅटफॉर्म प्रशासक',
    },

    sendCode:
      'सत्यापन कोड पाठवा',

    sending:
      'कोड पाठवत आहे...',

    forgot:
      'पासवर्ड विसरलात?',

    noAccount:
      'तुमचे खाते नाही?',

    createAccount:
      'खाते तयार करा',

    directory:
      'डायरेक्टरी खाती',

    quickSelect:
      'त्वरित निवड',

    changeEmail:
      'ईमेल बदला',

    verifyTitle:
      'सत्यापन कोड भरा',

    codeSent:
      'सत्यापन कोड पाठवला आहे',

    verify:
      'सत्यापित करा आणि पोर्टल उघडा',

    verifying:
      'सत्यापन सुरू आहे...',

    resendIn:
      'कोड पुन्हा पाठवण्यासाठी',

    seconds:
      'सेकंद',

    resend:
      'सत्यापन कोड पुन्हा पाठवा',

    support:
      'शेतकरी सल्ला आणि फील्ड सहाय्य नेटवर्क',

    footer:
      'स्मार्ट इंडिया हॅकाथॉन 2026 · कृषी आणि शेतकरी कल्याण मंत्रालय',

    invalidEmail:
      'कृपया योग्य ईमेल पत्ता भरा.',

    fullCode:
      'कृपया पूर्ण 5 अंकी सत्यापन कोड भरा.',

    invalidCode:
      'चुकीचा सत्यापन कोड. कृपया पुन्हा तपासा.',

    directoryDescriptions: {
      farmer:
        'पीक निदान आणि उपचार',

      extension:
        'फील्ड भेटी आणि लॅब रेफरल',

      expert:
        'स्कॅन सत्यापन आणि उपचार सल्ला',

      official:
        'GIS प्रादुर्भाव निगराणी',

      admin:
        'प्लॅटफॉर्म प्रशासन आणि सिस्टम मॉनिटरिंग',
    },
  },
};


/* ============================================================
   LOGIN PAGE
   ============================================================ */

export const LoginPage = () => {

  const navigate =
    useNavigate();

  const {
    login,
    currentUser,
    language,
  } = useApp();

  const text =
    translations[language] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [step, setStep] =
    useState('email');

  const [email, setEmail] =
    useState('');

  const [selectedRole, setSelectedRole] =
    useState('farmer');

  const [otpValues, setOtpValues] =
    useState([
      '',
      '',
      '',
      '',
      '',
    ]);

  const [countdown, setCountdown] =
    useState(60);

  const [isLoading, setIsLoading] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState('');


  const otpInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];


  /* ==========================================================
     REDIRECT AUTHENTICATED USERS
     ========================================================== */

  useEffect(() => {

    if (currentUser) {

      const destination =
        ROLES[
          currentUser.role?.toUpperCase()
        ]?.defaultRoute ||
        '/farmer';

      navigate(
        destination,
        {
          replace: true,
        }
      );
    }

  }, [
    currentUser,
    navigate,
  ]);


  /* ==========================================================
     OTP COUNTDOWN
     ========================================================== */

  useEffect(() => {

    let timer;

    if (
      step === 'otp' &&
      countdown > 0
    ) {

      timer = setInterval(() => {

        setCountdown(
          (prev) =>
            prev - 1
        );

      }, 1000);

    }

    return () =>
      clearInterval(timer);

  }, [
    step,
    countdown,
  ]);


  /* ==========================================================
     SEND OTP
     ========================================================== */

  const handleSendOtp = (
    e
  ) => {

    if (e) {
      e.preventDefault();
    }

    setErrorMsg('');

    if (
      !email ||
      !email.includes('@')
    ) {

      setErrorMsg(
        text.invalidEmail
      );

      return;
    }

    setIsLoading(true);

    setTimeout(() => {

      setStep('otp');

      setIsLoading(false);

      setCountdown(45);

      setOtpValues([
        '',
        '',
        '',
        '',
        '',
      ]);

    }, 500);
  };


  /* ==========================================================
     OTP INPUT
     ========================================================== */

  const handleOtpChange = (
    index,
    value
  ) => {

    if (isNaN(value)) {
      return;
    }

    const newValues = [
      ...otpValues,
    ];

    newValues[index] =
      value.slice(-1);

    setOtpValues(
      newValues
    );

    setErrorMsg('');

    if (
      value &&
      index < 4
    ) {

      otpInputRefs[
        index + 1
      ].current?.focus();

    }
  };


  const handleKeyDown = (
    index,
    e
  ) => {

    if (
      e.key === 'Backspace' &&
      !otpValues[index] &&
      index > 0
    ) {

      otpInputRefs[
        index - 1
      ].current?.focus();

    }
  };


  /* ==========================================================
     VERIFY OTP
     ========================================================== */

  const handleVerifyOtp = (
    e
  ) => {

    if (e) {
      e.preventDefault();
    }

    const enteredOtp =
      otpValues.join('');

    if (
      enteredOtp.length < 5
    ) {

      setErrorMsg(
        text.fullCode
      );

      return;
    }

    if (
      enteredOtp !==
      DEFAULT_AUTH_CODE
    ) {

      setErrorMsg(
        text.invalidCode
      );

      return;
    }

    setIsLoading(true);

    setTimeout(() => {

      const matchedProfile =
        DIRECTORY_PROFILES.find(
          (acc) =>
            acc.email.toLowerCase() ===
            email.toLowerCase()
        );


      const userName =
        matchedProfile?.name ||
        email
          .split('@')[0]
          .replace('.', ' ')
          .toUpperCase();


      /*
        The selected role remains authoritative
        for this frontend demo.

        For the Admin demo account:
        email = admin@byteharvest.in
        role  = admin
      */

      const authenticatedUser = {
        name: userName,
        email,
        role: selectedRole,
        token:
          `auth-token-${Date.now()}`,
        loginTime:
          new Date().toISOString(),
      };


      login(
        authenticatedUser
      );

      setIsLoading(false);


      const targetRoute =
        ROLES[
          selectedRole.toUpperCase()
        ]?.defaultRoute ||
        '/farmer';


      navigate(
        targetRoute,
        {
          replace: true,
        }
      );

    }, 600);
  };


  /* ==========================================================
     DIRECTORY PROFILE
     ========================================================== */

  const handleSelectProfile =
    (account) => {

      setEmail(
        account.email
      );

      setSelectedRole(
        account.role
      );

      setErrorMsg('');
    };


  /* ==========================================================
     JSX
     ========================================================== */

  return (

    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-md space-y-6">


        {/* ====================================================
            BRAND
        ==================================================== */}

        <div className="text-center space-y-2">

          <div className="brand-icon-box inline-flex items-center justify-center p-2">

            <LuSprout className="w-7 h-7 text-green-500" />

          </div>


          <h1 className="text-3xl font-bold tracking-tight text-(--text-primary)">

            Byte
            <span className="text-green-600">
              Harvest
            </span>

          </h1>


          <p className="text-sm text-(--text-secondary)">
            {text.portal}
          </p>

        </div>


        {/* ====================================================
            MAIN CARD
        ==================================================== */}

        <div className="card p-6 sm:p-8 space-y-6">


          {/* ==================================================
              EMAIL STEP
          ================================================== */}

          {step === 'email' ? (

            <form
              onSubmit={
                handleSendOtp
              }
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {
                    text.signInTitle
                  }
                </h2>

                <p className="text-sm text-(--text-secondary)">
                  {
                    text.signInDescription
                  }
                </p>

              </div>


              {/* Error */}

              {errorMsg && (
                <div className="p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
                  {
                    errorMsg
                  }
                </div>
              )}


              {/* Email */}

              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {
                    text.email
                  }
                </label>

                <div className="relative flex items-center">

                  <LuMail className="w-5 h-5 absolute left-3.5 text-(--text-tertiary) pointer-events-none z-10" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder={
                      text.emailPlaceholder
                    }
                    className="field-input field-input-icon text-base"
                    autoFocus
                  />

                </div>

              </div>


              {/* Role */}

              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {
                    text.role
                  }
                </label>


                <div className="grid grid-cols-2 gap-2">

                  {[
                    {
                      id: 'farmer',
                    },

                    {
                      id: 'extension',
                    },

                    {
                      id: 'expert',
                    },

                    {
                      id: 'official',
                    },

                    {
                      id: 'admin',
                    },

                  ].map(
                    (role) => (

                      <button
                        key={
                          role.id
                        }
                        type="button"
                        onClick={() =>
                          setSelectedRole(
                            role.id
                          )
                        }
                        className={`p-3 rounded-md text-sm font-medium text-left border transition-all cursor-pointer ${
                          selectedRole ===
                          role.id
                            ? 'border-green-500/50 bg-green-50 text-(--text-primary)'
                            : 'border-(--border-base) bg-(--bg-canvas) text-(--text-secondary) hover:border-(--border-mid)'
                        }`}
                      >

                        <div className="flex items-center justify-between gap-2">

                          <span>

                            {
                              text.roles[
                                role.id
                              ]
                            }

                          </span>

                          {selectedRole ===
                            role.id && (
                            <LuCheck className="w-4 h-4 text-green-600 shrink-0" />
                          )}

                        </div>

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* Send Code */}

              <button
                type="submit"
                disabled={
                  isLoading
                }
                className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >

                {isLoading ? (

                  <>
                    <LuRefreshCw className="w-5 h-5 animate-spin" />

                    <span>
                      {
                        text.sending
                      }
                    </span>
                  </>

                ) : (

                  <>
                    <span>
                      {
                        text.sendCode
                      }
                    </span>

                    <LuArrowRight className="w-5 h-5" />

                  </>

                )}

              </button>


              {/* Forgot Password */}

              <div className="text-center text-sm text-(--text-secondary)">

                <Link
                  to="/forgot-password"
                  className="font-semibold text-green-700 hover:underline"
                >
                  {
                    text.forgot
                  }
                </Link>

              </div>


              {/* Register */}

              <div className="text-center text-sm text-(--text-secondary)">

                {
                  text.noAccount
                }{' '}

                <Link
                  to="/register"
                  className="font-semibold text-green-700 hover:underline"
                >
                  {
                    text.createAccount
                  }
                </Link>

              </div>


              {/* Directory Accounts */}

              <div className="pt-4 border-t border-(--border-base) space-y-3">

                <div className="flex items-center justify-between text-sm text-(--text-tertiary)">

                  <span className="font-semibold uppercase tracking-wide">
                    {
                      text.directory
                    }
                  </span>

                  <span>
                    {
                      text.quickSelect
                    }
                  </span>

                </div>


                <div className="grid grid-cols-2 gap-2">

                  {DIRECTORY_PROFILES.map(
                    (account) => (

                      <button
                        key={
                          account.email
                        }
                        type="button"
                        onClick={() =>
                          handleSelectProfile(
                            account
                          )
                        }
                        className="p-3 rounded-md text-left border border-(--border-base) bg-(--bg-canvas) hover:border-(--border-mid) transition-all cursor-pointer group"
                      >

                        <div className="text-sm font-semibold text-(--text-primary) group-hover:text-green-600">

                          {
                            text.roles[
                              account.role
                            ]
                          }

                        </div>

                        <div className="text-sm text-(--text-tertiary) truncate mt-0.5">
                          {
                            account.name
                          }
                        </div>

                        <div className="text-xs text-(--text-tertiary) truncate mt-1">
                          {
                            account.email
                          }
                        </div>

                      </button>

                    )
                  )}

                </div>

              </div>

            </form>

          ) : (

            /* ==================================================
               OTP STEP
            ================================================== */

            <form
              onSubmit={
                handleVerifyOtp
              }
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <button
                  type="button"
                  onClick={() =>
                    setStep(
                      'email'
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text-primary) mb-2 cursor-pointer"
                >

                  <LuArrowLeft className="w-4 h-4" />

                  {
                    text.changeEmail
                  }

                </button>


                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {
                    text.verifyTitle
                  }
                </h2>


                <p className="text-sm text-(--text-secondary)">

                  {
                    text.codeSent
                  }{' '}

                  <span className="font-medium text-(--text-primary)">
                    {email}
                  </span>

                </p>

              </div>


              {/* Error */}

              {errorMsg && (
                <div className="p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
                  {
                    errorMsg
                  }
                </div>
              )}


              {/* OTP */}

              <div className="flex justify-center gap-2.5 py-2">

                {otpValues.map(
                  (
                    digit,
                    index
                  ) => (

                    <input
                      key={
                        index
                      }
                      ref={
                        otpInputRefs[
                          index
                        ]
                      }
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={
                        digit
                      }
                      onChange={(e) =>
                        handleOtpChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(
                          index,
                          e
                        )
                      }
                      className="otp-digit-input"
                      autoFocus={
                        index ===
                        0
                      }
                    />

                  )
                )}

              </div>


              {/* Verify */}

              <button
                type="submit"
                disabled={
                  isLoading
                }
                className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >

                {isLoading ? (

                  <>
                    <LuRefreshCw className="w-5 h-5 animate-spin" />

                    <span>
                      {
                        text.verifying
                      }
                    </span>
                  </>

                ) : (

                  <>
                    <LuShieldCheck className="w-5 h-5" />

                    <span>
                      {
                        text.verify
                      }
                    </span>
                  </>

                )}

              </button>


              {/* Resend */}

              <div className="text-center text-sm text-(--text-tertiary)">

                {countdown > 0 ? (

                  <span>

                    {
                      text.resendIn
                    }{' '}

                    {
                      countdown
                    }

                    {language ===
                    'en'
                      ? text.seconds
                      : ` ${text.seconds}`}

                  </span>

                ) : (

                  <button
                    type="button"
                    onClick={
                      handleSendOtp
                    }
                    className="text-green-700 hover:underline cursor-pointer font-medium"
                  >
                    {
                      text.resend
                    }
                  </button>

                )}

              </div>

            </form>

          )}

        </div>


        {/* ====================================================
            FOOTER SUPPORT
        ==================================================== */}

        <div className="text-center text-sm text-(--text-tertiary) space-y-1">

          <p>
            {
              text.support
            }
          </p>

          <p>
            {
              text.footer
            }
          </p>

        </div>

      </div>

    </div>
  );
};