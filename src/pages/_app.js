import Wrapper from "@/components/Wrapper";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import RootReducer from "@/Store/RootReducer";

const store = createStore(RootReducer, applyMiddleware(thunk));

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
