(function() {
var jQuery = window.jQuery || function(el) { return { 'ready': function(cb) { cb() } } };

jQuery(document).ready(function() {
  var console = window.console || {};
  console.fatal = console.log || function() {};
  console.error = console.log || function() {};
  console.warn  = console.log || function() {};
  console.info  = console.log || function() {};
  console.debug = console.log || function() {};
  console.log   = console.log || function() {};

  if(! jQuery.support.cors) { console.fatal('No jQuery CORS support'); return; }
  if(! jQuery.request     ) { console.fatal('No jQuery.request')     ; return; }

  // A localStorage-like API.
  function localStorage (developer, namespace, username, password) {
    if( !developer )
      throw new Error("Bad init parameters");

    var couch = /^http/.test(developer) ? developer : 'http://'+developer+'.iriscouch.com';
    var db    = couch + '/cors' + (namespace ? '%2f'+namespace : '');
    var S     = db + '/';

    function req(opts, cb) {
      if(username && password) {
        opts.auth = { 'username': username, 'password': password };
        opts.withCredentials = true;
      }

      return jQuery.request.json(opts, cb);
    }

    this.getItem = function(key, cb) {
      req({uri:S+key}, function(er, req, resp) {
        if(er)
          return cb && cb(er);
        console.log('Got item: %o', resp);
        cb && cb(null, resp);
      });
    }

    this.setItem = function(key, val, cb) {
    }
  }

  var apis = { 'localStorage': localStorage
             };

  if(jQuery.cors)
    throw new Error("jQuery.cors already set");
  jQuery.cors = apis;
});

})();
