'use client';

import React, { useState } from 'react';
import styles from './Landing.module.css';

export default function ConsultationForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        academyName: '',
        region: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', academyName: '', region: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="consultation" className={styles.formSection}>
            <div className="container">
                <div className={styles.formContainer}>
                    <h2 className={styles.sectionTitle}>가맹 상세 상담 신청</h2>
                    <p className="text-center" style={{ marginBottom: '30px', color: '#666' }}>
                        지금 신청하시면 본부장이 직접 찾아가서 상세히 안내해드립니다.
                    </p>

                    {status === 'success' && (
                        <div className={styles.successMessage}>
                            상담 신청이 완료되었습니다! 24시간 내로 연락드리겠습니다.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>원장님 성함 *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="예: 홍길동"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>연락처 *</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                className={styles.input}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="010-0000-0000"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>학원명 *</label>
                            <input
                                type="text"
                                name="academyName"
                                required
                                className={styles.input}
                                value={formData.academyName}
                                onChange={handleChange}
                                placeholder="예: 책통학원"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>지역 (시/군/구) *</label>
                            <input
                                type="text"
                                name="region"
                                required
                                className={styles.input}
                                value={formData.region}
                                onChange={handleChange}
                                placeholder="예: 서울 강남구"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>문의사항</label>
                            <textarea
                                name="message"
                                className={styles.textarea}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="궁금하신 점을 자유롭게 남겨주세요."
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                            {status === 'loading' ? '전송 중...' : '상담 신청하기'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
