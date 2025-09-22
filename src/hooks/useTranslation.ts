import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTranslation, Language, TranslationKey } from '@/lib/i18n';

interface LanguageStore {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      setLanguage: (language: Language) => set({ currentLanguage: language }),
      t: (key: TranslationKey) => getTranslation(key, get().currentLanguage),
    }),
    {
      name: 'infinipets-language',
    }
  )
);

export const useTranslation = () => {
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  return { currentLanguage, setLanguage, t };
};