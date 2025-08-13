'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getL1Categories, getL2Categories, getL3Categories } from '@/utils/categories';
import { getL1Areas, getL2Areas } from '@/utils/areas';
import { Grid3X3, List, MapPin, Star, Heart, ExternalLink, Filter, Trash2, CheckSquare, X, ChevronDown, ChevronLeft, ThumbsUp } from 'lucide-react';

type PostCategory = 'daily' | 'curious' | 'together' | 'inform' | 'share' | 'tell';

export default function MyFavoriteSuppliersPage() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ko' | 'en' | 'ja' | 'zh'>('ko');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState('대한민국');

  // Filters
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedL1Category, setSelectedL1Category] = React.useState('');
  const [selectedL2Category, setSelectedL2Category] = React.useState('all');
  const [selectedL3Category, setSelectedL3Category] = React.useState('all');
  const [selectedL1Area, setSelectedL1Area] = React.useState('');
  const [selectedL2Area, setSelectedL2Area] = React.useState('all');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [modalStep, setModalStep] = React.useState<'root' | 'catL1' | 'catL2' | 'catL3' | 'areaL1' | 'areaL2'>('root');
  const [viewMode, setViewMode] = React.useState<'gallery' | 'list'>('list');

  // Selection
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  // Sample favorite suppliers data (placeholder)
  const [favoriteSuppliers, setFavoriteSuppliers] = React.useState(
    [
      {
        id: 1,
        name: '(주)테크솔루션',
        category: '정보통신',
        categoryDepth3: '시스템 개발',
        location: '서울특별시 강남구',
        description: 'IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.',
        rating: 4.8,
        tags: ['소프트웨어', 'IT컨설팅', '시스템개발'],
        website: 'https://www.techsolution.co.kr',
      },
      {
        id: 2,
        name: '글로벌 제조',
        category: '생산 관리',
        categoryDepth3: '정밀 부품 제조',
        location: '경기도 수원시',
        description: '정밀 부품 제조 전문 업체로 고품질 제품을 공급합니다.',
        rating: 4.6,
        tags: ['정밀부품', '제조', '품질관리'],
        website: 'https://www.globalmfg.co.kr',
      },
      {
        id: 3,
        name: '마케팅플러스',
        category: '마케팅',
        categoryDepth3: '디지털 마케팅',
        location: '서울특별시 서초구',
        description: '디지털 마케팅 전문 에이전시로 브랜드 홍보를 담당합니다.',
        rating: 4.9,
        tags: ['디지털마케팅', '브랜딩', 'SNS마케팅'],
        website: 'https://www.marketingplus.co.kr',
      },
    ] as Array<{
      id: number; name: string; category: string; categoryDepth3: string; location: string; description: string; rating: number; tags: string[]; website?: string;
    }>
  );

  // Effects
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    getUserCountry();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // i18n
  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: '관심 공급사',
        leftTitle: '검색',
        resultsTitle: '관심 공급사 목록',
        category: '품목',
        region: '지역',
        searchKeyword: '검색어',
        searchPlaceholder: '공급사명, 제품명 등',
        allCategories: '전체',
        allRegions: '전체',
        resetButton: '초기화',
        searchButton: '검색',
        galleryView: '갤러리 보기',
        listView: '리스트 보기',
        selectAll: '전체선택',
        deleteSelected: '선택 삭제',
        noneSelected: '선택된 항목이 없습니다',
        itemsCount: '{count}개',
        viewDetail: '상세보기',
      },
      en: {
        pageTitle: 'Favorite Suppliers',
        leftTitle: 'Search',
        resultsTitle: 'My Favorite Suppliers',
        category: 'Category',
        region: 'Region',
        searchKeyword: 'Keyword',
        searchPlaceholder: 'Supplier, product...',
        allCategories: 'All',
        allRegions: 'All',
        resetButton: 'Reset',
        searchButton: 'Search',
        galleryView: 'Gallery',
        listView: 'List',
        selectAll: 'Select All',
        deleteSelected: 'Delete Selected',
        noneSelected: 'No items selected',
        itemsCount: '{count} items',
        viewDetail: 'View Details',
      },
      ja: {
        pageTitle: 'お気に入りサプライヤー',
        leftTitle: '検索',
        resultsTitle: 'お気に入り一覧',
        category: 'カテゴリー',
        region: '地域',
        searchKeyword: '検索語',
        searchPlaceholder: 'サプライヤー名、製品名など',
        allCategories: '全て',
        allRegions: '全て',
        resetButton: 'リセット',
        searchButton: '検索',
        galleryView: 'ギャラリー',
        listView: 'リスト',
        selectAll: '全選択',
        deleteSelected: '選択削除',
        noneSelected: '選択された項目はありません',
        itemsCount: '{count}件',
        viewDetail: '詳細を見る',
      },
      zh: {
        pageTitle: '关注的供应商',
        leftTitle: '搜索',
        resultsTitle: '关注列表',
        category: '品类',
        region: '地区',
        searchKeyword: '搜索词',
        searchPlaceholder: '供应商、产品',
        allCategories: '全部',
        allRegions: '全部',
        resetButton: '重置',
        searchButton: '搜索',
        galleryView: '画廊',
        listView: '列表',
        selectAll: '全选',
        deleteSelected: '删除所选',
        noneSelected: '未选择任何项',
        itemsCount: '{count}个',
        viewDetail: '查看详情',
      },
    } as const;
    return (texts as any)[currentLanguage]?.[key] ?? (texts as any).ko[key];
  };

  // Options
  const l1Categories = React.useMemo(() => getL1Categories(currentLanguage), [currentLanguage]);
  const l2Categories = React.useMemo(
    () => (selectedL1Category ? getL2Categories(selectedL1Category, currentLanguage) : []),
    [selectedL1Category, currentLanguage]
  );
  const l3Categories = React.useMemo(
    () => (selectedL2Category && selectedL2Category !== 'all' ? getL3Categories(selectedL1Category, selectedL2Category, currentLanguage) : []),
    [selectedL1Category, selectedL2Category, currentLanguage]
  );
  const l1Areas = React.useMemo(() => getL1Areas(currentLanguage), [currentLanguage]);
  const l2Areas = React.useMemo(
    () => (selectedL1Area ? getL2Areas(selectedL1Area, currentLanguage) : []),
    [selectedL1Area, currentLanguage]
  );

  // Handlers
  const handleL1CategoryChange = (value: string) => {
    setSelectedL1Category(value || '');
    setSelectedL2Category('all');
    setSelectedL3Category('all');
  };
  const handleL2CategoryChange = (value: string) => {
    setSelectedL2Category(value || 'all');
    setSelectedL3Category('all');
  };
  const handleL3CategoryChange = (value: string) => {
    setSelectedL3Category(value || 'all');
  };
  const handleL1AreaChange = (value: string) => {
    setSelectedL1Area(value || '');
    setSelectedL2Area('all');
  };
  const handleL2AreaChange = (value: string) => {
    setSelectedL2Area(value || 'all');
  };

  // Labels for triggers
  const getL1Label = React.useCallback(() => selectedL1Category ? (l1Categories.find(c => c.value === selectedL1Category)?.label || '') : '', [selectedL1Category, l1Categories]);
  const getL2Label = React.useCallback(() => (selectedL1Category && selectedL2Category !== 'all') ? (l2Categories.find(c => c.value === selectedL2Category)?.label || '') : '', [selectedL1Category, selectedL2Category, l2Categories]);
  const getL3Label = React.useCallback(() => (selectedL1Category && selectedL2Category !== 'all' && selectedL3Category !== 'all') ? (l3Categories.find(c => c.value === selectedL3Category)?.label || '') : '', [selectedL1Category, selectedL2Category, selectedL3Category, l3Categories]);
  const getAreaL1Label = React.useCallback(() => selectedL1Area ? (l1Areas.find(a => a.value === selectedL1Area)?.label || '') : '', [selectedL1Area, l1Areas]);
  const getAreaL2Label = React.useCallback(() => (selectedL1Area && selectedL2Area !== 'all') ? (l2Areas.find(a => a.value === selectedL2Area)?.label || '') : '', [selectedL1Area, selectedL2Area, l2Areas]);

  // Mock counters for likes and favorites
  const getLikesCount = (supplier: { id: number }) => (supplier.id % 100) + 10;
  const getFavoritesCount = (supplier: { id: number }) => (supplier.id % 50) + 5;

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredFavorites.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFavorites.map((s) => s.id)));
    }
  };
  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    setFavoriteSuppliers((prev) => prev.filter((s) => !selectedIds.has(s.id)));
    setSelectedIds(new Set());
  };
  const toggleFavorite = (supplierId: number) => {
    // Removing from favorites
    setFavoriteSuppliers((prev) => prev.filter((s) => s.id !== supplierId));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(supplierId);
      return next;
    });
  };

  // Filter favorites by simple criteria currently
  const filteredFavorites = React.useMemo(() => {
    return favoriteSuppliers.filter((s) => {
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q)) return false;
      }
      if (selectedL1Category && s.category !== selectedL1Category) return false;
      if (selectedL2Category && selectedL2Category !== 'all') {
        // For sample, treat categoryDepth3 as L3
        if (selectedL3Category && selectedL3Category !== 'all') {
          if (s.categoryDepth3 !== selectedL3Category) return false;
        }
      }
      if (selectedL1Area) {
        if (!s.location.includes(selectedL1Area)) return false;
        if (selectedL2Area !== 'all' && !s.location.includes(selectedL2Area)) return false;
      }
      return true;
    });
  }, [favoriteSuppliers, searchKeyword, selectedL1Category, selectedL2Category, selectedL3Category, selectedL1Area, selectedL2Area]);

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getText('pageTitle')}</h1>
          </div>

          {/* Content Layout: Left (30%) + Right (70%) */}
          <div className="flex gap-8">
            {/* Left Area - Search Section (30%) - Hidden on Mobile */}
            <div className="hidden md:block w-[30%]">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">{getText('leftTitle')}</h2>

                <div className="space-y-4">
                  {/* Keyword */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('searchKeyword')}</label>
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder={getText('searchPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('category')}</label>
                    <select
                      value={selectedL1Category}
                      onChange={(e) => handleL1CategoryChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    >
                      <option value="">{getText('allCategories')}</option>
                      {l1Categories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>

                    {selectedL1Category && (
                      <select
                        value={selectedL2Category}
                        onChange={(e) => handleL2CategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                      >
                        <option value="all">{getText('allCategories')}</option>
                        {l2Categories.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    )}

                    {selectedL2Category && selectedL2Category !== 'all' && (
                      <select
                        value={selectedL3Category}
                        onChange={(e) => handleL3CategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">{getText('allCategories')}</option>
                        {l3Categories.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('region')}</label>
                    <select
                      value={selectedL1Area}
                      onChange={(e) => handleL1AreaChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    >
                      <option value="">{getText('allRegions')}</option>
                      {l1Areas.map((a) => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                      ))}
                    </select>

                    {selectedL1Area && (
                      <select
                        value={selectedL2Area}
                        onChange={(e) => handleL2AreaChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">{getText('allRegions')}</option>
                        {l2Areas.map((a) => (
                          <option key={a.value} value={a.value}>{a.label}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setSearchKeyword('');
                        setSelectedL1Category('');
                        setSelectedL2Category('all');
                        setSelectedL3Category('all');
                        setSelectedL1Area('');
                        setSelectedL2Area('all');
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      {getText('resetButton')}
                    </button>
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      {getText('searchButton')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Area - Favorites List (70%) */}
            <div className="w-full md:w-[70%]">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                {/* Header with selection controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filteredFavorites.length && filteredFavorites.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{getText('selectAll')}</span>
                    </label>
                    <button
                      onClick={deleteSelected}
                      disabled={selectedIds.size === 0}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      title={selectedIds.size === 0 ? getText('noneSelected') : getText('deleteSelected')}
                    >
                      <Trash2 className="h-4 w-4" />
                      {getText('deleteSelected')} ({selectedIds.size})
                    </button>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('gallery')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'gallery' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                      title={getText('galleryView')}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                      title={getText('listView')}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                {filteredFavorites.length > 0 ? (
                  <>
                    {/* Gallery View - PC */}
                    {viewMode === 'gallery' && (
                      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredFavorites.map((supplier) => (
                          <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Placeholder image area */}
                            <div className="h-44 bg-gray-200 flex items-center justify-center">
                              <div className="text-gray-400 text-center">
                                <div className="text-3xl mb-1">🏢</div>
                                <div className="text-xs">Company Image</div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-1">
                                  <h3 className="font-semibold text-gray-900 text-lg">{supplier.name}</h3>
                                  {supplier.website && (
                                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="홈페이지 방문">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                                <button
                                  onClick={() => toggleFavorite(supplier.id)}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                  title="관심 해제"
                                >
                                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                </button>
                              </div>
                              <div className="space-y-2 mb-3">
                                <div className="text-sm text-gray-600">{supplier.categoryDepth3}</div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {supplier.location}
                                </div>
                              </div>
                              {/* Description */}
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{supplier.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-1">
                                  {supplier.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                                  ))}
                                </div>
                              </div>
                              {/* Stats under tags */}
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span>{supplier.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                                  <span>{getLikesCount(supplier)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  <span>{getFavoritesCount(supplier)}</span>
                                </div>
                              </div>
                              {/* Detail button */}
                              <div className="mt-3 flex justify-end">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">상세보기</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {(viewMode === 'list' || isMobile) && (
                      <div className="space-y-4">
                        {filteredFavorites.map((supplier) => (
                          <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                              {/* Checkbox */}
                              <div className="pt-2">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.has(supplier.id)}
                                  onChange={() => toggleSelected(supplier.id)}
                                  className="h-4 w-4"
                                />
                              </div>
                              {/* Icon - PC only */}
                              <div className="hidden md:flex w-16 h-16 bg-gray-200 rounded-lg items-center justify-center flex-shrink-0">
                                <div className="text-gray-400 text-2xl">🏢</div>
                              </div>
                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg truncate">{supplier.name}</h3>
                                    {supplier.website && (
                                      <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="홈페이지 방문">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => toggleFavorite(supplier.id)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    title="관심 해제"
                                  >
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                  <div className="text-sm text-gray-600">{supplier.categoryDepth3}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {supplier.location}
                                  </div>
                                </div>
                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{supplier.description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {supplier.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                                  ))}
                                </div>
                                {/* Stats under tags */}
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center gap-1 text-yellow-600">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span>{supplier.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4 text-blue-500" />
                                    <span>{getLikesCount(supplier)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>{getFavoritesCount(supplier)}</span>
                                  </div>
                                </div>
                                {/* Detail button */}
                                <div className="flex justify-end">
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">상세보기</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">관심 공급사가 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Search Button */}
      {isMobile && (
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
          aria-label={getText('leftTitle')}
        >
          <Filter className="h-6 w-6" />
        </button>
      )}

      {/* Mobile Search Modal */}
      {isSearchModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsSearchModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-4 top-20 bottom-20 bg-white rounded-lg shadow-xl z-50 flex flex-col">
            {/* Modal Header (match suppliers modal) */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {modalStep !== 'root' ? (
                <button
                  onClick={() => setModalStep('root')}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  aria-label="back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : (
                <div className="w-9" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 flex-1 text-center">{getText('leftTitle')}</h2>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                aria-label="close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {modalStep === 'root' && (
                <div className="p-4 space-y-4">
                  {/* Keyword */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('searchKeyword')}</label>
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder={getText('searchPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Category triggers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('category')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      <button type="button" onClick={() => setModalStep('catL1')} className="relative w-full px-3 py-3 border border-gray-300 rounded-lg text-left text-gray-700 bg-white flex items-center justify-between">
                        <span className="truncate">{getL1Label() || getText('allCategories')}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>
                      {selectedL1Category !== '' && (
                        <button type="button" onClick={() => setModalStep('catL2')} className="relative w-full px-3 py-3 border border-gray-300 rounded-lg text-left text-gray-700 bg-white flex items-center justify-between">
                          <span className="truncate">{getL2Label() || getText('allCategories')}</span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                      )}
                      {selectedL1Category !== '' && selectedL2Category !== 'all' && (
                        <button type="button" onClick={() => setModalStep('catL3')} className="relative w-full px-3 py-3 border border-gray-300 rounded-lg text-left text-gray-700 bg-white flex items-center justify-between">
                          <span className="truncate">{getL3Label() || getText('allCategories')}</span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Region triggers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getText('region')}</label>
                    <div className="grid grid-cols-1 gap-2">
                      <button type="button" onClick={() => setModalStep('areaL1')} className="relative w-full px-3 py-3 border border-gray-300 rounded-lg text-left text-gray-700 bg-white flex items-center justify-between">
                        <span className="truncate">{getAreaL1Label() || getText('allRegions')}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>
                      {selectedL1Area !== '' && (
                        <button type="button" onClick={() => setModalStep('areaL2')} className="relative w-full px-3 py-3 border border-gray-300 rounded-lg text-left text-gray-700 bg-white flex items-center justify-between">
                          <span className="truncate">{getAreaL2Label() || getText('allRegions')}</span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* Category steps */}
              {modalStep === 'catL1' && (
                <div className="p-4 space-y-2">
                  <button className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL1Category === '' ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL1CategoryChange(''); setModalStep('root'); }}>{getText('allCategories')}</button>
                  {l1Categories.map((c) => (
                    <button key={c.value} className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL1Category === c.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL1CategoryChange(c.value); setModalStep('catL2'); }}>{c.label}</button>
                  ))}
                </div>
              )}
              {modalStep === 'catL2' && (
                <div className="p-4 space-y-2">
                  <button className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL2Category === 'all' ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL2CategoryChange('all'); setModalStep('root'); }}>{getText('allCategories')}</button>
                  {l2Categories.map((c2) => (
                    <button key={c2.value} className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL2Category === c2.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL2CategoryChange(c2.value); setModalStep('catL3'); }}>{c2.label}</button>
                  ))}
                </div>
              )}
              {modalStep === 'catL3' && (
                <div className="p-4 space-y-2">
                  <button className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL3Category === 'all' ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL3CategoryChange('all'); setModalStep('root'); }}>{getText('allCategories')}</button>
                  {l3Categories.map((c3) => (
                    <button key={c3.value} className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL3Category === c3.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL3CategoryChange(c3.value); setModalStep('root'); }}>{c3.label}</button>
                  ))}
                </div>
              )}
              {/* Area steps */}
              {modalStep === 'areaL1' && (
                <div className="p-4 space-y-2">
                  <button className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL1Area === '' ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL1AreaChange(''); setModalStep('root'); }}>{getText('allRegions')}</button>
                  {l1Areas.map((a) => (
                    <button key={a.value} className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL1Area === a.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL1AreaChange(a.value); setModalStep('areaL2'); }}>{a.label}</button>
                  ))}
                </div>
              )}
              {modalStep === 'areaL2' && (
                <div className="p-4 space-y-2">
                  <button className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL2Area === 'all' ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL2AreaChange('all'); setModalStep('root'); }}>{getText('allRegions')}</button>
                  {l2Areas.map((a2) => (
                    <button key={a2.value} className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg ${selectedL2Area === a2.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`} onClick={() => { handleL2AreaChange(a2.value); setModalStep('root'); }}>{a2.label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer (root only) */}
            {modalStep === 'root' && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSearchKeyword('');
                      setSelectedL1Category('');
                      setSelectedL2Category('all');
                      setSelectedL3Category('all');
                      setSelectedL1Area('');
                      setSelectedL2Area('all');
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    {getText('resetButton')}
                  </button>
                  <button
                    onClick={() => setIsSearchModalOpen(false)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    {getText('searchButton')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}


