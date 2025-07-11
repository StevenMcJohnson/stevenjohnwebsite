import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rutgers from './pages/Rutgers';
import { NavProvider } from './context/NavContext';

function App() {
  return (
    <NavProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rutgers" element={<Rutgers />} />
        </Routes>
      </Layout>
    </NavProvider>
  );
}

export default App;