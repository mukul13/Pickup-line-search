var express = require('express');
var router = express.Router();
const client = require('../elastic/client');
const LIMIT = 1000;

async function search(query) {
	return client.search({
	  index: process.env.ES_INDEX,
	  size: LIMIT,
	  body: {
	  	query: query
	  }
	});
}

function transform(data) {
	return data.map(d => {
		return {
			id: d._id,
			content: d._source.content
		}
	});
}

router.get('/:term', async function(req, res, next) {
	const searchTerm = decodeURI(req.params.term);
	const query={
	  		match : {
	  			content: searchTerm
	  		}
	  	};
	const hits = await search(query);
    const results = transform(hits.body.hits.hits);
    res.json(results);
});


router.get('/', async function(req, res, next) {
	const query=  {
		'function_score': {
	         'functions': [
	            {
	               'random_score': {
	               }
	            }
	         ]
	      }
	}
	const hits = await search(query);
    const results = transform(hits.body.hits.hits);
    res.json(results);
});

module.exports = router;
