import UnAuthenticatedProfile from "../components/UnAuthenticatedProfile";
import AuthenticatedProfile from "../components/AuthenticatedProfile";


function Profile() {

    return (
        <div>
            <h1>Login page</h1>
            <>
                <UnAuthenticatedProfile/>
                <AuthenticatedProfile/>
            </>
        </div>
    )
}

export default Profile