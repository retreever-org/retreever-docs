import Compare from "./home/Compare";
import Features from "./home/Features";
import Footer from "./home/Footer";
import Hero from "./home/Hero";
import Intro from "./home/Intro";
import Navbar from "./home/Navbar";
import { Quickstart } from "./home/Quickstart";

const Home: React.FC = () => {
    return (
        <div className="bg-(--dark-3)">
            <Navbar />
            <Hero />
            <Intro />
            <Features />
            <Compare />
            <Quickstart />
            <Footer />
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(59, 139, 255, 0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(59, 139, 255, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "64px 64px",
                }}
              />
            </div>
        </div>
    )
}

export default Home;