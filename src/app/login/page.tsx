'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

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
        pageTitle: '로그인',
        email: '이메일',
        password: '비밀번호',
        enterEmail: '이메일을 입력하세요',
        enterPassword: '비밀번호를 입력하세요',
        forgotPassword: '비밀번호 찾기',
        login: '로그인',
        noAccount: '아직 회원이 아니라면',
        signup: '신규가입',
        required: '이메일과 비밀번호를 입력해주세요.'
      },
      en: {
        pageTitle: 'Sign in',
        email: 'Email',
        password: 'Password',
        enterEmail: 'Enter your email',
        enterPassword: 'Enter your password',
        forgotPassword: 'Forgot password',
        login: 'Log in',
        noAccount: "Don't have an account?",
        signup: 'Sign up',
        required: 'Please enter email and password.'
      },
      ja: {
        pageTitle: 'ログイン',
        email: 'メール',
        password: 'パスワード',
        enterEmail: 'メールアドレスを入力',
        enterPassword: 'パスワードを入力',
        forgotPassword: 'パスワードを忘れた方',
        login: 'ログイン',
        noAccount: 'まだ会員ではありませんか？',
        signup: '新規登録',
        required: 'メールとパスワードを入力してください。'
      },
      zh: {
        pageTitle: '登录',
        email: '邮箱',
        password: '密码',
        enterEmail: '请输入邮箱',
        enterPassword: '请输入密码',
        forgotPassword: '找回密码',
        login: '登录',
        noAccount: '还没有账户？',
        signup: '注册',
        required: '请输入邮箱和密码。'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError(getText('required'));
      return;
    }
    setIsSubmitting(true);
    try {
      // mock API delay
      await new Promise((r) => setTimeout(r, 800));
      setIsLoggedIn(true);
      // redirect after login (mock)
      window.location.href = '/';
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">{getText('password')}</label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700">{getText('forgotPassword')}</Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={getText('enterPassword')}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    aria-label={showPassword ? 'hide password' : 'show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '...' : getText('login')}
              </button>
            </form>
          </div>

          {/* Signup prompt */}
          <div className="text-center mt-6 text-sm text-gray-700">
            {getText('noAccount')}{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">{getText('signup')}</Link>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


