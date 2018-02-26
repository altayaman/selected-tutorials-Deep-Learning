(self.AMP=self.AMP||[]).push({n:"amp-youtube",v:"1492571781980",f:(function(AMP){var k;(function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global?global:a})(this);function n(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}var p="";
function q(a){var b=a||self,c;if(b.AMP_MODE)c=b.AMP_MODE;else{c=b;if(c.context&&c.context.mode)c=c.context.mode;else{var d=r(c.location.originalHash||c.location.hash),e=r(c.location.search);p||(p=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011492571781980");c={localDev:!1,development:!("1"!=d.development&&!c.AMP_DEV_MODE),filter:d.filter,minified:!0,lite:void 0!=e.amp_lite,test:!1,log:d.log,version:"1492571781980",rtvVersion:p}}c=b.AMP_MODE=c}return c}
function r(a){var b=Object.create(null);if(!a)return b;if(0==a.indexOf("?")||0==a.indexOf("#"))a=a.substr(1);for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d],f=e.indexOf("="),g,h;-1!=f?(g=decodeURIComponent(e.substring(0,f)).trim(),h=decodeURIComponent(e.substring(f+1)).trim()):(g=decodeURIComponent(e).trim(),h="");g&&(b[g]=h)}return b};var t=Object.prototype.toString;Date.now();self.log=self.log||{user:null,dev:null};var u=self.log;function v(){if(u.user)return u.user;throw Error("failed to call initLogConstructor");};function w(a,b){var c;a=a.__AMP_TOP||a;return x(a,a,b,c?c:void 0)}function y(a){var b=z;a=A(a);var c=B(a);C(c,a,b)}function D(a,b){a=A(a);return x(B(a),a,b,void 0)}function A(a){return a.nodeType?w((a.ownerDocument||a).defaultView,"ampdoc").getAmpDoc(a):a}function B(a){a=A(a);return a.isSingleDoc()?a.win:a}function x(a,b,c,d){var e=E(a);(a=e[c])||(a=e[c]={obj:null,promise:null,resolve:null,build:null});a.obj||(a.obj=a.build?a.build():d(b),a.resolve&&a.resolve(a.obj));return a.obj}
function C(a,b,c){var d=E(a);(a=d["video-manager"])||(a=d["video-manager"]={obj:null,promise:null,resolve:null,build:null});a.build||(a.build=function(){return c?new c(b):(void 0)(b)},a.promise&&a.resolve&&(d=a.build(),a.obj=d,a.resolve(d)))}function E(a){var b=a.services;b||(b=a.services={});return b};function F(a){var b,c,d=b||function(a){return a},e=a.dataset;a=Object.create(null);var f=c?c:/^param(.+)/,g;for(g in e){var h=g.match(f);if(h){var l=h[1][0].toLowerCase()+h[1].substr(1);a[d(l)]=e[g]}}return a};var G,H="Webkit webkit Moz moz ms O o".split(" ");function J(a,b){for(var c in b){var d=a,e=b[c],f;f=d.style;var g=c;G||(G=Object.create(null));var h=G[g];if(!h){h=g;if(void 0===f[g]){var l;l=g;l=l.charAt(0).toUpperCase()+l.slice(1);a:{for(var m=0;m<H.length;m++){var I=H[m]+l;if(void 0!==f[I]){l=I;break a}}l=""}void 0!==f[l]&&(h=l)}G[g]=h}(f=h)&&(d.style[f]=e)}};function K(a,b,c){function d(a){try{return g(a)}catch(m){throw self.reportError(m),m;}}var e=void 0,f=a,g=c,h=e||!1;f.addEventListener(b,d,h);return function(){f&&f.removeEventListener(b,d,h);d=f=g=null}};function L(a,b,c){return K(a,b,c)}function M(a,b){var c=b,d=K(a,"load",function(a){try{c(a)}finally{c=null,d()}});return d}function N(a){var b,c,d=new Promise(function(b){c=M(a,b)});return O(d,c,b)}function O(a,b,c){var d=void 0,e;e=void 0===c?a:w(self,"timer").timeoutPromise(c||0,a);b&&e.then(b,b);d&&e.then(d,d);return e};function z(a){this.b=a;this.f=null;this.A=!1}z.prototype.register=function(a){var b=a;b.registerAction("play",b.play.bind(b,!1));b.registerAction("pause",b.pause.bind(b));b.registerAction("mute",b.mute.bind(b));b.registerAction("unmute",b.unmute.bind(b));if(a.element.hasAttribute("autoplay")&&a.supportsPlatform()){this.f=this.f||[];var c=new P(this.b,a);Q(this,c);this.f.push(c)}};
function Q(a,b){L(b.video.element,"amp:video:visibility",function(){b.updateVisibility()});if(!a.A){var c=function(){for(var b=0;b<a.f.length;b++)a.f[b].updateVisibility()},d=D(a.b,"viewport");d.onScroll(c);d.onChanged(c);a.A=!0}}
function P(a,b){var c=this;this.b=a;this.video=b;this.C=null;this.B=this.c=this.s=!1;this.m=w(a.win,"vsync");this.o=R.bind(null,a.win,q(a.win).lite);a=b.element;this.i=a.hasAttribute("autoplay");N(a).then(function(){c.updateVisibility();c.s=!0;c.c&&c.i&&S(c)});this.updateVisibility();this.i&&T(this)}function T(a){a.video.isInteractive()&&a.video.hideControls();a.o().then(function(b){!b&&a.video.isInteractive()?a.video.showControls():(a.video.mute(),a.video.isInteractive()&&U(a))})}
function U(a){function b(b){a.m.mutate(function(){d.classList.toggle("amp-video-eq-play",b)})}function c(){this.B=!0;this.video.showControls();this.video.unmute();f();g();h();d.remove();e.remove()}a.video.hideControls();var d=aa(a),e=ba(a);a.m.mutate(function(){a.video.element.appendChild(d);a.video.element.appendChild(e)});var f=L(e,"click",c.bind(a)),g=L(a.video.element,"pause",b.bind(a,!1)),h=L(a.video.element,"play",b.bind(a,!0))}
function S(a){!a.B&&D(a.b,"viewer").isVisible()&&a.o().then(function(b){b&&(a.c?a.video.play(!0):a.video.pause())})}
function aa(a){var b=a.b.win.document,c=b.createElement("i-amphtml-video-eq");c.classList.add("amp-video-eq");for(var d=1;4>=d;d++){var e=b.createElement("div");e.classList.add("amp-video-eq-col");for(var f=1;2>=f;f++){var g=b.createElement("div");g.classList.add("amp-video-eq-"+d+"-"+f);e.appendChild(g)}c.appendChild(e)}var h=w(a.b.win,"platform");h.isIos()&&c.setAttribute("unpausable","");return c}
function ba(a){a=a.b.win.document.createElement("i-amphtml-video-mask");a.classList.add("i-amphtml-fill-content");return a}P.prototype.updateVisibility=function(){function a(){c.c!=d&&c.s&&c.i&&S(c)}function b(){if(c.video.isInViewport()){var a=c.video.element.getIntersectionChangeEntry(),b=a.intersectionRatio,d="number"===typeof b&&isFinite(b)?100*a.intersectionRatio:0;c.c=75<=d}else c.c=!1}var c=this,d=this.c;this.m.run({measure:b,mutate:a})};var V=null;
function R(a,b){if(V)return V;if(b)return V=Promise.resolve(!1);var c=a.document.createElement("video");c.setAttribute("muted","");c.setAttribute("playsinline","");c.setAttribute("webkit-playsinline","");c.muted=!0;c.playsinline=!0;c.webkitPlaysinline=!0;c.setAttribute("height","0");c.setAttribute("width","0");J(c,{position:"fixed",top:"0",width:"0",height:"0",opacity:"0"});try{var d=c.play();d&&d.catch&&d.catch(function(){})}catch(e){}return V=Promise.resolve(!c.paused)};function W(a){AMP.BaseElement.call(this,a);this.h=0;this.g=null;this.j=!1;this.w=this.u=this.l=this.a=null}n(W,AMP.BaseElement);k=W.prototype;k.preconnectCallback=function(a){this.preconnect.url(X(this));this.preconnect.url("https://s.ytimg.com",a);this.preconnect.url("https://i.ytimg.com",a)};k.isLayoutSupported=function(a){return"fixed"==a||"fixed-height"==a||"responsive"==a||"fill"==a||"flex-item"==a};k.renderOutsideViewport=function(){return.75};
k.viewportCallback=function(a){this.element.dispatchCustomEvent("amp:video:visibility",{visible:a})};k.buildCallback=function(){var a=this;this.g=Y(this);this.u=new Promise(function(b){a.w=b});this.getPlaceholder()||ca(this);y(this.element);D(this.element,"video-manager").register(this)};
function X(a){if(a.l)return a.l;var b="https://www.youtube.com/embed/"+encodeURIComponent(a.g||"")+"?enablejsapi=1",c=F(a.element);"autoplay"in c&&(delete c.autoplay,v().error("AMP-YOUTUBE","Use autoplay attribute instead of data-param-autoplay"));"playsinline"in c||(c.playsinline="1");var d=a.element.hasAttribute("autoplay");d&&("iv_load_policy"in c||(c.iv_load_policy="3"),c.playsinline="1");var e=[],f;for(f in c){var g=c[f];if(null!=g)if(Array.isArray(g))for(var h=0;h<g.length;h++){var l=g[h];e.push(encodeURIComponent(f)+
"="+encodeURIComponent(l))}else e.push(encodeURIComponent(f)+"="+encodeURIComponent(g))}if(c=e.join("&"))b=b.split("#",2),f=b[0].split("?",2),c=f[0]+(f[1]?"?"+f[1]+"&"+c:"?"+c),b=c+=b[1]?"#"+b[1]:"";return a.l=b}
k.layoutCallback=function(){var a=this,b=this.element.ownerDocument.createElement("iframe"),c=X(this);b.setAttribute("frameborder","0");b.setAttribute("allowfullscreen","true");b.src=c;this.applyFillContent(b);this.element.appendChild(b);this.a=b;this.win.addEventListener("message",function(b){if("https://www.youtube.com"==b.origin&&b.source==a.a.contentWindow&&b.data&&("[object Object]"===t.call(b.data)||0==b.data.indexOf("{"))){var c;if("[object Object]"===t.call(b.data))c=b.data;else a:{try{c=
JSON.parse(b.data);break a}catch(f){}c=void 0}b=c;void 0!==b&&("infoDelivery"==b.event&&b.info&&void 0!==b.info.playerState?(a.h=b.info.playerState,2==a.h?a.element.dispatchCustomEvent("pause"):1==a.h&&a.element.dispatchCustomEvent("play")):"infoDelivery"==b.event&&b.info&&void 0!==b.info.muted&&a.j!=b.info.muted&&(a.j=b.info.muted,a.element.dispatchCustomEvent(a.j?"muted":"unmuted")))}});return this.loadPromise(b).then(function(){a.a.contentWindow.postMessage(JSON.stringify({event:"listening"}),
"*")}).then(function(){a.element.dispatchCustomEvent("load");a.w(a.a)})};k.pauseCallback=function(){this.a&&this.a.contentWindow&&1==this.h&&this.pause()};k.mutatedAttributesCallback=function(a){void 0!==a["data-videoid"]&&(this.g=Y(this),this.a&&Z(this,"loadVideoById",[this.g]))};function Y(a){return v().assert(a.element.getAttribute("data-videoid"),"The data-videoid attribute is required for <amp-youtube> %s",a.element)}
function Z(a,b,c){a.u.then(function(){if(a.a&&a.a.contentWindow){var d=JSON.stringify({event:"command",func:b,args:c||""});a.a.contentWindow.postMessage(d,"*")}})}
function ca(a){var b=a.element.ownerDocument.createElement("img"),c=a.g||"";J(b,{"object-fit":"cover",visibility:"hidden"});b.src="https://i.ytimg.com/vi/"+encodeURIComponent(c)+"/sddefault.jpg#404_is_fine";b.setAttribute("placeholder","");b.setAttribute("referrerpolicy","origin");a.applyFillContent(b);a.element.appendChild(b);a.loadPromise(b).then(function(){if(120==b.naturalWidth&&90==b.naturalHeight)throw Error("sddefault.jpg is not found");}).catch(function(){b.src="https://i.ytimg.com/vi/"+encodeURIComponent(c)+
"/hqdefault.jpg";return a.loadPromise(b)}).then(function(){J(b,{visibility:""})})}k.supportsPlatform=function(){return!0};k.isInteractive=function(){return!0};k.play=function(){Z(this,"playVideo")};k.pause=function(){Z(this,"pauseVideo")};k.mute=function(){Z(this,"mute")};k.unmute=function(){Z(this,"unMute")};k.showControls=function(){};k.hideControls=function(){};AMP.registerElement("amp-youtube",W);
})});
//# sourceMappingURL=amp-youtube-0.1.js.map
