# Junhao Jia Personal Website
## Ultimate PRD

Version: 2.0  
Status: Final build spec  
Platform: GitHub Pages  
Architecture: Single-page scrolling portfolio website with anchored navigation and clickable external cards/icons

---

## 1. Product Goal

Build a **single-page personal website** that is visually polished, highly scannable, and strong enough for:
- STATS 140XP final project submission
- graduate admissions review
- internship / recruiter review
- collaborator / mentor first impression

The site should communicate, within 30 to 60 seconds:
1. who Junhao Jia is
2. what kind of work he does
3. what projects and experiences matter most
4. what makes his work distinct
5. how to view resume and contact him

This site is not meant to be a generic resume dump. It should feel like a **designed personal brand site** for an AI builder focused on grounded systems, product thinking, and creative computation.

---

## 2. Core Product Definition

### Site Type
A **single-page scrolling website**.

### Navigation Behavior
The navbar should **not** switch pages. It should serve as **anchor navigation** that smoothly scrolls to sections on the same page.

### Core UX Principle
Users should be able to:
- land on the homepage hero
- scroll continuously downward through the whole story
- use the navbar as a quick elevator to sections
- click cards and icons to jump directly to external destinations

---

## 3. High-Level Positioning

### One-line positioning
**UCLA-based AI builder focused on grounded systems, product thinking, and creative computation.**

### Core narrative
Junhao is not presented as a generic AI student. He should be presented as:

> A UCLA Statistics and Data Science student with a Data Science Engineering minor who builds grounded AI workflows, interpretable creative systems, and products designed to be usable and trustworthy in real-world settings.

### Explicit exclusions
The site must **not** include:
- GPA
- SoundCove
- stealth project hints
- “coming soon” confidential work
- excessive personal adjectives without evidence

---

## 4. Non-Negotiable Design Requirements

### Design priority
**UI must be genuinely beautiful.**

This is not optional. The site should not merely be functional. It should look intentional, modern, polished, and visually memorable.

### Visual direction
The site should combine:
- dark editorial tech atmosphere
- strong hierarchy
- minimal clutter
- premium spacing
- refined motion
- crisp typography
- visually distinct cards

### Design benchmark
The hero section should borrow the spirit of the reference personal intro card style shown by the user, especially the feel of:
- a centered introduction card
- orbiting icons around the card
- a strong focal object in the center
- icons acting like clickable satellites
- a clean but memorable composition

The reference inspiration includes the user-provided example and the public reference:
- https://www.qzq.at/

### Hero visual requirement
The homepage hero must include a **personal intro card** inspired by the reference style, with:
- a central card introducing Junhao
- multiple orbiting icons around the card
- subtle circular/orbital guide lines or paths
- icons placed around the card like satellites
- each icon clickable
- the composition elegant, balanced, and premium rather than childish

---

## 5. Hero Card Requirements

### Purpose
Create a memorable “identity anchor” that immediately distinguishes the site.

### Card structure
The hero should contain a central card with:
- Junhao’s name
- a short line or two describing his role and interests
- a compact, high-signal personal introduction

### Card layout concept
The intro card should feel like a futuristic profile panel or orbit hub.

### Required contents inside the hero card
- Name: **Junhao Jia**
- Short role line: **AI systems / product thinking / creative tools**
- UCLA affiliation line
- 2 to 4 very short role descriptors

### Recommended hero card copy
**Name**  
Junhao Jia

**Affiliation**  
UCLA Statistics and Data Science  
Data Science Engineering minor

**Descriptor stack**  
Grounded AI systems  
Product thinking  
Creative computation

### Important content rule
The card should stay concise. It must not become a paragraph block.

---

## 6. Orbiting Icon System

### Purpose
The orbit icons turn the hero into a clickable interaction hub.

### Requirements
There should be multiple icons orbiting or positioned around the hero card.
Each icon must be clickable and lead to a real destination.

### Required clickable orbit items
1. **Ruka.jpg**
   - must appear visually as one of the orbiting elements
   - must be clearly visible
   - must link to GitHub
   - destination: `https://github.com/RukaAtre1`

2. **LinkedIn icon**
   - clickable
   - destination: user's LinkedIn profile
   - use the LinkedIn URL from the site content / CV

3. **Email / Gmail icon**
   - clickable
   - opens mailto link to `harleyjia123@g.ucla.edu`

4. **Resume icon or PDF icon**
   - clickable
   - scroll to resume section or open PDF in new tab

5. Optional extra icon
   - FishCapsule or project icon
   - clickable to FishCapsule

### Motion behavior
- icons can have subtle floating/orbit-like motion
- motion must remain tasteful and smooth
- no chaotic spinning
- no exaggerated animation that distracts from readability

### Style behavior
- icons must feel like part of the design system
- hover state should clearly indicate clickability
- icon composition should not overlap text awkwardly

---

## 7. External Link Rules

### All external links
Must open in a new tab using:
- `target="_blank"`
- `rel="noopener noreferrer"`

### Clickable object principle
For projects and linked cards, **the entire card should be clickable**, not just a small text link.

### Hover states
All clickable icons/cards must have:
- hover feedback
- cursor pointer
- slight lift / shadow / glow or border shift

---

## 8. Site Architecture

The entire website should exist on **one page** with these anchor sections:

1. `#home`
2. `#about`
3. `#experience`
4. `#projects`
5. `#resume`
6. `#contact`

### Navbar items
- Home
- About
- Experience
- Projects
- Resume
- Contact

### Navbar behavior
- sticky / fixed on top
- smooth scroll to target section
- active section highlight optional but encouraged

---

## 9. Full Section-by-Section Content Spec

# SECTION 1: HOME (`#home`)

## Goal
Establish identity and visual memorability immediately.

## Layout
- large hero section
- centered or slightly offset intro card
- orbiting clickable icons around the card
- clear CTA buttons below or near card

## Copy
### Eyebrow
AI SYSTEMS / PRODUCT THINKING / CREATIVE COMPUTATION

### Main statement
**Junhao Jia**

### Supporting line
I build AI systems that aim to be useful under real use, not just impressive in demos.

### Secondary description
UCLA Statistics and Data Science student with a Data Science Engineering minor, focused on grounded workflows, interpretable creative systems, and products people can actually trust.

### CTA buttons
- View Projects → `#projects`
- Open Resume → `#resume` or PDF

## Hero card alternate compact content
If the central card uses the shorter orbit-hub format, use:

**Junhao Jia**  
UCLA Statistics and Data Science  
AI systems  
product thinking  
creative tools

---

# SECTION 2: ABOUT (`#about`)

## Goal
Explain Junhao’s background and what kind of problems he cares about.

## Section title
About

## Body copy
I’m a UCLA student majoring in Statistics and Data Science, with a minor in Data Science Engineering. Across research, internships, and independent projects, I’m most interested in turning technical capability into systems that people can actually use and verify.

What I care about most is not just whether a model can generate something impressive, but whether its outputs remain grounded, interpretable, and trustworthy in real workflows. That perspective shapes how I think about AI in learning, data products, and creative tools.

## Supporting facts
- UCLA
- B.S. in Statistics and Data Science
- Minor in Data Science Engineering
- Expected June 2026

## Visual format
This can be presented as:
- a short prose block
- plus 3 compact cards for education / interests / current focus

---

# SECTION 3: EXPERIENCE (`#experience`)

## Goal
Show 2 strongest experiences with concise proof of impact.

## Section title
Selected Experience

## Experience card 1
**Techtronic Industries**  
PLM Data Analytics Intern

Analyzed enterprise usage data and built reporting workflows that improved license efficiency and reduced manual reporting effort.

**Highlights**
- 6.18M+ usage logs analyzed
- $34K projected annual savings
- 38+ hours/month of manual work reduced

## Experience card 2
**UCLA Math–Code–Art Initiative**  
Undergraduate Researcher

Built music-conditioned generative systems that translate audio features into structured visual output for reproducible computational art.

**Highlights**
- Signal-to-geometry pipeline design
- NumPy, PIL, and FFmpeg workflow
- Reproducible, interpretable creative output

### Click behavior
The Math–Code–Art card should be clickable and link to:
`https://jlu227.wixsite.com/kay-lu/teaching`

### TTI card
If no suitable public link exists, it can remain informational only.

---

# SECTION 4: PROJECTS (`#projects`)

## Goal
Display strongest public-facing projects as beautiful clickable cards.

## Section title
Selected Work

## Project card 1
**FishCapsule**  
Grounded study platform

RAG, structured outputs, and source-linked learning workflows designed to make educational AI more trustworthy.

### Card click URL
`https://fish-capsule.vercel.app/`

## Project card 2
**SpiroMint**  
Audio-driven visual system

Music features translated into controlled geometric animation through a reproducible, browser-based pipeline.

### Card click URL
`https://devpost.com/software/spiromint?_gl=1*15zkds*_gcl_au*MzgzODUwOTQuMTc3MDY2ODczNA..*_ga*MjA3ODkwNDk0NS4xNzYxNjI5MjYx*_ga_0YHJK3Y10M*czE3NzM2NTg4MzckbzM1JGcxJHQxNzczNjU4ODc0JGoyMyRsMCRoMA..`

## Optional project card 3
**Skin Cancer Classification**  
Machine learning pipeline for structured prediction and model comparison on dermatology data.

### Click behavior
- if there is no public link, either keep it non-clickable or omit it entirely
- do not invent a placeholder link

## Visual requirements for project cards
- cards must be large, beautiful, and clearly scannable
- use project screenshots or preview images
- title, subtitle, and short descriptor should all be visible without crowding
- entire card clickable
- image top, content bottom is acceptable

---

# SECTION 5: RESUME (`#resume`)

## Goal
Provide direct resume access.

## Section title
Resume

## Copy
You can open or download my current resume below.

## Buttons
- Open Resume PDF
- Download Resume PDF

## File
Use the current uploaded resume PDF.

## Behavior
- open in new tab is acceptable
- embedded preview is optional
- this section should stay clean and minimal

---

# SECTION 6: CONTACT (`#contact`)

## Goal
Convert interest into direct outreach.

## Section title
Contact

## Copy
I’m open to conversations about internships, research, and collaborations related to AI systems, data products, and human-centered tools.

## Contact cards
**GitHub**  
RukaAtre1

**LinkedIn**  
Junhao Harley Jia

**Email**  
harleyjia123@g.ucla.edu

## Behavior
- GitHub clickable
- LinkedIn clickable
- Email clickable via `mailto:`

---

## 10. Content Guardrails

### Must not include
- GPA
- SoundCove
- stealth product references
- buzzword-heavy self-description
- empty adjectives like “passionate” without evidence

### Tone guide
The writing should feel:
- sharp
- minimal
- credible
- product-aware
- technically grounded

Not:
- cheesy
- essay-like
- corporate-overwritten
- full of filler

---

## 11. Visual Design System

### Color direction
Preferred palette:
- deep navy / midnight background
- soft off-white text
- restrained accent color (orange, red-orange, or electric blue)
- muted borders and orbit lines

### Typography
- headline font can be bold condensed or strong display serif depending final direction
- body font should be clean sans-serif
- eyebrow labels uppercase with tracking

### Card language
- rounded corners
- subtle glow or shadow
- strong padding
- high contrast
- premium spacing

### Orbit card feel
The orbit intro should feel more like:
- a designed identity module
- a modern portfolio centerpiece
- visually memorable without being noisy

It should **not** feel like:
- a random icon collage
- a childish sticker board
- a cluttered social media panel

---

## 12. Motion Guidelines

### Acceptable
- smooth anchor scrolling
- subtle floating orbit elements
- hover glow/lift on clickable items
- light parallax or depth shift if tasteful

### Not acceptable
- flashing
- fast spinning
- excessive particle chaos
- motion that hurts readability

---

## 13. Responsiveness Requirements

### Desktop
- hero card and orbit icons fully visible
- sections breathe with wide margins
- cards can use two-column layouts where appropriate

### Tablet
- preserve hierarchy
- orbit system may scale down
- keep icons readable and clickable

### Mobile
- hero card must still be beautiful
- orbit composition may simplify or tighten
- text must remain readable
- cards should stack into one column
- navbar can collapse if needed but should remain usable

---

## 14. Accessibility and Technical Requirements

### Accessibility
- semantic HTML where appropriate
- all meaningful images need alt text
- clickable cards and icons must be keyboard accessible
- color contrast must remain readable

### Technical
- GitHub Pages compatible
- single-page HTML architecture is acceptable
- smooth scrolling enabled
- no broken links
- external links open safely in new tab

---

## 15. Priority Order

If implementation time is limited, preserve this priority:
1. Beautiful hero intro card with orbit icons
2. Ruka.jpg orbit element linking to GitHub
3. Sticky anchor navbar
4. Strong project cards with correct external links
5. Clean About / Experience / Contact sections
6. Resume access

---

## 16. Final Directives to the Coding Agent

Use this as the final build behavior:

- Build a **single-page scrolling portfolio website**.
- Navbar must anchor-scroll to sections instead of changing pages.
- The homepage hero must feature a **beautiful personal introduction card** inspired by orbit-card portfolio references.
- Surround the intro card with several clickable icons.
- **Ruka.jpg must appear as one of the orbiting clickable elements and link to GitHub**.
- Make the hero visually striking, premium, and polished.
- Do not sacrifice UI quality for simplicity.
- The design must feel intentional and high-end.
- Use the exact public project URLs provided.
- Do not include GPA.
- Do not include SoundCove.

---

## 17. Exact Required Links

### GitHub
`https://github.com/RukaAtre1`

### FishCapsule
`https://fish-capsule.vercel.app/`

### Math–Code–Art / Teaching page
`https://jlu227.wixsite.com/kay-lu/teaching`

### SpiroMint Devpost
`https://devpost.com/software/spiromint?_gl=1*15zkds*_gcl_au*MzgzODUwOTQuMTc3MDY2ODczNA..*_ga*MjA3ODkwNDk0NS4xNzYxNjI5MjYx*_ga_0YHJK3Y10M*czE3NzM2NTg4MzckbzM1JGcxJHQxNzczNjU4ODc0JGoyMyRsMCRoMA..`

### Email
`mailto:harleyjia123@g.ucla.edu`

### LinkedIn
Use the user's LinkedIn profile URL currently associated with the site/CV.

---

## 18. Final Product Sentence

This website should feel like a **designed personal command center** for Junhao Jia: visually beautiful, fast to scan, grounded in real work, and memorable enough that a recruiter or admissions reader can understand both the person and the direction within a minute.

