# Woori Zip: 우리 집

## 1. 프로젝트 소개

주거 정보와 대출 추천을 결합하여 청년들의 경제적 부담을 줄이고, <br>
소비 패턴 분석을 통해 만족도 높은 주거 환경을 제공하는 맞춤형 부동산 금융 플랫폼 "Woori Zip" 입니다.
<div align="center">
  <img width="700" alt="image" src="https://github.com/user-attachments/assets/e099a48e-cbb6-4eb2-9316-baf68b1a669a">
</div>


---

## 팀원소개

| <img src="https://github.com/LouiIII3.png" width="200" /> | <img src="https://github.com/Jieun-KWAK.png" width="200" /> | <img src="https://github.com/min20ta.png" width="200" /> | <img src="https://github.com/Jeongseokjin.png" width="200" />  |  <img src="https://github.com/rlfrkdms1.png" width="200" /> | <img src="https://github.com/qbobl5.png" width="200" /> |
| :-------------------------------------------------------: | :--------------------------------------------------------: | :-----------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: |
|         [이성희](https://github.com/LouiIII3)          |          [곽지은](https://github.com/Jieun-KWAK)           |          [김민지](https://github.com/min20ta)              |            [정석진](https://github.com/Jeongseokjin)             |  [길가은](https://github.com/rlfrkdms1)           |  [김혜빈](https://github.com/qbobl5)
| Cloud / Front-end | Server / Front-end | Server / Front-end | Server / Front-end | Server / Front-end | Server / Front-end | 



<br/>

### **1. 주요 기능**
|기능|설명|사용 기술|
|-----|------|---|
|부동산 추천|금융 데이터와 부동산 정보를 결합하여 사용자 맞춤형 부동산 추천 제공|Next.js, Spring Boot|
|위치 기반 필터링|Kakao Maps API를 활용한 부동산 위치 표시 및 필터링|Kakao Maps API, React|
|사용자 계정 관리|회원가입, 로그인 및 사용자 정보 관리|JWT|
|데이터 시각화|부동산 데이터의 시각적 분석 제공|Chart.js, React|

---

### **2. 실행 화면**

#### **클라이언트**
|메인 페이지|추천 결과|지도 필터링|
|-----|-----|-----|

|로그인|회원가입|
|-----|-----|
|![register](https://github.com/user-attachments/assets/e0c1132f-f110-4fdc-adca-877b7c4f924f)|![mypage]()|

|회원-마이페이지|관리자-마이페이지|
|-----|-----|
|![register](https://github.com/user-attachments/assets/30bc4818-14b5-4eaa-8edb-cfc237bcd6c0)|![mypage]()|

|소비패턴 분석 페이지|지도 페이지|
|-----|-----|
|![register]()|![mypage]()|

#### **서버 및 배포**
|CI/CD 프로세스|AWS 배포 상태|
|-----|-----|
|![cicd](https://example.com/cicd.gif)|![awsDeployment](https://example.com/aws-deployment.gif)|

---

### **3. 기술 스택**

#### **Frontend (Next.js)**
- **기술**: React, Context API, Axios, Styled Components
- **특징**:
  - Kakao Maps API 연동으로 위치 기반 필터링 구현
  - 반응형 UI 설계로 다양한 디바이스 지원

#### **Backend (Spring Boot)**
- **기술**: Spring Boot, JPA, MariaDB
- **특징**:
  - RESTful API 설계로 효율적인 데이터 통신 제공
  - JWT 기반 인증 시스템 구현

#### **Cloud Infrastructure**
- **AWS 기반**:
  - 서비스 서버와 뱅킹 서버를 분리하여 설계
  - CodeDeploy를 이용한 지속적 배포
  - S3를 이용한 정적 파일 관리
  - Route 53을 통한 도메인 관리
  - 가비아에서 구매한 도메인 연동
  - IAM으로 보안 정책 설정 및 접근 제어
  - EC2와 로드 밸런서를 활용한 트래픽 분산
  - RDS(MariaDB)로 데이터베이스 관리
  - Prometheus로 성능 모니터링
  - 개발 환경은 포트 8081에서 실행하며, 운영 환경은 포트 8080에서 실행

---

### **4. 개발 및 기여 분석**

#### **Frontend Development**
- **기능 구현**: 
  - 필터링 UI 개발 및 Kakao Maps API 통합
  - 사용자 친화적인 페이지 전환 및 데이터 표시

#### **Backend Development**
- **특징**:
  - 부동산 데이터 CRUD API 설계 및 구현
  - 데이터베이스 최적화를 통한 고성능 제공

#### **CI/CD 구축**
- **효율적인 배포**:
  - GitHub Actions를 활용한 CI/CD 파이프라인 구축
  - CodeDeploy와 S3를 통해 안정적인 배포 프로세스 구성

---

### **5. 아키텍처**
![Woori Zip Architecture](https://example.com/architecture.png)

---

### **6. 프로젝트 실행**
#### **Frontend**
1. `npm install` 실행
2. `.env.local` 파일 생성 후 아래 내용 추가:
```
NEXT_PUBLIC_API_URL=https://api.woorizip.com
NEXT_PUBLIC_KAKAO_MAPS_KEY=your-kakao-maps-key
```
3. `npm run dev`로 실행

#### **Backend**
1. `application.yml` 파일에 데이터베이스 및 AWS 설정 추가
2. Spring Boot 애플리케이션 실행: `./mvnw spring-boot:run`

#### **배포**
1. CodeDeploy와 S3를 통해 배포 설정
2. EC2와 로드 밸런서 설정으로 배포된 서비스 확인

---

### **마치며**
Woori Zip 프로젝트는 금융 및 부동산 IT 서비스에 대한 프로젝트 입니다.

