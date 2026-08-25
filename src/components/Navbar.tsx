import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Update active section
      const sections = links.map(l => document.getElementById(l.id));
      let current = "home";
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // On other pages, keep the bar solid instead of transparent-on-top.
  useEffect(() => {
    if (!onHome) setScrolled(true);
  }, [onHome]);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Navigate back to home, then scroll once the section exists.
    navigate("/");
    requestAnimationFrame(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
    });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,9,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-display font-bold text-lg tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          SA<span style={{ color: "var(--teal)" }}>.</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative text-sm font-medium transition-colors duration-200"
              style={{
                color: active === link.id ? "var(--teal)" : "var(--text-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "var(--teal)" }}
                />
              )}
            </button>
          ))}
          <a
            href="https://github.com/shoaib7080"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded text-sm font-medium border transition-all duration-200"
            style={{
              borderColor: "var(--teal)",
              color: "var(--teal)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--teal)";
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--teal)";
            }}
          >
            GitHub
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text-primary)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(8,9,13,0.97)", borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-base font-medium py-2"
                  style={{ color: active === link.id ? "var(--teal)" : "var(--text-secondary)" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
