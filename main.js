(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,o,r){var c=e.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__image"),a=c.querySelector(".card__like-button"),d=c.querySelector(".card__title");return p.addEventListener("click",n),u.src=t.link,u.alt=t.name,d.textContent=t.name,u.addEventListener("click",(function(){o(t)})),a.addEventListener("click",(function(){r(a)})),c}function n(e){e.target.closest(".places__item").remove()}function o(e){e.classList.contains("card__like-button_is-active")?e.classList.remove("card__like-button_is-active"):e.classList.add("card__like-button_is-active")}function r(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.value.includes("popup_type")&&p(document.querySelector(".popup_is-opened"))}function p(e){document.removeEventListener("keydown",u),document.removeEventListener("click",u),e.classList.remove("popup_is-opened")}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",c)}e.d({},{qK:()=>O,dm:()=>f,Dg:()=>L,eD:()=>S});var a=document.forms["edit-profile"],d=document.forms["new-place"],i=a.elements.name,l=a.elements.description,s=document.querySelector("#card-template").content,m=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),y=document.querySelector(".content"),v=y.querySelector(".profile__add-button"),f=y.querySelector(".places__list"),k=document.querySelector("#card-template").content,q=y.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_new-card"),E=L.querySelector(".popup__input_type_card-name"),b=L.querySelector(".popup__input_type_url"),g=document.querySelectorAll(".popup"),h=document.forms["edit-profile"],x=document.forms["new-place"],j=(document.querySelector(".page"),document.querySelector(".popup_type_image")),w=j.querySelector(".popup__caption"),C=j.querySelector(".popup__image"),D=document.querySelectorAll(".popup__close");function O(e){C.src=e.link,C.alt=e.name,w.textContent=e.name,u(j)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var r=t(k,e,n,O,o);f.append(r)})),g.forEach((function(e){e.classList.add("popup_is-animated")})),q.addEventListener("click",(function(e){u(S),i.value=m.textContent,l.value=_.textContent})),v.addEventListener("click",(function(e){u(L),E.value="",b.value=""})),h.addEventListener("submit",(function(e){e.preventDefault(),m.textContent=i.value,_.textContent=l.value,p(S)})),x.addEventListener("submit",(function(e){e.preventDefault();var r=d.elements["place-name"],c=d.elements.link,u={name:r.value,link:c.value},a=t(s,u,n,O,o);f.prepend(a),p(L)})),D.forEach((function(e){e.addEventListener("click",(function(){p(document.querySelector(".popup_is-opened"))}))})),h.querySelector(".popup__input").addEventListener("input",(function(){}))})();
//# sourceMappingURL=main.js.map