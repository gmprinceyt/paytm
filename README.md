# 💳 Paytm Clone – Turborepo Monorepo

A **Paytm-like digital wallet & payment system** built using **Turborepo** with modern web technologies.
This project follows **monorepo best practices**, scalable architecture, and clean CI workflows.

---

## 🚀 Features

* 🔐 User authentication (NextAuth)
* 💰 Wallet system (balance, transactions)
* 🔁 P2P money transfer
* 📜 Transaction history
* 🧑‍💼 Admin & user separation
* 🏗️ Monorepo architecture using Turborepo
* 🧪 Linting, formatting & type checking via CI
* ⚡ Optimized builds with caching

---

## 🏗️ Monorepo Structure

```
paytm/
├── apps/
│   ├── user-app/               # Next.js user application
│   ├── bank_webhook_handler/   # Webhook / backend service
│
├── packages/
│   ├── db/                     # Prisma database package
│   ├── ui/                     # Shared UI components
│   ├── store/                  # Shared state / utilities
│   ├── eslint-config/          # Shared ESLint config
│   ├── typescript-config/      # Shared TS config
│
├── turbo.json
├── package.json
├── README.md
```

---

## 🧑‍💻 Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Node.js, Prisma
* **Database:** PostgreSQL
* **Auth:** NextAuth
* **Monorepo Tooling:** Turborepo
* **Language:** TypeScript
* **CI/CD:** GitHub Actions
* **Linting & Formatting:** ESLint, Prettier

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/paytm-turborepo.git
cd paytm-turborepo
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## ▶️ Running the Project

### Run all apps in development

```bash
npm run dev
```

### Run a specific app

```bash
cd apps/user-app
npm run dev
```

---

## 🧪 Quality Checks

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Type Check

```bash
npm run check-types
```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/paytm
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ Never commit `.env` files

---

## 🔄 CI Workflow

This project uses **GitHub Actions** to automatically run:

* ✅ Linting
* ✅ Formatting check
* ✅ Type checking

On every **Pull Request**

---

## 📈 Future Improvements

* UPI simulation
* Wallet recharge via payment gateway
* Role-based access control
* Notifications system
* Mobile-first UI
* Unit & integration tests

---

## 🙌 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Prince**
Aspiring Full-Stack Developer 🚀
Building real-world products with modern tech.

