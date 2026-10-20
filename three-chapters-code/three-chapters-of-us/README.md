# Three Chapters of Us

A three-stage romantic apology website.

## Add your one permanent photo

1. Extract the ZIP.
2. Put your photo in the `public` folder and name it `our-photo.jpg`.
   Use a real JPEG image; if your file is PNG instead, save it as `public/our-photo.png`
   and change the filename in `src/lib/photo.ts` to `/our-photo.png`.
3. Start the website using the commands below, or redeploy it after adding the photo.

The photo is part of the website files, not stored in a visitor's browser. It remains
every time the page is refreshed and appears for every visitor. There are no photo
upload, link, change, or remove controls on the website. No database or login is needed.
Your personal photo is not included yet; the frame displays a heart until you add it.
The photo is public to anyone who can access the website, so use a photo you are comfortable sharing.

## Run locally

Install Node.js 22 or newer, then open a terminal in the extracted folder:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal.

## Production and tests

```sh
npm test
npm run build
```

This project uses React, TanStack Start, TypeScript, and Tailwind CSS. The included
Vite configuration uses a Cloudflare production target. The ZIP contains source and
configuration, not installed dependencies or generated build output.
