"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header/Header";

export default function HeaderRenderer() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   // 화면 크기 확인
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth >= 393);
  //   };

  //   handleResize(); // 초기 크기 설정
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // map 페이지인지 확인
  const isMapPage = pathname === "/map";

  // 393px 이하에서는 항상 Header 렌더링
  if (isMapPage && !isMobile) {
    return null;
  }

  return <Header />;
}
