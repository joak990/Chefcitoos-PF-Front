import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./Firebase.config";
export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const firebaseAuth = getAuth(app);

    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};