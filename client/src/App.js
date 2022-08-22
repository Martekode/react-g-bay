import React from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
return (
  <main>
    <h1>auth0 Login</h1>
    <LoginButton/>
    <LogoutButton/>
  </main>
)

}

export default App;
