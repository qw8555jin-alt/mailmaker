'use client';
import React from 'react';
import { DocData } from '../types';
import '../generator.css';
import { getColdEmailTemplate } from '../utils/emailGenerator';

export default function ColdEmailTemplate({ data }: { data: DocData }) {
  const { subject, body } = getColdEmailTemplate(data);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} 복사되었습니다!`);
  };

  return (
    <div className="doc-paper" style={{ padding: '60px 80px', fontFamily: 'var(--font-sans)', lineHeight: '1.8' }}>
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontWeight: '700', color: '#64748b', fontSize: '0.9rem' }}>제목</div>
          <button 
            onClick={() => handleCopy(subject, '제목이')}
            style={{ padding: '4px 12px', fontSize: '0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
          >
            복사하기
          </button>
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          {subject}
        </div>
      </div>
      
      <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <div style={{ fontWeight: '700', color: '#64748b', fontSize: '0.9rem' }}>본문</div>
          <button 
            onClick={() => handleCopy(body, '본문이')}
            style={{ padding: '4px 12px', fontSize: '0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
          >
            본문 전체 복사하기
          </button>
        </div>
        <div style={{ fontSize: '1.05rem', color: '#1e293b', whiteSpace: 'pre-wrap' }}>
          {body}
        </div>
      </div>
    </div>
  );
}
