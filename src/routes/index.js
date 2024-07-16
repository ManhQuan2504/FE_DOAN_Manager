import { PATH } from '~/constants/part';

//MANAGER
import ManagerLayout from '~/components/manager/layout';
import M_LoginPage from '~/pages/manager/LoginPage/LoginPage';
import M_Dashboard from '~/pages/manager/Dashboard';
import M_AccountPage from '~/pages/manager/AccountPage/AccountPage';

import M_ProductFormPage from '~/pages/manager/ProductPage/ProductFormPage';
import M_ProductListPage from '~/pages/manager/ProductPage/ProductListPage';
import M_ProductFormPageTEST from '~/pages/manager/ProductPage/ProductFormPageTEST';

import M_FunctionFormPage from '~/pages/manager/SystemPage/FunctionFormPage';
import M_FunctionListPage from '~/pages/manager/SystemPage/FunctionListPage';
import M_RoleFormPage from '~/pages/manager/SystemPage/RoleFormPage';
import M_RoleListPage from '~/pages/manager/SystemPage/RoleListPage';

import M_CategoryFormPage from '~/pages/manager/masterDataPage/CategoryFormPage';
import M_CategoryListPage from '~/pages/manager/masterDataPage/CategoryListPage';
import M_UomFormPage from '~/pages/manager/masterDataPage/UomFormPage';
import M_UomListPage from '~/pages/manager/masterDataPage/UomListPage';
import M_TaxFormPage from '~/pages/manager/masterDataPage/TaxFormPage';
import M_TaxListPage from '~/pages/manager/masterDataPage/TaxListPage';

import M_EmployeeFormPage from '~/pages/manager/EmployeePage/EmployeeFormPage';
import M_EmployeeListPage from '~/pages/manager/EmployeePage/EmployeeListPage';

//CUSTOMER
import UserLayout from '~/components/customer/layout';
import C_LoginPage from '~/pages/customer/LoginPage/LoginPage';
import C_SigninPage from '~/pages/customer/LoginPage/SigninPage';
import Home from '~/pages/customer/Home';

export const AppRoutes = [
    //MANAGER
    { path: PATH.MANAGER.LOGIN, component: M_LoginPage, layout: null },
    { path: PATH.MANAGER.DASHBOARD, component: M_Dashboard, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ACCOUNT}`, component: M_AccountPage, layout: ManagerLayout },

    { path: PATH.MANAGER.PRODUCTS, component: M_ProductListPage, layout: ManagerLayout },
    { path: PATH.MANAGER.PRODUCTTEST, component: M_ProductFormPageTEST, layout: ManagerLayout },
    { path: `${PATH.MANAGER.PRODUCTS}/:id`, component: M_ProductFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.FUNCTIONS, component: M_FunctionListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.FUNCTIONS}/:id`, component: M_FunctionFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.ROLES, component: M_RoleListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ROLES}/:id`, component: M_RoleFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.CATEGORIES, component: M_CategoryListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.CATEGORIES}/:id`, component: M_CategoryFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.UOMS, component: M_UomListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.UOMS}/:id`, component: M_UomFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.TAXS, component: M_TaxListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.TAXS}/:id`, component: M_TaxFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.EMPLOYEES, component: M_EmployeeListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.EMPLOYEES}/:id`, component: M_EmployeeFormPage, layout: ManagerLayout },

    //CUSTOMER
    { path: PATH.CUSTOMER.LOGIN, component: C_LoginPage, layout: null },
    { path: PATH.CUSTOMER.SIGNIN, component: C_SigninPage, layout: null },
    { path: PATH.CUSTOMER.HOME, component: Home, layout: UserLayout },
];

