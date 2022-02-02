import { useQuery } from "@apollo/client";
import { useAuth } from "../util/auth";
import { ME } from "../util/queries";
const Quote = require('inspirational-quotes')

const renderDate = (date) =>
  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

export default function ProtectedPageExample() {
  const { user } = useAuth();
  const { data, loading } = useQuery(ME, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });
  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <p>
        Last Login:{" "}
        {loading
          ? "Loading..."
          : data && renderDate(new Date(data.me.lastLogin))}
      </p>
      <hr />
      <p>Your id is {user._id}</p>
      <p>Your email is {user.email}</p>
      <p>
          {Quote.getQuote().text}
      </p>
      <p>
        -{Quote.getQuote().author}
      </p>
    </div>
  );
}
