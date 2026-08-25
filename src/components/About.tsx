import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, Zap, BookOpen } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "MERN Stack",
    body: "I build full-stack applications using MongoDB, Express, React, and Node.js — covering everything from database design to polished front-end interfaces.",
  },
  {
    icon: Zap,
    title: "Performance-first",
    body: "Clean code, optimized queries, and smooth animations. I think about load times and rendering performance from day one.",
  },
  {
    icon: Layers,
    title: "Clean Architecture",
    body: "RESTful APIs, component-driven UIs, and clear separation of concerns. Code that teammates can actually work with.",
  },
  {
    icon: BookOpen,
    title: "Always learning",
    body: "Currently deepening my knowledge in TypeScript, cloud deployments, and modern DevOps practices to deliver production-ready apps.",
  },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-eyebrow mb-4">About me</p>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}
          >
            Developer. Problem-solver.
            <br />
            <span style={{ color: "var(--teal)" }}>Perpetual learner.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Bio column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-lg p-8"
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              I'm <strong style={{ color: "var(--text-primary)" }}>Shoaib Ahmad</strong>, a web developer
              based in the UAE with a passion for building digital products that are both beautiful and fast.
              I started with the basics — HTML, CSS, JavaScript — and quickly moved into the MERN stack,
              where I've shipped 10+ projects ranging from e-commerce platforms to productivity tools.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I approach every project as a systems problem: the right data model, the right API shape, and
              a UI that feels effortless. Outside of code I'm exploring cloud infrastructure and how to deploy
              robust, scalable applications end-to-end.
            </p>

            <div className="mt-8 flex gap-10">
              {[
                { value: "10+", label: "Projects built" },
                { value: "MERN", label: "Core stack" },
                { value: "UAE", label: "Based in" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="font-display font-bold text-2xl"
                    style={{ color: "var(--teal)" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-lg p-5 group transition-all duration-300"
                style={{ cursor: "default" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,201,167,0.25)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mb-3"
                  style={{ background: "var(--teal-dim)" }}
                >
                  <card.icon size={16} style={{ color: "var(--teal)" }} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
