(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3239a25c"],{5557:function(a,e,t){},dd86:function(a,e,t){"use strict";t.r(e);var n=t("79c4");const o=Object(n["D"])("data-v-79c2e695"),r=o((a,e,t,o,r,s)=>(Object(n["q"])(),Object(n["d"])("div",{class:"container",onClick:e[1]||(e[1]=(...a)=>s.onClick&&s.onClick(...a))})));var s={name:"AboutMe",async mounted(){var a=new BroadcastChannel("change-loading-hint");a.postMessage({name:"加载中……",action:"show"}),await wait();var[e,t]=await Promise.all([Granary.getContent("api/aboutme.md"),Granary.getContent("api/updatelog.md")]);t&&(e=e+"\n\n\n+++\n\n\n"+t);var n=MarkUp.parse(e,{toc:!1,glossary:!1,resources:!1,showtitle:!1,showauthor:!1,classname:"markup-content"});this.$el.innerHTML=n,await this.afterMarkUp(),a.postMessage({action:"hide"})},methods:{onClick(a){var e=a.target;if(e){var t=e.getAttribute("href");t&&0===t.indexOf("#")&&(t=t.replace(/#+/,"/"),this.$router.push({path:t}),a.preventDefault())}}}};t("ea65");s.render=r,s.__scopeId="data-v-79c2e695";e["default"]=s},ea65:function(a,e,t){"use strict";t("5557")}}]);
//# sourceMappingURL=chunk-3239a25c.033e3743.js.map