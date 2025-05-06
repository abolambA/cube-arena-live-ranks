
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Define the Language type that was missing
type Language = 'en' | 'ar';

// Create a context for the language
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const languageState = useLanguage();
  
  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the context
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

// Original hook implementation
export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar'; // Default to Arabic
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Set the dir attribute based on the language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Dictionary of translations
  const translations: { [key: string]: { [lang in Language]: string } } = {
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
    rank: {
      en: 'Rank',
      ar: 'الترتيب'
    },
    name: {
      en: 'Name',
      ar: 'الإسم'
    },
    solves: {
      en: 'Solves',
      ar: 'الحلول'
    },
    selectEvent: {
      en: 'Select Event',
      ar: 'اختر الفعالية'
    },
    cube: {
      en: 'Cube',
      ar: 'مكعب'
    },
    noCompetitors: {
      en: 'No competitors found',
      ar: 'لا يوجد متسابقين'
    },
    login: {
      en: 'Login',
      ar: 'تسجيل الدخول'
    },
    email: {
      en: 'Email',
      ar: 'البريد الإلكتروني'
    },
    password: {
      en: 'Password',
      ar: 'كلمة المرور'
    },
    adminPanel: {
      en: 'Admin Panel',
      ar: 'لوحة التحكم'
    },
    viewLeaderboard: {
      en: 'View Leaderboard',
      ar: 'عرض الترتيب'
    },
    logout: {
      en: 'Logout',
      ar: 'تسجيل الخروج'
    },
    competitorManagement: {
      en: 'Competitor Management',
      ar: 'إدارة المتسابقين'
    },
    addResults: {
      en: 'Add Results',
      ar: 'إضافة نتائج'
    },
    viewResults: {
      en: 'View Results',
      ar: 'عرض النتائج'
    },
    changeStatus: {
      en: 'Change Status',
      ar: 'تغيير الحالة'
    },
    updateStatus: {
      en: 'Update Status',
      ar: 'تحديث الحالة'
    },
    competitionStatus: {
      en: 'Competition Status',
      ar: 'حالة المسابقة'
    },
    notStarted: {
      en: 'Not Started',
      ar: 'لم تبدأ'
    },
    inProgress: {
      en: 'In Progress',
      ar: 'قيد التنفيذ'
    },
    finished: {
      en: 'Finished',
      ar: 'انتهت'
    },
    cancel: {
      en: 'Cancel',
      ar: 'إلغاء'
    },
    save: {
      en: 'Save',
      ar: 'حفظ'
    },
    actions: {
      en: 'Actions',
      ar: 'إجراءات'
    },
    addCompetitor: {
      en: 'Add Competitor',
      ar: 'إضافة متسابق'
    },
    leaderboard: {
      en: 'Leaderboard',
      ar: 'لوحة الترتيب'
    },
    events: {
      en: 'Events',
      ar: 'الفعاليات'
    },
    eventManagement: {
      en: 'Event Management',
      ar: 'إدارة الفعاليات'
    },
    addEvent: {
      en: 'Add Event',
      ar: 'إضافة فعالية'
    },
    eventName: {
      en: 'Event Name',
      ar: 'اسم الفعالية'
    },
    eventCode: {
      en: 'Event Code',
      ar: 'كود الفعالية'
    },
    active: {
      en: 'Active',
      ar: 'نشط'
    },
    manage: {
      en: 'Manage',
      ar: 'إدارة'
    },
    bestTime: {
      en: 'Best Time',
      ar: 'أفضل وقت'
    },
    noEvents: {
      en: 'No events found',
      ar: 'لا توجد فعاليات'
    },
    eventAdded: {
      en: 'Event added',
      ar: 'تمت إضافة الفعالية'
    },
    eventUpdated: {
      en: 'Event updated',
      ar: 'تم تحديث الفعالية'
    },
    eventRemoved: {
      en: 'Event removed',
      ar: 'تمت إزالة الفعالية'
    },
    eventDisabled: {
      en: 'Event disabled',
      ar: 'تم تعطيل الفعالية'
    },
    eventEnabled: {
      en: 'Event enabled',
      ar: 'تم تفعيل الفعالية'
    },
    success: {
      en: 'Success',
      ar: 'نجاح'
    },
    failed: {
      en: 'Failed',
      ar: 'فشل'
    },
    invalidCredentials: {
      en: 'Invalid email or password',
      ar: 'بريد إلكتروني أو كلمة مرور غير صالحة'
    },
    welcomeAdmin: {
      en: 'Welcome to the admin panel',
      ar: 'مرحبًا بك في لوحة التحكم'
    },
    loggingIn: {
      en: 'Logging in...',
      ar: 'جاري تسجيل الدخول...'
    },
    noResultsWithoutEvent: {
      en: 'Please select an event to view results',
      ar: 'يرجى اختيار فعالية لعرض النتائج'
    },
    selectCompetitor: {
      en: 'Select competitor',
      ar: 'اختر متسابق'
    }
  };

  // Function to get a translation
  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    return translations[key][language] || key;
  };

  return { language, setLanguage, t };
};
