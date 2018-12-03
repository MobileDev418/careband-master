const MAINNAV = "MAINNAV";
const AUTHNAV = "AUTHNAV";
const initState = {
  isMainNav: false // if main is true or not false
};
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case MAINNAV:
      return Object.assign({}, state, {
        isMainNav: true
      });
    case AUTHNAV: {        
      return Object.assign({}, state, {
        isMainNav: false
      });
    }
    default:
      return state;
  }
}
export const onSwitchMainNav = () => {
  return {
    type: MAINNAV
  };
};
export const onSwitchAuthNav = error => {
  return {
    type: AUTHNAV
  };
};
