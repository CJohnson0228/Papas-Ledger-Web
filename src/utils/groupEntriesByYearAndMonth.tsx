import { EntryType } from "@/authentication/state/userAtoms"

export const groupEntriesByYearAndMonth = (entries: EntryType[] = []) => {
  const grouped: Record<string, Record<string, EntryType[]>> = {}

  if (entries) {
    entries.forEach((entry) => {
      const [year, month] = entry.date.toString().split('-').slice(0, 2)

      if (!grouped[year]) grouped[year] = {}
      if (!grouped[year][month]) grouped[year][month] = []

      grouped[year][month].push(entry)
    })
  }

  return grouped
}
