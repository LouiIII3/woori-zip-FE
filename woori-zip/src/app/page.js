import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import styles from "./page.module.css";
import PropertyGrid from "@/components/domains/main/PropertyGrid/PropertyGrid.js";
import EnhancedGrid from "@/components/domains/main/EnhancedGrid.js"; // 정확한 경로로 import

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <PropertyGrid />
        </div>
        <div>
        <EnhancedGrid />
        </div>
      </main>
    </div>
  );
}
