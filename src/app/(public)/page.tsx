import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";
import RSVPForm from "@/components/invitation/RSVPForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection inviteType="both-receptions" />
      <Timeline inviteType="both-receptions" />
      <CountdownTimer inviteType="both-receptions" />

      {/* <RSVPForm /> */}
    </main>
  );
}
