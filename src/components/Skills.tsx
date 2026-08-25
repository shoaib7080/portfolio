import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss, SiMongodb, SiExpress, SiTypescript, SiJavascript,
  SiPostman, SiVercel,
} from "react-icons/si";

interface Skill {
  name: string;
  Icon: React.ElementType;
  color: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React", Icon: FaReact, color: "#61DAFB", level: 85, category: "Frontend" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", level: 88, category: "Frontend" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 65, category: "Frontend" },
  { name: "HTML5", Icon: FaHtml5, color: "#E34F26", level: 92, category: "Frontend" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6", level: 88, category: "Frontend" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", level: 90, category: "Frontend" },
  { name: "Node.js", Icon: FaNodeJs, color: "#68A063", level: 80, category: "Backend" },
  { name: "Express", Icon: SiExpress, color: "#ffffff", level: 78, category: "Backend" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", level: 75, category: "Backend" },
  { name: "Git", Icon: FaGitAlt, color: "#F05032", level: 82, category: "Tools" },
  { name: "GitHub", Icon: FaGithub, color: "#ffffff", level: 85, category: "Tools" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", level: 78, category: "Tools" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff", level: 75, category: "Tools" },
];

const categories = ["Frontend", "Backend", "Tools"];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-eyebrow mb-4">Skills</p>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}
          >
            Tools of the trade
          </h2>
        </motion.div>

        {categories.map((cat, ci) => {
          const catSkills = skills.filter(s => s.category === cat);
          return (
            <div key={cat} className="mb-14">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: ci * 0.15 }}
                className="text-xs font-mono tracking-widest uppercase mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                — {cat}
              </motion.h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: ci * 0.1 + i * 0.06 }}
                    className="glass-card rounded-lg p-4 flex items-center gap-4 group transition-all duration-300"
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,201,167,0.3)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                    }}
                  >
                    <div
                      className="w-10 h-10 flex-shrink-0 rounded flex items-center justify-center"
                      style={{ background: `${skill.color}15` }}
                    >
                      <skill.Icon style={{ color: skill.color, width: 20, height: 20 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="h-0.5 w-full rounded-full overflow-hidden"
                        style={{ background: "var(--slate-mid)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--teal)" }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: ci * 0.1 + i * 0.06 + 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
