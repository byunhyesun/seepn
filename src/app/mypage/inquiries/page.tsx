'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, CheckCircle2, Clock, Edit } from 'lucide-react';

type InquiryCategoryKey =
  | 'service'
  | 'supplier'
  | 'certification'
  | 'payment'
  | 'bug'
  | 'etc';

type InquiryStatus = 'all' | 'answered' | 'pending';

export default function MyInquiriesPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [selectedCategory, setSelectedCategory] = React.useState<'' | InquiryCategoryKey>('');
  const [searchType, setSearchType] = React.useState<'all' | 'title' | 'content'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<InquiryStatus>('all');

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
        pageTitle: '1:1 문의',
        inquiryTypeAll: '전체',
        inquiryTypeService: '서비스 이용 문의',
        inquiryTypeSupplier: '공급사 등록 문의',
        inquiryTypeCertification: '인증마크 발급 문의',
        inquiryTypePayment: '결제/요금 문의',
        inquiryTypeBug: '오류/버그 신고',
        inquiryTypeEtc: '기타 문의',
        searchTypeAll: '전체',
        searchTypeTitle: '제목',
        searchTypeContent: '내용',
        searchPlaceholder: '검색어를 입력하세요',
        searchButton: '검색',
        tabAll: '전체',
        tabAnswered: '답변 완료',
        tabPending: '답변 전',
        writeButton: '문의하기',
        category: '구분',
        title: '제목',
        registrationDate: '등록일',
        answered: '답변여부',
        answeredAt: '답변일시',
        yes: '예',
        no: '아니오',
        empty: '문의 내역이 없습니다.'
      },
      en: {
        pageTitle: '1:1 Inquiries',
        inquiryTypeAll: 'All',
        inquiryTypeService: 'Service',
        inquiryTypeSupplier: 'Supplier Registration',
        inquiryTypeCertification: 'Certification Mark',
        inquiryTypePayment: 'Payment/Pricing',
        inquiryTypeBug: 'Bug Report',
        inquiryTypeEtc: 'Others',
        searchTypeAll: 'All',
        searchTypeTitle: 'Title',
        searchTypeContent: 'Content',
        searchPlaceholder: 'Enter search term',
        searchButton: 'Search',
        tabAll: 'All',
        tabAnswered: 'Answered',
        tabPending: 'Pending',
        writeButton: 'Write Inquiry',
        category: 'Category',
        title: 'Title',
        registrationDate: 'Registered At',
        answered: 'Answered',
        answeredAt: 'Answered At',
        yes: 'Yes',
        no: 'No',
        empty: 'No inquiries.'
      },
      ja: {
        pageTitle: '1:1お問い合わせ',
        inquiryTypeAll: '全体',
        inquiryTypeService: 'サービス利用',
        inquiryTypeSupplier: 'サプライヤー登録',
        inquiryTypeCertification: '認証マーク発給',
        inquiryTypePayment: '決済/料金',
        inquiryTypeBug: '不具合報告',
        inquiryTypeEtc: 'その他',
        searchTypeAll: '全体',
        searchTypeTitle: 'タイトル',
        searchTypeContent: '内容',
        searchPlaceholder: '検索語を入力してください',
        searchButton: '検索',
        tabAll: '全体',
        tabAnswered: '回答済み',
        tabPending: '未回答',
        writeButton: 'お問い合わせ',
        category: '区分',
        title: 'タイトル',
        registrationDate: '登録日',
        answered: '回答有無',
        answeredAt: '回答日時',
        yes: 'はい',
        no: 'いいえ',
        empty: 'お問い合わせ履歴がありません。'
      },
      zh: {
        pageTitle: '1:1 咨询',
        inquiryTypeAll: '全部',
        inquiryTypeService: '服务使用',
        inquiryTypeSupplier: '供应商注册',
        inquiryTypeCertification: '认证标记发放',
        inquiryTypePayment: '支付/费用',
        inquiryTypeBug: '错误/漏洞报告',
        inquiryTypeEtc: '其他',
        searchTypeAll: '全部',
        searchTypeTitle: '标题',
        searchTypeContent: '内容',
        searchPlaceholder: '请输入搜索词',
        searchButton: '搜索',
        tabAll: '全部',
        tabAnswered: '已回复',
        tabPending: '未回复',
        writeButton: '咨询',
        category: '类别',
        title: '标题',
        registrationDate: '发布日期',
        answered: '是否回复',
        answeredAt: '回复时间',
        yes: '是',
        no: '否',
        empty: '没有咨询记录。'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const getCategoryInfo = (category: InquiryCategoryKey) => {
    return {
      service: { label: getText('inquiryTypeService'), color: 'bg-blue-100 text-blue-800 border-blue-200' },
      supplier: { label: getText('inquiryTypeSupplier'), color: 'bg-green-100 text-green-800 border-green-200' },
      certification: { label: getText('inquiryTypeCertification'), color: 'bg-purple-100 text-purple-800 border-purple-200' },
      payment: { label: getText('inquiryTypePayment'), color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      bug: { label: getText('inquiryTypeBug'), color: 'bg-red-100 text-red-800 border-red-200' },
      etc: { label: getText('inquiryTypeEtc'), color: 'bg-gray-100 text-gray-800 border-gray-200' }
    }[category];
  };

  type Inquiry = {
    id: number;
    category: InquiryCategoryKey;
    title: string;
    registrationDate: string; // ISO
    answered: boolean;
    answeredAt?: string; // ISO
    content: string;
    reCount?: number;
  };

  const sampleInquiries: Inquiry[] = React.useMemo(() => [
    {
      id: 101,
      category: 'service',
      title: '로그인 후 마이페이지 접근이 되지 않습니다',
      registrationDate: '2025-01-12T09:10:00',
      answered: true,
      answeredAt: '2025-01-12T15:40:00',
      content: '로그인은 되는데 마이페이지 이동 시 에러가 발생합니다.',
      reCount: 1
    },
    {
      id: 102,
      category: 'supplier',
      title: '공급사 등록 절차가 궁금합니다',
      registrationDate: '2025-01-11T11:30:00',
      answered: false,
      content: '필요한 서류와 심사 기간을 알고 싶습니다.'
    },
    {
      id: 103,
      category: 'payment',
      title: '기업 요금제 결제 실패',
      registrationDate: '2025-01-10T13:05:00',
      answered: true,
      answeredAt: '2025-01-10T17:20:00',
      content: '카드 결제 중 오류가 발생했습니다.'
    },
    {
      id: 104,
      category: 'bug',
      title: '모바일에서 검색 버튼이 동작하지 않음',
      registrationDate: '2025-01-09T08:45:00',
      answered: false,
      content: 'iOS Safari에서 검색 버튼을 눌러도 반응이 없습니다.'
    },
    {
      id: 105,
      category: 'certification',
      title: '인증마크 발급 소요 기간 문의',
      registrationDate: '2025-01-08T10:22:00',
      answered: true,
      answeredAt: '2025-01-08T14:05:00',
      content: '인증 심사 완료 후 발급까지 어느 정도 걸리나요?'
    },
    {
      id: 106,
      category: 'etc',
      title: '기타 문의 드립니다',
      registrationDate: '2025-01-07T16:10:00',
      answered: false,
      content: '기타 사항에 대한 문의입니다.'
    },
    {
      id: 107,
      category: 'etc',
      title: '첨부파일 포함 문의 (미답변)',
      registrationDate: '2025-01-12T18:25:00',
      answered: false,
      content: '참고용 파일을 첨부했습니다. 확인 부탁드립니다.',
      reCount: 1
    }
  ], [currentLanguage]);

  const filteredInquiries = React.useMemo(() => {
    return sampleInquiries.filter((inq) => {
      // Tab filter
      if (activeTab === 'answered' && !inq.answered) return false;
      if (activeTab === 'pending' && inq.answered) return false;

      // Category filter
      if (selectedCategory && inq.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (searchType === 'title') {
          return inq.title.toLowerCase().includes(query);
        } else if (searchType === 'content') {
          return inq.content.toLowerCase().includes(query);
        } else {
          return (
            inq.title.toLowerCase().includes(query) ||
            inq.content.toLowerCase().includes(query)
          );
        }
      }

      return true;
    });
  }, [sampleInquiries, activeTab, selectedCategory, searchType, searchQuery]);

  const formatDate = (iso: string | undefined) => {
    if (!iso) return '-';
    const date = new Date(iso);
    return date.toLocaleString(
      currentLanguage === 'ko' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
    );
  };

  const handleSearch = () => {
    // Filtering is reactive; keep for UX parity
    // eslint-disable-next-line no-console
    console.log('search', { selectedCategory, searchType, searchQuery });
  };

  const handleWrite = () => {
    window.location.href = '/mypage/inquiries/write';
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

          {/* Search Section (hidden on mobile) */}
          <div className="hidden sm:block bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              {/* Inquiry Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">{getText('inquiryTypeAll')}</option>
                <option value="service">{getText('inquiryTypeService')}</option>
                <option value="supplier">{getText('inquiryTypeSupplier')}</option>
                <option value="certification">{getText('inquiryTypeCertification')}</option>
                <option value="payment">{getText('inquiryTypePayment')}</option>
                <option value="bug">{getText('inquiryTypeBug')}</option>
                <option value="etc">{getText('inquiryTypeEtc')}</option>
              </select>

              {/* Search Type + Input */}
              <div className="flex-1 flex gap-2">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">{getText('searchTypeAll')}</option>
                  <option value="title">{getText('searchTypeTitle')}</option>
                  <option value="content">{getText('searchTypeContent')}</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={getText('searchPlaceholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {getText('searchButton')}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs + Write */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full">
              {/* PC Tabs (match evaluations UI) */}
              <div className="hidden md:block border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {([
                    { key: 'all', label: getText('tabAll') },
                    { key: 'answered', label: getText('tabAnswered') },
                    { key: 'pending', label: getText('tabPending') }
                  ] as { key: InquiryStatus; label: string }[]).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === t.key
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </nav>
              </div>
              {/* Mobile Select */}
              <div className="block md:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as InquiryStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">{getText('tabAll')}</option>
                  <option value="answered">{getText('tabAnswered')}</option>
                  <option value="pending">{getText('tabPending')}</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleWrite}
              className="hidden sm:flex px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              {getText('writeButton')}
            </button>
          </div>

          {/* List (board-like UI) */}
          <div className="space-y-4">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <div key={inq.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer" onClick={() => window.location.href = `/mypage/inquiries/${inq.id}`}>
                  {/* Header: category + registration date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border w-auto max-w-max shrink-0 ${getCategoryInfo(inq.category).color}`}>
                        {getCategoryInfo(inq.category).label}
                      </span>
                      {typeof inq.reCount === 'number' && inq.reCount > 0 && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border bg-amber-50 text-amber-800 border-amber-200">
                          재문의({inq.reCount})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{getText('registrationDate')}: {formatDate(inq.registrationDate)}</div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-medium text-gray-900 transition-colors mb-2"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {inq.title}
                  </h3>

                  {/* Answer info */}
                  <div className="mt-1 flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      {inq.answered ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>{getText('answered')}: {getText('yes')}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-600" />
                          <span>{getText('answered')}: {getText('no')}</span>
                        </>
                      )}
                    </div>
                    <div>
                      {getText('answeredAt')}: <span className="text-gray-700">{formatDate(inq.answeredAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">{getText('empty')}</div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Floating Write Button */}
      <button
        onClick={handleWrite}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all flex items-center justify-center z-50"
        aria-label={getText('writeButton')}
      >
        <Edit className="h-6 w-6" />
      </button>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


