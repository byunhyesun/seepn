'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [email, setEmail] = React.useState('');
  const [sentCode, setSentCode] = React.useState('');
  const [inputCode, setInputCode] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
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
        pageTitle: '비밀번호 찾기',
        email: '가입한 이메일 입력',
        code: '인증번호 입력',
        sendCode: '인증번호 전송',
        verifying: '검증 중...',
        verify: '인증번호 확인',
        sent: '인증번호를 이메일로 전송했습니다.',
        invalidEmail: '올바른 이메일을 입력하세요.',
        enterCode: '전송된 인증번호 6자리를 입력하세요.',
        incorrectCode: '인증번호가 올바르지 않습니다.',
        proceed: '검증이 완료되었습니다. 비밀번호 재설정 화면으로 이동합니다.'
      },
      en: {
        pageTitle: 'Find Password',
        email: 'Enter your registered email',
        code: 'Enter verification code',
        sendCode: 'Send Code',
        verifying: 'Verifying...',
        verify: 'Verify Code',
        sent: 'Verification code sent to your email.',
        invalidEmail: 'Please enter a valid email.',
        enterCode: 'Enter the 6-digit code you received.',
        incorrectCode: 'Incorrect verification code.',
        proceed: 'Verification completed. Redirecting to reset page.'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSendCode = async () => {
    setMessage('');
    if (!validateEmail(email)) {
      setMessage(getText('invalidEmail'));
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 600));
    // Mock 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setMessage(getText('sent'));
    setIsSending(false);
  };

  const handleVerify = async () => {
    setMessage('');
    if (!inputCode || inputCode.length !== 6) {
      setMessage(getText('enterCode'));
      return;
    }
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 500));
    if (inputCode !== sentCode) {
      setMessage(getText('incorrectCode'));
      setIsVerifying(false);
      return;
    }
    setMessage(getText('proceed'));
    setTimeout(() => {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
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

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getText('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSending || !validateEmail(email)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {getText('sendCode')}
                </button>
              </div>
            </div>

            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getText('code')}</label>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-widest"
              />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying || inputCode.length !== 6 || !sentCode}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isVerifying ? getText('verifying') : getText('verify')}
                </button>
              </div>
            </div>

            {message && <div className="text-sm text-gray-700">{message}</div>}
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


