import MainContent from "./components/MainContent";
import SingleStudyResourcePage from "./components/SingleStudyResourcePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

function App(): JSX.Element {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route
            path="/resource/:resource_id/:user_id"
            element={<SingleStudyResourcePage />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
