import React from 'react';
import { DocData } from '../types';
import '../generator.css';

interface Props {
  data: DocData;
  isProposal?: boolean;
}

export default function QuotationTemplate({ data, isProposal = false }: Props) {
  const vat = Math.floor(data.unitPrice * 0.1);
  const total = data.unitPrice + vat;
  const title = isProposal ? '제 안 서' : '견 적 서';

  return (
    <div className="doc-paper">
      <table style={{ width: '100%', border: 'none', borderSpacing: 0, borderCollapse: 'collapse' }}>
        <thead>
          <tr><td style={{ height: '60px', padding: 0, border: 'none' }}></td></tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 0, border: 'none', verticalAlign: 'top' }}>
              
              <div className="clean-quote-header">
                <div className="clean-quote-brand">{data.providerCompany}</div>
                <h1 className="clean-quote-title">{title}</h1>
              </div>

              <div className="clean-info-grid">
                <div className="clean-info-box">
                  <div className="clean-info-row">
                    <div className="clean-info-label">{isProposal ? '제안일자' : '견적일자'}</div>
                    <div className="clean-info-value">{data.date}</div>
                  </div>
                  <div className="clean-info-row" style={{ marginTop: '12px' }}>
                    <div className="clean-info-label">유효기간</div>
                    <div className="clean-info-value">{data.validity}</div>
                  </div>
                </div>
                
                <div className="clean-info-box">
                  <div className="clean-info-row">
                    <div className="clean-info-label">{isProposal ? '제안자' : '공급자'}</div>
                    <div className="clean-info-value">{data.providerCompany}</div>
                  </div>
                  <div className="clean-info-row" style={{ marginTop: '12px' }}>
                    <div className="clean-info-label">대표</div>
                    <div className="clean-info-value">{data.providerRep}</div>
                  </div>
                  <div className="clean-info-row" style={{ marginTop: '12px' }}>
                    <div className="clean-info-label">사업자등록번호</div>
                    <div className="clean-info-value">{data.providerBizNum}</div>
                  </div>
                </div>
              </div>

              <h3 className="clean-section-title">서비스 내용 — {data.serviceName}</h3>
              
              <div className="table-responsive">
                <table className="clean-table">
                  <thead>
                    <tr>
                      <th style={{ width: '55%' }}>구분</th>
                      <th style={{ width: '15%', textAlign: 'center' }}>단가</th>
                      <th style={{ width: '15%', textAlign: 'center' }}>수량</th>
                      <th style={{ width: '15%', textAlign: 'right' }}>합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="clean-td-item">{data.serviceName}</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: '500', fontSize: '1.05rem' }}>{data.unitPrice.toLocaleString()}원</td>
                      <td style={{ textAlign: 'center', fontWeight: '500', fontSize: '1.05rem', lineHeight: '1.4' }}>
                        {data.quantity.includes('(') ? (
                          <>
                            {data.quantity.split('(')[0]}<br/>
                            ({data.quantity.split('(')[1]}
                          </>
                        ) : data.quantity}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '800', fontSize: '1.1rem' }}>{data.unitPrice.toLocaleString()}원</td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ paddingTop: 0 }}>
                        <div className="clean-td-desc">
                          <strong>[포함 서비스]</strong>
                          <ul>
                            {data.includedServices.split('\n').map((service, idx) => (
                              <li key={idx}>{service}</li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="clean-summary clean-summary-grid">
                <div className="clean-summary-left">
                  <div className="clean-summary-row">
                    <div className="clean-summary-label">공급가액 (VAT 별도)</div>
                    <div className="clean-summary-value">{data.unitPrice.toLocaleString()} 원</div>
                  </div>
                  <div className="clean-summary-row">
                    <div className="clean-summary-label">부가세 (VAT 10%)</div>
                    <div className="clean-summary-value">{vat.toLocaleString()} 원</div>
                  </div>
                </div>
                <div className="clean-summary-right clean-summary-total">
                  <div className="clean-summary-label">VAT 포함 총액</div>
                  <div className="clean-summary-value">{total.toLocaleString()} 원</div>
                </div>
              </div>

              <div className="clean-notes">
                <h4>안내사항</h4>
                <ul>
                  <li>본 견적은 1개월 기준 월정액 계약입니다.</li>
                  <li>부가세(VAT 10%)는 별도이며 세금계산서 발행 가능합니다.</li>
                  <li>작업 착수 후 기획이 시작되며 일정은 협의 후 진행됩니다.</li>
                  <li>추가 촬영 또는 추가 편집은 별도 협의 대상입니다.</li>
                  <li>선납지금을 원칙으로 합니다.</li>
                  {data.notes && data.notes.split('\n').map((note, idx) => (
                    note.trim() ? <li key={idx}>{note}</li> : null
                  ))}
                </ul>
              </div>

              <div className="clean-footer">
                위 {isProposal ? '제안' : '견적'} 내용을 확인하였습니다.
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
