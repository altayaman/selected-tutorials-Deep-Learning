if (self.CavalryLogger) { CavalryLogger.start_js(["FRXYP"]); }

__d('EncryptedImg',['URI','XHRRequest','EncryptedImgUtils','getCrossOriginTransport'],(function a(b,c,d,e,f,g){var h={insertIntoStyleBackgroundImage:function m(n,o){var p=function(q,r){if(q){q.style.backgroundImage="url('"+r+"')";}}.bind(undefined,o);h.load(n,p);},insertIntoDOM:function m(n,o){var p=function(q,r){if(q){q.setAttribute('src',r);}}.bind(undefined,o);h.load(n,p);},load:function m(n,o){var p=arguments.length<=2||arguments[2]===undefined?true:arguments[2],q=new (c('URI'))(n),r=c('EncryptedImgUtils').extractKey(q),s=i.bind(undefined,r,o,p);s.includeHeaders=true;new (c('XHRRequest'))(q.toString()).setTransportBuilder(c('getCrossOriginTransport')).setMethod('GET').setResponseType('arraybuffer').setResponseHandler(s).send();},dataUrlPrefix:function m(n){var o=arguments.length<=1||arguments[1]===undefined?32:arguments[1];if(!n.startsWith('data:'))return n;var p=n.indexOf(',');if(p<0||p>o)p=o;return n.slice(0,p);}};Object.assign(h,c('EncryptedImgUtils'));f.exports=h;function i(m,n,o,p,q){if(!m){n(l(p,k(q)));return;}var r=j(m),s=new Uint8Array(p),t=s.subarray(2,14);s=s.subarray(14,s.length);var u={name:'AES-GCM',iv:t,tagLength:128};window.crypto.subtle.importKey('raw',r,u,false,['encrypt','decrypt']).then(function(v){return window.crypto.subtle.decrypt(u,v,s);}).then(function(v){if(o){n(l(v,k(q)));}else n(v);})['catch'](function(){});}function j(m){if(typeof m=='string'){var n=new Uint8Array(Math.floor(m.length/2)),o=0;m.replace(/(..)/g,function(p){n[o++]=parseInt(p,16);});return n;}return null;}function k(m){var n='image/jpeg',o=m.toLowerCase().match(/content-type:\s?([\w\/]*)\s/);if(o&&o.length>1)n=o[1];return n;}function l(m,n){var o=new Uint8Array(m),p='';for(var q=0,r=o.byteLength;q<r;++q)p+=String.fromCharCode(o[q]);return 'data:'+n+';base64,'+window.btoa(p);}}),null);
__d('getDOMImageSize',['EncryptedImg','URI'],(function a(b,c,d,e,f,g){function h(m){m.onload=null;m.onerror=null;m.onreadystatechange=null;m._callback=null;m._thisObj=null;m._srcStr=null;m.parentNode&&m.parentNode.removeChild(m);}function i(){var m=this;if(m._callback)m._callback.call(m._thisObj,m.naturalWidth||m.width,m.naturalHeight||m.height,m._srcStr);h(m);}function j(){var m=this;if(m.readyState==='complete')i.call(m);}function k(){var m=this;if(m._callback)m._callback.call(m._thisObj,0,0,m._srcStr);h(m);}function l(m,n,o){o=o||null;if(!m){n.call(o,0,0,'');return;}var p=document.body;if(!p){setTimeout(l.bind(this,m,n,o),500);return;}var q;if(typeof m==='string'){q=m;}else if(typeof m==='object')if(typeof m.width==='number'&&typeof m.height==='number'){if(typeof m.src==='string'){q=m.src;if(m.naturalWidth&&m.naturalHeight){n.call(o,m.naturalWidth,m.naturalHeight,q);return;}}if(typeof m.uri==='string'){q=m.uri;if(m.width&&m.height){n.call(o,m.width,m.height,q);return;}}}else if(m instanceof c('URI'))q=m.toString();if(!q){n(0,0,m);return;}var r=document.createElement('img');r.onreadystatechange=j;r.onload=i;r.onerror=k;r._callback=n;r._thisObj=o;r._srcStr=q;if(c('EncryptedImg').isEncrypted(q)){c('EncryptedImg').insertIntoDOM(q,r);}else r.src=q;r.style.cssText='\n    position:absolute;\n    left:-5000px;\n    top:-5000px;\n    width:auto;\n    height:auto;\n    clip:rect(0 0 0 0);\n  '.replace(/\s+/,' ');p.insertBefore(r,p.firstChild);}f.exports=l;}),null);
__d('CachedDOMImageSizePool',['debounce','getDOMImageSize'],(function a(b,c,d,e,f,g){function h(i,j){'use strict';this.$CachedDOMImageSizePool1={};this.$CachedDOMImageSizePool2=j;this.$CachedDOMImageSizePool3=0;this.$CachedDOMImageSizePool4=i;this.$CachedDOMImageSizePool5=c('debounce')(this.$CachedDOMImageSizePool6,5000,this);this.$CachedDOMImageSizePool7={};this.$CachedDOMImageSizePool8={};}h.prototype.get=function(i,j,k){'use strict';if(!i){j.call(k,0,0,i);return;}var l=this.$CachedDOMImageSizePool1[i];if(l){l.lastAccessTime=Date.now();j.call(k,l.width,l.height,l.src);}else if(this.$CachedDOMImageSizePool7[i]){this.$CachedDOMImageSizePool7[i].push(j);this.$CachedDOMImageSizePool8[i].push(k);}else{this.$CachedDOMImageSizePool7[i]=[j];this.$CachedDOMImageSizePool8[i]=[k];c('getDOMImageSize')(i,this.$CachedDOMImageSizePool9,this);}};h.prototype.set=function(i,j,k){'use strict';if(this.$CachedDOMImageSizePool3>this.$CachedDOMImageSizePool4)this.$CachedDOMImageSizePool5();var l=this.$CachedDOMImageSizePool1;if(i&&!l[i]){var m={width:j,height:k,src:i,lastAccessTime:Date.now()};l[i]=m;this.$CachedDOMImageSizePool3++;}};h.prototype.$CachedDOMImageSizePool9=function(i,j,k){'use strict';this.set(k,i,j);var l=this.$CachedDOMImageSizePool7[k],m=this.$CachedDOMImageSizePool8[k];for(var n=0,o=l.length;n<o;n++)l[n].call(m[n],i,j,k);delete this.$CachedDOMImageSizePool7[k];delete this.$CachedDOMImageSizePool8[k];};h.prototype.$CachedDOMImageSizePool6=function(){'use strict';var i=Date.now(),j=this.$CachedDOMImageSizePool1,k=this.$CachedDOMImageSizePool3,l=this.$CachedDOMImageSizePool2;for(var m in j){var n=j[m];if(i-n.lastAccessTime>l){delete j[m];k--;}}this.$CachedDOMImageSizePool3=k;};f.exports=h;}),null);
__d('BackgroundImage.react',['cx','invariant','CachedDOMImageSizePool','Image.react','React','XUISpinner.react','joinClasses','clamp'],(function a(b,c,d,e,f,g,h,i){var j=c('React').PropTypes,k='(-?(\\d+\\.)?\\d+(px|\\%))',l=new RegExp('^'+k+'?(\\s'+k+')?$','g'),m=new (c('CachedDOMImageSizePool'))(50,10*60*1000),n=c('React').createClass({displayName:'BackgroundImage',propTypes:{src:j.string,width:j.number.isRequired,height:j.number.isRequired,backgroundSize:j.oneOf(['contain','cover','containinside','coverinside']),loadingIndicatorStyle:j.oneOf(['none','large','small']),backgroundPosition:function o(p,q,r){var s=p[q];if(s){typeof s==='string'||i(0);s.match(l)||i(0);}p.backgroundFocus==null||p.backgroundPosition==null||i(0);},backgroundFocus:function o(p,q,r){var s=p[q];if(s){typeof s==='string'||i(0);s.match(l)||i(0);}p.backgroundFocus==null||p.backgroundPosition==null||i(0);},onImageLoad:j.func,optimizeResizeSpeed:j.bool,onContextMenu:j.func},getInitialState:function o(){return {imageWidth:null,imageHeight:null,imageSrc:this.props.src,loading:true};},getDefaultProps:function o(){return {optimizeResizeSpeed:false,loadingIndicatorStyle:'none'};},componentDidMount:function o(){this._resolveImageSize();},componentDidUpdate:function o(p){if(this.props.src!==this.state.imageSrc)this.setState({imageWidth:0,imageHeight:0,imageSrc:this.props.src,loading:true},this._resolveImageSize);},_resolveImageSize:function o(){var p=this.state.imageSrc;if(p)m.get(p,this._onImageSizeResolved,this);},render:function o(){var p={width:this.props.width+'px',height:this.props.height+'px'},q=c('joinClasses')(this.props.className,"_5f0d");return c('React').createElement('div',babelHelpers['extends']({},this.props,{className:c('joinClasses')(this.props.className,q),style:babelHelpers['extends']({},this.props.style||{},p),onContextMenu:this.props.onContextMenu}),this._renderImage(),this._renderContent(),this._renderLoadingIndicator());},_renderLoadingIndicator:function o(){if(!this.state.loading||this.props.loadingIndicatorStyle==='none')return null;return c('React').createElement('div',{className:"_1qe- _5lar"},c('React').createElement('div',{className:"_1qe_"},c('React').createElement('div',{className:"_1qf0"},c('React').createElement(c('XUISpinner.react'),{size:this.props.loadingIndicatorStyle}))));},_renderContent:function o(){if(this.props.children)return c('React').createElement('div',{className:"_1qe-"},c('React').createElement('div',{className:"_1qe_"},c('React').createElement('div',{className:"_1qf0"},this.props.children)));},_renderImage:function o(){if(!this.state.imageWidth||!this.state.imageHeight)return;var p=this.props.width,q=this.props.height,r,s;switch(this.props.backgroundSize){case 'cover':r='cover';s=false;break;case 'coverinside':r='cover';s=true;break;case 'contain':r='contain';s=false;break;case 'containinside':r='contain';s=true;}var t=this.state.imageWidth,u=this.state.imageHeight,v=p/q,w=t/u;if(r==='contain')if((t>p||!s)&&w>=v){t=p;u=t/w;}else if(u>q||!s){u=q;t=u*w;}if(r==='cover')if((t>p||!s)&&w>=v){u=q;t=u*w;}else if(u>q||!s){t=p;u=t/w;}var x=this._getImageStyle(t,u);return c('React').createElement(c('Image.react'),{alt:'',className:"_5i4g"+(this.props.optimizeResizeSpeed?' '+"_5sjv":''),style:x,src:this.state.imageSrc});},_getImageStyle:function o(p,q){var r=['50%','50%'],s=this._getBackgroundPositionPxValue;if(this.props.backgroundPosition){r=this.props.backgroundPosition.split(' ');}else if(this.props.backgroundFocus){r=this.props.backgroundFocus.split(' ');s=this._getBackgroundFocusPxValue;}return {width:Math.round(p)+'px',height:Math.round(q)+'px',left:s(r[0],p,this.props.width),top:s(r[1]||r[0],q,this.props.height)};},_getBackgroundPositionPxValue:function o(p,q,r){var s=parseFloat(p),t=p.substr(s.toString().length);if(t==='px')return p;return Math.round((r-q)*(s/100))+'px';},_getBackgroundFocusPxValue:function o(p,q,r){var s=parseFloat(p),t=p.substr(s.toString().length);if(q<r)return '0';var u=t==='px'?s:Math.round(q*(s/100)),v=u-r/2;v=c('clamp')(v,0,q-r);return -v+'px';},_onImageSizeResolved:function o(p,q,r){if(!this.isMounted()||this.state.imageSrc!==r)return;var s=this.props.onImageLoad?this.props.onImageLoad.bind(null,p,q):null;this.setState({imageWidth:p,imageHeight:q,loading:false},s);}});f.exports=n;}),null);
__d('CloseButton.react',['cx','fbt','React','Image.react','joinClasses'],(function a(b,c,d,e,f,g,h,i){var j,k;j=babelHelpers.inherits(l,c('React').Component);k=j&&j.prototype;l.prototype.render=function(){'use strict';var m=this.props,n=m.size||'medium',o=m.appearance||'normal',p=n==='small',q=n==='huge',r=o==='dark',s=o==='inverted',t=m.ajaxify||null,u=m.rel||null,v="uiCloseButton"+(p?' '+"uiCloseButtonSmall":'')+(q?' '+"uiCloseButtonHuge":'')+(p&&r?' '+"uiCloseButtonSmallDark":'')+(p&&s?' '+"uiCloseButtonSmallInverted":'')+(!p&&r?' '+"uiCloseButtonDark":'')+(!p&&s?' '+"uiCloseButtonInverted":''),w=i._("Close"),x=Object.assign({},this.props);delete x.size;delete x.appearance;delete x.ajaxify;delete x.tooltip;return c('React').createElement('a',babelHelpers['extends']({},x,{ajaxify:t,href:'#',role:'button',title:m.ariaLabel||w,'aria-label':m.ariaLabel||w,'data-hover':m.tooltip&&'tooltip','data-skipchecker':null,'data-tooltip-alignh':m.tooltip&&'center','data-tooltip-content':m.tooltip,className:c('joinClasses')(this.props.className,v),rel:u}),c('React').createElement(c('Image.react'),{className:'uiCloseButtonHighContrast',src:'/images/chat/tab/close.png'}));};function l(){'use strict';j.apply(this,arguments);}f.exports=l;}),null);
__d('TypeaheadViewPropTypes',['React'],(function a(b,c,d,e,f,g){'use strict';var h=c('React').PropTypes,i={ariaOwneeID:h.string,highlightedEntry:h.object,entries:h.array.isRequired,onSelect:h.func.isRequired,onHighlight:h.func,onRenderHighlight:h.func,role:h.string};f.exports=i;}),null);
__d('XUITypeaheadViewContainer.react',['cx','React','joinClasses'],(function a(b,c,d,e,f,g,h){'use strict';var i,j;i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){return c('React').createElement('ul',{className:c('joinClasses')("_599r",this.props.className),'data-testid':this.props.testID,id:this.props.ariaOwneeID,role:this.props.role},this.props.children);};function k(){i.apply(this,arguments);}f.exports=k;}),null);
__d('TypeaheadViewItem',['prop-types','React','ReactDOM','SearchableEntry'],(function a(b,c,d,e,f,g){var h={entry:c('prop-types').instanceOf(c('SearchableEntry')).isRequired,highlighted:c('prop-types').bool,role:c('prop-types').string,selected:c('prop-types').bool,onSelect:c('prop-types').func.isRequired,onHighlight:c('prop-types').func,onRenderHighlight:c('prop-types').func},i={_onSelect:function k(l){this.props.onSelect(this.props.entry,l);},_onHighlight:function k(l){if(this.props.onHighlight)this.props.onHighlight(this.props.entry,l);},getDefaultProps:function k(){return {role:'option'};},shouldComponentUpdate:function k(l){return this.props.entry.getUniqueID()!==l.entry.getUniqueID()||this.props.highlighted!==l.highlighted||this.props.selected!==l.selected;},componentDidMount:function k(){if(this.props.highlighted&&this.props.onRenderHighlight)this.props.onRenderHighlight(c('ReactDOM').findDOMNode(this));},componentDidUpdate:function k(){if(this.props.highlighted&&this.props.onRenderHighlight)this.props.onRenderHighlight(c('ReactDOM').findDOMNode(this));}};function j(k){var l,m;return m=l=function(){var n,o;n=babelHelpers.inherits(p,c('React').Component);o=n&&n.prototype;function p(){var q,r;'use strict';for(var s=arguments.length,t=Array(s),u=0;u<s;u++)t[u]=arguments[u];return r=(q=o.constructor).call.apply(q,[this].concat(t)),this.$TypeaheadViewItem1=function(v){this.props.onSelect(this.props.entry,v);}.bind(this),this.$TypeaheadViewItem2=function(v){if(this.props.onHighlight)this.props.onHighlight(this.props.entry,v);}.bind(this),r;}p.prototype.shouldComponentUpdate=function(q){'use strict';return this.props.entry.getUniqueID()!==q.entry.getUniqueID()||this.props.highlighted!==q.highlighted||this.props.selected!==q.selected;};p.prototype.componentDidMount=function(){'use strict';if(this.props.highlighted&&this.props.onRenderHighlight)this.props.onRenderHighlight(c('ReactDOM').findDOMNode(this));};p.prototype.componentDidUpdate=function(){'use strict';if(this.props.highlighted&&this.props.onRenderHighlight)this.props.onRenderHighlight(c('ReactDOM').findDOMNode(this));};p.prototype.render=function(){'use strict';return c('React').createElement(k,babelHelpers['extends']({},this.props,{onSelect:this.$TypeaheadViewItem1,onHighlight:this.$TypeaheadViewItem2}));};return p;}(),l.displayName='TypeaheadViewItem('+k.displayName+')',l.defaultProps={role:'option'},m;}f.exports={makeTypeaheadViewItem:j,Mixin:i,propTypes:h};}),null);
__d('XUITypeaheadViewItem.react',['cx','BackgroundImage.react','Badge.react','ImageBlock.react','React','TextWithEmoticons.react','Tooltip','TypeaheadViewItem','joinClasses'],(function a(b,c,d,e,f,g,h){var i=c('React').PropTypes,j=c('React').createClass({displayName:'XUITypeaheadViewItem',mixins:[c('TypeaheadViewItem').Mixin],propTypes:babelHelpers['extends']({},c('TypeaheadViewItem').propTypes,{splitText:i.bool,tooltip:i.node}),render:function k(){var l=this.props.entry,m=this.props.splitSubtext?l.getSubtitle().split(' \u00b7 ')[0]:l.getSubtitle(),n=m?c('React').createElement('div',{className:"_599q"},this.props.children,m):null,o=l.getPhoto()?c('React').createElement(c('BackgroundImage.react'),{width:32,height:32,backgroundSize:'cover',src:l.getPhoto()}):c('React').createElement('span',null),p=l.getAuxiliaryData(),q=null;if(p)if(p.verified){q=c('React').createElement(c('Badge.react'),null);}else if(p.nonCoworker){q=c('React').createElement(c('Badge.react'),{type:'work_non_coworker'});}else if(p.workUser)q=c('React').createElement(c('Badge.react'),{type:'work'});var r="_599m"+(!n?' '+"_5mne":'')+(this.props.highlighted?' '+"_599n":'');r=c('joinClasses')(r,this.props.className);return c('React').createElement('li',babelHelpers['extends']({'aria-selected':this.props.highlighted,className:r,onMouseDown:this._onSelect,onMouseEnter:this._onHighlight,role:this.props.role},this.props.tooltip?c('Tooltip').propsFor(this.props.tooltip,'right'):{}),c('React').createElement(c('ImageBlock.react'),{spacing:'medium'},o,c('React').createElement('div',null,c('React').createElement('div',{className:"_599p"},c('React').createElement(c('TextWithEmoticons.react'),{renderEmoticons:false,renderEmoji:true,text:l.getTitle()}),q),n)));}});f.exports=j;}),null);
__d('XUITypeaheadView.react',['cx','React','TypeaheadViewPropTypes','XUITypeaheadViewContainer.react','XUITypeaheadViewItem.react','joinClasses'],(function a(b,c,d,e,f,g,h){var i,j;i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;function k(){var l,m;'use strict';for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=j.constructor).call.apply(l,[this].concat(o)),this.$XUITypeaheadView1=function(q){var r=q===this.props.highlightedEntry;return c('React').createElement(c('XUITypeaheadViewItem.react'),{key:q.getUniqueID(),entry:q,highlighted:r,onSelect:this.props.onSelect,onHighlight:this.props.onHighlight,onRenderHighlight:this.props.onRenderHighlight});}.bind(this),m;}k.prototype.render=function(){'use strict';var l=!this.props.entries.length?"_599s":'';if(this.props.className)l=c('joinClasses')(this.props.className,l);return c('React').createElement(c('XUITypeaheadViewContainer.react'),{className:l,id:this.props.ariaOwneeID,role:this.props.role},this.props.entries.map(this.$XUITypeaheadView1));};k.propTypes=c('TypeaheadViewPropTypes');k.defaultProps={role:'listbox'};f.exports=k;}),null);
__d('AbstractSearchSource',['Promise'],(function a(b,c,d,e,f,g){h.prototype.bootstrap=function(i){'use strict';if(!this.$AbstractSearchSource1)this.$AbstractSearchSource1=new (c('Promise'))(function(j){this.bootstrapImpl(j);}.bind(this));return this.$AbstractSearchSource1.then(i);};h.prototype.search=function(i,j,k){'use strict';this.searchImpl(i,j,k);};h.prototype.bootstrapImpl=function(i){'use strict';i();};h.prototype.searchImpl=function(i,j,k){'use strict';throw new Error('Abstract method #searchImpl is not implemented.');};h.prototype.clearBootstrappedData=function(){'use strict';this.$AbstractSearchSource1=null;};function h(){'use strict';}f.exports=h;}),null);
__d('SearchSourceQueryStatus',[],(function a(b,c,d,e,f,g){var h={ACTIVE:'ACTIVE',COMPLETE:'COMPLETE'};f.exports=h;}),null);
__d('SearchSourceCallbackManager',['invariant','SearchSourceQueryStatus','createObjectFrom'],(function a(b,c,d,e,f,g,h){var i=c('SearchSourceQueryStatus').ACTIVE,j=c('SearchSourceQueryStatus').COMPLETE;function k(m){'use strict';this.$SearchSourceCallbackManager1=m.parseFn;typeof this.$SearchSourceCallbackManager1==='function'||h(0);this.$SearchSourceCallbackManager2=m.matchFn;typeof this.$SearchSourceCallbackManager2==='function'||h(0);this.$SearchSourceCallbackManager3=m.alwaysPrefixMatch||false;this.$SearchSourceCallbackManager4=m.indexFn||l;this.$SearchSourceCallbackManager5=m.exclusions||{};this.reset();}k.prototype.search=function(m,n,o){'use strict';var p=this.$SearchSourceCallbackManager6(m,n,o);if(p)return 0;this.$SearchSourceCallbackManager7.push({queryString:m,callback:n,options:o});var q=this.$SearchSourceCallbackManager7.length-1;this.$SearchSourceCallbackManager8.push(q);return q;};k.prototype.$SearchSourceCallbackManager6=function(m,n,o){'use strict';var p=this.$SearchSourceCallbackManager9(m),q=!!this.$SearchSourceCallbackManager10[m];if(!p.length){n([],m,q?j:i);return q;}var r=p.map(function(s){return this.$SearchSourceCallbackManager11[s];},this);n(r,m,q?j:i);return q;};k.prototype.$SearchSourceCallbackManager12=function(){'use strict';var m=this.$SearchSourceCallbackManager8;this.$SearchSourceCallbackManager8=[];m.forEach(this.$SearchSourceCallbackManager13,this);};k.prototype.$SearchSourceCallbackManager13=function(m){'use strict';var n=this.$SearchSourceCallbackManager7[m];if(!n)return;var o=this.$SearchSourceCallbackManager6(n.queryString,n.callback,n.options);if(o){delete this.$SearchSourceCallbackManager7[m];return;}this.$SearchSourceCallbackManager8.push(m);};k.prototype.reset=function(){'use strict';this.$SearchSourceCallbackManager11={};this.$SearchSourceCallbackManager14={};this.$SearchSourceCallbackManager15={};this.$SearchSourceCallbackManager16={};this.$SearchSourceCallbackManager10={};this.$SearchSourceCallbackManager8=[];this.$SearchSourceCallbackManager7=[undefined];};k.prototype.addLocalEntries=function(m){'use strict';m.forEach(function(n){var o=n.getUniqueID(),p=this.$SearchSourceCallbackManager4(n);this.$SearchSourceCallbackManager11[o]=n;this.$SearchSourceCallbackManager14[o]=p;var q=this.$SearchSourceCallbackManager1(p);q.tokens.forEach(function(r){if(!Object.prototype.hasOwnProperty.call(this.$SearchSourceCallbackManager15,r))this.$SearchSourceCallbackManager15[r]={};this.$SearchSourceCallbackManager15[r][o]=true;},this);},this);this.$SearchSourceCallbackManager12();};k.prototype.addQueryEntries=function(m,n,o){'use strict';if(o===j)this.setQueryStringAsExhausted(n);var p=this.$SearchSourceCallbackManager9(n),q=this.$SearchSourceCallbackManager1(n).flatValue;this.$SearchSourceCallbackManager16[q]=c('createObjectFrom')(p,true);m.forEach(function(r){var s=r.getUniqueID();this.$SearchSourceCallbackManager11[s]=r;this.$SearchSourceCallbackManager14[s]=this.$SearchSourceCallbackManager4(r);this.$SearchSourceCallbackManager16[q][s]=true;},this);this.$SearchSourceCallbackManager12();};k.prototype.unsubscribe=function(m){'use strict';delete this.$SearchSourceCallbackManager7[m];};k.prototype.removeEntry=function(m){'use strict';delete this.$SearchSourceCallbackManager11[m];};k.prototype.getAllEntriesMap=function(){'use strict';return this.$SearchSourceCallbackManager11;};k.prototype.setQueryStringAsExhausted=function(m){'use strict';this.$SearchSourceCallbackManager10[m]=true;};k.prototype.unsetQueryStringAsExhausted=function(m){'use strict';delete this.$SearchSourceCallbackManager10[m];};k.prototype.$SearchSourceCallbackManager9=function(m){'use strict';var n=this.$SearchSourceCallbackManager17(m,this.$SearchSourceCallbackManager18(m)),o=this.$SearchSourceCallbackManager17(m,this.$SearchSourceCallbackManager19(m)),p=n.concat(o),q={},r=[];p.forEach(function(s){if(q[s]==null&&this.$SearchSourceCallbackManager11[s]!=null&&this.$SearchSourceCallbackManager5[s]==null){r.push(s);q[s]=true;}},this);return r;};k.prototype.$SearchSourceCallbackManager17=function(m,n){'use strict';var o=this.$SearchSourceCallbackManager20(m,n),p=this.$SearchSourceCallbackManager11;function q(r,s){if(o[r]!==o[s])return o[r]?-1:1;var t=p[r],u=p[s];if(t.getOrder()!==u.getOrder())return t.getOrder()-u.getOrder();var v=t.getTitle().length,w=u.getTitle().length;if(v!==w)return v-w;return t.getUniqueID()-u.getUniqueID();}return n.sort(q).slice();};k.prototype.$SearchSourceCallbackManager20=function(m,n){'use strict';var o={};n.forEach(function(p){o[p]=this.$SearchSourceCallbackManager2(m,this.$SearchSourceCallbackManager14[p]);},this);return o;};k.prototype.$SearchSourceCallbackManager18=function(m){'use strict';var n=this.$SearchSourceCallbackManager1(m,this.$SearchSourceCallbackManager3),o=this.$SearchSourceCallbackManager3?n.sortedTokens:n.tokens,p=o.length,q=n.isPrefixQuery?p-1:null,r={},s={},t={},u=false,v={},w=0;o.forEach(function(y,z){if(Object.prototype.hasOwnProperty.call(v,y))return;w++;v[y]=true;for(var aa in this.$SearchSourceCallbackManager15){var ba=aa===y&&!Object.prototype.hasOwnProperty.call(r,aa),ca=false;if(!ba)ca=(this.$SearchSourceCallbackManager3||q===z)&&aa.indexOf(y)===0;if(!ba&&!ca)continue;if(aa===y){if(Object.prototype.hasOwnProperty.call(s,aa))u=true;r[aa]=true;}else{if(Object.prototype.hasOwnProperty.call(r,aa)||Object.prototype.hasOwnProperty.call(s,aa))u=true;s[aa]=true;}for(var da in this.$SearchSourceCallbackManager15[aa])if(z===0||Object.prototype.hasOwnProperty.call(t,da)&&t[da]==w-1)t[da]=w;}},this);var x=Object.keys(t).filter(function(y){return t[y]==w;});if(u||w<p)x=this.$SearchSourceCallbackManager21(m,x);return x;};k.prototype.$SearchSourceCallbackManager19=function(m){'use strict';var n=this.$SearchSourceCallbackManager1(m).flatValue,o=this.$SearchSourceCallbackManager22(n);if(Object.prototype.hasOwnProperty.call(this.$SearchSourceCallbackManager16,n))return o;return this.$SearchSourceCallbackManager21(m,o);};k.prototype.$SearchSourceCallbackManager22=function(m){'use strict';var n=0,o=null,p=this.$SearchSourceCallbackManager16;Object.keys(p).forEach(function(q){if(m.indexOf(q)===0&&q.length>n){n=q.length;o=q;}});return Object.prototype.hasOwnProperty.call(p,o)?Object.keys(p[o]):[];};k.prototype.$SearchSourceCallbackManager21=function(m,n){'use strict';return n.filter(function(o){return this.$SearchSourceCallbackManager2(m,this.$SearchSourceCallbackManager14[o]);},this);};function l(m){return [m.getTitle(),m.getKeywordString()].join(' ');}f.exports=k;}),null);
__d('AbstractAsyncSearchSource',['AbstractSearchSource','SearchSourceCallbackManager','SearchSourceQueryStatus','SearchableEntry','TokenizeUtil','emptyFunction','isValidUniqueID'],(function a(b,c,d,e,f,g){var h,i,j=c('SearchSourceQueryStatus').ACTIVE,k=c('SearchSourceQueryStatus').COMPLETE;h=babelHelpers.inherits(l,c('AbstractSearchSource'));i=h&&h.prototype;function l(m,n,o){'use strict';i.constructor.call(this);this.$AbstractAsyncSearchSource1=m.bootstrapRequests;this.$AbstractAsyncSearchSource2=m.queryRequests;this.$AbstractAsyncSearchSource3=m.auxiliaryFields;this.$AbstractAsyncSearchSource4=m.asyncErrorHandler||c('emptyFunction');this.$AbstractAsyncSearchSource5=m.packageFn||this.$AbstractAsyncSearchSource6;this.$AbstractAsyncSearchSource7=m.requestData||{};this.$AbstractAsyncSearchSource8=m.getAllForEmptyQuery;this.$AbstractAsyncSearchSource9=[];this.$AbstractAsyncSearchSource10=new (c('SearchSourceCallbackManager'))({parseFn:c('TokenizeUtil').parse,matchFn:m.matchFn||c('TokenizeUtil').isQueryMatch,indexFn:m.indexFn,exclusions:m.exclusions});this.$AbstractAsyncSearchSource11=n;this.$AbstractAsyncSearchSource12=o;}l.prototype.bootstrapImpl=function(m){'use strict';if(!this.$AbstractAsyncSearchSource1||!this.$AbstractAsyncSearchSource1.length){m();return;}var n=this.$AbstractAsyncSearchSource1.length,o=0;this.$AbstractAsyncSearchSource1.forEach(function(p){this.$AbstractAsyncSearchSource13(this.$AbstractAsyncSearchSource7,p,function(q){this.$AbstractAsyncSearchSource10.addLocalEntries(q);this.$AbstractAsyncSearchSource9=this.$AbstractAsyncSearchSource9.concat(q);o++;if(o===n){m();m=null;}}.bind(this));}.bind(this));};l.prototype.searchImpl=function(m,n,o){'use strict';if(this.$AbstractAsyncSearchSource8&&m===''){this.getBootstrappedEntries(function(u){n(u,m);});return;}var p=null,q={},r=this.$AbstractAsyncSearchSource10.search(m,function(u,v,w){if(o&&o.waitForAllResults&&w!==k)return;if(!p){p=u;p.forEach(function(x){q[x.getUniqueID()]=true;});}else u.forEach(function(x){var y=x.getUniqueID();if(!q[y]){p.push(x);q[y]=true;}});n(p,v,w);},o);if(!r||!this.$AbstractAsyncSearchSource2||!this.$AbstractAsyncSearchSource2.length)return;var s=babelHelpers['extends']({value:m,existing_ids:p&&p.map(function(u){return u.getUniqueID();}).join(',')},this.$AbstractAsyncSearchSource7),t=this.$AbstractAsyncSearchSource2.length;this.$AbstractAsyncSearchSource2.forEach(function(u){this.$AbstractAsyncSearchSource13(s,u,function(v){t--;this.$AbstractAsyncSearchSource14(v,m,t?j:k);}.bind(this));},this);};l.prototype.getBootstrappedEntries=function(m){'use strict';return this.bootstrap(function(){return m(this.$AbstractAsyncSearchSource9||[]);}.bind(this));};l.prototype.getAllEntriesMap=function(){'use strict';return this.$AbstractAsyncSearchSource10.getAllEntriesMap();};l.prototype.setRequestData=function(m){'use strict';this.$AbstractAsyncSearchSource7=m;};l.prototype.$AbstractAsyncSearchSource13=function(m,n,o){'use strict';this.$AbstractAsyncSearchSource11(m,n,function(p){return o(this.$AbstractAsyncSearchSource12(p,this.$AbstractAsyncSearchSource5).filter(function(q){return !!q;}));}.bind(this),this.$AbstractAsyncSearchSource4);};l.prototype.$AbstractAsyncSearchSource15=function(m){'use strict';this.$AbstractAsyncSearchSource10.addLocalEntries(m);};l.prototype.$AbstractAsyncSearchSource14=function(m,n,o){'use strict';this.$AbstractAsyncSearchSource10.addQueryEntries(m,n,o);};l.prototype.$AbstractAsyncSearchSource6=function(m,n){'use strict';var o=m.title||m.text,p=m.uniqueID||m.uid;if(!o||!c('isValidUniqueID')(p))return null;return new (c('SearchableEntry'))({uniqueID:p,order:m.order||m.index||n,title:o,subtitle:m.subtitle||m.category||m.subtext,keywordString:m.keywordString||m.tokens,type:m.type,photo:m.photo,uri:m.uri||m.path,auxiliaryData:this.$AbstractAsyncSearchSource16(m)});};l.prototype.$AbstractAsyncSearchSource16=function(m){'use strict';var n;if(this.$AbstractAsyncSearchSource3){n={};for(var o in this.$AbstractAsyncSearchSource3){var p=this.$AbstractAsyncSearchSource3[o];n[o]=m[p];}}if(m.aux_data)n=babelHelpers['extends']({},n,m.aux_data);return n;};f.exports=l;}),null);
__d('WebAsyncSearchSourceUtils',[],(function a(b,c,d,e,f,g){var h={normalizeResponse:function i(j,k){var l=j.getPayload(),m;if(Array.isArray(l)){m=l;}else if(l&&l.entries){m=l.entries;}else m=[];return m.map(k,this);}};f.exports=h;}),null);
__d('WebAsyncSearchSource',['AbstractAsyncSearchSource','AbstractSearchSource','AsyncRequest','WebAsyncSearchSourceUtils'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('AbstractSearchSource'));i=h&&h.prototype;function j(k){'use strict';i.constructor.call(this);this.$WebAsyncSearchSource1=new (c('AbstractAsyncSearchSource'))(k,this.$WebAsyncSearchSource2,c('WebAsyncSearchSourceUtils').normalizeResponse);}j.prototype.bootstrapImpl=function(k){'use strict';this.$WebAsyncSearchSource1.bootstrap(k);};j.prototype.searchImpl=function(k,l,m){'use strict';this.$WebAsyncSearchSource1.search(k,l,m);};j.prototype.getBootstrappedEntries=function(k){'use strict';return this.$WebAsyncSearchSource1.getBootstrappedEntries(k);};j.prototype.getAllEntriesMap=function(){'use strict';return this.$WebAsyncSearchSource1.getAllEntriesMap();};j.prototype.setRequestData=function(k){'use strict';this.$WebAsyncSearchSource1.setRequestData(k);};j.prototype.$WebAsyncSearchSource2=function(k,l,m,n){'use strict';new (c('AsyncRequest'))(l.uri).setData(babelHelpers['extends']({},k,l.data)).setMethod('GET').setReadOnly(true).setAllowCrossPageTransition(true).setHandler(m).setErrorHandler(n).send();};f.exports=j;}),null);
__d("cssURL",[],(function a(b,c,d,e,f,g){function h(i){return "url('"+i.replace(/(\\|\s|\(|\)|'|\")/g,'\\$1')+"')";}f.exports=h;}),null);
__d("TypeaheadNavigation",[],(function a(b,c,d,e,f,g){var h={moveUp:function i(j,k,l){var m=j.indexOf(k),n=m==-1?j.length-1:m-1;l(n==-1?null:j[n]);},moveDown:function i(j,k,l){var m=j.indexOf(k)+1;l(m==j.length?null:j[m]);}};f.exports=h;}),null);