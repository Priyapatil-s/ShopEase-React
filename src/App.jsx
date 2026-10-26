import './App.css';
import {Button,Typography, Box} from '@mui/material'
import Navbar from './component/Navbar.jsx'
import { Routes, Route } from 'react-router-dom';
import  Home  from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import DailyFreshEssentials from './pages/DailyFreshEssentials';
import Fashion from './pages/Fashion';
import AdminAnalytics from './pages/AdminAnalytics';
import Categories from './pages/Categories';

function App() {


  return (
  <>
      <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path ='/Product' element ={<Product />} />
           <Route path='/dailyFreshEssentials' element ={<DailyFreshEssentials />} />
          <Route path='/fashion' element ={<Fashion />} />
           <Route path='/admin/analytics' element={<AdminAnalytics />} />
           <Route path='/categories' element={<Categories />} />
        </Routes>
  </>
  )
}

export default App
