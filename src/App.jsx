import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import TeachersList from './pages/Teachers/Teachers';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<TeachersList />} />
    </Routes>
  )
}
export default App;