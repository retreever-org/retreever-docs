import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveDocs } from "../service/DocsResolver";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../../pages/home/Navbar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";
import Toc from "../components/Toc";
import { useDocsStore } from "../../store/useDocsStore";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const docsTree = resolveDocs();

  // Update store when pathname changes
  useEffect(() => {
    const newFullPath = location.pathname
      .replace(/^\/docs\/?/i, "")
      .toLowerCase()
      .trim();

    useDocsStore.getState().setCurrent(newFullPath);
  }, [location.pathname]);

  return (
    <div className="bg-canvas text-text-primary tracking-tight">
      <div className="hidden lg:flex h-full">
        <Navbar />
      </div>
      <div className="md:flex">
        <Sidebar tree={docsTree} />
        <ContentDisplay />
        <Toc />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
