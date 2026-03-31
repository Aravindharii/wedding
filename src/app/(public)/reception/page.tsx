import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";

export default function ReceptionPage() {
  return (
    <main className="min-h-screen">
      <HeroSection inviteType="reception" />
      <Timeline inviteType="reception" />
      <CountdownTimer inviteType="reception" />
    </main>
  );
}

