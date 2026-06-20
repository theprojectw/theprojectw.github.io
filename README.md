# ProjectW Website

Premium self-contained ProjectW website for the ProjectW Android app suite.

## Open main site
`projectw-gsap-website/index.html`

## App detail pages
- `chargeguard.html` — full ChargeGuard product page
- `qrcraft.html` — full QRcraft product page
- `relayotp.html` — full RelayOTP product page

## What the landing page covers
- ProjectW company identity
- Apps and product specs
- ChargeGuard, QRcraft, and RelayOTP summaries
- Company principles
- ProjectW FAQ
- Contact: `wetheprojectw@gmail.com`

## Theme support
The site supports dark and light mode. App logos also switch between dark and light variants.

## Main files
- `index.html`
- `chargeguard.html`
- `qrcraft.html`
- `relayotp.html`
- `styles.css`
- `motion.js`
- `detail-motion.js`
- `vendor/gsap.min.js`
- `vendor/ScrollTrigger.min.js`
- `assets/` SVG logo files

No app logo JPEGs are used. The site uses SVG logos for sharp rendering.
No CDN is required. The site is self-contained.

## SEO additions completed
- Unique meta descriptions and keywords for app pages
- SoftwareApplication JSON-LD for ChargeGuard, QRcraft, and RelayOTP
- FAQPage JSON-LD on homepage
- WebSite / Organization structured data
- Canonical links added
- Twitter card tags added
- Open Graph image added: `assets/og-image.svg`
- `site.webmanifest` added
- `robots.txt` and `sitemap.xml` added

Before final deployment, replace `https://your-domain.com` in `sitemap.xml` with the real domain and optionally convert root-relative canonical URLs to full absolute URLs.

## APK download filenames
Add APKs inside the `apks/` folder with these exact filenames:

- `apks/ChargeGuard.apk`
- `apks/QRcraft.apk`
- `apks/RelayOTP.apk`

All Download APK buttons are already linked to these paths.
