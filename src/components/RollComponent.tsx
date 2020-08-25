// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React from 'react';

import { Roll } from "../model/Roll";


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type RollComponentProps = {
  data: Roll
}

const RollComponent: React.FC<RollComponentProps> = ({ data }) => {
  return (
    <div>
      
      <form>
        <select>
          <optgroup label="LANCER">
            <option>LANCER - Iterative World</option>
          </optgroup>

          <optgroup label="Mothership RPG">
            <option>Mothership - Trinkets & Patches</option>
            <option>Mothership - Space Station (Corespace)</option>
            <option>Mothership - Space Station (Rimspace)</option>
            <option>Mothership - Derelict Ship</option>
          </optgroup>
        </select>

        <input type="submit" value="Roll"/> 
      </form>

    </div>
  )
}

export default RollComponent