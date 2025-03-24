
import { EntryType } from "@/authentication/state/userAtoms"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"
import { useEffect } from "react"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoEllipsisVerticalCircleOutline, IoPencil } from "react-icons/io5"

const Entries = ({ entries, openningBalance }: {
  entries: EntryType[],
  openningBalance: number
}) => {
  let runningBalance = openningBalance

  useEffect(() => {
    console.log(entries)
  }, [entries])

  if (entries.length === 0) {
    return <p className="bg-gray-800 w-full text-white text-center">No Transactions recorded</p>
  }


  return (
    <div>
      <Table className='h-full text-black'>
        <TableHeader>
          <TableRow className="">
            <TableHead className="border-r w-32 text-center">Functions</TableHead>
            <TableHead className="border-r w-24 text-center">Date</TableHead>
            <TableHead className="border-r w-24 text-center">CHK</TableHead>
            <TableHead className="border-r grow">Payee</TableHead>
            <TableHead className="border-r w-32 text-center">Category</TableHead>
            <TableHead className="border-r w-32 text-center">Credit</TableHead>
            <TableHead className="border-r w-32 text-center">Debit</TableHead>
            <TableHead className="w-32 text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[calc(100vh-157.6px)] overflow-y-auto">
          {entries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((entry, index) => {
              if (entry.debit === true) {
                runningBalance -= entry.amount
              } else {
                runningBalance += entry.amount
              }
              return (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? 'bg-ledger-even hover:bg-ledger-even' : 'bg-ledger-odd hover:bg-ledger-odd'}>
                  <TableCell className="flex gap-1 border-r">
                    <Button variant='destructive' size='icon' className="rounded-full"><IoCloseCircleOutline /></Button>
                    <Button variant='ghost' size='icon' className="rounded-full"><IoPencil /></Button>
                    <Button variant='ghost' size='icon' className="rounded-full">
                      {entry.reconciled ? <IoCheckmarkCircleOutline /> : <IoEllipsisVerticalCircleOutline />}
                    </Button>
                  </TableCell>
                  <TableCell className="border-r text-center">{formatDate(entry.date)}</TableCell>
                  <TableCell className="border-r text-center">{entry.checkNumber}</TableCell>
                  <TableCell className="border-r">{entry.payee}</TableCell>
                  <TableCell className="border-r">{entry.category}</TableCell>
                  <TableCell className="border-r text-right">{!entry.debit && formatCurrency(entry.amount)}</TableCell>
                  <TableCell className="border-r text-right">{entry.debit && formatCurrency(entry.amount)}</TableCell>
                  <TableCell className={runningBalance < 0 ? "text-red-500 text-right" : "text-black text-right"}>{formatCurrency(runningBalance)}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Entries