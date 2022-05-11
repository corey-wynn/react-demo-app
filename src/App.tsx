import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesComponent from './routes/employees';
import CompaniesComponent from './routes/companies';
import NavigationComponent from './components/navigation/navigation';
import { AppRoutes } from './models/routes';
import './App.css';
import CompanySurveysComponent from './routes/company-surveys';
import SurveyResponsesComponent from './routes/survey-responses';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUsers, faBuilding, faSpinner, faPieChart, faCircleInfo, faMessage } from '@fortawesome/free-solid-svg-icons';
import { appIsLoading } from './services/loading.service';
import { useState } from 'react';
import LoadingComponent from './components/loading/loading';
import EmployeeComponent from './routes/employee-info';
import CompanyComponent from './routes/company-info';



function App() {
    library.add(faHouse, faUsers, faBuilding, faSpinner, faPieChart, faCircleInfo, faMessage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    appIsLoading.subscribe(loading => setIsLoading(loading));

    return (
        <BrowserRouter>
            <div className="app-container">
                {isLoading && <LoadingComponent />}
                
                <div className="nav-container">
                    <NavigationComponent />
                </div>

                <div className="main-container">
                    <Routes>
                        <Route path={AppRoutes.Employees} element={<EmployeesComponent />} />
                        <Route path={`${AppRoutes.Employee}/:employeeId`} element={<EmployeeComponent />} />
                        <Route path={AppRoutes.Companies} element={<CompaniesComponent />} />
                        <Route path={`${AppRoutes.Companies}/:companyId`} element={<CompanyComponent />} />
                        <Route path={`${AppRoutes.Companies}/:companyId/${AppRoutes.Surveys}`} element={<CompanySurveysComponent />} />
                        <Route path={`${AppRoutes.Responses}/:surveyId`} element={<SurveyResponsesComponent />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
  );
}

export default App;


