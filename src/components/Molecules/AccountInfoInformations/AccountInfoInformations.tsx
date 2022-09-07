import { FC } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import { UserMetadata } from 'firebase/auth';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { AccountInfoInformationsStyled } from './AccountInfoInformations.styled';

interface AccountInfoInformationsProps {
  email: string | null;
  emailVerified: boolean;
  metadata: UserMetadata;
}

const AccountInfoInformations: FC<AccountInfoInformationsProps> = (props) => {
  const { email, emailVerified, metadata } = props;

  return (
    <AccountInfoInformationsStyled email_verified={emailVerified.toString()}>
      <TitleStyled>Account Info</TitleStyled>
      <p className="accountInfo">
        <span className="description">Account email</span>
        <span className="userInfo">{email}</span>{' '}
      </p>
      <p className="accountInfo">
        <span className="description">Email verified</span>
        <span className="userInfo">
          {emailVerified ? <VerifiedIcon /> : <DangerousSharpIcon />}
        </span>
      </p>
      <p className="accountInfo">
        <span className="description">Account created at</span>
        <span className="userInfo">{metadata.creationTime}</span>
      </p>
      <p className="accountInfo">
        <span className="description">Last login</span>
        <span className="userInfo">{metadata.lastSignInTime}</span>
      </p>
    </AccountInfoInformationsStyled>
  );
};

export default AccountInfoInformations;
