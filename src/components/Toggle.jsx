// DarkModeToggle.jsx
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-slate3 dark:bg-slate11 text-slate12 dark:text-slate1 rounded"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
