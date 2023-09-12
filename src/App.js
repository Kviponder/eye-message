import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider
import client from "./index"; // Import your Apollo Client instanc

import Home from "./components/home";
// import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import Signup from "./components/signup";
import Login from "./components/Login";
import MessageList from "./components/messageList";
import Navbar from "./components/navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messageList" element={<MessageList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
