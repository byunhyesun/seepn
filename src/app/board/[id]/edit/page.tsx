'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Upload, X, Trash2, Bold, Italic, Underline, List, ListOrdered, Link2 } from 'lucide-react';

export default function BoardEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);
  
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [currentUserId] = useState(1); // 현재 로그인한 사용자 ID (예시)
  
  // Form states
  const [selectedCategory, setSelectedCategory] = useState('curious');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Array<{name: string, size: string, file?: File}>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Editor states
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  // Mobile detection
  useEffect(() => {
    console.log('isMobile', isMobile);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

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

  // Load existing post data
  useEffect(() => {
    // In real app, this would fetch data from API
    const loadPostData = () => {
      // Sample existing data
      setSelectedCategory('curious');
      setTitle('새로운 공급사를 찾고 있어요');
      setContent('<p>안녕하세요. 전자부품 관련 공급사를 찾고 있습니다.</p><p>현재 저희 회사에서는 다음과 같은 부품들이 필요합니다:</p><ul><li>저항 (1kΩ, 10kΩ)</li><li>캐패시터 (100μF, 470μF)</li><li>LED (빨강, 파랑, 초록)</li></ul><p>품질이 좋고 가격이 합리적인 곳이 있다면 추천 부탁드립니다.</p><p>감사합니다.</p>');
      setAttachments([
        { name: 'parts_list.xlsx', size: '2.3MB' },
        { name: 'reference_image.jpg', size: '1.1MB' }
      ]);
    };

    loadPostData();
  }, [postId]);

  // Text translations
  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '게시글 수정',
        backToPost: '게시글로 돌아가기',
        category: '구분',
        title: '제목',
        content: '내용',
        attachments: '첨부파일',
        addFile: '파일 추가',
        cancel: '취소',
        save: '수정',
        delete: '삭제',
        deleteConfirm: '정말 삭제하시겠습니까?',
        titlePlaceholder: '제목을 입력하세요',
        contentPlaceholder: '내용을 입력하세요',
        // Categories
        categoryDaily: '일상글',
        categoryCurious: '궁금해요',
        categoryTogether: '함께해요',
        categoryInform: '알려드려요',
        categoryShare: '나눔해요',
        categoryTell: '들려줘요'
      },
      en: {
        pageTitle: 'Edit Post',
        backToPost: 'Back to Post',
        category: 'Category',
        title: 'Title',
        content: 'Content',
        attachments: 'Attachments',
        addFile: 'Add File',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        deleteConfirm: 'Are you sure you want to delete?',
        titlePlaceholder: 'Enter title',
        contentPlaceholder: 'Enter content',
        // Categories
        categoryDaily: 'Daily',
        categoryCurious: 'Question',
        categoryTogether: 'Together',
        categoryInform: 'Information',
        categoryShare: 'Share',
        categoryTell: 'Story'
      },
      ja: {
        pageTitle: '投稿編集',
        backToPost: '投稿に戻る',
        category: 'カテゴリ',
        title: 'タイトル',
        content: '内容',
        attachments: '添付ファイル',
        addFile: 'ファイル追加',
        cancel: 'キャンセル',
        save: '保存',
        delete: '削除',
        deleteConfirm: '本当に削除しますか？',
        titlePlaceholder: 'タイトルを入力',
        contentPlaceholder: '内容を入力',
        // Categories
        categoryDaily: '日常',
        categoryCurious: '質問',
        categoryTogether: '一緒に',
        categoryInform: 'お知らせ',
        categoryShare: 'シェア',
        categoryTell: 'ストーリー'
      },
      zh: {
        pageTitle: '编辑帖子',
        backToPost: '返回帖子',
        category: '分类',
        title: '标题',
        content: '内容',
        attachments: '附件',
        addFile: '添加文件',
        cancel: '取消',
        save: '保存',
        delete: '删除',
        deleteConfirm: '确定要删除吗？',
        titlePlaceholder: '输入标题',
        contentPlaceholder: '输入内容',
        // Categories
        categoryDaily: '日常',
        categoryCurious: '疑问',
        categoryTogether: '一起',
        categoryInform: '通知',
        categoryShare: '分享',
        categoryTell: '故事'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newAttachment = {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
          file: file
        };
        setAttachments(prev => [...prev, newAttachment]);
      });
    }
  };

  // Handle file remove
  const handleFileRemove = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Editor functions
  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleEditorFocus = () => {
    setIsEditorFocused(true);
  };

  const handleEditorBlur = () => {
    setIsEditorFocused(false);
  };

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Update editor when content changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Handle cancel
  const handleCancel = () => {
    router.push(`/board/${postId}`);
  };

  // Handle save
  const handleSave = async () => {
    // Get plain text content for validation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';
    
    if (!title.trim() || !plainTextContent.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving post:', {
        id: postId,
        category: selectedCategory,
        title,
        content,
        attachments
      });
      
      router.push(`/board/${postId}`);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (confirm(getText('deleteConfirm'))) {
      try {
        // In real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Deleting post:', postId);
        router.push('/board');
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('삭제에 실패했습니다.');
      }
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
      
      <main className="flex-1" style={{ paddingTop: isBannerVisible ? '120px' : '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.push(`/board/${postId}`)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {getText('backToPost')}
            </button>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* Edit Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('category')}
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="daily">{getText('categoryDaily')}</option>
                  <option value="curious">{getText('categoryCurious')}</option>
                  <option value="together">{getText('categoryTogether')}</option>
                  <option value="inform">{getText('categoryInform')}</option>
                  <option value="share">{getText('categoryShare')}</option>
                  <option value="tell">{getText('categoryTell')}</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('title')}
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={getText('titlePlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Content */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('content')}
                </label>
                
                {/* Editor Toolbar */}
                <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="굵게"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="기울임"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="밑줄"
                  >
                    <Underline className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="글머리 기호"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="번호 매기기"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('링크 URL을 입력하세요:');
                      if (url) executeCommand('createLink', url);
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="링크"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Editor Content */}
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  onFocus={handleEditorFocus}
                  onBlur={handleEditorBlur}
                  className={`w-full min-h-[300px] px-3 py-2 border-x border-b border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    isEditorFocused ? 'ring-2 ring-blue-500 border-transparent' : ''
                  }`}
                  style={{ 
                    maxHeight: '500px', 
                    overflowY: 'auto',
                    lineHeight: '1.5'
                  }}
                  suppressContentEditableWarning={true}
                />
                
                {/* Placeholder */}
                {!content && (
                  <div 
                    className="absolute text-gray-500 pointer-events-none"
                    style={{ 
                      top: '74px', 
                      left: '12px',
                      fontSize: '14px'
                    }}
                  >
                    {getText('contentPlaceholder')}
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('attachments')}
                </label>
                
                {/* Existing Attachments */}
                {attachments.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{attachment.name}</span>
                          <span className="text-xs text-gray-500">({attachment.size})</span>
                        </div>
                        <button
                          onClick={() => handleFileRemove(index)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">{getText('addFile')}</span>
                    <span className="text-xs text-gray-500 mt-1">또는 파일을 드래그하여 업로드</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {getText('cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting || !title.trim() || (() => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';
                return !plainTextContent.trim();
              })()}
              className="flex items-center gap-2 px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '저장 중...' : getText('save')}
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              {getText('delete')}
            </button>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}