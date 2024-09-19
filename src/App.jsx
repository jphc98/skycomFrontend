import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ShowUsers from './components/ShowUsers'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowUsers/>} />        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;


//------------------------------2nd
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import { UsersPage } from "./pages/UsersPage"
// import { UsersFormPage } from "./pages/UsersFormPage";
// import { Navigation } from "./components/Navigation";
// function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Navigate to="users" />} />
//         <Route path="/users" element={<UsersPage />} />
//         <Route path="/users-create" element={<UsersFormPage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;

