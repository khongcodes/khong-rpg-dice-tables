//////////////////////////////////////////////////////////////////
03/04 12:20 PM
- added surge npm script
- removed surge script

//////////////////////////////////////////////////////////////////
12/23 05:19 PM

- Implemented a basic CSS Transition Group
- get it working for subtable components
- move state of bodyrollTransition to Subtable group so Reroll-all can also trigger it

//////////////////////////////////////////////////////////////////
12/22 05:16 PM

- [x] FIX CONTEXT BUG - all tablegroups have same context
- [ ] Make sure it looks good on mobile
- [ ] Take care of react warnings
- [ ] Add React Component Transition Animations
    - [ ] https://reactjs.org/docs/animation.html


//////////////////////////////////////////////////////////////////
10/27 03:08 PM

keep an eye on store/tableGroups/reducers.ts newId, bookKey and tableKey as undefined - may cause problems


//////////////////////////////////////////////////////////////////
10/01 04:26 PM

Maybe instead of the $${} thing I can just make it say "roll on Weapon Cache subtable"


//////////////////////////////////////////////////////////////////
09/30 11:26 AM

READ UP ON useEffect dependencies - the useEffect hook on SubtableGroupComponent needs to be optimized; it was built on loose understanding of how the hook works

<!-- Make it so selectedTable is stored in State/read from state - navigating off / to /about resets the selectedTable in the select element -->


//////////////////////////////////////////////////////////////////
09/29 03:34 PM

Ay caramba

See if the mess in SubtableGroupComponent can be refactored - consider pushing all the messy rollValue/format logic to reducer as much as possible.

Start writing documentation for RPG Data files

Implement displaySpec.initialRollCount: "reference"

Figure out how to implement tables using $${{}} to reference other tables - "ref-check" - upon receiving result from rollValues(); query to other table if needed?
(Seeing if this can be done using querySiblingSubtable in TableGroupComponent)

Implement one more table

Implement "detailPrefix" thing


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