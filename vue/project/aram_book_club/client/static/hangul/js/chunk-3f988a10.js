(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f988a10"],{"025c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap-parent"},[n("div",{staticClass:"parent-lnb"},[n("h2",[t._v("활동 리포트")]),n("ul",{ref:"lnbMenu"},[n("li",[n("router-link",{attrs:{to:"/hangul/parent/play"}},[t._v("활동 기록")])],1),n("li",[n("router-link",{attrs:{to:"/hangul/parent/study"}},[t._v("학습 기록")])],1),n("li",[n("router-link",{attrs:{to:"/hangul/parent/section"}},[t._v("영역별 성취")])],1),n("li",[n("router-link",{attrs:{to:"/hangul/parent/setting"}},[t._v("설정")])],1),n("li",[n("router-link",{attrs:{to:"/hangul/parent/exit"}},[t._v("종료")])],1)])]),n("router-link",{staticClass:"btn-home",class:{exit:"parentExit"===this.$route.name},attrs:{to:"/hangul"}}),n("div",{ref:"pageView",staticClass:"page"},[n("router-view")],1)],1)},s=[],i=(n("b0c0"),{data:function(){return{}},mounted:function(){this.lnbSelect()},updated:function(){this.lnbSelect()},methods:{lnbSelect:function(){this.$refs.lnbMenu.removeAttribute("class"),this.$refs.pageView.classList.remove("exit");var t=this.$route.name;switch(t){case"parentPlay":this.$refs.lnbMenu.classList.add("play");break;case"parentSection":this.$refs.lnbMenu.classList.add("section");break;case"parentStudy":this.$refs.lnbMenu.classList.add("study");break;case"parentSetting":this.$refs.lnbMenu.classList.add("setting");break;case"parentExit":this.$refs.pageView.classList.add("exit"),this.$refs.lnbMenu.classList.add("exit");break}}}}),r=i,l=(n("16ea"),n("2877")),c=Object(l["a"])(r,a,s,!1,null,"23167414",null);e["default"]=c.exports},"16ea":function(t,e,n){"use strict";n("f950")},b0c0:function(t,e,n){var a=n("83ab"),s=n("9bf2").f,i=Function.prototype,r=i.toString,l=/^\s*function ([^ (]*)/,c="name";a&&!(c in i)&&s(i,c,{configurable:!0,get:function(){try{return r.call(this).match(l)[1]}catch(t){return""}}})},f950:function(t,e,n){}}]);
//# sourceMappingURL=chunk-3f988a10.js.map