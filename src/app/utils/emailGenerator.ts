import { DocData } from '../types';
import { getEulReul } from './koreanUtils';

export function getColdEmailTemplate(data: DocData): { subject: string, body: string } {
  let subject = '';
  let body = '';

  const { clientName, clientProduct, serviceName, providerCompany, portfolioLink, campaignGoal, clientIndustry } = data;

  let solutionName = '';
  let goalResult = '';
  let linkTitle = '';
  let usageStrategy = '';
  let pastWorkFocus = '';
  let pastWorkResult = '';

  // 1. 목적에 따른 다이내믹 변수 세팅
  switch (campaignGoal) {
    case '광고':
      solutionName = '맞춤형 타겟팅 광고 솔루션';
      goalResult = 'ROAS(광고수익률) 최적화 및 압도적인 광고 효율 달성';
      linkTitle = '[광고 효율 상승을 위한 제안서]';
      usageStrategy = '숏폼플랫폼(메타, 쇼츠, 틱톡, GFA) PAID 광고에 활용한다면';
      pastWorkFocus = 'META, GFA에 활용할 퍼포먼스 영상소재를';
      pastWorkResult = '단 4개월만에 매체 광고취급액 1위 달성, 주요 상품 타겟 키워드 지수 1위 달성은 물론,';
      break;
    case '매출상승':
      solutionName = '매출 극대화 퍼포먼스 DA 솔루션';
      goalResult = '자사몰 트래픽 폭발적 증가 및 직접적인 매출(CVR) 극대화';
      linkTitle = '[폭발적인 매출 상승을 위한 제안서]';
      usageStrategy = '숏폼플랫폼(메타, 쇼츠, 틱톡, GFA) 매출 전환형 PAID 광고에 활용한다면';
      pastWorkFocus = 'META, GFA에 활용할 퍼포먼스 영상소재를';
      pastWorkResult = '단 4개월만에 매체 광고취급액 1위 달성, 주요 상품 타겟 키워드 지수 1위 달성은 물론,';
      break;
    case '고객문의':
      solutionName = 'DB 수집형 퍼포먼스 솔루션';
      goalResult = '유효한 고객 문의(DB) 획득 단가 혁신 및 상담 건수 폭증';
      linkTitle = '[고객 문의 상승을 위한 제안서]';
      usageStrategy = '숏폼플랫폼(메타, 인스타그램) 잠재고객 DB 수집(PAID) 광고에 활용한다면';
      pastWorkFocus = 'META, 인스타그램에 활용할 전환형(DB) 영상소재를';
      pastWorkResult = '지역 내 상담 예약 마감 1위 달성, 타겟 키워드 지수 1위 달성은 물론,';
      break;
    case '브랜딩':
      solutionName = '하이엔드 브랜딩 숏폼 솔루션';
      goalResult = '브랜드의 프리미엄 이미지 구축 및 확고한 팬덤 형성';
      linkTitle = '[브랜드 가치 상승을 위한 제안서]';
      usageStrategy = '브랜드 공식 계정(인스타그램, 유튜브 등) 오가닉 콘텐츠 육성에 활용한다면';
      pastWorkFocus = '공식 숏폼 채널(릴스, 쇼츠) 성장을 위한 웰메이드 오가닉 영상소재를';
      pastWorkResult = '단기간 내 브랜드 공식 계정 팔로워 10만 명 돌파, 자체 오가닉 릴스 조회수 500만 뷰 달성은 물론,';
      break;
    case '인지도':
      solutionName = '바이럴 인지도 확산 솔루션';
      goalResult = '단기간 내 브랜드 인지도 폭발적 확산 및 막대한 트래픽 확보';
      linkTitle = '[브랜드 인지도 상승을 위한 제안서]';
      usageStrategy = '숏폼플랫폼(메타, 틱톡) 내 전방위적인 바이럴 확산 콘텐츠로 활용한다면';
      pastWorkFocus = '인지도 폭발을 위한 숏폼 바이럴 영상소재를';
      pastWorkResult = '단 4개월 만에 숏폼 챌린지 및 캠페인 누적 조회수 1,000만 뷰 돌파, 타겟 키워드 지수 1위 달성은 물론,';
      break;
    default:
      solutionName = '퍼포먼스 DA 솔루션';
      goalResult = '다양한 지표에서 매우 월등한 결과값 도출';
      linkTitle = '[퍼포먼스 상승을 위한 제안서]';
      usageStrategy = '숏폼플랫폼(메타, 쇼츠, 틱톡, GFA) PAID 광고에 활용한다면';
      pastWorkFocus = 'META, GFA에 활용할 퍼포먼스 영상소재를';
      pastWorkResult = '단 4개월만에 매체 광고취급액 1위 달성, 주요 상품 타겟 키워드 지수 1위 달성은 물론,';
  }

  // 2. 세부 업종에 따른 템플릿 로직
  switch (clientIndustry) {
    // 그룹 1: 뷰티 / 패션 / 커머스
    case 'beauty_skincare':
    case 'fashion_apparel':
    case 'health_diet': {
      let insight2 = '뷰티, 스킨케어 상품군은 피부표현이 가장 중요합니다. 유료플러그인 필수입니다.';
      if (clientIndustry === 'fashion_apparel') insight2 = '패션, 의류 상품군은 핏과 착용감이 가장 중요합니다. TPO에 맞는 모델 캐스팅이 필수입니다.';
      if (clientIndustry === 'health_diet') insight2 = '건기식, 다이어트 상품군은 섭취 전후의 명확한 비교(Before & After)와 후킹이 가장 중요합니다.';

      subject = `[${clientName}] ${clientProduct} 전용 ${serviceName} 독점 협업 제안 드립니다.`;
      body = `${linkTitle}\n${portfolioLink}\n
안녕하세요 ${clientName} 담당자님.
${clientName}의 ${clientProduct}${getEulReul(clientProduct)} 위한 ${serviceName} 독점 협업 제안드립니다.

저희는 메가급 위주의 뷰티, 패션, 커머스 브랜드에게 ${solutionName}을 제공하고 있는
마케팅솔루션파트너사 ${providerCompany} 입니다.

다름이 아니오라 ${clientName} 브랜드의 ${clientProduct} 상품들과 현재 저희가 제공하는 솔루션을 결합해
${usageStrategy} 엄청난 시너지효과가 있을것이라 판단해 이렇게 연락드립니다.

지난 6월부터 현재 10월까지 대형 브랜드의 ${pastWorkFocus} 엄청난
시행착오를 겪으며 누적 300개 이상 제작, 납품 중에 있습니다.

그 결과, ${pastWorkResult}
${goalResult} 등 다양한 지표에서 매우 월등한 결과값을 도출해냈습니다.

단순 PPL, CF, SA에만 의존하던 브랜드를 숏폼 및 SNS 시장의 리더로 이끌게 한 것은 다름아닌 자사가 제공하는
${serviceName} 이었습니다.

${clientName}${getEulReul(clientName)} 포함해 저희 솔루션에 최적화된 소수의 메가 브랜드만 선별되어 해당 메일이 발송되었습니다.

부득이하게 TO가 차 함께하지 못할경우 아래의 3가지 필수원칙을 적용시켜 기존 영상소재들을 검토 및 제작해보시길 바랍니다.
수백개의 영상소재들을 제작하면서 도출된 매우 중요한 인사이트입니다.

1. 초반 5초안에 후킹카피->타겟->문제점(Before)->해결책(After) 가 표현되어야합니다.
2. ${insight2}
3. 경쟁사 소재 분석시, 라이브시점이 가장 오래된 소재’만’ 참고하세요. (광고라이브러리)

하기 첨부드린 제안서 읽어보시고 궁금하신 사항 있으시면 편하게 연락부탁드립니다.
영상 숏폼 기획 관련해서는 저희가 지금까지 쌓아온 인사이트를 최대한 공유드리도록하겠습니다.

${clientName} 브랜드의 끊임없는 성장을 함께 응원하겠습니다.
그럼 회신 기다리겠습니다.
감사합니다.`;
      break;
    }

    // 그룹 2: 고관여 / 전문직
    case 'prof_medical':
    case 'prof_law':
    case 'prof_tax': {
      let targetName = '환자/의뢰인';
      if (clientIndustry === 'prof_medical') targetName = '신규 환자';
      if (clientIndustry === 'prof_tax') targetName = '대표님(기장/자문 고객)';

      subject = `[${clientName}] ${clientProduct} 분야 특화 ${serviceName} 독점 제안 드립니다.`;
      body = `${linkTitle}\n${portfolioLink}\n
안녕하세요 ${clientName} 원장님(대표님).
${clientName}의 '${clientProduct}' 분야에 특화된 ${serviceName} 독점 제안드립니다.

저희는 병의원, 로펌, 세무회계 등 고관여 전문직 브랜드에게 ${solutionName}을 제공하고 있는
마케팅솔루션파트너사 ${providerCompany} 입니다.

다름이 아니오라 ${clientName}의 압도적인 전문성과 현재 저희가 제공하는 솔루션을 결합해
${usageStrategy} 지역 내 압도적인 포지셔닝에 엄청난 시너지가 있을것이라 판단해 이렇게 연락드립니다.

단순히 예쁜 영상이 아닌, 원장님(대표님)의 신뢰도를 3초 안에 각인시키는 영상소재를
엄청난 시행착오를 겪으며 수백 개 이상 제작, 테스트 해왔습니다.

그 결과, ${pastWorkResult}
${goalResult} 등 매우 월등한 결과값을 도출해냈습니다.

오프라인 소개나 기존 포털 검색광고(SA)에만 의존하던 전문직 마케팅을
SNS 숏폼 시장으로 이끌게 한 것은 다름아닌 자사가 제공하는 ${serviceName} 이었습니다.

${clientName}${getEulReul(clientName)} 포함해 저희 솔루션에 최적화된 극소수의 전문 기관만 선별되어 해당 메일이 발송되었습니다.

부득이하게 TO가 차 함께하지 못할경우 아래의 3가지 필수원칙을 적용시켜 영상소재들을 검토해보시길 바랍니다.
전문직 마케팅에서 도출된 매우 중요한 인사이트입니다.

1. 초반 3초안에 권위있는 모습(전문 복장, 자격증, 깔끔한 배경 등)으로 신뢰감을 줘야합니다.
2. 타겟 ${targetName}의 가장 시급한 문제점(Pain Point)을 정확히 짚어주어야 합니다.
3. 복잡한 전문 용어 대신 초등학생도 이해할 수 있는 쉬운 언어로 해결책을 제시하세요.

하기 첨부드린 제안서 읽어보시고 궁금하신 사항 있으시면 편하게 연락부탁드립니다.
${clientName}의 끊임없는 성장을 함께 응원하겠습니다.

그럼 회신 기다리겠습니다.
감사합니다.`;
      break;
    }

    // 그룹 3: 오프라인 / 로컬 비즈니스
    case 'local_food':
    case 'local_beauty':
    case 'local_gym': {
      let localInsight = '초반 3초안에 극강의 시각적 자극(음식의 김 모락모락, 화려한 서비스 과정 등)이 들어가야 합니다.';
      if (clientIndustry === 'local_beauty') localInsight = '초반 3초안에 극적인 비포애프터(푸석함 -> 찰랑임 등) 시각적 자극이 들어가야 합니다.';
      if (clientIndustry === 'local_gym') localInsight = '초반 3초안에 운동 자극을 극대화하는 시각적 요소(바디프로필, 변화 과정 등)가 들어가야 합니다.';

      subject = `[${clientName}] ${clientProduct}의 압도적 성장을 위한 ${serviceName} 제안 드립니다.`;
      body = `${linkTitle}\n${portfolioLink}\n
안녕하세요 ${clientName} 대표님.
${clientName}의 메인 비즈니스인 '${clientProduct}'의 폭발적 성장을 위한 ${serviceName} 제안드립니다.

저희는 지역 핵심상권에서 압도적인 성장을 이끌어내고자 하는 대표님들께 ${solutionName}을 제공하고 있는
마케팅솔루션파트너사 ${providerCompany} 입니다.

다름이 아니오라 ${clientName}의 훌륭한 ${clientProduct} 서비스와 현재 저희가 제공하는 솔루션을 결합해
${usageStrategy} 매장 방문객 증가 및 상권 내 인지도 1위에 엄청난 시너지가 있을것이라 판단해 이렇게 연락드립니다.

블로그 체험단이나 전단지에만 의존하던 로컬 마케팅을
실제 방문으로 직결되는 SNS 숏폼 시장으로 이끌게 한 것은 다름아닌 자사가 제공하는 ${serviceName} 이었습니다.

그 결과, 반경 5km 내 잠재 고객들에게 매장을 완벽하게 각인시켜 
${pastWorkResult}
${goalResult} 등 다양한 지표에서 매우 월등한 결과값을 도출해냈습니다.

${clientName}${getEulReul(clientName)} 포함해 저희 솔루션에 최적화된 지역 내 주요 매장만 선별되어 해당 메일이 발송되었습니다.

부득이하게 TO가 차 함께하지 못할경우 아래의 3가지 필수원칙을 적용시켜 매장 홍보 영상소재를 기획해보시길 바랍니다.

1. ${localInsight}
2. '우리 동네에 이런 곳이?'라는 반응을 이끌어낼 수 있는 지역명 키워드가 초반에 반드시 포함되어야 합니다.
3. 영상 마지막에는 명확한 방문 유도(Call To Action) 혜택이나 위치를 짚어주세요.

하기 첨부드린 제안서 읽어보시고 궁금하신 사항 있으시면 편하게 연락부탁드립니다.
${clientName}의 끊임없는 대박 성장을 함께 응원하겠습니다.

그럼 회신 기다리겠습니다.
감사합니다.`;
      break;
    }

    // 그룹 4: 교육 / IT / B2B
    case 'academy_student':
    case 'academy_adult':
    case 'b2b_startup': {
      let titleName = '원장님';
      if (clientIndustry === 'b2b_startup') titleName = '대표님(담당자님)';

      let targetAnxiety = '타겟 학부모의 가장 큰 불안감(성적 정체, 진로 고민)';
      if (clientIndustry === 'academy_adult') targetAnxiety = '타겟 수강생의 가장 큰 불안감(취업, 승진, 자격증 취득)';
      if (clientIndustry === 'b2b_startup') targetAnxiety = '타겟 고객사의 가장 큰 실무적 고충(비용 낭비, 비효율, 인력 부족)';

      let authorityFocus = '원장님이 직접 카메라 앞에서 자신감 있게 교육 철학을 말씀하시는 모습이 가장 신뢰도를 높입니다.';
      if (clientIndustry === 'b2b_startup') authorityFocus = '실제 도입 고객사의 극적인 변화(Before & After) 인터뷰나 리뷰가 가장 신뢰도를 높입니다.';

      subject = `[${clientName}] ${clientProduct}${getEulReul(clientProduct)} 위한 ${serviceName} 제안 드립니다.`;
      body = `${linkTitle}\n${portfolioLink}\n
안녕하세요 ${clientName} ${titleName}.
${clientName}의 핵심 경쟁력인 '${clientProduct}'${getEulReul(clientProduct)} 위한 ${serviceName} 제안드립니다.

저희는 교육 및 B2B, IT플랫폼 브랜드에게 ${solutionName}을 제공하고 있는
마케팅솔루션파트너사 ${providerCompany} 입니다.

다름이 아니오라 ${clientName}의 체계적인 ${clientProduct} 커리큘럼(서비스)과 현재 저희가 제공하는 솔루션을 결합해
${usageStrategy} 신규 유입 및 고객 확보에 엄청난 시너지가 있을것이라 판단해 이렇게 연락드립니다.

기존의 텍스트 위주 설명회나 브로셔에만 의존하던 마케팅을
고객들의 스마트폰 속 숏폼으로 이끌게 한 것은 다름아닌 자사가 제공하는 ${serviceName} 이었습니다.

그 결과, 타겟 고객에게 ${titleName}의 철학과 성과를 정확히 숏폼으로 전달하여
${pastWorkResult}
${goalResult} 등 매우 월등한 결과값을 도출해냈습니다.

${clientName}${getEulReul(clientName)} 포함해 저희 솔루션에 최적화된 핵심 브랜드만 선별되어 해당 메일이 발송되었습니다.

부득이하게 TO가 차 함께하지 못할경우 아래의 3가지 필수원칙을 적용시켜 홍보 영상을 제작해보시길 바랍니다.

1. 초반 3초안에 ${targetAnxiety}을 공감하며 짚어주어야 합니다.
2. 단순 시설/기능 홍보가 아닌, 실제 고객의 변화 사례나 압도적인 관리 시스템을 보여주세요.
3. ${authorityFocus}

하기 첨부드린 제안서 읽어보시고 궁금하신 사항 있으시면 편하게 연락부탁드립니다.
${clientName}의 끊임없는 성장을 함께 응원하겠습니다.

그럼 회신 기다리겠습니다.
감사합니다.`;
      break;
    }
  }

  return { subject, body };
}
