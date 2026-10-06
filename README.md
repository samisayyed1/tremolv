# tremolv.com

The tremolv website. Plain HTML, CSS and JavaScript with no build step.

## Files

- `index.html`: the home page
- `privacy.html`, `404.html`: supporting pages
- `assets/css/site.css`: all styles and brand colours
- `assets/js/site.js`: the record switcher, the fit check and the call request form
- `assets/fonts`, `assets/img`: self-hosted fonts, logo and icons

## Preview on your computer

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Hosting

The site is served by GitHub Pages from the `main` branch, root folder. Every push to `main` updates it.

The call request form has no server behind it. It opens the visitor's email app with the request written out, addressed to `hello@tremolv.com`.

## Confirm before sharing the link

These are stated on the site and must be true:

- Your share 60%, our share 40% (`index.html`, the terms section and one answer under Questions)
- Payment within 7 days of the buyer paying
- File deleted and nothing owed if nothing sells in 90 days
- "Our first ten partners"
- Replies come from `hello@tremolv.com`, so that mailbox must exist
- Emails deleted within 12 months (`privacy.html`)
- The five steps in "How it works" describe what actually happens on every deal

The record in the hero is invented and labelled as an illustration. Replace it with real output when there is some.
