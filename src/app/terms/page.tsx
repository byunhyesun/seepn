'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function TermsContent() {
  const searchParams = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [selectedVersion, setSelectedVersion] = useState('v2.0');
  const [isMobile, setIsMobile] = useState(false);
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mobile detection
  console.info('isMobile', isMobile);
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
        pageTitle: '이용약관',
        versionLabel: '버전 선택',
        lastUpdated: '최종 수정일',
        effectiveDate: '시행일',
        // Version options
        version20: 'v2.0 (현재)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Terms content
        article1: '제1조 (목적)',
        article1Content: '이 약관은 SEEPN(이하 "회사")이 제공하는 공급사 검색 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.',
        article2: '제2조 (정의)',
        article2Content: '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.\n1. "서비스"란 회사가 제공하는 공급사 검색 및 관련 부가 서비스를 의미합니다.\n2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.\n3. "회원"란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.',
        article3: '제3조 (약관의 효력 및 변경)',
        article3Content: '1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.\n2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.\n3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있으며, 계속 이용할 경우 약관 변경에 동의한 것으로 간주됩니다.',
        article4: '제4조 (서비스의 제공 및 변경)',
        article4Content: '1. 회사는 다음과 같은 서비스를 제공합니다.\n   - 공급사 검색 및 정보 제공\n   - 공급사 평가 및 리뷰 서비스\n   - 기타 회사가 정하는 서비스\n2. 회사는 서비스의 내용을 변경할 수 있으며, 이 경우 변경사항을 사전에 공지합니다.',
        article5: '제5조 (서비스 이용)',
        article5Content: '1. 이용자는 이 약관과 관련 법령을 준수하여야 합니다.\n2. 이용자는 다음 행위를 하여서는 안 됩니다.\n   - 타인의 정보 도용\n   - 회사의 서비스 정보를 이용한 영리행위\n   - 기타 불법적이거나 부당한 행위',
        article6: '제6조 (개인정보보호)',
        article6Content: '회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.',
        article7: '제7조 (책임제한)',
        article7Content: '1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.\n2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.\n3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.',
        article8: '제8조 (분쟁해결)',
        article8Content: '1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.\n2. 이 약관과 관련하여 회사와 이용자 간에 발생한 분쟁은 대한민국 법을 적용하며, 서울중앙지방법원을 관할법원으로 합니다.'
      },
      en: {
        pageTitle: 'Terms of Service',
        versionLabel: 'Version Selection',
        lastUpdated: 'Last Updated',
        effectiveDate: 'Effective Date',
        // Version options
        version20: 'v2.0 (Current)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Terms content
        article1: 'Article 1 (Purpose)',
        article1Content: 'The purpose of these Terms is to stipulate the rights, obligations, responsibilities, and other necessary matters between the Company and Users regarding the use of the supplier search service (hereinafter referred to as "Service") provided by SEEPN (hereinafter referred to as "Company").',
        article2: 'Article 2 (Definitions)',
        article2Content: 'The definitions of terms used in these Terms are as follows:\n1. "Service" means the supplier search and related additional services provided by the Company.\n2. "User" means a person who receives services provided by the Company in accordance with these Terms.\n3. "Member" means a person who has registered as a member by providing personal information to the Company and can continuously receive information from the Company and use the services provided by the Company.',
        article3: 'Article 3 (Effect and Amendment of Terms)',
        article3Content: '1. These Terms shall become effective by posting on the service screen or notifying Users by other means.\n2. The Company may change these Terms when deemed necessary, and the changed Terms shall become effective by notice or notification in the same manner as paragraph 1.\n3. If Users do not agree to the changed Terms, they may discontinue using the service and withdraw, and continued use shall be deemed as consent to the change of Terms.',
        article4: 'Article 4 (Provision and Change of Services)',
        article4Content: '1. The Company provides the following services:\n   - Supplier search and information provision\n   - Supplier evaluation and review services\n   - Other services determined by the Company\n2. The Company may change the content of services, and in such cases, changes will be notified in advance.',
        article5: 'Article 5 (Service Use)',
        article5Content: '1. Users must comply with these Terms and related laws.\n2. Users shall not engage in the following acts:\n   - Misappropriation of others\' information\n   - Commercial activities using the Company\'s service information\n   - Other illegal or improper acts',
        article6: 'Article 6 (Privacy Protection)',
        article6Content: 'The Company strives to protect Users\' personal information in accordance with relevant laws. The protection and use of personal information shall be governed by relevant laws and the Company\'s Privacy Policy.',
        article7: 'Article 7 (Limitation of Liability)',
        article7Content: '1. The Company shall be exempt from liability for service provision when it cannot provide services due to natural disasters or equivalent force majeure.\n2. The Company shall not be liable for service use障害 caused by Users\' fault.\n3. The Company shall not be liable for Users\' loss of expected profits from using the service.',
        article8: 'Article 8 (Dispute Resolution)',
        article8Content: '1. The Company establishes and operates a damage compensation processing organization to reflect legitimate opinions or complaints raised by Users and to compensate for damages.\n2. Disputes arising between the Company and Users in relation to these Terms shall be governed by Korean law, and Seoul Central District Court shall be the competent court.'
      },
      ja: {
        pageTitle: '利用規約',
        versionLabel: 'バージョン選択',
        lastUpdated: '最終更新日',
        effectiveDate: '施行日',
        // Version options
        version20: 'v2.0 (現在)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Terms content
        article1: '第1条（目的）',
        article1Content: 'この規約は、SEEPN（以下「会社」）が提供するサプライヤー検索サービス（以下「サービス」）の利用に関して、会社と利用者間の権利、義務及び責任事項、その他必要な事項を規定することを目的とします。',
        article2: '第2条（定義）',
        article2Content: 'この規約で使用する用語の定義は次の通りです。\n1.「サービス」とは、会社が提供するサプライヤー検索及び関連付加サービスを意味します。\n2.「利用者」とは、この規約に従って会社が提供するサービスを受ける者を意味します。\n3.「会員」とは、会社に個人情報を提供して会員登録をした者で、会社の情報を継続的に提供を受け、会社が提供するサービスを継続的に利用できる者を意味します。',
        article3: '第3条（規約の効力及び変更）',
        article3Content: '1. この規約は、サービス画面に掲示するか、その他の方法で利用者に公知することにより効力を発生します。\n2. 会社は必要と認められる場合、この規約を変更することができ、変更された規約は第1項と同じ方法で公知または通知することにより効力を発生します。\n3. 利用者は変更された規約に同意しない場合、サービス利用を中断し退会することができ、継続利用する場合は規約変更に同意したものとみなされます。',
        article4: '第4条（サービスの提供及び変更）',
        article4Content: '1. 会社は次のようなサービスを提供します。\n   - サプライヤー検索及び情報提供\n   - サプライヤー評価及びレビューサービス\n   - その他会社が定めるサービス\n2. 会社はサービスの内容を変更することができ、この場合変更事項を事前に公知します。',
        article5: '第5条（サービス利用）',
        article5Content: '1. 利用者はこの規約と関連法令を遵守しなければなりません。\n2. 利用者は次の行為をしてはなりません。\n   - 他人の情報盗用\n   - 会社のサービス情報を利用した営利行為\n   - その他違法または不当な行為',
        article6: '第6条（個人情報保護）',
        article6Content: '会社は関連法令が定めるところに従い、利用者の個人情報を保護するため努力します。個人情報の保護及び使用については関連法令及び会社の個人情報処理方針が適用されます。',
        article7: '第7条（責任制限）',
        article7Content: '1. 会社は天災地変またはこれに準ずる不可抗力によりサービスを提供できない場合には、サービス提供に関する責任が免除されます。\n2. 会社は利用者の帰責事由によるサービス利用の障害については責任を負いません。\n3. 会社は利用者がサービスを利用して期待する収益を喪失したことについて責任を負いません。',
        article8: '第8条（紛争解決）',
        article8Content: '1. 会社は利用者が提起する正当な意見や不満を反映し、その被害を補償処理するため被害補償処理機構を設置・運営します。\n2. この規約に関して会社と利用者間に発生した紛争は大韓民国法を適用し、ソウル中央地方法院を管轄法院とします。'
      },
      zh: {
        pageTitle: '服务条款',
        versionLabel: '版本选择',
        lastUpdated: '最后更新',
        effectiveDate: '生效日期',
        // Version options
        version20: 'v2.0 (当前)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Terms content
        article1: '第1条（目的）',
        article1Content: '本条款旨在规定SEEPN（以下称"公司"）提供的供应商搜索服务（以下称"服务"）使用相关的公司与用户间的权利、义务及责任事项，以及其他必要事项。',
        article2: '第2条（定义）',
        article2Content: '本条款中使用术语的定义如下：\n1."服务"是指公司提供的供应商搜索及相关附加服务。\n2."用户"是指根据本条款接受公司提供服务的人。\n3."会员"是指向公司提供个人信息进行会员注册的人，可持续接受公司信息并持续使用公司提供服务的人。',
        article3: '第3条（条款的效力及变更）',
        article3Content: '1. 本条款通过在服务界面发布或以其他方式向用户公告而生效。\n2. 公司认为必要时可以变更本条款，变更后的条款通过第1项相同方式公告或通知而生效。\n3. 用户不同意变更条款时可中断服务使用并退出，继续使用时视为同意条款变更。',
        article4: '第4条（服务的提供及变更）',
        article4Content: '1. 公司提供以下服务：\n   - 供应商搜索及信息提供\n   - 供应商评价及评论服务\n   - 公司确定的其他服务\n2. 公司可以变更服务内容，此时将事先公告变更事项。',
        article5: '第5条（服务使用）',
        article5Content: '1. 用户必须遵守本条款和相关法令。\n2. 用户不得进行以下行为：\n   - 盗用他人信息\n   - 利用公司服务信息进行营利行为\n   - 其他违法或不当行为',
        article6: '第6条（个人信息保护）',
        article6Content: '公司根据相关法令规定努力保护用户的个人信息。个人信息的保护和使用适用相关法令及公司的个人信息处理方针。',
        article7: '第7条（责任限制）',
        article7Content: '1. 公司因天灾地变或相当的不可抗力无法提供服务时，免除服务提供责任。\n2. 公司对因用户过错导致的服务使用障碍不承担责任。\n3. 公司对用户使用服务期望获得的收益损失不承担责任。',
        article8: '第8条（争议解决）',
        article8Content: '1. 公司设置并运营损害赔偿处理机构，以反映用户提出的正当意见或投诉并处理损害赔偿。\n2. 与本条款相关的公司与用户间发生的争议适用大韩民国法律，以首尔中央地方法院为管辖法院。'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Version data
  const getVersionData = (version: string) => {
    const versionData = {
      'v2.0': {
        lastUpdated: '2025-01-01',
        effectiveDate: '2025-01-15'
      },
      'v1.9': {
        lastUpdated: '2024-10-01',
        effectiveDate: '2024-10-15'
      },
      'v1.8': {
        lastUpdated: '2024-07-01',
        effectiveDate: '2024-07-15'
      },
      'v1.7': {
        lastUpdated: '2024-04-01',
        effectiveDate: '2024-04-15'
      }
    };
    
    return versionData[version as keyof typeof versionData] || versionData['v2.0'];
  };

  const versionData = getVersionData(selectedVersion);

  const isEmbed = searchParams?.get('embed') === '1';

  const content = (
    <div className="prose max-w-none">
      {/* Article 1 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article1')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article1Content')}</p>
      </div>

      {/* Article 2 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article2')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article2Content')}</p>
      </div>

      {/* Article 3 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article3')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article3Content')}</p>
      </div>

      {/* Article 4 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article4')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article4Content')}</p>
      </div>

      {/* Article 5 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article5')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article5Content')}</p>
      </div>

      {/* Article 6 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article6')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article6Content')}</p>
      </div>

      {/* Article 7 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article7')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article7Content')}</p>
      </div>

      {/* Article 8 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article8')}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article8Content')}</p>
      </div>
    </div>
  );

  if (isEmbed) {
    return (
      <div className="p-4 md:p-6">
        {content}
      </div>
    );
  }

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
          
          {/* Version Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('versionLabel')}
                </label>
                <select
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="v2.0">{getText('version20')}</option>
                  <option value="v1.9">{getText('version19')}</option>
                  <option value="v1.8">{getText('version18')}</option>
                  <option value="v1.7">{getText('version17')}</option>
                </select>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{getText('lastUpdated')}:</span> {versionData.lastUpdated}
                </div>
                <div>
                  <span className="font-medium">{getText('effectiveDate')}:</span> {versionData.effectiveDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
          {content}
        </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<div />}>
      <TermsContent />
    </Suspense>
  );
}