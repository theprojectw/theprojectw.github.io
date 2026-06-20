# SEO Deployment Notes

GitHub Pages root URL configured for:

```txt
https://theprojectw.github.io/
```

This setup assumes your GitHub username is `theprojectw` and your repository name is exactly:

```txt
theprojectw.github.io
```

Configured files:

- `sitemap.xml` uses `https://theprojectw.github.io`
- `robots.txt` points to `https://theprojectw.github.io/sitemap.xml`
- canonical tags use the root GitHub Pages URL
- `site.webmanifest` uses `/` as start URL and scope

If your repository is named only `theprojectw`, your URL will be `https://theprojectw.github.io/theprojectw/` instead. For `https://theprojectw.github.io/`, the repo must be named `theprojectw.github.io`.
