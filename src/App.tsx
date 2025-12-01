import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toc from "./components/Toc";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DocPage from "./pages/DocPage";

export default function App() {
  return (
      <div className="flex flex-col h-screen bg-(--dark-1) text-(--text-light)">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs/:slug*" element={<DocPage />} />
            </Routes>
          </main>

          <Toc />
        </div>
      </div>
  );
}
