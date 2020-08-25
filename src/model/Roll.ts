import { v4 as uuidv4 } from "uuid";

export class Roll {
  id: string;
  type: string | undefined;
  

  constructor() {
    this.id = uuidv4();
    this.type = undefined;
  }

  selectType(selectedString: string) {
    this.type = selectedString;
  }

}