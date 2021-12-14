import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/Auth";
import PrivateRoute from "./helpers/PrivateRoute";
import Checkout from "./pages/checkout/Checkout";
import Home from "./pages/home/Home";
import Travel from "./pages/travel/Travel";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path='/travel' element={<Travel/>} />
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/checkout' element={<Checkout/>} />
          </Route>
          {/* <PrivateRoute exact path='/checkout' element={<Checkout/>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
