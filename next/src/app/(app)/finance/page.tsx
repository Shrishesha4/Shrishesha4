import { WalletIcon } from "lucide-react"
import { PagePlaceholder } from "@/components/app/page-placeholder"

export default function FinancePage() {
  return (
    <PagePlaceholder
      icon={WalletIcon}
      title="Finance"
      description="Coming in Phase 3: accounts, transactions, budgets, and bills."
    />
  )
}
