# 🧩 Nova Studio – Sanity CMS for Nova Detailing

Content studio for **[thenovadetailing.ca](https://www.thenovadetailing.ca)**.  
This repo contains the Sanity Studio that powers the **gallery and structured content** for the Nova Detailing website.

---

## 🧠 Where This Fits (NovaProject Context)

Nova Studio is the **CMS layer** in the Nova Detailing stack:

- **Frontend:** `nova-detailing` (Astro + Netlify)
- **CMS:** `nova-studio` (this repo – Sanity Studio)
- **Serverless:** Netlify functions that fetch Sanity content and send it to the frontend

Future: this will be linked from the main **NovaProject** meta repo that documents the full architecture.

---

## 🎯 Purpose of This Repo

This repo exists so I can:

- Define and maintain the **data model** (schemas) for Nova Detailing
- Manage **gallery posts** (before/after jobs, vehicles, dates, notes)
- Store all **images and assets** in a structured way
- Keep the content layer separate from the Astro frontend, but tightly integrated

The public site never writes to Sanity – it only **reads** from this Studio via the Sanity Content Lake.

---

## 🧱 Content Model (How the Data Is Shaped)

Sanity schemas live in `schemaTypes/`. The main concept right now is:

### `galleryPost` (core document type)

This is the backbone of the gallery on thenovadetailing.ca.

**Key ideas/fields:**

- `title` – short, human-readable title for the job  
- `slug` – used to generate clean URLs for individual gallery pages  
- `detailType` – what kind of work it was  
  - e.g. *Interior*, *Exterior*, *Full Detail*, *Engine Bay*, etc.
- `vehicleMake`, `vehicleModel`, `vehicleYear`, `vehicleColor`  
  - lets me show proper vehicle info on the site and filter later if I want
- `beforePhotos` / `afterPhotos`  
  - arrays of images; ordering matters (first image usually used as the main card image)
- `date` – when the detail was done (used for sorting and “recent work” sections)
- `summary` / `description`  
  - short text about what was done, challenges, results
- `featured` (boolean)  
  - lets me promote certain jobs on the homepage or a “featured” row

I can add more document types over time (e.g. `service`, `testimonial`, `faq`) without touching the main frontend architecture – the Studio is where those shapes live.

---

## 🔌 How the Frontend Uses This

Rough data flow:

1. I create/update `galleryPost` documents inside **Nova Studio**.
2. Sanity stores them in the **Content Lake** (hosted by Sanity).
3. The Nova Detailing frontend (Astro) pulls them using:
   - either **direct GROQ queries** from Astro, or  
   - a **Netlify function** (e.g. `getGalleryPosts`) that:
     - uses the Sanity client with `projectId` + `dataset`
     - runs a GROQ query to fetch only the fields I care about
     - returns clean JSON to the frontend
4. The frontend renders:
   - the **Gallery page** (grid of posts)
   - **individual gallery pages** based on `slug`
   - any other areas of the site that need gallery data

The important part: the **shape of that data** is controlled here in `schemaTypes/`, not in the frontend.

---

## 📂 Repo Layout (What Lives Where)

High-level structure (this is for me so I remember where things are):

```bash
nova-studio/
├─ sanity.config.ts          # Main Sanity Studio config
├─ schemaTypes/              # All document & object schemas
│  ├─ galleryPost.ts         # Main gallery document schema
│  └─ ...futureSchemas.ts    # Any future content types
├─ deskStructure/            # Custom desk / navigation (if I add it)
├─ src/                      # Studio-level customizations (components, theme, etc.)
├─ package.json              # Scripts + dependencies
└─ README.md                 # This file
```
sanity.config.ts
- Holds:
    - `projectID`
    - `dataset`
    - schema imports
    - any plugins I add later
- This is essentially the "entry point" for the Studio

schemaTypes/
- Each file describes one major document or object type.
- `galleryPost.ts` is most important
- If I add other structured content, they'll live here too

## 🌐 Project / Environment Notes

Sanity project info:

- Project ID: defined in `sanity.config.ts` (and/or env if I set it up that way)

- Dataset: `production` (unless I decide to add a staging dataset later)

- The frontend + Netlify functions use the same projectId and dataset so everything stays in sync.

I keep secrets like API tokens in:

- `.env` files locally, and/or

- environment variables in Netlify / Sanity settings

Nothing secret should live in the repo itself.

## 🧑‍💻 Dev Notes

These are mainly reminders for me, not instructions for random people:

- Local Studio dev:
    I run the Studio locally when I want to tweak schemas or test changes.

    - Usually: `npm run dev` or `npx sanity dev`

- Deploy Studio:

    - If I’m using Sanity’s hosting: npx sanity deploy

    - If I ever wrap this in Netlify/Vercel, I’ll mirror the scripts in package.json

- Any schema changes require:

    - redeploying the Studio, and

    - (if needed) updating the frontend/Netlify function queries to match the new fields