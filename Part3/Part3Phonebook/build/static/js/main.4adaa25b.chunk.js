(this["webpackJsonp2.11-2.14"]=this["webpackJsonp2.11-2.14"]||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),o=t(14),r=t.n(o),i=t(3),u=t(0),s=function(e){return Object(u.jsxs)("li",{children:[e.person.name," : ",e.person.number,Object(u.jsx)("button",{onClick:e.handleContactRemove(e.person),children:"delete"})]})},l=function(e){var n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.search.toLowerCase())}));return""===e.search?e.persons.map((function(n){return Object(u.jsx)(s,{person:n,handleContactRemove:e.handleContactRemove},n.name)})):n.map((function(n){return Object(u.jsx)(s,{person:n,handleContactRemove:e.handleContactRemove},n.name)}))},d=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:e.title}),Object(u.jsxs)("form",{onSubmit:e.addName,children:[Object(u.jsxs)("div",{children:["name:",Object(u.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(u.jsxs)("div",{children:["number:",Object(u.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})]})},j=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:e.title}),Object(u.jsx)("form",{children:Object(u.jsx)("div",{children:Object(u.jsx)("input",{value:e.newSearch,onChange:e.handleSearchChange})})})]})},h=t(4),b=t.n(h),m="http://localhost:3001/api/persons",f=function(){return b.a.get(m)},O=function(e){return b.a.post(m,e)},x=function(e,n){return b.a.put(m+"/"+e,n)},v=function(e){return b.a.delete(m+"/"+e)},p=(t(38),function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),r=Object(i.a)(o,2),s=r[0],h=r[1],b=Object(c.useState)(""),m=Object(i.a)(b,2),p=m[0],g=m[1],C=Object(c.useState)(""),w=Object(i.a)(C,2),N=w[0],S=w[1],k=Object(c.useState)(null),R=Object(i.a)(k,2),y=R[0],T=R[1],B=Object(c.useState)(null),D=Object(i.a)(B,2),E=D[0],J=D[1],L=function(){f().then((function(e){a(e.data)}))};Object(c.useEffect)((function(){f().then((function(e){a(e.data)}))}),[]);var A=function(e){var n=e.message;return null===n?null:Object(u.jsx)("div",{className:"notification",children:n})},F=function(e){var n=e.message;return null===n?null:Object(u.jsx)("div",{className:"error",children:n})};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(A,{message:y}),Object(u.jsx)(F,{message:E}),Object(u.jsx)(j,{title:"Filter By Name",handleSearchChange:function(e){S(e.target.value)},newSearch:N}),Object(u.jsx)(d,{title:"Add Contact",addName:function(e){e.preventDefault();var n={name:s,number:p},c=t.find((function(e){return e.name===n.name}));c?(window.confirm(n.name+" already exists in phonebook, replace old number with the new one?"),x(c.id,n).then((function(e){L(),h(""),g(""),T(n.name+" number changed to: "+n.number),setTimeout((function(){T(null)}),5e3)}))):O(n).then((function(e){a(t.concat(e.data)),h(""),g(""),T(n.name+" has been added to the phonebook"),setTimeout((function(){T(null)}),5e3)}))},newName:s,newNumber:p,handleNameChange:function(e){h(e.target.value)},handleNumberChange:function(e){g(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("div",{children:Object(u.jsx)("ul",{children:Object(u.jsx)(l,{search:N,persons:t,handleContactRemove:function(e){return function(){window.confirm("Delete: "+e.name+"?"),console.log(e.id),v(e.id).catch((function(n){console.log(n),J("Contact "+e.name+" was already removed from phonebook"),setTimeout((function(){J(null)}),5e3)})).then(L,T(e.name+" has been deleted from the phonebook")),setTimeout((function(){T(null)}),5e3)}}})})})]})});r.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(p,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4adaa25b.chunk.js.map