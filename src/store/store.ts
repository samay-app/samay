import { createStore, applyMiddleware, combineReducers } from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth/reducer";
import { authState } from "./auth/state";

const combinedReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof combinedReducer>


// BINDING MIDDLEWARE
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }: any) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    // This is necessary to persist global state in client,
    // otherwise auth state perish on reload or rehydrate
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["authReducer"], // only authReducer will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    // store.__persistor = persistStore(store); 
    // Commenting this hack and creating persistor manually in _app.tsx
    // Will use it case of SSR issues.
    // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    // TODO : Add type to `__persistor`, if anyone has any idea, ;_; please try here.

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.ts with this wrapper only
export const wrapper = createWrapper(makeStore); // TODO: find type for `makeStore`
