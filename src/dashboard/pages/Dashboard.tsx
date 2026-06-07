import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";
import Toc from "../components/Toc";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-full flex-col bg-inherit text-inherit tracking-tight">
      <div className="flex-1 lg:flex lg:h-[calc(100vh-3rem)] pb-4">
        <div className="lg:flex min-w-64 no-scrollbar">
          <Sidebar />
        </div>
        <div className="w-full overflow-auto pt-18 lg:w-7/12 lg:pt-4">
          <ContentDisplay />
        </div>
        <Toc />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
