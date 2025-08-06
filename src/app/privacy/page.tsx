'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [selectedVersion, setSelectedVersion] = useState('v2.0');
  const [isMobile, setIsMobile] = useState(false);
  const [userCountry, setUserCountry] = useState('대한민국');
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        pageTitle: '개인정보처리방침',
        versionLabel: '버전 선택',
        lastUpdated: '최종 수정일',
        effectiveDate: '시행일',
        // Version options
        version20: 'v2.0 (현재)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Privacy content
        article1: '제1조 (개인정보의 처리목적)',
        article1Content: 'SEEPN(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n1. 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적\n2. 서비스 제공: 공급사 검색 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증\n3. 마케팅 및 광고에의 활용: 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계',
        article2: '제2조 (개인정보의 처리 및 보유기간)',
        article2Content: '① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n1. 회원가입 및 관리: 회원 탈퇴 시까지\n   다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지\n   - 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료시까지\n   - 서비스 이용에 따른 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지\n2. 서비스 제공: 서비스 이용계약 종료시까지\n3. 마케팅 및 광고 활용: 동의철회 시 또는 마케팅 및 광고 목적 달성시까지',
        article3: '제3조 (개인정보의 제3자 제공)',
        article3Content: '① 회사는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.\n1. 공급사 정보 제공업체\n   - 제공받는 자: 등록된 공급사\n   - 제공받는 자의 개인정보 이용목적: 서비스 문의 응답, 상담\n   - 제공하는 개인정보 항목: 성명, 연락처, 이메일\n   - 제공받는 자의 보유·이용기간: 문의 처리 완료시까지',
        article4: '제4조 (개인정보처리의 위탁)',
        article4Content: '① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n1. 클라우드 서비스 제공\n   - 위탁받는 자 (수탁자): AWS(Amazon Web Services)\n   - 위탁하는 업무의 내용: 클라우드 서비스 제공 및 관리\n   - 위탁기간: 서비스 이용계약 종료시까지\n2. 고객상담 및 민원처리\n   - 위탁받는 자 (수탁자): 고객센터 운영업체\n   - 위탁하는 업무의 내용: 고객 상담, 민원 접수 및 처리\n   - 위탁기간: 위탁계약 종료시까지\n② 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.',
        article5: '제5조 (정보주체의 권리·의무 및 행사방법)',
        article5Content: '① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.\n1. 개인정보 처리현황 통지요구\n2. 개인정보 열람요구\n3. 개인정보 정정·삭제요구\n4. 개인정보 처리정지요구\n② 제1항에 따른 권리 행사는 회사에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.\n③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.\n④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.',
        article6: '제6조 (개인정보의 파기)',
        article6Content: '① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.\n② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.\n③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.\n1. 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.\n2. 파기방법\n   - 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.\n   - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.',
        article7: '제7조 (개인정보의 안전성 확보조치)',
        article7Content: '회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.\n1. 개인정보 취급 직원의 최소화 및 교육\n   개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.\n2. 정기적인 자체 감사 실시\n   개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.\n3. 내부관리계획의 수립 및 시행\n   개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.\n4. 개인정보의 암호화\n   이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.\n5. 해킹 등에 대비한 기술적 대책\n   회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.\n6. 개인정보에 대한 접근 제한\n   개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.',
        article8: '제8조 (개인정보 보호책임자)',
        article8Content: '① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n▶ 개인정보 보호책임자\n성명: 김개인\n직책: 개인정보보호팀장\n연락처: privacy@seepn.com, 02-1234-5678\n※ 개인정보 보호 담당부서로 연결됩니다.\n▶ 개인정보 보호 담당부서\n부서명: 개인정보보호팀\n담당자: 이보호\n연락처: privacy@seepn.com, 02-1234-5679\n② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.',
        article9: '제9조 (권익침해 구제방법)',
        article9Content: '정보주체는 아래의 기관에 대해 개인정보 침해신고, 상담 등을 문의하실 수 있습니다.\n▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)\n- 소관업무: 개인정보 침해신고 접수 및 처리, 피해구제 신청 접수 및 처리\n- 홈페이지: privacy.go.kr\n- 전화: (국번없이) 182\n- 주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터\n▶ 개인정보 분쟁조정위원회\n- 소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사상 배상)\n- 홈페이지: www.kopico.go.kr\n- 전화: (국번없이) 1833-6972\n- 주소: (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층\n▶ 대검찰청 사이버범죄수사단: 02-3480-3573\n▶ 경찰청 사이버테러대응센터: www.netan.go.kr (국번없이) 182'
      },
      en: {
        pageTitle: 'Privacy Policy',
        versionLabel: 'Version Selection',
        lastUpdated: 'Last Updated',
        effectiveDate: 'Effective Date',
        // Version options
        version20: 'v2.0 (Current)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Privacy content
        article1: 'Article 1 (Purpose of Personal Information Processing)',
        article1Content: 'SEEPN (hereinafter "Company") processes personal information for the following purposes. Personal information being processed will not be used for purposes other than the following, and if the purpose of use changes, necessary measures such as obtaining separate consent will be implemented in accordance with Article 18 of the Personal Information Protection Act.\n1. Membership registration and management: Confirmation of membership intention, identification and authentication for membership services, maintenance and management of membership qualifications, prevention of fraudulent use of services, various notices and notifications, grievance handling\n2. Service provision: Supplier search service provision, content provision, customized service provision, identity verification\n3. Marketing and advertising utilization: Provision of events and advertising information and participation opportunities, service provision and advertisement placement according to demographic characteristics, service effectiveness verification, access frequency analysis or statistics on members\' service usage',
        article2: 'Article 2 (Personal Information Processing and Retention Period)',
        article2Content: '① The Company processes and retains personal information within the personal information retention and use period according to laws or the personal information retention and use period agreed upon when collecting personal information from data subjects.\n② Each personal information processing and retention period is as follows:\n1. Membership registration and management: Until membership withdrawal\n   However, in the following cases, until the end of the relevant reason:\n   - When investigation or inquiry due to violation of related laws is in progress: Until the end of the investigation or inquiry\n   - When credit-debt relationship remains due to service use: Until settlement of the credit-debt relationship\n2. Service provision: Until termination of service use contract\n3. Marketing and advertising utilization: Until consent withdrawal or achievement of marketing and advertising purposes',
        article3: 'Article 3 (Provision of Personal Information to Third Parties)',
        article3Content: '① The Company processes personal information only within the scope specified in Article 1 (Purpose of Personal Information Processing), and provides personal information to third parties only when it corresponds to Article 17 of the Personal Information Protection Act, such as consent of the data subject or special provisions of law.\n② The Company provides personal information to third parties as follows:\n1. Supplier information providers\n   - Recipients: Registered suppliers\n   - Purpose of personal information use by recipients: Service inquiry response, consultation\n   - Personal information items provided: Name, contact information, email\n   - Recipients\' retention and use period: Until inquiry processing is completed',
        article4: 'Article 4 (Consignment of Personal Information Processing)',
        article4Content: '① The Company consigns personal information processing tasks as follows for smooth personal information processing:\n1. Cloud service provision\n   - Consignee: AWS (Amazon Web Services)\n   - Content of consigned work: Cloud service provision and management\n   - Consignment period: Until termination of service use contract\n2. Customer consultation and complaint handling\n   - Consignee: Customer center operating company\n   - Content of consigned work: Customer consultation, complaint reception and processing\n   - Consignment period: Until termination of consignment contract\n② When concluding consignment contracts, the Company specifies matters related to prohibition of personal information processing other than consignment work performance purposes, technical and administrative protective measures, restriction of re-consignment, management and supervision of consignees, and liability for damages in documents such as contracts in accordance with Article 26 of the Personal Information Protection Act, and supervises whether consignees process personal information safely.',
        article5: 'Article 5 (Rights and Obligations of Data Subjects and Exercise Methods)',
        article5Content: '① Data subjects may exercise the following personal information protection-related rights against the Company at any time:\n1. Request for notification of personal information processing status\n2. Request for access to personal information\n3. Request for correction and deletion of personal information\n4. Request for suspension of personal information processing\n② The exercise of rights under paragraph 1 may be made to the Company in writing, by email, fax, etc. in accordance with Article 41, paragraph 1 of the Enforcement Decree of the Personal Information Protection Act, and the Company will take measures without delay.\n③ When a data subject requests correction or deletion of errors in personal information, the Company will not use or provide the personal information until the correction or deletion is completed.\n④ The exercise of rights under paragraph 1 may be done through agents such as legal representatives of data subjects or authorized persons. In this case, a power of attorney according to Form No. 11 of the Enforcement Rules of the Personal Information Protection Act must be submitted.',
        article6: 'Article 6 (Destruction of Personal Information)',
        article6Content: '① The Company destroys personal information without delay when personal information becomes unnecessary due to expiration of the retention period, achievement of processing purposes, etc.\n② When the personal information retention period agreed upon by the data subject has expired or the processing purpose has been achieved, but personal information must continue to be preserved according to other laws, the personal information is moved to a separate database (DB) or stored in a different storage location.\n③ The procedures and methods for destroying personal information are as follows:\n1. Destruction procedure: The Company selects personal information for which reasons for destruction have occurred and destroys personal information with approval from the Company\'s personal information protection officer.\n2. Destruction method\n   - Information in electronic file format uses technical methods that cannot reproduce records.\n   - Personal information printed on paper is destroyed by shredding with a shredder or incineration.',
        article7: 'Article 7 (Measures to Ensure Safety of Personal Information)',
        article7Content: 'The Company implements the following technical/administrative and physical measures necessary to ensure safety in accordance with Article 29 of the Personal Information Protection Act:\n1. Minimization and training of personal information handling staff\n   Staff handling personal information are designated and limited to those in charge to minimize and manage personal information.\n2. Regular internal audits\n   Regular internal audits are conducted quarterly to ensure stability in personal information handling.\n3. Establishment and implementation of internal management plans\n   Internal management plans are established and implemented for safe processing of personal information.\n4. Encryption of personal information\n   Users\' personal information passwords are encrypted and stored and managed, so only the person knows them, and important data uses separate security functions such as encrypting files and transmission data or using file lock functions.\n5. Technical measures against hacking\n   The Company installs security programs and conducts periodic updates and inspections to prevent personal information leakage and damage due to hacking or computer viruses, installs systems in areas with controlled external access, and technically/physically monitors and blocks them.\n6. Access restriction to personal information\n   Necessary measures are taken for access control to personal information by granting, changing, and revoking access rights to database systems that process personal information, and unauthorized external access is controlled using intrusion prevention systems.',
        article8: 'Article 8 (Personal Information Protection Officer)',
        article8Content: '① The Company designates a personal information protection officer as follows to take overall responsibility for personal information processing and handle complaints and damage relief related to personal information processing by data subjects:\n▶ Personal Information Protection Officer\nName: Kim Personal\nPosition: Personal Information Protection Team Leader\nContact: privacy@seepn.com, 02-1234-5678\n※ Connected to the personal information protection department.\n▶ Personal Information Protection Department\nDepartment: Personal Information Protection Team\nPerson in charge: Lee Protection\nContact: privacy@seepn.com, 02-1234-5679\n② Data subjects may contact the personal information protection officer and department for all personal information protection-related inquiries, complaint handling, damage relief, etc. that occur while using the Company\'s services (or business). The Company will respond to and process data subjects\' inquiries without delay.',
        article9: 'Article 9 (Methods for Relief of Rights Violations)',
        article9Content: 'Data subjects may contact the following organizations for personal information violation reports, consultations, etc.\n▶ Personal Information Violation Report Center (operated by Korea Internet & Security Agency)\n- Jurisdiction: Reception and processing of personal information violation reports, reception and processing of damage relief applications\n- Website: privacy.go.kr\n- Phone: 182 (without area code)\n- Address: 3rd floor, Personal Information Violation Report Center, 9 Jinheung-gil, Naju-si, Jeollanam-do (58324)\n▶ Personal Information Dispute Mediation Committee\n- Jurisdiction: Personal information dispute mediation applications, collective dispute mediation (civil compensation)\n- Website: www.kopico.go.kr\n- Phone: 1833-6972 (without area code)\n- Address: 4th floor, Government Seoul Complex, 209 Sejong-daero, Jongno-gu, Seoul (03171)\n▶ Supreme Prosecutors\' Office Cyber Crime Investigation Unit: 02-3480-3573\n▶ National Police Agency Cyber Terror Response Center: www.netan.go.kr 182 (without area code)'
      },
      ja: {
        pageTitle: 'プライバシーポリシー',
        versionLabel: 'バージョン選択',
        lastUpdated: '最終更新日',
        effectiveDate: '施行日',
        // Version options
        version20: 'v2.0 (現在)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Privacy content
        article1: '第1条（個人情報の処理目的）',
        article1Content: 'SEEPN（以下「会社」）は次の目的のために個人情報を処理します。処理している個人情報は次の目的以外の用途には利用されず、利用目的が変更される場合には個人情報保護法第18条に従って別途の同意を得るなど必要な措置を履行する予定です。\n1. 会員加入及び管理：会員加入意思確認、会員制サービス提供に伴う本人識別・認証、会員資格維持・管理、サービス不正利用防止、各種告知・通知、苦情処理目的\n2. サービス提供：サプライヤー検索サービス提供、コンテンツ提供、カスタマイズサービス提供、本人認証\n3. マーケティング及び広告への活用：イベント及び広告性情報提供及び参加機会提供、人口統計学的特性に応じたサービス提供及び広告掲載、サービスの有効性確認、接続頻度把握または会員のサービス利用に対する統計',
        article2: '第2条（個人情報の処理及び保有期間）',
        article2Content: '① 会社は法令による個人情報保有・利用期間または情報主体から個人情報を収集時に同意を受けた個人情報保有・利用期間内で個人情報を処理・保有します。\n② それぞれの個人情報処理及び保有期間は次の通りです。\n1. 会員加入及び管理：会員退会時まで\n   ただし、次の事由に該当する場合には該当事由終了時まで\n   - 関係法令違反による捜査・調査等が進行中の場合には該当捜査・調査終了時まで\n   - サービス利用による債権・債務関係残存時には該当債権・債務関係清算時まで\n2. サービス提供：サービス利用契約終了時まで\n3. マーケティング及び広告活用：同意撤回時またはマーケティング及び広告目的達成時まで',
        article3: '第3条（個人情報の第三者提供）',
        article3Content: '① 会社は個人情報を第1条（個人情報の処理目的）で明示した範囲内でのみ処理し、情報主体の同意、法律の特別な規定など個人情報保護法第17条に該当する場合にのみ個人情報を第三者に提供します。\n② 会社は次のように個人情報を第三者に提供しています。\n1. サプライヤー情報提供業者\n   - 提供を受ける者：登録されたサプライヤー\n   - 提供を受ける者の個人情報利用目的：サービス問い合わせ回答、相談\n   - 提供する個人情報項目：氏名、連絡先、メール\n   - 提供を受ける者の保有・利用期間：問い合わせ処理完了時まで',
        article4: '第4条（個人情報処理の委託）',
        article4Content: '① 会社は円滑な個人情報業務処理のために次のように個人情報処理業務を委託しています。\n1. クラウドサービス提供\n   - 委託を受ける者（受託者）：AWS（Amazon Web Services）\n   - 委託する業務の内容：クラウドサービス提供及び管理\n   - 委託期間：サービス利用契約終了時まで\n2. 顧客相談及び民願処理\n   - 委託を受ける者（受託者）：顧客センター運営業者\n   - 委託する業務の内容：顧客相談、民願受付及び処理\n   - 委託期間：委託契約終了時まで\n② 会社は委託契約締結時、個人情報保護法第26条に従って委託業務遂行目的外個人情報処理禁止、技術的・管理的保護措置、再委託制限、受託者に対する管理・監督、損害賠償など責任に関する事項を契約書等文書に明示し、受託者が個人情報を安全に処理するかを監督しています。',
        article5: '第5条（情報主体の権利・義務及び行使方法）',
        article5Content: '① 情報主体は会社に対していつでも次の各号の個人情報保護関連権利を行使することができます。\n1. 個人情報処理現況通知要求\n2. 個人情報閲覧要求\n3. 個人情報訂正・削除要求\n4. 個人情報処理停止要求\n② 第1項による権利行使は会社に対して個人情報保護法施行令第41条第1項に従って書面、電子メール、模写伝送（FAX）等を通じて行うことができ、会社はこれに対して遅滞なく措置いたします。\n③ 情報主体が個人情報の誤り等に対する訂正または削除を要求した場合には、会社は訂正または削除を完了するまで当該個人情報を利用または提供しません。\n④ 第1項による権利行使は情報主体の法定代理人や委任を受けた者等代理人を通じて行うことができます。この場合、個人情報保護法施行規則別紙第11号書式による委任状を提出する必要があります。',
        article6: '第6条（個人情報の破棄）',
        article6Content: '① 会社は個人情報保有期間の経過、処理目的達成等個人情報が不要になった時には遅滞なく該当個人情報を破棄します。\n② 情報主体から同意を受けた個人情報保有期間が経過したり処理目的が達成されたにもかかわらず他の法令により個人情報を継続保存しなければならない場合には、該当個人情報を別途のデータベース（DB）に移すか保管場所を変えて保存します。\n③ 個人情報破棄の手続き及び方法は次の通りです。\n1. 破棄手続き：会社は破棄事由が発生した個人情報を選定し、会社の個人情報保護責任者の承認を受けて個人情報を破棄します。\n2. 破棄方法\n   - 電子的ファイル形態の情報は記録を再生できない技術的方法を使用します。\n   - 紙に出力された個人情報は粉砕機で粉砕するか焼却を通じて破棄します。',
        article7: '第7条（個人情報の安全性確保措置）',
        article7Content: '会社は個人情報保護法第29条に従って次のように安全性確保に必要な技術的/管理的及び物理的措置を行っています。\n1. 個人情報取扱職員の最小化及び教育\n   個人情報を取り扱う職員を指定し担当者に限定して最小化し個人情報を管理する対策を施行しています。\n2. 定期的な自体監査実施\n   個人情報取扱関連安定性確保のため定期的（四半期1回）に自体監査を実施しています。\n3. 内部管理計画の樹立及び施行\n   個人情報の安全な処理のため内部管理計画を樹立し施行しています。\n4. 個人情報の暗号化\n   利用者の個人情報はパスワードは暗号化されて保存及び管理されており、本人のみが知ることができ重要なデータはファイル及び伝送データを暗号化したりファイルロック機能を使用するなどの別途セキュリティ機能を使用しています。\n5. ハッキング等に備えた技術的対策\n   会社はハッキングやコンピュータウイルス等による個人情報流出及び毀損を防ぐためセキュリティプログラムを設置し周期的な更新・点検を行い外部からのアクセスが統制された区域にシステムを設置し技術的/物理的に監視及び遮断しています。\n6. 個人情報に対するアクセス制限\n   個人情報を処理するデータベースシステムに対するアクセス権限の付与、変更、抹消を通じて個人情報に対するアクセス統制のため必要な措置を行っており侵入遮断システムを利用して外部からの無断アクセスを統制しています。',
        article8: '第8条（個人情報保護責任者）',
        article8Content: '① 会社は個人情報処理に関する業務を総括して責任を負い、個人情報処理と関連した情報主体の不満処理及び被害救済等のため下記のように個人情報保護責任者を指定しています。\n▶ 個人情報保護責任者\n氏名：金個人\n職責：個人情報保護チーム長\n連絡先：privacy@seepn.com、02-1234-5678\n※ 個人情報保護担当部署に繋がります。\n▶ 個人情報保護担当部署\n部署名：個人情報保護チーム\n担当者：李保護\n連絡先：privacy@seepn.com、02-1234-5679\n② 情報主体の皆様は会社のサービス（または事業）を利用されながら発生したすべての個人情報保護関連お問い合わせ、不満処理、被害救済等に関する事項を個人情報保護責任者及び担当部署にお問い合わせいただけます。会社は情報主体のお問い合わせに対して遅滞なく回答及び処理いたします。',
        article9: '第9条（権益侵害救済方法）',
        article9Content: '情報主体は下記の機関に対して個人情報侵害申告、相談等をお問い合わせいただけます。\n▶ 個人情報侵害申告センター（韓国インターネット振興院運営）\n- 所管業務：個人情報侵害申告受付及び処理、被害救済申請受付及び処理\n- ホームページ：privacy.go.kr\n- 電話：（局番なし）182\n- 住所：（58324）全南羅州市振興路9（光がらむ洞301-2）3階個人情報侵害申告センター\n▶ 個人情報紛争調停委員会\n- 所管業務：個人情報紛争調停申請、集団紛争調停（民事上賠償）\n- ホームページ：www.kopico.go.kr\n- 電話：（局番なし）1833-6972\n- 住所：（03171）ソウル特別市鍾路区世宗大路209政府ソウル庁舎4階\n▶ 大検察庁サイバー犯罪捜査団：02-3480-3573\n▶ 警察庁サイバーテロ対応センター：www.netan.go.kr（局番なし）182'
      },
      zh: {
        pageTitle: '隐私政策',
        versionLabel: '版本选择',
        lastUpdated: '最后更新',
        effectiveDate: '生效日期',
        // Version options
        version20: 'v2.0 (当前)',
        version19: 'v1.9',
        version18: 'v1.8',
        version17: 'v1.7',
        // Privacy content
        article1: '第1条（个人信息的处理目的）',
        article1Content: 'SEEPN（以下称"公司"）为以下目的处理个人信息。所处理的个人信息不会用于以下目的以外的用途，如果使用目的发生变更，将根据个人信息保护法第18条获得单独同意等履行必要措施。\n1. 会员注册及管理：会员注册意向确认、提供会员制服务的本人识别·认证、会员资格维持·管理、防止服务不正当使用、各种告知·通知、处理投诉\n2. 服务提供：提供供应商搜索服务、提供内容、提供定制服务、本人认证\n3. 营销及广告利用：提供活动及广告信息和参与机会、根据人口统计学特征提供服务及投放广告、确认服务有效性、掌握访问频率或会员服务使用统计',
        article2: '第2条（个人信息的处理及保有期间）',
        article2Content: '① 公司在法令规定的个人信息保有·利用期间或从信息主体收集个人信息时同意的个人信息保有·利用期间内处理·保有个人信息。\n② 各个人信息处理及保有期间如下：\n1. 会员注册及管理：至会员退出时\n   但在以下情况下，至相应事由结束时\n   - 因违反相关法令正在进行调查·侦查等时：至相应调查·侦查结束时\n   - 因服务使用产生债权·债务关系残存时：至相应债权·债务关系清算时\n2. 服务提供：至服务使用合同终止时\n3. 营销及广告利用：至同意撤回时或营销及广告目的达成时',
        article3: '第3条（向第三方提供个人信息）',
        article3Content: '① 公司仅在第1条（个人信息的处理目的）明示的范围内处理个人信息，仅在符合个人信息保护法第17条规定的情况下（如信息主体同意、法律特别规定等）向第三方提供个人信息。\n② 公司如下向第三方提供个人信息：\n1. 供应商信息提供商\n   - 接受提供者：注册的供应商\n   - 接受提供者的个人信息利用目的：服务咨询回复、咨询\n   - 提供的个人信息项目：姓名、联系方式、邮箱\n   - 接受提供者的保有·利用期间：至咨询处理完成时',
        article4: '第4条（个人信息处理的委托）',
        article4Content: '① 公司为顺利处理个人信息业务，如下委托个人信息处理业务：\n1. 云服务提供\n   - 受托者：AWS（Amazon Web Services）\n   - 委托业务内容：云服务提供及管理\n   - 委托期间：至服务使用合同终止时\n2. 客户咨询及民愿处理\n   - 受托者：客服中心运营商\n   - 委托业务内容：客户咨询、民愿受理及处理\n   - 委托期间：至委托合同终止时\n② 公司在签订委托合同时，根据个人信息保护法第26条，在合同书等文件中明示禁止委托业务履行目的外个人信息处理、技术性·管理性保护措施、限制再委托、对受托者的管理·监督、损害赔偿等责任相关事项，并监督受托者是否安全处理个人信息。',
        article5: '第5条（信息主体的权利·义务及行使方法）',
        article5Content: '① 信息主体可随时对公司行使以下个人信息保护相关权利：\n1. 要求通知个人信息处理现状\n2. 要求查阅个人信息\n3. 要求更正·删除个人信息\n4. 要求停止个人信息处理\n② 根据第1项的权利行使可根据个人信息保护法施行令第41条第1项通过书面、电子邮件、传真（FAX）等方式向公司提出，公司将立即采取措施。\n③ 信息主体要求更正或删除个人信息错误等时，公司在完成更正或删除前不会使用或提供该个人信息。\n④ 根据第1项的权利行使可通过信息主体的法定代理人或受委托人等代理人进行。此时需提交根据个人信息保护法施行规则附件第11号格式的委托书。',
        article6: '第6条（个人信息的销毁）',
        article6Content: '① 公司在个人信息保有期间届满、处理目的达成等个人信息变得不必要时，立即销毁相应个人信息。\n② 从信息主体获得同意的个人信息保有期间届满或处理目的达成，但根据其他法令必须继续保存个人信息时，将相应个人信息移至单独的数据库（DB）或改变保管场所进行保存。\n③ 个人信息销毁的程序及方法如下：\n1. 销毁程序：公司选定产生销毁事由的个人信息，获得公司个人信息保护负责人批准后销毁个人信息。\n2. 销毁方法\n   - 电子文件形态的信息使用无法再生记录的技术方法。\n   - 打印在纸上的个人信息通过粉碎机粉碎或焚烧进行销毁。',
        article7: '第7条（个人信息的安全性确保措施）',
        article7Content: '公司根据个人信息保护法第29条如下实施确保安全性所需的技术性/管理性及物理性措施：\n1. 个人信息处理人员的最小化及教育\n   指定处理个人信息的人员并限制为负责人，实施最小化管理个人信息的对策。\n2. 实施定期自体审计\n   为确保个人信息处理相关稳定性，定期（每季度1次）实施自体审计。\n3. 制定及实施内部管理计划\n   为安全处理个人信息制定并实施内部管理计划。\n4. 个人信息的加密\n   用户个人信息的密码经加密存储及管理，只有本人知晓，重要数据使用加密文件及传输数据或使用文件锁定功能等单独安全功能。\n5. 防范黑客等的技术性对策\n   公司为防止因黑客或计算机病毒等导致的个人信息泄露及损坏，安装安全程序并进行定期更新·检查，在外部访问受控制的区域安装系统并进行技术性/物理性监视及阻断。\n6. 对个人信息的访问限制\n   通过对处理个人信息的数据库系统的访问权限授予、变更、删除，采取个人信息访问控制所需措施，利用入侵阻断系统控制外部未经授权访问。',
        article8: '第8条（个人信息保护负责人）',
        article8Content: '① 公司为总体负责个人信息处理相关业务，处理信息主体的个人信息处理相关投诉及损害救济等，如下指定个人信息保护负责人：\n▶ 个人信息保护负责人\n姓名：金个人\n职务：个人信息保护组长\n联系方式：privacy@seepn.com，02-1234-5678\n※ 连接至个人信息保护负责部门。\n▶ 个人信息保护负责部门\n部门名：个人信息保护组\n负责人：李保护\n联系方式：privacy@seepn.com，02-1234-5679\n② 信息主体可就使用公司服务（或业务）过程中发生的所有个人信息保护相关咨询、投诉处理、损害救济等事项向个人信息保护负责人及负责部门咨询。公司将立即回复并处理信息主体的咨询。',
        article9: '第9条（权益侵害救济方法）',
        article9Content: '信息主体可向以下机构咨询个人信息侵害举报、咨询等：\n▶ 个人信息侵害举报中心（韩国互联网振兴院运营）\n- 主管业务：个人信息侵害举报受理及处理、损害救济申请受理及处理\n- 网站：privacy.go.kr\n- 电话：（无区号）182\n- 地址：（58324）全南罗州市振兴路9（光伽蓝洞301-2）3层个人信息侵害举报中心\n▶ 个人信息纠纷调解委员会\n- 主管业务：个人信息纠纷调解申请、集体纠纷调解（民事赔偿）\n- 网站：www.kopico.go.kr\n- 电话：（无区号）1833-6972\n- 地址：（03171）首尔特别市钟路区世宗大路209政府首尔大楼4层\n▶ 大检察厅网络犯罪侦查团：02-3480-3573\n▶ 警察厅网络恐怖应对中心：www.netan.go.kr（无区号）182'
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

        {/* Privacy Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
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

            {/* Article 9 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{getText('article9')}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getText('article9Content')}</p>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} userCountry={userCountry} />
    </div>
  );
}