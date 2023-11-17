import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8000/api/v1";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    const { data } = await axios.post(`${BASE_URL}/add-income`, income);

    if (!data.success) {
      return toast.error(data.message);
    }
    getIncomes();

    toast.success(data.message);
  };

  const getIncomes = async () => {
    const { data } = await axios(`${BASE_URL}/get-incomes`);
    setIncomes([...data.incomes]);
  };

  const deleteIncome = async (id) => {
    const { data } = await axios.delete(`${BASE_URL}/delete-income/${id}`);

    if (!data.success) {
      return toast.error(data.message);
    }

    getIncomes();
    toast.success(data.message);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const addExpense = async (expense) => {
    const { data } = await axios.post(`${BASE_URL}/add-expense`, expense);

    if (!data.success) {
      return toast.error(data.message);
    }
    getExpenses();

    toast.success(data.message);
  };

  const getExpenses = async () => {
    const { data } = await axios(`${BASE_URL}/get-expenses`);

    setExpenses([...data.expenses]);
    console.log(expenses);
  };

  const deleteExpense = async (id) => {
    const { data } = await axios.delete(`${BASE_URL}/delete-expense/${id}`);

    if (!data.success) {
      return toast.error(data.message);
    }

    getExpenses();
    toast.success(data.message);
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        addExpense,
        deleteExpense,
        getExpenses,
        totalExpenses,
        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
