import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { BASE_API } from '../common/helpers';


const tableHeader = [
  '#',
  'Exchange',
  'Pair',
  'Price',
  '+2% Depth',
  '-2% Depth',
  '24 Volume',
  'Volume %',
  'Last Updated',
];

const MarketTable = () => {
  const [ currencies, setCurrencies ] = useState([]);
  const [ page, setPage ] = useState(1);

  const fetcher = async () => {
    try {
      const res = await fetch(`${BASE_API}/api/ltc-exchanges`);
      const { data } = await res.json();
      setCurrencies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);
  return (
    <section>
      <div className="container">

        <h2 className="text-center section-heading mt-5" id="exchanges">LTC Markets</h2>
        <div className="d-flex flex-column align-items-center">
          <div className="markets-table mt-4 article" style={{ width: '100%' }}>
            <table className="table table-hover align-middle mb-0 dataTable text-14" style={{ width: '100%' }}>
              <thead>
                <tr role='row'>
                  {
                    tableHeader.map((i, k) => (
                    <td key={k} scope='col' className="dt-type-numeric dt-orderable-asc dt-orderable-desc bg-transparent">
                      {i}
                    </td>
                  ))
                  }
                </tr>
              </thead>

              <tbody>
                {
                  currencies.slice(10*page - 10, 10* page).map((i: any) => (
                    <tr key={i.id}>
                      <th className="bg-transparent px-2 py-4">{i.id}</th>
                      <td className="bg-transparent p-2">
                        <img src={i.icon} alt="" width={20} style={{ marginRight: 5 }} />
                        <span>{i.exchange}</span>
                      </td>
                      <td className="bg-transparent p-2">{i.pair}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.price}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.plusTwoPercentDepth}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.minusTwoPercentDepth}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.volume24h}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.volumePercentage}</td>
                      <td className="dt-type-numeric bg-transparent p-2">{i.lastUpdated}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {
            currencies.length > 10
              &&
              <Pagination
                style={{marginTop: 32}}
                page={page}
                onChange={(_, p) => (setPage(p))}
                count={Math.ceil(currencies.length / 10)}
                shape="rounded"
                color='primary'
              />
          }
        </div>
      </div>
    </section>
  )
}

export default MarketTable
