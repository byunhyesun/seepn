'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  currentLanguage: string;
  userCountry: string;
}

export default function Footer({ currentLanguage, userCountry }: FooterProps) {
  // Language-specific text content
  const getText = (key: string) => {
    const texts = {
      ko: {
        accessCountry: '접속한 국가',
        ylia: '일리아',
        termsOfService: '이용약관',
        privacyPolicy: '개인정보처리방침',
        partnershipInquiry: '제휴/광고문의',
        supplier: '공급사',
        copyright: '© 2025 SEEPN. All rights reserved.'
      },
      en: {
        accessCountry: 'Access Country',
        ylia: 'Ylia',
        termsOfService: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        partnershipInquiry: 'Partnership/Ad Inquiry',
        supplier: 'Supplier',
        copyright: '© 2025 SEEPN. All rights reserved.'
      },
      ja: {
        accessCountry: 'アクセス国',
        ylia: 'イリア',
        termsOfService: '利用規約',
        privacyPolicy: 'プライバシーポリシー',
        partnershipInquiry: '提携/広告お問い合わせ',
        supplier: 'サプライヤー',
        copyright: '© 2025 SEEPN. All rights reserved.'
      },
      zh: {
        accessCountry: '访问国家',
        ylia: '一利亚',
        termsOfService: '服务条款',
        privacyPolicy: '隐私政策',
        partnershipInquiry: '合作/广告咨询',
        supplier: '供应商',
        copyright: '© 2025 SEEPN. All rights reserved.'
      }
    };
    
    return texts[currentLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-4">
            <span>{getText('accessCountry')}: {userCountry}</span>
            <span className="text-gray-400">|</span>
            <a href="https://www.ylia.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">{getText('ylia')}</a>
            <span className="text-gray-400">|</span>
            <Link href="/terms" className="hover:text-gray-900">{getText('termsOfService')}</Link>
            <span className="text-gray-400">|</span>
            <Link href="/privacy" className="hover:text-gray-900 font-bold">{getText('privacyPolicy')}</Link>
            <span className="text-gray-400">|</span>
            <Link href="/contact" className="hover:text-gray-900">{getText('partnershipInquiry')}</Link>
            <span className="text-gray-400">|</span>
            <a href="https://www.suppliers.kr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">{getText('supplier')}</a>
          </div>
          <p className="text-sm text-gray-600">
            {getText('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}