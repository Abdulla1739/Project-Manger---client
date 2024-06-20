import React, { useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/AuthContext';

const Header = ({insideDashboard}) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <Navbar style={{ zIndex: '10'  }} className="position-fixed w-100 top-0  rounded bg-dark">
      <Container>
        <Navbar.Brand>
          <Link className='fw-bolder' to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <i className="fa-brands fa-r-project text-danger me-4"></i>Project Holder
          </Link>
        </Navbar.Brand>
        {
          insideDashboard&&
          <div className='ms-auto'>
            <button onClick={handleLogout} style={{textDecoration:"none"}} className='btn btn-link fw-bolder'>Logout<i className="fa-solid fa-right-from-bracket ms-2"></i></button>
          </div>
        }
      </Container>
    </Navbar>
  );
};

export default Header