/* 
================================
		unit tests
================================
*/
var expecting = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var validator = require('express-validator');
var customValidation = require('../../src/services/input-validation');
var config = require('../../src/config');






//TODO: Test isZipcode validator for zipcode in app.js
//enter valid zipcodes 
//enter invalid zipcodes

describe('Test that the validator responds correctly to various zip codes', function(){

	
	var app = require('express')();
	app.use(customValidation(validator));
	//app get route allows to test any value of zips
	app.get('/:id', function(req, res){
		req.body = {zip:zips[parseInt(req.params.id)]};
		req.checkBody('zip', `${req.zip} is not a valid zipcode`).isZipcode();
		res.status(200).send({errors: req.validationErrors()});
	});
	var zips = [
		'12345',
		'1234',
		'123456',
		'a1234',
		'12345 6',
		'A1234-1234',
		'B1234 6789',
		'12345 6789',
		'123456789',
		'12345-6789',
		'12345-67890',
		'12345 67890'
	];
	


	
	it(`test the zipcode validator with the valid zipcode ${zips[0]}`,function(done){
		request(app)
			.get('/0')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				console.log(res.body);
				expecting(res.body.errors).to.be.false;
				done()
			})
			
	});
});

//TODO: Test postCreateForm in controllers/user.js
//mock models/user.js
//spy res.render, resredirect
/* Post a user object
{ 'username' : String, 
  'fname' : String, 
  'lname': String, 
  'email': String, 
  'agency': String,
  'badge': Int, (not empty) <---*
  'sectunit': String,
  'ranktitle': String,
  'role: String,
}  */

//TODO: Test createCategory in models/category.js 
/* Post a category Object
{
	'name': String, (not duplicate) <---*
	'fiels': String[]
}
*/

//TODO: test postCreateForm in controllers/agency.js
//mock models/agency.js
//spy res.render, resredirect
/* post an agency object
{
	'name': String,
	'emailDomain': String,
	'address': String,
	'city': String,
	'state': String,
	'zipcode': valid zipcode, <----*
	'phone': US mobile number, <----*
	'rank': string,
	'logo':{
		'data': String,
		'contentType': String
	}
}
*/

//TODO: test save in models/agency.js
//mock models/agency.js
//spy res.render, resredirect
/* try to save an agency object
{
	'name': String,
	'emailDomain': String,
	'address': String,
	'city': String,
	'state': String,
	'zipcode': valid zipcode, <----*
	'phone': US mobile number, <----*
	'rank': string
}
*/
