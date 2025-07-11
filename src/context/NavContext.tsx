import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface NavContextType {
  activeLink: string;
  setActiveLink: Dispatch<SetStateAction<string>>;
}

export const NavContext = createContext<NavContextType>({
  activeLink: '',
  setActiveLink: () => {},
});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <NavContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </NavContext.Provider>
  );
}; 