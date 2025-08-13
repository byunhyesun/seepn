'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Star, ExternalLink, Calendar, X, Heart, ThumbsUp, ChevronDown } from 'lucide-react';

type EvalStatus = 'all' | 'in_progress' | 'completed' | 'scheduled';

export default function MyEvaluationsPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const searchParams = useSearchParams();
  const initialTab = (searchParams?.get('tab') as EvalStatus) || 'all';
  const [activeTab, setActiveTab] = React.useState<EvalStatus>(initialTab);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTabModalOpen, setIsTabModalOpen] = React.useState(false);
  const [isEvalOpen, setIsEvalOpen] = React.useState(false);
  const [evalTargetId, setEvalTargetId] = React.useState<number | null>(null);
  const [purchaseItem, setPurchaseItem] = React.useState('');
  const [ratings, setRatings] = React.useState<[number, number, number, number, number]>([0, 0, 0, 0, 0]);
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        evalTitle: '공급사 평가',
        supplier: '공급사',
        category: '카테고리',
        purchaseItemLabel: '구매한 품목',
        ratingGuide: '평가항목 (별점 선택)',
        q1: '견적 요청, 문의 등에 대한 답변 응답은 적절한가?',
        q2: '약속된 일정에 맞게 납품이 되었는가?',
        q3: '제품/서비스의 품질은 전반적으로 만족한가?',
        q4: '동일 업종/조건 대비 가격은 적절한가?',
        q5: '재거래 의사는 있는가?',
        optionalComment: '기타 의견(선택)',
        cancel: '취소',
        submit: '제출',
        submitting: '제출 중...'
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
        evalTitle: 'Supplier Evaluation',
        supplier: 'Supplier',
        category: 'Category',
        purchaseItemLabel: 'Purchased Item',
        ratingGuide: 'Rating Items (stars)',
        q1: 'Was the response to inquiries/quotes appropriate?',
        q2: 'Was delivery on the promised schedule?',
        q3: 'Are you satisfied with overall quality?',
        q4: 'Is the price fair compared to peers?',
        q5: 'Would you transact again?',
        optionalComment: 'Additional comments (optional)',
        cancel: 'Cancel',
        submit: 'Submit',
        submitting: 'Submitting...'
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
        evalTitle: 'サプライヤー評価',
        supplier: 'サプライヤー',
        category: 'カテゴリ',
        purchaseItemLabel: '購入品目',
        ratingGuide: '評価項目（星）',
        q1: '見積依頼・問い合わせへの回答は適切か？',
        q2: '約束した日程どおりに納品されたか？',
        q3: '製品/サービスの品質に満足しているか？',
        q4: '同業・同条件と比べて価格は適切か？',
        q5: '再取引の意思はあるか？',
        optionalComment: 'その他意見（任意）',
        cancel: 'キャンセル',
        submit: '提出',
        submitting: '送信中...'
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
        evalTitle: '供应商评价',
        supplier: '供应商',
        category: '品类',
        purchaseItemLabel: '购买项目',
        ratingGuide: '评价项目（星）',
        q1: '对报价/咨询的回复是否得当？',
        q2: '是否按约定时间交付？',
        q3: '对产品/服务质量是否总体满意？',
        q4: '与同业/同条件相比价格是否合适？',
        q5: '是否有再次合作意向？',
        optionalComment: '其他意见（可选）',
        cancel: '取消',
        submit: '提交',
        submitting: '提交中...'
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

  const evalTarget = React.useMemo(() => suppliers.find((s) => s.id === evalTargetId) || null, [evalTargetId, suppliers]);

  const filtered = React.useMemo(() => {
    if (activeTab === 'all') return suppliers;
    return suppliers.filter((s) => s.status === activeTab);
  }, [suppliers, activeTab]);

  // Mock counters for likes and favorites
  const getLikesCount = (supplier: { id: number }) => (supplier.id % 100) + 10;
  const getFavoritesCount = (supplier: { id: number }) => (supplier.id % 50) + 5;

  const handleEvaluate = (id: number) => {
    setEvalTargetId(id);
    setIsEvalOpen(true);
  };

  const handleSubmitEval = async () => {
    if (!evalTargetId) return;
    setIsSubmitting(true);
    try {
      // Simulate API
      await new Promise((r) => setTimeout(r, 800));
      // Reset and close
      setPurchaseItem('');
      setRatings([0, 0, 0, 0, 0]);
      setComment('');
      setIsEvalOpen(false);
      setEvalTargetId(null);
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
            {/* Mobile Tab Menu as layer popup trigger */}
            <div className="block md:hidden">
              <button
                type="button"
                onClick={() => setIsTabModalOpen(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between"
              >
                <span>
                  {(
                    [
                      { key: 'all', label: getText('tabAll') },
                      { key: 'in_progress', label: getText('tabInProgress') },
                      { key: 'completed', label: getText('tabCompleted') },
                      { key: 'scheduled', label: getText('tabScheduled') },
                    ] as const
                  ).find(t => t.key === activeTab)?.label}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          {/* Mobile Tab Selection Modal */}
          {isMobile && isTabModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setIsTabModalOpen(false)}
              />
              <div className="fixed inset-x-4 top-28 bottom-28 bg-white rounded-lg shadow-xl z-50 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">탭 선택</h3>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                    onClick={() => setIsTabModalOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {([
                    { key: 'all', label: getText('tabAll') },
                    { key: 'in_progress', label: getText('tabInProgress') },
                    { key: 'completed', label: getText('tabCompleted') },
                    { key: 'scheduled', label: getText('tabScheduled') },
                  ] as const).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key as EvalStatus);
                        setIsTabModalOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg ${
                        activeTab === tab.key ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
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
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div className="text-sm text-gray-600">{s.categoryDepth3}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {s.location}
                        </div>
                      </div>
                      {/* Description above stats & evaluation period */}
                      {s.description && (
                        <div className="text-sm text-gray-700 mb-2">{s.description}</div>
                      )}
                      {/* Stats above evaluation period: rating, favorites, likes */}
                      <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                          <span>{s.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-red-500 mr-1" />
                          <span>{getFavoritesCount(s)} </span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-blue-500 mr-1" />
                          <span>{getLikesCount(s)}</span>
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
      {/* Evaluation Modal */}
      {isEvalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => !isSubmitting && setIsEvalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-4 top-16 bottom-16 bg-white rounded-lg shadow-xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{getText('evalTitle')}</h2>
              <button
                onClick={() => !isSubmitting && setIsEvalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {/* Supplier Summary */}
                {evalTarget && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-700"><span className="font-medium">{getText('supplier')}:</span> {evalTarget.name}</div>
                    <div className="text-sm text-gray-700 mt-1"><span className="font-medium">{getText('category')}:</span> {evalTarget.categoryDepth3}</div>
                  </div>
                )}

                {/* Purchased Item */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getText('purchaseItemLabel')}</label>
                  <input
                    type="text"
                    value={purchaseItem}
                    onChange={(e) => setPurchaseItem(e.target.value)}
                    placeholder="예: 정밀 부품, 소프트웨어 라이선스"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ratings */}
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-3">{getText('ratingGuide')}</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{getText('q1')}</div>
                      <StarRating value={ratings[0]} onChange={(v) => setRatings([v, ratings[1], ratings[2], ratings[3], ratings[4]])} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{getText('q2')}</div>
                      <StarRating value={ratings[1]} onChange={(v) => setRatings([ratings[0], v, ratings[2], ratings[3], ratings[4]])} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{getText('q3')}</div>
                      <StarRating value={ratings[2]} onChange={(v) => setRatings([ratings[0], ratings[1], v, ratings[3], ratings[4]])} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{getText('q4')}</div>
                      <StarRating value={ratings[3]} onChange={(v) => setRatings([ratings[0], ratings[1], ratings[2], v, ratings[4]])} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{getText('q5')}</div>
                      <StarRating value={ratings[4]} onChange={(v) => setRatings([ratings[0], ratings[1], ratings[2], ratings[3], v])} />
                    </div>
                  </div>
                </div>

                {/* Optional Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getText('optionalComment')}</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="기타 의견을 입력하세요 (선택)"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEvalOpen(false)}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  {getText('cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitEval}
                  disabled={isSubmitting || !purchaseItem.trim() || ratings.some((r) => r === 0)}
                  className="px-6 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? getText('submitting') : getText('submit')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}

// Inline star rating component
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`p-1 ${v <= value ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
          aria-label={`rate ${v}`}
        >
          <Star className={`h-5 w-5 ${v <= value ? 'fill-current' : ''}`} />
        </button>
      ))}
    </div>
  );
}


