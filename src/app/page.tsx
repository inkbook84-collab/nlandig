import HeroSection from '@/components/landing/HeroSection';
import BrandSection from '@/components/landing/BrandSection';
import FeatureSection from '@/components/landing/FeatureSection';
import ConsultationForm from '@/components/landing/ConsultationForm';
import dbConnect from '@/lib/db';
import { Content } from '@/models';

// Revalidate every 60 seconds or force dynamic
export const dynamic = 'force-dynamic';

async function getContent() {
  try {
    await dbConnect();
    const contents = await Content.find({});
    return contents;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const contents = await getContent();

  const heroContent = contents.find((c: any) => c.section === 'hero');
  const chaektongContent = contents.find((c: any) => c.section === 'chaektong');
  const gongpilwangContent = contents.find((c: any) => c.section === 'gongpilwang');

  return (
    <main>
      <HeroSection
        title={heroContent?.title}
        body={heroContent?.body}
      />
      <FeatureSection />
      <BrandSection
        chaektong={chaektongContent ? { title: chaektongContent.title, body: chaektongContent.body } : undefined}
        gongpilwang={gongpilwangContent ? { title: gongpilwangContent.title, body: gongpilwangContent.body } : undefined}
      />
      <ConsultationForm />

      <footer style={{ backgroundColor: 'var(--color-navy-900)', color: 'white', padding: '40px 0', textAlign: 'center' }}>
        <div className="container">
          <p>&copy; 2024 책통클럽 & 공필왕 All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
