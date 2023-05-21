import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import App from './App';
import DetailsMovie from './Pages/DetailsMovie';
import GenrePage from './Pages/GenrePage';
import LoginButton from './Pages/Login';
import Pagination from './Components/Pagination';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ProtectedRoute } from './Pages/Protecte';
const Doutes = () => {
  const auth0Config = {
    domain: domain,
    clientId: clientId,
    redirectUri: window.location.origin 
  };

  return (
    <Auth0Provider {...auth0Config}>
      <Router>
        <Routes>
        <Route path="/login" element={<LoginButton />} />
        <Route path="/" element={<App />} />
        <Route path="/movies/:id" element={<DetailsMovie />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};




ReactDOM.createRoot(document.getElementById('root')).render(<Doutes />);
