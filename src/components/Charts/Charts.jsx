import { Line, Pie } from '@ant-design/charts';
import React from 'react';

const Charts = ({ sortedchart }) => {
  // Prepare data for the Line chart
  const lineChartData = sortedchart.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Prepare data for the Pie chart
  const spendingData = sortedchart.reduce((acc, item) => {
    if (item.type === 'expense') {
      const existingTag = acc.find((data) => data.tag === item.tag);
      if (existingTag) {
        existingTag.amount += item.amount;
      } else {
        acc.push({ tag: item.tag, amount: item.amount });
      }
    }
    return acc;
  }, []);

  // Line chart configuration
  const lineChartConfig = {
    data: lineChartData,
    xField: 'date',
    yField: 'amount',
    xAxis: {
      type: 'time',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    tooltip: {
      showMarkers: true,
      shared: true,
    },
  };

  // Pie chart configuration
  const pieChartConfig = {
    appendPadding: 10,
    data: spendingData,
    angleField: 'amount',
    colorField: 'tag',
    radius: 1,
    label: {
      Type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h2>Your Transactions Over Time</h2>
        <Line {...lineChartConfig} />
      </div>
      <div style={{ width: "50%" }}>
        <h2>Your Spending by Category</h2>
        {spendingData.length === 0 ? (
          <p>Seems like you haven't spent anything yet...</p>
        ) : (
          <Pie {...pieChartConfig} />
        )}
      </div>
    </div>
  );
};

export default Charts;

