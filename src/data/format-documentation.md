How to add RPG data for an existing book

step 1: add JSON

step 2: in model/DiceRollTypes.ts, add the data structure for the table and corresponding dice roll types for each subtable. Make sure it is exported in CombinedInputDataType at the bottom of the file.

step 3: in model/TableKeyStructuresAndFormats.ts, 
  step 3a: add the table keys in tableNamesByBooks.
  step 3b: create corresponding entries in tableSelectValues and tableIdentObjs.
  step 3c: create a corresponding entry in Output Specs. if initialRollCount is not 1 or if another table needs to be referenced, note here.

step 4: make sure the data is imported and typed in data/loader.ts

step 5: copy and paste the tableIdentObj from TableKeyStructuresAndFormats.ts into the appropriate place in controlPanel/availableRolls.json (and convert it into JSON)



How to add RPG data for a not-yet-existing-in-data-structure book

step 1: add JSON in new folder in rpg-data/

step 2: in model/DiceRollTypes.ts, create a new type to contain tables from that book. Add the data structure for your table, and add it to the union type CombinedInputDataType. See existing ___InputType type objects for a template.

step 3: in model/TableKeyStructuresAndFormats.ts,
  step 3a: add your book name to bookNames at the top of the file. Make sure your table JSON is prefixed with this.
  step 3b: add your book and table to tableNamesByBooks - see existing structures for templates.
  step 3c: add your book and table to tableSelectValues and tableIdentObjs
  step 3d: add types for your book's TableNames and OutputSpecType - see existing types at line ~190 for exmaples. 
  step 3e: create a new const OutputSpecs object for your book, with your table input in it.
  step 3f: add your new book's OutputSpecType to CombinedOutputSpecType union type
  step 3g: add your new book and its OutputSpecs object as a field in allTablesDisplaySpecsByBook at the bottom of the file.

step 4: in rpc-data/loader.ts
  step 4a: make sure the book's InputTypes are imported at the top of the file
  step 4b: require your new table JSON
  step 4c: create a new Data object for your book, typed to its InputType
  step 4d: add it as a field in rpgData.

step 5: in controlPanel/availableRolls.json
  step 5a: add the book to "bookNames"
  step 5b: in its own subarray under Options, add the tableIdentObj from model/TableKeyStructuresAndFormats.ts