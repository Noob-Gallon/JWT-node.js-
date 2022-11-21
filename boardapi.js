const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('./config/secretkey.js')
const authMiddleware = require('./authmiddleware')

router.post('/', authMiddleware, function(req, res, next) {
	console.log("REST API Post Method - Create");
	var boardLastItem = boardList.reduce((previous, current) => previous.no > current.no ? previous:current);
	var boardItem = new Object();
	boardItem.no = boardLastItem.no + 1;
	boardItem.subject = req.body.subject;
	boardItem.content = req.body.content;
	boardItem.writer = req.tokenInfo.memberId;
	boardItem.writedate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
	boardList.push(boardItem);
	res.json({success:true});
});

router.put('/:no', authMiddleware, function(req, res, next) {
	console.log("REST API Put Method - Update " + req.params.no);
	var boardItem = boardList.find(object => object.no == req.params.no);
	if (boardItem != null) {
		if (boardItem.writer == req.tokenInfo.memberId) {
			boardItem.subject = req.body.subject;
			boardItem.content = req.body.content;
			boardItem.writedate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
			res.json({success:true});
		} else {
			res.status(403);
			res.json({success:false, errormessage:'id are not identical'});
		}
	} else {
		res.status(404);
		res.json({success:false, errormessage:'not found'});
	}
});

router.delete('/:no', authMiddleware, function(req, res, next) {
	console.log("REST API Delete Method - Delete " + req.params.no);
	var boardItem = boardList.find(object => object.no == req.params.no);
	if (boardItem != null) {
		if (boardItem.writer == req.tokenInfo.memberId) {
			var index = boardList.indexOf(boardItem);
			if (index >= 0) {
				boardList.splice(index, 1);
				res.json({success:true});
			} else {
				res.status(404);
				res.json({success:false, errormessage:'not found'});
			}
		} else {
			res.status(403);
			res.json({success:false, errormessage:'id are not identical'});
		}
	} else {
		res.status(404);
		res.json({success:false, errormessage:'not found'});
	}
});

module.exports = router