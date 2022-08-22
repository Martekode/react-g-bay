import {useAuth0} from '@auth0/auth0-react';

function ProfileTest(){
    const {isAuthenticated,user} = useAuth0();
    
    return (
        isAuthenticated && (
            <article>
                {user?.picture && <img src={user.picture} alt={user.given_name + ' ' + user.family_name}/>}
                {user?.name && <h1>{user.given_name + ' ' + user.family_name}</h1>}
                
                {user?.email && (
                    <>
                        <h2>Email:</h2>
                        <p>{user.email}</p>
                    </>
                )}
                {user?.nickname && (
                    <>
                        <h2>nickname:</h2>
                        <p>{user.nickname}</p>
                    </>
                )}
                {JSON.stringify(user)}
            </article>
        )
    )
}
export default ProfileTest;