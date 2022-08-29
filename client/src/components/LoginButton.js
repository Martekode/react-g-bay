import {useAuth0} from '@auth0/auth0-react';

function LoginButton(){
    const {isAuthenticated,loginWithRedirect} = useAuth0();
    
    return (
        !isAuthenticated && (
            <button className='hover:bg-secondary border-2 rounded-full w-32 hover:text-primary' onClick={()=> loginWithRedirect()}>
                login
            </button>
        )
    )
}
export default LoginButton;