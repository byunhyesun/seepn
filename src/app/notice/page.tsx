'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Paperclip, ChevronLeft, Eye } from 'lucide-react';

function NoticeContent() {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const noticeId = searchParams.get('id');

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch user country
  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryNames: {[key: string]: string} = {
          'KR': '대한민국',
          'US': '미국',
          'JP': '일본',
          'CN': '중국',
          'GB': '영국',
          'DE': '독일',
          'FR': '프랑스'
        };
        setUserCountry(countryNames[data.country_code] || data.country_name || '대한민국');
      } catch (error) {
        console.error('Failed to fetch user country:', error);
        setUserCountry('대한민국');
      }
    };

    fetchUserCountry();
  }, []);

  // Text translations
  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '공지사항',
        pageDescription: '중요한 공지사항과 업데이트 소식을 확인하세요.',
        backToList: '목록으로',
        // Notice categories
        urgent: '긴급',
        general: '일반',
        maintenance: '점검',
        event: '이벤트',
        // Notice list
        title: '제목',
        category: '구분',
        registrationDate: '등록일',
        hasAttachment: '첨부파일 있음',
        noAttachment: '첨부파일 없음',
        viewCount: '조회수',
        // Notice detail
        content: '내용',
        attachments: '첨부파일',
        downloadFile: '파일 다운로드',
        // Empty state
        noNotices: '등록된 공지사항이 없습니다.',
        // Sample data
        notice1Title: '시스템 정기 점검 안내',
        notice1Content: '안녕하세요. SEEPN입니다.\n\n시스템 안정성 향상을 위한 정기 점검을 실시합니다.\n\n점검 일시: 2025년 1월 15일(수) 02:00 ~ 06:00\n점검 내용: 서버 업그레이드 및 보안 패치\n\n점검 시간 동안 서비스 이용이 제한될 수 있습니다.\n이용에 불편을 드려 죄송합니다.\n\n감사합니다.',
        notice2Title: '새로운 공급사 등록 이벤트',
        notice2Content: '새로운 공급사 등록 이벤트를 진행합니다!\n\n이벤트 기간: 2025년 1월 1일 ~ 1월 31일\n혜택: 첫 달 수수료 50% 할인\n\n자세한 내용은 고객센터로 문의해주세요.\n\n많은 참여 부탁드립니다.',
        notice3Title: '개인정보처리방침 개정 안내',
        notice3Content: '개인정보처리방침이 개정되었습니다.\n\n시행일: 2025년 1월 1일\n주요 변경사항:\n- 개인정보 보유기간 명시\n- 제3자 제공 범위 구체화\n- 정보주체 권리 강화\n\n자세한 내용은 개인정보처리방침 페이지를 확인해주세요.',
        notice4Title: '서비스 이용약관 변경 안내',
        notice4Content: '서비스 이용약관이 변경됩니다.\n\n적용일: 2025년 1월 10일\n주요 변경사항:\n- 서비스 범위 확대\n- 이용 제한 사유 명확화\n- 분쟁 해결 절차 개선\n\n변경된 약관은 웹사이트에서 확인하실 수 있습니다.'
      },
      en: {
        pageTitle: 'Notice',
        pageDescription: 'Check important notices and update news.',
        backToList: 'Back to List',
        // Notice categories
        urgent: 'Urgent',
        general: 'General',
        maintenance: 'Maintenance',
        event: 'Event',
        // Notice list
        title: 'Title',
        category: 'Category',
        registrationDate: 'Registration Date',
        hasAttachment: 'Has Attachment',
        noAttachment: 'No Attachment',
        viewCount: 'Views',
        // Notice detail
        content: 'Content',
        attachments: 'Attachments',
        downloadFile: 'Download File',
        // Empty state
        noNotices: 'No notices registered.',
        // Sample data
        notice1Title: 'System Regular Maintenance Notice',
        notice1Content: 'Hello. This is SEEPN.\n\nWe will conduct regular maintenance to improve system stability.\n\nMaintenance Time: January 15, 2025 (Wed) 02:00 ~ 06:00\nMaintenance Content: Server upgrade and security patches\n\nService usage may be limited during maintenance.\nWe apologize for any inconvenience.\n\nThank you.',
        notice2Title: 'New Supplier Registration Event',
        notice2Content: 'We are running a new supplier registration event!\n\nEvent Period: January 1, 2025 ~ January 31, 2025\nBenefit: 50% discount on first month fee\n\nFor more details, please contact customer service.\n\nWe look forward to your participation.',
        notice3Title: 'Privacy Policy Revision Notice',
        notice3Content: 'The privacy policy has been revised.\n\nEffective Date: January 1, 2025\nMain Changes:\n- Specification of personal information retention period\n- Specification of third-party provision scope\n- Strengthening of data subject rights\n\nPlease check the privacy policy page for details.',
        notice4Title: 'Terms of Service Change Notice',
        notice4Content: 'The terms of service will be changed.\n\nApplication Date: January 10, 2025\nMain Changes:\n- Expansion of service scope\n- Clarification of usage restriction reasons\n- Improvement of dispute resolution procedures\n\nYou can check the changed terms on the website.'
      },
      ja: {
        pageTitle: 'お知らせ',
        pageDescription: '重要なお知らせとアップデート情報をご確認ください。',
        backToList: 'リストに戻る',
        // Notice categories
        urgent: '緊急',
        general: '一般',
        maintenance: '点検',
        event: 'イベント',
        // Notice list
        title: 'タイトル',
        category: '区分',
        registrationDate: '登録日',
        hasAttachment: '添付ファイルあり',
        noAttachment: '添付ファイルなし',
        viewCount: '閲覧数',
        // Notice detail
        content: '内容',
        attachments: '添付ファイル',
        downloadFile: 'ファイルダウンロード',
        // Empty state
        noNotices: '登録されたお知らせがありません。',
        // Sample data
        notice1Title: 'システム定期点検のご案内',
        notice1Content: 'こんにちは。SEEPNです。\n\nシステム安定性向上のための定期点検を実施します。\n\n点検日時：2025年1月15日（水）02:00～06:00\n点検内容：サーバーアップグレードおよびセキュリティパッチ\n\n点検時間中はサービスの利用が制限される場合があります。\nご利用の皆様にはご迷惑をおかけいたします。\n\nありがとうございます。',
        notice2Title: '新規サプライヤー登録イベント',
        notice2Content: '新規サプライヤー登録イベントを実施中です！\n\nイベント期間：2025年1月1日～1月31日\n特典：初月手数料50％割引\n\n詳細についてはカスタマーサービスまでお問い合わせください。\n\n多くのご参加をお待ちしております。',
        notice3Title: 'プライバシーポリシー改定のご案内',
        notice3Content: 'プライバシーポリシーが改定されました。\n\n施行日：2025年1月1日\n主な変更事項：\n- 個人情報保有期間の明示\n- 第三者提供範囲の具体化\n- 情報主体の権利強化\n\n詳細についてはプライバシーポリシーページをご確認ください。',
        notice4Title: 'サービス利用規約変更のご案内',
        notice4Content: 'サービス利用規約が変更されます。\n\n適用日：2025年1月10日\n主な変更事項：\n- サービス範囲の拡大\n- 利用制限事由の明確化\n- 紛争解決手続きの改善\n\n変更された規約はウェブサイトでご確認いただけます。'
      },
      zh: {
        pageTitle: '公告',
        pageDescription: '查看重要公告和更新消息。',
        backToList: '返回列表',
        // Notice categories
        urgent: '紧急',
        general: '一般',
        maintenance: '维护',
        event: '活动',
        // Notice list
        title: '标题',
        category: '类别',
        registrationDate: '注册日期',
        hasAttachment: '有附件',
        noAttachment: '无附件',
        viewCount: '查看次数',
        // Notice detail
        content: '内容',
        attachments: '附件',
        downloadFile: '下载文件',
        // Empty state
        noNotices: '没有注册的公告。',
        // Sample data
        notice1Title: '系统定期维护通知',
        notice1Content: '您好。这里是SEEPN。\n\n我们将进行定期维护以提高系统稳定性。\n\n维护时间：2025年1月15日（周三）02:00～06:00\n维护内容：服务器升级和安全补丁\n\n维护期间服务使用可能受到限制。\n给您带来不便，我们深表歉意。\n\n谢谢。',
        notice2Title: '新供应商注册活动',
        notice2Content: '我们正在举办新供应商注册活动！\n\n活动期间：2025年1月1日～1月31日\n优惠：首月手续费50％折扣\n\n详细信息请联系客服。\n\n期待您的参与。',
        notice3Title: '隐私政策修订通知',
        notice3Content: '隐私政策已修订。\n\n生效日期：2025年1月1日\n主要变更：\n- 明确个人信息保留期间\n- 具体化第三方提供范围\n- 加强信息主体权利\n\n详细信息请查看隐私政策页面。',
        notice4Title: '服务条款变更通知',
        notice4Content: '服务条款将发生变更。\n\n适用日期：2025年1月10日\n主要变更：\n- 扩大服务范围\n- 明确使用限制事由\n- 改进争议解决程序\n\n变更后的条款可在网站上查看。'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Sample notice data
  const sampleNotices = [
    {
      id: 1,
      category: 'maintenance',
      title: getText('notice1Title'),
      content: getText('notice1Content'),
      registrationDate: '2025-01-10',
      viewCount: 1250,
      hasAttachment: true,
      attachments: [
        { name: 'maintenance_schedule.pdf', size: '245KB' }
      ]
    },
    {
      id: 2,
      category: 'event',
      title: getText('notice2Title'),
      content: getText('notice2Content'),
      registrationDate: '2025-01-08',
      viewCount: 890,
      hasAttachment: false,
      attachments: []
    },
    {
      id: 3,
      category: 'urgent',
      title: getText('notice3Title'),
      content: getText('notice3Content'),
      registrationDate: '2025-01-05',
      viewCount: 2150,
      hasAttachment: true,
      attachments: [
        { name: 'privacy_policy_changes.pdf', size: '1.2MB' },
        { name: 'privacy_policy_summary.docx', size: '156KB' }
      ]
    },
    {
      id: 4,
      category: 'general',
      title: getText('notice4Title'),
      content: getText('notice4Content'),
      registrationDate: '2025-01-03',
      viewCount: 670,
      hasAttachment: false,
      attachments: []
    }
  ];

  // Get category display info
  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      urgent: { label: getText('urgent'), color: 'bg-red-100 text-red-800 border-red-200' },
      general: { label: getText('general'), color: 'bg-gray-100 text-gray-800 border-gray-200' },
      maintenance: { label: getText('maintenance'), color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      event: { label: getText('event'), color: 'bg-blue-100 text-blue-800 border-blue-200' }
    };
    
    return categoryMap[category as keyof typeof categoryMap] || categoryMap.general;
  };

  // Format date as YYYY-MM-DD for list view
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Format date-time as YYYY-MM-DD hh:mm:ss for detail
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  };

  // Handle notice click
  const handleNoticeClick = (id: number) => {
    router.push(`/notice?id=${id}`);
  };

  // Handle back to list
  const handleBackToList = () => {
    router.push('/notice');
  };

  // Get current notice for detail view
  const currentNotice = noticeId ? sampleNotices.find(notice => notice.id === parseInt(noticeId)) : null;

  // If viewing detail
  if (noticeId && currentNotice) {
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
        
        <main className="flex-1" style={{ paddingTop: isBannerVisible ? '120px' : '80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToList}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">&larr;</span>
              {getText('backToList')}
            </button>
          </div>

          {/* Notice Detail */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryInfo(currentNotice.category).color} ${isMobile ? 'max-w-[50%]' : ''}`}>
                  {getCategoryInfo(currentNotice.category).label}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{currentNotice.title}</h1>
              {/* Meta under title */}
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <span>{formatDateTime(currentNotice.registrationDate)}</span>
                  <span className="hidden sm:inline-flex items-center"><Eye className="h-4 w-4 mr-1" />{currentNotice.viewCount.toLocaleString()}</span>
                </div>
                <div className="sm:hidden mt-1 inline-flex items-center"><Eye className="h-4 w-4 mr-1" />{currentNotice.viewCount.toLocaleString()}</div>
              </div>
            </div>

            {/* Attachments */}
            {currentNotice.hasAttachment && currentNotice.attachments.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{getText('attachments')}</h3>
                <div className="space-y-2">
                  {currentNotice.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div className="flex items-center">
                        <Paperclip className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors" aria-label="download" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentNotice.content}
              </div>
            </div>
          </div>
          </div>
        </main>

        <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
      </div>
    );
  }

  // Notice list view
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
      
      <main className="flex-1" style={{ paddingTop: isBannerVisible ? '120px' : '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getText('pageTitle')}</h1>
          <p className="text-lg text-gray-600">{getText('pageDescription')}</p>
        </div>



        {/* Notice List */}
        <div className="space-y-4">
          {sampleNotices.length > 0 ? (
            sampleNotices.map((notice) => (
              <div 
                key={notice.id} 
                onClick={() => handleNoticeClick(notice.id)}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start">
                  {/* Notice Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryInfo(notice.category).color}`}>
                          {getCategoryInfo(notice.category).label}
                        </span>
                      </div>
                      {/* moved views below date */}
                    </div>
                    
                    {/* Title with attachment icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 transition-colors">
                        {notice.title}
                      </h3>
                      {notice.hasAttachment && (
                        <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Date with views below */}
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        {formatDate(notice.registrationDate)}
                      </div>
                      <div className="flex items-center mt-1">
                        <Eye className="h-4 w-4 mr-1" />
                        {notice.viewCount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">{getText('noNotices')}</p>
            </div>
          )}
        </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}

export default function NoticePage() {
  return (
    <Suspense fallback={<div />}>
      <NoticeContent />
    </Suspense>
  );
}