import {useAuth0} from '@auth0/auth0-react';

export default function UnAuthenticatedProfile(){
    const {isAuthenticated} = useAuth0();

    return  (
        !isAuthenticated && (
            <p>Please log in!</p>
        )
    )
}