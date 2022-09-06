import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import TimerIcon from '@mui/icons-material/Timer';
import { modifyTimerValue } from 'helpers/modifyTimerValue';
import CustomizedSnackbars from 'components/Commons/Snackbar/CustomizedSnackbars';
import { useEffect, useState } from 'react';
import { IconStyled, TimerStyled, Wrapper } from './StoperWidget.styled';

const StoperWidget = () => {
  const [isHided, setIsHided] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleHideStoper = () => {
    setIsHided(!isHided);
  };

  const handleStartTimer = () => {
    setIsTimerOn(true);
  };

  const handleStopTimer = () => {
    setIsTimerOn(false);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsTimerOn(false);
  };

  const handleCopyTimerToClipboard = () => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(modifyTimerValue(timer));
      setOpenSnackbar(true);
      return;
    }
    const el = document.createElement('textarea');
    el.value = timer.toString();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isTimerOn) {
      interval = setInterval(() => {
        setTimer((prev) => Number((prev + 0.03).toFixed(2)));
      }, 30);
    }

    return () => clearInterval(interval);
  }, [isTimerOn, timer]);

  return (
    <Wrapper data-testid="wrapper" is_hided={isHided.toString()}>
      <IconStyled onClick={() => handleHideStoper()}>
        {isHided ? <TimerIcon /> : <ArrowForwardIcon />}
      </IconStyled>
      <TimerStyled data-testid="display">{modifyTimerValue(timer)}</TimerStyled>
      <IconStyled onClick={isTimerOn ? handleStopTimer : handleStartTimer}>
        {isTimerOn ? <PauseCircleIcon /> : <PlayCircleOutlineIcon />}
      </IconStyled>
      <IconStyled onClick={handleResetTimer}>
        <StopCircleIcon />
      </IconStyled>
      <IconStyled onClick={handleCopyTimerToClipboard}>
        <ContentCopyIcon />
        <CustomizedSnackbars open={openSnackbar} setOpen={setOpenSnackbar}>
          Copied to clipboard
        </CustomizedSnackbars>
      </IconStyled>
    </Wrapper>
  );
};

export default StoperWidget;
