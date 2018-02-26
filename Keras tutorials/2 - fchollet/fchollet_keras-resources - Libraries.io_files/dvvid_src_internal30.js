function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null) {
                return errorsArr;
            }
            else {
                var debugInfo = handler.onFailure();
                if (debugInfo) {
                    for (var key in debugInfo) {
                        if (debugInfo.hasOwnProperty(key)) {
                            if (debugInfo[key] !== undefined || debugInfo[key] !== null) {
                                errorObj[key] = encodeURIComponent(debugInfo[key]);
                            }
                        }
                    }
                }
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    };

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            handler.handle();
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.tagParamsObj : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, tagParamsObj) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (url) {
            errorObj['dvp_jsErrUrl'] = url;
        }
        if (tagParamsObj){
            errorObj['dvp_cmp'] = tagParamsObj['cmp'];
            errorObj['dvp_ctx'] = tagParamsObj['ctx'];
        }
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) { 
                isEvaluationVersionChosen = true;
            }
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable()) {
            return handlersArray[index].handler;
        }
        else {
            return null;
        }
    }    
}

function getCurrentTime() {
    "use strict";
    if (Date.now) {
        return Date.now();
    }
    return (new Date()).getTime();
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(url);
    if (results == null) {
        return null;
    }
    else {
        return results[1];
    }
}

function dv_GetKeyValue(url) {
    var keyReg = new RegExp(".*=");
    var keyRet = url.match(keyReg)[0];
    keyRet = keyRet.replace("=", "");

    var valReg = new RegExp("=.*");
    var valRet = url.match(valReg)[0];
    valRet = valRet.replace("=", "");

    return { key: keyRet, value: valRet };
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url, prefix) {
    try {
        prefix = (prefix != undefined && prefix != null) ? prefix : 'dvp';
        var regex = new RegExp("[\\?&](" + prefix + "_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = [];
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp = dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
    for (var key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            } else {
                var params = ['ctx', 'cmp', 'plc', 'sid'];
                for (var i = 0; i < params.length; i++) {
                    var pvalue = dv_GetParam(errorObj[key], params[i]);
                    if (pvalue) {
                        errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                    }
                }
            }
        }
    }

    var windowProtocol = 'http:';
    var sslFlag = '&ssl=0';
    if (window._dv_win.location.protocol === 'https:') {
        windowProtocol = 'https:';
        sslFlag = '&ssl=1';
    }

    var errorImp = windowProtocol + '/'+'/' + serverUrl + sslFlag + errorQueryString;
    return errorImp;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj) {
            return obj[propName];
        }
    } catch (e) { }
}


function dv_handler30(){function K(){this.clientWidth=this.clientHeight=-1;this.error="";this.focus=null;this.id="";this.geometrySupported=null;this.technique=this.domViewabilityState=this.cssViewabilityState=this.geometryViewabilityState="";this.percentViewable=this.objTop=this.objRight=this.objLeft=this.objBottom=-1;this.percentObscured=0;this.viewabilityState="";this.interval=200}function L(a){this.id=a;this.isIdGenerated=!1;this.player=null}a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||
{};a.html5.video.partnerWrappers=function(a){function b(){function a(b,c,f){try{return b instanceof f[c]?!0:f.parent!=f?a(b,c,f.parent):!1}catch(e){return!1}}var b;this.init=function(a){if(a.beforeAdLoadCallback)a=j[a.beforeAdLoadCallback]();else{var f;try{f=window.$ovv||window.parent.$ovv}catch(g){}if(!f)throw{message:"OVV does not exist or beforeAdLoadCallback is Empty"};if(a.adImpressionCB)j[a.adImpressionCB](a.dvvidVersion);if(a.adAsset.isIdGenerated)throw{message:"OVV adID does not exist"};var a=
a.adID,d=new c(a);f.subscribe("AdSkippableStateChange AdSkipped AdUserClose AdStarted AdImpression AdVideoStart AdStopped AdVideoFirstQuartile AdVideoMidpoint AdVideoThirdQuartile AdVideoComplete AdExpandedChange AdPaused AdPlaying AdVolumeChange AdClickThru".split(" "),a,function(b,a){try{"AdVolumeChange"==a.eventName&&(a.ovvArgs&&void 0!=a.ovvArgs.ovvData.volume)&&d.setAdVolume(a.ovvArgs.ovvData.volume),d.Event(a.eventName)}catch(c){}},!0);a=d}if(!a)throw{message:"init VPAIDObject failed"};b=a};
this.getPrevEvents=function(){return b.getPreviousEvents?"function"===typeof b.getPreviousEvents?b.getPreviousEvents():b.getPreviousEvents:[]};this.getPlayer=function(){var b;b="function"===typeof this.getVPAIDObject().getPlayer?this.getVPAIDObject().getPlayer():this.getVPAIDObject().getPlayer;a(b,"HTMLElement",window)||(b=this.getVPAIDObject().getSlot());return b};this.registerEventCallback=function(a){"function"===typeof b.executeDVClientCallback&&(a.executeCB=b.executeDVClientCallback)};this.getAdVolume=
function(){return b.getAdVolume()};this.subscribeToVpaidEvents=function(a){b.subscribe(a("AdLoaded"),"AdLoaded");b.subscribe(a("AdImpression"),"AdImpression");b.subscribe(a("AdStopped"),"AdStopped");b.subscribe(a("AdError"),"AdError");b.subscribe(a("AdStarted"),"AdStarted");b.subscribe(a("AdSkipped"),"AdSkipped");b.subscribe(a("AdPaused"),"AdPaused");b.subscribe(a("AdSizeChange"),"AdSizeChange");b.subscribe(a("AdPlaying"),"AdPlaying");b.subscribe(a("AdExpandedChange"),"AdExpandedChange");b.subscribe(a("AdSkippableStateChange"),
"AdSkippableStateChange");b.subscribe(a("AdLinearChange"),"AdLinearChange");b.subscribe(a("AdVideoStart"),"AdVideoStart");b.subscribe(a("AdUserAcceptInvitation"),"AdUserAcceptInvitation");b.subscribe(a("AdUserClose"),"AdUserClose");b.subscribe(a("AdUserMinimize"),"AdUserMinimize");b.subscribe(a("AdClickThru"),"AdClickThru");b.subscribe(a("AdInteraction"),"AdInteraction");b.subscribe(a("AdDurationChange"),"AdDurationChange");b.subscribe(a("AdRemainingTimeChange"),"AdRemainingTimeChange");b.subscribe(a("AdVolumeChange"),
"AdVolumeChange");b.subscribe(a("AdVideoFirstQuartile"),"AdVideoFirstQuartile");b.subscribe(a("AdVideoMidpoint"),"AdVideoMidpoint");b.subscribe(a("AdVideoThirdQuartile"),"AdVideoThirdQuartile");b.subscribe(a("AdVideoComplete"),"AdVideoComplete")};this.getVPAIDObject=function(){return b}}function c(a){var b=[],c={},f,j;a:{try{for(var d=window.document.getElementsByTagName("embed"),k=0;k<d.length;k++)if(d[k][a]||d[k]["onJsReady"+a]){j=d[k];break a}for(var x=window.document.getElementsByTagName("object"),
k=0;k<x.length;k++)if(x[k][a]||x[k]["onJsReady"+a]){j=x[k];break a}}catch(w){}j=void 0}if(!j)throw{message:"Cannot find OVV player"};this.Event=function(a){b.push(a);if(c[a])for(var f in c[a])c[a][f]()};this.getPlayer=function(){return j};this.getSlot=function(){return j};this.getPreviousEvents=function(){return b};this.getAdVolume=function(){return f};this.setAdVolume=function(a){f=a};this.subscribe=function(a,b){c[b]?c[b].push(a):c[b]=[a];return!0}}var j=a||window;this.getVpaidWrapper=function(){return new b}};
var s;if(!(s=this&&this.__extends)){var M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};s=function(a,b){function c(){this.constructor=a}M(a,b);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}var a,d=a||(a={}),d=d.engagement||(d.engagement={}),d=d.autoPlay||(d.autoPlay={}),I,p=I=d.videoPlayModeEnum||(d.videoPlayModeEnum={});p[p.Unknown=0]="Unknown";p[p.Auto=1]="Auto";p[p.Manual=
2]="Manual";p=d.autoPlayMethodIndicatorIndex||(d.autoPlayMethodIndicatorIndex={});p[p.Element=1]="Element";p[p.JWPlayer=2]="JWPlayer";p[p.Timing=4]="Timing";p=function(a){this.currWin=a};p.prototype.getVideoPlayMode=function(){return I.Unknown};d.BaseDetectionMethod=p;var d=a||(a={}),d=d.engagement||(d.engagement={}),z=d.autoPlay||(d.autoPlay={}),D=z.BaseDetectionMethod,d=function(){return null!==D&&D.apply(this,arguments)||this};s(d,D);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return z.autoPlayMethodIndicatorIndex.Element};
d.prototype.getVideoPlayMode=function(a){return a.player&&a.player.autoplay?!0==a.player.autoplay?z.videoPlayModeEnum.Auto:z.videoPlayModeEnum.Manual:z.videoPlayModeEnum.Unknown};z.ElementDetectionMethod=d;var d=a||(a={}),d=d.engagement||(d.engagement={}),F=d.autoPlay||(d.autoPlay={}),G=F.BaseDetectionMethod,d=function(){return null!==G&&G.apply(this,arguments)||this};s(d,G);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return F.autoPlayMethodIndicatorIndex.JWPlayer};F.JWPlayerDetectionMethod=
d;var d=a||(a={}),d=d.engagement||(d.engagement={}),A=d.autoPlay||(d.autoPlay={}),H=A.BaseDetectionMethod,d=function(){var a=null!==H&&H.apply(this,arguments)||this;a.adImpressionEventTimeTreshold=4E3;return a};s(d,H);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return A.autoPlayMethodIndicatorIndex.Timing};d.prototype.getVideoPlayMode=function(){return $dvvideo.scenarioType===$dvvideo.servingScenarioEnum.CrossDomainIframe?A.videoPlayModeEnum.Unknown:this.currWin?(Date.now?Date.now():(new Date).getTime())-
this.currWin.performance.timing.loadEventEnd<=this.adImpressionEventTimeTreshold?A.videoPlayModeEnum.Auto:A.videoPlayModeEnum.Manual:A.videoPlayModeEnum.Unknown};A.TimingDetectionMethod=d;s=a||(a={});s=s.engagement||(s.engagement={});var J=s.autoPlay||(s.autoPlay={});s=function(a){this.autoPlayDetectors=a};s.prototype.getAutoPlayResult=function(a){var b={indicator:0},c;for(c in this.autoPlayDetectors)try{if(this.autoPlayDetectors[c]){var j=this.autoPlayDetectors[c];j.getVideoPlayMode(a)===J.videoPlayModeEnum.Auto&&
(b.indicator|=j.getAutoPlayMethodIndicatorIndex())}}catch(g){b.error=g}return b};J.AutoPlayCalculator=s;a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.api=function(a){var b=a||window,c=[],j=[];this.assets=[];this.buildVersion=this.releaseVersion="html5";this.interval=200;this.userAgent=navigator.userAgent;a=new function(a){for(var b={IE:1,Firefox:2,Chrome:3,Opera:4,safari:5},c={Unknown:0,Windows:1,iOS:2},j=[{id:4,name:"Opera",brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},
{id:1,name:"MSIE",brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7",verRegex:"(MSIE |rv:)"},{id:1,name:"Edge",brRegex:"Edge",verRegex:"Edge/"},{id:2,name:"Firefox",brRegex:"Firefox",verRegex:"Firefox/"},{id:3,name:"Chrome",brRegex:"Chrome",verRegex:"Chrome/"},{id:5,name:"Safari",brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],f=[{id:1,name:"Windows",brRegex:"(Windows NT )[0-9\\.]*"},{id:2,name:"iOS",brRegex:"(iPhone |i)OS [0-9\\.]*"}],g={ID:0,name:"",version:"",osId:0,osVersion:""},
d=0;d<j.length;d++)if(null!=a.match(RegExp(j[d].brRegex))){g.ID=j[d].id;g.name=j[d].name;if(null==j[d].verRegex)break;var w=a.match(RegExp(j[d].verRegex+"[0-9]*"));null!=w&&(d=w[0].match(RegExp(j[d].verRegex)),g.version=w[0].replace(d[0],""));break}for(d=0;d<f.length;d++)if(w=a.match(RegExp(f[d].brRegex)),null!=w){g.osId=f[d].id;a=w[0]?w[0].split(" "):[0];g.osVersion=a[a.length-1];break}this.getBrowser=function(){return g};this.getBrowserIDEnum=function(){return b};this.getOsIDEnum=function(){return c}}(this.userAgent);
this.browser=a.getBrowser();this.browserIDEnum=a.getBrowserIDEnum();this.osIDEnum=a.getOsIDEnum();this.servingScenarioEnum={OnPage:1,SameDomainIframe:2,CrossDomainIframe:128};this.scenarioType=function(a){try{if(b.top==b)return a.OnPage;for(var c=b,j=0;c.parent!=c&&300>j;){if(c.parent.document.domain!=c.document.domain)return a.CrossDomainIframe;c=c.parent;j++}return a.SameDomainIframe}catch(f){}return a.CrossDomainIframe}(this.servingScenarioEnum);this.subscribe=function(a,b,f,d){if(d)for(var r in c[b]){if(d=
c[b][r])a:{for(d=0;d<a.length;d++)if(a[d]===c[b][r].eventName){d=!0;break a}d=!1}d&&g(function(){f(b,c[b][r])})}for(r in a)j[a[r]+b]||(j[a[r]+b]=[]),j[a[r]+b].push({Func:f})};this.publish=function(a,b,f){var d;d=Date.now?Date.now():(new Date).getTime();var r={eventName:a,eventTime:d,ovvArgs:f};c[b]||(c[b]=[]);1E3>c[b].length&&c[b].push(r);if(a&&b&&j[a+b]instanceof Array)for(f=0;f<j[a+b].length;f++){var k=j[a+b][f];k&&(k.Func&&"function"===typeof k.Func)&&g(function(){k.Func(b,r)})}};this.getAllReceivedEvents=
function(a){return c[a]};var g=function(a){try{var b=a();return void 0!==b?b:!0}catch(c){return!1}}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.base=function(){this.technique="geometry";this.getAssetViewablePercentage=function(a,b){var c=0,j=0,d=a.right-a.left,e=a.bottom-a.top;if(0>a.bottom||0>a.right||a.top>b.height||a.left>b.width||0>=d||0>=e)return 0;0>a.top?(c=e+a.top,c>b.height&&(c=b.height)):c=a.top+e>b.height?b.height-
a.top:e;0>a.left?(j=d+a.left,j>b.width&&(j=b.width)):j=a.left+d>b.width?b.width-a.left:d;return Math.round(100*(j*c/(d*e)))};this.initialize=function(){};this.isSupported=function(){}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.standard=function(){a.html5.video.calc.base.call(this);var d=function(a,c){var j=c.parent,g={left:0,right:0,top:0,bottom:0};if(a){var e=a.getBoundingClientRect();c!=j&&(g=d(c.frameElement,j));g={left:e.left+
g.left,right:e.right+g.left,top:e.top+g.top,bottom:e.bottom+g.top}}return g};this.getViewPortSize=function(a){var c={width:Infinity,height:Infinity,area:Infinity},a=a.ownerDocument.defaultView.top;!isNaN(a.document.body.clientWidth)&&0<a.document.body.clientWidth&&(c.width=a.document.body.clientWidth);!isNaN(a.document.body.clientHeight)&&0<a.document.body.clientHeight&&(c.height=a.document.body.clientHeight);a.document.documentElement&&(a.document.documentElement.clientWidth&&!isNaN(a.document.documentElement.clientWidth))&&
(c.width=a.document.documentElement.clientWidth);a.document.documentElement&&(a.document.documentElement.clientHeight&&!isNaN(a.document.documentElement.clientHeight))&&(c.height=a.document.documentElement.clientHeight);a.innerWidth&&!isNaN(a.innerWidth)&&(c.width=Math.min(c.width,a.innerWidth));a.innerHeight&&!isNaN(a.innerHeight)&&(c.height=Math.min(c.height,a.innerHeight));c.area=c.height*c.width;return c};this.getAssetVisibleDimension=function(a){var c=function(a,b){var e=b.parent,l={width:0,
height:0,left:0,right:0,top:0,bottom:0};a&&(l=d(a,b),l.width=l.right-l.left,l.height=l.bottom-l.top,b!=e&&(e=c(b.frameElement,e),e.bottom<l.bottom&&(e.bottom<l.top&&(l.top=e.bottom),l.bottom=e.bottom),e.right<l.right&&(e.right<l.left&&(l.left=e.right),l.right=e.right),l.width=l.right-l.left,l.height=l.bottom-l.top));return l};return c(a,a.ownerDocument.defaultView)};this.isSupported=function(){return $dvvideo.scenarioType!=$dvvideo.servingScenarioEnum.CrossDomainIframe}};a=a||{};a.html5=a.html5||
{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.crossDomainIE=function(){a.html5.video.calc.base.call(this);this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a,b){var c=b.screenLeft-b.screenX,d=b.screenTop-b.screenY,g=a.getBoundingClientRect();return assetSize={left:c,top:d,right:c+g.width,bottom:d+g.height,width:g.width,height:g.height}};this.isSupported=function(){return $dvvideo.scenarioType==
$dvvideo.servingScenarioEnum.CrossDomainIframe&&$dvvideo.browser.ID==$dvvideo.browserIDEnum.IE}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.crossDomainFirefox=function(){a.html5.video.calc.base.call(this);this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a,b){var c=1,d=a.getBoundingClientRect();b.devicePixelRatio&&(c=b.devicePixelRatio);
var g=b.mozInnerScreenX/c-b.screenX,c=b.mozInnerScreenY/c-b.screenY;return assetSize={left:g,top:c,right:g+d.width,bottom:c+d.height,width:d.width,height:d.height}};this.isSupported=function(){return $dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe&&$dvvideo.browser.ID==$dvvideo.browserIDEnum.Firefox}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.safeframeGeometric=function(){a.html5.video.calc.base.call(this);
var d;this.technique="safeframegeom";this.initialize=function(){};this.getViewPortSize=function(){var a=d.ext.geom(),c=parseInt(a.win.h),a=parseInt(a.win.w);return{width:a,height:c,area:a*c}};this.getAssetVisibleDimension=function(a){var c={width:0,height:0,left:0,right:0,top:0,bottom:0};d.ext.geom&&d.ext.geom().par?(a=d.ext.geom(),c.width=parseInt(a.self.w),c.height=parseInt(a.self.h),c.top=parseInt(a.self.t)-parseInt(a.par.t),c.bottom=c.top+c.height,c.left=parseInt(a.self.l)-parseInt(a.par.l),c.right=
c.left+c.width):(a=a.getBoundingClientRect(),c.width=a.width,c.height=a.height);return c};this.isSupported=function(a){var c;if(c=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe)a:{if(a.$sf&&(a.$sf.ext&&a.$sf.ext.geom)&&(c=a.$sf.ext.geom(),null!=c&&c.win&&(0<c.win.h||0<c.win.w))){d=a.$sf;c=!0;break a}c=!1}return c}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.safeframeInviewPercentage=function(){var a;
this.technique="safeframeinviewperc";this.initialize=function(){};this.getAssetViewablePercentage=function(){return a.ext.inViewPercentage?a.ext.inViewPercentage():0};this.getViewPortSize=function(b,c){var d=c.outerWidth,g=c.outerHeight;a.ext.geom&&(d=a.ext.geom(),g=parseInt(d.win.h),d=parseInt(d.win.w));return{width:d,height:g,area:d*g}};this.getAssetVisibleDimension=function(){return{width:0,height:0,left:0,right:0,top:0,bottom:0}};this.isSupported=function(b){var c;if(c=$dvvideo.scenarioType==
$dvvideo.servingScenarioEnum.CrossDomainIframe)b.$sf&&b.$sf.ext&&b.$sf.ext.inViewPercentage?(a=b.$sf,c=!0):c=!1;return c}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.intersectionObserver=function(){var a=this,b=null;this.intersectionObserverData=null;this.technique="amp_intersectionobserver";this.initialize=function(c,d){var g=function(b){b.forEach(function(b){a.intersectionObserverData=b})};"undefined"!=typeof IntersectionObserver&&
null!=c?(b=new IntersectionObserver(g,{threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}),b.observe(c)):d.context&&d.context.observeIntersection&&(d.context.observeIntersection(g),intersectionObserverInitiated=!0);this.initialize=function(){}};this.getAssetViewablePercentage=function(){return null!=a.intersectionObserverData&&a.intersectionObserverData.intersectionRatio?100*a.intersectionObserverData.intersectionRatio:0};this.getViewPortSize=function(a,b){var d=b.outerWidth,e=b.outerHeight;return{width:d,
height:e,area:d*e}};this.getAssetVisibleDimension=function(a){var b={width:0,height:0,left:0,right:0,top:0,bottom:0},a=a.getBoundingClientRect();b.width=a.width;b.height=a.height;return b};this.isSupported=function(a){var b;if(b=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe)b=!1,a.context&&a.context.observeIntersection&&(b=!0),"undefined"!=typeof IntersectionObserver&&(b=!0);return b}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||
{};a.html5.video.calc.resourceBased=function(){a.html5.video.calc.base.call(this);this.technique="resourcebased";var d=Math.sqrt(2),b=null,c=null,j=[],g,e=!1,l=!1,p=function(a,b){var c=$dvvideo.browserIDEnum;if(a==$dvvideo.servingScenarioEnum.CrossDomainIframe&&b.browserId===c.safari&&(null===b.browserVersion||void 0===b.browserVersion||!/^[3-8]/.test(b.browserVersion)))return p=function(){return!0},!0;p=function(){return!1};return!1},s=p($dvvideo.scenarioType,{browserId:$dvvideo.browser.ID,browserVersion:$dvvideo.browser.version}),
r=function(a,b){try{if(!a)return!1;for(b||(b=window);a!=b.document&&a.parentNode;)a=a.parentNode;return a==b.document}catch(c){return!1}},k=function(a){var a=j[a],b=null;a&&(b=a.contentWindow);return b},x=function(a){for(var b=!0,c=0;13>=c;c++)var d=k(c),b=b&(null!==d&&d.isReady());if(!b)return null;a.beaconsVisible=0;a.outerCornersVisible=0;a.middleCornersVisible=0;a.innerCornersVisible=0;a.viewedPercentage=0;a.beacons=Array(13);b=k(0).getLastRafDiff();for(c=1;13>=c;c++)if(d=k(c).getLastRafDiff(),
d=5<Math.abs(d-b),a.beacons[c]=d)switch(a.beaconsVisible++,c){case 2:case 3:case 4:case 5:a.outerCornersVisible++;break;case 6:case 7:case 8:case 9:a.middleCornersVisible++;break;case 10:case 11:case 12:case 13:a.innerCornersVisible++}if(13===a.beaconsVisible)return a.viewedPercentage=100,!0;b=a.beacons;if(!1===b[1]){if(3<=a.innerCornersVisible||3<=a.middleCornersVisible||3<=a.outerCornersVisible)return null;a.viewedPercentage=0;return!1}if(!0===b[1]&&(!0===b[2]&&!0===b[3]||!0===b[2]&&!0===b[4]||
!0===b[3]&&!0===b[5]||!0===b[4]&&!0===b[5])||!0===b[1]&&4==a.middleCornersVisible||!0===b[1]&&4==a.innerCornersVisible&&1<=a.outerCornersVisible)return a.viewedPercentage=50,!0;if(b[2]&&b[5]&&(!b[6]||!b[10]||!b[1]||!b[13]||!b[9])||b[4]&&b[3]&&(!b[8]||!b[12]||!b[1]||!b[11]||!b[7]))return null;a.viewedPercentage=0;return!1},w=function(a){var a=a||0,b=k(0);b.isReady()?7<b.getLastRafDiff()?(C(),s=l=e=!1):((new Date).getTime(),e=!0,l=!1):20>a?(a++,setTimeout(w,50,a)):(e=l=s=!1,C())},C=function(){if(!0==
e){try{for(var a in j)g.removeChild(j[a]);b.document.body.removeChild(g)}catch(c){}e=!1}},y=function(){if(!1==e)return null;var a={};if(null==x(a))return null;(new Date).getTime();return a.viewedPercentage};this.initialize=function(a,N){b=N;c=a;if(!1==l)if(!1==(s&&(null!=c&&r(c,b)?!0:!1)))e=!1;else{if(!(null==c||null==c.parentNode)){l=!0;g=b.document.createElement("div");b.document.body.appendChild(g);for(var k=0;13>=k;k++){var m=b.document.createElement("iframe");m.width=1;m.height=1;m.style.position=
"absolute";m.frameBorder="0";m.style.visibility="hidden";m.style.zIndex=-9999999;m.style.display="block";m.src="javascript:no=false;yes=true;("+function(){window.config={checkIntervalMs:100};window.isFrameReady=no;window.raf_count=0;window.last_raf_count=0;window.last_raf_diff=0;window.isStarted=no;window.getLastRafDiff=function(){return window.last_raf_diff};window.isReady=function(){return window.isFrameReady};window.adRafFunc=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||
window.msRequestAnimationFrame;window.animate=function(){window.raf_count++;window.adRafFunc(window.animate,document)};window.animate();setInterval(function(){10>window.raf_count&&window.animate();window.last_raf_diff=window.raf_count-window.last_raf_count;window.last_raf_count=window.raf_count},window.config.checkIntervalMs);window.setTimeout(function(){window.isFrameReady=yes},250)}.toString()+")();";g.appendChild(m);j.push(m)}for(var k=c.getBoundingClientRect(),m=k.width,t=k.height,u=m/(1+d),p=
t/(1+d),v=m/d,i=t/d,y=0;13>=y;y++){var n=k.left,q=k.top;switch(y){case 0:q=n=-1E5;break;case 1:n+=(m-1)/2;q+=(t-1)/2;break;case 3:n+=m-1;break;case 4:q+=t-1;break;case 5:n+=m-1;q+=t-1;break;case 6:n+=(m-v)/2;q+=(t-i)/2;break;case 7:n+=(m-v)/2+v;q+=(t-i)/2;break;case 8:n+=(m-v)/2;q+=(t-i)/2+i;break;case 9:n+=(m-v)/2+v;q+=(t-i)/2+i;break;case 10:n+=(m-u)/2;q+=(t-p)/2;break;case 11:n+=(m-u)/2+u;q+=(t-p)/2;break;case 12:n+=(m-u)/2;q+=(t-p)/2+p;break;case 13:n+=(m-u)/2+u,q+=(t-p)/2+p}6<=y&&(n-=0.5,q-=
0.5);var C=j[y];C.style.left=n+"px";C.style.top=q+"px"}}w()}this.initialize=function(){}};this.isSupported=function(){return s};this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a){var b={width:0,height:0,left:0,right:0,top:0,bottom:0},a=a.getBoundingClientRect();b.width=a.width;b.height=a.height;return b};this.getAssetViewablePercentage=function(){return y()}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||
{};a.html5.video.calculator=function(d){var b=this,c=d||window;this.UNMEASURABLE="unmeasurable";this.VIEWABLE="viewable";this.UNVIEWABLE="unviewable";this.NOT_READY="not_ready";this.TECHNIQUE_GEOMETRY="geometry";this.TECHNIQUE_CSS_INVISIBILITY="css_invisibility";this.TECHNIQUE_DOM_OBSCURING="dom_obscuring";this.TECHNIQUE_AMP_IO="amp_intersectionobserver";this.TECHNIQUE_IPHONE_OVERRIDE="iphone_override";this.TECHNIQUE_RESOURCE_BASED="resourcebased";var j=!1,g=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe?
c:c.top,e,l;this.checkViewability=function(a,d){var k,h,f,r,m,t,u,x,v,i=new K;i.id=a.id;i.inIframe=c.top!==c.self;i.geometrySupported=j;i.focus="undefined"!==document.hidden&&!0===document.hidden?!1:$dvvideo.servingScenarioEnum.CrossDomainIframe==$dvvideo.scenarioType?!0:c.top.document.hasFocus?c.top.document.hasFocus():!0;e=a.player;if(!e)return i.error="Player not found!",i;if(i.geometrySupported){l.initialize(e,g);i.technique=l.technique;try{f=(new Date).getTime(),h=f-s||200,0>h&&(h=200),s=f}catch(B){h=
200}k=h;f=l.getViewPortSize(e,g);Infinity==f.height||Infinity==f.width?(k="Failed to determine viewport",v=x=u=t=m=r=f=h=void 0):(e.getBoundingClientRect(),u=l.getAssetVisibleDimension(e,g),x=l.getAssetViewablePercentage(u,f),h=f.width,f=f.height,r=u.top,m=u.bottom,t=u.left,u=u.right,v=k,k=void 0);k||(i.clientWidth=h,i.clientHeight=f,i.percentViewable=x-i.percentObscured,i.objTop=r,i.objBottom=m,i.objLeft=t,i.objRight=u,i.interval=v);i.viewabilityState=50<=i.percentViewable?this.VIEWABLE:this.UNVIEWABLE;
$dvvideo.DEBUG&&(i.geometryViewabilityState=i.viewabilityState)}else i.viewabilityState=this.UNMEASURABLE;(f=c.getComputedStyle(e,null))?(h=f.getPropertyValue("visibility"),f=f.getPropertyValue("display"),"hidden"==h||"none"==f?(i.technique=b.TECHNIQUE_CSS_INVISIBILITY,i.viewabilityState=b.UNVIEWABLE,i.percentViewable=0,h=!0):h=!1):h=!1;!0===h&&$dvvideo.DEBUG&&(i.cssViewabilityState=this.UNVIEWABLE);if(h=d){var n;a:{h=e.getBoundingClientRect();f=h.left+12;r=h.right-12;m=h.top+12;t=h.bottom-12;u=Math.floor(h.left+
h.width/2);k=Math.floor(h.top+h.height/2);f=[{x:f,y:m},{x:u,y:m},{x:r,y:m},{x:f,y:k},{x:u,y:k},{x:r,y:k},{x:f,y:t},{x:u,y:t},{x:r,y:t}];for(n in f)if(f[n]&&(0<=f[n].x&&0<=f[n].y)&&(elem=document.elementFromPoint(f[n].x,f[n].y),null!=elem&&(elem!=e&&!e.contains(elem))&&(overlappingArea=p(h,elem.getBoundingClientRect()),0<overlappingArea&&(i.percentObscured=100*p(h,elem.getBoundingClientRect()),50<i.percentObscured)))){i.percentViewable=100-i.percentObscured;i.technique=b.TECHNIQUE_DOM_OBSCURING;i.viewabilityState=
b.UNVIEWABLE;n=!0;break a}n=!1}h=!0===n}h&&$dvvideo.DEBUG&&(i.domViewabilityState=this.UNVIEWABLE);$dvvideo.browser.osId==$dvvideo.osIDEnum.iOS&&10>$dvvideo.browser.osVersion&&(i.viewabilityState=b.VIEWABLE,i.focus=!0,i.displayState="fullScreen",i.percentViewable=100,i.technique=b.TECHNIQUE_IPHONE_OVERRIDE);return i};var p=function(a,b){var c=a.width*a.height,d=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left)),f=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));return d*f/
c},s,d=[a.html5.video.calc.standard,a.html5.video.calc.crossDomainIE,a.html5.video.calc.crossDomainFirefox,a.html5.video.calc.intersectionObserver,a.html5.video.calc.safeframeInviewPercentage,a.html5.video.calc.safeframeGeometric,a.html5.video.calc.resourceBased],r;for(r in d)try{if(d[r]){var k=new d[r](g);if(k.isSupported&&k.isSupported(g)){l=k;j=!0;break}}}catch(x){}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.service=function(a,b,c,d,g){function e(a){$dvvideo.DEBUG&&
console.log("[DVVID_SRC] "+a)}function l(a){var b=z.checkViewability(h.adAsset);b.volume=m.getAdVolume();var c={vpaidData:null,ovvData:b};switch(a){case "OVVLog":e("OVVLOG");u=b.viewabilityState==z.UNMEASURABLE?u+1:0;t=b.viewabilityState==z.VIEWABLE&&!0==b.focus?t+1:0;D(c);break;case "AdImpression":var d=q.getAutoPlayResult({player:h.adAsset.player});b.autoPlayIndicator=d.error?-1:d.indicator}$dvvideo.publish(a,h.adID,c)}function p(a){return function(){try{switch(e(a),l(a),a){case "AdImpression":s(!0);
break;case "AdPaused":x();break;case "AdPlaying":k();break;case "AdVideoComplete":x()}}catch(b){}}}function s(a,b){h.adImpressionCB&&window[h.adImpressionCB]?(window[h.adImpressionCB](n),b&&l("AdImpression"),a&&k()):A||(A=!0,y.injectScript("dvtp_src.js?isdvvid=1&adid="+h.adID+"&tagtype=video&"+i+h.dvp_dvvidtimeout),b&&l("AdImpression"),a&&k())}function r(){l("OVVLog")}function k(){void 0==h.adAsset.checkViewabilityItervalID&&(h.adAsset.checkViewabilityItervalID=setInterval(r,$dvvideo.interval||200))}
function x(){h.adAsset&&void 0!=h.adAsset.checkViewabilityItervalID&&(clearInterval(h.adAsset.checkViewabilityItervalID),h.adAsset.checkViewabilityItervalID=void 0)}function w(a,b){if(a&&a.length)for(var c=a.length;c--;)if(a[c]===b)return!0;return!1}function C(a,b){if(a&&a.length)for(var c=a.length;c--;)if(a[c]===b)return c}var y=this,h={},A=!1,z=a,m,t=0,u=0,E,v,i,B=c||window;B.dv_config=B.dv_config||{};var n,q=g;this.dispose=function(){x()};this.start=function(a){n=a;if(!B._dvvidScriptsInternal||
!B.dvvidProcessed||0==B._dvvidScriptsInternal.length)E=null;else{var c=B._dvvidScriptsInternal.pop();B.dvvidProcessed.push(c);E=c}if(d.dvvid_script_obj=E){var c=E.script.src,f={};try{for(var g=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),e=g.exec(c);null!=e;)"eparams"!==e[1]&&(f[e[1]]=e[2]),e=g.exec(c);v=f}catch(k){v=f}d.tagParamsObj=v;i=E.script.src.substring(E.script.src.indexOf("?")+1)+"&dvvidver="+n;g=v.adid;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|
0;return("x"==a?b:b&3|8).toString(16)});e=new L(g||e);g||(e.isIdGenerated=!0);$dvvideo.assets.push(e);h.adAsset=e;h.adID=e.id;h.dvp_dvvidtimeout="";h.beforeAdLoadCallback=v.DVP_GVACB;h.useBlocking=v.blk;h.blockingCallback=v.DVP_DCB;h.adImpressionCB=v.AICB;h.dvvidVersion=a;1==h.useBlocking&&y.injectScript("dvbs_src.js?isdvvid=1&adid="+h.adID+"&tagformat=2&tagtype=video&dvtagver=6.1.src&"+i);m=b.getVpaidWrapper();m.init(h);h.adAsset.player=m.getPlayer();m.subscribeToVpaidEvents(p);m.registerEventCallback(h.adAsset);
a=m.getPrevEvents();e=g=!0;if(w(a,"AdImpression")){h.dvp_dvvidtimeout="&dvp_dvvidtimeout=1";w(a,"AdVideoComplete")&&(e=g=!1);if(w(a,"AdPaused")&&(!w(a,"AdPlaying")||C(a,"AdPaused")>C(a,"AdPlaying")))g=!1;s(g,e)}}};var D=function(a){10<=t?($dvvideo.publish("OVVImpression",h.adID,a),D=function(){}):5<=u&&($dvvideo.publish("OVVImpressionUnmeasurable",h.adID,a),D=function(){})};this.injectScript=function(a){var b=B.document.createElement("script");b.src=E.src_location+"/"+a;B.document.body.appendChild(b)}};
this.handle=function(){window.$dvvideo=window.$dvvideo||new a.html5.video.api(window);var d=[new a.engagement.autoPlay.ElementDetectionMethod(window.top),new a.engagement.autoPlay.JWPlayerDetectionMethod(window.top),new a.engagement.autoPlay.TimingDetectionMethod(window.top)];(new a.html5.video.service(new a.html5.video.calculator(window),new a.html5.video.partnerWrappers(window),window,this,new a.engagement.autoPlay.AutoPlayCalculator(d))).start(this.getVersion())};this.isApplicable=function(){return!0};
this.onFailure=function(){_dvvid_win._dvvidScriptsInternal.unshift(this.dvvid_script_obj);var a=_dvvid_win.dvvidProcessed,b=this.dvvid_script_obj;null!=a&&(void 0!=a&&b)&&(b=a.indexOf(b),-1!=b&&a.splice(b,1))};this.getVersionParamName=function(){return"dvvidver"};this.getVersion=function(){return"30"}};
function dv_baseHandler(){function K(){this.clientWidth=this.clientHeight=-1;this.error="";this.focus=null;this.id="";this.geometrySupported=null;this.technique=this.domViewabilityState=this.cssViewabilityState=this.geometryViewabilityState="";this.percentViewable=this.objTop=this.objRight=this.objLeft=this.objBottom=-1;this.percentObscured=0;this.viewabilityState="";this.interval=200}function L(a){this.id=a;this.isIdGenerated=!1;this.player=null}a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||
{};a.html5.video.partnerWrappers=function(a){function b(){function a(b,c,f){try{return b instanceof f[c]?!0:f.parent!=f?a(b,c,f.parent):!1}catch(e){return!1}}var b;this.init=function(a){if(a.beforeAdLoadCallback)a=j[a.beforeAdLoadCallback]();else{var f;try{f=window.$ovv||window.parent.$ovv}catch(g){}if(!f)throw{message:"OVV does not exist or beforeAdLoadCallback is Empty"};if(a.adImpressionCB)j[a.adImpressionCB](a.dvvidVersion);if(a.adAsset.isIdGenerated)throw{message:"OVV adID does not exist"};var a=
a.adID,d=new c(a);f.subscribe("AdSkippableStateChange AdSkipped AdUserClose AdStarted AdImpression AdVideoStart AdStopped AdVideoFirstQuartile AdVideoMidpoint AdVideoThirdQuartile AdVideoComplete AdExpandedChange AdPaused AdPlaying AdVolumeChange AdClickThru".split(" "),a,function(b,a){try{"AdVolumeChange"==a.eventName&&(a.ovvArgs&&void 0!=a.ovvArgs.ovvData.volume)&&d.setAdVolume(a.ovvArgs.ovvData.volume),d.Event(a.eventName)}catch(c){}},!0);a=d}if(!a)throw{message:"init VPAIDObject failed"};b=a};
this.getPrevEvents=function(){return b.getPreviousEvents?"function"===typeof b.getPreviousEvents?b.getPreviousEvents():b.getPreviousEvents:[]};this.getPlayer=function(){var b;b="function"===typeof this.getVPAIDObject().getPlayer?this.getVPAIDObject().getPlayer():this.getVPAIDObject().getPlayer;a(b,"HTMLElement",window)||(b=this.getVPAIDObject().getSlot());return b};this.registerEventCallback=function(a){"function"===typeof b.executeDVClientCallback&&(a.executeCB=b.executeDVClientCallback)};this.getAdVolume=
function(){return b.getAdVolume()};this.subscribeToVpaidEvents=function(a){b.subscribe(a("AdLoaded"),"AdLoaded");b.subscribe(a("AdImpression"),"AdImpression");b.subscribe(a("AdStopped"),"AdStopped");b.subscribe(a("AdError"),"AdError");b.subscribe(a("AdStarted"),"AdStarted");b.subscribe(a("AdSkipped"),"AdSkipped");b.subscribe(a("AdPaused"),"AdPaused");b.subscribe(a("AdSizeChange"),"AdSizeChange");b.subscribe(a("AdPlaying"),"AdPlaying");b.subscribe(a("AdExpandedChange"),"AdExpandedChange");b.subscribe(a("AdSkippableStateChange"),
"AdSkippableStateChange");b.subscribe(a("AdLinearChange"),"AdLinearChange");b.subscribe(a("AdVideoStart"),"AdVideoStart");b.subscribe(a("AdUserAcceptInvitation"),"AdUserAcceptInvitation");b.subscribe(a("AdUserClose"),"AdUserClose");b.subscribe(a("AdUserMinimize"),"AdUserMinimize");b.subscribe(a("AdClickThru"),"AdClickThru");b.subscribe(a("AdInteraction"),"AdInteraction");b.subscribe(a("AdDurationChange"),"AdDurationChange");b.subscribe(a("AdRemainingTimeChange"),"AdRemainingTimeChange");b.subscribe(a("AdVolumeChange"),
"AdVolumeChange");b.subscribe(a("AdVideoFirstQuartile"),"AdVideoFirstQuartile");b.subscribe(a("AdVideoMidpoint"),"AdVideoMidpoint");b.subscribe(a("AdVideoThirdQuartile"),"AdVideoThirdQuartile");b.subscribe(a("AdVideoComplete"),"AdVideoComplete")};this.getVPAIDObject=function(){return b}}function c(a){var b=[],c={},f,j;a:{try{for(var d=window.document.getElementsByTagName("embed"),k=0;k<d.length;k++)if(d[k][a]||d[k]["onJsReady"+a]){j=d[k];break a}for(var x=window.document.getElementsByTagName("object"),
k=0;k<x.length;k++)if(x[k][a]||x[k]["onJsReady"+a]){j=x[k];break a}}catch(w){}j=void 0}if(!j)throw{message:"Cannot find OVV player"};this.Event=function(a){b.push(a);if(c[a])for(var f in c[a])c[a][f]()};this.getPlayer=function(){return j};this.getSlot=function(){return j};this.getPreviousEvents=function(){return b};this.getAdVolume=function(){return f};this.setAdVolume=function(a){f=a};this.subscribe=function(a,b){c[b]?c[b].push(a):c[b]=[a];return!0}}var j=a||window;this.getVpaidWrapper=function(){return new b}};
var s;if(!(s=this&&this.__extends)){var M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};s=function(a,b){function c(){this.constructor=a}M(a,b);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}var a,d=a||(a={}),d=d.engagement||(d.engagement={}),d=d.autoPlay||(d.autoPlay={}),I,p=I=d.videoPlayModeEnum||(d.videoPlayModeEnum={});p[p.Unknown=0]="Unknown";p[p.Auto=1]="Auto";p[p.Manual=
2]="Manual";p=d.autoPlayMethodIndicatorIndex||(d.autoPlayMethodIndicatorIndex={});p[p.Element=1]="Element";p[p.JWPlayer=2]="JWPlayer";p[p.Timing=4]="Timing";p=function(a){this.currWin=a};p.prototype.getVideoPlayMode=function(){return I.Unknown};d.BaseDetectionMethod=p;var d=a||(a={}),d=d.engagement||(d.engagement={}),z=d.autoPlay||(d.autoPlay={}),D=z.BaseDetectionMethod,d=function(){return null!==D&&D.apply(this,arguments)||this};s(d,D);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return z.autoPlayMethodIndicatorIndex.Element};
d.prototype.getVideoPlayMode=function(a){return a.player&&a.player.autoplay?!0==a.player.autoplay?z.videoPlayModeEnum.Auto:z.videoPlayModeEnum.Manual:z.videoPlayModeEnum.Unknown};z.ElementDetectionMethod=d;var d=a||(a={}),d=d.engagement||(d.engagement={}),F=d.autoPlay||(d.autoPlay={}),G=F.BaseDetectionMethod,d=function(){return null!==G&&G.apply(this,arguments)||this};s(d,G);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return F.autoPlayMethodIndicatorIndex.JWPlayer};F.JWPlayerDetectionMethod=
d;var d=a||(a={}),d=d.engagement||(d.engagement={}),A=d.autoPlay||(d.autoPlay={}),H=A.BaseDetectionMethod,d=function(){var a=null!==H&&H.apply(this,arguments)||this;a.adImpressionEventTimeTreshold=4E3;return a};s(d,H);d.prototype.getAutoPlayMethodIndicatorIndex=function(){return A.autoPlayMethodIndicatorIndex.Timing};d.prototype.getVideoPlayMode=function(){return $dvvideo.scenarioType===$dvvideo.servingScenarioEnum.CrossDomainIframe?A.videoPlayModeEnum.Unknown:this.currWin?(Date.now?Date.now():(new Date).getTime())-
this.currWin.performance.timing.loadEventEnd<=this.adImpressionEventTimeTreshold?A.videoPlayModeEnum.Auto:A.videoPlayModeEnum.Manual:A.videoPlayModeEnum.Unknown};A.TimingDetectionMethod=d;s=a||(a={});s=s.engagement||(s.engagement={});var J=s.autoPlay||(s.autoPlay={});s=function(a){this.autoPlayDetectors=a};s.prototype.getAutoPlayResult=function(a){var b={indicator:0},c;for(c in this.autoPlayDetectors)try{if(this.autoPlayDetectors[c]){var j=this.autoPlayDetectors[c];j.getVideoPlayMode(a)===J.videoPlayModeEnum.Auto&&
(b.indicator|=j.getAutoPlayMethodIndicatorIndex())}}catch(g){b.error=g}return b};J.AutoPlayCalculator=s;a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.api=function(a){var b=a||window,c=[],j=[];this.assets=[];this.buildVersion=this.releaseVersion="html5";this.interval=200;this.userAgent=navigator.userAgent;a=new function(a){for(var b={IE:1,Firefox:2,Chrome:3,Opera:4,safari:5},c={Unknown:0,Windows:1,iOS:2},j=[{id:4,name:"Opera",brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},
{id:1,name:"MSIE",brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7",verRegex:"(MSIE |rv:)"},{id:2,name:"Firefox",brRegex:"Firefox",verRegex:"Firefox/"},{id:3,name:"Chrome",brRegex:"Chrome",verRegex:"Chrome/"},{id:5,name:"Safari",brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],f=[{id:1,name:"Windows",brRegex:"(Windows NT )[0-9\\.]*"},{id:2,name:"iOS",brRegex:"(iPhone |i)OS [0-9\\.]*"}],g={ID:0,name:"",version:"",osId:0,osVersion:""},d=0;d<j.length;d++)if(null!=a.match(RegExp(j[d].brRegex))){g.ID=
j[d].id;g.name=j[d].name;if(null==j[d].verRegex)break;var w=a.match(RegExp(j[d].verRegex+"[0-9]*"));null!=w&&(d=w[0].match(RegExp(j[d].verRegex)),g.version=w[0].replace(d[0],""));break}for(d=0;d<f.length;d++)if(w=a.match(RegExp(f[d].brRegex)),null!=w){g.osId=f[d].id;a=w[0]?w[0].split(" "):[0];g.osVersion=a[a.length-1];break}this.getBrowser=function(){return g};this.getBrowserIDEnum=function(){return b};this.getOsIDEnum=function(){return c}}(this.userAgent);this.browser=a.getBrowser();this.browserIDEnum=
a.getBrowserIDEnum();this.osIDEnum=a.getOsIDEnum();this.servingScenarioEnum={OnPage:1,SameDomainIframe:2,CrossDomainIframe:128};this.scenarioType=function(a){try{if(b.top==b)return a.OnPage;for(var c=b,j=0;c.parent!=c&&300>j;){if(c.parent.document.domain!=c.document.domain)return a.CrossDomainIframe;c=c.parent;j++}return a.SameDomainIframe}catch(f){}return a.CrossDomainIframe}(this.servingScenarioEnum);this.subscribe=function(a,b,f,d){if(d)for(var r in c[b]){if(d=c[b][r])a:{for(d=0;d<a.length;d++)if(a[d]===
c[b][r].eventName){d=!0;break a}d=!1}d&&g(function(){f(b,c[b][r])})}for(r in a)j[a[r]+b]||(j[a[r]+b]=[]),j[a[r]+b].push({Func:f})};this.publish=function(a,b,f){var d;d=Date.now?Date.now():(new Date).getTime();var r={eventName:a,eventTime:d,ovvArgs:f};c[b]||(c[b]=[]);1E3>c[b].length&&c[b].push(r);if(a&&b&&j[a+b]instanceof Array)for(f=0;f<j[a+b].length;f++){var k=j[a+b][f];k&&(k.Func&&"function"===typeof k.Func)&&g(function(){k.Func(b,r)})}};this.getAllReceivedEvents=function(a){return c[a]};var g=
function(a){try{var b=a();return void 0!==b?b:!0}catch(c){return!1}}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.base=function(){this.technique="geometry";this.getAssetViewablePercentage=function(a,b){var c=0,j=0,d=a.right-a.left,e=a.bottom-a.top;if(0>a.bottom||0>a.right||a.top>b.height||a.left>b.width||0>=d||0>=e)return 0;0>a.top?(c=e+a.top,c>b.height&&(c=b.height)):c=a.top+e>b.height?b.height-a.top:e;0>a.left?(j=d+a.left,
j>b.width&&(j=b.width)):j=a.left+d>b.width?b.width-a.left:d;return Math.round(100*(j*c/(d*e)))};this.initialize=function(){};this.isSupported=function(){}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.standard=function(){a.html5.video.calc.base.call(this);var d=function(a,c){var j=c.parent,g={left:0,right:0,top:0,bottom:0};if(a){var e=a.getBoundingClientRect();c!=j&&(g=d(c.frameElement,j));g={left:e.left+g.left,right:e.right+
g.left,top:e.top+g.top,bottom:e.bottom+g.top}}return g};this.getViewPortSize=function(a){var c={width:Infinity,height:Infinity,area:Infinity},a=a.ownerDocument.defaultView.top;!isNaN(a.document.body.clientWidth)&&0<a.document.body.clientWidth&&(c.width=a.document.body.clientWidth);!isNaN(a.document.body.clientHeight)&&0<a.document.body.clientHeight&&(c.height=a.document.body.clientHeight);a.document.documentElement&&(a.document.documentElement.clientWidth&&!isNaN(a.document.documentElement.clientWidth))&&
(c.width=a.document.documentElement.clientWidth);a.document.documentElement&&(a.document.documentElement.clientHeight&&!isNaN(a.document.documentElement.clientHeight))&&(c.height=a.document.documentElement.clientHeight);a.innerWidth&&!isNaN(a.innerWidth)&&(c.width=Math.min(c.width,a.innerWidth));a.innerHeight&&!isNaN(a.innerHeight)&&(c.height=Math.min(c.height,a.innerHeight));c.area=c.height*c.width;return c};this.getAssetVisibleDimension=function(a){var c=function(a,b){var e=b.parent,l={width:0,
height:0,left:0,right:0,top:0,bottom:0};a&&(l=d(a,b),l.width=l.right-l.left,l.height=l.bottom-l.top,b!=e&&(e=c(b.frameElement,e),e.bottom<l.bottom&&(e.bottom<l.top&&(l.top=e.bottom),l.bottom=e.bottom),e.right<l.right&&(e.right<l.left&&(l.left=e.right),l.right=e.right),l.width=l.right-l.left,l.height=l.bottom-l.top));return l};return c(a,a.ownerDocument.defaultView)};this.isSupported=function(){return $dvvideo.scenarioType!=$dvvideo.servingScenarioEnum.CrossDomainIframe}};a=a||{};a.html5=a.html5||
{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.crossDomainIE=function(){a.html5.video.calc.base.call(this);this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a,b){var c=b.screenLeft-b.screenX,d=b.screenTop-b.screenY,g=a.getBoundingClientRect();return assetSize={left:c,top:d,right:c+g.width,bottom:d+g.height,width:g.width,height:g.height}};this.isSupported=function(){return $dvvideo.scenarioType==
$dvvideo.servingScenarioEnum.CrossDomainIframe&&$dvvideo.browser.ID==$dvvideo.browserIDEnum.IE}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.crossDomainFirefox=function(){a.html5.video.calc.base.call(this);this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a,b){var c=1,d=a.getBoundingClientRect();b.devicePixelRatio&&(c=b.devicePixelRatio);
var g=b.mozInnerScreenX/c-b.screenX,c=b.mozInnerScreenY/c-b.screenY;return assetSize={left:g,top:c,right:g+d.width,bottom:c+d.height,width:d.width,height:d.height}};this.isSupported=function(){return $dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe&&$dvvideo.browser.ID==$dvvideo.browserIDEnum.Firefox}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.safeframeGeometric=function(){a.html5.video.calc.base.call(this);
var d;this.technique="safeframegeom";this.initialize=function(){};this.getViewPortSize=function(){var a=d.ext.geom(),c=parseInt(a.win.h),a=parseInt(a.win.w);return{width:a,height:c,area:a*c}};this.getAssetVisibleDimension=function(a){var c={width:0,height:0,left:0,right:0,top:0,bottom:0};d.ext.geom&&d.ext.geom().par?(a=d.ext.geom(),c.width=parseInt(a.self.w),c.height=parseInt(a.self.h),c.top=parseInt(a.self.t)-parseInt(a.par.t),c.bottom=c.top+c.height,c.left=parseInt(a.self.l)-parseInt(a.par.l),c.right=
c.left+c.width):(a=a.getBoundingClientRect(),c.width=a.width,c.height=a.height);return c};this.isSupported=function(a){var c;if(c=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe)a:{if(a.$sf&&(a.$sf.ext&&a.$sf.ext.geom)&&(c=a.$sf.ext.geom(),null!=c&&c.win&&(0<c.win.h||0<c.win.w))){d=a.$sf;c=!0;break a}c=!1}return c}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.safeframeInviewPercentage=function(){var a;
this.technique="safeframeinviewperc";this.initialize=function(){};this.getAssetViewablePercentage=function(){return a.ext.inViewPercentage?a.ext.inViewPercentage():0};this.getViewPortSize=function(b,c){var d=c.outerWidth,g=c.outerHeight;a.ext.geom&&(d=a.ext.geom(),g=parseInt(d.win.h),d=parseInt(d.win.w));return{width:d,height:g,area:d*g}};this.getAssetVisibleDimension=function(){return{width:0,height:0,left:0,right:0,top:0,bottom:0}};this.isSupported=function(b){var c;if(c=$dvvideo.scenarioType==
$dvvideo.servingScenarioEnum.CrossDomainIframe)b.$sf&&b.$sf.ext&&b.$sf.ext.inViewPercentage?(a=b.$sf,c=!0):c=!1;return c}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||{};a.html5.video.calc.intersectionObserver=function(){var a=this,b=null;this.intersectionObserverData=null;this.technique="amp_intersectionobserver";this.initialize=function(c,d){var g=function(b){b.forEach(function(b){a.intersectionObserverData=b})};"undefined"!=typeof IntersectionObserver&&
null!=c?(b=new IntersectionObserver(g,{threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}),b.observe(c)):d.context&&d.context.observeIntersection&&(d.context.observeIntersection(g),intersectionObserverInitiated=!0);this.initialize=function(){}};this.getAssetViewablePercentage=function(){return null!=a.intersectionObserverData&&a.intersectionObserverData.intersectionRatio?100*a.intersectionObserverData.intersectionRatio:0};this.getViewPortSize=function(a,b){var d=b.outerWidth,e=b.outerHeight;return{width:d,
height:e,area:d*e}};this.getAssetVisibleDimension=function(a){var b={width:0,height:0,left:0,right:0,top:0,bottom:0},a=a.getBoundingClientRect();b.width=a.width;b.height=a.height;return b};this.isSupported=function(a){var b;if(b=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe)b=!1,a.context&&a.context.observeIntersection&&(b=!0),"undefined"!=typeof IntersectionObserver&&(b=!0);return b}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.calc=a.html5.video.calc||
{};a.html5.video.calc.resourceBased=function(){a.html5.video.calc.base.call(this);this.technique="resourcebased";var d=Math.sqrt(2),b=null,c=null,j=[],g,e=!1,l=!1,p=function(a,b){var c=$dvvideo.browserIDEnum;if(a==$dvvideo.servingScenarioEnum.CrossDomainIframe&&b.browserId===c.safari&&(null===b.browserVersion||void 0===b.browserVersion||!/^[3-8]/.test(b.browserVersion)))return p=function(){return!0},!0;p=function(){return!1};return!1},s=p($dvvideo.scenarioType,{browserId:$dvvideo.browser.ID,browserVersion:$dvvideo.browser.version}),
r=function(a,b){try{if(!a)return!1;for(b||(b=window);a!=b.document&&a.parentNode;)a=a.parentNode;return a==b.document}catch(c){return!1}},k=function(a){var a=j[a],b=null;a&&(b=a.contentWindow);return b},x=function(a){for(var b=!0,c=0;13>=c;c++)var d=k(c),b=b&(null!==d&&d.isReady());if(!b)return null;a.beaconsVisible=0;a.outerCornersVisible=0;a.middleCornersVisible=0;a.innerCornersVisible=0;a.viewedPercentage=0;a.beacons=Array(13);b=k(0).getLastRafDiff();for(c=1;13>=c;c++)if(d=k(c).getLastRafDiff(),
d=5<Math.abs(d-b),a.beacons[c]=d)switch(a.beaconsVisible++,c){case 2:case 3:case 4:case 5:a.outerCornersVisible++;break;case 6:case 7:case 8:case 9:a.middleCornersVisible++;break;case 10:case 11:case 12:case 13:a.innerCornersVisible++}if(13===a.beaconsVisible)return a.viewedPercentage=100,!0;b=a.beacons;if(!1===b[1]){if(3<=a.innerCornersVisible||3<=a.middleCornersVisible||3<=a.outerCornersVisible)return null;a.viewedPercentage=0;return!1}if(!0===b[1]&&(!0===b[2]&&!0===b[3]||!0===b[2]&&!0===b[4]||
!0===b[3]&&!0===b[5]||!0===b[4]&&!0===b[5])||!0===b[1]&&4==a.middleCornersVisible||!0===b[1]&&4==a.innerCornersVisible&&1<=a.outerCornersVisible)return a.viewedPercentage=50,!0;if(b[2]&&b[5]&&(!b[6]||!b[10]||!b[1]||!b[13]||!b[9])||b[4]&&b[3]&&(!b[8]||!b[12]||!b[1]||!b[11]||!b[7]))return null;a.viewedPercentage=0;return!1},w=function(a){var a=a||0,b=k(0);b.isReady()?7<b.getLastRafDiff()?(C(),s=l=e=!1):((new Date).getTime(),e=!0,l=!1):20>a?(a++,setTimeout(w,50,a)):(e=l=s=!1,C())},C=function(){if(!0==
e){try{for(var a in j)g.removeChild(j[a]);b.document.body.removeChild(g)}catch(c){}e=!1}},y=function(){if(!1==e)return null;var a={};if(null==x(a))return null;(new Date).getTime();return a.viewedPercentage};this.initialize=function(a,N){b=N;c=a;if(!1==l)if(!1==(s&&(null!=c&&r(c,b)?!0:!1)))e=!1;else{if(!(null==c||null==c.parentNode)){l=!0;g=b.document.createElement("div");b.document.body.appendChild(g);for(var k=0;13>=k;k++){var m=b.document.createElement("iframe");m.width=1;m.height=1;m.style.position=
"absolute";m.frameBorder="0";m.style.visibility="hidden";m.style.zIndex=-9999999;m.style.display="block";m.src="javascript:no=false;yes=true;("+function(){window.config={checkIntervalMs:100};window.isFrameReady=no;window.raf_count=0;window.last_raf_count=0;window.last_raf_diff=0;window.isStarted=no;window.getLastRafDiff=function(){return window.last_raf_diff};window.isReady=function(){return window.isFrameReady};window.adRafFunc=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||
window.msRequestAnimationFrame;window.animate=function(){window.raf_count++;window.adRafFunc(window.animate,document)};window.animate();setInterval(function(){10>window.raf_count&&window.animate();window.last_raf_diff=window.raf_count-window.last_raf_count;window.last_raf_count=window.raf_count},window.config.checkIntervalMs);window.setTimeout(function(){window.isFrameReady=yes},250)}.toString()+")();";g.appendChild(m);j.push(m)}for(var k=c.getBoundingClientRect(),m=k.width,t=k.height,u=m/(1+d),p=
t/(1+d),v=m/d,i=t/d,y=0;13>=y;y++){var n=k.left,q=k.top;switch(y){case 0:q=n=-1E5;break;case 1:n+=(m-1)/2;q+=(t-1)/2;break;case 3:n+=m-1;break;case 4:q+=t-1;break;case 5:n+=m-1;q+=t-1;break;case 6:n+=(m-v)/2;q+=(t-i)/2;break;case 7:n+=(m-v)/2+v;q+=(t-i)/2;break;case 8:n+=(m-v)/2;q+=(t-i)/2+i;break;case 9:n+=(m-v)/2+v;q+=(t-i)/2+i;break;case 10:n+=(m-u)/2;q+=(t-p)/2;break;case 11:n+=(m-u)/2+u;q+=(t-p)/2;break;case 12:n+=(m-u)/2;q+=(t-p)/2+p;break;case 13:n+=(m-u)/2+u,q+=(t-p)/2+p}6<=y&&(n-=0.5,q-=
0.5);var C=j[y];C.style.left=n+"px";C.style.top=q+"px"}}w()}this.initialize=function(){}};this.isSupported=function(){return s};this.getViewPortSize=function(a,b){var c=b.outerWidth,d=b.outerHeight;return{width:c,height:d,area:c*d}};this.getAssetVisibleDimension=function(a){var b={width:0,height:0,left:0,right:0,top:0,bottom:0},a=a.getBoundingClientRect();b.width=a.width;b.height=a.height;return b};this.getAssetViewablePercentage=function(){return y()}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||
{};a.html5.video.calculator=function(d){var b=this,c=d||window;this.UNMEASURABLE="unmeasurable";this.VIEWABLE="viewable";this.UNVIEWABLE="unviewable";this.NOT_READY="not_ready";this.TECHNIQUE_GEOMETRY="geometry";this.TECHNIQUE_CSS_INVISIBILITY="css_invisibility";this.TECHNIQUE_DOM_OBSCURING="dom_obscuring";this.TECHNIQUE_AMP_IO="amp_intersectionobserver";this.TECHNIQUE_IPHONE_OVERRIDE="iphone_override";this.TECHNIQUE_RESOURCE_BASED="resourcebased";var j=!1,g=$dvvideo.scenarioType==$dvvideo.servingScenarioEnum.CrossDomainIframe?
c:c.top,e,l;this.checkViewability=function(a,d){var k,h,f,r,m,t,u,x,v,i=new K;i.id=a.id;i.inIframe=c.top!==c.self;i.geometrySupported=j;i.focus="undefined"!==document.hidden&&!0===document.hidden?!1:$dvvideo.servingScenarioEnum.CrossDomainIframe==$dvvideo.scenarioType?!0:c.top.document.hasFocus?c.top.document.hasFocus():!0;e=a.player;if(!e)return i.error="Player not found!",i;if(i.geometrySupported){l.initialize(e,g);i.technique=l.technique;try{f=(new Date).getTime(),h=f-s||200,0>h&&(h=200),s=f}catch(B){h=
200}k=h;f=l.getViewPortSize(e,g);Infinity==f.height||Infinity==f.width?(k="Failed to determine viewport",v=x=u=t=m=r=f=h=void 0):(e.getBoundingClientRect(),u=l.getAssetVisibleDimension(e,g),x=l.getAssetViewablePercentage(u,f),h=f.width,f=f.height,r=u.top,m=u.bottom,t=u.left,u=u.right,v=k,k=void 0);k||(i.clientWidth=h,i.clientHeight=f,i.percentViewable=x-i.percentObscured,i.objTop=r,i.objBottom=m,i.objLeft=t,i.objRight=u,i.interval=v);i.viewabilityState=50<=i.percentViewable?this.VIEWABLE:this.UNVIEWABLE;
$dvvideo.DEBUG&&(i.geometryViewabilityState=i.viewabilityState)}else i.viewabilityState=this.UNMEASURABLE;(f=c.getComputedStyle(e,null))?(h=f.getPropertyValue("visibility"),f=f.getPropertyValue("display"),"hidden"==h||"none"==f?(i.technique=b.TECHNIQUE_CSS_INVISIBILITY,i.viewabilityState=b.UNVIEWABLE,i.percentViewable=0,h=!0):h=!1):h=!1;!0===h&&$dvvideo.DEBUG&&(i.cssViewabilityState=this.UNVIEWABLE);if(h=d){var n;a:{h=e.getBoundingClientRect();f=h.left+12;r=h.right-12;m=h.top+12;t=h.bottom-12;u=Math.floor(h.left+
h.width/2);k=Math.floor(h.top+h.height/2);f=[{x:f,y:m},{x:u,y:m},{x:r,y:m},{x:f,y:k},{x:u,y:k},{x:r,y:k},{x:f,y:t},{x:u,y:t},{x:r,y:t}];for(n in f)if(f[n]&&(0<=f[n].x&&0<=f[n].y)&&(elem=document.elementFromPoint(f[n].x,f[n].y),null!=elem&&(elem!=e&&!e.contains(elem))&&(overlappingArea=p(h,elem.getBoundingClientRect()),0<overlappingArea&&(i.percentObscured=100*p(h,elem.getBoundingClientRect()),50<i.percentObscured)))){i.percentViewable=100-i.percentObscured;i.technique=b.TECHNIQUE_DOM_OBSCURING;i.viewabilityState=
b.UNVIEWABLE;n=!0;break a}n=!1}h=!0===n}h&&$dvvideo.DEBUG&&(i.domViewabilityState=this.UNVIEWABLE);$dvvideo.browser.osId==$dvvideo.osIDEnum.iOS&&10>$dvvideo.browser.osVersion&&(i.viewabilityState=b.VIEWABLE,i.focus=!0,i.displayState="fullScreen",i.percentViewable=100,i.technique=b.TECHNIQUE_IPHONE_OVERRIDE);return i};var p=function(a,b){var c=a.width*a.height,d=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left)),f=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));return d*f/
c},s,d=[a.html5.video.calc.standard,a.html5.video.calc.crossDomainIE,a.html5.video.calc.crossDomainFirefox,a.html5.video.calc.intersectionObserver,a.html5.video.calc.safeframeInviewPercentage,a.html5.video.calc.safeframeGeometric,a.html5.video.calc.resourceBased],r;for(r in d)try{if(d[r]){var k=new d[r](g);if(k.isSupported&&k.isSupported(g)){l=k;j=!0;break}}}catch(x){}};a=a||{};a.html5=a.html5||{};a.html5.video=a.html5.video||{};a.html5.video.service=function(a,b,c,d,g){function e(a){$dvvideo.DEBUG&&
console.log("[DVVID_SRC] "+a)}function l(a){var b=z.checkViewability(h.adAsset);b.volume=m.getAdVolume();var c={vpaidData:null,ovvData:b};switch(a){case "OVVLog":e("OVVLOG");u=b.viewabilityState==z.UNMEASURABLE?u+1:0;t=b.viewabilityState==z.VIEWABLE&&!0==b.focus?t+1:0;D(c);break;case "AdImpression":var d=q.getAutoPlayResult({player:h.adAsset.player});b.autoPlayIndicator=d.error?-1:d.indicator}$dvvideo.publish(a,h.adID,c)}function p(a){return function(){try{switch(e(a),l(a),a){case "AdImpression":s(!0);
break;case "AdPaused":x();break;case "AdPlaying":k();break;case "AdVideoComplete":x()}}catch(b){}}}function s(a,b){h.adImpressionCB&&window[h.adImpressionCB]?(window[h.adImpressionCB](n),b&&l("AdImpression"),a&&k()):A||(A=!0,y.injectScript("dvtp_src.js?isdvvid=1&adid="+h.adID+"&tagtype=video&"+i+h.dvp_dvvidtimeout),b&&l("AdImpression"),a&&k())}function r(){l("OVVLog")}function k(){void 0==h.adAsset.checkViewabilityItervalID&&(h.adAsset.checkViewabilityItervalID=setInterval(r,$dvvideo.interval||200))}
function x(){h.adAsset&&void 0!=h.adAsset.checkViewabilityItervalID&&(clearInterval(h.adAsset.checkViewabilityItervalID),h.adAsset.checkViewabilityItervalID=void 0)}function w(a,b){if(a&&a.length)for(var c=a.length;c--;)if(a[c]===b)return!0;return!1}function C(a,b){if(a&&a.length)for(var c=a.length;c--;)if(a[c]===b)return c}var y=this,h={},A=!1,z=a,m,t=0,u=0,E,v,i,B=c||window;B.dv_config=B.dv_config||{};var n,q=g;this.dispose=function(){x()};this.start=function(a){n=a;if(!B._dvvidScriptsInternal||
!B.dvvidProcessed||0==B._dvvidScriptsInternal.length)E=null;else{var c=B._dvvidScriptsInternal.pop();B.dvvidProcessed.push(c);E=c}if(d.dvvid_script_obj=E){var c=E.script.src,f={};try{for(var g=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),e=g.exec(c);null!=e;)"eparams"!==e[1]&&(f[e[1]]=e[2]),e=g.exec(c);v=f}catch(k){v=f}d.tagParamsObj=v;i=E.script.src.substring(E.script.src.indexOf("?")+1)+"&dvvidver="+n;g=v.adid;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|
0;return("x"==a?b:b&3|8).toString(16)});e=new L(g||e);g||(e.isIdGenerated=!0);$dvvideo.assets.push(e);h.adAsset=e;h.adID=e.id;h.dvp_dvvidtimeout="";h.beforeAdLoadCallback=v.DVP_GVACB;h.useBlocking=v.blk;h.blockingCallback=v.DVP_DCB;h.adImpressionCB=v.AICB;h.dvvidVersion=a;1==h.useBlocking&&y.injectScript("dvbs_src.js?isdvvid=1&adid="+h.adID+"&tagformat=2&tagtype=video&dvtagver=6.1.src&"+i);m=b.getVpaidWrapper();m.init(h);h.adAsset.player=m.getPlayer();m.subscribeToVpaidEvents(p);m.registerEventCallback(h.adAsset);
a=m.getPrevEvents();e=g=!0;if(w(a,"AdImpression")){h.dvp_dvvidtimeout="&dvp_dvvidtimeout=1";w(a,"AdVideoComplete")&&(e=g=!1);if(w(a,"AdPaused")&&(!w(a,"AdPlaying")||C(a,"AdPaused")>C(a,"AdPlaying")))g=!1;s(g,e)}}};var D=function(a){10<=t?($dvvideo.publish("OVVImpression",h.adID,a),D=function(){}):5<=u&&($dvvideo.publish("OVVImpressionUnmeasurable",h.adID,a),D=function(){})};this.injectScript=function(a){var b=B.document.createElement("script");b.src=E.src_location+"/"+a;B.document.body.appendChild(b)}};
this.handle=function(){window.$dvvideo=window.$dvvideo||new a.html5.video.api(window);var d=[new a.engagement.autoPlay.ElementDetectionMethod(window.top),new a.engagement.autoPlay.JWPlayerDetectionMethod(window.top),new a.engagement.autoPlay.TimingDetectionMethod(window.top)];(new a.html5.video.service(new a.html5.video.calculator(window),new a.html5.video.partnerWrappers(window),window,this,new a.engagement.autoPlay.AutoPlayCalculator(d))).start(this.getVersion())};this.isApplicable=function(){return!0};
this.onFailure=function(){_dvvid_win._dvvidScriptsInternal.unshift(this.dvvid_script_obj);var a=_dvvid_win.dvvidProcessed,b=this.dvvid_script_obj;null!=a&&(void 0!=a&&b)&&(b=a.indexOf(b),-1!=b&&a.splice(b,1))};this.getVersionParamName=function(){return"dvvidver"};this.getVersion=function(){return"28"}};


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.tpsErrAddress = window._dv_win.dv_config.tpsAddress || 'tps30.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0) {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=3138058&dvtagver=dvvid.src', errorsArr);
            }
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=3138058&dvtagver=dvvid.src&jsver=0&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (e) { }
        }
    };
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler30.prototype = dv_baseHandlerIns;
dv_handler30.prototype.constructor = dv_handler30;

    var dv_handlersDefs = [{handler: new dv_handler30(), minRate: 0, maxRate: 90}] ;
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }
