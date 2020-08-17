// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////
import React from 'react';
import { useLocation, Link } from "react-router-dom";


// SETUP
///////////////////////////////////////////////////////////////////
type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Header: React.FC = () => {
  let location = useLocation();

  return (
    <div>
      <div>
        KHong RPG Dice Tables
      </div>

      <div>{
        location.pathname === "/" ? 
          <Link to={"/about"} >About</Link>
        : 
          <Link to={"/"} >Back</Link>
      }</div>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      { children }
    </div>
  )
}

export default Layout