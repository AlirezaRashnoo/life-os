# 🏠 LifeOS

> Your personal space for everyday tools powered by AI.

🌐 Live Demo: https://mylife-os-nine.vercel.app/

LifeOS is an open-source personal productivity dashboard designed to bring essential daily tools into one simple and organized workspace.

Instead of switching between multiple applications for tasks, notes, calendar, habits, bookmarks, and productivity tracking, HomeOS provides a single place to manage everyday information.

With AI integration, HomeOS helps users understand their productivity, receive personalized insights, and make better decisions about their daily workflow.

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

Organize daily tasks with:

- Task creation
- Priority levels
- Completion tracking
- Productivity overview

---

## 🔗 Bookmarks

Save your favorite links and quickly access frequently used websites from your dashboard.

---

## 🔥 Habit Tracker

Track your habits and monitor consistency over time.

Features include:

- Habit creation
- Daily completion tracking
- Progress monitoring

---

## 🤖 AI Assistant

AI is a core part of HomeOS, designed to act as a personal productivity assistant.

The AI assistant understands the user's productivity context, including:

- Tasks
- Habits
- Events
- Notes

and can provide personalized answers and recommendations.

Examples:

```
What should I focus on this week?

Which tasks need my attention?

How can I improve my productivity?
```

---

## 📊 AI Weekly Review

HomeOS can generate an intelligent weekly review based on real user activity.

The AI analyzes:

- Completed tasks
- Pending tasks
- Habits
- Events
- Notes

and provides:

- Weekly summary
- Achievements
- Areas needing attention
- Productivity insights
- Recommendations for the next week

---

## 🔐 Authentication

HomeOS includes a complete authentication system, allowing each user to have their own private workspace and personal data.

---

# 📸 Screenshots

## Dashboard

![Dashboard](./screenshots/dashboard-dark.png)

## Dashboard

![Dashboard](./screenshots/dashboard-light.png)

## Sign In

![Sign In](./screenshots/signin.png)

## Habit Tracker

![Habit Tracker](./screenshots/habit.png)

## AI Chat

![AI Chat](./screenshots/ai-chat.png)

---

# 🎯 Why LifeOS?

People often use multiple applications every day:

- Calendar applications
- Todo managers
- Notes apps
- Weather websites
- Bookmark managers
- Productivity tools

LifeOS combines these essential tools into one organized dashboard.

The goal is to create a simple digital workspace where users can manage their daily life and use AI to make smarter productivity decisions.

Simple. Fast. Intelligent.

---

# 🧩 Architecture

LifeOS is built as a modular dashboard application where each feature is separated into its own module.

The project follows a layered architecture:

```
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

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Node.js 20+
- npm or pnpm
- PostgreSQL database

## Installation

Clone the repository:

```bash
git clone https://github.com/AlirezaRashnoo/life-os.git
```

Go to the project directory:

```bash
cd homeos
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🛠 Tech Stack

Built with:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- OpenRouter AI API
- Zod

---

# 🗺 Roadmap

## Completed

- [x] Weather dashboard
- [x] Calendar
- [x] Notes management
- [x] Todo management
- [x] Bookmark management
- [x] Habit tracking
- [x] User authentication
- [x] AI Chat assistant
- [x] AI Weekly Review

## Future

- [ ] AI daily planning
- [ ] Long-term AI memory
- [ ] Smart task prioritization
- [ ] Voice assistant
- [ ] Advanced productivity analytics
- [ ] More AI-powered automation

---

# 🤝 Contributing

Contributions are welcome!

You can help by:

- Reporting bugs
- Suggesting improvements
- Improving documentation
- Adding new features

Feel free to open an issue or submit a pull request.

---

# 📜 License

LifeOS is open-source software licensed under the MIT License.

---

# 👨‍💻 Developer

Built with ❤️ by **Alireza Rashnoo**

LifeOS is an attempt to create a simpler and smarter digital workspace where productivity tools and AI work together.
