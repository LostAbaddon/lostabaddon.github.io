((t,a,n)=>{t.Devices={},Devices.isAndroid=!!a.match(/Android/i),Devices.isiPhone=!!a.match(/iPhone/i),Devices.isiPad=!!a.match(/iPad/i),Devices.isiPod=!!a.match(/iPod/i),Devices.isiOS=Devices.isiPhone||Devices.isiPad||Devices.isiPod,Devices.isBlackBerry=!!a.match(/BlackBerry/i),Devices.isIE=n.pointerEnabled||n.msPointerEnabled,Devices.isSafari=!!a.match(/safari/i)&&!a.match(/chrome/i),Devices.isOpera=!!a.match(/Opera/i)&&!a.match(/Opera Mini/i),Devices.isOperaMini=!!a.match(/Opera Mini/i),Devices.isWinPhone=!!a.match(/IEMobile/i)||!!a.match(/WPDesktop/i),Devices.isWebOS=!!a.match(/webOS/i),Devices.isUiWebView=!!a.match(/AppleWebKit/i),Devices.isMobile=Devices.isAndroid||Devices.isiOS||Devices.isBlackBerry||Devices.isWinPhone||Devices.isWebOS;const r=new Map;r.set("loaded",[]),r.set("ready",[]),r.set("initialized",[]),t.LifeCycle={on:{loaded(s,e=!1){var i=r.get("loaded");i.push(s)},ready(s,e=!1){var i=r.get("ready");i.push(s)},initialized(s,e=!1){var i=r.get("initialized");i.push(s)}},emit:{async loaded(){var s=r.get("loaded");if(!s||s.size===0)return!0;var e=await Promise.all(s.map(async i=>await i()));return!e.some(i=>!!i)},async ready(s){var e=r.get("ready");if(!e||e.size===0)return!0;var i=await Promise.all(e.map(async c=>await c(s)));return!i.some(c=>!!c)},async initialized(s){var e=r.get("initialized");if(!e||e.size===0)return!0;var i=await Promise.all(e.map(async c=>await c(s)));return!i.some(c=>!!c)}}},t.newEle=(s,e)=>{var i=document.createElement(s||"div");return e&&(e instanceof Array||(e=e.split(" ")),e.forEach(c=>i.classList.add(c))),i}})(window,window.navigator.userAgent,window.navigator);
