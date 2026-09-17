# Personal site — Manmatha Roy

Plain HTML and CSS. No build tools, no Jekyll, no JavaScript.

```
index.html      Home — intro, contact, brief CV
research.html   Manuscripts and publications
teaching.html   Courses
style.css       The whole theme
assets/         Photo, CV PDF, anything else you link to
```

## Publish it on GitHub Pages

1. Create a new GitHub repository named **`<your-username>.github.io`**
   (exactly that — the username part must match your account, all lowercase).
   Leave it empty: no README, no .gitignore, no licence.

2. From this folder on your machine:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

4. The workflow in `.github/workflows/deploy.yml` runs on every push to `main`.
   Watch it under the **Actions** tab. When it goes green the site is live at
   `https://<your-username>.github.io/`.

Every later edit is just `git add . && git commit -m "..." && git push`.

## Before you publish — things to fill in

Search the HTML for `EDIT:` comments. The ones that matter:

| Where | What |
|---|---|
| `index.html` | Photo — save it as `assets/photo.jpg` (square, 400×400 or larger) |
| `index.html` | Email address — currently a guess at your ISI address |
| `index.html` | Office / unit name and room number |
| `index.html` | Google Scholar, DBLP, arXiv, ORCID URLs — currently bare homepages |
| `index.html` | Brief CV years — I inferred 2019–2021 at Jadavpur and 2021– at ISI from your teaching record; check them |
| `index.html` | `assets/cv.pdf` — drop your CV there or delete that line |
| `research.html` | Co-author first names on the Tang / Chattopadhyay / Mandal papers — verify |
| `research.html` | Paper links (arXiv, ePrint, slides) — a commented-out snippet shows the markup |

## Custom domain (optional)

Add a file named `CNAME` at the repo root containing just your domain, e.g.
`manmatharoy.in`, then point a CNAME DNS record at `<your-username>.github.io`.
