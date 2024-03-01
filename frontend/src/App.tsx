// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import HandleLogin from '@/utils/Login/HandleLogin';
import Success from '@/utils/Authorization/Token';
import Error from '@/pages/Error';
import { Home } from './pages/Home';
import NotFound from '@/pages/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import Activity from './components/RegisterActivity/Activity';
import ScheduleForm from '@/components/CreateSchedule/CreateScheduleComponent';
import ExportFileUI from './components/ExportSchedule/ExportFileUI';
import TheMenu from './components/HeaderMenu/TheMenu';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/handlelogin' element={<HandleLogin />} />
        <Route path='/token' element={<Success />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<Home />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/postschedule' element={<ScheduleForm />} />
        <Route path='/ui' element={<ExportFileUI />} />
        <Route path='/newmenu' element={<TheMenu />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
