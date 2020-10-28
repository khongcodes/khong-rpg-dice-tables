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

const ObviousLink: React.FC<{url: string}> = ({url}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {url}
  </a>
)

const About: React.FC = () => {
  return (
    <div id={aboutStyles.aboutRoot}>
      <p>
        Inspired by donjon's&nbsp;
        <a 
          href="https://donjon.bin.sh/"
          target="_blank" rel="noopener noreferrer"
        >
          5e resources
        </a>
        , I wanted to build a dice table roller for my favorite indie TTRPGs out there.
      </p>

      <p>
        I don't own any of the content created by dice rolls on this page. Beside the select bar on each individual dice table, there is a link to purchase (or learn more about) the respective book the dice table comes from. Please support the original authors!
      </p>

      <p>
        For clarity's sake, here is a list of where you can buy each of these books again.
      </p>

      <div className={aboutStyles.linkBox}>
        <h3>Lancer</h3>
        <ul>
          <li>Core book - <ObviousLink url="https://massif-press.itch.io/corebook-pdf" /></li>
          <li>The Long Rim expansion - <ObviousLink url="https://massif-press.itch.io/the-long-rim" /></li>
        </ul>

        <h3>Mothership</h3>
        <ul>
          <li>Core book - <ObviousLink url="https://www.mothershiprpg.com/" /></li>
          <li>Pound of Flesh module - <ObviousLink url="https://www.mothershiprpg.com/a-pound-of-flesh" /></li>
          <li>Dead Planet module - <ObviousLink url="https://www.mothershiprpg.com/dead-planet" /></li>
        </ul>

        <h3>Ultraviolet Grasslands</h3>
        <ul>
          <li>Core book - <ObviousLink url="https://www.exaltedfuneral.com/products/the-ultra-violet-grasslands-and-the-black-city" /></li>
        </ul>
      </div>

      <p>
        This site was built by&nbsp;
        <a 
          href="http://khongcodes.com"
          target="_blank" rel="noopener noreferrer"
        >
          Kevin Hong
        </a>.
      </p>
    </div>
  )
}

export default About;