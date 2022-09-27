import React, { useState } from "react";

function AddTransactionForm({onAddTransaction}) {

  const [formData, setFormData] = useState({
    date:'',
    description:'',
    category:'',
    amount:0
  });

  const [SubmittingState, setSubmittingState] = useState(false);

  function handleChanges(event){
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    const form = event.target;
    if(!form.checkValidity()){
      return;
    }

    setSubmittingState(true);
    fetch("http://localhost:8010/transactions", {
      method:"POST", 
      body:JSON.stringify(formData), 
      headers:{
        "Content-Type":"application/json"
      }
    }).then(resp=>resp.json()).then(trx=>{
      // console.log(trx);
      setSubmittingState(false);
      onAddTransaction(trx);
      setFormData({
        date:'',
        description:'',
        category:'',
        amount:0
      });
    })
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChanges} required />
          <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChanges} required />
          <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChanges} required />
          <input type="number" name="amount" value={formData.amount} placeholder="Amount" step="0.01" onChange={handleChanges} required />
        </div>
        <button className="ui button" type="submit" disabled={SubmittingState}>
          {SubmittingState ? 'Saving...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
