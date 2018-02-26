window.adcm.ext({
    knownIds:[1, 1041, 1050, 1067, 2025, 2039, 2210, 6015],
    encode: function (str) {
        return encodeURIComponent(str);
    },
    equal: function (array1, array2) {
        if (!array1 || !array2)
            return false;

        if (array1.length != array2.length)
            return false;

        for (var i = 0, l=array1.length; i < l; i++) {
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                if (!this.equal(array1[i], array2[i])) {
                    return false;
                }     
            } else if (array1[i] != array2[i]) { 
                return false;   
            }           
        }       
        return true;
    },
    blank: function (string) {
        return string || "";
    },
    aggregate: function (param) {
        var referrer = document.referrer;
        var hash = window.location.hash;
        
        var params = [];
        var result = "i="+this.session+"."+Math.round(1E15*Math.random());
        if (param.profileId && param.platformId) {
            var essid = this.encode(param.platformId);
            var eupid = this.encode(param.profileId);

            result += "&a=" + essid + "&e=" + eupid;

            params.push("ss:" + essid );
            params.push("up:" + eupid );
            params.push("sync:up");
        }
        
        if (param && param.event) params.push("et:" + this.encode(param.event));
        if (param && param.price) params.push("ip:" + this.encode(param.price));
        if (param && param.elapsed_seconds) params.push("es:" + this.encode(param.elapsed_seconds));

        if (!this.params) {
            this.params = {
                referrer: referrer ? /\/\/([^#]*)/ig.exec(referrer)[1] : /\/\/([^#]*)/ig.exec(window.location.href)[1],
                hash: null,
                tags: null
            }
        }
        
        if (param.tags && !this.equal(param.tags, this.params.tags)) {
            params.push("tg:" + this.encode(param.tags.join(" ")));
            this.params.tags = param.tags;
        }

        var url = /\/\/([^#]*)/ig.exec(window.location.href)[1];
        if (url !== this.params.referrer) {
            params.push("cr:" + this.encode(referrer));
            this.params.referrer = url;
        }
        
        if (this.blank(hash) !== this.blank(this.params.hash)) {
            params.push("rh:" + this.encode(hash.substr(1)));
            this.params.hash = hash;
        }

        if (params.length > 0) {
            result += "&c=" + params.join(".");
        }

        return result;
    },
    relocate: function () {
        if (this.knownIds.indexOf(this.config.id) >= 0) {
            this.load(null, window.location.protocol + '//tag.digitaltarget.ru/extensions/extension_'+this.config.id+'.js?i=' + Math.round(1E15*Math.random()));
        }
    },
    call: function (params) {
        var self = this;
        
        // aggregate configuration
        if (!params) {
            params = {};
        }
        params.tags = params.tags || this.config.tags;
        if (params.profileId || this.config.profileId) {
            params.profileId = params.profileId || this.config.profileId;
            params.platformId = params.platformId || this.config.platformId || this.config.id;
        }
        
        var calling = function () {
            var img = new Image();
            img.src = window.location.protocol + "//dmg.digitaltarget.ru/1/"+self.config.id+"/i/i?" + self.aggregate(params);
        }
        
        if (this.loaded) {
            calling();
        } else {
            var interval = setInterval(function () {
                if (self.loaded) {
                    calling();
                    clearInterval(interval);
                }
            },1000);
        }
    },
    callpixel: function (serviceid) {
        var self = this;
        var cachebuster = "i="+this.session+"."+Math.round(1E15*Math.random());

        var callingpixel = function () {
            var img = new Image();
            img.src = window.location.protocol + "//dmg.digitaltarget.ru/1/"+serviceid+"/i/i?" + cachebuster;
        }
        
        if (this.loaded) {
            callingpixel();
        } else {
            var interval = setInterval(function () {
                if (self.loaded) {
                    callingpixel();
                    clearInterval(interval);
                }
            },1000);
        }
    }
});
