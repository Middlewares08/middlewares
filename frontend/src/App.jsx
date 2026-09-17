import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import LicensesPage from './pages/dashboard/LicensesPage';

function App() {

    return (
      <Routes>
        <Route path = "/" element = { <LandingPage /> }></Route>
        <Route path = "/login" element = { <LoginPage /> }></Route>
        <Route
          path = "/dashboard"
          element = { <RequireAuth><DashboardLayout /></RequireAuth> }
        >
          <Route index element={<OverviewPage />}></Route>
          <Route path="projects" element={<ProjectsPage />}></Route>
          <Route path="licenses" element={<LicensesPage />}></Route>
        </Route>
      </Routes>
    )
}

export default App
