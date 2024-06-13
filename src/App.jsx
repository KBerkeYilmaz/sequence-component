import React from "react";
import { ReactFlowProvider } from "reactflow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SequenceSettings from "./pages/sequence-settings";
import Layout from "./layout/Layout";
import Content from "./pages/content";
import VisualAutomation from "./pages/automation";

const App = () => (
  <ReactFlowProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/sequence-settings" element={<SequenceSettings />} />
          <Route path="/content" element={<Content />} />
          <Route path="/automation" element={<VisualAutomation />} />
        </Routes>
      </Layout>
    </Router>
  </ReactFlowProvider>
);

export default App;
