# Camp Alpha Static Website

Premium static website for Camp Alpha, a luxury riverside homestay, camping and coffee estate stay in Aldur, Chikmagalur.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- No build step
- No frameworks
- Ready for GitHub Pages

## Pages

- `index.html` - homepage with hero, accommodation, experiences, gallery, amenities, attractions, FAQs and booking CTA
- `about.html` - brand story, estate positioning and hospitality values
- `stay.html` - couple rooms, dormitory and luxury camping
- `experiences.html` - camping, bonfire, stream, coffee plantation, games, trekking and corporate outings
- `gallery.html` - image gallery with lightbox
- `contact.html` - contact details, Google Maps embed and validated enquiry form
- `404.html` - custom not found page

## SEO Files

- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- `favicon.ico`

Each public page includes unique title tags, meta descriptions, canonical URLs, OpenGraph tags, Twitter Cards, JSON-LD schema and accessible heading structure.

## Images

The site uses the supplied Camp Alpha image set in `images/`. The original `.webp` assets are included along with optimized `.jpg` fallbacks that match the filenames from the brief.

To change the visible logo and app icons, replace these files with the same filenames:

- `images/icon-192.png` - header logo mark, browser tab icon and small PWA icon
- `images/icon-512.png` - large PWA/app icon

Keep both images square for the cleanest result.

## Contact Form

The enquiry forms submit with JavaScript `fetch()` to:

```text
https://formsubmit.co/alphacamp.ckm@gmail.com
```

The form validates:

- Name
- Phone
- Email
- Guests
- Check-in
- Check-out
- Accommodation
- Message

On success, the site displays a modal confirmation.

## Deployment

Upload the repository contents directly to GitHub Pages. No installation or build command is required.

If the final production domain is not `https://campalpha.co.in/`, update canonical URLs, OpenGraph URLs and `sitemap.xml` to match the live GitHub Pages or custom domain.
