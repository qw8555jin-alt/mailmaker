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
    case '브랜딩_고객문의':
      solutionName = '하이엔드 브랜딩 및 DB 수집 퍼포먼스 솔루션';
      goalResult = '프리미엄 이미지 구축을 통한 신뢰도 상승 및 유효한 고객(의뢰인/환자) 문의 폭증';
      linkTitle = '[브랜드 가치 및 고객 문의 상승을 위한 제안서]';
      usageStrategy = '전문성을 강조하는 오가닉 콘텐츠 육성과 잠재고객 DB 수집(PAID) 광고를 동시에 활용한다면';
      pastWorkFocus = '신뢰도를 각인시키는 웰메이드 영상과 전환형(DB) 영상소재를 결합하여';
      pastWorkResult = '지역 내 상담 예약 마감 1위 달성 및 브랜드 공식 채널의 확고한 팬덤 형성은 물론,';
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
    case 'health_diet': {
      let insight2 = '뷰티, 스킨케어 상품군은 피부표현이 가장 중요합니다. 유료플러그인 필수입니다.';
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
      let industryKeyword = '전문 기관';
      let repTitle = '원장님(대표님)';
      let proposalHeader = '고객 문의 상승을 위한 제안서';
      let resultText = '상담 예약건수 300% 상승, 월 평균 수임건수 2배이상 증가 등';

      if (clientIndustry === 'prof_medical') {
        targetName = '신규 환자';
        industryKeyword = '병의원 원장님의 전문 기관';
        repTitle = '원장님';
        proposalHeader = '신환 유입 상승을 위한 제안서';
        resultText = '상담 예약건수 300% 상승, 월 평균 신환 유입 2배이상 증가 등';
      } else if (clientIndustry === 'prof_law') {
        targetName = '의뢰인';
        industryKeyword = '법무법인 및 변호사님의 전문 기관';
        repTitle = '변호사님(대표님)';
        proposalHeader = '월 평균 수임건 상승을 위한 제안서';
        resultText = '상담 예약건수 300% 상승, 월 평균 수임건수 2배이상 증가 등';
      } else if (clientIndustry === 'prof_tax') {
        targetName = '대표님(기장/자문 고객)';
        industryKeyword = '세무/회계 대표님의 전문 기관';
        repTitle = '대표님(세무사님/회계사님)';
        proposalHeader = '신규 기장 및 자문 계약 상승을 위한 제안서';
        resultText = '상담 예약건수 300% 상승, 월 평균 신규 기장/자문 계약 2배이상 증가 등';
      }

      subject = `[${clientName}] ${proposalHeader}`;
      body = `[${proposalHeader}]\n${portfolioLink}\n
안녕하세요 ${clientName} ${repTitle}.
${clientName}의 '${clientProduct}' 분야에 특화된 숏폼 롱폼 마케팅 독점 제안드립니다.

저희는 병의원, 로펌, 세무회계 등 고관여 전문직 브랜드에게 고객문의를 위한 퍼포먼스 솔루션을 제공하고 있는
마케팅솔루션파트너사 ${providerCompany} 입니다.

다름이 아니오라 ${clientName}의 압도적인 전문성과 현재 저희가 제공하는 솔루션을 결합해
숏폼플랫폼(메타, 인스타그램, 유튜브) 에 업로드 및 활용한다면 지역 내 압도적인 포지셔닝에 엄청난 시너지가 있을것이라 판단해 이렇게 연락드립니다.

단순히 예쁜 영상이 아닌, ${repTitle}의 신뢰도를 3초 안에 각인시키는 영상소재를
엄청난 시행착오를 겪으며 수백 개 이상 제작, 테스트 해왔습니다.

그 결과, ${resultText} 매우 월등한 결과값을 도출해냈습니다.

오프라인 소개나 기존 포털 검색광고(SA)에만 의존하던 전문직 마케팅을
SNS 숏폼 시장으로 이끌게 한 것은 다름아닌 자사가 제공하는 ${serviceName} 이었습니다.

${clientName}${getEulReul(clientName)} 포함해 저희 솔루션에 최적화된 7분의 ${industryKeyword}만 선별되어 해당 메일이 발송되었습니다.

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
  }

  return { subject, body };
}
