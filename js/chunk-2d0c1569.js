(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c1569"],{"462c":function(a,s,e){"use strict";e.r(s);var t=e("79c4");const c=Object(t["D"])("data-v-251f6661");Object(t["t"])("data-v-251f6661");const n={class:"TrainingQuests"},i={ref:"scorePad",class:"scorePad"},d={class:"questListPad"},o={ref:"page1",class:"questPad"},r={ref:"page2",class:"questPad"},l=Object(t["g"])("Aloha"),b=Object(t["h"])("br",null,null,-1),u=Object(t["g"])("Kosmos!"),h=Object(t["h"])("div",{class:"buttonPad"},[Object(t["h"])("button",{class:"submitter"},"交卷")],-1);Object(t["r"])();const g=c((a,s,e,c,g,j)=>(Object(t["q"])(),Object(t["d"])("div",n,[Object(t["h"])("div",i,null,512),Object(t["h"])("div",d,[Object(t["h"])("div",o,"What?",512),Object(t["h"])("div",r,[l,b,u],512)]),h])));var j=!0;PageBroadcast.on("change-loading-hint",a=>{TrainingQuest.onLeave()});var O={name:"Training",async mounted(){j&&(await Promise.all([loadJS("/js/training.js"),loadCSS("/css/training.css")]),j=!1),TrainingQuest.onLoad(this.$el,this.$refs.scorePad,this.$refs.page1,this.$refs.page2),await wait(),callPageLoaded()}};O.render=g,O.__scopeId="data-v-251f6661";s["default"]=O}}]);
//# sourceMappingURL=chunk-2d0c1569.js.map