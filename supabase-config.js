window.MOVIE_STACK_SUPABASE = {
  url: "https://mohxdtwdraxhypodpnqc.supabase.co",
  key: "sb_publishable_3fTRFbivO_t0Ex0KEiXdWQ_TsSkv2QG"
};

(function () {
  const cfg = window.MOVIE_STACK_SUPABASE;

  if (
    cfg &&
    cfg.url &&
    cfg.key &&
    window.supabase &&
    !cfg.url.includes("YOUR_SUPABASE") &&
    !cfg.key.includes("YOUR_SUPABASE")
  ) {
    window.movieSupabase = window.supabase.createClient(
      cfg.url,
      cfg.key
    );
  } else {
    window.movieSupabase = null;
  }
})();