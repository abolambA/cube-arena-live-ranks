
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define all translations
const translations = {
  en: {
    adminLogin: 'Admin Login',
    podium: 'Podium',
    rank: 'Rank',
    name: 'Name',
    average: 'Average (Ao5)',
    solves: 'Solves',
    noCompetitors: 'No competitors yet',
    selectEvent: 'Select Event',
    cube: 'Cube',
    competitionStatus: 'Status',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    finished: 'Finished',
    leaderboard: 'Leaderboard',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    submit: 'Submit',
    logout: 'Logout',
    adminPanel: 'Admin Panel',
    competitorManagement: 'Competitor Management',
    addCompetitor: 'Add Competitor',
    addResults: 'Add Results',
    changeStatus: 'Change Status',
    competitors: 'Competitors',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    competitor: 'Competitor',
    event: 'Event',
    dnf: 'DNF',
    calculatedAverage: 'Calculated Average',
    solve: 'Solve',
    backToList: 'Back to List',
    enterTime: 'Enter time',
    addNew: 'Add New',
    required: 'Required',
    invalidEmail: 'Invalid email',
    invalidFormat: 'Invalid format',
    welcome: 'Welcome to',
    speedcubingLeaderboard: 'Live Speedcubing Leaderboard',
    viewResults: 'View Results',
    updateStatus: 'Update Status',
    viewLeaderboard: 'View Public Leaderboard',
    invalidCredentials: 'Invalid email or password',
  },
  ar: {
    adminLogin: 'دخول المسؤول',
    podium: 'منصة التتويج',
    rank: 'المرتبة',
    name: 'الاسم',
    average: 'المتوسط',
    solves: 'المحاولات',
    noCompetitors: 'لا يوجد متسابقين حتى الآن',
    selectEvent: 'اختر المسابقة',
    cube: 'مكعب',
    competitionStatus: 'الحالة',
    notStarted: 'لم تبدأ',
    inProgress: 'جارية',
    finished: 'انتهت',
    leaderboard: 'لوحة المتصدرين',
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    submit: 'إرسال',
    logout: 'تسجيل الخروج',
    adminPanel: 'لوحة الإدارة',
    competitorManagement: 'إدارة المتسابقين',
    addCompetitor: 'إضافة متسابق',
    addResults: 'إضافة نتائج',
    changeStatus: 'تغيير الحالة',
    competitors: 'المتسابقون',
    actions: 'إجراءات',
    edit: 'تعديل',
    delete: 'حذف',
    cancel: 'إلغاء',
    save: 'حفظ',
    competitor: 'المتسابق',
    event: 'المسابقة',
    dnf: 'لم ينته',
    calculatedAverage: 'المتوسط المحسوب',
    solve: 'المحاولة',
    backToList: 'العودة للقائمة',
    enterTime: 'أدخل الوقت',
    addNew: 'إضافة جديد',
    required: 'مطلوب',
    invalidEmail: 'بريد إلكتروني غير صالح',
    invalidFormat: 'صيغة غير صالحة',
    welcome: 'مرحبًا بك في',
    speedcubingLeaderboard: 'لوحة نتائج مسابقة المكعب السريع',
    viewResults: 'عرض النتائج',
    updateStatus: 'تحديث الحالة',
    viewLeaderboard: 'عرض لوحة المتصدرين العامة',
    invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
  },
};

type Language = 'en' | 'ar';
type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key as string,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set the direction of the html element based on the language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
