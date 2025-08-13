'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, X, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

type InquiryCategoryKey = 'service' | 'supplier' | 'certification' | 'payment' | 'bug' | 'etc';

type AttachmentItem = { name: string; size?: string; file?: File };

export default function InquiryEditPage() {
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

  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});
  const [isMobile, setIsMobile] = React.useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = React.useState(false);

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
        categoryLabel: '구분',
        selectPlaceholder: '선택하세요',
        service: '서비스 이용 문의',
        supplier: '공급사 등록 문의',
        certification: '인증마크 발급 문의',
        payment: '결제/요금 문의',
        bug: '오류/버그 신고',
        etc: '기타 문의',
        titleLabel: '제목',
        contentLabel: '내용',
        attachmentsLabel: '첨부파일',
        addFile: '파일 추가',
        dragHint: '또는 파일을 드래그하여 업로드',
        selectedFiles: '선택된 파일',
        removeFile: '파일 삭제',
        cancel: '취소',
        submit: '수정하기',
        submitting: '수정 중...',
        successMessage: '수정이 완료되었습니다.',
        errorMessage: '수정 중 오류가 발생했습니다. 다시 시도해주세요.',
        required: '필수 입력 항목입니다',
        minContent: '내용을 10자 이상 입력해주세요'
      },
      en: {
        categoryLabel: 'Category',
        selectPlaceholder: 'Select',
        service: 'Service',
        supplier: 'Supplier Registration',
        certification: 'Certification Mark',
        payment: 'Payment/Pricing',
        bug: 'Bug Report',
        etc: 'Others',
        titleLabel: 'Title',
        contentLabel: 'Content',
        attachmentsLabel: 'Attachments',
        addFile: 'Add File',
        dragHint: 'or drag files to upload',
        selectedFiles: 'Selected Files',
        removeFile: 'Remove',
        cancel: 'Cancel',
        submit: 'Update',
        submitting: 'Updating...',
        successMessage: 'Update completed.',
        errorMessage: 'An error occurred during update. Please try again.',
        required: 'This field is required',
        minContent: 'Please enter at least 10 characters'
      },
      ja: {
        categoryLabel: '区分',
        selectPlaceholder: '選択してください',
        service: 'サービス利用',
        supplier: 'サプライヤー登録',
        certification: '認証マーク発給',
        payment: '決済/料金',
        bug: '不具合報告',
        etc: 'その他',
        titleLabel: 'タイトル',
        contentLabel: '内容',
        attachmentsLabel: '添付ファイル',
        addFile: 'ファイル追加',
        dragHint: 'またはファイルをドラッグしてアップロード',
        selectedFiles: '選択されたファイル',
        removeFile: '削除',
        cancel: 'キャンセル',
        submit: '修正する',
        submitting: '修正中...',
        successMessage: '修正が完了しました。',
        errorMessage: '修正中にエラーが発生しました。',
        required: '必須入力項目です',
        minContent: '内容を10文字以上入力してください'
      },
      zh: {
        categoryLabel: '类别',
        selectPlaceholder: '请选择',
        service: '服务使用',
        supplier: '供应商注册',
        certification: '认证标记发放',
        payment: '支付/费用',
        bug: '错误/漏洞报告',
        etc: '其他',
        titleLabel: '标题',
        contentLabel: '内容',
        attachmentsLabel: '附件',
        addFile: '添加文件',
        dragHint: '或拖拽文件以上传',
        selectedFiles: '已选文件',
        removeFile: '删除',
        cancel: '取消',
        submit: '修改',
        submitting: '修改中...',
        successMessage: '修改完成。',
        errorMessage: '修改时发生错误。',
        required: '此项为必填项',
        minContent: '请输入至少10个字符'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  // Mock fetch existing inquiry
  React.useEffect(() => {
    // Simulate existing data load by id
    let existing: { category: InquiryCategoryKey; title: string; content: string; attachments: AttachmentItem[] };
    if (id === 102) {
      existing = {
        category: 'supplier',
        title: '공급사 등록 절차가 궁금합니다',
        content: '필요한 서류와 심사 기간을 알고 싶습니다.',
        attachments: []
      };
    } else if (id === 107) {
      existing = {
        category: 'etc',
        title: '첨부파일 포함 문의 (미답변)',
        content: '참고용 파일을 첨부했습니다. 확인 부탁드립니다.',
        attachments: [{ name: 'reference.pdf' }, { name: 'capture.jpg' }]
      };
    } else {
      existing = {
        category: 'service',
        title: '로그인 후 마이페이지 접근이 되지 않습니다',
        content: '로그인은 되는데 마이페이지 이동 시 에러가 발생합니다. 스크린샷을 첨부합니다.',
        attachments: [{ name: 'screenshot_1.png' }]
      };
    }
    setFormData(existing);
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
    if (!formData.category) e.category = getText('required');
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
      setTimeout(() => router.push(`/mypage/inquiries/${id}`), 700);
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
          {/* Alerts */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800">{getText('successMessage')}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{getText('errorMessage')}</p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('categoryLabel')} <span className="text-red-500">*</span>
                </label>
                {/* Desktop select */}
                <div className="hidden md:block">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">{getText('selectPlaceholder')}</option>
                    <option value="service">{getText('service')}</option>
                    <option value="supplier">{getText('supplier')}</option>
                    <option value="certification">{getText('certification')}</option>
                    <option value="payment">{getText('payment')}</option>
                    <option value="bug">{getText('bug')}</option>
                    <option value="etc">{getText('etc')}</option>
                  </select>
                </div>
                {/* Mobile trigger */}
                <div className="block md:hidden">
                  <button
                    type="button"
                    onClick={() => setIsCatModalOpen(true)}
                    className={`w-full px-3 py-2 border rounded-lg bg-white flex items-center justify-between ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <span>
                      {formData.category
                        ? (formData.category === 'service' ? getText('service')
                          : formData.category === 'supplier' ? getText('supplier')
                          : formData.category === 'certification' ? getText('certification')
                          : formData.category === 'payment' ? getText('payment')
                          : formData.category === 'bug' ? getText('bug')
                          : getText('etc'))
                        : getText('selectPlaceholder')}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('titleLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('contentLabel')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              {/* Attachments (match Board edit UI) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('attachmentsLabel')}
                </label>
                {/* Existing attachments */}
                {formData.attachments.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {formData.attachments.map((att, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{att.name}</span>
                          {att.size && <span className="text-xs text-gray-500">({att.size})</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="fileUpload" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">{getText('addFile')}</span>
                    <span className="text-xs text-gray-500 mt-1">{getText('dragHint')}</span>
                  </label>
                </div>
                {errors.files && (
                  <p className="mt-1 text-sm text-red-600">{errors.files}</p>
                )}
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
                  className="w-auto px-6 sm:px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? getText('submitting') : getText('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Mobile Category Modal */}
      {isMobile && isCatModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsCatModalOpen(false)}
          />
          <div className="fixed inset-x-4 top-28 bottom-28 bg-white rounded-lg shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">구분 선택</h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg" onClick={() => setIsCatModalOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[
                { value: '', label: getText('selectPlaceholder') },
                { value: 'service', label: getText('service') },
                { value: 'supplier', label: getText('supplier') },
                { value: 'certification', label: getText('certification') },
                { value: 'payment', label: getText('payment') },
                { value: 'bug', label: getText('bug') },
                { value: 'etc', label: getText('etc') },
              ].map((opt) => (
                <button
                  key={opt.value || 'all'}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, category: opt.value as any }));
                    setIsCatModalOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg ${
                    formData.category === opt.value ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
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


