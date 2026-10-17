# Wales — Vercel + Neon + public assets

This is the portable Next.js version of the Wales website. It keeps the homepage,
separate Scholarship/O/L/A/L pages, teacher profiles, illustrated G/R/B hall map,
contact links, popup ads and password-protected admin. It does not require
Cloudflare D1, R2, Wrangler, Vinext or a separate VPS.

## First local setup

1. Install Node.js 22.13+ (Node 24 LTS is also suitable).
2. Extract this ZIP into a NEW folder. Do not copy it over the old Vinext project.
3. In the folder containing package.json, run `npm install`.
4. Create a Neon Postgres project and copy its connection string from the Connect
   dialog. Use a dedicated database for this website.
5. Copy `.env.example` to `.env.local`. Set `DATABASE_URL` to the Neon connection
   string and `ADMIN_PASSWORD` to your private admin password. Do not put secrets
   into public/, browser code, GitHub, or any NEXT_PUBLIC_ variable.
6. Run `npm run db:setup`. This creates the three tables and sample content;
   rerunning it does not overwrite existing content.
7. Run `npm run dev`. Open http://localhost:3000 and http://localhost:3000/admin.

On macOS/Linux, copy the environment example with:

```sh
cp .env.example .env.local
```

Edit .env.local BEFORE running db:setup. Local development uses the Neon database
specified there, so use a separate Neon branch if you want isolated development.

## Photos, GIFs and videos — public folder

Put the actual files into the project, for example:

| File in project | Path entered in admin |
| --- | --- |
| public/images/teachers/migara.jpg | /images/teachers/migara.jpg |
| public/images/halls/GL1.webp | /images/halls/GL1.webp |
| public/images/ads/new-class.png | /images/ads/new-class.png |
| public/images/branding/cover.jpg | /images/branding/cover.jpg |
| public/videos/teaching.gif | /videos/teaching.gif |

Filenames must use letters, numbers, hyphens or underscores, with no spaces.
Supported media: JPG/JPEG, PNG, WebP, GIF, MP4 and WebM. Use small optimized images
and short clips. Everything in public/ is publicly accessible.

The admin now accepts file paths; it does NOT upload files to the server. Teacher,
hall/location, popup, logo and cover editors preview the provided paths. Missing
files show broken previews: add/deploy the file first. Use a NEW filename when
replacing an image to avoid a browser showing its cached version.

For a new or changed photo: add the file -> commit and push -> wait for Vercel
redeployment -> enter its /images/... path in admin -> Save & publish.
Changing a class time or teacher description only needs Save & publish, with no
Git push. The page checks saved content every minute and on returning to the tab.

## GitHub and Vercel

1. Push this folder's contents to your GitHub repository. package.json must be at
   the repository root, or select the matching Root Directory in Vercel.
2. Import the repository in Vercel; choose the Next.js framework preset and a
   supported Node.js version >=22.13. Standard build: `npm run build`.
3. Add DATABASE_URL and ADMIN_PASSWORD to Vercel's environment settings. Use the
   same database initialized above for production, or initialize the chosen
   production database separately using database/schema.sql in Neon's SQL Editor.
   The first site request seeds content after the tables exist.
4. Deploy. Test /, /classes/ol, a teacher profile, /admin and a save operation.
5. For future code/images, Git pushes trigger Vercel deployments when connected.

No Vercel/Neon account credentials are bundled. A new Neon database starts with
sample teacher profiles, which should be replaced before launch. This ZIP does
not export records or uploads from the previous Cloudflare-hosted website.
For old /media/... photos, obtain the originals, add them under public/images/,
and update their paths. Do not import old media links unchanged.

## Verification and architecture

`npm test`: embedded PostgreSQL tests for schema, login/logout, authorization,
origin checks, saving, stale revision rejection, and public media path validation.
`npm run build`: Next.js production build and type check.

Live Neon connectivity and a Vercel deployment require your environment settings
and were not tested as part of this export. Browser visual QA was not performed.

Main files: client/PublicSite.jsx, client/Admin.jsx, server/api.js,
server/database.js, server/validation.js, app/api/[...path]/route.js.

The database connection and password stay server-side. Sessions expire after
8 hours; production cookies are Secure/HttpOnly/SameSite=Strict. Concurrent edits
use revision checks. Login throttling is stored in Postgres. Existing content is
stored as a JSON text record; classes, hall assignment and conflicts are validated
before an update. The illustrated map is schematic rather than surveyed geometry.
