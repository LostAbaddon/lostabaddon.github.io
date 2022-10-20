(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66c60e80"],{"0333":function(e,t,a){"use strict";a("3cb8")},"3cb8":function(e,t,a){},de6a:function(e,t,a){"use strict";a.r(t);var n=a("79c4");const l=Object(n["G"])("data-v-22911782");Object(n["t"])("data-v-22911782");const i=Object(n["h"])("div",{class:"infomation markup"},[Object(n["h"])("p",null,"本工具迁徙自 Viktor T. Toth 做的[霍金辐射计算器](https://www.vttoth.com/CMS/physics-notes/311-hawking-radiation-calculator)，主要功能是计算和黑洞相关的数据。"),Object(n["h"])("p",null,"> 另：本工具最好在PC浏览器上看，不然恐怕会看起来很糟糕……"),Object(n["h"])("p",null,"这里的大部分物理量都是从无穷远观测者看来的，且“表面引力”指的是对应的牛顿引力大小，因为在广义相对论中任意黑洞的表面引力都是无穷大。同理，“等效密度”值得也是牛顿值。而“落入奇点所用时间”是从无穷远下落者的随动坐标系测量而得，并不是无穷远观测者的观测值，在无穷远观测者看来落入黑洞所用时间为无限长。")],-1),s={ref:"CalTable",class:"table"},o=Object(n["f"])('<div class="header" data-v-22911782><span class="name" data-v-22911782>物理量</span><span class="value" data-v-22911782>取值</span><span class="unity" data-v-22911782>单位</span><span class="express" data-v-22911782>表达式</span></div>',1),u={class:"line"},p=Object(n["h"])("span",{class:"name"},"质量",-1),c={class:"value"},r={class:"unity"},v=Object(n["f"])('<option value="0" data-v-22911782>太阳质量</option><option value="1" data-v-22911782>地球质量</option><option value="2" data-v-22911782>吨</option><option value="3" data-v-22911782>千克</option><option value="4" data-v-22911782>克</option><option value="5" data-v-22911782>电子伏</option><option value="6" data-v-22911782>电子质量</option><option value="7" data-v-22911782>普朗克质量</option>',8),d=Object(n["h"])("span",{class:"express"},"$M$",-1),h={class:"line"},b=Object(n["h"])("span",{class:"name"},"视界半径",-1),y={class:"value"},j={class:"unity"},O=Object(n["f"])('<option value="0" data-v-22911782>秒差距</option><option value="1" data-v-22911782>光年</option><option value="2" data-v-22911782>天文单位</option><option value="3" data-v-22911782>光秒</option><option value="4" data-v-22911782>公里</option><option value="5" data-v-22911782>米</option><option value="6" data-v-22911782>厘米</option><option value="7" data-v-22911782>纳米</option><option value="8" data-v-22911782>飞米</option><option value="9" data-v-22911782>普朗克长度</option>',10),m=Object(n["h"])("span",{class:"express"},"$R = M \\frac{2 G}{c^2}$",-1),g={class:"line"},f=Object(n["h"])("span",{class:"name"},"视界面积",-1),k={class:"value"},M={class:"unity"},U=Object(n["f"])('<option value="0" data-v-22911782>平方秒差距</option><option value="1" data-v-22911782>平方光年</option><option value="2" data-v-22911782>平方天文单位</option><option value="3" data-v-22911782>平方光秒</option><option value="4" data-v-22911782>平方公里</option><option value="5" data-v-22911782>平方米</option><option value="6" data-v-22911782>平方厘米</option><option value="7" data-v-22911782>平方纳米</option><option value="8" data-v-22911782>平方飞米</option><option value="9" data-v-22911782>普朗克面积</option>',10),C=Object(n["h"])("span",{class:"express"},"$A = M^2 \\frac{16 \\pi G^2}{c^4}$",-1),E={class:"line"},V=Object(n["h"])("span",{class:"name"},"等效密度",-1),I={class:"value"},$={class:"unity"},P=Object(n["f"])('<option value="0" data-v-22911782>太阳密度</option><option value="1" data-v-22911782>地球密度</option><option value="2" data-v-22911782>千克/立方米</option><option value="3" data-v-22911782>克/立方厘米</option><option value="4" data-v-22911782>普朗克密度</option>',5),x=Object(n["h"])("span",{class:"express"},"$\\rho = \\frac{1}{M^2} \\frac{3 c^6}{32 \\pi G^3}$",-1),F={class:"line"},T=Object(n["h"])("span",{class:"name"},"表面引力",-1),w={class:"value"},B={class:"unity"},G=Object(n["h"])("option",{value:"0"},"平均地表引力",-1),K=Object(n["h"])("option",{value:"1"},"米/秒平方",-1),A=Object(n["h"])("option",{value:"2"},"普朗克加速度",-1),L=Object(n["h"])("span",{class:"express"},"$\\kappa = \\frac{1}{M} \\frac{c^4}{4 G}$",-1),Y={class:"line"},z=Object(n["h"])("span",{class:"name"},"表面潮汐力",-1),J={class:"value"},S={class:"unity"},_=Object(n["h"])("option",{value:"0"},"平均地表潮汐力",-1),q=Object(n["h"])("option",{value:"1"},"米/秒平方/米",-1),D=Object(n["h"])("option",{value:"2"},"普朗克单位",-1),H=Object(n["h"])("span",{class:"express"},"$d \\kappa = \\frac{1}{M^2} \\frac{c^6}{4 G^2}$",-1),W={class:"line"},Q=Object(n["h"])("span",{class:"name"},"落到奇点所需时间",-1),R={class:"value"},Z={class:"unity"},N=Object(n["f"])('<option value="0" data-v-22911782>亿年</option><option value="1" data-v-22911782>百万年</option><option value="2" data-v-22911782>万年</option><option value="3" data-v-22911782>世纪</option><option value="4" data-v-22911782>年</option><option value="5" data-v-22911782>天</option><option value="6" data-v-22911782>小时</option><option value="7" data-v-22911782>分钟</option><option value="8" data-v-22911782>秒</option><option value="9" data-v-22911782>纳秒</option><option value="10" data-v-22911782>飞秒</option><option value="11" data-v-22911782>普朗克时间</option>',12),X=Object(n["h"])("span",{class:"express"},"$t_S = M \\frac{\\pi G}{c^3}$",-1),ee={class:"line"},te=Object(n["h"])("span",{class:"name"},"熵",-1),ae={class:"value"},ne=Object(n["h"])("span",{class:"unity"},"无量纲",-1),le=Object(n["h"])("span",{class:"express"},"$S = M^2 \\frac{4 \\pi G}{\\hbar c}$",-1),ie={class:"line"},se=Object(n["h"])("span",{class:"name"},"温度",-1),oe={class:"value"},ue={class:"unity"},pe=Object(n["h"])("option",{value:"0"},"开尔文",-1),ce=Object(n["h"])("option",{value:"1"},"摄氏度",-1),re=Object(n["h"])("option",{value:"2"},"华氏度",-1),ve=Object(n["h"])("option",{value:"3"},"普朗克温度",-1),de=Object(n["h"])("span",{class:"express"},"$T = \\frac{1}{M} \\frac{\\hbar c^3}{8 \\pi k_B G}$",-1),he={class:"line"},be=Object(n["h"])("span",{class:"name"},"光通量功率",-1),ye={class:"value"},je={class:"unity"},Oe=Object(n["h"])("option",{value:"0"},"瓦",-1),me=Object(n["h"])("option",{value:"1"},"千瓦（kW）",-1),ge=Object(n["h"])("option",{value:"2"},"兆瓦（MW）",-1),fe=Object(n["h"])("option",{value:"3"},"太阳功率",-1),ke=Object(n["h"])("span",{class:"express"},"$L = \\frac{1}{M^2} \\frac{\\hbar c^6}{15360 \\pi G^2}$",-1),Me={class:"line"},Ue=Object(n["h"])("span",{class:"name"},"寿命",-1),Ce={class:"value"},Ee={class:"unity"},Ve=Object(n["f"])('<option value="0" data-v-22911782>亿年</option><option value="1" data-v-22911782>百万年</option><option value="2" data-v-22911782>万年</option><option value="3" data-v-22911782>世纪</option><option value="4" data-v-22911782>年</option><option value="5" data-v-22911782>天</option><option value="6" data-v-22911782>小时</option><option value="7" data-v-22911782>分钟</option><option value="8" data-v-22911782>秒</option><option value="9" data-v-22911782>纳秒</option><option value="10" data-v-22911782>飞秒</option><option value="11" data-v-22911782>普朗克时间</option>',12),Ie=Object(n["h"])("span",{class:"express"},"$t = M^3 \\frac{5120 \\pi G^2}{1.8083 \\hbar c^4}$",-1);Object(n["r"])();const $e=l((e,t,a,l,$e,Pe)=>{const xe=Object(n["x"])("Crumb");return Object(n["q"])(),Object(n["d"])(n["a"],null,[Object(n["h"])(xe,{target:"tools"}),i,Object(n["h"])("div",s,[o,Object(n["h"])("div",u,[p,Object(n["h"])("span",c,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=e=>$e.mass.value=e),onKeyup:t[2]||(t[2]=Object(n["F"])(e=>Pe.calculate("mass"),["enter"]))},null,544),[[n["C"],$e.mass.value]])]),Object(n["h"])("span",r,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[3]||(t[3]=e=>$e.mass.unity=e),onChange:t[4]||(t[4]=e=>Pe.changeUnity("mass"))},[v],544),[[n["B"],$e.mass.unity]])]),d]),Object(n["h"])("div",h,[b,Object(n["h"])("span",y,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[5]||(t[5]=e=>$e.radius.value=e),onKeyup:t[6]||(t[6]=Object(n["F"])(e=>Pe.calculate("radius"),["enter"]))},null,544),[[n["C"],$e.radius.value]])]),Object(n["h"])("span",j,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[7]||(t[7]=e=>$e.radius.unity=e),onChange:t[8]||(t[8]=e=>Pe.changeUnity("radius"))},[O],544),[[n["B"],$e.radius.unity]])]),m]),Object(n["h"])("div",g,[f,Object(n["h"])("span",k,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[9]||(t[9]=e=>$e.surface.value=e),onKeyup:t[10]||(t[10]=Object(n["F"])(e=>Pe.calculate("surface"),["enter"]))},null,544),[[n["C"],$e.surface.value]])]),Object(n["h"])("span",M,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[11]||(t[11]=e=>$e.surface.unity=e),onChange:t[12]||(t[12]=e=>Pe.changeUnity("surface"))},[U],544),[[n["B"],$e.surface.unity]])]),C]),Object(n["h"])("div",E,[V,Object(n["h"])("span",I,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[13]||(t[13]=e=>$e.density.value=e),onKeyup:t[14]||(t[14]=Object(n["F"])(e=>Pe.calculate("density"),["enter"]))},null,544),[[n["C"],$e.density.value]])]),Object(n["h"])("span",$,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[15]||(t[15]=e=>$e.density.unity=e),onChange:t[16]||(t[16]=e=>Pe.changeUnity("density"))},[P],544),[[n["B"],$e.density.unity]])]),x]),Object(n["h"])("div",F,[T,Object(n["h"])("span",w,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[17]||(t[17]=e=>$e.gravity.value=e),onKeyup:t[18]||(t[18]=Object(n["F"])(e=>Pe.calculate("gravity"),["enter"]))},null,544),[[n["C"],$e.gravity.value]])]),Object(n["h"])("span",B,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[19]||(t[19]=e=>$e.gravity.unity=e),onChange:t[20]||(t[20]=e=>Pe.changeUnity("gravity"))},[G,K,A],544),[[n["B"],$e.gravity.unity]])]),L]),Object(n["h"])("div",Y,[z,Object(n["h"])("span",J,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[21]||(t[21]=e=>$e.tide.value=e),onKeyup:t[22]||(t[22]=Object(n["F"])(e=>Pe.calculate("tide"),["enter"]))},null,544),[[n["C"],$e.tide.value]])]),Object(n["h"])("span",S,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[23]||(t[23]=e=>$e.tide.unity=e),onChange:t[24]||(t[24]=e=>Pe.changeUnity("tide"))},[_,q,D],544),[[n["B"],$e.tide.unity]])]),H]),Object(n["h"])("div",W,[Q,Object(n["h"])("span",R,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[25]||(t[25]=e=>$e.time.value=e),onKeyup:t[26]||(t[26]=Object(n["F"])(e=>Pe.calculate("time"),["enter"]))},null,544),[[n["C"],$e.time.value]])]),Object(n["h"])("span",Z,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[27]||(t[27]=e=>$e.time.unity=e),onChange:t[28]||(t[28]=e=>Pe.changeUnity("time"))},[N],544),[[n["B"],$e.time.unity]])]),X]),Object(n["h"])("div",ee,[te,Object(n["h"])("span",ae,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[29]||(t[29]=e=>$e.entropy.value=e),onKeyup:t[30]||(t[30]=Object(n["F"])(e=>Pe.calculate("entropy"),["enter"]))},null,544),[[n["C"],$e.entropy.value]])]),ne,le]),Object(n["h"])("div",ie,[se,Object(n["h"])("span",oe,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[31]||(t[31]=e=>$e.temperature.value=e),onKeyup:t[32]||(t[32]=Object(n["F"])(e=>Pe.calculate("temperature"),["enter"]))},null,544),[[n["C"],$e.temperature.value]])]),Object(n["h"])("span",ue,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[33]||(t[33]=e=>$e.temperature.unity=e),onChange:t[34]||(t[34]=e=>Pe.changeUnity("temperature"))},[pe,ce,re,ve],544),[[n["B"],$e.temperature.unity]])]),de]),Object(n["h"])("div",he,[be,Object(n["h"])("span",ye,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[35]||(t[35]=e=>$e.luminousity.value=e),onKeyup:t[36]||(t[36]=Object(n["F"])(e=>Pe.calculate("luminousity"),["enter"]))},null,544),[[n["C"],$e.luminousity.value]])]),Object(n["h"])("span",je,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[37]||(t[37]=e=>$e.luminousity.unity=e),onChange:t[38]||(t[38]=e=>Pe.changeUnity("luminousity"))},[Oe,me,ge,fe],544),[[n["B"],$e.luminousity.unity]])]),ke]),Object(n["h"])("div",Me,[Ue,Object(n["h"])("span",Ce,[Object(n["E"])(Object(n["h"])("input",{type:"number","onUpdate:modelValue":t[39]||(t[39]=e=>$e.lifetime.value=e),onKeyup:t[40]||(t[40]=Object(n["F"])(e=>Pe.calculate("lifetime"),["enter"]))},null,544),[[n["C"],$e.lifetime.value]])]),Object(n["h"])("span",Ee,[Object(n["E"])(Object(n["h"])("select",{"onUpdate:modelValue":t[41]||(t[41]=e=>$e.lifetime.unity=e),onChange:t[42]||(t[42]=e=>Pe.changeUnity("lifetime"))},[Ve],544),[[n["B"],$e.lifetime.unity]])]),Ie])],512)],64)}),Pe={lightspeed:299792458,gravity:66743e-15,planck:662607015e-42,planckbar:10545718e-41,boltzman:138064852e-31,e:1602176634e-28,eV:1602176634e-28,massE:910938356e-39,AU:149597870700};Pe.planckLength=(Pe.planckbar*Pe.gravity/Pe.lightspeed**3)**.5,Pe.planckTime=Pe.planckLength/Pe.lightspeed,Pe.planckArea=Pe.planckLength**2,Pe.planckVolumn=Pe.planckLength**3,Pe.planckMass=(Pe.planckbar*Pe.lightspeed/Pe.gravity)**.5,Pe.planckEnergy=Pe.planckMass/Pe.lightspeed**2,Pe.planckTemperature=(Pe.planckbar*Pe.lightspeed**5/Pe.gravity/Pe.boltzman**2)**.5,Pe.planckForce=Pe.lightspeed**4/Pe.gravity,Pe.planckAccelation=Pe.lightspeed/Pe.planckTime,Pe.planckPower=Pe.planckEnergy/Pe.planckTime,Pe.planckDensity=Pe.planckMass/Pe.planckLength**3,Pe.parsecs=648e3*Pe.AU/Math.PI,Pe.secondsInYear=31536e3,Pe.lightyear=Pe.lightspeed*Pe.secondsInYear,Pe.absoluteZero=-273.16,Pe.C2F=[5/9,-32];const xe={mass:[1.9891e30,597237e19,1e3,1,.001,Pe.eV/Pe.lightspeed/Pe.lightspeed,Pe.massE,Pe.planckMass],radius:[Pe.parsecs,Pe.lightyear,Pe.AU,Pe.lightspeed,1e3,1,.01,1e-9,1e-12,Pe.planckTime],surface:[],density:[1410,5510,1,1e3,Pe.planckDensity],gravity:[9.80665,1,Pe.planckAccelation],tide:[30829012181674645e-22,1,Pe.planckAccelation/Pe.planckLength],time:[1e8*Pe.secondsInYear,1e6*Pe.secondsInYear,1e4*Pe.secondsInYear,100*Pe.secondsInYear,Pe.secondsInYear,86400,3600,60,1,1e-9,1e-12,Pe.planckTime],entropy:[1],temperature:[1,[1,273.15],[5/9,273.15-160/9],Pe.planckTemperature],luminousity:[1,1e3,1e6,38599999999999995e10],lifetime:[]};for(let Be of xe.radius)xe.surface.push(Be**2);for(let Be of xe.time)xe.lifetime.push(Be);const Fe={mass({value:e,unity:t}){return e*xe.mass[t]},radius({value:e,unity:t}){var a=e*xe.radius[t];return a*Pe.lightspeed**2/(2*Pe.gravity)},surface({value:e,unity:t}){var a=e*xe.surface[t],n=a*Pe.lightspeed**4/(Pe.gravity**2*16*Math.PI);return n**.5},density({value:e,unity:t}){var a=e*xe.density[t],n=3*Pe.lightspeed**6/(Pe.gravity**3*32*Math.PI)/a;return n**.5},gravity({value:e,unity:t}){var a=e*xe.gravity[t];return Pe.lightspeed**4/(4*Pe.gravity)/a},tide({value:e,unity:t}){var a=e*xe.tide[t],n=Pe.lightspeed**6/(Pe.gravity**2*4)/a;return n**.5},time({value:e,unity:t}){var a=e*xe.time[t];return a*Pe.lightspeed**3/(Pe.gravity*Math.PI)},entropy({value:e,unity:t}){var a=entropy*(Pe.planckbar*Pe.lightspeed)/(4*Pe.gravity*Math.PI);return a**.5},temperature({value:e,unity:t}){var a;if(t*=1,3===t)a=e*xe.temperature[t];else if(t>0){let n=xe.temperature[t];a=e*n[0]+n[1]}else a=e;return Pe.planckbar*Pe.lightspeed**3/(8*Math.PI*Pe.boltzman*Pe.gravity)/a},luminousity({value:e,unity:t}){var a=e*xe.luminousity[t],n=Pe.planckbar*Pe.lightspeed**6/(15360*Math.PI*Pe.gravity**2)/a;return n**.5},lifetime({value:e,unity:t}){var a=e*xe.lifetime[t],n=a*(1.8083*Pe.planckbar*Pe.lightspeed**4)/(5120*Math.PI*Pe.gravity**2);return n**(1/3)}},Te={mass(e,t){return e/xe.mass[t]},radius(e,t){var a=e*(2*Pe.gravity)/Pe.lightspeed**2;return a/xe.radius[t]},surface(e,t){var a=e**2*(16*Math.PI*Pe.gravity**2)/Pe.lightspeed**4;return a/xe.surface[t]},density(e,t){var a=3*Pe.lightspeed**6/(32*Math.PI*Pe.gravity**3)/e**2;return a/xe.density[t]},gravity(e,t){var a=Pe.lightspeed**4/(4*Pe.gravity)/e;return a/xe.gravity[t]},tide(e,t){var a=Pe.lightspeed**6/(4*Pe.gravity**2)/e**2;return a/xe.tide[t]},time(e,t){var a=e*(Math.PI*Pe.gravity)/Pe.lightspeed**3;return a/xe.time[t]},entropy(e,t){return e**2*(4*Math.PI*Pe.gravity)/(Pe.planckbar*Pe.lightspeed)},temperature(e,t){t*=1;var a=Pe.planckbar*Pe.lightspeed**3/(8*Math.PI*Pe.boltzman*Pe.gravity)/e;if(0===t)return a;if(3===t)return a/xe.temperature[3];var n=xe.temperature[t];return(a-n[1])/n[0]},luminousity(e,t){var a=Pe.planckbar*Pe.lightspeed**6/(15360*Math.PI*Pe.gravity**2)/e**2;return a/xe.luminousity[t]},lifetime(e,t){var a=e**3*(5120*Math.PI*Pe.gravity**2)/(1.8083*Pe.planckbar*Pe.lightspeed**4);return a/xe.lifetime[t]}};var we={name:"ParseMarkup",data(){return{mass:{value:1,unity:0,last:0},radius:{value:1,unity:4,last:4},surface:{value:1,unity:4,last:4},density:{value:1,unity:0,last:0},gravity:{value:1,unity:1,last:1},tide:{value:1,unity:1,last:1},time:{value:1,unity:8,last:8},entropy:{value:1,unity:0,last:0},temperature:{value:1,unity:0,last:0},luminousity:{value:1,unity:0,last:0},lifetime:{value:1,unity:4,last:4}}},mounted(){var e=this.$refs.CalTable.querySelectorAll(".line .express");[].forEach.call(e,async e=>{MathJax.Hub.Queue(["Typeset",MathJax.Hub,e])}),this.calculate("mass"),callPageLoaded()},methods:{calculate(e){var t=Fe[e](this[e]);for(let a in Te)a!==e&&(this[a].value=Te[a](t,this[a].unity))},changeUnity(e){var t=this[e];if(t.last+""===t.unity+"")return;let a=t.value;if("temperature"===e){let e;if(1*t.last===3)e=a*xe.temperature[t.last];else if(1*t.last>0){let n=xe.temperature[t.last];e=a*n[0]+n[1]}else e=a;if(1*t.unity===0)a=e;else if(1*t.unity===3)a=e/xe.temperature[3];else{let n=xe.temperature[t.unity];a=(e-n[1])/n[0]}}else{let n=xe[e];a=t.value*n[t.last]/n[t.unity]}t.value=a,t.last=t.unity}}};a("0333");we.render=$e,we.__scopeId="data-v-22911782";t["default"]=we}}]);
//# sourceMappingURL=chunk-66c60e80.js.map