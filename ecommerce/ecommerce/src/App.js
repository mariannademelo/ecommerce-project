import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./LandingPage/LandingPage";
import useFetch from "./LandingPage/useFetch";
import NavBar from "./NavBar";
import Collections from "./Collections";
import ProductDetails from "./ProductDetails";
import GenderCollection from "./GenderCollection";
import ClothingCategory from "./LandingPage/ClothingCategory";
import { useState } from "react/cjs/react.development";

function App() {

  const { error, data: allProducts, isPending } = useFetch('http://localhost:7000/all-products')
  const [ cart, setCart ] = useState(false)

  return (
    <Router>
      <div className="App">
        <NavBar 
        cart={cart} 
        setCart={setCart}/>

        <div className="content">
          <Switch>
            <Route exact path='/'>
              {isPending && <div>loading</div>}
              {error && <div>{ error }</div>}
              {allProducts && <LandingPage allProducts={allProducts} />}
            </Route>

            <Route path='/colecoes'>
              <Collections />
            </Route>

            <Route path='/novidades'>
              {allProducts && <Collections title={'novidades'} groupCol={"newArrivals"} allProducts={allProducts}/>}
            </Route>

            {/* Detalhes do produto */}

            <Route path='/produtos/:id'>
              <ProductDetails cart={cart} setCart={setCart} />
            </Route>

            {/* P A R A   M E N I N A S */}

            <Route exact path='/meninas'>
              {allProducts && <GenderCollection title={'meninas'} gender={"meninas"} allProducts={allProducts}/>}
            </Route>

            <Route path='/meninas/blusas'>
              {allProducts && <ClothingCategory title={'blusas para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"blusa"}/>}
            </Route>

            <Route path='/meninas/casacos'>
              {allProducts && <ClothingCategory title={'casacos para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"jaqueta"}/>}
            </Route>

            <Route path='/meninas/pijamas'>
              {allProducts && <ClothingCategory title={'pijamas para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"pijamas"}/>}
            </Route>

            <Route path='/meninas/vestidos'>
              {allProducts && <ClothingCategory title={'vestidos para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"vestido"}/>}
            </Route>

            <Route path='/meninas/tops'>
              {allProducts && <ClothingCategory title={'tops para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"top"}/>}
            </Route>

            <Route path='/meninas/pulover'>
              {allProducts && <ClothingCategory title={'pulôver para meninas'} 
              gender={"meninas"} allProducts={allProducts} clothingCategory={"pulover"}/>}
            </Route>

            {/* P A R A   M E N I N O S */}

            <Route exact path='/meninos'>
              {allProducts && <GenderCollection title={'meninos'} gender={"meninos"} allProducts={allProducts}/>}
            </Route>

            <Route path='/meninos/casacos'>
              {allProducts && <ClothingCategory title={'casacos para meninos'} 
              gender={"meninos"} allProducts={allProducts} clothingCategory={"casaco"}/>}
            </Route>

            <Route path='/meninos/calças'>
              {allProducts && <ClothingCategory title={'calças para meninos'} 
              gender={"meninos"} allProducts={allProducts} clothingCategory={"calça"}/>}
            </Route>

            <Route path='/meninos/blusas'>
              {allProducts && <ClothingCategory title={'blusas para meninos'} 
              gender={"meninos"} allProducts={allProducts} clothingCategory={"blusa"}/>}
            </Route>

            <Route path='/meninos/jaquetas'>
              {allProducts && <ClothingCategory title={'jaquetas para meninos'} 
              gender={"meninos"} allProducts={allProducts} clothingCategory={"jaqueta"}/>}
            </Route>

            {/* P A R A   B E B Ê S */}

            <Route exact path='/bebes'>
              {allProducts && <GenderCollection title={'bebês'} gender={"bebes"} allProducts={allProducts}/>}
            </Route>

            <Route path='/bebes/calças'>
              {allProducts && <ClothingCategory title={'calças para bebes'} 
              gender={"bebes"} allProducts={allProducts} clothingCategory={"calça"}/>}
            </Route>

            <Route path='/bebes/bodies'>
              {allProducts && <ClothingCategory title={'bodies para bebes'} 
              gender={"bebes"} allProducts={allProducts} clothingCategory={"body"}/>}
            </Route>

            <Route path='/bebes/jaquetas'>
              {allProducts && <ClothingCategory title={'jaquetas para bebes'} 
              gender={"bebes"} allProducts={allProducts} clothingCategory={"jaqueta"}/>}
            </Route>

            <Route path='/bebes/blusas'>
              {allProducts && <ClothingCategory title={'blusas para bebes'} 
              gender={"bebes"} allProducts={allProducts} clothingCategory={"blusa"}/>}
            </Route>

            <Route path='/bebes/macacoes'>
              {allProducts && <ClothingCategory title={'macacões para bebes'} 
              gender={"bebes"} allProducts={allProducts} clothingCategory={"macacão"}/>}
            </Route>

          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
