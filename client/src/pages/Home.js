import { useAuth } from "../util/auth";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
      <hr />
      <p>
      Click <a href="./cogs">here</a> to use the COGS tool: 
      </p>
    </div>
  );
}
