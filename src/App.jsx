import Navbar from './components/navbar/Navbar'
import Banner from './assets/Banner.png'
import HomeCatalog from './components/homeCatalog/HomeCatalog'
import Footer from './components/footer/Footer'
import FeaturedProduct from './components/featuredProducts/featuredProduct'


function App() {
  return (
    <>
      <Navbar />
      <div className="relative w-full mx-auto overflow-hidden">
        <div className="aspect-[1440/420] max-h-[420px] xl:aspect-[1920/420]">
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            alt="Banner"
            src={Banner}
          />
        </div>
      </div>
      <HomeCatalog/>
     <FeaturedProduct/>
      <Footer/>
    </>
  )
}

export default App
