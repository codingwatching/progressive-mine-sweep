import BuyButton from "../components/BuyButton";
import useGameContext from "../components/GameContext";
import Icon from "../components/Icon";
import ModeControls from "../components/ModeControls";
import ResourceBar from "../components/ResourceBar";
import ResourceRender from "../components/ResourceRender";
import ToggleButton from "../components/ToggleButton";

export default function Automation() {
  const {
    resources: {
      rows,
      cols,
      revealNeighbors,
      autoRevealNeighbors,
      autoFlagMines,
      hintQuality,
      hintsCount,
      autoRevealHints,
      autoPurchaseHints,
      autoResetGame,
      resetSpeed,
    },
  } = useGameContext();

  return (
    <div id="automation">
      <ResourceBar />
      <ModeControls showTapMode={false} />

      <div className="game-controls panel">
        <div className="title-bar">Cell Automation</div>

        <div className="half">
          <ResourceRender
            resource={autoRevealNeighbors}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${
              autoRevealNeighbors.count === 1 ? "" : "s"
            } a minute`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={autoRevealNeighbors}
            allowUnlocking={true}
            enabled={revealNeighbors.unlocked && revealNeighbors.count > 0}
            prefix={!autoRevealNeighbors.unlocked ? "Unlock" : "Additional"}
          />
        </div>
        <div className="full right">
          Enabled:
          <ToggleButton
            checked={
              autoRevealNeighbors.unlocked && !autoRevealNeighbors.disabled
            }
            onChange={(checked) => (autoRevealNeighbors.disabled = !checked)}
            checkedContents={<Icon icon="robot" />}
            unCheckedContents={<Icon icon="robot-off" />}
            enabled={
              autoRevealNeighbors.unlocked && autoRevealNeighbors.count > 0
            }
          />
        </div>
        <div className="full computed">
          Automatically reveals the neighboring hidden squares if all the mines
          around it have been flagged.
        </div>

        <div className="half">
          <ResourceRender
            resource={revealNeighbors}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${revealNeighbors.count === 1 ? "" : "s"} per run`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={revealNeighbors}
            allowUnlocking={true}
            enabled={cols.count > 3 && rows.count > 3}
            prefix={
              !revealNeighbors.unlocked
                ? "Unlock"
                : revealNeighbors.count < (revealNeighbors.maxCount ?? Infinity)
                ? "Additional"
                : "Maxed out!"
            }
          />
        </div>

        <hr className="separator" />

        <div className="half">
          <ResourceRender
            resource={autoFlagMines}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${autoFlagMines.count === 1 ? "" : "s"} a minute`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={autoFlagMines}
            allowUnlocking={true}
            enabled={
              autoRevealNeighbors.unlocked && autoRevealNeighbors.count > 0
            }
            prefix={!autoFlagMines.unlocked ? "Unlock" : "Additional"}
          />
        </div>
        <div className="full right">
          Enabled:
          <ToggleButton
            checked={autoFlagMines.unlocked && !autoFlagMines.disabled}
            onChange={(checked) => (autoFlagMines.disabled = !checked)}
            checkedContents={<Icon icon="robot" />}
            unCheckedContents={<Icon icon="robot-off" />}
            enabled={autoFlagMines.unlocked && autoFlagMines.count > 0}
          />
        </div>
        <div className="full computed">
          Automatically flags the hidden mines around a square if there are no
          more hidden clear squares left around it.
        </div>

        <hr className="separator" />

        <div className="half">
          <ResourceRender
            resource={autoRevealHints}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${autoRevealHints.count === 1 ? "" : "s"} a minute`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={autoRevealHints}
            allowUnlocking={true}
            prefix={!autoRevealHints.unlocked ? "Unlock" : "Additional"}
          />
        </div>
        <div className="full right">
          Enabled:
          <ToggleButton
            checked={autoRevealHints.unlocked && !autoRevealHints.disabled}
            onChange={(checked) => (autoRevealHints.disabled = !checked)}
            checkedContents={<Icon icon="robot" />}
            unCheckedContents={<Icon icon="robot-off" />}
            enabled={autoRevealHints.unlocked && autoRevealHints.count > 0}
          />
        </div>
        <div className="full computed">
          Automatically reveals any purchased hints.
        </div>

        <div className="half">
          <ResourceRender
            resource={autoPurchaseHints}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${autoPurchaseHints.count === 1 ? "" : "s"} a minute`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={autoPurchaseHints}
            allowUnlocking={true}
            prefix={!autoPurchaseHints.unlocked ? "Unlock" : "Additional"}
          />
        </div>
        <div className="full right">
          Enabled:
          <ToggleButton
            checked={autoPurchaseHints.unlocked && !autoPurchaseHints.disabled}
            onChange={(checked) => (autoPurchaseHints.disabled = !checked)}
            checkedContents={<Icon icon="robot" />}
            unCheckedContents={<Icon icon="robot-off" />}
            enabled={autoPurchaseHints.unlocked && autoPurchaseHints.count > 0}
          />
        </div>
        <div className="full computed">
          Automatically makes a hint purchase when there are no other actions
          available.
        </div>

        <div className="quarter">Hints per run:</div>
        <div className="quarter">
          <ResourceRender
            resource={hintsCount}
            showChrome={true}
            infix=""
            className="value-first"
          />
        </div>
        <div className="right half">
          <BuyButton resource={hintsCount} prefix="Improve" />
        </div>

        <div className="quarter">Hint Quality:</div>
        <div className="quarter">
          <ResourceRender
            resource={hintQuality}
            showChrome={true}
            showName={false}
            infix=""
            className="value-first"
          />
        </div>
        <div className="right half">
          <BuyButton resource={hintQuality} prefix="Improve" maxCount={100} />
        </div>
      </div>

      <div className="game-controls panel">
        <div className="title-bar">Game Automation</div>

        <div className="half">
          <ResourceRender
            resource={autoResetGame}
            showChrome={true}
            showLocked={true}
            infix=""
            suffix={`time${autoResetGame.count === 1 ? "" : "s"} a minute`}
          />
        </div>
        <div className="right half">
          <BuyButton
            resource={autoResetGame}
            allowUnlocking={true}
            prefix={!autoResetGame.unlocked ? "Unlock" : "Additional"}
          />
        </div>
        <div className="full right">
          Enabled:
          <ToggleButton
            checked={autoResetGame.unlocked && !autoResetGame.disabled}
            onChange={(checked) => (autoResetGame.disabled = !checked)}
            checkedContents={<Icon icon="robot" />}
            unCheckedContents={<Icon icon="robot-off" />}
            enabled={autoResetGame.unlocked && autoResetGame.count > 0}
          />
        </div>
        <div className="full computed">
          Automatically initiates game reset when the game is either won or
          lost.
        </div>

        <div className="quarter">Reset Speed:</div>
        <div className="quarter">
          <ResourceRender
            resource={resetSpeed}
            showChrome={true}
            showName={false}
            infix=""
            className="value-first"
          />
        </div>
        <div className="right half">
          <BuyButton resource={resetSpeed} prefix="Speed up" maxCount={100} />
        </div>
      </div>

      <div className="game-controls panel">
        <div className="title-bar">Board Automation</div>

        <div className="full computed">Nothing here for now...</div>
      </div>
    </div>
  );
}
