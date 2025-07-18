import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import About from "./sections/About";

function App() {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${
        darkMode
          ? "bg-gradient-to-b from-black to-gray-900 text-primary"
          : "bg-gradient-to-b from-gray-900 to-gray-200 text-primary"
      }`}
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/50 dark:bg-white/50 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Hamburger (mobile) */}
          <button
            className="md:hidden w-12 h-12 border border-current rounded-lg text-3xl"
            onClick={toggleMenu}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Logo (desktop only)*/}
          <a href="#home" className="text-2xl font-heading">GV</a>

          {/* Menu */}
          <nav className="hidden md:flex space-x-6 font-sans">
            {["home", "about", "axk", "portfolio", "contact"].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative group text-current"
              >
                {t(`navbar.${key}`)}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Idioma */}
            <div className="custom-select-container">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="custom-select bg-transparent text-secondary font-bold border border-current rounded px-2 py-1"
              >
                <option value="EN" className="font-bold">
                  EN
                </option>
                <option value="PT" className="font-bold">
                  PT
                </option>
                <option value="FR" className="font-bold">
                  FR
                </option>
                <option value="ES" className="font-bold">
                  ES
                </option>
              </select>
            </div>

            {/* Tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 border border-current text-secondary rounded-full hover:text-dark transition text-xl"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Faixa amarela */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full bg-primary z-50 flex flex-col justify-start items-start pt-20 pl-8 space-y-6 text-2xl font-sans text-black"
            >
              {/* Botão X */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 p-3 text-3xl font-bold text-black"
              >
                ✕
              </button>

              {/* Links */}
              {["home", "about", "axk", "portfolio", "contact"].map(
                (key, idx) => (
                  <motion.a
                    key={key}
                    href={`#${key}`}
                    className="relative group text-current"
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.3 }}
                  >
                    {t(`navbar.${key}`)}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                )
              )}
            </motion.div>

            {/* Menu preto sobrepondo a faixa */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "75%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-1/4 h-full bg-black/90 text-primary backdrop-blur-lg z-50 flex flex-col justify-start items-start pt-20 pl-8 space-y-6 text-2xl font-sans"
            />
          </>
        )}
      </AnimatePresence>

      {/* Hero */}

      {/* Conteúdo central */}
      <div className="relative z-10">
        {/* Hero */}
        <section id="home" className="flex flex-col justify-center items-center h-screen text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-heading text-primary drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Gustavo Vargas
          </motion.h1>
          <motion.p
            className="mt-4 text-xl md:text-2xl font-sans text-secondary drop-shadow-[0_0_10px_rgba(13,245,227,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.button
            className="mt-6 px-6 py-3 rounded-lg backdrop-blur-lg bg-white/10 text-primary border border-primary hover:border-secondary hover:text-secondary shadow-xl hover:shadow-secondary transition-all duration-300 font-heading"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px #0DF5E3" }}
          >
            {t("hero.button")}
          </motion.button>
        </section>

        {/* About Section */}
        <About darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default App;
