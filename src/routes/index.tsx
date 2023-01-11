import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DetailTask from "../pages/DetailTask";
import Homepage from '../pages'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/detail/:id_task",
        element: <DetailTask />,
    },
])

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default App;