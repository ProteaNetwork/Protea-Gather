import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';


/**
 * Direct selector to the communitiesPage state domain
 */

const selectGlobalDomain = (state: ApplicationRootState) => {
  return state ? state : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommunitiesPage
 */

const selectGlobal = () =>
  createSelector(selectGlobalDomain, substate => {
    return substate;
  });

export default selectGlobal;
export { selectGlobalDomain };
