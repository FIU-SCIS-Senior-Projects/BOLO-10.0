var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var app = require('../../src/app');
var agent = request.agent(app);
var passport = require('passport');
var session = require('express-session');
// session.user = {username: "root", };

var passportStub = require('passport-stub');
passportStub.install(app);
passportStub.login({username: "root",tier: "ROOT" });

describe('Integration testing of validation for creating a user', function(){
	this.timeout(5000);
	var user = {
		username: "root",
		fname: "ada",
		lname: "wong",
		email: "test",
		agency: "default",
		badge: "1234",
		sectunit: "test",
		ranktitle: "test",
		role: "OFFICER"
	};
	
	it('Testing badge validator for a valid badgenumber', function(done) {
		request(app)
		  .post('/admin/user/create')
		  .set('Accept', 'application/json')
		  .send(user)
		  .end(function(err, res) {
			// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
			expect(res.text).to.not.include('Badge No must be a number');
			done();
		  });
		
	});
	
	it('Testing badge validator for an invalid badgenumber', function(done) {
		user.badge = "A123";
		request(app)
		  .post('/admin/user/create')
		  .set('Accept', 'application/json')
		  .send(user)
		  .end(function(err, res) {
			expect(res.text).to.include('Badge No must be a number');
			done();
		  });
	});
	
	it('Testing badge validator for an empty badgenumber', function(done) {
		user.badge = "";
		request(app)
		  .post('/admin/user/create')
		  .set('Accept', 'application/json')
		  .send(user)
		  .end(function(err, res) {
			expect(res.text).to.include('Badge No is required');
			done();
		  });
	});
});

describe('Integration testing of validation for creating an agency', function(){
	var testAgency = {
		name: "default",
		domain: "@test.gov",
		address: "123test",
		city: "test",
		state: "FL",
		zip: "12345",
		phone: "9549549541"
	};
	
	it(`tests postCreateForm accepts a valid short zip code and a valid phone number when creating an agency but not a duplicate agency name`, function(done){
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("Agency Name Must Be Unique");
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid short zip code and a valid phone number when creating an agency but not a duplicate agency name in all caps`, function(done){
		
		testAgency.name = "DEFAULT";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("Agency Name Must Be Unique");
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid short zip code and a valid phone number when creating an agency but not a duplicate agency name in mixed case`, function(done){
		
		testAgency.name = "DEfaUlT";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("Agency Name Must Be Unique");
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	 
	it(`tests postCreateForm accepts a valid full and spaced zip code and a valid phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345 6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid full dashed zip code and a valid phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345-6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid short zip code and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345";
		testAgency.phone = "(954)954-9541";
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid full and spaced zip code and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345 6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid full dashed zip code and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345-6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid short zip code and a valid with spaces phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345";
		testAgency.phone = "954 954 9541";
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid full and spaced zip code and a valid with spaces phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345 6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts a valid full dashed zip code and a valid with spaces phone number when creating an agency`, function(done){
		
		testAgency.zip = "12345-6789";
		
		request(app)
			.post('/admin/agency/create')
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
				expect(res.text).to.not.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid phone number when creating an agency`, function(done){
		
		testAgency.zip = "123456";
		testAgency.phone = "9549549541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.phone = "(954)954-9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid with spaces phone number when creating an agency`, function(done){
		
		testAgency.phone = "954 954 9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an valid zip code with no division and a valid phone number when creating an agency`, function(done){
		
		testAgency.zip = "123456789";
		testAgency.phone = "9549549541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an valid zip code with no division and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.phone = "(954)954-9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an valid zip code with no division and a valid phone number with spaces when creating an agency`, function(done){
		
		testAgency.phone = "954 954 9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid phone number when creating an agency`, function(done){
		
		testAgency.zip = "zip";
		testAgency.phone = "9549549541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.not.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid with symbols phone number when creating an agency`, function(done){
		
		testAgency.phone = "(954)954-9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
	
	it(`tests postCreateForm accepts an invalid zip code and a valid phone number with spaces when creating an agency`, function(done){
		
		testAgency.phone = "954 954 9541";
		
		request(app)
			.post('/admin/agency/create')
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
				// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
				expect(res.text).to.include("A Valid Zip Code is Required");
				expect(res.text).to.include("A valid US phone number is required with no symbols");
				done();
			})
	});
		 
});
  
describe('Integration testing of validation for creating an category', function(){
	var category = {
		name: "Auto Theft",
		fields: ["test1","test2"] 
	};
	this.timeout(5000);
	
	it('login', function(done) {
		agent
			.post('/login')
			.set('Accept', 'application/json')
			.send({username: "root", password: "1234"})
			.end(function(err, res){
				done();
			});
	});
	
	it('set grid', function(done) {
		agent
			.get('/checkTier')
			.set('Accept', 'application/json')
			.end(function(err, res){
				done();
			});
	});
	
	
	it('Testing duplicate category name', function(done) {
		agent
		  .post('/admin/category/create')
		  .set('Accept', 'application/json')
		  .send(category)
		  .end(function(err, res) {
			// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
			expect(res.text).to.include('Category Name Must Be Unique');
			done();
		  });
	});
	
	it('Testing duplicate category name in all caps', function(done) {
		category.name = "AUTO THEFT";
		
		agent
		  .post('/admin/category/create')
		  .set('Accept', 'application/json')
		  .send(category)
		  .end(function(err, res) {
			// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
			expect(res.text).to.include('Category Name Must Be Unique');
			done();
		  });
	});
	
	it('Testing duplicate category name in all lower case', function(done) {
		category.name = "auto theft";
		
		agent
		  .post('/admin/category/create')
		  .set('Accept', 'application/json')
		  .send(category)
		  .end(function(err, res) {
			// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
			expect(res.text).to.include('Category Name Must Be Unique');
			done();
		  });
	});
	
	it('Testing duplicate category name in mixed case', function(done) {
		category.name = "AutO thefT";
		
		agent
		  .post('/admin/category/create')
		  .set('Accept', 'application/json')
		  .send(category)
		  .end(function(err, res) {
			// console.log("flag1: \n\n"+ res.text.substring(0,10000) );
			expect(res.text).to.include('Category Name Must Be Unique');
			done();
		  });
	});
	
});
