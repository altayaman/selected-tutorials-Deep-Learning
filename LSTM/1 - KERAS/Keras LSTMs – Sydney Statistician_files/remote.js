(function(g){var window=this;var vva=function(a,b){var c=[];g.Ul(b,function(a){var b;try{b=g.CD.prototype.o.call(this,a,!0)}catch(f){if("Storage: Invalid value was encountered"==f)return;throw f;}g.t(b)?g.BD(b)&&c.push(a):c.push(a)},a);
return c},wva=function(a,b){var c=vva(a,b);
(0,g.H)(c,function(a){g.CD.prototype.remove.call(this,a)},a)},j9=function(a,b){g.f1.call(this,g.U("YTP_MDX_TITLE"),0,a,b);
this.W=a;this.F={};this.V(a,"onMdxReceiversChange",this.H);this.V(a,"presentingplayerstatechange",this.H);this.H()},xva=function(a){return a.H?a.F+((0,g.G)()-a.A)/1E3:a.F},yva=function(){var a=g.XG;
wva(a,a.g.Nd(!0))},k9=function(a){g.zH.call(this,"ScreenServiceProxy");
this.Vc=a;this.o=[];this.o.push(this.Vc.$_s("screenChange",(0,g.A)(this.vQ,this)));this.o.push(this.Vc.$_s("onlineScreenChange",(0,g.A)(this.QM,this)))},l9=function(a){g.mH("cloudview",a)},zva=function(a){l9("setApiReady_ "+a);
g.u("yt.mdx.remote.cloudview.apiReady_",a,void 0)},m9=function(){return g.w("yt.mdx.remote.cloudview.instance_")},Ava=function(a){g.pG[a]&&(a=g.pG[a],(0,g.H)(a,function(a){g.nG[a]&&delete g.nG[a]}),a.length=0)},n9=function(){return g.w("yt.mdx.remote.connection_")},o9=function(a){g.u("yt.mdx.remote.connectData_",a,void 0)},Bva=function(a){g.u("yt.mdx.remote.currentScreenId_",a,void 0)},p9=function(){return g.w("yt.mdx.remote.currentScreenId_")},r9=function(){if(!q9){var a=g.w("yt.mdx.remote.screenService_");
q9=a?new k9(a):null}return q9},s9=function(a){g.u("yt.mdx.remote.cloudview.initializing_",a,void 0)},t9=function(){return!!g.w("yt.mdx.remote.cloudview.apiReady_")},u9=function(a){l9("setCastInstalled_ "+a);
g.ZG("yt-remote-cast-installed",a)},v9=function(a){g.mH("cloudview",a)},Cva=function(a,b){m9().init(a,b)},w9=function(){return!!g.$G("yt-remote-cast-installed")},Dva=function(){l9("dispose");
var a=m9();a&&a.dispose();g.u("yt.mdx.remote.cloudview.instance_",null,void 0);zva(!1);g.rG(x9);x9.length=0},Eva=function(){var a=window.document.createElement("a");
g.Pd(a,"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js");a=a.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+g.Ra(a)},Fva=function(a,b){var c=window.document.createElement("script");
c.id=a;c.onload=function(){b&&(0,window.setTimeout)(b,0)};
c.onreadystatechange=function(){switch(c.readyState){case "loaded":case "complete":c.onload()}};
c.src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js";var d=window.document.getElementsByTagName("head")[0]||window.document.body;d.insertBefore(c,d.firstChild);return c},Gva=function(a){var b=g.mG();
if(b)if(b.clear(a),a)Ava(a);else for(var c in g.pG)Ava(c)},y9=function(){return g.w("yt.mdx.remote.channelParams_")||{}},A9=function(a){var b=n9();
o9(null);a||Bva("");g.u("yt.mdx.remote.connection_",a,void 0);z9&&((0,g.H)(z9,function(b){b(a)}),z9.length=0);
b&&!a?g.uG("yt-remote-connection-change",!1):!b&&a&&g.uG("yt-remote-connection-change",!0)},Hva=function(){return g.w("yt.mdx.remote.connectData_")},B9=function(){var a=p9();
if(!a)return null;var b=r9().Sd();return g.yH(b,a)},Iva=function(a,b){u9(!0);
s9(!1);Cva(a,function(a){a?(zva(!0),g.sG("yt-remote-cast2-api-ready")):(v9("Failed to initialize cast API."),u9(!1),g.aH("yt-remote-cast-available"),g.aH("yt-remote-cast-receiver"),Dva());b(a)})},Jva=function(){return w9()?m9()?m9().getCastSession():(v9("getCastSelector: Cast is not initialized."),null):(v9("getCastSelector: Cast API is not installed!"),null)},Kva=function(){var a=Eva(),b=window.document.getElementById(a),c=b&&g.CF(b,"loaded");
c||b&&!c||(b=Fva(a,function(){g.CF(b,"loaded")||(g.DF(b,"loaded","true"),g.sG(a),g.KE(g.ya(Gva,a),0))}))},Lva=function(a){return(0,g.I)(a,function(a){return{key:a.id,
name:a.name}})},Mva=function(){if(g.Eoa){var a=2,b=g.Gh(),c=function(){a--;
0==a&&b&&b(!0)};
window.__onGCastApiAvailable=c;g.Lh("//www.gstatic.com/cast/sdk/libs/sender/1.0/cast_framework.js",g.Ih,c)}},D9=function(a,b){p9();
B9()&&B9();Bva(a.id);var c=new g.DI(C9,a,y9());c.connect(b,Hva());c.subscribe("beforeDisconnect",function(a){g.uG("yt-remote-before-disconnect",a)});
c.subscribe("beforeDispose",function(){n9()&&(n9(),A9(null))});
A9(c)},E9=function(){var a=g.EH();
if(!a)return null;var b=r9().Sd();return g.yH(b,a)},F9=function(a){g.mH("remote",a)},G9=function(){var a=n9();
return!!a&&3!=a.getProxyState()},H9=function(){t9()?m9().stopSession():v9("stopSession called before API ready.");
var a=n9();a&&(a.disconnect(1),A9(null))},Nva=function(){var a;
a=r9().Vc.$_gos();var b=B9();b&&n9()&&(g.xH(a,b)||a.push(b));return Lva(a)},J9=function(a,b){g.cG.call(this);
this.g=0;this.B=a;this.D=[];this.C=new g.QB;this.A=this.o=null;this.H=(0,g.A)(this.XK,this);this.F=(0,g.A)(this.yk,this);this.G=(0,g.A)(this.WK,this);this.J=(0,g.A)(this.kL,this);var c=0;a?(c=a.getProxyState(),3!=c&&(a.subscribe("proxyStateChange",this.wt,this),Ova(this))):c=3;0!=c&&(b?this.wt(c):g.KE((0,g.A)(function(){this.wt(c)},this),0));
var d=Jva();d&&I9(this,d);this.subscribe("yt-remote-cast2-session-change",this.J)},K9=function(a){return new g.sI(a.B.getPlayerContextData())},Pva=function(a,b,c,d,e){var f=K9(a),k=e||f.listId;
d=d||0;var l={videoId:b,currentIndex:d};g.wI(f,b,d);g.t(c)&&(g.uI(f,c),l.currentTime=c);g.t(k)&&(l.listId=k);L9(a,"setPlaylist",l);e||M9(a,f)},Ova=function(a){(0,g.H)("nowAutoplaying autoplayDismissed remotePlayerChange remoteQueueChange autoplayModeChange autoplayUpNext previousNextChange".split(" "),function(a){this.D.push(this.B.subscribe(a,g.ya(this.lN,a),this))},a)},Qva=function(a){(0,g.H)(a.D,function(a){this.B.unsubscribeByKey(a)},a);
a.D.length=0},N9=function(a,b){50>a.C.Ec()&&g.SB(a.C,b)},O9=function(a,b,c){var d=K9(a);
g.uI(d,c);-1E3!=d.g&&(d.g=b);M9(a,d)},L9=function(a,b,c){a.B.sendMessage(b,c)},M9=function(a,b){Qva(a);
a.B.setPlayerContextData(g.xI(b));Ova(a)},I9=function(a,b){a.A&&(a.A.removeUpdateListener(a.H),a.A.removeMediaListener(a.F),a.yk(null));
a.A=b;a.A&&(P9("Setting cast session: "+a.A.sessionId),a.A.addUpdateListener(a.H),a.A.addMediaListener(a.F),a.A.media.length&&a.yk(a.A.media[0]))},Rva=function(a){var b=a.o.media,c=a.o.customData;
if(b&&c){var d=K9(a);b.contentId!=d.videoId&&P9("Cast changing video to: "+b.contentId);d.videoId=b.contentId;d.g=c.playerState;g.uI(d,a.o.getEstimatedTime());M9(a,d)}else P9("No cast media video. Ignoring state update.")},P9=function(a){g.mH("CP",a)},Q9=function(a,b,c){return(0,g.A)(function(a){this.gc("Failed to "+b+" with cast v2 channel. Error code: "+a.code);
a.code!=window.chrome.cast.ErrorCode.TIMEOUT&&(this.gc("Retrying "+b+" using MDx browser channel."),L9(this,b,c))},a)},Sva=function(a){var b=!1;
m9()||(a=new g.mI(a),a.subscribe("yt-remote-cast2-availability-change",function(a){g.ZG("yt-remote-cast-available",a);g.uG("yt-remote-cast2-availability-change",a)}),a.subscribe("yt-remote-cast2-receiver-selected",function(a){l9("onReceiverSelected: "+a.friendlyName);
g.ZG("yt-remote-cast-receiver",a);g.uG("yt-remote-cast2-receiver-selected",a)}),a.subscribe("yt-remote-cast2-receiver-resumed",function(a){l9("onReceiverResumed: "+a.friendlyName);
g.ZG("yt-remote-cast-receiver",a)}),a.subscribe("yt-remote-cast2-session-change",function(a){l9("onSessionChange: "+g.uH(a));
a||g.aH("yt-remote-cast-receiver");g.uG("yt-remote-cast2-session-change",a)}),g.u("yt.mdx.remote.cloudview.instance_",a,void 0),b=!0);
l9("cloudview.createSingleton_: "+b);return b},Tva=function(){var a=0<=g.Gb.search(/\ (CrMo|Chrome|CriOS)\//);
return g.gF||a},R9=function(a,b){t9()?m9().setConnectedScreenStatus(a,b):v9("setConnectedScreenStatus called before ready.")},Uva=function(){l9("clearCurrentReceiver");
g.aH("yt-remote-cast-receiver")},Vva=function(){if(0<=window.navigator.userAgent.indexOf("CriOS")){var a=window.__gCrWeb&&window.__gCrWeb.message&&window.__gCrWeb.message.invokeOnHost;
if(a){Mva();a({command:"cast.sender.init"});return}}if(window.chrome)if(Mva(),a=window.navigator.userAgent,0<=a.indexOf("Android")&&0<=a.indexOf("Chrome/")&&window.navigator.presentation){var a="",b=g.Eh();55<=b?a="55":50<=b&&(a="50");g.Lh("//www.gstatic.com/eureka/clank"+a+g.Jh,g.Ih)}else g.Mh(0);else g.Ih()},Wva=function(a){a?(g.ZG("yt-remote-session-app",a.app),g.ZG("yt-remote-session-name",a.name)):(g.aH("yt-remote-session-app"),g.aH("yt-remote-session-name"));
g.u("yt.mdx.remote.channelParams_",a,void 0)},Xva=function(){var a=y9();
if(g.Tb(a)){var a=g.DH(),b=g.$G("yt-remote-session-name")||"",c=g.$G("yt-remote-session-app")||"",a={device:"REMOTE_CONTROL",id:a,name:b,app:c,"mdx-version":3};g.u("yt.mdx.remote.channelParams_",a,void 0)}},Yva=function(){var a=E9();
a?(F9("Resume connection to: "+g.uH(a)),D9(a,0)):(g.MH(),Uva(),F9("Skipping connecting because no session screen found."))},Zva=function(a){F9("remote.onCastSessionChange_: "+g.uH(a));
if(a){var b=B9();b&&b.id==a.id?R9(b.id,"YouTube TV"):(b&&H9(),D9(a,1))}else n9()&&H9()},$va=function(){var a=Nva(),b=B9();
b||(b=E9());return g.$a(a,function(a){return b&&g.rH(b,a.key)?!0:!1})},awa=function(){var a=g.$G("yt-remote-cast-receiver");
return a?a.friendlyName:null},bwa=function(a,b,c,d){Tva()?Sva(b)&&(s9(!0),window.chrome&&window.chrome.cast&&window.chrome.cast.isAvailable?Iva(a,c):(window.__onGCastApiAvailable=function(b,d){b?Iva(a,c):(v9("Failed to load cast API: "+d),u9(!1),s9(!1),g.aH("yt-remote-cast-available"),g.aH("yt-remote-cast-receiver"),Dva(),c(!1))},d?window.spf?window.spf.script.load("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js","",void 0):Kva():Vva())):l9("Cannot initialize because not running Chrome")},
cwa=function(a){this.port=this.A="";
this.g="/api/lounge";this.o=!0;a=a||window.document.location.href;var b=g.xg(a)||"";b&&(this.port=":"+b);this.A=g.wg(a)||"";a=g.Gb;0<=a.search("MSIE")&&(a=a.match(/MSIE ([\d.]+)/)[1],0>g.Qa(a,"10.0")&&(this.o=!1))},S9=function(){var a=$va();
!a&&w9()&&awa()&&(a={key:"cast-selector-receiver",name:awa()});return a},dwa=function(){var a=Nva();
w9()&&g.$G("yt-remote-cast-available")&&a.push({key:"cast-selector-receiver",name:"Cast..."});return a},ewa=function(a){var b={device:"Desktop",
app:"youtube-desktop"};g.XG&&yva();g.GH();C9||(C9=new cwa,g.OH()&&(C9.g="/api/loungedev"));z9||(z9=g.w("yt.mdx.remote.deferredProxies_")||[],g.u("yt.mdx.remote.deferredProxies_",z9,void 0));Xva();var c=r9();if(!c){var d=new g.ZH(C9);g.u("yt.mdx.remote.screenService_",d,void 0);c=r9();bwa(a,d,function(a){a?p9()&&R9(p9(),"YouTube TV"):d.subscribe("onlineScreenChange",function(){g.uG("yt-remote-receiver-availability-change")})},!(!b||!b.loadCastApiSetupScript))}b&&!g.w("yt.mdx.remote.initialized_")&&
(g.u("yt.mdx.remote.initialized_",!0,void 0),F9("Initializing: "+g.Lc(b)),T9.push(g.qG("yt-remote-cast2-availability-change",function(){g.uG("yt-remote-receiver-availability-change")})),T9.push(g.qG("yt-remote-cast2-receiver-selected",function(){o9(null);
g.uG("yt-remote-auto-connect","cast-selector-receiver")})),T9.push(g.qG("yt-remote-cast2-receiver-resumed",function(){g.uG("yt-remote-receiver-resumed","cast-selector-receiver")})),T9.push(g.qG("yt-remote-cast2-session-change",Zva)),T9.push(g.qG("yt-remote-connection-change",function(a){a?R9(p9(),"YouTube TV"):E9()||(R9(null,null),Uva())})),a=y9(),b.isAuto&&(a.id+="#dial"),g.iG("desktop_enable_autoplay")&&(a.capabilities=["atp"]),a.name=b.device,a.app=b.app,F9(" -- with channel params: "+g.Lc(a)),
Wva(a),c.start(),p9()||Yva())},U9=function(){w9()?m9()?t9()?(l9("Requesting cast selector."),m9().requestSession()):(l9("Wait for cast API to be ready to request the session."),x9.push(g.qG("yt-remote-cast2-api-ready",U9))):v9("requestCastSelector: Cast is not initialized."):v9("requestCastSelector: Cast API is not installed!")},V9=function(a,b,c){g.L.call(this);
this.H=a;this.W=b;b.addEventListener("onVolumeChange",this.An,this);b.addEventListener("onCaptionsTrackListChanged",this.wz,this);b.addEventListener("captionschanged",this.iz,this);b.addEventListener("captionssettingschanged",this.Hs,this);b.addEventListener("videoplayerreset",this.Bk,this);b.addEventListener("mdxautoplaycancel",this.fv,this);this.C=!1;this.g=c;c.subscribe("proxyStateChange",this.Hz,this);c.subscribe("remotePlayerChange",this.Ak,this);c.subscribe("remoteQueueChange",this.Bk,this);
c.subscribe("autoplayUpNext",this.gz,this);c.subscribe("previousNextChange",this.Ez,this);c.subscribe("nowAutoplaying",this.xz,this);c.subscribe("autoplayDismissed",this.fz,this);this.suggestion=null;this.D=new g.bR(64);this.o=new g.Nt(this.RA,500,this);g.M(this,this.o);this.A=new g.Nt(this.SA,1E3,this);g.M(this,this.A);this.B={};this.G=new g.Nt(this.fB,1E3,this);g.M(this,this.G);this.F=new g.sk(this.mS,1E3,this);g.M(this,this.F);this.J=g.y;this.Hs();this.Bk();this.Ak()},W9=function(a,b){var c=a.H,
d=a.W.ha().lengthSeconds;
c.H=b||0;c.g.U("progresssync",b,d)},fwa=function(a){W9(a,0);
a.o.stop();X9(a,new g.bR(64))},$9=function(a,b){if(Y9(a)&&!a.C){var c=null;
b&&(c={style:a.W.al()},g.$b(c,b));a.g.LA(Z9(a),c);a.B=K9(a.g).o}},a$=function(a,b){var c=a.W.Tf();
c?Pva(a.g,Z9(a),b,c.Qd(),c.listId.toString()):Pva(a.g,Z9(a),b);X9(a,new g.bR(1))},gwa=function(a,b){if(b){var c=a.W.Yc("captions","tracklist",{zx:1});
c&&c.length?(a.W.He("captions","track",b),a.C=!1):(a.W.Wk("captions"),a.C=!0)}else a.W.He("captions","track",{})},Y9=function(a){return K9(a.g).videoId==Z9(a)},Z9=function(a){return a.W.ha().videoId},X9=function(a,b){a.A.stop();
var c=a.D;if(!g.hR(c,b)){var d=g.W(b,2);if(d!=g.W(a.D,2)){var e=a.W;(e=g.nV(e.app,e.playerType||1))&&g.lU(e,d)}a.D=b;hwa(a.H,c,b)}},b$=function(a){g.X.call(this,{K:"div",
X:"ytp-remote",O:[{K:"div",X:"ytp-remote-display-status",O:[{K:"div",X:"ytp-remote-display-status-icon",O:[g.gE()]},{K:"div",X:"ytp-remote-display-status-text",O:["{{statustext}}"]}]}]});this.g=new g.aW(this,250);g.M(this,this.g);this.A=a;this.V(a,"presentingplayerstatechange",this.B);iwa(this,g.oV(a))},iwa=function(a,b){if(3==a.A.Za()){var c={RECEIVER_NAME:a.A.Yc("remote","currentReceiver").name},c=g.W(b,128)?g.U("YTP_MDX_STATUS_ERROR_2",c):b.ub()||g.W(b,4)?g.U("YTP_MDX_STATUS_PLAYING_2",c):g.U("YTP_MDX_STATUS_CONNECTED_2",
c);
a.Ca("statustext",c);a.g.show()}else g.cW(a.g)},c$=function(a){g.QV.call(this,a);
this.A={key:g.wH(),name:g.U("YTP_MDX_MY_COMPUTER")};this.C=null;this.D=[];this.J=this.o=null;this.G=[this.A];this.B=this.A;this.F=new g.bR(64);this.H=0;var b=g.hV(a).D;b&&(b=b.A&&b.A.g)&&(b=new j9(a,b),g.M(this,b));b=new b$(a);g.M(this,b);g.FV(a,b.element,5)},hwa=function(a,b,c){a.F=c;
a.g.U("presentingplayerstatechange",new g.dU(c,b))},d$=function(a,b){if(b.key!=a.B.key)if(b.key==a.A.key)H9();
else{a.B=b;var c;c=a.g.getPlaylistId();var d=a.g.ha().videoId;if(c||d){var e,f=a.g.Tf();if(f){e=[];for(var k=0;k<f.getLength();k++)e[k]=f.ac(k).videoId}else e=[a.g.ha().videoId];c={videoIds:e,listId:c,videoId:d,index:Math.max(a.g.BB(),0),currentTime:a.g.getCurrentTime()}}else c=null;F9("Connecting to: "+g.Lc(b));"cast-selector-receiver"==b.key?(o9(c||null),c=c||null,t9()?m9().setLaunchParams(c):v9("setLaunchParams called before ready.")):!c&&G9()&&p9()==b.key?g.uG("yt-remote-connection-change",!0):
(H9(),o9(c||null),c=r9().Sd(),(c=g.yH(c,b.key))&&D9(c,1))}};
g.p(j9,g.f1);j9.prototype.H=function(){var a=this.W.Yc("remote","receivers");a&&1<a.length&&!this.W.Yc("remote","quickCast")?(this.F=g.Cb(a,this.B,this),g.h1(this,(0,g.I)(a,this.B)),a=this.W.Yc("remote","currentReceiver"),g.g1(this,this.B(a)),this.enable(!0)):this.enable(!1)};
j9.prototype.B=function(a){return a.key};
j9.prototype.Me=function(a){return"cast-selector-receiver"==a?g.U("YTP_MDX_CAST_SELECTOR"):this.F[a].name};
j9.prototype.gd=function(a){g.f1.prototype.gd.call(this,a);this.W.He("remote","currentReceiver",this.F[a]);this.A.Wb()};
g.C(k9,g.zH);g.h=k9.prototype;g.h.Sd=function(a){return this.Vc.$_gs(a)};
g.h.contains=function(a){return!!this.Vc.$_c(a)};
g.h.get=function(a){return this.Vc.$_g(a)};
g.h.start=function(){this.Vc.$_st()};
g.h.uo=function(a,b,c){this.Vc.$_a(a,b,c)};
g.h.remove=function(a,b,c){this.Vc.$_r(a,b,c)};
g.h.ho=function(a,b,c,d){this.Vc.$_un(a,b,c,d)};
g.h.P=function(){for(var a=0,b=this.o.length;a<b;++a)this.Vc.$_ubk(this.o[a]);this.o.length=0;this.Vc=null;k9.R.P.call(this)};
g.h.vQ=function(){this.U("screenChange")};
g.h.QM=function(){this.U("onlineScreenChange")};
var q9=null,x9=[],z9=null,C9=null;g.C(J9,g.cG);g.h=J9.prototype;g.h.play=function(){1==this.g?(this.o?this.o.play(null,g.y,Q9(this,"play")):L9(this,"play"),O9(this,1,g.vI(K9(this))),this.U("remotePlayerChange")):N9(this,this.play)};
g.h.pause=function(){1==this.g?(this.o?this.o.pause(null,g.y,Q9(this,"pause")):L9(this,"pause"),O9(this,2,g.vI(K9(this))),this.U("remotePlayerChange")):N9(this,this.pause)};
g.h.pB=function(a){if(1==this.g){if(this.o){var b=K9(this),c=new window.chrome.cast.media.SeekRequest;c.currentTime=a;c.resumeState=b.ub()||3==b.g?window.chrome.cast.media.ResumeState.PLAYBACK_START:window.chrome.cast.media.ResumeState.PLAYBACK_PAUSE;this.o.seek(c,g.y,Q9(this,"seekTo",{newTime:a}))}else L9(this,"seekTo",{newTime:a});O9(this,3,a);this.U("remotePlayerChange")}else N9(this,g.ya(this.pB,a))};
g.h.stop=function(){if(1==this.g){this.o?this.o.stop(null,g.y,Q9(this,"stopVideo")):L9(this,"stopVideo");var a=K9(this);a.index=-1;a.videoId="";g.tI(a);M9(this,a);this.U("remotePlayerChange")}else N9(this,this.stop)};
g.h.setVolume=function(a,b){if(1==this.g){var c=K9(this);if(this.A){if(c.volume!=a){var d=Math.round(a)/100;this.A.setReceiverVolumeLevel(d,(0,g.A)(function(){P9("set receiver volume: "+d)},this),(0,g.A)(function(){this.gc("failed to set receiver volume.")},this))}c.muted!=b&&this.A.setReceiverMuted(b,(0,g.A)(function(){P9("set receiver muted: "+b)},this),(0,g.A)(function(){this.gc("failed to set receiver muted.")},this))}else{var e={volume:a,
muted:b};-1!=c.volume&&(e.delta=a-c.volume);L9(this,"setVolume",e)}c.muted=b;c.volume=a;M9(this,c)}else N9(this,g.ya(this.setVolume,a,b))};
g.h.LA=function(a,b){if(1==this.g){var c=K9(this),d={videoId:a};b&&(c.o={trackName:b.name,languageCode:b.languageCode,sourceLanguageCode:b.translationLanguage?b.translationLanguage.languageCode:"",languageName:b.languageName,format:b.format,kind:b.kind},d.style=g.Lc(b.style),g.$b(d,c.o));L9(this,"setSubtitlesTrack",d);M9(this,c)}else N9(this,g.ya(this.LA,a,b))};
g.h.vt=function(a,b){if(1==this.g){L9(this,"setAudioTrack",{videoId:a,audioTrackId:b.Lc.id});var c=K9(this);c.audioTrackId=b.Lc.id;M9(this,c)}else N9(this,g.ya(this.vt,a,b))};
g.h.oB=function(a,b){if(1==this.g){if(a&&b){var c=K9(this);g.wI(c,a,b);M9(this,c)}L9(this,"previous")}else N9(this,g.ya(this.oB,a,b))};
g.h.nB=function(a,b){if(1==this.g){if(a&&b){var c=K9(this);g.wI(c,a,b);M9(this,c)}L9(this,"next")}else N9(this,g.ya(this.nB,a,b))};
g.h.Uv=function(){1==this.g?L9(this,"dismissAutoplay"):N9(this,this.Uv)};
g.h.dispose=function(){if(3!=this.g){var a=this.g;this.g=3;this.U("proxyStateChange",a,this.g)}J9.R.dispose.call(this)};
g.h.P=function(){Qva(this);this.B=null;this.C.clear();I9(this,null);J9.R.P.call(this)};
g.h.wt=function(a){if((a!=this.g||2==a)&&3!=this.g&&0!=a){var b=this.g;this.g=a;this.U("proxyStateChange",b,a);if(1==a)for(;!this.C.isEmpty();)g.TB(this.C).apply(this);else 3==a&&this.dispose()}};
g.h.lN=function(a,b){this.U(a,b)};
g.h.XK=function(a){if(!a)this.yk(null),I9(this,null);else if(this.A.receiver.volume){a=this.A.receiver.volume;var b=K9(this),c=Math.round(100*a.level||0);if(b.volume!=c||b.muted!=a.muted)P9("Cast volume update: "+a.level+(a.muted?" muted":"")),b.volume=c,b.muted=!!a.muted,M9(this,b)}};
g.h.yk=function(a){P9("Cast media: "+!!a);this.o&&this.o.removeUpdateListener(this.G);if(this.o=a)this.o.addUpdateListener(this.G),Rva(this),this.U("remotePlayerChange")};
g.h.WK=function(a){a?(Rva(this),this.U("remotePlayerChange")):this.yk(null)};
g.h.kL=function(){var a=Jva();a&&I9(this,a)};
g.h.gc=function(a){g.mH("CP",a)};
var T9=[];g.h=cwa.prototype;g.h.Gh=function(a,b,c){var d=this.g;if(g.t(c)?c:this.o)d="https://"+this.A+this.port+this.g;return g.Gg(d+a,b||{})};
g.h.ut=function(a,b,c,d){c={format:"JSON",method:"POST",context:this,timeout:5E3,withCredentials:!1,Kb:g.ya(this.qQ,c,!0),onError:g.ya(this.pQ,d),Wc:g.ya(this.rQ,d)};b&&(c.Qb=b,c.headers={"Content-Type":"application/x-www-form-urlencoded"});return g.XE(a,c)};
g.h.qQ=function(a,b,c,d){b?a(d):a({text:c.responseText})};
g.h.pQ=function(a,b){a(Error("Request error: "+b.status))};
g.h.rQ=function(a){a(Error("request timed out"))};
g.C(V9,g.L);g.h=V9.prototype;
g.h.P=function(){V9.R.P.call(this);this.o.stop();this.A.stop();this.J();this.W.removeEventListener("onVolumeChange",this.An,this);this.W.removeEventListener("onCaptionsTrackListChanged",this.wz,this);this.W.removeEventListener("captionschanged",this.iz,this);this.W.removeEventListener("videoplayerreset",this.Bk,this);this.W.removeEventListener("captionssettingschanged",this.Hs,this);this.W.removeEventListener("mdxautoplaycancel",this.fv,this);this.g.unsubscribe("proxyStateChange",this.Hz,this);this.g.unsubscribe("remotePlayerChange",
this.Ak,this);this.g.unsubscribe("remoteQueueChange",this.Bk,this);this.g.unsubscribe("autoplayUpNext",this.gz,this);this.g.unsubscribe("previousNextChange",this.Ez,this);this.g.unsubscribe("nowAutoplaying",this.xz,this);this.g.unsubscribe("autoplayDismissed",this.fz,this);this.g=this.H=null};
g.h.cC=function(a,b){2==this.g.g||(Y9(this)?this.GG.apply(this,arguments):this.CG.apply(this,arguments))};
g.h.iz=function(a){this.cC("control_subtitles_set_track",g.Tb(a)?null:a)};
g.h.Hs=function(){var a=this.W.Yc("captions","track");g.Tb(a)||$9(this,a)};
g.h.CG=function(a,b){var c=Array.prototype.slice.call(arguments,1);switch(a){case "control_toggle_play_pause":case "control_play":case "control_pause":a$(this,this.W.getCurrentTime());break;case "control_seek":a$(this,c[0]);break;case "control_subtitles_set_track":$9(this,c[0]);break;case "control_set_audio_track":c=c[0],Y9(this)&&this.g.vt(Z9(this),c)}};
g.h.GG=function(a,b){if(1081!=K9(this.g).g||"control_seek"!=a){var c=Array.prototype.slice.call(arguments,1);switch(a){case "control_toggle_play_pause":K9(this.g).ub()?this.g.pause():this.g.play();break;case "control_play":this.g.play();break;case "control_pause":this.g.pause();break;case "control_seek":this.F.Li(c[0],c[1]);break;case "control_subtitles_set_track":$9(this,c[0]);break;case "control_set_audio_track":c=c[0],Y9(this)&&this.g.vt(Z9(this),c)}}};
g.h.An=function(a){if(Y9(this)){this.g.unsubscribe("remotePlayerChange",this.Ak,this);var b=Math.round(a.volume);a=!!a.muted;var c=K9(this.g);if(b!=c.volume||a!=c.muted)this.g.setVolume(b,a),this.G.start();this.g.subscribe("remotePlayerChange",this.Ak,this)}};
g.h.wz=function(){g.Tb(this.B)||gwa(this,this.B);this.C=!1};
g.h.Hz=function(a,b){this.A.stop();2==b&&this.SA()};
g.h.Ak=function(){if(Y9(this)){this.o.stop();var a=K9(this.g);switch(a.g){case 1081:X9(this,new g.bR(8));break;case 1:this.RA();X9(this,new g.bR(8));break;case 1083:case 3:X9(this,new g.bR(9));break;case 0:X9(this,new g.bR(2));this.F.stop();W9(this,this.W.ha().lengthSeconds);break;case 1082:X9(this,new g.bR(4));break;case 2:X9(this,new g.bR(4));W9(this,g.vI(a));break;case -1:X9(this,new g.bR(64));break;case -1E3:a={errorCode:"mdx.remoteerror",message:g.U("YTP_MDX_PLAYER_ERROR")},X9(this,new g.bR(128,
a))}var a=K9(this.g).o,b=this.B;(a||b?a&&b&&a.trackName==b.trackName&&a.languageCode==b.languageCode&&a.languageName==b.languageName&&a.format==b.format&&a.kind==b.kind:1)||(this.B=a,gwa(this,a));a=K9(this.g);-1==a.volume||Math.round(this.W.getVolume())==a.volume&&this.W.Fe()==a.muted||this.G.isActive()||this.fB()}else fwa(this)};
g.h.Ez=function(){this.W.U("mdxpreviousnextchange")};
g.h.Bk=function(){Y9(this)||fwa(this)};
g.h.fv=function(){this.g.Uv()};
g.h.gz=function(a){a&&(a=g.XE("/watch_queue_ajax",{method:"GET",Pc:{action_get_watch_queue_item:1,video_id:a},Kb:(0,g.A)(this.mO,this)}))&&(this.J=(0,g.A)(a.abort,a))};
g.h.mO=function(a,b){var c=new g.tQ({videoId:b.videoId,title:b.title,author:b.author,murlmq_webp:b.url});this.suggestion=c;this.W.U("mdxautoplayupnext",c)};
g.h.xz=function(a){(0,window.isNaN)(a)||this.W.U("mdxnowautoplaying",a)};
g.h.fz=function(){this.W.U("mdxautoplaycanceled")};
g.h.mS=function(a,b){-1==K9(this.g).g?a$(this,a):b&&this.g.pB(a)};
g.h.fB=function(){if(Y9(this)){var a=K9(this.g);this.W.removeEventListener("onVolumeChange",this.An,this);a.muted?this.W.mute():this.W.wg();this.W.setVolume(a.volume);this.W.addEventListener("onVolumeChange",this.An,this)}};
g.h.RA=function(){this.o.stop();if(!this.g.ma()){var a=K9(this.g);a.ub()&&X9(this,new g.bR(8));W9(this,g.vI(a));this.o.start()}};
g.h.SA=function(){this.A.stop();this.o.stop();var a=this.g.B.getReconnectTimeout();2==this.g.g&&!(0,window.isNaN)(a)&&this.A.start()};g.p(b$,g.X);b$.prototype.B=function(a){iwa(this,a.state)};g.C(c$,g.QV);g.h=c$.prototype;g.h.create=function(){ewa("embedded"==g.Y(this.g).g);this.D.push(g.qG("yt-remote-before-disconnect",this.TK,this));this.D.push(g.qG("yt-remote-connection-change",this.vN,this));this.D.push(g.qG("yt-remote-receiver-availability-change",this.Fz,this));this.D.push(g.qG("yt-remote-auto-connect",this.tN,this));this.D.push(g.qG("yt-remote-receiver-resumed",this.sN,this));this.Fz()};
g.h.load=function(){this.g.Fp();c$.R.load.call(this);this.C=new V9(this,this.g,this.o);var a;a=(a=Hva())?a.currentTime:0;var b=G9()?new J9(n9(),void 0):null;0==a&&b&&(a=g.vI(K9(b)));0!=a&&(this.H=a||0,this.g.U("progresssync",a,void 0));hwa(this,this.F,this.F);g.w2(this.g.app,6)};
g.h.unload=function(){this.g.U("mdxautoplaycanceled");this.B=this.A;g.Ue(this.C,this.o);this.o=this.C=null;c$.R.unload.call(this);g.w2(this.g.app,5)};
g.h.P=function(){g.rG(this.D);c$.R.P.call(this)};
g.h.fl=function(a,b){this.loaded&&this.C.cC.apply(this.C,arguments)};
g.h.hG=function(){return this.loaded?this.C.suggestion:null};
g.h.yf=function(){return this.o?K9(this.o).yf:!1};
g.h.hasNext=function(){return this.o?K9(this.o).hasNext:!1};
g.h.getCurrentTime=function(){return this.H};
g.h.RR=function(){var a=K9(this.o),b=this.g.ha(),c=this.g.Cd(),d=b.clipEnd,b=b.clipStart,e=this.getCurrentTime(),f=a.getDuration(),k;k=a.H?a.B+((0,g.G)()-a.A)/1E3:a.B;var l=1>=xva(a)-this.getCurrentTime(),m=a.J,n=xva(a),a=0<a.C?a.C+((0,g.G)()-a.A)/1E3:a.C;return{allowSeeking:c,clipEnd:d,clipStart:b,current:e,displayedStart:-1,duration:f,ingestionTime:k,isPeggedToLive:l,loaded:m,seekableEnd:n,seekableStart:a}};
g.h.SR=function(){this.o&&this.o.nB()};
g.h.TR=function(){this.o&&this.o.oB()};
g.h.TK=function(a){1==a&&(this.J=this.o?K9(this.o):null)};
g.h.vN=function(){var a=G9()?new J9(n9(),void 0):null;if(a){var b=this.B;this.loaded&&this.unload();this.o=a;this.J=null;b.key!=this.A.key&&(this.B=b,this.load())}else g.Te(this.o),this.o=null,this.loaded&&(this.unload(),(a=this.J)&&a.videoId==this.g.ha().videoId&&this.g.yB(a.videoId,g.vI(a)));this.g.U("videodatachange","newdata",this.g.ha(),3)};
g.h.Fz=function(){this.G=[this.A].concat(dwa());var a=S9()||this.A;d$(this,a);this.g.ya("onMdxReceiversChange")};
g.h.tN=function(){var a=S9();d$(this,a)};
g.h.sN=function(){this.B=S9()};
g.h.QR=function(a,b){switch(a){case "casting":return this.loaded;case "receivers":return this.G;case "currentReceiver":return b&&("cast-selector-receiver"==b.key?U9():d$(this,b)),this.loaded?this.B:this.A;case "quickCast":return 2==this.G.length&&"cast-selector-receiver"==this.G[1].key?(b&&U9(),!0):!1}};
g.h.UR=function(){L9(this.o,"sendDebugCommand",{debugCommand:"stats4nerds "})};
g.h.Hd=function(){return!1};window._exportCheck==g.Aa&&g.u("ytmod.player.remote",c$,void 0);})(_yt_player);
