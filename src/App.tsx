import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rutgers from './pages/Rutgers';
import { NavProvider } from './context/NavContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <NavProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rutgers" element={<Rutgers />} />
          </Routes>
        </Layout>
      </NavProvider>
    </ThemeProvider>
  );
}

export default App;