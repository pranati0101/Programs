//declaring modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var fs = require('fs');
var elasticsearch=require('elasticsearch');
var esClient=new elasticsearch.Client({
  host:'127.0.0.1:9200',
  log:'error'
});
var ind=0;
// var result={status:}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static('./sample'));

var indexName='contacts';
var typeName='info';

function indexExists() {
    // return esClient.indices.exists({index:indexName});
    return new Promise(function(resolve,reject){
      esClient.indices.exists({
        index:indexName
      },function(err,exists){
        if(err) console.log(err);
        if(exists)   resolve(true);
        else reject(false);
      });
    });
}
function createIndex(){
  return new Promise(function(resolve,reject){
    esClient.indices.create({
      index:indexName,
      type:typeName,
      id:1,
      body:{
        "settings": {
          "analysis": {
            "analyzer": {
              "indexing_analyzer": {
                "tokenizer": "whitespace",
                "filter": ["lowercase", "edge_ngram_filter"]
              },
              "search_analyze": {
                "tokenizer": "whitespace",
                "filter": "lowercase"
              }
            },
            "filter": {
              "edge_ngram_filter": {
                "type": "edge_ngram",
                "min_gram": 1,
                "max_gram": 10
              }
            }
          }
        }
      },
  "mappings": {
     "employee": {
       "properties": {
         "first_name": {
           "type": "string",
           "fields": {
             "autocomplete": {
               "type": "string",
               "index_analyzer": "autocomplete"
             }
           }
         },
         "lastname": {
           "type": "string",
           "fields": {
             "autocomplete": {
               "type": "string",
               "index_analyzer": "autocomplete"
             }
           }
         },
         "number": {
           "type": "integer",
           "fields": {
             "autocomplete": {
               "type": "string",
               "index": "not_analyzed"
             }
           }
         },
         "pin": {
           "type": "integer",
           "fields": {
             "autocomplete": {
               "type": "string",
               "index": "not_analyzed"
             }
           }
         }
       }
     }
   }
    },function(err,resp){
      if(err){
        console.log(err);
      }

        console.log(resp);
        resolve("success");

      reject(err);
    });
  });
}

function initIndex() {
return new Promise(function(resolve, reject) {
    console.log("creating index");
    createIndex().then(function(res){
      fs.readFile("filename.json",function(err,data){
        if(err) console.log(err);
        data=JSON.parse(data);
        data.forEach(function(item){
          console.log("adding doc");
          esClient.index({
              index: indexName,
              type: typeName,
              body:item
          });
        })
          resolve("success");
      })
}).catch(function(e){
  reject(e);
});
});
}

// function getSuggestions(input) {
//     return esClient.suggest({
//         index: indexName,
//         type: typeName,
//         body: {
//             docsuggest: {
//                 text: input,
//                 completion: {
//                     field: "firstname",
//                     fuzzy: true
//                 }
//             }
//         }
//     })
// }


app.get('/',function(req,res){
  // console.log("exists...",esClient.exists({index:indexName}));
  indexExists().then(function(){
    esClient.indices.delete({index:indexName}).then(function(){
      initIndex().then(console.log("index created")).catch(console.trace);
    }).catch(console.trace);
  }).catch(function(e){
    console.log(e);
    initIndex().then(console.log).catch(console.trace);
  })
  res.json({data:"success"});
});

app.get('/autocomplete', function (req, resp) {
  var regex=new RegExp();
  console.log("in autocomplete api");
    esClient.search({
        index: indexName,
        type: typeName,
        body: {
          query: {
            multi_match:{
                query:req.query.term,
                fields:['firstname','lastname', 'number', 'pin'],
                minimum_should_match: 1,
                fuzziness:2
            }
          }
        }
    }).then(function (res) {
      console.log(JSON.stringify([req.query.term, res.hits],0,4));
        var results = res.hits.hits.map(function(hit){
          console.log("hit source : "+hit._source);
            return hit._source.firstname + " " + hit._source.lastname;
        });
        resp.send(results);
          console.log(results);
    }).catch(function (err) {
        console.log(err);
        resp.send({response:"err"});
    });
});


app.get('/search',function(req,res){
    var body = {
    size: 20,
    from: 0,
    query: {
      multi_match:{
          query:req.query.text,
          fields:['firstname','lastname', 'number', 'pin'],
          minimum_should_match: 1,
          fuzziness:2
      }
    },
    suggest: {
    text: req.query.text,
    simple_phrase: {
        phrase: {
            field: "firstname",
            size: 1,
            real_word_error_likelihood: 1,
            max_errors: 0.5,
            gram_size: 1,
            direct_generator: [{
                field: "firstname",
                suggest_mode: "always",
                min_word_length: 1
            }],
            "highlight": {
                "pre_tag": "<b><em>",
                "post_tag": "</em></b>"
            }
        }
    }
  }
};
  esClient.search({index:'contacts',body:body},function(err,results){
    if(err) console.log(err);
    console.log("RESULT OF SEARCH---",results);
    if(results==null || results.hits.total==0 || results==undefined){
      // res.send(404);
      console.log(results.suggest.simple_phrase);
      console.log(results.suggest.simple_phrase.options);
    }
    else{
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log(`returned article titles:`);
      var index=0;
      console.log(results);
      var data=[];
      results.hits.hits.forEach(function(hit){
        // console.log(hit);
        console.log(++index,hit._source);
        data.push(hit._source);
        //  console.log(`${body.from + ++index} - ${hit._source. first_name}`);
      });
      res.setHeader('Content-Type','application/JSON');
      console.log("data: ",data);
      res.send(data);
    }
  });
})

//api for saving file
app.post('/saving', function(req, res) {
  console.log("saving");
  res.setHeader('Content-Type', 'application/json');
  console.log([req.body]);
  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
      data = [];
      // throw err;
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    data.push(req.body);

    fs.writeFile(__dirname + "/filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) {
        throw err;
      }
      try {
        res.send({
          data: data,
          status: true,
          "message": "get success"
        });
      } catch (e) {
        console.log(e);
      }
    });

  });

});

//for displaying present CONTACTS
app.get('/opening', function(req, res) {

  console.log('in opened api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    console.log(JSON.stringify(data));

    res.json(data);

  })
});

//for editing present CONTACTS
app.post('/edit', function(req, res) {

  console.log('in edit api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    if (data == null) {
      alert("no contacts!");
    }
    data=JSON.parse(data);
    for (ind in data) {
      if(data[ind]!=null && data[ind]!=undefined){
        console.log(data[ind].firstname);
        if (data[ind].firstname == req.body.firstname) {
          data[ind] = req.body;
          console.log("successfully edited");
          break;
        }
      }
    }
    //saving data to file
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) throw err;
      console.log("successfully updated");
    })
  })
  // res.json({data:"success"});
  res.redirect('/index');
});


//for deleting present CONTACTS
app.post('/delete', function(req, res) {

  console.log('in delete api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) console.log(err);
    if (data == null) {
      alert("no contacts!");
    }
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    console.log("data "+data);
    for (index in data) {
      // if(data[ind][0]!=null && data[ind][0] !=undefined){
        if(data[index]){
          console.log(data[index].firstname);
        if (data[index].firstname == req.body.firstname) {
          data.splice(index, 1);
          console.log("successfully deleted");
        //   esClient.deleteByQuery({
        //     index:indexName,
        //     body: {
        //       query: {
        //         term: { firstname: req.body.firstname }
        //       }
        //     }
        //   , function (error, response) {
        //     if(err) console.log(err);
        //     console.log(response);
        //   }
        // });
          break;
        }
      }
    }
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) throw err;
      console.log("successfully updated");
      // res.json({data:true});
      res.redirect("/index");
  });
  });

});


//listening at port 8001
app.listen(3000, function() {
  console.log("server running on 3000");
})
