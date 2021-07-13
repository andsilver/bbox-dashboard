import { useEffect } from 'react';
import Web3 from 'web3';

import Header from './modules/shared/components/Header';
import './App.css';
import { setUser } from './store/reducers/auth';
import { Home } from './modules/home';

function App() {
  useEffect(() => {
    (async () => {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      setUser(accounts[0]);
      console.log('abc');
    })();
  });

  return (
    <>
      <Header></Header>
      <Home></Home>
    </>
  );
}

export default App;
