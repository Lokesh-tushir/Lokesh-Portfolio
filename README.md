# Lokesh Tushir — Personal Portfolio

[![Website](https://img.shields.io/badge/website-portfolio-blue)](HTML/index.html) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Professional, modern, and responsive portfolio showcasing Lokesh's skills, projects, and resume. Built with semantic HTML, responsive CSS, and lightweight JavaScript for animations and interactivity. Designed for easy deployment to GitHub Pages.

---

## Overview

This repository contains a complete personal portfolio website that includes:

- A striking hero and skills section
- Projects page linking to real GitHub repositories
- FAQ and Help pages with a working contact form (EmailJS optional + mailto fallback)
- A printable `resume.html` and a downloadable resume button
- Futuristic visual design with gradients, glassmorphism, and subtle animations

The site is intentionally framework-free so it's simple to host on GitHub Pages or any static hosting service.

---

## Live Demo

Open `HTML/index.html` locally or publish the `HTML/` folder to GitHub Pages to view the live site.

---

## Features

- Clean, modern visual design with gradient accents and glow effects
- Responsive layout (desktop → mobile)
- Smooth reveal animations (Intersection Observer) and micro-interactions
- Contact form with EmailJS integration (optional) and mail client fallback
- Project cards with direct links to GitHub repositories
- Printable resume page for quick PDF export
- Accessible HTML structure and clear content hierarchy

---

## Tech Stack

- HTML5
- CSS3 (flexbox, grid, animations)
- JavaScript (ES6+)
- Optional integration: EmailJS (for client-side email sending)

---

## Repository Structure

```
HTML/
  index.html        # Home (default landing page)
  Projects.html     # Projects listing with GitHub links
  FAQ.html
  Help.html         # Contact form, social links
  resume.html       # Print-friendly resume (print to PDF)
CSS/
  style.css         # Main stylesheet (animations, responsive rules)
JS/
  script.js         # Animations, contact form handling, small helpers
favicon.svg         # Modern SVG favicon used across pages
README.md
```

---

## Quick Start — Preview Locally

1. Clone the repository:

```bash
git clone https://github.com/Lokesh-tushir/<repo-name>.git
cd <repo-name>/HTML
```

2. Open the site in your default browser (double-click `index.html`) or run this in PowerShell to open in Chrome:

```powershell
Start-Process chrome "index.html"
```

3. (Optional) Run a static server for testing:

```bash
# Using Python 3
python -m http.server 8000
# Visit: http://localhost:8000/HTML/index.html
```

---

## Configure Contact Form (EmailJS)

To enable sending emails directly from the web page (no server required):

1. Create a free account at https://www.emailjs.com/ and set up an email service.
2. Create an email template and take note of: `SERVICE_ID`, `TEMPLATE_ID`, and `USER_ID` (public key).
3. Open `JS/script.js` and set the constants `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_USER_ID` with those values.

The script will automatically load EmailJS when those IDs are present. If not configured, the form opens the user's mail client as a fallback.

---

## Deployment (GitHub Pages)

1. Create a new GitHub repository and push the repository content.
2. In repository **Settings → Pages**, set the source branch to `main` (or `master`) and the folder to `/HTML` (or root if you move files).
3. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` in a few minutes.

Tip: If you prefer the site at the repository root, move files from `HTML/` into the repo root before enabling Pages.

---

## Customization

- Replace `favicon.svg` with your preferred icon (SVG/PNG). The site references `favicon.svg` in each page head.
- Update `HTML/Help.html` or `JS/script.js` to set your recipient email for the mailto fallback and to set the Instagram URL placeholder.
- Tweak colors, fonts or animations inside `CSS/style.css`.

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes and push the branch
4. Open a Pull Request describing your changes

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

- GitHub: https://github.com/Lokesh-tushir
- LinkedIn: https://www.linkedin.com/in/lokesh-tushir/
- Email: lokeshtushir4344@gmail.com

---

Thank you for viewing this portfolio. If you'd like, I can also:

- Generate a PDF version of `resume.html` and add it to the repository
- Create a ready-to-run GitHub Pages deployment script/guide
- Continue enhancing page animations (I left that in the TODO list)


If you want any of these, tell me which and I will implement it next.
