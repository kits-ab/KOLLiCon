// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import HandleLogin from '@/pages/HandleLogin';
import NotFound from '@/pages/NotFound';
import Success from '@/pages/Token';
import Error from '@/pages/Error';
import { Activities } from './pages/Activities';
import { QueryClient, QueryClientProvider } from 'react-query';
import Activity from './components/RegisterActivity/Activity';
import ScheduleForm from './components/CreateScheduleComponent';
import ScheduleUserInterface from './pages/ExportUI';

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
        <Route path='/activities' element={<Activities />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/postschedule' element={<ScheduleForm />} />
        <Route path='/ui' element={<ScheduleUserInterface />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
