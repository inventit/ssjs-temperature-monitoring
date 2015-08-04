var nodeUnit = require('nodeunit');
var sinon = require('sinon');
var script = require('path').resolve('./src/upload-temperature.js');
var moat = require('moat');

module.exports = nodeUnit.testCase({

  setUp: function(callback) {
    require.cache[script] = null;
    callback();
  },

  tearDown: function(callback) {
    callback();
  },

  'Upload temerature, successful case, singleton' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;
    var database = context.database;

    var data1 = {"temperature": 42750, "timestamp": 1438676535986};
    var data2 = {"temperature": 42750, "timestamp": 1438676525977};
    var data3 = {"temperature": 42625, "timestamp": 1438676576014};

    var result1 = {"temperature": 42750, "timestamp": 1438676535986, "uid": "b91f10f4-6a1e-4ffa-9941-a1bf2a4c7cf2"};
    var result2 = {"temperature": 42750, "timestamp": 1438676525977, "uid": "c0c30cdd-c94a-4c60-9987-453e087f8535"};
    var result3 = {"temperature": 42625, "timestamp": 1438676576014, "uid": "cf5fc423-d14d-4bdf-a3ad-3001e34ef6ce"};

    context.setObjects([data1, data2, data3]);
    database.insert.withArgs(data1).returns(result1);
    database.insert.withArgs(data2).returns(result2);
    database.insert.withArgs(data3).returns(result3);

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(true, database.insert.withArgs(data1).called);
    assert.equal(true, database.insert.withArgs(data2).called);
    assert.equal(true, database.insert.withArgs(data3).called);
    assert.equal(true, session.notifyAsync.called);
    assert.done();
  },

  'Upload temerature, successful case, array, insert' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;
    var database = context.database;

    var data1 = {"temperature": 42750, "timestamp": 1438676535986, "uid": "b91f10f4-6a1e-4ffa-9941-a1bf2a4c7cf2"};
    var data2 = {"temperature": 42750, "timestamp": 1438676525977, "uid": "c0c30cdd-c94a-4c60-9987-453e087f8535"};
    var data3 = {"temperature": 42625, "timestamp": 1438676576014, "uid": "cf5fc423-d14d-4bdf-a3ad-3001e34ef6ce"};
    var datum = {"array": [data1, data2, data3]};                                              
    context.setObjects([datum]);
    database.insert.withArgs(data1).returns(data1);
    database.insert.withArgs(data2).returns(data2);
    database.insert.withArgs(data3).returns(data3);

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(true, database.insert.withArgs(data1).called);
    assert.equal(true, database.insert.withArgs(data2).called);
    assert.equal(true, database.insert.withArgs(data3).called);
    assert.equal(true, session.notifyAsync.called);
    assert.done();
  },

  'Upload temerature, successful case, array, update' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;
    var database = context.database;

    var data1 = {"temperature": 42750, "timestamp": 1438676535986, "uid": "b91f10f4-6a1e-4ffa-9941-a1bf2a4c7cf2", "rev": 0};
    var data2 = {"temperature": 42750, "timestamp": 1438676525977, "uid": "c0c30cdd-c94a-4c60-9987-453e087f8535", "rev": 0};
    var data3 = {"temperature": 42625, "timestamp": 1438676576014, "uid": "cf5fc423-d14d-4bdf-a3ad-3001e34ef6ce", "rev": 0};
    var datum = {"array": [data1, data2, data3]};
    context.setObjects([datum]);
    database.queryByUids.withArgs('SensingData', [data1.uid]).returns([data1]);
    database.queryByUids.withArgs('SensingData', [data2.uid]).returns([data2]);
    database.queryByUids.withArgs('SensingData', [data3.uid]).returns([data3]);
    database.update.withArgs(data1).returns(data1);
    database.update.withArgs(data2).returns(data2);
    database.update.withArgs(data3).returns(data3);

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(true, database.update.withArgs(data1).called);
    assert.equal(true, database.update.withArgs(data2).called);
    assert.equal(true, database.update.withArgs(data3).called);
    assert.equal(true, session.notifyAsync.called);
    assert.done();
  }

});
