(function(e){function t(t){for(var r,c,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)c=u[l],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={index:0},o=[];function c(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"49861c1a"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,i=document.createElement("script");i.charset="utf-8",i.timeout=120,u.nc&&i.setAttribute("nonce",u.nc),i.src=c(e);var s=new Error;o=function(t){i.onerror=i.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:i})}),12e4);i.onerror=i.onload=o,document.head.appendChild(i)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var p=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"23be":function(e,t,n){"use strict";var r=n("4a3d"),a=n.n(r);t["default"]=a.a},"3dfd":function(e,t,n){"use strict";var r=n("dcfd"),a=n("23be"),o=n("e032"),c=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,null,null);t["default"]=c.exports},"4a3d":function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("e832"),a=n("3dfd"),o=n("4af9"),c=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("strong",[e._v("Welcome to LostAbaddon's Death Foreseer Society!")]),n("br"),e._v("The world is waiting for its light, please WAIT for a while... ")])}],i={name:"Home"},s=i,l=(n("cb6b"),n("e032")),p=Object(l["a"])(s,c,u,!1,null,"4dd80b76",null),f=p.exports;r["a"].use(o["a"]);const m=[{path:"/",name:"Home",component:f},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],d=new o["a"]({mode:"history",base:"/",routes:m});var v=d,y=n("5fbf"),b=n("c944"),g=n("58e7"),h=n("28cd"),w=n("46b5"),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav-bar"},[n("router-link",{attrs:{to:"/"}},[e._v("首页")]),n("font-awesome-icon",{attrs:{icon:"caret-right"}}),n("NavMenuBar",{attrs:{menu:e.menu}})],1)},j=[],O={name:"NavBar",data(){return{menu:[{name:"随笔",type:"viewer",category:"essay"},{name:"格物致知",type:"viewer",category:"science",subs:[{name:"数学",type:"viewer",category:"math"},{name:"物理",type:"viewer",category:"physics",subs:[{name:"测试1",type:"viewer",category:"test1",subs:[{name:"哈哈1",type:"viewer",category:"haha1"},{name:"哈哈2",type:"viewer",category:"haha2"}]},{name:"测试2",type:"viewer",category:"test2"}]}]},{name:"异世界",type:"viewer",category:"novel",subs:[{name:"科幻",type:"viewer",category:"scific"},{name:"奇幻",type:"viewer",category:"magic"},{name:"推理",type:"viewer",category:"detective"}]},{name:"实用工具",type:"viewer",category:"tools",subs:[{name:"写字板",type:"page",category:"writer"},{name:"计算器",type:"page",category:"calculator"}]},{name:"休闲娱乐",type:"viewer",category:"entertain",subs:[{name:"三消俄罗斯方块",type:"page",category:"tritetris"},{name:"无尽2048",type:"page",category:"infinity2048"},{name:"诡异弹球",type:"page",category:"bunceball"},{name:"普通的五子棋",type:"page",category:"rushgo"}]}]}}},x=O,M=Object(l["a"])(x,_,j,!1,null,null,null),N=M.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"nav-menu-bar"},e._l(e.menu,(function(t){return n("NavMenuItem",{attrs:{title:t.name,action:e.supers?e.supers+","+t.category:t.category,type:t.type,subs:t.subs}})})),1)},E=[],P={name:"NavMenuBar",props:{supers:"",menu:Array}},S=P,B=Object(l["a"])(S,k,E,!1,null,null,null),C=B.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav-menu-item"},[n("a",{on:{click:function(t){return e.click(e.type,e.action)}}},[e._v(e._s(e.title)),e.subs?n("font-awesome-icon",{staticClass:"nav-fa",attrs:{icon:"caret-down"}}):e._e()],1),e.subs?n("NavMenuBar",{attrs:{menu:e.subs,supers:e.action}}):e._e()],1)},$=[],A={name:"NavMenuItem",props:{title:String,type:String,action:String,subs:Array},methods:{click(e,t){t=t.split(","),"page"===e&&console.log(t.last),console.log(e,t)}}},I=A,L=Object(l["a"])(I,T,$,!1,null,null,null),H=L.exports;n("9a67"),n("5aea"),y["c"].add(g["a"]),y["c"].add(h["a"]),y["c"].add(w["a"]),r["a"].component("font-awesome-icon",b["a"]),r["a"].component("NavBar",N),r["a"].component("NavMenuBar",C),r["a"].component("NavMenuItem",H),r["a"].config.productionTip=!1,new r["a"]({router:v,render:function(e){return e(a["default"])}}).$mount("#app")},"5aea":function(e,t,n){},"9a67":function(e,t,n){},b4b8:function(e,t,n){},cb6b:function(e,t,n){"use strict";n("b4b8")},dcfd:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("NavBar"),n("div",{attrs:{id:"container"}},[n("router-view")],1)],1)},a=[]}});
//# sourceMappingURL=index.40e7f958.js.map