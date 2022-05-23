import React from "react";
import { genHints, Board, genBoardState } from "../model/Board";
import { useResources } from "./GameContext";
import BuyButton from "./BuyButton";
import ResourceRender from "./ResourceRender";
import { hintFormula } from "../utils/formulas";

const BoardControls: React.FC<{
  board: Board;
  setBoard: (board: Board) => void;
}> = ({ board, setBoard }) => {
  const { rows, cols, difficulty, hintQuality, hints, losses } = useResources();

  const boardSizeChanged =
    board.rows !== rows.value() || board.cols !== cols.value();

  function getHint() {
    if (genHints(board, 1, 0, 8, hintFormula(hintQuality)) > 0) {
      hints.extra.manual++;
      setBoard({ ...board });
    }
  }

  function reset() {
    board.state = "lost";
    setBoard(genBoardState(board));
    losses.count++;
    losses.extra.manual++;
  }

  return (
    <div>
      <div className="board-controls panel">
        <div className="title-bar">Upgrades</div>

        <div className="quarter">Game Width:</div>
        <div className="quarter">
          <ResourceRender
            resource={cols}
            showChrome={true}
            infix={""}
            className={"value-first"}
          />
        </div>
        <div className="right half">
          <BuyButton resource={cols} prefix={"Expand"} />
        </div>

        <div className="quarter">Game Height:</div>
        <div className="quarter">
          <ResourceRender
            resource={rows}
            showChrome={true}
            infix={""}
            className={"value-first"}
          />
        </div>
        <div className="right half">
          <BuyButton resource={rows} prefix={"Expand"} />
        </div>

        <div className="quarter">Game Difficulty:</div>
        <div className="quarter">
          <ResourceRender
            resource={difficulty}
            showChrome={true}
            showName={false}
            infix={""}
            className={"value-first"}
          />
        </div>
        <div className="right half">
          <BuyButton resource={difficulty} prefix={"Increase"} />
        </div>
        <div className="half"></div>
        <div className="right half">
          <BuyButton
            resource={difficulty}
            prefix={"Decrease"}
            gainMultiplier={-1}
          />
        </div>

        <div className="quarter">Hint Quality:</div>
        <div className="quarter">
          <ResourceRender
            resource={hintQuality}
            showChrome={true}
            showName={false}
            infix={""}
            className={"value-first"}
          />
        </div>
        <div className="right half">
          <BuyButton resource={hintQuality} prefix={"Improve"} />
        </div>
        <div className="half"></div>
        <div className="right half">
          <BuyButton resource={hints} prefix={"Get"} onPurchase={getHint} />
        </div>
        {boardSizeChanged && (
          <div className="left">
            On reset, game board will change to size to
            {` ${rows.value()}x${cols.value()}`}
          </div>
        )}

        {boardSizeChanged && (
          <div className="right quarter">
            <input type="button" value="Reset Now!" onClick={reset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardControls;
