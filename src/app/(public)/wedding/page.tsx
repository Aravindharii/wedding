import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection inviteType="wedding" />
      <Timeline inviteType="wedding" />
      <CountdownTimer inviteType="wedding" />
    </main>
  );
}

