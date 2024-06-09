import "./App.css";
import Contact from "./pages/Contact";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./layouts/SharedLayout";
import NotFound from "./pages/NotFound";

import CustomImageList from "./gallery/CustomImageList";
import Favorite from "./gallery/Favorite";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="images" element={<CustomImageList />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
