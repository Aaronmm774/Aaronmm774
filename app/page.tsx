import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ProjectsPreview } from '@/components/home/ProjectsPreview';
import { VisionMission } from '@/components/home/VisionMission';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Clients } from '@/components/home/Clients';
import { CTA } from '@/components/home/CTA';

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    'Masfy Consulting Engineers | Civil & Structural Engineering Solutions in Kenya',
  description:
    'Civil & structural engineering solutions for safe, efficient and buildable projects. Masfy Consulting Engineers serves clients in Nairobi, Kenya and the region.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Masfy Consulting Engineers | Civil & Structural Engineering Solutions in Kenya',
    description:
      'Civil & structural engineering solutions for safe, efficient and buildable projects across Kenya and the region.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <div className="space-y-14 px-4 pt-4 sm:px-6 sm:pt-6 md:space-y-20 lg:px-12 lg:pt-8">
      <Hero />
      <ProjectsPreview />
      <VisionMission />
      <ServicesPreview />
      <WhyChooseUs />
      <Clients />
      <CTA />
    </div>
  );
}
