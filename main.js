
const fs = require('fs');


// Half of these fuckers are for single module tesing. 

const {aryNewsHeadingFetch , ary_title_arr , ary_href_arr} = require('./ary_news_data/ary_news_heading_link_fetch')
const {geoNewsHeadingFetch , geo_title_arr, geo_href_arr} = require('./geo_news_data/geo_news_heading_link_fetch')
const {dunyaNewsHeadingFetch , dunya_title_arr, dunya_href_arr} = require('./dunya_news_data/dunya_news_heading_link_fetch')
const {bolNewsHeadingFetch , bol_title_arr, bol_href_arr} = require('./bol_news_data/bol_news_heading_link_fetch')
const {humNewsHeadingFetch , hum_title_arr, hum_href_arr} = require('./hum_news_data/hum_news_heading_link_fetch')
const {aryNewsArticleFetch , ary_article_arr} = require('./ary_news_data/ary_news_article_data_fetch')
const {geoNewsArticleFetch , geo_article_arr} = require('./geo_news_data/geo_news_article_data_fetch')
const {duynaNewsArticleFetch , dunya_article_arr} = require('./dunya_news_data/dunya_news_article_data_fetch')
const {bolNewsArticleFetch , bol_article_arr} = require('./bol_news_data/bol_news_article_data_fetch')
const {humNewsArticleFetch , hum_article_arr} = require('./hum_news_data/hum_news_article_data_fetch');




var all_titles=[]; 
var all_articles=[]; 


function start_fetching_ary()
{
    aryNewsHeadingFetch(); // Idk how to write this shit without async, i'm kinda retarded  ... The path goes like this  ary --> geo --> bol --> dunya --> hum
    
}






function gather_data()
{
  const combinedData = [
    ["Title", "Link", "Article", "NewsStation"],
    ...ary_title_arr.map((title, index) => [title, ary_href_arr[index], ary_article_arr[index], "ary"]),
    ...geo_title_arr.map((title, index) => [title, geo_href_arr[index], geo_article_arr[index], "geo"]), 
    ...bol_title_arr.map((title, index) => [title, bol_href_arr[index], bol_article_arr[index], "bol"]), 
    ...dunya_title_arr.map((title, index) => [title, dunya_href_arr[index], dunya_article_arr[index], "dunya"]),
    ...hum_title_arr.map((title, index) => [title, hum_href_arr[index], hum_article_arr[index], "hum"]) 
];

    const csvContent = combinedData.map(row => row.join(',')).join('\n');

// Write to a file
    fs.writeFile('data.csv', csvContent, (err) => {
    if (err) throw err;
    console.log('CSV file has been saved!');
 
  });

}



//WHY DID I IMPLEMENT THIS IDK 
// function gather_articles()
// {

//     // Assuming ary_title_arr, geo_title_arr, dunya_title_arr, bol_title_arr, hum_title_arr are arrays
//    all_articles = all_articles.concat(ary_article_arr , geo_article_arr , hum_article_arr , bol_article_arr , dunya_article_arr);

//   const filePath = 'ARTICLE.txt';

//   // Create a string with each title on a separate line
//   const StringG = all_articles.join('\n\n');

//   // Write the string to a text file
//   fs.writeFile(filePath, StringG, 'utf-8', (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//     } else {
//       console.log('Titles have been written to', filePath);
//     }
//   });





start_fetching_ary(); 


module.exports = {gather_data};

 


