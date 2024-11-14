import Login from "@/components/domains/user/LoginForm";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
  return (
    <div className="page">
      <Header></Header>
      <main className="main">    
        <Login />
      </main>
      <Footer></Footer>
    </div>
  );
}
