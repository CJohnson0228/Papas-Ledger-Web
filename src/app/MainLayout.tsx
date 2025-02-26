import { accountsAtom, AccountType, userAtom } from "@/authentication/state/userAtoms"
import AppSideBar from "@/components/AppSideBar"
import fetchAccounts from "@/utils/fetchAccounts"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"
import { Outlet } from "react-router"

function MainLayout() {
  const user = useAtomValue(userAtom)
  const setAccounts = useSetAtom(accountsAtom)

  useEffect(() => {
    if (user.uid) {
      fetchAccounts(user.uid)
        .catch((error) => console.log(error))
        .then((data) => {
          const accounts: AccountType[] = []
          data?.map((account) => {
            const accountData = {
              name: account.account_name,
              openningDate: account.openning_date,
              openningBalance: account.openning_balance,
              entries: account.entries,
            }
            accounts.push(accountData)
          })
          setAccounts(accounts)
        })
    }
  }, [])
  return (
    <div className="flex">
      <AppSideBar />
      <div className="flex justify-center items-center h-screen grow">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
