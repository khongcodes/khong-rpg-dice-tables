//////////////////////////////////////////////////////////////////
09/25 4:09 PM

MAKE SURE views/Home.tsx mapDispatch deleteTableGroup DELETES ALL CHILDREN OBJECTS IN STORE!!!!!!!


//////////////////////////////////////////////////////////////////
finally finished getting store structure setup

next -
begin reimplementing Tablegroup components with select menu
  addTableGroup button should create one of these components
  deleteTableGroup button should erase that component

  The component should have internal state to keep track of its current selectvalue


remaining concern - triggering dispatches to multiple reducers

Clicking the roll button -
if select value is different reset table
setting table should trigger destruction/creation of subtables (which should trigger the destruction/creation of their body rolls)