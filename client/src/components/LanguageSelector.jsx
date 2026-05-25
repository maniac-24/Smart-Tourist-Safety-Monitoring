import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-white hover:bg-gray-600/50 transition-all"
      >
        <span>{current.flag}</span>
        <span className="text-xs">{current.name}</span>
        <span className="text-xs text-gray-400">▼</span>
      </button>

      {open && (
        <div className="absolute top-[120%] right-0 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-[9999] overflow-hidden min-w-[140px]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 transition-all ${i18n.language === lang.code ? 'bg-blue-600/30 text-blue-400' : 'text-gray-300'}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}