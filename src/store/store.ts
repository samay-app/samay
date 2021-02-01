import {
  createStore,
  applyMiddleware,
  combineReducers,
  Action,
  Store,
} from "redux";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/reducer";

const combinedReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<{}, Action<any>> = ({ isServer }: any) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  }
  // If it's on client side, create a store which will persist
  // This is necessary to persist global state in client,
  // otherwise auth state perish on reload or rehydrate

  const persistConfig = {
    key: "nextjs",
    whitelist: ["authReducer"], // only authReducer will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

  const store: Store<{}, Action<any>> = createStore(
    persistedReducer,
    bindMiddleware([thunkMiddleware])
  ); // Creating the store again

  return store;
};

// Export the wrapper & wrap the pages/_app.ts with this wrapper only
export const wrapper = createWrapper(makeStore); // TODO: find type for `makeStore`
