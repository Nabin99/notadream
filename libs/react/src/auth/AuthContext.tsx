import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";

// Define types for our auth context
interface User {
  id: string;
  email: string;
  name?: string;
  // Add any other user properties you need
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  clearError: () => void;
}

interface AuthProviderProperties {
  children: ReactNode;
}

// Create the Auth Context with initial null value
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component that wraps your app and makes auth object available
export function AuthProvider({
  children,
}: AuthProviderProperties): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sign up with email and password
  const signup = async (email: string, password: string): Promise<User> => {
    try {
      setError(null);
      // Replace with your actual authentication API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to sign up");

      setCurrentUser(data.user);

      return data.user;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      throw err;
    }
  };

  // Sign in with email and password
  const login = async (email: string, password: string): Promise<User> => {
    try {
      setError(null);
      // Replace with your actual authentication API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to log in");

      setCurrentUser(data.user);
      localStorage.setItem("authToken", data.token);

      return data.user;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      throw err;
    }
  };

  // Sign out
  const logout = async (): Promise<void> => {
    try {
      setError(null);
      // Replace with your actual authentication API call
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setCurrentUser(null);
      localStorage.removeItem("authToken");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setError(null);
      // Replace with your actual authentication API call
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to reset password");

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    try {
      setError(null);
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      const updatedUser = { ...currentUser, ...userData } as User;
      setCurrentUser(updatedUser);

      return data.user;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      throw err;
    }
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setLoading(false);

          return;
        }

        // Replace with your actual token verification API call
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCurrentUser(data.user);
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );

        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Value object that will be passed to consumers of this context
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
