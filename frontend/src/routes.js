import { BookTitleListModule } from "./Modules/AdminModule/BookTitle/BookTitleListModule";
import { BookTitleEditModule } from "./Modules/AdminModule/BookTitle/BookTitleEditModule";
import { LibraryListModule } from "./Modules/AdminModule/Library/LibraryListModule";
import { LibraryEditModule } from "./Modules/AdminModule/Library/LibraryEditModule";
import { LibraryShowModule } from "./Modules/AdminModule/Library/LibraryShowModule";
import { LibraryReservationModule } from "./Modules/AdminModule/Library/LibraryReservationModule";
import { LibraryBorrowingModule } from "./Modules/AdminModule/Library/LibraryBorrowingModule";
import { LibraryStockModule } from "./Modules/AdminModule/Library/LibraryStockModule";
import { UserListModule } from "./Modules/AdminModule/User/UserListModule";
import { UserEditModule } from "./Modules/AdminModule/User/UserEditModule";
import HomeModule from "./Modules/HomeModule";
import LibraryModule from "./Modules/LibraryModule";
import BookTitleModule from "./Modules/BookTitleModule";
import AccountModule from "./Modules/AccountModule";
import AdminModule from "./Modules/AdminModule";
import { DashboardModule } from "./Modules/AdminModule/DashboardModule";
import { BookTitleCreateModule } from "./Modules/AdminModule/BookTitle/BookTitleCreateModule";
import { LibraryCreateModule } from "./Modules/AdminModule/Library/LibraryCreateModule";
import { LibraryBorrowingEditModule } from "./Modules/AdminModule/Library/LibraryBorrowingEditModule";
import { UserCreateModule } from "./Modules/AdminModule/User/UserCreateModule";
import { OrderList } from "./Modules/AdminModule/Orders/OrderList";
import { LibraryOrderListModule } from "./Modules/AdminModule/Library/LibraryOrderListModule";
import { LibraryOrderCreateModule } from "./Modules/AdminModule/Library/LibraryOrderCreateModule";
import { LibraryOrderEditModule } from "./Modules/AdminModule/Library/LibraryOrderEditModule";

/**
 * Front end routes
 */
export const routes = [
  {
    name: "Home",
    url: "/",
    component: HomeModule,
    exact: true,
  },
  {
    name: "BookTitle",
    url: "/book-titles",
    component: BookTitleModule,
  },
  {
    name: "Library",
    url: "/libraries",
    component: LibraryModule,
  },
  {
    name: "Account",
    url: "/account",
    component: AccountModule,
  },
  {
    name: "Admin",
    url: "/admin",
    component: AdminModule,
  },
];

/**
 * Admin Routes
 */
export const adminRoutes = [
  {
    name: "Dashboard",
    url: "/dashboard",
    roles: ["admin", "librarian", "distributor"],
    component: DashboardModule,
    exact: true,
  },
  /** Book Titles */
  {
    name: "BookTitleList",
    url: "/book-titles",
    roles: ["admin", "librarian", "distributor"],
    component: BookTitleListModule,
    exact: true,
  },
  {
    name: "BookTitleCreate",
    url: "/book-titles/create",
    roles: ["admin", "librarian", "distributor"],
    component: BookTitleCreateModule,
  },
  {
    name: "BookTitleEdit",
    url: "/book-titles/:id/edit",
    roles: ["admin", "librarian", "distributor"],
    component: BookTitleEditModule,
  },
  /** Libraries */
  {
    name: "LibraryList",
    url: "/libraries",
    roles: ["admin"],
    component: LibraryListModule,
    exact: true,
  },
  {
    name: "LibraryCreate",
    url: "/libraries/create",
    roles: ["admin"],
    component: LibraryCreateModule,
    exact: true,
  },
  {
    name: "LibraryShow",
    url: "/libraries/:id",
    roles: ["admin", "librarian"],
    component: LibraryShowModule,
    exact: true,
    librarian: true,
  },
  {
    name: "LibraryEdit",
    url: "/libraries/:id/edit",
    roles: ["admin", "librarian"],
    component: LibraryEditModule,
    librarian: true,
  },
  /** Libraries - Reservations */
  {
    name: "LibraryReservation",
    url: "/libraries/:id/reservations",
    roles: ["admin", "librarian"],
    component: LibraryReservationModule,
    librarian: true,
  },
  /** Libraries - Borrowings */
  {
    name: "LibraryBorrowing",
    url: "/libraries/:id/borrowings",
    roles: ["admin", "librarian"],
    component: LibraryBorrowingModule,
    exact: true,
    librarian: true,
  },
  {
    name: "LibraryBorrowingEdit",
    url: "/libraries/:idLibrary/borrowings/:idBorrowing/edit",
    roles: ["admin", "librarian"],
    component: LibraryBorrowingEditModule,
    librarian: true,
  },
  /** Libraries - Stock */
  {
    name: "LibraryStock",
    url: "/libraries/:id/stock",
    roles: ["admin", "librarian"],
    component: LibraryStockModule,
    librarian: true,
  },
  /** Libraries - Orders */
  {
    name: "LibraryOrderList",
    url: "/libraries/:id/orders",
    roles: ["admin", "librarian"],
    component: LibraryOrderListModule,
    exact: true,
  },
  {
    name: "LibraryOrderCreate",
    url: "/libraries/:id/orders/create",
    roles: ["admin", "librarian"],
    component: LibraryOrderCreateModule,
    exact: true,
  },
  {
    name: "LibraryOrderEdit",
    url: "/libraries/:idLibrary/orders/:idOrder/edit",
    roles: ["admin", "librarian"],
    component: LibraryOrderEditModule,
    exact: true,
  },
  /** Users */
  {
    name: "UserList",
    url: "/users",
    roles: ["admin"],
    component: UserListModule,
    exact: true,
  },
  {
    name: "UserCreate",
    url: "/users/create",
    roles: ["admin"],
    component: UserCreateModule,
  },
  {
    name: "UserEdit",
    url: "/users/:id/edit",
    roles: ["admin"],
    component: UserEditModule,
  },
  /** Orders */
  {
    name: "OrderDistributorList",
    url: "/orders",
    roles: ["admin", "distributor"],
    component: OrderList,
    exact: true,
  },
];

/**
 * Creates the route and replace params with real values.
 *
 * @param name    Name of the route
 * @param params  Parameters that are parsed into real values.
 *
 * @return string|undefined Created URL or undefined if not found.
 */
export const createRoute = (name, params = {}) => {
  let url;

  url = routes.find((route) => (route.name === name ? route : undefined)).url;

  if (url !== undefined) {
    for (let key in params) {
      url = url.replace(`:${key}`, params[key]);
    }
  }

  return url;
};

/**
 * Creates the admin route and replace params with real values.
 *
 * @param name    Name of the route
 * @param params  Parameters that are parsed into real values.
 *
 * @return string|undefined Created URL or undefined if not found.
 */
export const createAdminRoute = (name, params = {}) => {
  const prefix = "/admin";
  let url;

  url = adminRoutes.find((route) =>
    route.name === name ? prefix + route : undefined
  ).url;

  if (url !== undefined) {
    for (let key in params) {
      url = url.replace(`:${key}`, params[key]);
    }
  }

  url = prefix + url;

  return url;
};
