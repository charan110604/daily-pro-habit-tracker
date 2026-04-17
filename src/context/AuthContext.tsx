import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react";

interface User {
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: "admin" | "user") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  /* LOAD USER FROM LOCALSTORAGE */

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  /* LOGIN */

  const login = useCallback((email: string, role: "admin" | "user") => {

    const loggedUser: User = { email, role };

    setUser(loggedUser);

    /* SAVE SESSION */

    localStorage.setItem("user", JSON.stringify(loggedUser));

    /* USED BY CALENDAR CONTEXT */

    localStorage.setItem("currentUser", email);

  }, []);

  /* LOGOUT */

  const logout = useCallback(() => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;

}