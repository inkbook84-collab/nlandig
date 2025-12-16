
import React from 'react';
import styles from './Landing.module.css';

interface Props {
    title?: string;
    body?: string;
}

export default function HeroSection({ title, body }: Props) {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <p className={styles.heroTagline}>2024-2030 교육 트렌드의 중심</p>
                <h1 className={styles.heroTitle}>
                    {title ? (
                        <div dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />
                    ) : (
                        <>
                            책통클럽 & 공필왕<br />
                            <span style={{ color: 'var(--color-gold-400)' }}>성공 가맹의 시작</span>
                        </>
                    )}
                </h1>
                <p className={styles.heroSubtitle}>
                    {body ? (
                        <span dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br/>') }} />
                    ) : (
                        <>
                            독서 교육의 혁명 '책통클럽'과 자기주도 학습의 완성 '공필왕'<br />
                            원장님의 학원을 지역 1등으로 만들어드립니다.
                        </>
                    )}
                </p>
                <a href="#consultation" className="btn btn-gold" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
                    가맹 상담 신청하기
                </a>
            </div>
        </section>
    );
}

