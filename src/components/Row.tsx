import { Button } from "./ui/button";
import { Cell } from "./Cell";
import { ALLOWED_LENGTH } from "../constants";

type LetterResult = "correct" | "present" | "absent";

type LockedRowProps = {
  state: "locked";
  letters: string[];
  results: LetterResult[];
};

type ActiveRowProps = {
  state: "active";
  word: string[];
  activeIndex: number;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

type EmptyRowProps = {
  state: "empty";
};

type RowProps = LockedRowProps | ActiveRowProps | EmptyRowProps;

export function Row(props: RowProps) {
  switch (props.state) {
    case "locked":
      return (
        <div className="flex">
          {props.letters.map((char, index) => (
            <Cell key={index} letter={char} result={props.results[index]} />
          ))}
        </div>
      );
    case "active":
      return (
        <form data-testid="active-row" onSubmit={props.onSubmit}>
          {props.word.map((char, index) => (
            <input
              key={index}
              value={char}
              ref={(el) => {
                props.inputRefs.current[index] = el;
              }}
              className="p-2 border border-gray-300 font-bold mx-1 w-9 h-9 text-center text-lg"
              aria-label={`active-row-cell-${index}`}
              name={`${index}`}
              type="text"
              onChange={(e) => props.onChange(index, e.target.value)}
              onKeyDown={(e) => props.onKeyDown(index, e)}
              // clicking an out-of-sequence input sends focus to the active one
              onFocus={() => {
                if (index !== props.activeIndex) {
                  props.inputRefs.current[props.activeIndex]?.focus();
                }
              }}
              maxLength={1}
              required
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      );

    case "empty":
      return (
        <div className="flex">
          {Array(ALLOWED_LENGTH)
            .fill("")
            .map((_, index) => (
              <Cell key={index} letter="" result={null} />
            ))}
        </div>
      );
  }
}
