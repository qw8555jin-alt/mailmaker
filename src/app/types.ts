export interface DocData {
  // Client Info
  clientName: string;
  clientRep: string;
  clientBizNum: string;
  clientContact: string;
  date: string;
  validity: string;
  
  // Provider Info
  providerCompany: string;
  providerRep: string;
  providerBizNum: string;
  providerContact: string;
  providerSignature?: string | null;
  
  // Service Details
  serviceName: string;
  unitPrice: number;
  quantity: string;
  
  includedServices: string;
  notes: string;

  // Contract specific
  contractStartDate: string;
  contractMonths: number;
  contractDuration: string;
  paymentTerms: string;
  copyrightTerms: string;
  
  // Proposal specific
  proposalGoal: string;
  proposalMethod: string;
  
  // Cold Email specific
  clientIndustry: 'beauty_skincare' | 'fashion_apparel' | 'health_diet' | 'prof_medical' | 'prof_law' | 'prof_tax' | 'local_food' | 'local_beauty' | 'local_gym' | 'academy_student' | 'academy_adult' | 'b2b_startup';
  campaignGoal: '광고' | '브랜딩' | '인지도' | '고객문의' | '매출상승';
  clientProduct: string;
  portfolioLink: string;
}

export const defaultDocData: DocData = {
  clientName: '워크블록',
  clientRep: '지영종',
  clientBizNum: '000-00-00000',
  clientContact: '010-0000-0000',
  date: '2026년 7월 2일',
  validity: '견적일로부터 30일',
  providerCompany: '원피드마케팅',
  providerRep: '권용진',
  providerBizNum: '234-39-01465',
  providerContact: '010-3796-9592',
  serviceName: '브랜딩 숏폼 (기획+편집+썸네일)',
  unitPrice: 500000,
  quantity: '월 4건 (주1회)',
  includedServices: '콘텐츠 기획\n숏폼 영상 편집\n썸네일 제작\n주 1회 납품 (월 4건)\n브랜드 톤앤매너에 맞춘 제작',
  notes: '', // 기본 안내사항은 고정되어 있으며, 여기에는 추가 안내사항만 입력합니다.
  contractStartDate: '2026-07-02',
  contractMonths: 1,
  contractDuration: '2026.07.02 ~ 2026.08.02 (1개월)',
  paymentTerms: '계약 체결 시 총액의 100% 선납',
  copyrightTerms: '제작된 결과물의 저작권은 "고객사"에게 귀속되나, "원피드마케팅"의 포트폴리오로 활용될 수 있습니다.',
  proposalGoal: '퍼포먼스 숏폼 소재를 통한 자사몰 트래픽 및 전환율(CVR) 극대화',
  proposalMethod: '초반 3초 후킹 및 TPO 맞춤 모델 캐스팅 기반의 무한 베리에이션 숏폼 제작',
  clientIndustry: 'beauty_skincare',
  campaignGoal: '매출상승',
  clientProduct: '콜라겐 라인',
  portfolioLink: 'https://example.com/portfolio'
};
