# Notes wall: a tiny full-stack app

## How the pieces fit

    Browser (app/page.js)  --fetch-->  Backend (app/api/notes/route.js)  --query-->  Supabase (Postgres)
         what you see                  runs on server, holds secrets                 stores the data

- Frontend: HTML/JS that runs in the visitor's browser.
- Backend: code on a server that validates requests and talks to the database.
- Database: where data lives permanently (Supabase gives you Postgres).
- Environment variables: secrets/config kept out of your code (.env.local locally, Vercel settings live).
- Git/GitHub: version history of your code, and the trigger for deployments.
- Vercel: runs your app on the internet and redeploys on every push.

## Step 1: Run locally
1. Install Node.js (nodejs.org, LTS version).
2. In this folder run: `npm install`
3. Create a free project at supabase.com. Open SQL Editor, paste `supabase.sql`, click Run.
4. Copy `.env.example` to `.env.local`. Fill in the Project URL and anon key
   (Project Settings -> API).
5. Run `npm run dev` and open http://localhost:3000

## Step 2: Put the code on GitHub
    git init
    git add .
    git commit -m "first version"
Create an empty repo on github.com, then run the two commands it shows
(`git remote add origin ...` and `git push -u origin main`).
Check that `.env.local` is NOT on GitHub (the .gitignore prevents it).

## Step 3: Deploy on Vercel
1. vercel.com -> Add New Project -> import your GitHub repo.
2. Under Environment Variables add SUPABASE_URL and SUPABASE_ANON_KEY (same values as .env.local).
3. Click Deploy. You get a live https://your-app.vercel.app link.
4. Change something, `git push`, and Vercel redeploys automatically.

## Experiments to learn more
- Open DevTools -> Network tab and watch the /api/notes requests.
- Open Supabase -> Table Editor and see rows appear as you post.
- Try posting a 300-character note by editing the HTML: the backend and the database both reject it.
- Delete the policy in supabase.sql for insert, and see the app fail. That is Row Level Security at work.
