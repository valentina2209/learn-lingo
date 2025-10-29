# Learn Lingo - Online Language Tutors Platform 🌍

## Project Overview

**Learn Lingo** is a full-featured web application for a company that offers online language tutoring services. The application allows users to browse, filter, and save tutors to a favorites list, as well as book trial lessons after authentication.

### Key Features:

- **Authentication:** User registration, login, and logout via **Firebase Authentication**.
- **Tutor Catalog:** A complete list of tutors with filtering and "Load more" functionality.
- **Favorites:** A private, persistent list of saved tutors for authenticated users.
- **Booking:** A modal form for booking a trial lesson.

---

## 🚀 Tech Stack

The project is built using modern web technologies:

| Category         | Technology                                                 | Purpose  
| :--------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Frontend**     | **React**                                                  | Primary library for building the UI.                                          |
| **Build Tool**   | **Vite**                                                   | Fast development and bundling.                                                |
| **Routing**      | **React Router DOM**                                       | Client-side navigation between pages.                                         |
| **Localization** | **i18next / react-i18next**                                | Framework for managing translations and language switching.                   |
| **Backend / DB** | **Firebase**                                               | Cloud platform for **Authentication** and **Realtime Database** (tutor data). |
| **Forms**        | **React Hook Form**                                        | Efficient management of form state.                                           |
| **Validation**   | **Yup**                                                    | Schema-based validation for forms.                                            |
| **Styling**      | (Specify, e.g., **Styled Components** or **Tailwind CSS**) | Custom styling based on the provided unique prototype/palette.                |

---

## 🗺️ Application Structure and Pages

The application has three main routes:

| Route        | Component   | Access      | Description                                                                       |
| :----------- | :---------- | :---------- | :-------------------------------------------------------------------------------- |
| `/`          | `Home`      | Public      | Presents company benefits and includes a Call-to-Action (CTA) to the Tutors page. |
| `/teachers`  | `Teachers`  | Public      | The main catalog featuring filtering by **language**, **level**, and **price**.   |
| `/favorites` | `Favorites` | **Private** | A dedicated page showing only the tutors saved by the logged-in user.             |

---

## ✨ Core Functionality

### Authentication and Data Handling

- Forms for **Login** and **Registration** are in modals and validated by **`react-hook-form`** & **`yup`** (all fields mandatory).
- Modals close correctly upon **X button click**, **backdrop click**, or **`Esc`** key press.
- Tutor data is sourced from a collection in the **Firebase Realtime Database**.

### Tutor Listing

- The `Teachers` page initially displays **4 cards**. Subsequent cards are loaded via a **`Load more`** button, triggering an additional database query.
- The tutor card includes **`Read more`** functionality to expand and show detailed information and student **reviews**.
- The **`Book trial lesson`** button opens a validated booking form.

### Favorites Management

- The **"Heart"** button's functionality depends on the user's status:
  - **Unauthenticated:** Triggers a notification/modal asking the user to log in.
  - **Authenticated:** Adds or removes the tutor from the user's favorites list.
- The **favorited state** (heart color) is **persistent** across page reloads (using `localStorage` or Firebase).

---

## ⚙️ Local Setup

To get a copy of the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [YOUR REPOSITORY URL]
    cd learn-lingo
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or:
    yarn install
    ```

3.  **Configure Environment Variables:**

    - Create a file named `.env` in the project root.
    - Add your Firebase configuration keys (obtained from your Firebase project console):
      ```env
      VITE_FIREBASE_API_KEY=Your_API_Key
      VITE_FIREBASE_AUTH_DOMAIN=Your_Auth_Domain
      VITE_FIREBASE_DATABASE_URL=Your_Realtime_Database_URL
      VITE_FIREBASE_PROJECT_ID=Your_Project_ID
      # ... other necessary keys
      ```

4.  **Start the development server:**
    ```bash
    npm run dev
    # or:
    yarn dev
    ```
    The application will be available at: `http://localhost:5173`.

---

## 🔗 Live Demo & Materials

- **Live Demo:** https://learn-lingo-lac.vercel.app/
- **Design/Mockup:** https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0
- **Tutor Data Source:** `teachers.json` (used to populate the Firebase Realtime Database).
- **Firebase Documentation:** Utilized the official documentation for REST API integration.
