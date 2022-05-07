import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './routes/employees';
import Companies from './routes/companies';
import NavigationBar from './components/navigation/navigation';
import { AppRoutes } from './models/routes';
import './App.css';
import CompanySurveys from './routes/company-surveys';

function App() {
    return (
    <BrowserRouter>
        <div className="app-container">
            <div className="nav-container">
                <NavigationBar />
            </div>

            <div className="main-container">
                <Routes>
                    <Route path={AppRoutes.Login} element={<App />} />
                    <Route path={AppRoutes.Employees} element={<Users />} />
                    <Route path={AppRoutes.Companies} element={<Companies />} />
                    <Route path={`${AppRoutes.Companies}/:companyId`} element={<CompanySurveys />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
