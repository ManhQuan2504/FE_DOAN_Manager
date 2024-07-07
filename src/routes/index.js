import { PATH } from '~/constants/part';

//MANAGER
import LoginPage from '~/pages/manager/LoginPage/LoginPage';
import ManagerLayout from '~/components/manager/layout';
import Dashboard from '~/pages/manager/Dashboard';
import AccountPage from '~/pages/manager/AccountPage/AccountPage';

import ProductFormPage from '~/pages/manager/ProductPage/ProductFormPage';
import ProductListPage from '~/pages/manager/ProductPage/ProductListPage';
import ProductFormPageTEST from '~/pages/manager/ProductPage/ProductFormPageTEST';

import FunctionFormPage from '~/pages/manager/SystemPage/FunctionFormPage';
import FunctionListPage from '~/pages/manager/SystemPage/FunctionListPage';
import RoleFormPage from '~/pages/manager/SystemPage/RoleFormPage';
import RoleListPage from '~/pages/manager/SystemPage/RoleListPage';

import CategoryFormPage from '~/pages/manager/masterDataPage/CategoryFormPage';
import CategoryListPage from '~/pages/manager/masterDataPage/CategoryListPage';
import UomFormPage from '~/pages/manager/masterDataPage/UomFormPage';
import UomListPage from '~/pages/manager/masterDataPage/UomListPage';
import TaxFormPage from '~/pages/manager/masterDataPage/TaxFormPage';
import TaxListPage from '~/pages/manager/masterDataPage/TaxListPage';

//USER
import UserLayout from '~/components/user/layout';
import Home from '~/pages/user/Home';
import Cart from '~/pages/user/Cart';

export const AppRoutes = [
    //MANAGER
    { path: PATH.MANAGER.LOGIN, component: LoginPage, layout: null },
    { path: PATH.MANAGER.DASHBOARD, component: Dashboard, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ACCOUNT}`, component: AccountPage, layout: ManagerLayout },

    { path: PATH.MANAGER.PRODUCTS, component: ProductListPage, layout: ManagerLayout },
    { path: PATH.MANAGER.PRODUCTTEST, component: ProductFormPageTEST, layout: ManagerLayout },
    { path: `${PATH.MANAGER.PRODUCTS}/:id`, component: ProductFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.FUNCTIONS, component: FunctionListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.FUNCTIONS}/:id`, component: FunctionFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.ROLES, component: RoleListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ROLES}/:id`, component: RoleFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.CATEGORIES, component: CategoryListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.CATEGORIES}/:id`, component: CategoryFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.UOMS, component: UomListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.UOMS}/:id`, component: UomFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.TAXS, component: TaxListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.TAXS}/:id`, component: TaxFormPage, layout: ManagerLayout },

    //USER
    { path: PATH.HOME, component: Home, layout: UserLayout },
];

