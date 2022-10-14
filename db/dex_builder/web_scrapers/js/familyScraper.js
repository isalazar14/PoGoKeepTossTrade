const cheerio = require('cheerio');
const axios = require('axios').default;


getFamilies();

function elementTagIs(element, tagName){
  return element.tagName == tagName;
}

function isH3orTable(i, element) {
  const isH3 = elementTagIs(element, 'h3');
  const isTable = elementTagIs(element, 'table');
  return isH3 || isTable;
}

async function getFamilies() {
  let response;
  try {
    response = await axios.get('https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_evolution_family_in_Pok%C3%A9mon_GO');
  } catch (err) {
    console.error(err)
    // throw new Error("Could not fetch raw html from bulbapedia");
  }
  const $ = cheerio.load(response.data)
  const table1 = $('//*[@id="mw-content-text"]/table[1]')
  // const mainContent = $('#mw-content-text') //.filter(isH3orTable)
  // const filteredContent = mainContent.children().filter(isH3orTable).each()
  // console.log(mainContent);
  // console.log(filteredContent);

}