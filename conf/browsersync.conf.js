const conf = require('./gulp.conf');
var proxy = require('http-proxy-middleware')

// var cldPortal = proxy('/cldPortal_new', {target: 'http://axsh-demo.wisedu.com/', changeOrigin: true});
// var axsh = proxy('/axsh_new', {target: 'http://axsh-demo.wisedu.com/', changeOrigin: true});
var api = proxy('/data-open-web',  {target: 'http://172.16.9.104:9090/', changeOrigin: true})
module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [api]
    },
    open: false
  };
};
