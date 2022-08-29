import {useAuth0} from '@auth0/auth0-react';

function LogoutButton(){
    const {isAuthenticated, logout} = useAuth0();
    return (
        isAuthenticated && (
            <button className='hover:bg-secondary border-2 rounded-full w-32 hover:text-primary' onClick={()=> logout()}>
                logout
            </button>
        )
    )
}
export default LogoutButton;