# Planned features

- [ ] roll all dice for generator or roll them one at a time
  - [ ] "advanced options" configure roll - check/uncheck any component before making roll
  - [ ] reroll each/any component
  - [ ] lock any component to reroll all of them except for locked ones


# Planned rpgs

- [x] Mothership RPG
- [ ] LANCER
  - [x] longRim spaceStation
  - [x] longRim spaceStationNPC
  - [x] longRim spaceStationpirateBand
  - [ ] longRim enterprise
- [ ] UVG
  - [x] Your traveler
  - [x] Mutations
  - [x] Other voyagers
  - [x] Tool or kit
  - [x] Strange items or soap-sized treasures
  - [x] D30 trade goods
  - [ ] Histories of the UVG
  - [ ] Discovery
  - [ ] Historic period/style of art
  - [ ] Geography & Climate
  - [ ] Languages
  - [ ] Dead languages
- [ ] Stars without number

# OTHER

for roll !1d10, return number between 0 and 9, use to array-index
for roll 1d10, return number between 1 and 10, use in range lookup


if {1d6} roll format in moduleDetail
check if obj has rollTable
if so, reference rollTable
otherwise get numeric value

if ${}
reference rollTable

if $${} in moduleDetail
reference other table
write specific case handler

if \d after $ get results for twice


types:[
  "one roll table",
  "one roll range-table",
  "two roll range-table",
  "combined string",
  "coordinate",
  "lookup"
]