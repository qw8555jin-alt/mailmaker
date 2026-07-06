"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './generator.css';
import { DocData, defaultDocData } from './types';
import QuotationTemplate from './templates/QuotationTemplate';
import ContractTemplate from './templates/ContractTemplate';
import ColdEmailTemplate from './templates/ColdEmailTemplate';
import { getColdEmailTemplate } from './utils/emailGenerator';

type DocType = 'quotation' | 'proposal' | 'contract' | 'cold_email';

export default function DocumentGeneratorPage() {
  const [docType, setDocType] = useState<DocType>('quotation');
  const [data, setData] = useState<DocData>(defaultDocData);

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'clientIndustry') {
      if (value === 'beauty_skincare' || value === 'health_diet') {
        setData(prev => ({ ...prev, [name]: value, campaignGoal: '광고' }));
        return;
      } else if (value === 'prof_medical' || value === 'prof_law' || value === 'prof_tax') {
        setData(prev => ({ ...prev, [name]: value, campaignGoal: '브랜딩_고객문의' }));
        return;
      }
    }

    let finalValue: string | number = value;

    if (name === 'unitPrice' || name === 'contractMonths') {
      finalValue = Number(value);
    } else if (name === 'clientContact' || name === 'providerContact') {
      let onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.startsWith('02')) {
        if (onlyNums.length <= 2) finalValue = onlyNums;
        else if (onlyNums.length <= 5) finalValue = `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
        else if (onlyNums.length <= 9) finalValue = `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 5)}-${onlyNums.slice(5)}`;
        else finalValue = `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
      } else {
        if (onlyNums.length <= 3) finalValue = onlyNums;
        else if (onlyNums.length <= 6) finalValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        else if (onlyNums.length < 11) finalValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6)}`;
        else finalValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
      }
    } else if (name === 'clientBizNum' || name === 'providerBizNum') {
      let onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 3) {
        finalValue = onlyNums;
      } else if (onlyNums.length <= 5) {
        finalValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      } else {
        finalValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5, 10)}`;
      }
    }

    setData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, providerSignature: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTemplate = () => {
    switch(docType) {
      case 'quotation': return <QuotationTemplate data={data} isProposal={false} />;
      case 'proposal': return <QuotationTemplate data={data} isProposal={true} />;
      case 'contract': return <ContractTemplate data={data} />;
      case 'cold_email': return <ColdEmailTemplate data={data} />;
      default: return null;
    }
  };

  return (
    <div className="generator-layout">
      {/* Sidebar - Hidden on print */}
      <div className="generator-sidebar">
        <div className="generator-sidebar-header">
          <h2>
            <span>문서 자동 생성기</span>
            <button className="print-btn" onClick={handlePrint}>PDF 저장 / 인쇄</button>
          </h2>
          <div className="doc-type-tabs">
            <div className={`doc-type-tab ${docType === 'quotation' || docType === 'proposal' ? 'active' : ''}`} onClick={() => setDocType('quotation')}>견적/제안서</div>
            <div className={`doc-type-tab ${docType === 'contract' ? 'active' : ''}`} onClick={() => setDocType('contract')}>계약서</div>
            <div className={`doc-type-tab ${docType === 'cold_email' ? 'active' : ''}`} onClick={() => setDocType('cold_email')}>콜드메일</div>
          </div>
        </div>

        <div className="generator-sidebar-content">
          {(docType === 'quotation' || docType === 'proposal') && (
            <div className="form-group" style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <label>문서 제목 선택</label>
              <select 
                value={docType} 
                onChange={(e) => setDocType(e.target.value as DocType)}
                style={{ background: 'white' }}
              >
                <option value="quotation">견 적 서</option>
                <option value="proposal">제 안 서</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>고객사명</label>
            <input type="text" name="clientName" value={data.clientName} onChange={handleChange} />
          </div>
          {docType === 'contract' && (
            <>
              <div className="form-group">
                <label>고객사 대표자</label>
                <input type="text" name="clientRep" value={data.clientRep} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>고객사 사업자번호</label>
                <input type="text" name="clientBizNum" value={data.clientBizNum} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>고객사 연락처</label>
                <input type="text" name="clientContact" value={data.clientContact} onChange={handleChange} />
              </div>
            </>
          )}
          {docType !== 'cold_email' && (
            <>
              <div className="form-group">
                <label>{docType === 'contract' ? '작성 일자' : (docType === 'proposal' ? '제안 일자' : '견적 일자')}</label>
                <input type="text" name="date" value={data.date} onChange={handleChange} />
              </div>
              {(docType === 'quotation' || docType === 'proposal') && (
                <div className="form-group">
                  <label>유효 기간</label>
                  <input type="text" name="validity" value={data.validity} onChange={handleChange} />
                </div>
              )}

              <div style={{ margin: '24px 0', borderTop: '1px solid #eee' }}></div>
            </>
          )}

          <div className="form-group">
            <label>서비스명 (제안명)</label>
            <input type="text" name="serviceName" value={data.serviceName} onChange={handleChange} />
          </div>
          {docType !== 'cold_email' && (
            <>
              <div className="form-group">
                <label>단가 (공급가액 - VAT별도)</label>
                <input type="number" name="unitPrice" value={data.unitPrice} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>수량 (예: 월 4건 (주1회))</label>
                <input type="text" name="quantity" value={data.quantity} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>포함 서비스 내역 (줄바꿈으로 구분)</label>
                <textarea name="includedServices" value={data.includedServices} onChange={handleChange} rows={5}></textarea>
              </div>
            </>
          )}

          {(docType === 'quotation' || docType === 'proposal') && (
            <div className="form-group">
              <label>추가 안내사항 (기본 안내사항 아래에 추가됨)</label>
              <textarea name="notes" value={data.notes} onChange={handleChange} rows={3} placeholder="추가할 내용이 없다면 비워두세요."></textarea>
            </div>
          )}

          {docType === 'contract' && (
            <>
              <div className="form-group">
                <label>공급자 연락처 (수급자)</label>
                <input type="text" name="providerContact" value={data.providerContact} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>서명 또는 직인 이미지 (선택)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>* 이미지를 업로드하면 서명란에 (서명/인) 대신 들어갑니다.</p>
              </div>
              <div className="form-group">
                <label>계약 시작일</label>
                <input type="date" name="contractStartDate" value={data.contractStartDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>대금 지급 조건</label>
                <input type="text" name="paymentTerms" value={data.paymentTerms} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>저작권 및 귀속 조항</label>
                <textarea name="copyrightTerms" value={data.copyrightTerms} onChange={handleChange} rows={4}></textarea>
              </div>
            </>
          )}

          {docType === 'cold_email' && (
            <>
              <div className="form-group">
                <label>업종 선택</label>
                <select 
                  name="clientIndustry" 
                  value={data.clientIndustry} 
                  onChange={handleChange}
                  style={{ background: 'white' }}
                >
                  <optgroup label="뷰티 / 커머스">
                    <option value="beauty_skincare">뷰티 / 스킨케어</option>
                    <option value="health_diet">건강기능식품 / 다이어트</option>
                  </optgroup>
                  <optgroup label="고관여 / 전문직">
                    <option value="prof_medical">병의원 / 성형외과 / 피부과</option>
                    <option value="prof_law">법무법인 / 변호사</option>
                    <option value="prof_tax">세무 / 회계 / 노무법인</option>
                  </optgroup>
                </select>
              </div>
              <div className="form-group">
                <label>목적 선택</label>
                <select 
                  name="campaignGoal" 
                  value={data.campaignGoal} 
                  onChange={handleChange}
                  style={{ background: 'white' }}
                >
                  <option value="광고">광고 (ROAS 최적화)</option>
                  <option value="브랜딩">브랜딩 (프리미엄 이미지)</option>
                  <option value="인지도">인지도 (바이럴 확산)</option>
                  <option value="고객문의">고객문의 (DB 수집)</option>
                  <option value="매출상승">매출상승 (CVR 극대화)</option>
                  <option value="브랜딩_고객문의">브랜딩 및 고객문의 (DB 수집)</option>
                </select>
              </div>
              <div className="form-group">
                <label>대상 상품 라인 (예: 콜라겐 라인)</label>
                <input type="text" name="clientProduct" value={data.clientProduct} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>상품소개서 링크</label>
                <input type="text" name="portfolioLink" value={data.portfolioLink} onChange={handleChange} />
              </div>
            </>
          )}

          {docType !== 'cold_email' && (
            <>
              <div style={{ margin: '40px 0 20px 0', borderTop: '1px solid #eee' }}></div>
          
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ margin: 0 }}>✉️ 이메일 전송 템플릿</label>
              <button 
                className="print-btn" 
                style={{ padding: '4px 10px', fontSize: '0.8rem', background: '#4b5563' }}
                onClick={() => {
                  let emailText = '';
                  
                    const docName = docType === 'contract' ? '계약서' : (docType === 'proposal' ? '제안서' : '견적서');
                    const vat = Math.floor(data.unitPrice * 0.1);
                    const total = data.unitPrice + vat;
                    emailText = `안녕하세요, ${data.clientName} 담당자님.\n원피드마케팅 ${data.providerRep}입니다.\n\n요청하신 [${data.serviceName}]에 대한 ${docName}를 첨부 파일로 보내드립니다.\n\n- 서비스명: ${data.serviceName}\n- 수량: ${data.quantity}\n- 총 금액: ${total.toLocaleString()}원 (VAT 포함)\n`;
                    
                    if (docType === 'contract') {
                      emailText += `- 계약 시작일: ${data.contractStartDate}\n`;
                    } else {
                      emailText += `- 유효 기간: ${data.validity}\n`;
                    }
                    
                    emailText += `\n첨부된 문서를 확인해 주시고, 수정이 필요하시거나 궁금한 점이 있으시면 언제든 편하게 회신 부탁드립니다.\n\n긍정적인 검토 부탁드리며, 좋은 인연으로 함께할 수 있기를 기대합니다.\n\n감사합니다.\n원피드마케팅 ${data.providerRep} 드림`;
                  
                  navigator.clipboard.writeText(emailText);
                  alert('이메일 내용이 복사되었습니다. 메일 작성 창에 붙여넣기(Ctrl+V) 하세요!');
                }}
              >
                복사하기
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.5', background: '#f9fafb', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                <>안녕하세요, {data.clientName} 담당자님.<br/>원피드마케팅 {data.providerRep}입니다.<br/><br/>요청하신 [{data.serviceName}]에 대한 {docType === 'contract' ? '계약서' : (docType === 'proposal' ? '제안서' : '견적서')}를 첨부 파일로 보내드립니다.</>
            </p>
          </div>
            </>
          )}


        </div>
      </div>

      {/* Preview Area */}
      <div className="generator-preview">
        {renderTemplate()}
      </div>
    </div>
  );
}
