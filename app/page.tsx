import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import type { HeroSlide } from '@/components/home/Hero';
import { ProjectsPreview } from '@/components/home/ProjectsPreview';
import { VisionMission } from '@/components/home/VisionMission';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Clients } from '@/components/home/Clients';
import { CTA } from '@/components/home/CTA';
import { getProjects } from '@/lib/projects';
import type { Project } from '@/lib/projects';

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

const heroProjectOrder = [
  { title: 'The Loft', aliases: ['the loft', 'loft'] },
  { title: 'Jubilee', aliases: ['jubilee', 'jubilee insurance', 'jubilee insurance hq'] },
  { title: 'Crescent Pearl', aliases: ['crescent pearl'] },
  { title: 'Sere Village', aliases: ['sere village', 'sere'] },
  { title: 'Loresho Houses', aliases: ['loresho houses', 'loresho'] },
  { title: 'Keitt Avocado', aliases: ['keitt avocado', 'keitt'] },
  { title: '254 Peponi', aliases: ['254 peponi', 'peponi'] },
  { title: 'Muthaiga Residence', aliases: ['muthaiga residence', 'muthaiga'] },
];

function normalizeTitle(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function projectToHeroSlide(project: Project): HeroSlide {
  return {
    image: project.image,
    label: project.industry,
    title: project.title,
    note: project.summary || project.location,
  };
}

export default async function HomePage() {
  const projects = await getProjects();
  const heroSlides = heroProjectOrder
    .map(({ aliases }) =>
      projects.find((project) => {
        const projectTitle = normalizeTitle(project.title);
        return aliases.some((alias) => projectTitle.includes(normalizeTitle(alias)));
      }),
    )
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
    .map(projectToHeroSlide);

  return (
    <div className="space-y-14 px-4 pt-4 sm:px-6 sm:pt-6 md:space-y-20 lg:px-12 lg:pt-8">
      <Hero slides={heroSlides} />
      <ProjectsPreview />
      <VisionMission />
      <ServicesPreview />
      <WhyChooseUs />
      <Clients />
      <CTA />
    </div>
  );
}
