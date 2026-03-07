import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Landing Page
import LandingPage from './pages/LandingPage.tsx';

// Main Dashboard
import Dashboard from './pages/Dashboard';

// State Association Pages
import StateAssociationDashboard from './pages/state-association/StateAssociationDashboard';
import StateAssociationDetails from './pages/state-association/StateAssociationDetails';
import StateAssociationOnboarding from './pages/state-association/StateAssociationOnboarding';

// Championship Pages
import ChampionshipsDashboard from './pages/championships/ChampionshipsDashboard';
import CreateChampionship from './pages/championships/CreateChampionship';
import ChampionshipDetails from './pages/championships/ChampionshipDetails';
import LiveChampionship from './pages/championships/LiveChampionship';

// District Associations Pages
import DistrictAssociationsDashboard from './pages/district-associations/DistrictAssociationsDashboard';
import DistrictAssociationDetails from './pages/district-associations/DistrictAssociationDetails';
import DistrictAssociationOnboarding from './pages/district-associations/DistrictAssociationOnboarding';

// Players Pages
import PlayersDashboard from './pages/players/PlayersDashboard';
import PlayerRegistration from './pages/players/PlayerRegistration';
import PlayerProfile from './pages/players/PlayerProfile';
import PlayerList from './pages/players/PlayerList';

// Referees Pages
import RefereesDashboard from './pages/referees/RefereesDashboard';
import RefereeRegistration from './pages/referees/RefereeRegistration';
import RefereeProfile from './pages/referees/RefereeProfile';
import RefereePanel from './pages/referees/RefereePanel';

// Office Bearers Pages
import OfficeBearersDashboard from './pages/office-bearers/OfficeBearersDashboard';
import OfficeBearerRegistration from './pages/office-bearers/OfficeBearerRegistration';
import OfficeBearerProfile from './pages/office-bearers/OfficeBearerProfile';

// Events Pages
import EventsDashboard from './pages/events/EventsDashboard';
import CreateEvent from './pages/events/CreateEvent';
import EventDetails from './pages/events/EventDetails';
import ClaimsDashboard from './pages/events/ClaimsDashboard';

// Live Pages
import LiveDashboard from './pages/live/LiveDashboard';
import LiveMatchUpdates from './pages/live/LiveMatchUpdates';
import LiveChampionshipManagement from './pages/live/LiveChampionshipManagement';

// Reports Pages
import ReportsDashboard from './pages/reports/ReportsDashboard';
import ChampionshipReports from './pages/reports/ChampionshipReports';
import ComprehensiveReports from './pages/reports/ComprehensiveReports';

// Layout
import Layout from './components/layout/Layout';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes with layout */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />

            {/* State Association */}
            <Route path="state-association" element={<StateAssociationDashboard />} />
            <Route path="state-association/details" element={<StateAssociationDetails />} />
            <Route path="state-association/onboarding" element={<StateAssociationOnboarding />} />

            {/* Championships */}
            <Route path="championships" element={<ChampionshipsDashboard />} />
            <Route path="championships/create" element={<CreateChampionship />} />
            <Route path="championships/:id" element={<ChampionshipDetails />} />
            <Route path="championships/:id/live" element={<LiveChampionship />} />

            {/* District Associations */}
            <Route path="district-associations" element={<DistrictAssociationsDashboard />} />
            <Route path="district-associations/:id" element={<DistrictAssociationDetails />} />
            <Route path="district-associations/onboarding" element={<DistrictAssociationOnboarding />} />

            {/* Players */}
            <Route path="players" element={<PlayersDashboard />} />
            <Route path="players/registration" element={<PlayerRegistration />} />
            <Route path="players/list" element={<PlayerList />} />
            <Route path="players/:id" element={<PlayerProfile />} />

            {/* Referees */}
            <Route path="referees" element={<RefereesDashboard />} />
            <Route path="referees/registration" element={<RefereeRegistration />} />
            <Route path="referees/panel" element={<RefereePanel />} />
            <Route path="referees/:id" element={<RefereeProfile />} />

            {/* Office Bearers */}
            <Route path="office-bearers" element={<OfficeBearersDashboard />} />
            <Route path="office-bearers/registration" element={<OfficeBearerRegistration />} />
            <Route path="office-bearers/:id" element={<OfficeBearerProfile />} />

            {/* Events */}
            <Route path="events" element={<EventsDashboard />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="events/claims" element={<ClaimsDashboard />} />

            {/* Live */}
            <Route path="live" element={<LiveDashboard />} />
            <Route path="live/match/:id" element={<LiveMatchUpdates />} />
            <Route path="live/championship/:id" element={<LiveChampionshipManagement />} />

            {/* Reports */}
            <Route path="reports" element={<ReportsDashboard />} />
            <Route path="reports/championships" element={<ChampionshipReports />} />
            <Route path="reports/comprehensive" element={<ComprehensiveReports />} />

            {/* Profile */}
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App
