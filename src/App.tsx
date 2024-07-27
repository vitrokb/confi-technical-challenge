import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Search } from './pages/Search';
import { Order } from './pages/Order';
import { OrderProvider } from './contexts/OrderProvider';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
