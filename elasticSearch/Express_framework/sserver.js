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

function indexExists() {
    esClient.indices.exists({index:indexName},function(err,res){
      if(err) console.log(err);
      console.log(res);
      return res;
    });
}

function initIndex() {
  esClient.indices.delete({
      index: indexName
  });
    return esClient.indices.create({
        index: indexName
    });
    console.log("creating new index");
}

function addDocument(document) {
    return esClient.index({
        index: indexName,
        type: "info",
        body:document
    });
}

app.get('/',function(req,res){
//   var flag=indexExists();
//   console.log("flag: "+flag);
//   if(flag==1){
//     console.log("deleting");
//       esClient.indices.delete({index: indexName});
// }
// indexExists(function(err,res){
//   if(err) console.log(err);
//   console.log(res);
  // esClient.indices.delete({index: indexName});
// })
esClient.indices.delete({index: indexName});
console.log("init");
  initIndex();
  fs.readFile('filename.json',function(err,data){
    if(err) console.log(err);
    data=JSON.parse(data);
    data.forEach(function(doc){
        addDocument(doc);
    });
  });
})

app.get('/search',function(req,res){
    var body = {
    size: 20,
    from: 0,
    query: {
      multi_match:{
          query:req.query.text,
          fields:['firstname','lastname', 'number', 'pin'],
          minimum_should_match: 1,
          fuzziness:3
      }
      // match_all:{}
    }
  };
  // fs.readFile('filename.json',function(err,data){
  //   if(err) console.log(err);
  //   data=JSON.parse(data);
  //   data.forEach(function(doc){
  //       addDocument(doc);
  //   })
  //   esClient.search({index:'contacts',body:body},function(err,results){
  //     if(err) console.log(err);
  //     console.log(`found ${results.hits.total} items in ${results.took}ms`);
  //     console.log(`returned article titles:`);
  //     var index=0;
  //     console.log(results);
  //     var data=[];
  //     results.hits.hits.forEach(function(hit){
  //       // console.log(hit);
  //       console.log(++index,hit._source);
  //       data.push(hit._source);
  //       //  console.log(`${body.from + ++index} - ${hit._source. first_name}`);
  //     });
  //     res.setHeader('Content-Type','application/JSON');
  //     res.send(data);
  //   });
  // })

  esClient.search({index:'contacts',body:body},function(err,results){
    if(err) console.log(err);
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
    res.send(data);
  });
  console.log(req.query);
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
esClient.indices.delete({index: indexName});
  initIndex();
  fs.readFile('filename.json',function(err,data){
    if(err) console.log(err);
    data=JSON.parse(data);
    data.forEach(function(doc){
        addDocument(doc);
    });
  });

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
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    for (ind in data) {
      if(data[ind][0]!=null && data[ind][0]!=undefined){
        console.log(data[ind][0].firstname);
        if (data[ind][0].firstname == req.body.firstname) {
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
          break;
        }
      }

    }
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) throw err;
      console.log("successfully updated");
      res.json({data:true});
    })
  });
});

//listening at port 8001
app.listen(3000, function() {
  console.log("server running on 3000");
})
