import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const [searchDesc, setSearchDesc] = useState('');

  useEffect(()=>{
    fetch("http://localhost:8010/transactions").then(resp=>resp.json()).then(trxData=>{
      setAllTransactions(trxData);
      setFilteredTransaction(trxData);
    });
  }, []);

  function handleTransactionFilter(description){
    setSearchDesc(description);
    setFilteredTransaction(()=>allTransactions.filter((trx)=>trx.description.toLowerCase().includes(description.toLowerCase())));
  }

  function addTransaction(transaction){
    setAllTransactions([...allTransactions, transaction]);
    handleTransactionFilter(searchDesc);
  }

  return (
    <div>
      <Search onSearch={handleTransactionFilter} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransaction} />
    </div>
  );
}

export default AccountContainer;
