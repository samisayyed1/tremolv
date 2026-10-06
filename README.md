# tremolv.com

The tremolv website. Plain HTML, CSS and JavaScript with no build step.

## Files

- `index.html`: the home page
- `privacy.html`, `thanks.html`, `404.html`: supporting pages
- `assets/css/site.css`: all styles and brand colours
- `assets/js/site.js`: the record switcher, the fit check and the call request form
- `assets/fonts`, `assets/img`: self-hosted fonts, logo and icons
- `netlify.toml`: hosting settings

## Preview on your computer

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Hosting

The site is hosted on Netlify. The call request form uses Netlify Forms, so it only works on the hosted site, not in a local preview. Submissions appear under Forms in the Netlify dashboard.

## Confirm before sharing the link

These are stated on the site and must be true:

- Your share 60%, our share 40% (`index.html`, the terms section and one answer under Questions)
- Payment within 7 days of the buyer paying
- File deleted and nothing owed if nothing sells in 90 days
- "Our first ten partners"
- Replies come from `hello@tremolv.com`, so that mailbox must exist
- Requests deleted within 12 months (`privacy.html`)
- The five steps in "How it works" describe what actually happens on every deal

The record in the hero is invented and labelled as an illustration. Replace it with real output when there is some.
