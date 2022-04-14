import { importImages } from 'helpers/importImages';
import WorkoutStats from '../WorkoutStats/WorkoutStats';
import { TitleStyled, Wrapper } from './WorkoutCard.styled';

const { images } = importImages();

const WorkoutCard = () => {
  const src = images.back;
  const name = 'Pull Up';

  return (
    <Wrapper url={images.back}>
      <TitleStyled>{name.toUpperCase()}</TitleStyled>
      <WorkoutStats />
    </Wrapper>
  );
};

export default WorkoutCard;
