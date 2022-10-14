const dex = require('./dex.json');
const fs = require('fs');

const tests = {
  evos: {
    description: "Entries with evos have either 'evolutionId', 'evolutionBranch', or both",
    ids: {n: 0, data: []},
    // noEvoIds: {n: 0, data: []},
    branch: {n: 0, data: []},
    // noEvoBranches: {n: 0, data: []},
    both: {n: 0, data: []},
  },
  nameParts: {
    description: "identifying entries by number of segments after 'pokemon'",
    1: {n: 0, data: []},
    2: {n: 0, data: []},
    3: {n: 0, data: []},
    4: {n: 0, data: []},
    5: {n: 0, data: []},
  }
};

/* checking which mons have evoId vs evoBranch */
let id, branch, name;
dex.monForms.forEach((p, i) => {
  if (p.data.pokemonSettings?.hasOwnProperty('evolutionIds')) {
    id = 1
  }
  if (p.data.pokemonSettings?.hasOwnProperty('evolutionBranch')) {
    branch = 1
  }
  if (id && branch) {
    tests.evos.both.n ++;
    tests.evos.both.data.push(p.templateId);
  }
  else if (id && !branch) {
    tests.evos.ids.n ++;
    tests.evos.ids.data.push(p.templateId);
  }
  else if (!id && branch) {
    tests.evos.branch.n ++;
    tests.evos.branch.data.push(p.templateId);
  }
  id = 0;
  branch = 0;

  let nameParts = p.templateId.split("_POKEMON_")[1].split('_');
  let count = nameParts.length;
  tests.nameParts[count].n ++;
  tests.nameParts[count].data.push(nameParts);
})

try {
  fs.writeFileSync('dexTests.json', JSON.stringify(tests, null, 2))
}
catch (err) {
  console.error(err)
}
