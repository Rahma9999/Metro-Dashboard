import './App.css';
import Layout from './layout/Layout';
import Login from './features/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateStation from './features/stations/CreateStation';
import EditStation from './features/stations/EditStation';
import ViewStation from './features/stations/ViewStation';
import ProtectedRoute from './services/ProtectedRoute';
import Ticket from './features/ticket/TicketPage';
import StationPage from './features/stations/StationPage';
import NotFound from './features/NotFound';
import CreateTicket from './features/ticket/CreateTicket';
import EditTicket from './features/ticket/EditTicket';
import HomePage from './features/home/HomePage';
import SettingsPage from './features/settings/SettingsPage';
import SubPage from './features/subscription/SubPage';
import UserDetails from './features/subscription/UserDetails';
import "leaflet/dist/leaflet.css";
import ReqPage from './features/requests/ReqPage';
import MailsPage from './features/mails/MailsPage';
import TypePage from './features/Types/TypePage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SuperAdminPage from './features/superAdmin/SuperAdminPage.jsx';
import CreateAdmin from './features/superAdmin/CreateAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>

              {/* Home */}
              <Route path='/' element={<HomePage />} />

              {/* Station */}
              <Route path='/station' element={<StationPage />} />
              <Route path='/station/create' element={<CreateStation />} />
              <Route path='/station/edit/:id' element={<EditStation />} />
              <Route path='/station/view/:id' element={<ViewStation />} />

              {/* Ticket */}
              <Route path='/ticket' element={<Ticket />} />
              <Route path='/ticket/create' element={<CreateTicket />} />
              <Route path='/ticket/edit/:id' element={<EditTicket />} />

              {/* Settings */}
              <Route path='/settings' element={<SettingsPage />} />

              {/* Subscription Types */}
              <Route path='/subTypes' element={<TypePage />} />

              {/* Subscription */}
              <Route path='/sub' element={<SubPage />} />
              <Route path='/sub/details/:id' element={<UserDetails />} />

              {/* Requests */}
              <Route path='/request' element={<ReqPage />} />

              {/* Mails */}
              <Route path='/mails' element={<MailsPage />} />

              {/* Super Admin */}
              <Route path='/adminPanel' element={<SuperAdminPage />} />
              <Route path='/adminPanel/addAdmin' element={<CreateAdmin />} />

              {/* 404 */}
              <Route path='*' element={<NotFound />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
