import { useEffect, useState } from 'react';
import { BASE_API } from '../common/helpers';
import { LineChart } from '@mui/x-charts/LineChart'

const parseDate = (dateStr: string): Date => {
  // Добавляем год, например, 2025
  return new Date(`2025/${dateStr}`);
};

const LTCUSDChart = () => {
  const [history, setHistory] = useState<{ date: string; price: number }[]>([]);

  const fetcher = async () => {
    try {
      const res = await fetch(BASE_API + "/api/ltc-price-history");
      const data = await res.json();

      console.log(data);

      // Сортировка по дате
      const sortedData = data.data.sort(
        (a: any, b: any) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
      );

      setHistory(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="markets-table">
      <h2 className="text-center">1 LTC = ${history[history.length-1]?.price}</h2>
      <span className="d-block w-full text-center mt-4">LTC/USD</span>
      <LineChart
        xAxis={[
          {
            data: history.map((h) => h.date),
            scaleType: 'point', // используем точечную шкалу, раз строки
            valueFormatter: (val) => val,
          },
        ]}
        series={[{
          data: history.map((h) => h.price),
          valueFormatter: (val) => `LTC/USD: ${val}`,
        }]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};

export default LTCUSDChart;