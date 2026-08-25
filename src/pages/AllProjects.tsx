import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";

const groups: { label: string; category: "Personal" | "Professional" }[] = [
  { label: "Personal Projects", category: "Personal" },
  { label: "Professional Work", category: "Professional" },
];

const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} /> Back home
          </Link>

          <p className="section-eyebrow mb-4">All projects</p>
          <h1
            className="font-display font-bold leading-tight mb-16"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}
          >
            Everything I've built
          </h1>

          {groups.map(group => {
            const items = projects.filter(p => p.category === group.category);
            if (items.length === 0) return null;
            return (
              <div key={group.category} className="mb-16">
                <h2
                  className="text-xs font-mono tracking-widest uppercase mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  — {group.label}
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {items.map((project, i) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="rounded-xl p-6 flex flex-col"
                      style={{
                        background: "rgba(26, 29, 39, 0.6)",
                        border: "1px solid var(--border-subtle)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-2 py-0.5 text-xs rounded"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--teal)",
                            background: "var(--teal-dim)",
                          }}
                        >
                          {project.tag}
                        </span>
                        {project.status && (
                          <span
                            className="px-2 py-0.5 text-xs rounded"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: "var(--text-muted)",
                              border: "1px solid var(--border-mid)",
                            }}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                        {project.title}
                      </h3>

                      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AllProjects;
