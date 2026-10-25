import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <div className="bg-shapes" aria-hidden="true">
        <i className="shape s1" /><i className="shape s2" /><i className="shape s3" />
        <i className="shape s4" /><i className="shape s5" /><i className="shape s6" />
      </div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wumpus/:slug" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
