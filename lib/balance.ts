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

