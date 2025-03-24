import { AccountType } from '@/authentication/state/userAtoms'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function AccountCard({ _id, name, openningDate, openningBalance, entries }: AccountType) {
  const [currentBalance, setCurrentBalance] = useState(0)
  const navigate = useNavigate()
  const navlink = '/ledger/' + _id

  useEffect(() => {
    let balance = openningBalance
    if (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].debit === true) {
          balance = balance - entries[i].amount
        } else {
          balance = balance + entries[i].amount
        }
      }
    }
    setCurrentBalance(balance)
  }, [])

  return (
    <Card className='self-start w-full'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between gap-8 w-full'>
          <div>Openning Date:</div>
          {formatDate(openningDate)}
        </div>
        <div className='flex justify-between gap-8 w-full'>
          <div>Openning Balance:</div>
          <div>{formatCurrency(openningBalance)}</div>
        </div>
        <div className='flex justify-between gap-8 w-full'>
          <div>Current Balance:</div>
          <div>{formatCurrency(currentBalance)}</div>
        </div>
        {/* 
        Add an income vs. expendature chart to each card
        Data on left, chart on right - Desktop
        data on top, chart beneath - Mobile
        */}
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={() => navigate(navlink)}>Select Account</Button>
      </CardFooter>
    </Card>
  )
}

export default AccountCard
