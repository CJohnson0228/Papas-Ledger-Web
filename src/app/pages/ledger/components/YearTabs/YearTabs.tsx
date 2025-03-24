import { EntryType } from "@/authentication/state/userAtoms"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import MonthTabs from "../MonthTabs/MonthTabs"

const YearTabs = ({ entries, openningBalance }: {
  entries: Record<string, Record<string, EntryType[]>>,
  openningBalance: number
}) => {
  const years = Object.keys(entries).sort((a, b) => Number(b) - Number(a))
  const [selectedYear, setSelectedYear] = useState(years[0] || '')

  if (years.length === 0) {
    return <p className="bg-gray-800 w-full text-white text-center">No Entries found</p>
  }

  return (
    <Tabs defaultValue={selectedYear} onValueChange={setSelectedYear} className="w-full">
      <TabsList className="flex justify-start px-2 w-full">
        {years.map((year) => (
          <TabsTrigger key={year} value={year} >{year}</TabsTrigger>
        ))}
      </TabsList>

      {years.map((year) => (
        <TabsContent key={year} value={year}>
          <MonthTabs months={entries[year]} openningBalance={openningBalance} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default YearTabs