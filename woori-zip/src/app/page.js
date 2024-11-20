import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import styles from "./page.module.css";
import PropertyGrid from "@/components/domains/main/PropertyGrid/PropertyGrid.js";


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
