📘 README — AMV-login
# AMV-login

AMV-login is a simple authentication frontend built with Vue 3 and Vite. It provides login and logout functionality and serves as a starter scaffold for client-side authentication in modern web apps.

## Features

- Vue 3 with Composition API  
- TypeScript support  
- Login / Logout UI  
- Fast development setup via Vite

## Requirements

- Node.js 18+
- npm or yarn
- Modern browser for testing

## Configure password demands
-   Go to src/components/overlays/password-demands/password-rules.ts
-   Change settings in passwordConfig

## Configure translations
-   Add or adjust property in interface: src/modules/i18n/types.ts
-   Add or adjust translations in: src/modules/i18n/translations.ts 

## Add help-topics
-   Add or adjust help topics in: src/modules/i18n/help-topics-config.ts
-   Add or adjust translations in src/modules/i18n/help-translations.ts

## Switch between MSW (mock) and backend
-   Control target and point to backend port in: vite.config.ts
-   Change VITE_USE_MSW (false = backend, true = MSW) in: .env
-   Restart Vite
-   Start backend (if backend)
-   Verify - press F12 in browser while running server. If mock: "MSW Mocking enabled"

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/antonlidstroem/AMV-login.git
cd AMV-login
npm install
Development

Start the development server:

npm run dev

Visit http://localhost:3000 in your browser to view the app.

Build

To build for production:

npm run build
Project Structure
├── public/         
├── src/
│   ├── assets/     
│   ├── components/ 
│   ├── views/      
│   ├── App.vue     
│   └── main.ts     
├── index.html      
├── package.json    
└── vite.config.ts  




License

MIT


---

## 📘 README — **DevInsights**
