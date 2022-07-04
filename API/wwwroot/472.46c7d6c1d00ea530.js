"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[472],{2388:(f,v,a)=>{a.d(v,{$:()=>p});var t=a(520),d=a(2096),_=a(8031);let p=(()=>{class l{constructor(r,o){this.http=r,this.as=o,this.baseURL="http://"+location.hostname,this.queryPatientsURL=this.baseURL+"/v1/Patients/q",this.patientDetailURL=this.baseURL+"/v1/Patients/",this.addPatientURL=this.baseURL+"/v1/Patients"}getAllPatients(r){let h,o=new t.LE;return o=o.append("name",r),this.as.currentUser$.subscribe(n=>h=null==n?void 0:n.token),console.log(`Querying for ${r}`),this.http.get(this.queryPatientsURL,{headers:new t.WM({"Content-Type":"application/json",Authorization:"Bearer "+h}),params:o})}getPatientDetails(r){let o;return this.as.currentUser$.subscribe(h=>o=null==h?void 0:h.token),this.http.get(this.patientDetailURL+r.toString(),{headers:new t.WM({"Content-Type":"application/json",Authorization:"Bearer "+o})})}addPatient(r){let h,o=new t.LE;o=o.append("name",r.name),o=o.append("surname",r.surname),o=o.append("pesel",r.pesel),console.log(o),this.as.currentUser$.subscribe(n=>h=null==n?void 0:n.token),console.log(h),this.http.post(this.addPatientURL,{name:r.name,surname:r.surname,pesel:r.pesel},{headers:new t.WM({"Content-Type":"application/json-patch+json",Authorization:"Bearer "+h})}).subscribe({next:n=>{console.log("Patient added")},error:n=>{console.error("There was an error!",n)}})}}return l.\u0275fac=function(r){return new(r||l)(d.LFG(t.eN),d.LFG(_.B))},l.\u0275prov=d.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},7278:(f,v,a)=>{a.d(v,{t:()=>_});var t=a(2083),d=a(2096);let _=(()=>{class p{constructor(){this.labStatuses=["New","In Progress","Awaiting Confirmation","Cancelled","Finished"]}statusToText(s){switch(s){case t.q.CANCELLED:return"Cancelled";case t.q.FINISHED:return"Finished";case t.q.IN_PROGRESS:return"In Progress";case t.q.NEW:return"New"}}labStatusToText(s){return this.labStatuses[s]}prettyDateFromDate(s){return"string"==typeof s&&(s=new Date(s)),null==s?void 0:s.toLocaleDateString(navigator.language,{year:"numeric",month:"2-digit",day:"2-digit"})}prettyTimeFromDate(s){return"string"==typeof s&&(s=new Date(s)),null==s?void 0:s.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"})}localizeDate(s){if(null==s)return null;let r=new Date(s);return r.setHours(r.getHours()+r.getTimezoneOffset()/-60),r}}return p.\u0275fac=function(s){return new(s||p)},p.\u0275prov=d.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},425:(f,v,a)=>{a.d(v,{F:()=>r});var t=a(520),d=a(8929),_=a(4850),p=a(2083),l=a(2096),s=a(8031);let r=(()=>{class o{constructor(n,c){this.http=n,this.as=c,this.baseURL="http://"+location.hostname,this.visitsQueryURL=this.baseURL+"/v1/Visits/q",this.visitDetailURL=this.baseURL+"/v1/Visits/",this.addVisitURL=this.baseURL+"/v1/Visits"}getDoctorVisitsList(n,c,e){let u,i=new t.LE;i=i.append("doctorId",n),null!=c&&(i=i.append("dateString",c.toJSON())),-1!=e&&(i=i.append("status",e)),this.as.currentUser$.subscribe(m=>u=null==m?void 0:m.token),console.log("Some random log");let g=this.http.get(this.visitsQueryURL,{headers:new t.WM({"Content-Type":"text/plain",Authorization:"Bearer "+u}),params:i});return g=g.pipe((0,_.U)(m=>m.map(D=>Object.assign(Object.assign({},D),{date:new Date(D.date)}))),(0,_.U)(m=>m.sort((D,T)=>D.date.getTime()-T.date.getTime()))),g}getPatientVisitsList(n){let e,c=new t.LE;c=c.append("patientId",n),this.as.currentUser$.subscribe(u=>e=null==u?void 0:u.token);let i=this.http.get(this.visitsQueryURL,{headers:new t.WM({"Content-Type":"text/plain",Authorization:"Bearer "+e}),params:c});return i=i.pipe((0,_.U)(u=>u.map(g=>({id:g.id,doctorName:g.doctorName,patientName:g.patientName,date:new Date(g.date),status:g.status,diagnosis:g.diagnosis}))),(0,_.U)(u=>u.sort((g,m)=>m.date.getTime()-g.date.getTime()))),i}getVisit(n){let c;this.as.currentUser$.subscribe(i=>c=null==i?void 0:i.token);let e=this.http.get(this.visitDetailURL+n.toString(),{headers:new t.WM({"Content-Type":"text/plain",Authorization:"Bearer "+c})});return e=e.pipe((0,_.U)(i=>Object.assign(Object.assign({},i),{registrationTime:new Date(i.registrationTime),finalizationTime:i.finalizationTime?new Date(i.finalizationTime):null,visitTime:new Date(i.visitTime)}))),e}cancelVisit(n){let c;this.as.currentUser$.subscribe(u=>c=null==u?void 0:u.token);const e={description:n.description,diagnosis:n.diagnosis,status:p.q.CANCELLED};var i=new d.xQ;return this.http.put(this.visitDetailURL+n.id.toString(),e,{headers:new t.WM({"Content-Type":"application/json-patch+json",Authorization:"Bearer "+c})}).subscribe({next:u=>{console.log("Visit cancelled"),i.next(!0)},error:u=>{console.error("There was an error!",u),i.next(!1)}}),i.asObservable()}finishVisit(n){let c;this.as.currentUser$.subscribe(i=>c=null==i?void 0:i.token);const e={description:n.description,diagnosis:n.diagnosis,status:p.q.FINISHED};console.log(e),this.http.put(this.visitDetailURL+n.id.toString(),e,{headers:new t.WM({"Content-Type":"application/json-patch+json",Authorization:"Bearer "+c})}).subscribe({next:i=>{console.log("Visit finalized")},error:i=>{console.error("There was an error finalizing the visit!",i)}})}addVisit(n,c,e){let i;this.as.currentUser$.subscribe(m=>i=null==m?void 0:m.token),n.setSeconds(0,0);const u={description:"",visitTime:n.toJSON(),status:0,doctorId:c,patientId:e};var g=new d.xQ;return this.http.post(this.addVisitURL,u,{headers:new t.WM({"Content-Type":"application/json-patch+json",Authorization:"Bearer "+i})}).subscribe({next:m=>{console.log("Visit registered"),g.next(!0)},error:m=>{console.error("There was an error finalizing the visit!",m),g.next(!1),window.alert("Error: Visit registration failed")}}),g.asObservable()}}return o.\u0275fac=function(n){return new(n||o)(l.LFG(t.eN),l.LFG(s.B))},o.\u0275prov=l.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},7987:(f,v,a)=>{a.d(v,{n:()=>l});var t=a(2096),d=a(8031),_=a(1498),p=a(9808);let l=(()=>{class s{constructor(o,h){this.accountService=o,this.router=h,this.column=!1,this.afterLogoutURL="login"}ngOnInit(){}logoutUser(){this.accountService.logoutUser(),this.router.navigateByUrl(this.afterLogoutURL)}getUserName(){return null==this.user&&(this.accountService.currentUser$.subscribe(o=>this.user=o),null==this.user)?"Lucia Fernandez":this.user.username}}return s.\u0275fac=function(o){return new(o||s)(t.Y36(d.B),t.Y36(_.F0))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-account-controls"]],inputs:{column:"column"},decls:5,vars:2,consts:[[1,"font-normal","text-gray-500",3,"ngClass"],[3,"click"]],template:function(o,h){1&o&&(t.TgZ(0,"div",0)(1,"p"),t._uU(2),t.qZA(),t.TgZ(3,"button",1),t.NdJ("click",function(){return h.logoutUser()}),t._uU(4,"Log Out"),t.qZA()()),2&o&&(t.Q6J("ngClass",h.column?"":"flex space-x-4"),t.xp6(2),t.Oqu(h.getUserName()))},directives:[p.mk],styles:[""]}),s})()},2083:(f,v,a)=>{a.d(v,{q:()=>t});var t=(()=>{return(d=t||(t={}))[d.NEW=0]="NEW",d[d.IN_PROGRESS=1]="IN_PROGRESS",d[d.CANCELLED=2]="CANCELLED",d[d.FINISHED=3]="FINISHED",t;var d})()},5512:(f,v,a)=>{a.d(v,{e:()=>d});var t=a(2096);let d=(()=>{class _{constructor(){}ngOnInit(){null==this.chosenPatientData&&(this.chosenPatientData={id:1,name:"Default Name",surname:"Default Surname",pesel:"0040215576"})}}return _.\u0275fac=function(l){return new(l||_)},_.\u0275cmp=t.Xpm({type:_,selectors:[["app-patient-data"]],hostAttrs:[1,"grow","flex","flex-col","justify-center","p-6"],inputs:{chosenPatientData:"chosenPatientData"},decls:19,vars:3,consts:[[1,"text-2xl","font-medium"],[1,"table-fixed"],[1,"w-24"]],template:function(l,s){1&l&&(t.TgZ(0,"h3",0),t._uU(1,"Patient's Data"),t.qZA(),t.TgZ(2,"div")(3,"table",1)(4,"tr")(5,"td",2),t._uU(6,"Name:"),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA()(),t.TgZ(9,"tr")(10,"td"),t._uU(11,"Surname:"),t.qZA(),t.TgZ(12,"td"),t._uU(13),t.qZA()(),t.TgZ(14,"tr")(15,"td"),t._uU(16,"PESEL:"),t.qZA(),t.TgZ(17,"td"),t._uU(18),t.qZA()()()()),2&l&&(t.xp6(8),t.Oqu(s.chosenPatientData.name),t.xp6(5),t.Oqu(s.chosenPatientData.surname),t.xp6(5),t.Oqu(s.chosenPatientData.pesel))},styles:[""]}),_})()},3213:(f,v,a)=>{a.d(v,{c:()=>h});var t=a(2096),d=a(425),_=a(7278),p=a(9808);function l(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"il",6)(1,"div",7),t._uU(2),t.qZA(),t.TgZ(3,"div",7),t._uU(4),t.qZA(),t.TgZ(5,"div",7),t._uU(6),t.qZA(),t.TgZ(7,"div",7),t._uU(8),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA(),t.TgZ(11,"div",7)(12,"button",8),t.NdJ("click",function(){const g=t.CHM(e).$implicit;return t.oxw().openDetails(g)}),t._uU(13,"Details"),t.qZA()()()}if(2&n){const e=c.$implicit,i=t.oxw();t.xp6(2),t.Oqu(i.us.prettyDateFromDate(e.date)),t.xp6(2),t.Oqu(i.us.prettyTimeFromDate(e.date)),t.xp6(2),t.Oqu(e.doctorName),t.xp6(2),t.hij("",i.us.statusToText(null==e?null:e.status)," "),t.xp6(2),t.hij("",null==e?null:e.diagnosis," ")}}function s(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"div",9),t.NdJ("click",function(){return t.CHM(e),t.oxw().overlayActive=!1}),t.qZA()}}function r(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){t.CHM(e);const u=t.oxw(2);return u.cancelVisit(u.chosenVisitDetail)}),t._uU(1,"Cancel"),t.qZA()}}function o(n,c){if(1&n&&(t.TgZ(0,"div",10)(1,"div",11)(2,"div",12)(3,"table")(4,"tr")(5,"td")(6,"span",13),t._uU(7,"Scheduled for:"),t.qZA()(),t.TgZ(8,"td"),t._uU(9),t.qZA()(),t.TgZ(10,"tr")(11,"td")(12,"span",13),t._uU(13,"Registered on:"),t.qZA()(),t.TgZ(14,"td"),t._uU(15),t.qZA()(),t.TgZ(16,"tr")(17,"td")(18,"span",13),t._uU(19,"Finalized on:"),t.qZA()(),t.TgZ(20,"td"),t._uU(21),t.qZA()()(),t.TgZ(22,"table")(23,"tr")(24,"td")(25,"span",13),t._uU(26,"Doctor:"),t.qZA()(),t.TgZ(27,"td"),t._uU(28),t.qZA()(),t.TgZ(29,"tr")(30,"td")(31,"span",13),t._uU(32,"Registered by:"),t.qZA()(),t.TgZ(33,"td"),t._uU(34),t.qZA()(),t.TgZ(35,"tr")(36,"td")(37,"span",13),t._uU(38,"Status:"),t.qZA()(),t.TgZ(39,"td"),t._uU(40),t.qZA()()()(),t.TgZ(41,"div",14)(42,"div",15)(43,"label",16),t._uU(44,"Description:"),t.qZA(),t._UZ(45,"textarea",17),t.TgZ(46,"label",18),t._uU(47,"Diagnosis:"),t.qZA(),t._UZ(48,"textarea",19),t.qZA(),t.YNc(49,r,2,0,"button",20),t.qZA()()()),2&n){const e=t.oxw();t.xp6(9),t.AsE("",e.us.prettyDateFromDate(null==e.chosenVisitDetail?null:e.chosenVisitDetail.visitTime)," ",e.us.prettyTimeFromDate(null==e.chosenVisitDetail?null:e.chosenVisitDetail.visitTime),""),t.xp6(6),t.AsE("",e.us.prettyDateFromDate(null==e.chosenVisitDetail?null:e.chosenVisitDetail.registrationTime)," ",e.us.prettyTimeFromDate(null==e.chosenVisitDetail?null:e.chosenVisitDetail.registrationTime),""),t.xp6(6),t.AsE("",e.chosenVisitDetail.finalizationTime?e.us.prettyDateFromDate(e.chosenVisitDetail.finalizationTime):"N/A"," ",e.chosenVisitDetail.finalizationTime?e.us.prettyTimeFromDate(e.chosenVisitDetail.finalizationTime):"",""),t.xp6(7),t.Oqu(e.chosenVisitGeneral.doctorName),t.xp6(6),t.Oqu(e.chosenVisitDetail.registrantName),t.xp6(6),t.Oqu(e.us.statusToText(e.chosenVisitGeneral.status)),t.xp6(5),t.Q6J("value",null==e.chosenVisitDetail?null:e.chosenVisitDetail.description),t.xp6(3),t.Q6J("value",null==e.chosenVisitDetail?null:e.chosenVisitDetail.diagnosis),t.xp6(1),t.Q6J("ngIf",0==(null==e.chosenVisitGeneral?null:e.chosenVisitGeneral.status)||1==(null==e.chosenVisitGeneral?null:e.chosenVisitGeneral.status))}}let h=(()=>{class n{constructor(e,i){this.vs=e,this.us=i,this.statusChange=new t.vpe,this.overlayActive=!1}ngOnInit(){var e;null===(e=this.visits)||void 0===e||e.sort((i,u)=>u.date.valueOf()-i.date.valueOf())}openDetails(e){this.overlayActive=!0,this.vs.getVisit(e.id).subscribe(i=>{this.chosenVisitDetail=i,this.chosenVisitDetail.finalizationTime=this.us.localizeDate(this.chosenVisitDetail.finalizationTime),this.chosenVisitDetail.registrationTime=this.us.localizeDate(this.chosenVisitDetail.registrationTime),this.chosenVisitDetail.visitTime=this.us.localizeDate(this.chosenVisitDetail.visitTime)}),this.chosenVisitGeneral=e}cancelVisit(e){confirm("Confirm cancelling of visit?")&&this.vs.cancelVisit(e).subscribe(i=>{i&&(this.statusChange.emit(!0),this.overlayActive=!1)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(d.F),t.Y36(_.t))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-patient-visits"]],hostAttrs:[1,"grow","flex","flex-col","p-6"],inputs:{visits:"visits",mode:"mode"},outputs:{statusChange:"statusChange"},decls:7,vars:3,consts:[[1,"text-2xl","font-medium"],[1,"grow","relative","overflow-y-auto","w-full"],[1,"absolute","top-0","left-0","w-full","divide-y"],["class","flex w-full items-center py-2",4,"ngFor","ngForOf"],["class","absolute top-0 left-0 w-full h-full backdrop-blur-sm z-50 cursor-pointer",3,"click",4,"ngIf"],["class","absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 min-w-[35rem] min-h-min rounded-md drop-shadow-lg bg-gradient-to-b from-slate-50 via-slate-100 to-blue-300",4,"ngIf"],[1,"flex","w-full","items-center","py-2"],[1,"w-1/6","min-w-fit","px-1"],["type","button",1,"float-right","font-semibold","text-white","bg-blue-600","px-3","rounded-lg","hover:bg-blue-700","active:bg-blue-800",3,"click"],[1,"absolute","top-0","left-0","w-full","h-full","backdrop-blur-sm","z-50","cursor-pointer",3,"click"],[1,"absolute","z-50","top-1/2","left-1/2","-translate-x-1/2","-translate-y-1/2","h-1/2","w-1/2","min-w-[35rem]","min-h-min","rounded-md","drop-shadow-lg","bg-gradient-to-b","from-slate-50","via-slate-100","to-blue-300"],[1,"flex","flex-col","w-full","h-full","p-5"],[1,"flex","w-full","justify-between"],[1,"mr-3"],[1,"w-full","grow","flex","items-end","justify-center"],[1,"basis-2/3"],["for","description"],["readonly","","id","description","rows","5","placeholder","Description",1,"w-full","resize-none","mb-2","bg-gray-200",3,"value"],["for","diagnosis"],["readonly","","id","diagnosis","rows","3","placeholder","Diagnosis",1,"w-full","resize-none","bg-gray-200",3,"value"],["type","button","class","ml-8 mb-2 font-semibold text-white bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 active:bg-red-800",3,"click",4,"ngIf"],["type","button",1,"ml-8","mb-2","font-semibold","text-white","bg-red-600","px-6","py-2","rounded-lg","hover:bg-red-700","active:bg-red-800",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"h3",0),t._uU(1,"Patient's Visits"),t.qZA(),t.TgZ(2,"div",1)(3,"ul",2),t.YNc(4,l,14,5,"il",3),t.qZA()(),t.YNc(5,s,1,0,"div",4),t.YNc(6,o,50,12,"div",5)),2&e&&(t.xp6(4),t.Q6J("ngForOf",i.visits),t.xp6(1),t.Q6J("ngIf",i.overlayActive),t.xp6(1),t.Q6J("ngIf",i.overlayActive))},directives:[p.sg,p.O5],styles:[""]}),n})()},4466:(f,v,a)=>{a.d(v,{m:()=>p});var t=a(9808),d=a(4182),_=a(2096);let p=(()=>{class l{}return l.\u0275fac=function(r){return new(r||l)},l.\u0275mod=_.oAB({type:l}),l.\u0275inj=_.cJS({imports:[[t.ez,d.u5]]}),l})()}}]);