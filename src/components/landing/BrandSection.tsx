
import React from 'react';
import styles from './Landing.module.css';

interface Props {
    chaektong?: { title: string; body: string };
    gongpilwang?: { title: string; body: string };
}

export default function BrandSection({ chaektong, gongpilwang }: Props) {
    return (
        <section className={styles.brandSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>두 개의 강력한 브랜드, 하나의 성공 공식</h2>
                <p className={styles.sectionSubtitle}>독서부터 교과 학습까지, 완벽한 로드맵을 제시합니다.</p>

                <div className={styles.brandGrid}>
                    {/* Chaektong Club */}
                    <div className={styles.brandCard}>
                        <div className={styles.brandHeader}>
                            <h3 className={styles.brandName}>{chaektong?.title || '책통클럽'}</h3>
                        </div>
                        <p className={styles.brandDesc}>
                            {chaektong?.body ? (
                                <span dangerouslySetInnerHTML={{ __html: chaektong.body.replace(/\n/g, '<br/>') }} />
                            ) : (
                                <>
                                    정독법 훈련을 통해 읽기 능력을 극대화하는 독서 훈련 프로그램입니다.<br /><br />
                                    단순한 다독이 아닌, 글을 읽고 이해하는 '탐구 독서' 능력을 길러줍니다.
                                    아이들의 문해력 향상은 모든 학습의 기초가 됩니다.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Gongpilwang */}
                    <div className={styles.brandCard}>
                        <div className={styles.brandHeader}>
                            <h3 className={styles.brandName}>{gongpilwang?.title || '공필왕'}</h3>
                        </div>
                        <p className={styles.brandDesc}>
                            {gongpilwang?.body ? (
                                <span dangerouslySetInnerHTML={{ __html: gongpilwang.body.replace(/\n/g, '<br/>') }} />
                            ) : (
                                <>
                                    "공부를 필사적으로 왕처럼 한다"<br />
                                    교과서 코넬식 노트필기 훈련을 통해 메타인지 능력을 키우는 자기주도 학습 시스템입니다.<br /><br />
                                    스스로 읽고, 찾고, 쓰는 3잘 독서 능력을 기반으로 성적 향상을 이끌어냅니다.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

