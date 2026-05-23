<<<<<<< HEAD
# Portfolio---FullStackDevelopement
=======
# 🚀 Dineshprabhu A — Full-Stack Developer Portfolio

A modern, professional developer portfolio with **16 interactive sections**, **smart chatbot**, **PWA support**, and **admin dashboard**. Built with **React + Tailwind CSS** frontend and **Spring Boot** backend.

## Project Structure

```
├── portfolio/          # React Frontend (Vite + Tailwind CSS + Framer Motion)
│   ├── src/
│   │   ├── components/ # All UI sections (Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer)
│   │   ├── App.jsx     # Main app layout
│   │   └── index.css   # Tailwind CSS imports
│   └── ...
├── backend/            # Spring Boot Backend
│   ├── src/main/java/com/dineshprabhu/portfolio/
│   │   ├── controller/ # REST API controllers
│   │   ├── service/    # Business logic
│   │   ├── dto/        # Request/Response DTOs
│   │   └── config/     # CORS configuration
│   └── pom.xml
└── README.md
```

## Quick Start

### Frontend
```bash
cd portfolio
npm install framer-motion react-icons react-intersection-observer
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```
Frontend runs at: http://localhost:5173

### Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs at: http://localhost:8080

### Environment Variables (for email)
Set these before running the backend:
- `MAIL_USERNAME` — Your Gmail address
- `MAIL_PASSWORD` — Gmail App Password (not regular password)

## Features
- 🎨 **Modern UI/UX** with dark/light mode toggle
- 🤖 **AI Chatbot** with fuzzy matching for portfolio FAQs  
- 📱 **PWA Support** - installable on mobile devices
- 🔒 **Admin Dashboard** with secure login
- 📊 **GitHub Integration** for live repository stats
- 🎯 **SEO Optimized** with JSON-LD schema & meta tags
- ⚡ **Performance** - lazy loading, caching, animations
- 📧 **Contact Form** with reCAPTCHA protection
- 🏆 **16 Sections** - Hero, About, Skills, Education, Projects, GitHub Stats, Certifications, Achievements, Experience, Contact, and more

## Tech Stack
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, Framer Motion
- **Backend:** Java 17, Spring Boot 3.2, Spring Mail
- **Database:** H2 (development), PostgreSQL (production-ready)
- **Fonts:** Inter, JetBrains Mono

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- **Frontend:** Vercel (free)
- **Backend:** Render.com (free)

## License
© 2024 Dineshprabhu A. All rights reserved.
>>>>>>> 23d7ab4 (chore: initial commit)
