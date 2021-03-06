import * as act from "src/actions/types";
import set from "lodash/fp/set";

const DEFAULT_STATE = {
  proposalsList: null,
  proposalDetails: null
};

const proposalBilling = (state = DEFAULT_STATE, action) =>
  action.error
    ? state
    : (
        {
          [act.RECEIVE_SPENDING_SUMMARY]: () =>
            set("proposalsList", action.payload.proposals)(state),
          [act.RECEIVE_SPENDING_DETAILS]: () =>
            set("proposalDetails", action.payload.details)(state),
          [act.RECEIVE_PAY_APPROVED]: () => DEFAULT_STATE,
          [act.RECEIVE_CMS_LOGOUT]: () => DEFAULT_STATE
        }[action.type] || (() => state)
      )();

export default proposalBilling;
