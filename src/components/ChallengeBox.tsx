/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import styles from '../styles/components/ChallengeBox.module.css';

// eslint-disable-next-line import/prefer-default-export
export function ChallengeBox() {
  const hasChallengeActive = true;
  return (
    <div className={styles.challengeBoxContainer}>
      { hasChallengeActive
        ? (
          <div className={styles.challengeActive}>
            <header> Ganhe 400 xp</header>
            <main>
              <img src="icons/body.svg" alt="a" />
              <strong>Novo Desafio</strong>
              <p>Levante e faça uma caminhada de 3 minutos.</p>
            </main>
            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challengeSuccesedButton}
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
