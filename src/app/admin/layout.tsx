import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    // Allow access to login page without session
    // We need to handle this check carefully. 
    // Since this layout wraps all /admin pages, we can't easily exclude /login here without middleware
    // OR we can move the check to specific pages or use a sub-layout.
    // Ideally, use Middleware. But for simplicity in this MVP:

    // We will assume this layout protects everything EXCEPT usually we'd structure it differently.
    // Actually, let's keep it simple: We'll put the check in the children pages or use Middleware.
    // Using Middleware is cleaner for Next.js App Router.

    // But since I cannot create middleware.ts easily without potentially affecting global routes, 
    // I'll make a `DashboardLayout` inside `admin/(protected)` or similar.
    // Or simply: check it here but `login` page should not use this layout? 
    // Next.js nested layouts... `admin/layout.tsx` affects `admin/login/page.tsx`.

    // Strategy: Move protected pages to `admin/(protected)/...` and put layout there.
    // `admin/login` will be outside.

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar - only show if logged in? We can't know for sure here easily without logic. 
          Actually, let's assume this layout is primarily for the dashboard. 
          The login page can opt out if we structure folders right.
          
          Plan: 
          /admin/login/page.tsx
          /admin/dashboard/layout.tsx -> sidebar
          /admin/dashboard/page.tsx
          
          Wait, user wanted /admin/dashboard.
          Let's make /admin root redirect to dashboard.
      */}
            {children}
        </div>
    );
}
