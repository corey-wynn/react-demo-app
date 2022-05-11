import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appIsLoading } from "../services/loading.service";
import { createUseStyles } from "react-jss";
import AvatarComponent from "../components/avatar/avatar";
import ErrorComponent from "../components/error/errors";
import { Company } from "../models/company.model";
import { getCompany } from "../services/companies.service";
import { ProfileSectionComponent } from "../components/profile/profile-section";

export default function CompanyComponent() {
    let { companyId } = useParams();
    const classes = styles();
    const [isError, setIsError] = useState<boolean>(false);
    const [company, setCompany] = useState<Company>();
    const errorMessage: string = 'Error loading employeee';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                const company = companyId ? await getCompany(companyId) : null;
                if (!company) throw new Error();
                setCompany(company);
            } catch (e) {
                console.error(e);
                setIsError(true);
            } finally {
                appIsLoading.next(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {isError && <ErrorComponent message={errorMessage} />}

            {!isError && company &&
                <div className={classes.wrapper}>
                    <div className={classes.profileSection}>
                        <AvatarComponent
                            image={null}
                            size={100}
                            name={company.name}
                            altText={company.name}
                        />
                    </div>

                    <ProfileSectionComponent 
                        title={'Company'} 
                        info={company.name}
                    />

                    <ProfileSectionComponent 
                        title={'About'} 
                        info={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula ex, consequat in massa vitae, vulputate iaculis elit. Cras a blandit lectus. Nullam fermentum lacus aliquam commodo placerat. Nulla eget egestas arcu, et ullamcorper dui. Vivamus rutrum mollis neque. Sed eget neque euismod, cursus quam in, blandit arcu. Suspendisse venenatis augue sed enim volutpat gravida.'}
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