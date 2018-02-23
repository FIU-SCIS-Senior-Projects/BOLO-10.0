/**
 * setting custom validator
 */
var setCustomValidator = function(validator){
	return validator({
	  errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'),
		  root = namespace.shift(),
		  formParam = root;

		while (namespace.length) {
		  formParam += '[' + namespace.shift() + ']';
		}
		return {param: formParam, msg: msg, value: value};
	  },
	  customValidators: {
		isDomain: function(value) {
		  var reg = new RegExp("@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\" +
		  "[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0" +
		  "-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\[\\x01-\\x09\\x0b\\" +
		  "x0c\\x0e-\\x7f])+)\\])");

		  return reg.test(value);
		},
		isEmailNoDomain: function(value) {
		  //Any letter, number, underscore, +, -, ., and %, and must be between 1 and 128 chars. Without the '@example.com'
		  var reg = new RegExp("^([\\d\\w-.+%]{1,128})$");

		  return reg.test(value);
		},
		isCorrectPasswordFormat: function(value) {
		  var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!:=,;~+#%*?&<>|()./\"^\\[\\]\\-_])[A-Za-z\\d$@$!:=,;~+#%*?&<>|()./\"^\\[\\]\\-_]{10,128}");

		  return reg.test(value);
		},
		isZipcode: function(value) {
		  var reg = new RegExp("(^\\d{5}((-|\\s)\\d{4})?$)");
		  return reg.test(value);
		}
	  }
	});
};

module.exports = setCustomValidator;