try{
var R=[
  // I
  [{
    id: 'gg',
    s: function(){
      function base64(str) {
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg'+'hijklmnopqrstuvwxyz0123456789+/=';
        var b64encoded = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        for (var i=0; i<str.length;) {
          chr1 = str.charCodeAt(i++);
          chr2 = str.charCodeAt(i++);
          chr3 = str.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
          enc4 = isNaN(chr3) ? 64:(chr3 & 63);
          b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) + b64chars.charAt(enc3) + b64chars.charAt(enc4);
        }
        return encodeURIComponent(b64encoded);
      };
      ld('https://cm.g.doubleclick.net/pixel?google_nid=ADR&google_hm='+base64(cid))
    },
    t: 1000*60*60*24*3,
    bl: 1
  },{
    id: 'ya',
    s: function(){
      var makeCRCTable = function () {
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
          }
          crcTable[n] = c;
        }
        return crcTable;
      };
      var crc32 = function (str) {
        var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
        var crc = 0 ^ (-1);
        for (var i = 0; i < str.length; i++) {
          crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }
        return (crc ^ (-1)) >>> 0;
      };
      if ((/MSIE (\d+\.\d+);/.test(navigator.userAgent)) || (document.body.style.msTextCombineHorizontal !== undefined)) {
        var usAge = window.navigator.userAgent;
        usAge = usAge.split(" ");
        for (var i = 0; i < usAge.length; i++) {
          if (usAge[i].indexOf('Trident') !== -1) {
            var strt = i
          }
          if (usAge[i].indexOf('rv:') !== -1) {
            var strend = i
          }
        }
        var usAg = [];
        if (strt) {
          for (var i = 0; i <= strt; i++) {
            usAg.push(usAge[i]);
          }
        }
        if (strend) {
          for (var i = strend; i < usAge.length; i++) {
            usAg.push(usAge[i]);
          }
        }
        usAg = usAg.join(' ');
        if (strt && !strend) {
          usAg = usAg.slice(0, -1) + ')';
        }
      } else {
        var usAg = window.navigator.userAgent;
      }

      var sep = '.', _ip = ip.split(sep), cidsep = cid.slice(1).replace('==', '');
      _ip = _ip[0] + '.' + _ip[1] + '.' + _ip[2];
      var hash = crc32(_ip + window.location.href + usAg + '' + cidsep + '6456cb2ae565cb18dceaa12d1898837c');
      ld('//an.yandex.ru/setud/adriver/' + cidsep + '?sign=' + hash);
    },
    t: 1000*60*60*24*3,
    bl: 1
  }],
  // II
  [{
    id: 'ml',
    c: http && cid && cookiestate == 0,
    s: function(){ld('//ad.mail.ru/cm.gif?p=23&id='+encodeURIComponent(cid))}
  },{
    id: 'bt',
    c: http && cid && cookiestate == 0,
    s: function(){ld('//match.ads.betweendigital.com/match?bidder_id=3&external_user_id='+encodeURIComponent(cid)+'&c=0')}
  },{
    id: 'tr',
    s: function(){ld('//st.targetix.net/match?id=20')}
  },{
    id: 'ad',
    s: function(){ld('//advombat.ru/0.gif?pid=ADRIVER&id='+encodeURIComponent(cid))},
    t: 1000*60*60*24
  },{
    id: 'dt',
    s: function(){ld('//dmg.digitaltarget.ru/1/123/i/i?a=123&e='+encodeURIComponent(cid)+'&i='+rnd)}
  },{
    id: 'am',
    s: function(){ld('//rtb.am15.net/aux/sync?advm_nid=62499&uid='+encodeURIComponent(cid))}
  },{
    id: 'gg2',
    s: function(){ld('//cm.g.doubleclick.net/pixel?google_nid=crossmedia_ddp&google_cm&c=rs:123&i='+rnd)}
  },{
    id: 'in',
    s: function(){ld('//t.insigit.com/mark_forward/fd1e81207946c410778a32b4aa439178/ea376fb139b2d7a65a172e99a86a2bfa')}
  },{
    id: 'ra',
    s: function(){ld('//profile.ssp.rambler.ru/sync2.302?pid=89')}
  },{
    id: 'al2',
    c: http && cid && cookiestate == 0,
    s: function(){ld('//cm.p.altergeo.ru/pixel?url=%2F%2Fdmg.digitaltarget.ru%2F1%2F2016%2Fi%2Fi%3Fa%3D16%26e%3D%24%7BUSER_ID%7D%26c%3Dds%3A16.up%3A%24%7BUSER_ID%7D.pc%3A%24%7BCATS_ID%7D%26i%3D%24%7BRANDOM%7D')}
  },{
    id: 'au',
    s: function(){ld('//sync.audtd.com/match/adriver?uid='+encodeURIComponent(cid))}
  },{
    id: 'ra2',
    c: http && cid && cookiestate == 0,
    s: function(){ld('//profile.ssp.rambler.ru/sync3.302?pid=89')}
  },{
    id: 're',
    s: function(){ld('//sync.republer.com/match?dsp=soloway&id='+encodeURIComponent(cid))}
  },{
    id: 'ru',
    s: function(){ld('//adriver-sync.rutarget.ru/sync')}
  },{
    id: 'ah',
    s: function(){ld('//px.adhigh.net/p/cm/adriver?u='+encodeURIComponent(cid))}
  },{
    id: '1d',
    s: function(){ld('https://sync.1dmp.io/pixel.gif?cid=7287fde7-f83f-4ff9-ace2-07c8fef0a289&pid=w&uid='+encodeURIComponent(cid))},
    t: 1000*60*60*24
  },{
    id: '1d2',
    s: function(){ld('//dmp.mindshare.1dmp.io?cid=170e8600-7dac-4112-8ca9-a5cb6d23d301&pid=tm.cview&ru=%2F%2Fssp.adriver.ru%2Fcgi-bin%2Fsync.cgi%3fdsp_id%3D135%26external_id%3D%5BUID%5D')},
    t: 1000*60*60*24
  },{
    id: 'adr_i',
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=608223&bt=21&pid=2527627&bid=4950956&bn=4950956&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'tt',
    s: function(){ld('//tt.ttarget.ru/rtb/adriver/sync')},
    t: 1000*60*60*24*3
  }],
  // III
  [{
    id: 'bm',
    s: function(){ld('//sync.bumlam.com/?src=adr1&uid='+encodeURIComponent(cid))}
  },{
    id: 'ex',
    s: function(){ld('//sync-eu.exe.bid/image?source=adriver&id='+encodeURIComponent(cid)+'&return_url='+("https:" == document.location.protocol ? "https" : "http")+'%3A%2F%2Fssp.adriver.ru%2Fcgi-bin%2Fsync.cgi%3Fdsp_id%3D106%26external_id%3D%7BUID%7D')}
  },{
    id: 'sp',
    s: function(){ld('//front.sspicy.ru/collect?sync_redirect=sspicy_adriver')}
  },{
    id: 'rr',
    s: function(){ld('//tracker.rareru.ru/match?bidder_id=adriver')}
  },{
    id: 'ac',
    s: function(){ld('//www.acint.net/match/?dp=45&euid='+encodeURIComponent(cid))}
  },{
    id: 'ar',
    c: true,
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=606624&bt=21&bn=606624&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'but',
    c: true,
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=614439&bt=21&bn=614439&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'la',
    c: true,
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=614465&bt=21&bn=614465&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'wi',
    c: true,
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=614466&bt=21&bn=614466&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'lar',
    c: true,
    s: function(){ld('//ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=614467&bt=21&bn=614467&rnd='+rnd)},
    t: 1000*60*60*24
  },{
    id: 'ads',
    s: function(){ld('//rtb.com.ru/adriver-sync?uid='+encodeURIComponent(cid))}
  },{
    id: 'amb2',
    c: true,
    s: function(){
      (function(L){if(typeof(ar_cn)=="undefined")ar_cn=1;
        var S='setTimeout(function(e){if(!self.CgiHref){document.close();e=parent.document.getElementById("ar_container_"+ar_bnum);e.parentNode.removeChild(e);}},3000);',
          j=' type="text/javascript"',t=0,D=document,n=ar_cn;L='' + ('https:' == document.location.protocol ? 'https:' : 'http:') + ''+L+escape(D.referrer||'unknown')+'&rnd='+Math.round(Math.random()*999999999);
        function _(){if(t++<100){var F=D.getElementById('ar_container_'+n);
          if(F){try{var d=F.contentDocument||(window.ActiveXObject&&window.frames['ar_container_'+n].document);
          if(d){d.write('<sc'+'ript'+j+'>var ar_bnum='+n+';'+S+'<\/sc'+'ript><sc'+'ript'+j+' src="'+L+'"><\/sc'+'ript>');t=0}
          else setTimeout(_,100);}catch(e){try{F.src="javascript:{document.write('<sc'+'ript"+j+">var ar_bnum="+n+"; document.domain=\""
          +D.domain+"\";"+S+"<\/sc'+'ript>');document.write('<sc'+'ript"+j+" src=\""+L+"\"><\/sc'+'ript>');}";return}catch(E){}}}else setTimeout(_,100);}}
          var _c = D.createElement('div');_c.innerHTML = '<iframe id="ar_container_'+ar_cn+'" width=1 height=1 marginwidth=0 marginheight=0 scrolling=no frameborder=0><\/iframe><div id="ad_ph_'+ar_cn+'" style="display:none;"></div>';
          D.body.appendChild(_c);
        _();ar_cn++;
      })('//ad.adriver.ru/cgi-bin/erle.cgi?sid=1&ad=605736&bt=43&bn=605736&tail256=');
    },
    t: 1000*60*60*24
  }]
];

if(uid == 27384237356 || uid == 20050884996 || uid == 19175897844){sC('cid', 0, 1000*60);}

function ld(a){var b=document.createElement("img");b.setAttribute("src",a),document.body.appendChild(b)}var Rt=function(con){function rI(a,b){return Math.floor(Math.random()*(b-a))+a}function gSd(){var r,c=gC(cN)||"{}";try{r=JSON.parse(c)}catch(e){try{r=eval("("+c+")")}catch(a){r={}}}return r}function f(a,b,c){for(var d,e=[],f=0,g=a.length;f<g;f++){d=a[f],e[f]||(e[f]=[]);for(var h=0,i=d.length;h<i;h++){var j=d[h],k=b[j.id],l=!k||1*new Date-k>j.t,m=c?j.bl:!j.bl;j.c&&m&&l&&e[f].push(j)}}return e}function gP(a,b){function c(a,b){for(var c=0,d=0,e=a.length;d<e;d++){var f=a[d].id,g=b[f];g||(c+=1)}return c}function d(a,b,c){return a.length<b&&c.length}function e(a,b){var c=rI(0,a.length);b.push(a[c]),a.splice(c,1)}function f(a,b){b.push(a[0]),a.splice(0,1)}function g(a,c){return b[a.id]>b[c.id]?1:b[a.id]<b[c.id]?-1:0}for(var h=[],i=mS,j=0,k=a.length;j<k;j++){var l=a[j],m=!l.length;if(i-=h.length,!m){if(!i)break;var n=c(l,b);if(n>=i)for(;d(h,mS,l);)e(l,h);else for(l.sort(g);d(h,mS,l);)f(l,h)}}return h}function syn(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c],f=e.s,g=e.id;f&&g&&(f(),b[g]=1*new Date)}}function sv(a){var b;try{b=JSON.stringify(a)}catch(e){var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push('"'+d+'":'+a[d]);b="{"+c.join(",")+"}"}sC(cN,b,31536e7)}function iC(){for(var a,b,c=gSd(),d=0,e=R.length;d<e;d++){b=R[d];for(var f=0,g=b.length;f<g;f++){var h=b[f],i=c[h.id];if(!i||1*new Date-i>h.t)return!1;var j=i+h.t-1*new Date-6e4;a?a>j&&(a=j):a=j}}return a>mNS?mNS:a}function sD(a,b){for(var c,d=0,e=a.length;d<e;d++){c=a[d];for(var f=0,g=c.length;f<g;f++){var h=c[f];h.hasOwnProperty("t")||(h.t=b.t),h.hasOwnProperty("c")||(h.c=b.c)}}}function st(a){a=a||{};var b=a.bl||0;mS=a.mS||mS,sD(R,{t:6048e5,c:cid&&0==cookiestate});var c=gSd(),d=f(R,c,b),e=gP(d,c);syn(e,c),sv(c);var g=iC();g?sC(compN,1,g):sC(compN,0,-1e3)}var cN=con.cN||"sc",mS=con.mS||5,mNS=con.mNS||288e5,compN=con.compN;return{st:st}}({cN:"sc",mS:5,mNS:144e5,compN:window.compN});Rt.st({bl:1}),pL?Rt.st({mS:35}):window.addEventListener("message",function(a){isPL(a)&&Rt.st({mS:35})})}catch(a){}