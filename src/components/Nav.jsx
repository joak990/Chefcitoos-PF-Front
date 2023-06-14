import React, { useEffect, useState } from "react";
import logo from "../img/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase.config";
import ModalShoppingCart from "./ModalShoppingCart";
// import { useUser } from "../useUser";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart, setUser } from "../Redux/actions";
const Nav = () => {
  const location = useLocation();
  let quantity = useSelector((state) => state.shoppingCart.quantity);
  let userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userorigin, setUserOrigin] = useState(null);
  const [name, setName] = useState("");

  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setIsMenuOpen(false); // Cerrar el menú al hacer clic en "Ver perfil"
  };

const toggleMenu2 = () => {
  setIsMenuOpen(!isMenuOpen);
};

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);
    const storedEmail = localStorage.getItem("email");
    setStoredEmail(storedEmail);
    try {
      let shoppingCart = localStorage.getItem("shoppingCart");
      let userLogin = localStorage.getItem("userLogin");
      if (shoppingCart){
        shoppingCart = JSON.parse(shoppingCart);
        console.log(typeof shoppingCart);
        dispatch(setShoppingCart(shoppingCart));
      }
      if (userLogin && !(userRedux?.name)){
        userLogin = JSON.parse(userLogin);
        dispatch(setUser(userLogin));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  console.log(storedEmail);
  const isIdInLocalStorage = localStorage.getItem("id");
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const user = firebaseAuth.currentUser;
  console.log(isIdInLocalStorage);

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      navigate("/");
      window.location.reload()
    } catch (error) {
      console.log("Error al hacer logout:", error);
    }
  };

  return (
    <header className="bg-orange-100  h-46">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Chefcitoos</span>
            <img
              className="h-16 w-auto rounded-full"
              src={logo}
              alt="logo-app"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/menu"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Menú
          </Link>
          {(user || isIdInLocalStorage) && (
            <Link
              to="/creaciones"
              className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
                location.pathname === "/creaciones"
                  ? "active border-b-2 border-orange-600 text-orange-600"
                  : ""
              }`}
            >
               Mis creaciones
            </Link>
          )}
          <Link
            to="/publicaciones"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/publicaciones"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Publicaciones
          </Link>

          <Link
            to="/about"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/nosotros"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Nosotros
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user || isIdInLocalStorage ? (
            <>
              <button
                className="bg-white rounded-full flex justify-center items-center mr-4 w-12 cursor-pointer"
                onClick={() => setShowShoppingCart(true)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {quantity > 0 && (
                  <span className="inline-flex items-center justify-center bg-red-500 text-white rounded-full h-4 w-4 -mt-5 -mr-4">
                    {quantity}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="bg-orange-600 w-28 h-12 text-white rounded-xl font-bold mr-4"
              >
                Logout
              </button>
              
              <div className="bg-gray-200 rounded-full flex justify-center items-center w-12">
  <button onClick={toggleMenu2}>
    {user ? (
      <img className="rounded-full" src={user && user.photoURL} alt="" />
    ) : (
      <FontAwesomeIcon icon={faUser} />
    )}
  </button>
{isMenuOpen && (
  <div className="absolute bottom-auto mt-28 bg-slate-100">
    <div className="">
      <Link to="/myProfile"onClick={handleProfileClick} className="block px-4 py-2 text-gray-800 hover:bg-orange-200">
        Ver perfil
      </Link>
      <Link to="/myProfile"onClick={handleProfileClick} className="block px-4 py-2 text-gray-800 hover:bg-orange-200">
        mis pedidos
      </Link>
    </div>
  </div>
)}
</div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <div className="mt-1">
                <Link to="/login" className="group relative">
      <FaSignInAlt className="ml-4 text-2xl hover:bg-orange-200 cursor-pointer" />
      <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100">
        Ingresar
      </span>
    </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-10">{/* Background backdrop */}</div>
      )}
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <Link to="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Chefcitoos</span>
            <img className="h-8 w-auto rounded-full" src={logo} alt="" />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <div className="-mx-3">
                <div className="mt-2 space-y-2" id="disclosure-1">
                  {isIdInLocalStorage ? (
                    <p className="text-gray-400"> Bienvenido! {name}</p>
                  ) : (
                    ""
                  )}

                  <a
                    href="/"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Home
                  </a>
                  <a
                    href="/menu"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Menú
                  </a>

                  {user || isIdInLocalStorage ? (
                    <a
                      href="/creaciones"
                      className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                    >
                    Mis creaciones
                    </a>
                  ) : null}
                  <a
                    href="/publicaciones"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Publicaciones
                  </a>
                  <a
                    href="/about"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Nosotros
                  </a>
                  {user || isIdInLocalStorage ? (
                    <button onClick={() => setShowShoppingCart(true)}
                      href="/creaciones"
                      className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                    >
                    Carrito de compras
                    </button>
                  ) : null}
                  {user || isIdInLocalStorage ? (
                    <a onClick={handleLogout}
                      
                      className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                    >
                      Logout
                    </a>
                  ) : (
                    <div>
                      <a
                        href="/login"
                        className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                      >
                        Ingresar
                      </a>
                      <a
                        href="/register"
                        className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                      >
                        Registrarse
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showShoppingCart && (
        <ModalShoppingCart onClose={() => setShowShoppingCart(false)} />
      )}
    </header>
  );
};

export default Nav;
