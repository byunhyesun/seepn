'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

type InquiryCategoryKey =
  | 'service'
  | 'supplier'
  | 'certification'
  | 'payment'
  | 'bug'
  | 'etc';

export default function InquiryWritePage() {
  const router = useRouter();
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
    files: [] as File[],
  });

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
        pageTitle: '1:1 문의하기',
        categoryLabel: '구분',
        categoryAll: '선택하세요',
        service: '서비스 이용 문의',
        supplier: '공급사 등록 문의',
        certification: '인증마크 발급 문의',
        payment: '결제/요금 문의',
        bug: '오류/버그 신고',
        etc: '기타 문의',
        titleLabel: '제목',
        contentLabel: '내용',
        fileAttachLabel: '파일첨부',
        fileUploadText: '파일을 선택하거나 여기로 드래그하세요',
        fileUploadNote: '최대 10MB, PDF, DOC, DOCX, JPG, PNG',
        selectedFiles: '선택된 파일',
        removeFile: '파일 삭제',
        resetButton: '초기화',
        submitButton: '문의하기',
        submittingButton: '전송 중...',
        successMessage: '문의가 성공적으로 등록되었습니다.',
        errorMessage: '문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
        required: '필수 입력 항목입니다',
        minContent: '내용을 10자 이상 입력해주세요'
      },
      en: {
        pageTitle: 'Write Inquiry',
        categoryLabel: 'Category',
        categoryAll: 'Select',
        service: 'Service',
        supplier: 'Supplier Registration',
        certification: 'Certification Mark',
        payment: 'Payment/Pricing',
        bug: 'Bug Report',
        etc: 'Others',
        titleLabel: 'Title',
        contentLabel: 'Content',
        fileAttachLabel: 'File Attachment',
        fileUploadText: 'Select files or drag them here',
        fileUploadNote: 'Max 10MB, PDF, DOC, DOCX, JPG, PNG',
        selectedFiles: 'Selected Files',
        removeFile: 'Remove File',
        resetButton: 'Reset',
        submitButton: 'Submit',
        submittingButton: 'Submitting...',
        successMessage: 'Inquiry submitted successfully.',
        errorMessage: 'Error occurred while submitting. Please try again.',
        required: 'This field is required',
        minContent: 'Please enter at least 10 characters'
      },
      ja: {
        pageTitle: '1:1お問い合わせ',
        categoryLabel: '区分',
        categoryAll: '選択してください',
        service: 'サービス利用',
        supplier: 'サプライヤー登録',
        certification: '認証マーク発給',
        payment: '決済/料金',
        bug: '不具合報告',
        etc: 'その他',
        titleLabel: 'タイトル',
        contentLabel: '内容',
        fileAttachLabel: 'ファイル添付',
        fileUploadText: 'ファイルを選択するかここにドラッグしてください',
        fileUploadNote: '最大10MB, PDF, DOC, DOCX, JPG, PNG',
        selectedFiles: '選択されたファイル',
        removeFile: '削除',
        resetButton: 'リセット',
        submitButton: 'お問い合わせ',
        submittingButton: '送信中...',
        successMessage: 'お問い合わせが正常に送信されました。',
        errorMessage: '送信中にエラーが発生しました。',
        required: '必須入力項目です',
        minContent: '内容を10文字以上入力してください'
      },
      zh: {
        pageTitle: '1:1 咨询',
        categoryLabel: '类别',
        categoryAll: '请选择',
        service: '服务使用',
        supplier: '供应商注册',
        certification: '认证标记发放',
        payment: '支付/费用',
        bug: '错误/漏洞报告',
        etc: '其他',
        titleLabel: '标题',
        contentLabel: '内容',
        fileAttachLabel: '文件附件',
        fileUploadText: '选择文件或拖拽到此处',
        fileUploadNote: '最大10MB, PDF, DOC, DOCX, JPG, PNG',
        selectedFiles: '已选文件',
        removeFile: '删除',
        resetButton: '重置',
        submitButton: '提交咨询',
        submittingButton: '提交中...',
        successMessage: '咨询已成功提交。',
        errorMessage: '提交时发生错误。',
        required: '此项为必填项',
        minContent: '请输入至少10个字符'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
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
      validFiles.push(file);
    });

    if (newErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: newErrors.join(', ') }));
    } else {
      setErrors((prev) => ({ ...prev, files: '' }));
    }
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...validFiles] }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
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

  const handleReset = () => {
    setFormData({ category: '', title: '', content: '', files: [] });
    setErrors({});
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitStatus('success');
      // Navigate back to list after a small delay
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

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
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">{getText('categoryAll')}</option>
                  <option value="service">{getText('service')}</option>
                  <option value="supplier">{getText('supplier')}</option>
                  <option value="certification">{getText('certification')}</option>
                  <option value="payment">{getText('payment')}</option>
                  <option value="bug">{getText('bug')}</option>
                  <option value="etc">{getText('etc')}</option>
                </select>
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

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('fileAttachLabel')}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">{getText('fileUploadText')}</p>
                    <p className="text-xs text-gray-500">{getText('fileUploadNote')}</p>
                  </label>
                </div>
                {errors.files && (
                  <p className="mt-1 text-sm text-red-600">{errors.files}</p>
                )}

                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{getText('selectedFiles')}</p>
                    <div className="space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                            title={getText('removeFile')}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="sm:px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {getText('resetButton')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? getText('submittingButton') : getText('submitButton')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


