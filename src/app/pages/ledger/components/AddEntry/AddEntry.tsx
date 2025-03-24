import useDatabase from "@/authentication/hooks/useDatabase";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/utils/categories";
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { IoCalendarClearOutline } from "react-icons/io5";
import { z } from "zod";

const entrySchema = z.object({
  payee: z.string().min(1, "Payee is required"),
  debit: z.boolean().default(true),
  reconciled: z.boolean().default(false),
  category: z.string().or(z.undefined()),
  checkNumber: z.string().or(z.undefined()),
  date: z.date({ required_error: "A date is required." }),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
});

const AddEntry = ({ accountID }: { accountID: string | undefined }) => {
  const { addEntry, error, isLoading } = useDatabase()
  const form = useForm<z.infer<typeof entrySchema>>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      payee: '',
      date: new Date(),
      reconciled: false,
      amount: 0,
      checkNumber: undefined,
      category: undefined,
      debit: true,
    }
  })

  const onSubmit = async (values: z.infer<typeof entrySchema>) => {
    if (accountID) {
      addEntry({ accountID: accountID, entry: values })
    }
  }

  return (
    <AlertDialogContent className="">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Add Entry</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription className="text-center">
        {error
          ? <>{error}</>
          : <>Add an entry to the ledger</>
        }
      </AlertDialogDescription>
      <Separator className="" />
      {isLoading && <span className="top-0 left-0 absolute bg-black/80 w-full h-full text-white">Loading...</span>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-2">
            <FormField control={form.control} name='debit' render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Credit</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Debit</FormLabel>
              </FormItem>
            )} />
            <FormField control={form.control} name='date' render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant='outline'>{field.value ? (format(field.value, "PPP")) : (<span>Pick a Date</span>)}<IoCalendarClearOutline className="opacity-50 ml-auto w-4 h-4" /></Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align='start'>
                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name='payee' render={({ field }) => (
            <FormItem className="flex justify-between items-center gap-4 my-1">
              <div>
                <FormLabel>Payee</FormLabel>
              </div>
              <FormControl>
                <Input autoComplete="one-time-code" type='text' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <div className="flex justify-between items-center gap-6 mb-2">
            <FormField control={form.control} name='checkNumber' render={({ field }) => (
              <FormItem className="flex justify-between items-center my-1">
                <div className="w-full">
                  <FormLabel>Check Number</FormLabel>
                </div>
                <FormControl>
                  <Input autoComplete="one-time-code" type='text' {...field} />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name='amount' render={({ field }) => (
              <FormItem className="flex justify-between items-center my-1">
                <div>
                  <FormLabel>Amount</FormLabel>
                </div>
                <div className="flex items-center gap-2">
                  <span>$</span>
                  <FormControl>
                    <Input className="w-32" step='0.01' autoComplete="one-time-code" type='number' {...field} />
                  </FormControl>
                </div>
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name='category' render={({ field }) => (
            <FormItem className="flex justify-between items-center my-1 grow">
              <div>
                <FormLabel>Category</FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) =>
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <AlertDialogFooter className="mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type='submit'>Add</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  )
}

export default AddEntry