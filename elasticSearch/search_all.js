
var bodyparser=require('body-parser');
var express=require('express');
var app=express();
var fs=require('fs');
const elasticsearch=require('elasticsearch');
const esClient=new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log:'error'
});
app.use(bodyparser.json());
  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    var body = {
      size: 5,
      from: 0,
      query: {
        match_all: {}
      }
    };
    console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
    search('emp_details', body).then(function(results) {
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log(`returned article titles:`);
      var index=0;
      console.log(results);
      results.hits.hits.forEach(function(hit){
        // console.log(hit);
        console.log(++index,hit._source);
        //  console.log(`${body.from + ++index} - ${hit._source. first_name}`);
      });
    })
    .catch(console.error);
  };

  test();

  module.exports = {search};
