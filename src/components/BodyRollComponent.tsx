import React from 'react';

import { AllBodyRollFormats } from "../model/DataOut";

type BodyRollComponentProps = {
  format: AllBodyRollFormats;
};

const BodyRollComponent: React.FC<BodyRollComponentProps> = () => {
  return (
    <div>
      <button>delete</button>
      
      <p>
        placeholder
      </p>

      <button>reroll</button>
    </div>
  )
};

export default BodyRollComponent;