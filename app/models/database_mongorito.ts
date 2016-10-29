//'use strict';
//const co = require('co');
//http://mongorito.com/guides/getting-started/

/// <reference path="../../DefinitelyTyped/node/node.d.ts" />

declare var run;
console.log('Initialize mongorito');
run = require('../libs/run');
var plugin = require('../libs/plugin');

var database = require('mongorito');
var Model = database.Model;
var Post = Model.extend({
    collection: 'posts'
});
database.connect('mongodb://localhost:27017/rpg');
plugin.addDatabase({type:'mongodb',database:database});

/*
let post = new Post({
    title: 'Steve Angello rocks',
    author: {
        name: 'Emma2'
    }
});
post.save();
*/

//run(function*() {

	// define model
    //class Token extends Model {}
    // create and save new Post document
    //let post = new Post({
      //title: 'Node.js with --harmony rocks!',
      //body: 'Long post body',
      //author: {
        //name: 'John Doe'
      //}
    //});
    //yield post.save();

	//var posts = yield Post.all();
	//for(var i =0; i < posts.length;i++){
		//console.log(posts[i].get('title'));
	//}
	//console.log(posts[0].get('title'));

//});

/*
*/
