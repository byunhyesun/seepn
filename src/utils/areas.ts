import areasData from '../data/areas.json';

export interface Area {
  L1: string;
  L2?: string;
}

export interface AreaOption {
  value: string;
  label: string;
}

// 지역 데이터 타입 캐스팅
export const areas: Area[] = areasData as Area[];

// L1 지역 목록 추출 (시/도 단위, 중복 제거)
export const getL1Areas = (language: string = 'ko'): AreaOption[] => {
  const uniqueL1 = [...new Set(areas.map(area => area.L1))];
  
  // 다국어 매핑
  const translations: { [key: string]: { [key: string]: string } } = {
    ko: {
      '서울특별시': '서울특별시',
      '부산광역시': '부산광역시',
      '대구광역시': '대구광역시',
      '인천광역시': '인천광역시',
      '광주광역시': '광주광역시',
      '대전광역시': '대전광역시',
      '울산광역시': '울산광역시',
      '세종특별자치시': '세종특별자치시',
      '경기도': '경기도',
      '강원특별자치도': '강원특별자치도',
      '충청북도': '충청북도',
      '충청남도': '충청남도',
      '전라북도': '전라북도',
      '전라남도': '전라남도',
      '경상북도': '경상북도',
      '경상남도': '경상남도',
      '제주특별자치도': '제주특별자치도'
    },
    en: {
      '서울특별시': 'Seoul',
      '부산광역시': 'Busan',
      '대구광역시': 'Daegu',
      '인천광역시': 'Incheon',
      '광주광역시': 'Gwangju',
      '대전광역시': 'Daejeon',
      '울산광역시': 'Ulsan',
      '세종특별자치시': 'Sejong',
      '경기도': 'Gyeonggi Province',
      '강원특별자치도': 'Gangwon Province',
      '충청북도': 'North Chungcheong Province',
      '충청남도': 'South Chungcheong Province',
      '전라북도': 'North Jeolla Province',
      '전라남도': 'South Jeolla Province',
      '경상북도': 'North Gyeongsang Province',
      '경상남도': 'South Gyeongsang Province',
      '제주특별자치도': 'Jeju Province'
    },
    ja: {
      '서울특별시': 'ソウル特別市',
      '부산광역시': '釜山広域市',
      '대구광역시': '大邱広域市',
      '인천광역시': '仁川広域市',
      '광주광역시': '光州広域市',
      '대전광역시': '大田広域市',
      '울산광역시': '蔚山広域市',
      '세종특별자치시': '世宗特別自治市',
      '경기도': '京畿道',
      '강원특별자치도': '江原特別自治道',
      '충청북도': '忠清北道',
      '충청남도': '忠清南道',
      '전라북도': '全羅北道',
      '전라남도': '全羅南道',
      '경상북도': '慶尚北道',
      '경상남도': '慶尚南道',
      '제주특별자치도': '済州特別自治道'
    },
    zh: {
      '서울특별시': '首尔特别市',
      '부산광역시': '釜山广域市',
      '대구광역시': '大邱广域市',
      '인천광역시': '仁川广域市',
      '광주광역시': '光州广域市',
      '대전광역시': '大田广域市',
      '울산광역시': '蔚山广域市',
      '세종특별자치시': '世宗特别自治市',
      '경기도': '京畿道',
      '강원특별자치도': '江原特别自治道',
      '충청북도': '忠清北道',
      '충청남도': '忠清南道',
      '전라북도': '全罗北道',
      '전라남도': '全罗南道',
      '경상북도': '庆尚北道',
      '경상남도': '庆尚南道',
      '제주특별자치도': '济州特别自治道'
    }
  };
  
  return uniqueL1.map(l1 => ({
    value: l1,
    label: translations[language]?.[l1] || l1
  }));
};

// 특정 L1에 속하는 L2 지역 목록 추출 (시/군/구 단위)
export const getL2Areas = (l1: string, language: string = 'ko'): AreaOption[] => {
  const filteredAreas = areas.filter(area => area.L1 === l1 && area.L2);
  
  // L2 지역은 현재 번역 데이터가 없으므로 원본 그대로 사용
  // 필요시 나중에 번역 데이터 추가 가능
  return filteredAreas.map(area => ({
    value: area.L2!,
    label: area.L2! // 향후 translations[language]?.[area.L2!] || area.L2! 로 변경 가능
  }));
};

// 검색용 - 모든 지역을 평면화하여 검색 가능한 형태로 변환
export const getAllAreasFlat = (): string[] => {
  const allAreas = new Set<string>();
  areas.forEach(area => {
    allAreas.add(area.L1);
    if (area.L2) {
      allAreas.add(area.L2);
    }
  });
  return Array.from(allAreas);
};

// 지역 검색 함수
export const searchAreas = (searchTerm: string): Area[] => {
  if (!searchTerm) return [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return areas.filter(area => 
    area.L1.toLowerCase().includes(lowerSearchTerm) ||
    (area.L2 && area.L2.toLowerCase().includes(lowerSearchTerm))
  );
};

// 주요 도시 목록 (자주 사용되는 지역들)
export const getMajorCities = (): AreaOption[] => {
  const majorCities = [
    '서울특별시',
    '부산광역시', 
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시'
  ];
  
  return majorCities.map(city => ({
    value: city,
    label: city
  }));
};