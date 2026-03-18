import { useState } from "react";
import "./CardSpread.css";
import PlainButton from "../buttons/plainButton";

const CARD_PER_ROW = 3;
const TOTAL_CARDS = 6;

export default function CardSpread() {
  const [spread, setSpread] = useState(false);

  return (
    <div className="grid">
      <ul className="list">
        {[...Array(TOTAL_CARDS)].map((_, i) => {
          const col = i % CARD_PER_ROW;
          const row = Math.floor(i / CARD_PER_ROW);

          return (
            <li
              key={i}
              className="card"
              style={
                spread
                  ? {
                      transform: `
                        translate(
                          calc(-${col} * (var(--card-width) + var(--card-gap))),
                          calc(-${row} * (var(--card-width) * 7 / 4 + var(--card-gap)))
                        )
                      `,
                    }
                  : {}
              }
            />
          );
        })}
      </ul>

      <div className="flex justify-center mt-6">
        <PlainButton
          variant="primary"
          label={spread ? "Stack" : "Spread"}
          onClick={() => setSpread((prev) => !prev)}
        />
      </div>
    </div>
  );
}
