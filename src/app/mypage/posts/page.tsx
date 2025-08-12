'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type PostCategoryKey = 'daily' | 'curious' | 'together' | 'inform' | 'share' | 'tell';

export default function MyPostsPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  // Assume current user nickname (align with board examples)
  const currentUserNickname = '기술탐험가7';

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
        pageTitle: '등록한 게시글',
        colCategory: '구분',
        colTitle: '제목',
        colDate: '등록일',
        categoryDaily: '일상글',
        categoryCurious: '궁금해요',
        categoryTogether: '함께해요',
        categoryInform: '알려드려요',
        categoryShare: '나눔해요',
        categoryTell: '들려줘요',
        empty: '등록한 게시글이 없습니다.'
      },
      en: {
        pageTitle: 'My Posts',
        colCategory: 'Category',
        colTitle: 'Title',
        colDate: 'Date',
        categoryDaily: 'Daily',
        categoryCurious: 'Question',
        categoryTogether: 'Together',
        categoryInform: 'Information',
        categoryShare: 'Share',
        categoryTell: 'Story',
        empty: 'No posts.'
      },
      ja: {
        pageTitle: '登録した投稿',
        colCategory: '区分',
        colTitle: 'タイトル',
        colDate: '登録日',
        categoryDaily: '日常',
        categoryCurious: '質問',
        categoryTogether: '一緒に',
        categoryInform: 'お知らせ',
        categoryShare: 'シェア',
        categoryTell: 'ストーリー',
        empty: '投稿はありません。'
      },
      zh: {
        pageTitle: '我发布的帖子',
        colCategory: '类别',
        colTitle: '标题',
        colDate: '发布日期',
        categoryDaily: '日常',
        categoryCurious: '疑问',
        categoryTogether: '一起',
        categoryInform: '通知',
        categoryShare: '分享',
        categoryTell: '故事',
        empty: '没有帖子。'
      }
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const categoryLabel = (key: PostCategoryKey) => {
    const map: Record<PostCategoryKey, string> = {
      daily: getText('categoryDaily'),
      curious: getText('categoryCurious'),
      together: getText('categoryTogether'),
      inform: getText('categoryInform'),
      share: getText('categoryShare'),
      tell: getText('categoryTell'),
    };
    return map[key];
  };

  // Category badge styles (align with board UI)
  const getCategoryInfo = (category: PostCategoryKey) => {
    return {
      daily: { label: getText('categoryDaily'), color: 'bg-gray-100 text-gray-800 border-gray-200' },
      curious: { label: getText('categoryCurious'), color: 'bg-blue-100 text-blue-800 border-blue-200' },
      together: { label: getText('categoryTogether'), color: 'bg-green-100 text-green-800 border-green-200' },
      inform: { label: getText('categoryInform'), color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      share: { label: getText('categoryShare'), color: 'bg-purple-100 text-purple-800 border-purple-200' },
      tell: { label: getText('categoryTell'), color: 'bg-pink-100 text-pink-800 border-pink-200' },
    }[category];
  };

  // Sample posts (subset from board with authors)
  const allPosts = React.useMemo(() => ([
    { id: 1, category: 'curious' as PostCategoryKey, title: '새로운 공급사를 찾고 있어요', author: '기술탐험가7', registrationDate: '2025-01-12T14:30:00' },
    { id: 2, category: 'curious' as PostCategoryKey, title: '공급사 평가 기준이 궁금합니다', author: 'NewbieMom2', registrationDate: '2025-01-12T11:20:00' },
    { id: 3, category: 'together' as PostCategoryKey, title: '함께 전시회 가실 분 계신가요?', author: '전시회러버', registrationDate: '2025-01-11T16:45:00' },
    { id: 4, category: 'inform' as PostCategoryKey, title: '새로운 결제 시스템 안내', author: 'Admin2025', registrationDate: '2025-01-11T09:15:00' },
    { id: 5, category: 'share' as PostCategoryKey, title: '무료 샘플 나눔합니다', author: '나눔왕1', registrationDate: '2025-01-10T13:30:00' },
    { id: 6, category: 'tell' as PostCategoryKey, title: '성공적인 거래 후기', author: 'StoryTell9', registrationDate: '2025-01-10T10:20:00' },
  ]), []);

  const myPosts = React.useMemo(() => allPosts.filter(p => p.author === currentUserNickname), [allPosts]);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(
      currentLanguage === 'ko' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
    );
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* List (board-like UI) */}
          <div className="space-y-4">
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-gray-300 transition-all">
                  {/* Category and date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getCategoryInfo(post.category).color}`}>
                      {getCategoryInfo(post.category).label}
                    </span>
                    <div className="text-sm text-gray-500">{formatDate(post.registrationDate)}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors mb-1"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                    <Link href={`/board/${post.id}`}>{post.title}</Link>
                  </h3>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">{getText('empty')}</div>
            )}
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


