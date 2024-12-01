import "../layout/css/layout.css";
import "../layout/css/content.css";
import "../layout/css/responsive.css";
import { useEffect, useState } from 'react';

let fetchProducts = async (user) => {
  try {
      let response = await fetch('http://localhost:5000/api/products/', { 
          method:'GET',
          mode:'cors',
          headers: {
          'Content-Type': 'application/json' ,
          'Accept': 'application/json',            
      },
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(user)
      })
          
      if (response.ok) {
          console.log("ok")
          return response.json();
      } else {
          console.log("Something went wrong")
      }
  } catch(err) {
      console.log(err) 
  }   
}

function Content() {

  let [products, setProducts] = useState()


  useEffect(() => {

    fetchProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  //click on the first product in the list to test the api call
  let test = (e) => {
    e.preventDefault()
    console.log(products)
  }


  // will need to use map on the products array and for each of them we generate the html with the product properties ex product.name, product.price, product.image
  return (
    <div className="home-product">
      {/* product item */}
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/chairproduct2.webp)",
            }}
            className="home-product-item_img"
            //needed a way to check that im getting the products
            onClick={test}
          />
          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>

      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/headphoneproduct4.jpg)",
            }}
            className="home-product-item_img"
          />
          <h4 className="home-product-item_name">Gaming Headphone USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/mouseproduc1.jpg)",
            }}
            className="home-product-item_img"
          />
          <h4 className="home-product-item_name">Gaming mouse USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/monitorproduct5.avif)",
            }}
            className="home-product-item_img"
          />
          <h4 className="home-product-item_name">Gaming Monitor</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
      <div className="grid_collumn-2-4">
        <div className="home-product-item">
          <div
            style={{
              backgroundImage: "url(./img/keyboardproduct3.jpg)",
            }}
            className="home-product-item_img"
          />
  

          <h4 className="home-product-item_name">Gaming chair USA</h4>
          <div className="home-product-item_price">500$</div>
        </div>
      </div>
    </div>
  );
}

export default Content;
