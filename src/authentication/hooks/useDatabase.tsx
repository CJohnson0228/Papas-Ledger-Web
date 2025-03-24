import supabase from "@/config/supabaseClient";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { accountsAtom, EntryType, userAtom } from "../state/userAtoms";

function useDatabase() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useAtomValue(userAtom)

  // Jotai State Functions
  const [accounts, setAccounts] = useAtom(accountsAtom)

  // Database Functions
  // === Get Accounts Function
  const getAccounts = async (userID: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('Accounts')
      .select('*')
      .eq('userid', userID)

    if (error) {
      console.log(error)
      setError(error.message)
      setIsLoading(false)
      return
    }

    if (data) {
      setIsLoading(false)
      return data
    }
  }

  // === Add Account Function
  const addAccount = async ({
    name, openningBalance, openningDate
  }: {
    name: string, openningBalance: number, openningDate: Date
  }) => {
    setIsLoading(true)
    setError(null)
    const submitAccount = {
      userid: user.uid,
      account_name: name,
      openning_balance: openningBalance,
      openning_date: openningDate
    }

    const { data, error } = await supabase.from('Accounts').insert([submitAccount])

    if (error) {
      console.log(error)
      setIsLoading(false)
      setError(error.message)
      return
    }

    if (data) {
      setIsLoading(false)
      console.log(data)
    }
  }

  // === Delete Account Function
  const deleteAccount = async ({
    accountID
  }: {
    accountID: string
  }) => {
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.from("Accounts").delete().eq('id', accountID)

    if (error) {
      console.log(error)
      setError(error.message)
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    return
  }

  // === Add Entry Function
  const addEntry = async ({
    accountID, entry
  }: {
    accountID: string, entry: {
      date: Date,
      payee: string,
      debit: boolean,
      reconciled: boolean,
      amount: number,
      checkNumber?: string,
      category?: string,
    }
  }) => {
    const { data, error } = await supabase.from('Accounts').select('entries').eq('id', accountID).single()

    const newEntry = {
      ...entry,
      _id: crypto.randomUUID(),
    }

    if (error) {
      console.log(error)
      setError(error.message)
      setIsLoading(false)
      return
    }

    const updatedEntries = [...(data.entries || []), newEntry]

    const { error: updateError } = await supabase.from("Accounts").update({ entries: updatedEntries }).eq("id", accountID)

    if (updateError) {
      console.log(error)
      setError(updateError.message)
      setIsLoading(false)
      return
    } else {
      console.log('Entry added successfully')
      setAccounts((prevAccounts) => prevAccounts?.map((account) => account._id === accountID
        ? { ...account, entries: updatedEntries }
        : account
      ))
      return
    }
  }

  // === Delete Entry Function
  const deleteEntry = async ({
    accountID, entryID
  }: {
    accountID: string, entryID: string
  }) => {
    setIsLoading(true)
    setError(null)

    if (accounts) {
      const accountKey = accounts.findIndex((acc) => acc._id === accountID)
      if (accountKey) {
        const entries = accounts[accountKey].entries
        if (entries) {
          const entryToDelete = entries.findIndex((ent) => ent._id === entryID)
          const updatedEntries = entries.filter((_, index) => index !== entryToDelete)

          const { error } = await supabase.from("Accounts").update({ entries: updatedEntries }).eq("id", accountID)

          if (error) {
            console.log(error)
            setError(error.message)
            setIsLoading(false)
            return
          } else {
            console.log('Entry deleted successfully')
            setAccounts((prevAccounts) =>
              prevAccounts?.map((account) =>
                account._id === accountID
                  ? { ...account, entries: updatedEntries }
                  : account
              )
            )
          }
        }
      }
    }
  }

  // === Edit Entry Function
  const editEntry = async ({
    accountID, entryID, newEntry
  }: {
    accountID: string, entryID: string, newEntry: EntryType
  }) => {
    setIsLoading(true)
    setError(null)

    if (accounts) {
      const accountKey = accounts.findIndex((acc) => acc._id === accountID)
      if (accountKey) {
        const entries = accounts[accountKey].entries
        if (entries) {
          const entryToEdit = entries.findIndex((ent) => ent._id === entryID)
          const updatedEntries = entries.map((entry, index) =>
            index === entryToEdit ? newEntry : entry
          )
          const { error } = await supabase.from("Accounts").update({ entries: updatedEntries }).eq("id", accountID)

          if (error) {
            console.log(error)
            setError(error.message)
            setIsLoading(false)
            return
          } else {
            console.log('Entry edited successfully')
            setAccounts((prevAccounts) =>
              prevAccounts?.map((account) =>
                account._id === accountID
                  ? { ...account, entries: updatedEntries }
                  : account
              )
            )
          }
        }
      }
    }
  }

  return { error, isLoading, getAccounts, addAccount, deleteAccount, addEntry, deleteEntry, editEntry }
}

export default useDatabase