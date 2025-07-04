Congkong Friends - Real-Time KPI Dashboard
This project is a full-stack web application developed for the Congkong Friends competency assessment. It features a real-time, responsive KPI dashboard built with Next.js and backed by a Supabase database.

Quick Links
Live Deployed Application: https://congkong-friends.vercel.app/

Demonstration Video: https://drive.google.com/file/d/1sm5rEEdoN383FsIp22_Cn0SGYqErJoP0/view?usp=drive_link

GitHub Repository: https://github.com/pritam16raha/congkong_friends.git

Supabase Account email: rahapritam32@gmail.com

Supabase Account Password: Pritam@551175

Organization name: rahapritam32@gmail.com's Org

Project name: CONGKONG_FRIENDS

![Dashboard Preview](https://raw.githubusercontent.com/pritam16raha/congkong_friends/main/dashboard.png)

![Database Schema](https://raw.githubusercontent.com/pritam16raha/congkong_friends/main/database.png)

Dashboard Preview
Features
Dynamic KPI Cards: Displays key metrics such as total participants, matches, and meetings fetched directly from the backend.

Live Activity Chart: Visualizes user activity over time with a multi-line chart rendered using Recharts.

Responsive Design: Fully responsive layout that adapts seamlessly from desktop to mobile devices, featuring a slide-out sidebar for smaller screens.

Backend API: A robust backend built with Next.js API Routes to handle data fetching and manipulation.

Database Integration: Utilizes Supabase for the PostgreSQL database, with a well-structured schema.

Schema-as-Code: Manages the database schema using Drizzle ORM, allowing for version control and type safety.

Data Seeding Panel: An in-app control panel to easily populate the database with test data for demonstration purposes.

Modern Component Architecture: Follows best practices by co-locating page-specific components and maintaining a library of reusable components.

Database Schema
The database schema was designed to support all the dynamic features of the dashboard.

Tech Stack
Framework: Next.js

Styling: Tailwind CSS

UI Components: React

Charting: Recharts

Database: Supabase (PostgreSQL)

ORM: Drizzle ORM

Getting Started Locally
To run this project on your local machine, follow these steps:

1. Prerequisites
Make sure you have Node.js (v18 or later) and npm installed on your system.

2. Clone the Repository
git clone https://github.com/pritam16raha/congkong_friends.git
cd congkong_friends

3. Install Dependencies
npm install

4. Set Up Environment Variables
Create a new file named .env.local in the root of the project by copying the example file.

cp .env.example .env.local

Open .env.local and fill in your Supabase database connection string. You can find this in your Supabase project's settings under Database > Connection string. Use the Direct connection string.

5. Push the Database Schema
Run the following command to migrate the schema defined in the code to your Supabase database.

npx drizzle-kit push:pg

6. Run the Development Server
Start the Next.js development server.

npm run dev

The application should now be running at http://localhost:3000. You can navigate to the /dashboard route to see the main application.