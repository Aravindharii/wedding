import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Timeline />
      <CountdownTimer />
    </main>
  );
}
