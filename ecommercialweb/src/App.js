import Navbar from "./UI/heading";
import Content from "./UI/content";
import Category from "./UI/category";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="grid grid_full-width">
          <div className="grid_row">
            <div className="grid_collumn-2">
              <Category />
            </div>
            <div className="grid_collumn-10">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
