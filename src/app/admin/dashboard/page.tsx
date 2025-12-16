import dbConnect from '@/lib/db';
import { Lead } from '@/models';

// Force dynamic rendering so we always get fresh data
export const dynamic = 'force-dynamic';

async function getLeads() {
    await dbConnect();
    // Sort by newest first
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return leads;
}

export default async function DashboardPage() {
    const leads = await getLeads();

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', color: '#111827' }}>
                상담 문의 현황
            </h1>

            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                        <tr>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>접수일시</th>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>학원명</th>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>원장명</th>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>연락처</th>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>지역</th>
                            <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>메시지</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                                    아직 접수된 상담 문의가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead: any) => (
                                <tr key={lead._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#111827' }}>
                                        {new Date(lead.createdAt).toLocaleString('ko-KR')}
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#111827' }}>{lead.academyName}</td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#111827' }}>{lead.name}</td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#111827' }}>{lead.phone}</td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#111827' }}>{lead.region}</td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#6b7280', maxWidth: '300px' }}>
                                        {lead.message || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
