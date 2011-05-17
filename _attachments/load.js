(function() {

var ns
  , scripts = document.getElementsByTagName('script')
  , me = scripts[scripts.length - 1]
  , dirname = me.src.replace(/\/[^/]*$/, '')
  , head = document.getElementsByTagName('head')[0]
  ;

function get(name) {
  ns = document.createElement('script');
  ns.type = 'text/javascript';
  ns.src = dirname + name;
  head.appendChild(ns);
}

if(!window.jQuery)
  get('/jquery.js');

// Any better way?
var mods = [ '/req.jquery.js', '/cors.js' ];

var ms = 30000;
function check() {
  ms -= 100;
  if(ms <= 0) throw new Error("Timeout getting cors");

  if(! window.jQuery)
    return setTimeout(check, 100);
  else if(mods.length == 2)
    get(mods.shift());

  if(! window.jQuery.request)
    return setTimeout(check, 100);
  else if(mods.length == 1)
    get(mods.shift());

  if(! window.jQuery.cors)
    return setTimeout(check, 100);
}

check();

})();
