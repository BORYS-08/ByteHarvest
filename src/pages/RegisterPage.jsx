import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LuSprout,
  LuUser,
  LuMail,
  LuLock,
  LuShieldCheck,
  LuArrowRight,
  LuCheck,
  LuRefreshCw,
} from 'react-icons/lu';

const translations = {
  en: {
    titleBefore: 'Create Your',
    titleAfter: 'Account',
    subtitle:
      'Join the crop health and advisory platform.',

    personalInfo: 'Personal Information',
    personalInfoDescription:
      'Enter the details you will use to access the platform.',

    fullName: 'Full Name',
    fullNamePlaceholder:
      'Enter your full name',

    email: 'Email Address',
    emailPlaceholder:
      'you@example.com',

    password: 'Password',
    passwordPlaceholder:
      'Minimum 6 characters',

    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder:
      'Re-enter password',

    chooseRole: 'Choose Your Role',
    roleDescription:
      'Your role determines which tools and dashboard you see.',

    roles: {
      farmer: {
        label: 'Farmer / Grower',
        description:
          'Crop health, disease detection and advisories',
      },
      extension: {
        label: 'Field Extension',
        description:
          'Farm visits, field support and sample collection',
      },
      expert: {
        label: 'Agri-Expert',
        description:
          'Disease verification and expert consultation',
      },
      official: {
        label: 'Agriculture Official',
        description:
          'Outbreak monitoring and intervention',
      },
    },

    terms:
      'I agree to the platform terms and understand that my account will be subject to role-based access.',

    createAccount:
      'Create Account',

    creating:
      'Creating Account...',

    alreadyHave:
      'Already have an account?',

    signIn:
      'Sign in',

    frontendDemo:
      'Registration is currently a frontend demo. Your backend can later connect this form to the real authentication API.',

    success:
      'Registration details saved. Continue to sign in.',

    errors: {
      name:
        'Please enter your full name.',
      email:
        'Please enter a valid email address.',
      password:
        'Password must contain at least 6 characters.',
      confirm:
        'Passwords do not match.',
      terms:
        'Please agree to the terms before continuing.',
    },
  },

  hi: {
    titleBefore: 'अपना',
    titleAfter: 'खाता बनाएँ',
    subtitle:
      'फसल स्वास्थ्य और कृषि सलाह प्लेटफ़ॉर्म से जुड़ें।',

    personalInfo: 'व्यक्तिगत जानकारी',
    personalInfoDescription:
      'प्लेटफ़ॉर्म तक पहुँचने के लिए अपनी जानकारी दर्ज करें।',

    fullName: 'पूरा नाम',
    fullNamePlaceholder:
      'अपना पूरा नाम दर्ज करें',

    email: 'ईमेल पता',
    emailPlaceholder:
      'you@example.com',

    password: 'पासवर्ड',
    passwordPlaceholder:
      'कम से कम 6 अक्षर',

    confirmPassword: 'पासवर्ड की पुष्टि करें',
    confirmPasswordPlaceholder:
      'पासवर्ड दोबारा दर्ज करें',

    chooseRole: 'अपनी भूमिका चुनें',
    roleDescription:
      'आपकी भूमिका यह निर्धारित करती है कि आपको कौन से टूल और डैशबोर्ड दिखाई देंगे।',

    roles: {
      farmer: {
        label: 'किसान / उत्पादक',
        description:
          'फसल स्वास्थ्य, रोग पहचान और सलाह',
      },
      extension: {
        label: 'फील्ड एक्सटेंशन',
        description:
          'खेत की यात्राएँ, फील्ड सहायता और नमूना संग्रह',
      },
      expert: {
        label: 'कृषि विशेषज्ञ',
        description:
          'रोग सत्यापन और विशेषज्ञ परामर्श',
      },
      official: {
        label: 'कृषि अधिकारी',
        description:
          'प्रकोप निगरानी और हस्तक्षेप',
      },
    },

    terms:
      'मैं प्लेटफ़ॉर्म की शर्तों से सहमत हूँ और समझता हूँ कि मेरा खाता भूमिका-आधारित पहुँच के अधीन होगा।',

    createAccount:
      'खाता बनाएँ',

    creating:
      'खाता बनाया जा रहा है...',

    alreadyHave:
      'क्या आपका पहले से खाता है?',

    signIn:
      'लॉगिन करें',

    frontendDemo:
      'पंजीकरण अभी फ्रंटएंड डेमो है। बाद में आपका बैकएंड इस फॉर्म को वास्तविक प्रमाणीकरण API से जोड़ सकता है।',

    success:
      'पंजीकरण जानकारी सुरक्षित हो गई है। अब लॉगिन करें।',

    errors: {
      name:
        'कृपया अपना पूरा नाम दर्ज करें।',
      email:
        'कृपया सही ईमेल पता दर्ज करें।',
      password:
        'पासवर्ड में कम से कम 6 अक्षर होने चाहिए।',
      confirm:
        'पासवर्ड मेल नहीं खाते।',
      terms:
        'कृपया आगे बढ़ने से पहले शर्तों से सहमत हों।',
    },
  },

  mr: {
    titleBefore: 'तुमचे',
    titleAfter: 'खाते तयार करा',
    subtitle:
      'पीक आरोग्य आणि कृषी सल्ला प्लॅटफॉर्ममध्ये सामील व्हा.',

    personalInfo: 'वैयक्तिक माहिती',
    personalInfoDescription:
      'प्लॅटफॉर्ममध्ये प्रवेश करण्यासाठी आवश्यक माहिती भरा.',

    fullName: 'पूर्ण नाव',
    fullNamePlaceholder:
      'तुमचे पूर्ण नाव भरा',

    email: 'ईमेल पत्ता',
    emailPlaceholder:
      'you@example.com',

    password: 'पासवर्ड',
    passwordPlaceholder:
      'किमान 6 अक्षरे',

    confirmPassword: 'पासवर्डची पुष्टी करा',
    confirmPasswordPlaceholder:
      'पासवर्ड पुन्हा भरा',

    chooseRole: 'तुमची भूमिका निवडा',
    roleDescription:
      'तुमच्या भूमिकेनुसार तुम्हाला दिसणारी साधने आणि डॅशबोर्ड ठरतील.',

    roles: {
      farmer: {
        label: 'शेतकरी / उत्पादक',
        description:
          'पीक आरोग्य, रोग निदान आणि सल्ला',
      },
      extension: {
        label: 'फील्ड विस्तार',
        description:
          'शेतभेटी, फील्ड सहाय्य आणि नमुना संकलन',
      },
      expert: {
        label: 'कृषी तज्ज्ञ',
        description:
          'रोग सत्यापन आणि तज्ज्ञ सल्ला',
      },
      official: {
        label: 'कृषी अधिकारी',
        description:
          'प्रादुर्भाव निरीक्षण आणि हस्तक्षेप',
      },
    },

    terms:
      'मी प्लॅटफॉर्मच्या अटी मान्य करतो आणि माझ्या खात्याला भूमिकेनुसार प्रवेश दिला जाईल हे समजतो.',

    createAccount:
      'खाते तयार करा',

    creating:
      'खाते तयार होत आहे...',

    alreadyHave:
      'तुमचे आधीच खाते आहे?',

    signIn:
      'साइन इन करा',

    frontendDemo:
      'नोंदणी सध्या फ्रंटएंड डेमो आहे. नंतर तुमचा बॅकएंड हा फॉर्म वास्तविक प्रमाणीकरण API शी जोडू शकतो.',

    success:
      'नोंदणीची माहिती जतन झाली आहे. आता साइन इन करा.',

    errors: {
      name:
        'कृपया तुमचे पूर्ण नाव भरा.',
      email:
        'कृपया योग्य ईमेल पत्ता भरा.',
      password:
        'पासवर्डमध्ये किमान 6 अक्षरे असणे आवश्यक आहे.',
      confirm:
        'पासवर्ड जुळत नाहीत.',
      terms:
        'कृपया पुढे जाण्यापूर्वी अटी मान्य करा.',
    },
  },
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const text =
    translations[language] ||
    translations.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    agree: false,
  });

  const [errorMsg, setErrorMsg] =
    useState('');

  const [successMsg, setSuccessMsg] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const roles = [
    'farmer',
    'extension',
    'expert',
    'official',
  ];

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));

    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim()) {
      setErrorMsg(
        text.errors.name
      );
      return;
    }

    if (
      !formData.email.trim() ||
      !formData.email.includes('@')
    ) {
      setErrorMsg(
        text.errors.email
      );
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg(
        text.errors.password
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setErrorMsg(
        text.errors.confirm
      );
      return;
    }

    if (!formData.agree) {
      setErrorMsg(
        text.errors.terms
      );
      return;
    }

    setIsLoading(true);

    // Frontend-only registration placeholder.
    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    const registrationDraft = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      'byteharvest_registration_draft',
      JSON.stringify(
        registrationDraft
      )
    );

    setIsLoading(false);

    setSuccessMsg(
      text.success
    );

    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="w-full max-w-2xl">

        {/* Brand */}
        <div className="text-center mb-6">

          <div className="brand-icon-box inline-flex items-center justify-center p-2 mb-3">
            <LuSprout className="w-7 h-7 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-(--text-primary)">

            {text.titleBefore}{' '}

            <span className="text-green-600">
              ByteHarvest
            </span>{' '}

            {language === 'en'
              ? 'Account'
              : text.titleAfter}

          </h1>

          <p className="text-base mt-2 text-(--text-secondary)">
            {text.subtitle}
          </p>

        </div>


        {/* Registration Card */}
        <div className="card p-6 sm:p-8">

          <form
            onSubmit={handleRegister}
            className="space-y-6"
          >

            {/* Error */}
            {errorMsg && (
              <div
                className="p-3 rounded-md text-sm"
                style={{
                  background:
                    '#FEF2F2',
                  border:
                    '1px solid #FECACA',
                  color: '#B91C1C',
                }}
              >
                {errorMsg}
              </div>
            )}


            {/* Success */}
            {successMsg && (
              <div
                className="p-3 rounded-md text-sm flex items-center gap-2"
                style={{
                  background:
                    '#F0FDF4',
                  border:
                    '1px solid #BBF7D0',
                  color: '#166534',
                }}
              >
                <LuCheck className="w-5 h-5 shrink-0" />
                {successMsg}
              </div>
            )}


            {/* Personal Information */}
            <div className="space-y-4">

              <div>

                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {text.personalInfo}
                </h2>

                <p className="text-sm mt-1 text-(--text-secondary)">
                  {text.personalInfoDescription}
                </p>

              </div>


              {/* Name */}
              <div>

                <label className="block text-sm font-medium mb-2 text-(--text-secondary)">
                  {text.fullName}
                </label>

                <div className="relative">

                  <LuUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={
                      text.fullNamePlaceholder
                    }
                    className="field-input field-input-icon"
                  />

                </div>

              </div>


              {/* Email */}
              <div>

                <label className="block text-sm font-medium mb-2 text-(--text-secondary)">
                  {text.email}
                </label>

                <div className="relative">

                  <LuMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={
                      text.emailPlaceholder
                    }
                    className="field-input field-input-icon"
                  />

                </div>

              </div>


              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium mb-2 text-(--text-secondary)">
                    {text.password}
                  </label>

                  <div className="relative">

                    <LuLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        text.passwordPlaceholder
                      }
                      className="field-input field-input-icon"
                    />

                  </div>

                </div>


                <div>

                  <label className="block text-sm font-medium mb-2 text-(--text-secondary)">
                    {text.confirmPassword}
                  </label>

                  <div className="relative">

                    <LuLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder={
                        text.confirmPasswordPlaceholder
                      }
                      className="field-input field-input-icon"
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* Role Selection */}
            <div className="space-y-3">

              <div>

                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {text.chooseRole}
                </h2>

                <p className="text-sm mt-1 text-(--text-secondary)">
                  {text.roleDescription}
                </p>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {roles.map((roleId) => {

                  const role =
                    text.roles[roleId];

                  const isSelected =
                    formData.role === roleId;

                  return (
                    <button
                      key={roleId}
                      type="button"
                      onClick={() =>
                        setFormData(
                          (prev) => ({
                            ...prev,
                            role: roleId,
                          })
                        )
                      }
                      className="text-left p-4 rounded-md transition-colors cursor-pointer"
                      style={{
                        background:
                          isSelected
                            ? 'var(--accent-green-muted)'
                            : 'var(--bg-surface)',

                        border:
                          isSelected
                            ? '1px solid var(--accent-green)'
                            : '1px solid var(--border-base)',
                      }}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p
                            className="text-base font-semibold"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {role.label}
                          </p>

                          <p
                            className="text-sm mt-1 leading-relaxed"
                            style={{
                              color:
                                'var(--text-secondary)',
                            }}
                          >
                            {role.description}
                          </p>

                        </div>

                        {isSelected && (
                          <div className="shrink-0">
                            <LuCheck className="w-5 h-5 text-green-600" />
                          </div>
                        )}

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>


            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-green-600"
              />

              <span className="text-sm leading-relaxed text-(--text-secondary)">
                {text.terms}
              </span>

            </label>


            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2"
            >

              {isLoading ? (
                <>
                  <LuRefreshCw className="w-5 h-5 animate-spin" />
                  {text.creating}
                </>
              ) : (
                <>
                  {text.createAccount}
                  <LuArrowRight className="w-5 h-5" />
                </>
              )}

            </button>


            {/* Login */}
            <div className="text-center text-sm text-(--text-secondary)">

              {text.alreadyHave}{' '}

              <Link
                to="/login"
                className="font-semibold text-green-700 hover:underline"
              >
                {text.signIn}
              </Link>

            </div>


            {/* Frontend Note */}
            <div
              className="p-3 rounded-md flex items-start gap-2 text-sm"
              style={{
                background:
                  'var(--bg-raised)',
                border:
                  '1px solid var(--border-base)',
                color:
                  'var(--text-secondary)',
              }}
            >

              <LuShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />

              <p>
                {text.frontendDemo}
              </p>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;