Notely - Modern Notes App

A responsive, feature-rich notes management application built with React and Tailwind CSS. This project allows users to create, edit, delete, and categorize notes with local storage persistence and duplicate title detection.

🚀 Live Demo

(Insert your deployed link here, e.g., https://www.google.com/search?q=https://my-notes-app.vercel.app)

🛠️ Tech Stack

Frontend: React.js

Styling: Tailwind CSS

Icons: Lucide React

State Management: React Hooks (useState, useEffect)

Persistence: Browser localStorage

✨ Features

Responsive Design: Fully functional on Desktop and Mobile.

Categorization: Filter notes by Work, Personal, Ideas, etc.

CRUD Operations: Create, Read, Update, and Delete notes.

Conflict Handling: Visual "Duplicate Title" badge for notes with identical titles in the same category.

Persistence: Data is saved to LocalStorage and persists across reloads.

View Modes: Toggle between Grid and List views.

📂 Folder Structure

src/
├── App.jsx        # Main application logic and components
├── main.jsx       # Entry point
└── index.css      # Tailwind directives
public/
└── notes.json     # Initial static data (simulated in App.jsx for this MVP)


⚙️ Setup & Installation

Clone the repository:

git clone [https://github.com/yourusername/notes-app-mvp.git](https://github.com/yourusername/notes-app-mvp.git)
cd notes-app-mvp


Install dependencies:

npm install


Run the development server:

npm run dev


🚀 Deployment

Option 1: Vercel (Recommended)

Push your code to GitHub.

Go to Vercel Dashboard.

Click "Add New..." -> "Project".

Import your GitHub repository.

Click Deploy.

Option 2: GitHub Pages

Install gh-pages: npm install gh-pages --save-dev

Add homepage to package.json: "homepage": "https://username.github.io/repo-name"

Add deploy scripts to package.json:

"predeploy": "npm run build",
"deploy": "gh-pages -d dist"


Run npm run deploy.

📝 Assignment Details

This project was built to satisfy the "Notes App MVP" assignment requirements:

[x] Sidebar with categories.

[x] Responsive Grid/List layout.

[x] Modal for creating/editing notes.

[x] LocalStorage persistence.

[x] Duplicate title handling.
