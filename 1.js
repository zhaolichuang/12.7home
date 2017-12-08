var express = require('express')
var jade = require('jade')
var txt = require('./txt.js')
var app = express()
var user = express.Router()
var pass = express.Router()
var tel = express.Router()
var texts = express.Router()
app.use('/user',user)
app.use('/pass',pass)
app.use('/tel',tel)
app.use('/texts',texts)

user.use('',function(req,res){
	var usd = req.query.usd
	 var newArr = []
	 if(usd == undefined){
	 	newArr=txt.user.slice(0,3)
	 	usd = 0
	 }else{
	 	newArr=txt.user.slice(usd*3,usd*3+3)
	 }
	 var num = Math.ceil(txt.user.length/3)	
	var str = jade.renderFile('./1.jade',{pretty:true,titles:'新闻',txtArr:newArr,nums:num,txtUsd:usd,urld:'user'})
	res.send(str)
})
pass.use('',function(req,res){
	var usd = req.query.usd
	 var newArr = []
	 if(usd == undefined){
	 	newArr=txt.pass.slice(0,3)
	 	usd = 0
	 }else{
	 	newArr=txt.pass.slice(usd*3,usd*3+3)
	 }
	 var num = Math.ceil(txt.pass.length/3)	
	var str = jade.renderFile('./1.jade',{pretty:true,titles:'视频',txtArr:newArr,nums:num,txtUsd:usd,urld:'pass'})
	res.send(str)
})
tel.use('',function(req,res){
	var usd = req.query.usd
	 var newArr = []
	 if(usd == undefined){
	 	newArr=txt.tel.slice(0,3)
	 	usd = 0
	 }else{
	 	newArr=txt.tel.slice(usd*3,usd*3+3)
	 }
	 var num = Math.ceil(txt.tel.length/3)	
	var str = jade.renderFile('./1.jade',{pretty:true,titles:'学术',txtArr:newArr,nums:num,txtUsd:usd,urld:'tel'})
	res.send(str)
})

var textstr = "<p>111111111111111</p><p>222222222222222222222222222222</p><p>333333333333333333333333333333333</p>"
app.use('/txt',function(req,res){
	var uid = req.query.txt
	var str = jade.renderFile('./2.jade',{pretty:true,titlename:'111111',bookName:'22222',times:'233233',texts:textstr})
	res.send(str)
})
app.use(express.static('./img'))
app.listen(8000,function(){
	console.log('ok')
})
