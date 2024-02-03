import { useState, useEffect } from 'react';
import "./ExpenseTracker.css";

function ExpenseTracker() {
  const [income, setIncome] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addNewTransaction = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income,
          date,
          description,
        }),
      });
  
      if (response.ok) {
        console.log('Transaction added successfully');
        fetchTransactions(); 
        setIncome('');
        setDate('');
        setDescription('');
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return dateTime.toLocaleString('en-US', options);
  }

  let balance = 0;
  for (const transaction of transactions){
    balance += transaction.income;
  }

  let expenditure = 0;
  let inc = 0;
  for (const transaction of transactions) {
    if (transaction.income < 0) {
      expenditure += transaction.income;
    } else {
      inc += transaction.income;
    }
  }

  return (
    <div className="expense-tracker-page">
      <div className='expense-input'>
        <div>
          <div style={{color:"#457b9d",fontSize:"24px",marginBottom:"5px"}}>Track your Expense</div>
          <form className="input-section" onSubmit={addNewTransaction}>
            <input type="text" id="income" value={income} onChange={e => setIncome(e.target.value)} placeholder='+ Credit / - Debit' required/>
            <input type="datetime-local" id="" value={date} onChange={e => setDate(e.target.value)} required/>
            <input type="text" id="expense-description" value={description}  onChange={e => setDescription(e.target.value)} placeholder='Description' required/>
            <button>Add Transaction</button>
          </form>
        </div>
        <div className='balance-view'>
          <div>Balance</div>
          <div style={{fontSize:"80px"}}>{balance} <span style={{fontSize:"20px"}}>.00</span></div>
          <div style={{marginTop:"5px"}}>Income</div>
          <div style={{color:"green",fontSize:"24px"}}>{inc}</div>
          <div style={{marginTop:"5px"}}>Expenditure</div>
          <div style={{ color:"red", fontSize: '24px' }}>
            {expenditure}
          </div>
        </div>
      </div>
      
      <div className="expense-history">
        <div style={{color:"#457b9d",fontSize:"24px",marginBottom:"5px",marginLeft:"150px"}}>Your Expense History</div>
        <div className='history'>
          {transactions.length > 0 && transactions.map(transaction =>(
            <div key={transaction.id}>
              <div className='transactions-view'>
                <div className='description'>{transaction.description}</div>
                <div className='income' style={{ color: transaction.income && transaction.income < 0 ? 'red' : 'green', fontSize: '24px' }} >{transaction.income}</div>
              </div>
              <div className='transactions-view'>
                <div>Time</div>
                <div>{formatDateTime(transaction.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
