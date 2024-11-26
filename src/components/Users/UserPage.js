import Pets from "./Pets";
import UserInfoForm from "./UserInfoForm";


export const UserPage = () => {
    return <div style={{display: 'flex'}}>
        <div style={{width: '40%', flex: '0 0 auto'}}>
            <UserInfoForm />
        </div>
        <div style={{flex: '1 1 auto'}}>
            <Pets/>
        </div>
    </div>
}