import Icon from "./Icon.jsx";
import { createContext, useCallback, useContext, useRef, useState } from "react";

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const id = useRef(0);
  const push = useCallback((text, icon = "sparkle") => {
    const key = ++id.current;
    setItems((l) => [...l.slice(-2), { key, text, icon }]);
    setTimeout(() => setItems((l) => l.filter((t) => t.key !== key)), 2400);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <div className="toast" key={t.key}><Icon name={t.icon} /> {t.text}</div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
