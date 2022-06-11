import { MouseEvent } from "react";

import useGameContext from "../components/GameContext";
import { resolveTutorialStep } from "../model/TutorialStep";
import tutorialSteps from "../tutorial/TutorialSteps";

export default function Tutorial() {
  const { context, settings } = useGameContext();
  const tutorialStep = resolveTutorialStep(
    settings.tutorialStep,
    tutorialSteps,
    context,
  );

  if (
    !tutorialStep ||
    !tutorialStep.enabled ||
    tutorialStep.step !== settings.tutorialStep ||
    tutorialStep.step < 0
  ) {
    return null;
  }

  function validStep(step?: number) {
    return (
      step != null &&
      step != undefined &&
      step >= 0 &&
      step !== settings.tutorialStep &&
      step !== tutorialStep?.step
    );
  }

  function gotoStep(event: MouseEvent<Element>, step?: number) {
    event.preventDefault();
    if (validStep(step)) {
      settings.tutorialStep = step!;
    }
  }

  const tutorial = (
    <div className="tutorial" style={tutorialStep.bounds}>
      <div className="panel">
        {tutorialStep.title != null && tutorialStep.title !== "" && (
          <div className="title-bar">{tutorialStep.title}</div>
        )}
        {tutorialStep.body}
        {validStep(tutorialStep.prevStep) && (
          <div className="prev">
            <a href="" onClick={(e) => gotoStep(e, tutorialStep.prevStep)}>
              {tutorialStep.prevStepTitle}
            </a>
          </div>
        )}
        {validStep(tutorialStep.nextStep) && (
          <div className="next">
            <a href="" onClick={(e) => gotoStep(e, tutorialStep.nextStep)}>
              {tutorialStep.nextStepTitle}
            </a>
          </div>
        )}
        {validStep(tutorialStep.skipToStep) && (
          <div className="skip">
            <a href="" onClick={(e) => gotoStep(e, tutorialStep.skipToStep)}>
              {tutorialStep.skipToStepTitle}
            </a>
          </div>
        )}
      </div>
    </div>
  );

  if (tutorialStep.greyOut) {
    return <div className="greyout">{tutorial}</div>;
  } else {
    return tutorial;
  }
}
