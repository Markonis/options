var expect = require('expect.js');
var Options = require(process.cwd() + '/index.js');

describe('Options', function () {
  it('throws an error if not all options are passed in', function () {
    var params = {
      a: 1,
      b: false
    };
    expect(function () {
      return new Options(params, {
        a: null,
        b: null,
        c: null
      });
    }).to.throwException();
  });

  it('does not throw an error if all options are passed in', function () {
    var params = {
      a: 1,
      b: 2,
      c: 3
    };
    expect(function () {
      return new Options(params, {
        a: null,
        b: null,
        c: null
      });
    }).to.not.throwException();
  });

  it('performs custom validations', function () {
    var params = {
      a: 'Marko'
    };

    // Valid data

    function valid() {
      return true;
    }

    expect(function () {
      return new Options(params, {
        a: null
      }, {
        a: valid
      });
    }).to.not.throwException();
  });

  it('throws an error if it cannot perform custom validation', function () {
    expect(function () {
      return new Options({
        a: 1
      }, {
        a: null
      }, {
        a: undefined
      });
    }).to.throwException();
  });

  describe('get(key, defaultValue)', function () {
    var params = {
      a: 1,
      b: 2
    };
    var options = new Options(params, {
      a: null,
      b: null
    });

    it('returns the correct option if the key exists', function () {
      expect(options.get('a')).to.eql(1);
      expect(options.get('b')).to.eql(2);
    });

    it('returns the defaultValue if the key does not exist', function () {
      expect(options.get('c', 3)).to.eql(3);
    });

    it('throws an error if the key and defaultValue do not exist', function () {
      expect(options.get).withArgs('c').to.throwException();
    });
  });
});