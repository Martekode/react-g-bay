import UnAuthenticatedProfile from "../components/UnAuthenticatedProfile";
import AuthenticatedProfile from "../components/AuthenticatedProfile";


function Profile() {

    return (
        <div>
            <>
                <UnAuthenticatedProfile/>
                <AuthenticatedProfile/>
            </>
        </div>
    )
}

export default Profile