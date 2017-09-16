
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const suggest = function search(index, body) {
    return esClient.suggest({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      text: 'Atralia',
      countrySuggester: {
        term: {
          field:'country'
        }
      }
    };

    console.log(`retrieving term suggestions for "${body.text}"...`);
    suggest('emp_details', body)
    .then(results => {
      console.log(`suggestions for each term are:`);
      // console.log(results.titleSuggester.options);
      results.countrySuggester.forEach(function(term,index){
        console.log("Term"+(++index)+":"+term.text);
        term.options.forEach(function(option,index){
          console.log("suggestion"+(++index)+":"+option.text);
        });
      });
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    suggest
  };
