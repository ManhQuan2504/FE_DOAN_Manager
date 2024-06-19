import { PATH } from '~/constants/part';

//MANAGER
import LoginPage from '~/pages/manager/LoginPage/LoginPage';
import ManagerLayout from '~/components/layout/manager';
import Dashboard from '~/pages/manager/Dashboard';
import ProductFormPage from '~/pages/manager/ProductPage/ProductFormPage';
import ProductListPage from '~/pages/manager/ProductPage/ProductListPage';
import ProductFormPageTEST from '~/pages/manager/ProductPage/ProductFormPageTEST';
import FunctionFormPage from '~/pages/manager/SystemPage/FunctionFormPage';
import FunctionListPage from '~/pages/manager/SystemPage/FunctionListPage';
import AccountPage from '~/pages/manager/AccountPage/AccountPage';

//USER
import UserLayout from '~/components/layout/user';
import Home from '~/pages/user/Home';
import Cart from '~/pages/user/Cart';

export const AppRoutes = [
    //MANAGER
    { path: PATH.MANAGER.LOGIN, component: LoginPage, layout: null },
    { path: PATH.MANAGER.DASHBOARD, component: Dashboard, layout: ManagerLayout },
    { path: PATH.MANAGER.PRODUCTS, component: ProductListPage, layout: ManagerLayout },
    { path: PATH.MANAGER.PRODUCTTEST, component: ProductFormPageTEST, layout: ManagerLayout },
    { path: `${PATH.MANAGER.PRODUCTS}/:id`, component: ProductFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.FUNCTIONS, component: FunctionFormPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.FUNCTIONS}/:id`, component: FunctionListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ACCOUNT}`, component: AccountPage, layout: ManagerLayout },


    //USER
    { path: PATH.HOME, component: Home, layout: UserLayout },
];

