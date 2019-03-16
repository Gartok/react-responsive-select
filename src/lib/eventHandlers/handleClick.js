import containsClassName from '../containsClassName';
import * as actionTypes from '../../constants/actionTypes';

export default function handleClick({
  event,
  state,
  ReactResponsiveSelectClassRef,
}) {
  const {
    multiselect,
    isOptionsPanelOpen,
    isDragging,
    disabled,
    options,
  } = state;

  if (disabled) return;

  if (isDragging === false) {
    /* Disallow natural event flow - don't allow blur to happen from button focus to selected option focus */
    event.preventDefault();

    /* If user is scrolling return TODO add a test for this */
    if (event && containsClassName(event.target, 'rrs__options')) {
      return;
    }

    const optionIndex = parseFloat(event.target.getAttribute('data-key'));

    if (
      (options[optionIndex] && options[optionIndex].disabled === true) ||
      (options[optionIndex] && options[optionIndex].optHeader === true)
    ) {
      return;
    }

    /* Select option index, if user selected option */
    if (containsClassName(event.target, 'rrs__option')) {
      ReactResponsiveSelectClassRef.updateState({
        type: multiselect
          ? actionTypes.SET_MULTISELECT_OPTIONS
          : actionTypes.SET_SINGLESELECT_OPTIONS,
        optionIndex,
      });

      return;
    }

    // When the options panel is open, treat clicking the label/select button as a 'no action'
    if (isOptionsPanelOpen && containsClassName(event.target, 'rrs__label')) {
      ReactResponsiveSelectClassRef.updateState(
        { type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION },
        () => ReactResponsiveSelectClassRef.focusButton(),
      );

      return;
    }

    /* Else user clicked close or open the options panel */
    ReactResponsiveSelectClassRef.updateState(
      {
        type: isOptionsPanelOpen
          ? actionTypes.SET_OPTIONS_PANEL_CLOSED
          : actionTypes.SET_OPTIONS_PANEL_OPEN,
      },
      newState => {
        // After state update, check if focus should be moved to the button
        if (newState.isOptionsPanelOpen === false) {
          ReactResponsiveSelectClassRef.focusButton();
        }
      },
    );
  }
}
