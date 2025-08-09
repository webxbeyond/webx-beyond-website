<div align="center">
  <img src="public/logo.png" alt="WebX Beyond" width="96" />
  <h1>WebX Beyond</h1>
  <p><strong>Bangla Open Tech Learning Platform</strong><br/>DevOps · Cloud · Networking · AI · Web · Cheatsheets</p>
  <p>
    <a href="https://webxbeyond.com">Site</a> ·
    <a href="https://github.com/webxbeyond/webx-beyond-website/issues">Issues</a>
  </p>
</div>

---

## ✨ Overview
WebX Beyond is an open & free Bangla resource hub for modern tech learning. The platform focuses on practical, structured content across foundational web skills, DevOps, cloud, automation, AI workflows, networking basics and concise cheatsheets.

## 🚀 Tech Stack
- Next.js 15 (App Router)
- React 19
- Fumadocs (content & docs system)
- MDX based content collections
- Tailwind CSS v4
- PWA (next-pwa)
- Iconify, Framer Motion

## 📦 Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server (after build)

```

## 🗂 Content Structure
```
content/
  learn/
    <topic>/
      index.mdx
      meta.json
      props.ts
```
Each topic can include: syllabus / cheatsheets / deep guides. Dynamic routing handled via Fumadocs page tree.

## 🛠 Local Setup
```bash
git clone https://github.com/webxbeyond/webx-beyond-website.git
cd webx-beyond-website
npm install
npm run dev
```
Open http://localhost:3000

## 🤝 Contributing
We welcome improvements: typo fixes, new topic proposals, bug fixes, performance tweaks.

1. Fork & branch: `feat/<short-description>`
2. Make changes with minimal scope
3. Run build locally: `npm run build`
4. Open a PR with clear description (Bangla or English)

### Content Contributions
- Keep tone instructional & concise
- Prefer progressive layering (basic → intermediate → advanced)
- Add Bengali terminology with English equivalents when helpful

## 🔐 License
MIT © 2025 WebX Beyond. See [LICENSE](./LICENSE).

## 📣 Acknowledgements
- Next.js team
- Fumadocs project
- Open source ecosystem & Bangla tech community

---
If this project helps you, give it a star ⭐ and share it with learners.
