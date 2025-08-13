'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Paperclip, Star, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

type InquiryCategoryKey = 'service' | 'supplier' | 'certification' | 'payment' | 'bug' | 'etc';

type InquiryDetail = {
  id: number;
  category: InquiryCategoryKey;
  title: string;
  registrationDate: string; // ISO
  attachments?: string[];
  content: string;
  answered: boolean;
  answeredAt?: string; // ISO
  answerAttachments?: string[];
  answerContent?: string;
  answerRating?: number; // 1..5
  reCount?: number;
  previousContent?: string;
};

export default function InquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id as string;
  const id = Number(idParam);

  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

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
        pageTitle: '1:1 문의 상세',
        inquirySection: '문의',
        answerSection: '답변',
        category: '구분',
        title: '제목',
        registrationDate: '등록일시',
        attachments: '첨부파일',
        content: '내용',
        answered: '답변여부',
        yes: '예',
        no: '아니오',
        answeredAt: '답변일시',
        answerAttachments: '답변첨부파일',
        answerContent: '답변내용',
        answerRating: '답변 평가',
        delete: '삭제',
        reInquiry: '재문의하기',
        newInquiry: '신규문의하기',
        edit: '수정하기',
        backToList: '목록으로',
        downloadFile: '파일 다운로드',
        service: '서비스 이용 문의',
        supplier: '공급사 등록 문의',
        certification: '인증마크 발급 문의',
        payment: '결제/요금 문의',
        bug: '오류/버그 신고',
        etc: '기타 문의'
      },
      en: {
        pageTitle: 'Inquiry Detail',
        inquirySection: 'Inquiry',
        answerSection: 'Answer',
        category: 'Category',
        title: 'Title',
        registrationDate: 'Registered At',
        attachments: 'Attachments',
        content: 'Content',
        answered: 'Answered',
        yes: 'Yes',
        no: 'No',
        answeredAt: 'Answered At',
        answerAttachments: 'Answer Attachments',
        answerContent: 'Answer Content',
        answerRating: 'Answer Rating',
        delete: 'Delete',
        reInquiry: 'Re-inquiry',
        newInquiry: 'New Inquiry',
        edit: 'Edit',
        backToList: 'Back to List',
        downloadFile: 'Download File',
        service: 'Service',
        supplier: 'Supplier Registration',
        certification: 'Certification Mark',
        payment: 'Payment/Pricing',
        bug: 'Bug Report',
        etc: 'Others'
      },
      ja: {
        pageTitle: 'お問い合わせ詳細',
        inquirySection: 'お問い合わせ',
        answerSection: '回答',
        category: '区分',
        title: 'タイトル',
        registrationDate: '登録日時',
        attachments: '添付ファイル',
        content: '内容',
        answered: '回答有無',
        yes: 'はい',
        no: 'いいえ',
        answeredAt: '回答日時',
        answerAttachments: '回答添付ファイル',
        answerContent: '回答内容',
        answerRating: '回答評価',
        delete: '削除',
        reInquiry: '再問い合わせ',
        newInquiry: '新規問い合わせ',
        edit: '修正',
        backToList: '一覧へ',
        downloadFile: 'ファイルダウンロード',
        service: 'サービス利用',
        supplier: 'サプライヤー登録',
        certification: '認証マーク発給',
        payment: '決済/料金',
        bug: '不具合報告',
        etc: 'その他'
      },
      zh: {
        pageTitle: '咨询详情',
        inquirySection: '咨询',
        answerSection: '回复',
        category: '类别',
        title: '标题',
        registrationDate: '发布日期',
        attachments: '附件',
        content: '内容',
        answered: '是否回复',
        yes: '是',
        no: '否',
        answeredAt: '回复时间',
        answerAttachments: '回复附件',
        answerContent: '回复内容',
        answerRating: '回复评价',
        delete: '删除',
        reInquiry: '再次咨询',
        newInquiry: '新咨询',
        edit: '修改',
        backToList: '返回列表',
        downloadFile: '下载文件',
        service: '服务使用',
        supplier: '供应商注册',
        certification: '认证标记发放',
        payment: '支付/费用',
        bug: '错误/漏洞报告',
        etc: '其他'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const sample: InquiryDetail[] = [
    {
      id: 101,
      category: 'service',
      title: '로그인 후 마이페이지 접근이 되지 않습니다',
      registrationDate: '2025-01-12T09:10:00',
      attachments: ['screenshot_1.png'],
      content: '로그인은 되는데 마이페이지 이동 시 에러가 발생합니다. 스크린샷을 첨부합니다.',
      answered: true,
      answeredAt: '2025-01-12T15:40:00',
      answerAttachments: ['guide.pdf'],
      answerContent: '안녕하세요. 캐시 문제로 보이며 브라우저 캐시 삭제 후 재시도 부탁드립니다.',
      answerRating: 4,
      reCount: 1,
      previousContent: '이전 문의: 동일 이슈 발생 기록이 있어 관련 가이드를 요청드립니다.'
    },
    {
      id: 102,
      category: 'supplier',
      title: '공급사 등록 절차가 궁금합니다',
      registrationDate: '2025-01-11T11:30:00',
      attachments: [],
      content: '필요한 서류와 심사 기간을 알고 싶습니다.',
      answered: false,
    },
    {
      id: 107,
      category: 'etc',
      title: '첨부파일 포함 문의 (미답변)',
      registrationDate: '2025-01-12T18:25:00',
      attachments: ['reference.pdf', 'capture.jpg'],
      content: '참고용 파일을 첨부했습니다. 확인 부탁드립니다.',
      answered: false,
      reCount: 1,
      previousContent: '이전 문의: 참고 파일을 추가로 전달드립니다.'
    },
  ];

  const detail = React.useMemo(() => sample.find((s) => s.id === id) || sample[0], [id]);
  const [showPrev, setShowPrev] = React.useState(false);

  const formatDateTime = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleString(
      currentLanguage === 'ko' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
    );
  };

  const categoryLabel = (c: InquiryCategoryKey) => getText(c);

  const handleDelete = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      // simulate delete
      alert('삭제되었습니다.');
      router.push('/mypage/inquiries');
    }
  };
  const handleReInquiry = () => router.push(`/mypage/inquiries/${id}/re`);
  const handleNewInquiry = () => router.push('/mypage/inquiries/write');
  const handleEdit = () => router.push(`/mypage/inquiries/${id}/edit`);

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
          {/* Back Button (notice style) */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/mypage/inquiries')}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              {getText('backToList')}
            </button>
          </div>

          {/* Removed page title per request */}

          {/* Inquiry Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{getText('inquirySection')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{getText('category')}</div>
                <div className="text-gray-900">{categoryLabel(detail.category)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">{getText('registrationDate')}</div>
                <div className="text-gray-900">{formatDateTime(detail.registrationDate)}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{getText('title')}</div>
              <div className="text-gray-900 font-medium">{detail.title}</div>
            </div>
            {/* Attachments (notice-like UI) */}
            {detail.attachments && detail.attachments.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">{getText('attachments')}</div>
                <div className="space-y-2">
                  {detail.attachments.map((name, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div className="flex items-center">
                        <Paperclip className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{name}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        {getText('downloadFile')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{getText('content')}</div>
              <div className="text-gray-900 whitespace-pre-line">{detail.content}</div>
            </div>
            {/* Previous Inquiry collapsible inside Inquiry section for re-inquiries */}
            {detail.reCount && detail.reCount > 0 && detail.previousContent && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowPrev(!showPrev)}
                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-900">이전 문의</span>
                  {showPrev ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </button>
                {showPrev && (
                  <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4">
                    <div className="text-sm text-gray-700 whitespace-pre-line">{detail.previousContent}</div>
                  </div>
                )}
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500 mb-1">{getText('answered')}</div>
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${detail.answered ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {detail.answered ? getText('yes') : getText('no')}
              </div>
            </div>
          </div>

          {/* Answer Section or Pending Actions */}
          {detail.answered ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{getText('answerSection')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{getText('answeredAt')}</div>
                  <div className="text-gray-900">{formatDateTime(detail.answeredAt)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{getText('answerRating')}</div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((v) => (
                      <Star key={v} className={`h-5 w-5 ${v <= (detail.answerRating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Answer Attachments (notice-like) */}
              {detail.answerAttachments && detail.answerAttachments.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">{getText('answerAttachments')}</div>
                  <div className="space-y-2">
                    {detail.answerAttachments.map((name, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div className="flex items-center">
                          <Paperclip className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{name}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                          {getText('downloadFile')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">{getText('answerContent')}</div>
                <div className="text-gray-900 whitespace-pre-line">{detail.answerContent || '-'}</div>
              </div>
              {/* Actions moved to global bottom */}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{getText('answerSection')}</h2>
              <div className="text-gray-700 mb-2">빠르고 정확한 답변을 위해 검토 중이며, 곧 답변드리겠습니다.</div>
            </div>
          )}

          {/* Global bottom actions */}
          <div className="mt-8 flex justify-center gap-2">
            <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">{getText('delete')}</button>
            {detail.answered ? (
              <>
                <button onClick={handleReInquiry} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{getText('reInquiry')}</button>
                <button onClick={handleNewInquiry} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">{getText('newInquiry')}</button>
              </>
            ) : (
              <button onClick={handleEdit} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{getText('edit')}</button>
            )}
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


