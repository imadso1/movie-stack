# Movie Stack

A movie/TV tracking dashboard built with HTML, CSS and JavaScript.

## Supabase Auth setup

1. Create a Supabase project.
2. Open **Project Settings -> API Keys**.
3. Copy the **Project URL** and **Publishable key**.
4. Open `supabase-config.js` and replace the two placeholders.
5. In Supabase **Authentication -> Providers**, keep Email enabled.
6. Optional: open **SQL Editor** and run `supabase-schema.sql` to create the profile table and Row Level Security policies.
7. Test locally or deploy the folder to Vercel.

Never put a Supabase secret/service_role key in this project or in GitHub.

## Current features

- Movie library dashboard
- Watching / Watched / Not Watched / All Movies
- Watchlist and Favorites
- Search, sorting and grid/list views
- Add movies manually
- Dark/light mode
- Supabase Sign up / Sign in / Sign out / password reset
- Guest mode still works before Supabase is configured

## Next development step

Connect the movie library itself to Supabase tables, then add TMDB movie and TV-show search so each account has its own synced library.
