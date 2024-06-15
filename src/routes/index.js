
import { PATH } from '~/constants/part';

//MANAGER
import ManagerLayout from '~/components/layout/manager';
import Dashboard from '~/pages/manager/Dashboard';
import ProductFormPage from '~/pages/manager/ProductPage/ProductFormPage';
import ProductListPage from '~/pages/manager/ProductPage/ProductListPage';

//USER
import UserLayout from '~/components/layout/user';
import Home from '~/pages/user/Home';
import Cart from '~/pages/user/Cart';

export const AppRoutes = [
    //MANAGER
    { path: PATH.MANAGER.DASHBOARD, component: Dashboard, layout: ManagerLayout },
    { path: PATH.MANAGER.PRODUCT, component: ProductFormPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.PRODUCT}/:id`, component: ProductListPage, layout: ManagerLayout },


    //USER
    { path: PATH.HOME, component: Home, layout: UserLayout },
];

