
const {aryNewsHeadingFetch , ary_title_arr} = require('./ary_news_data/ary_news_heading_link_fetch')
const {geoNewsHeadingFetch , geo_title_arr} = require('./geo_news_data/geo_news_heading_link_fetch')
const {dunyaNewsHeadingFetch , dunya_title_arr} = require('./dunya_news_data/dunya_news_heading_link_fetch')
const {bolNewsHeadingFetch , bol_title_arr} = require('./bol_news_data/bol_news_heading_link_fetch')
const {humNewsHeadingFetch , hum_title_arr} = require('./hum_news_data/hum_news_heading_link_fetch')
const fs = require('fs');
var all_titles=[]; 


function start_fetching_ary()
{
    aryNewsHeadingFetch(); 
}





function gather_articles_heading()
{
    // Assuming ary_title_arr, geo_title_arr, dunya_title_arr, bol_title_arr, hum_title_arr are arrays
   all_titles = ary_title_arr.concat(geo_title_arr, dunya_title_arr, bol_title_arr, hum_title_arr);

  const filePath = 'TITLE.txt';

  // Create a string with each title on a separate line
  const titlesString = all_titles.join('\n');

  // Write the string to a text file
  fs.writeFile(filePath, titlesString, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Titles have been written to', filePath);
    }
  });
}

start_fetching_ary();


module.exports = { gather_articles_heading };



// ary --> geo --> bol --> dunya --> hum 
