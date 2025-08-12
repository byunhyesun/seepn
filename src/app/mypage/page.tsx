'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, MessageSquare, ClipboardList, User as UserIcon, CalendarDays } from 'lucide-react';

export default function MyPageDashboard() {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sample user info (placeholder)
  const [visitCount, setVisitCount] = useState(1);
  const user = useMemo(() => ({
    nickname: '홍길동',
    joinedAt: '2024-06-01', // ISO date
    avatarText: '홍',
  }), []);

  // Sample activity data (placeholder)
  const [activity, setActivity] = useState({
    favoriteSuppliers: 7,
    evaluated: { done: 3, pending: 2 },
    recentPosts: 4,
    inquiries: { total: 6, answered: 4, pending: 2 },
  });

  useEffect(() => {
    // Country (best-effort)
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setUserCountry(data.country_name || '대한민국');
      } catch (e) {
        setUserCountry('대한민국');
      }
    };
    fetchCountry();

    // Visit count via localStorage
    try {
      const key = 'mypageVisitCount';
      const prev = Number(localStorage.getItem(key) || '0');
      const next = prev + 1;
      localStorage.setItem(key, String(next));
      setVisitCount(next);
    } catch (e) {
      setVisitCount((v) => v);
    }
  }, []);

  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '마이페이지',
        userInfo: '사용자 정보',
        nickname: '닉네임',
        joinedAt: '가입일',
        nthVisit: '번째 방문',
        activity: '활동 정보',
        favorites: '관심 공급사 수',
        evaluated: '평가 공급사',
        evaluatedDone: '평가완료',
        evaluatedPending: '평가예정',
        recentPosts: '최근 등록글 수',
        inquiry: '1:1 문의',
        inquiryTotal: '총 문의 수',
        inquiryAnswered: '답변완료 수',
        inquiryPending: '답변예정 수',
      },
      en: {
        pageTitle: 'My Page',
        userInfo: 'User Info',
        nickname: 'Nickname',
        joinedAt: 'Joined',
        nthVisit: 'th visit',
        activity: 'Activity',
        favorites: 'Favorite suppliers',
        evaluated: 'Evaluated suppliers',
        evaluatedDone: 'Completed',
        evaluatedPending: 'Pending',
        recentPosts: 'Recent posts',
        inquiry: '1:1 Inquiry',
        inquiryTotal: 'Total',
        inquiryAnswered: 'Answered',
        inquiryPending: 'Pending',
      },
      ja: {
        pageTitle: 'マイページ',
        userInfo: 'ユーザー情報',
        nickname: 'ニックネーム',
        joinedAt: '加入日',
        nthVisit: '回目の訪問',
        activity: '活動情報',
        favorites: 'お気に入りサプライヤー数',
        evaluated: '評価サプライヤー',
        evaluatedDone: '評価完了',
        evaluatedPending: '評価予定',
        recentPosts: '最近の投稿数',
        inquiry: '1:1 お問い合わせ',
        inquiryTotal: '合計',
        inquiryAnswered: '回答済み',
        inquiryPending: '回答予定',
      },
      zh: {
        pageTitle: '我的页面',
        userInfo: '用户信息',
        nickname: '昵称',
        joinedAt: '加入日期',
        nthVisit: '次访问',
        activity: '活动信息',
        favorites: '关注的供应商数',
        evaluated: '评价的供应商',
        evaluatedDone: '已完成',
        evaluatedPending: '待完成',
        recentPosts: '最近发布数',
        inquiry: '1:1 咨询',
        inquiryTotal: '总数',
        inquiryAnswered: '已答复',
        inquiryPending: '待答复',
      },
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(
      currentLanguage === 'ko' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
    );
  };

  const numberFormat = (n: number) => n.toLocaleString();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{getText('pageTitle')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{getText('userInfo')}</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {user.avatarText}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-lg">{user.nickname}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{getText('joinedAt')}: {formatDate(user.joinedAt)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {numberFormat(visitCount)}{getText('nthVisit')}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{getText('activity')}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Favorites */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{getText('favorites')}</span>
                    <Heart className="h-4 w-4 text-pink-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{numberFormat(activity.favoriteSuppliers)}</div>
                </div>

                {/* Evaluated suppliers */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{getText('evaluated')}</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{getText('evaluatedDone')}</div>
                      <div className="text-xl font-semibold text-gray-900">{numberFormat(activity.evaluated.done)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{getText('evaluatedPending')}</div>
                      <div className="text-xl font-semibold text-gray-900">{numberFormat(activity.evaluated.pending)}</div>
                    </div>
                  </div>
                </div>

                {/* Recent posts */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{getText('recentPosts')}</span>
                    <ClipboardList className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{numberFormat(activity.recentPosts)}</div>
                </div>

                {/* 1:1 Inquiry */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{getText('inquiry')}</span>
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{getText('inquiryTotal')}</div>
                      <div className="text-xl font-semibold text-gray-900">{numberFormat(activity.inquiries.total)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{getText('inquiryAnswered')}</div>
                      <div className="text-xl font-semibold text-gray-900">{numberFormat(activity.inquiries.answered)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{getText('inquiryPending')}</div>
                      <div className="text-xl font-semibold text-gray-900">{numberFormat(activity.inquiries.pending)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


