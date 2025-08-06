import categoriesData from '../data/categories.json';

export interface Category {
  L1: string;
  L2: string;
  L3: string;
}

export interface CategoryOption {
  value: string;
  label: string;
}

// 카테고리 데이터 타입 캐스팅
export const categories: Category[] = categoriesData as Category[];

// 다국어 매핑 (모든 함수에서 공유)
const translations: { [key: string]: { [key: string]: string } } = {
    ko: {
      '비품/소모품': '비품/소모품',
      '인쇄 서비스': '인쇄 서비스',
      '출장 서비스': '출장 서비스',
      '복지 서비스': '복지 서비스',
      '교육 서비스': '교육 서비스',
      '차량관리': '차량관리',
      '사무 보조 서비스': '사무 보조 서비스',
      '건물 관리': '건물 관리',
      '시설 공사': '시설 공사',
      '보험 서비스': '보험 서비스',
      '마케팅 ': '마케팅',
      '정보통신': '정보통신',
      '전문 용역 서비스': '전문 용역 서비스',
      '물류 관리': '물류 관리',
      '생산 관리': '생산 관리',
      '연구개발': '연구개발',
      '비용': '비용'
    },
    en: {
      '비품/소모품': 'Office Supplies',
      '인쇄 서비스': 'Printing Services',
      '출장 서비스': 'Business Trip Services',
      '복지 서비스': 'Welfare Services',
      '교육 서비스': 'Education Services',
      '차량관리': 'Vehicle Management',
      '사무 보조 서비스': 'Office Support Services',
      '건물 관리': 'Building Management',
      '시설 공사': 'Facility Construction',
      '보험 서비스': 'Insurance Services',
      '마케팅 ': 'Marketing',
      '정보통신': 'IT & Communication',
      '전문 용역 서비스': 'Professional Services',
      '물류 관리': 'Logistics Management',
      '생산 관리': 'Production Management',
      '연구개발': 'R&D',
      '비용': 'Expenses',
      // L2 카테고리 번역 (주요 항목)
      '사무용품': 'Office Supplies',
      '공장용 소모품': 'Factory Supplies',
      '교육 서비스': 'Education Services',
      '명함': 'Business Cards',
      '스티커': 'Stickers',
      '판촉물': 'Promotional Items',
      '홍보': 'Promotion',
      '간식 서비스': 'Snack Services',
      '출장 서비스': 'Business Trip Services',
      '세차 서비스': 'Car Wash Services',
      '세탁 서비스': 'Laundry Services',
      '시설 공사': 'Facility Construction',
      '건물 관리': 'Building Management'
    },
    ja: {
      '비품/소모품': '備品・消耗品',
      '인쇄 서비스': '印刷サービス',
      '출장 서비스': '出張サービス',
      '복지 서비스': '福利厚生サービス',
      '교육 서비스': '教育サービス',
      '차량관리': '車両管理',
      '사무 보조 서비스': '事務補助サービス',
      '건물 관리': '建物管理',
      '시설 공사': '施設工事',
      '보험 서비스': '保険サービス',
      '마케팅 ': 'マーケティング',
      '정보통신': '情報通信',
      '전문 용역 서비스': '専門サービス',
      '물류 관리': '物流管理',
      '생산 관리': '生産管理',
      '연구개발': '研究開発',
      '비용': '費用',
      // L2 카테고리 번역 (주요 항목)
      '사무용품': '事務用品',
      '공장용 소모품': '工場用消耗品',
      '교육 서비스': '教育サービス',
      '명함': '名刺',
      '스티커': 'ステッカー',
      '판촉물': '販促物',
      '홍보': '広報',
      '간식 서비스': '軽食サービス',
      '출장 서비스': '出張サービス',
      '세차 서비스': '洗車サービス',
      '세탁 서비스': 'クリーニングサービス',
      '시설 공사': '施設工事',
      '건물 관리': '建物管理'
    },
    zh: {
      '비품/소모품': '办公用品',
      '인쇄 서비스': '印刷服务',
      '출장 서비스': '出差服务',
      '복지 서비스': '福利服务',
      '교육 서비스': '教育服务',
      '차량관리': '车辆管理',
      '사무 보조 서비스': '办公辅助服务',
      '건물 관리': '建筑管理',
      '시설 공사': '设施工程',
      '보험 서비스': '保险服务',
      '마케팅 ': '营销',
      '정보통신': '信息通信',
      '전문 용역 서비스': '专业服务',
      '물류 관리': '物流管理',
      '생산 관리': '生产管理',
      '연구개발': '研发',
      '비용': '费用',
      // L2 카테고리 번역 (주요 항목)
      '사무용품': '办公用品',
      '공장용 소모품': '工厂用品',
      '교육 서비스': '教育服务',
      '명함': '名片',
      '스티커': '贴纸',
      '판촉물': '促销品',
      '홍보': '宣传',
      '간식 서비스': '零食服务',
      '출장 서비스': '出差服务',
      '세차 서비스': '洗车服务',
      '세탁 서비스': '洗衣服务',
      '시설 공사': '设施建设',
      '건물 관리': '建筑管리'
    }
};

// L1 카테고리 목록 추출 (중복 제거)
export const getL1Categories = (language: string = 'ko'): CategoryOption[] => {
  const uniqueL1 = [...new Set(categories.map(cat => cat.L1))];
  
  return uniqueL1.map(l1 => ({
    value: l1,
    label: translations[language]?.[l1] || l1
  }));
};

// 특정 L1에 속하는 L2 카테고리 목록 추출
export const getL2Categories = (l1: string, language: string = 'ko'): CategoryOption[] => {
  const filteredCategories = categories.filter(cat => cat.L1 === l1);
  const uniqueL2 = [...new Set(filteredCategories.map(cat => cat.L2))].filter(l2 => l2);
  
  return uniqueL2.map(l2 => ({
    value: l2,
    label: translations[language]?.[l2] || l2
  }));
};

// 특정 L1, L2에 속하는 L3 카테고리 목록 추출
export const getL3Categories = (l1: string, l2: string, language: string = 'ko'): CategoryOption[] => {
  const filteredCategories = categories.filter(cat => cat.L1 === l1 && cat.L2 === l2);
  const uniqueL3 = [...new Set(filteredCategories.map(cat => cat.L3))].filter(l3 => l3);
  
  return uniqueL3.map(l3 => ({
    value: l3,
    label: translations[language]?.[l3] || l3
  }));
};

// 검색용 - 모든 카테고리를 평면화하여 검색 가능한 형태로 변환
export const getAllCategoriesFlat = (): string[] => {
  const allCategories = new Set<string>();
  categories.forEach(cat => {
    allCategories.add(cat.L1);
    allCategories.add(cat.L2);
    allCategories.add(cat.L3);
  });
  return Array.from(allCategories);
};

// 카테고리 검색 함수
export const searchCategories = (searchTerm: string): Category[] => {
  if (!searchTerm) return [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return categories.filter(cat => 
    cat.L1.toLowerCase().includes(lowerSearchTerm) ||
    cat.L2.toLowerCase().includes(lowerSearchTerm) ||
    cat.L3.toLowerCase().includes(lowerSearchTerm)
  );
};