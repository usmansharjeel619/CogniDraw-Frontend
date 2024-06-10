"use strict";(self.webpackChunkfrontends=self.webpackChunkfrontends||[]).push([[39],{4039:function(e,t,l){l.r(t),l.d(t,{diagram:function(){return x}});var n=l(4165),a=l(7762),i=l(5861),o=l(1413),r=l(3072),s=l(9913),d=l(8433),c=l(1319),u=l(297),f=(l(7892),l(504),l(8703),l(3529),l(6946),function(e){return c.e.sanitizeText(e,(0,c.c)())}),p={dividerMargin:10,padding:5,textHeight:10,curve:void 0},b=function(e,t,l,n){var a=Object.keys(e);c.l.info("keys:",a),c.l.info(e),a.forEach((function(a){var i,o,r,s=e[a],d={shape:"rect",id:s.id,domId:s.domId,labelText:f(s.id),labelStyle:"",style:"fill: none; stroke: black",padding:null!==(i=null==(o=(0,c.c)().flowchart)?void 0:o.padding)&&void 0!==i?i:null==(r=(0,c.c)().class)?void 0:r.padding};t.setNode(s.id,d),y(s.classes,t,l,n,s.id),c.l.info("setNode",d)}))},y=function(e,t,l,n,a){var i=Object.keys(e);c.l.info("keys:",i),c.l.info(e),i.filter((function(t){return e[t].parent==a})).forEach((function(l){var i,o,r,s,d=e[l],u=d.cssClasses.join(" "),p=(0,c.k)(d.styles),b=null!==(i=d.label)&&void 0!==i?i:d.id,y={labelStyle:p.labelStyle,shape:"class_box",labelText:f(b),classData:d,rx:0,ry:0,class:u,style:p.style,id:d.id,domId:d.domId,tooltip:n.db.getTooltip(d.id,a)||"",haveCallback:d.haveCallback,link:d.link,width:"group"===d.type?500:void 0,type:d.type,padding:null!==(o=null==(r=(0,c.c)().flowchart)?void 0:r.padding)&&void 0!==o?o:null==(s=(0,c.c)().class)?void 0:s.padding};t.setNode(d.id,y),a&&t.setParent(d.id,a),c.l.info("setNode",y)}))},v=function(e,t,l,n){c.l.info(e),e.forEach((function(e,a){var i,o,r,d=e,u="",b="",y=d.text,v={labelStyle:u,shape:"note",labelText:f(y),noteData:d,rx:0,ry:0,class:"",style:b,id:d.id,domId:d.id,tooltip:"",type:"note",padding:null!==(i=null==(o=(0,c.c)().flowchart)?void 0:o.padding)&&void 0!==i?i:null==(r=(0,c.c)().class)?void 0:r.padding};if(t.setNode(d.id,v),c.l.info("setNode",v),d.class&&d.class in n){var g=l+a,h={id:"edgeNote".concat(g),classes:"relation",pattern:"dotted",arrowhead:"none",startLabelRight:"",endLabelLeft:"",arrowTypeStart:"none",arrowTypeEnd:"none",style:"fill:none",labelStyle:"",curve:(0,c.n)(p.curve,s.c_6)};t.setEdge(d.id,d.class,h,g)}}))},g=function(e,t){var l=(0,c.c)().flowchart,n=0;e.forEach((function(e){var a;n++;var i,o={classes:"relation",pattern:1==e.relation.lineType?"dashed":"solid",id:"id_".concat(e.id1,"_").concat(e.id2,"_").concat(n),arrowhead:"arrow_open"===e.type?"none":"normal",startLabelRight:"none"===e.relationTitle1?"":e.relationTitle1,endLabelLeft:"none"===e.relationTitle2?"":e.relationTitle2,arrowTypeStart:w(e.relation.type1),arrowTypeEnd:w(e.relation.type2),style:"fill:none",labelStyle:"",curve:(0,c.n)(null==l?void 0:l.curve,s.c_6)};if(c.l.info(o,e),void 0!==e.style){var r=(0,c.k)(e.style);o.style=r.style,o.labelStyle=r.labelStyle}(e.text=e.title,void 0===e.text)?void 0!==e.style&&(o.arrowheadStyle="fill: #333"):(o.arrowheadStyle="fill: #333",o.labelpos="c",(null!==(i=null==(a=(0,c.c)().flowchart)?void 0:a.htmlLabels)&&void 0!==i?i:(0,c.c)().htmlLabels)?(o.labelType="html",o.label='<span class="edgeLabel">'+e.text+"</span>"):(o.labelType="text",o.label=e.text.replace(c.e.lineBreakRegex,"\n"),void 0===e.style&&(o.style=o.style||"stroke: #333; stroke-width: 1.5px;fill:none"),o.labelStyle=o.labelStyle.replace("color:","fill:")));t.setEdge(e.id1,e.id2,o,n)}))},h=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(t,l,i,o){var r,f,p,h,w,k,x,m,T,S,L,E,N,D,C,A,_,Z,I,M,B,R,j,Y;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.l.info("Drawing class - ",l),w=null!==(r=(0,c.c)().flowchart)&&void 0!==r?r:(0,c.c)().class,k=(0,c.c)().securityLevel,c.l.info("config:",w),x=null!==(f=null==w?void 0:w.nodeSpacing)&&void 0!==f?f:50,m=null!==(p=null==w?void 0:w.rankSpacing)&&void 0!==p?p:50,T=new d.k({multigraph:!0,compound:!0}).setGraph({rankdir:o.db.getDirection(),nodesep:x,ranksep:m,marginx:8,marginy:8}).setDefaultEdgeLabel((function(){return{}})),S=o.db.getNamespaces(),L=o.db.getClasses(),E=o.db.getRelations(),N=o.db.getNotes(),c.l.info(E),b(S,T,l,o),y(L,T,l,o),g(E,T),v(N,T,E.length+1,L),"sandbox"===k&&(D=(0,s.Ys)("#i"+l)),C="sandbox"===k?(0,s.Ys)(D.nodes()[0].contentDocument.body):(0,s.Ys)("body"),A=C.select('[id="'.concat(l,'"]')),_=C.select("#"+l+" g"),e.next=22,(0,u.r)(_,T,["aggregation","extension","composition","dependency","lollipop"],"classDiagram",l);case 22:if(c.u.insertTitle(A,"classTitleText",null!==(h=null==w?void 0:w.titleTopMargin)&&void 0!==h?h:5,o.db.getDiagramTitle()),(0,c.o)(T,A,null==w?void 0:w.diagramPadding,null==w?void 0:w.useMaxWidth),!(null==w?void 0:w.htmlLabels)){Z="sandbox"===k?D.nodes()[0].contentDocument:document,I=Z.querySelectorAll('[id="'+l+'"] .edgeLabel .label'),M=(0,a.Z)(I);try{for(M.s();!(B=M.n()).done;)R=B.value,j=R.getBBox(),(Y=Z.createElementNS("http://www.w3.org/2000/svg","rect")).setAttribute("rx",0),Y.setAttribute("ry",0),Y.setAttribute("width",j.width),Y.setAttribute("height",j.height),R.insertBefore(Y,R.firstChild)}catch(t){M.e(t)}finally{M.f()}}case 25:case"end":return e.stop()}}),e)})));return function(t,l,n,a){return e.apply(this,arguments)}}();function w(e){var t;switch(e){case 0:t="aggregation";break;case 1:t="extension";break;case 2:t="composition";break;case 3:t="dependency";break;case 4:t="lollipop";break;default:t="none"}return t}var k={setConf:function(e){p=(0,o.Z)((0,o.Z)({},p),e)},draw:h},x={parser:r.p,db:r.d,renderer:k,styles:r.s,init:function(e){e.class||(e.class={}),e.class.arrowMarkerAbsolute=e.arrowMarkerAbsolute,r.d.clear()}}}}]);
//# sourceMappingURL=39.089d844f.chunk.js.map