"use client";

import { Item } from "./ui/item";

export function GuessLog({ words }: { words: string[] }) {

  return (
    <div className="guess-log">
      <h2>Guess Log</h2>
      <ul>
        {words.map((word, index) => (
          <li className="guess-list" key={index}>
            <Item>{word}</Item>
          </li>
        ))}
      </ul>
    </div>
  );
}
