/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

// eslint-disable-next-line import/prefer-default-export
export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountDown } = useContext(CountDownContext);
  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountDown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountDown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge
        ? (
          <div className={styles.challengeActive}>
            <header>
              {`Ganhe ${activeChallenge.amount} xp`}
            </header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="a" />
              <strong>Novo Desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challengeSuccesedButton}
                onClick={handleChallengeSucceeded}
              >
                Completei
              </button>
            </footer>
          </div>
        ) : (
          <div className={styles.challengeNotActive}>
            <strong>Inicie um ciclo para receber desafios a serem completados</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando um desafio
            </p>
          </div>
        )}
    </div>
  );
}
