import Suntry from '@/components/app/Suntry';
import Footer from '@/components/footer';
import { AnimatedBackground } from "@/components/sun-background";

export const metadata = {
  title: 'Suntries - Your Solar Memory Bank and Feeld Journal',
  description: 'Capture and collect your moments with the sun - from golden hours to rooftop revelations.',
};

export default function SuntriesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Suntry />
      <Footer />
    </main>
  );
} 