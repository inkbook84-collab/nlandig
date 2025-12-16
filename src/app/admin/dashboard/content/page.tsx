'use client';

import React, { useState, useEffect } from 'react';

import RichEditor from '@/components/admin/RichEditor';

export default function ContentManager() {
    const [contents, setContents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Sections we want to manage
    const initialSections = [
        { section: 'hero', title: '', body: '' },
        { section: 'chaektong', title: '', body: '' },
        { section: 'gongpilwang', title: '', body: '' },
    ];

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/content');
            const json = await res.json();
            if (json.data) {
                // Merge fetched data with initial sections structure
                // This logic is a bit simple, but sufficient.
                const merged = initialSections.map(init => {
                    const found = json.data.find((d: any) => d.section === init.section);
                    return found || init;
                });
                setContents(merged);
            } else {
                setContents(initialSections);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newContents = [...contents];
        newContents[index] = { ...newContents[index], [field]: value };
        setContents(newContents);
    };

    const handleSave = async (index: number) => {
        setSaving(true);
        const item = contents[index];
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (res.ok) {
                alert('저장되었습니다.');
            } else {
                alert('저장 실패.');
            }
        } catch (e) {
            alert('에러 발생.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>콘텐츠 관리</h1>

            {contents.map((item, index) => (
                <div key={item.section} style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', color: '#6b7280' }}>
                        {item.section} 섹션
                    </h2>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>제목 (HTML 지원)</label>
                        <RichEditor
                            value={item.title}
                            onChange={(val) => handleChange(index, 'title', val)}
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>본문 (HTML 지원)</label>
                        <RichEditor
                            value={item.body}
                            onChange={(val) => handleChange(index, 'body', val)}
                            placeholder="내용을 입력하세요"
                        />
                    </div>

                    <button
                        onClick={() => handleSave(index)}
                        disabled={saving}
                        style={{ padding: '10px 20px', backgroundColor: '#0a192f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {saving ? '저장 중...' : '저장'}
                    </button>
                </div>
            ))}
        </div>
    );
}
