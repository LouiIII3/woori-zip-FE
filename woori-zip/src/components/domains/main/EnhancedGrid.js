"use client";

import styles from "./EnhancedGrid.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EnhancedGrid() {
  const categories = [
    { title: "예금", icon: "/assets/deposit.png", link: "https://spot.wooribank.com/pot/Dream?withyou=PODEP0001" },
    { title: "대출", icon: "/assets/loan.png", link: "https://spot.wooribank.com/pot/Dream?withyou=ln" },
    { title: "펀드", icon: "/assets/fund.png", link: "https://spot.wooribank.com/pot/Dream?withyou=OWFDM0003" },
    { title: "신탁", icon: "/assets/trust.png", link: "https://spot.wooribank.com/pot/Dream?withyou=POTRT0001" },
    { title: "ISA", icon: "/assets/isa.png", link: "https://spot.wooribank.com/pot/Dream?withyou=IMISA0044" },
  ];

  const services = [
    {
      title: "우리WON뱅킹",
      description: "새 시대의 금융을 여는 대표 모바일뱅킹 APP",
      image: "/assets/wonbanking.png",
      link: "/services/wonbanking",
    },
    {
      title: "이주 지원 서비스",
      description: "주거취약 계층 이주 지원",
      image: "/assets/assistance.png",
      link: "/services/mydata",
    },
    {
      title: "스마트간편신규",
      description: "직원 추천받은 상품을 간편하게 가입하세요",
      image: "/assets/smartregister.png",
      link: "/services/smartregister",
    },
  ];

  const recommendations = [
    {
      title: "원룸 월세 300/30",
      description: "고층, 관리비 7만, 초역세권",
      image: "/assets/room1.png",
      link: "/properties/room1",
    },
    {
      title: "투룸 월세 1000/60",
      description: "2층, 관리비 5만, 강남역 근처",
      image: "/assets/room2.png",
      link: "/properties/room2",
    },
    {
      title: "오피스텔 월세 600/60",
      description: "3층, 관리비 15만, 최저가 보장",
      image: "/assets/room3.png",
      link: "/properties/officetel",
    },
  ];

  const reviews = [
    { name: "김철수", feedback: "대출 서비스가 정말 편리했습니다!" },
    { name: "박영희", feedback: "투명한 펀드 정보 덕분에 믿고 투자할 수 있었습니다." },
    { name: "이민호", feedback: "마이데이터 서비스로 재정 관리를 쉽게 할 수 있었어요." },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* 메인 배너 (자동 슬라이드) */}
      <section className={styles.banner}>
        <Link href={services[currentSlide].link}>
          <Image
            src={services[currentSlide].image}
            alt={services[currentSlide].title}
            width={1200}
            height={400}
          />
          <div className={styles.banner_text}>
            <h2>{services[currentSlide].title}</h2>
            <p>{services[currentSlide].description}</p>
          </div>
        </Link>
      </section>

      {/* 아이콘 메뉴 */}
      <section className={styles.icon_menu}>
        <h2>금융상품</h2>
        <div className={styles.icon_list}>
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className={styles.icon_item}
            >
              <Image
                src={category.icon}
                alt={category.title}
                width={70}
                height={70}
              />
              <p>{category.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className={styles.services}>
        <h2>서비스</h2>
        <div className={styles.service_cards}>
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.link}
              className={styles.service_card}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={280}
                height={180}
              />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 추천 매물 */}
      <section className={styles.recommendations}>
        <h2>추천 매물</h2>
        <div className={styles.recommendation_list}>
          {recommendations.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className={styles.recommendation_card}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={280}
                height={180}
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 고객 리뷰 */}
      <section className={styles.reviews}>
        <h2>고객 리뷰</h2>
        <div className={styles.review_list}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.review_card}>
              <p className={styles.review_name}>{review.name}</p>
              <p className={styles.review_feedback}>{review.feedback}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
