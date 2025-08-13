'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_name || '대한민국');
      } catch (error) {
        setUserCountry('대한민국');
      }
    };
    getUserCountry();
  }, []);

  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '회원가입',
        email: '이메일',
        password: '비밀번호',
        confirm: '비밀번호 재입력',
        fullName: '성명',
        phone: '휴대폰 번호',
        enterEmail: '이메일을 입력하세요',
        enterPassword: '비밀번호를 입력하세요',
        reenterPassword: '비밀번호를 다시 입력하세요',
        enterFullName: '성명을 입력하세요',
        enterPhone: '휴대폰 번호를 입력하세요 (예: 010-1234-5678)',
        guideTitle: '비밀번호 설정 안내',
        guide1: '- 최소 8자리 최대 20자리',
        guide2: '- 영문 대/소문자, 숫자, 특수문자 사용',
        guide3: '- 연속된 숫자 및 문자는 안됨',
        submit: '가입하기',
        cancel: '취소',
        required: '모든 항목을 입력해주세요.',
        invalidEmail: '올바른 이메일을 입력해주세요.',
        mismatch: '비밀번호가 일치하지 않습니다.',
        invalidPhone: '올바른 휴대폰 번호 형식을 입력해주세요.',
        success: '가입이 완료되었습니다. 로그인 화면으로 이동합니다.',
        validationPolicy: '비밀번호 정책을 만족하지 않습니다.'
      },
      en: {
        pageTitle: 'Sign Up',
        email: 'Email',
        password: 'Password',
        confirm: 'Confirm Password',
        fullName: 'Full Name',
        phone: 'Mobile Number',
        enterEmail: 'Enter your email',
        enterPassword: 'Enter your password',
        reenterPassword: 'Re-enter your password',
        enterFullName: 'Enter your name',
        enterPhone: 'Enter mobile number (e.g., 010-1234-5678)',
        guideTitle: 'Password policy',
        guide1: '- 8 to 20 characters',
        guide2: '- Use upper/lower letters, numbers, special chars',
        guide3: '- No sequential letters or digits',
        submit: 'Create Account',
        cancel: 'Cancel',
        required: 'Please fill out all fields.',
        invalidEmail: 'Please enter a valid email.',
        mismatch: 'Passwords do not match.',
        invalidPhone: 'Please enter a valid phone number format.',
        success: 'Sign up complete. Redirecting to login.',
        validationPolicy: 'Password does not meet the policy.'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value: string) => /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/.test(value);

  // Password policy helpers
  const containsRequiredTypes = (pwd: string): boolean => {
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    return hasLower && hasUpper && hasDigit && hasSpecial;
  };
  const hasSequentialRun = (pwd: string): boolean => {
    if (pwd.length < 3) return false;
    const toCode = (c: string) => c.charCodeAt(0);
    for (let i = 0; i <= pwd.length - 3; i++) {
      const a = pwd[i], b = pwd[i + 1], c = pwd[i + 2];
      if (/^[A-Za-z]{3}$/.test(a + b + c)) {
        const ca = toCode(a), cb = toCode(b), cc = toCode(c);
        if (cb - ca === 1 && cc - cb === 1) return true;
      }
      if (/^[0-9]{3}$/.test(a + b + c)) {
        const ca = toCode(a), cb = toCode(b), cc = toCode(c);
        if (cb - ca === 1 && cc - cb === 1) return true;
      }
    }
    return false;
  };
  const isValidPassword = (pwd: string) => pwd.length >= 8 && pwd.length <= 20 && containsRequiredTypes(pwd) && !hasSequentialRun(pwd);

  // Visual guide state
  const ruleLengthOk = password.length >= 8 && password.length <= 20;
  const ruleTypesOk = containsRequiredTypes(password);
  const ruleNoSequentialOk = password.length === 0 ? false : !hasSequentialRun(password);
  const guideClass = (ok: boolean) => (password.length === 0 ? 'text-gray-700' : ok ? 'text-green-600' : 'text-red-600');

  const canSubmit = !!email && !!password && !!confirm && !!fullName && !!phone && isValidPassword(password) && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email || !password || !confirm || !fullName || !phone) {
      setError(getText('required'));
      return;
    }
    if (!validateEmail(email)) {
      setError(getText('invalidEmail'));
      return;
    }
    if (!isValidPassword(password)) {
      setError(getText('validationPolicy'));
      return;
    }
    if (password !== confirm) {
      setError(getText('mismatch'));
      return;
    }
    if (!validatePhone(phone)) {
      setError(getText('invalidPhone'));
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setMessage(getText('success'));
    setTimeout(() => {
      window.location.href = '/login';
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        isBannerVisible={isBannerVisible}
        setIsBannerVisible={setIsBannerVisible}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main className="flex-1" style={{ paddingTop: isBannerVisible ? '112px' : '64px' }}>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{getText('email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getText('enterEmail')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">{getText('password')}</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={getText('enterPassword')}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    aria-label={showPwd ? 'hide password' : 'show password'}
                  >
                    {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                 <ul className="mt-2 text-xs space-y-1">
                   <li className={guideClass(ruleLengthOk)}>{getText('guide1')}</li>
                   <li className={guideClass(ruleTypesOk)}>{getText('guide2')}</li>
                   <li className={guideClass(ruleNoSequentialOk)}>{getText('guide3')}</li>
                 </ul>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">{getText('confirm')}</label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirmPwd ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder={getText('reenterPassword')}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    aria-label={showConfirmPwd ? 'hide password' : 'show password'}
                  >
                    {showConfirmPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirm && password !== confirm && (
                  <p className="mt-2 text-sm text-red-600">{getText('mismatch')}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">{getText('fullName')}</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={getText('enterFullName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{getText('phone')}</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={getText('enterPhone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}
              {message && <div className="text-sm text-green-600">{message}</div>}

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { window.location.href = '/'; }}
                  className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {getText('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : getText('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


