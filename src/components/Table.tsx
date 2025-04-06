import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { BASE_API } from '../common/helpers';


const theader_t = [ '#', 'Exchange', 'Pair', 'Price', '+2% Depth', '-2% Depth', '24h Volume', 'Volume %', 'Last Updated', ] as const;
const theader: typeof theader_t = theader_t;
const theader_params = {
  '#': 'sort_by=id',
  'Exchange': 'sort_by=exchange',
  'Price': 'sort_by=price',
  'Volume %': 'sort_by=volume',
  '+2% Depth': 'sort_by=plus_depth',
  '-2% Depth': 'sort_by=minus_depth',
  'Pair': '',
  '24h Volume': 'sort_by=volume24',
  'Last Updated': '',
};
const descending_params = { 'invert': '&descending=true', 'remove': '&descending=false' };
const forSortChange = { invert: 'remove', remove: 'off', off: 'invert' } as const;

const sortAriaLabels = {
  invert: { cls: 'dt-ordering-asc', ariaLabel: 'Activate to invert sorting', },
  remove: { cls: 'dt-ordering-desc', ariaLabel: 'Activate to remove sorting', },
  off: { cls: '', ariaLabel: 'Activate to sort', },
};

const Table = () => {
  const [ currencies, setCurrencies ] = useState<currency[]>([]);
  const [ sortValue, setSortValue ] = useState<sort>('invert');
  const [ sort, setSort ] = useState<number>(0);

  const [ page, setPage ] = useState<number>(1);


  const fetchSortedCurr = async (sort: number, sortValue: sort) => {
    const queryParams: string = sortValue === 'off' ? '' : theader_params[theader[sort]] + descending_params[sortValue];

    try {
      const res = await fetch(`${BASE_API}/api/ltc-exchanges?${queryParams}`);
      const data = await res.json();

      console.log(data);

      if (data?.data) {
        setCurrencies(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSort = (newSort: number) => {
    if (newSort !== sort) {
      setSort(newSort);
    }

    const forSort: typeof forSortChange = forSortChange;
    const newSortValue: sort = newSort !== sort ? 'invert' : forSort[sortValue];
    setSortValue(newSortValue);

    fetchSortedCurr(newSort, newSortValue);
  };

  useEffect(() => {
    fetchSortedCurr(0, 'invert');
  }, []);
  return (
    <>
      <table className="table table-hover align-middle mb-0 dataTable __web-inspector-hide-shortcut__" id="sortTable" style={{ width: '100%' }}>
        <thead>
          <tr role="row">
            {
              theader.map((th, idx) => (
                <th
                  key={th}
                  scope="col"
                  data-dt-column={idx}
                  rowSpan={1}
                  colSpan={1}
                  className={`dt-type-numeric dt-orderable-asc dt-orderable-desc ${idx === sort ? sortAriaLabels[sortValue].cls : ''}`}
                  aria-sort="ascending"
                  aria-label={`#: ${idx === sort ? sortAriaLabels[sortValue].ariaLabel : ''}`}
                  tabIndex={0}
                  onClick={() => handleClickSort(idx)}
                >
                  <span className="dt-column-title user-select-none" role="button">{th}</span>
                  <span className="dt-column-order"></span>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            currencies?.slice((page-1)*10, page*10).map((curr: currency, idx) => (
              <tr key={curr.id}>
                <td scope="row" className="dt-type-numeric sorting_1">{curr.id || idx+1}</td>
                <td>
                  <div className="wth-icon">
                    <img src={curr.icon} alt='Currency icon' width="20" height="20" />
                    {` ${curr.exchange}`}
                  </div>
                </td>
                <td>{curr.pair}</td>
                <td className="dt-type-numeric">{curr.price}</td>
                <td className="dt-type-numeric">{curr.plusTwoPercentDepth}</td>
                <td className="dt-type-numeric">{curr.minusTwoPercentDepth}</td>
                <td className="dt-type-numeric">{curr.volume24h}</td>
                <td className="dt-type-numeric">{curr.volumePercentage}</td>
                <td>{curr.lastUpdated}</td>
              </tr>
            ))
          }
        </tbody>
      <tfoot></tfoot>
      </table>
      <Pagination pages={Math.ceil(currencies?.length / 10)} page={page} onClick={(p) => (setPage(p))} />
    </>
  )
}

type currency = {
  id: number,
  exchange: string,
  pair: string,
  price: number,
  price_percent: string | null,
  plusTwoPercentDepth: string,
  minusTwoPercentDepth: string,
  volume24h: string,
  volumePercentage: string,
  lastUpdated: string,
  icon: string,
};

type sort = 'invert' | 'remove' | 'off';

export interface TableProps {
  initialCurrencies: currency[],
  initialSort?: number,
  initialSortValue?: sort,
  BASE_API: string,
}

export default Table
