(function(e){function t(t){for(var r,u,i=t[0],s=t[1],c=t[2],l=0,p=[];l<i.length;l++)u=i[l],Object.prototype.hasOwnProperty.call(a,u)&&a[u]&&p.push(a[u][0]),a[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var s=n[u];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={index:0},o=[];function u(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"fdeeeaa8"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=u(e);var c=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",c.name="ChunkLoadError",c.type=r,c.request=o,n[1](c)}a[e]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("8cad")},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("e832"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("NavBar"),n("div",{attrs:{id:"container"}},[n("router-view")],1)],1)},o=[],u={},i=u,s=(n("034f"),n("e032")),c=Object(s["a"])(i,a,o,!1,null,null,null),l=c.exports,f=n("4af9"),p=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("strong",[e._v("Welcome to LostAbaddon's Death Foreseer Society!")]),n("br"),e._v("The world is waiting for its light, please WAIT for a while... ")])}],m={name:"Home"},v=m,h=Object(s["a"])(v,p,d,!1,null,null,null),b=h.exports;r["a"].use(f["a"]);const y=[{path:"/",name:"Home",component:b},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],_=new f["a"]({mode:"history",base:"/",routes:y});var g=_,w=n("5fbf"),j=n("c944"),O=n("58e7"),x=n("28cd"),M=n("46b5"),N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav-bar"},[n("router-link",{attrs:{to:"/"}},[e._v("首页")]),n("font-awesome-icon",{attrs:{icon:"caret-right"}}),n("NavMenuBar",{attrs:{menu:e.menu}})],1)},E=[],P={name:"NavBar",data(){return{menu:[["随笔","/essay"],["格物致知","/science",[["数学","/math"],["物理","/phy",[["测试1","/test1"],["测试2","/test2"],["测试3","/test3",[["哈哈a","/hahaa"],["哈哈b","/hahab"]]],["测试4","/test4"]]],["其它","/others"]]],["异世界","/novel"],["小工具","/tools",[["作文板","/writer"]]],["娱乐大厅","/games"]]}}},S=P,k=Object(s["a"])(S,N,E,!1,null,null,null),B=k.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"nav-menu-bar"},e._l(e.menu,(function(e){return n("NavMenuItem",{attrs:{title:e[0],action:e[1],subs:e[2]}})})),1)},$=[],A={name:"NavMenuBar",props:{menu:Array}},C=A,I=Object(s["a"])(C,T,$,!1,null,null,null),L=I.exports,H=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav-menu-item"},[n("router-link",{attrs:{to:e.action}},[e._v(e._s(e.title)),e.subs?n("font-awesome-icon",{staticClass:"nav-fa",attrs:{icon:"caret-down"}}):e._e()],1),e.subs?n("NavMenuBar",{attrs:{menu:e.subs}}):e._e()],1)},J=[],W={name:"NavMenuItem",props:{title:String,action:String,subs:Array}},q=W,D=Object(s["a"])(q,H,J,!1,null,null,null),F=D.exports;n("9a67"),w["c"].add(O["a"]),w["c"].add(x["a"]),w["c"].add(M["a"]),r["a"].component("font-awesome-icon",j["a"]),r["a"].component("NavBar",B),r["a"].component("NavMenuBar",L),r["a"].component("NavMenuItem",F),r["a"].config.productionTip=!1,new r["a"]({router:g,render:function(e){return e(l)}}).$mount("#app")},"8cad":function(e,t,n){},"9a67":function(e,t,n){}});
//# sourceMappingURL=index.3b6b56f8.js.map