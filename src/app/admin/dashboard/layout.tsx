import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: '#0a192f',
                color: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '40px', color: '#ffd700' }}>
                    관리자 페이지
                </h2>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '15px' }}>
                            <Link href="/admin/dashboard" style={{ display: 'block', padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                상담 문의 현황
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link href="/admin/dashboard/content" style={{ display: 'block', padding: '10px', borderRadius: '4px', color: '#aaa' }}>
                                콘텐츠 관리 (준비중)
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <a href="/" target="_blank" style={{ color: '#aaa', fontSize: '0.9rem' }}>메인 페이지 바로가기 &rarr;</a>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px' }}>
                {children}
            </main>
        </div>
    );
}
