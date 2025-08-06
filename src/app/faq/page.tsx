'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, ChevronDown, ChevronUp, Paperclip } from 'lucide-react';

export default function FAQPage() {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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

  // Get category label
  const getCategoryLabel = (category: string) => {
    const categoryLabels = {
      service: getText('tabService'),
      supplier: getText('tabSupplier'),
      advertising: getText('tabAdvertising'),
      payment: getText('tabPayment'),
      member: getText('tabMember'),
      other: getText('tabOther')
    };
    return categoryLabels[category as keyof typeof categoryLabels] || '';
  };

  // Text translations
  const getText = (key: string) => {
    const texts = {
      ko: {
        pageTitle: 'FAQ',
        pageDescription: '자주 묻는 질문과 답변을 확인하세요.',
        searchPlaceholder: '검색어를 입력하세요',
        searchButton: '검색',
        searchTypeTitle: '제목',
        searchTypeContent: '내용',
        // Tab menu
        tabAll: '전체',
        tabService: '서비스 이용문의',
        tabSupplier: '공급사 문의',
        tabAdvertising: '광고 문의',
        tabPayment: '결제 문의',
        tabMember: '회원 문의',
        tabOther: '기타 문의',
        // FAQ items
        attachmentFile: '첨부파일',
        downloadFile: '다운로드',
        // Sample FAQ data
        faq1Title: '서비스 이용 방법을 알고 싶습니다.',
        faq1Content: '안녕하세요. SEEPN 서비스 이용 방법에 대해 안내드립니다.\n\n1. 회원가입 후 로그인\n2. 원하는 제품/서비스 카테고리 선택\n3. 지역 및 기타 조건 설정\n4. 검색 결과에서 적합한 공급사 선택\n5. 상세 정보 확인 및 문의\n\n더 자세한 내용은 첨부된 이용 가이드를 참고해 주세요.',
        faq2Title: '공급사 등록은 어떻게 하나요?',
        faq2Content: '공급사 등록 절차는 다음과 같습니다.\n\n1. 공급사 회원가입\n2. 사업자등록증 및 필요 서류 제출\n3. 회사 정보 및 제품/서비스 정보 입력\n4. 관리자 검토 후 승인\n5. 서비스 이용 시작\n\n승인까지는 영업일 기준 3-5일 소요됩니다.',
        faq3Title: '광고 상품에는 어떤 것들이 있나요?',
        faq3Content: 'SEEPN에서 제공하는 광고 상품은 다음과 같습니다.\n\n1. 프리미엄 리스팅: 검색 결과 상단 노출\n2. 배너 광고: 메인 페이지 배너 영역\n3. 카테고리 광고: 특정 카테고리 페이지 광고\n4. TOP100 진입: TOP100 리스트 진입 지원\n\n각 상품별 자세한 요금과 혜택은 첨부된 광고 상품 안내서를 확인해 주세요.',
        faq4Title: '결제는 어떤 방법으로 가능한가요?',
        faq4Content: '결제 방법은 다음과 같습니다.\n\n개인 회원:\n- 신용카드 (VISA, MasterCard, JCB)\n- 계좌이체\n- 간편결제 (카카오페이, 네이버페이)\n\n기업 회원:\n- 법인카드\n- 계좌이체\n- 세금계산서 발행 가능\n\n결제 관련 문의는 고객센터로 연락해 주세요.',
        faq5Title: '회원 정보 수정은 어디서 하나요?',
        faq5Content: '회원 정보 수정 방법은 다음과 같습니다.\n\n1. 로그인 후 마이페이지 접속\n2. "회원정보 수정" 메뉴 선택\n3. 수정할 정보 입력\n4. 비밀번호 확인 후 저장\n\n이메일 주소 변경 시에는 인증 절차가 필요합니다.\n휴대폰 번호 변경 시에는 본인 인증이 필요합니다.',
        faq6Title: '탈퇴는 어떻게 하나요?',
        faq6Content: '회원 탈퇴 절차는 다음과 같습니다.\n\n1. 로그인 후 마이페이지 접속\n2. "회원탈퇴" 메뉴 선택\n3. 탈퇴 사유 선택\n4. 비밀번호 확인\n5. 탈퇴 완료\n\n탈퇴 시 주의사항:\n- 보유 포인트는 모두 소멸됩니다\n- 작성한 리뷰 및 평가는 삭제되지 않습니다\n- 재가입은 탈퇴 후 7일 이후 가능합니다'
      },
      en: {
        pageTitle: 'FAQ',
        pageDescription: 'Check frequently asked questions and answers.',
        searchPlaceholder: 'Enter search term',
        searchButton: 'Search',
        searchTypeTitle: 'Title',
        searchTypeContent: 'Content',
        // Tab menu
        tabAll: 'All',
        tabService: 'Service Inquiry',
        tabSupplier: 'Supplier Inquiry',
        tabAdvertising: 'Advertising Inquiry',
        tabPayment: 'Payment Inquiry',
        tabMember: 'Member Inquiry',
        tabOther: 'Other Inquiry',
        // FAQ items
        attachmentFile: 'Attachment',
        downloadFile: 'Download',
        // Sample FAQ data
        faq1Title: 'How do I use the service?',
        faq1Content: 'Hello. Here\'s how to use SEEPN service.\n\n1. Sign up and log in\n2. Select desired product/service category\n3. Set region and other conditions\n4. Select suitable supplier from search results\n5. Check detailed information and inquire\n\nPlease refer to the attached user guide for more details.',
        faq2Title: 'How do I register as a supplier?',
        faq2Content: 'Supplier registration process is as follows.\n\n1. Sign up as supplier member\n2. Submit business registration and required documents\n3. Enter company and product/service information\n4. Admin review and approval\n5. Start using service\n\nApproval takes 3-5 business days.',
        faq3Title: 'What advertising products are available?',
        faq3Content: 'SEEPN advertising products include:\n\n1. Premium Listing: Top exposure in search results\n2. Banner Ads: Main page banner area\n3. Category Ads: Specific category page ads\n4. TOP100 Entry: Support for TOP100 list entry\n\nPlease check the attached advertising product guide for detailed pricing and benefits.',
        faq4Title: 'What payment methods are available?',
        faq4Content: 'Payment methods are as follows.\n\nIndividual Members:\n- Credit Card (VISA, MasterCard, JCB)\n- Bank Transfer\n- Easy Payment (KakaoPay, NaverPay)\n\nCorporate Members:\n- Corporate Card\n- Bank Transfer\n- Tax invoice available\n\nFor payment inquiries, please contact customer service.',
        faq5Title: 'Where can I edit my member information?',
        faq5Content: 'How to edit member information:\n\n1. Access My Page after login\n2. Select "Edit Member Information" menu\n3. Enter information to modify\n4. Confirm password and save\n\nEmail address change requires verification.\nPhone number change requires identity verification.',
        faq6Title: 'How do I withdraw my membership?',
        faq6Content: 'Membership withdrawal process:\n\n1. Access My Page after login\n2. Select "Withdraw Membership" menu\n3. Select reason for withdrawal\n4. Confirm password\n5. Complete withdrawal\n\nWithdrawal notes:\n- All points will be forfeited\n- Reviews and ratings will not be deleted\n- Re-registration possible 7 days after withdrawal'
      },
      ja: {
        pageTitle: 'FAQ',
        pageDescription: 'よくある質問と回答をご確認ください。',
        searchPlaceholder: '検索語を入力してください',
        searchButton: '検索',
        searchTypeTitle: 'タイトル',
        searchTypeContent: '内容',
        // Tab menu
        tabAll: '全体',
        tabService: 'サービス利用問い合わせ',
        tabSupplier: 'サプライヤー問い合わせ',
        tabAdvertising: '広告問い合わせ',
        tabPayment: '決済問い合わせ',
        tabMember: '会員問い合わせ',
        tabOther: 'その他問い合わせ',
        // FAQ items
        attachmentFile: '添付ファイル',
        downloadFile: 'ダウンロード',
        // Sample FAQ data
        faq1Title: 'サービスの利用方法を知りたいです。',
        faq1Content: 'こんにちは。SEEPNサービスの利用方法をご案内します。\n\n1. 会員登録後ログイン\n2. 希望する製品/サービスカテゴリー選択\n3. 地域およびその他条件設定\n4. 検索結果から適切なサプライヤー選択\n5. 詳細情報確認およびお問い合わせ\n\n詳細については添付された利用ガイドをご参照ください。',
        faq2Title: 'サプライヤー登録はどのように行いますか？',
        faq2Content: 'サプライヤー登録手続きは以下の通りです。\n\n1. サプライヤー会員登録\n2. 事業者登録証および必要書類提出\n3. 会社情報および製品/サービス情報入力\n4. 管理者審査後承認\n5. サービス利用開始\n\n承認まで営業日基準3-5日かかります。',
        faq3Title: '広告商品にはどのようなものがありますか？',
        faq3Content: 'SEEPNで提供する広告商品は以下の通りです。\n\n1. プレミアムリスティング：検索結果上位露出\n2. バナー広告：メインページバナー領域\n3. カテゴリー広告：特定カテゴリーページ広告\n4. TOP100進入：TOP100リスト進入支援\n\n各商品別詳細料金と特典は添付された広告商品案内書をご確認ください。',
        faq4Title: '決済はどの方法で可能ですか？',
        faq4Content: '決済方法は以下の通りです。\n\n個人会員：\n- クレジットカード（VISA、MasterCard、JCB）\n- 口座振替\n- 簡単決済（カカオペイ、ネイバーペイ）\n\n法人会員：\n- 法人カード\n- 口座振替\n- 税金計算書発行可能\n\n決済関連お問い合わせはカスタマーセンターまでご連絡ください。',
        faq5Title: '会員情報修正はどこで行いますか？',
        faq5Content: '会員情報修正方法は以下の通りです。\n\n1. ログイン後マイページアクセス\n2. "会員情報修正"メニュー選択\n3. 修正する情報入力\n4. パスワード確認後保存\n\nメールアドレス変更時は認証手続きが必要です。\n携帯電話番号変更時は本人認証が必要です。',
        faq6Title: '退会はどのように行いますか？',
        faq6Content: '会員退会手続きは以下の通りです。\n\n1. ログイン後マイページアクセス\n2. "会員退会"メニュー選択\n3. 退会事由選択\n4. パスワード確認\n5. 退会完了\n\n退会時注意事項：\n- 保有ポイントはすべて消滅します\n- 作成したレビューおよび評価は削除されません\n- 再加入は退会後7日以降可能です'
      },
      zh: {
        pageTitle: 'FAQ',
        pageDescription: '查看常见问题和答案。',
        searchPlaceholder: '请输入搜索词',
        searchButton: '搜索',
        searchTypeTitle: '标题',
        searchTypeContent: '内容',
        // Tab menu
        tabAll: '全部',
        tabService: '服务使用咨询',
        tabSupplier: '供应商咨询',
        tabAdvertising: '广告咨询',
        tabPayment: '付款咨询',
        tabMember: '会员咨询',
        tabOther: '其他咨询',
        // FAQ items
        attachmentFile: '附件',
        downloadFile: '下载',
        // Sample FAQ data
        faq1Title: '想了解服务使用方法。',
        faq1Content: '您好。为您介绍SEEPN服务使用方法。\n\n1. 注册会员后登录\n2. 选择所需产品/服务类别\n3. 设置地区及其他条件\n4. 从搜索结果中选择合适的供应商\n5. 查看详细信息并咨询\n\n更多详细内容请参考附件中的使用指南。',
        faq2Title: '供应商注册如何进行？',
        faq2Content: '供应商注册流程如下。\n\n1. 供应商会员注册\n2. 提交营业执照及必要文件\n3. 输入公司信息及产品/服务信息\n4. 管理员审核后批准\n5. 开始使用服务\n\n批准需要3-5个工作日。',
        faq3Title: '有哪些广告产品？',
        faq3Content: 'SEEPN提供的广告产品如下。\n\n1. 高级列表：搜索结果顶部展示\n2. 横幅广告：主页横幅区域\n3. 类别广告：特定类别页面广告\n4. TOP100进入：支持进入TOP100列表\n\n各产品的详细价格和优惠请查看附件中的广告产品指南。',
        faq4Title: '可以使用哪些付款方式？',
        faq4Content: '付款方式如下。\n\n个人会员：\n- 信用卡（VISA、MasterCard、JCB）\n- 银行转账\n- 简便支付（KakaoPay、NaverPay）\n\n企业会员：\n- 企业卡\n- 银行转账\n- 可开具税务发票\n\n付款相关咨询请联系客服中心。',
        faq5Title: '会员信息修改在哪里进行？',
        faq5Content: '会员信息修改方法如下。\n\n1. 登录后访问我的页面\n2. 选择"会员信息修改"菜单\n3. 输入要修改的信息\n4. 确认密码后保存\n\n更改邮箱地址时需要验证程序。\n更改手机号码时需要身份验证。',
        faq6Title: '如何退会？',
        faq6Content: '会员退会流程如下。\n\n1. 登录后访问我的页面\n2. 选择"会员退会"菜单\n3. 选择退会原因\n4. 确认密码\n5. 完成退会\n\n退会注意事项：\n- 持有积分将全部消失\n- 撰写的评论和评价不会被删除\n- 重新注册需在退会7天后进行'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Sample FAQ data
  const sampleFAQs = [
    {
      id: 1,
      category: 'service',
      title: getText('faq1Title'),
      content: getText('faq1Content'),
      hasAttachment: true,
      attachments: [
        { name: 'service_guide.pdf', size: '2.1MB' }
      ]
    },
    {
      id: 2,
      category: 'supplier',
      title: getText('faq2Title'),
      content: getText('faq2Content'),
      hasAttachment: false,
      attachments: []
    },
    {
      id: 3,
      category: 'advertising',
      title: getText('faq3Title'),
      content: getText('faq3Content'),
      hasAttachment: true,
      attachments: [
        { name: 'advertising_products.pdf', size: '1.5MB' }
      ]
    },
    {
      id: 4,
      category: 'payment',
      title: getText('faq4Title'),
      content: getText('faq4Content'),
      hasAttachment: false,
      attachments: []
    },
    {
      id: 5,
      category: 'member',
      title: getText('faq5Title'),
      content: getText('faq5Content'),
      hasAttachment: false,
      attachments: []
    },
    {
      id: 6,
      category: 'member',
      title: getText('faq6Title'),
      content: getText('faq6Content'),
      hasAttachment: false,
      attachments: []
    }
  ];

  // Filter FAQs based on active tab and search
  const filteredFAQs = sampleFAQs.filter(faq => {
    // Filter by tab
    if (activeTab !== 'all' && faq.category !== activeTab) {
      return false;
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (searchType === 'title') {
        return faq.title.toLowerCase().includes(query);
      } else {
        return faq.content.toLowerCase().includes(query);
      }
    }

    return true;
  });

  // Handle FAQ expand/collapse
  const toggleFAQ = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Handle search
  const handleSearch = () => {
    // Search is handled by filteredFAQs automatically
    console.log('Search:', searchType, searchQuery);
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

          {/* Search Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="title">{getText('searchTypeTitle')}</option>
                <option value="content">{getText('searchTypeContent')}</option>
              </select>
              
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={getText('searchPlaceholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {getText('searchButton')}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Menu */}
          <div className="mb-8">
            {/* PC Tab Menu */}
            <div className="hidden md:block border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'all', label: getText('tabAll') },
                  { key: 'service', label: getText('tabService') },
                  { key: 'supplier', label: getText('tabSupplier') },
                  { key: 'advertising', label: getText('tabAdvertising') },
                  { key: 'payment', label: getText('tabPayment') },
                  { key: 'member', label: getText('tabMember') },
                  { key: 'other', label: getText('tabOther') }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Select Menu */}
            <div className="block md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">{getText('tabAll')}</option>
                <option value="service">{getText('tabService')}</option>
                <option value="supplier">{getText('tabSupplier')}</option>
                <option value="advertising">{getText('tabAdvertising')}</option>
                <option value="payment">{getText('tabPayment')}</option>
                <option value="member">{getText('tabMember')}</option>
                <option value="other">{getText('tabOther')}</option>
              </select>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-lg">
                  {/* FAQ Header */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 flex-1 pr-4">
                      {activeTab === 'all' ? `[${getCategoryLabel(faq.category)}] ${faq.title}` : faq.title}
                    </h3>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {/* FAQ Content */}
                  {expandedItems.has(faq.id) && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      {/* Attachments */}
                      {faq.hasAttachment && faq.attachments.length > 0 && (
                        <div className="mb-4 pt-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">{getText('attachmentFile')}</h4>
                          <div className="space-y-2">
                            {faq.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                <div className="flex items-center">
                                  <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                                </div>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                                  {getText('downloadFile')}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className={faq.hasAttachment ? 'pt-0' : 'pt-4'}>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}