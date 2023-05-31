import { MAIN_PAGE, PRACTICE, START_ROUTE} from "./utils/consts"

import Start from "./pages/Start"
import Main from "./pages/Main"
import Practice from "./components/Content/Practice"



export const publicRoutes= [
    {
        path:START_ROUTE,
        Component: Start
    },
    {
        path:MAIN_PAGE,
        Component: Main
    },

]
export const mainRoutes= [
    {
        path:PRACTICE,
        Component: Practice
    },
    {
        path:MAIN_PAGE,
        Component: Main
    },

]