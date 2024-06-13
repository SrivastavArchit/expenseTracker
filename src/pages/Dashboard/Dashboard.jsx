import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Cards from '../../components/cards/Cards';
import AddIncomeModal from "../../components/Modals/Addincome";
import AddExpenseModal from '../../components/Modals/Addexpense';
import { addDoc, collection, query, getDocs ,doc,setDoc,getDoc} from "firebase/firestore";
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import "./style.css";
import { toast } from 'react-toastify';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import BudgetTracker from '../../components/BudgetTracker/BudgetTracker';
import Charts from '../../components/Charts/Charts';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    if (user) {
      fetchBudget();
      fetchTransactions();
    }
  }, [user]);

  async function addTransaction(transaction) {
    try {
      await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
      toast.success("Transaction Added!");
      fetchTransactions(); // Fetch transactions again to reflect the new addition
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const transactionsArray = querySnapshot.docs.map(doc => doc.data());
      setTransactions(transactionsArray);
      calculateBalance(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const showExpenseModal = () => {
    console.log("Show Expense Modal");
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    console.log("Show Income Modal");
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    console.log("Hide Expense Modal");
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    console.log("Hide Income Modal");
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date:(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
  };

  const calculateBalance = (transactions) => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  async function fetchBudget() {
    if (user) {
      const docRef = doc(db, `users/${user.uid}/budget`, 'monthly');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBudget(docSnap.data().amount);
      } else {
        console.log("No budget set");
      }
    }
  }

  async function saveBudget(amount) {
    try {
      await setDoc(doc(db, `users/${user.uid}/budget`, 'monthly'), { amount });
      setBudget(amount);
      toast.success("Budget Saved!");
    } catch (e) {
      console.error("Error saving budget: ", e);
      toast.error("Couldn't save budget");
    }
  }
  const sortedchart = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  


  return (
    <div>
      <div style={{marginBottom:"5rem"}}>
      <Header />
      </div>
   
      <Cards 
        showExpenseModal={showExpenseModal} 
        showIncomeModal={showIncomeModal} 
        income={income} 
        expense={expense} 
        currentBalance={currentBalance}
      />
         <BudgetTracker transactions={transactions} budget={budget} saveBudget={saveBudget} />
         
         {transactions.length!=0?<Charts sortedchart={sortedchart}/>:<h2>no transactions</h2>}
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />

      
      <TransactionTable transaction={transactions}/>
    </div>
  );
};

export default Dashboard;
