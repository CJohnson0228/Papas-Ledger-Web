import { EntryType } from "@/authentication/state/userAtoms"
import { monthNames } from "@/utils/monthNames"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import Entries from "../Entries/Entries"

const MonthTabs = ({ months, openningBalance }: {
  months: Record<string, EntryType[]>
  openningBalance: number
}) => {
  const monthKeys = Object.keys(months).sort()
  const [selectedMonth, setSelectedMonth] = useState(monthKeys[0] || '')

  if (monthKeys.length === 0) {
    return <p className="bg-gray-800 w-full text-white text-center">No Entries for this year</p>
  }

  return (
    <Tabs defaultValue={selectedMonth} onValueChange={setSelectedMonth} className="">
      <TabsList className="flex justify-start px-2 w-full">
        {monthKeys.map((month) => (
          <TabsTrigger key={month} value={month} className="">
            {monthNames[month]}
          </TabsTrigger>
        ))}
      </TabsList>
      {monthKeys.map((month) => (
        <TabsContent key={month} value={month}>
          <Entries entries={months[month]} openningBalance={openningBalance} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default MonthTabs