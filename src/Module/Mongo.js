/**
 * Created by OnlyMid on 2018/5/18.
 */
import Mongodb from 'mongodb'
var MongoClient = Mongodb.MongoClient;
var Url = "mongodb://localhost:27017/";
console.log("Mongo外面");
function Mongo() {
  console.log("Mongo里面");
	MongoClient.connect(Url,function (err,db) {
		var DB = db.db("test");
		var MyInfo = {name:'孙权',age:24,money:100};
		DB.collection("runoob").insertOne(MyInfo, function(err, res) {
		  if(err){
		    console.log(err);
      }
			console.log("文档插入成功");
			db.close();
		});
	});
}

exports.Mongo = Mongo;
