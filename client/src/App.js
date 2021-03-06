import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider} from "./util/auth";
import Cogs from "./pages/Cogs";
import CogsAdmin from "./pages/CogsAdmin";
import FunctionTest from "./pages/FunctionTest";
import ServicesSelectedTable from "./pages/ServicesSelectedTable";
import Cleaning from "./pages/Cleaning"


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
            <PrivateRoute path="/cleaning">
              <Cleaning/>
            </PrivateRoute>
            <PrivateRoute path="/functiontest">
              <FunctionTest/>
            </PrivateRoute>
            <PrivateRoute path="/cogsadmin">
              <CogsAdmin />
            </PrivateRoute>
            <PrivateRoute path="/cogsassessed">
              <ServicesSelectedTable/>
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
