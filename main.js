
const {aryNewsHeadingFetch} = require('./ary_news_data/ary_news_heading_link_fetch')
const {geoNewsHeadingFetch} = require('./geo_news_data/geo_news_heading_link_fetch')
const {dunyaNewsHeadingFetch} = require('./dunya_news_data/dunya_news_heading_link_fetch')
const {bolNewsHeadingFetch} = require('./bol_news_data/bol_news_heading_link_fetch')


function start_fetching_ary()
{
    bolNewsHeadingFetch(); 
}

start_fetching_ary();


