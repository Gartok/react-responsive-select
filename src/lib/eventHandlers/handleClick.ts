import * as actionTypes from '../../constants/actionTypes';

import { IState } from '../../types/';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { containsClassName } from '../containsClassName';

interface TArgs {
  event: MouseEvent | KeyboardEvent;
  state: IState;
  RRSClassRef: ReactResponsiveSelect;
}

export function handleClick({ event, state, RRSClassRef }: TArgs): void {
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

    if (event && containsClassName(event.target as HTMLElement, 'rrs__options')) {
      return;
    }

    const value = parseFloat(
      (event.target as any).getAttribute('data-key'),
    );

    if (options[value] && (options[value].disabled === true || options[value].optHeader === true)) {
      return;
    }

    /* Select option index, if user selected option */
    if (containsClassName(event.target as HTMLElement, 'rrs__option')) {
      RRSClassRef.updateState({
        type: multiselect
          ? actionTypes.SET_MULTISELECT_OPTIONS
          : actionTypes.SET_SINGLESELECT_OPTIONS,
        value,
      });

      return;
    }

    /*
      When the options panel is open, treat clicking the label/select button
      or the background overlay on small screen as a 'no action'
    */
    if (
      isOptionsPanelOpen &&
      // button on desktop (rrs__label) or overlay on small screen (rrs)
      (containsClassName(event.target as HTMLElement, 'rrs__label') ||
        containsClassName(event.target as HTMLElement, 'rrs')
        || containsClassName(event.target as HTMLElement, 'button_close'))
    ) {
      RRSClassRef.updateState(
        {
          type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION
        },
        () => RRSClassRef.focusButton(),
      );

      return;
    }

    /* Else user clicked close or open the options panel */
    RRSClassRef.updateState(
      {
        type: isOptionsPanelOpen
          ? actionTypes.SET_OPTIONS_PANEL_CLOSED
          : actionTypes.SET_OPTIONS_PANEL_OPEN,
      },
      (newState: IState) => {
        // After state update, check if focus should be moved to the button
        if (newState.isOptionsPanelOpen === false) {
          RRSClassRef.focusButton();
        }
      },
    );
  }
}
