import { accountsAtom } from "@/authentication/state/userAtoms"
import { useAtomValue } from "jotai"

function Dashboard() {
  const accounts = useAtomValue(accountsAtom)

  return (
    <div>
      {accounts?.map((account) =>
        <div>{account.name}</div>
      )}
    </div>
  )
}

export default Dashboard
