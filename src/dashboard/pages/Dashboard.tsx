import { resolveDocs } from "../service/DocsResolver";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../../pages/home/Navbar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";

const Dashboard: React.FC = () => {
  const docsTree = resolveDocs();

  return (
    <div className="bg-canvas text-text-primary tracking-tight">
      <div className="hidden lg:flex h-full">
        {/* default navbar shown only on large screens */}
        <Navbar />
      </div>
      <div className="lg:flex">
        <Sidebar tree={docsTree} />
        <ContentDisplay />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
