import ProductCard from './pages/productCard';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css'
import AdminPage from './components/adminPage';
import HomePage from './pages/homePage';

function App() {

  return (
    <>
      {/* <h1 className='text-[#becbdb] text-[100px]'>Nonim Udara</h1>
      <ProductCard name="Apple iPad" price="$1299" image="https://www.apple.com/assets-www/en_WW/ipad/product_tile/medium/ipad_pro_e6b913694_2x.png" />
      <ProductCard name="Apple iPhone" price="$899" image="https://www.apple.com/assets-www/en_WW/ipad/product_tile/medium/ipad_pro_e6b913694_2x.png"/> */}
      {/* <div className='h-[700px] w-[700px] relative border-[5px] flex justify-center items-center '> */}
      {/* <div className='w-[600px] h-[600px] bg-yellow-300 flex flex-row justify-center items-center'>
          <div className='w-[100px] h-[100px] bg-red-500'>

          </div>
          <div className='w-[100px] h-[100px] absolute top-[10px] right-[10px] bg-blue-500 '>

          </div>
          <div className='w-[100px] h-[100px] bg-green-500'>

          </div>
          <div className='w-[100px] h-[100px] fixed right-[10px] bottom-[10px] bg-pink-500'>

          </div>
          <div className='w-[100px] h-[100px] bg-gray-500'>

          </div>
        </div> */}

      {/* <div className='w-[300px] h-[300px] relative bg-blue-300 flex flex-row justify-center items-center'>
          <button className='bg-red-500 absolute top-[5px] right-[5px] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'>
            x
          </button>
          <button className='bg-green-500 fixed bottom-[5px] right-[5px] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300'>
            chat with whatsapp
          </button>
          <h1>
            Hello World...?
          </h1>
        </div>
        <div className='w-[300px] h-[300px] top-[10px] left-[10px] bg-yellow-300 p-[40px] m-[20px]'>
          <div className='w-[100px] h-[100px] bg-red-500 m-[10px]'>

          </div>
          <div className='w-[100px] h-[100px] bg-blue-500'>

          </div>
        </div>

      </div> */}
      <BrowserRouter>
        <div className="w-full h-[100vh] bg-amber-400 ">
          <Routes path="/">
            <Route path="/*" element={<HomePage />} />
            <Route path="/register" element={<h1>Register</h1>} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
