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
  const topLink = useLocation().pathname === "/" ? 
    {
      path: "/about",
      text: "About" 
    } : {
      path: "/",
      text: "Back"
  };

  return (
    <div id={layoutStyles.headerContainer}>
      <div id={layoutStyles.titleContainer}>
          <a href="/"><h1>KHong RPG Dice Tables</h1></a>
      </div>

      <div id={layoutStyles.linkContainer}>
        <Link to={topLink.path} >
          {topLink.text}
        </Link>
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