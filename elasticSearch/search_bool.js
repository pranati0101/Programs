  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      size: 20,
      from: 0,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: '(first_name:P* OR last_name:P*)'
              }
            }
          ]
          ,filter:[
            {
              match: {
                    country: {
                      query: 'Senegal',
                      type: 'phrase'
                    }
                }
            }
          ]
          // ,should: [
          //   {
          //     match: {
          //       country: {
          //         query: 'Netherlands Senegal',
          //         type: 'phrase'
          //       }
          //     }
          //   }
          // ]
          // ,must_not: [
          //   {
          //     match: {
          //       "gender":"Male"
          //     }
          //   }
          // ]
        }
      }};
      console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
      search('emp_details', body).then(function(results) {
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        console.log(`returned article titles:`);
        var index=0;
        console.log(results.hits.hits);
        // results.hits.hits.forEach(function(hit){
        //   // console.log(hit);
        //   console.log(++index,hit._source);
        //   //  console.log(`${body.from + ++index} - ${hit._source. first_name}`);
        // });
      })
      .catch(console.error);
      };
  test();

  module.exports = {
    search
  };
