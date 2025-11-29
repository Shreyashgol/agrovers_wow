/**
 * Language Selection Component
 * 
 * First screen – choose Hindi or English.
 */

import { Language } from '../api/client';

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-emerald-900 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900/80 border border-green-200 dark:border-emerald-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-green-100 dark:bg-emerald-500/20 flex items-center justify-center text-2xl">
            🌾
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 dark:text-white">
            Agrovers Soil Assistant
          </h1>
          <p className="text-sm text-green-700 dark:text-emerald-200">
            मिट्टी परीक्षण सहायक – simple guidance for your farm
          </p>
        </div>

        <p className="text-center text-sm text-gray-700 dark:text-slate-200">
          Please select your preferred language <br />
          <span className="text-green-600 dark:text-emerald-300">
            / कृपया अपनी भाषा चुनें
          </span>
        </p>

        <div className="space-y-3">
          <button
            onClick={() => onSelect('en')}
            className="w-full py-3.5 px-6 rounded-2xl bg-green-600 hover:bg-green-700 dark:bg-emerald-500 dark:hover:bg-emerald-400
                       text-white text-base sm:text-lg font-semibold shadow-lg
                       transition-all duration-300 active:scale-95 hover:shadow-xl"
          >
            English
          </button>

          <button
            onClick={() => onSelect('hi')}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:hover:bg-amber-400
                       text-white text-base sm:text-lg font-semibold shadow-lg
                       transition-all duration-300 active:scale-95 hover:shadow-xl"
          >
            हिंदी (Hindi)
          </button>
        </div>

        <p className="text-[11px] text-center text-gray-600 dark:text-slate-400">
          Your answers will generate a{" "}
          <span className="text-green-600 dark:text-emerald-300 font-medium">
            simple soil health report
          </span>{" "}
          for your farm.
        </p>
      </div>
    </div>
  );
}
