Learn Lingo - Online Language Tutors Platform 🌍
Project Overview
Learn Lingo is a full-featured web application for a company that offers online language tutoring services. The application allows users to browse, filter, and save tutors to a favorites list, as well as book trial lessons after authentication.

Key Features:
Authentication: User registration, login, and logout implemented with Firebase Authentication.

Tutor Catalog: A complete list of tutors with essential information.

Filtering: Ability to filter tutors by teaching language, student proficiency level, and price per hour.

Favorites: A private list of tutors saved by the authenticated user.

Details: "Read more" functionality to view detailed tutor information and student reviews.

Booking: A modal form for booking a trial lesson.

🚀 Tech Stack
The project is built using modern web technologies:

Category	Technology	Purpose
Frontend	React	Primary library for building the user interface.
Build Tool	Vite	Fast development and bundling tool.
Routing	React Router DOM	Managing navigation between application pages.
Styling	(Specify, e.g., Styled Components, SCSS, or Tailwind CSS)	Styling components according to the unique prototype/palette.
Backend / DB	Firebase	Cloud platform for the backend, including:
Authentication	User management (registration/login/logout).
Realtime Database	Storing tutor data and managing user favorites.
Forms	React Hook Form	Efficient management of form state.
Validation	Yup	Schema-based validation for form data.

🗺️ Application Structure
The application has three main pages, managed by client-side routing:

Route	Component	Access	Description
/	Home	Public	Presents company benefits and includes a CTA redirecting to the Tutors page.
/teachers	Teachers	Public	List of all tutors with filtering and a "Load more" feature.
/favorites	Favorites	Private	A list of tutors saved by the authenticated user. Accessible only after login.

✨ Core Features Detailed
1. Authentication and Firebase Integration
Authentication is handled via Firebase Authentication.

Registration and Login forms are displayed within a modal window.

Forms are validated using react-hook-form and yup (all fields are mandatory).

Modals close correctly upon clicking the close button (X), the backdrop, or pressing the Esc key.

Tutor data is stored in the Realtime Database (in the teachers collection).

2. Tutor and Favorites Management
The Teachers page initially renders 4 tutor cards.

The Load more button dynamically fetches the next batch of cards from the database.

Favorites (Heart) 🤍 / ❤️:

Unauthenticated user: receives a modal or push notification about the necessity of logging in.

Authenticated user: the card is added to/removed from favorites (state is persisted using localStorage or a dedicated users collection in Firebase).

The "favorited" state is maintained upon page refresh.

3. Details and Booking
The Read more button expands the card to show detailed information about the tutor and student reviews.

The Book trial lesson button opens a modal form for booking a trial session.

The booking form is also implemented with react-hook-form and yup (all fields are mandatory).

The modal has standard closing conditions.

⚙️ Local Setup
To run the project locally, follow these steps:

Clone the repository:

Bash

git clone [YOUR REPOSITORY URL]
cd learn-lingo
Install dependencies:

Bash

npm install
# or:
yarn install
Configure Firebase:

Create a file named .env in the project root.

Add your Firebase configuration keys:

VITE_FIREBASE_API_KEY=Your_API_Key
VITE_FIREBASE_AUTH_DOMAIN=Your_Auth_Domain
VITE_FIREBASE_DATABASE_URL=Your_Realtime_Database_URL
VITE_FIREBASE_PROJECT_ID=Your_Project_ID
...
Start the project:

Bash

npm run dev
# or:
yarn dev
The project will be available at: http://localhost:5173 (or the port specified by Vite).

🔗 Live Demo
[Insert link to the deployed project, e.g., on Netlify or GitHub Pages]

🎨 Design and Mockup
Mockup Source: [Insert link to https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0]
Styling: Implemented using [SPECIFY, e.g.: a unique color palette variation of the mockup / a custom prototype], ensuring a distinct visual style for the application.
