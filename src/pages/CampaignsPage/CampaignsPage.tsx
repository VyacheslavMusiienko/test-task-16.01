import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { ICampaignsData, IMainData } from '../../utils/interface';

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICampaignsData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('campaignId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../../db.json');
        const jsonData: IMainData = await response.json();
        setData(jsonData.campaigns);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);
  const handleDetailClick = (id: number) => {
    navigate(`/campaigns/${id}`);
  };

  const handleSort = (column: keyof ICampaignsData) => {
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
    dataToSort: ICampaignsData[],
    sortByColumn: string,
    sortOrderValue: 'asc' | 'desc'
  ) => {
    return [...dataToSort].sort((a, b) => {
      const sortOrderFactor = sortOrderValue === 'asc' ? 1 : -1;

      const aNumber = a[sortByColumn as keyof ICampaignsData] as number;
      const bNumber = b[sortByColumn as keyof ICampaignsData] as number;

      return sortOrderFactor * (aNumber - bNumber);
    });
  };

  const sortedData = sortData(data || [], sortBy, sortOrder);

  const filteredData = sortedData.filter(
    (item) =>
      item.clicks.toString().includes(filter.toLowerCase()) ||
      item.cost.toString().includes(filter.toLowerCase())
  );
  return (
    <div>
      <Input
        filter={filter}
        handleFilterChange={handleFilterChange}
        placeholder="Фильтры по Clicks и Cost"
      />
      {filteredData.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ cursor: 'pointer' }}>
              <th onClick={() => handleSort('campaignId')}>#</th>
              <th onClick={() => handleSort('clicks')}>Clicks</th>
              <th onClick={() => handleSort('cost')}>Cost</th>
              <th onClick={() => handleSort('date')}>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.campaignId}
                onClick={() => handleDetailClick(item.campaignId)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.campaignId}</td>
                <td>{item.clicks}</td>
                <td>{item.cost}</td>
                <td>{item.date}</td>
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

export default CampaignsPage;
