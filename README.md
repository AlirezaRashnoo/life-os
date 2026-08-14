# HomeOS

> Your personal space for everyday tools.

🌐 Live Demo: https://homeos-neon.vercel.app/

HomeOS is an open-source personal dashboard designed to bring essential daily tools into one simple and organized workspace.

## Instead of switching between multiple applications for tasks, notes, calendar, weather, and saved links, HomeOS provides a single place to manage everyday information.

## ✨ Features

### 🌤 Weather

View current weather information directly from your dashboard.

### 📅 Calendar

Keep track of important dates and manage your schedule.

### 📝 Notes

Create and manage personal notes, ideas, and reminders.

### ✅ Todo

Organize your daily tasks and keep track of what needs to be done.

### 🔗 Bookmarks

Save your favorite links and access frequently used websites quickly from your dashboard.

### 🔐 Authentication

HomeOS includes a complete authentication system, allowing each user to have their own private workspace and personal data.

---

## 🎯 Why HomeOS?

People often use multiple applications every day:

- Calendar
- Todo apps
- Notes
- Weather websites
- Bookmark managers

HomeOS combines these essential tools into one simple dashboard.

Simple. Fast. Organized.

---

## 🧩 Architecture

HomeOS is built as a modular dashboard application where each feature is separated into its own module.

This approach keeps the project maintainable and makes adding new features easier in the future.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Node.js 20+
- npm or pnpm
- PostgreSQL database

### Installation

Clone the repository:

```bash
git clone https://github.com/AlirezaRashnoo/home-os.git
```

Go to the project directory:

```bash
cd homeos
```

Install dependencies:

```bash
npm install
```

Create your environment variables:

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

Open your browser:

```
http://localhost:3000
```

---

## 🛠 Tech Stack

Built with:

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

---

## 🗺 Roadmap

### Completed

- [x] Weather dashboard
- [x] Calendar
- [x] Notes
- [x] Todo management
- [x] Bookmark management
- [x] User authentication

---

## 🤝 Contributing

Contributions are welcome!

You can help by:

- Reporting bugs
- Suggesting improvements
- Improving documentation

Feel free to open an issue or submit a pull request.

---

## 📜 License

HomeOS is open-source software licensed under the MIT License.

---

Made with ❤️ for people who want a simpler digital workspace.
