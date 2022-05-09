import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './routes/employees';
import Companies from './routes/companies';
import NavigationBar from './components/navigation/navigation';
import { AppRoutes } from './models/routes';
import './App.css';
import CompanySurveys from './routes/company-surveys';
import SurveyResponses from './routes/survey-responses';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUsers, faBuilding, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { appIsLoading } from './services/loading.service';
import { useState } from 'react';
import LoadingComponent from './components/loading/loading';



function App() {
    library.add(faHouse, faUsers, faBuilding, faSpinner);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    appIsLoading.subscribe(loading => setIsLoading(loading));

    return (
        <BrowserRouter>
            <div className="app-container">
                {isLoading && <LoadingComponent />}
                
                <div className="nav-container">
                    <NavigationBar />
                </div>

                <div className="main-container">
                    <Routes>
                        <Route path={AppRoutes.Login} element={<App />} />
                        <Route path={AppRoutes.Employees} element={<Users />} />
                        <Route path={AppRoutes.Companies} element={<Companies />} />
                        <Route path={`${AppRoutes.Companies}/:companyId`} element={<CompanySurveys />} />
                        <Route path={`${AppRoutes.Responses}/:surveyId`} element={<SurveyResponses />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
  );
}

export default App;


