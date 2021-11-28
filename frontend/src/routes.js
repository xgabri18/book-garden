import { BookTitleListModule } from "./Modules/AdminModule/BookTitle/BookTitleListModule";
import { BookTitleEditModule } from "./Modules/AdminModule/BookTitle/BookTitleEditModule";
import { LibraryListModule } from "./Modules/AdminModule/Library/LibraryListModule";
import { LibraryEditModule } from "./Modules/AdminModule/Library/LibraryEditModule";
import { LibraryShowModule } from "./Modules/AdminModule/Library/LibraryShowModule";
import { LibraryReservationsModule } from "./Modules/AdminModule/Library/LibraryReservationsModule";
import { LibraryBorrowingsModule } from "./Modules/AdminModule/Library/LibraryBorrowingsModule";
import { LibraryStockModule } from "./Modules/AdminModule/Library/LibraryStockModule";
import { UserListModule } from "./Modules/AdminModule/User/UserListModule";
import { UserEditModule } from "./Modules/AdminModule/User/UserEditModule";
import HomeModule from "./Modules/HomeModule";
import BookTitleModule from "./Modules/BookTitleModule";
import LibraryModule from "./Modules/LibraryModule";
import AccountModule from "./Modules/AccountModule";
import AdminModule from "./Modules/AdminModule";
import { DashboardModule } from "./Modules/AdminModule/DashboardModule";
import { BookTitleCreateModule } from "./Modules/AdminModule/BookTitle/BookTitleCreateModule";

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
    name: "LibraryShow",
    url: "/libraries/:id",
    roles: ["admin", "librarian"],
    component: LibraryShowModule,
    exact: true,
  },
  {
    name: "LibraryEdit",
    url: "/libraries/:id/edit",
    roles: ["admin", "librarian"],
    component: LibraryEditModule,
  },
  /** Libraries - Reservations */
  {
    name: "LibraryReservations",
    url: "/libraries/:id/reservations",
    roles: ["admin", "librarian"],
    component: LibraryReservationsModule,
  },
  /** Libraries - Borrowings */
  {
    name: "LibraryBorrowings",
    url: "/libraries/:id/borrowings",
    roles: ["admin", "librarian"],
    component: LibraryBorrowingsModule,
  },
  /** Libraries - Stock */
  {
    name: "LibraryStock",
    url: "/libraries/:id/stock",
    roles: ["admin", "librarian"],
    component: LibraryStockModule,
  },
  /** Users */
  {
    name: "UserList",
    url: "/users",
    roles: ["admin"],
    component: UserListModule,
  },
  {
    name: "UserEdit",
    url: "/users/:id/edit",
    roles: ["admin"],
    component: UserEditModule,
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
