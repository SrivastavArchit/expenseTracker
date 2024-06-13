import { Line, Pie } from '@ant-design/charts';
import React from 'react';
import "./style.css"
import { Card } from 'antd';
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
        title:"tag",
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
      Type: 'outer',
      content: '{name} {percentage}',
    },
    formatter: (datum) => `${datum.tag}: ${(datum.percent * 100).toFixed(2)}%`,

interactions: [{ type: 'element-active' }],
};

  let chart;

  return (
    <div style={{ display: "flex" }} className='chart-wrap'>
      <div className='chart-div'>
        <Card className='chart-card' >
        <h2>Your Transactions Over Time</h2>
        <Line {...lineChartConfig} onReady={(chartInstance) => (chart = chartInstance)} />;
        </Card>
      </div>

      <div className='chart-div'>
        <Card className='chart-card'>
        <h2>Your Spending by Category</h2>
        {spendingData.length === 0 ? (
          <p>Seems like you haven't spent anything yet...</p>
        ) : (
          <Pie {...pieChartConfig} />
        )}
        </Card>
      </div>
    </div>
  );
};

export default Charts;
