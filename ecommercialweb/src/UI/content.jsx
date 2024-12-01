import "../layout/css/layout.css";
import "../layout/css/content.css";
import "../layout/css/responsive.css";
import { useEffect, useState } from 'react';
import {useQuery } from 'react-query'

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

  let [ products, setProducts] = useState([])
  let [ isloading, setLoading ] = useState(false)



  useEffect(() => {
    setLoading(true)
    const fetchProducts = async (e) => {
      try {
        await fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        


        
      } catch (err) {
        console.log(err)
      }
    }

    fetchProducts()
    
    setLoading(false)
    
    
  }, [])

  if (isloading) {
    return (
      <div>
      <p>Loading</p>
      </div> 
    )  
  }

  // products need to have proper paths to images setup in database so i can call prod.image to get the picture.
  return (
    <>
      <div className='home-product'>
        {products.map((prod) => 
          <div className="grid_collumn-2-4" key = {prod._id}>
          <div className="home-product-item">
          <div
              style={{
                backgroundImage: "url(./img/chairproduct2.webp)",
              }}
              className="home-product-item_img"
              
          />
            <h4 className="home-product-item_name">{prod.name}</h4>
            <div className="home-product-item_price">{prod.price}</div>
          </div>
        </div>
        )}
      </div>
    </>
  )

  }

  // will need to use map on the products array and for each of them we generate the html with the product properties ex product.name, product.price, product.image
  // return (
  //   <div className="home-product">
  //     {/* product item */}
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/chairproduct2.webp)",
  //           }}
  //           className="home-product-item_img"
  //           //needed a way to check that im getting the products
  //           onClick={test}
  //         />
  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>

  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/headphoneproduct4.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  //         <h4 className="home-product-item_name">Gaming Headphone USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/mouseproduc1.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  //         <h4 className="home-product-item_name">Gaming mouse USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/monitorproduct5.avif)",
  //           }}
  //           className="home-product-item_img"
  //         />
  //         <h4 className="home-product-item_name">Gaming Monitor</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //     <div className="grid_collumn-2-4">
  //       <div className="home-product-item">
  //         <div
  //           style={{
  //             backgroundImage: "url(./img/keyboardproduct3.jpg)",
  //           }}
  //           className="home-product-item_img"
  //         />
  

  //         <h4 className="home-product-item_name">Gaming chair USA</h4>
  //         <div className="home-product-item_price">500$</div>
  //       </div>
  //     </div>
  //   </div>
  // );


export default Content;
