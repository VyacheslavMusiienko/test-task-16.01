import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { IAccountsData, ICampaignsData, IMainData, IProfilesData } from '../../utils/interface';

const DetailPage = () => {
  const { accountId, campaignId, profileId } = useParams<{
    accountId?: string;
    campaignId?: string;
    profileId?: string;
  }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<IAccountsData | IProfilesData | ICampaignsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../../db.json');
        const jsonData: IMainData = await response.json();

        let newData: IAccountsData | IProfilesData | ICampaignsData | undefined;

        switch (pathname) {
          case `/${accountId}`:
            newData = jsonData.accounts.find((account) => account.accountId === Number(accountId));
            break;

          case `/profiles/${profileId}`:
            newData = jsonData.profiles.find((account) => account.profileId === Number(profileId));
            break;

          case `/campaigns/${campaignId}`:
            newData = jsonData.campaigns.find(
              (account) => account.campaignId === Number(campaignId)
            );
            break;

          default:
            newData = undefined;
            break;
        }

        if (!newData) {
          navigate('/error');
          return;
        }

        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [accountId, campaignId, navigate, pathname, profileId]);

  if (loading) {
    return <Loading />;
  }

  const renderCardText = (label: string, value: string | number) => (
    <Card.Text key={label}>
      {label}: {value}
    </Card.Text>
  );

  const detailRender = () => {
    if (!data) return null;

    if ('accountId' in data) {
      return (
        <>
          {renderCardText('Account id', data.accountId)}
          {renderCardText('Account token', data.authToken)}
          {renderCardText('Account email', data.email)}
          {renderCardText('Account date', data.creationDate)}
        </>
      );
    }
    if ('campaignId' in data) {
      return (
        <>
          {renderCardText('Campaign id', data.campaignId)}
          {renderCardText('Campaign clicks', data.clicks)}
          {renderCardText('Campaign cost', data.cost)}
          {renderCardText('Campaign date', data.date)}
        </>
      );
    }
    return (
      <>
        {renderCardText('Profile id', data.profileId)}
        {renderCardText('Profile marketplace', data.marketplace)}
        {renderCardText('Profile country', data.country)}
      </>
    );
  };

  return (
    <Card className="m-auto p-2" style={{ width: '50%' }}>
      {detailRender()}
    </Card>
  );
};

export default DetailPage;
