import{d as r,u as c,o as u,c as l,a as i,t as _,b as p,F as d,e as m}from"./index.e1e0b233.js";const h=r({__name:"TheWall",props:{user_id:null},setup(t){const e=t,o=c();u(()=>{n()});async function n(){try{const a=await(await fetch(`https://api.vk.com/method/wall.get?owner_id=${e.user_id}&v=5.131&access_token=${o.userToken}&count=5`)).json();console.log(a)}catch(s){console.log(s)}}return(s,a)=>" Notes "}}),g=r({__name:"UserView",setup(t){return(e,o)=>(m(),l(d,null,[i("div",null,"User "+_(e.$route.params.id),1),p(h,{user_id:e.$route.params.id},null,8,["user_id"])],64))}});export{g as default};
