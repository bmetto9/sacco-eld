import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Travel from "./pages/travel/Travel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/travel' element={<Travel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
