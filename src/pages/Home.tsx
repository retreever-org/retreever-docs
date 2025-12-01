import Compare from "./home/Compare";
import Hero from "./home/Hero";
import Intro from "./home/Intro";

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Intro />
            <Compare />
        </div>
    )
}

export default Home;