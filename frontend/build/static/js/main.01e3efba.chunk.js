(this["webpackJsonpbook-garden"]=this["webpackJsonpbook-garden"]||[]).push([[0],{172:function(e,t,a){},173:function(e,t,a){},174:function(e,t,a){},175:function(e,t,a){},176:function(e,t,a){},177:function(e,t,a){},178:function(e,t,a){},179:function(e,t,a){},180:function(e,t,a){},181:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(15),i=a.n(s),r=(a(72),a(73),a(3)),l=a(5),o=(a(74),a(4)),d=a(2);a(75);var j=a(1),b=function(){var e,t,a=Object(n.useState)(!1),c=Object(o.a)(a,2),s=c[0],i=c[1],r=Object(n.useRef)();return e=r,t=function(){return i(!1)},Object(n.useEffect)((function(){var a=function(a){e.current&&!e.current.contains(a.target)&&t(a)};return document.addEventListener("mousedown",a),document.addEventListener("touchstart",a),function(){document.removeEventListener("mousedown",a),document.removeEventListener("touchstart",a)}}),[e,t]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"Navbar-search ".concat(s?"expanded":""),ref:r,children:[Object(j.jsx)("label",{htmlFor:"search",className:"sr-only",children:"Search:"}),Object(j.jsx)("input",{type:"text",id:"search",placeholder:"Search for books, authors...",className:"bg-white md:bg-gray-100 py-1.5 px-4 rounded-md outline-none",style:{minWidth:"300px"}}),Object(j.jsx)("button",{className:"Navbar-search-close",onClick:function(){return i(!1)},children:Object(j.jsx)(d.r,{className:"h-6"})})]}),Object(j.jsx)("button",{className:"Navbar-link flex md:hidden",onClick:function(){return i(!s)},children:Object(j.jsx)(d.n,{className:"h-6"})})]})},m=(a(77),a(67)),u=a(36),x=a.p+"static/media/error.a4a48fb8.svg",h=function(){return Object(j.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[Object(j.jsx)("div",{className:"mb-4 text-4xl font-bold text-red-500",children:"403"}),Object(j.jsx)("div",{className:"mb-8 text-2xl text-gray-600",children:"Not Authorized"}),Object(j.jsx)("img",{src:x,alt:"Not Authorized",className:"h-60"})]})},O=a(62),p=a(63),v=a(64),f=a(6),N=a.n(f),g=a(13),y=a.n(g),k="http://book-garden.herokuapp.com/api/",w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var a in t)e=e.replace(":".concat(a),t[a]);return k+e},B=new(function(){function e(){Object(p.a)(this,e),this.init()}return Object(v.a)(e,[{key:"init",value:function(){this.authenticated=!0,this.id=1,this.username="admin",this.type="admin",this.library_id=null,this.name="Joe",this.surname="Doe",this.profiledesc="I love 50 shades of gray"}},{key:"login",value:function(e,t){var a=this;return N.a.post(w("session"),y.a.stringify({username:e,password:t})).then((function(e){return a.authenticated=!0,a.id=e.data.data.user_id,a.type=a.convertToUserType(e.data.data.user_type),N.a.get(w("person/:id",{id:a.id})).then((function(e){return a.username=e.data.data.username,a.library_id=e.data.data.library_id,a.name=e.data.data.name,a.surname=e.data.data.surname,a.profiledesc=e.data.data.profiledesc,a.allowedDashboard?Object(j.jsx)(l.a,{to:"/admin"}):Object(j.jsx)(l.a,{to:"/account/profile"})}))}))}},{key:"logout",value:function(){return this.init(),Object(j.jsx)(l.a,{to:"/"})}},{key:"isAuthenticated",value:function(){var e=this;return N.a.get(w("session")).then((function(t){return e.id===t.data.data.user_id&&e.type===e.convertToUserType(t.data.data.user_type)}))}},{key:"allowedDashboard",value:function(){return this.isAdmin()||this.isLibrarian()||this.isDistributor()}},{key:"getUserType",value:function(){return this.type}},{key:"isAdmin",value:function(){return this.isAuthenticated()&&"admin"===this.type}},{key:"isLibrarian",value:function(){return this.isAuthenticated()&&"librarian"===this.type}},{key:"isDistributor",value:function(){return this.isAuthenticated()&&"distributor"===this.type}},{key:"isUser",value:function(){return this.isAuthenticated()&&"user"===this.type}},{key:"convertToUserType",value:function(e){return 5===e?"admin":4===e?"librarian":3===e?"distributor":"user"}}]),e}()),T=["roles"],L="admin",S=function(e){var t=Object.assign({},e);return B.isAuthenticated()?Object(j.jsx)(l.b,Object(u.a)({},t)):Object(j.jsx)(l.a,{to:"/account/login"})},C=function(e){var t=e.roles,a=Object(m.a)(e,T);return B.isAuthenticated()&&(Object(O.isArray)(t)&&t.find((function(e){return e===B.getUserType()}))||"all"===t)?Object(j.jsx)(l.b,Object(u.a)({},a)):Object(j.jsx)(h,{})},A=function(){return Object(j.jsxs)("nav",{className:"Navbar Container",children:[Object(j.jsxs)(r.b,{to:"/",className:"Navbar-logo",children:[Object(j.jsx)("b",{children:"BOOK"}),"Garden"]}),Object(j.jsxs)("div",{className:"Navbar-items",children:[Object(j.jsx)(b,{}),Object(j.jsxs)(r.b,{to:"/account",className:"Navbar-link",children:[Object(j.jsx)(d.q,{className:"h-6"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"user"})]}),B.isAuthenticated()&&B.isAdmin()&&Object(j.jsxs)(r.b,{to:"/admin",className:"Navbar-link",children:[Object(j.jsx)(d.g,{className:"h-6 inline mr-2"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"Admin"})]}),B.isAuthenticated()&&Object(j.jsxs)(r.b,{to:"/admin",className:"Navbar-link",children:[Object(j.jsx)(d.j,{className:"h-6 inline mr-2"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"Log out"})]})]})]})},D=function(){return Object(j.jsx)("header",{className:"Header",children:Object(j.jsx)(A,{})})},F=(a(172),function(e){var t=e.children;return Object(j.jsx)("main",{className:"Main Container",children:t})}),E=(a(173),function(){return Object(j.jsx)("footer",{className:"Footer",children:Object(j.jsxs)("div",{className:"Footer-container Container",children:["\xa9 2021 ",Object(j.jsx)("b",{children:"BOOK"}),"Garden"]})})}),_=(a(174),function(e){var t=e.icon,a=e.text,n=e.type,c=e.variant,s=void 0===c?"":c,i=e.size,r=void 0===i?"":i,l=e.style,o=void 0===l?{}:l,d=e.className,b=void 0===d?"":d,m=e.hideTextSm,u=void 0!==m&&m,x=e.onClick;return t?Object(j.jsxs)("button",{type:n,className:"Button ".concat(s," ").concat(r," ").concat(b),style:o,onClick:x,children:[t,Object(j.jsx)("span",{className:u?"hidden md:block":"",children:a})]}):Object(j.jsx)("button",{type:n,className:"Button ".concat(s," ").concat(r," ").concat(b),style:o,onClick:x,children:a})}),P=function(e){var t=e.icon,a=e.text,n=e.to,c=e.variant,s=void 0===c?"":c,i=e.size,l=void 0===i?"":i,o=e.style,d=void 0===o?{}:o,b=e.className,m=void 0===b?"":b,u=e.hideTextSm,x=void 0!==u&&u,h=e.target;return t?Object(j.jsxs)(r.b,{to:n,className:"Button ".concat(s," ").concat(l," ").concat(m),style:d,target:h,children:[t,Object(j.jsx)("span",{className:x?"hidden md:block":"",children:a})]}):Object(j.jsx)(r.b,{to:n,className:"Button ".concat(s," ").concat(l," ").concat(m),style:d,target:h,children:a})},I=(a(175),function(e){var t=e.className,a=e.message,n=e.type,c=e.onClick;return Object(j.jsx)("div",{className:"Alert Alert-".concat(n," ").concat(null!==t&&void 0!==t?t:""),onClick:c,children:a})}),U=a(25),J=(a(176),function(e){var t=e.id,a=e.type,n=e.label,c=e.value,s=e.name,i=e.placeholder,r=e.hideLabel,l=e.onChange;return Object(j.jsxs)("div",{className:"Form-control",children:[Object(j.jsx)("label",{htmlFor:t,className:"Form-control-label ".concat(r?"sr-only":""),children:n}),Object(j.jsx)("input",{type:a,id:t,name:s,placeholder:i,className:"Form-control-input",onChange:l,defaultValue:c})]})}),G=(a(177),function(e){var t=e.id,a=e.label,n=e.value,c=e.name,s=e.placeholder,i=e.hideLabel,r=e.onChange;return Object(j.jsxs)("div",{className:"Textarea",children:[Object(j.jsx)("label",{htmlFor:t,className:"Textarea-label ".concat(i?"sr-only":""),children:a}),Object(j.jsx)("textarea",{id:t,name:c,placeholder:s,className:"Textarea-input",onChange:r,defaultValue:n})]})}),R=a.p+"static/media/header.b220e1bf.svg",z=a(10),M=function(){return Object(j.jsxs)("div",{className:"flex flex-col lg:flex-row justify-between items-center gap-8 h-full",children:[Object(j.jsxs)("div",{className:"mb-8 lg:mb-0",children:[Object(j.jsxs)("div",{className:"text-3xl text-center sm:text-5xl sm:text-left font-bold",children:["Your Favorite",Object(j.jsx)("br",{}),"Book Finder."]}),Object(j.jsx)("div",{className:"text-2xl text-center sm:text-left py-8 md:py-16",children:"When it comes to reading time, we are here to bring you your favorite book, from your favorite library."}),Object(j.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row md:gap-8",children:[Object(j.jsx)(P,{to:"/book-titles",text:"Find a Book",variant:"primary",size:"lg",icon:Object(j.jsx)(d.c,{className:"h-6 w-6 inline pr-1"})}),Object(j.jsx)(P,{to:"/libraries",text:"Find a Library",variant:"secondary",size:"lg",icon:Object(j.jsx)(z.c,{className:"h-6 w-6 inline pr-1"})})]})]}),Object(j.jsx)("div",{children:Object(j.jsx)("img",{src:R,alt:"BookGarden"})})]})},q=(a(178),function(e){var t=e.bookTitle;return Object(j.jsxs)(r.b,{to:"/book-titles/".concat(t.id),className:"BookTitleItem",children:[Object(j.jsx)("img",{className:"BookTitleItem-image",alt:t.name}),Object(j.jsx)("div",{className:"BookTitleItem-name",children:t.name}),Object(j.jsx)("div",{className:"BookTitleItem-genre",children:t.genre})]})}),H=(a(179),function(e){var t=e.children;return Object(j.jsx)("div",{className:"FilterDropdown",children:t})}),W=function(e){var t=Object(n.useState)(e.collapsed),a=Object(o.a)(t,2),c=a[0],s=a[1];return Object(j.jsxs)("div",{className:"FilterDropdownItem ".concat(c?"collapsed":""),children:[Object(j.jsxs)("div",{className:"FilterDropdownItem-header",onClick:function(){return s(!c)},children:[e.title,c?Object(j.jsx)(z.a,{className:"FilterDropdownItem-icon"}):Object(j.jsx)(z.b,{className:"FilterDropdownItem-icon"})]}),Object(j.jsx)("div",{className:"FilterDropdownItem-body",children:e.children})]})},K=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),r=i[0],l=i[1];return Object(n.useEffect)((function(){N.a.get(w("booktitle")).then((function(e){return c(e.data.data)})),N.a.get(w("booktitle/unique/genres")).then((function(e){return l(e.data.data)}))}),[]),Object(j.jsxs)("div",{className:"flex flex-row flex-wrap",children:[Object(j.jsx)("div",{className:"w-full lg:w-3/12",children:Object(j.jsxs)(H,{children:[Object(j.jsx)(W,{title:"Sorting",collapsed:!0,children:Object(j.jsxs)("select",{id:"sorting",className:"w-full p-2",children:[Object(j.jsx)("option",{value:"newest",children:"Popular"}),Object(j.jsx)("option",{value:"newest",children:"Newest"}),Object(j.jsx)("option",{value:"newest",children:"Oldest"}),Object(j.jsx)("option",{value:"newest",children:"Price Ascending"}),Object(j.jsx)("option",{value:"newest",children:"Price Descending"})]})}),Object(j.jsx)(W,{title:"Genres",children:r.map((function(e,t){return Object(j.jsxs)("div",{className:"block mr-2",children:[Object(j.jsx)("input",{type:"checkbox",id:"genre-".concat(t),className:"mr-1"}),Object(j.jsx)("label",{htmlFor:"genre-".concat(t),children:e})]},t)}))}),Object(j.jsx)(W,{title:"Authors",children:Object(j.jsx)("select",{id:"sorting",className:"w-full p-2",children:Object(j.jsx)("option",{defaultChecked:!0,children:"Select Author"})})}),Object(j.jsxs)(W,{title:"Libraries",children:[Object(j.jsx)("b",{children:"Select box"})," with libraries"]}),Object(j.jsx)(W,{title:"Rating",children:Object(j.jsx)("b",{children:"Select rating"})})]})}),Object(j.jsx)("div",{className:"w-full lg:w-9/12 flex flex-row flex-wrap content-start",children:a.map((function(e,t){return Object(j.jsx)("div",{className:"p-2 w-6/12 lg:w-4/12 xl:w-3/12 h-auto",children:Object(j.jsx)(q,{bookTitle:e},t)},t)}))})]})},V=(a(180),function(e){for(var t=e.rating,a=e.className,c=[],s=[],i=Object(n.useState)(null),r=Object(o.a)(i,2),l=r[0],d=r[1],b=function(e){c.push(Object(j.jsx)(z.d,{onMouseEnter:function(){return d(e)},onMouseLeave:function(){return d(null)},className:"".concat(a," transition duration-200 ease-linear cursor-pointer transform ").concat(null!=l&&l>=e&&"scale-125 text-yellow-400"," ").concat(null!=l&&l<=e?"text-gray-400":"text-yellow-400")},e))},m=0;m<t;m++)b(m);for(var u=function(e){s.push(Object(j.jsx)(z.d,{onMouseEnter:function(){return d(e)},onMouseLeave:function(){return d(null)},className:"".concat(a," transition duration-200 ease-linear cursor-pointer transform ").concat(null!=l&&l>=e?"scale-125 text-yellow-400":"")},e))},x=t;x<5;x++)u(x);return Object(j.jsxs)(j.Fragment,{children:[c,s]})}),Y=function(e){var t=e.bookTitle;return Object(j.jsxs)("div",{className:"BookTitle",children:[Object(j.jsx)("div",{className:"BookTitle-image",children:Object(j.jsx)("img",{src:t.photo,alt:t.name})}),Object(j.jsx)("div",{className:"BookTitle-name",children:t.name}),Object(j.jsx)("div",{className:"BookTitle-author",children:t.author}),Object(j.jsxs)("div",{className:"w-full flex flex-row justify-between items-center my-2",children:[Object(j.jsx)("div",{className:"BookTitle-genre",children:Object(j.jsx)(r.b,{to:"/genre/".concat(t.genre),className:"Link mr-2 transform hover:scale-105 transition duration-200 ease-linear",children:t.genre})}),Object(j.jsx)("div",{className:"BookTitle-rating",children:Object(j.jsx)(V,{rating:t.rating%5,className:"h-6"})})]}),Object(j.jsx)("div",{className:"BookTitle-description",children:t.description}),Object(j.jsxs)("div",{className:"BookTitle-details",children:[Object(j.jsx)("div",{className:"font-bold text-lg",children:"Book details:"}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"ISBN:"})," ",t.isbn]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"Publisher:"})," ",t.publisher]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"Date Published:"})," ",t.date_publication]})]}),Object(j.jsx)("div",{className:"border-b border-gray-200 w-1/2 my-4 m-auto"}),Object(j.jsx)("div",{className:"BookTitle-libraries"})]})},Q=(a(181),function(e){return Object(j.jsxs)("div",{className:"Breadcrumb",children:[Object(j.jsx)(P,{to:e.backLink,variant:"primary",size:"sm",className:"Breadcrumb-back",text:"Back",icon:Object(j.jsx)(d.b,{className:"h-4 inline-block mr-1"})}),Object(j.jsx)("nav",{className:"Breadcrumb-items",children:Object(j.jsxs)("ol",{children:[Object(j.jsx)("li",{className:"Breadcrumb-item",children:Object(j.jsx)(r.b,{to:"/",children:"Home"})}),e.items.map((function(e,t){return Object(j.jsx)("li",{className:"Breadcrumb-item ".concat(e.active?"active":""),children:e.active?e.name:Object(j.jsx)(r.b,{to:e.url,children:e.name})},t)}))]})})]})}),X=function(){var e,t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)([]),r=Object(o.a)(i,2),d=r[0],b=(r[1],Object(l.g)().id);Object(n.useEffect)((function(){N.a.get(w("booktitle/:id",{id:b})).then((function(e){return s(e.data)}))}),[]),console.log(d);var m=[{name:"Book Titles",url:"/book-titles"},{name:(null===(e=c.name)||void 0===e?void 0:e.substr(0,15))+"...",url:"/book-titles/".concat(c.id),active:!0}];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(Q,{backLink:"/book-titles",items:m}),Object(j.jsx)(Y,{bookTitle:c})]})},Z=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:e,component:K,exact:!0}),Object(j.jsx)(l.b,{path:"".concat(e,"/:id"),component:X})]})},$=function(){return Object(j.jsx)("div",{children:"Library list"})},ee=function(){var e=Object(l.g)().id;return Object(j.jsxs)("div",{children:["Library ID: ",e]})},te=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:"".concat(e),component:$,exact:!0}),Object(j.jsx)(l.b,{path:"".concat(e,"/:id"),component:ee})]})},ae=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),l=i[0],d=i[1];return Object(j.jsxs)("div",{className:"w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm",children:[Object(j.jsx)("div",{className:"uppercase text-center font-bold text-lg mb-8",children:"Login"}),Object(j.jsxs)("form",{method:"post",onSubmit:function(e){return e.preventDefault(),B.login(a,l)},children:[Object(j.jsxs)("div",{className:"flex flex-col",children:[Object(j.jsx)(J,{type:"username",id:"username",label:"Email",placeholder:"user@example.com",onChange:function(e){return c(e.target.value)}}),Object(j.jsx)(J,{type:"password",id:"password",label:"Password",placeholder:"Password",onChange:function(e){return d(e.target.value)}})]}),Object(j.jsx)(_,{type:"submit",variant:"primary",text:"Login",className:"block w-full"})]}),Object(j.jsxs)("div",{className:"text-center mt-4",children:["Don't have an account?",Object(j.jsx)(r.b,{to:"/account/register",className:"Link ml-1",children:"Create one"}),"."]})]})},ne=function(){return Object(j.jsxs)("div",{className:"w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm",children:[Object(j.jsx)("div",{className:"uppercase text-center font-bold text-lg mb-8",children:"Create an account"}),Object(j.jsxs)("div",{className:"flex flex-col",children:[Object(j.jsxs)("div",{className:"flex flex-row",children:[Object(j.jsx)("div",{className:"pr-2",children:Object(j.jsx)(J,{type:"text",id:"first_name",label:"First Name",placeholder:"Joe"})}),Object(j.jsx)("div",{className:"pl-2",children:Object(j.jsx)(J,{type:"text",id:"last_name",label:"Last Name",placeholder:"Doe"})})]}),Object(j.jsx)(J,{type:"email",id:"email",label:"Email",placeholder:"joe.doe@example.com"}),Object(j.jsx)(J,{type:"password",id:"password",label:"Password",placeholder:"Password"}),Object(j.jsx)(J,{type:"password",id:"confirm_password",label:"Confirm Password",placeholder:"Confirm Password"})]}),Object(j.jsx)(_,{to:"submit",variant:"primary",text:"Login",className:"block w-full"}),Object(j.jsxs)("div",{className:"text-center mt-4",children:["Already have an account?",Object(j.jsx)(r.b,{to:"/account/login",className:"Link ml-1",children:"Log in"}),"."]})]})},ce=function(){return Object(j.jsx)("div",{className:"Content",children:Object(j.jsxs)("div",{className:"flex items-center",children:[Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)(d.q,{className:"mx-auto h-32 bg-indigo-600 text-white rounded-full p-4"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:"Janko Hra\u0161ko"}),Object(j.jsx)("div",{className:"italic text-center",children:"I love 50 shades of gray."})]}),Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)("h1",{className:"Content-Title",children:"Account Information"}),Object(j.jsx)(J,{type:"text",id:"first_name",label:"First Name",placeholder:"Joe"}),Object(j.jsx)(J,{type:"text",id:"last_name",label:"Last Name",placeholder:"Doe"}),Object(j.jsx)(J,{type:"email",id:"email",label:"E-Mail",placeholder:"user@example.com"}),Object(j.jsx)("hr",{}),Object(j.jsx)("h1",{className:"Content-Title",children:"Change Password"}),Object(j.jsx)(J,{type:"password",id:"old_password",label:"Old Password",placeholder:"*******"}),Object(j.jsx)(J,{type:"password",id:"new_password",label:"New Password",placeholder:"*******"}),Object(j.jsx)(J,{type:"password",id:"new_password_confirm",label:"New Confirm Password",placeholder:"*******"}),Object(j.jsx)("div",{className:"flex flex-end",children:Object(j.jsx)(_,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"})})})]})]})})},se=function(){return B.isAuthenticated()?Object(j.jsx)(l.a,{to:"account/profile"}):Object(j.jsx)(l.a,{to:"account/login"})},ie=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:"".concat(e,"/login"),component:ae}),Object(j.jsx)(l.b,{path:"".concat(e,"/register"),component:ne}),Object(j.jsx)(S,{path:"".concat(e,"/profile"),component:ce}),Object(j.jsx)(l.b,{path:"/",component:se})]})},re=function(){return B.isAuthenticated()&&B.allowedDashboard()?Object(j.jsx)(l.a,{to:"/admin/dashboard"}):Object(j.jsx)(h,{})},le=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{exact:!0,path:e,component:re}),je.map((function(t,a){return Object(j.jsx)(C,{path:e+t.url,component:t.component,roles:t.roles,exact:t.exact},a)}))]})},oe=[{name:"Book Titles",url:"/admin/book-titles",icon:Object(j.jsx)(d.c,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin","librarian","distributor"]},{name:"Libraries",url:"/admin/libraries",icon:Object(j.jsx)(d.i,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin"]},{name:"Library",url:"/admin/libraries/1",icon:Object(j.jsx)(d.i,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Reservations",url:"/admin/libraries/1/reservations",icon:Object(j.jsx)(d.e,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Borrowings",url:"/admin/libraries/1/borrowings",icon:Object(j.jsx)(d.o,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Users",url:"/admin/users",icon:Object(j.jsx)(d.q,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin"]},{name:"Stock",url:"/admin/libraries/1/stock",icon:Object(j.jsx)(d.a,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Orders",url:"/admin/orders",icon:Object(j.jsx)(d.f,{className:"h-12 mx-auto text-indigo-600"}),roles:["distributor"]}],de=[{name:"Home",url:"/",component:M,exact:!0},{name:"BookTitle",url:"/book-titles",component:Z},{name:"Library",url:"/libraries",component:te},{name:"Account",url:"/account",component:ie},{name:"Admin",url:"/admin",component:le}],je=[{name:"Dashboard",url:"/dashboard",roles:["admin","librarian","distributor"],component:function(){Object(l.h)().path;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("h1",{className:"text-2xl text-center font-bold",children:["Welcome back, ",L]}),Object(j.jsx)("div",{className:"flex items-center flex-wrap",children:oe.map((function(e,t){return!!e.roles.find((function(e){return e===L}))&&Object(j.jsx)("div",{className:"w-3/12 p-2",children:Object(j.jsxs)(r.b,{to:e.url,className:"block border border-gray-200 rounded-md text-center px-4 py-8 hover:shadow-md transition",children:[e.icon,Object(j.jsx)("div",{className:"text-xl font-semibold text-indigo-600 mt-4",children:e.name})]},t)},t)}))})]})}},{name:"BookTitleList",url:"/book-titles",roles:["admin","librarian","distributor"],component:function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),r=i[0],l=i[1];return Object(n.useEffect)((function(){N.a.get(w("booktitle")).then((function(e){return l(e.data.data)}))}),[a]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"flex justify-between",children:[Object(j.jsx)(P,{to:"/admin",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)(P,{to:be("BookTitleCreate"),variant:"green",icon:Object(j.jsx)(d.l,{className:"h-6 mr-1"}),text:"New Book"})]}),Object(j.jsxs)("div",{className:"Content mt-4",children:[a&&Object(j.jsx)(I,{message:a.message,type:a.type,onClick:function(){return c(null)}}),Object(j.jsx)("h1",{className:"Content-Title",children:"Book titles"}),Object(j.jsxs)("table",{className:"table-auto w-full",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{className:"text-left",children:[Object(j.jsx)("th",{children:"#"}),Object(j.jsx)("th",{}),Object(j.jsx)("th",{children:"Name"}),Object(j.jsx)("th",{children:"Actions"})]})}),Object(j.jsx)("tbody",{children:r.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.id}),Object(j.jsx)("td",{className:"w-2/12",children:Object(j.jsx)("img",{src:e.photo,alt:e.name,className:"h-16"})}),Object(j.jsx)("td",{children:e.name}),Object(j.jsx)("td",{className:"w-1/4",children:Object(j.jsxs)("div",{className:"flex items-center gap-2",children:[Object(j.jsx)(P,{to:"/book-titles/"+e.id,variant:"primary",icon:Object(j.jsx)(d.h,{className:"h-6 mr-1"}),text:"Open",hideTextSm:!0,target:"_blank"}),Object(j.jsx)(P,{to:be("BookTitleEdit",{id:e.id}),variant:"yellow",icon:Object(j.jsx)(d.k,{className:"h-6 mr-1"}),text:"Edit",hideTextSm:!0}),Object(j.jsx)(_,{type:"button",variant:"red",icon:Object(j.jsx)(d.p,{className:"h-6 mr-1"}),text:"Delete",hideTextSm:!0,onClick:function(){return t=e.id,void N.a.delete(w("booktitle/:id",{id:t})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),c({message:"Book Title Deleted",type:"success"})):(window.scrollTo(0,0),c({message:e.data.message,type:"danger"}))}));var t}})]})})]},t)}))})]})]})]})},exact:!0},{name:"BookTitleCreate",url:"/book-titles/create",roles:["admin","librarian","distributor"],component:function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:"/admin",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("form",{method:"post",onSubmit:function(e){e.preventDefault();var t,a=new FormData(e.target),n={},s=Object(U.a)(a.entries());try{for(s.s();!(t=s.n()).done;){var i=t.value;n[i[0]]=i[1]}}catch(r){s.e(r)}finally{s.f()}N.a.post(w("booktitle"),y.a.stringify({name:n.name,author:n.author,publisher:n.publisher,isbn:n.isbn,genre:n.genre,description:n.description,rating:n.rating,photo:n.photo,date_publication:n.date_publication})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),c({message:"Book Title Created Successfully",type:"success"})):(window.scrollTo(0,0),c({message:e.data.message,type:"danger"}))}))},children:[a&&Object(j.jsx)(I,{message:a.message,type:a.type,onClick:function(){return c(null)}}),Object(j.jsx)(J,{type:"text",id:"name",name:"name",label:"Book Name",placeholder:"Example Book"}),Object(j.jsx)(J,{type:"text",id:"author",name:"author",label:"Author",placeholder:"Joe Doe"}),Object(j.jsx)(J,{type:"text",id:"isbn",name:"isbn",label:"ISBN",placeholder:"3232183828"}),Object(j.jsx)(J,{type:"text",id:"date_publication",name:"date_publication",label:"Publish Date",placeholder:"1998"}),Object(j.jsx)(J,{type:"text",id:"publisher",name:"publisher",label:"Publisher",placeholder:"Example Publisher"}),Object(j.jsx)(J,{type:"text",id:"genre",name:"genre",label:"Genre",placeholder:"e.g. Action"}),Object(j.jsx)(J,{type:"number",id:"rating",name:"rating",label:"Rating",placeholder:"10"}),Object(j.jsx)(J,{type:"text",id:"photo",name:"photo",label:"Picture",placeholder:"https://mrtns.eu/tovar/_l/440/l440953.jpg"}),Object(j.jsx)(G,{type:"text",id:"description",name:"description",label:"Description",placeholder:"Lorem ipsum..."}),Object(j.jsx)("div",{className:"flex items-end",children:Object(j.jsx)(_,{type:"submit",text:"Create",variant:"green",className:"ml-auto",icon:Object(j.jsx)(d.l,{className:"h-6 mr-1"})})})]})})]})}},{name:"BookTitleEdit",url:"/book-titles/:id/edit",roles:["admin","librarian","distributor"],component:function(){var e=Object(l.g)().id,t=Object(n.useState)([]),a=Object(o.a)(t,2),c=a[0],s=a[1];return Object(n.useEffect)((function(){N.a.get(w("booktitle/:id",{id:e})).then((function(e){return s(e.data.data)}))})),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:"/admin/book-titles",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("div",{className:"flex items-center",children:[Object(j.jsxs)("div",{className:"w-6/12 text-center",children:[Object(j.jsx)("img",{src:c.photo,alt:c.name,className:"h-64 inline"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:c.name}),Object(j.jsx)("div",{className:"italic text-center",children:c.author})]}),Object(j.jsxs)("form",{method:"post",className:"w-6/12",onSubmit:function(e){e.preventDefault();var t,a=new FormData(e.target),n={},s=Object(U.a)(a.entries());try{for(s.s();!(t=s.n()).done;){var r=t.value;n[r[0]]=r[1]}}catch(l){s.e(l)}finally{s.f()}N.a.put(w("booktitle/:id",{id:c.id}),y.a.stringify({name:n.name,author:n.author,publisher:n.publisher,isbn:n.isbn,genre:n.genre,description:n.description,rating:n.rating,photo:n.photo,date_publication:n.date_publication})).then((function(e){"success"===e.data.status?console.log(e.data):i.a.render(Object(j.jsx)(I,{className:"block",message:e.data.message,type:"danger",closeable:!0}),document.getElementById("validation"))}))},children:[Object(j.jsx)("div",{id:"validation"}),Object(j.jsx)(J,{type:"text",id:"name",name:"name",label:"Book Name",value:c.name,placeholder:"Example Book"}),Object(j.jsx)(J,{type:"text",id:"author",name:"author",label:"Author",value:c.author,placeholder:"Joe Doe"}),Object(j.jsx)(J,{type:"text",id:"isbn",name:"isbn",label:"ISBN",value:c.isbn,placeholder:"3232183828"}),Object(j.jsx)(J,{type:"text",id:"date_publication",name:"date_publication",value:c.date_publication,placeholder:"1998",label:"Publish Date"}),Object(j.jsx)(J,{type:"text",id:"publisher",name:"publisher",label:"Publisher",value:c.publisher,placeholder:"Example Publisher"}),Object(j.jsx)(J,{type:"text",id:"genre",name:"genre",label:"Genre",value:c.genre,placeholder:"e.g. Action"}),Object(j.jsx)(J,{type:"number",id:"rating",name:"rating",label:"Rating",value:c.rating,placeholder:"10"}),Object(j.jsx)(J,{type:"text",id:"photo",name:"photo",label:"Picture",value:c.photo,placeholder:"https://mrtns.eu/tovar/_l/440/l440953.jpg"}),Object(j.jsx)(G,{type:"text",id:"description",name:"description",label:"Description",value:c.description,placeholder:"Lorem ipsum..."}),Object(j.jsx)("div",{className:"flex items-end",children:Object(j.jsx)(_,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"})})})]})]})})]})}},{name:"LibraryList",url:"/libraries",roles:["admin"],component:function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:"/admin",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6"}),text:"Back"}),Object(j.jsxs)("div",{className:"Content mt-4",children:[Object(j.jsx)("h1",{className:"Content-Title",children:"Libraries"}),Object(j.jsxs)("table",{className:"table-auto w-full overflow-x-scroll",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{className:"text-left",children:[Object(j.jsx)("th",{children:"#"}),Object(j.jsx)("th",{children:"Name"}),Object(j.jsx)("th",{children:"Place"}),Object(j.jsx)("th",{children:"Actions"})]})}),Object(j.jsx)("tbody",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:"1"}),Object(j.jsx)("td",{children:"Lorem ipsum"}),Object(j.jsx)("td",{children:"London, GB"}),Object(j.jsx)("td",{className:"w-1/4",children:Object(j.jsxs)("div",{className:"flex items-center gap-2",children:[Object(j.jsx)(P,{to:be("LibraryShow",{id:1}),variant:"primary",icon:Object(j.jsx)(d.h,{className:"h-6 mr-1"}),text:"Open",hideTextSm:!0}),Object(j.jsx)(P,{to:be("LibraryEdit",{id:1}),variant:"yellow",icon:Object(j.jsx)(d.k,{className:"h-6 mr-1"}),text:"Edit",hideTextSm:!0}),Object(j.jsx)(P,{to:be("LibraryStock",{id:1}),variant:"green",icon:Object(j.jsx)(d.a,{className:"h-6 mr-1"}),text:"Stock",hideTextSm:!0}),Object(j.jsx)(_,{type:"button",variant:"red",icon:Object(j.jsx)(d.p,{className:"h-6 mr-1"}),text:"Delete",hideTextSm:!0})]})})]})})]})]})]})},exact:!0},{name:"LibraryShow",url:"/libraries/:id",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryShow"})},exact:!0},{name:"LibraryEdit",url:"/libraries/:id/edit",roles:["admin","librarian"],component:function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:"/admin/libraries",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("div",{className:"flex items-center",children:[Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)(d.c,{className:"mx-auto h-32 bg-indigo-600 text-white rounded-full p-4"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:"Lorem Ipsum"}),Object(j.jsx)("div",{className:"italic text-center",children:"I love 50 shades of gray."})]}),Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)(J,{type:"text",id:"name",label:"Book Name",placeholder:"Example Book"}),Object(j.jsx)(J,{type:"text",id:"author",label:"Author",placeholder:"Joe Doe"}),Object(j.jsx)(J,{type:"text",id:"isbn",label:"ISBN",placeholder:"3232183828"}),Object(j.jsx)(J,{type:"time",id:"release_date",label:"Release Date"}),Object(j.jsx)(J,{type:"text",id:"publisher",label:"Publisher",placeholder:"Example Publisher"}),Object(j.jsx)(J,{type:"text",id:"genre",label:"Genre",placeholder:"e.g. Action"}),Object(j.jsx)("div",{className:"flex flex-end",children:Object(j.jsx)(_,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"})})})]})]})})]})}},{name:"LibraryReservations",url:"/libraries/:id/reservations",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryReservations"})}},{name:"LibraryBorrowings",url:"/libraries/:id/borrowings",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryBorrowings"})}},{name:"LibraryStock",url:"/libraries/:id/stock",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryStock"})}},{name:"UserList",url:"/users",roles:["admin"],component:function(){return Object(j.jsx)("div",{children:"UserList"})}},{name:"UserEdit",url:"/users/:id/edit",roles:["admin"],component:function(){return Object(j.jsx)("div",{children:"UserEdit"})}}],be=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n="/admin";if(void 0!==(t=je.find((function(t){return t.name===e?n+t:void 0})).url))for(var c in a)t=t.replace(":".concat(c),a[c]);return t=n+t};var me=function(){return Object(j.jsxs)(r.a,{children:[Object(j.jsx)(D,{}),Object(j.jsx)(F,{children:Object(j.jsx)(l.d,{children:de.map((function(e,t){return Object(j.jsx)(l.b,{path:e.url,component:e.component,exact:e.exact},t)}))})}),Object(j.jsx)(E,{})]})};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(me,{})}),document.getElementById("root"))},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},77:function(e,t,a){}},[[182,1,2]]]);
//# sourceMappingURL=main.01e3efba.chunk.js.map