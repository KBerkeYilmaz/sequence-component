import React from "react";
import { ReactFlowProvider } from "reactflow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Launch from "./pages/launch";
import LeadList from "./pages/lead-list";
import Layout from "./layout/Layout";
import NewHome from "./pages/new_home";
import FlowTest from "./pages/flow_test";

const App = () => (
  <ReactFlowProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lead-list" element={<LeadList />} />
          <Route path="/launch" element={<Launch />} />
          <Route path="/new_home" element={<NewHome />} />
          <Route path="/flow_test" element={<FlowTest />} />
        </Routes>
      </Layout>
    </Router>
  </ReactFlowProvider>
);

export default App;
