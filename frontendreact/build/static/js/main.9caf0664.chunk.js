(this.webpackJsonpfrontendreact=this.webpackJsonpfrontendreact||[]).push([[0],{57:function(e,t,c){},58:function(e,t,c){},6:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var r=c(2),n=c.n(r),s=c(5),a=function(){var e=Object(s.a)(n.a.mark((function e(t,c,r){var s,a,o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(s=new Headers).append("Content-Type","application/json"),a={method:c,headers:s,body:JSON.stringify(r),redirect:"follow"},e.t0=c.toLowerCase(),e.next="get"===e.t0?6:"delete"===e.t0?9:12;break;case 6:case 9:return delete a.headers,delete a.body,e.abrupt("break",12);case 12:return e.prev=12,e.next=15,fetch("".concat("http://localhost:8080").concat(t),a);case 15:return o=e.sent,e.abrupt("return",o);case 19:return e.prev=19,e.t1=e.catch(12),console.log(e.t1),e.abrupt("return",!1);case 23:case"end":return e.stop()}}),e,null,[[12,19]])})));return function(t,c,r){return e.apply(this,arguments)}}()},95:function(e,t,c){"use strict";c.r(t);var r=c(1),n=c.n(r),s=c(48),a=c.n(s),o=(c(57),c(58),c(2)),i=c.n(o),l=c(5),j=c(9),u=c(6),b=c(0);var d=function(){var e=Object(r.useState)([]),t=Object(j.a)(e,2),c=t[0],n=t[1];function s(){return(s=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)("/logout","post",{});case 2:e.sent,localStorage.removeItem("user"),window.location.href="/login",n(null);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n(localStorage.getItem("user"));case 1:case"end":return e.stop()}}),e)}))),[]),Object(b.jsx)("header",{className:"content",children:Object(b.jsxs)("div",{style:{display:"flex"},children:[Object(b.jsx)("h1",{children:"Coderhouse"}),Object(b.jsx)("div",{style:{margin:"auto 0 auto auto"},children:null==c?null:Object(b.jsx)("button",{className:"btn",onClick:function(){return s.apply(this,arguments)},children:"Salir"})})]})})},h=c(11),m=c(3),O=c(49),x=c.n(O)()("http://localhost:8080",{path:"/socket.io"});var p=function(){var e=Object(m.g)().pathname,t=Object(r.useState)([]),c=Object(j.a)(t,2),n=c[0],s=c[1],a=Object(r.useState)(!1),o=Object(j.a)(a,2),d=o[0],h=o[1];x.on("connect",(function(e){x.on(x.id,(function(e){}))})),Object(r.useEffect)(Object(l.a)(i.a.mark((function t(){var c,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c="/productos/vista-test"===e?"/api/productos/test?cant=20":"/api/productos",t.next=3,Object(u.a)(c,"get",{});case 3:return r=t.sent,t.next=6,r.json();case 6:(r=t.sent).error?h(r):s(r);case 8:case"end":return t.stop()}}),t)}))),[]);var O=Object(r.useState)(""),p=Object(j.a)(O,2),f=p[0],v=p[1];x.on("resp-chat",(function(e){var t="";e.forEach((function(e){t="".concat(t,"\n").concat(e.email,"-").concat(new Date(e.fecha).toLocaleString(),": ").concat(e.mensaje)})),v(t)})),Object(r.useEffect)(Object(l.a)(i.a.mark((function e(){var t,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)("/chat","get",{});case 2:return 200!=(t=e.sent).status&&(localStorage.removeItem("user"),window.location.href="/login"),e.next=6,t.json();case 6:t=e.sent,c="",t.forEach((function(e){c="".concat(c,"\n").concat(e.email,"-").concat(new Date(e.fecha).toLocaleString(),": ").concat(e.mensaje)})),v(c);case 10:case"end":return e.stop()}}),e)}))),[]),x.on("mensaje",(function(e){e,s(e),h(!1)})),x.on("error",(function(e){alert(e.message)}));var g=Object(r.useState)(""),w=Object(j.a)(g,2),y=w[0],N=w[1];function S(){return(S=Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.querySelector("#email").value,e.next=3,x.emit("registrarse",t);case 3:e.sent,document.querySelector("#email").value="",N(t),alert("email aceptado");case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=Object(r.useState)(""),F=Object(j.a)(k,2);return F[0],F[1],Object(b.jsxs)("main",{className:"content",children:[e.includes("productos")?"":Object(b.jsxs)("div",{className:"row",children:[Object(b.jsx)("div",{children:Object(b.jsx)("textarea",{style:{height:"200px"},className:"form-control",value:f})}),""===y?Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{placeholder:"Email",id:"email"}),Object(b.jsx)("button",{onClick:function(){return S.apply(this,arguments)},children:"Registrar"})]}):Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{placeholder:"Mensaje",id:"mensaje"}),Object(b.jsx)("button",{onClick:function(){var e=document.querySelector("#mensaje").value;x.emit("chat",e),document.querySelector("#mensaje").value=""},children:"Enviar"})]})]}),Object(b.jsx)("div",{className:"row",children:d?Object(b.jsx)("div",{children:Object(b.jsx)("h1",{className:"error",children:d.error})}):Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Vista de productos"}),Object(b.jsxs)("table",{className:"table table-dark table-striped",children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col",children:"ID"}),Object(b.jsx)("th",{scope:"col",children:"Nombre"}),Object(b.jsx)("th",{scope:"col",children:"Precio"}),Object(b.jsx)("th",{scope:"col",children:"Foto"})]})}),Object(b.jsx)("tbody",{children:n.map((function(e,t){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{scope:"row",children:e.id}),Object(b.jsx)("td",{children:e.title}),Object(b.jsx)("td",{children:e.price}),Object(b.jsx)("td",{children:Object(b.jsx)("img",{className:"image",src:e.tumbnails,alt:e.title})})]})}))})]})]})})]})},f=c(52);var v=function(e){var t=e.id,c=e.label,r=e.type,n=e.placeholder;return Object(b.jsxs)("div",{className:"col-md-12",children:[Object(b.jsx)("label",{htmlFor:t,className:"form-label",children:c}),Object(b.jsx)("input",{id:t,className:"form-control",type:r,placeholder:n,name:t})]})};var g=function(){return Object(r.useEffect)((function(){c.e(3).then(c.bind(null,97)).then((function(e){e.myForm}))}),[]),Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Ingrese Producto"}),Object(b.jsxs)("form",{className:"row g-3",id:"myForm",children:[Object(b.jsxs)("div",{className:"col-md-12",children:[Object(b.jsx)("label",{htmlFor:"inputEmail4",className:"form-label",children:"Acci\xf3n"}),Object(b.jsxs)("select",{name:"metodo",className:"form-control",id:"select",children:[Object(b.jsx)("option",{value:"post",children:"Crear"}),Object(b.jsx)("option",{value:"put",children:"Actualizar"}),Object(b.jsx)("option",{value:"delete",children:"Eliminar"})]})]}),[{id:"id",label:"ID",type:"text",placeholder:"0"},{id:"title",label:"Nombre",type:"text",placeholder:"Calculadora"},{id:"price",label:"Precio",type:"number",placeholder:"123456"},{id:"tumbnails",label:"Foto URL",type:"text",placeholder:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"}].map((function(e){return Object(b.jsx)(v,Object(f.a)({},e),e.id)})),Object(b.jsx)("div",{className:"col-12",children:Object(b.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Enviar"})})]}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)(p,{}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{className:"row",children:Object(b.jsx)(h.b,{className:"btn btn-warning",to:"/productos",children:"Ver Productos"})}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{})]})},w=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("p",{children:["Uy, llegaste a un mundo desconocido. Mejor regresa al ",Object(b.jsx)("a",{href:"/",children:"inicio"})," ."]})})};var y=function(){return Object(r.useEffect)((function(){document.querySelector("#myForm").addEventListener("submit",function(){var e=Object(l.a)(i.a.mark((function e(t){var c,r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c=t.target.elements.nombre.value,r=t.target.elements.password.value,e.next=5,Object(u.a)("/auth/register","post",{nombre:c,password:r});case 5:return 200!=(n=e.sent).status&&(localStorage.removeItem("user"),window.location.href="/error/registro"),e.next=9,n.json();case 9:n=e.sent,window.localStorage.setItem("user",n),window.location.href="/";case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(b.jsxs)("div",{className:"jumbotron",children:[Object(b.jsx)("h3",{children:"Registrate"}),Object(b.jsx)("br",{}),Object(b.jsxs)("form",{id:"myForm",autoComplete:"off",children:[" ",Object(b.jsxs)("div",{className:"form-group",children:[Object(b.jsx)("label",{htmlFor:"nombre",children:"Ingresa un nombre de usuario"}),Object(b.jsx)("input",{id:"nombre",className:"form-control",type:"text",name:"nombre",required:!0})]}),Object(b.jsx)("br",{}),Object(b.jsxs)("div",{className:"form-group",children:[Object(b.jsx)("label",{htmlFor:"password",children:"Ingresa una clave"}),Object(b.jsx)("input",{id:"password",className:"form-control",type:"password",name:"password",required:!0})]}),Object(b.jsx)("button",{className:"btn btn-success mt-3",children:"Registrar"})]})]})};var N=function(){return Object(r.useEffect)((function(){document.querySelector("#myForm").addEventListener("submit",function(){var e=Object(l.a)(i.a.mark((function e(t){var c,r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c=t.target.elements.nombre.value,r=t.target.elements.password.value,e.next=5,Object(u.a)("/auth/login","post",{nombre:c,password:r});case 5:return 200!=(n=e.sent).status&&(localStorage.removeItem("user"),window.location.href="/error/inicio"),e.next=9,n.json();case 9:n=e.sent,window.localStorage.setItem("user",n),window.location.href="/";case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(b.jsxs)("div",{className:"jumbotron",children:[Object(b.jsx)("h3",{children:"Login de Usuario"}),Object(b.jsx)("br",{}),Object(b.jsxs)("form",{id:"myForm",autoComplete:"off",children:[Object(b.jsxs)("div",{className:"form-group",children:[Object(b.jsx)("label",{htmlFor:"nombre",children:"Ingrese su nombre"}),Object(b.jsx)("input",{id:"nombre",className:"form-control",type:"text",name:"nombre",required:!0})]}),Object(b.jsx)("br",{}),Object(b.jsxs)("div",{className:"form-group",children:[Object(b.jsx)("label",{htmlFor:"password",children:"Ingrese su clave"}),Object(b.jsx)("input",{id:"password",className:"form-control",type:"password",name:"password",required:!0})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("span",{children:"No tienes usuario?,"})," ",Object(b.jsx)("a",{href:"/register",children:"registrate."})]}),Object(b.jsx)("button",{className:"btn btn-success mt-3",children:"Enviar"})]}),Object(b.jsx)("div",{className:"content row col-xs-12",children:Object(b.jsx)("a",{href:"".concat("http://localhost:8080","/auth/facebook"),className:"btn btn-success mt-3",children:"Iniciar Session con Facebook"})})]})};var S=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1];return Object(r.useEffect)(Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)("/logout","post",{});case 2:return t=e.sent,window.localStorage.removeItem("user"),e.t0=n,e.next=7,t.json();case 7:e.t1=e.sent,(0,e.t0)(e.t1);case 9:case"end":return e.stop()}}),e)}))),[]),Object(b.jsxs)("div",{className:"jumbotron",children:[Object(b.jsx)("h3",{children:"Hasta luego"}),Object(b.jsx)("div",{children:c}),Object(b.jsxs)("div",{children:[" retornar al ",Object(b.jsx)("a",{href:"/",children:"inicio"})]})]})},k=function(){var e=Object(m.h)().tipo,t="";switch(e){case"inicio":t="/login";break;case"registro":t="/register"}return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("p",{children:["Tuviste un error",t?Object(b.jsxs)("span",{children:["en el ",e,", regresar al ",Object(b.jsx)("a",{href:t,children:e})," "]}):"","."]})})};var F=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1];return Object(r.useEffect)(Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)("/user","get",{});case 2:if(200==(t=e.sent).status){e.next=7;break}localStorage.removeItem("user"),e.next=12;break;case 7:return e.next=9,t.json();case 9:t=e.sent,window.localStorage.setItem("user",t.nombre),n(t.nombre);case 12:case"end":return e.stop()}}),e)}))),[]),Object(b.jsx)("main",{className:"content",children:Object(b.jsx)(h.a,{children:Object(b.jsxs)(m.d,{children:[Object(b.jsx)(m.b,{exact:!0,path:"/",children:c?Object(b.jsx)(g,{}):Object(b.jsx)(m.a,{to:"/login"})}),Object(b.jsx)(m.b,{exact:!0,path:"/productos",component:p}),Object(b.jsx)(m.b,{exact:!0,path:"/productos/vista-test",component:p}),Object(b.jsx)(m.b,{exact:!0,path:"/login",children:c?Object(b.jsx)(m.a,{to:"/"}):Object(b.jsx)(N,{})}),Object(b.jsx)(m.b,{exact:!0,path:"/register",children:c?Object(b.jsx)(m.a,{to:"/"}):Object(b.jsx)(y,{})}),Object(b.jsx)(m.b,{exact:!0,path:"/logout",children:c?Object(b.jsx)(S,{}):Object(b.jsx)(m.a,{to:"/"})}),Object(b.jsx)(m.b,{exact:!0,path:"/error/:tipo",component:k}),Object(b.jsx)(m.b,{path:"/*",component:w})]})})})};var I=function(){return Object(b.jsx)("footer",{className:"content",children:"2021"})};var E=function(){return Object(b.jsxs)(b.Fragment,{children:[" ",Object(b.jsx)(d,{}),Object(b.jsx)(F,{}),Object(b.jsx)(I,{})]})},C=function(e){e&&e instanceof Function&&c.e(4).then(c.bind(null,96)).then((function(t){var c=t.getCLS,r=t.getFID,n=t.getFCP,s=t.getLCP,a=t.getTTFB;c(e),r(e),n(e),s(e),a(e)}))};a.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(E,{})}),document.getElementById("root")),C()}},[[95,1,2]]]);