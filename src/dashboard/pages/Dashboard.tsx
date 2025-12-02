import { useEffect } from "react";
import { resolveDocs } from "../service/DocsResolver";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../../pages/home/Navbar";

const Dashboard: React.FC = () => {
  const docsTree = resolveDocs();

  useEffect(() => {
    console.log("Docs Tree:", docsTree);
  }, [docsTree]);
  return (
    <div className="bg-(--dark-1)">
      <Navbar/>
      <Sidebar tree={docsTree} />
    </div>
  );
};

export default Dashboard;
