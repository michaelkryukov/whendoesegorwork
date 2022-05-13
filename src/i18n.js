import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      "Does Egor work today?": "Егор сегодня работает?",
      "Does Egor work tommorow?": "Егор завтра работает?",
      "Does Egor work this weekend?": "Егор работает на этих выходных?",
      "Does Egor work this saturday?": "Егор работает в эту субботу?",
      "Does Egor work this sunday?": "Егор работает в это воскресение?",
      "Does Egor work next weekend?": "Егор работает на следующих выходных?",
      "Does Egor work next saturday?": "Егор работает в следующую субботу?",
      "Does Egor work next sunday?": "Егор работает в следующее воскресение?",
      "More details": "Подробнее",
      "Less details": "Менее подробно",
      "No": "Нет",
      "Yes": "Да",
      "Partially": "Частично",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: { escapeValue: false },
  });

  export default i18n;
