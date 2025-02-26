import supabase from "@/config/supabaseClient";

const fetchAccounts = async (userID: string) => {
  // database query for data
  const { data, error } = await supabase
    .from('Accounts')
    .select('*')

  console.log(userID)

  if (error) {
    console.log(error)
    return
  }

  if (data) {
    return data
  }
  // add data from query to user state
}

export default fetchAccounts