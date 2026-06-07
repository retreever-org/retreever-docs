import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../../pages/home/Footer";
import ContentDisplay from "./ContentDisplay";
import Toc from "../components/Toc";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-inherit text-inherit tracking-tight">
      <div className="lg:flex h-[calc(100vh-3rem)]">
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
