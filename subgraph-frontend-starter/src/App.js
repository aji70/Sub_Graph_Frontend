import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transfers, setTransfers] = useState([]);

  const queryUrl =
    "https://api.studio.thegraph.com/query/57950/first/version/latest";

  const client = new ApolloClient({
    uri: queryUrl,
    cache: new InMemoryCache(),
  });

  const getTransfers = gql`
    query {
      transfers(first: 5) {
        id
        sender
        reciever
        amount
      }
    }
  `;

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const { data } = await client.query({ query: getTransfers });

        setTransfers(data.transfers);
      } catch (error) {
        console.log("unable to fetch data", error);
      }
    };

    fetchTransfers();

    return () => {};
  }, [client, getTransfers]);

  return (
    <>
      <div>
        <h1>Tranfer result</h1>

        {transfers !== null &&
          transfers.length > 0 &&
          transfers.map((transfer) => (
            <div key={transfer.id}>
              <h4>sender: {transfer.sender}</h4>
              <h4>reciever: {transfer.reciever}</h4>
              <h4>amount: {transfer.amount}</h4>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
