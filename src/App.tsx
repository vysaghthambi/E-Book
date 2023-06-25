import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <main className="d-flex flex-column flex-fill main-content-container bg-body-tertiary">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
