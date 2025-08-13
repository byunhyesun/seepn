'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, X } from 'lucide-react';

export default function WithdrawalPage() {
  const router = useRouter();

  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [agreeChecked, setAgreeChecked] = React.useState(false);
  const [reason, setReason] = React.useState('');
  const [etcReason, setEtcReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isReasonModalOpen, setIsReasonModalOpen] = React.useState(false);

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

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getReasonLabel = (val: string) => {
    if (!val) return getText('reasonPlaceholder');
    if (val === 'r1') return getText('r1');
    if (val === 'r2') return getText('r2');
    if (val === 'r3') return getText('r3');
    return getText('rEtc');
  };

  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '회원탈퇴',
        guideTitle: '아쉽지만, 시픈을 떠나시려는 이유를 듣고 싶어요.',
        guideSub: '탈퇴 전 아래 내용을 꼭 확인해주세요.',
        guide1: '탈퇴 시 모든 작성한 리뷰/평가/문의 내역은 삭제됩니다.',
        guide2: '탈퇴 후에는 같은 아이디로 재가입이 제한될 수 있습니다.',
        guide3: '남아있는 프리미엄/광고 이용권은 자동 소멸됩니다.',
        guide4: '거래 중이던 공급사/발주처와의 연결 정보는 더 이상 확인할 수 없습니다.',
        guide5: '탈퇴 후 동일한 계정으로 가입은 언제든 가능합니다.',
        agreeLabel: '위 내용을 모두 확인하였습니다.',
        reasonLabel: '탈퇴 사유',
        reasonPlaceholder: '탈퇴 사유를 선택하세요',
        r1: '필요한 공급사를 찾을 수 없었어요',
        r2: '서비스 사용 방법이 어려웠어요',
        r3: '공급사 등록이 어렵거나 불편했어요',
        rEtc: '기타 (직접 입력)',
        etcPlaceholder: '기타 사유를 입력해주세요 (선택)',
        cancel: '취소',
        submit: '탈퇴하기',
        submitting: '처리 중...',
        success: '회원탈퇴가 완료되었습니다.',
        error: '처리 중 오류가 발생했습니다. 다시 시도해주세요.'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const isSubmitDisabled = !agreeChecked || !reason || isSubmitting;

  const handleCancel = () => {
    router.push('/mypage');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitStatus('success');
      // 후처리: 홈으로 이동
      setTimeout(() => router.push('/'), 800);
    } catch (err) {
      setSubmitStatus('error');
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* Guide */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <p className="text-lg font-medium text-gray-900 mb-2">{getText('guideTitle')}</p>
            <p className="text-sm text-gray-700 mb-4">{getText('guideSub')}</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>{getText('guide1')}</li>
              <li>{getText('guide2')}</li>
              <li>{getText('guide3')}</li>
              <li>{getText('guide4')}</li>
              <li>{getText('guide5')}</li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <input
                id="agree"
                type="checkbox"
                checked={agreeChecked}
                onChange={(e) => setAgreeChecked(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-800 select-none">{getText('agreeLabel')}</label>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Reason select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getText('reasonLabel')}</label>
                {/* Desktop select */}
                <div className="hidden md:block">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">{getText('reasonPlaceholder')}</option>
                    <option value="r1">{getText('r1')}</option>
                    <option value="r2">{getText('r2')}</option>
                    <option value="r3">{getText('r3')}</option>
                    <option value="etc">{getText('rEtc')}</option>
                  </select>
                </div>
                {/* Mobile trigger */}
                <div className="block md:hidden">
                  <button
                    type="button"
                    onClick={() => setIsReasonModalOpen(true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between"
                  >
                    <span>{getReasonLabel(reason)}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Etc reason (optional) */}
              {reason === 'etc' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getText('etcPlaceholder')}</label>
                  <textarea
                    value={etcReason}
                    onChange={(e) => setEtcReason(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder={getText('etcPlaceholder')}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="pt-4 flex flex-row sm:flex-row gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors no-underline disabled:opacity-50 bg-transparent p-0"
                >
                  {getText('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="w-auto px-6 sm:px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? getText('submitting') : getText('submit')}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">{getText('success')}</div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">{getText('error')}</div>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Mobile Reason Modal */}
      {isMobile && isReasonModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsReasonModalOpen(false)}
          />
          <div className="fixed inset-x-4 top-28 bottom-28 bg-white rounded-lg shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">탈퇴 사유 선택</h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg" onClick={() => setIsReasonModalOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[
                { value: '', label: getText('reasonPlaceholder') },
                { value: 'r1', label: getText('r1') },
                { value: 'r2', label: getText('r2') },
                { value: 'r3', label: getText('r3') },
                { value: 'etc', label: getText('rEtc') },
              ].map((opt) => (
                <button
                  key={opt.value || 'all'}
                  onClick={() => { setReason(opt.value); setIsReasonModalOpen(false); }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg ${reason === opt.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


