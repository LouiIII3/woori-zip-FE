import Login from "@/components/domains/user/login/LoginPage";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import PropertyGrid from "@/components/domains/main/PropertyGrid/PropertyGrid";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <PropertyGrid />
      </main>
      <Footer />
    </div>
  );
}
