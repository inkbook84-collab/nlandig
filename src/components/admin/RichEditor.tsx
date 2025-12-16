'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder }: Props) {

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                image: function () {
                    const tooltip = '이미지 URL을 입력하세요:';
                    const url = window.prompt(tooltip);
                    if (url) {
                        // @ts-ignore
                        const quill = this.quill;
                        const range = quill.getSelection();
                        quill.insertEmbed(range.index, 'image', url);
                    }
                },
                video: function () {
                    const tooltip = 'YouTube 등 영상 URL을 입력하세요:';
                    const url = window.prompt(tooltip);
                    if (url) {
                        // @ts-ignore
                        const quill = this.quill;
                        const range = quill.getSelection();
                        quill.insertEmbed(range.index, 'video', url);
                    }
                }
            }
        }
    }), []);

    return (
        <div className="rich-editor-wrapper">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                style={{ height: '300px', marginBottom: '50px' }}
            />
            <style jsx global>{`
        .ql-editor {
          min-height: 200px;
          font-family: inherit;
          font-size: 1rem;
        }
      `}</style>
        </div>
    );
}
