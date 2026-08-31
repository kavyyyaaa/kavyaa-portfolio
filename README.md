# Kavyaa Jaiswal — Portfolio

A responsive, static portfolio for Kavyaa Jaiswal, built with HTML, CSS and vanilla JavaScript.

## Included

- Premium dark + lime visual system
- Responsive desktop/tablet/mobile layout
- Featured project cards
- Category filters
- Individual project case-study pages
- Jindal Steel internship case study
- Remote project visuals sourced from Kavyaa's public GitHub repositories
- GitHub, LinkedIn, email and resume links
- SEO metadata, robots.txt, sitemap.xml and favicon
- Future-project friendly data model
- No build step required

## Run locally

Open `index.html` directly in a browser.

For a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Add a future project

Open `script.js` and add an object to the `projects` array:

```js
{
  id: "07",
  title: "Your New Project",
  description: "Short description.",
  tech: ["Python", "FastAPI", "RAG"],
  categories: ["AI"],
  featured: false,
  github: "https://github.com/...",
  demo: "https://...",
  caseStudy: false
}
```

If `caseStudy` is `true`, create the corresponding entry in `project.html`'s data object.

## Important before publishing

1. Replace `https://YOUR-DOMAIN.example/` in `index.html`, `robots.txt` and `sitemap.xml` after the final Vercel/custom-domain URL is known.
2. Review all project descriptions and add measured results/metrics only where you have real evidence.
3. Add live-demo URLs only for actually deployed projects.
4. If you later download local screenshots into `assets/projects/`, switch the case-study image URLs from GitHub raw URLs to those local files.
5. Keep `Kavyaa_Jaiswal_Resume.pdf` updated when your resume changes.

## Deploy to Vercel

This is a static site, so no build command is required.

1. Create a GitHub repository, e.g. `kavyaa-portfolio`.
2. Upload all files in this folder.
3. Import the repository into Vercel.
4. Framework preset: Other / static.
5. Build command: leave blank.
6. Output directory: leave blank / root.
7. Deploy.
8. Replace `YOUR-DOMAIN.example` with the final Vercel URL.
9. Redeploy.

## Deploy with GitHub Pages

Push the files to a GitHub repository, then enable Pages from Settings → Pages → Deploy from branch → `main` → `/root`.

## Content basis

Portfolio facts are based on Kavyaa Jaiswal's supplied resume and her public GitHub repositories.


## Repository coverage

The portfolio currently represents all 8 public repositories on `github.com/kavyyyaaa`.
Four are highlighted as Selected Work and the other four appear under More Work, so no repository is rendered twice on the page.
