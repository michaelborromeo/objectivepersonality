# To run locally
`npm start`

# To edit the Objective Personality choice data and re-explode it
- Open src/data/input/OpChoices.json (to make changes to the choices, states, cross references)
- Open src/data/input/OpTypes.json (to make changes to the types -- though these shouldn't change)
- Make edits
- Navigate to src/types and run `node explodeTypes.js` which will explode the types and choices out to src/data/output/OpCombinedAndExploded.json.

# Online demo
http://ophelper.herokuapp.com
