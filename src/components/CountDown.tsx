/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
/* eslint-disable import/extensions */
import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
  const {
    minutes,
    seconds,
    hasFinish,
    isActive,
    resetCountDown,
    startCountDown,
  } = useContext(CountDownContext);
  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
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
