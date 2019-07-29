require('../config');
const client = require('./client');
var Promise = require('bluebird');

const PLData = require('../data/pickuplines')

const MIN_PL_LENGTH = 10;

var log = console.log.bind(console);

function dropIndex() {
  return client.indices.delete({
    index: process.env.ES_INDEX,
  });
}

function createIndex() {
  return client.indices.create({
    index: process.env.ES_INDEX
  });
}

 async function bulkAdd() {
 for(let i =0;i< PLData.length;i ++) {
 		console.log(`Saving index ${i}`);
 		
    if(PLData[i].content.length > MIN_PL_LENGTH) {
        await client.index({
          index: process.env.ES_INDEX,
          id: i,
          body: {
            content: PLData[i].content,
            status: 'verified'
        }
      })
    }

 }
}

function search() {
  return client.search({
    index: process.env.ES_INDEX,
    q: 'huhu'
  }).then(log);
}

function closeConnection() {
  client.close();
}

function getFromIndex() {
  return client.get({
    id: 1,
    index: process.env.ES_INDEX,
  }).then(log);

}

function waitForIndexing() {
  log('Wait for indexing ....');
  return new Promise(function(resolve) {
    setTimeout(resolve, 2000);
  });
}

Promise.resolve()
  .then(dropIndex)
  .then(createIndex)
  .then(bulkAdd)
  .then(waitForIndexing)