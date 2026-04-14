# 💰 Expense Tracker — Full-Stack Personal Finance App

A full-stack personal finance tracker built with **Next.js 16**, **Prisma ORM**, and **PostgreSQL**. Track income, expenses, and debts — with full traceability of how borrowed money gets spent — plus monthly/yearly summaries with PDF export.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Balance Logic](#balance-logic)
- [Features](#features)
  - [1. Income Management](#1-income-management)
  - [2. Expense Management](#2-expense-management)
  - [3. Debt Management](#3-debt-management)
  - [4. Dashboard](#4-dashboard)
  - [5. Monthly Overview](#5-monthly-overview)
  - [6. Yearly Summary & Filters](#6-yearly-summary--filters)
  - [7. Filtering & Search](#7-filtering--search)
  - [8. Auth & User Settings](#8-auth--user-settings)
  - [9. Notifications (Optional)](#9-notifications-optional)
- [Pages / Screens](#pages--screens)
- [Tech Stack](#tech-stack)
- [Package Setup](#package-setup)
- [Database Schema](#database-schema)
- [Key Queries](#key-queries)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

A personal finance web app where you can:

- Input monthly income and expenses
- Track debts — who lent you money, when, and exactly what you spent it on
- See two live balance numbers that tell the full story of your finances
- Get a monthly overview at the end of each month
- Get a yearly summary after 12 months with filters by income, spending, debt, and savings

---

## Balance Logic

This app shows **two separate balance numbers** to give an accurate picture.

### Available balance
> Money you actually have right now, treating borrowed money as usable funds.

```
Available Balance = Total Income + Total Borrowed (unpaid debts) − Total Expenses
```

This answers: *"How much can I spend today?"*

### True balance
> Your real net worth — what you'd have if all debts were repaid today.

```
True Balance = Total Income − Total Expenses − Total Outstanding Debt
```

This answers: *"How much is actually mine?"*

### Why two numbers?

If you borrow ৳10,000 and spend it all on expenses:

| Formula | Result | Meaning |
|---|---|---|
| Income − Expenses only | Deeply negative | Misleading — looks like you're broke |
| Available balance | ৳0 | Correct — you spent what you borrowed |
| True balance | −৳10,000 | Correct — you owe ৳10,000 back |

Both numbers are always shown on the dashboard so you always know the difference between what you have and what you owe.

---

## Features

### 1. Income Management

- Add, edit, and delete income entries
- Fields: `amount`, `category`, `date`, `note`
- Categories: Salary, Freelance, Business, Other (custom labels supported)
- Income total never includes debt amounts

### 2. Expense Management

- Add, edit, and delete expense entries
- Fields: `amount`, `category`, `date`, `note`, `debtId` (optional)
- Default categories: Food, Rent, Transport, Bills, Health, Education, Shopping, Entertainment, Other
- Custom category support
- An expense can optionally be tagged to a debt — marking it as funded by borrowed money
- One expense = one debt source *(split funding planned — see roadmap)*

### 3. Debt Management

> Tracks money borrowed FROM others. Separate from income, but connected to expenses for full traceability.

- Add a debt entry with full details:
  - `personName` — who lent you the money
  - `amount` — total borrowed
  - `paidAmount` — how much you've already repaid
  - `description` — reason for borrowing
  - `borrowedDate` — when you borrowed it
  - `dueDate` — optional repayment deadline
  - `status` — `UNPAID` / `PARTIAL` / `PAID`
- Tag any expense with a `debtId` to record that it was funded by a specific debt
- Debt detail page shows:
  - Total borrowed
  - Total spent from this debt (sum of linked expenses)
  - Unspent borrowed amount (`borrowed − spent`)
  - Still owed to person (`borrowed − paidAmount`)
- Status auto-logic:
  - `UNPAID` → `paidAmount = 0`
  - `PARTIAL` → `0 < paidAmount < amount`
  - `PAID` → `paidAmount = amount`
- Filter debt list by person name, status, or date range
- Debt amounts feed into **Available Balance** but are excluded from income totals

### 4. Dashboard

- **Available balance** — income + borrowed − expenses *(what you can spend)*
- **True balance** — income − expenses − outstanding debt *(what is actually yours)*
- Summary cards: monthly income, monthly expenses, available balance, true balance, total outstanding debt
- Charts:
  - Pie chart — expenses by category (debt-funded expenses visually distinguished)
  - Bar chart — monthly income vs expenses comparison
- Recent transactions list (latest 5–10 entries across income, expense, debt)
- Debt alert section — highlights unpaid and overdue debts

### 5. Monthly Overview

- Auto-generated summary for any selected month:
  - Total income
  - Total expenses (breakdown: own money vs debt-funded)
  - Savings
  - Debt activity — borrowed and repaid this month
- Highest expense category highlight
- Daily / weekly breakdown table
- Export as PDF via `@react-pdf/renderer`

### 6. Yearly Summary & Filters

- 12-month comparison chart (bar or line)
- Annual totals: income, expenses, savings, debt borrowed, debt repaid
- Highlights: highest spending month, best saving month
- **Filter tabs:** All · Income sources · Expenses by category · Debt (borrowed vs repaid) · Savings
- Year selector — switch between past years
- PDF export of yearly report

### 7. Filtering & Search

- Search transactions by keyword
- Filter by type: Income / Expense / Debt
- Filter by: category, date range, person name (for debts)
- Filter expenses by source: own funds vs debt-funded

### 8. Auth & User Settings

- Authentication via **NextAuth.js v4** (Email/password or Google OAuth)
- User profile settings: display name, currency (BDT / USD / EUR), preferred language
- Dark / light theme toggle

### 9. Notifications *(optional)*

- End-of-month summary reminder
- Debt due date reminder — alert when a debt's due date is approaching

---

## Pages / Screens

| Page | Description |
|---|---|
| `/dashboard` | Available + true balance, charts, debt alerts, recent transactions |
| `/transactions` | All entries with search and filter |
| `/income` | Income list + add/edit form |
| `/expenses` | Expense list + add/edit form (with optional debt tag) |
| `/debts` | Debt list + status overview |
| `/debts/[id]` | Single debt: borrowed, spent, unspent, still owed + linked expenses |
| `/monthly` | Monthly summary + PDF export |
| `/yearly` | Yearly chart + filter tabs + export |
| `/settings` | Currency, theme, profile |
| `/login` | NextAuth login/register pages |

---

## Tech Stack

| Role | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.3 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.5 |
| Styling | Tailwind CSS | 4.2.2 |
| ORM | Prisma | 7.7.0 |
| Database (production) | PostgreSQL (Supabase) | — |
| Database (development) | SQLite | — |
| Auth | NextAuth.js | 4.24.13 |
| Charts | Recharts | 3.8.1 |
| PDF Export | @react-pdf/renderer | 4.4.1 |
| Validation | Zod | 4.3.6 |
| State management | Zustand | 5.0.12 |
| Hosting | Vercel + Supabase | — |

---

## Package Setup

This is the complete `package.json` with all dependencies at their latest versions:

```json
{
  "name": "expense-tracker",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "next": "16.2.3",
    "react": "19.2.5",
    "react-dom": "19.2.5",
    "next-auth": "^4.24.13",
    "@prisma/client": "^7.7.0",
    "recharts": "^3.8.1",
    "@react-pdf/renderer": "^4.4.1",
    "zod": "^4.3.6",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.2",
    "@types/node": "^25.6.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "eslint": "^10.2.0",
    "eslint-config-next": "16.2.3",
    "prisma": "^7.7.0",
    "tailwindcss": "^4.2.2",
    "typescript": "^6.0.2"
  }
}
```

### Install all dependencies

```bash
npm install
```

### Install Prisma and generate client after schema changes

```bash
npx prisma generate
```

---

## Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // use "sqlite" for local dev
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  currency  String    @default("BDT")
  theme     String    @default("light")
  createdAt DateTime  @default(now())
  incomes   Income[]
  expenses  Expense[]
  debts     Debt[]
}

model Income {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Float
  category  String
  note      String?
  date      DateTime
  createdAt DateTime @default(now())
}

model Expense {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Float
  category  String
  note      String?
  date      DateTime
  debtId    String?            // optional — tags this expense as debt-funded
  debt      Debt?    @relation(fields: [debtId], references: [id])
  createdAt DateTime @default(now())
}

model Debt {
  id           String     @id @default(cuid())
  userId       String
  user         User       @relation(fields: [userId], references: [id])
  personName   String
  amount       Float
  paidAmount   Float      @default(0)
  description  String?
  borrowedDate DateTime
  dueDate      DateTime?
  status       DebtStatus @default(UNPAID)
  createdAt    DateTime   @default(now())
  expenses     Expense[]  // all expenses funded by this debt
}

enum DebtStatus {
  UNPAID
  PARTIAL
  PAID
}
```

---

## Key Queries

### Dual balance calculation

```ts
// lib/balance.ts
import { prisma } from '@/lib/prisma'

export async function getBalance(userId: string) {
  const [incomeAgg, expenseAgg, debtAgg] = await Promise.all([
    prisma.income.aggregate({
      _sum: { amount: true },
      where: { userId },
    }),
    prisma.expense.aggregate({
      _sum: { amount: true },
      where: { userId },
    }),
    prisma.debt.aggregate({
      _sum: { amount: true },
      where: { userId, status: { not: 'PAID' } },
    }),
  ])

  const totalIncome   = incomeAgg._sum.amount  ?? 0
  const totalExpenses = expenseAgg._sum.amount ?? 0
  const totalDebt     = debtAgg._sum.amount    ?? 0

  return {
    availableBalance: totalIncome + totalDebt - totalExpenses,
    trueBalance:      totalIncome - totalExpenses - totalDebt,
  }
}
```

### Debt detail — how borrowed money was spent

```ts
const debt = await prisma.debt.findUnique({
  where: { id: debtId },
  include: { expenses: true },
})

const totalSpent = debt.expenses.reduce((sum, e) => sum + e.amount, 0)
const unspent    = debt.amount - totalSpent
const stillOwed  = debt.amount - debt.paidAmount
```

### Monthly summary

```ts
const start = new Date(year, month - 1, 1)
const end   = new Date(year, month, 0, 23, 59, 59)

const [income, expenses, debts] = await Promise.all([
  prisma.income.aggregate({
    _sum: { amount: true },
    where: { userId, date: { gte: start, lte: end } },
  }),
  prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
    where: { userId, date: { gte: start, lte: end } },
  }),
  prisma.debt.findMany({
    where: { userId, borrowedDate: { gte: start, lte: end } },
    include: { expenses: true },
  }),
])
```

---

## Project Structure

```
expense-tracker/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   ├── balance/          ← returns availableBalance + trueBalance
│   │   ├── income/
│   │   ├── expenses/
│   │   ├── debts/
│   │   │   └── [id]/         ← debt detail with linked expenses
│   │   ├── monthly/
│   │   └── yearly/
│   ├── dashboard/
│   ├── transactions/
│   ├── income/
│   ├── expenses/
│   ├── debts/
│   │   └── [id]/             ← debt detail page
│   ├── monthly/
│   ├── yearly/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── charts/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── balance.ts            ← availableBalance + trueBalance helpers
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── types/
│   └── index.ts
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or SQLite for local dev)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Use postgresql:// for production, file:./dev.db for SQLite local dev
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"

NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (dev)
npx prisma db push

# Or run migrations (production)
npx prisma migrate dev --name init

# Open Prisma Studio (optional)
npx prisma studio
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Future Enhancements

| Feature | Notes |
|---|---|
| Split funding on expenses | One expense partially funded by debt + own money |
| Monthly budget caps | Per-category spending limits with overspend alerts |
| AI spending insights | Pattern detection on monthly habits |
| Currency conversion | BDT ↔ USD ↔ EUR live rates |
| Multi-user / family sharing | Shared household budget view |
| Mobile app | Flutter frontend using the same Next.js API |

---

## License

MIT — free to use and modify.# flowk
