///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. Styles

import React from 'react';
import { useLocation, Link } from "react-router-dom";

import layoutStyles from "../assets/styles/Layout.module.sass";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode;
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const Header: React.FC = () => {
  let location = useLocation();

  return (
    <div id={layoutStyles.headerContainer}>
      <div id={layoutStyles.titleContainer}>
        <a href="/">
          <h1>KHong RPG Dice Tables</h1>
        </a>
      </div>

      <div id={layoutStyles.linkContainer}>
        {
          location.pathname === "/" ? 
            <Link to={"/about"} >About</Link>
          : 
            <Link to={"/"} >Back</Link>
        }
      </div>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id={layoutStyles.layoutRoot}>
      <Header />

      { children }
    </div>
  )
}

export default Layout