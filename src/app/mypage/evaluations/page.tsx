'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Star, ExternalLink, Calendar } from 'lucide-react';

type EvalStatus = 'all' | 'in_progress' | 'completed' | 'scheduled';

export default function MyEvaluationsPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [activeTab, setActiveTab] = React.useState<EvalStatus>('all');

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
        pageTitle: '평가 공급사',
        tabAll: '전체',
        tabInProgress: '평가 진행',
        tabCompleted: '평가 완료',
        tabScheduled: '평가 예정',
        evaluate: '평가하기',
        noData: '표시할 공급사가 없습니다.',
        period: '평가 기간',
      },
      en: {
        pageTitle: 'Evaluated Suppliers',
        tabAll: 'All',
        tabInProgress: 'In Progress',
        tabCompleted: 'Completed',
        tabScheduled: 'Scheduled',
        evaluate: 'Evaluate',
        noData: 'No suppliers to display.',
        period: 'Evaluation Period',
      },
      ja: {
        pageTitle: '評価サプライヤー',
        tabAll: '全体',
        tabInProgress: '評価進行',
        tabCompleted: '評価完了',
        tabScheduled: '評価予定',
        evaluate: '評価する',
        noData: '表示するサプライヤーがありません。',
        period: '評価期間',
      },
      zh: {
        pageTitle: '评价供应商',
        tabAll: '全部',
        tabInProgress: '进行中',
        tabCompleted: '已完成',
        tabScheduled: '预定',
        evaluate: '去评价',
        noData: '没有可显示的供应商。',
        period: '评价期间',
      },
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const [suppliers, setSuppliers] = React.useState(
    [
      {
        id: 1,
        name: '(주)글로벌테크',
        categoryDepth3: '시스템 개발',
        location: '서울특별시 강남구',
        description: '글로벌 IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.',
        rating: 4.7,
        tags: ['소프트웨어', 'IT컨설팅'],
        website: 'https://www.globaltech.co.kr',
        status: 'in_progress' as EvalStatus,
        startDate: '2025-01-10',
        endDate: '2025-01-20',
      },
      {
        id: 2,
        name: '프리미엄 제조',
        categoryDepth3: '정밀 부품 제조',
        location: '경기도 수원시',
        description: '정밀 부품 제조 전문 업체로 최고 품질의 제품을 공급합니다.',
        rating: 4.9,
        tags: ['정밀부품', '품질관리'],
        website: 'https://www.premiummfg.co.kr',
        status: 'completed' as EvalStatus,
        startDate: '2024-12-01',
        endDate: '2024-12-10',
      },
      {
        id: 3,
        name: '마케팅엑셀런스',
        categoryDepth3: '디지털 마케팅',
        location: '서울특별시 서초구',
        description: '디지털 마케팅 전문 에이전시로 브랜드 성장을 이끌어갑니다.',
        rating: 4.6,
        tags: ['브랜딩', 'SNS마케팅'],
        status: 'scheduled' as EvalStatus,
        startDate: '2025-02-01',
        endDate: '2025-02-15',
      },
      {
        id: 4,
        name: '스마트로지스틱스',
        categoryDepth3: '종합 물류 서비스',
        location: '인천광역시 연수구',
        description: '스마트 물류 시스템으로 최적화된 서비스를 제공하는 전문 기업입니다.',
        rating: 4.5,
        tags: ['물류', '배송'],
        status: 'in_progress' as EvalStatus,
        startDate: '2025-01-05',
        endDate: '2025-01-25',
      },
    ]
  );

  const filtered = React.useMemo(() => {
    if (activeTab === 'all') return suppliers;
    return suppliers.filter((s) => s.status === activeTab);
  }, [suppliers, activeTab]);

  const handleEvaluate = (id: number) => {
    console.log('Evaluate supplier:', id);
    // TODO: route to evaluation form or open a modal
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* Tab Menu */}
          <div className="mb-6">
            {/* PC Tabs */}
            <div className="hidden md:block border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'all', label: getText('tabAll') },
                  { key: 'in_progress', label: getText('tabInProgress') },
                  { key: 'completed', label: getText('tabCompleted') },
                  { key: 'scheduled', label: getText('tabScheduled') },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as EvalStatus)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            {/* Mobile Select */}
            <div className="block md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as EvalStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">{getText('tabAll')}</option>
                <option value="in_progress">{getText('tabInProgress')}</option>
                <option value="completed">{getText('tabCompleted')}</option>
                <option value="scheduled">{getText('tabScheduled')}</option>
              </select>
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Icon - PC Only */}
                    <div className="hidden md:flex w-16 h-16 bg-gray-200 rounded-lg items-center justify-center flex-shrink-0">
                      <div className="text-gray-400 text-2xl">🏢</div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg truncate">{s.name}</h3>
                          {s.website && (
                            <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="홈페이지 방문">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{s.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div className="text-sm text-gray-600">{s.categoryDepth3}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {s.location}
                        </div>
                      </div>
                      {/* Evaluation Period */}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{getText('period')}: {s.startDate} ~ {s.endDate}</span>
                      </div>
                      {/* Actions */}
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => handleEvaluate(s.id)}
                          disabled={s.status === 'completed' || s.status === 'scheduled'}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            s.status === 'completed' || s.status === 'scheduled'
                              ? 'bg-gray-300 text-white cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {getText('evaluate')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{getText('noData')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


