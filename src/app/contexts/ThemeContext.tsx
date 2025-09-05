import React, { createContext, useContext, useEffect, useState,SetStateAction ,Dispatch, useRef} from "react";
import checkLoggedInStatus from '../../../lib/checkLoggedin'
import Cookies from "js-cookie";
type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  authError: {
    show: boolean;
    error: string;
  };
  setAuthError: any;
  cartItems:CartItem[];
  setCartItems:Dispatch<SetStateAction<any>>;
  catalogueProducts:dummyStore[]
  setCatalogueProducts:Dispatch<SetStateAction<any>>; 
  isCartOpen:boolean;
  setIsCartOpen: Dispatch<SetStateAction<any>>;
  searchQuery:string;
  setSearchQuery:any;
  handleUpdateQuantity:any;
  handleRemoveItem:any
  loggedIn:{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}
  setLoggedIn:Dispatch<SetStateAction<{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return (
        saved ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });
  const [authError, setAuthError] = useState({
    show: false,
    error: "",
  });
  const cookies=Cookies.get("RFTFL")
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const [cartItems, setCartItems] = useState([]);
  const [catalogueProducts, setCatalogueProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userAuth,setUserAuth]=useState<UserRoot | {}>({})
  const [loggedIn,setLoggedIn]=useState<{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}>({"boolean":"pending", "role":null})
  useEffect(()=>{
    if (cookies) {
      setLoggedIn({"boolean":"pending", "role":null})
      
    }else{
      setLoggedIn({"boolean":"false", "role":null})
    }
  },[])
   const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev:any) =>
      prev.map((item:any) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter((item:any) => item.product.id !== productId));
  };
  const ranOnce = useRef(false);
    const Authentication=async ()=>{
    const request=await checkLoggedInStatus()
    const response:UserRoot | undefined =await request?.data
    console.log(request)
    if (request === undefined ){
       setLoggedIn({"boolean":"false", "role":null})
    }else if (request.status && request.status===200){
        if (response?.user.role==="admin"){
          setLoggedIn({"boolean":"true", "role":"admin"})
        }else{
          setLoggedIn({"boolean":"true", "role":"user"})
        }
    }else if (request.status && request.status===500){
     
    }

  }
  
  useEffect(()=>{
    if (!ranOnce.current) {
      Authentication();
      ranOnce.current = true;
    }

  },[])
  return (
    <ThemeContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        catalogueProducts,
        setCatalogueProducts,
        theme,
        toggleTheme,
        authError,
        setAuthError,
        cartItems,
        setCartItems,
        isCartOpen, 
        setIsCartOpen,
        searchQuery, 
        setSearchQuery,
        handleUpdateQuantity,
        handleRemoveItem
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
