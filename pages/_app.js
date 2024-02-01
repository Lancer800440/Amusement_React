import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/auth-context";
import { CartProvider } from "@/hooks/useCart";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthContextProvider>

  )}

