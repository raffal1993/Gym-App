import CustomButton from 'components/Atoms/Buttons/CustomButton/CustomButton';
import ErrorMessage from 'components/Atoms/ErrorMessage/ErrorMessage';
import { auth } from 'firebase-cfg/firebase-config';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import { Wrapper } from './ChangePassword.styled';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.getAttribute('id')) {
      case 'oldPassword':
        return setOldPassword(e.currentTarget.value);
      case 'newPassword':
        return setNewPassword(e.currentTarget.value);
      case 'confirmPassword':
        return setConfirmPassword(e.currentTarget.value);
      default:
        return null;
    }
  };
  const handleChangePassword = async (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (auth.currentUser?.email === 'test@wp.pl')
      return setErrorMessage("Can't change password on test@wp.pl account");
    const user = auth.currentUser;
    let isVerified = false;
    await signInWithEmailAndPassword(auth, user?.email || '', oldPassword)
      .then(() => {
        isVerified = true;
      })
      .catch(() => {
        setErrorMessage('Old password is incorrect');
      });

    if (!isVerified) return;

    if (newPassword.length === 0 && confirmPassword.length === 0)
      return setErrorMessage('Please enter new password');

    if (newPassword !== confirmPassword)
      return setErrorMessage('New password and confirm password are different');

    if (user)
      await updatePassword(user, newPassword)
        .then(() => {
          setIsSucceed(true);
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        })
        .catch((error) => {
          setErrorMessage(error.message.replace('Firebase: ', ''));
        });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSucceed(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSucceed]);

  return (
    <Wrapper>
      <TitleStyled className="title">Change password</TitleStyled>
      <form>
        <label htmlFor="oldPassword">
          <span>Old password:</span>
          <input
            value={oldPassword}
            onChange={(e) => handleOnChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleChangePassword(e)}
            id="oldPassword"
            className="oldPassword"
            type="password"
            data-testid="oldPassword"
          />
        </label>

        <label htmlFor="newPassword">
          <span>New password:</span>
          <input
            value={newPassword}
            onChange={(e) => handleOnChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleChangePassword(e)}
            id="newPassword"
            className="newPassword"
            type="password"
            data-testid="newPassword"
          />
        </label>

        <label htmlFor="confirmPassword">
          <span>Confirm new password:</span>
          <input
            value={confirmPassword}
            onChange={(e) => handleOnChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleChangePassword(e)}
            id="confirmPassword"
            className="confirmPassword"
            type="password"
            data-testid="confirmPassword"
          />
        </label>
        <CustomButton
          isError={!!errorMessage}
          handleClick={handleChangePassword}
          className="changePassButton"
          isSucceed={isSucceed}
        >
          Change Password
        </CustomButton>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} className="errorMessage" />}
      </form>
    </Wrapper>
  );
};

export default ChangePassword;
