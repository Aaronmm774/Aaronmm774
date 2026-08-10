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
import { HomeTheme } from '@/components/home/HomeTheme';

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

const heroProjectOrder: Array<{
  title: string;
  aliases: string[];
  galleryIndex?: number;
}> = [
  {
    title: 'Ritz Carlton Maasai Mara Safari',
    aliases: ['ritz carlton maasai mara safari', 'ritz carlton', 'maasai mara safari'],
    galleryIndex: 0,
  },
  { title: 'Muthaiga Residence', aliases: ['muthaiga residence', 'muthaiga'] },
  { title: 'Hillview Residence', aliases: ['hillview residence', 'hillview'] },
  { title: 'Kuruwitu Villas', aliases: ['kuruwitu villas', 'kuruwitu'], galleryIndex: 1 },
  { title: 'Lavington Residence', aliases: ['lavington residence', 'lavington'] },
  { title: 'Vipingo House 4', aliases: ['vipingo house 4'] },
  { title: 'Vipingo House 2', aliases: ['vipingo house 2'] },
  { title: 'Ketul', aliases: ['ketul residence', 'ketul'] },
  { title: 'Jubilee Insurance HQ', aliases: ['jubilee insurance hq', 'jubilee insurance', 'jubilee'] },
];

function normalizeTitle(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function projectToHeroSlide(project: Project, galleryIndex?: number): HeroSlide {
  return {
    image:
      galleryIndex === undefined
        ? project.image
        : project.gallery[galleryIndex] || project.image,
    label: project.industry,
    title: project.title,
    note: project.summary || project.location,
  };
}

export default async function HomePage() {
  const projects = await getProjects();
  const heroSlides = heroProjectOrder
    .flatMap(({ aliases, galleryIndex }) => {
      const project = projects.find((project) => {
        const projectTitle = normalizeTitle(project.title);
        return aliases.some((alias) => projectTitle.includes(normalizeTitle(alias)));
      });

      return project ? [projectToHeroSlide(project, galleryIndex)] : [];
    });

  return (
    <HomeTheme>
      <Hero slides={heroSlides} />
      <div className="space-y-14 px-4 py-14 sm:px-6 md:space-y-20 md:py-20 lg:px-12">
        <ProjectsPreview />
        <VisionMission />
        <ServicesPreview />
        <WhyChooseUs />
        <Clients />
        <CTA />
      </div>
    </HomeTheme>
  );
}
