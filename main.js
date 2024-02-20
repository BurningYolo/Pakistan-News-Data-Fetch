
const fs = require('fs');
const {aryNewsHeadingFetch , ary_title_arr} = require('./ary_news_data/ary_news_heading_link_fetch')
const {geoNewsHeadingFetch , geo_title_arr} = require('./geo_news_data/geo_news_heading_link_fetch')
const {dunyaNewsHeadingFetch , dunya_title_arr} = require('./dunya_news_data/dunya_news_heading_link_fetch')
const {bolNewsHeadingFetch , bol_title_arr} = require('./bol_news_data/bol_news_heading_link_fetch')
const {humNewsHeadingFetch , hum_title_arr} = require('./hum_news_data/hum_news_heading_link_fetch')
const {aryNewsArticleFetch , ary_article_arr} = require('./ary_news_data/ary_news_article_data_fetch')
const {geoNewsArticleFetch , geo_article_arr} = require('./geo_news_data/geo_news_article_data_fetch')
const {duynaNewsArticleFetch , dunya_article_arr} = require('./dunya_news_data/dunya_news_article_data_fetch')
const {bolNewsArticleFetch , bol_article_arr} = require('./bol_news_data/bol_news_article_data_fetch')
const {humNewsArticleFetch , hum_article_arr} = require('./hum_news_data/hum_news_article_data_fetch')





var all_titles=[]; 
var all_articles=[]; 


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
  gather_articles(); 


}



function gather_articles()
{
    // Assuming ary_title_arr, geo_title_arr, dunya_title_arr, bol_title_arr, hum_title_arr are arrays
   all_articles = ary_article_arr.concat(ary_article_arr , geo_article_arr , hum_article_arr , bol_article_arr , dunya_article_arr);

  const filePath = 'ARTICLE.txt';

  // Create a string with each title on a separate line
  const StringG = all_articles.join('\n\n');

  // Write the string to a text file
  fs.writeFile(filePath, StringG, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Titles have been written to', filePath);
    }
  });


}

start_fetching_ary(); // ary --> geo --> bol --> dunya --> hum 


module.exports = { gather_articles_heading , gather_articles };

 


