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
        var request;
        var errorObj = null;

        try {
            request = handler.createRequest();
            if (request && !request.isSev1) {
                var url = request.url || request;
                if (url) {
                    if (!handler.sendRequest(url)) {
                        errorObj = createAndGetError('sendRequest failed.',
                            url,
                            handler.getVersion(),
                            handler.getVersionParamName(),
                            handler.dv_script);
                    }
                } else {
                    errorObj = createAndGetError('createRequest failed.',
                        url,
                        handler.getVersion(),
                        handler.getVersionParamName(),
                        handler.dv_script,
                        handler.dvScripts,
                        handler.dvStep,
                        handler.dvOther
                    );
                }
            }
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, request ? (request.url || request) : null, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script, dvScripts, dvStep, dvOther) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD') {
            errorObj['dvp_isOnHead'] = '1';
        }
        if (url) {
            errorObj['dvp_jsErrUrl'] = url;
        }
        if (dvScripts) {
            var dvScriptsResult = '';
            for (var id in dvScripts) {
                if (dvScripts[id] && dvScripts[id].src) {
                    dvScriptsResult += encodeURIComponent(dvScripts[id].src) + ":" + dvScripts[id].isContain + ",";
                }
            }
            
            
            
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

function dv_GetParam(url, name, checkFromStart) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = (checkFromStart ? "(?:\\?|&|^)" : "[\\?&]") + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_SendErrorImp(serverUrl, errorsArr) {
    for (var j = 0; j < errorsArr.length; j++) {
        var errorQueryString = '';
        var errorObj = errorsArr[j];
        for (key in errorObj) {
            if (errorObj.hasOwnProperty(key)) {
                if (key.indexOf('dvp_jsErrUrl') == -1) {
                    errorQueryString += '&' + key + '=' + errorObj[key];
                }
                else {
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

        var windowProtocol = 'https:';
        var sslFlag = '&ssl=1';

        var errorImp = windowProtocol + '//' + serverUrl + sslFlag + errorQueryString;
        dv_sendRequest(errorImp);
    }
}

function dv_sendRequest(url) {
    document.write('<scr' + 'ipt language="javascript" src="' + url + '"></scr' + 'ipt>');
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dvBsrType() {
    'use strict';
    var that = this;
    var eventsForDispatch = {};

    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({Func: func, ActionName: actionName});
        };

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () {
                            return funcObject.Func(uid);
                        });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        };
    };

    this.domUtilities = new function () {
        this.addImage = function (url, parentElement) {
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);
        };

        this.addScriptResource = function (url, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        };
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () {
    };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        };
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () {
    };

    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        };

        this.getViewabilityData = function () {
        };
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    this.getTagObjectByService = function (serviceName) {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] === 'object'
                && this.tags[impressionId].services
                && this.tags[impressionId].services[serviceName]
                && !this.tags[impressionId].services[serviceName].isProcessed) {
                this.tags[impressionId].services[serviceName].isProcessed = true;
                return this.tags[impressionId];
            }
        }

        return null;
    };

    this.addService = function (impressionId, serviceName, paramsObject) {
        if (!impressionId || !serviceName)
            return;

        if (!this.tags[impressionId])
            return;
        else {
            if (!this.tags[impressionId].services)
                this.tags[impressionId].services = {};

            this.tags[impressionId].services[serviceName] = {
                params: paramsObject,
                isProcessed: false
            };
        }
    };

    this.Enums = {
        BrowserId: {Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5},
        TrafficScenario: {OnPage: 1, SameDomain: 2, CrossDomain: 128}
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) {
            return false;
        }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    };

    
    var messagesClass = function () {
        var waitingMessages = [];

        this.registerMsg = function(dvFrame, data) {
            if (!waitingMessages[dvFrame.$frmId]) {
                waitingMessages[dvFrame.$frmId] = [];
            }

            waitingMessages[dvFrame.$frmId].push(data);

            if (dvFrame.$uid) {
                sendWaitingEventsForFrame(dvFrame, dvFrame.$uid);
            }
        };

        this.startSendingEvents = function(dvFrame, impID) {
            sendWaitingEventsForFrame(dvFrame, impID);
            
        };

        function sendWaitingEventsForFrame(dvFrame, impID) {
            if (waitingMessages[dvFrame.$frmId]) {
                var eventObject = {};
                for (var i = 0; i < waitingMessages[dvFrame.$frmId].length; i++) {
                    var obj = waitingMessages[dvFrame.$frmId].pop();
                    for (var key in obj) {
                        if (typeof obj[key] !== 'function' && obj.hasOwnProperty(key)) {
                            eventObject[key] = obj[key];
                        }
                    }
                }
                that.registerEventCall(impID, eventObject);
            }
        }

        function startMessageManager() {
            for (var frm in waitingMessages) {
                if (frm && frm.$uid) {
                    sendWaitingEventsForFrame(frm, frm.$uid);
                }
            }
            setTimeout(startMessageManager, 10);
        }
    };
    this.messages = new messagesClass();

    this.dispatchRegisteredEventsFromAllTags = function () {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] !== 'function' && typeof this.tags[impressionId] !== 'undefined')
                dispatchEventCalls(impressionId, this);
        }
    };

    var dispatchEventCalls = function (impressionId, dvObj) {
        var tag = dvObj.tags[impressionId];
        var eventObj = eventsForDispatch[impressionId];
        if (typeof eventObj !== 'undefined' && eventObj != null) {
            var url = tag.protocol + '//' + tag.ServerPublicDns + "/bsevent.gif?impid=" + impressionId + '&' + createQueryStringParams(eventObj);
            dvObj.domUtilities.addImage(url, tag.tagElement.parentElement);
            eventsForDispatch[impressionId] = null;
        }
    };

    this.registerEventCall = function (impressionId, eventObject, timeoutMs) {
        addEventCallForDispatch(impressionId, eventObject);

        if (typeof timeoutMs === 'undefined' || timeoutMs == 0 || isNaN(timeoutMs))
            dispatchEventCallsNow(this, impressionId, eventObject);
        else {
            if (timeoutMs > 2000)
                timeoutMs = 2000;

            var dvObj = this;
            setTimeout(function () {
                dispatchEventCalls(impressionId, dvObj);
            }, timeoutMs);
        }
    };

    var dispatchEventCallsNow = function (dvObj, impressionId, eventObject) {
        addEventCallForDispatch(impressionId, eventObject);
        dispatchEventCalls(impressionId, dvObj);
    };

    var addEventCallForDispatch = function (impressionId, eventObject) {
        for (var key in eventObject) {
            if (typeof eventObject[key] !== 'function' && eventObject.hasOwnProperty(key)) {
                if (!eventsForDispatch[impressionId])
                    eventsForDispatch[impressionId] = {};
                eventsForDispatch[impressionId][key] = eventObject[key];
            }
        }
    };

    if (window.addEventListener) {
        window.addEventListener('unload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.addEventListener('beforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.attachEvent('onbeforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else {
        window.document.body.onunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
        window.document.body.onbeforeunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
    }

    var createQueryStringParams = function (values) {
        var params = '';
        for (var key in values) {
            if (typeof values[key] !== 'function') {
                var value = encodeURIComponent(values[key]);
                if (params === '')
                    params += key + '=' + value;
                else
                    params += '&' + key + '=' + value;
            }
        }

        return params;
    };
}

function dv_handler52(){function M(c){var b="http:",a=window._dv_win.location.toString().match("^http(?:s)?");if("https"==c.match("^https")&&("https"==a||"http"!=a))b="https:";return b}function A(c){var b=window._dv_win.dvRecoveryObj;if(b){var a=dv_GetParam(c.dvparams,"ctx",!0),b=b[a]?b[a].RecoveryTagID:b._fallback_?b._fallback_.RecoveryTagID:1;1===b&&c.tagsrc?document.write(c.tagsrc):2===b&&c.altsrc&&document.write(c.altsrc);return!0}return!1}function N(){var c;c=!window._dv_win.dv_config||!window._dv_win.dv_config.isUT?
window._dv_win.bsredirect5ScriptsInternal.pop():window._dv_win.bsredirect5ScriptsInternal[window._dv_win.bsredirect5ScriptsInternal.length-1];window._dv_win.bsredirect5Processed.push(c);return c}function O(c,b){var a=document.createElement("iframe");a.name=a.id="iframe_"+dv_GetRnd();a.width=0;a.height=0;a.id=b;a.style.display="none";a.src=c;return a}function G(c,b,a){var a=a||150,e=window._dv_win||window;if(e.document&&e.document.body)return b&&b.parentNode?b.parentNode.insertBefore(c,b):e.document.body.insertBefore(c,
e.document.body.firstChild),!0;if(0<a)setTimeout(function(){G(c,b,--a)},20);else return!1}function H(c){var b=null;try{if(b=c&&c.contentDocument)return b}catch(a){}try{if(b=c.contentWindow&&c.contentWindow.document)return b}catch(e){}try{if(b=window._dv_win.frames&&window._dv_win.frames[c.name]&&window._dv_win.frames[c.name].document)return b}catch(g){}return null}function I(c,b,a,e,g,d,p){var f,j;f=window._dv_win.dv_config&&window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:dv_GetRnd();
var i,n=window.parent.postMessage&&window.JSON;j=!0;var q=!1;if("0"==dv_GetParam(c.dvparams,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)q=!0;if(n&&!1==q)try{q="https://cdn3.doubleverify.com/bst2tv3.html",window._dv_win&&(window._dv_win.dv_config&&window._dv_win.dv_config.bst2turl)&&(q=window._dv_win.dv_config.bst2turl),i=O(q,"bst2t_"+f),j=G(i)}catch(I){}var x,P=(x=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&
"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream)?"https:":M(p.src),Q="0";"https:"==P&&(Q="1");i=c.rand;var R="__verify_callback_"+i,S="__tagObject_callback_"+i;window[R]=function(b){try{if(void 0==b.ResultID)document.write(1!=b?c.tagsrc:c.altsrc);else switch(b.ResultID){case 1:b.Passback?document.write(decodeURIComponent(b.Passback)):document.write(c.altsrc);break;case 2:case 3:document.write(c.tagsrc)}}catch(a){}};x?i="https:":(i="http:","http:"!=window._dv_win.location.protocol&&
(i="https:"));var A=i,T=x?"https:":M(p.src),U="0";"https:"===T&&(U="1");var J=window._dv_win.document.visibilityState;window[S]=function(b){try{var a={};a.protocol=A;a.ssl=U;a.dv_protocol=T;a.serverPublicDns=b.ServerPublicDns;a.ServerPublicDns=b.ServerPublicDns;a.tagElement=p;a.redirect=c;a.impressionId=b.ImpressionID;window._dv_win.$dvbsr.tags.add(b.ImpressionID,a);if(p.dvFrmWin){var d=window._dv_win.$dvbsr;p.dvFrmWin.$uid=b.ImpressionID;d.messages&&d.messages.startSendingEvents&&d.messages.startSendingEvents(p.dvFrmWin,
b.ImpressionID)}var e=function(){var a=window._dv_win.document.visibilityState;"prerender"===J&&("prerender"!==a&&"unloaded"!==a)&&(J=a,window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,{prndr:0}),window._dv_win.document.removeEventListener(f,e))};if("prerender"===J)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,{prndr:0});else{var f;"undefined"!==typeof window._dv_win.document.hidden?f="visibilitychange":
"undefined"!==typeof window._dv_win.document.mozHidden?f="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?f="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(f="webkitvisibilitychange");window._dv_win.document.addEventListener(f,e,!1)}var g;var a={verifyc:{prefix:"vf",stats:[{name:"duration",prefix:"dur"}]}},i;b:{d={};try{if(window&&window.performance&&window.performance.getEntries)for(var h=window.performance.getEntries(),j=0;j<h.length;j++){var k=
h[j],l=k.name.match(/.*\/(.+?)\./);if(l&&l[1]){var n=l[1].replace(/\d+$/,""),m=a[n];if(m){for(var q=0;q<m.stats.length;q++){var r=m.stats[q];d[m.prefix+r.prefix]=Math.round(k[r.name])}delete a[n];if(!V(a))break}}}i=d;break b}catch(s){}i=void 0}g=i&&V(i)?i:void 0;g&&window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,g)}catch(t){}};void 0==c.dvregion&&(c.dvregion=0);var K="",q=i="";try{for(var l=a,h=0;10>h&&l!=window.top;)h++,l=l.parent;a.depth=h;dv_additionalUrl=X(a);i="&aUrl="+encodeURIComponent(dv_additionalUrl.url);
q="&aUrlD="+dv_additionalUrl.depth;K=a.depth+e;g&&a.depth--}catch(N){q=i=K=a.depth=""}void 0!=c.aUrl&&(i="&aUrl="+c.aUrl);var B;e=function(){try{return!!window.sessionStorage}catch(b){return!0}};g=function(){try{return!!window.localStorage}catch(b){return!0}};l=function(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var a=b.getContext("2d");a.textBaseline="top";a.font="14px 'Arial'";a.textBaseline="alphabetic";a.fillStyle="#f60";a.fillRect(0,0,62,20);a.fillStyle="#069";
a.fillText("!image!",2,15);a.fillStyle="rgba(102, 204, 0, 0.7)";a.fillText("!image!",4,17);return b.toDataURL()}return null};try{h=[];h.push(["lang",navigator.language||navigator.browserLanguage]);h.push(["tz",(new Date).getTimezoneOffset()]);h.push(["hss",e()?"1":"0"]);h.push(["hls",g()?"1":"0"]);h.push(["odb",typeof window.openDatabase||""]);h.push(["cpu",navigator.cpuClass||""]);h.push(["pf",navigator.platform||""]);h.push(["dnt",navigator.doNotTrack||""]);h.push(["canv",l()]);var m=h.join("=!!!=");
if(null==m||""==m)B="";else{for(var e=function(b){for(var a="",c,d=7;0<=d;d--)c=b>>>4*d&15,a+=c.toString(16);return a},g=[1518500249,1859775393,2400959708,3395469782],m=m+String.fromCharCode(128),v=Math.ceil((m.length/4+2)/16),w=Array(v),l=0;l<v;l++){w[l]=Array(16);for(h=0;16>h;h++)w[l][h]=m.charCodeAt(64*l+4*h)<<24|m.charCodeAt(64*l+4*h+1)<<16|m.charCodeAt(64*l+4*h+2)<<8|m.charCodeAt(64*l+4*h+3)}w[v-1][14]=8*(m.length-1)/Math.pow(2,32);w[v-1][14]=Math.floor(w[v-1][14]);w[v-1][15]=8*(m.length-1)&
4294967295;for(var m=1732584193,h=4023233417,C=2562383102,D=271733878,E=3285377520,r=Array(80),y,s,t,u,F,l=0;l<v;l++){for(var k=0;16>k;k++)r[k]=w[l][k];for(k=16;80>k;k++)r[k]=(r[k-3]^r[k-8]^r[k-14]^r[k-16])<<1|(r[k-3]^r[k-8]^r[k-14]^r[k-16])>>>31;y=m;s=h;t=C;u=D;F=E;for(k=0;80>k;k++){var W=Math.floor(k/20),H=y<<5|y>>>27,z;c:{switch(W){case 0:z=s&t^~s&u;break c;case 1:z=s^t^u;break c;case 2:z=s&t^s&u^t&u;break c;case 3:z=s^t^u;break c}z=void 0}var Y=H+z+F+g[W]+r[k]&4294967295;F=u;u=t;t=s<<30|s>>>2;
s=y;y=Y}m=m+y&4294967295;h=h+s&4294967295;C=C+t&4294967295;D=D+u&4294967295;E=E+F&4294967295}B=e(m)+e(h)+e(C)+e(D)+e(E)}}catch(aa){B=null}a=(window._dv_win&&window._dv_win.dv_config&&window._dv_win.dv_config.verifyJSCURL?dvConfig.verifyJSCURL+"?":P+"//rtb"+c.dvregion+".doubleverify.com/verifyc.js?")+c.dvparams+"&num=5&srcurlD="+a.depth+"&callback="+R+"&jsTagObjCallback="+S+"&ssl="+Q+(x?"&dvf=0":"")+"&refD="+K+"&htmlmsging="+(n?"1":"0")+"&guid="+f+(null!=B?"&aadid="+B:"");b="dv_url="+encodeURIComponent(b);
if(!1==j||d)a=a+("&dvp_isBodyExistOnLoad="+(j?"1":"0"))+("&dvp_isOnHead="+(d?"1":"0"));if((d=window[L("=@42E:@?")][L("2?46DE@C~C:8:?D")])&&0<d.length){j=[];j[0]=window.location.protocol+"//"+window.location.hostname;for(f=0;f<d.length;f++)j[f+1]=d[f];d=j.reverse().join(",")}else d=null;d&&(b+="&ancChain="+encodeURIComponent(d));if(!1==/MSIE (\d+\.\d+);/.test(navigator.userAgent)||7<new Number(RegExp.$1)||2E3>=i.length+q.length+a.length)a+=q,b+=i;if(void 0!=window._dv_win.$dvbsr.CommonData.BrowserId&&
void 0!=window._dv_win.$dvbsr.CommonData.BrowserVersion&&void 0!=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent)f=window._dv_win.$dvbsr.CommonData.BrowserId,j=window._dv_win.$dvbsr.CommonData.BrowserVersion,d=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent;else{f=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];d=0;j="";i=navigator.userAgent;for(n=0;n<f.length;n++)if(null!=i.match(RegExp(f[n].brRegex))){d=f[n].id;if(null==f[n].verRegex)break;i=i.match(RegExp(f[n].verRegex+"[0-9]*"));null!=i&&(j=i[0].match(RegExp(f[n].verRegex)),j=i[0].replace(j[0],
""));break}f=n=Z();j=n===d?j:"";window._dv_win.$dvbsr.CommonData.BrowserId=f;window._dv_win.$dvbsr.CommonData.BrowserVersion=j;window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent=d}a+="&brid="+f+"&brver="+j+"&bridua="+d;"prerender"===window._dv_win.document.visibilityState&&(a+="&prndr=1");d=$();a+="&vavbkt="+d.vdcd;a+="&lvvn="+d.vdcv;""!=d.err&&(a+="&dvp_idcerr="+encodeURIComponent(d.err));return a+"&eparams="+encodeURIComponent(L(b))}function $(){var c="";try{var b=eval(function(a,b,c,p,f,j){f=
function(a){return(a<b?"":f(parseInt(a/b)))+(35<(a%=b)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;c--;)j[f(c)]=p[c]||f(c);p=[function(a){return j[a]}];f=function(){return"\\w+"};c=1}for(;c--;)p[c]&&(a=a.replace(RegExp("\\b"+f(c)+"\\b","g"),p[c]));return a}("(G(){1A{1A{36('1z?3o:3h')}1B(e){d{1x:\"-4m\"}}n 1h=[1z];1A{n V=1z;67(V!=V.3r&&V.1K.5F.5l){1h.1y(V.1K);V=V.1K}}1B(e){}G 1P(19){1A{1v(n i=0;i<1h.1d;i++){16(19(1h[i]))d 1h[i]==1z.3r?-1:1}d 0}1B(e){d e.5X||'5D'}}G 3m(1a){d 1P(G(O){d O[1a]!=56})}G 37(O,35,19){1v(n 1a 57 O){16(1a.3a(35)>-1&&(!19||19(O[1a])))d 3o}d 3h}G g(s){n h=\"\",t=\"3N.;j&4M}4N/0:51'4r=B(4z-4e!,4k)5r\\\\{ >4o+4l\\\"4A<\";1v(i=0;i<s.1d;i++)f=s.3b(i),e=t.3a(f),0<=e&&(f=t.3b((e+41)%82)),h+=f;d h}n c=['4G\"1m-4c\"3G\"22','p','l','60&p','p','{','\\\\<}4\\\\3M-3D<\"3O\\\\<}4\\\\3z<Z?\"6','e','6p','-5,!u<}\"66}\"','p','J','-5g}\"<53','p','=o','\\\\<}4\\\\31\"2f\"w\\\\<}4\\\\31\"2f\"5v}2\"<,u\"<5}?\"6','e','J=',':<5u}T}<\"','p','h','\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"2n<N\"[1s*1t\\\\\\\\2r-5K<2L\"2t\"4b]1c}C\"13','e','4L','\\\\<}4\\\\4v;5Q||\\\\<}4\\\\4t?\"6','e','+o','\"1f\\\\<}4\\\\1T\"I<-4s\"29\"5\"4w}26<}4O\"1f\\\\<}4\\\\1l}1E>1D-1C}2}\"29\"5\"46}26<}3Z','e','=J','W}U\"<5}3T\"7}F\\\\<}4\\\\[3R}3U:3W]m}b\\\\<}4\\\\[t:2b\"4I]m}b\\\\<}4\\\\[5W})5-u<}t]m}b\\\\<}4\\\\[5U]m}b\\\\<}4\\\\[5I}5P]m}64','e','65',':6g}<\"H-1Q/2M','p','6f','\\\\<}4\\\\17<U/1o}b\\\\<}4\\\\17<U/!m}9','e','=l','10\\\\<}4\\\\69}/68}U\"<5}5h\"7}59<2F}58\\\\4Z\"5E}/m}2z','e','=S=','\\\\<}4\\\\E-5p\\\\<}4\\\\E-5s\"5\\\\U?\"6','e','+J','\\\\<}4\\\\25!5t\\\\<}4\\\\25!5q)p?\"6','e','5m','-}\"5o','p','x{','\\\\<}4\\\\E<2q-5w}5C\\\\<}4\\\\5B\"5x-5y\\\\<}4\\\\5z.42-2}\"5A\\\\<}4\\\\5k<N\"H}5j?\"6','e','+S','W}U\"<5}K\"X\"7}F\\\\<}4\\\\y<1O\"1f\\\\<}4\\\\y<2j}U\"<5}1j\\\\<}4\\\\1n-2.42-2}\"w\\\\<}4\\\\1n-2.42-2}\"1p\"L\"\"M<30\"2Y\"2S<\"<5}2R\"2P\\\\<Z\"2T<Q\"2V{2X:3q\\\\2W<1k}38-39<}3k\"3j\"1q%3l<Q\"1q%3n?\"3i\"14\"7}3c','e','54','55:,','p','52','\\\\<}4\\\\4Y\\\\<}4\\\\23\"2O\\\\<}4\\\\23\"1Y,T}1Z+++++1j\\\\<}4\\\\50\\\\<}4\\\\21\"2O\\\\<}4\\\\21\"1Y,T}1Z+++++t','e','5i','\\\\<}4\\\\5f\"1Q\"5e}b\\\\<}4\\\\E\\\\5a<M?\"6','e','5b','W}U\"<5}K:5c\\\\<}4\\\\8-2}\"1p\".42-2}\"5d-5G<N\"5H<6c<6d}C\"3H<6e<6b[<]E\"27\"1m}\"2}\"6a[<]E\"27\"1m}\"2}\"E<}18&6n\"1\\\\<}4\\\\2A\\\\6o\\\\<}4\\\\2A\\\\1l}1E>1D-1C}2}\"z<6m-2}\"6l\"2.42-2}\"6h=6i\"7}6j\"7}P=6k','e','x','5R)','p','+','\\\\<}4\\\\2I:5O<5}5N\\\\<}4\\\\2I\"5J?\"6','e','5L','L!!5S.5T.H 61','p','x=','\\\\<}4\\\\62}63)u\"5Z\\\\<}4\\\\5Y-2?\"6','e','+=','\\\\<}4\\\\2x\"5V\\\\<}4\\\\2x\"4X--6q<\"2f?\"6','e','x+','\\\\<}4\\\\8-2}\"2p}\"2o<N\"w\\\\<}4\\\\8-2}\"2p}\"2o<N\"3X\")3Y\"<:3V\"3Q}9?\"6','e','+x','\\\\<}4\\\\2m)u\"3S\\\\<}4\\\\2m)u\"40?\"6','e','49','\\\\<}4\\\\2w}s<4a\\\\<}4\\\\2w}s<48\" 47-43?\"6','e','44','\\\\<}4\\\\E\"45-2}\"E(k\"3P<N\"[1s*3L\"3y<3A]3x?\"6','e','+e','\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"3C<:[\\\\3w}}2M][\\\\3t,5}2]3u}C\"13','e','3v','10\\\\<}4\\\\3B}3K\\\\<}4\\\\3J$3E','e','3F',':3I<Z','p','4W','\\\\<}4\\\\E-4d\\\\<}4\\\\E-4J}4K\\\\<}4\\\\E-4H<4C?\"6','e','4D','$H:4E}Z!4F','p','+h','\\\\<}4\\\\E\"1J\\\\<}4\\\\E\"1L-4T?\"6','e','4U','10\\\\<}4\\\\4V:,2H}U\"<5}1r\"7}4S<4R<2F}2z','e','4P','\\\\<}4\\\\17<U/4Q&1V\"E/1W\\\\<}4\\\\17<U/4B}C\"3d\\\\<}4\\\\17<U/f[&1V\"E/1W\\\\<}4\\\\17<U/4n[S]]1T\"4j}9?\"6','e','4g','4h}4i}4p>2s','p','4q','\\\\<}4\\\\1g:<1R}s<4x}b\\\\<}4\\\\1g:<1R}s<4y<}f\"u}2G\\\\<}4\\\\2K\\\\<}4\\\\1g:<1R}s<C[S]E:2b\"1o}9','e','l{','4u\\'<}4\\\\T}5n','p','==','\\\\<}4\\\\y<1O\\\\<}4\\\\y<2B\\\\<Z\"2C\\\\<}4\\\\y<2E<Q\"?\"6','e','6N','\\\\<}4\\\\2a}28-2c\"}2d<8k\\\\<}4\\\\2a}28-2c\"}2d/2Q?\"6','e','=8l','\\\\<}4\\\\E\"2f\"8m\\\\<}4\\\\8j<8e?\"6','e','o{','\\\\<}4\\\\8f-)2\"2U\"w\\\\<}4\\\\1g-8g\\\\1m}s<C?\"6','e','+l','\\\\<}4\\\\2g-2\"8h\\\\<}4\\\\2g-2\"8n<Z?\"6','e','+{','\\\\<}4\\\\E:8o}b\\\\<}4\\\\8v-8w}b\\\\<}4\\\\E:8x\"<8u\\\\}m}9?\"6','e','{S','\\\\<}4\\\\1i}\"11}8t\"-8p\"2f\"q\\\\<}4\\\\v\"<5}8q?\"6','e','o+',' &H)&8r','p','8s','\\\\<}4\\\\E.:2}\"c\"<8d}b\\\\<}4\\\\8c}b\\\\<}4\\\\7W<}f\"u}2G\\\\<}4\\\\2K\\\\<}4\\\\1l:}\"m}9','e','7X','7Y\"5-\\'2J:2M','p','J{','\\\\<}4\\\\7Z\"5-\\'2J:7V}7U=7Q:D|q=2y|7R-5|7S--1Q/2\"|2N-2y|80\"=81\"2f\"q\\\\<}4\\\\1M\"2h:2i<1k}D?\"6','e','=8a','\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"2n<N\"[1s*1t\\\\\\\\2r-2L\"2t/8b<6r]1c}C\"13','e','87',')8z!84}s<C','p','86','\\\\<}4\\\\2u<<8y\\\\<}4\\\\2u<<8D<}f\"u}94?\"6','e','{l','\\\\<}4\\\\2v.L>g;H\\'T)Y.8X\\\\<}4\\\\2v.L>g;8Y&&8Z>H\\'T)Y.I?\"6','e','l=','10\\\\<}4\\\\91\\\\8U>8V}U\"<5}1r\"7}F\"2l}U\"<5}90\\\\<}4\\\\93<2q-20\"u\"92}U\"<5}1r\"7}F\"2l}U\"<5}8S','e','{J','H:<Z<:5','p','8F','\\\\<}4\\\\m\\\\<}4\\\\E\"8G\\\\<}4\\\\v\"<5}3g\"3f}/1j\\\\<}4\\\\8-2}\"3e<}18&8H\\\\<}4\\\\v\"<5}1b\"}u-8E=?W}U\"<5}K\"X\"7}8T\\\\<}4\\\\1i}\"v\"<5}8A\"14\"7}F\"8B','e','8C','\\\\<}4\\\\1F-U\\\\w\\\\<}4\\\\1F-8I\\\\<}4\\\\1F-\\\\<}?\"6','e','8J','8P-N:8Q','p','8R','\\\\<}4\\\\1G\"8O\\\\<}4\\\\1G\"8N\"<5}8K\\\\<}4\\\\1G\"8L||\\\\<}4\\\\8M?\"6','e','h+','83<u-7O/','p','{=','\\\\<}4\\\\v\"<5}1b\"}u-6U\\\\<}4\\\\1l}1E>1D-1C}2}\"q\\\\<}4\\\\v\"<5}1b\"}u-2D','e','=S','\\\\<}4\\\\6W\"1f\\\\<}4\\\\6T}U\"<5}1j\\\\<}4\\\\6S?\"6','e','{o','\\\\<}4\\\\6O}<6P\\\\<}4\\\\6Q}?\"6','e','=6R','\\\\<}4\\\\y<1O\\\\<}4\\\\y<2B\\\\<Z\"2C\\\\<}4\\\\y<2E<Q\"w\"1f\\\\<}4\\\\y<2j}U\"<5}t?\"6','e','J+','c>A','p','=','W}U\"<5}K\"X\"7}F\\\\<}4\\\\E\"6Y\"74:75}76^[73,][72+]6Z\\'<}4\\\\70\"2f\"q\\\\<}4\\\\E}u-6M\"14\"7}6y=6z','e','6A','\\\\<}4\\\\1S:!34\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"1N<:[f\"22*6x<Q\"6w]6s<:[<Z*1t:Z,1I]1c}C\"13','e','=6t','\\\\<}4\\\\1X\"<24-1U-u}6u\\\\<}4\\\\1X\"<24-1U-u}6v?\"6','e','{x','6C}7K','p','6J','\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"1N<:[<Z*1t:Z,1I]F:<6K[<Z*6L]1c}C\"13','e','h=','6I-2}\"v\"<5}m}9','e','6H','\\\\<}4\\\\8-2}\"E(k\"12}9?\\\\<}4\\\\8-2}\"E(k\"1N<:[<Z*6D}1I]R<-C[1s*6E]1c}C\"13','e','6F','10\\\\<}4\\\\2e\"\\\\6G\\\\<}4\\\\2e\"\\\\77','e','78','\\\\<}4\\\\1M\"w\\\\<}4\\\\1M\"2h:2i<1k}?\"6','e','{e','\\\\<}4\\\\7A}Z<}7B}b\\\\<}4\\\\7C<f\"m}b\\\\<}4\\\\7y/<}C!!7u<\"42.42-2}\"1o}b\\\\<}4\\\\7v\"<5}m}9?\"6','e','7w','T>;7x\"<4f','p','h{','\\\\<}4\\\\7D<u-7E\\\\7L}b\\\\<}4\\\\1g<}7M}9?\"6','e','7N','\\\\<}4\\\\E\"1J\\\\<}4\\\\E\"1L-3s}U\"<5}K\"X\"7}F\\\\<}4\\\\1i}\"v\"<5}1b\"E<}18&3p}33=w\\\\<}4\\\\1i}\"8-2}\"1p\".42-2}\"7J}\"u<}7I}7F\"14\"7}F\"32?\"6','e','{h','\\\\<}4\\\\7H\\\\<}4\\\\7t}<(7s?\"6','e','7f','\\\\<}4\\\\7g<U-2Z<7h&p?10\\\\<}4\\\\7e<U-2Z<79/2H}U\"<5}1r\"7}F\"7a','e','=7b','7c\\'<7i\"','p','{{','\\\\<}4\\\\E\"1J\\\\<}4\\\\E\"1L-3s}U\"<5}K\"X\"7}F\\\\<}4\\\\1i}\"v\"<5}1b\"E<}18&3p}33=7j\"14\"7}F\"32?\"6','e','7p','W}U\"<5}K\"X\"7}F\\\\<}4\\\\1S:!34\\\\<}4\\\\1n-2.42-2}\"w\\\\<}4\\\\1n-2.42-2}\"1p\"L\"\"M<30\"2Y\"2S<\"<5}2R\"2P\\\\<Z\"2T<Q\"2V{2X:3q\\\\2W<1k}38-39<}3k\"3j\"1q%3l<Q\"1q%3n?\"3i\"14\"7}3c','e','{+','\\\\<}4\\\\7o<7n a}7l}b\\\\<}4\\\\E}7m\"7k 7r- 1o}9','e','7q','7d\\\\<}4\\\\v\"<5}1S}7G\"5M&M<C<}7z}C\"3d\\\\<}4\\\\v\"<5}3g\"3f}/1j\\\\<}4\\\\8-2}\"6B\\\\<}4\\\\8-2}\"3e<}18&71[S]6X=?\"6','e','l+'];n 1w=[];n 1e=[];1v(n j=0;j<c.1d;j+=3){n r=c[j+1]=='p'?3m(g(c[j])):1P(G(O){d O.36('(G(){'+37.7P()+';d '+g(c[j])+'})();')});n 1u=6V(g(c[j+2]));16(r>0||r<0){1w.1y(r*1u)}8W 16(85 r=='89'){1w.1y(-7T*1u);1e.1y(1u+\"=\"+r)}16(1e.1d>=15)d{1x:r}}n 1H={1x:1w.2k(\",\")};16(1e.1d>0)1H.8i=1e.2k(\"&\");d 1H}1B(e){d{1x:\"-88\"}}})();",
62,563,"    Z5  Ma2vsu4f2 aM EZ5Ua a44  a44OO  return       a2MQ0242U  P1 var        E45Uu OO  E3        function _   qD8    wnd  C3     tmpWnd qsa MQ8M2   U5q  5ML44P1 3RSvsu4f2 U3q2D8M2  if EBM Z27 func prop E35f WDE42 length errors QN25sF E_ wndz ENuM2 tOO ZZ2 E2 g5 EsMu fP1 EC2 vFoS q5D8M2 fMU  id for results res push window try catch N5 Tg5 U5Z2c Euf EuZ response _t UIuCTZOO parent UT EfaNN_uZf_35f 5ML44qWZ M5OO ch uM ZU5 Eu Ef2 fC_ BV2U 2Qfq Ea Q42E Z2711t  EuZ_lEf Q42 EuZ_hEf _7Z E_Y Z2s  5Mu ENM5 ENu uf _NuM 2M_ zt__  E__N _5 2MM M511tsa join QN25sF511tsa EufB 5ML44qWfUM 0UM E_UaMM2 sMu BuZfEU5  MuU E__ EcIT_0 ELZg5 EU uZf a44nD z5 M5E 3OO  M5E32 ZP1 U25sF tzsa E27 ALZ02M ELMMuQOO kN7   Q42OO 2HFB5MZ2MvFSN7HF  vFuBf54a Q42tD11tN5f 3vFJlSN7HF32  vFl vF3 SN7HF5 2qtf  Ba Ef35M Ma2HnnDqD uNfQftD11m 4uQ2MOO str eval co HF uMC indexOf charAt Fsu4f2HnnDqD 3RSOO EM2s2MM2ME vB4u E3M2sP1tuB5a false Ma2vsu4f2nUu vFmheSN7HF42s m42s HFM ex Ht true sqtfQ 2Ms45 top NTZOOqsa Um tDE42 eS UmBu WD kC5 ENaBf_uZ_faB UEVft zt__uZ_M 5ML44qtZ 5Zu4 _tD Jl 2Z0  u_faB zt_ f_tDOOU5q 1tk27 ENaBf_uZ_uZ Ue QOO 5MqWfUM 35ZP1 tf5a u_Z2U5Z2OO qD8M2 ZA2 2r2 24t EZ5p5 2s2MI5pu 2Zt ujuM   2cM4 JJ uCUuZ2OOZ5Ua QN2P1ta Mu CEC2 oo COO EVft Na 2MUaMQOO uic2EHVO  ox M2 5IMu aNP1 LnG lkSvfxWX 99 fD NhCZ fY45 hx Kt 25a E7GXLss0aBTZIuC UufUuZ2 E7LZfKrA QN211ta CP1 CF Q6T 1bqyJIma fDE42 NLZZM2ff Je V0 7A5C C2 2MUaMQE r5Z2t 2MUaMQEU5 sOO eo PzA YDoMw8FRp3gd94 2ZtOO lJ fOO f32M_faB F5ENaB4 NTZ oJ zt_M hJ 7__E2U EuZ_hOO IuMC2 EuZ_lOO s7 he u4f xx _M null in a44OO5BVEu445 F5BVEa 2BfM2Z xo uMF21 fbQIuCpu aM4P1 Ef fgM2Z2 q5BVD8M2 xl 5Z2f EfUM href lS s5 M__ UCMOO AEBuf2g  UCME AOO ZBu r5 2_M2s2M2 2TsMu 2OO EuZZ I5b5ZQOO EaNZu U2OO unknown b4u location 2qtfUM tDHs5Mq tB IQN2 kUM xJ  _V5V5OO 2Mf LMMt 24N2MTZ Ld0 _ALb A_pLr tUBt 7__OO tUZ message EuZZTsMu uOO  cAA_cg EA5Cba Z42 a44nDqD ee g5a while Mtzsa zt_4 OO2 sq2 1SH i2E42 99D ho u_a tDRm DM2 PSHM2 HnDqD EUM2u 1Z5Ua sqt E2fUuN2z21 xh MU0 fN4uQLZfEVft FZ So uC2MOO uC2MEUB vFSN7t 1t32 FP HnnDqD xe EM2s2MM2MOO B24 1tB2uU5 1tNk4CEN3Nt oe B__tDOOU5q eh Z5Ua xS Z25 1tfMmN4uQ2Mt 2DnUu Jh ELZ0 N2MOO EuZfBQuZf Sh E5U4U5qDEN4uQ E5U4U511tsa 2P1 parseInt E5U4U5OO D11m 5NENM5U2ff_ 8lzn kE squ Sm um uC_ uMfP1 a44OOk B_UB_tD lh ubuf2b45U Ma2nDvsu4f2 Sl LZZ035NN2Mf u1 ztIMuss ol EIMuss u60 ZC2 HnUu 5M2f UP1 _f 4Zf EUuU Jx lx M5 a2TZ E_NUCEYp_c gI Eu445Uu lo _c ENuM fzuOOuE42 E4u CcM4P1 Ef2A ENM bM5 a44HnUu U2f E_NUCOO 2MtD11 bQTZqtMffmU5  f2MP1 N4uU2_faUU2ffP1 Jo _uZB45U toString zlnuZf2M UUUN 2N5 1000 wZ8 2MOOkq ErF ll gaf Egaf uZf35f DkE  _NM 4Qg5 typeof oh eJ 999 string SS kZ ErP1 4P1 u4buf2Jl E_Vu fN uCOO err E0N2U ZOO Se fNNOO uCEa u_uZ_M2saf2_M2sM2f3P1 4kE E3M2sD rLTp hl a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 2M_f35 ENuMu fC532M2P1 u_ ZfOO 2u4 E3M2szsu4f2nUu Ma2nnDqDvsu4f2 oS ZfF 2DRm hh 5NOO sq M2sOO JS OOq CfE35aMfUuN E35aMfUuND CfEf2U CfOO ___U _ZBf le tnD FN1 f2Mc A_tzsa else IOO _I AbL tnDOOU5q ztBM5 af_tzsa zt U25sFLMMuQ".split(" "),
0,{}));b.hasOwnProperty("err")&&(c=b.err);return{vdcv:23,vdcd:b.res,err:c}}catch(a){return{vdcv:23,vdcd:"0",err:c}}}function V(c){var b=0,a;for(a in c)c.hasOwnProperty(a)&&++b;return b}function X(c){try{if(1>=c.depth)return{url:"",depth:""};var b,a=[];a.push({win:window.top,depth:0});for(var e,g=1,d=0;0<g&&100>d;){try{if(d++,e=a.shift(),g--,0<e.win.location.toString().length&&e.win!=c)return 0==e.win.document.referrer.length||0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,
depth:e.depth-1}}catch(p){}b=e.win.frames.length;for(var f=0;f<b;f++)a.push({win:e.win.frames[f],depth:e.depth+1}),g++}return{url:"",depth:""}}catch(j){return{url:"",depth:""}}}function L(c){new String;var b=new String,a,e,g;for(a=0;a<c.length;a++)g=c.charAt(a),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(g),0<=e&&(g="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+47)%94)),
b+=g;return b}function Z(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(c){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;
if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&
"function"==typeof window.document.updateSettings)return 1;var b=!1;try{var a=document.createElement("p");a.innerText=".";a.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";b=void 0!=a.style.textShadow}catch(e){}return(0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||window.webkitAudioPannerNode&&window.webkitConvertPointFromNodeToPage)&&b&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(g){return 0}}this.createRequest=function(){var c=!1,b=window,
a=0,e=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=b.parent&&b.parent!=b)if(0<b.parent.location.toString().length)b=b.parent,a++,c=!0;else{c=!1;break}else{0==dv_i&&(c=!0);break}}catch(g){c=!1}0==b.document.referrer.length?c=b.location:c?c=b.location:(c=b.document.referrer,e=!0);if(!window._dv_win.bsredirect5ScriptsInternal||!window._dv_win.bsredirect5Processed||0==window._dv_win.bsredirect5ScriptsInternal.length)return{isSev1:!1,url:null};var d=N();this.dv_script_obj=d;var d=this.dv_script=d.script,
p=d.src.replace(/^.+?callback=(.+?)(&|$)/,"$1");if(p&&(this.redirect=eval(p+"()"))&&!this.redirect.done){this.redirect.done=!0;if(A(this.redirect))return{isSev1:!0};b=I(this.redirect,c,b,a,e,d&&d.parentElement&&d.parentElement.tagName&&"HEAD"===d.parentElement.tagName,d);b+="&"+this.getVersionParamName()+"="+this.getVersion();return{isSev1:!1,url:b}}};this.isApplicable=function(){return!0};this.onFailure=function(){};this.sendRequest=function(c){dv_sendRequest(c);try{var b,a=this.dv_script_obj&&this.dv_script_obj.injScripts||
"function() {}",e=window._dv_win.dv_config=window._dv_win.dv_config||{};e.cdnAddress=e.cdnAddress||"cdn.doubleverify.com";b='<html><head><script type="text/javascript">('+function(){try{window.$dv=window.$dvbsr||parent.$dvbsr,window.$dv.dvObjType="dvbsr"}catch(a){}}.toString()+')();<\/script></head><body><script type="text/javascript">('+a+')("'+e.cdnAddress+'");<\/script><script type="text/javascript">setTimeout(function() {document.close();}, 0);<\/script></body></html>';var g=O("about:blank");
g.id=g.name;var d=g.id.replace("iframe_","");g.setAttribute&&g.setAttribute("data-dv-frm",d);G(g,this.dv_script);if(this.dv_script){var p=this.dv_script,f;a:{c=null;try{if(c=g.contentWindow){f=c;break a}}catch(j){}try{if(c=window._dv_win.frames&&window._dv_win.frames[g.name]){f=c;break a}}catch(i){}f=null}p.dvFrmWin=f}var n=H(g);if(n)n.open(),n.write(b);else{try{document.domain=document.domain}catch(q){}var A=encodeURIComponent(b.replace(/'/g,"\\'").replace(/\n|\r\n|\r/g,""));g.src='javascript: (function(){document.open();document.domain="'+
window.document.domain+"\";document.write('"+A+"');})()"}}catch(x){b=(window._dv_win.dv_config=window._dv_win.dv_config||{}).tpsAddress||"tps30.doubleverify.com",dv_SendErrorImp(b+"/verifyc.js?ctx=818052&cmp=1619415",[{dvp_jsErrMsg:"DvFrame: "+encodeURIComponent(x)}])}return!0};if(window.debugScript&&(!window.minDebugVersion||10>=window.minDebugVersion))window.DvVerify=I,window.createRequest=this.createRequest;this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"52"}}
;
function dv_baseHandler(){function M(c){var b="http:",a=window._dv_win.location.toString().match("^http(?:s)?");if("https"==c.match("^https")&&("https"==a||"http"!=a))b="https:";return b}function A(c){var b=window._dv_win.dvRecoveryObj;if(b){var a=dv_GetParam(c.dvparams,"ctx",!0),b=b[a]?b[a].RecoveryTagID:b._fallback_?b._fallback_.RecoveryTagID:1;1===b&&c.tagsrc?document.write(c.tagsrc):2===b&&c.altsrc&&document.write(c.altsrc);return!0}return!1}function N(){var c;c=!window._dv_win.dv_config||!window._dv_win.dv_config.isUT?
window._dv_win.bsredirect5ScriptsInternal.pop():window._dv_win.bsredirect5ScriptsInternal[window._dv_win.bsredirect5ScriptsInternal.length-1];window._dv_win.bsredirect5Processed.push(c);return c}function O(c,b){var a=document.createElement("iframe");a.name=a.id="iframe_"+dv_GetRnd();a.width=0;a.height=0;a.id=b;a.style.display="none";a.src=c;return a}function G(c,b,a){var a=a||150,e=window._dv_win||window;if(e.document&&e.document.body)return b&&b.parentNode?b.parentNode.insertBefore(c,b):e.document.body.insertBefore(c,
e.document.body.firstChild),!0;if(0<a)setTimeout(function(){G(c,b,--a)},20);else return!1}function H(c){var b=null;try{if(b=c&&c.contentDocument)return b}catch(a){}try{if(b=c.contentWindow&&c.contentWindow.document)return b}catch(e){}try{if(b=window._dv_win.frames&&window._dv_win.frames[c.name]&&window._dv_win.frames[c.name].document)return b}catch(g){}return null}function I(c,b,a,e,g,d,p){var f,j;f=window._dv_win.dv_config&&window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:dv_GetRnd();
var i,n=window.parent.postMessage&&window.JSON;j=!0;var q=!1;if("0"==dv_GetParam(c.dvparams,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)q=!0;if(n&&!1==q)try{q="https://cdn3.doubleverify.com/bst2tv3.html",window._dv_win&&(window._dv_win.dv_config&&window._dv_win.dv_config.bst2turl)&&(q=window._dv_win.dv_config.bst2turl),i=O(q,"bst2t_"+f),j=G(i)}catch(I){}var x,P=(x=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&
"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream)?"https:":M(p.src),Q="0";"https:"==P&&(Q="1");i=c.rand;var R="__verify_callback_"+i,S="__tagObject_callback_"+i;window[R]=function(b){try{if(void 0==b.ResultID)document.write(1!=b?c.tagsrc:c.altsrc);else switch(b.ResultID){case 1:b.Passback?document.write(decodeURIComponent(b.Passback)):document.write(c.altsrc);break;case 2:case 3:document.write(c.tagsrc)}}catch(a){}};x?i="https:":(i="http:","http:"!=window._dv_win.location.protocol&&
(i="https:"));var A=i,T=x?"https:":M(p.src),U="0";"https:"===T&&(U="1");var J=window._dv_win.document.visibilityState;window[S]=function(b){try{var a={};a.protocol=A;a.ssl=U;a.dv_protocol=T;a.serverPublicDns=b.ServerPublicDns;a.ServerPublicDns=b.ServerPublicDns;a.tagElement=p;a.redirect=c;a.impressionId=b.ImpressionID;window._dv_win.$dvbsr.tags.add(b.ImpressionID,a);if(p.dvFrmWin){var d=window._dv_win.$dvbsr;p.dvFrmWin.$uid=b.ImpressionID;d.messages&&d.messages.startSendingEvents&&d.messages.startSendingEvents(p.dvFrmWin,
b.ImpressionID)}var e=function(){var a=window._dv_win.document.visibilityState;"prerender"===J&&("prerender"!==a&&"unloaded"!==a)&&(J=a,window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,{prndr:0}),window._dv_win.document.removeEventListener(f,e))};if("prerender"===J)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,{prndr:0});else{var f;"undefined"!==typeof window._dv_win.document.hidden?f="visibilitychange":
"undefined"!==typeof window._dv_win.document.mozHidden?f="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?f="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(f="webkitvisibilitychange");window._dv_win.document.addEventListener(f,e,!1)}var g;var a={verifyc:{prefix:"vf",stats:[{name:"duration",prefix:"dur"}]}},i;b:{d={};try{if(window&&window.performance&&window.performance.getEntries)for(var h=window.performance.getEntries(),j=0;j<h.length;j++){var k=
h[j],l=k.name.match(/.*\/(.+?)\./);if(l&&l[1]){var n=l[1].replace(/\d+$/,""),m=a[n];if(m){for(var q=0;q<m.stats.length;q++){var r=m.stats[q];d[m.prefix+r.prefix]=Math.round(k[r.name])}delete a[n];if(!V(a))break}}}i=d;break b}catch(s){}i=void 0}g=i&&V(i)?i:void 0;g&&window._dv_win.$dvbsr.registerEventCall(b.ImpressionID,g)}catch(t){}};void 0==c.dvregion&&(c.dvregion=0);var K="",q=i="";try{for(var l=a,h=0;10>h&&l!=window.top;)h++,l=l.parent;a.depth=h;dv_additionalUrl=X(a);i="&aUrl="+encodeURIComponent(dv_additionalUrl.url);
q="&aUrlD="+dv_additionalUrl.depth;K=a.depth+e;g&&a.depth--}catch(N){q=i=K=a.depth=""}void 0!=c.aUrl&&(i="&aUrl="+c.aUrl);var B;e=function(){try{return!!window.sessionStorage}catch(b){return!0}};g=function(){try{return!!window.localStorage}catch(b){return!0}};l=function(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var a=b.getContext("2d");a.textBaseline="top";a.font="14px 'Arial'";a.textBaseline="alphabetic";a.fillStyle="#f60";a.fillRect(0,0,62,20);a.fillStyle="#069";
a.fillText("!image!",2,15);a.fillStyle="rgba(102, 204, 0, 0.7)";a.fillText("!image!",4,17);return b.toDataURL()}return null};try{h=[];h.push(["lang",navigator.language||navigator.browserLanguage]);h.push(["tz",(new Date).getTimezoneOffset()]);h.push(["hss",e()?"1":"0"]);h.push(["hls",g()?"1":"0"]);h.push(["odb",typeof window.openDatabase||""]);h.push(["cpu",navigator.cpuClass||""]);h.push(["pf",navigator.platform||""]);h.push(["dnt",navigator.doNotTrack||""]);h.push(["canv",l()]);var m=h.join("=!!!=");
if(null==m||""==m)B="";else{for(var e=function(b){for(var a="",c,d=7;0<=d;d--)c=b>>>4*d&15,a+=c.toString(16);return a},g=[1518500249,1859775393,2400959708,3395469782],m=m+String.fromCharCode(128),v=Math.ceil((m.length/4+2)/16),w=Array(v),l=0;l<v;l++){w[l]=Array(16);for(h=0;16>h;h++)w[l][h]=m.charCodeAt(64*l+4*h)<<24|m.charCodeAt(64*l+4*h+1)<<16|m.charCodeAt(64*l+4*h+2)<<8|m.charCodeAt(64*l+4*h+3)}w[v-1][14]=8*(m.length-1)/Math.pow(2,32);w[v-1][14]=Math.floor(w[v-1][14]);w[v-1][15]=8*(m.length-1)&
4294967295;for(var m=1732584193,h=4023233417,C=2562383102,D=271733878,E=3285377520,r=Array(80),y,s,t,u,F,l=0;l<v;l++){for(var k=0;16>k;k++)r[k]=w[l][k];for(k=16;80>k;k++)r[k]=(r[k-3]^r[k-8]^r[k-14]^r[k-16])<<1|(r[k-3]^r[k-8]^r[k-14]^r[k-16])>>>31;y=m;s=h;t=C;u=D;F=E;for(k=0;80>k;k++){var W=Math.floor(k/20),H=y<<5|y>>>27,z;c:{switch(W){case 0:z=s&t^~s&u;break c;case 1:z=s^t^u;break c;case 2:z=s&t^s&u^t&u;break c;case 3:z=s^t^u;break c}z=void 0}var Y=H+z+F+g[W]+r[k]&4294967295;F=u;u=t;t=s<<30|s>>>2;
s=y;y=Y}m=m+y&4294967295;h=h+s&4294967295;C=C+t&4294967295;D=D+u&4294967295;E=E+F&4294967295}B=e(m)+e(h)+e(C)+e(D)+e(E)}}catch(aa){B=null}a=(window._dv_win&&window._dv_win.dv_config&&window._dv_win.dv_config.verifyJSCURL?dvConfig.verifyJSCURL+"?":P+"//rtb"+c.dvregion+".doubleverify.com/verifyc.js?")+c.dvparams+"&num=5&srcurlD="+a.depth+"&callback="+R+"&jsTagObjCallback="+S+"&ssl="+Q+(x?"&dvf=0":"")+"&refD="+K+"&htmlmsging="+(n?"1":"0")+"&guid="+f+(null!=B?"&aadid="+B:"");b="dv_url="+encodeURIComponent(b);
if(!1==j||d)a=a+("&dvp_isBodyExistOnLoad="+(j?"1":"0"))+("&dvp_isOnHead="+(d?"1":"0"));if((d=window[L("=@42E:@?")][L("2?46DE@C~C:8:?D")])&&0<d.length){j=[];j[0]=window.location.protocol+"//"+window.location.hostname;for(f=0;f<d.length;f++)j[f+1]=d[f];d=j.reverse().join(",")}else d=null;d&&(b+="&ancChain="+encodeURIComponent(d));if(!1==/MSIE (\d+\.\d+);/.test(navigator.userAgent)||7<new Number(RegExp.$1)||2E3>=i.length+q.length+a.length)a+=q,b+=i;if(void 0!=window._dv_win.$dvbsr.CommonData.BrowserId&&
void 0!=window._dv_win.$dvbsr.CommonData.BrowserVersion&&void 0!=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent)f=window._dv_win.$dvbsr.CommonData.BrowserId,j=window._dv_win.$dvbsr.CommonData.BrowserVersion,d=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent;else{f=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];d=0;j="";i=navigator.userAgent;for(n=0;n<f.length;n++)if(null!=i.match(RegExp(f[n].brRegex))){d=f[n].id;if(null==f[n].verRegex)break;i=i.match(RegExp(f[n].verRegex+"[0-9]*"));null!=i&&(j=i[0].match(RegExp(f[n].verRegex)),j=i[0].replace(j[0],
""));break}f=n=Z();j=n===d?j:"";window._dv_win.$dvbsr.CommonData.BrowserId=f;window._dv_win.$dvbsr.CommonData.BrowserVersion=j;window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent=d}a+="&brid="+f+"&brver="+j+"&bridua="+d;"prerender"===window._dv_win.document.visibilityState&&(a+="&prndr=1");d=$();a+="&vavbkt="+d.vdcd;a+="&lvvn="+d.vdcv;""!=d.err&&(a+="&dvp_idcerr="+encodeURIComponent(d.err));return a+"&eparams="+encodeURIComponent(L(b))}function $(){var c="";try{var b=eval(function(a,b,c,p,f,j){f=
function(a){return(a<b?"":f(parseInt(a/b)))+(35<(a%=b)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;c--;)j[f(c)]=p[c]||f(c);p=[function(a){return j[a]}];f=function(){return"\\w+"};c=1}for(;c--;)p[c]&&(a=a.replace(RegExp("\\b"+f(c)+"\\b","g"),p[c]));return a}("(H(){1B{1B{3o('1A?24:1T')}1x(e){d{1q:\"-5p\"}}m 1f=[1A];1B{m O=1A;5q(O!=O.2g&&O.1P.5s.5t){1f.1v(O.1P);O=O.1P}}1x(e){}H 1H(1b){1B{1w(m i=0;i<1f.1c;i++){12(1b(1f[i]))d 1f[i]==1A.2g?-1:1}d 0}1x(e){5n;d e.5j||'5k'}}H 3k(1g){d 1H(H(K){d K[1g]!=5l})}H 34(K,2e,1b){1w(m 1g 5m K){12(1g.1S(2e)>-1&&(!1b||1b(K[1g])))d 24}d 1T}H g(s){m h=\"\",t=\"5E.;j&5F}5B/0:5A'5w=B(5x-5y!,5z)5r\\\\{ >5i+5h\\\"51<\";1w(i=0;i<s.1c;i++)f=s.1Q(i),e=t.1S(f),0<=e&&(f=t.1Q((e+41)%82)),h+=f;d h}m c=['52\"1u-53\"54\"50','p','l','60&p','p','{','\\\\<}4\\\\4Z-4V<\"4U\\\\<}4\\\\4W<Z?\"6','e','4X','-5,!u<}\"4Y}\"','p','J','-55}\"<56','p','=o','\\\\<}4\\\\1V\"2f\"w\\\\<}4\\\\1V\"2f\"5d}2\"<,u\"<5}?\"6','e','J=',':<5e}T}<\"','p','h','\\\\<}4\\\\7-2}\"E(v\"17}b?\\\\<}4\\\\7-2}\"E(v\"2y<N\"[1m*1t\\\\\\\\2t-5f<2S\"2r\"5g]1l}C\"19','e','5c','\\\\<}4\\\\5b;57||\\\\<}4\\\\58?\"6','e','+o','\"16\\\\<}4\\\\2h\"I<-59\"1W\"5\"5a}23<}5G\"16\\\\<}4\\\\1r}1N>1C-1G}2}\"1W\"5\"6f}23<}6h','e','=J','V}U\"<5}6i\"9}F\\\\<}4\\\\[6e}6d:69]k}8\\\\<}4\\\\[t:2d\"6a]k}8\\\\<}4\\\\[6b})5-u<}t]k}8\\\\<}4\\\\[6c]k}8\\\\<}4\\\\[6j}6k]k}6r','e','6s',':6t}<\"G-1K/2M','p','6u','\\\\<}4\\\\10<U/1i}8\\\\<}4\\\\10<U/!k}b','e','=l','X\\\\<}4\\\\6q}/6p}U\"<5}6l\"9}6m<2a}6n\\\\6o\"68}/k}29','e','=S=','\\\\<}4\\\\E-67\\\\<}4\\\\E-5Q\"5\\\\U?\"6','e','+J','\\\\<}4\\\\21!5R\\\\<}4\\\\21!5S)p?\"6','e','5T','-}\"5P','p','x{','\\\\<}4\\\\E<2q-5O}5J\\\\<}4\\\\5I\"5K-5L\\\\<}4\\\\5N.42-2}\"5U\\\\<}4\\\\5V<N\"G}63?\"6','e','+S','V}U\"<5}Q\"3j\\\\<}4\\\\y<1M\"16\\\\<}4\\\\y<2R}U\"<5}14\\\\<}4\\\\1o-2.42-2}\"w\\\\<}4\\\\1o-2.42-2}\"1p\"L\"\"M<3h\"3g\"2Y<\"<5}38\"37\\\\<Z\"33<W\"32{2W:3a\\\\3f<1k}3q-3m<}31\"3r\"1j%36<W\"1j%30?\"3l\"3e','e','64','65:,','p','4T','\\\\<}4\\\\62\\\\<}4\\\\1Y\"2k\\\\<}4\\\\1Y\"2E,T}2J+++++14\\\\<}4\\\\61\\\\<}4\\\\2F\"2k\\\\<}4\\\\2F\"2E,T}2J+++++t','e','5W','\\\\<}4\\\\5X\"1K\"5Y}8\\\\<}4\\\\E\\\\5Z<M?\"6','e','6v','V}U\"<5}Q:4E\\\\<}4\\\\7-2}\"1p\".42-2}\"3L-3M<N\"3N<3K<3J}C\"3H<3F<3G[<]E\"27\"1u}\"2}\"3I[<]E\"27\"1u}\"2}\"E<}13&3O\"1\\\\<}4\\\\2z\\\\3P\\\\<}4\\\\2z\\\\1r}1N>1C-1G}2}\"z<3V-2}\"3W\"2.42-2}\"3X=3U\"9}3T\"9}P=3Q','e','x','3E)','p','+','\\\\<}4\\\\2m:3S<5}3Y\\\\<}4\\\\2m\"3D?\"6','e','3z','L!!3A.3B.G 3C','p','x=','\\\\<}4\\\\3s}3x)u\"3t\\\\<}4\\\\3u-2?\"6','e','+=','\\\\<}4\\\\2G\"3v\\\\<}4\\\\2G\"3w--3R<\"2f?\"6','e','x+','\\\\<}4\\\\7-2}\"2K}\"2O<N\"w\\\\<}4\\\\7-2}\"2K}\"2O<N\"4B\")4C\"<:4D\"3Z}b?\"6','e','+x','\\\\<}4\\\\28)u\"4A\\\\<}4\\\\28)u\"4v?\"6','e','4u','\\\\<}4\\\\2L}s<4w\\\\<}4\\\\2L}s<4x\" 4y-4F?\"6','e','4G','\\\\<}4\\\\E\"4O-2}\"E(v\"4P<N\"[1m*4Q\"4R<4N]4M?\"6','e','+e','\\\\<}4\\\\7-2}\"E(v\"17}b?\\\\<}4\\\\7-2}\"E(v\"4I<:[\\\\4H}}2M][\\\\4J,5}2]4K}C\"19','e','4L','X\\\\<}4\\\\4t}4s\\\\<}4\\\\4a$49','e','4b',':4c<Z','p','4d','\\\\<}4\\\\E-48\\\\<}4\\\\E-47}43\\\\<}4\\\\E-40<44?\"6','e','45','$G:46}Z!4e','p','+h','\\\\<}4\\\\E\"1I\\\\<}4\\\\E\"1J-4g?\"6','e','4o','X\\\\<}4\\\\4p:,2V}U\"<5}1h\"9}4q<4r<2a}29','e','4n','\\\\<}4\\\\10<U/4m&2b\"E/2i\\\\<}4\\\\10<U/4i}C\"3d\\\\<}4\\\\10<U/f[&2b\"E/2i\\\\<}4\\\\10<U/4j[S]]2h\"4k}b?\"6','e','4l','66}6w}8s>2s','p','8t','\\\\<}4\\\\1e:<1O}s<8u}8\\\\<}4\\\\1e:<1O}s<8r<}f\"u}2w\\\\<}4\\\\2v\\\\<}4\\\\1e:<1O}s<C[S]E:2d\"1i}b','e','l{','8m\\'<}4\\\\T}8n','p','==','\\\\<}4\\\\y<1M\\\\<}4\\\\y<2H\\\\<Z\"2C\\\\<}4\\\\y<2B<W\"?\"6','e','8o','\\\\<}4\\\\2j}2I-2P\"}2A<8p\\\\<}4\\\\2j}2I-2P\"}2A/2Q?\"6','e','=8E','\\\\<}4\\\\E\"2f\"8F\\\\<}4\\\\8C<8B?\"6','e','o{','\\\\<}4\\\\8x-)2\"2U\"w\\\\<}4\\\\1e-8y\\\\1u}s<C?\"6','e','+l','\\\\<}4\\\\2l-2\"8A\\\\<}4\\\\2l-2\"8k<Z?\"6','e','+{','\\\\<}4\\\\E:85}8\\\\<}4\\\\86-87}8\\\\<}4\\\\E:88\"<84\\\\}k}b?\"6','e','{S','\\\\<}4\\\\1a}\"11}83\"-7Y\"2f\"q\\\\<}4\\\\n\"<5}7Z?\"6','e','o+',' &G)&80','p','81','\\\\<}4\\\\E.:2}\"c\"<8H}8\\\\<}4\\\\89}8\\\\<}4\\\\8a<}f\"u}2w\\\\<}4\\\\2v\\\\<}4\\\\1r:}\"k}b','e','8i','8j\"5-\\'2u:2M','p','J{','\\\\<}4\\\\8g\"5-\\'2u:8f}8b=8c:D|q=2x|8d-5|8e--1K/2\"|2N-2x|8T\"=8L\"2f\"q\\\\<}4\\\\1L\"26:25<1k}D?\"6','e','=8P','\\\\<}4\\\\7-2}\"E(v\"17}b?\\\\<}4\\\\7-2}\"E(v\"2y<N\"[1m*1t\\\\\\\\2t-2S\"2r/8Z<8W]1l}C\"19','e','8J',')8O!8R}s<C','p','8N','\\\\<}4\\\\2n<<8M\\\\<}4\\\\2n<<8I<}f\"u}8U?\"6','e','{l','\\\\<}4\\\\2o.L>g;G\\'T)Y.8V\\\\<}4\\\\2o.L>g;8Y&&8X>G\\'T)Y.I?\"6','e','l=','X\\\\<}4\\\\90\\\\8S>8Q}U\"<5}1h\"9}F\"2p}U\"<5}92\\\\<}4\\\\7W<2q-20\"u\"6Z}U\"<5}1h\"9}F\"2p}U\"<5}70','e','{J','G:<Z<:5','p','71','\\\\<}4\\\\k\\\\<}4\\\\E\"6Y\\\\<}4\\\\n\"<5}3p\"39}/14\\\\<}4\\\\7-2}\"3i<}13&6X\\\\<}4\\\\n\"<5}18\"}u-6T=?V}U\"<5}Q\"1s\"9}6U\\\\<}4\\\\1a}\"n\"<5}6V\"1n\"9}F\"6W','e','72','\\\\<}4\\\\1F-U\\\\w\\\\<}4\\\\1F-73\\\\<}4\\\\1F-\\\\<}?\"6','e','7a','7b-N:7X','p','79','\\\\<}4\\\\1D\"78\\\\<}4\\\\1D\"74\"<5}75\\\\<}4\\\\1D\"76||\\\\<}4\\\\77?\"6','e','h+','6S<u-6R/','p','{=','\\\\<}4\\\\n\"<5}18\"}u-6D\\\\<}4\\\\1r}1N>1C-1G}2}\"q\\\\<}4\\\\n\"<5}18\"}u-2D','e','=S','\\\\<}4\\\\6E\"16\\\\<}4\\\\6F}U\"<5}14\\\\<}4\\\\6C?\"6','e','{o','\\\\<}4\\\\6B}<6x\\\\<}4\\\\6y}?\"6','e','=6z','\\\\<}4\\\\y<1M\\\\<}4\\\\y<2H\\\\<Z\"2C\\\\<}4\\\\y<2B<W\"w\"16\\\\<}4\\\\y<2R}U\"<5}t?\"6','e','J+','c>A','p','=','V}U\"<5}Q\"1s\"9}F\\\\<}4\\\\E\"6A\"6G:6H}6O^[6P,][6Q+]6N\\'<}4\\\\6M\"2f\"q\\\\<}4\\\\E}u-6I\"1n\"9}6J=6K','e','6L','\\\\<}4\\\\1X\"<1Z-22-u}7d\\\\<}4\\\\1X\"<1Z-22-u}7H?\"6','e','{x','7I}7K','p','7J','\\\\<}4\\\\7-2}\"E(v\"17}b?\\\\<}4\\\\7-2}\"E(v\"1R<:[<Z*1t:Z,1U]F:<7G[<Z*7F]1l}C\"19','e','h=','7B-2}\"n\"<5}k}b','e','7C','\\\\<}4\\\\7-2}\"E(v\"17}b?\\\\<}4\\\\7-2}\"E(v\"1R<:[<Z*7E}1U]R<-C[1m*7M]1l}C\"19','e','7T','X\\\\<}4\\\\2c\"\\\\7U\\\\<}4\\\\2c\"\\\\7S','e','7R','\\\\<}4\\\\1L\"w\\\\<}4\\\\1L\"26:25<1k}?\"6','e','{e','\\\\<}4\\\\7Q}Z<}7A}8\\\\<}4\\\\7z<f\"k}8\\\\<}4\\\\7l/<}C!!7m<\"42.42-2}\"1i}8\\\\<}4\\\\7n\"<5}k}b?\"6','e','7k','T>;7j\"<4f','p','h{','\\\\<}4\\\\7f<u-7g\\\\7h}8\\\\<}4\\\\1e<}7o}b?\"6','e','7p','\\\\<}4\\\\E\"1I\\\\<}4\\\\E\"1J-2T}U\"<5}Q\"1s\"9}F\\\\<}4\\\\1a}\"n\"<5}18\"E<}13&2X}3b=w\\\\<}4\\\\1a}\"7-2}\"1p\".42-2}\"7w}\"u<}7x}7y\"1n\"9}F\"35?\"6','e','{h','\\\\<}4\\\\7v\\\\<}4\\\\7u}<(7q?\"6','e','7r','\\\\<}4\\\\7s<U-2Z<7t&p?X\\\\<}4\\\\7c<U-2Z<7i/2V}U\"<5}1h\"9}F\"7P','e','=7O','7N\\'<7V\"','p','{{','\\\\<}4\\\\E\"1I\\\\<}4\\\\E\"1J-2T}U\"<5}Q\"1s\"9}F\\\\<}4\\\\1a}\"n\"<5}18\"E<}13&2X}3b=7L\"1n\"9}F\"35?\"6','e','7D','V}U\"<5}Q\"3j\\\\<}4\\\\3n:!7e\\\\<}4\\\\1o-2.42-2}\"w\\\\<}4\\\\1o-2.42-2}\"1p\"L\"\"M<3h\"3g\"2Y<\"<5}38\"37\\\\<Z\"33<W\"32{2W:3a\\\\3f<1k}3q-3m<}31\"3r\"1j%36<W\"1j%30?\"3l\"3e','e','{+','\\\\<}4\\\\91<8G a}8h}8\\\\<}4\\\\E}8l\"8z 8D- 1i}b','e','8w','8v\\\\<}4\\\\n\"<5}3n}8q\"5M&M<C<}4h}C\"3d\\\\<}4\\\\n\"<5}3p\"39}/14\\\\<}4\\\\7-2}\"4z\\\\<}4\\\\7-2}\"3i<}13&4S[S]3y=?\"6','e','l+'];m 1z=[];m 1d=[];1w(m j=0;j<c.1c;j+=3){m r=c[j+1]=='p'?3k(g(c[j])):1H(H(K){d K.3o('(H(){'+34.6g()+';d '+g(c[j])+'})();')});m 1y=5H(g(c[j+2]));12(r>0||r<0){1z.1v(r*1y)}5D 12(5C r=='5v'){1z.1v(-5u*1y);1d.1v(1y+\"=\"+r)}12(1d.1c>=15)d{1q:r}}m 1E={1q:1z.3c(\",\")};12(1d.1c>0)1E.5o=1d.3c(\"&\");d 1E}1x(e){d{1q:\"-8K\"}}})();",
62,561,"    Z5  Ma2vsu4f2 EZ5Ua a44OO aM  a44  return       P1  var E45Uu        a2MQ0242U OO  E3        _ function   wnd    tmpWnd  qD8     qsa C3 U5q   EBM  if Z27 tOO  QN25sF 5ML44P1 E35f 3RSvsu4f2 ENuM2 func length errors E_ wndz prop q5D8M2 fP1 vFoS ZZ2 WDE42 fMU U3q2D8M2 EsMu EC2 res E2 MQ8M2  g5 push for catch id results window try Tg5 EuZ response Euf N5 ch UIuCTZOO UT uM EfaNN_uZf_35f M5OO U5Z2c ZU5 parent charAt 5ML44qWZ indexOf false _t Ef35M ENM5 Ea EuZ_hEf _7Z  E_Y fC_ Z2s true 2MM _5  EufB a44nD ZP1 BV2U zt__ uf str  top Ef2 2Qfq ENu Q42OO E__N E27 E__ EcIT_0 QN25sF511tsa sMu MuU  BuZfEU5 ALZ02M ELMMuQOO U25sF uZf 5ML44qWfUM z5 2M_ M5E32 3OO  Q42E EuZ_lEf EU M5E 5Mu Z2711t E_UaMM2 ELZg5   0UM _NuM  M511tsa kN7 NTZOOqsa  tzsa SN7HF5 sqtfQ Q42tD11tN5f  Ht m42s vFl 3vFJlSN7HF32 co Ma2HnnDqD HFM 2HFB5MZ2MvFSN7HF vFuBf54a vB4u 2Ms45 uNfQftD11m join 3RSOO U3q2D8nnDqD vF3 2qtf Ba EM2s2MM2ME MQ8 ex Ma2vsu4f2nUu uMC Eu eval E3M2sP1tuB5a HF vFmheSN7HF42s EA5Cba uOO EuZZTsMu 7__OO 7__E2U Z42 D11m xJ _ALb A_pLr cAA_cg IQN2 Ld0 99D sq2  OO2 i2E42 1SH fbQIuCpu 2qtfUM tDHs5Mq sqt E2fUuN2z21 HnDqD MU0 2Mf PSHM2 DM2 1Z5Ua EUM2u tDRm _V5V5OO 35ZP1 2MUaMQE   sOO NLZZM2ff Je V0 2MUaMQEU5 2MUaMQOO _tD zt_ Jl u_faB hJ 7A5C  NTZ fzuOOuE42 fDE42 fD aNP1 ox fOO lJ oJ zt_M F5ENaB4 f32M_faB f_tDOOU5q zt__uZ_M oo ujuM COO CEC2 Mu EM2s2MM2MOO u_Z2U5Z2OO EZ5p5 2s2MI5pu 2r2 uMF21 2cM4 JJ UmBu 5ML44qtZ Um tDE42 eS WD UEVft uCUuZ2OOZ5Ua 5MqWfUM 1tk27 kC5 squ he QOO 5Zu4 ENaBf_uZ_faB xh g5a ENaBf_uZ_uZ Q42 1bqyJIma C2 Na 2Z0 fgM2Z2 u4f 24N2MTZ E7GXLss0aBTZIuC 25a QN211ta E7LZfKrA eo r5 ZBu kUM EVft lkSvfxWX NhCZ message unknown null in debugger err 99 while  location href 100 string Kt Q6T uic2EHVO LnG s7 YDoMw8FRp3gd94 typeof else Ue PzA 2ZtOO parseInt EaNZu U2OO 2TsMu 2OO  EuZZ 2_M2s2M2 M__ UCME AOO AEBuf2g lS I5b5ZQOO EfUM xl Ef aM4P1 2BfM2Z  EuZ_lOO EuZ_hOO 5Z2f xx _M M2 UCMOO b4u 24t r5Z2t tUZ tUBt ZA2 tf5a QN2P1ta toString 2Zt qD8M2 tB LMMt q5BVD8M2 F5BVEa a44OO5BVEu445 IuMC2 Mtzsa zt_4 a44nDqD ee u_a ho xo 5IMu N2MOO EuZfBQuZf Sh 5NENM5U2ff_ ELZ0 E5U4U5qDEN4uQ 2P1 E5U4U5OO E5U4U511tsa uC_ uMfP1 2DnUu FP HnnDqD xe kE 8lzn a44OOk um Sm _uZB45U _NM 2DRm FN1 E3M2szsu4f2nUu Ma2nnDqDvsu4f2 sq 5NOO af_tzsa tnD hh oS M2sOO CfEf2U OOq CfE35aMfUuN E35aMfUuND CfOO le JS ___U ztIMuss uC2MOO 4uQ2MOO ENM bM5 f2MP1 ubuf2b45U _c lo ENuM gI Eu445Uu N4uU2_faUU2ffP1 Jo a2TZ ol EIMuss u60 E_NUCEYp_c E_NUCOO bQTZqtMffmU5 2MtD11 a44HnUu Ef2A CcM4P1 Z5Ua eh Jx 1tB2uU5 1tfMmN4uQ2Mt Z25 uC2MEUB B24 xS  HnUu 1tNk4CEN3Nt LZZ035NN2Mf Sl Ma2nDvsu4f2 E4u lh B_UB_tD oe B__tDOOU5q ZC2 zt _ZBf 4kE E3M2sD rLTp hl  a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 2M_f35 u_uZ_M2saf2_M2sM2f3P1 ENuMu fC532M2P1 u_ ErP1 ErF Z8 zlnuZf2M UUUN 2N5 2MOOkq Egaf UP1 ll gaf uCEa _f UufUuZ2 s5 Jh ZOO U2f CF fY45 hx CP1 u1 lx E_Vu fN 5M2f uCOO u4buf2Jl E0N2U M5 Se fNNOO 4Zf 4P1 ZfF eJ 999 DkE ZfOO oh 2u4 SS A_tzsa 4Qg5 f2Mc uZf35f U25sFLMMuQ IOO fN4uQLZfEVft AbL _I kZ ztBM5 EUuU tnDOOU5q".split(" "),
0,{}));b.hasOwnProperty("err")&&(c=b.err);return{vdcv:22,vdcd:b.res,err:c}}catch(a){return{vdcv:22,vdcd:"0",err:c}}}function V(c){var b=0,a;for(a in c)c.hasOwnProperty(a)&&++b;return b}function X(c){try{if(1>=c.depth)return{url:"",depth:""};var b,a=[];a.push({win:window.top,depth:0});for(var e,g=1,d=0;0<g&&100>d;){try{if(d++,e=a.shift(),g--,0<e.win.location.toString().length&&e.win!=c)return 0==e.win.document.referrer.length||0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,
depth:e.depth-1}}catch(p){}b=e.win.frames.length;for(var f=0;f<b;f++)a.push({win:e.win.frames[f],depth:e.depth+1}),g++}return{url:"",depth:""}}catch(j){return{url:"",depth:""}}}function L(c){new String;var b=new String,a,e,g;for(a=0;a<c.length;a++)g=c.charAt(a),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(g),0<=e&&(g="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+47)%94)),
b+=g;return b}function Z(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(c){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;
if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&
"function"==typeof window.document.updateSettings)return 1;var b=!1;try{var a=document.createElement("p");a.innerText=".";a.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";b=void 0!=a.style.textShadow}catch(e){}return(0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||window.webkitAudioPannerNode&&window.webkitConvertPointFromNodeToPage)&&b&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(g){return 0}}this.createRequest=function(){var c=!1,b=window,
a=0,e=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=b.parent&&b.parent!=b)if(0<b.parent.location.toString().length)b=b.parent,a++,c=!0;else{c=!1;break}else{0==dv_i&&(c=!0);break}}catch(g){c=!1}0==b.document.referrer.length?c=b.location:c?c=b.location:(c=b.document.referrer,e=!0);if(!window._dv_win.bsredirect5ScriptsInternal||!window._dv_win.bsredirect5Processed||0==window._dv_win.bsredirect5ScriptsInternal.length)return{isSev1:!1,url:null};var d=N();this.dv_script_obj=d;var d=this.dv_script=d.script,
p=d.src.replace(/^.+?callback=(.+?)(&|$)/,"$1");if(p&&(this.redirect=eval(p+"()"))&&!this.redirect.done){this.redirect.done=!0;if(A(this.redirect))return{isSev1:!0};b=I(this.redirect,c,b,a,e,d&&d.parentElement&&d.parentElement.tagName&&"HEAD"===d.parentElement.tagName,d);b+="&"+this.getVersionParamName()+"="+this.getVersion();return{isSev1:!1,url:b}}};this.isApplicable=function(){return!0};this.onFailure=function(){};this.sendRequest=function(c){dv_sendRequest(c);try{var b,a=this.dv_script_obj&&this.dv_script_obj.injScripts||
"function() {}",e=window._dv_win.dv_config=window._dv_win.dv_config||{};e.cdnAddress=e.cdnAddress||"cdn.doubleverify.com";b='<html><head><script type="text/javascript">('+function(){try{window.$dv=window.$dvbsr||parent.$dvbsr,window.$dv.dvObjType="dvbsr"}catch(a){}}.toString()+')();<\/script></head><body><script type="text/javascript">('+a+')("'+e.cdnAddress+'");<\/script><script type="text/javascript">setTimeout(function() {document.close();}, 0);<\/script></body></html>';var g=O("about:blank");
g.id=g.name;var d=g.id.replace("iframe_","");g.setAttribute&&g.setAttribute("data-dv-frm",d);G(g,this.dv_script);if(this.dv_script){var p=this.dv_script,f;a:{c=null;try{if(c=g.contentWindow){f=c;break a}}catch(j){}try{if(c=window._dv_win.frames&&window._dv_win.frames[g.name]){f=c;break a}}catch(i){}f=null}p.dvFrmWin=f}var n=H(g);if(n)n.open(),n.write(b);else{try{document.domain=document.domain}catch(q){}var A=encodeURIComponent(b.replace(/'/g,"\\'").replace(/\n|\r\n|\r/g,""));g.src='javascript: (function(){document.open();document.domain="'+
window.document.domain+"\";document.write('"+A+"');})()"}}catch(x){b=(window._dv_win.dv_config=window._dv_win.dv_config||{}).tpsAddress||"tps30.doubleverify.com",dv_SendErrorImp(b+"/verifyc.js?ctx=818052&cmp=1619415",[{dvp_jsErrMsg:"DvFrame: "+encodeURIComponent(x)}])}return!0};if(window.debugScript&&(!window.minDebugVersion||10>=window.minDebugVersion))window.DvVerify=I,window.createRequest=this.createRequest;this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"51"}}
;


function dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dvbsr = (window._dv_win.$dvbsr || new dvBsrType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.bsErrAddress = window._dv_win.dv_config.bsAddress || 'rtb0.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5&dvp_isLostImp=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (e) {
            }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler52.prototype = dv_baseHandlerIns;
dv_handler52.prototype.constructor = dv_handler52;

    var dv_handlersDefs = [{handler: new dv_handler52(), minRate: 0, maxRate: 10}];

    if (!window.debugScript) {
    (new dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
}
} catch (e) {
}