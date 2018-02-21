
var expecting = require('chai').expect;
var assert = require('chai').assert;
var rewire = require("rewire");
var requestST = require('supertest');
var path = require('path');
var bodyParser = require('body-parser')
var validator = require('express-validator');
var customValidation = require('../../src/services/input-validation');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BOLO');
mongoose.Promise = require('bluebird');
var db = mongoose.connection;
db.on('error', function(err) {
	console.error('MongoDB error: %s', err);
});

var app = rewire('express')();
var config = {};

app.listen(3000);
app.use(customValidation(validator));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



describe('Test that the validator responds correctly to various zip codes', function(){

	
	
	//app get route allows to test any value of zips
	app.get('/:id', function(req, res){
		req.body = {zip:zips[parseInt(req.params.id)]};
		req.checkBody('zip', `${req.zip} is not a valid zipcode`).isZipcode();
		res.status(200).send({errors: req.validationErrors()});
	});
	var zips = [
/*0*/	'12345', 
/*1*/	'1234',
/*2*/	'123456',
/*3*/	'a1234',
/*4*/	'12345 6',
/*5*/	'A1234-1234',
/*6*/	'B1234 6789',
/*7*/	'12345 6789',
/*8*/	'123456789',
/*9*/	'12345-6789',
/*10*/	'12345-67890',
/*11*/	'12345 67890'
	];
	


	
	it(`test the zipcode validator with the valid zipcode ${zips[0]}`,function(done){
		requestST(app)
			.get('/0')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body);
				expecting(res.body.errors).to.be.false;
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[1]}`,function(done){
		requestST(app)
			.get('/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[2]}`,function(done){
		requestST(app)
			.get('/2')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[3]}`,function(done){
		requestST(app)
			.get('/3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[4]}`,function(done){
		requestST(app)
			.get('/4')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[5]}`,function(done){
		requestST(app)
			.get('/5')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[6]}`,function(done){
		requestST(app)
			.get('/6')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the valid zipcode ${zips[7]}`,function(done){
		requestST(app)
			.get('/7')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body);
				expecting(res.body.errors).to.be.false;
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[8]}`,function(done){
		requestST(app)
			.get('/8')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the valid zipcode ${zips[9]}`,function(done){
		requestST(app)
			.get('/9')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body);
				expecting(res.body.errors).to.be.false;
				done();
			})
			
	});

	it(`test the zipcode validator with the invalid zipcode ${zips[10]}`,function(done){
		requestST(app)
			.get('/10')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
	it(`test the zipcode validator with the invalid zipcode ${zips[11]}`,function(done){
		requestST(app)
			.get('/11')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res){
				//console.log(res.body.errors);
				expecting(res.body.errors).to.be.an('array');
				done();
			})
			
	});
	
});

describe('Test postCreateForm method to ensure proper validation for badge number', function(){
	var user = rewire("../../src/controllers/admin/user.js");
	app.post('/user', user.postCreateForm);
	
	
	
	beforeEach(function(){
		user.__set__("sendNewUserNotification", function(){return true;});
		user.__set__("Agency", {
			findAgencyByName : function(agency, callback){
				throw new Error("no errors were found");
			},
			findAllAgencies : function(callback){
				throw new Error("errors were found in input");
			}
		});
	});
	
	
	it(`tests postCreateForm accepts an int for the badge number`, function(done){
		var testUser = { 
			username: "test", 
			fname: "first", 
			lname: "last", 
			email: "email",
			agency: "agency",
			badge: 12345,
			sectunit: "unit",
			ranktitle: "rank",
			role: "admin"
		};
		requestST(app)
			.post('/user')
			.set('Accept', 'application/json')
			.type('form')
			.send(testUser)
			.expect(500)
			.end(function(err, res){
				//console.log(res.text);
				expecting(res.text).to.include("no errors were found");
				done();
			})
		
	});
	
	it(`tests postCreateForm does not accept a string for the badge number`, function(done){
		var testUser = { 
			username: "test", 
			fname: "first", 
			lname: "last", 
			email: "email",
			agency: "agency",
			badge: "A12345",
			sectunit: "unit",
			ranktitle: "rank",
			role: "admin"
		};
		requestST(app)
			.post('/user')
			.set('Accept', 'application/json')
			.type('form')
			.send(testUser)
			.expect(500)
			.end(function(err, res){
				//console.log(res.text);
				expecting(res.text).to.include("errors were found in input");
				done();
			})
		
	});
	
	it(`tests postCreateForm does not accept an empty string for the badge number`, function(done){
		var testUser = { 
			username: "test", 
			fname: "first", 
			lname: "last", 
			email: "email",
			agency: "agency",
			badge: "",
			sectunit: "unit",
			ranktitle: "rank",
			role: "admin"
		};
		requestST(app)
			.post('/user')
			.set('Accept', 'application/json')
			.type('form')
			.send(testUser)
			.expect(500)
			.end(function(err, res){
				//console.log(res.text);
				expecting(res.text).to.include("errors were found in input");
				done();
			})
		
	});
	
	
});

describe('Test the category schema to ensure case insensitivity to uniqueness', function(){
	
	this.timeout(5000);
	
	
	var Category = require('../../src/models/category');
	
	var newCat = new Category({name: "testName", fields: ["test1","test2"]});
	
	
	it(`ensures that category names must be unique case insensitively with all caps`, function(done){
		Category.findCategoryByName(newCat.name, function(err, category){
			if(category == null){
				Category.createCategory(newCat,function(err, category) {
					if(err) console.log(err);
					else console.log("category saved!");
				});
			}
			Category.createCategory(new Category({name: "TESTNAME", fields: ["test1","test2"]}), function(err, category){
				expecting(err).to.exist;
				done();
			});
		});
	});
	
	it(`ensures that category names must be unique case insensitively with mixed case`, function(done){
		Category.createCategory(new Category({name: "tesTNaME", fields: ["test1","test2"]}), function(err, category){
			expecting(err).to.exist;
			done();
		});
	});
	
	it(`ensures that category names must be unique case insensitively with all lowercase`, function(done){
		Category.createCategory(new Category({name: "testname", fields: ["test1","test2"]}), function(err, category){
			expecting(err).to.exist;
			done();
		});
	});
});

describe('Test postCreateForm method to ensure proper validation for creating an agency', function(){
	var agency = rewire("../../src/controllers/admin/agency.js");
	var multer  = require('multer')
	var passport = require('passport');
	var upload  = multer({dest: ''})
	var agencyUP = upload.fields( [{ name: 'logo'}] );
	app.post('/agency', agencyUP,  agency.postCreateForm);
	
	
	var testAgency = {
		name: "default",
		domain: "@test.gov",
		address: "123test",
		city: "test",
		state: "FL",
		zip: "12345",
		phone: "9549549541"
	};
	
	
	
	it(`tests postCreateForm accepts a valid zip code and a valid phone number when creating an agency`, function(done){
		
		requestST(app)
			.post('/agency')
			.set('Content-Type', 'multipart/form-data')
			.field('name',testAgency.name)
			.field('domain',testAgency.domain)
			.field('address',testAgency.address)
			.field('city',testAgency.city)
			.field('state',testAgency.state)
			.field('zip',testAgency.zip)
			.field('phone',testAgency.phone)
			.attach('logo', __dirname+'/../img.jpg' , {type : 'file',contentType: 'image/*'} )
			.end(function(err, res){
				
				 
				expecting(res.text).to.not.include("zip");
				expecting(res.text).to.not.include("phone");
				done();
			})
		
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid phone number when creating an agency`, function(done){
		testAgency.zip = '123';
		requestST(app)
			.post('/agency')
			.set('Content-Type', 'multipart/form-data')
			.field('name',testAgency.name)
			.field('domain',testAgency.domain)
			.field('address',testAgency.address)
			.field('city',testAgency.city)
			.field('state',testAgency.state)
			.field('zip',testAgency.zip)
			.field('phone',testAgency.phone)
			.attach('logo', __dirname+'/../img.jpg' , {type : 'file',contentType: 'image/*'} )
			.end(function(err, res){
				
				 
				expecting(res.text).to.include("zip");
				expecting(res.text).to.not.include("phone");
				done();
			})
		
	});
	
	it(`tests postCreateForm accepts an invalid zip code and an invalid phone number when creating an agency`, function(done){
		testAgency.phone = '123';
		requestST(app)
			.post('/agency')
			.set('Content-Type', 'multipart/form-data')
			.field('name',testAgency.name)
			.field('domain',testAgency.domain)
			.field('address',testAgency.address)
			.field('city',testAgency.city)
			.field('state',testAgency.state)
			.field('zip',testAgency.zip)
			.field('phone',testAgency.phone)
			.attach('logo', __dirname+'/../img.jpg' , {type : 'file',contentType: 'image/*'} )
			.end(function(err, res){
				
				 
				expecting(res.text).to.include("zip");
				expecting(res.text).to.include("phone");
				done();
			})
		
	});
	
	it(`tests postCreateForm accepts a valid zip code and an invalid phone number when creating an agency`, function(done){
		testAgency.zip = '12345';
		requestST(app)
			.post('/agency')
			.set('Content-Type', 'multipart/form-data')
			.field('name',testAgency.name)
			.field('domain',testAgency.domain)
			.field('address',testAgency.address)
			.field('city',testAgency.city)
			.field('state',testAgency.state)
			.field('zip',testAgency.zip)
			.field('phone',testAgency.phone)
			.attach('logo', __dirname+'/../img.jpg' , {type : 'file',contentType: 'image/*'} )
			.end(function(err, res){
				
				 
				expecting(res.text).to.not.include("zip");
				expecting(res.text).to.include("phone");
				done();
			})
		
	});
	
	
});


describe('Test the agency schema to ensure case insensitivity to uniqueness', function(){
	
	this.timeout(5000);
	
	
	var Agency = require('../../src/models/agency');
	
	var newAgen = new Agency({
		name: "testname",
		emailDomain: "@test.gov",
		address: "123test",
		city: "test",
		state: "FL",
		zipcode: "12345",
		phone: "9549549541"
		
	});
	
	
	it(`ensures that agency names must be unique case insensitively with all caps`, function(done){
		Agency.findAgencyByName(newAgen.name, function(err, agency){
			if(agency == null){
				newAgen.save(function(err, agency) {
					if(err) console.log(err);
					else console.log("agency saved!");
				});
			}
			newAgen.name = "TESTNAME";
			newAgen.save( function(err, agency){
				expecting(err).to.exist;
				done();
			});
		});
	});
	
	it(`ensures that agency names must be unique case insensitively with mixed case`, function(done){
			newAgen.name = "teSTName";
			newAgen.save( function(err, agency){
			expecting(err).to.exist;
			done();
		});
	});
	
	it(`ensures that agency names must be unique case insensitively with all lowercase`, function(done){
			newAgen.name = "testname";
			newAgen.save(function(err, agency){
			expecting(err).to.exist;
			done();
		});
	});
});