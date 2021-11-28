(this["webpackJsonpbook-garden"]=this["webpackJsonpbook-garden"]||[]).push([[0],{172:function(e,t,a){},173:function(e,t,a){},174:function(e,t,a){},175:function(e,t,a){},176:function(e,t,a){},177:function(e,t,a){},178:function(e,t,a){},179:function(e,t,a){},180:function(e,t,a){},181:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(16),i=a.n(s),r=(a(72),a(73),a(3)),l=a(6),o=(a(74),a(4)),d=a(2);a(75);var j=a(1),b=function(){var e,t,a=Object(n.useState)(!1),c=Object(o.a)(a,2),s=c[0],i=c[1],r=Object(n.useRef)();return e=r,t=function(){return i(!1)},Object(n.useEffect)((function(){var a=function(a){e.current&&!e.current.contains(a.target)&&t(a)};return document.addEventListener("mousedown",a),document.addEventListener("touchstart",a),function(){document.removeEventListener("mousedown",a),document.removeEventListener("touchstart",a)}}),[e,t]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"Navbar-search ".concat(s?"expanded":""),ref:r,children:[Object(j.jsx)("label",{htmlFor:"search",className:"sr-only",children:"Search:"}),Object(j.jsx)("input",{type:"text",id:"search",placeholder:"Search for books, authors...",className:"bg-white md:bg-gray-100 py-1.5 px-4 rounded-md outline-none",style:{minWidth:"300px"}}),Object(j.jsx)("button",{className:"Navbar-search-close",onClick:function(){return i(!1)},children:Object(j.jsx)(d.s,{className:"h-6"})})]}),Object(j.jsx)("button",{className:"Navbar-link flex md:hidden",onClick:function(){return i(!s)},children:Object(j.jsx)(d.o,{className:"h-6"})})]})},u=(a(77),a(67)),m=a(36),x=a.p+"static/media/error.a4a48fb8.svg",h=function(){return Object(j.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[Object(j.jsx)("div",{className:"mb-4 text-4xl font-bold text-red-500",children:"403"}),Object(j.jsx)("div",{className:"mb-8 text-2xl text-gray-600",children:"Not Authorized"}),Object(j.jsx)("img",{src:x,alt:"Not Authorized",className:"h-60"})]})},O=a(62),p=a(63),f=a(64),v=a(5),g=a.n(v),N=a(10),y=a.n(N),w="http://book-garden.herokuapp.com/api/",k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var a in t)e=e.replace(":".concat(a),t[a]);return w+e},B=function(){function e(){Object(p.a)(this,e),this.init()}return Object(f.a)(e,[{key:"init",value:function(){this.authenticated=!1,this.id=null,this.username="",this.type="",this.library_id=null,this.name="",this.surname="",this.profiledesc=""}},{key:"login",value:function(e,t){var a=this;return g.a.post(k("session"),y.a.stringify({username:e,password:t})).then((function(e){return a.authenticated=!0,a.id=e.data.data.user_id,a.type=a.convertToUserType(e.data.data.user_type),g.a.get(k("person/:id",{id:a.id})).then((function(e){return a.username=e.data.data.username,a.library_id=e.data.data.library_id,a.name=e.data.data.name,a.surname=e.data.data.surname,a.profiledesc=e.data.data.profiledesc,a.allowedDashboard?Object(j.jsx)(l.a,{to:"/admin"}):Object(j.jsx)(l.a,{to:"/account/profile"})}))}))}},{key:"logout",value:function(){var e=this;return g.a.delete(k("session").then((function(t){if("success"===t.data.status)return e.init(),Object(j.jsx)(l.a,{to:"/"})}))).catch((function(e){return console.log(e)}))}},{key:"isAuthenticated",value:function(){var e=this;return g.a.get(k("session")).then((function(t){return e.id===t.data.data.user_id&&e.type===e.convertToUserType(t.data.data.user_type)})).catch((function(e){return console.log(e)}))}},{key:"allowedDashboard",value:function(){return this.isAdmin()||this.isLibrarian()||this.isDistributor()}},{key:"getUserType",value:function(){return this.type}},{key:"getUsername",value:function(){return this.username}},{key:"isAdmin",value:function(){return this.isAuthenticated()&&"admin"===this.type}},{key:"isLibrarian",value:function(){return this.isAuthenticated()&&"librarian"===this.type}},{key:"isDistributor",value:function(){return this.isAuthenticated()&&"distributor"===this.type}},{key:"isUser",value:function(){return this.isAuthenticated()&&"user"===this.type}},{key:"convertToUserType",value:function(e){return 5===e?"admin":4===e?"librarian":3===e?"distributor":"user"}}]),e}(),L=new B,T=["roles"],S=function(e){var t=Object.assign({},e);return L.isAuthenticated()?Object(j.jsx)(l.b,Object(m.a)({},t)):Object(j.jsx)(l.a,{to:"/account/login"})},C=function(e){var t=e.roles,a=Object(u.a)(e,T);return L.isAuthenticated()&&(Object(O.isArray)(t)&&t.find((function(e){return e===L.getUserType()}))||"all"===t)?Object(j.jsx)(l.b,Object(m.a)({},a)):Object(j.jsx)(h,{})},D=function(){return Object(j.jsxs)("nav",{className:"Navbar Container",children:[Object(j.jsxs)(r.b,{to:"/",className:"Navbar-logo",children:[Object(j.jsx)("b",{children:"BOOK"}),"Garden"]}),Object(j.jsxs)("div",{className:"Navbar-items",children:[Object(j.jsx)(b,{}),Object(j.jsxs)(r.b,{to:"/account",className:"Navbar-link",children:[Object(j.jsx)(d.r,{className:"h-6"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"user"})]}),L.isAuthenticated()&&L.allowedDashboard()&&Object(j.jsxs)(r.b,{to:"/admin",className:"Navbar-link",children:[Object(j.jsx)(d.h,{className:"h-6 inline mr-2"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"Admin"})]}),L.isAuthenticated()&&Object(j.jsxs)(r.b,{to:"/admin",className:"Navbar-link",children:[Object(j.jsx)(d.k,{className:"h-6 inline mr-2"}),Object(j.jsx)("span",{className:"hidden xl:inline",children:"Log out"})]})]})]})},_=function(){return Object(j.jsx)("header",{className:"Header",children:Object(j.jsx)(D,{})})},A=(a(172),function(e){var t=e.children;return Object(j.jsx)("main",{className:"Main Container",children:t})}),E=(a(173),function(){return Object(j.jsx)("footer",{className:"Footer",children:Object(j.jsxs)("div",{className:"Footer-container Container",children:["\xa9 2021 ",Object(j.jsx)("b",{children:"BOOK"}),"Garden"]})})}),F=(a(174),function(e){var t=e.icon,a=e.text,n=e.type,c=e.variant,s=void 0===c?"":c,i=e.size,r=void 0===i?"":i,l=e.style,o=void 0===l?{}:l,d=e.className,b=void 0===d?"":d,u=e.hideTextSm,m=void 0!==u&&u,x=e.onClick;return t?Object(j.jsxs)("button",{type:n,className:"Button ".concat(s," ").concat(r," ").concat(b),style:o,onClick:x,children:[t,Object(j.jsx)("span",{className:m?"hidden md:block":"",children:a})]}):Object(j.jsx)("button",{type:n,className:"Button ".concat(s," ").concat(r," ").concat(b),style:o,onClick:x,children:a})}),P=function(e){var t=e.icon,a=e.text,n=e.to,c=e.variant,s=void 0===c?"":c,i=e.size,l=void 0===i?"":i,o=e.style,d=void 0===o?{}:o,b=e.className,u=void 0===b?"":b,m=e.hideTextSm,x=void 0!==m&&m,h=e.target;return t?Object(j.jsxs)(r.b,{to:n,className:"Button ".concat(s," ").concat(l," ").concat(u),style:d,target:h,children:[t,Object(j.jsx)("span",{className:x?"hidden md:block":"",children:a})]}):Object(j.jsx)(r.b,{to:n,className:"Button ".concat(s," ").concat(l," ").concat(u),style:d,target:h,children:a})},I=(a(175),function(e){var t=e.className,a=e.message,n=e.type,c=e.onClick;return Object(j.jsx)("div",{className:"Alert Alert-".concat(n," ").concat(null!==t&&void 0!==t?t:""),onClick:c,children:a})}),U=function(e){return Object(j.jsx)("table",{className:"table-auto w-full",children:e.children})},R=function(e){return Object(j.jsx)("thead",{className:"bg-gray-800 text-white",children:e.children})},M=function(e){return Object(j.jsx)("tbody",{className:"text-gray-700",children:e.children})},z=function(e){return Object(j.jsx)("tr",{className:"".concat(e.striped&&e.index%2?"bg-gray-100":""," text-left"),children:e.children})},J=function(e){var t;return Object(j.jsx)("th",{className:"".concat(null!==(t=e.className)&&void 0!==t?t:""," text-left py-3 px-4 uppercase font-semibold text-sm"),children:e.children})},G=function(e){return Object(j.jsx)("td",{className:"py-3 px-4",children:e.children})},H=a(14),q=(a(176),function(e){var t=e.id,a=e.type,n=e.label,c=e.value,s=e.name,i=e.placeholder,r=e.hideLabel,l=e.onChange,o=e.min,d=e.max;return Object(j.jsxs)("div",{className:"Form-control",children:[Object(j.jsx)("label",{htmlFor:t,className:"Form-control-label ".concat(r?"sr-only":""),children:n}),Object(j.jsx)("input",{type:a,id:t,name:s,placeholder:i,className:"Form-control-input",onChange:l,defaultValue:c,min:o,max:d})]})}),W=(a(177),function(e){var t=e.id,a=e.label,n=e.value,c=e.name,s=e.placeholder,i=e.hideLabel,r=e.onChange;return Object(j.jsxs)("div",{className:"Textarea",children:[Object(j.jsx)("label",{htmlFor:t,className:"Textarea-label ".concat(i?"sr-only":""),children:a}),Object(j.jsx)("textarea",{id:t,name:c,placeholder:s,className:"Textarea-input",onChange:r,defaultValue:n})]})}),K=a.p+"static/media/header.b220e1bf.svg",V=a(11),Y=function(){return Object(j.jsxs)("div",{className:"flex flex-col lg:flex-row justify-between items-center gap-8 h-full",children:[Object(j.jsxs)("div",{className:"mb-8 lg:mb-0",children:[Object(j.jsxs)("div",{className:"text-3xl text-center sm:text-5xl sm:text-left font-bold",children:["Your Favorite",Object(j.jsx)("br",{}),"Book Finder."]}),Object(j.jsx)("div",{className:"text-2xl text-center sm:text-left py-8 md:py-16",children:"When it comes to reading time, we are here to bring you your favorite book, from your favorite library."}),Object(j.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row md:gap-8",children:[Object(j.jsx)(P,{to:"/book-titles",text:"Find a Book",variant:"primary",size:"lg",icon:Object(j.jsx)(d.c,{className:"h-6 w-6 inline pr-1"})}),Object(j.jsx)(P,{to:"/libraries",text:"Find a Library",variant:"secondary",size:"lg",icon:Object(j.jsx)(V.c,{className:"h-6 w-6 inline pr-1"})})]})]}),Object(j.jsx)("div",{children:Object(j.jsx)("img",{src:K,alt:"BookGarden"})})]})},Q=(a(178),function(e){var t=e.bookTitle;return Object(j.jsxs)(r.b,{to:"/book-titles/".concat(t.id),className:"BookTitleItem",children:[Object(j.jsx)("img",{className:"BookTitleItem-image",alt:t.name}),Object(j.jsx)("div",{className:"BookTitleItem-name",children:t.name}),Object(j.jsx)("div",{className:"BookTitleItem-genre",children:t.genre})]})}),X=(a(179),function(e){var t=e.children;return Object(j.jsx)("div",{className:"FilterDropdown",children:t})}),Z=function(e){var t=Object(n.useState)(e.collapsed),a=Object(o.a)(t,2),c=a[0],s=a[1];return Object(j.jsxs)("div",{className:"FilterDropdownItem ".concat(c?"collapsed":""),children:[Object(j.jsxs)("div",{className:"FilterDropdownItem-header",onClick:function(){return s(!c)},children:[e.title,c?Object(j.jsx)(V.a,{className:"FilterDropdownItem-icon"}):Object(j.jsx)(V.b,{className:"FilterDropdownItem-icon"})]}),Object(j.jsx)("div",{className:"FilterDropdownItem-body",children:e.children})]})},$=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),r=i[0],l=i[1];return Object(n.useEffect)((function(){g.a.get(k("booktitle")).then((function(e){return c(e.data.data)})).catch((function(e){return console.log(e)})),g.a.get(k("booktitle/unique/genres")).then((function(e){return l(e.data.data)})).catch((function(e){return console.log(e)}))}),[]),Object(j.jsxs)("div",{className:"flex flex-row flex-wrap",children:[Object(j.jsx)("div",{className:"w-full lg:w-3/12",children:Object(j.jsxs)(X,{children:[Object(j.jsx)(Z,{title:"Sorting",collapsed:!0,children:Object(j.jsxs)("select",{id:"sorting",className:"w-full p-2",children:[Object(j.jsx)("option",{value:"newest",children:"Popular"}),Object(j.jsx)("option",{value:"newest",children:"Newest"}),Object(j.jsx)("option",{value:"newest",children:"Oldest"}),Object(j.jsx)("option",{value:"newest",children:"Price Ascending"}),Object(j.jsx)("option",{value:"newest",children:"Price Descending"})]})}),Object(j.jsx)(Z,{title:"Genres",children:r.map((function(e,t){return Object(j.jsxs)("div",{className:"block mr-2",children:[Object(j.jsx)("input",{type:"checkbox",id:"genre-".concat(t),className:"mr-1"}),Object(j.jsx)("label",{htmlFor:"genre-".concat(t),children:e})]},t)}))}),Object(j.jsx)(Z,{title:"Authors",children:Object(j.jsx)("select",{id:"sorting",className:"w-full p-2",children:Object(j.jsx)("option",{defaultChecked:!0,children:"Select Author"})})}),Object(j.jsxs)(Z,{title:"Libraries",children:[Object(j.jsx)("b",{children:"Select box"})," with libraries"]}),Object(j.jsx)(Z,{title:"Rating",children:Object(j.jsx)("b",{children:"Select rating"})})]})}),Object(j.jsx)("div",{className:"w-full lg:w-9/12 flex flex-row flex-wrap content-start",children:a.map((function(e,t){return Object(j.jsx)("div",{className:"p-2 w-6/12 lg:w-4/12 xl:w-3/12 h-auto",children:Object(j.jsx)(Q,{bookTitle:e},t)},t)}))})]})},ee=(a(180),function(e){for(var t=e.rating,a=e.className,c=[],s=[],i=Object(n.useState)(null),r=Object(o.a)(i,2),l=r[0],d=r[1],b=function(e){c.push(Object(j.jsx)(V.d,{onMouseEnter:function(){return d(e)},onMouseLeave:function(){return d(null)},className:"".concat(a," transition duration-200 ease-linear cursor-pointer transform ").concat(null!=l&&l>=e&&"scale-125 text-yellow-400"," ").concat(null!=l&&l<=e?"text-gray-400":"text-yellow-400")},e))},u=0;u<t;u++)b(u);for(var m=function(e){s.push(Object(j.jsx)(V.d,{onMouseEnter:function(){return d(e)},onMouseLeave:function(){return d(null)},className:"".concat(a," transition duration-200 ease-linear cursor-pointer transform ").concat(null!=l&&l>=e?"scale-125 text-yellow-400":"")},e))},x=t;x<5;x++)m(x);return Object(j.jsxs)(j.Fragment,{children:[c,s]})}),te=function(e){var t=e.bookTitle;return Object(j.jsxs)("div",{className:"BookTitle",children:[Object(j.jsx)("div",{className:"BookTitle-image",children:Object(j.jsx)("img",{src:t.photo,alt:t.name})}),Object(j.jsx)("div",{className:"BookTitle-name",children:t.name}),Object(j.jsx)("div",{className:"BookTitle-author",children:t.author}),Object(j.jsxs)("div",{className:"w-full flex flex-row justify-between items-center my-2",children:[Object(j.jsx)("div",{className:"BookTitle-genre",children:Object(j.jsx)(r.b,{to:"/genre/".concat(t.genre),className:"Link mr-2 transform hover:scale-105 transition duration-200 ease-linear",children:t.genre})}),Object(j.jsx)("div",{className:"BookTitle-rating",children:Object(j.jsx)(ee,{rating:t.rating%5,className:"h-6"})})]}),Object(j.jsx)("div",{className:"BookTitle-description",children:t.description}),Object(j.jsxs)("div",{className:"BookTitle-details",children:[Object(j.jsx)("div",{className:"font-bold text-lg",children:"Book details:"}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"ISBN:"})," ",t.isbn]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"Publisher:"})," ",t.publisher]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("b",{children:"Date Published:"})," ",t.date_publication]})]}),Object(j.jsx)("div",{className:"border-b border-gray-200 w-1/2 my-4 m-auto"}),Object(j.jsx)("div",{className:"BookTitle-libraries"})]})},ae=(a(181),function(e){return Object(j.jsxs)("div",{className:"Breadcrumb",children:[Object(j.jsx)(P,{to:e.backLink,variant:"primary",size:"sm",className:"Breadcrumb-back",text:"Back",icon:Object(j.jsx)(d.b,{className:"h-4 inline-block mr-1"})}),Object(j.jsx)("nav",{className:"Breadcrumb-items",children:Object(j.jsxs)("ol",{children:[Object(j.jsx)("li",{className:"Breadcrumb-item",children:Object(j.jsx)(r.b,{to:"/",children:"Home"})}),e.items.map((function(e,t){return Object(j.jsx)("li",{className:"Breadcrumb-item ".concat(e.active?"active":""),children:e.active?e.name:Object(j.jsx)(r.b,{to:e.url,children:e.name})},t)}))]})})]})}),ne=function(){var e,t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)([]),r=Object(o.a)(i,2),d=r[0],b=(r[1],Object(l.g)().id);Object(n.useEffect)((function(){g.a.get(k("booktitle/:id",{id:b})).then((function(e){return s(e.data.data)})).catch((function(e){return console.log(e)}))}),[]),console.log(d);var u=[{name:"Book Titles",url:"/book-titles"},{name:(null===(e=c.name)||void 0===e?void 0:e.substr(0,15))+"...",url:"/book-titles/".concat(c.id),active:!0}];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(ae,{backLink:"/book-titles",items:u}),Object(j.jsx)(te,{bookTitle:c})]})},ce=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:e,component:$,exact:!0}),Object(j.jsx)(l.b,{path:"".concat(e,"/:id"),component:ne})]})},se=function(){return Object(j.jsx)("div",{children:"Library list"})},ie=function(){var e=Object(l.g)().id;return Object(j.jsxs)("div",{children:["Library ID: ",e]})},re=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:"".concat(e),component:se,exact:!0}),Object(j.jsx)(l.b,{path:"".concat(e,"/:id"),component:ie})]})},le=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),l=i[0],d=i[1];return Object(j.jsxs)("div",{className:"w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm",children:[Object(j.jsx)("div",{className:"uppercase text-center font-bold text-lg mb-8",children:"Login"}),Object(j.jsxs)("form",{method:"post",onSubmit:function(e){return e.preventDefault(),L.login(a,l)},children:[Object(j.jsxs)("div",{className:"flex flex-col",children:[Object(j.jsx)(q,{type:"username",id:"username",label:"Email",placeholder:"user@example.com",onChange:function(e){return c(e.target.value)}}),Object(j.jsx)(q,{type:"password",id:"password",label:"Password",placeholder:"Password",onChange:function(e){return d(e.target.value)}})]}),Object(j.jsx)(F,{type:"submit",variant:"primary",text:"Login",className:"block w-full"})]}),Object(j.jsxs)("div",{className:"text-center mt-4",children:["Don't have an account?",Object(j.jsx)(r.b,{to:"/account/register",className:"Link ml-1",children:"Create one"}),"."]})]})},oe=function(){return Object(j.jsxs)("div",{className:"w-full sm:w-6/12 xl:w-4/12 mx-auto py-16 px-8 bg-white shadow-sm",children:[Object(j.jsx)("div",{className:"uppercase text-center font-bold text-lg mb-8",children:"Create an account"}),Object(j.jsxs)("div",{className:"flex flex-col",children:[Object(j.jsxs)("div",{className:"flex flex-row",children:[Object(j.jsx)("div",{className:"pr-2",children:Object(j.jsx)(q,{type:"text",id:"first_name",label:"First Name",placeholder:"Joe"})}),Object(j.jsx)("div",{className:"pl-2",children:Object(j.jsx)(q,{type:"text",id:"last_name",label:"Last Name",placeholder:"Doe"})})]}),Object(j.jsx)(q,{type:"email",id:"email",label:"Email",placeholder:"joe.doe@example.com"}),Object(j.jsx)(q,{type:"password",id:"password",label:"Password",placeholder:"Password"}),Object(j.jsx)(q,{type:"password",id:"confirm_password",label:"Confirm Password",placeholder:"Confirm Password"})]}),Object(j.jsx)(F,{to:"submit",variant:"primary",text:"Login",className:"block w-full"}),Object(j.jsxs)("div",{className:"text-center mt-4",children:["Already have an account?",Object(j.jsx)(r.b,{to:"/account/login",className:"Link ml-1",children:"Log in"}),"."]})]})},de=function(){return Object(j.jsx)("div",{className:"Content",children:Object(j.jsxs)("div",{className:"flex items-center",children:[Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)(d.r,{className:"mx-auto h-32 bg-indigo-600 text-white rounded-full p-4"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:"Janko Hra\u0161ko"}),Object(j.jsx)("div",{className:"italic text-center",children:"I love 50 shades of gray."})]}),Object(j.jsxs)("div",{className:"w-6/12",children:[Object(j.jsx)("h1",{className:"Content-Title",children:"Account Information"}),Object(j.jsx)(q,{type:"text",id:"first_name",label:"First Name",placeholder:"Joe"}),Object(j.jsx)(q,{type:"text",id:"last_name",label:"Last Name",placeholder:"Doe"}),Object(j.jsx)(q,{type:"email",id:"email",label:"E-Mail",placeholder:"user@example.com"}),Object(j.jsx)("hr",{}),Object(j.jsx)("h1",{className:"Content-Title",children:"Change Password"}),Object(j.jsx)(q,{type:"password",id:"old_password",label:"Old Password",placeholder:"*******"}),Object(j.jsx)(q,{type:"password",id:"new_password",label:"New Password",placeholder:"*******"}),Object(j.jsx)(q,{type:"password",id:"new_password_confirm",label:"New Confirm Password",placeholder:"*******"}),Object(j.jsx)("div",{className:"flex flex-end",children:Object(j.jsx)(F,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.n,{className:"h-6 mr-1"})})})]})]})})},je=function(){return L.isAuthenticated()?Object(j.jsx)(l.a,{to:"account/profile"}):Object(j.jsx)(l.a,{to:"account/login"})},be=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{path:"".concat(e,"/login"),component:le}),Object(j.jsx)(l.b,{path:"".concat(e,"/register"),component:oe}),Object(j.jsx)(S,{path:"".concat(e,"/profile"),component:de}),Object(j.jsx)(l.b,{path:"/",component:je})]})},ue=function(){return L.isAuthenticated()&&L.allowedDashboard()?Object(j.jsx)(l.a,{to:"/admin/dashboard"}):Object(j.jsx)(h,{})},me=function(){var e=Object(l.h)().path;return Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{exact:!0,path:e,component:ue}),Oe.map((function(t,a){return Object(j.jsx)(C,{path:e+t.url,component:t.component,roles:t.roles,exact:t.exact},a)}))]})},xe=[{name:"Book Titles",url:"/admin/book-titles",icon:Object(j.jsx)(d.c,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin","librarian","distributor"]},{name:"Libraries",url:"/admin/libraries",icon:Object(j.jsx)(d.j,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin"]},{name:"Library",url:"/admin/libraries/1",icon:Object(j.jsx)(d.j,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Reservations",url:"/admin/libraries/1/reservations",icon:Object(j.jsx)(d.f,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Borrowings",url:"/admin/libraries/1/borrowings",icon:Object(j.jsx)(d.p,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Users",url:"/admin/users",icon:Object(j.jsx)(d.r,{className:"h-12 mx-auto text-indigo-600"}),roles:["admin"]},{name:"Stock",url:"/admin/libraries/1/stock",icon:Object(j.jsx)(d.a,{className:"h-12 mx-auto text-indigo-600"}),roles:["librarian"]},{name:"Orders",url:"/admin/orders",icon:Object(j.jsx)(d.g,{className:"h-12 mx-auto text-indigo-600"}),roles:["distributor"]}],he=[{name:"Home",url:"/",component:Y,exact:!0},{name:"BookTitle",url:"/book-titles",component:ce},{name:"Library",url:"/libraries",component:re},{name:"Account",url:"/account",component:be},{name:"Admin",url:"/admin",component:me}],Oe=[{name:"Dashboard",url:"/dashboard",roles:["admin","librarian","distributor"],component:function(){Object(l.h)().path;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("h1",{className:"text-2xl text-center font-bold my-8",children:["Welcome back, ",L.getUsername()]}),Object(j.jsx)("div",{className:"flex items-center flex-wrap",children:xe.map((function(e,t){return!!e.roles.find((function(e){return e===L.getUserType()}))&&Object(j.jsx)("div",{className:"w-full lg:w-3/12 p-2",children:Object(j.jsxs)(r.b,{to:e.url,className:"block border-2 bg-white border-transparent rounded-md text-center px-4 py-8 hover:shadow-md hover:border-indigo-600 transition",children:[e.icon,Object(j.jsx)("div",{className:"text-xl font-semibold text-indigo-600 mt-4",children:e.name})]},t)},t)}))})]})}},{name:"BookTitleList",url:"/book-titles",roles:["admin","librarian","distributor"],component:function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),r=i[0],l=i[1];return Object(n.useEffect)((function(){g.a.get(k("booktitle")).then((function(e){return l(e.data.data)})).catch((function(e){return console.log(e)}))}),[a]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"flex justify-between",children:[Object(j.jsx)(P,{to:pe("Dashboard"),variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)(P,{to:pe("BookTitleCreate"),variant:"green",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"}),text:"New Book"})]}),Object(j.jsxs)("div",{className:"Content mt-4",children:[a&&Object(j.jsx)(I,{message:a.message,type:a.type,onClick:function(){return c(null)}}),Object(j.jsx)("h1",{className:"Content-Title",children:"Book titles"}),Object(j.jsx)("div",{className:"overflow-auto",children:Object(j.jsxs)(U,{children:[Object(j.jsx)(R,{children:Object(j.jsxs)(z,{children:[Object(j.jsx)(J,{className:"w-1/6"}),Object(j.jsx)(J,{children:"Name"}),Object(j.jsx)(J,{className:"w-1/4",children:"Actions"})]})}),Object(j.jsx)(M,{children:r.map((function(e,t){return Object(j.jsxs)(z,{index:t,striped:!0,children:[Object(j.jsx)(G,{children:Object(j.jsx)("img",{src:e.photo,alt:e.name,className:"h-16"})}),Object(j.jsx)(G,{children:e.name}),Object(j.jsx)(G,{children:Object(j.jsxs)("div",{className:"flex items-center gap-2",children:[Object(j.jsx)(P,{to:"/book-titles/"+e.id,variant:"primary",icon:Object(j.jsx)(d.i,{className:"h-6 mr-1"}),text:"Open",hideTextSm:!0,target:"_blank"}),Object(j.jsx)(P,{to:pe("BookTitleEdit",{id:e.id}),variant:"yellow",icon:Object(j.jsx)(d.l,{className:"h-6 mr-1"}),text:"Edit",hideTextSm:!0}),Object(j.jsx)(F,{type:"button",variant:"red",icon:Object(j.jsx)(d.q,{className:"h-6 mr-1"}),text:"Delete",hideTextSm:!0,onClick:function(){return t=e.id,void g.a.delete(k("booktitle/:id",{id:t})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),c({message:"Book Title Deleted",type:"success"})):(window.scrollTo(0,0),c({message:e.data.message,type:"danger"}))})).catch((function(e){return console.log(e)}));var t}})]})})]},t)}))})]})})]})]})},exact:!0},{name:"BookTitleCreate",url:"/book-titles/create",roles:["admin","librarian","distributor"],component:function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:pe("BookTitleList"),variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("form",{method:"post",onSubmit:function(e){e.preventDefault();var t,a=new FormData(e.target),n={},s=Object(H.a)(a.entries());try{for(s.s();!(t=s.n()).done;){var i,r=t.value;if("date_publication"!==r[0]||r[1].length)n[r[0]]=null!==(i=r[1])&&void 0!==i?i:null;else n[r[0]]=null}}catch(l){s.e(l)}finally{s.f()}g.a.post(k("booktitle"),y.a.stringify({name:n.name,author:n.author,publisher:n.publisher,isbn:n.isbn,genre:n.genre,description:n.description,rating:n.rating,photo:n.photo,date_publication:n.date_publication})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),c({message:"Book Title Created Successfully",type:"success"})):(window.scrollTo(0,0),c({message:e.data.message,type:"danger"}))})).catch((function(e){return console.log(e)}))},children:[a&&Object(j.jsx)(I,{message:a.message,type:a.type,onClick:function(){return c(null)}}),Object(j.jsx)(q,{type:"text",id:"name",name:"name",label:"Book Name",placeholder:"Example Book"}),Object(j.jsx)(q,{type:"text",id:"author",name:"author",label:"Author",placeholder:"Joe Doe"}),Object(j.jsx)(q,{type:"text",id:"isbn",name:"isbn",label:"ISBN",placeholder:"3232183828"}),Object(j.jsx)(q,{type:"number",id:"date_publication",name:"date_publication",label:"Publish Date",placeholder:"1998"}),Object(j.jsx)(q,{type:"text",id:"publisher",name:"publisher",label:"Publisher",placeholder:"Example Publisher"}),Object(j.jsx)(q,{type:"text",id:"genre",name:"genre",label:"Genre",placeholder:"e.g. Action"}),Object(j.jsx)(q,{type:"number",id:"rating",name:"rating",label:"Rating",placeholder:"10",min:0,max:10}),Object(j.jsx)(q,{type:"text",id:"photo",name:"photo",label:"Picture",placeholder:"https://mrtns.eu/tovar/_l/440/l440953.jpg"}),Object(j.jsx)(W,{type:"text",id:"description",name:"description",label:"Description",placeholder:"Lorem ipsum..."}),Object(j.jsx)("div",{className:"flex items-end",children:Object(j.jsx)(F,{type:"submit",text:"Create",variant:"green",className:"ml-auto",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"})})})]})})]})}},{name:"BookTitleEdit",url:"/book-titles/:id/edit",roles:["admin","librarian","distributor"],component:function(){var e=Object(l.g)().id,t=Object(n.useState)([]),a=Object(o.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(null),r=Object(o.a)(i,2),b=r[0],u=r[1];return Object(n.useEffect)((function(){g.a.get(k("booktitle/:id",{id:e})).then((function(e){return s(e.data.data)})).catch((function(e){return console.log(e)}))}),[b]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:"/admin/book-titles",variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("div",{className:"flex items-center",children:[Object(j.jsxs)("div",{className:"w-6/12 text-center",children:[Object(j.jsx)("img",{src:c.photo,alt:c.name,className:"h-64 inline"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:c.name}),Object(j.jsx)("div",{className:"italic text-center",children:c.author})]}),Object(j.jsxs)("form",{method:"post",className:"w-6/12",onSubmit:function(e){e.preventDefault();var t,a=new FormData(e.target),n={},s=Object(H.a)(a.entries());try{for(s.s();!(t=s.n()).done;){var i=t.value;n[i[0]]=i[1]}}catch(r){s.e(r)}finally{s.f()}g.a.put(k("booktitle/:id",{id:c.id}),y.a.stringify({name:n.name,author:n.author,publisher:n.publisher,isbn:n.isbn,genre:n.genre,description:n.description,rating:n.rating,photo:n.photo,date_publication:n.date_publication})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),u({message:"Book Title Edited Successfully",type:"success"})):(window.scrollTo(0,0),u({message:e.data.message,type:"danger"}))})).catch((function(e){return console.log(e)}))},children:[b&&Object(j.jsx)(I,{message:b.message,type:b.type,onClick:function(){return u(null)}}),Object(j.jsx)(q,{type:"text",id:"name",name:"name",label:"Book Name",value:c.name,placeholder:"Example Book"}),Object(j.jsx)(q,{type:"text",id:"author",name:"author",label:"Author",value:c.author,placeholder:"Joe Doe"}),Object(j.jsx)(q,{type:"text",id:"isbn",name:"isbn",label:"ISBN",value:c.isbn,placeholder:"3232183828"}),Object(j.jsx)(q,{type:"text",id:"date_publication",name:"date_publication",value:c.date_publication,placeholder:"1998",label:"Publish Date"}),Object(j.jsx)(q,{type:"text",id:"publisher",name:"publisher",label:"Publisher",value:c.publisher,placeholder:"Example Publisher"}),Object(j.jsx)(q,{type:"text",id:"genre",name:"genre",label:"Genre",value:c.genre,placeholder:"e.g. Action"}),Object(j.jsx)(q,{type:"number",id:"rating",name:"rating",label:"Rating",value:c.rating,placeholder:"10"}),Object(j.jsx)(q,{type:"text",id:"photo",name:"photo",label:"Picture",value:c.photo,placeholder:"https://mrtns.eu/tovar/_l/440/l440953.jpg"}),Object(j.jsx)(W,{type:"text",id:"description",name:"description",label:"Description",value:c.description,placeholder:"Lorem ipsum..."}),Object(j.jsx)("div",{className:"flex items-end",children:Object(j.jsx)(F,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.n,{className:"h-6 mr-1"})})})]})]})})]})}},{name:"LibraryList",url:"/libraries",roles:["admin"],component:function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),r=i[0],l=i[1];return Object(n.useEffect)((function(){g.a.get(k("library")).then((function(e){return l(e.data.data)})).catch((function(e){return console.log(e)}))}),[a]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"flex justify-between",children:[Object(j.jsx)(P,{to:pe("Dashboard"),variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)(P,{to:pe("LibraryCreate"),variant:"green",icon:Object(j.jsx)(d.m,{className:"h-6 mr-1"}),text:"New Library"})]}),Object(j.jsxs)("div",{className:"Content mt-4",children:[a&&Object(j.jsx)(I,{message:a.message,type:a.type,onClick:function(){return c(null)}}),Object(j.jsx)("h1",{className:"Content-Title",children:"Libraries"}),Object(j.jsx)("div",{className:"overflow-auto",children:Object(j.jsxs)(U,{children:[Object(j.jsx)(R,{children:Object(j.jsxs)(z,{children:[Object(j.jsx)(J,{children:"Name"}),Object(j.jsx)(J,{children:"Address"}),Object(j.jsx)(J,{children:"Actions"})]})}),Object(j.jsx)(M,{children:r.map((function(e,t){return Object(j.jsxs)(z,{index:t,striped:!0,children:[Object(j.jsx)(G,{children:e.name}),Object(j.jsxs)(G,{children:[Object(j.jsx)("div",{className:"font-bold",children:e.city}),Object(j.jsx)("div",{className:"hidden lg:block",children:e.street})]}),Object(j.jsx)(G,{children:Object(j.jsxs)("div",{className:"flex items-center gap-2",children:[Object(j.jsx)(P,{to:pe("LibraryShow",{id:e.id}),variant:"primary",icon:Object(j.jsx)(d.e,{className:"h-6 mr-1"}),text:"Manage",hideTextSm:!0}),Object(j.jsx)(P,{to:pe("LibraryEdit",{id:e.id}),variant:"yellow",icon:Object(j.jsx)(d.l,{className:"h-6 mr-1"}),text:"Edit",hideTextSm:!0}),Object(j.jsx)(F,{type:"button",variant:"red",icon:Object(j.jsx)(d.q,{className:"h-6 mr-1"}),text:"Delete",hideTextSm:!0,onClick:function(){return t=e.id,void g.a.delete(k("library/:id",{id:t})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),c({message:"Library Deleted",type:"success"})):(window.scrollTo(0,0),c({message:e.data.message,type:"danger"}))})).catch((function(e){return console.log(e)}));var t}})]})})]},t)}))})]})})]})]})},exact:!0},{name:"LibraryCreate",url:"/libraries/create",roles:["admin"],component:function(){return Object(j.jsx)("div",{children:"LibraryCreate"})},exact:!0},{name:"LibraryShow",url:"/libraries/:id",roles:["admin","librarian"],component:function(){var e=Object(l.g)().id,t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(null),r=Object(o.a)(i,2);r[0],r[1];return Object(n.useEffect)((function(){g.a.get(k("library/:id",{id:e})).then((function(e){return s(e.data.data)})).catch((function(e){return console.log(e)}))}),[]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"flex flex-row justify-between",children:[Object(j.jsx)(P,{to:L.isAdmin()?pe("LibraryList"):pe("Dashboard"),variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)(P,{to:pe("LibraryEdit",{id:c.id}),text:"Edit",icon:Object(j.jsx)(d.l,{className:"h-6 mr-1"}),variant:"yellow"})]}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("div",{className:"text-center",children:[Object(j.jsx)(d.j,{className:"mx-auto h-32 bg-indigo-600 text-white rounded-full p-4"}),Object(j.jsx)("div",{className:"my-4 text-2xl font-bold",children:c.name}),Object(j.jsxs)("div",{className:"text-gray-500 my-4",children:[Object(j.jsx)("div",{className:"font-bold",children:c.city}),c.street]}),Object(j.jsxs)("div",{className:"text-lg my-4",children:[Object(j.jsx)("b",{children:"Opening Hours:"})," ",c.open_hours]}),Object(j.jsx)("div",{className:"italic text-center px-20",children:c.description}),Object(j.jsxs)("div",{className:"flex flex-col md:flex-row mt-8 gap-4",children:[Object(j.jsx)(P,{to:pe("LibraryReservations",{id:c.id}),text:"Reservations",icon:Object(j.jsx)(d.f,{className:"h-12 mr-2 text-indigo-600"}),variant:"secondary",className:"w-full md:w-1/3"}),Object(j.jsx)(P,{to:pe("LibraryBorrowings",{id:c.id}),text:"Borrowings",icon:Object(j.jsx)(d.p,{className:"h-12 mr-2 text-indigo-600"}),variant:"secondary",className:"w-full md:w-1/3"}),Object(j.jsx)(P,{to:pe("LibraryStock",{id:c.id}),text:"Stock",icon:Object(j.jsx)(d.a,{className:"h-12 mr-2 text-indigo-600"}),variant:"secondary",className:"w-full md:w-1/3"})]})]})})]})},exact:!0},{name:"LibraryEdit",url:"/libraries/:id/edit",roles:["admin","librarian"],component:function(){var e=Object(l.g)().id,t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(null),r=Object(o.a)(i,2),b=r[0],u=r[1];return Object(n.useEffect)((function(){g.a.get(k("library/:id",{id:e})).then((function(e){return s(e.data.data)})).catch((function(e){return console.log(e)}))}),[b]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(P,{to:pe("LibraryShow",{id:c.id}),variant:"secondary",icon:Object(j.jsx)(d.d,{className:"h-6 mr-1"}),text:"Back"}),Object(j.jsx)("div",{className:"Content mt-4",children:Object(j.jsxs)("div",{className:"flex flex-col lg:flex-row items-center",children:[Object(j.jsxs)("div",{className:"w-full lg:w-6/12 mb-8 lg:mb-0 text-center",children:[Object(j.jsx)(d.j,{className:"mx-auto h-32 bg-indigo-600 text-white rounded-full p-4"}),Object(j.jsx)("div",{className:"my-4 text-2xl text-center font-bold",children:c.name}),Object(j.jsx)("div",{className:"italic text-center px-20",children:c.description})]}),Object(j.jsxs)("form",{method:"post",className:"w-full lg:w-6/12",onSubmit:function(e){e.preventDefault();var t,a=new FormData(e.target),n={},s=Object(H.a)(a.entries());try{for(s.s();!(t=s.n()).done;){var i=t.value;n[i[0]]=i[1]}}catch(r){s.e(r)}finally{s.f()}g.a.put(k("library/:id",{id:c.id}),y.a.stringify({name:n.name,city:n.city,street:n.street,open_hours:n.open_hours,description:n.description})).then((function(e){"success"===e.data.status?(window.scrollTo(0,0),u({message:"Library Edited Successfully",type:"success"})):(window.scrollTo(0,0),u({message:e.data.message,type:"danger"}))})).catch((function(e){return console.log(e)}))},children:[b&&Object(j.jsx)(I,{message:b.message,type:b.type,onClick:function(){return u(null)}}),Object(j.jsx)(q,{type:"text",id:"name",name:"name",label:"Book Name",value:c.name,placeholder:"Example Book"}),Object(j.jsx)(q,{type:"text",id:"city",name:"city",label:"City",value:c.city,placeholder:"London"}),Object(j.jsx)(q,{type:"text",id:"street",name:"street",label:"Street",value:c.street,placeholder:"2987 Oxford Street, LN 13224"}),Object(j.jsx)(q,{type:"text",id:"open_hours",name:"open_hours",value:c.open_hours,placeholder:"8:00 - 14:00",label:"Opening hours"}),Object(j.jsx)(W,{type:"text",id:"description",name:"description",label:"Description",value:c.description,placeholder:"Lorem ipsum..."}),Object(j.jsx)("div",{className:"flex items-end",children:Object(j.jsx)(F,{type:"submit",text:"Save",variant:"primary",className:"ml-auto",icon:Object(j.jsx)(d.n,{className:"h-6 mr-1"})})})]})]})})]})}},{name:"LibraryReservations",url:"/libraries/:id/reservations",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryReservations"})}},{name:"LibraryBorrowings",url:"/libraries/:id/borrowings",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryBorrowings"})}},{name:"LibraryStock",url:"/libraries/:id/stock",roles:["admin","librarian"],component:function(){return Object(j.jsx)("div",{children:"LibraryStock"})}},{name:"UserList",url:"/users",roles:["admin"],component:function(){return Object(j.jsx)("div",{children:"UserList"})}},{name:"UserEdit",url:"/users/:id/edit",roles:["admin"],component:function(){return Object(j.jsx)("div",{children:"UserEdit"})}}],pe=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n="/admin";if(void 0!==(t=Oe.find((function(t){return t.name===e?n+t:void 0})).url))for(var c in a)t=t.replace(":".concat(c),a[c]);return t=n+t};var fe=function(){return console.log(L.isAuthenticated()),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(_,{}),Object(j.jsx)(A,{children:Object(j.jsx)(l.d,{children:he.map((function(e,t){return Object(j.jsx)(l.b,{path:e.url,component:e.component,exact:e.exact},t)}))})}),Object(j.jsx)(E,{})]})};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(fe,{})}),document.getElementById("root"))},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},77:function(e,t,a){}},[[182,1,2]]]);
//# sourceMappingURL=main.277841b8.chunk.js.map