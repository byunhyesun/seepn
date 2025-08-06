'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    type: 'partnership', // 'partnership' or 'advertising'
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    content: '',
    files: [] as File[]
  });

  // Form validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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
        pageTitle: '제휴/광고문의',
        pageDescription: '제휴 및 광고 관련 문의사항을 남겨주시면 빠른 시일 내에 연락드리겠습니다.',
        // Form labels
        typeLabel: '구분',
        partnershipOption: '제휴',
        advertisingOption: '광고',
        companyNameLabel: '회사명',
        contactNameLabel: '담당자명',
        phoneLabel: '연락처',
        emailLabel: '이메일 주소',
        contentLabel: '내용',
        fileAttachLabel: '파일첨부',
        // Placeholders
        companyNamePlaceholder: '회사명을 입력해주세요',
        contactNamePlaceholder: '담당자명을 입력해주세요',
        phonePlaceholder: '연락처를 입력해주세요 (예: 010-1234-5678)',
        emailPlaceholder: '이메일 주소를 입력해주세요',
        contentPlaceholder: '문의 내용을 상세히 입력해주세요',
        // File upload
        fileUploadText: '파일을 선택하거나 여기로 드래그하세요',
        fileUploadNote: '최대 10MB, PDF, DOC, DOCX, JPG, PNG 파일만 업로드 가능',
        selectedFiles: '선택된 파일',
        removeFile: '파일 삭제',
        // Buttons
        submitButton: '문의하기',
        submittingButton: '전송 중...',
        resetButton: '초기화',
        // Messages
        successMessage: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        errorMessage: '문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
        // Validation messages
        requiredField: '필수 입력 항목입니다',
        invalidEmail: '올바른 이메일 형식을 입력해주세요',
        invalidPhone: '올바른 연락처 형식을 입력해주세요',
        contentTooShort: '내용을 10자 이상 입력해주세요',
        fileTooLarge: '파일 크기는 10MB를 초과할 수 없습니다',
        invalidFileType: '지원하지 않는 파일 형식입니다'
      },
      en: {
        pageTitle: 'Partnership/Advertising Inquiry',
        pageDescription: 'Please leave your partnership and advertising inquiries, and we will contact you as soon as possible.',
        // Form labels
        typeLabel: 'Type',
        partnershipOption: 'Partnership',
        advertisingOption: 'Advertising',
        companyNameLabel: 'Company Name',
        contactNameLabel: 'Contact Person',
        phoneLabel: 'Phone Number',
        emailLabel: 'Email Address',
        contentLabel: 'Message',
        fileAttachLabel: 'File Attachment',
        // Placeholders
        companyNamePlaceholder: 'Please enter company name',
        contactNamePlaceholder: 'Please enter contact person name',
        phonePlaceholder: 'Please enter phone number (e.g., 010-1234-5678)',
        emailPlaceholder: 'Please enter email address',
        contentPlaceholder: 'Please enter your inquiry in detail',
        // File upload
        fileUploadText: 'Select files or drag them here',
        fileUploadNote: 'Max 10MB, PDF, DOC, DOCX, JPG, PNG files only',
        selectedFiles: 'Selected Files',
        removeFile: 'Remove File',
        // Buttons
        submitButton: 'Submit Inquiry',
        submittingButton: 'Submitting...',
        resetButton: 'Reset',
        // Messages
        successMessage: 'Your inquiry has been sent successfully. We will contact you soon.',
        errorMessage: 'An error occurred while sending your inquiry. Please try again.',
        // Validation messages
        requiredField: 'This field is required',
        invalidEmail: 'Please enter a valid email format',
        invalidPhone: 'Please enter a valid phone number format',
        contentTooShort: 'Please enter at least 10 characters',
        fileTooLarge: 'File size cannot exceed 10MB',
        invalidFileType: 'Unsupported file format'
      },
      ja: {
        pageTitle: '提携/広告お問い合わせ',
        pageDescription: '提携及び広告関連のお問い合わせをお残しいただければ、迅速にご連絡いたします。',
        // Form labels
        typeLabel: '区分',
        partnershipOption: '提携',
        advertisingOption: '広告',
        companyNameLabel: '会社名',
        contactNameLabel: '担当者名',
        phoneLabel: '連絡先',
        emailLabel: 'メールアドレス',
        contentLabel: '内容',
        fileAttachLabel: 'ファイル添付',
        // Placeholders
        companyNamePlaceholder: '会社名を入力してください',
        contactNamePlaceholder: '担当者名を入力してください',
        phonePlaceholder: '連絡先を入力してください（例：010-1234-5678）',
        emailPlaceholder: 'メールアドレスを入力してください',
        contentPlaceholder: 'お問い合わせ内容を詳しく入力してください',
        // File upload
        fileUploadText: 'ファイルを選択するかここにドラッグしてください',
        fileUploadNote: '最大10MB、PDF、DOC、DOCX、JPG、PNGファイルのみアップロード可能',
        selectedFiles: '選択されたファイル',
        removeFile: 'ファイル削除',
        // Buttons
        submitButton: 'お問い合わせ',
        submittingButton: '送信中...',
        resetButton: 'リセット',
        // Messages
        successMessage: 'お問い合わせが正常に送信されました。迅速にご連絡いたします。',
        errorMessage: 'お問い合わせの送信中にエラーが発生しました。再度お試しください。',
        // Validation messages
        requiredField: '必須入力項目です',
        invalidEmail: '正しいメール形式を入力してください',
        invalidPhone: '正しい連絡先形式を入力してください',
        contentTooShort: '内容を10文字以上入力してください',
        fileTooLarge: 'ファイルサイズは10MBを超えることはできません',
        invalidFileType: 'サポートされていないファイル形式です'
      },
      zh: {
        pageTitle: '合作/广告咨询',
        pageDescription: '请留下您的合作及广告相关咨询，我们将尽快与您联系。',
        // Form labels
        typeLabel: '类型',
        partnershipOption: '合作',
        advertisingOption: '广告',
        companyNameLabel: '公司名称',
        contactNameLabel: '联系人',
        phoneLabel: '联系电话',
        emailLabel: '邮箱地址',
        contentLabel: '内容',
        fileAttachLabel: '文件附件',
        // Placeholders
        companyNamePlaceholder: '请输入公司名称',
        contactNamePlaceholder: '请输入联系人姓名',
        phonePlaceholder: '请输入联系电话（例：010-1234-5678）',
        emailPlaceholder: '请输入邮箱地址',
        contentPlaceholder: '请详细输入咨询内容',
        // File upload
        fileUploadText: '选择文件或拖拽到此处',
        fileUploadNote: '最大10MB，仅支持PDF、DOC、DOCX、JPG、PNG文件',
        selectedFiles: '已选文件',
        removeFile: '删除文件',
        // Buttons
        submitButton: '提交咨询',
        submittingButton: '提交中...',
        resetButton: '重置',
        // Messages
        successMessage: '您的咨询已成功发送。我们将尽快与您联系。',
        errorMessage: '发送咨询时发生错误。请重试。',
        // Validation messages
        requiredField: '此项为必填项',
        invalidEmail: '请输入正确的邮箱格式',
        invalidPhone: '请输入正确的电话格式',
        contentTooShort: '请输入至少10个字符',
        fileTooLarge: '文件大小不能超过10MB',
        invalidFileType: '不支持的文件格式'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    files.forEach(file => {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        newErrors.push(`${file.name}: ${getText('fileTooLarge')}`);
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: ${getText('invalidFileType')}`);
        return;
      }

      validFiles.push(file);
    });

    if (newErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        files: newErrors.join(', ')
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        files: ''
      }));
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  // Remove file
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = getText('requiredField');
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = getText('requiredField');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = getText('requiredField');
    } else if (!/^[\d-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = getText('invalidPhone');
    }

    if (!formData.email.trim()) {
      newErrors.email = getText('requiredField');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = getText('invalidEmail');
    }

    if (!formData.content.trim()) {
      newErrors.content = getText('requiredField');
    } else if (formData.content.trim().length < 10) {
      newErrors.content = getText('contentTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        type: 'partnership',
        companyName: '',
        contactName: '',
        phone: '',
        email: '',
        content: '',
        files: []
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      type: 'partnership',
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      content: '',
      files: []
    });
    setErrors({});
    setSubmitStatus('idle');
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
      
      <main className="flex-1" style={{ paddingTop: isBannerVisible ? '120px' : '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getText('pageTitle')}</h1>
          <p className="text-lg text-gray-600">{getText('pageDescription')}</p>
        </div>

        {/* Success/Error Messages */}
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

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('typeLabel')} <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="partnership">{getText('partnershipOption')}</option>
                <option value="advertising">{getText('advertisingOption')}</option>
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('companyNameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder={getText('companyNamePlaceholder')}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.companyName ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('contactNameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                placeholder={getText('contactNamePlaceholder')}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.contactName ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
              )}
            </div>

            {/* Phone and Email - Row Layout on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('phoneLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={getText('phonePlaceholder')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('emailLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={getText('emailPlaceholder')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('contentLabel')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder={getText('contentPlaceholder')}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('fileAttachLabel')}
              </label>
              
              {/* File Upload Area */}
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

              {/* Selected Files */}
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

            {/* Form Buttons */}
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