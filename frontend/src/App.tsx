// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import HandleLogin from '@/pages/HandleLogin';
import NotFound from '@/pages/NotFound';
import Success from '@/pages/Token';
import Error from '@/pages/Error';
import { Events } from './pages/Events';
import Activity from './pages/Activity';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/handlelogin' element={<HandleLogin />} />
      <Route path='/token' element={<Success />} />
      <Route path='/error' element={<Error />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/events' element={<Events />} />
      <Route path='/activity' element={<Activity />} />
    </Routes>
  );
}

export default App;
