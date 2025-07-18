import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";

function App() {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden ${
        darkMode
          ? "bg-gradient-to-b from-black to-gray-900 text-primary"
          : "bg-gradient-to-b from-gray-900 to-gray-200 text-primary"
      }`}
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black dark:bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Hamburger (mobile) */}
          <button
            className="md:hidden w-12 h-12 border border-current rounded-lg text-3xl"
            onClick={toggleMenu}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Logo (desktop only)*/}
          <a href="#home" className="text-2xl font-heading">
            GV
          </a>

          {/* Menu */}
          <nav className="hidden md:flex space-x-6 font-sans">
            {["home", "about", "axk", "portfolio", "contact"].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative group text-current"
                onClick={(e) => {
                  e.preventDefault();

                  setTimeout(() => {
                    const element = document.getElementById(key);
                    console.log(element);
                    if (element) {
                      const yOffset = -80; // altura do navbar
                      const y =
                        element.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;

                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                    setMenuOpen(false); // fecha o menu mobile se aberto
                  }, 50); // delay curto para garantir render
                }}
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
      <div className="relative z-10 pt-40">
        {/* Hero */}
        <section
          id="home"
          className="flex flex-col justify-between items-center min-h-screen px-6 py-16"
        >
          <div className="flex flex-col items-center">
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
          </div>

          {/* Morcego separador */}
          <div className="flex justify-center my-12">
            <img
              src="/bat-icon.svg"
              alt="Bat Icon"
              className="w-20 h-20 transition-colors duration-500"
              style={{
                filter: darkMode
                  ? "drop-shadow(0 0 10px #FFD700)" // glow dourado no dark
                  : "drop-shadow(0 0 10px #1A1A1A)", // glow grafite no light
              }}
            />
          </div>

          {/* About Section (inside Hero) */}
          <div
            id="about"
            className="mt-12 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8"
          >
            {/* Photo */}
            <motion.img
              src="/profile.jpeg"
              alt="Gustavo Vargas"
              className="w-64 h-64 rounded-2xl object-cover shadow-xl transition duration-500 ease-in-out"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(0 0 20px #FFD700)",
              }}
              animate={{
                filter: "drop-shadow(0 0 0px transparent)",
              }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />

            {/* About Text */}
            <motion.div
              className="flex-1 text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading mb-4">{`<${t(
                "about.title"
              )} />`}</h2>
              <p className="text-lg md:text-xl font-sans text-secondary">
                {t("about.text")}
              </p>
            </motion.div>
          </div>
        </section>
        {/* Separador */}
        <div className="flex justify-center my-16">
          <img
            src="/bat-icon.svg"
            alt="Bat Icon"
            className="w-20 h-20 transition-colors duration-500"
            style={{
              filter: darkMode
                ? "drop-shadow(0 0 10px #FFD700)"
                : "drop-shadow(0 0 10px #1A1A1A)",
            }}
          />
        </div>
        <section
          id="portfolio"
          className="w-full flex flex-col items-center px-6 py-16 pt-32"
        >
          <h2 className="text-3xl md:text-4xl font-heading mb-8">{`<${t(
            "navbar.portfolio"
          )} />`}</h2>

          {/* Grid de projetos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {[1, 2, 3, 4, 5, 6].map((project, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl backdrop-blur-lg bg-white/10 p-6 shadow-xl border border-primary
    hover:border-secondary hover:text-secondary 
    transition-all duration-300 cursor-pointer font-heading"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #0DF5E3" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-heading text-primary mb-2">
                  {`Project ${idx + 1}`}
                </h3>
                <p className="text-secondary text-sm">
                  {t("portfolio.description")}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
