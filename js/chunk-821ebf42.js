(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-821ebf42"],{"1f3a":function(e,t,a){},dcc0:function(e,t,a){"use strict";a("1f3a")},f4c6:function(e,t,a){"use strict";a.r(t);var s=a("79c4");const i=Object(s["D"])("data-v-164139e4");Object(s["t"])("data-v-164139e4");const o={class:"viewer"},r={class:"container"},c=Object(s["g"])("预览："),n=Object(s["h"])("i",{class:"fas fa-toggle-off"},null,-1),l={class:"asimov"},d=Object(s["h"])("div",{class:"codePad"},[Object(s["h"])("pre")],-1);Object(s["r"])();const g=i((e,t,a,i,g,v)=>{const h=Object(s["x"])("Crumb");return Object(s["q"])(),Object(s["d"])("div",o,[Object(s["h"])(h,{target:"library"}),Object(s["h"])("div",r,[Object(s["h"])("div",{class:"controller",onClick:t[1]||(t[1]=(...e)=>v.togglePreview&&v.togglePreview(...e))},[c,n]),Object(s["h"])("div",l,[d,Object(s["h"])("div",{class:"previewPad",onClick:t[2]||(t[2]=(...e)=>v.onClick&&v.onClick(...e))})])])])});var v={name:"markup",data(){return{previewing:!1}},async mounted(){var e=new BroadcastChannel("change-loading-hint");e.postMessage({name:"加载中……",action:"show"}),await wait();var t=await Granary.getContent("Asimov/demo.mu");t=t.replace(/https:\/\/upload-images\.jianshu\.io\/upload_images\//gi,"/image/"),this.$el.querySelector(".asimov .codePad pre").innerText=t;var a=await MarkUp.parse(t,{toc:!0,glossary:!0,resources:!0,showtitle:!0,showauthor:!0,classname:"markup-content"});this.$el.querySelector(".asimov .previewPad").innerHTML=a,await this.afterMarkUp(),e.postMessage({action:"hide"})},methods:{togglePreview(){this.previewing=!this.previewing;var e=this.$el.querySelector(".container .controller i"),t=this.$el.querySelector(".container .asimov");this.previewing?(e.classList.remove("fa-toggle-off"),e.classList.add("fa-toggle-on"),t.style.transform="translateX(-50%)"):(e.classList.remove("fa-toggle-on"),e.classList.add("fa-toggle-off"),t.style.transform="translateX(0%)")},onClick(e){onVueHyperLinkTriggered(this,e)}}};a("dcc0");v.render=g,v.__scopeId="data-v-164139e4";t["default"]=v}}]);
//# sourceMappingURL=chunk-821ebf42.js.map