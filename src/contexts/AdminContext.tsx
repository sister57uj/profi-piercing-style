import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  checkAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    setIsAdmin(loggedIn === 'true');
  };

  useEffect(() => {
    checkAdmin();
    // Проверяем каждые 2 секунды на случай изменения статуса
    const interval = setInterval(checkAdmin, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, checkAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};