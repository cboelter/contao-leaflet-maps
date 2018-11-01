!function(t){var r,e,n=function(){try{return!!Symbol.iterator}catch(t){return!1}}(),o=function(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return n&&(t[Symbol.iterator]=function(){return t}),t},i=function(t){return encodeURIComponent(t).replace(/%20/g,"+")},s=function(t){return decodeURIComponent(t).replace(/\+/g," ")};"URLSearchParams"in t&&"a=1"===new URLSearchParams("?a=1").toString()||((e=(r=function(t){if(Object.defineProperty(this,"_entries",{writable:!0,value:{}}),"string"==typeof t)""!==t&&this._fromString(t);else if(t instanceof r){var n=this;t.forEach(function(t,e){n.append(e,t)})}else{if(null===t||"object"!=typeof t)throw new TypeError("Unsupported input's type for URLSearchParams");if("[object Array]"===Object.prototype.toString.call(t))for(var e=0;e<t.length;e++){var o=t[e];if("[object Array]"!==Object.prototype.toString.call(o)&&2===o.length)throw new TypeError("Expected [string, any] as entry at index "+e+" of URLSearchParams's input");this.append(o[0],o[1])}else for(var i in t)t.hasOwnProperty(i)&&this.append(i,t[i])}}).prototype).append=function(t,e){t in this._entries?this._entries[t].push(String(e)):this._entries[t]=[String(e)]},e.delete=function(t){delete this._entries[t]},e.get=function(t){return t in this._entries?this._entries[t][0]:null},e.getAll=function(t){return t in this._entries?this._entries[t].slice(0):[]},e.has=function(t){return t in this._entries},e.set=function(t,e){this._entries[t]=[String(e)]},e.forEach=function(t,e){var n;for(var o in this._entries)if(this._entries.hasOwnProperty(o)){n=this._entries[o];for(var i=0;i<n.length;i++)t.call(e,n[i],o,this)}},e.keys=function(){var n=[];return this.forEach(function(t,e){n.push(e)}),o(n)},e.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),o(e)},e.entries=function(){var n=[];return this.forEach(function(t,e){n.push([e,t])}),o(n)},n&&(e[Symbol.iterator]=e.entries),e.toString=function(){var n=[];return this.forEach(function(t,e){n.push(i(e)+"="+i(t))}),n.join("&")},t.URLSearchParams=r);var a=URLSearchParams.prototype;"function"!=typeof a.sort&&(a.sort=function(){var n=this,o=[];this.forEach(function(t,e){o.push([e,t]),n._entries||n.delete(e)}),o.sort(function(t,e){return t[0]<e[0]?-1:t[0]>e[0]?1:0}),n._entries&&(n._entries={});for(var t=0;t<o.length;t++)this.append(o[t][0],o[t][1])}),"function"!=typeof a._fromString&&Object.defineProperty(a,"_fromString",{enumerable:!1,configurable:!1,writable:!1,value:function(t){if(this._entries)this._entries={};else{var n=this;this.searchParams.forEach(function(t,e){n.delete(e)})}for(var e,o=(t=t.replace(/^\?/,"")).split("&"),i=0;i<o.length;i++)e=o[i].split("="),this.append(s(e[0]),1<e.length?s(e[1]):"")}})}("undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this),function(h){var e,t,n;if(function(){try{var t=new URL("b","http://a");return t.pathname="c%20d","http://a/c%20d"===t.href&&t.searchParams}catch(t){return!1}}()||(e=h.URL,n=(t=function(t,e){"string"!=typeof t&&(t=String(t));var n,o=document;if(e&&(void 0===h.location||e!==h.location.href)){(n=(o=document.implementation.createHTMLDocument("")).createElement("base")).href=e,o.head.appendChild(n);try{if(0!==n.href.indexOf(e))throw new Error(n.href)}catch(t){throw new Error("URL unable to set base "+e+" due to "+t)}}var i=o.createElement("a");if(i.href=t,n&&(o.body.appendChild(i),i.href=i.href),":"===i.protocol||!/:/.test(i.href))throw new TypeError("Invalid URL");Object.defineProperty(this,"_anchorElement",{value:i});var r=new URLSearchParams(this.search),s=!0,a=!0,p=this;["append","delete","set"].forEach(function(t){var e=r[t];r[t]=function(){e.apply(r,arguments),s&&(a=!1,p.search=r.toString(),a=!0)}}),Object.defineProperty(this,"searchParams",{value:r,enumerable:!0});var u=void 0;Object.defineProperty(this,"_updateSearchParams",{enumerable:!1,configurable:!1,writable:!1,value:function(){this.search!==u&&(u=this.search,a&&(s=!1,this.searchParams._fromString(this.search),s=!0))}})}).prototype,["hash","host","hostname","port","protocol"].forEach(function(t){var e;e=t,Object.defineProperty(n,e,{get:function(){return this._anchorElement[e]},set:function(t){this._anchorElement[e]=t},enumerable:!0})}),Object.defineProperty(n,"search",{get:function(){return this._anchorElement.search},set:function(t){this._anchorElement.search=t,this._updateSearchParams()},enumerable:!0}),Object.defineProperties(n,{toString:{get:function(){var t=this;return function(){return t.href}}},href:{get:function(){return this._anchorElement.href.replace(/\?$/,"")},set:function(t){this._anchorElement.href=t,this._updateSearchParams()},enumerable:!0},pathname:{get:function(){return this._anchorElement.pathname.replace(/(^\/?)/,"/")},set:function(t){this._anchorElement.pathname=t},enumerable:!0},origin:{get:function(){var t={"http:":80,"https:":443,"ftp:":21}[this._anchorElement.protocol],e=this._anchorElement.port!=t&&""!==this._anchorElement.port;return this._anchorElement.protocol+"//"+this._anchorElement.hostname+(e?":"+this._anchorElement.port:"")},enumerable:!0},password:{get:function(){return""},set:function(t){},enumerable:!0},username:{get:function(){return""},set:function(t){},enumerable:!0}}),t.createObjectURL=function(t){return e.createObjectURL.apply(e,arguments)},t.revokeObjectURL=function(t){return e.revokeObjectURL.apply(e,arguments)},h.URL=t),void 0!==h.location&&!("origin"in h.location)){var o=function(){return h.location.protocol+"//"+h.location.hostname+(h.location.port?":"+h.location.port:"")};try{Object.defineProperty(h.location,"origin",{get:o,enumerable:!0})}catch(t){setInterval(function(){h.location.origin=o()},100)}}}("undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this),L.Contao=L.Evented.extend({statics:{ATTRIBUTION:' | <a href="https://netzmacht.de/contao-leaflet" title="Powered by Leaflet extension for Contao CMS developed by netzmacht David Molineus">netzmacht</a>'},maps:{},icons:{},initialize:function(){L.Icon.Default.imagePath="assets/leaflet/libs/leaflet/images/",this.setGeoJsonListeners(L.GeoJSON)},addMap:function(t,e){return this.maps[t]=e,this.fire("map:added",{id:t,map:e}),this},getMap:function(t){return void 0===this.maps[t]?null:this.maps[t]},addIcon:function(t,e){return this.icons[t]=e,this.fire("icon:added",{id:t,icon:e}),this},loadIcons:function(t){for(var e=0;e<t.length;e++){var n;n="extraMarkers.icon"===t[e].type?L.ExtraMarkers.icon(t[e].options):L[t[e].type](t[e].options),this.addIcon(t[e].id,n)}},getIcon:function(t){return void 0===this.icons[t]?null:this.icons[t]},load:function(t,e,n,o,i){var r=this.createRequestUrl(t,i);return this.loadFile(r,e,n,o,i)},loadUrl:function(t,e,n,o,i){t=this.applyFilterToUrl(t,i);var r=omnivore[e](t,n,o);return i&&(L.stamp(r),i.options.dynamicLoad&&"fit"==r.options.boundsMode&&(r.options.requestUrl=t,i.on("moveend",r.refreshData,r),i.on("layerremove",function(t){t.layer===r&&i.off("moveend",r.updateBounds,r)})),i.fire("dataloading",{layer:r}),r.on("ready",function(){i.calculateFeatureBounds(r),i.fire("dataload",{layer:r})}),r.on("error",function(){i.fire("dataload",{layer:r})})),r},loadFile:function(t,e,n,o,i){return this.loadUrl(t,e,n,o,i)},pointToLayer:function(t,e){var n="marker",o=null;if(t.properties&&(t.properties.bounds=!0,t.properties.type&&(n=t.properties.type),t.properties.arguments&&(o=L[n].apply(L[n],t.properties.arguments),L.Util.setOptions(o,t.properties.options))),null===o&&(o=L[n](e,t.properties.options)),t.properties){if(t.properties.radius&&o.setRadius(t.properties.radius),t.properties.icon){var i=this.getIcon(t.properties.icon);i&&o.setIcon(i)}this.bindPopupFromFeature(o,t)}return this.fire("point:added",{marker:o,feature:t,latlng:e,type:n}),o},onEachFeature:function(t,e){t.properties&&(L.Util.setOptions(e,t.properties.options),this.bindPopupFromFeature(e,t),this.fire("feature:added",{feature:t,layer:e}))},bindPopupFromFeature:function(t,e){e.properties&&(e.properties.popup?t.bindPopup(e.properties.popup,e.properties.popupOptions):e.properties.popupContent&&t.bindPopup(e.properties.popupContent,e.properties.popupOptions))},setGeoJsonListeners:function(t){t&&t.prototype&&(t.prototype.options={pointToLayer:this.pointToLayer.bind(this),onEachFeature:this.onEachFeature.bind(this)})},createRequestUrl:function(t,e){var n,o="leaflet",i=document.location.search.substr(1).split("&");if(t=encodeURIComponent(t),""==i)t=document.location.pathname+"?"+[o,t].join("=");else{for(var r,s=i.length;s--;)if((r=i[s].split("="))[0]==o){r[1]=t,i[s]=r.join("=");break}s<0&&(i[i.length]=[o,t].join("=")),t=document.location.pathname+"?"+i.join("&")}return e&&e.options.dynamicLoad&&(t+="&f=bbox&v=",t+=(n=e.getBounds()).getSouth()+","+n.getWest(),t+=","+n.getNorth()+","+n.getEast()),t},applyFilterToUrl:function(t,e){var n,o,i;return e&&e.options.dynamicLoad?(t=new URL(t),o=new URLSearchParams(t.search),n=(i=e.getBounds()).getSouth()+","+i.getWest(),n+=","+i.getNorth()+","+i.getEast(),o.set("filter","bbox"),o.set("values",n),t.search=o.toString(),t.toString()):t}}),L.contao=new L.Contao,L.Control.Attribution.addInitHook(function(){this.options.prefix+=L.Contao.ATTRIBUTION}),L.Control.Attribution.include({setPrefix:function(t){return-1===t.indexOf(L.Contao.ATTRIBUTION)&&(t+=L.Contao.ATTRIBUTION),this.options.prefix=t,this._update(),this}}),L.GeoJSON.include({refreshData:function(t){var e=L.geoJson(),n=this;e.on("ready",function(){var t,e=n.getLayers();for(t=0;t<e.length;t++)n.removeLayer(e[t]);for(e=this.getLayers(),t=0;t<e.length;t++)this.removeLayer(e[t]),n.addLayer(e[t])}),omnivore.geojson(L.contao.applyFilterToUrl(this.options.requestUrl,t.target),null,e)}}),L.Map.include({_dynamicBounds:null,calculateFeatureBounds:function(t,e){if(t){if(!this.options.adjustBounds&&!e)return;this._scanForBounds(t)}else this.eachLayer(this._scanForBounds,this);this._dynamicBounds&&this.fitBounds(this._dynamicBounds,this.getBoundsOptions())},getBoundsOptions:function(){return options={},this.options.boundsPadding?options.padding=this.options.boundsPadding:(this.options.boundsPaddingTopLeft&&(options.paddingTopLeft=this.options.boundsPaddingTopLeft),this.options.boundsPaddingBottomRight&&(options.paddingBottomRight=this.options.boundsPaddingBottomRight)),options},_scanForBounds:function(t){var e;!t.feature||t.feature.properties&&t.feature.properties.ignoreForBounds?L.MarkerClusterGroup&&t instanceof L.MarkerClusterGroup&&t.options.boundsMode&&"extend"==t.options.boundsMode?(e=t.getBounds()).isValid()&&(this._dynamicBounds?this._dynamicBounds.extend(e):this._dynamicBounds=L.latLngBounds(e.getSouthWest(),e.getNorthEast())):(!t.options||t.options&&t.options.boundsMode&&!t.options.ignoreForBounds)&&t.eachLayer&&t.eachLayer(this._scanForBounds,this):t.getBounds?(e=t.getBounds()).isValid()&&(this._dynamicBounds?this._dynamicBounds.extend(e):this._dynamicBounds=L.latLngBounds(e.getSouthWest(),e.getNorthEast())):t.getLatLng&&(e=t.getLatLng(),this._dynamicBounds?this._dynamicBounds.extend(e):this._dynamicBounds=L.latLngBounds(e,e))}}),L.LatLngBounds.prototype.toOverpassBBoxString=function(){var t=this._southWest,e=this._northEast;return[t.lat,t.lng,e.lat,e.lng].join(",")},L.OverPassLayer=L.FeatureGroup.extend({options:{minZoom:0,endpoint:"//overpass-api.de/api/",query:"(node(BBOX)[organic];node(BBOX)[second_hand];);out qt;",amenityIcons:{}},initialize:function(t){t.pointToLayer||(t.pointToLayer=this.pointToLayer),t.onEachFeature||(t.onEachFeature=this.onEachFeature),L.Util.setOptions(this,t),this.options.dynamicLoad=!!this.options.query.match(/BBOX/g),this._layer=L.geoJson(),this._layers={},this.addLayer(this._layer)},refreshData:function(){if(!(this._map.getZoom()<this.options.minZoom)){var t=this._map.getBounds().toOverpassBBoxString(),e=this.options.query.replace(/(BBOX)/g,t),n=this.options.endpoint+"interpreter?data=[out:json];"+e;this._map.fire("dataloading",{layer:this}),this.request(n,function(t,e){var n=JSON.parse(e.response),o=osmtogeojson(n),i=L.geoJson(o,{pointToLayer:this.options.pointToLayer.bind(this),onEachFeature:this.options.onEachFeature.bind(this)});if(this.addLayer(i),this.removeLayer(this._layer),this._layer=i,"extend"===this.options.boundsMode&&i.getBounds().isValid()){var r=this._map.getBounds();r=r.extend(i.getBounds()),this._map.fitBounds(r,this._map.getBoundsOptions())}this._map.fire("dataload",{layer:this})}.bind(this))}},onAdd:function(t){"fit"===this.options.boundsMode&&this.options.dynamicLoad&&t.on("moveend",this.refreshData,this),this.refreshData()},pointToLayer:function(t,e){var n=null,o=L.marker(e,t.properties.options);return t.properties&&(t.properties.radius&&o.setRadius(t.properties.radius),t.properties.icon?n=this._map.getIcon(t.properties.icon):t.properties.tags&&t.properties.tags.amenity&&this.options.amenityIcons[t.properties.tags.amenity]&&(n=L.contao.getIcon(this.options.amenityIcons[t.properties.tags.amenity])),n&&o.setIcon(n)),this.options.overpassPopup&&o.bindPopup(this.options.overpassPopup(t,o)),this._map.fire("point:added",{marker:o,feature:t,latlng:e,type:"marker"}),o},onEachFeature:function(t,e){t.properties&&(L.Util.setOptions(e,t.properties.options),this.options.overpassPopup&&e.bindPopup(this.options.overpassPopup(t,e)),this._map.fire("feature:added",{feature:t,layer:e}))},request:function(t,e,n){var o=!1;if(void 0===window.XMLHttpRequest)return e(Error("Browser not supported"));if(void 0===n){var i=t.match(/^\s*https?:\/\/[^\/]*/);n=i&&i[0]!==location.protocol+"//"+location.hostname+(location.port?":"+location.port:"")}var r=new window.XMLHttpRequest;if(n&&!("withCredentials"in r)){r=new window.XDomainRequest;var s=e;e=function(){if(o)s.apply(this,arguments);else{var t=this,e=arguments;setTimeout(function(){s.apply(t,e)},0)}}}function a(){var t;void 0===r.status||(200<=(t=r.status)&&t<300||304===t)?e.call(r,null,r):e.call(r,r,null)}return"onload"in r?r.onload=a:r.onreadystatechange=function(){4===r.readyState&&a()},r.onerror=function(t){e.call(this,t||!0,null),e=function(){}},r.onprogress=function(){},r.ontimeout=function(t){e.call(this,t,null),e=function(){}},r.onabort=function(t){e.call(this,t,null),e=function(){}},r.open("GET",t,!0),r.send(null),o=!0,r}});