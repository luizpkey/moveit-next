/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengeContext';

interface CountDownContextData{
    minutes:number;
    seconds:number;
    hasFinish:boolean;
    isActive:boolean;
    startCountDown:()=>void;
    resetCountDown:()=>void;
}

interface CountDownProviderProps{
    children:ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData);
// eslint-disable-next-line no-undef
let countDownTimeout: NodeJS.Timeout;

export function CountDownProvider({ children }:CountDownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(5);
  const [isActive, setActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setActive(true);
  }

  function resetCountDown() {
    setActive(false);
    setTime(25 * 60);
    clearTimeout(countDownTimeout);
    setHasFinish(false);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinish,
        isActive,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>

  );
}
