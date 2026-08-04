import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";
import RSVPForm from "@/components/invitation/RSVPForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection inviteType="wedding-reception" />
      <Timeline inviteType="wedding-reception" />
      <CountdownTimer inviteType="wedding-reception" />

      {/* <RSVPForm /> */}
    </main>
  );
}
