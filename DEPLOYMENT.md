# Deployment Guide — GitHub Pages

This guide walks you through publishing your portfolio (`index.html` + `style.css` + `script.js` + `assets/`) and your new profile README to GitHub.

You'll end up with **two** repositories:

| Repo | Purpose | Lives at |
|---|---|---|
| `KarimElroby7` (named exactly like your username) | Profile README — auto-shows on your GitHub profile | `https://github.com/KarimElroby7` |
| `karimelroby7.github.io` | Portfolio website | `https://karimelroby7.github.io` |

---

## Step 0 — Drop your photo into `assets/`

Before deploying, save your professional headshot as **`assets/profile.jpg`** (square crop, ~800×800 px or larger).

If the file is missing, the page renders a clean gradient "KE" placeholder, so deployment won't break — but the hero looks much sharper with a real photo.

---

## Part A — Profile README

The repo's name **must exactly match your GitHub username**: `KarimElroby7`.

### Option 1 — Web UI (easiest)

1. Go to <https://github.com/new>.
2. **Repository name:** `KarimElroby7` (case-sensitive — must match your username).
3. Keep **Public**, tick **Add a README file**, click **Create repository**.
4. Open the new `README.md`, click the pencil icon, paste the contents of `README.md` from this folder, **Commit changes**.

GitHub auto-displays this README on your profile within seconds.

### Option 2 — Git CLI

```bash
mkdir KarimElroby7 && cd KarimElroby7
git init
# copy README.md from d:\Other\pr into this folder
git add README.md
git commit -m "Add profile README"
git branch -M main
git remote add origin https://github.com/KarimElroby7/KarimElroby7.git
git push -u origin main
```

---

## Part B — Portfolio Website (recommended path)

Repo name **`karimelroby7.github.io`** gets you the cleanest URL: <https://karimelroby7.github.io>.

1. <https://github.com/new> → name **`karimelroby7.github.io`** (lowercase, matches `<username>.github.io`).
2. **Public**. Don't initialize with a README.
3. **Create repository**.
4. From your portfolio folder (`d:\Other\pr`):

```bash
cd /d/Other/pr
git init
git add index.html style.css script.js assets/ "Karim Elorby CV.pdf"
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/KarimElroby7/karimelroby7.github.io.git
git push -u origin main
```

5. <https://github.com/KarimElroby7/karimelroby7.github.io/settings/pages>
6. **Build and deployment → Source:** Deploy from a branch.
7. Branch: **`main`** · Folder: **`/ (root)`** · **Save**.
8. Wait ~30–60 seconds. Live at <https://karimelroby7.github.io>.

### Alternative — project site

If you'd rather keep it in a normal repo (e.g. `portfolio`):

1. Create a public repo named `portfolio`.
2. Push the same files.
3. **Settings → Pages → Source:** Deploy from a branch → `main` / root → Save.
4. URL becomes `https://karimelroby7.github.io/portfolio/`.

---

## Part C — Verify

After Pages reports the build green:

1. Open the URL in an **incognito window** (avoids stale cache).
2. Check your photo loaded (gradient "KE" fallback means the file is missing or misnamed).
3. Test on mobile — the nav collapses into a burger under 760 px.
4. Hover the project cards — cursor-tracked glow should track your mouse.
5. Click **Resume ↗** in the nav and **Download Resume** in the hero — both should serve the PDF.

If the CV link 404s, confirm `Karim Elorby CV.pdf` is committed and the filename in `index.html` matches (spaces are URL-encoded as `%20`).

---

## Part D — Updating the site later

```bash
# from the portfolio folder
git add .
git commit -m "Tweak copy / add project / refresh photo"
git push
```

GitHub Pages rebuilds on every push to `main`. The new version is usually live in under a minute.

---

## Part E — Optional polish

- **Custom domain** (e.g. `karimelorby.com`): Settings → Pages → Custom domain. Add a `CNAME` DNS record pointing to `KarimElroby7.github.io`. Enable **Enforce HTTPS**.
- **Open-Graph preview image:** save `assets/og.png` (1200×630) and add `<meta property="og:image" content="assets/og.png">` to the `<head>` so links shared on LinkedIn/Twitter render a card.
- **Favicon:** drop `assets/favicon.svg`, add `<link rel="icon" href="assets/favicon.svg">` in `<head>`.
- **Analytics:** drop a [Plausible](https://plausible.io) or [Umami](https://umami.is) script tag right before `</body>` for privacy-friendly visitor tracking.

---

## Files in this delivery

| File | Purpose |
|---|---|
| `index.html` | Portfolio page — hero, about, skills, projects, services, education, contact |
| `style.css` | Dark-theme, responsive styling — animations, hover effects, timeline, photo ring |
| `script.js` | Sticky nav, scroll-spy, mobile menu, typing effect, counters, skill bars, reveal-on-scroll, card spotlight, photo fallback |
| `assets/` | `profile.jpg` (drop your photo here), plus optional `og.png`, `favicon.svg` |
| `README.md` | Your new GitHub profile README |
| `PROJECT_ANALYSIS.md` | Recruiter-facing project breakdown + positioning advice |
| `DEPLOYMENT.md` | This guide |
| `Karim Elorby CV.pdf` | Your CV (referenced by the Resume / Download Resume buttons) |

You're ready to ship.
