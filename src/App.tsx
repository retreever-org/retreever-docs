import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Dashboard from "./dashboard/pages/Dashboard";

export default function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Scroll to top on route change (smooth)
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    el.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <main ref={mainRef} className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs/*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
