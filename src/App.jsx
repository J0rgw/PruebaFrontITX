import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardNav from './components/CardNav/CardNav';
import ListView from './microfrontends/list-view/ListView';
import DetailsView from './microfrontends/details-view/DetailsView';

function App() {
  return (
    <Router>
      <CardNav />
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/product/:id" element={<DetailsView />} />
      </Routes>
    </Router>
  );
}

export default App
