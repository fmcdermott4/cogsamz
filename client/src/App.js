import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider, useAuth } from "./util/auth";
import Cogs from "./pages/Cogs";
import CogsAdmin from "./pages/CogsAdmin";
import ServicesSelectedTable from "./pages/ServicesSelectedTable";


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <NavigationBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            {/* Use PrivateRoute for pages that should only be accessible to a
            user that has logged in.*/}
            <PrivateRoute path="/user">
              <ProtectedPageExample />
            </PrivateRoute>
            <PrivateRoute path="/cogs">
              <Cogs />
            </PrivateRoute>
            <PrivateRoute path="/cogsadmin">
              <CogsAdmin />
            </PrivateRoute>
            <PrivateRoute path="/servicesselected">
              <ServicesSelectedTable/>
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
