import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Set the dir attribute based on the language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // This should include all text used in the app in both English and Arabic
  const translations = {
    adminLogin: {
      en: 'Admin Login',
      ar: 'تسجيل دخول المسؤول'
    },
    liveRanking: {
      en: 'Live Ranking',
      ar: 'الترتيب اللحظي'
    },
    podium: {
      en: 'Podium',
      ar: 'المنصة'
    },
    competitors: {
      en: 'Competitors',
      ar: 'المتسابقون'
    },
    rounds: {
      en: 'Rounds',
      ar: 'الجولات'
    },
    round: {
      en: 'Round',
      ar: 'جولة'
    },
    average: {
      en: 'Average',
      ar: 'المعدل'
    },
    best: {
      en: 'Best',
      ar: 'الأفضل'
    },
    results: {
      en: 'Results',
      ar: 'النتائج'
    },
  };

  // Function to get a translation
  const t = (key) => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    return translations[key][language] || key;
  };

  return { language, setLanguage, t };
};
