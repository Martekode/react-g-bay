import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from '@auth0/auth0-react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

const domain = 'dev-s70w4f16.us.auth0.com';
console.log(domain);
const clientId = 'lroEnLlumtAWlpSvUCzIJHfzCp2NE9Kp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
    >
        <BrowserRouter>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </BrowserRouter>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
