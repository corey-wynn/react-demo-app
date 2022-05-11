import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Employee } from "../models/employee.model";
import { getEmployee } from "../services/employees.service";
import { appIsLoading } from "../services/loading.service";
import { createUseStyles } from "react-jss";
import AvatarComponent, { AvatarProps } from "../components/avatar/avatar";
import ErrorComponent from "../components/error/errors";
import { Company } from "../models/company.model";
import { getCompany } from "../services/companies.service";
import { ProfileSectionComponent } from "../components/profile/profile-section";

interface Profile {
    avatar: AvatarProps;
    employee: Employee;
    company: Company;
}

export default function EmployeeComponent() {
    let { employeeId } = useParams();
    const classes = styles();
    const errorMessage: string = 'Error loading employeee';
    let employee: Employee;
    let company: Company;
    const [isError, setIsError] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                employee = employeeId ? await getEmployee(employeeId) : null;
                if (!employee) throw new Error();
                company = await getCompany(employee.company_id);
                setupProfile();
            } catch (e) {
                console.error(e);
                setIsError(true);
            } finally {
                appIsLoading.next(false);
            }
        }

        fetchData();
    }, []);

    const setupProfile = () => {
        const avatar: AvatarProps = {
            image: 'https://i.pravatar.cc/100',
            size: 100,
            altText: employee.name,
            name: employee.name,
        };

        setProfile({
            avatar,
            employee,
            company
        })
    }

    return (
        <>
            {isError && <ErrorComponent message={errorMessage} />}
            {!isError && profile && 
                <div className={classes.wrapper}>
                    <div className={`${classes.profileSection} ${classes.profileSection}`}>
                        <AvatarComponent
                            image={profile.avatar.image}
                            size={100}
                            name={profile.employee.name}
                            altText={profile.employee.name}
                        />
                    </div>

                    <ProfileSectionComponent 
                        title={'Profile'} 
                        info={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula ex, consequat in massa vitae, vulputate iaculis elit. Cras a blandit lectus. Nullam fermentum lacus aliquam commodo placerat. Nulla eget egestas arcu, et ullamcorper dui. Vivamus rutrum mollis neque. Sed eget neque euismod, cursus quam in, blandit arcu. Suspendisse venenatis augue sed enim volutpat gravida.'}
                    />

                    <ProfileSectionComponent 
                        title={'Company'} 
                        info={profile.company.name}
                    />

                    <ProfileSectionComponent 
                        title={'Department'} 
                        info={profile.employee.department.name}
                    />
                </div>
            }
        </>
    );
}

const styles = createUseStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
    },
    profileSection: {
        width: '100%',
        paddingBottom: '15px',
        marginBottom: '15px',
        borderBottom: '1px solid #e9e9e9'
    },
    avatar: {
        marginRight: '10px'
    },
    name: {
        fontSize: '24px'
    }
})