# **Notely - Modern Notes Management App** 

Notely is a high-fidelity, responsive notes application inspired by Evernote and Apple Notes. Built as an MVP assignment, it features a premium "Midnight Glass" aesthetic, local data persistence, and smart conflict detection.

🔗 **Live Demo**: [INSERT_YOUR_VERCEL_LINK_HERE]

---

## ✨ **Key Features**

A breakdown of the core functionality and technical highlights of the application.

---

### **1. Core Functionality**

- **Create & Edit**: Modal-based interface for distraction-free writing.  
- **Organization**: Categorize notes into Work, Personal, or Ideas.  
- **Smart Filtering**: Filter notes by category via the sidebar or search by keyword.  
- **Responsive Design**: Fully adaptive layout (Grid view on Desktop, collapsible Sidebar on Mobile).  
- **Persistence**: Data is saved to `localStorage`, ensuring notes survive browser refreshes.

---

### **2. UI/UX Highlights**

- **Midnight Glass Theme**: A modern dark mode featuring glassmorphism (backdrop blur), subtle gradients, and a dot-grid background.  
- **Micro-interactions**: Smooth animations using **Framer Motion** for modal appearance and list reordering.  
- **Duplicate Detection**: Automatically detects if a note with the same title exists in a category and displays a visual "DUPLICATE" badge.

---

## 🛠️ **Tech Stack**

The technologies and libraries used to build this project.

| **Technology**         | **Purpose**                             |
|------------------------|-----------------------------------------|
| **React.js (Vite)**    | Frontend Framework & Build Tool        |
| **Tailwind CSS**       | Utility-first Styling & Responsive Design |
| **Lucide React**       | Modern, lightweight Icons              |
| **Framer Motion**      | Smooth Animations & Transitions        |
| **date-fns**           | Date Formatting                        |
| **Inter Font**         | Typography (Google Fonts)              |

---

## ⚙️ **Installation & Setup Guide**

Follow these commands to run the project on your local machine.

---

1. **Clone the repository**  
```bash
git clone [https://github.com/YOUR_USERNAME/notely-notes-app.git](https://github.com/YOUR_USERNAME/notely-notes-app.git)
cd notely-notes-app
