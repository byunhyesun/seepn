'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

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
  const isValid = (pwd: string) => pwd.length >= 8 && pwd.length <= 20 && containsRequiredTypes(pwd) && !hasSequentialRun(pwd);

  const ruleLengthOk = password.length >= 8 && password.length <= 20;
  const ruleTypesOk = containsRequiredTypes(password);
  const ruleNoSequentialOk = password.length === 0 ? false : !hasSequentialRun(password);
  const guideClass = (ok: boolean) => (password.length === 0 ? 'text-gray-700' : ok ? 'text-green-600' : 'text-red-600');

  const canSubmit = password.trim() && confirm.trim() && isValid(password) && password === confirm && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!canSubmit) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    router.push('/login');
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
            <h1 className="text-3xl font-bold text-gray-900">신규 비밀번호 설정</h1>
            {email && <p className="text-sm text-gray-600 mt-1">계정: {email}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 space-y-5 lg:col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 재입력</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {confirm && password !== confirm && (
                  <p className="mt-2 text-sm text-red-600">새 비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? '...' : '변경하기'}
                </button>
              </div>
              {message && <div className="text-sm text-gray-700">{message}</div>}
            </form>

            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">비밀번호 설정 안내</h2>
              <ul className="space-y-2 text-sm">
                <li className={guideClass(ruleLengthOk)}>- 최소 8자리 최대 20자리</li>
                <li className={guideClass(ruleTypesOk)}>- 영문 대/소문자, 숫자, 특수문자 사용</li>
                <li className={guideClass(ruleNoSequentialOk)}>- 연속된 숫자 및 문자는 안됨</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


