import ProductCard from './components/productCard'
import './App.css'

function App() {

  return (
    <>
      <h1 className='text-blue-400'>Nonim Udara</h1>
      <ProductCard name="Apple iPad" price="$1299" image="https://www.apple.com/assets-www/en_WW/ipad/product_tile/medium/ipad_pro_e6b913694_2x.png" />
      <ProductCard name="Apple iPhone" price="$899" image="https://www.apple.com/assets-www/en_WW/ipad/product_tile/medium/ipad_pro_e6b913694_2x.png"/>

    </>
  )
}

export default App
