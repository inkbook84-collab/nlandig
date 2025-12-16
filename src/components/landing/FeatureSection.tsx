import React from 'react';
import styles from './Landing.module.css';

export default function FeatureSection() {
    return (
        <section className={styles.featureSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>왜 책통클럽 & 공필왕인가?</h2>
                <div className={styles.featureGrid}>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>🔍</div>
                        <h3 className={styles.featureTitle}>정독 & 탐구 독서</h3>
                        <p>글자를 읽는 것이 아니라 내용을 이해하는 진짜 독서 훈련</p>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>📝</div>
                        <h3 className={styles.featureTitle}>코넬식 노트 필기</h3>
                        <p>핵심 개념을 구조화하고 정리하는 체계적인 필기 훈련</p>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>🧠</div>
                        <h3 className={styles.featureTitle}>메타인지 학습</h3>
                        <p>아는 것과 모르는 것을 구분하여 스스로 공부하는 힘 배양</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
