import { useEffect, useRef, useState } from "react";
import { TARGET, ALLOWED_LENGTH, ALLOWED_GUESSES } from "../constants";

import { Layout } from "./Layout";
import { Row } from "./Row";

// TODO: Add admin screen for setting the target word

type LetterResult = "correct" | "present" | "absent";

export function Game() {
  const [word, setWord] = useState<string[]>(Array(ALLOWED_LENGTH).fill(""));
  const [guesses, setGuesses] = useState<string[][]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // letters are entered left to right with no gaps, so the word acts like a
  // string
  const firstEmpty = word.indexOf("");
  const activeIndex = firstEmpty === -1 ? word.length - 1 : firstEmpty;

  const lastGuess = guesses.at(-1);
  const isGameOver =
    guesses.length === ALLOWED_GUESSES ||
    (lastGuess !== undefined && lastGuess.join("") === TARGET);

  // keep focus on the active input; guesses.length changes when a new row
  // becomes active, and runs after that row's inputs have mounted
  useEffect(() => {
    if (!isGameOver) {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, guesses.length, isGameOver]);

  const scoreGuess = (guess: string[], target: string): LetterResult[] => {
    const result: LetterResult[] = Array(ALLOWED_LENGTH).fill("absent");
    const remaining: Record<string, number> = {};

    // first pass: mark correct letters and count remaining letters in target
    guess.forEach((char, index) => {
      if (char === target[index]) {
        result[index] = "correct";
      } else {
        remaining[target[index]] = (remaining[target[index]] || 0) + 1;
      }
    });

    // second pass: mark present letters
    guess.forEach((char, index) => {
      if (result[index] !== "correct" && remaining[char] > 0) {
        result[index] = "present";
        remaining[char]--;
      }
    });
    return result;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGameOver) {
      // show a message
      return;
    }

    //TODO: Check if the guess is a valid word before scoring

    setGuesses([...guesses, word]);
    setWord(Array(ALLOWED_LENGTH).fill(""));
  };

  const handleInputChange = (index: number, value: string) => {
    // only the active input can change, so the word never has gaps
    if (isGameOver || index !== activeIndex) {
      return;
    }
    // only allow letters (or an empty value, which deletes)
    if (!/^[a-zA-Z]?$/.test(value)) {
      return;
    }

    const newWord = [...word];
    newWord[index] = value.toUpperCase();
    setWord(newWord);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // backspace in the empty active input deletes the previous letter
    if (e.key !== "Backspace" || isGameOver || word[index] !== "") {
      return;
    }
    if (index > 0) {
      const newWord = [...word];
      newWord[index - 1] = "";
      setWord(newWord);
    }
  };

  return (
    <Layout>
      {Array.from({ length: ALLOWED_GUESSES }, (_, i) => {
        if (i < guesses.length) {
          return (
            <Row
              key={i}
              state="locked"
              letters={guesses[i]}
              results={scoreGuess(guesses[i], TARGET)}
            />
          );
        }
        if (i === guesses.length && !isGameOver) {
          return (
            <Row
              key={i}
              state="active"
              word={word}
              activeIndex={activeIndex}
              inputRefs={inputRefs}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onSubmit={handleSubmit}
            />
          );
        }
        return <Row key={i} state="empty" />;
      })}
    </Layout>
  );
}
