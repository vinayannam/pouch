var PouchDB = require('pouchdb');

var localDB = new PouchDB('localDB');

var remoteDB = new PouchDB('http://localhost:5984/myremotedb');

var syncHandler = localDB.sync(remoteDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});

syncHandler.on('complete', function (info) {
  // replication was canceled!
});

syncHandler.cancel();