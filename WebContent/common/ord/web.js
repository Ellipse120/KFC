!function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var f=n[i]={exports:{}};t[i][0].call(f.exports,function(e){var n=t[i][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){"use strict";var r=e("../core/util"),o=location.protocol,a=o+"//report.meituan.com",i={report:{host:a,dir:"/",type:"POST"},config:{host:a,dir:"/config",type:"GET"}};t.exports=function(e,t){var n={protocol:i[e].protocol,uri:i[e].host+i[e].dir,type:i[e].type};return t&&(n.uri=n.uri+"?"+r.parseParams(t)),n}},{"../core/util":7}],2:[function(e,t,n){"use strict";function r(){return y.match(/^i\./gi)?"i":"www"}function o(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function a(){var e;return e=s.get("uuid"),e||(e={id:o()+o()+o()+o()+o()+o()+o()}),s.set("uuid",e),s.save(!0),e.id}function i(){var e,t=+new Date;return e=s.get("msid"),(!e||h<t-e.time)&&(e={id:o()+o()+o()+o()+o()+o()+o()}),e.time=t,s.set("msid",e),s.save(!0),e.id}function u(e){var t=location.hostname;if(d.is.ip(t))return!1;var n=[];d.each(e,function(e,t){v.test(e)&&e.length<=100&&n.push(t+"="+e)});for(var r,o=n.join("&"),a=t.split("."),i=a.length,u=i-1,c=!1;!c&&u>=0;)t=a.slice(u,i).join("."),d.setCookie("_lx_utm",o,263520,t),(r=d.getCookie("_lx_utm"))&&(c=r==o),u--;return!0}function c(){var e,t={},n=(d.getCookie("_lx_utm")||"").split("&");return d.each(n,function(n){var r=n.split("=");(e=r[0])&&(t[e]=r[1]||"")}),t}function f(){if(l||(l=d.getParams(location.href,!0)),d.is.string(l.uri))return null;var e,t,n={},r=["source","medium","term","content","campaign"];return d.each(r,function(r){e="utm_"+r,e in l.uri&&(t=l.uri[e],n[e]=t||"",f.hasUTM=!0)}),n}var s,l,p,d=e("../core/util"),g=e("../core/key"),h=18e5,v=/^([^<>\r\n\(\)])+$/,y=location.hostname,m=function(){var e=f();e&&f.hasUTM?u(e):e=c();var t={app:"",sdk_ver:"2.3.0",appnm:"",category:"sdk_report",ch:"web",lch:e.utm_source||"",utm:e,ct:r(),did:"",ua:"",msid:d.getCookie("IJSESSIONID")||d.getCookie("JSESSIONID")||i(),lat:"",lng:"",net:"",idfa:"",pushid:""};t[g.alive]=d.now();for(var n in t)t.hasOwnProperty(n)&&""===t[n]&&delete t[n];return t},w={};t.exports=function(e){if(w.env)return w;s=e.Data,p={uuid:d.getCookie("iuuid")||d.getCookie("uuid")||a(),appnm:"",autoStart:!0,alwaysSendReferrer:!1,report:{delay:8,first:!0},whiteList:{"meituan.com":1,"maoyan.com":1,"sankuai.com":1}},w.conf=function(e,t){return e&&t&&p.hasOwnProperty(e)&&(p[e]=t),e?p[e]:p};var t=m();return w.env=function(e,n){return e&&n&&(e in p?p[e]=n:t[e]=n.toString()),e?t[e]:t},w.reload=function(){w.env=m()},w}},{"../core/key":5,"../core/util":7}],3:[function(e,t,n){function r(){this.id=o+100,this.intraId=o}var o=1e3*(+new Date+Math.ceil(1e4*Math.random()));r.prototype={prefix:function(){return o},update:function(e){return e?++this.intraId:++this.id},setUp:function(e){var t=e?++this.intraId:++this.id;return t.toString(16)}},t.exports=new r},{}],4:[function(e,t,n){function r(){}var o=e("./util"),a=(e("./base"),{}),i="sdk_report",u={};u[i]=!0;var c=+new Date+Math.ceil(1e4*Math.random());r.prototype={constructor:r,map:a,getDefault:function(){return i},getAll:function(){return o.extend(!0,{},this.map)},getId:function(){return c},getNS:function(e){var t="";return(t=this.map[e])||(t="#"+e+"#"+c.toString(16),this.map[e]=t),t}},t.exports=new r},{"./base":3,"./util":7}],5:[function(e,t,n){t.exports={env:"env",tag:"tag",evs:"evs",quit:"quit",reportData:"report_data",uploading:"uploading",timeout:"_timeout",alive:"_alive"}},{}],6:[function(e,t,n){function r(e){try{v.del(C.env+e)}catch(t){}try{v.del(C.tag+e)}catch(t){}try{v.del(C.evs+e)}catch(t){}}function o(e){var t,n,o,a,i=0,u=v.get(C.uploading)||[],c=v.get(C.reportData)||{},f=C.evs;if(e)for(var s in c)c.hasOwnProperty(s)&&100>i&&(u=u.concat(c[s]),delete c[s],i++);var l,p,d,g=v.load(),h=120,y=S.now();if(g)for(var m in g)0===(d=m.indexOf(C.env))&&(n=m.replace(C.env,""),t=O(n,v,C),l=g[m],l&&(p=l[C.alive]),(!p||y-p>h)&&r(n),t&&(u.push(t),v.set(f+n,[]),g[f+n]=[]));return v.set(C.uploading,[]),u&&u.length&&(a=x.prefix()+T++,c[a]=u,o={token:a,ret:u}),u.length&&v.set(C.reportData,c),v.save(),o}function a(){return m.conf()}function i(e,t,n,r,o){switch(k=!1,e){case"success":return u(t,n,r,o);case"fail":default:return c(t,n,r,o)}}function u(e,t,n,r){var o=v.get(C.reportData),a=n.token;delete o[a],v.set(C.reportData,o),v.save(!0)}function c(e,t,n,r){D(function(){e(t,n,r)},3e3)}function f(){if(!k){var e=o(!0);e&&e.ret.length&&(k=!0,y.post(b("report").uri,e,i))}}function s(){o()}function l(e){f()}function p(){var e=0,t=a();return e=t&&t.report&&t.report.delay?t.report.delay:m({Data:v}).conf().report.delay}function d(e){var t=e;if(t){if(!S.is.numeric(t)||0>=t)return t=0,l(t);3>t||t>120?t=w:w=t}else t=w;d.isCheck||(g(t),d.isCheck=!0)}function g(e){var t=1e3*(e||w);j++,D(function(){if(k){var e=Math.random()*Math.pow(2,j),t=Math.min(e,w);t=parseFloat(t.toFixed(3)),10>j&&g(t)}else f(),D(g,0)},t)}function h(e){return this instanceof h?(v=e.Data,y=e.IO,m=e.Config,w=p(),void 0):new h(e)}var v,y,m,w,b=e("../conf/api"),S=e("../core/util"),x=e("../core/base"),O=e("../module/exportCache"),C=e("../core/key"),T=(e("./channelInfo"),0),k=!1,D=setTimeout,j=0;h.prototype={constructor:h,start:d,report:l,getAppConf:a,save:s},t.exports=h},{"../conf/api":1,"../core/base":3,"../core/key":5,"../core/util":7,"../module/exportCache":14,"./channelInfo":4}],7:[function(e,t,n){"use strict";function r(e){return Object.prototype.toString.call(e)}function o(e){return null===e?e+"":r(e).slice(8,-1).toLowerCase()}function a(e){return function(t){return r(t)==="[object "+e+"]"}}function i(e){return null!=e&&e==e.window}function u(e){var t;if(!e||!k(e)||e.nodeType||i(e))return!1;try{if(e.constructor&&!b.call(e,"constructor")&&!b.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(O.ownLast)for(t in e)return b.call(e,t);for(t in e);return void 0===t||b.call(e,t)}function c(e,t){return e.indexOf(t)>-1}function f(e,t){return 0===e.indexOf(t)}function s(e,t){var n=e.length,r=t.length;return n>=r&&e.indexOf(t)==n-r}function l(e){return D(e)?e.replace(/^\s+|\s+$/g,""):""}function p(){return location.host.match(/(.*\.)?(.*\.\w+)$/)}function d(e){var t=T.cookie.match(new RegExp("(?:^|;)\\s*"+e+"=([^;]+)"));return x(t?t[1]:"")}function g(e,t,n,r){var o,a,i,u=e+"="+S(t)+";path=/;domain="+r;C!==n&&P(n)&&(o=new Date,a=60*parseInt(n,10)*1e3,i=o.getTime()+a,o.setTime(i),u+=";expires="+o.toUTCString());try{return T.cookie=u,!0}catch(c){return!1}}function h(e){function t(e){var r,o=[];for(r in e)if(b.call(e,r)){var a=e[r];a=j(a)?n(a):k(a)?t(a):S(a),o.push(r+"="+a)}return o.join("&")}function n(e){for(var r=0,o=e.length,a=[];o>r;r++){var i=e[r];i=j(i)?n(i):k(i)?t(i):S(i),a.push(i)}return a.join(",")}var r=[];return j(e)?r.push(n(e)):k(e)?r.push(t(e)):r.push(S(e)),r.join("&")}function v(e,t){function n(e){if(!e)return null;for(var t=e.split("&"),n={};t.length;){var r=t.shift(),o=r.indexOf("=");if(0!==o||r.lastIndexOf("=")!==r.indexOf("=")){var a,i;if(-1!==o)a=r.substr(0,o),i=r.substr(o+1);else{if(!r)continue;a=r,i=void 0}b.call(n,a)?("[object Array]"!=={}.toString.call(n[a])&&(n[a]=[n[a]]),n[a].push(x(i))):n[a]=x(i)}}return n}if(!e)return null;var r,o,a=e.indexOf("#"),i=e.substr(0,-1==a?e.length:a);o=t?"":-1!==a&&e.lastIndexOf("#")===e.indexOf("#")?e.substr(a+1):"",r={uri:i,hash:n(o)};var u=r.uri.lastIndexOf("?");return-1===u?r:(r.uri=r.uri.substr(u+1),-1===r.uri?r:(r.uri=n(r.uri),r))}function y(){var e,t,n,r,o,a,i=arguments[0]||{},c=1,f=arguments.length,s=!1;for("boolean"==typeof i&&(s=i,i=arguments[c]||{},c++),"object"==typeof i||_(i)||(i={}),c===f&&(i=this,c--);f>c;c++)if(null!=(o=arguments[c]))for(r in o)e=i[r],n=o[r],i!==n&&(s&&n&&(u(n)||(t=j(n)))?(t?(t=!1,a=e&&j(e)?e:[]):a=e&&u(e)?e:{},i[r]=y(s,a,n)):void 0!==n&&(i[r]=n));return i}function m(e,t){if(e){var n,r,o,a=e.length,i=(e.splice||e.callee)instanceof Function;if(!isNaN(a)&&i)for(n=0;a>n&&(r=e[n],o=t.call(null,r,n,e),!1!==o);n++);else for(var u in e)if(b.call(e,u)&&(r=e[u],o=t.call(null,r,u,e),!1===o))break}}function w(e,t){if(C===t)return e;var n,r,o;if(e=e||{},t instanceof Array)return[];for(var a in t)b.call(t,a)&&(o=t[a],n=typeof e[a],r=typeof t[a],"object"===n?e[a]=w(e[a],t[a]):C===e[a]&&C!==o&&(e[a]="object"==r?w({},o):o));return e}var b=Object.hasOwnProperty,S=encodeURIComponent,x=decodeURIComponent,O={},C=void 0,T=document,k=a("Object"),D=a("String"),j=Array.isArray||a("Array"),_=a("Function"),I=a("Undefined"),A=a("Number"),P=function(e){return isNaN(e)===!1&&A(e)},E=function(e){var t="EventListener",n="add"+t;return e[n]?{on:function(e,t,r){e[n](t,r,!1)},off:function(e,n,r){e["remove"+t](n,r,!1)}}:{on:function(e,t,n){e.attachEvent("on"+t,n)},off:function(e,t,n){e.detachEvent("on"+t,n)}}}(window),N=function(){return parseInt(+new Date/1e3,10)},L=function(e){return e?/\d+\.\d+\.\d+\.\d/.test(e)?!0:void 0:!1};t.exports={now:N,type:o,is:{object:k,string:D,array:j,func:_,undefined:I,numeric:P,contain:c,startWith:f,endWith:s,plainObject:u,ip:L},trim:l,toString:r,extend:y,merge:w,domain:{getHost:p},getCookie:d,setCookie:g,parseParams:h,getParams:v,each:m,on:E.on,off:E.off}},{}],8:[function(e,t,n){"use strict";function r(){this.version="0.0.1"}function o(e){if(!e)return!1;if(!e.action)return{cache:f,config:s};if(e.key)switch(e.action){case"get":return a(e.type)[e.key];case"set":return e.value?(a(e.type)[e.key]=e.value,a(e.type)[e.key]===e.value):!1;case"del":return e.key?(delete a(e.type)[e.key],!0):!1;default:return!1}else switch(e.action){case"get":return a(e.type);case"set":if(!e.value)switch(e.type){case"config":s={};break;case"cache":default:f={}}}}function a(e){switch(e){case"config":return s;case"cache":default:return f}}var i=e("../core/util"),u=e("../module/web.localstorage"),c="cache",f=u.get("cache")||{},s={};r.prototype.get=function(e,t){return t||(t=c),o(e?{action:"get",type:t,key:e}:{action:"get",type:t})},r.prototype.set=function(e,t,n){var r=arguments;return r.length>1?(e=r[0],t=r[1],n||(n=c),o({action:"set",type:n,key:e,value:t})):!1},r.prototype.del=function(){if(arguments.length>0){var e=arguments[0],t=c;return 2===arguments.length&&(t=arguments[1]),o({action:"del",type:t,key:e})}return!1},r.prototype.config=function(e,t){var n="config";switch(arguments.length){case 2:return this.set(e,t,n);case 1:return this.get(e,n);case 0:return s;default:return!1}},r.prototype.save=function(e){if(e)u.set("cache",f);else{var t=u.get("cache")||{};u.set("cache",i.extend(!0,t,f))}this.load()},r.prototype.load=function(){return f=u.get("cache")||{},u.get("cache")},r.prototype.storage=u,r.prototype.clear=function(){f={},this.save(!0)},t.exports=new r},{"../core/util":7,"../module/web.localstorage":18}],9:[function(e,t,n){"use strict";function r(){var e=navigator.connection||navigator.webkitConnection||navigator.mozConnection;return e&&e.type?navigator.connection.type:"unknown"}function o(e,t,n){if(!t)return!1;if(c>=f)return!1;if(u&&a.version<10){if(XDomainRequest){var r=new XDomainRequest;r.open("POST",e,!0),r.onload=function(){c=0,n("success",o,e,t,n)},r.onerror=function(){r.abort()},r.ontimeout=function(){c++,n("fail",o,e,t,n)},r.timeout=5e3,r.send(i.stringify(t.ret))}}else try{var s=new XMLHttpRequest;"withCredentials"in s&&(s.open("POST",e,!0),s.timeout=15e3,s.setRequestHeader("Content-Type","text/plain"),s.onreadystatechange=function(){if(4==s.readyState){if(s.status>=200&&s.status<300||413==s.status){var r=!1;try{r=i.parse(s.response)}catch(a){r=!1}r?r.status&&200===r.status?(c=0,n("success",o,e,t,n)):(c=0,n("fail",o,e,t,n)):(c++,f>c&&n("fail",o,e,t,n))}else c++,n("fail",o,e,t,n);s.onreadystatechange=null}},s.onerror=function(){s.abort()},s.send(i.stringify(t.ret)))}catch(l){return!1}return!0}var a=(e("../core/util"),e("../module/ua")),i=e("../module/web.json"),u=(document,a.isIE),c=0,f=3;t.exports={post:o,status:r}},{"../core/util":7,"../module/ua":16,"../module/web.json":17}],10:[function(e,t,n){"use strict";var r=e("../core/web.data"),o=e("../core/web.network"),a=e("../conf/config.js"),i=e("../core/report")({Data:r,IO:o,Config:a({Data:r})});t.exports=i},{"../conf/config.js":2,"../core/report":6,"../core/web.data":8,"../core/web.network":9}],11:[function(e,t,n){var r=e("./core/web.data"),o=e("./module/web.localstorage"),a=e("./module/web.json"),i=e("./core/web.report"),u=e("./module/channel")({Data:r,Report:i}),c=e("./module/main")({Data:r,LS:o,JSON:a,Report:i,Channel:u});t.exports=c},{"./core/web.data":8,"./core/web.report":10,"./module/channel":12,"./module/main":15,"./module/web.json":17,"./module/web.localstorage":18}],12:[function(e,t,n){function r(){return q=R,!0}function o(e){return!!J[e]}function a(e){}function i(e,t){return e=f(e),N(e)?void(c(e)?(q=e,L(t)&&g(t)):q=O(e,t)):r()}function u(e,t){var n=A.getNS(t);return e+n}function c(e){return N(e)?J[e]||T.get(u(I.env,e)):!1}function f(e){var t="data_sdk_",n=e;return e!==R&&e.indexOf(t)&&(n=t+e),n}function s(){return q}function l(e,t){var n=u(I.env,e),r=j.extend(!0,{},k.env());r.category=e;var o=j.extend(!0,r,t||{});return o[I.alive]=j.now(),T.set(n,o),T.save(!0),o}function p(e,t){var n={};if(t instanceof Array){for(var r=t.length-1;r>=0;r--)n=w(n,t[r][0]);t=n}t=t||{};var o=T.get(e);T.set(e,w(t,o))}function d(e,t,n){var r,o=E.func(t);if(L(e))r=e,o&&(n=t);else if(N(e)&&!o)r={},r[e]=t;else{if(N(e)&&o)return{key:e,cb:t};E.array(e)}return{data:r,cb:n}}function g(e,t,n){var r,o,a=d(e,t,n);a&&a.data&&(D.save(),"appnm"===e&&t&&k.env(e,t),o=u(I.env,q),r=p(o,a.data),T.save(),n&&n(r))}function h(e,t,n){var r,o,a=d(e,t,n);a&&a.data?(D.save(),o=u(I.tag,q),r=p(o,a.data),T.save(!0),a.cb&&a.cb(r)):a&&a.key?x(a.key,a.cb):E.func(e)&&(n=e,x(n))}function v(e){if(e){var t=u(I.evs,q),n=[],r=T.get(t);r=r||[],E.array(e)||(e=[e]),r&&!E.array(r)&&(r=[r]),j.each(e,function(e){e instanceof Array?(j.each(e,b),n=n.concat(e)):(b(e),n.push(e))}),e=r.concat(n),T.set(t,e),T.save(!0)}}function y(e){e.tm===P&&(e.tm=new Date-0)}function m(e){for(var t in e)e[t]!==P&&"nm"!==t&&"val"!==t&&"tm"!==t&&delete e[t];e.nm&&(e.nm=e.nm.toLowerCase())}function w(e,t){if(P===t)return e;var n,r,o;e=e||{};for(var a in t)t.hasOwnProperty(a)&&(o=t[a],n=typeof e[a],r=typeof t[a],"object"===n?e[a]=w(e[a],t[a]):P===e[a]&&P!==o&&(e[a]="object"==r?w({},o):o));return e}function b(e){m(e),y(e)}function S(e,t){var n=T.get(u(I.env,q));E.func(e)&&(t=e,e=null),E.func(t)&&t(n&&e?n[e]:n,n)}function x(e,t){var n=T.get(u(I.tag,q));E.func(e)&&(t=e,e=null),E.func(t)&&t(n&&e?n[e]:n,n)}function O(e,t){return l(e,t),q=e,e}function C(e){return this instanceof C?(T=e.Data,k=_({Data:T}),void(D=e.Report)):new C(e)}var T,k,D,j=e("../core/util"),_=e("../conf/config"),I=e("../core/key"),A=e("../core/channelInfo"),P=void 0,E=j.is,N=E.string,L=E.object,R=A.getDefault(),q=R,J=A.map;C.prototype={constructor:C,curName:s,use:i,hasId:o,KEY:I,reloadEnv:a,set:g,get:S,tag:h,event:v},t.exports=C},{"../conf/config":2,"../core/channelInfo":4,"../core/key":5,"../core/util":7}],13:[function(e,t,n){function r(e){return e=e||{},e.cid||(e.cid=i.pathname+i.search+i.hash),e}function o(e,t,n,o,c){var f,s,l,p,d,g,h={},v=c.conf(),y={};if(e){if(y=a.merge(e,c.env()),y.appnm||(y.appnm=v.appnm||i.host),y.uuid||(y.uuid=v.uuid||""),y.ua||(y.ua=u),g=y.utm)for(var m in g)g[m]||delete g[m];if(f=y.category,n)for(d in n)n.hasOwnProperty(d)&&n[d]&&(p=!0,h[d]=n[d]);if(t&&t.length){for(var w=0,b=t.length;b>w;w++)if(s=t[w],l=s.val){r(l);for(d in l)(l[d]||!1===l[d])&&(s["val_"+d]=l[d]),delete l[d];delete s.val}y[o.evs]=t}return p&&(y[o.tag]=h),y._category_&&(y.category=y._category_),f?"sdk_report"!==f&&0>f.indexOf("data_sdk_")&&(y.category="data_sdk_"+f):y.category=e.category||"sdk_report",y[o.evs]&&!y[o.evs].length&&delete y[o.evs],y[o.tag]||delete y[o.tag],delete y[o.alive],y}}var a=e("../core/util"),i=location,u=navigator.userAgent.toString();t.exports=o},{"../core/util":7}],14:[function(e,t,n){function r(e,t,n){var r,u,c,f,s=!1,l=n.env+e,p=n.evs+e,d=n.tag+e;if(u=i.extend(!0,{},t.get(l)),c=t.get(p),f=t.get(d),f=i.extend(!0,{},f),u&&c&&c.length&&(r=o(u,c,f,n,a({Data:t})),r[n.evs]&&r[n.evs].length&&(t.set(p,[]),s=!0)),u[n.timeout]||/^#\d+#$/.test(e)){try{t.del(l)}catch(g){}try{t.del(p)}catch(g){}try{t.del(d)}catch(g){}delete u[n.timeout]}return s?r:null}var o=e("../module/combineData"),a=e("../conf/config"),i=e("../core/util");t.exports=r},{"../conf/config":2,"../core/util":7,"../module/combineData":13}],15:[function(e,t,n){function r(e){function t(e,t){function n(e,t){e=[].slice.call(t,1);var n,r,o=t[0],a=o.split(".");1<a.length&&(r=v.curName(),n=a[0],o=a[1]);var i=w[o];"function"==typeof i&&(n&&w.use(n),w[o].apply(w,e),n&&w.use(r))}if(e){for(var r,o,a=0,i=e.length;i>a;a++)r=e[a],n(o,r);t.q={push:function(e){return n(o,e),w}}}}function n(){}function r(){if(m){var e=a.now(),t=u.getAll();for(var n in t)m(n+".set",i.alive,e);y(r,6e4)}}function f(){s||(w._sendDelay=!0,t(m.q,m),n(d),w._sendDelay=!1,w.report("now"),r(),s=!0)}var s,l=e.Data,p=o({Data:l}),d=document,g=location,h=e.Report,v=e.Channel,y=setTimeout,m=c[c._MeiTuanALogObject];m||(m=function(){return m.q.push(arguments),m},m.q=[]);var w=(m.l||+new Date,{init:function(e){try{this.use(e)}catch(t){}return w},config:function(e,t){return p.conf(e,t)||w},use:function(){try{v.use.apply(v,arguments)}catch(e){}return w},status:!0,get:function(){try{v.get.apply(v,arguments)}catch(e){}return w},set:function(){try{v.set.apply(v,arguments)}catch(e){}return w},event:function(e){try{var t=e instanceof Array;if(!e||t&&!e.length)return w;v.event(e),w._sendDelay||w.report()}catch(n){}return w},tag:function(){try{v.tag.apply(null,arguments)}catch(e){}return w},tracker:function(e,t){try{0===e.indexOf("error.")&&w.use(errorChannel).event({nm:"MGE",val:{val:d.domain,lab:t.join("\n")}})}catch(n){}},report:function(e){return h.start(),w._sendDelay||h.report(e),w},send:function(e,t){if("pv"==e){var n,r="";t=t||{},t=a.is.string(t)?{cid:t}:t,t.ref||(r=d.referrer,p.conf("alwaysSendReferrer")||(n=r.replace(/^(http|https)\:\/\//,"").split("/")[0],n===g.host&&(r=""))),t=a.extend(!0,{act:"pageview",cid:d.title,val:g.href,ref:r},t),w.event({nm:"mpt",val:t}),w.report("now")}else"exception"==e&&w.event({nm:"mge",val:{val:d.domain,lab:t}})},reload:v.reloadEnv,version:"2.3.0",_sendDelay:!0});w.start=f;var b=h.getAppConf();return b.autoStart&&f(),m._MTAObject=w,w}var o=e("../conf/config"),a=(e("../module/combineData"),e("../core/util")),i=e("../core/key"),u=e("../core/channelInfo"),c=window;t.exports=r},{"../conf/config":2,"../core/channelInfo":4,"../core/key":5,"../core/util":7,"../module/combineData":13}],16:[function(e,t,n){"use strict";function r(){var e=navigator.userAgent.toString(),t=e.match(o);return t?{isIE:!0,version:Math.floor(parseInt(t[1]))}:{isIE:!0}}var o=(e("../core/util"),/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/i);t.exports=r()},{"../core/util":7}],17:[function(require,module,exports){"use strict";function f(e){return 10>e?"0"+e:e}function thisValue(){return this.valueOf()}function quote(e){return regexpEscapable.lastIndex=0,regexpEscapable.test(e)?'"'+e.replace(regexpEscapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,a,i,u=gap,c=t[e];switch(c&&"object"==typeof c&&"function"==typeof c.toJSON&&(c=c.toJSON(e)),"function"==typeof rep&&(c=rep.call(t,e,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,i=[],"[object Array]"===Object.prototype.toString.apply(c)){for(a=c.length,n=0;a>n;n+=1)i[n]=str(n,c)||"null";return o=0===i.length?"[]":gap?"[\n"+gap+i.join(",\n"+gap)+"\n"+u+"]":"["+i.join(",")+"]",gap=u,o}if(rep&&"object"==typeof rep)for(a=rep.length,n=0;a>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,c),o&&i.push(quote(r)+(gap?": ":":")+o));else for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(o=str(r,c),o&&i.push(quote(r)+(gap?": ":":")+o));return o=0===i.length?"{}":gap?"{\n"+gap+i.join(",\n"+gap)+"\n"+u+"}":"{"+i.join(",")+"}",gap=u,o}}"object"!=typeof window.JSON&&(window.JSON={});var regexpOne=/^[\],:{}\s]*$/,regexpTwo=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,regexpThree=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,regexpFour=/(?:^|:|,)(?:\s*\[)+/g,regexpEscapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,regexpDangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=thisValue,Number.prototype.toJSON=thisValue,String.prototype.toJSON=thisValue);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),regexpDangerous.lastIndex=0,regexpDangerous.test(text)&&(text=text.replace(regexpDangerous,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),regexpOne.test(text.replace(regexpTwo,"@").replace(regexpThree,"]").replace(regexpFour,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}),module.exports=JSON},{}],18:[function(e,t,n){"use strict";function r(){}var o=e("../module/web.json"),a="_linxisdk_ls",i=a+"_update",u="__"+a+"_meta";!function(e){function t(){var e=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),e=!0,window.localStorage.removeItem("_tmptest")}catch(t){}if(e)try{window.localStorage&&(C=window.localStorage,D="localStorage",I=C[i])}catch(n){}else if("globalStorage"in window)try{window.globalStorage&&(C="localhost"==window.location.hostname?window.globalStorage["localhost.localdomain"]:window.globalStorage[window.location.hostname],D="globalStorage",I=C[i])}catch(o){}else{if(T=document.createElement("link"),!T.addBehavior)return void(T=null);T.style.behavior="url(#default#userData)",document.getElementsByTagName("head")[0].appendChild(T);try{T.load(a)}catch(u){T.setAttribute(a,"{}"),T.save(a),T.load(a)}var f="{}";try{f=T.getAttribute(a)}catch(s){}try{I=T.getAttribute(i)}catch(l){}C[a]=f,D="userDataBehavior"}p(),h(),r(),v(),"addEventListener"in window&&window.addEventListener("pageshow",function(e){e.persisted&&c()},!1)}function n(){var e="{}";if("userDataBehavior"==D){T.load(a);try{e=T.getAttribute(a)}catch(t){}try{I=T.getAttribute(i)}catch(n){}C[a]=e}p(),h(),v()}function r(){"localStorage"==D||"globalStorage"==D?"addEventListener"in window?window.addEventListener("storage",c,!1):document.attachEvent("onstorage",c):"userDataBehavior"==D&&setInterval(c,1e3)}function c(){var e;clearTimeout(_),_=setTimeout(function(){if("localStorage"==D||"globalStorage"==D)e=C[i];else if("userDataBehavior"==D){T.load(a);try{e=T.getAttribute(i)}catch(t){}}e&&e!=I&&(I=e,f())},25)}function f(){var e,t=o.parse(o.stringify(O[u].CRC32));n(),e=o.parse(o.stringify(O[u].CRC32));var r,a=[],i=[];for(r in t)if(t.hasOwnProperty(r)){if(!e[r]){i.push(r);continue}t[r]!=e[r]&&"2."==String(t[r]).substr(0,2)&&a.push(r)}for(r in e)e.hasOwnProperty(r)&&(t[r]||a.push(r));s(a,"updated"),s(i,"deleted")}function s(e,t){e=[].concat(e||[]);var n,r,o,a;if("flushed"==t){e=[];for(var i in j)j.hasOwnProperty(i)&&e.push(i);t="deleted"}for(n=0,o=e.length;o>n;n++){if(j[e[n]])for(r=0,a=j[e[n]].length;a>r;r++)j[e[n]][r](e[n],t);if(j["*"])for(r=0,a=j["*"].length;a>r;r++)j["*"][r](e[n],t)}}function l(){var e=(+new Date).toString();if("localStorage"==D||"globalStorage"==D)try{C[i]=e}catch(t){D=!1}else"userDataBehavior"==D&&(T.setAttribute(i,e),T.save(a));c()}function p(){if(C[a])try{O=o.parse(String(C[a]))}catch(e){C[a]="{}"}else C[a]="{}";k=C[a]?String(C[a]).length:0,O[u]||(O[u]={}),O[u].CRC32||(O[u].CRC32={})}function d(){m();try{C[a]=o.stringify(O),T&&(T.setAttribute(a,C[a]),T.save(a)),k=C[a]?String(C[a]).length:0}catch(e){}}function g(e){if("string"!=typeof e&&"number"!=typeof e)throw new TypeError("Key name must be string or numeric");if(e==u)throw new TypeError("Reserved key name");return!0}function h(){var e,t,n,r,o=1/0,a=!1,i=[];if(clearTimeout(S),O[u]&&"object"==typeof O[u].TTL){e=+new Date,n=O[u].TTL,r=O[u].CRC32;for(t in n)n.hasOwnProperty(t)&&(n[t]<=e?(delete n[t],delete r[t],delete O[t],a=!0,i.push(t)):n[t]<o&&(o=n[t]));o!=1/0&&(S=setTimeout(h,Math.min(o-e,2147483647))),a&&(d(),l(),s(i,"deleted"))}}function v(){var e,t;if(O[u].PubSub){var n,r=P,o=[];for(e=t=O[u].PubSub.length-1;e>=0;e--)n=O[u].PubSub[e],n[0]>P&&(r=n[0],o.unshift(n));for(e=o.length-1;e>=0;e--)y(o[e][1],o[e][2]);P=r}}function y(e,t){if(A[e])for(var n=0,r=A[e].length;r>n;n++)try{A[e][n](e,o.parse(o.stringify(t)))}catch(a){}}function m(){if(O[u].PubSub){for(var e=+new Date-2e3,t=0,n=O[u].PubSub.length;n>t;t++)if(O[u].PubSub[t][0]<=e){O[u].PubSub.splice(t,O[u].PubSub.length-t);break}O[u].PubSub.length||delete O[u].PubSub}}function w(e,t){O[u]||(O[u]={}),O[u].PubSub||(O[u].PubSub=[]),O[u].PubSub.unshift([+new Date,e,t]),d(),l()}function b(e,t){for(var n,r=e.length,o=t^r,a=0;r>=4;)n=255&e.charCodeAt(a)|(255&e.charCodeAt(++a))<<8|(255&e.charCodeAt(++a))<<16|(255&e.charCodeAt(++a))<<24,n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16),n^=n>>>24,n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16),o=1540483477*(65535&o)+((1540483477*(o>>>16)&65535)<<16)^n,r-=4,++a;switch(r){case 3:o^=(255&e.charCodeAt(a+2))<<16;case 2:o^=(255&e.charCodeAt(a+1))<<8;case 1:o^=255&e.charCodeAt(a),o=1540483477*(65535&o)+((1540483477*(o>>>16)&65535)<<16)}return o^=o>>>13,o=1540483477*(65535&o)+((1540483477*(o>>>16)&65535)<<16),o^=o>>>15,o>>>0}var S,x="0.4.12",O={},C={},T=null,k=0,D=!1,j={},_=!1,I=0,A={},P=+new Date;O[u]={CRC32:{}},C[a]="{}",e.prototype={version:x,set:function(e,t,n){return g(e),n=n||{},"undefined"==typeof t?(this.deleteKey(e),t):"function"!=typeof t?(t&&"object"==typeof t&&(t=o.parse(o.stringify(t))),O[e]=t,O[u].CRC32[e]="2."+new b(o.stringify(t),2538058380),this.setTTL(e,n.TTL||0),s(e,"updated"),t):void 0},quickSet:function(e,t){if(!e)return!1;try{var n=o.stringify(t);C[e]=n,T&&(T.setAttribute(e,n),T.save(e))}catch(r){}},quickGet:function(e){return g(e),e in C?C[e]:null},quickRemove:function(e){return g(e),e in C?(delete C[e],!0):!1},quickIndex:function(){var e,t=[];for(e in C)C.hasOwnProperty?C.hasOwnProperty(e)&&e!=u&&t.push(e):C[e]&&e!=u&&t.push(e);return t},get:function(e,t){return g(e),e in O?O[e]:"undefined"==typeof t?null:t},deleteKey:function(e){return g(e),e in O?(delete O[e],"object"==typeof O[u].TTL&&e in O[u].TTL&&delete O[u].TTL[e],delete O[u].CRC32[e],d(),l(),s(e,"deleted"),!0):!1},setTTL:function(e,t){var n=+new Date;return g(e),t=Number(t)||0,e in O?(O[u].TTL||(O[u].TTL={}),t>0?O[u].TTL[e]=n+t:delete O[u].TTL[e],d(),h(),l(),!0):!1},getTTL:function(e){var t,n=+new Date;return g(e),e in O&&O[u].TTL&&O[u].TTL[e]?(t=O[u].TTL[e]-n,t||0):0},flush:function(){return O={},O[u]={CRC32:{}},d(),l(),s(null,"flushed"),!0},storageObj:function(){function e(){}return e.prototype=O,new e},index:function(){var e,t=[];for(e in O)O.hasOwnProperty(e)&&e!=u&&t.push(e);return t},storageSize:function(){return k},currentBackend:function(){return D},storageAvailable:function(){return!!D},listenKeyChange:function(e,t){g(e),j[e]||(j[e]=[]),j[e].push(t)},stopListening:function(e,t){if(g(e),j[e]){if(!t)return void delete j[e];for(var n=j[e].length-1;n>=0;n--)j[e][n]==t&&j[e].splice(n,1)}},subscribe:function(e,t){if(e=(e||"").toString(),!e)throw new TypeError("Channel not defined");A[e]||(A[e]=[]),A[e].push(t)},publish:function(e,t){if(e=(e||"").toString(),!e)throw new TypeError("Channel not defined");w(e,t)},reInit:function(){n()}},t()}(r),t.exports=new r},{"../module/web.json":17}]},{},[11]);