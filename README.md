# 🏠 LifeOS

> Your personal space for everyday tools powered by AI.

🌐 **Live Demo:** https://mylife-os-nine.vercel.app/

📦 **Repository:** https://github.com/AlirezaRashnoo/life-os

LifeOS is an open-source personal productivity dashboard designed to bring essential daily tools into one simple and organized workspace.

Instead of switching between multiple applications for tasks, notes, calendar, habits, bookmarks, and productivity tracking, LifeOS provides a single place to manage everyday information.

With AI integration, LifeOS helps users understand their productivity, receive personalized insights, and make better decisions about their daily workflow.

---

# ✨ Features

## 🌤 Weather

View current weather information directly from your dashboard.

---

## 📅 Calendar

Manage your schedule, events, and important dates in one place.

---

## 📝 Notes

Create and manage personal notes, ideas, reminders, and important information.

---

## ✅ Todo Management

Organize your daily tasks with:

* Task creation
* Priority levels
* Completion tracking
* Productivity overview

---

## 🔗 Bookmarks

Save your favorite links and quickly access frequently used websites directly from your dashboard.

---

## 🔥 Habit Tracker

Track your habits and monitor your consistency over time.

Features include:

* Habit creation
* Daily completion tracking
* Progress monitoring

---

## 🤖 AI Assistant

AI is a core part of LifeOS and is designed to act as a personal productivity assistant.

The AI assistant can understand the user's productivity context, including:

* Tasks
* Habits
* Events
* Notes

It can then provide personalized answers, suggestions, and recommendations based on the user's current context.

For example:

```text
What should I focus on this week?

Which tasks need my attention?

How can I improve my productivity?
```

---

## 📊 AI Weekly Review

LifeOS can generate an intelligent weekly review based on the user's real activity.

The AI analyzes:

* Completed tasks
* Pending tasks
* Habits
* Events
* Notes

and provides:

* Weekly summary
* Achievements
* Areas needing attention
* Productivity insights
* Recommendations for the next week

---

## 🔐 Authentication

LifeOS includes a complete authentication system, allowing each user to have their own private workspace and personal data.

Users can create an account, sign in, and manage their personal productivity data securely.

---

# 📸 Screenshots

## Dashboard — Dark Mode

![LifeOS Dashboard Dark Mode](./screenshots/dashboard-dark.png)

## Dashboard — Light Mode

![LifeOS Dashboard Light Mode](./screenshots/dashboard-light.png)

## Sign In

![LifeOS Sign In](./screenshots/signin.png)

## Habit Tracker

![LifeOS Habit Tracker](./screenshots/habit.png)

## AI Chat

![LifeOS AI Chat](./screenshots/ai-chat.png)

---

# 🎯 Why LifeOS?

People often use multiple applications every day:

* Calendar applications
* Todo managers
* Notes apps
* Weather websites
* Bookmark managers
* Productivity tools

LifeOS brings these essential tools together into one organized dashboard.

The goal is to create a simple digital workspace where users can manage their daily life, keep their information organized, and use AI to make smarter productivity decisions.

**Simple. Fast. Intelligent.**

---

# 🧩 Architecture

LifeOS is built as a modular dashboard application where each feature is separated into its own module.

The project follows a layered architecture:

```text
UI
 ↓
Components
 ↓
API Routes
 ↓
Services
 ↓
Context Builders
 ↓
AI Layer
 ↓
Database
```

AI functionality is separated into dedicated services, context collectors, and prompt builders to keep the system maintainable and scalable.

This structure also makes it easier to add new productivity features and AI capabilities in the future.

---

# 🚀 Getting Started

## Prerequisites

Before running LifeOS, make sure you have:

* Node.js 20+
* npm or pnpm
* PostgreSQL database
* OpenRouter API key

---

## Installation

Clone the repository:

```bash
git clone https://github.com/AlirezaRashnoo/life-os.git
```

Go to the project directory:

```bash
cd life-os
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

LifeOS requires a few environment variables for the database, authentication, and AI features.

Create a `.env` file in the root of the project:

```env
OPENROUTER_API_KEY=""
DATABASE_URL=""
AUTH_SECRET=""
```

### `DATABASE_URL`

The connection string for your PostgreSQL database.

Example:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

You can use a local PostgreSQL database or a hosted PostgreSQL provider such as Supabase or Neon.

### `AUTH_SECRET`

A secret key used by Auth.js for authentication and session security.

You can generate a secure secret with:

```bash
openssl rand -base64 32
```

Then add the generated value to your `.env` file:

```env
AUTH_SECRET="your_generated_secret"
```

### `OPENROUTER_API_KEY`

The API key used by LifeOS to access AI models through OpenRouter.

This is required for AI features such as:

* AI Assistant
* AI Chat
* AI Weekly Review

You can get an API key from:

https://openrouter.ai/

Then add it to your `.env` file:

```env
OPENROUTER_API_KEY="your_openrouter_api_key"
```

> **Important:** Never commit your `.env` file to GitHub or share your API keys, database credentials, or authentication secrets publicly.

---

## 🗄️ Database Setup

After configuring your environment variables, run the Prisma migrations:

```bash
npx prisma migrate dev
```

---

## ▶️ Run the Development Server

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 🛠 Tech Stack

LifeOS is built with:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Prisma ORM**
* **PostgreSQL**
* **OpenRouter AI API**
* **Zod**

---

# 🗺 Roadmap

## Completed

* [x] Weather dashboard
* [x] Calendar
* [x] Notes management
* [x] Todo management
* [x] Bookmark management
* [x] Habit tracking
* [x] User authentication
* [x] AI Chat assistant
* [x] AI Weekly Review

## Future

* [ ] AI daily planning
* [ ] Long-term AI memory
* [ ] Smart task prioritization
* [ ] Voice assistant
* [ ] Advanced productivity analytics
* [ ] More AI-powered automation

---

# 🤝 Contributing

Contributions are welcome!

You can help improve LifeOS by:

* Reporting bugs
* Suggesting improvements
* Improving documentation
* Adding new features
* Improving existing features

Feel free to open an issue or submit a pull request.

---

# 📜 License

LifeOS is open-source software licensed under the MIT License.

---

# 👨‍💻 Developer

Built with ❤️ by **Alireza Rashnoo**

LifeOS is an attempt to create a simpler and smarter digital workspace where productivity tools and AI work together.
