Array.prototype.filter||(Array.prototype.filter=function(t,e){"use strict";if("Function"!=typeof t&&"function"!=typeof t||!this)throw new TypeError;var r=this.length>>>0,o=new Array(r),n=this,l=0,i=-1;if(void 0===e)for(;++i!==r;)i in this&&t(n[i],i,n)&&(o[l++]=n[i]);else for(;++i!==r;)i in this&&t.call(e,n[i],i,n)&&(o[l++]=n[i]);return o.length=l,o}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,r;if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),n=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=arguments[1]),r=0;r<n;){var l;r in o&&(l=o[r],t.call(e,l,r,o)),r++}}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var r;if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),n=o.length>>>0;if(0===n)return-1;var l=0|e;if(l>=n)return-1;for(r=Math.max(l>=0?l:n-Math.abs(l),0);r<n;){if(r in o&&o[r]===t)return r;r++}return-1}),document.getElementsByClassName||(document.getElementsByClassName=function(t){var e,r,o,n=document,l=[];if(n.querySelectorAll)return n.querySelectorAll("."+t);if(n.evaluate)for(r=".//*[contains(concat(' ', @class, ' '), ' "+t+" ')]",e=n.evaluate(r,n,null,0,null);o=e.iterateNext();)l.push(o);else for(e=n.getElementsByTagName("*"),r=new RegExp("(^|\\s)"+t+"(\\s|$)"),o=0;o<e.length;o++)r.test(e[o].className)&&l.push(e[o]);return l}),document.querySelectorAll||(document.querySelectorAll=function(t){var e,r=document.createElement("style"),o=[];for(document.documentElement.firstChild.appendChild(r),document._qsa=[],r.styleSheet.cssText=t+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",window.scrollBy(0,0),r.parentNode.removeChild(r);document._qsa.length;)(e=document._qsa.shift()).style.removeAttribute("x-qsa"),o.push(e);return document._qsa=null,o}),document.querySelector||(document.querySelector=function(t){var e=document.querySelectorAll(t);return e.length?e[0]:null}),Object.keys||(Object.keys=function(){"use strict";var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),r=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],o=r.length;return function(n){if("function"!=typeof n&&("object"!=typeof n||null===n))throw new TypeError("Object.keys called on non-object");var l,i,s=[];for(l in n)t.call(n,l)&&s.push(l);if(e)for(i=0;i<o;i++)t.call(n,r[i])&&s.push(r[i]);return s}}()),"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.replaceAll||(String.prototype.replaceAll=function(t,e){return"[object regexp]"===Object.prototype.toString.call(t).toLowerCase()?this.replace(t,e):this.replace(new RegExp(t,"g"),e)}),window.hasOwnProperty=window.hasOwnProperty||Object.prototype.hasOwnProperty;
if (typeof usi_commons === 'undefined') {
	usi_commons={logs:[],log:function(e){if(usi_commons.debug)try{usi_commons.logs.push(e),e instanceof Error?console.log(e.name+": "+e.message):console.log.apply(console,arguments)}catch(r){usi_commons.report_error_no_console(r)}},log_error:function(e){if(usi_commons.debug)try{e instanceof Error?console.log("%c USI Error:",usi_commons.log_styles.error,e.name+": "+e.message):console.log("%c USI Error:",usi_commons.log_styles.error,e)}catch(r){usi_commons.report_error_no_console(r)}},log_success:function(e){if(usi_commons.debug)try{console.log("%c USI Success:",usi_commons.log_styles.success,e)}catch(r){usi_commons.report_error_no_console(r)}},dir:function(e){if(usi_commons.debug)try{console.dir(e)}catch(r){usi_commons.report_error_no_console(r)}},log_styles:{error:"color: red; font-weight: bold;",success:"color: green; font-weight: bold;"},is_mobile:/iphone|ipod|ipad|android|blackberry|mobi/i.test(navigator.userAgent.toLowerCase()),device:/iphone|ipod|ipad|android|blackberry|mobi/i.test(navigator.userAgent.toLowerCase())?"mobile":"desktop",gup:function(e){try{e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var r="[\\?&]"+e+"=([^&#\\?]*)",t=RegExp(r).exec(window.location.href);if(null==t)return"";return t[1]}catch(i){usi_commons.report_error(i)}},load_script:function(e,r,t){try{0==e.indexOf("//")&&(e="https:"+e),(-1!=e.indexOf("/pixel.jsp")||-1!=e.indexOf("/blank.jsp")||-1!=e.indexOf("/customer_ip.jsp"))&&(e=e.replace(usi_commons.cdn,usi_commons.domain));var i=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript";var s="";t||-1!=e.indexOf("/active/")||-1!=e.indexOf("_pixel.jsp")||-1!=e.indexOf("_throttle.jsp")||-1!=e.indexOf("metro")||-1!=e.indexOf("_suppress")||-1!=e.indexOf("product_recommendations")||-1!=e.indexOf("_pid.jsp")||-1!=e.indexOf("_zips")||(s=-1==e.indexOf("?")?"?":"&",-1!=e.indexOf("pv2.js")&&(s="%7C"),s+="si="+usi_commons.get_sess()),o.src=e+s,"function"==typeof r&&(o.onload=function(){try{r()}catch(e){usi_commons.report_error(e)}}),i.appendChild(o)}catch(n){usi_commons.report_error(n)}},fetch:function(e,r,t){try{t=t||{},0===e.indexOf("//")&&(e="https:"+e);var i=e.replace(usi_commons.cdn,usi_commons.domain),o="";if(-1!==i.indexOf("?")){var s=i.split("?");i=s[0],s.length>1&&(o=s[1])}var n={method:"POST",...t};return""!==o&&(n.body=new URLSearchParams(o)),fetch(i,n).then(e=>{if(!e.ok)throw Error(`HTTP error! status: `);return e.json()}).then(e=>{"function"==typeof r&&r(e)}).catch(e=>{usi_commons.report_error(e)})}catch(a){usi_commons.report_error(a)}},load_view:function(e,r,t,i){try{if("undefined"!=typeof usi_force||-1!=location.href.indexOf("usi_force")||null==usi_cookies.get("usi_sale")&&null==usi_cookies.get("usi_launched")&&null==usi_cookies.get("usi_launched"+r)){t=t||"";var o="";""!=usi_commons.gup("usi_force_date")?o="&usi_force_date="+usi_commons.gup("usi_force_date"):"undefined"!=typeof usi_cookies&&null!=usi_cookies.get("usi_force_date")&&(o="&usi_force_date="+usi_cookies.get("usi_force_date")),usi_commons.debug&&(o+="&usi_referrer="+encodeURIComponent(location.href)),"undefined"!=typeof usi_cookies&&(null!=usi_cookies.get("usi_enable")&&(o+="&usi_enable=1"),null!=usi_cookies.get("usi_qa")&&(o+="&usi_qa=true"));var s=usi_commons.domain+"/view.jsp?hash="+e+"&siteID="+r+"&keys="+t+o;if(void 0!==usi_commons.last_view&&usi_commons.last_view==r+"_"+t)return;usi_commons.last_view=r+"_"+t,"undefined"!=typeof usi_js&&"function"==typeof usi_js.cleanup&&usi_js.cleanup(),usi_commons.load_script(s,i)}}catch(n){usi_commons.report_error(n)}},remove_loads:function(){try{if(null!=document.getElementById("usi_obj")&&document.getElementById("usi_obj").parentNode.parentNode.removeChild(document.getElementById("usi_obj").parentNode),void 0!==usi_commons.usi_loads)for(var e in usi_commons.usi_loads)null!=document.getElementById("usi_"+e)&&document.getElementById("usi_"+e).parentNode.parentNode.removeChild(document.getElementById("usi_"+e).parentNode)}catch(r){usi_commons.report_error(r)}},load:function(e,r,t,i){try{if(void 0!==window["usi_"+r])return;t=t||"";var o="";""!=usi_commons.gup("usi_force_date")?o="&usi_force_date="+usi_commons.gup("usi_force_date"):"undefined"!=typeof usi_cookies&&null!=usi_cookies.get("usi_force_date")&&(o="&usi_force_date="+usi_cookies.get("usi_force_date")),usi_commons.debug&&(o+="&usi_referrer="+encodeURIComponent(location.href)),"undefined"!=typeof usi_cookies&&(null!=usi_cookies.get("usi_enable")&&(o+="&usi_enable=1"),null!=usi_cookies.get("usi_qa")&&(o+="&usi_qa=true"));var s=usi_commons.domain+"/usi_load.jsp?hash="+e+"&siteID="+r+"&keys="+t+o;usi_commons.load_script(s,i),void 0===usi_commons.usi_loads&&(usi_commons.usi_loads={}),usi_commons.usi_loads[r]=r}catch(n){usi_commons.report_error(n)}},load_precapture:function(e,r,t){try{if(void 0!==usi_commons.last_precapture_siteID&&usi_commons.last_precapture_siteID==r)return;usi_commons.last_precapture_siteID=r;var i="";"undefined"!=typeof usi_cookies&&null!=usi_cookies.get("usi_enable")&&(i+="&usi_enable=1");var o=usi_commons.domain+"/hound/monitor.jsp?qs="+e+"&siteID="+r+i;usi_commons.load_script(o,t)}catch(s){usi_commons.report_error(s)}},load_mail:function(e,r,t){try{var i=usi_commons.domain+"/mail.jsp?qs="+e+"&siteID="+r+"&domain="+encodeURIComponent(usi_commons.domain);usi_commons.load_script(i,t)}catch(o){usi_commons.report_error(o)}},load_products:function(e){try{if(!e.siteID||!e.pid)return;var r="";["siteID","association_siteID","pid","less_expensive","rows","days_back","force_exact","match","nomatch","name_from","image_from","price_from","url_from","extra_from","extra_merge","custom_callback","allow_dupe_names","expire_seconds","name","ordersID","cartsID","viewsID","companyID","order_by"].forEach(function(t,i){e[t]&&(r+=(0==i?"?":"&")+t+"="+e[t])}),e.filters&&(r+="&filters="+encodeURIComponent(e.filters.map(function(e){return encodeURIComponent(e)}).join("&"))),usi_commons.load_script(usi_commons.cdn+"/utility/product_recommendations_filter_v3.jsp"+r,function(){"function"==typeof e.callback&&e.callback()})}catch(t){usi_commons.report_error(t)}},send_prod_rec:function(e,r,t){var i=!1;try{if(document.getElementsByTagName("html").length>0&&null!=document.getElementsByTagName("html")[0].className&&-1!=document.getElementsByTagName("html")[0].className.indexOf("translated"))return!1;var o=[e,r.name,r.link,r.pid,r.price,r.image];if(-1==o.indexOf(void 0)){var s=[e,r.name.replace(/\|/g,"&#124;"),r.link,r.pid,r.price,r.image].join("|")+"|";r.extra&&(s+=r.extra.replace(/\|/g,"&#124;")+"|"),usi_commons.load_script(usi_commons.domain+"/utility/pv2."+(t?"jsp":"js")+"?"+encodeURIComponent(s)),i=!0}}catch(n){usi_commons.report_error(n),i=!1}return i},report_error:function(e){if(null!=e&&("string"==typeof e&&(e=Error(e)),e instanceof Error)){if(void 0===usi_commons.error_reported){if(usi_commons.error_reported=!0,-1!==location.href.indexOf("usishowerrors"))throw e;usi_commons.load_script(usi_commons.domain+"/err.jsp?oops="+encodeURIComponent(e.message)+"-"+encodeURIComponent(e.stack)+"&url="+encodeURIComponent(location.href)),usi_commons.log_error(e.message),usi_commons.dir(e)}}},report_error_no_console:function(e){if(null!=e&&("string"==typeof e&&(e=Error(e)),e instanceof Error)){if(void 0===usi_commons.error_reported){if(usi_commons.error_reported=!0,-1!==location.href.indexOf("usishowerrors"))throw e;usi_commons.load_script(usi_commons.domain+"/err.jsp?oops="+encodeURIComponent(e.message)+"-"+encodeURIComponent(e.stack)+"&url="+encodeURIComponent(location.href))}}},gup_or_get_cookie:function(e,r,t){try{if("undefined"==typeof usi_cookies){usi_commons.log_error("usi_cookies is not defined");return}r=r||usi_cookies.expire_time.day,"usi_enable"==e&&(r=usi_cookies.expire_time.hour);var i=null,o=usi_commons.gup(e);return""!==o?(i=o,usi_cookies.set(e,i,r,t)):i=usi_cookies.get(e),i||""}catch(s){usi_commons.report_error(s)}},get_sess:function(){var e=null;if("undefined"==typeof usi_cookies)return"";try{if(null==usi_cookies.get("usi_si")){var r=Math.random().toString(36).substring(2);return r.length>6&&(r=r.substring(0,6)),e=r+"_"+Math.round(new Date().getTime()/1e3),usi_cookies.set("usi_si",e,86400),e}null!=usi_cookies.get("usi_si")&&(e=usi_cookies.get("usi_si")),usi_cookies.set("usi_si",e,86400)}catch(t){usi_commons.report_error(t)}return e},get_id:function(e){e||(e="");var r=null;try{if(null==usi_cookies.get("usi_v")&&null==usi_cookies.get("usi_id"+e)){var t=Math.random().toString(36).substring(2);return t.length>6&&(t=t.substring(0,6)),r=t+"_"+Math.round(new Date().getTime()/1e3),usi_cookies.set("usi_id"+e,r,2592e3,!0),r}null!=usi_cookies.get("usi_v")&&(r=usi_cookies.get("usi_v")),null!=usi_cookies.get("usi_id"+e)&&(r=usi_cookies.get("usi_id"+e)),usi_cookies.set("usi_id"+e,r,2592e3,!0)}catch(i){usi_commons.report_error(i)}return r},load_session_data:function(e){try{null==usi_cookies.get_json("usi_session_data")?usi_commons.load_script(usi_commons.domain+"/utility/session_data.jsp?extended="+(e?"true":"false")):(usi_app.session_data=usi_cookies.get_json("usi_session_data"),void 0!==usi_app.session_data_callback&&usi_app.session_data_callback())}catch(r){usi_commons.report_error(r)}},customer_ip:function(e){try{-1!=e?usi_cookies.set("usi_suppress","1",usi_cookies.expire_time.never):usi_app.main()}catch(r){usi_commons.report_error(r)}},customer_check:function(e){try{if(!usi_app.is_enabled&&!usi_cookies.value_exists("usi_ip_checked"))return usi_cookies.set("usi_ip_checked","1",usi_cookies.expire_time.day),usi_commons.load_script(usi_commons.domain+"/utility/customer_ip2.jsp?companyID="+e),!1;return!0}catch(r){usi_commons.report_error(r)}}};
	usi_commons.domain = "https://app.upsellit.com";
	usi_commons.cdn = "https://www.upsellit.com";
	usi_commons.debug = false;
	if (location.href.indexOf("usidebug") != -1 || location.href.indexOf("usi_debug") != -1) {
		usi_commons.debug = true;
	}
	setTimeout(function() {
		try {
			if (usi_commons.gup_or_get_cookie("usi_debug") != "") usi_commons.debug = true;
			if (usi_commons.gup_or_get_cookie("usi_qa") != "") {
				usi_commons.domain = usi_commons.cdn = "https://prod.upsellit.com";
			}
		} catch(err) {
			usi_commons.report_error(err);
		}
	}, 1000);
}

if (typeof usi_app === 'undefined') {
	try {
		if("undefined"==typeof usi_cookies){if(usi_cookies={expire_time:{minute:60,hour:3600,two_hours:7200,four_hours:14400,day:86400,week:604800,two_weeks:1209600,month:2592e3,year:31536e3,never:31536e4},max_cookies_count:15,max_cookie_length:1e3,update_window_name:function(e,i,t){try{var r=-1;if(-1!=t){var n=new Date;n.setTime(n.getTime()+1e3*t),r=n.getTime()}var o=window.top||window,u=0;null!=i&&-1!=i.indexOf("=")&&(i=i.replace(RegExp("=","g"),"USIEQLS")),null!=i&&-1!=i.indexOf(";")&&(i=i.replace(RegExp(";","g"),"USIPRNS"));for(var l=o.name.split(";"),a="",c=0;c<l.length;c++){var f=l[c].split("=");3==f.length?(f[0]==e&&(f[1]=i,f[2]=r,u=1),null!=f[1]&&"null"!=f[1]&&(a+=f[0]+"="+f[1]+"="+f[2]+";")):""!=l[c]&&(a+=l[c]+";")}0==u&&(a+=e+"="+i+"="+r+";"),o.name=a}catch(s){}},flush_window_name:function(e){try{for(var i=window.top||window,t=i.name.split(";"),r="",n=0;n<t.length;n++){var o=t[n].split("=");3==o.length&&(0==o[0].indexOf(e)||(r+=t[n]+";"))}i.name=r}catch(u){}},get_from_window_name:function(e){try{for(var i,t,r=(window.top||window).name.split(";"),n=0;n<r.length;n++){var o=r[n].split("=");if(3==o.length){if(o[0]==e&&(t=o[1],-1!=t.indexOf("USIEQLS")&&(t=t.replace(/USIEQLS/g,"=")),-1!=t.indexOf("USIPRNS")&&(t=t.replace(/USIPRNS/g,";")),!("-1"!=o[2]&&0>usi_cookies.datediff(o[2]))))return i=[t,o[2]]}else if(2==o.length&&o[0]==e)return t=o[1],-1!=t.indexOf("USIEQLS")&&(t=t.replace(/USIEQLS/g,"=")),-1!=t.indexOf("USIPRNS")&&(t=t.replace(/USIPRNS/g,";")),i=[t,new Date().getTime()+6048e5]}}catch(u){}return null},datediff:function(e){return e-new Date().getTime()},count_cookies:function(e){return e=e||"usi_",usi_cookies.search_cookies(e).length},root_domain:function(){try{var e=document.domain.split("."),i=e[e.length-1];if("com"==i||"net"==i||"org"==i||"us"==i||"co"==i||"ca"==i)return e[e.length-2]+"."+e[e.length-1]}catch(t){}return 0==document.domain.indexOf("www.")?document.domain.replace("www.",""):document.domain},create_cookie:function(e,i,t){if(!1!==navigator.cookieEnabled&&void 0===window.usi_nocookies){var r="";if(-1!=t){var n=new Date;n.setTime(n.getTime()+1e3*t),r="; expires="+n.toGMTString()}var o="samesite=none;";0==location.href.indexOf("https://")&&(o+="secure;");var u=usi_cookies.root_domain();"undefined"!=typeof usi_parent_domain&&-1!=document.domain.indexOf(usi_parent_domain)&&(u=usi_parent_domain),document.cookie=e+"="+encodeURIComponent(i)+r+"; path=/;domain="+u+"; "+o}},create_nonencoded_cookie:function(e,i,t){if(!1!==navigator.cookieEnabled&&void 0===window.usi_nocookies){var r="";if(-1!=t){var n=new Date;n.setTime(n.getTime()+1e3*t),r="; expires="+n.toGMTString()}var o="samesite=none;";0==location.href.indexOf("https://")&&(o+="secure;");var u=usi_cookies.root_domain();document.cookie=e+"="+i+r+"; path=/;domain="+location.host+"; "+o,document.cookie=e+"="+i+r+"; path=/;domain="+u+"; "+o,document.cookie=e+"="+i+r+"; path=/;domain=; "+o}},read_cookie:function(e){if(!1===navigator.cookieEnabled)return null;var i=e+"=",t=[];try{t=document.cookie.split(";")}catch(r){}for(var n=0;n<t.length;n++){for(var o=t[n];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(i))return decodeURIComponent(o.substring(i.length,o.length))}return null},del:function(e){usi_cookies.set(e,null,-100);try{null!=localStorage&&localStorage.removeItem(e),null!=sessionStorage&&sessionStorage.removeItem(e)}catch(i){}},get_ls:function(e){try{var i=localStorage.getItem(e);if(null!=i){if(0==i.indexOf("{")&&-1!=i.indexOf("usi_expires")){var t=JSON.parse(i);if(new Date().getTime()>t.usi_expires)return localStorage.removeItem(e),null;i=t.value}return decodeURIComponent(i)}}catch(r){}return null},get:function(e){var i=usi_cookies.read_cookie(e);if(null!=i)return i;try{if(null!=localStorage&&(i=usi_cookies.get_ls(e),null!=i))return i;if(null!=sessionStorage&&(i=sessionStorage.getItem(e),void 0===i&&(i=null),null!=i))return decodeURIComponent(i)}catch(t){}var r=usi_cookies.get_from_window_name(e);if(null!=r&&r.length>1)try{i=decodeURIComponent(r[0])}catch(n){return r[0]}return i},get_json:function(e){var i=null,t=usi_cookies.get(e);if(null==t)return null;try{i=JSON.parse(t)}catch(r){t=t.replace(/\\"/g,'"');try{i=JSON.parse(JSON.parse(t))}catch(n){try{i=JSON.parse(t)}catch(o){}}}return i},search_cookies:function(e){e=e||"";var i=[];return document.cookie.split(";").forEach(function(t){var r=t.split("=")[0].trim();(""===e||0===r.indexOf(e))&&i.push(r)}),i},set:function(e,i,t,r){"undefined"!=typeof usi_nevercookie&&!0==usi_nevercookie&&(r=!1),void 0===t&&(t=-1);try{i=i.replace(/(\r\n|\n|\r)/gm,"")}catch(n){}"undefined"==typeof usi_windownameless&&usi_cookies.update_window_name(e+"",i+"",t);try{if(t>0&&null!=localStorage){var o=new Date,u={value:i,usi_expires:o.getTime()+1e3*t};localStorage.setItem(e,JSON.stringify(u))}else null!=sessionStorage&&sessionStorage.setItem(e,i)}catch(l){}if(r||null==i){if(null!=i){if(null==usi_cookies.read_cookie(e)&&!r&&usi_cookies.search_cookies("usi_").length+1>usi_cookies.max_cookies_count){usi_cookies.report_error('Set cookie "'+e+'" failed. Max cookies count is '+usi_cookies.max_cookies_count);return}if(i.length>usi_cookies.max_cookie_length){usi_cookies.report_error('Cookie "'+e+'" truncated ('+i.length+"). Max single-cookie length is "+usi_cookies.max_cookie_length);return}}usi_cookies.create_cookie(e,i,t)}},set_json:function(e,i,t,r){var n=JSON.stringify(i).replace(/^"/,"").replace(/"$/,"");usi_cookies.set(e,n,t,r)},flush:function(e){e=e||"usi_";var i,t,r,n=document.cookie.split(";");for(i=0;i<n.length;i++)0==(t=n[i]).trim().toLowerCase().indexOf(e)&&(r=t.trim().split("=")[0],usi_cookies.del(r));usi_cookies.flush_window_name(e);try{if(null!=localStorage)for(var o in localStorage)0==o.indexOf(e)&&localStorage.removeItem(o);if(null!=sessionStorage)for(var o in sessionStorage)0==o.indexOf(e)&&sessionStorage.removeItem(o)}catch(u){}},print:function(){for(var e=document.cookie.split(";"),i="",t=0;t<e.length;t++){var r=e[t];0==r.trim().toLowerCase().indexOf("usi_")&&(console.log(decodeURIComponent(r.trim())+" (cookie)"),i+=","+r.trim().toLowerCase().split("=")[0]+",")}try{if(null!=localStorage)for(var n in localStorage)0==n.indexOf("usi_")&&"string"==typeof localStorage[n]&&-1==i.indexOf(","+n+",")&&(console.log(n+"="+usi_cookies.get_ls(n)+" (localStorage)"),i+=","+n+",");if(null!=sessionStorage)for(var n in sessionStorage)0==n.indexOf("usi_")&&"string"==typeof sessionStorage[n]&&-1==i.indexOf(","+n+",")&&(console.log(n+"="+sessionStorage[n]+" (sessionStorage)"),i+=","+n+",")}catch(o){}for(var u=(window.top||window).name.split(";"),l=0;l<u.length;l++){var a=u[l].split("=");if(3==a.length&&0==a[0].indexOf("usi_")&&-1==i.indexOf(","+a[0]+",")){var c=a[1];-1!=c.indexOf("USIEQLS")&&(c=c.replace(/USIEQLS/g,"=")),-1!=c.indexOf("USIPRNS")&&(c=c.replace(/USIPRNS/g,";")),console.log(a[0]+"="+c+" (window.name)"),i+=","+r.trim().toLowerCase().split("=")[0]+","}}},value_exists:function(){var e,i;for(e=0;e<arguments.length;e++)if(i=usi_cookies.get(arguments[e]),""===i||null===i||"null"===i||"undefined"===i)return!1;return!0},report_error:function(e){"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.report_error&&usi_commons.report_error(e)},check_multi_domain:function(){try{"undefined"!=typeof usi_app&&usi_app.company_id?usi_cookies.get("usi_app.company_id")?usi_cookies.get("usi_app.company_id")!==usi_app.company_id&&(window.name=""):usi_cookies.set("usi_app.company_id",usi_app.company_id):setTimeout(function(){usi_cookies.check_multi_domain()},2e3)}catch(e){"undefined"!=typeof usi_commons&&usi_commons.report_error(e)}},monitor_page_views:function(){try{if(void 0===usi_cookies.last_url||usi_cookies.last_url!=location.href){usi_cookies.last_url=location.href;var e=window.self===window.top,i=-1!==location.href.indexOf("/checkouts/");e&&(usi_cookies.get("usi_entry_url_1")||usi_cookies.set("usi_entry_url_1",usi_cookies.last_url,21600),null==document.referrer||usi_cookies.get("usi_referrer_url")||-1!=document.referrer.indexOf(location.host)||usi_cookies.set("usi_referrer_url",document.referrer||"direct traffic",21600)),(e||i)&&(usi_cookies.get("usi_entry_url_1")&&usi_cookies.get("usi_entry_url_1")!=usi_cookies.last_url&&usi_cookies.set("usi_last_url_1",usi_cookies.last_url,21600),usi_cookies.set("usi_pv_count",String(Number(usi_cookies.get("usi_pv_count")||0)+1),21600))}setTimeout(usi_cookies.monitor_page_views,2e3)}catch(t){"undefined"!=typeof usi_commons&&usi_commons.report_error(t)}}},"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.gup&&"function"==typeof usi_commons.gup_or_get_cookie)try{usi_commons.force_date=usi_commons.gup_or_get_cookie("usi_force_date"),usi_commons.force_group=usi_commons.gup_or_get_cookie("usi_force_group"),usi_commons.is_enabled=""!=usi_commons.gup_or_get_cookie("usi_enable",usi_cookies.expire_time.hour,!0),usi_commons.is_forced=""!=usi_commons.gup_or_get_cookie("usi_force",usi_cookies.expire_time.hour,!0),""!=usi_commons.gup("usi_email_id")?usi_cookies.set("usi_email_id",usi_commons.gup("usi_email_id").split(".")[0],Number(usi_commons.gup("usi_email_id").split(".")[1]),!0):null==usi_cookies.read_cookie("usi_email_id")&&null!=usi_cookies.get_from_window_name("usi_email_id")&&usi_cookies.set("usi_email_id",usi_cookies.get_from_window_name("usi_email_id")[0],(usi_cookies.get_from_window_name("usi_email_id")[1]-new Date().getTime())/1e3,!0),""!=usi_commons.gup_or_get_cookie("usi_debug")&&(usi_commons.debug=!0),""!=usi_commons.gup_or_get_cookie("usi_qa")&&(usi_commons.domain=usi_commons.cdn="https://prod.upsellit.com"),usi_cookies.monitor_page_views()}catch(e){usi_commons.report_error(e)}-1!=location.href.indexOf("usi_clearcookies")&&usi_cookies.flush(),usi_cookies.check_multi_domain()}
"undefined"==typeof usi_dom&&((usi_dom={}).get_elements=function(e,t){var n=[];return t=t||document,n=Array.prototype.slice.call(t.querySelectorAll(e))},usi_dom.get_first_element=function(e,t){if(""===(e||""))return null;if(t=t||document,"[object Array]"!==Object.prototype.toString.call(e))return t.querySelector(e);for(var n=null,r=0;r<e.length;r++){var i=e[r];if(null!=(n=usi_dom.get_first_element(i,t)))break}return n},usi_dom.get_element_text_no_children=function(e,t){var n="";if(null==t&&(t=!1),null!=(e=e||document)&&null!=e.childNodes)for(var r=0;r<e.childNodes.length;++r)3===e.childNodes[r].nodeType&&(n+=e.childNodes[r].textContent);return!0===t&&(n=usi_dom.clean_string(n)),n.trim()},usi_dom.clean_string=function(e){return"string"!=typeof e?void 0:(e=(e=(e=(e=(e=(e=(e=e.replace(/[\u2010-\u2015\u2043]/g,"-")).replace(/[\u2018-\u201B]/g,"'")).replace(/[\u201C-\u201F]/g,'"')).replace(/\u2024/g,".")).replace(/\u2025/g,"..")).replace(/\u2026/g,"...")).replace(/\u2044/g,"/")).replace(/[^\x20-\xFF\u0100-\u017F\u0180-\u024F\u20A0-\u20CF]/g,"").trim()},usi_dom.string_to_decimal=function(e){var t=null;if("string"==typeof e)try{var n=parseFloat(e.replace(/[^0-9\.-]+/g,""));!1===isNaN(n)&&(t=n)}catch(r){usi_commons.log("Error: "+r.message)}return t},usi_dom.string_to_integer=function(e){var t=null;if("string"==typeof e)try{var n=parseInt(e.replace(/[^0-9-]+/g,""));!1===isNaN(n)&&(t=n)}catch(r){usi_commons.log("Error: "+r.message)}return t},usi_dom.get_absolute_url=function(){var e;return function(t){return(e=e||document.createElement("a")).href=t,e.href}}(),usi_dom.format_currency=function(e,t,n){var r="";return isNaN(e)&&(e=usi_dom.currency_to_decimal(e)),!1===isNaN(e)&&("object"==typeof Intl&&"function"==typeof Intl.NumberFormat?(t=t||"en-US",n=n||{style:"currency",currency:"USD"},r=Number(e).toLocaleString(t,n)):r=e),r},usi_dom.currency_to_decimal=function(e){return 0==e.indexOf("&")&&-1!=e.indexOf(";")?e=e.substring(e.indexOf(";")+1):-1!=e.indexOf("&")&&-1!=e.indexOf(";")&&(e=e.substring(0,e.indexOf("&"))),isNaN(e)&&(e=e.replace(/[^0-9,.]/g,"")),e.indexOf(",")==e.length-3&&(-1!=e.indexOf(".")&&(e=e.replace(".","")),e=e.replace(",",".")),e=e.replace(/[^0-9.]/g,"")},usi_dom.to_decimal_places=function(e,t){if(null==e||"number"!=typeof e||null==t||"number"!=typeof t)return null;if(0==t)return parseFloat(Math.round(e));for(var n=10,r=1;r<t;r++)n*=10;return parseFloat(Math.round(e*n)/n)},usi_dom.trim_string=function(e,t,n){return n=n||"",(e=e||"").length>t&&(e=e.substring(0,t),""!==n&&(e+=n)),e},usi_dom.attach_event=function(e,t,n){var r=usi_dom.find_supported_element(e,n);usi_dom.detach_event(e,t,r),r.addEventListener?r.addEventListener(e,t,!1):r.attachEvent("on"+e,t)},usi_dom.detach_event=function(e,t,n){var r=usi_dom.find_supported_element(e,n);r.removeEventListener?r.removeEventListener(e,t,!1):r.detachEvent("on"+e,t)},usi_dom.find_supported_element=function(e,t){return(t=t||document)===window?window:!0===usi_dom.is_event_supported(e,t)?t:t===document?window:usi_dom.find_supported_element(e,document)},usi_dom.is_event_supported=function(e,t){return null!=t&&void 0!==t["on"+e]},usi_dom.is_defined=function(e,t){if(null==e||""===(t||""))return!1;var n=!0,r=e;return t.split(".").forEach(function(e){!0===n&&(null==r||"object"!=typeof r||!1===r.hasOwnProperty(e)?n=!1:r=r[e])}),n},usi_dom.ready=function(e){void 0!==document.readyState&&"complete"===document.readyState?e():window.addEventListener?window.addEventListener("load",e,!0):window.attachEvent?window.attachEvent("onload",e):setTimeout(e,5e3)},usi_dom.fit_text=function(e,t){t||(t={});var n={multiLine:!0,minFontSize:.1,maxFontSize:20,widthOnly:!1},r={};for(var i in n)t.hasOwnProperty(i)?r[i]=t[i]:r[i]=n[i];var l=Object.prototype.toString.call(e);function o(e,t){a=e.innerHTML,d=parseInt(window.getComputedStyle(e,null).getPropertyValue("font-size"),10),c=(n=e,r=window.getComputedStyle(n,null),(n.clientWidth-parseInt(r.getPropertyValue("padding-left"),10)-parseInt(r.getPropertyValue("padding-right"),10))/d),u=(i=e,l=window.getComputedStyle(i,null),(i.clientHeight-parseInt(l.getPropertyValue("padding-top"),10)-parseInt(l.getPropertyValue("padding-bottom"),10))/d),c&&(t.widthOnly||u)||(t.widthOnly?usi_commons.log("Set a static width on the target element "+e.outerHTML):usi_commons.log("Set a static height and width on the target element "+e.outerHTML)),-1===a.indexOf("textFitted")?((o=document.createElement("span")).className="textFitted",o.style.display="inline-block",o.innerHTML=a,e.innerHTML="",e.appendChild(o)):o=e.querySelector("span.textFitted"),t.multiLine||(e.style["white-space"]="nowrap"),f=t.minFontSize,s=t.maxFontSize;for(var n,r,i,l,o,u,a,c,d,f,p,s,$=f,g=1e3;f<=s&&g>0;)g--,p=s+f-.1,o.style.fontSize=p+"em",o.scrollWidth/d<=c&&(t.widthOnly||o.scrollHeight/d<=u)?($=p,f=p+.1):s=p-.1;o.style.fontSize!==$+"em"&&(o.style.fontSize=$+"em")}"[object Array]"!==l&&"[object NodeList]"!==l&&"[object HTMLCollection]"!==l&&(e=[e]);for(var u=0;u<e.length;u++)o(e[u],r)});
"undefined"==typeof usi_aff&&(usi_aff={fix_linkshare:function(){try{if(""!=usi_commons.gup("ranSiteID")&&(usi_aff.log_url(),-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))){usi_cookies.del("usi_clicked_1");var e=new Date,i=e.getUTCFullYear()+(e.getUTCMonth()+1<10?"0":"")+(e.getUTCMonth()+1)+(10>e.getUTCDate()?"0":"")+e.getDate(),c=(10>e.getUTCHours()?"0":"")+e.getUTCHours()+(10>e.getUTCMinutes()?"0":"")+e.getUTCMinutes();usi_cookies.create_nonencoded_cookie("usi_rmStore","ald:"+i+"_"+c+"|atrv:"+usi_commons.gup("ranSiteID"),usi_cookies.expire_time.month)}null!=usi_cookies.read_cookie("usi_rmStore")&&(usi_cookies.create_nonencoded_cookie("rmStore",usi_cookies.read_cookie("usi_rmStore"),usi_cookies.expire_time.month),localStorage.setItem("rmStore",'{"/":"'+usi_cookies.read_cookie("usi_rmStore")+'"}'))}catch(r){usi_commons.report_error(r)}},fix_cj:function(){try{if(""!=usi_commons.gup("cjevent")||""!=usi_commons.gup("CJEVENT")){usi_aff.log_url(),usi_cookies.del("cjUser");var e=usi_commons.gup("cjevent");""==e&&(e=usi_commons.gup("CJEVENT")),(-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))&&(usi_cookies.del("usi_clicked_1"),usi_cookies.create_nonencoded_cookie("usi_cjevent",e,usi_cookies.expire_time.month))}null!=usi_cookies.read_cookie("usi_cjevent")&&(usi_cookies.create_nonencoded_cookie("cjevent",usi_cookies.read_cookie("usi_cjevent"),usi_cookies.expire_time.month),localStorage.setItem("as_onsite_cjevent",usi_cookies.read_cookie("usi_cjevent")),localStorage.setItem("cjevent",usi_cookies.read_cookie("usi_cjevent")),sessionStorage.setItem("cjevent",usi_cookies.read_cookie("usi_cjevent")))}catch(i){usi_commons.report_error(i)}},fix_sas:function(){try{""!=usi_commons.gup("sscid")&&(usi_aff.load_script("https://www.upsellit.com/launch/blank.jsp?aff_click_sas="+encodeURIComponent(location.href)),(-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))&&(usi_cookies.del("usi_clicked_1"),usi_cookies.create_nonencoded_cookie("usi_sscid",usi_commons.gup("sscid"),usi_cookies.expire_time.month))),null!=usi_cookies.read_cookie("usi_sscid")&&usi_cookies.create_nonencoded_cookie("sas_m_awin",'{"clickId":"'+usi_cookies.read_cookie("usi_sscid")+'"}',usi_cookies.expire_time.month)}catch(e){usi_commons.report_error(e)}},fix_awin:function(e){try{""!=usi_commons.gup("awc")&&(usi_aff.log_url(),(-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))&&(usi_cookies.del("usi_clicked_1"),usi_cookies.create_nonencoded_cookie("usi_awc",usi_commons.gup("awc"),usi_cookies.expire_time.month),usi_cookies.del("_aw_j_"+e))),null!=usi_cookies.read_cookie("usi_awc")&&(usi_cookies.del("_aw_j_"+e),usi_cookies.create_nonencoded_cookie("AwinChannelCookie","aw",2592e3,!0),usi_cookies.create_nonencoded_cookie("AwinCookie","aw",2592e3,!0),usi_cookies.create_nonencoded_cookie("awin_source","aw",2592e3,!0),usi_cookies.create_nonencoded_cookie("_aw_m_"+e,usi_cookies.read_cookie("usi_awc"),usi_cookies.expire_time.month),usi_cookies.create_nonencoded_cookie("awc",usi_cookies.read_cookie("usi_awc"),usi_cookies.expire_time.month),"undefined"!=typeof AWIN&&void 0!==AWIN.Tracking&&void 0!==AWIN.Tracking.StorageProvider&&AWIN.Tracking.StorageProvider.setAWC(e,usi_cookies.read_cookie("usi_awc")))}catch(i){usi_commons.report_error(i)}},fix_pj:function(){try{if(""!=usi_commons.gup("clickId")&&(usi_aff.log_url(),-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))){usi_cookies.del("usi_clicked_1");var e=new Date;usi_cookies.create_nonencoded_cookie("usi-pjn-click",'[{"id":"'+usi_commons.gup("clickId")+'","days":'+Math.floor(e/864e5)+',"type":"p"}]',usi_cookies.expire_time.month)}null!=usi_cookies.read_cookie("usi-pjn-click")&&(usi_cookies.create_nonencoded_cookie("pjn-click",usi_cookies.read_cookie("usi-pjn-click"),usi_cookies.expire_time.month),localStorage.setItem("pjnClickData",usi_cookies.read_cookie("usi-pjn-click")))}catch(i){usi_commons.report_error(i)}},fix_ir:function(e){try{if((""!=usi_commons.gup("irclickid")||""!=usi_commons.gup("clickid"))&&(usi_aff.log_url(),-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))){usi_cookies.del("usi_clicked_1");var i=usi_commons.gup("irclickid");""==i&&(i=usi_commons.gup("clickid"));var c=Date.now().toString(),r=c+"|-1|"+c+"|"+i+"|";usi_cookies.create_nonencoded_cookie("usi_IR_"+e,r,usi_cookies.expire_time.month)}null!=usi_cookies.read_cookie("usi_IR_"+e)&&(usi_cookies.create_nonencoded_cookie("IR_"+e,usi_cookies.read_cookie("usi_IR_"+e),usi_cookies.expire_time.month),usi_cookies.create_nonencoded_cookie("irclickid",usi_cookies.read_cookie("usi_IR_"+e).split("|")[3],usi_cookies.expire_time.month))}catch(o){usi_commons.report_error(o)}},fix_cf:function(){try{""!=usi_commons.gup("cfclick")&&(usi_aff.log_url(),(-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))&&(usi_cookies.del("usi_clicked_1"),usi_cookies.create_nonencoded_cookie("usi-cfjump-click",usi_commons.gup("cfclick"),usi_cookies.expire_time.month))),null!=usi_cookies.read_cookie("usi-cfjump-click")&&(usi_cookies.create_nonencoded_cookie("cfjump-click",usi_cookies.read_cookie("usi-cfjump-click"),usi_cookies.expire_time.month),usi_cookies.create_nonencoded_cookie("cfclick",usi_cookies.read_cookie("usi-cfjump-click"),usi_cookies.expire_time.month))}catch(e){usi_commons.report_error(e)}},fix_avantlink:function(){try{""!=usi_commons.gup("avad")&&(usi_aff.log_url(),(-1!=location.href.indexOf("usi_email_id")||null!=usi_cookies.get("usi_clicked_1"))&&(usi_cookies.del("usi_clicked_1"),usi_cookies.create_nonencoded_cookie("usi_avad",usi_commons.gup("avad"),usi_cookies.expire_time.month),usi_aff.wait_for_avmws=function(){null!=usi_cookies.get("avmws")?usi_cookies.create_nonencoded_cookie("usi_avmws",usi_cookies.get("avmws"),usi_cookies.expire_time.month):setTimeout(usi_aff.wait_for_avmws,1e3)},usi_aff.wait_for_avmws())),null!=usi_cookies.read_cookie("usi_avmws")&&usi_cookies.create_nonencoded_cookie("avmws",usi_cookies.read_cookie("usi_avmws"),usi_cookies.expire_time.month)}catch(e){usi_commons.report_error(e)}},get_impact_pixel:function(){var e="";try{for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var r=i[c].innerText;if(r&&(-1!=r.indexOf("ire('trackConversion'")||-1!=r.indexOf('ire("trackConversion"'))){e=(e=(e=r.trim().replace(/\s/g,"")).split("trackConversion")[1]).split("});")[0];break}}}catch(o){usi_commons.report_error(o)}return e},log_url:function(){usi_aff.load_script("https://www.upsellit.com/launch/blank.jsp?aff_click="+encodeURIComponent(location.href))},monitor_affiliate_pixel:function(e){try{var i=usi_aff.report_affiliate_pixels();if(i)return"function"==typeof e&&e(i),usi_aff.parse_pixels(i);setTimeout(function(){usi_aff.monitor_affiliate_pixel(e)},1e3)}catch(c){usi_commons.report_error(c)}},parse_pixels:function(e){try{usi_aff.load_script("https://www.upsellit.com/launch/blank.jsp?pixel_found="+encodeURIComponent(location.href)+"&"+e)}catch(i){usi_commons.report_error(i)}},report_affiliate_pixels:function(){var e="";try{var i={cj:document.querySelector("[src*='emjcd.com']"),sas:document.querySelector("[src*='shareasale.com/sale.cfm']"),linkshare:document.querySelector("[src*='track.linksynergy.com']"),pj:document.querySelector("[src*='t.pepperjamnetwork.com/track']"),avant:document.querySelector("[src*='tracking.avantlink.com/ptcfp.php']"),ir:{src:usi_aff.get_impact_pixel()},awin1:document.querySelector("[src*='awin1.com/sread']"),awin2:document.querySelector("[src*='zenaps.com/sread.js']"),cf:document.querySelector("[src*='https://cfjump.'][src*='.com/track']"),saasler1:document.querySelector("[src*='engine.saasler.com']"),saasler2:document.querySelector("[src*='saasler-impact.herokuapp.com']")};for(var c in i)i[c]&&i[c].src&&(e+="&"+c+"="+encodeURIComponent(i[c].src))}catch(r){usi_commons.report_error(r)}return e},load_script:function(e){try{var i=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=e,i.appendChild(c)}catch(r){usi_commons.report_error(r)}}});
"undefined"==typeof usi_company&&(window.usi_company={rulesets:{testing:function(e){return void 0===e.testing||(e.testing?usi_cookies.get("usi_enable"):e.testing?void 0:!usi_cookies.get("usi_enable"))},device:function(e){return!e.device||usi_commons.device===e.device},required_cookies:function(e){return!e.required_cookies||usi_cookies.value_exists.apply(null,e.required_cookies)},suppress_cookies:function(e){if(!e.suppress_cookies)return!0;for(var t=0;t<e.suppress_cookies.length;t++)if(usi_cookies.value_exists(e.suppress_cookies[t]))return!1;return!0},required_elements:function(e){if(!e.required_elements)return!0;try{for(var t=0;t<e.required_elements.length;t++)if(!document.querySelector(e.required_elements[t]))return!1;return!0}catch(r){return!1}},min_subtotal:function(e){return void 0===e.min_subtotal||usi_company.get_subtotal()>e.min_subtotal},max_subtotal:function(e){return void 0===e.max_subtotal||usi_company.get_subtotal()<e.max_subtotal},subtotal_gt:function(e){return void 0===e.subtotal_gt||usi_company.get_subtotal()>e.subtotal_gt},subtotal_lt:function(e){return void 0===e.subtotal_lt||usi_company.get_subtotal()<e.subtotal_lt},subtotal_gte:function(e){return void 0===e.subtotal_gte||usi_company.get_subtotal()>=e.subtotal_gte},subtotal_lte:function(e){return void 0===e.subtotal_lte||usi_company.get_subtotal()<=e.subtotal_lte},date_ranges:function(e){return e.date_ranges&&"undefined"==typeof usi_date?usi_commons.log("usi_date is required"):!e.date_ranges||e.date_ranges.some(function(e){return usi_date.is_date(new Date(e[1]))&&!usi_date.is_date(new Date(e[0]))?usi_date.is_before(e[1]):usi_date.is_date(new Date(e[0]))&&!usi_date.is_date(new Date(e[1]))?usi_date.is_after(e[0]):usi_date.is_between(e[0],e[1])})},is_after:function(e){return e.is_after&&"undefined"==typeof usi_date?usi_commons.log("usi_date is required"):!e.is_after||usi_date.is_after(e.is_after)},is_before:function(e){return e.is_before&&"undefined"==typeof usi_date?usi_commons.log("usi_date is required"):!e.is_before||usi_date.is_before(e.is_before)},is_entry:function(e){if(void 0===e.is_entry)return!0;var t=usi_cookies.get("usi_referrer_url"),r=document.referrer==t||""==document.referrer&&"direct traffic"==t,s=location.href==usi_cookies.get("usi_entry_url_1")&&r;return e.is_entry===s},page_visits:function(e){if(void 0===e.page_visits)return!0;var t=Number(usi_cookies.get("usi_pv_count"));return("number"!=typeof e.page_visits.equals||t===e.page_visits.equals)&&("number"!=typeof e.page_visits.min||!(t<=e.page_visits.min))&&("number"!=typeof e.page_visits.max||!(t>=e.page_visits.max))},countries:function(e){return e.countries&&!usi_app.country?usi_commons.log("usi_app.country is required"):!e.countries||-1!==e.countries.indexOf(usi_app.country)},states:function(e){return e.states&&!usi_app.state?usi_commons.log("usi_app.state is required"):!e.states||-1!==e.states.indexOf(usi_app.state)},suppress_countries:function(e){return e.suppress_countries&&!usi_app.country?usi_commons.log("usi_app.country is required"):!e.suppress_countries||-1===e.suppress_countries.indexOf(usi_app.country)},suppress_states:function(e){return e.suppress_states&&!usi_app.state?usi_commons.log("usi_app.state is required"):!e.suppress_states||-1===e.suppress_states.indexOf(usi_app.state)},traffic_percent:function(e){return void 0===e.traffic_percent||(e.siteID&&!usi_cookies.get("usi_traffic"+e.siteID)&&usi_cookies.set("usi_traffic"+e.siteID,Math.random()>e.traffic_percent?"true":"false"),e.siteID&&"true"===usi_cookies.get("usi_traffic"+e.siteID))},traffic_source:function(e){return void 0===e.traffic_source||(usi_cookies.get("usi_traffic_source")||usi_commons.log_error("usi_traffic_source required"),""===usi_cookies.get("usi_traffic_source")&&-1!==e.traffic_source.indexOf("direct")||e.traffic_source.some(function(e){return -1!==usi_cookies.get("usi_traffic_source").indexOf(e)}))},pages:function(e){return void 0===e.pages||e.pages.some(function(e){return"/"===e?location.pathname==e:-1!==location.href.indexOf(e)})},suppressed_pages:function(e){return void 0===e.suppressed_pages||!e.suppressed_pages.some(function(e){return"/"===e?location.pathname==e:-1!==location.href.indexOf(e)})},logged_in:function(e){return void 0===e.logged_in||(e.logged_in?"loggedin"===usi_cookies.get("usi_visitor"):e.logged_in?void 0:"loggedin"!==usi_cookies.get("usi_visitor"))},logged_out:function(e){return void 0===e.logged_out||(e.logged_out?"loggedin"!==usi_cookies.get("usi_visitor"):e.logged_out?void 0:"loggedin"===usi_cookies.get("usi_visitor"))},return_visitor:function(e){if(void 0===e.return_visitor)return!0;if("undefined"==typeof usi_date)return usi_commons.log("usi_date is required");var t=usi_commons.gup_or_get_cookie("usi_force_return");if("1"===t||"0"===t)return"1"===t===e.return_visitor;var r=usi_company.is_return("number"==typeof e.return_visitor?e.return_visitor:24);return e.return_visitor?r:!r},new_visitor:function(e){if(void 0===e.new_visitor)return!0;if("undefined"==typeof usi_date)return usi_commons.log("usi_date is required");var t=usi_commons.gup_or_get_cookie("usi_force_return");if("1"===t||"0"===t)return"0"===t===e.new_visitor;var r=usi_company.is_return("number"==typeof e.new_visitor?e.new_visitor:24);return e.new_visitor?!r:r},last_purchase:function(e){if(void 0===e.last_purchase)return!0;var t=Number(usi_cookies.get("usi_customer_purchased"));return e.last_purchase.equals?e.last_purchase.equals==t:e.last_purchase.min?e.last_purchase.min>=t:!!e.last_purchase.max&&e.last_purchase.max<=t},return_customer:function(e){return void 0===e.return_customer||(e.return_customer?usi_cookies.get("usi_customer_purchased"):e.return_customer?void 0:!usi_cookies.get("usi_customer_purchased"))},new_customer:function(e){return void 0===e.new_customer||(e.new_customer?!usi_cookies.get("usi_customer_purchased"):e.new_customer?void 0:usi_cookies.get("usi_customer_purchased"))}},get_subtotal:function(){return usi_cookies.get("usi_subtotal")?Number(usi_cookies.get("usi_subtotal").replace(/[^0-9.]/g,"")):0},is_return:function(e){if("undefined"==typeof usi_date)return usi_commons.log("usi_date is required");var t=!1,r="usi_return_visitor",s=usi_date.set_date();!1===usi_cookies.value_exists(r)&&usi_cookies.set(r,s,usi_cookies.expire_time.never,!0);var i=new Date(usi_cookies.get(r));return usi_date.is_date(i)&&(t=usi_date.diff(i,s,"hours",2)>=e),t},test_load:function(e,t){return!1},before_load:async function(e){usi_commons.log("Loading: "+(e._name?e._name+", ":e.name?e.name+", ":"")+(e.siteID?e.siteID+", ":"")+(e.key?e.key:"")),"string"==typeof e.before_load&&"function"==typeof usi_app[e.before_load]&&await usi_app[e.before_load](e)},on_load:function(e,t){"object"==typeof e&&e.on_load&&("object"==typeof t&&"function"==typeof t[e.on_load]?t[e.on_load]():"object"==typeof usi_app&&"function"==typeof usi_app[e.on_load]&&usi_app[e.on_load]())},post_load_campaigns:function(e){if("1"==usi_commons.gup_or_get_cookie("usi_testing")&&e.campaigns){var t=Object.keys(usi_company.rulesets);t=t.concat(Object.keys(usi_company.custom_rulesets)),t=Array.from(new Set(t)).sort();var r={};for(var s in e.campaigns)r[s.charAt(0)]=e.campaigns[s].map(function(e){return e._missing?e._missing.map(e=>t.indexOf(e)):-1});var i=JSON.stringify(r),n=JSON.stringify(t),o=JSON.stringify(e);i!=sessionStorage.usi_campaign_results&&sessionStorage.setItem("usi_campaign_results",i),n!=sessionStorage.usi_campaign_keys&&(sessionStorage.usi_campaign_json||sessionStorage.setItem("usi_campaign_json",o),sessionStorage.setItem("usi_campaign_keys",n))}},load_campaigns:function(e,t){try{if(!e||!e.campaigns)return;function r(e,t){var r=0;!function s(){if(!(r>=e.length)){var i=e[r++];t(i,function(e){e||s()})}}()}function s(e,t,r){if(!e)return"";var s=e.match(/^{{\s*usi_app\.([\w.]+)\s*}}$/);if(s){var i=s[1].split(".");let n=usi_app;for(let o of i){if(null==n||"object"!=typeof n)return e;n=n[o]}return"function"==typeof n?n(r||t):n}return e.replace(/{{\s*usi_commons\.device\s*}}/,usi_commons.device).replace(/{{\s*usi_app\.([\w.]+)\s*}}/g,function(e,t){if(!t)return e;for(var s=t.split("."),i=usi_app,n=0;n<s.length;n++){if(null==i||"object"!=typeof i)return e;i=i[s[n]]}return null==i?e:"function"==typeof i?i(r):i})}function i(e,t){var r=Object.assign({},e);for(var i in r)r.hasOwnProperty(i)&&"string"==typeof r[i]&&r[i].match(/{{\s*usi_app\.([\w.]+)\s*}}/)&&(r[i]=s(r[i],r,t));return r}function n(e,t){try{var r,n,o,u=[],a={};if(e.segments&&Array.isArray(e.segments))for(var c=0;c<e.segments.length;c++){var f=e.segments[c],p=[];for(var l in f)if(f.hasOwnProperty(l)){var d=usi_company.custom_rulesets[l]||usi_company.rulesets[l];for(var g in"function"!=typeof d||d(Object.assign({},e,f))||p.push(l),usi_company.custom_rulesets)if(usi_company.custom_rulesets.hasOwnProperty(g)){var m=usi_company.custom_rulesets[g];m({...e,...f})||p.push(g)}}if(0===p.length){a=f;break}}var v=Object.assign({},e,a);for(var y in"view"===v._type&&"undefined"==typeof usi_force&&-1==location.href.indexOf("usi_force")&&(v.suppress_cookies=v.suppress_cookies||[],-1===v.suppress_cookies.indexOf("usi_sale")&&v.suppress_cookies.push("usi_sale","usi_launched","usi_launched"+v.siteID),e.suppress_cookies=v.suppress_cookies),usi_company.rulesets)!usi_company.custom_rulesets[y]&&usi_company.rulesets.hasOwnProperty(y)&&((0,usi_company.rulesets[y])(v)||u.push(y));for(var h in usi_company.custom_rulesets)if(usi_company.custom_rulesets.hasOwnProperty(h)){var m=usi_company.custom_rulesets[h];m(v)||u.push(h)}if(e._missing=u,u.length>0)return t(!1);var b=[];if(v.list){if(!usi_app.company_id)return usi_commons.log_error("usi_app.company_id is required");if(!v.list.ids)return usi_commons.log_error("campaign.list.ids is required");if(!v.list.label)return usi_commons.log_error("campaign.list.label is required");b.push(function(t){var r=i(v.list,v);if(v.product=Array.isArray(r.ids)?r.ids.join(","):s(r.ids,v),v.save_token="usi_ls_"+v.list.label+"_"+v.product,sessionStorage[v.save_token])return t("true"===sessionStorage[v.save_token]);usi_company.lookup_callback=function(s){try{e.list._found=s,r.type=r.type||"suppress";var i=0===s&&"suppress"===r.type||1===s&&"enable"===r.type;sessionStorage.setItem(v.save_token,i.toString()),i||u.push("list"),t(i)}catch(n){usi_commons.report_error(n)}};var n=usi_commons.domain+"/utility/lookup_suppressions.jsp?companyID="+usi_app.company_id+"&product="+v.product+"&label="+r.label+"&match="+(r.match||"any")+"&callback=usi_company.lookup_callback";usi_commons.load_script(n)})}if(v.lift){if("undefined"==typeof usi_split_test)return usi_commons.log_error("usi_split_test is required");if(!v.lift.id)return usi_commons.log_error("campaign.lift.id is required");b.push(function(t){usi_split_test.instantiate_callback(v.lift.id,function(r){if(0==r)return u.push("lift"),t(!1);e.lift._group=r,t(!0)})})}"object"==typeof v.split&&b.push(function(t){var r,s=Object.keys(v.split),i=usi_commons.gup("usi_force_group");if(i)r=i;else if(v._group)r=v._group;else if(v.lift&&"boolean"==typeof v.lift.split&&v.lift.split&&v.lift._group)r=v.lift._group;else{for(var n=0,o={},u=0;u<s.length;u++){var a=s[u],c=v.split[a].percent;o[a]="number"==typeof c&&c>0?c:1,n+=o[a]}for(var f=Math.random()*n,p=0,l=0;l<s.length;l++){var d=s[l];if(p+=o[d],f<p){r=d;break}}r||(r=s[0])}var g=v.split[r];for(var m in g)g.hasOwnProperty(m)&&(v[m]=g[m]);e._group=r,t(!0)}),b.push(function(e){if(!v.recommendations)return e(!0);let t=i(v.recommendations,v);return t.pid?t.siteID?void(t.callback=async function(){try{v.recommendations.filter_callback&&"function"==typeof usi_app[v.recommendations.filter_callback]&&await usi_app[v.recommendations.filter_callback](v);let t=v.recommendations.name?v.recommendations.name.replace("usi_app.",""):"product_rec",r=usi_app[t]&&usi_app[t].data&&usi_app[t].data.length?usi_app[t].data.length:0,s=void 0!==v.recommendations.min_rows?v.recommendations.min_rows:v.recommendations.rows?v.recommendations.rows:3,i=usi_commons.gup("usi_test")||r>=s;i||u.push("recommendations"),e(i)}catch(n){usi_commons.log_error(n),e(!1)}},usi_commons.load_products(t)):(usi_commons.log_error("recommendations.siteID is required"),e(!1)):(usi_commons.log_error("recommendations.pid is required"),e(!1))}),r=b,n=function(e){v.siteID||u.push("siteID"),"anon"==v._type||v.hash||u.push("hash"),t(e,v)},o=0,function e(t){return t?o>=r.length?n(!0):void r[o++](e):n(!1)}(!0)}catch($){usi_commons.report_error($),t(!1)}}usi_company.custom_rulesets=t||[],e.campaigns.usi_load&&r(e.campaigns.usi_load,function(e,t){e._type="usi_load",n(e,function(r,n){e._active=r,r&&n&&n.siteID&&n.hash?usi_company.before_load(n).then(function(){usi_commons.load(n.hash,n.siteID,n.key?s(n.key,n):"",function(){var e=window["usi_"+n.siteID];void 0!==e&&(e.company_json=i(n),n.on_load&&usi_company.on_load(n,e)),t(usi_company.test_load(r,n))})}):t(r)})}),e.campaigns.view&&r(e.campaigns.view,function(e,t){e._type="view",n(e,function(r,n){e._active=r,r&&n&&n.siteID&&n.hash&&usi_company.before_load(n).then(function(){usi_commons.load_view(n.hash,n.siteID,n.key?s(n.key,n):"",function(){"undefined"!=typeof usi_js&&(usi_js.company_json=i(n),n.on_load&&usi_company.on_load(n,usi_js))})}),t(r)})}),e.campaigns.anon&&r(e.campaigns.anon,function(e,t){e._type="anon",n(e,function(r,s){e._active=r,r&&s&&s.siteID&&(usi_app.anon_data=i(s),usi_company.before_load(s).then(function(){if("undefined"==typeof usi_user_id)return usi_commons.log_error("usi_user_id is required");s.found_user_callback&&"function"==typeof usi_app[s.found_user_callback]&&(usi_user_id.found_user_callback=usi_app[s.found_user_callback]),usi_user_id.activate(s.siteID),s.on_load&&usi_company.on_load(s,usi_user_id)})),t(r)})}),e.campaigns.precapture&&r(e.campaigns.precapture,function(e,t){e._type="precapture",n(e,function(r,s){e._active=r,r&&s&&s.siteID&&s.hash&&(usi_app.precapture_data=i(s),usi_company.before_load(s).then(function(){usi_commons.load_precapture(s.hash,s.siteID,function(){s.on_load&&usi_company.on_load(s,usi_js_monitor)})})),t(r)})}),usi_company.post_load_campaigns()}catch(o){usi_commons.report_error(o)}}});
if (typeof usi_company_json === 'undefined') {try {usi_company_json = {
  "campaigns": {
    "view": [
      {
        "name": "Udemy Active Cart Engagement",
        "siteID": "62737",
        "hash": "ZFjjJe4NuelUB28WzlAXnOy",
        "key": "{{usi_commons.device}}",
        "testing": true,
        "suppressed_pages": [
          "/"
        ],
        "required_cookies": [
          "usi_pids"
        ],
        "list": {
          "ids": "{{usi_app.get_pids}}",
          "label": "Udemy course List - March 2026",
          "match": "any",
          "type": "enable"
        }
      }
    ]
  }
};} catch (err) {usi_commons.report_error(err);}}

		usi_app = {};
		usi_app.main = function () {
			try {
				if (window.self !== window.top) return;
				usi_app.company_id = "6885";
				usi_app.url = location.href.toLowerCase();
				usi_app.coupon = usi_cookies.value_exists("usi_coupon_applied") ? "" : usi_commons.gup_or_get_cookie("usi_coupon", usi_cookies.expire_time.week, true);
				
				// Pages
				usi_app.is_cart_page = /\/cart\//.test(usi_app.url);
				usi_app.is_checkout_page = /\/subscription-checkout\//.test(usi_app.url);
				usi_app.is_confirmation_page = usi_app.url.match("/cart/success/") != null;
				usi_app.is_pdp_page = /udemy\.com\/course\/[^\/]+/.test(usi_app.url);
	
				// Booleans
				usi_app.is_suppressed = !usi_app.is_forced && (usi_app.url.match("udemy") == null ||
					usi_app.is_confirmation_page ||
					usi_cookies.value_exists("usi_sale"));
				
				// Suppress on 404 pages
				if (document.title.indexOf('404') != -1) return;
				
				// Load pixel on confirmation page
				if (usi_app.is_confirmation_page && typeof USI_orderID == "undefined") {
					usi_commons.load_script("//www.upsellit.com/active/udemy_pixel.jsp");
				}
				
				usi_aff.fix_linkshare();
				usi_aff.monitor_affiliate_pixel(function(){
					if (typeof USI_orderID == "undefined") {
						usi_commons.load_script("//www.upsellit.com/active/udemy_pixel.jsp");
					}
				});

				if (usi_app.is_suppressed) {
					return usi_commons.log("usi_app.main is suppressed");
				}
				
				// Apply coupons
				if ((usi_app.is_pdp_page || usi_app.is_checkout_page) && usi_app.coupon != "") {
					usi_app.apply_coupon();
					return;
				}
				
				// Monitor PDP for product data
				if (usi_app.is_pdp_page && !usi_app.pdp_timeout) usi_app.start_pdp_monitor();
				usi_app.load();
			} catch(err) {
				usi_commons.report_error(err);
			}
		};
		
		usi_app.get_pids = function(){
			return usi_cookies.value_exists("usi_pids") ? usi_cookies.get("usi_pids").replaceAll("|", ",") : "";
		};

		usi_app.load = function () {
			try {
				usi_commons.log("usi_app.load()");
	
				if (typeof usi_js !== 'undefined' && typeof usi_js.cleanup === 'function') {
					usi_js.cleanup();
				}
				if (usi_app.is_suppressed) {
					return usi_commons.log("usi_app.load is suppressed");
				}
				if (!usi_app.is_pdp_page && !usi_cookies.value_exists("usi_prod_pid_1")) {
					return usi_commons.log("usi_app.load: no product data available");
				}
				
				usi_company.load_campaigns(usi_company_json);
				
			} catch(err) {
				usi_commons.report_error(err);
			}
		};
		
		usi_app.apply_coupon = function() {
			try {
				usi_commons.log("usi_app.apply_coupon()");
				var coupon_input = null;
				var coupon_button = null;

				if (usi_app.is_pdp_page) {
					var container = document.querySelector('[data-purpose="redeem-coupon-container"]');
					if (container) {
						coupon_input = container.querySelector('[data-purpose="coupon-input"]');
						coupon_button = container.querySelector('form button[type="submit"]');
					}
					if (!coupon_input) {
						var show_btn = document.querySelector('[data-purpose="show-coupon-form"]');
						if (show_btn && !show_btn.disabled) show_btn.click();
					}
				} else if (usi_app.is_checkout_page) {
					var section = document.querySelector('[data-testid="coupon-section"]');
					if (section) {
						coupon_input = section.querySelector('[data-purpose="coupon-input"]');
						coupon_button = section.querySelector('[data-purpose="coupon-submit"]');
						if (!coupon_input) {
							var toggle_btn = section.querySelector('button');
							if (toggle_btn) toggle_btn.click();
						}
					}
				}

				if (coupon_input !== null && coupon_button !== null) {
					var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
						window.HTMLInputElement.prototype, 'value').set;
					nativeInputValueSetter.call(coupon_input, usi_app.coupon);
					coupon_input.dispatchEvent(new Event('input', { bubbles: true }));
					coupon_input.dispatchEvent(new Event('change', { bubbles: true }));
					coupon_button.click();
					usi_cookies.set("usi_coupon_applied", usi_app.coupon, usi_cookies.expire_time.week);
					usi_cookies.del("usi_coupon");
					usi_app.coupon = "";
					usi_commons.log("Coupon applied");
				} else {
					if (usi_app.coupon_attempts == undefined) {
						usi_app.coupon_attempts = 0;
					} else if (usi_app.coupon_attempts >= 5) {
						usi_commons.report_error("Coupon elements not found");
						return;
					}
					usi_app.coupon_attempts++;
					usi_commons.log("Coupon elements missing, trying again. Tries: " + usi_app.coupon_attempts);
					setTimeout(usi_app.apply_coupon, 1000);
				}
			} catch(err) {
				usi_commons.report_error(err);
			}
		};
		
		
		usi_app.start_pdp_monitor = function(){
			try {
				usi_commons.log("usi_app.start_pdp_monitor()");
				usi_app.monitor_pdp = function() {
					try {
						if (usi_app.is_pdp_page) {
							var product = usi_app.scrape_pdp();
							if (product && product.name && product.pid) {
								var stored_pid = usi_cookies.get("usi_prod_pid_1");
								if (stored_pid !== product.pid || JSON.stringify(usi_app.current_product) !== JSON.stringify(product)) {
									usi_app.current_product = product;
									usi_app.save_cart(product);
									usi_app.load();
								}
							}
						}
						return setTimeout(usi_app.monitor_pdp, 1000);
					} catch(err) {
						usi_commons.report_error(err);
					}
				};
				if (!usi_app.pdp_timeout) {
					usi_app.pdp_timeout = usi_app.monitor_pdp();
				}
			} catch(err) {
				usi_commons.report_error(err);
			}
		};
		
		usi_app.save_cart = function(product){
			try {
				usi_commons.log("usi_app.save_cart()");
				var cart_prefix = "usi_prod_";
				usi_cookies.flush("usi_subtotal");
				usi_cookies.flush(cart_prefix);

				if (product && product.pid) {
					usi_commons.log(product);
					usi_cookies.set("usi_subtotal", product.price || "", usi_cookies.expire_time.week);
					usi_cookies.set("usi_pids", product.pid, usi_cookies.expire_time.week);
					for (var prop in product) {
						if (product.hasOwnProperty(prop)) {
							usi_cookies.set(cart_prefix + prop + "_1", product[prop], usi_cookies.expire_time.week);
						}
					}
				}
			} catch(err) {
				usi_commons.report_error(err);
			}
		};
		usi_app.scrape_subtotal = function() {
			try {
				var sf = document.querySelector('[data-purpose="subscription-sticky-footer"]');
				var sp = sf ? sf.textContent.split('$') : [];
				if (sp[1]) return sp[1].split(' ')[0];
			} catch (err) {
				usi_commons.report_error(err);
			}
		};
		usi_app.scrape_pdp = function() {
			try {
				var product = {};
				var h1 = document.querySelector('h1');
				product.name = h1 ? h1.textContent.trim() : "";

				var img = document.querySelector('[aria-label="Play course preview"] img');
				var imgSrc = img ? img.src : "";
				var idMatch = imgSrc.match(/\/course\/[^\/]+\/(\d+_[^.?]+)/);
				var imgFile = idMatch ? idMatch[1] : "";
				product.pid = imgFile ? imgFile.split('_')[0] : "";
				product.image = imgFile ? "https://img-c.udemycdn.com/course/200_H/" + imgFile + ".jpg" : "";

				product.link = location.href;

				if (usi_commons.is_mobile) {
					var sf = document.querySelector('[class*="sticky-footer"]');
					var priceText = sf ? sf.textContent : "";
					var priceMatch = priceText.match(/$([\d.]+)/);
					product.price = priceMatch ? priceMatch[1] : "";
					if(product.price == ''){
						product.price = document.querySelector('span._title-price_42ifn_57').textContent.replace('$', '').trim()
					}
				} else {
					var sf = document.querySelector('[data-purpose="subscription-sticky-footer"]');
					var sp = sf ? sf.textContent.split('$') : [];
					product.price = sp[1] ? sp[1].split(' ')[0] : "";
				}

				var instructorLinks = document.querySelectorAll('a[href*="/user/"]');
				var instructors = [];
				for (var i = 0; i < instructorLinks.length && i < 3; i++) {
					var name = instructorLinks[i].textContent.trim();
					if (name && instructors.indexOf(name) === -1) instructors.push(name);
				}
				product.instructors = instructors.join(", ");

				var srRating = document.querySelector('[class*="star-wrapper"] .ud-sr-only');
				var ratingMatch = srRating ? srRating.textContent.match(/Rating:\s*([\d.]+)/) : null;
				product.rating = ratingMatch ? ratingMatch[1] : "";

				var ratingCountEl = document.querySelector('[class*="ratings-text"] .ud-btn-label');
				var rcMatch = ratingCountEl ? ratingCountEl.textContent.match(/([\d,]+)\s*ratings/) : null;
				product.rating_count = rcMatch ? rcMatch[1] : "";

				var statsEl = document.querySelector('[data-testid="curriculum-stats"]');
				var statsText = statsEl ? statsEl.textContent : "";
				var hoursMatch = statsText.match(/([\d.]+h?\s*[\d]*m?)\s*total/i);
				product.hours = hoursMatch ? hoursMatch[1].trim() : "";
				var lecturesMatch = statsText.match(/([\d,]+)\s*lectures/i);
				product.lectures = lecturesMatch ? lecturesMatch[1] : "";
				product.level = "All Levels";

				var ribbons = usi_dom.get_elements('[class*="ribbon"] [class*="ribbon"]');
				product.bestseller = "false";
				product.premium = "false";
				for (var r = 0; r < ribbons.length; r++) {
					var text = ribbons[r].textContent.trim();
					if (text === "Bestseller") product.bestseller = "true";
					if (text === "Premium") product.premium = "true";
				}
				if (product.premium === "false") {
					var badges = document.querySelectorAll('[class*="badge"]');
					for (var b = 0; b < badges.length; b++) {
						if (badges[b].textContent.trim() === "Premium") {
							product.premium = "true";
							break;
						}
					}
				}

				return product;
			} catch (err) {
				usi_commons.report_error(err);
			}
		};
		usi_app.check_for_change = function(){
			if (usi_app.current_page == undefined || usi_app.current_page != location.href) {
				usi_app.current_page = location.href;
				usi_dom.ready(function(){
					try {
						usi_app.main();
					} catch (err) {
						usi_commons.report_error(err);
					}
				});
				usi_commons.log("USI: running main");
			}
			setTimeout(usi_app.check_for_change, 1000);
		};
		if (!usi_app.check_for_change_timeout_id) {
			usi_app.check_for_change_timeout_id = setTimeout(usi_app.check_for_change, 1000);
		}
	} catch(err) {
		usi_commons.report_error(err);
	}
}
