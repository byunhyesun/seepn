'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, X, CheckCircle, AlertCircle, ChevronLeft, Paperclip, ChevronDown, ChevronUp } from 'lucide-react';

type InquiryCategoryKey = 'service' | 'supplier' | 'certification' | 'payment' | 'bug' | 'etc';
type AttachmentItem = { name: string; size?: string; file?: File };

export default function InquiryRePage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id as string;
  const id = Number(idParam);

  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = React.useState({
    category: '' as '' | InquiryCategoryKey,
    title: '',
    content: '',
    attachments: [] as AttachmentItem[],
  });

  const [prev, setPrev] = React.useState<{ category: InquiryCategoryKey; title: string; content: string; attachments?: AttachmentItem[] } | null>(null);
  const [prevList, setPrevList] = React.useState<Array<{ title?: string; registrationDate?: string; attachments?: AttachmentItem[]; content: string }>>([]);
  const [showPrev, setShowPrev] = React.useState(true);
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});

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
        backToDetail: '상세로',
        pageTitle: '재문의하기',
        prevInquiry: '이전 문의',
        categoryLabel: '구분',
        titleLabel: '제목',
        contentLabel: '내용',
        attachmentsLabel: '첨부파일',
        addFile: '파일 추가',
        dragHint: '또는 파일을 드래그하여 업로드',
        prevAttachments: '이전 첨부파일',
        cancel: '취소',
        submit: '재문의하기',
        submitting: '전송 중...',
        successMessage: '재문의가 등록되었습니다.',
        errorMessage: '전송 중 오류가 발생했습니다. 다시 시도해주세요.',
        required: '필수 입력 항목입니다',
        minContent: '내용을 10자 이상 입력해주세요',
        downloadFile: '파일 다운로드'
      },
      en: {
        backToDetail: 'Back to Detail',
        pageTitle: 'Re-inquiry',
        prevInquiry: 'Previous Inquiry',
        categoryLabel: 'Category',
        titleLabel: 'Title',
        contentLabel: 'Content',
        attachmentsLabel: 'Attachments',
        addFile: 'Add File',
        dragHint: 'or drag files to upload',
        prevAttachments: 'Previous Attachments',
        cancel: 'Cancel',
        submit: 'Submit Re-inquiry',
        submitting: 'Submitting...',
        successMessage: 'Re-inquiry submitted.',
        errorMessage: 'Error occurred. Please try again.',
        required: 'This field is required',
        minContent: 'Please enter at least 10 characters',
        downloadFile: 'Download File'
      },
      ja: {
        backToDetail: '詳細へ',
        pageTitle: '再問い合わせ',
        prevInquiry: '以前のお問い合わせ',
        categoryLabel: '区分',
        titleLabel: 'タイトル',
        contentLabel: '内容',
        attachmentsLabel: '添付ファイル',
        addFile: 'ファイル追加',
        dragHint: 'またはファイルをドラッグしてアップロード',
        prevAttachments: '以前の添付ファイル',
        cancel: 'キャンセル',
        submit: '再問い合わせ',
        submitting: '送信中...',
        successMessage: '再問い合わせが登録されました。',
        errorMessage: 'エラーが発生しました。もう一度お試しください。',
        required: '必須入力項目です',
        minContent: '内容を10文字以上入力してください',
        downloadFile: 'ファイルダウンロード'
      },
      zh: {
        backToDetail: '返回详情',
        pageTitle: '再次咨询',
        prevInquiry: '之前的咨询',
        categoryLabel: '类别',
        titleLabel: '标题',
        contentLabel: '内容',
        attachmentsLabel: '附件',
        addFile: '添加文件',
        dragHint: '或拖拽文件以上传',
        prevAttachments: '之前的附件',
        cancel: '取消',
        submit: '再次咨询',
        submitting: '提交中...',
        successMessage: '再次咨询已提交。',
        errorMessage: '发生错误。请重试。',
        required: '此项为必填项',
        minContent: '请输入至少10个字符',
        downloadFile: '下载文件'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  // Format date: YYYY-MM-DD hh:mm:ss
  const formatDateTime = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${day} ${hh}:${mm}:${ss}`;
  };

  // Load previous inquiry summary (mock)
  React.useEffect(() => {
    let existing: { category: InquiryCategoryKey; title: string; content: string; attachments?: AttachmentItem[] };
    if (id === 101) {
      existing = {
        category: 'service',
        title: '로그인 후 마이페이지 접근이 되지 않습니다',
        content: '로그인은 되는데 마이페이지 이동 시 에러가 발생합니다. 스크린샷을 첨부합니다.',
        attachments: [{ name: 'screenshot_1.png', size: '820KB' }]
      };
      setPrevList([
        { title: '이전 문의 1', registrationDate: '2025-01-05T10:00:00', attachments: [{ name: 'log.txt', size: '12KB' }], content: '동일 이슈가 있어 로그 파일을 전달드립니다.' },
        { title: '이전 문의 2', registrationDate: '2025-01-08T11:20:00', attachments: [], content: '추가 현상: 특정 브라우저에서만 발생합니다.' },
      ]);
    } else if (id === 107) {
      existing = {
        category: 'etc',
        title: '첨부파일 포함 문의 (미답변)',
        content: '참고용 파일을 첨부했습니다. 확인 부탁드립니다.',
        attachments: [{ name: 'reference.pdf', size: '245KB' }, { name: 'capture.jpg', size: '1.1MB' }]
      };
      setPrevList([
        { title: '이전 문의 1', registrationDate: '2025-01-10T09:00:00', attachments: [{ name: 'ref_v1.pdf', size: '200KB' }], content: '첫 문의 내용입니다.' },
      ]);
    } else {
      existing = {
        category: 'supplier',
        title: '공급사 등록 절차가 궁금합니다',
        content: '필요한 서류와 심사 기간을 알고 싶습니다.',
        attachments: []
      };
      setPrevList([]);
    }
    setPrev(existing);
    setFormData({ category: existing.category, title: existing.title, content: '', attachments: [] });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: AttachmentItem[] = [];
    const newErrors: string[] = [];
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        newErrors.push(`${file.name}: 10MB 초과`);
        return;
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png',
      ];
      if (!allowedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: 형식 불가`);
        return;
      }
      validFiles.push({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)}MB`, file });
    });

    if (newErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: newErrors.join(', ') }));
    } else {
      setErrors((prev) => ({ ...prev, files: '' }));
    }
    setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...validFiles] }));
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.title.trim()) e.title = getText('required');
    if (!formData.content.trim()) e.content = getText('required');
    else if (formData.content.trim().length < 10) e.content = getText('minContent');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCancel = () => {
    router.push(`/mypage/inquiries/${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitStatus('success');
      setTimeout(() => router.push('/mypage/inquiries'), 700);
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
          {/* Back */}
          <div className="mb-6">
            <button
              onClick={() => router.push(`/mypage/inquiries/${id}`)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              {getText('backToDetail')}
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* Re-inquiry form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getText('categoryLabel')}</label>
                <select
                  name="category"
                  value={formData.category}
                  disabled
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                >
                  <option value="service">{mapCategory('service', currentLanguage)}</option>
                  <option value="supplier">{mapCategory('supplier', currentLanguage)}</option>
                  <option value="certification">{mapCategory('certification', currentLanguage)}</option>
                  <option value="payment">{mapCategory('payment', currentLanguage)}</option>
                  <option value="bug">{mapCategory('bug', currentLanguage)}</option>
                  <option value="etc">{mapCategory('etc', currentLanguage)}</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getText('titleLabel')} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getText('contentLabel')} <span className="text-red-500">*</span></label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${errors.content ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getText('attachmentsLabel')}</label>
                {formData.attachments.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {formData.attachments.map((att, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{att.name}</span>
                          {att.size && <span className="text-xs text-gray-500">({att.size})</span>}
                        </div>
                        <button type="button" onClick={() => removeAttachment(index)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input type="file" id="fileUpload" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                  <label htmlFor="fileUpload" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">{getText('addFile')}</span>
                    <span className="text-xs text-gray-500 mt-1">{getText('dragHint')}</span>
                  </label>
                </div>
                {errors.files && <p className="mt-1 text-sm text-red-600">{errors.files}</p>}
              </div>

              {/* Buttons */}
              <div className="flex flex-row sm:flex-row gap-4 pt-6 justify-center items-center">
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
                  disabled={isSubmitting}
                  className="sm:px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? getText('submitting') : getText('submit')}
                </button>
              </div>
            </form>
          </div>

          {/* Previous summary (match detail UI: section with header + toggle + per-item entries) */}
          {prevList && prevList.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mt-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{getText('prevInquiry')}</h2>
                <button
                  type="button"
                  onClick={() => setShowPrev(!showPrev)}
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="toggle previous inquiry"
                >
                  {showPrev ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>
              {showPrev && (
                <div className="space-y-3">
                  {prevList.map((item, idx) => (
                    <details key={idx} className="border border-gray-200 rounded">
                      <summary className="cursor-pointer list-none px-3 py-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{item.title || `이전 문의 ${idx + 1}`}</span>
                        <span className="text-xs text-gray-500">{item.registrationDate ? formatDateTime(item.registrationDate) : ''}</span>
                      </summary>
                      <div className="px-3 pb-3 text-sm text-gray-700 whitespace-pre-line">
                        {item.attachments && item.attachments.length > 0 && (
                          <div className="mb-2 space-y-1">
                            {item.attachments.map((a, i) => (
                              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <div className="flex items-center">
                                  <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-xs text-gray-700">{a.name}</span>
                                  {a.size && <span className="text-xs text-gray-500 ml-2">({a.size})</span>}
                                </div>
                                {/* Download text removed as requested */}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.content}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Alerts */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800">{getText('successMessage')}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{getText('errorMessage')}</p>
            </div>
          )}
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}

function mapCategory(cat: InquiryCategoryKey, lang: 'ko' | 'en' | 'ja' | 'zh') {
  const map = {
    ko: {
      service: '서비스 이용 문의',
      supplier: '공급사 등록 문의',
      certification: '인증마크 발급 문의',
      payment: '결제/요금 문의',
      bug: '오류/버그 신고',
      etc: '기타 문의'
    },
    en: {
      service: 'Service',
      supplier: 'Supplier Registration',
      certification: 'Certification Mark',
      payment: 'Payment/Pricing',
      bug: 'Bug Report',
      etc: 'Others'
    },
    ja: {
      service: 'サービス利用',
      supplier: 'サプライヤー登録',
      certification: '認証マーク発給',
      payment: '決済/料金',
      bug: '不具合報告',
      etc: 'その他'
    },
    zh: {
      service: '服务使用',
      supplier: '供应商注册',
      certification: '认证标记发放',
      payment: '支付/费用',
      bug: '错误/漏洞报告',
      etc: '其他'
    }
  } as const;
  return (map as any)[lang][cat] as string;
}


