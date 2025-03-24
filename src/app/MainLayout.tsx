import useDatabase from "@/authentication/hooks/useDatabase"
import { accountsAtom, AccountType, userAtom } from "@/authentication/state/userAtoms"
import AppSideBar from "@/components/AppSideBar"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"
import { Outlet } from "react-router"

function MainLayout() {
  const user = useAtomValue(userAtom)
  const setAccounts = useSetAtom(accountsAtom)
  const { getAccounts, error, isLoading } = useDatabase()

  useEffect(() => {
    if (user.uid) {
      getAccounts(user.uid)
        .catch((error) => console.log(error))
        .then((data) => {
          const accounts: AccountType[] = []
          data?.map((account) => {
            const accountData = {
              _id: account.id,
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
    <div className="relative flex">
      {isLoading &&
        <div className="absolute flex justify-center items-center bg-black/80 w-full h-full">Loading...</div>
      }
      <AppSideBar />
      <div className="flex mt-[52px] min-h-[calc(100vh-52px)] scroll-auto screen grow">
        {error &&
          <div className="bg-red-500 w-full text-white text-center">{error}</div>
        }
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
