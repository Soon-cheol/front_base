(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55c15160"],{"0218":function(t,s,e){"use strict";e("78ba")},"069f":function(t,s,e){t.exports=e.p+"img/img_logo.svg"},"201b":function(t,s,e){"use strict";e("671a")},"318b":function(t,s,e){"use strict";e("f65a")},"48bb":function(t,s,e){t.exports=e.p+"img/circle.png"},"4c17":function(t,s,e){"use strict";e("b69b")},"538c":function(t,s,e){"use strict";e("6984")},"671a":function(t,s,e){},6984:function(t,s,e){},"6f21":function(t,s,e){"use strict";e("746f8")},"72a8":function(t,s,e){},"746f8":function(t,s,e){},7611:function(t,s,e){t.exports=e.p+"img/img_acorn.svg"},"78ba":function(t,s,e){},9768:function(t,s,e){t.exports=e.p+"img/btn_sound.png"},b69b:function(t,s,e){},dd09:function(t,s,e){"use strict";e("72a8")},f12b:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{ref:"wrapMain",staticClass:"wrap-main"},[i("div",{staticClass:"header-menu"},[i("img",{staticClass:"logo",attrs:{src:e("069f")}}),t._m(0),i("ul",{staticClass:"menu"},[i("li",{staticClass:"oneday",class:{active:0===t.swiperIndex},on:{click:function(s){return t.next(0)}}},[i("span",{staticClass:"name"},[t._v("하루 한글")]),i("span",{staticClass:"ico"})]),i("li",{staticClass:"card",class:{active:1===t.swiperIndex},on:{click:function(s){return t.next(1)}}},[i("span",{staticClass:"name"},[t._v("한글 카드")]),i("span",{staticClass:"ico"})]),i("li",{staticClass:"mypet",class:{active:2===t.swiperIndex},on:{click:function(s){return t.next(2)}}},[i("span",{staticClass:"name"},[t._v("마이펫")]),i("span",{staticClass:"ico"})]),i("li",{staticClass:"parent",on:{click:function(s){return t.parentStart()}}},[i("span",{staticClass:"name"},[t._v("부모님")]),i("span",{staticClass:"ico"})])])]),i("swiper",{ref:"swiperMain",staticClass:"swiper",attrs:{options:t.swiperOption},on:{slideChangeTransitionStart:t.callback,slideChangeTransitionEnd:t.callback}},[i("swiper-slide",[i("onedayComponent")],1),i("swiper-slide",[i("cardComponent")],1),i("swiper-slide",[i("mypetComponent")],1)],1),t.cardPopup?i("div",[i("cardPopupComponent")],1):t._e(),t.parentPopup?i("div",[i("parentComponent",{on:{popupClose:t.parentClose}})],1):t._e()],1)},n=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("ul",{staticClass:"info"},[i("li",{staticClass:"name"},[i("img",{attrs:{src:e("48bb")}}),i("span",[t._v("하루한글")])]),i("li",{staticClass:"acorn"},[i("img",{attrs:{src:e("7611")}}),i("span",[t._v("987")])])])}],a=e("5530"),c=e("7212"),r=(e("f57d"),e("2f62")),l=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"oneday-wrap"},[e("ul",{staticClass:"cont-list"},[e("li",{staticClass:"step01"},[e("router-link",{attrs:{to:{name:"onedayStep01"}}},[e("h3",{staticClass:"tit"},[t._v("기본 모음")])])],1),e("li",{staticClass:"step02",class:{active:t.steps[0].clear}},[e("router-link",{attrs:{to:{name:"onedayStep02"}}},[e("h3",{staticClass:"tit"},[t._v("기본 자음")])])],1),e("li",{staticClass:"step03",class:{active:t.steps[1].clear}},[e("router-link",{attrs:{to:{name:"onedayStep03"}}},[e("h3",{staticClass:"tit"},[t._v("복잡한 모음")])])],1),e("li",{staticClass:"step04",class:{active:t.steps[2].clear}},[e("router-link",{attrs:{to:{name:"onedayStep04"}}},[e("h3",{staticClass:"tit"},[t._v("대표 받침")])])],1),e("li",{staticClass:"step05",class:{active:t.steps[3].clear}},[e("router-link",{attrs:{to:{name:"onedayStep05"}}},[e("h3",{staticClass:"tit"},[t._v("복잡한 받침")])])],1),e("li",{staticClass:"step06",class:{active:t.steps[4].clear}},[e("router-link",{attrs:{to:{name:"onedayStep06"}}},[e("h3",{staticClass:"tit"},[t._v("겹받침")])])],1)]),e("div",{staticClass:"cont-play"},[e("button",{staticClass:"btn-play",on:{click:t.complete}},[t._v("시작")]),t.allClear?e("div",{staticClass:"complete"},[e("h3",{staticClass:"tit"},[t._v("한글 완료")])]):e("div",{staticClass:"level"},[e("h3",{staticClass:"tit"},[t._v("나의 진도")]),t._m(0),t._m(1)])])])},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"day"},[e("span",{staticClass:"num"},[t._v("000")]),e("span",{staticClass:"txt"},[t._v("일자")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"step"},[e("h4",[t._v("복잡한 받침")]),e("span",{staticClass:"txt"},[t._v("ㅁㄴㄹㄷ")])])}],p={steps:[{clear:!1},{clear:!1},{clear:!1},{clear:!1},{clear:!1}]},u={data:function(){return{allClear:!1,steps:p.steps}},mounted:function(){},methods:{complete:function(){for(var t in this.steps)this.steps[t].clear=!0;this.allClear=!0}}},d=u,f=(e("0218"),e("2877")),C=Object(f["a"])(d,l,o,!1,null,"b200060c",null),m=C.exports,v=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card-wrap"},[t._m(0),e("ol",{staticClass:"word-list"},t._l(15,(function(t,s){return e("li",{key:s},[e("wordComponent",{attrs:{state:{active:"active"},num:{index:s}}})],1)})),0)])},b=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",{staticClass:"tab-list"},[e("li",[t._v("자음")]),e("li",[t._v("모음")]),e("li",[t._v("받침")])])}],w=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card",class:t.state.active,on:{click:function(s){return t.popupOpen(t.num.index)}}},[e("span",{staticClass:"word"},[t._v("ㅏ")]),t._m(0)])},h=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",{staticClass:"popup-list"},[e("li"),e("li")])}],_={props:{state:{type:Object,default:null},num:{type:Object,default:null}},methods:Object(a["a"])({},Object(r["b"])("cardView",["popupOpen"]))},x=_,k=(e("201b"),Object(f["a"])(x,w,h,!1,null,"5d4f181e",null)),g=k.exports,O={components:{wordComponent:g}},y=O,j=(e("4c17"),Object(f["a"])(y,v,b,!1,null,"1bbba558",null)),$=j.exports,E=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t._v("마이펫")])},S=[],V={},I=V,M=Object(f["a"])(I,E,S,!1,null,"55579503",null),P=M.exports,T=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"parent-popup"},[e("button",{staticClass:"btn-close",on:{click:function(s){return t.popupClose()}}}),e("div",{ref:"startTest",staticClass:"start-test"},[e("h2",[t._v("부모님")]),e("div",{staticClass:"calc"},[e("div",{staticClass:"question"},[t._v(t._s(t.random01)+" X "+t._s(t.random02))]),e("div",{staticClass:"result"},[t._v(" "+t._s(t.result01)+" "+t._s(t.result02)+" ")])]),e("ul",{staticClass:"number"},[t._l(9,(function(s,i){return e("li",{key:i,on:{click:function(s){return t.resultAdd(i+1)}}},[t._v(" "+t._s(s)+" ")])})),e("li",{staticClass:"btn-zero",on:{click:function(s){return t.resultAdd(0)}}},[t._v("0")]),e("li",{staticClass:"btn-del",on:{click:function(s){return t.resultDel()}}},[t._v("X")])],2)])])])},A=[],D={data:function(){return{random01:Math.floor(7*Math.random()+3),random02:Math.floor(7*Math.random()+4),result01:"",result02:""}},methods:{resultAdd:function(t){if(""===this.result01)this.$refs.startTest.classList.remove("error"),this.result01=t;else{this.result02=t;var s=1*(""+this.result01+this.result02);s===this.random01*this.random02?(console.log("정답"),this.$router.push({name:"parentPlay"})):(console.log("오답"),this.result01=this.result02="",this.$refs.startTest.classList.add("error"))}},resultDel:function(){""!==this.result02?this.result02="":this.result01=""},popupClose:function(){this.$emit("popupClose")}}},J=D,L=(e("6f21"),Object(f["a"])(J,T,A,!1,null,"80406a7e",null)),X=L.exports,q=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card-popup"},[e("button",{staticClass:"btn-close",on:{click:function(s){return t.popupClose()}}}),e("div",{staticClass:"swiper-button swiper-button-next"}),e("div",{staticClass:"swiper-button swiper-button-prev"}),e("div",{staticClass:"swiper-wrap"},[e("swiper",{ref:"swiperCard",staticClass:"swiper",attrs:{options:t.swiperOption},on:{slideChangeTransitionStart:t.callback,slideChangeTransitionEnd:t.callback}},t._l(15,(function(t,s){return e("swiper-slide",{key:s},[e("viewComponent")],1)})),1)],1)])},z=[],B=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"card"},[i("button",{staticClass:"play-sound"}),i("div",{staticClass:"thume"},[i("img",{class:{blind:!t.imgView},attrs:{src:e("9768")}})]),i("p",{staticClass:"word",class:{blind:!t.txtView}},[t._v("돋보기")]),i("button",{staticClass:"btn-view img",class:{blind:!t.imgView},on:{click:function(s){return t.viewChange("img")}}}),i("button",{staticClass:"btn-view txt",class:{blind:!t.txtView},on:{click:function(s){return t.viewChange("txt")}}})])},F=[],G={props:{state:{type:Object,default:null}},computed:Object(a["a"])({},Object(r["c"])({imgView:function(t){return t.cardView.imgView},txtView:function(t){return t.cardView.txtView}})),data:function(){return{}},methods:Object(a["a"])({callback:function(){}},Object(r["b"])("cardView",["viewChange"]))},H=G,K=(e("dd09"),Object(f["a"])(H,B,F,!1,null,"cc7e9b06",null)),N=K.exports,Q={components:{swiper:c["swiper"],swiperSlide:c["swiperSlide"],viewComponent:N},props:{state:{type:Object,default:null}},data:function(){return{swiperOption:{speed:600,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},initialSlide:0}}},computed:Object(a["a"])({},Object(r["c"])({swiperIndex:function(t){return t.cardView.popup.index}})),mounted:function(){this.$refs.swiperCard.swiper.slideTo(this.swiperIndex,0)},methods:Object(a["a"])({callback:function(){}},Object(r["b"])("cardView",["popupClose"]))},R=Q,U=(e("538c"),Object(f["a"])(R,q,z,!1,null,"85943d8e",null)),W=U.exports,Y={components:{swiper:c["swiper"],swiperSlide:c["swiperSlide"],onedayComponent:m,cardComponent:$,mypetComponent:P,parentComponent:X,cardPopupComponent:W},data:function(){return{swiperOption:{initialSlide:0},swiperIndex:0,parentPopup:!1}},computed:Object(a["a"])({},Object(r["c"])({cardPopup:function(t){return t.cardView.popup.visible}})),mounted:function(){this.callback()},methods:{next:function(t){this.$refs.swiperMain.swiper.slideTo(t),this.swiperIndex=t},parentClose:function(){this.parentPopup=!1},parentStart:function(){this.parentPopup=!0},callback:function(){this.swiperIndex=this.$refs.swiperMain.swiper.activeIndex,0===this.swiperIndex?this.$refs.wrapMain.style.backgroundColor="#7fd9f8":1===this.swiperIndex?this.$refs.wrapMain.style.backgroundColor="#ece6ff":2===this.swiperIndex&&(this.$refs.wrapMain.style.backgroundColor="#d4ffe2")}}},Z=Y,tt=(e("318b"),Object(f["a"])(Z,i,n,!1,null,"5f0e7a6a",null));s["default"]=tt.exports},f65a:function(t,s,e){}}]);