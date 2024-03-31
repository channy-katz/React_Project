import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { FaUserPlus, FaSignInAlt, FaDoorOpen, FaKey } from 'react-icons/fa';
import { userOut } from "./features/user/userSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./navBar.css";
import CustomUserIcon from './CustomUserIcon';
import SignUpIcon from './SignUpIcon';

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LogoImage = styled.img`
  width: 100px;
  margin: 0 auto; /* שתהיה באמצע */
`;

const IconWrapper = styled.span`
 
 margin-left: 10px; /* שינוי לצד ימין */
  color: white;
  display: flex;
  align-items: center;

`;

const NavButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  right: 200px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;



const NavBar = () => {
  let countProduct = useSelector(state => state.order.countProduct)
  let user = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  const curentuser = useSelector(state => state.user.currentUser)

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      padding: '0 4px',
    },
  }));
  const SignUpIcon = () => {
    return (
      <FaKey />
    );
  };
  const CustomSignInIcon = () => {
    return (
      <FaDoorOpen />
    );
  };
  const handleUserLogout = () => {
    dispatch(userOut());
  };

    return (
      <>
          <StyledNavBar>
          {curentuser === null ? (
              <>
            <p className="curentuser" style={{color:"white"}}>
              אורח</p></>
        ) : (
          <> 
          <p className="curentuser" style={{color:"white"}}>hi
            {"    "+curentuser.userName}
          </p></>
        )}

             <div style={{ display: 'flex', justifyContent: 'space-between' }}className="container">
    <div className="navButtons">
        <Link to="/list/ballerina" ><NavButton>ballerina</NavButton></Link>
        <Link to="/list/loafers"><NavButton>loafers</NavButton></Link>
    </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }} className="logo">
    <LogoImage src="https://media.adler.co.il/website/home/pretty-ballerinas-neg.png" alt="Logo" />
</div>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
  <Link to="/login" style={{ marginRight: '10px' }}>
    <NavButton>
      <CustomUserIcon style={{ fontSize: '24px' }} />
    </NavButton>
  </Link>

 
        <Link to="/basket" style={{ marginRight: '10px' }}>
            <StyledBadge sx={{ color: 'white' }} badgeContent={countProduct}>
                <IconWrapper style={{ fontSize: '24px' }}><LocalMallIcon /></IconWrapper>
            </StyledBadge>
        </Link>

        <Link to="/" style={{ marginRight: '10px' }}>
            <NavButton><HomeIcon /></NavButton>
        </Link>

        {(user && user.role === "ADMIN") && (
            <Link to="/addProduct" style={{ marginRight: '10px' }}>
                <NavButton style={{ fontSize: '16px' }}>Add Products</NavButton>
            </Link>
        )}
{(user && (user.role === "ADMIN" || user.role === "USER")) && (
        <Link to="/" style={{ marginRight: '10px' }}>
            <NavButton onClick={handleUserLogout} style={{ fontSize: '24px' }}><ExitToAppIcon /></NavButton>
        </Link>
         )}
    </div>



          </StyledNavBar>
      </>
      
  );


}
export default NavBar;