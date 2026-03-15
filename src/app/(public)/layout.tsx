import Navbar from "@/components/invitation/Navbar";
import Footer from "@/components/invitation/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
