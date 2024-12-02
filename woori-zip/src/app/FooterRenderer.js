"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer/Footer";

export default function FooterRenderer() {
  const pathname = usePathname();

  // map 페이지인지 확인
  const isMapPage = pathname === "/map";

  // map 페이지가 아닌 경우에만 Footer 렌더링
  if (isMapPage) {
    return null;
  }

  return <Footer />;
}
