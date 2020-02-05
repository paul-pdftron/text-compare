/*!

 diff v4.0.1

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).Diff={})}(this,function(e){"use strict";function t(){}function g(e,n,t,r,i){for(var o=0,s=n.length,l=0,a=0;o<s;o++){var u=n[o];if(u.removed){if(u.value=e.join(r.slice(a,a+u.count)),a+=u.count,o&&n[o-1].added){var f=n[o-1];n[o-1]=n[o],n[o]=f}}else{if(!u.added&&i){var d=t.slice(l,l+u.count);d=d.map(function(e,n){var t=r[a+n];return t.length>e.length?t:e}),u.value=e.join(d)}else u.value=e.join(t.slice(l,l+u.count));l+=u.count,u.added||(a+=u.count)}}var c=n[s-1];return 1<s&&"string"==typeof c.value&&(c.added||c.removed)&&e.equals("",c.value)&&(n[s-2].value+=c.value,n.pop()),n}t.prototype={diff:function(a,u){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=e.callback;"function"==typeof e&&(n=e,e={}),this.options=e;var f=this;function d(e){return n?(setTimeout(function(){n(void 0,e)},0),!0):e}a=this.castInput(a),u=this.castInput(u),a=this.removeEmpty(this.tokenize(a));var c=(u=this.removeEmpty(this.tokenize(u))).length,h=a.length,p=1,t=c+h,v=[{newPos:-1,components:[]}],r=this.extractCommon(v[0],u,a,0);if(v[0].newPos+1>=c&&h<=r+1)return d([{value:this.join(u),count:u.length}]);function i(){for(var e=-1*p;e<=p;e+=2){var n=void 0,t=v[e-1],r=v[e+1],i=(r?r.newPos:0)-e;t&&(v[e-1]=void 0);var o=t&&t.newPos+1<c,s=r&&0<=i&&i<h;if(o||s){if(!o||s&&t.newPos<r.newPos?(n={newPos:(l=r).newPos,components:l.components.slice(0)},f.pushComponent(n.components,void 0,!0)):((n=t).newPos++,f.pushComponent(n.components,!0,void 0)),i=f.extractCommon(n,u,a,e),n.newPos+1>=c&&h<=i+1)return d(g(f,n.components,u,a,f.useLongestToken));v[e]=n}else v[e]=void 0}var l;p++}if(n)!function e(){setTimeout(function(){if(t<p)return n();i()||e()},0)}();else for(;p<=t;){var o=i();if(o)return o}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,s=e.newPos,l=s-r,a=0;s+1<i&&l+1<o&&this.equals(n[s+1],t[l+1]);)s++,l++,a++;return a&&e.components.push({count:a}),e.newPos=s,l},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var r=new t;function i(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}var o=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,s=/\S/,l=new t;l.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!s.test(e)&&!s.test(n)},l.tokenize=function(e){for(var n=e.split(/(\s+|[()[\]{}'"]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&o.test(n[t])&&o.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var a=new t;function u(e,n,t){return a.diff(e,n,t)}a.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n};var f=new t;f.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var d=new t;function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}d.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var h=Object.prototype.toString,p=new t;function v(e,n,t,r,i){var o,s;for(n=n||[],t=t||[],r&&(e=r(i,e)),o=0;o<n.length;o+=1)if(n[o]===e)return t[o];if("[object Array]"===h.call(e)){for(n.push(e),s=new Array(e.length),t.push(s),o=0;o<e.length;o+=1)s[o]=v(e[o],n,t,r,i);return n.pop(),t.pop(),s}if(e&&e.toJSON&&(e=e.toJSON()),"object"===c(e)&&null!==e){n.push(e),s={},t.push(s);var l,a=[];for(l in e)e.hasOwnProperty(l)&&a.push(l);for(a.sort(),o=0;o<a.length;o+=1)s[l=a[o]]=v(e[l],n,t,r,l);n.pop(),t.pop()}else s=e;return s}p.useLongestToken=!0,p.tokenize=a.tokenize,p.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(v(e,null,null,i),i,"  ")},p.equals=function(e,n){return t.prototype.equals.call(p,e.replace(/,([\r\n])/g,"$1"),n.replace(/,([\r\n])/g,"$1"))};var m=new t;function z(e){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},l=e.split(/\r\n|[\n\v\f\r\x85]/),a=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],u=0;function n(){var e={};for(i.push(e);u<l.length;){var n=l[u];if(/^(\-\-\-|\+\+\+|@@)\s/.test(n))break;var t=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(n);t&&(e.index=t[1]),u++}for(o(e),o(e),e.hunks=[];u<l.length;){var r=l[u];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(r))break;if(/^@@/.test(r))e.hunks.push(f());else{if(r&&s.strict)throw new Error("Unknown line "+(u+1)+" "+JSON.stringify(r));u++}}}function o(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(l[u]);if(n){var t="---"===n[1]?"old":"new",r=n[2].split("\t",2),i=r[0].replace(/\\\\/g,"\\");/^".*"$/.test(i)&&(i=i.substr(1,i.length-2)),e[t+"FileName"]=i,e[t+"Header"]=(r[1]||"").trim(),u++}}function f(){for(var e=u,n=l[u++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),t={oldStart:+n[1],oldLines:+n[2]||1,newStart:+n[3],newLines:+n[4]||1,lines:[],linedelimiters:[]},r=0,i=0;u<l.length&&!(0===l[u].indexOf("--- ")&&u+2<l.length&&0===l[u+1].indexOf("+++ ")&&0===l[u+2].indexOf("@@"));u++){var o=0==l[u].length&&u!=l.length-1?" ":l[u][0];if("+"!==o&&"-"!==o&&" "!==o&&"\\"!==o)break;t.lines.push(l[u]),t.linedelimiters.push(a[u]||"\n"),"+"===o?r++:"-"===o?i++:" "===o&&(r++,i++)}if(r||1!==t.newLines||(t.newLines=0),i||1!==t.oldLines||(t.oldLines=0),s.strict){if(r!==t.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(i!==t.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return t}for(;u<l.length;)n();return i}function E(n,t,r){var i=!0,o=!1,s=!1,l=1;return function e(){if(i&&!s){if(o?l++:i=!1,n+l<=r)return l;s=!0}if(!o)return s||(i=!0),t<=n-l?-l++:(o=!0,e())}}function w(e,n){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=z(n)),Array.isArray(n)){if(1<n.length)throw new Error("applyPatch only works with a single input.");n=n[0]}var r,i,s=e.split(/\r\n|[\n\v\f\r\x85]/),o=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],l=n.hunks,a=t.compareLine||function(e,n,t,r){return n===r},u=0,f=t.fuzzFactor||0,d=0,c=0;function h(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=0<r.length?r[0]:" ",o=0<r.length?r.substr(1):r;if(" "===i||"-"===i){if(!a(n+1,s[n],i,o)&&f<++u)return!1;n++}}return!0}for(var p=0;p<l.length;p++){for(var v=l[p],g=s.length-v.oldLines,m=0,w=c+v.oldStart-1,y=E(w,d,g);void 0!==m;m=y())if(h(v,w+m)){v.offset=c+=m;break}if(void 0===m)return!1;d=v.offset+v.oldStart+v.oldLines}for(var x=0,L=0;L<l.length;L++){var S=l[L],k=S.oldStart+S.offset+x-1;x+=S.newLines-S.oldLines,k<0&&(k=0);for(var b=0;b<S.lines.length;b++){var F=S.lines[b],N=0<F.length?F[0]:" ",H=0<F.length?F.substr(1):F,P=S.linedelimiters[b];if(" "===N)k++;else if("-"===N)s.splice(k,1),o.splice(k,1);else if("+"===N)s.splice(k,0,H),o.splice(k,0,P),k++;else if("\\"===N){var C=S.lines[b-1]?S.lines[b-1][0]:null;"+"===C?r=!0:"-"===C&&(i=!0)}}}if(r)for(;!s[s.length-1];)s.pop(),o.pop();else i&&(s.push(""),o.push("\n"));for(var j=0;j<s.length-1;j++)s[j]=s[j]+o[j];return s.join("")}function y(e,n,c,h,t,r,p){p||(p={}),void 0===p.context&&(p.context=4);var v=u(c,h,p);function g(e){return e.map(function(e){return" "+e})}v.push({value:"",lines:[]});for(var m=[],w=0,y=0,x=[],L=1,S=1,i=function(e){var n=v[e],t=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=t,n.added||n.removed){var r;if(!w){var i=v[e-1];w=L,y=S,i&&(x=0<p.context?g(i.lines.slice(-p.context)):[],w-=x.length,y-=x.length)}(r=x).push.apply(r,k(t.map(function(e){return(n.added?"+":"-")+e}))),n.added?S+=t.length:L+=t.length}else{if(w)if(t.length<=2*p.context&&e<v.length-2){var o;(o=x).push.apply(o,k(g(t)))}else{var s,l=Math.min(t.length,p.context);(s=x).push.apply(s,k(g(t.slice(0,l))));var a={oldStart:w,oldLines:L-w+l,newStart:y,newLines:S-y+l,lines:x};if(e>=v.length-2&&t.length<=p.context){var u=/\n$/.test(c),f=/\n$/.test(h),d=0==t.length&&x.length>a.oldLines;!u&&d&&x.splice(a.oldLines,0,"\\ No newline at end of file"),(u||d)&&f||x.push("\\ No newline at end of file")}m.push(a),y=w=0,x=[]}L+=t.length,S+=t.length}},o=0;o<v.length;o++)i(o);return{oldFileName:e,newFileName:n,oldHeader:t,newHeader:r,hunks:m}}function x(e,n,t,r,i,o,s){var l=y(e,n,t,r,i,o,s),a=[];e==n&&a.push("Index: "+e),a.push("==================================================================="),a.push("--- "+l.oldFileName+(void 0===l.oldHeader?"":"\t"+l.oldHeader)),a.push("+++ "+l.newFileName+(void 0===l.newHeader?"":"\t"+l.newHeader));for(var u=0;u<l.hunks.length;u++){var f=l.hunks[u];a.push("@@ -"+f.oldStart+","+f.oldLines+" +"+f.newStart+","+f.newLines+" @@"),a.push.apply(a,f.lines)}return a.join("\n")+"\n"}function L(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function S(e){var n=function r(e){var i=0;var o=0;e.forEach(function(e){if("string"!=typeof e){var n=r(e.mine),t=r(e.theirs);void 0!==i&&(n.oldLines===t.oldLines?i+=n.oldLines:i=void 0),void 0!==o&&(n.newLines===t.newLines?o+=n.newLines:o=void 0)}else void 0===o||"+"!==e[0]&&" "!==e[0]||o++,void 0===i||"-"!==e[0]&&" "!==e[0]||i++});return{oldLines:i,newLines:o}}(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}function b(e,n){if("string"!=typeof e)return e;if(/^@@/m.test(e)||/^Index:/m.test(e))return z(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return y(void 0,void 0,n,e)}function F(e){return e.newFileName&&e.newFileName!==e.oldFileName}function N(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function H(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function P(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function C(e,n,t,r,i){var o={offset:n,lines:t,index:0},s={offset:r,lines:i,index:0};for(I(e,o,s),I(e,s,o);o.index<o.lines.length&&s.index<s.lines.length;){var l=o.lines[o.index],a=s.lines[s.index];if("-"!==l[0]&&"+"!==l[0]||"-"!==a[0]&&"+"!==a[0])if("+"===l[0]&&" "===a[0]){var u;(u=e.lines).push.apply(u,k($(o)))}else if("+"===a[0]&&" "===l[0]){var f;(f=e.lines).push.apply(f,k($(s)))}else"-"===l[0]&&" "===a[0]?O(e,o,s):"-"===a[0]&&" "===l[0]?O(e,s,o,!0):l===a?(e.lines.push(l),o.index++,s.index++):A(e,$(o),$(s));else j(e,o,s)}T(e,o),T(e,s),S(e)}function j(e,n,t){var r,i,o=$(n),s=$(t);if(q(o)&&q(s)){var l,a;if(L(o,s)&&M(t,o,o.length-s.length))return void(l=e.lines).push.apply(l,k(o));if(L(s,o)&&M(n,s,s.length-o.length))return void(a=e.lines).push.apply(a,k(s))}else if(i=s,(r=o).length===i.length&&L(r,i)){var u;return void(u=e.lines).push.apply(u,k(o))}A(e,o,s)}function O(e,n,t,r){var i,o=$(n),s=function(e,n){var t=[],r=[],i=0,o=!1,s=!1;for(;i<n.length&&e.index<e.lines.length;){var l=e.lines[e.index],a=n[i];if("+"===a[0])break;if(o=o||" "!==l[0],r.push(a),i++,"+"===l[0])for(s=!0;"+"===l[0];)t.push(l),l=e.lines[++e.index];a.substr(1)===l.substr(1)?(t.push(l),e.index++):s=!0}"+"===(n[i]||"")[0]&&o&&(s=!0);if(s)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);s.merged?(i=e.lines).push.apply(i,k(s.merged)):A(e,r?s:o,r?o:s)}function A(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function I(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function T(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function $(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function q(e){return e.reduce(function(e,n){return e&&"-"===n[0]},!0)}function M(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}m.tokenize=function(e){return e.slice()},m.join=m.removeEmpty=function(e){return e},e.Diff=t,e.diffChars=function(e,n,t){return r.diff(e,n,t)},e.diffWords=function(e,n,t){return t=i(t,{ignoreWhitespace:!0}),l.diff(e,n,t)},e.diffWordsWithSpace=function(e,n,t){return l.diff(e,n,t)},e.diffLines=u,e.diffTrimmedLines=function(e,n,t){var r=i(t,{ignoreWhitespace:!0});return a.diff(e,n,r)},e.diffSentences=function(e,n,t){return f.diff(e,n,t)},e.diffCss=function(e,n,t){return d.diff(e,n,t)},e.diffJson=function(e,n,t){return p.diff(e,n,t)},e.diffArrays=function(e,n,t){return m.diff(e,n,t)},e.structuredPatch=y,e.createTwoFilesPatch=x,e.createPatch=function(e,n,t,r,i,o){return x(e,e,n,t,r,i,o)},e.applyPatch=w,e.applyPatches=function(e,o){"string"==typeof e&&(e=z(e));var n=0;!function r(){var i=e[n++];if(!i)return o.complete();o.loadFile(i,function(e,n){if(e)return o.complete(e);var t=w(n,i,o);o.patched(i,t,function(e){if(e)return o.complete(e);r()})})}()},e.parsePatch=z,e.merge=function(e,n,t){e=b(e,t),n=b(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index),(e.newFileName||n.newFileName)&&(F(e)?F(n)?(r.oldFileName=N(r,e.oldFileName,n.oldFileName),r.newFileName=N(r,e.newFileName,n.newFileName),r.oldHeader=N(r,e.oldHeader,n.oldHeader),r.newHeader=N(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader)),r.hunks=[];for(var i=0,o=0,s=0,l=0;i<e.hunks.length||o<n.hunks.length;){var a=e.hunks[i]||{oldStart:1/0},u=n.hunks[o]||{oldStart:1/0};if(H(a,u))r.hunks.push(P(a,s)),i++,l+=a.newLines-a.oldLines;else if(H(u,a))r.hunks.push(P(u,l)),o++,s+=u.newLines-u.oldLines;else{var f={oldStart:Math.min(a.oldStart,u.oldStart),oldLines:0,newStart:Math.min(a.newStart+s,u.oldStart+l),newLines:0,lines:[]};C(f,a.oldStart,a.lines,u.oldStart,u.lines),o++,i++,r.hunks.push(f)}}return r},e.convertChangesToDMP=function(e){for(var n,t,r=[],i=0;i<e.length;i++)t=(n=e[i]).added?1:n.removed?-1:0,r.push([t,n.value]);return r},e.convertChangesToXML=function(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];r.added?n.push("<ins>"):r.removed&&n.push("<del>"),n.push((i=r.value,void 0,i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"))),r.added?n.push("</ins>"):r.removed&&n.push("</del>")}var i;return n.join("")},e.canonicalize=v,Object.defineProperty(e,"__esModule",{value:!0})});