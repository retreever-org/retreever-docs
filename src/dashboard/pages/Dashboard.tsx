import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";
import Toc from "../components/Toc";
import { DEFAULT_DOC_PATH } from "../service/DocSearch";
import { useDocsStore } from "../../store/useDocsStore";

const Dashboard: React.FC = () => {
  useEffect(() => {
    const loadInitialDoc = async () => {
      const initialPath = useDocsStore.getState().current.path || DEFAULT_DOC_PATH;
      const markdown = await useDocsStore.getState().setCurrent(initialPath);

      if (!markdown && initialPath !== DEFAULT_DOC_PATH) {
        sessionStorage.setItem("retreever.currentScrollTop", "0");
        await useDocsStore.getState().setCurrent(DEFAULT_DOC_PATH);
      }
    };

    void loadInitialDoc();
  }, []);

  return (
    <div className="bg-inherit text-inherit tracking-tight">
      <div className="lg:flex">
        <div className="lg:flex min-w-64 no-scrollbar">
          <Sidebar />
        </div>
        <div className="w-full overflow-auto pt-[4.5rem] lg:w-7/12 lg:pt-4">
          <ContentDisplay />
        </div>
        <Toc />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
