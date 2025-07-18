import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function About({ darkMode }: { darkMode: boolean }) {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className={`w-full min-h-screen flex flex-col justify-center items-center
        ${
          darkMode
            ? "bg-gradient-to-b from-black to-gray-900 text-primary"
            : "bg-gradient-to-b from-gray-900 to-gray-200 text-primary"
        }
        px-6 py-16 transition-colors duration-300`}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-heading mb-8 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {`<${t("about.title")} />`}
      </motion.h2>
      <motion.p
        className="max-w-3xl text-center text-lg md:text-xl font-sans text-secondary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {t("about.text")}
      </motion.p>
    </section>
  );
}
