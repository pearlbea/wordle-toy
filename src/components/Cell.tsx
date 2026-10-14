import { COLORS } from "../constants";

export function Cell({
  letter,
  result,
}: {
  letter: string;
  result: "correct" | "present" | "absent" | null;
}) {
  return (
    <div
      className="flex border border-gray-300 font-bold text-lg m-1 w-9 h-9 justify-center items-center "
      style={{
        backgroundColor: result ? COLORS[result] : "",
        color: result ? "white" : "black",
      }}
    >
      {letter}
    </div>
  );
}
