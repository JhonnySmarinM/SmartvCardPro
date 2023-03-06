import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/products" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contact />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
