import { accountsAtom } from "@/authentication/state/userAtoms"
import { useAtomValue } from "jotai"
import AccountCard from "./components/AccountCard"

function Dashboard() {
  const accounts = useAtomValue(accountsAtom)

  return (
    <div className="flex flex-wrap p-6">
      {accounts?.map((account) =>
        <AccountCard {...account} key={account._id} />
      )}
    </div>
  )
}

export default Dashboard
