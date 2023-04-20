import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </AuthContextProvider>
    </>
  );
}
