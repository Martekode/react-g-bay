import React from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import {useAuth0} from '@auth0/auth0-react';
import {AiOutlineLoading3Quarters} from 'react-icons/Ai'
import ProfileTest from './components/ProfileTest';

function App() {
  const {isLoading , error } = useAuth0();

return (
  <main>
    <h1>auth0 Login</h1>
    {error && <p>Authentication Error</p>}
    {!error && isLoading && <AiOutlineLoading3Quarters/>}
    {!error && !isLoading && (
      <>
        <LoginButton/>
        <LogoutButton/>
        <ProfileTest />
      </>
    )}
  </main>
)

}

export default App;
