export function searchTransactions(transactions, searchValue) {
  if (searchValue.length === 0) return transactions

  let filteredTransactions = transactions.filter((transaction) => {
    if (transaction.category.slice(0, searchValue.length) === searchValue) return true
    if (transaction.notes) {
      if (transaction.notes.slice(0, searchValue.length) === searchValue) return true
    }
    let transactionAmount = Math.abs(transaction.amount).toString()
    if (transactionAmount === searchValue) return true
  })

  return filteredTransactions
}
