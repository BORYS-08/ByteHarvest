import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LuSprout,
  LuMail,
  LuArrowLeft,
  LuArrowRight,
  LuShieldCheck,
  LuRefreshCw,
  LuCheck,
} from 'react-icons/lu';

const translations = {
  en: {
    recover:
      'Recover access to your account',

    forgotTitle:
      'Forgot Password?',

    forgotDescription:
      'Enter your email address and we’ll send you a verification code.',

    email:
      'Email Address',

    emailPlaceholder:
      'you@example.com',

    sendCode:
      'Send Verification Code',

    sending:
      'Sending Code...',

    backToSignIn:
      'Back to Sign In',

    changeEmail:
      'Change email',

    verifyTitle:
      'Enter Verification Code',

    verifyDescription:
      'We sent a 5-digit code to',

    verificationCode:
      'Verification Code',

    verifying:
      'Verifying...',

    verify:
      'Verify Code',

    resend:
      'Resend code in',

    seconds:
      's',

    newPassword:
      'Create New Password',

    newPasswordDescription:
      'Choose a new password for your ByteHarvest account.',

    password:
      'New Password',

    passwordPlaceholder:
      'Minimum 6 characters',

    confirmPassword:
      'Confirm New Password',

    confirmPlaceholder:
      'Re-enter your password',

    updating:
      'Updating Password...',

    reset:
      'Reset Password',

    successTitle:
      'Password Reset Complete',

    successDescription:
      'Your password has been updated successfully.',

    continue:
      'Continue to Sign In',

    support:
      'Farmer Advisory & Field Support Network',

    errors: {
      email:
        'Please enter a valid email address.',

      code:
        'Please enter the 5-digit verification code.',

      password:
        'Password must contain at least 6 characters.',

      match:
        'Passwords do not match.',
    },
  },

  hi: {
    recover:
      'अपने खाते की पहुँच वापस पाएँ',

    forgotTitle:
      'पासवर्ड भूल गए?',

    forgotDescription:
      'अपना ईमेल पता दर्ज करें और हम आपको सत्यापन कोड भेजेंगे।',

    email:
      'ईमेल पता',

    emailPlaceholder:
      'you@example.com',

    sendCode:
      'सत्यापन कोड भेजें',

    sending:
      'कोड भेजा जा रहा है...',

    backToSignIn:
      'लॉगिन पर वापस जाएँ',

    changeEmail:
      'ईमेल बदलें',

    verifyTitle:
      'सत्यापन कोड दर्ज करें',

    verifyDescription:
      '5 अंकों का कोड भेजा गया है',

    verificationCode:
      'सत्यापन कोड',

    verifying:
      'सत्यापन हो रहा है...',

    verify:
      'कोड सत्यापित करें',

    resend:
      'कोड दोबारा भेजें',

    seconds:
      'सेकंड',

    newPassword:
      'नया पासवर्ड बनाएँ',

    newPasswordDescription:
      'अपने ByteHarvest खाते के लिए नया पासवर्ड चुनें।',

    password:
      'नया पासवर्ड',

    passwordPlaceholder:
      'कम से कम 6 अक्षर',

    confirmPassword:
      'नए पासवर्ड की पुष्टि करें',

    confirmPlaceholder:
      'पासवर्ड दोबारा दर्ज करें',

    updating:
      'पासवर्ड अपडेट हो रहा है...',

    reset:
      'पासवर्ड रीसेट करें',

    successTitle:
      'पासवर्ड सफलतापूर्वक रीसेट हुआ',

    successDescription:
      'आपका पासवर्ड सफलतापूर्वक अपडेट हो गया है।',

    continue:
      'लॉगिन जारी रखें',

    support:
      'किसान सलाह एवं फील्ड सहायता नेटवर्क',

    errors: {
      email:
        'कृपया सही ईमेल पता दर्ज करें।',

      code:
        'कृपया 5 अंकों का सत्यापन कोड दर्ज करें।',

      password:
        'पासवर्ड में कम से कम 6 अक्षर होने चाहिए।',

      match:
        'पासवर्ड मेल नहीं खाते।',
    },
  },

  mr: {
    recover:
      'तुमच्या खात्याचा प्रवेश परत मिळवा',

    forgotTitle:
      'पासवर्ड विसरलात?',

    forgotDescription:
      'तुमचा ईमेल पत्ता भरा आणि आम्ही तुम्हाला सत्यापन कोड पाठवू.',

    email:
      'ईमेल पत्ता',

    emailPlaceholder:
      'you@example.com',

    sendCode:
      'सत्यापन कोड पाठवा',

    sending:
      'कोड पाठवत आहे...',

    backToSignIn:
      'साइन इनवर परत जा',

    changeEmail:
      'ईमेल बदला',

    verifyTitle:
      'सत्यापन कोड भरा',

    verifyDescription:
      '5 अंकी कोड पाठवला आहे',

    verificationCode:
      'सत्यापन कोड',

    verifying:
      'सत्यापन सुरू आहे...',

    verify:
      'कोड सत्यापित करा',

    resend:
      'कोड पुन्हा पाठवा',

    seconds:
      'सेकंद',

    newPassword:
      'नवीन पासवर्ड तयार करा',

    newPasswordDescription:
      'तुमच्या ByteHarvest खात्यासाठी नवीन पासवर्ड निवडा.',

    password:
      'नवीन पासवर्ड',

    passwordPlaceholder:
      'किमान 6 अक्षरे',

    confirmPassword:
      'नवीन पासवर्डची पुष्टी करा',

    confirmPlaceholder:
      'पासवर्ड पुन्हा भरा',

    updating:
      'पासवर्ड अपडेट होत आहे...',

    reset:
      'पासवर्ड रीसेट करा',

    successTitle:
      'पासवर्ड रीसेट पूर्ण',

    successDescription:
      'तुमचा पासवर्ड यशस्वीरित्या अपडेट झाला आहे.',

    continue:
      'साइन इन सुरू ठेवा',

    support:
      'शेतकरी सल्ला आणि फील्ड सहाय्य नेटवर्क',

    errors: {
      email:
        'कृपया योग्य ईमेल पत्ता भरा.',

      code:
        'कृपया 5 अंकी सत्यापन कोड भरा.',

      password:
        'पासवर्डमध्ये किमान 6 अक्षरे असणे आवश्यक आहे.',

      match:
        'पासवर्ड जुळत नाहीत.',
    },
  },
};

export const ForgotPasswordPage = () => {
  const { language } = useApp();

  const text =
    translations[language] ||
    translations.en;

  const [email, setEmail] =
    useState('');

  const [step, setStep] =
    useState('email');

  const [otp, setOtp] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const [errorMsg, setErrorMsg] =
    useState('');

  const [successMsg, setSuccessMsg] =
    useState('');

  const [countdown, setCountdown] =
    useState(45);


  const handleSendCode = async (e) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    if (
      !email.trim() ||
      !email.includes('@')
    ) {
      setErrorMsg(
        text.errors.email
      );

      return;
    }

    setIsLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    setIsLoading(false);
    setStep('verify');
    setCountdown(45);
  };


  const handleVerifyCode = async (e) => {
    e.preventDefault();

    setErrorMsg('');

    if (otp.length !== 5) {
      setErrorMsg(
        text.errors.code
      );

      return;
    }

    setIsLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setIsLoading(false);
    setStep('reset');
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setErrorMsg(
        text.errors.password
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setErrorMsg(
        text.errors.match
      );

      return;
    }

    setIsLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    setIsLoading(false);

    setSuccessMsg(
      'Password reset successfully.'
    );

    setStep('success');
  };


  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="w-full max-w-md space-y-6">

        {/* Brand */}
        <div className="text-center space-y-2">

          <div className="brand-icon-box inline-flex items-center justify-center p-2">

            <LuSprout className="w-7 h-7 text-green-600" />

          </div>


          <h1 className="text-3xl font-bold tracking-tight text-(--text-primary)">
            Byte<span className="text-green-600">Harvest</span>
          </h1>


          <p className="text-sm text-(--text-secondary)">
            {text.recover}
          </p>

        </div>


        {/* Card */}
        <div className="card p-6 sm:p-8">

          {/* ==================================================
              EMAIL
          ================================================== */}

          {step === 'email' && (

            <form
              onSubmit={handleSendCode}
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {text.forgotTitle}
                </h2>

                <p className="text-sm text-(--text-secondary)">
                  {text.forgotDescription}
                </p>

              </div>


              {errorMsg && (
                <div className="p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
                  {errorMsg}
                </div>
              )}


              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {text.email}
                </label>

                <div className="relative">

                  <LuMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                  <input
                    type="email"
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


              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2"
              >

                {isLoading ? (

                  <>
                    <LuRefreshCw className="w-5 h-5 animate-spin" />

                    {text.sending}
                  </>

                ) : (

                  <>
                    {text.sendCode}

                    <LuArrowRight className="w-5 h-5" />
                  </>

                )}

              </button>


              <div className="text-center">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline font-medium"
                >

                  <LuArrowLeft className="w-4 h-4" />

                  {text.backToSignIn}

                </Link>

              </div>

            </form>

          )}


          {/* ==================================================
              VERIFY
          ================================================== */}

          {step === 'verify' && (

            <form
              onSubmit={handleVerifyCode}
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <button
                  type="button"
                  onClick={() =>
                    setStep('email')
                  }
                  className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text-primary)"
                >

                  <LuArrowLeft className="w-4 h-4" />

                  {text.changeEmail}

                </button>


                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {text.verifyTitle}
                </h2>


                <p className="text-sm text-(--text-secondary)">

                  {text.verifyDescription}{' '}

                  <span className="font-medium text-(--text-primary)">
                    {email}
                  </span>

                </p>

              </div>


              {errorMsg && (
                <div className="p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
                  {errorMsg}
                </div>
              )}


              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {text.verificationCode}
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(
                        /\D/g,
                        ''
                      )
                    )
                  }
                  placeholder="12345"
                  className="field-input text-center text-xl mono tracking-[0.35em]"
                />

              </div>


              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2"
              >

                {isLoading ? (

                  <>
                    <LuRefreshCw className="w-5 h-5 animate-spin" />

                    {text.verifying}
                  </>

                ) : (

                  <>
                    {text.verify}

                    <LuShieldCheck className="w-5 h-5" />
                  </>

                )}

              </button>


              <div className="text-center text-sm text-(--text-tertiary)">

                {text.resend}{' '}

                <span className="mono">
                  {countdown}
                </span>{' '}

                {text.seconds}

              </div>

            </form>

          )}


          {/* ==================================================
              RESET
          ================================================== */}

          {step === 'reset' && (

            <form
              onSubmit={handleResetPassword}
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {text.newPassword}
                </h2>

                <p className="text-sm text-(--text-secondary)">
                  {text.newPasswordDescription}
                </p>

              </div>


              {errorMsg && (
                <div className="p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
                  {errorMsg}
                </div>
              )}


              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {text.password}
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder={
                    text.passwordPlaceholder
                  }
                  className="field-input text-base"
                />

              </div>


              <div className="space-y-2">

                <label className="block text-sm font-medium text-(--text-secondary)">
                  {text.confirmPassword}
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder={
                    text.confirmPlaceholder
                  }
                  className="field-input text-base"
                />

              </div>


              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary-action w-full min-h-12 py-3 text-base flex items-center justify-center gap-2"
              >

                {isLoading ? (

                  <>
                    <LuRefreshCw className="w-5 h-5 animate-spin" />

                    {text.updating}
                  </>

                ) : (

                  <>
                    {text.reset}

                    <LuCheck className="w-5 h-5" />
                  </>

                )}

              </button>

            </form>

          )}


          {/* ==================================================
              SUCCESS
          ================================================== */}

          {step === 'success' && (

            <div className="text-center space-y-5">

              <div className="flex justify-center">

                <div className="p-3 rounded-full bg-green-50 border border-green-200">

                  <LuCheck className="w-8 h-8 text-green-600" />

                </div>

              </div>


              <div className="space-y-2">

                <h2 className="text-xl font-semibold text-(--text-primary)">
                  {text.successTitle}
                </h2>

                <p className="text-sm text-(--text-secondary)">
                  {text.successDescription}
                </p>

              </div>


              <Link
                to="/login"
                className="btn-primary-action inline-flex items-center justify-center gap-2 px-5 py-3 text-base"
              >

                {text.continue}

                <LuArrowRight className="w-5 h-5" />

              </Link>

            </div>

          )}

        </div>


        {/* Footer */}
        <div className="text-center text-sm text-(--text-tertiary)">
          {text.support}
        </div>

      </div>

    </div>
  );
};

export default ForgotPasswordPage;