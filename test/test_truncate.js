var truncate = require('../modules/truncate');
var should = require('../node_modules/should');

var test = [

	{str: "vasya lubist mashu", len: 9, res: "vasya lubit"},
	// {str: "a b", len: 2, res: "a"},
	// {str: "aa bb  ", len: 6, res: "aa bb"},
	// {str: " 111 33", len:4, res: "111" },
	// {str: "123 56    9", len: 8, res: "123 56"},
	// {str: "", len: 12, res: ""},
	// {str: "___  *****  *&!@", len: 15, res: "___  *****"},
	// {str: "~~~~ +#(){}   11", len:16, res: "~~~~ +#(){}   11"},
	// {str: "       891", len: 7, res:""},
	// {str: "", len: 22, res: "" }

];	


describe('Testing:', function() {
	for (i in test) {
		describe("sentance:'" + test[i].str + "'\t\t\t\t ///symboles:" + test[i].len +
		"/// result: '" + test[i].res + "'", function() {

			var s = truncate(test[i].str, test[i].len);
			var v = test[i].res;

			it('ok', function(done){
				s.should.eql(v);
				done();
			})
		})
	}
});

