"use strict";(self.webpackChunkrelevent=self.webpackChunkrelevent||[]).push([[569],{5569:(I,u,r)=>{r.r(u),r.d(u,{EventsModule:()=>v});var g=r(6895),p=r(5964),f=r(5698),e=r(1571);class y{constructor(t){this.imgUrl=t.imgUrl,this.title=t.title,this.id=`xz${Math.floor(1e6*Math.random())}xz`}}var C=r(1135),E=r(3900),m=r(4004);class c{constructor(){this._eventsBehSubj=new C.X([]),this.onInit()}get events$(){return this._eventsBehSubj.asObservable()}onInit(){const t=localStorage.getItem("event-concerts");if(null!==t){const n=JSON.parse(t);this._eventsBehSubj.next(n)}else this.create4EventConcerts()}create4EventConcerts(){this.create({imgUrl:"assets/img/valery.jpg",title:"Valery Meladze"}),this.create({imgUrl:"assets/img/evgeny_grinko.jfif",title:"Evgeny Grinko"}),this.create({imgUrl:"assets/img/onegin.jfif",title:"Eugene Onegin"}),this.create({imgUrl:"assets/img/edis.jfif",title:"Edis"})}create(t){const n=new y(t),o=this._eventsBehSubj.getValue().concat(n);return this._eventsBehSubj.next(o),localStorage.setItem("event-concerts",JSON.stringify(o)),n}getEventConcertsByUser(t){return t.pipe((0,E.w)(n=>null!==n?this.mapEventConcertsByUser(n):this._eventsBehSubj.pipe((0,m.U)(o=>o.map(i=>({...i,buyed:!1}))))))}mapEventConcertsByUser(t){return this._eventsBehSubj.pipe((0,m.U)(n=>n.map(o=>{const i=t.addedEventConcerts.find(l=>l.id===o.id);if(void 0!==i){const l=Object.assign({},i);return l.buyed=!0,l}return o.buyed=!1,o})))}}c.\u0275fac=function(t){return new(t||c)},c.\u0275prov=e.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"});var S=r(384),U=r(6391),x=r(6290),B=r(6526),h=r(4859);function j(s,t){if(1&s){const n=e.EpF();e.ynx(0),e.TgZ(1,"div",9),e._UZ(2,"img",10),e.TgZ(3,"div",11),e._uU(4),e.qZA(),e.TgZ(5,"button",12),e.NdJ("click",function(){const l=e.CHM(n).$implicit,T=e.oxw(3);return e.KtG(T.addEventConcertToUser(l))}),e._uU(6),e.qZA()(),e.BQk()}if(2&s){const n=t.$implicit;e.xp6(1),e.uIk("data-card-id",n.id),e.xp6(1),e.Q6J("src",n.imgUrl,e.LSH),e.xp6(2),e.hij(" ",n.title," "),e.xp6(1),e.Q6J("disabled",n.buyed),e.xp6(1),e.hij(" ",n.buyed?"Purchased":"Buy"," ")}}function b(s,t){if(1&s&&(e.ynx(0),e.YNc(1,j,7,5,"ng-container",8),e.BQk()),2&s){const n=e.oxw().ngIf;e.xp6(1),e.Q6J("ngForOf",n)}}function O(s,t){if(1&s&&(e.ynx(0),e.YNc(1,b,2,1,"ng-container",7),e.BQk()),2&s){const n=t.ngIf;e.xp6(1),e.Q6J("ngIf",0!==n.length)}}class d{constructor(t,n,o){this.eventsService=t,this.authService=n,this.userService=o,this.eventConcerts$=this.eventsService.getEventConcertsByUser(this.authService.user$),this.user$=this.authService.user$}addEventConcertToUser(t){this.user$.pipe((0,f.q)(1)).subscribe(n=>{if(null!==n){const o=Object.assign({},t);delete o.buyed;const i=this.userService.addEventConcertByUserEmail(n,o);null!==i&&(this.authService.updateUser(i),t.buyed=!0)}})}}d.\u0275fac=function(t){return new(t||d)(e.Y36(c),e.Y36(S.e),e.Y36(U.K))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-page-events"]],decls:10,vars:3,consts:[[1,"page"],[1,"header"],[1,"main"],[1,"section","section_events"],[1,"container"],[1,"events"],[1,"event-card-wrapper"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"event-card"],[1,"event-card__img",3,"src"],[1,"event-card__title"],["mat-raised-button","","color","primary",3,"disabled","click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"app-header",1),e.TgZ(2,"main",2)(3,"section",3)(4,"div",4)(5,"div",5)(6,"div",6),e.YNc(7,O,2,1,"ng-container",7),e.ALo(8,"async"),e.qZA()()()()(),e._UZ(9,"app-footer"),e.qZA()),2&t&&(e.xp6(7),e.Q6J("ngIf",e.lcZ(8,1,n.eventConcerts$)))},dependencies:[g.sg,g.O5,x.G,B.c,h.lW,g.Ov],styles:[".section_events[_ngcontent-%COMP%]{padding:40px 0}.event-card-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,200px);justify-content:center;gap:50px}.event-card[_ngcontent-%COMP%]{display:grid;grid-auto-rows:auto;place-items:start;gap:10px}"]});const M=[{path:"",component:d}];class a{}a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[p.Bz.forChild(M),p.Bz]});var Z=r(9718),P=r(2735);class v{}v.\u0275fac=function(t){return new(t||v)},v.\u0275mod=e.oAB({type:v}),v.\u0275inj=e.cJS({imports:[g.ez,a,Z.O,P._,h.ot]})}}]);