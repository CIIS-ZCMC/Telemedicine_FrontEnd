import{y as j,g as o,j as r,i as m,k as p,o as S,E as v,m as T,J as _,K as h,L as k,S as N,P as f,B as G,N as P,T as x}from"./index-47ee9e37.js";var[W,y]=j("Card"),V=o(function(s,a){const{className:t,...n}=s,i=y();return r.jsx(m.div,{ref:a,className:p("chakra-card__body",t),__css:i.body,...n})}),$=o(function(s,a){const{className:t,...n}=s,i=y();return r.jsx(m.div,{ref:a,className:p("chakra-card__header",t),__css:i.header,...n})}),E=o(function(s,a){const{className:t,children:n,direction:i="column",justify:d,align:c,...u}=S(s),l=v("Card",s);return r.jsx(m.div,{ref:a,className:p("chakra-card",t),__css:{display:"flex",flexDirection:i,justifyContent:d,alignItems:c,position:"relative",minWidth:0,wordWrap:"break-word",...l.container},...u,children:r.jsx(W,{value:l,children:n})})}),b=o(function(s,a){const{columns:t,spacingX:n,spacingY:i,spacing:d,minChildWidth:c,...u}=s,l=T(),C=c?B(c,l):z(t);return r.jsx(_,{ref:a,gap:d,columnGap:n,rowGap:i,templateColumns:C,...u})});b.displayName="SimpleGrid";function w(e){return typeof e=="number"?`${e}px`:e}function B(e,s){return h(e,a=>{const t=k("sizes",a,w(a))(s);return a===null?null:`repeat(auto-fit, minmax(${t}, 1fr))`})}function z(e){return h(e,s=>s===null?null:`repeat(${s}, minmax(0, 1fr))`)}var g=o((e,s)=>r.jsx(N,{align:"center",...e,direction:"column",ref:s}));g.displayName="VStack";function H({title:e,sub_title:s}){return r.jsxs(g,{children:[r.jsxs(G,{display:"flex",gap:2,children:[r.jsx(P,{color:"orange",fontSize:20,fontWeight:600}),r.jsx(x,{fontSize:13,color:"orange",fontWeight:600,children:e})]}),r.jsx(x,{fontSize:22,fontWeight:600,mt:s?5:0,children:s})]})}H.propTypes={title:f.string,sub_title:f.string};export{E as C,b as S,H as T,g as V,$ as a,V as b};