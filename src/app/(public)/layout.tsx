import Navbar from "@/components/invitation/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
