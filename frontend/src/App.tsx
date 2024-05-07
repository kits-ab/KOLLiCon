// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import HandleLogin from '@/utils/Login/HandleLogin';
import Success from '@/utils/Authorization/Token';
import Error from '@/pages/Error';
import { Home } from './pages/Home';
import NotFound from '@/pages/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectedRoute from './utils/Authorization/ProtectedRoute';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/handlelogin' element={<HandleLogin />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<NotFound />} />
        <Route
          path='/home'
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
