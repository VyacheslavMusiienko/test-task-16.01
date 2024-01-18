import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { IMainData, IProfilesData } from '../../utils/interface';

const ProfilesPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IProfilesData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('profileId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../../db.json');
        const jsonData: IMainData = await response.json();
        setData(jsonData.profiles);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (id: number) => {
    navigate(`/profiles/${id}`);
  };

  const handleSort = (column: keyof IProfilesData) => {
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
    dataToSort: IProfilesData[],
    sortByColumn: string,
    sortOrderValue: 'asc' | 'desc'
  ) => {
    return [...dataToSort].sort((a, b) => {
      const sortOrderFactor = sortOrderValue === 'asc' ? 1 : -1;

      if (sortByColumn === 'country' || sortByColumn === 'marketplace') {
        const aString = a[sortByColumn as keyof IProfilesData] as string;
        const bString = b[sortByColumn as keyof IProfilesData] as string;
        return sortOrderFactor * aString.localeCompare(bString);
      }

      const aNumber = a[sortByColumn as keyof IProfilesData] as number;
      const bNumber = b[sortByColumn as keyof IProfilesData] as number;

      return sortOrderFactor * (aNumber - bNumber);
    });
  };

  const sortedData = sortData(data || [], sortBy, sortOrder);

  const filteredData = sortedData.filter(
    (item) =>
      item.country.toLowerCase().includes(filter.toLowerCase()) ||
      item.marketplace.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <Input
        filter={filter}
        handleFilterChange={handleFilterChange}
        placeholder="Filter by Country or Marketplace"
      />
      {filteredData.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ cursor: 'pointer' }}>
              <th onClick={() => handleSort('profileId')}>#</th>
              <th onClick={() => handleSort('country')}>Country</th>
              <th onClick={() => handleSort('marketplace')}>Marketplace</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.profileId}
                onClick={() => handleDetailClick(item.profileId)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.profileId}</td>
                <td>{item.country}</td>
                <td>{item.marketplace}</td>
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

export default ProfilesPage;
