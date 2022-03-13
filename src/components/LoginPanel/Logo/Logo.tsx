import { ReactComponent as MyIcon } from '../../../assets/images/arm.svg';

const Logo = () => {
  return (
    <div className="logo">
      <MyIcon className="logo__arm-left" />
      <h1 className="logo__title">
        <p>Welcome to</p>
        Gym App
      </h1>
      <MyIcon className="logo__arm-right" />
    </div>
  );
};

export default Logo;
