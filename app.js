const initial=[
{id:1,title:"Silent Hill 2",year:2024,rating:8.4,genre:"Horror",genres:["Horror","Thriller"],status:"watching",fav:true,added:8,poster:"https://image.tmdb.org/t/p/w780/9R2G1p6Q5J6sY0xM0u2sYvM8k6J.jpg",desc:"A dark psychological journey through a mysterious fog-covered town."},
{id:2,title:"The Conjuring",year:2013,rating:7.5,genre:"Horror",genres:["Horror","Mystery"],status:"watched",fav:false,added:7,poster:"https://image.tmdb.org/t/p/w780/wVYREutTvI2tmxr6ujrHT704wGF.jpg",desc:"A family moves into a house where strange events begin to unfold."},
{id:3,title:"Interstellar",year:2014,rating:8.7,genre:"Sci-Fi",genres:["Sci-Fi","Adventure"],status:"unwatched",fav:true,added:6,poster:"https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",desc:"Explorers travel beyond our galaxy in search of a future for humanity."},
{id:4,title:"The Batman",year:2022,rating:7.8,genre:"Action",genres:["Action","Crime"],status:"watching",fav:false,added:5,poster:"https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg",desc:"A detective uncovers corruption and a series of crimes in Gotham."},
{id:5,title:"A Quiet Place",year:2018,rating:7.5,genre:"Horror",genres:["Horror","Thriller"],status:"unwatched",fav:false,added:4,poster:"https://image.tmdb.org/t/p/w780/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",desc:"A family survives in silence while an unknown threat hunts by sound."},
{id:6,title:"Inception",year:2010,rating:8.8,genre:"Action",genres:["Action","Sci-Fi"],status:"watched",fav:true,added:3,poster:"https://image.tmdb.org/t/p/w780/8IB2e4rQ1iW4JvH7d6J7q7K2J8n.jpg",desc:"A skilled team enters dreams to perform an impossible extraction."},
{id:7,title:"Hereditary",year:2018,rating:7.3,genre:"Horror",genres:["Horror","Drama"],status:"unwatched",fav:false,added:2,poster:"https://image.tmdb.org/t/p/w780/p9fmuz2Oj3CAh4jyh1cz6jL1w1B.jpg",desc:"A family begins uncovering disturbing secrets after a loss."},
{id:8,title:"Dune",year:2021,rating:8.0,genre:"Sci-Fi",genres:["Sci-Fi","Adventure"],status:"unwatched",fav:false,added:1,poster:"https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",desc:"A young heir is drawn into a dangerous struggle over a desert world."}
];
let movies=JSON.parse(localStorage.getItem("movieStackPro")||"null")||initial;
let filter="watching",query="",sort="added",list=false;

const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const save=()=>localStorage.setItem("movieStackPro",JSON.stringify(movies));
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function counts(){
 const n=k=>movies.filter(m=>m.status===k).length;
 $("#statWatched").textContent=n("watched");$("#statWatching").textContent=n("watching");$("#statWatchlist").textContent=n("unwatched");$("#statFavorites").textContent=movies.filter(m=>m.fav).length;
 $("#cWatched").textContent=n("watched");$("#cWatching").textContent=n("watching");$("#cUnwatched").textContent=n("unwatched");$("#cAll").textContent=movies.length;
 $("#watchlistCount").textContent=n("unwatched");$("#favCount").textContent=movies.filter(m=>m.fav).length;
}
function visible(){
 let a=[...movies];
 if(["watching","watched","unwatched"].includes(filter))a=a.filter(m=>m.status===filter);
 else if(filter==="horror"||filter==="action"||filter==="comedy"||filter==="sci-fi")a=a.filter(m=>m.genre.toLowerCase()===filter||m.genres.map(x=>x.toLowerCase()).includes(filter));
 else if(filter==="favorites")a=a.filter(m=>m.fav);
 else if(filter==="watchlist")a=a.filter(m=>m.status==="unwatched");
 else if(filter==="history")a=a.filter(m=>m.status==="watched");
 if(query)a=a.filter(m=>(m.title+" "+m.genre+" "+m.year).toLowerCase().includes(query.toLowerCase()));
 if(sort==="year")a.sort((a,b)=>b.year-a.year);if(sort==="rating")a.sort((a,b)=>b.rating-a.rating);if(sort==="title")a.sort((a,b)=>a.title.localeCompare(b.title));if(sort==="added")a.sort((a,b)=>b.added-a.added);
 return a;
}
function card(m){
 let poster=m.poster?`style="background-image:url('${m.poster}')"`:"";
 return `<article class="movie-card">
 <div class="poster" ${poster}><button class="heart ${m.fav?"on":""}" data-act="fav" data-id="${m.id}">♥</button><span class="rating">★ ${m.rating}</span><div class="poster-title">${m.title}</div></div>
 <div class="movie-body"><div class="chips"><span class="chip">MOVIE</span><span class="chip">${m.genre.toUpperCase()}</span></div>
 <h3>${m.title}</h3><div class="meta"><span>★ ${m.rating}</span><span>▣ ${m.year}</span></div><div class="desc">${m.desc}</div>
 <div class="actions"><button class="mini ${m.status==="watched"?"selected":""}" data-act="status" data-status="watched" data-id="${m.id}">✓ Watched</button><button class="mini ${m.status==="watching"?"selected":""}" data-act="status" data-status="watching" data-id="${m.id}">▷ Watching</button></div>
 <button class="mini ${m.status==="unwatched"?"selected":""}" style="width:100%;margin-top:6px" data-act="status" data-status="unwatched" data-id="${m.id}">＋ Watchlist</button>
 </div></article>`;
}
function render(){
 counts();let a=visible();$("#grid").classList.toggle("list",list);$("#grid").innerHTML=a.map(card).join("");$("#empty").classList.toggle("hidden",a.length>0);
 const names={watching:"Continue watching",watched:"Watched movies",unwatched:"Your watchlist",all:"All movies",horror:"Horror movies",action:"Action movies",comedy:"Comedy movies","sci-fi":"Sci-Fi movies",favorites:"Favorites",history:"Watch history",watchlist:"Your watchlist"};
 $("#sectionTitle").textContent=names[filter]||"Movies";
}
$$(".tab").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
$$(".nav[data-page]").forEach(b=>b.onclick=()=>{filter=b.dataset.page;if(["home"].includes(filter))filter="watching";$$(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".tab").forEach(x=>x.classList.remove("active"));let t=$(`.tab[data-filter="${filter}"]`);if(t)t.classList.add("active");render();$("#sidebar").classList.remove("open")});
$("#grid").onclick=e=>{let b=e.target.closest("[data-act]");if(!b)return;let m=movies.find(x=>x.id==b.dataset.id);if(b.dataset.act==="fav"){m.fav=!m.fav;toast(m.fav?"Added to favorites":"Removed from favorites")}else{m.status=b.dataset.status;toast("Movie status updated")}save();render()};
$("#search").oninput=e=>{query=e.target.value;render()};
$("#sort").onchange=e=>{sort=e.target.value;render()};
$("#gridView").onclick=()=>{list=false;$("#gridView").classList.add("active");$("#listView").classList.remove("active");render()};
$("#listView").onclick=()=>{list=true;$("#listView").classList.add("active");$("#gridView").classList.remove("active");render()};
$("#seeAll").onclick=()=>{$('.tab[data-filter="all"]').click()};
$$(".genre-card").forEach(b=>b.onclick=()=>{filter=b.dataset.genre;$$(".nav").forEach(x=>x.classList.remove("active"));let n=$(`.nav[data-page="${filter}"]`);if(n)n.classList.add("active");render()});
function openModal(){ $("#movieModal").showModal() } $("#addMovie").onclick=openModal;$("#emptyAdd").onclick=openModal;$("#closeModal").onclick=()=>$("#movieModal").close();
$("#movieForm").onsubmit=e=>{e.preventDefault();let title=$("#mTitle").value.trim();if(!title)return;let g=$("#mGenre").value;movies.unshift({id:Date.now(),title,year:+$("#mYear").value||new Date().getFullYear(),rating:+$("#mRating").value||0,genre:g,genres:[g],status:$("#mStatus").value,fav:false,added:Date.now(),poster:$("#mPoster").value.trim(),desc:"Added to your personal movie library."});save();$("#movieForm").reset();$("#movieModal").close();render();toast("Movie added")};
$("#randomMovie").onclick=()=>{let a=movies.filter(m=>m.status==="unwatched");if(!a.length)a=movies;let m=a[Math.floor(Math.random()*a.length)];$("#detailContent").innerHTML=`<div class="detail-hero" style="background-image:url('${m.poster}')"><div class="detail-info"><div class="eyebrow">YOUR NEXT MOVIE</div><h2>${m.title}</h2></div></div><div class="detail-body"><button class="close-detail" onclick="detailModal.close()">×</button><p>${m.desc}</p><button class="primary" onclick="detailModal.close();movies.find(x=>x.id==${m.id}).status='watching';save();render()">Start watching</button></div>`;$("#detailModal").showModal()};
$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("movieTheme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("movieTheme")==="light")document.body.classList.add("light");
$("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");
$("#settingsBtn").onclick=()=>toast("Settings panel coming next");
$("#profileBtn").onclick=()=>toast("Guest profile");
render();
// ---------------- Supabase Auth ----------------
let authMode = "login";
let currentUser = null;

function authConfigured(){ return !!window.movieSupabase; }
function authMessage(){
  return "Supabase is not configured. Open supabase-config.js and add your Project URL + Publishable key.";
}
function setUserUI(user){
  currentUser = user || null;
  const meta = user?.user_metadata || {};
  const name = meta.display_name || user?.email?.split("@")[0] || "Guest";
  const initial = name.charAt(0).toUpperCase();
  $("#profileName").textContent = name;
  $("#profileAvatar").textContent = initial;
  $("#sideUserName").textContent = name;
  $("#sideAvatar").textContent = initial;
  $("#sideUserEmail").textContent = user?.email || "Movie collector";
  $("#authNote").textContent = authConfigured()
    ? (user ? `Signed in as ${user.email}` : "Your account is ready. Your movie library can be connected to the database next.")
    : authMessage();
}
function openAuth(mode="login"){
  authMode = mode;
  $("#authTitle").textContent = mode === "login" ? "Sign in" : "Create account";
  $("#authSubtitle").textContent = mode === "login"
    ? "Sign in to keep your movie library available on all your devices."
    : "Create an account to have your own Movie Stack profile.";
  $("#nameField").classList.toggle("hidden", mode !== "signup");
  $("#authName").required = mode === "signup";
  $("#authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
  $("#authSubmit").textContent = mode === "login" ? "Sign in" : "Create account";
  $("#authSwitch").textContent = mode === "login" ? "Create an account" : "I already have an account";
  $("#forgotPassword").classList.toggle("hidden", mode !== "login");
  $("#authForm").reset();
  $("#authModal").showModal();
  setUserUI(currentUser);
}

$("#profileBtn").onclick = () => {
  if (!currentUser) openAuth("login");
  else openAuth("account");
};
$("#accountBtn").onclick = () => currentUser ? openAuth("account") : openAuth("login");
$("#closeAuth").onclick = () => $("#authModal").close();
$("#authSwitch").onclick = () => openAuth(authMode === "login" ? "signup" : "login");

$("#authForm").onsubmit = async (e) => {
  e.preventDefault();
  if (!authConfigured()) { toast(authMessage()); return; }
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const button = $("#authSubmit");
  button.disabled = true;
  try {
    if (authMode === "signup") {
      const displayName = $("#authName").value.trim();
      const { data, error } = await window.movieSupabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } }
      });
      if (error) throw error;
      if (data.session) {
        setUserUI(data.user);
        $("#authModal").close();
        toast("Account created");
      } else {
        toast("Account created — check your email to confirm it");
        $("#authModal").close();
      }
    } else {
      const { data, error } = await window.movieSupabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUserUI(data.user);
      $("#authModal").close();
      toast("Welcome back");
    }
  } catch (err) {
    toast(err?.message || "Authentication failed");
  } finally { button.disabled = false; }
};

$("#forgotPassword").onclick = async () => {
  if (!authConfigured()) { toast(authMessage()); return; }
  const email = $("#authEmail").value.trim();
  if (!email) { toast("Enter your email first"); return; }
  const redirect = window.location.origin + window.location.pathname;
  const { error } = await window.movieSupabase.auth.resetPasswordForEmail(email, { redirectTo: redirect });
  toast(error ? error.message : "Password reset email sent");
};

// In account mode, replace the auth form with a small account panel.
const originalOpenAuth = openAuth;
openAuth = function(mode="login") {
  if (mode === "account" && currentUser) {
    $("#authTitle").textContent = "Your account";
    $("#authSubtitle").textContent = currentUser.email;
    $("#nameField").classList.add("hidden");
    $("#authEmail").parentElement.classList.add("hidden");
    $("#authPassword").parentElement.classList.add("hidden");
    $("#authSubmit").textContent = "Sign out";
    $("#authSubmit").onclick = async (e) => {
      e.preventDefault();
      const { error } = await window.movieSupabase.auth.signOut();
      if (error) { toast(error.message); return; }
      currentUser = null;
      setUserUI(null);
      $("#authModal").close();
      toast("Signed out");
    };
    $("#authSwitch").classList.add("hidden");
    $("#forgotPassword").classList.add("hidden");
    $("#authNote").textContent = "Your account is connected. Your movie library can be synced to Supabase database tables next.";
    $("#authForm").reset();
    $("#authModal").showModal();
    return;
  }
  // restore normal form controls after account view
  $("#authEmail").parentElement.classList.remove("hidden");
  $("#authPassword").parentElement.classList.remove("hidden");
  $("#authSubmit").onclick = null;
  $("#authSwitch").classList.remove("hidden");
  originalOpenAuth(mode);
};

(async function initAuth(){
  if (!authConfigured()) { setUserUI(null); return; }
  const { data } = await window.movieSupabase.auth.getSession();
  setUserUI(data?.session?.user || null);
  window.movieSupabase.auth.onAuthStateChange((_event, session) => setUserUI(session?.user || null));
})();
