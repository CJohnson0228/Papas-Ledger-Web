import AddEntry from "@/app/pages/ledger/components/AddEntry/AddEntry"
import YearTabs from "@/app/pages/ledger/components/YearTabs/YearTabs"
import { accountsAtom } from "@/authentication/state/userAtoms"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { groupEntriesByYearAndMonth } from "@/utils/groupEntriesByYearAndMonth"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5"
import { useParams } from "react-router"

// ====== Ledger COmponent ===================================================
function Ledger() {
  const accounts = useAtomValue(accountsAtom)
  const { accountID } = useParams()
  const [ledgerTitle, setLedgerTitle] = useState('')
  const [entries, setEntries] = useState({})
  const [openBal, setOpenBal] = useState(0)
  const [addEntryOpen, setAddEntryOpen] = useState<boolean>(false)

  useEffect(() => {
    if (accounts) {
      const index = accounts.findIndex(account => account._id.toString() === accountID)
      if (index !== -1) {
        setLedgerTitle(accounts[index].name)
        setEntries(groupEntriesByYearAndMonth(accounts[index].entries))
        setOpenBal(accounts[index].openningBalance)
      }
    }
  }, [accounts, accountID])

  return (
    <div className="w-full">
      <div className="bg-gray-700 p-1 w-full text-md text-white text-center">{ledgerTitle}</div>
      <YearTabs entries={entries} openningBalance={openBal} />
      {/* === Add Entry Button === */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='secondary' className="right-2 bottom-6 absolute" onClick={() => setAddEntryOpen(true)}>
              <IoAddCircleOutline className="w-11 h-11" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Entry to this ledger</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialog open={addEntryOpen} onOpenChange={setAddEntryOpen}>
          <AddEntry accountID={accountID} />
        </AlertDialog>
      </TooltipProvider>
    </div>

  )
}

export default Ledger
