import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, GitBranch, Globe, MessageCircle } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Blinking cursor
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    }
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full mx-auto"
      >
        {/* Eyebrow */}
        <motion.p variants={item} className="section-eyebrow mb-6">
          Full-Stack Developer
        </motion.p>

        {/* Name */}
        <motion.h1
          ref={nameRef}
          variants={item}
          className="font-display font-extrabold leading-none tracking-tight mb-4"
          style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            color: "var(--text-primary)",
          }}
        >
          Shoaib Ahmad
          <span ref={cursorRef} style={{ color: "var(--teal)", marginLeft: "4px" }}>|</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl mb-3 max-w-xl leading-relaxed"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          I build fast, scalable web apps — from pixel-perfect UIs to battle-tested backends.
        </motion.p>

        {/* Stack badge */}
        <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
          {["React", "Node.js", "MongoDB", "Express", "TypeScript"].map(tech => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-sm border"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--teal)",
                borderColor: "rgba(0,201,167,0.25)",
                background: "rgba(0,201,167,0.06)",
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 font-medium text-sm rounded transition-all duration-200"
            style={{
              background: "var(--teal)",
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Get in touch
          </button>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 font-medium text-sm rounded border transition-all duration-200"
            style={{
              borderColor: "var(--border-mid)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
              (e.currentTarget as HTMLElement).style.color = "var(--teal)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            }}
          >
            View projects →
          </button>

          {/* Social icons */}
          <div className="flex gap-3 ml-2">
            {[
              { Icon: GitBranch, href: "https://github.com/shoaib7080", label: "GitHub" },
              { Icon: Globe, href: "https://www.linkedin.com/in/shoaib-ahmad", label: "LinkedIn" },
              { Icon: MessageCircle, href: "https://wa.link/jyp5ca", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded border transition-all duration-200"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
                  (e.currentTarget as HTMLElement).style.color = "var(--teal)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
