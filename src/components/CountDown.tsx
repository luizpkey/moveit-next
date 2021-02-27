/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  let countDownTimeout: NodeJS.Timeout;

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActive(true);
  }

  function resetCountDown() {
    setActive(false);
    setTime(25 * 60);
    clearTimeout(countDownTimeout);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.CountDownContainer}>
        <div>
          <span>
            {minutesLeft}
          </span>
          <span>
            {minutesRight}
          </span>
        </div>
        <span>
          :
        </span>
        <div>
          <span>
            {secondsLeft}
          </span>
          <span>
            {secondsRight}
          </span>
        </div>
      </div>
      { hasFinish ? (
        <button
          type="button"
          disabled
          className={styles.CountdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
              onClick={resetCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.CountdownButton}
              onClick={startCountDown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>

      )}
    </div>
  );
}
