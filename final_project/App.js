import { DifficultyProvider } from './src/contexts/DifficultyContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemesProvider } from './src/contexts/ThemesContext';
import Routes from './src/routes';

export default function App() {
  
  return (
    <ThemesProvider>
      <LanguageProvider>
        <DifficultyProvider>
          <Routes/>
        </DifficultyProvider>
      </LanguageProvider>
    </ThemesProvider>
  );
}
