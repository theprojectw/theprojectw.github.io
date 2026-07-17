# Rising Tiles Legal Pages

Static HTML for the Play Store listing's Privacy Policy + Terms URLs.

## Deploy to GitHub Pages (5 minutes, free, done forever)

### Option A — as a subfolder of the main repo (simplest)

1. Push this whole repo to GitHub (must be **public** or GitHub Pro).
2. In your repo → **Settings → Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / folder: `/legal`
   - Click **Save**.
3. Wait ~1 minute. Your URL will be:

   ```
   https://<your-github-username>.github.io/<repo-name>/legal/privacy.html
   https://<your-github-username>.github.io/<repo-name>/legal/terms.html
   ```

### Option B — dedicated legal repo (cleaner URL)

1. Create a NEW repo called `rising-tiles-legal` (public).
2. Copy the contents of this `legal/` folder to that repo's root.
3. Settings → Pages → deploy from `main` branch, root folder `/`.
4. Your URLs become:

   ```
   https://<your-github-username>.github.io/rising-tiles-legal/privacy.html
   https://<your-github-username>.github.io/rising-tiles-legal/terms.html
   ```

### Option C — custom domain (if you own one)

Add a `CNAME` file to the `legal/` folder containing your custom domain,
then point that domain's DNS at GitHub Pages. URL becomes
`https://yourdomain.com/privacy.html`.

## After hosting: update the app

Replace the placeholder URL in `app/src/release/res/values/strings.xml`:

```xml
<string name="privacy_policy_url" translatable="false">https://YOUR-HOSTED-URL/privacy.html</string>
<string name="terms_of_service_url" translatable="false">https://YOUR-HOSTED-URL/terms.html</string>
```

Then rebuild release. Play Console will validate the URL when you submit.

## Keeping legal text in sync

The in-app text (`app/src/main/java/com/projectw/rt/LegalText.kt`) and
these HTML pages should say the SAME thing. They were generated from
LegalText.kt on 2026-07-16 — if you edit either side, regenerate the
other. There's a script at `scripts/regen_legal_html.py` (todo — for now
either edit both by hand, or copy-paste from LegalText.kt sections).
