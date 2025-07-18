import { useEffect, useState } from "react";
import i18next from "i18next"; // importa o valor real, não o tipo

export function useLanguage() {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("language") || "EN";
  });

  useEffect(() => {
    i18next.changeLanguage(language); // usa o valor real aqui
    localStorage.setItem("language", language);
  }, [language]);

  return { language, setLanguage };
}
