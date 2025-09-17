// data/samplesuppliers.ts
export interface Samplesupplier {
  id: number;
  rank: number;
  name: string;
  category: string;
  categoryDepth3: string;
  location: string;
  description: string;
  rating: number;
  likes: number;
  reviews: number;
  warnings: number;
  aiScore: number;
  tags: string[];
  website: string;
  image: string;
}

export const samplesuppliers: Samplesupplier[] = [
  {
    id: 1,
    rank: 1,
    name: "홍길동후후",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "글로벌 IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 4.9,
    likes: 123,
    reviews: 0,
    warnings: 0,
    aiScore: 98,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.globaltech.co.kr",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    rank: 2,
    name: "홍길동2",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "글로벌 IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 1.9,
    likes: 1250,
    reviews: 189,
    warnings: 0,
    aiScore: 98,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.globaltech.co.kr",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    rank: 3,
    name: "홍길동3",
    category: "정보통신",
    categoryDepth3: "시스템 개발",
    location: "서울특별시 강남구",
    description:
      "글로벌 IT 솔루션 전문 기업으로 다양한 소프트웨어 개발 서비스를 제공합니다.",
    rating: 2.9,
    likes: 1,
    reviews: 2,
    warnings: 0,
    aiScore: 98,
    tags: ["소프트웨어", "IT컨설팅", "시스템개발"],
    website: "https://www.globaltech.co.kr",
    image: "/api/placeholder/300/200",
  },
  // 다른 데이터 추가 가능
];
