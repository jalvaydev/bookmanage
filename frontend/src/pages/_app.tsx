import "tailwindcss/tailwind.css";
import { useApollo } from "../libs/apolloClient";
import { ApolloProvider } from "@apollo/client";

const MyApp = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
