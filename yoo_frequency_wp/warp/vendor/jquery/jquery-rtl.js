(function($){if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!String.prototype.trimComma){String.prototype.trimComma=function(){return this.replace(/^,+|,+$/g,"")}}if(!String.prototype.trimSemicolon){String.prototype.trimSemicolon=function(){return this.replace(/^;+|;+$/g,"")}}function quad(v,m){if((m=v.trim().split(/\s+/))&&m.length==4){return[m[0],m[3],m[2],m[1]].join(" ")}return v}function quad_radius(v){var m=v.trim().split(/\s+/);if(m&&m.length==4){return[m[1],m[0],m[3],m[2]].join(" ")}else if(m&&m.length==3){return[m[1],m[0],m[1],m[2]].join(" ")}return v}function direction(v){return v.match(/ltr/)?"rtl":v.match(/rtl/)?"ltr":v}function bracketCommaSplit(str){var parenthesisCount=0,lastSplit=0;arr=[];for(var i=0;i<str.length;++i){var c=str[i];parenthesisCount+=c=="("?1:c==")"?-1:0;if(c==","&&parenthesisCount===0||i==str.length-1){arr.push(str.substr(lastSplit,i-lastSplit+1).trim().trimComma().trim());lastSplit=i+1}}return arr}function rtltr(v){if(v.match(/left/))return"right";if(v.match(/right/))return"left";return v}function bgPosition(v){if(v.match(/\bleft\b/)){v=v.replace(/\bleft\b/,"right")}else if(v.match(/\bright\b/)){v=v.replace(/\bright\b/,"left")}var m=v.trim().split(/\s+/);if(m&&m.length==1&&v.match(/(\d+)([a-z]{2}|%)/)){v="right "+v}if(m&&m.length==2&&m[0].match(/\d+%/)){v=100-parseInt(m[0],10)+"% "+m[1]}pxmatch=m[0].match(/(\-?\d+)px/);if(m&&m.length==2&&pxmatch){var x=pxmatch[1];var minuxX=x=="0"?"0":parseInt(x,10)<0?x.substr(1)+"px":"-"+x+"px";v=minuxX+" "+m[1]}return v}function boxShadow(v){var shadowRtl=function(shadow){var found=false;var parts=shadow.split(" ");parts.forEach(function(el,i,arr){if(!found&&el.match(/\d/)){found=true;arr[i]=el[0]=="0"?0:el[0]=="-"?el.substr(1):"-"+el}});return parts.join(" ")};v=bracketCommaSplit(v).map(shadowRtl).join(",");return v}function backgroundImage(val){var parseSingle=function(v){if(v.substr(0,4)=="url("){return v}if(v.indexOf("gradient")!=-1){v=v.replace(/(left|right)/g,function($1){return $1==="left"?"right":"left"});v=v.replace(/(\d+deg)/,function(el){var num=parseInt(el.replace("deg",""),10);return 180-num+"deg"})}return v};return bracketCommaSplit(val).map(parseSingle).join(",")}function background(v){var parseSingle=function(v){v=v.replace(/url\((.*?)\)|none|([^\s]*?gradient.*?\(.+\))/i,backgroundImage);v=v.replace(/\s(left|right|center|top|bottom|-?\d+([a-zA-Z]{2}|%?))\s(left|right|center|top|bottom|-?\d+([a-zA-Z]{2}|%?))[;\s]?/i,function(el){var hadSemicolon=el.indexOf(";")>=0;el=el.trimSemicolon();return" "+bgPosition(el)+(hadSemicolon?";":" ")});return v};return bracketCommaSplit(v).map(parseSingle).join(",")}var propertyMap={"margin-left":"margin-right","margin-right":"margin-left","padding-left":"padding-right","padding-right":"padding-left","border-left":"border-right","border-right":"border-left","border-left-color":"border-right-color","border-right-color":"border-left-color","border-left-width":"border-right-width","border-right-width":"border-left-width","border-left-style":"border-right-style","border-right-style":"border-left-style","border-bottom-right-radius":"border-bottom-left-radius","border-bottom-left-radius":"border-bottom-right-radius","border-top-right-radius":"border-top-left-radius","border-top-left-radius":"border-top-right-radius",left:"right",right:"left"};var valueMap={padding:quad,margin:quad,"text-align":rtltr,"float":rtltr,clear:rtltr,direction:direction,"border-radius":quad_radius,"border-color":quad,"border-width":quad,"border-style":quad,"background-position":bgPosition,"box-shadow":boxShadow,background:background,"background-image":backgroundImage};function r2(css){return css.trim().replace(/\/\*[\s\S]+?\*\//g,"").replace(/[\n\r]/g,"").replace(/\s*([:;,{}])\s*/g,"$1").replace(/\s+/g," ").replace(/([^;:\{\}]+?)\:([^;:\{\}]+?)([;}])/gi,function(el,prop,val,end){var important=/!important/,isImportant=val.match(important);if(!prop||!val)return"";prop=propertyMap[prop]||prop;val=valueMap[prop]?valueMap[prop](val):val;if(!val.match(important)&&isImportant)val+="!important";return prop+":"+val+end})}$.rtl=$.rtl||function(){return{convert2RTL:r2}}()})(jQuery);