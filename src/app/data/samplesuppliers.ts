// data/samplesuppliers.ts
export interface Samplesupplier {
  id: number;
  name: string;
  category: string;
  categoryDepth3: string;
  location: string;
  description: string;
  rating: number;
  tags: string[];
  website: string;
  image: string;
}

export const samplesuppliers: Samplesupplier[] = [
  {
    id: 1,
    name: "홍길동 후후",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 4.8,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.test.co.kr",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    name: "홍길동2",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 4.8,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.test.co.kr",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    name: "홍길동3",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 4.8,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.test.co.kr",
    image: "/api/placeholder/300/200",
  },
  // 다른 데이터 추가 가능
];
