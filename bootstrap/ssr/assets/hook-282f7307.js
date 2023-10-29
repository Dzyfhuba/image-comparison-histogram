import { createTypedHooks } from "easy-peasy";
const typedHooks = createTypedHooks();
const useStoreActions = typedHooks.useStoreActions;
typedHooks.useStoreDispatch;
const useStoreState = typedHooks.useStoreState;
export {
  useStoreActions as a,
  useStoreState as u
};
