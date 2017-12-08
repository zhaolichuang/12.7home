var express = require('express')
var multer = require('multer')
var mysql = require('mysql')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var user = express.Router()
var app = express()
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'wcgloveyou521',
	database:'name',
	port:'3306'
})
app.use(bodyParser.urlencoded({}))
app.use(multer({dest:'./img'}).any())
app.use('/user',user)    
user.post('/img',function(req,res){
	var img = req.files
	var name = req.files[0].filename
	var newName = name+path.parse(req.files[0].originalname).ext
	fs.rename('./img/'+name,'./img/'+newName,function(err){
		if(err){
			console.log(err)
			return
		}
		res.send('http://localhost:8000/img/'+newName)
	})
	console.log(newName)
	
})
user.post('/lee',function(req,res){
	var imgurls = req.body.imgurls
    var name = req.body.name
    var sex = req.body.sex
    var ip = req.body.ip
    var tel = req.body.tel
    var email = req.body.email
    var qq = req.body.qq
    var userid = req.body.userid
    pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = 'insert into name(name,imgurl,sex,ip,tel,email,qq,userid) values(?,?,?,?,?,?,?,?)'
    	var arr = [name,imgurls,sex,ip,tel,email,qq,userid]
    	connection.query(sql,arr,function(err,data){
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		
    		res.send('ok')
    		connection.end()
    	})
    })
})
app.use(express.static('./'))
app.listen(8000,function(){
	console.log('ok')
})