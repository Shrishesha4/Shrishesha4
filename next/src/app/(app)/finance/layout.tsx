"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const financeNavItems = [
  { title: "Overview", href: "/finance" },
  { title: "Transactions", href: "/finance/transactions" },
  { title: "Accounts", href: "/finance/accounts" },
  { title: "Budgets", href: "/finance/budgets" },
  { title: "Recurring", href: "/finance/recurring" },
  { title: "Goals", href: "/finance/goals" },
]

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex gap-1 border-b border-border">
        {financeNavItems.map((item) => {
          const isActive =
            item.href === "/finance" ? pathname === "/finance" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive && "border-foreground text-foreground"
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
      {children}
    </div>
  )
}
