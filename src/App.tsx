import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './App.css';
import './styles/custom.scss';

function App() {
  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <main className="d-flex flex-column flex-fill main-content-container bg-secondary">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
