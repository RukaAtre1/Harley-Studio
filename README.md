# Personal Website

This project is a polished multi-page personal website starter for the STATS 140XP final project.

## Included

- `index.html`: strong landing page with a quick professional summary
- `about.html`: personal description, education, interests, and values
- `experience.html`: timeline plus embedded PDF resume
- `projects.html`: portfolio cards with problem / contribution / tools structure
- `contact.html`: email, profile links, and resume access
- `assets/css/styles.css`: full visual system and responsive layout
- `assets/images/profile-portrait.svg`: replace with your real headshot
- `assets/files/junhao-resume-template.pdf`: replace with your actual resume PDF

## Fast Personalization

1. Replace the highlighted placeholder text across the HTML files.
2. Replace `assets/images/profile-portrait.svg` with your own photo.
3. Replace `assets/files/junhao-resume-template.pdf` with your real resume PDF.
4. Update your email, GitHub, and LinkedIn links in:
   - `index.html`
   - `contact.html`
   - `experience.html`
5. Host the folder on GitHub Pages or any static hosting service.

## Resume PDF Regeneration

If you delete the placeholder PDF and want to regenerate it:

```bash
node scripts/generate-resume.mjs
```

## GitHub Pages

If you upload this project to a GitHub repository:

1. Push the files to the repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose your main branch and the root folder.
5. Save and wait for the published URL.
