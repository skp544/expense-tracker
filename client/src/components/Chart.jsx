import {
  ArcElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";

import { dateFormat } from "../utils";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;