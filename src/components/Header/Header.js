import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" class="navbar-brand">Safe Riders</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link to="/home" class="nav-link" href="#">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link to="/home" class="nav-link" href="#">Destination</Link>
            </li>
            <li class="nav-item">
              {
                  loggedInUser.name? <p class="nav-link">{loggedInUser.name}</p> : <Link to="/login" class="nav-link">Login</Link>
              }
              
            </li>
            
          </ul>
        </div>
      </nav>
    );
};

export default Header;