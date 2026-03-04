import './App.css';
import Layout from './layout/Layout';
import Login from './features/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateStation from './features/stations/CreateStation'
import EditStation from './features/stations/EditStation'
import ViewStation from './features/stations/ViewStation'
import ProtectedRoute from './services/ProtectedRoute';
import Ticket from './features/ticket/TicketPage';
import StationPage from './features/stations/StationPage';
import NotFound from './features/NotFound';
import CreateTicket from './features/ticket/CreateTicket';
import EditTicket from './features/ticket/EditTicket';
import HomePage from './features/home/HomePage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        {/* Route With Token */}
        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>
            <Route path='*' element={<NotFound />} />
            {/* Home */}
            <Route path='/home' element={<HomePage />} />
            {/* Station Routes */}
            <Route path="/station" element={<StationPage />} />
            <Route path="/station/create" element={<CreateStation />} />
            <Route path="/station/edit/:id" element={<EditStation />} />
            <Route path="/station/view/:id" element={<ViewStation />} />
            
            {/* Ticket Routes */}
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/ticket/create" element={<CreateTicket />} />
            <Route path="/ticket/edit/:id" element={<EditTicket />} />
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
