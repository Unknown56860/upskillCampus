import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions'
    const response = await fetch(url)
    return await response.json()
  }

  function addNewTransaction(ev) {
    ev.preventDefault()
    const url = process.env.REACT_APP_API_URL + '/transaction'
    const price = name.split(' ')[0]

    fetch(url, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        price, 
        name:name.substring(price.length+1), 
        description, 
        dateTime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDateTime('');
        setDescription('');
        console.log('result ', json);
      })
    })
  }

  let balance = 0
  for(const transaction of transactions){
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2)
  const rupya = balance.split('.')[0]
  const paisa = balance.split('.')[1]

  return (
    <main>
      <h1>Rs. {rupya}<span>.{paisa}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="item">
          <input type="text" 
                value={name}
                onChange={ev => setName(ev.target.value)}
                placeholder={'-10 Chocolate'}/>
          <input type="datetime-local"
                value={dateTime}
                onChange={ev => setDateTime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type="text" 
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                placeholder={'Description...'}/>
        </div>
        <button type='submit'>Add transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction, i) => (
          <div className="transaction" key={i}>
            <div className='left'>
              <div className='name'>{transaction.name}</div>
              <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
              <div className={'price ' + (transaction.price<0 ? 'red':'green')}>
                Rs. {transaction.price}
              </div>
              <div className='datetime'>{transaction.dateTime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
