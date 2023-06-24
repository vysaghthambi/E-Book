import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
