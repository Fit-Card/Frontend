# Fit-Card

![splash](https://github.com/user-attachments/assets/56b32269-0eeb-4061-a772-21238e420068)

## 🖥️ 프로젝트 소개

**Fit-card**는 평소에 지나치기 쉬운 카드 혜택들을 현재 위치를 기준으로 시각화하여 보다 혜택을 잘 챙길 수 있게 하기 위해 기획된 프로젝트입니다.

MyData에서 불러온 사용자의 카드 보유 현황, 결제 내역 등을 분석하여 사용자의 소비 패턴을 분석하고, 해당 패턴을 기반으로 유효한 카드 추천을 제공합니다.

## 🕰️ 개발 기간

- **시작일**: 2024.08.26
- **종료일**: 2024.10.11

## ⚙️ 개발 환경 및 기술 스택

### 프론트엔드 (FE)

- **React**, **React Native**, **React Navigation**
- **TypeScript**, **JavaScript**
- **Redux**, **Axios**, **Firebase**
- **Expo**

### 백엔드 (BE)

- **Java**, **Springboot**, **Jpa**, **Gradle**
- **DB** **: Mysql, Redis, Firebase**

### 인프라 (Infra)

- **Docker**, **Jenkins**, **Amazon Lightsail**, **Nginx**

### 툴 (Tools)

- **Figma**, **Git**, **Github**, **Notion**, **Slack**

## 🌟 서비스 소개 - 차별점

| ![지도혜택계산resize](https://github.com/user-attachments/assets/f5a717f4-52a7-4c70-a438-edbbff390a2d) | ![알람resize](https://github.com/user-attachments/assets/58325f49-1d0b-4736-b8e6-7754eb7a6041) | ![추천카드resize](https://github.com/user-attachments/assets/1733bc06-6fa5-49b9-8e71-7b4e3ae39154) |
| :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
|                                       사용자 위치 기반 지도 검색                                       |                                사용자 보유 카드 기반 푸시 알림                                 |                                   매달 소비 내역 기반 카드 추천                                    |
|                                    결제 예정 금액 별 할인 금액 조회                                    |                                    카드사 이벤트 혜택 조회                                     |                                    사용자 연령대 인기 카드 추천                                    |

## 🔍 주요 기능

|                                    **마이데이터 구축**                                     |                          **위치 기반 가맹점 혜택 카드 목록 조회**                          |                                       **카드 추천**                                        |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| ![image1](https://github.com/user-attachments/assets/ac67cb1f-53af-4412-9f2b-374d25560cd8) | ![image2](https://github.com/user-attachments/assets/b512900c-a95e-4fee-a2a3-36eaf46644fd) | ![image5](https://github.com/user-attachments/assets/030baaa7-1e34-4f9c-aab2-f555045c2e2b) |
|                   실제 금융 서비스와 유사하게 동작할 수 있도록 구조 생성                   | 클라이언트 화면의 좌상단 위도 경도값과 우하단 위도 경도 값을 바탕으로 범위 내 가맹점 조회  |                          지난달 이용 내역으로 최대 혜택 카드 추천                          |
|                      사용자의 카드 정보, 이용 내역, 이벤트 혜택 제공                       |               사용자가 소유한 카드와 일치하는 카드가 존재하는 가맹점의 정보                |                             스케줄링을 통해 매월 초 자동 반영                              |

|                                **데이터 크롤링 + 스케줄러**                                |                                 **카드 이벤트 PUSH 알림**                                  |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| ![image6](https://github.com/user-attachments/assets/a16c9ec4-1597-48a5-ae72-551f78663b57) | ![image7](https://github.com/user-attachments/assets/e1b65b8c-ff88-4c0c-96f0-39ab513337af) |
|               카드 이벤트, 가맹점 정보, 카드 혜택, 카드 정보 데이터를 크롤링               |                          유저 보유 카드와 이벤트를 비교하여 알림                           |
|                           스케줄러로 주기적인 정보 업데이트 구현                           |                       해당 이벤트 카드 소유 유저에게 PUSH 알림 발송                        |

## 🎥 시연 화면

|                                       **1. 로그인 페이지**                                       |                                         **2. 메인 화면**                                         |                                          **3. 이벤트 알림**                                          |
| :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| ![로그인resize](https://github.com/user-attachments/assets/151671bb-cee9-4f4f-94a5-15a58e866d7f) | ![메인홈resize](https://github.com/user-attachments/assets/9ea80631-355c-4b46-ac4a-0e98d6000b0d) | ![이벤트알림resize](https://github.com/user-attachments/assets/016fdf36-81b2-430d-8e06-2556a0ff8af2) |

|                                  **4. 지도 - 카테고리 검색**                                   |                                        **5. 지도 - 가맹점 검색**                                         |                                        **6. 지도 - 혜택 계산**                                         |
| :--------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| ![지도resize](https://github.com/user-attachments/assets/09ede66e-9f63-45b3-a66a-76eaa8fdb2dd) | ![지도가맹점검색resize](https://github.com/user-attachments/assets/604945cd-1537-47a0-82e2-118a9939c0ab) | ![지도혜택계산resize](https://github.com/user-attachments/assets/f5a717f4-52a7-4c70-a438-edbbff390a2d) |

|                                          **7. 추천 카드**                                          |                                         **8. 혜택 가맹점 검색**                                          |                                         **9. 혜택 카드 검색**                                          |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| ![추천카드resize](https://github.com/user-attachments/assets/1733bc06-6fa5-49b9-8e71-7b4e3ae39154) | ![혜택가맹점검색resize](https://github.com/user-attachments/assets/ce8bd637-4c6f-4189-b2ec-d8bbb5bb0bed) | ![혜택카드검색resize](https://github.com/user-attachments/assets/329b0e28-019f-44fa-ad64-6337f1238bdb) |

## 🧑‍🤝‍🧑 팀 소개

- **FE**
  - **김현지**: 지도 검색, 혜택 검색 - [hyeonzi423](http://github.com/hyeonzi423)
  - **현경찬**: 로그인, 회원가입, 메인, 카드 추천 - [gyeongmann](http://github.com/gyeongmann)
  - **윤정환**: 알림함, 마이페이지 - [201820722](http://github.com/201820722)
- **BE**
  - **임가영**: 카드 기능, 카드 추천 기능 - [Limgayoung](http://github.com/Limgayoung)
  - **박성재**: 가맹점, 지도 조회 - [qkrtjdwo5662](http://github.com/qkrtjdwo5662)
  - **변찬현**: 로그인, 회원가입, 알림 - [chanhyun22](http://github.com/chanhyun22)

## 🧱 아키텍쳐

![image8](https://github.com/user-attachments/assets/a8a9f57c-d756-4d63-9818-89160ab8dd77)

<!--
## 🛠️ 설치 및 사용 방법

### 설치 방법

### 사용 방법
-->
