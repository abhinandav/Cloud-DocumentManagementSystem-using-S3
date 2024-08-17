import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Home from './Components/Home';
import SignUp from './Components/Signup';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<SignIn/>} />
      <Route path='/register' element={<SignUp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
