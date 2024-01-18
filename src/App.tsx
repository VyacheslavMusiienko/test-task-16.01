import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-xl p-3">
        <Outlet />
      </div>
    </>
  );
};

export default App;
