import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitBranch,
  Globe,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const socialLinks = [
  { Icon: GitBranch, href: "https://github.com/shoaib7080", label: "GitHub" },
  {
    Icon: Globe,
    href: "https://www.linkedin.com/in/shoaib-ahmad-02bbaa201",
    label: "LinkedIn",
  },
  { Icon: MessageCircle, href: "https://wa.link/jyp5ca", label: "WhatsApp" },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData();
    data.append("access_key", "75e57396-8499-4124-a14c-86883a18a427");
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);
    data.append("subject", "New contact from portfolio");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 6,
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-eyebrow mb-4">Contact</p>
          <h2
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text-primary)",
            }}
          >
            Let's work together
          </h2>
          <p
            className="mt-3 max-w-md text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Open to freelance projects, junior roles, and collaborations. Drop
            me a message and I'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  required
                  placeholder="Your name"
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border-subtle)")
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="you@example.com"
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border-subtle)")
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  style={{ ...inputBase, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border-subtle)")
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200"
                style={{
                  background:
                    status === "sending" ? "var(--slate-mid)" : "var(--teal)",
                  color:
                    status === "sending" ? "var(--text-muted)" : "var(--ink)",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Send size={15} />
                {status === "sending" ? "Sending…" : "Send message"}
              </motion.button>

              {/* Feedback */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--teal)" }}
                >
                  <CheckCircle2 size={15} /> Message sent — I'll be in touch
                  soon!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#f87171" }}
                >
                  <AlertCircle size={15} /> Something went wrong. Try again or
                  email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card rounded-xl p-6">
              <h3
                className="font-display font-semibold text-base mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Reach me directly
              </h3>
              <div className="space-y-4">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-all duration-200"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded border transition-all duration-200"
                      style={{
                        borderColor: "var(--border-subtle)",
                        background: "var(--teal-glow)",
                      }}
                    >
                      <Icon size={16} style={{ color: "var(--teal)" }} />
                    </div>
                    <span
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--teal)" }}
                >
                  Available for work
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Open to freelance contracts, junior full-stack roles, and side
                project collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-24 max-w-6xl mx-auto pt-8"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="font-display font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            SA<span style={{ color: "var(--teal)" }}>.</span>
          </span>
          <p
            className="text-xs"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            © {new Date().getFullYear()} Shoaib Ahmad — Built with React + GSAP
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
