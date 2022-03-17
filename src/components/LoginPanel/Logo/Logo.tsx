import { StyledSvgIcon, StyledTitle, Wrapper } from './Logo.styled';

const Logo = () => {
  return (
    <Wrapper>
      <StyledSvgIcon arm_to_rotate="true" />
      <StyledTitle>
        <p>Welcome to</p>
        Gym App
      </StyledTitle>
      <StyledSvgIcon />
    </Wrapper>
  );
};

export default Logo;
