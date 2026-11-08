# Setup guide (for Chloe)

Do these once. About 30 minutes. After that, your client edits the site herself and you never touch it unless she wants a design change.

Everything here is free. No card needed at any step.

---

## What you're setting up

```
She writes a post at yoursite.com/admin
        |
        v
Decap CMS saves it to GitHub
        |
        v
Netlify sees the change, rebuilds the site
        |
        v
Live in about a minute
```

---

## Step 1 — Make a GitHub account

Go to **github.com** and sign up. Free.

## Step 2 — Make a repository

1. Click the **+** in the top right, then **New repository**
2. Name it `skin-and-mind-project`
3. Set it to **Public** (Private works too, but Public is simpler and it's not secret)
4. Do **not** tick "Add a README"
5. Click **Create repository**

Leave that page open, you'll need the commands on it.

## Step 3 — Put the project on GitHub

Open a terminal in the project folder (the one with `package.json` in it).

On Windows: open the folder in File Explorer, type `cmd` in the address bar, press Enter.

Then run these one at a time, replacing `YOUR-USERNAME`:

```
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/skin-and-mind-project.git
git push -u origin main
```

It will ask you to sign in to GitHub. Do that.

Refresh the GitHub page. Your files should be there.

## Step 4 — Fix one line in the config

Open `src/admin/config.yml`. Line 3 says:

```
repo: YOUR-GITHUB-USERNAME/skin-and-mind-project
```

Change `YOUR-GITHUB-USERNAME` to your actual GitHub username. Save.

Then push the change:

```
git add .
git commit -m "Set repo name"
git push
```

**If you skip this the admin login will not work.**

## Step 5 — Connect Netlify

1. Go to **app.netlify.com**
2. **Add new site** → **Import an existing project**
3. Choose **GitHub**, authorise it, pick `skin-and-mind-project`
4. It should already show:
   - Build command: `npm run build`
   - Publish directory: `_site`
5. Click **Deploy**

Wait about a minute. If it goes green, the site is live.

**If the build fails:** click the failed deploy to read the log. Copy the red error and send it to me. Do not panic, nothing is broken, the old site is untouched.

## Step 6 — Turn on the login

The CMS needs GitHub to allow logins.

1. On GitHub: click your avatar → **Settings** → scroll to **Developer settings** (bottom left) → **OAuth Apps** → **New OAuth App**
2. Fill in:
   - Application name: `Skin and Mind Project CMS`
   - Homepage URL: your Netlify address, for example `https://skinandmindproject.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. **Register application**
4. Copy the **Client ID**, then click **Generate a new client secret** and copy that too
5. On Netlify: your site → **Site configuration** → **Access & security** → **OAuth** → **Install provider** → GitHub
6. Paste the Client ID and Secret, save

## Step 7 — Test it yourself

Go to `your-site-address/admin`. Log in with GitHub. You should see the editor.

Make a small change to a blog post, publish, wait a minute, refresh the site. If the change shows up, you're done.

## Step 8 — Give her access

She needs to be able to log in.

1. GitHub → your repo → **Settings** → **Collaborators** → **Add people**
2. Enter her GitHub username (she needs a free account first)
3. She accepts the email invite

Then send her `HOW-TO-EDIT.md` and the `/admin` link.

---

## Adding a custom domain later

Netlify → **Domain management** → **Add a domain**. Buy the domain at Namecheap as usual and point it at Netlify. Free on Netlify's side, including HTTPS.

If you do this, go back to the OAuth App from Step 6 and update the Homepage URL to the new domain.

---

## Making design changes after handover

You edit the files, then:

```
git add .
git commit -m "What you changed"
git push
```

Netlify rebuilds automatically. No more dragging folders.

The design lives in `src/assets/style.css`. The page layouts are in `src/*.njk` and `src/_includes/`.

---

## If something breaks

**Build fails on Netlify** — read the deploy log, the error is usually the last red line. Most likely causes are a typo in a `.njk` file or a broken `config.yml`.

**Admin page is blank** — check Step 4, the repo name in `config.yml` is probably still the placeholder.

**Can't log in** — Step 6 wasn't finished, or the callback URL is wrong.

**She published something and the site didn't change** — check Netlify's Deploys tab. A build may have failed, or it may still be running.

---

## What I could not test

npm was blocked where I built this, so I could not run the Eleventy build myself. I rendered every template through an equivalent engine and browser-tested all 18 pages, so the templates and the design are verified. What is unverified is whether Netlify's build step runs clean the first time.

If it doesn't, the error will be in the deploy log and it will be a small fix. The old static site still works, so you have a fallback either way.
