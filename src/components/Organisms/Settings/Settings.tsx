import AccountInfo from 'components/Molecules/AccountInfo/AccountInfo';
import ChangePassword from 'components/Molecules/ChangePassword/ChangePassword';
import DeleteAccount from 'components/Molecules/DeleteAccount/DeleteAccount';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { pagesPaths } from 'helpers/staticVariables';
import { Navigate, Route } from 'react-router-dom';
import { Wrapper } from './Settings.styled';

const Settings = () => {
  return (
    <Wrapper>
      <CustomizedRoutes>
        <Route path="/" element={<Navigate to={`${pagesPaths.settings.fullPath}/AccountInfo`} />} />
        <Route path="/AccountInfo" element={<AccountInfo />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/DeleteAccount" element={<DeleteAccount />} />
      </CustomizedRoutes>
    </Wrapper>
  );
};

export default Settings;
