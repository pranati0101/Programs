
var bodyparser=require('body-parser');
var express=require('express');
var app=express();
var fs=require('fs');
const elasticsearch=require('elasticsearch');
const esClient=new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log:'debug'
});
app.use(bodyparser);

// index.js

const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });

    bulkBody.push(item);
  });

  esClient.bulk({body: bulkBody})
  .then(response => {
    console.log('here');
    let errorCount = 0;
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error);
      }
    });
    console.log(
      `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
    );
  })
  .catch(console.err);
};

const test=function test() {
  const articlesRaw = fs.readFileSync('data.json');
  var articles=JSON.parse(articlesRaw);
  bulkIndex('emp_details', 'personal_details', articles);
};
  test();

  module.exports = {
    bulkIndex
  };
