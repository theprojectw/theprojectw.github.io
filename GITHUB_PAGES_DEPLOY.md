# Deploy ProjectW on GitHub Pages

## Best free URL option
Create a GitHub repository named exactly:

```txt
yourusername.github.io
```

Then your website URL will be:

```txt
https://yourusername.github.io/
```

## Upload instructions
Upload the **contents** of this folder to the repository root.

Correct repository structure:

```txt
index.html
about.html
chargeguard.html
qrcraft.html
relayotp.html
privacy.html
terms.html
support.html
styles.css
motion.js
detail-motion.js
contact-widget.js
assets/
vendor/
apks/
.nojekyll
robots.txt
sitemap.xml
site.webmanifest
```

Do **not** upload the parent folder as:

```txt
projectw-gsap-website/index.html
```

unless you intentionally want a nested path.

## Enable GitHub Pages
1. Open your GitHub repository.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment** choose:

```txt
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Save.

## APK files
Add APK files in:

```txt
apks/ChargeGuard.apk
apks/QRcraft.apk
apks/RelayOTP.apk
```

## Important SEO step
After you know your GitHub Pages URL, update `sitemap.xml`.

Replace:

```txt
https://your-domain.com
```

with your real GitHub Pages URL, for example:

```txt
https://yourusername.github.io
```

If you use a project repo instead of `yourusername.github.io`, the URL may be:

```txt
https://yourusername.github.io/repo-name
```
