import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";

export default function EngagementPage() {
    return (
        <main className="min-h-screen">
            <HeroSection inviteType="engagement" />
            <Timeline inviteType="engagement" />
            <CountdownTimer inviteType="engagement" />
        </main>
    );
}
