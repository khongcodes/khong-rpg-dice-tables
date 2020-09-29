//////////////////////////////////////////////////////////////////
09/28 10:18 PM

Add "url" field to rpg-data json files - users should be able to see and buy the rpgs they're interested in

Add "locked": boolean field to store bodyRoll structure - prevent reroll from affecting these

//////////////////////////////////////////////////////////////////
09/25 04:09 PM

<!-- MAKE SURE views/Home.tsx mapDispatch deleteTableGroup DELETES ALL CHILDREN OBJECTS IN STORE!!!!!!! -->

<!-- DISABLE buttons where functionality is not yet ready (e.g. reroll all tableGroupBodyRolls) -->


//////////////////////////////////////////////////////////////////
finally finished getting store structure setup

<!-- next -
begin reimplementing Tablegroup components with select menu
  addTableGroup button should create one of these components
  deleteTableGroup button should erase that component

  The component should have internal state to keep track of its current selectvalue


remaining concern - triggering dispatches to multiple reducers

Clicking the roll button -
if select value is different reset table
setting table should trigger destruction/creation of subtables (which should trigger the destruction/creation of their body rolls) -->