# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🧑‍💼 Employee Management System

A responsive Employee Management System built using React and Material UI.  
This project allows users to manage employee records with search, highlight, edit, delete, and dark mode functionality.

---

## 🚀 Features

- Add Employee
- Edit Employee
- Delete Employee
- Search by ID, Name, Email, Mobile, Country
- Highlight matching search text
- Dark Mode support
- Responsive UI
- Safe rendering (no page crash on invalid input)

---

## 🛠️ Tech Stack

- React (Functional Components)
- React Hooks (useState)
- Material UI (MUI)
- JavaScript (ES6)
- CSS

---

## 📂 Folder Structure

src/
 ├── app/
 │    └── store.js
 │
 ├── api/
 │    └── axiosInstance.js
 │
 ├── features/
 │    ├── employees/
 │    │    ├── employeeSlice.js
 │    │    ├── 
 │    │
 │    └── countries/
 │         ├── countrySlice.js
 │
 ├── components/
 │    ├── smart/
 │    │    ├── EmployeeContainer.jsx
 │    │    ├── EmployeeFormContainer.jsx
 │    │
 │    ├── dumb/
 │    │    ├── EmployeeTable.jsx
 │    │    ├── EmployeeForm.jsx
 │
 ├──
 │
 ├── 
 │
 ├── App.jsx
 ├── main.jsx

---

## 🔍 Search Highlight Logic

- Converts values safely to string
- Escapes special regex characters
- Prevents runtime crashes
- Highlights matching text dynamically

---

## 📦 Installation Steps

1. Clone the repository:

   git clone <your-repository-url>

2. Go inside the project folder:

   cd client

3. Install dependencies:

   npm install

4. Run the project:

   npm run dev

---

## 🎯 Future Improvements

- Backend Integration (Node + Express + MongoDB)
- Pagination
- Sorting
- Authentication (Login / Register)
- Deployment (Vercel / Netlify)

---

## 👩‍💻 Author

Vaishali  
MERN Stack Developer  
BE Graduate