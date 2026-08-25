import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = projects.filter(p => p.featured);

  return (
    <section id="projects" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-eyebrow mb-4">Projects</p>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}
          >
            Things I've built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-xl p-7 flex flex-col h-full"
              style={{
                background: "rgba(26, 29, 39, 0.6)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(20px)",
                transition: "border-color 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              <span
                className="inline-block w-fit px-2 py-0.5 text-xs rounded mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--teal)",
                  background: "var(--teal-dim)",
                }}
              >
                {project.tag}
              </span>

              <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h3>

              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-xs rounded"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "var(--slate-mid)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!project.github}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded"
                  style={{
                    border: "1px solid var(--border-mid)",
                    color: project.github ? "var(--text-secondary)" : "var(--text-muted)",
                    opacity: project.github ? 1 : 0.5,
                    pointerEvents: project.github ? "auto" : "none",
                  }}
                >
                  <GitBranch size={13} /> Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded"
                    style={{ background: "var(--teal)", color: "var(--ink)" }}
                  >
                    <ExternalLink size={13} /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium"
            style={{
              border: "1px solid var(--border-mid)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.2s ease, color 0.2s ease",
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
            View all projects <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
