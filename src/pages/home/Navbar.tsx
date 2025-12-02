import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopNavbar from "../../shared/DesktopNavbar";
import MobileNavbar from "../../shared/MobileNavbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();

  const isDocs = window.location.pathname.startsWith("/docs");

  const handleSectionClick = (href: string) => {
    setActiveLink(href);
    setOpen(false);
    if (href === "/docs") {
      navigate("/docs");
    } else {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Desktop navbar (unchanged) */}
      <DesktopNavbar
        isDocs={isDocs}
        activeLink={activeLink}
        handleSectionClick={handleSectionClick}
        setOpen={setOpen}
      />

      {/* Shared top bar: logo + mobile hamburger aligned in one line */}
      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3 md:hidden">
        {/* placeholder */}
        <div className="flex items-center gap-2">
          
        </div>

        {/* Hamburger from MobileNavbar, positioned via this flex container */}
        <MobileNavbar
          isDocs={isDocs}
          activeLink={activeLink}
          handleSectionClick={handleSectionClick}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
}
