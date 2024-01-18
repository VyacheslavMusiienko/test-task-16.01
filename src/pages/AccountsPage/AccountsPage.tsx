import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { IAccountsData, IMainData } from '../../utils/interface';

const AccountsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IAccountsData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('accountId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../../db.json');
        const jsonData: IMainData = await response.json();
        setData(jsonData.accounts);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (id: number) => {
    navigate(`/${id}`);
  };

  const handleSort = (column: keyof IAccountsData) => {
    setSortBy(column);
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  if (loading) {
    return <Loading />;
  }

  const sortData = (
    dataToSort: IAccountsData[],
    sortByColumn: string,
    sortOrderValue: 'asc' | 'desc'
  ) => {
    return [...dataToSort].sort((a, b) => {
      const sortOrderFactor = sortOrderValue === 'asc' ? 1 : -1;

      if (
        sortByColumn === 'creationDate' ||
        sortByColumn === 'email' ||
        sortByColumn === 'authToken'
      ) {
        const aString = a[sortByColumn as keyof IAccountsData] as string;
        const bString = b[sortByColumn as keyof IAccountsData] as string;
        return sortOrderFactor * aString.localeCompare(bString);
      }

      const aNumber = a[sortByColumn as keyof IAccountsData] as number;
      const bNumber = b[sortByColumn as keyof IAccountsData] as number;

      return sortOrderFactor * (aNumber - bNumber);
    });
  };

  const sortedData = sortData(data || [], sortBy, sortOrder);

  const filteredData = sortedData.filter(
    (item) =>
      item.email.toLowerCase().includes(filter.toLowerCase()) ||
      item.authToken.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Input
        filter={filter}
        handleFilterChange={handleFilterChange}
        placeholder="Filter by Email or Auth Token"
      />
      {filteredData.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ cursor: 'pointer' }}>
              <th onClick={() => handleSort('accountId')}>#</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th onClick={() => handleSort('authToken')}>Auth Token</th>
              <th onClick={() => handleSort('creationDate')}>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.accountId}
                onClick={() => handleDetailClick(item.accountId)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.accountId}</td>
                <td>{item.email}</td>
                <td>{item.authToken}</td>
                <td>{item.creationDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>There are no matching records.</p>
      )}
    </div>
  );
};

export default AccountsPage;
