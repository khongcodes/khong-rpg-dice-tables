///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React
// 2. Styles

import React from 'react';

import aboutStyles from "../assets/styles/views/About.module.sass";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const About: React.FC = () => {
  return (
    <div id={aboutStyles.aboutRoot}>
      I'm the About page
    </div>
  )
}

export default About;