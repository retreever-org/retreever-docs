import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../../pages/home/Navbar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";
import Toc from "../components/Toc";
import { useDocsStore } from "../../store/useDocsStore";

const Dashboard: React.FC = () => {
  const location = useLocation();

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
        <div className="md:flex min-w-64 no-scrollbar">
          <Sidebar />
        </div>
        <div className="md:w-9/12 lg:w-7/12 overflow-auto">
          <ContentDisplay />
        </div>
        <Toc />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
