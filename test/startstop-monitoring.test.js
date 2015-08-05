var nodeUnit = require('nodeunit');
var sinon = require('sinon');
var script = require('path').resolve('./src/startstop-monitoring.js');
var moat = require('moat');

module.exports = nodeUnit.testCase({

  setUp: function(callback) {
    require.cache[script] = null;
    callback();
  },

  tearDown: function(callback) {
    callback();
  },

  'Publish startstop command, failure case' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;

    var SensingDataMapper = session.newModelMapperStub('SensingData');
    var SensingData = SensingDataMapper.newModelStub();
    context.addCommand(SensingData, 'startstop',
                       context.newSuccessfulCommandEvent(true, null));

    context.setDevice('402881634e916d77014e99fce9070317', // uid
                      'EMU:00:11:22:aa:bb:cc',            // deviceId
                      'EMU:00:11:22:aa:bb:cc',            // name
                      'A',                                // status
                      'DM1.2',                            // clientVersion
                      25469);                             // rev

    context.setDmjob('402881634eae4360014efb7f74b61636',
                     'EMU:00:11:22:aa:bb:cc',         // deviceId
                     'EMU:00:11:22:aa:bb:cc',         // name
                     'EXECUTING',                     // status
                     'urn:moat:34aebb0d-591c-4dca-a818-bf11a3df0895:temperature-monitoring:startstop-monitoring:1.0.0', // jobServiceId
                     '31729',                         //sessionId
                     {'command': 'stop',  'uid': '402881634eae4360014ef77fb0c9096c'}, // arguments
                     'Wed, 05 Aug 2015 01:55:11 GMT', // createdAt
                     'Wed, 05 Aug 2015 02:00:11 GMT', // arrivedAt
                     'Wed, 05 Aug 2015 01:55:12 GMT', //startedAt
                     'Thu, 21 Jan 2100 13:05:55 GMT', //expiredAt
                     'http',                          //notificationType
                     'http://localhost');             //notificationUri

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(true, session.setWaitingForResultNotification.withArgs(true).called);
    assert.equal(false, session.notifyAsync.called);
    assert.done();
  },

  'Publish startstop command, successful case' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;

    var SensingDataMapper = session.newModelMapperStub('SensingData');
    var SensingData = SensingDataMapper.newModelStub();
    context.addCommand(SensingData, 'startstop',
                       context.newErrorCommandEvent('fatal_error', '12345'));

    context.setDevice('402881634e916d77014e99fce9070317', // uid
                      'EMU:00:11:22:aa:bb:cc',            // deviceId
                      'EMU:00:11:22:aa:bb:cc',            // name
                      'A',                                // status
                      'DM1.2',                            // clientVersion
                      25469);                             // rev

    context.setDmjob('402881634eae4360014efb7f74b61636',
                     'EMU:00:11:22:aa:bb:cc',         // deviceId
                     'EMU:00:11:22:aa:bb:cc',         // name
                     'EXECUTING',                     // status
                     'urn:moat:34aebb0d-591c-4dca-a818-bf11a3df0895:temperature-monitoring:startstop-monitoring:1.0.0', // jobServiceId
                     '31729',                         //sessionId
                     {'command': 'stop',  'uid': '402881634eae4360014ef77fb0c9096c'}, // arguments
                     'Wed, 05 Aug 2015 01:55:11 GMT', // createdAt
                     'Wed, 05 Aug 2015 02:00:11 GMT', // arrivedAt
                     'Wed, 05 Aug 2015 01:55:12 GMT', // startedAt
                     'Thu, 21 Jan 2100 13:05:55 GMT', // expiredAt
                     'http',                          // notificationType
                     'http://localhost');             // notificationUri

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(false, session.setWaitingForResultNotification.withArgs(true).called);
    assert.equal(true, session.notifyAsync.called);
    assert.done();
  }

});
