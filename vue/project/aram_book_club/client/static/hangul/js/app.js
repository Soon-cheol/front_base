(function(e){function n(n){for(var r,a,c=n[0],u=n[1],s=n[2],l=0,p=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(n);while(p.length)p.shift()();return i.push.apply(i,s||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==o[c]&&(r=!1)}r&&(i.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+".js"}function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-2ac4c679":1,"chunk-91f9904a":1,"chunk-4111cf48":1,"chunk-787e238a":1,"chunk-075264b8":1,"chunk-269630dc":1,"chunk-06636570":1,"chunk-322751a4":1,"chunk-094cd3a5":1,"chunk-102c1e7f":1,"chunk-68467726":1,"chunk-6cc8f5be":1,"chunk-6ea47a8d":1,"chunk-c936907c":1,"chunk-43c17d89":1,"chunk-7af81e5c":1,"chunk-d742f160":1,"chunk-e3064900":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+".css",o=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return n()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){s=p[c],l=s.getAttribute("data-href");if(l===r||l===o)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],d.parentNode.removeChild(d),t(i)},d.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var i=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var p=new Error;s=function(n){l.onerror=l.onload=null,clearTimeout(d);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,t[1](p)}o[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var p=0;p<s.length;p++)n(s[p]);var d=l;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},"923c":function(e,n,t){"use strict";t("c3d5")},b329:function(e,n,t){},c3d5:function(e,n,t){},cd49:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=(t("d3b7"),t("bc3a")),o=t.n(a),i=localStorage.getItem("token"),c={baseURL:"https://qa-api.arambookclub.com",headers:{authorization:"Bearer ".concat(i)}},u=o.a.create(c);u.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),u.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)})),Plugin.install=function(e){e.axios=u,window.axios=u,Object.defineProperties(e.prototype,{axios:{get:function(){return u}},$axios:{get:function(){return u}}})},r["a"].use(Plugin);Plugin;var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"wrap"}},[t("router-view",{key:e.$route.fullPath})],1)])},l=[],p=t("1157"),d=t.n(p),h=d.a;window.$=h;var f={data:function(){return{}},computed:{},mounted:function(){window["currentVideo"]&&(window["currentVideo"].pause(),window["currentVideo"]=null),this.sizeSetting();var e=this;h(window).resize((function(){e.sizeSetting()}))},methods:{sizeSetting:function(){var e="128%",n=h(window).height(),t=window.innerWidth,r=window.innerHeight,a=t/1280;720*a>r&&(a=r/720),h("html").css("font-size",e),h("#app").css("height",n),h("#wrap").css("transform","scale(".concat(a,")"))}}},m=f,v=(t("923c"),t("2877")),P=Object(v["a"])(m,s,l,!1,null,"145fdf6a",null),b=P.exports,g=t("22a2"),k=t("8c4f");window.PIXI=g,r["a"].use(k["a"]);var w=[{path:"/hangul",name:"main",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-2ac4c679"),t.e("chunk-06636570")]).then(t.bind(null,"f12b"))}},{path:"/hangul/opening",name:"opening",component:function(){return Promise.all([t.e("chunk-2ac4c679"),t.e("chunk-91f9904a")]).then(t.bind(null,"90af"))}},{path:"/hangul/oneday/step01",name:"onedayStep01",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-102c1e7f")]).then(t.bind(null,"80f1"))}},{path:"/hangul/oneday/step02",name:"onedayStep02",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-c936907c")]).then(t.bind(null,"32b2"))}},{path:"/hangul/oneday/step03",name:"onedayStep03",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-6ea47a8d")]).then(t.bind(null,"4096"))}},{path:"/hangul/oneday/step04",name:"onedayStep04",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-68467726")]).then(t.bind(null,"1118"))}},{path:"/hangul/oneday/step05",name:"onedayStep05",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-094cd3a5")]).then(t.bind(null,"31d1"))}},{path:"/hangul/oneday/step06",name:"onedayStep06",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-322751a4"),t.e("chunk-6cc8f5be")]).then(t.bind(null,"b9e6"))}},{path:"/hangul/activity",name:"activity",props:!0,component:function(){return t.e("chunk-4111cf48").then(t.bind(null,"b627"))}},{path:"/hangul/parent/",name:"parent",component:function(){return t.e("chunk-e3064900").then(t.bind(null,"025c"))},children:[{path:"play",name:"parentPlay",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-43c17d89")]).then(t.bind(null,"d574"))}},{path:"section",name:"parentSection",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-075264b8")]).then(t.bind(null,"fd0d"))}},{path:"study",name:"parentStudy",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-7af81e5c")]).then(t.bind(null,"1f49"))}},{path:"setting",name:"parentSetting",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-269630dc")]).then(t.bind(null,"dd22"))}},{path:"exit",name:"parentExit",component:function(){return Promise.all([t.e("chunk-787e238a"),t.e("chunk-d742f160")]).then(t.bind(null,"eb63"))}}]}],y=new k["a"]({base:"",mode:"history",routes:w}),E=y,O=t("2f62"),_=t("0e44"),S=t("5530"),T={alert:{visible:!1,state:""}},I={ALERT_POPUP_CLOSE:function(e){e.alert.visible=!1,e.alert.state=""},ALERT_POPUP_OPEN:function(e,n){e.alert.visible=!0,e.alert.state=n,console.log("sssssss",e,n)}},A={alertPopupClose:function(e){var n=e.commit;n("ALERT_POPUP_CLOSE")},alertPopupOpen:function(e,n){var t=e.commit;t("ALERT_POPUP_OPEN",n)}},U={namespaced:!0,state:Object(S["a"])({},T),mutations:I,actions:A},x={popup:{visible:!1,letter:0},viewList:[],imgView:!0,txtView:!0},j={POPUP_CLOSE:function(e){e.popup.visible=!1},VIEW_CHNAGE:function(e,n){"img"===n?e.imgView=!e.imgView:e.txtView=!e.txtView},POPUP_OPEN:function(e,n){e.popup.visible=!0,e.popup.letter=n},VIEW_LIST_UPDATE:function(e,n){e.viewList=n}},L={popupClose:function(e){var n=e.commit;n("POPUP_CLOSE")},viewChange:function(e,n){var t=e.commit;t("VIEW_CHNAGE",n)},popupOpen:function(e,n){var t=e.commit;t("POPUP_OPEN",n)},viewListUpdate:function(e,n){var t=e.commit;t("VIEW_LIST_UPDATE",n)}},C={namespaced:!0,state:Object(S["a"])({},x),mutations:j,actions:L},V=(t("4de4"),t("b0c0"),{userInfo:{},report:{},listen:{},read:{},write:{},listenIndex:0,readIndex:0,writeIndex:0}),N={REPORT_UPDATE:function(e,n){e.report=n,e.listen=e.report.achievements.filter((function(e){return"듣기"===e.name})),e.read=e.report.achievements.filter((function(e){return"읽기"===e.name})),e.write=e.report.achievements.filter((function(e){return"쓰기"===e.name})),e.listen[0]&&(e.listenIndex=parseInt(e.listen[0].score/10),e.readIndex=parseInt(e.read[0].score/10),e.writeIndex=parseInt(e.write[0].score/10))},USER_INFO_UPDATE:function(e,n){e.userInfo=n.result}},D={reportUpdate:function(e,n){var t=e.commit;t("REPORT_UPDATE",n)},userinfoUpdate:function(e,n){var t=e.commit;t("USER_INFO_UPDATE",n)}},R={namespaced:!0,state:Object(S["a"])({},V),mutations:N,actions:D},z={onday:{}},M={ONEDAY_UPDATE:function(e,n){e.onday=n.result,console.log("state.onday",e.onday)}},W={ondayUpdate:function(e,n){var t=e.commit;t("ONEDAY_UPDATE",n)}},$={namespaced:!0,state:Object(S["a"])({},z),mutations:M,actions:W},q={saveTime:0},B={TIME_SAVE:function(e,n){"limit"!==e.saveTime&&(e.saveTime=n),"reset"===n&&(e.saveTime=n),console.log("변경",e.saveTime)}},H={timeSave:function(e,n){var t=e.commit;t("TIME_SAVE",n)}},F={namespaced:!0,state:Object(S["a"])({},q),mutations:B,actions:H},G={popup:U,cardView:C,parentPage:R,oneday:$,timer:F},J=[Object(_["a"])({paths:["timer"]})];r["a"].use(O["a"]);var Y=new O["a"].Store({modules:G,plugins:J});t("b329");r["a"].config.productionTip=!1,new r["a"]({store:Y,router:E,render:function(e){return e(b)}}).$mount("#app")}});
//# sourceMappingURL=app.js.map