/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body'|'eye';
    description:string;
    amount:number;
}

 interface ChallengeContextData{
        level :number;
        currentExperience:number;
        challengeCompleted:number;
        experienceToNextLevel:number;
        activeChallenge:Challenge;
        LevelUp:()=>void;
        startNewChallenge:()=>void;
        resetChallenge:()=>void;
        completeChallenge:()=>void;
}

interface ChallengeProviderProps{
    children:ReactNode;
}
export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }:ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  // eslint-disable-next-line no-restricted-properties
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  function LevelUp() {
    setLevel(level + 1);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      LevelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('./notification.mp3').play();
    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }
  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeCompleted,
        LevelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
