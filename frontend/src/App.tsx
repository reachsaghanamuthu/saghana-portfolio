import SiteHeader from './components/site/SiteHeader';
import SiteFooter from './components/site/SiteFooter';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import CredentialsSection from './components/sections/CredentialsSection';
import HackathonsSection from './components/sections/HackathonsSection';
import ContactSection from './components/sections/ContactSection';

/*
 * One continuous newspaper, read top to bottom.
 *
 * The former page-flip deck forced every section into exactly one viewport,
 * which is what made the layout so fragile. As an ordinary scrolling document
 * each section takes the height it needs, and the newsprint texture still
 * runs edge to edge behind all of it.
 */
export default function App() {
  return (
    <div className="newsprint page-gutter min-h-dvh">
      <SiteHeader />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CredentialsSection />
        <HackathonsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}