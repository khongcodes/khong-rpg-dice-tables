///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React
// 2. Styles

import React from 'react';

import aboutStyles from "../assets/styles/views/About.module.sass";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type AuthorObjType = {
  name: string;
  url: string;
};

const mothershipPoundOfFleshAuthors = [
  {
    name: "Sean McCoy",
    url: "https://twitter.com/seanmccoy"
  },
  {
    name: "Donn Stroud",
    url: "https://twitter.com/donnstroud"
  },
  {
    name: "Luke Gearing",
    url: "https://twitter.com/LukeGearing"
  }
];

const mothershipDeadPlanetAuthors = [
  {
    name: "Donn Stroud",
    url: "https://twitter.com/donnstroud"
  },
  {
    name: "Fiona Maeve Geist",
    url: "https://twitter.com/coilingoracle"
  },
  {
    name: "Sean McCoy",
    url: "https://twitter.com/seanmccoy"
  }
];

const LinkNewTab: React.FC<{url: string; text: string}> = ({url, text}) => (
  <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
);

const ModuleAuthors: React.FC<{ listOfAuthors: AuthorObjType[] }> = ({listOfAuthors}) => {
  return (
    <span style={{"fontSize": "13px"}}>
      &nbsp;—&nbsp;
      {
        listOfAuthors.map((authorObj: AuthorObjType, index: number) => (
          <>
            <LinkNewTab url={authorObj.url} text={authorObj.name}/>
            {index !== listOfAuthors.length - 1 ? ", " : ""}
          </>
        ))
      }
    </span>
  )
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const About: React.FC = () => {
  return (
    <div id={aboutStyles.aboutRoot}>
      <p>
        Inspired by donjon's&nbsp;
        <LinkNewTab
          url="https://donjon.bin.sh/"
          text="5e resources"
        />
        , I wanted to build a dice table roller for my favorite indie TTRPGs out there.
      </p>

      <p>
        I don't own any of the content created by dice rolls on this page. Beside the select bar on each individual dice table, there is a link to purchase (or learn more about) the respective book the dice table comes from. Please support the original authors!
      </p>

      <p>
        Here is a list of links to places you can purchase these books and support these game designers and writers.
      </p>

      <div className={aboutStyles.linkBox}>
        <h3>Lancer</h3>
        
        <p>
          by&nbsp;
          
          <LinkNewTab 
            url="https://twitter.com/the_one_lopez"
            text="Miguel Lopez"
          />

          &nbsp;and&nbsp;
          
          <LinkNewTab 
            url="https://twitter.com/orbitaldropkick"
            text="Tom Parkinson-Morgan"
          />

          &nbsp;—&nbsp;

          <LinkNewTab 
            url="https://massif-press.itch.io/"
            text="Massif Press"
          />
        </p>

        <ul>
          <li>
            <LinkNewTab 
              url="https://massif-press.itch.io/corebook-pdf"
              text="Core book"
            />
          </li>
          <li>
            <LinkNewTab 
              url="https://massif-press.itch.io/the-long-rim"
              text="The Long Rim expansion"
            />
          </li>
        </ul>

        <h3>Mothership</h3>
        <p>
          by&nbsp;
          <LinkNewTab 
            url="https://twitter.com/seanmccoy"
            text="Sean McCoy"
          />
          &nbsp;—&nbsp;
          <LinkNewTab
            url="https://www.tuesdayknightgames.com/"
            text="Tuesday Knight Games"
          />
        </p>

        <ul>
          <li>
            <LinkNewTab 
              url="https://www.mothershiprpg.com"
              text="Core book"
            />
          </li>
          <li>
            <LinkNewTab 
              url="https://www.mothershiprpg.com/a-pound-of-flesh"
              text="Pound of Flesh module"
            />
            <ModuleAuthors listOfAuthors = {mothershipPoundOfFleshAuthors}/>
          </li>
          <li>
            <LinkNewTab 
              url="https://www.mothershiprpg.com/dead-planet"
              text="Dead Planet module"
            />
            <ModuleAuthors listOfAuthors = {mothershipDeadPlanetAuthors}/>
          </li>
        </ul>

        <h3>Ultraviolet Grasslands</h3>
        <p>
          by&nbsp;
          <LinkNewTab 
            url="https://twitter.com/lukarejec"
            text="Luka Rejec"
          />
          &nbsp;—&nbsp;
          <LinkNewTab 
            url="https://www.wizardthieffighter.com/"
            text="Wizard Thief Fighter"
          />
        </p>
        <ul>
          <li>
            <LinkNewTab 
              url="https://www.exaltedfuneral.com/products/the-ultra-violet-grasslands-and-the-black-city"
              text="Core book"
            />
          </li>
        </ul>
      </div>

      <p>
        Icons from Google's&nbsp;
        <LinkNewTab
          url="https://material.io/resources/icons/?style=baseline"
          text="Material Icons"
        />
        . Typeface is&nbsp;
        <LinkNewTab 
          url="https://rsms.me/inter/"
          text="Inter"
        />.
      </p>

      <p>
        This site was built by&nbsp;
        <LinkNewTab
          url="http://khongcodes.com"
          text="Kevin Hong"
        />.
      </p>
    </div>
  )
}

export default About;