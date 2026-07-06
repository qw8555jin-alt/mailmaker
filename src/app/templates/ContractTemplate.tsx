import React from 'react';
import { DocData } from '../types';

export default function ContractTemplate({ data }: { data: DocData }) {
  const vat = Math.floor(data.unitPrice * 0.1);
  const total = data.unitPrice + vat;

  return (
    <div className="doc-paper contract-paper" style={{ padding: '0 80px', fontSize: '0.95rem', lineHeight: '1.7', color: '#111' }}>
      <table style={{ width: '100%', border: 'none', borderSpacing: 0, borderCollapse: 'collapse' }}>
        <thead>
          <tr><td style={{ height: '60px', padding: 0, border: 'none' }}></td></tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 0, border: 'none', verticalAlign: 'top' }}>
              <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px', fontWeight: '800' }}>
        “ {data.clientName} ” 인스타 콘텐츠 제작 계약서
      </h1>

      <p style={{ marginBottom: '40px', textAlign: 'center' }}>
        본 계약은 아래 당사자 간에 인스타그램 영상 제작과 관련된 용역 수행 조건을 명확히 하기<br />위하여 체결됩니다.
      </p>

      <hr style={{ borderTop: '1px solid #d1d5db', marginBottom: '40px' }} />

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제1조 [계약 당사자]</h3>
        <div style={{ paddingLeft: '16px', marginBottom: '24px' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
            <li>발주자(갑): {data.clientName}</li>
            <li>대표자: {data.clientRep}</li>
            <li>사업자등록번호: {data.clientBizNum}</li>
            <li>연락처: {data.clientContact}</li>
          </ul>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>수급자(을): {data.providerCompany}</li>
            <li>대표자: {data.providerRep}</li>
            <li>사업자등록번호: {data.providerBizNum}</li>
            <li>연락처: {data.providerContact}</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제2조 [계약 목적]</h3>
        <p style={{ paddingLeft: '16px' }}>
          본 계약은 ‘을’이 ‘갑’의 의뢰에 따라 <strong>{data.serviceName}</strong> {data.quantity}를 제작하는 용역을 수행함에 있어, 필요한 제반 사항을 규정하는 데 목적이 있습니다.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제3조 [계약 금액 및 지급 조건]</h3>
        <ol style={{ paddingLeft: '32px' }}>
          <li style={{ marginBottom: '8px' }}>총 계약 금액은 <strong>금 {data.unitPrice.toLocaleString()} 원정(₩{total.toLocaleString()} 부가세 포함)</strong>입니다.</li>
          <li style={{ marginBottom: '8px' }}>‘갑’은 계약 체결일을 기준으로 7일이내에 ‘을’에게 위 금액을 지급합니다.</li>
          <li>
            지급 계좌:
            <ul style={{ listStyleType: 'circle', paddingLeft: '24px', marginTop: '4px' }}>
              <li>은행명: 신한은행</li>
              <li>계좌번호: 110-624-973409</li>
              <li>예금주: 권용진</li>
            </ul>
          </li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제4조 [용역 범위]</h3>
        <p style={{ paddingLeft: '16px', marginBottom: '16px' }}>‘을’은 아래 용역 범위를 성실히 이행합니다.</p>
        <ol style={{ paddingLeft: '32px' }}>
          {(data.serviceName.includes('기획') || data.serviceName.includes('채널')) && (
            <li style={{ marginBottom: '16px' }}>
              <strong>
                콘텐츠 {data.serviceName.includes('기획') ? '기획' : ''}
                {data.serviceName.includes('기획') && data.serviceName.includes('채널') ? ' 및 ' : ''}
                {data.serviceName.includes('채널') ? '채널 관리' : ''}
              </strong><br />
              계약 기간 동안, 인스타그램/유튜브 콘텐츠 {data.serviceName.includes('기획') ? '기획, 대본 구성, 썸네일 기획' : ''}
              {data.serviceName.includes('기획') && data.serviceName.includes('채널') ? ' 및 ' : ''}
              {data.serviceName.includes('채널') ? '업로드 관리' : ''} 업무를 포함합니다.
            </li>
          )}
          {(data.serviceName.includes('촬영') || data.serviceName.includes('편집')) && (
            <li style={{ marginBottom: '16px' }}>
              <strong>
                영상 {data.serviceName.includes('촬영') ? '촬영' : ''}
                {data.serviceName.includes('촬영') && data.serviceName.includes('편집') ? ' 및 ' : ''}
                {data.serviceName.includes('편집') ? '편집' : ''}
              </strong><br />
              {data.quantity}의 영상 콘텐츠를 제작하며, 4K 해상도 납품{data.serviceName.includes('편집') ? ', 컷편집, 자막 삽입, 종편집' : ''} 작업을 포함합니다.<br />
              {data.serviceName.includes('촬영') && (
                <span>계약금은 촬영 1회 기준 비용이며, 추가 촬영 발생 시 촬영 비용 250,000원이 추가됩니다.</span>
              )}
            </li>
          )}
          <li>
            <strong>납품물 규격 및 제공 방식</strong><br />
            최종 결과물은 Full HD 이상 해상도로 제공하며,<br />
            기본 납품 형식 MP4 파일로 하되, ‘갑’의 요청 시 추가 포맷으로 제공할 수 있습니다.
          </li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제5조 [계약 기간 및 납품]</h3>
        <ol style={{ paddingLeft: '32px' }}>
          <li style={{ marginBottom: '8px' }}>원본 전달일로부터 <strong>최대 10일 이내 납품</strong>을 원칙으로 합니다.</li>
          <li style={{ marginBottom: '8px' }}>정확한 제작 및 납품 일정은 계약 후 별도 협의에 따릅니다.</li>
          <li>납품하는 영상은 기존 채널에 업로드 된 영상 혹은 레퍼런스 영상의 퀄리티 정도로 제작/납품합니다.</li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제6조 [저작권 및 활용권]</h3>
        <ol style={{ paddingLeft: '32px' }}>
          <li style={{ marginBottom: '8px' }}>본 영상에 대한 저작권은 ‘갑’과 ‘을’에게 귀속되며,‘갑’은 <strong>상업적 활용권(웹사이트, SNS, 오프라인 행사 등)</strong>을 포함한 비독점적 사용권을 가집니다.</li>
          <li>‘을’은 본 계약에 따른 제작물을 비상업적 자료(포트폴리오 등)로 활용하고자 할 경우, ‘갑’의 사전 서면 동의 없이 활용 가능합니다.</li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제7조 [일정 변경 및 추가 비용]</h3>
        <ol style={{ paddingLeft: '32px' }}>
          <li style={{ marginBottom: '8px' }}>사전 합의되지 않은 일정 변경이나 콘텐츠 추가 요청은 별도 비용이 발생할 수 있습니다.</li>
          <li>제작 진행률에 따라 ‘을’은 일정 조정을 요청할 수 있으며, ‘갑’은 이에 대해 성실히 협의합니다.</li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제8조 [계약 해지 및 환불]</h3>
        <ol style={{ paddingLeft: '32px' }}>
          <li style={{ marginBottom: '8px' }}>‘갑’은 사전 협의 없이 일방적으로 계약을 해지할 수 없습니다.</li>
          <li style={{ marginBottom: '8px' }}>발주 후 단순 변심으로 인한 환불은 불가합니다.</li>
          <li style={{ marginBottom: '8px' }}>계약 해지 시, 진행률에 따라 합리적인 범위 내에서 금액을 협의하여 정산합니다.</li>
          <li style={{ marginBottom: '8px' }}>‘을’의 귀책 사유로 계약을 이행하지 못할 경우, 계약금 환불 또는 일정 범위 내 책임을 부담합니다.</li>
          <li>해지 협의가 없을 시 계약은 1개월 단위로 자동 연장됩니다.</li>
        </ol>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제9조 [비밀유지]</h3>
        <p style={{ paddingLeft: '16px' }}>
          당사자는 본 계약과 관련하여 알게 된 상대방의 기술적, 상업적 정보를 제3자에게 누설하지 않으며, 계약 종료 후에도 본 조항은 유효합니다.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제10조 [손해배상]</h3>
        <p style={{ paddingLeft: '16px' }}>
          ‘을’의 고의 또는 중대한 과실로 인하여 ‘갑’에게 직접적인 손해가 발생한 경우, ‘을’은 이에 대한 배상 책임을 집니다.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제11조 [분쟁 해결]</h3>
        <p style={{ paddingLeft: '16px' }}>
          본 계약에 관한 분쟁 발생 시 ‘을’의 본점 소재지를 관할하는 지방법원을 제1심 관할 법원으로 합니다.
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>제12조 [기타 조항]</h3>
        <p style={{ paddingLeft: '16px', marginBottom: '16px' }}>
          본 계약에 명시되지 않은 사항은 민법 및 관련 법령에 따르며, 필요 시 양 당사자의 협의 하에 별도 합의서를 작성할 수 있습니다
        </p>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          본 계약의 성립을 증명하기 위해 계약서를 2부 작성하고 각각 서명 날인하여 "갑"과 "을"이 1부씩 보관합니다.
        </p>
      </div>

      <div style={{ textAlign: 'center', fontWeight: '800', fontSize: '1.2rem', marginBottom: '60px' }}>
        계약일자 : {data.date}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', padding: '0 40px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>“갑”</span>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>(서명/인)</span>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', marginRight: '16px' }}>“을”</span>
              <span>{data.providerCompany}</span>
            </div>
            {data.providerSignature ? (
              <img src={data.providerSignature} alt="서명" style={{ height: '40px', objectFit: 'contain', position: 'absolute', right: 0, bottom: '-10px' }} />
            ) : (
              <span style={{ fontSize: '0.9rem', color: '#666' }}>(서명/인)</span>
            )}
          </div>
        </div>
      </div>

            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td style={{ height: '60px', padding: 0, border: 'none' }}></td></tr>
        </tfoot>
      </table>
    </div>
  );
}
