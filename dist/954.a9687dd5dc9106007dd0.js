"use strict";(self.webpackChunkcomplex_react_app=self.webpackChunkcomplex_react_app||[]).push([[954],{954:(e,t,s)=>{s.r(t),s.d(t,{default:()=>o});var a=s(540),r=s(306),l=s(643),c=s(83),n=s(479);function o(){const e=(0,a.useContext)(r.A),[t,s]=(0,l.e)({searchTerm:"",results:[],show:"neither",requestCount:0});function o(t){27==t.keyCode&&e({type:"closeSearch"})}return(0,a.useEffect)((()=>(document.addEventListener("keyup",o),()=>document.removeEventListener("keyup",o))),[]),(0,a.useEffect)((()=>{if(t.searchTerm.trim()){s((e=>{e.show="loading"}));const e=setTimeout((()=>{s((e=>{e.requestCount++}))}),750);return()=>clearTimeout(e)}s((e=>{e.show="neither"}))}),[t.searchTerm]),(0,a.useEffect)((()=>{if(t.requestCount){const e=new AbortController;async function a(){try{const a=await c.A.post("/search",{searchTerm:t.searchTerm},{signal:e.signal});s((e=>{e.results=a.data,e.show="results"}))}catch(e){console.log("There was a problem in ProfilePost or the request was cancelled")}}return a(),()=>{e.abort()}}}),[t.requestCount]),a.createElement(a.Fragment,null,a.createElement("div",{className:"search-overlay-top shadow-sm"},a.createElement("div",{className:"container container--narrow"},a.createElement("label",{htmlFor:"live-search-field",className:"search-overlay-icon"},a.createElement("i",{className:"fas fa-search"})),a.createElement("input",{onChange:function(e){const t=e.target.value;s((e=>{e.searchTerm=t}))},autoFocus:!0,type:"text",autoComplete:"off",id:"live-search-field",className:"live-search-field",placeholder:"What are you interested in?"}),a.createElement("span",{onClick:()=>e({type:"closeSearch"}),className:"close-live-search"},a.createElement("i",{className:"fas fa-times-circle"})))),a.createElement("div",{className:"search-overlay-bottom"},a.createElement("div",{className:"container container--narrow py-3"},a.createElement("div",{className:"circle-loader "+("loading"==t.show?"circle-loader--visible":"")}),a.createElement("div",{className:"live-search-results "+("results"==t.show?"live-search-results--visible":"")},Boolean(t.results.length)&&a.createElement("div",{className:"list-group shadow-sm"},a.createElement("div",{className:"list-group-item active"},a.createElement("strong",null,"Search Results")," (",t.results.length," ",t.results.length>1?"items":"item"," found)"),t.results.map((t=>a.createElement(n.A,{post:t,onClick:()=>e({type:"closeSearch"})})))),!Boolean(t.results.length)&&a.createElement("p",{className:"alert alert-danger text-center shadow-sm"},"Sorry, we could not find any results for that search.")))))}}}]);