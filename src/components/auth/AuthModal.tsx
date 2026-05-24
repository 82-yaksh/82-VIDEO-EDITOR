import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "@/store/auth";
import { ShiningBorder } from "@/components/ShiningBorder";
import { X, Mail, Lock, User as UserIcon, Sparkles, Loader2 } from "lucide-react";

export function AuthModal() {
  const { modalOpen, closeModal, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") await signIn(email || "guest@82.ai", password);
      else await signUp(name || "Creator", email || "guest@82.ai", password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-md"
          >
            <ShiningBorder inner="glass rounded-2xl p-8">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)] mb-3 neon-glow">
                  <Sparkles className="text-white" size={22} />
                </div>
                <h2 className="text-2xl font-bold neon-text">
                  {mode === "signin" ? "Welcome back" : "Join 82 Video AI"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "signin" ? "Sign in to your studio" : "Create your AI video account"}
                </p>
              </div>

              <div className="flex gap-2 p-1 rounded-lg bg-[oklch(0.16_0.04_275)] mb-5">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 text-sm rounded-md transition relative ${
                      mode === m ? "text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="auth-tab"
                        className="absolute inset-0 rounded-md bg-gradient-to-r from-[oklch(0.7_0.22_250)] to-[oklch(0.65_0.26_295)]"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <span className="relative">{m === "signin" ? "Sign in" : "Sign up"}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-3">
                {mode === "signup" && (
                  <Field icon={<UserIcon size={16} />} placeholder="Your name" value={name} onChange={setName} />
                )}
                <Field icon={<Mail size={16} />} placeholder="you@studio.ai" value={email} onChange={setEmail} type="email" />
                <Field icon={<Lock size={16} />} placeholder="Password" value={password} onChange={setPassword} type="password" />

                <button
                  type="submit"
                  disabled={loading}
                  className="glow-button w-full py-3 rounded-lg font-semibold mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="relative my-5 text-center text-xs text-muted-foreground">
                <span className="bg-[oklch(0.2_0.04_275)] px-3 relative z-10">or continue with</span>
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["Google", "Apple", "GitHub"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => signIn(`${p.toLowerCase()}@demo.ai`, "demo")}
                    className="py-2 rounded-lg neon-input text-xs font-medium hover:border-[oklch(0.7_0.22_280_/_0.7)] transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </ShiningBorder>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="neon-input w-full pl-10 pr-3 py-3 rounded-lg text-sm"
      />
    </div>
  );
}
