import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import AccountsPage from '../pages/AccountsPage/AccountsPage';
import CampaignsPage from '../pages/CampaignsPage/CampaignsPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProfilesPage from '../pages/ProfilesPage/ProfilesPage';

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<AccountsPage />} />
      <Route path=":accountId" element={<DetailPage />} />
      <Route path="profiles" element={<ProfilesPage />} />
      <Route path="profiles/:profileId" element={<DetailPage />} />
      <Route path="campaigns" element={<CampaignsPage />} />
      <Route path="campaigns/:campaignId" element={<DetailPage />} />
      <Route path="error" element={<ErrorPage />} />
    </Route>
  )
);

export default routers;
