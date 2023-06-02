import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";
import { LangContextProvider } from "../context/LangContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <LangContextProvider>
        <AuthContextProvider>
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </AuthContextProvider>
      </LangContextProvider>
    </>
  );
}
