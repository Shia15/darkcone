import Hero from './components/Hero';
import Modules from './components/Modules';
import CaseGrid from './components/CaseGrid';
import LiveFeed from './components/LiveFeed';
import ContactFunnel from './components/ContactFunnel';
import Footer from './components/Footer';

export default function Page() {
  return (
    <main>
      <Hero />
      <Modules />
      <CaseGrid />
      <LiveFeed />
      <ContactFunnel />
      <Footer />
    </main>
  );
}
