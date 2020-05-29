# PWA APP 제작: shopnow

2020 네이버 핵데이 12번 주제 PWA APP 제작

### 소개

사용자의 연령, 성별과 관심 분야에 맞게 매일 클릭량이 높은 분야의 쇼핑 아이템을 보여주는 PWA입니다.

### 호스팅

https://todayshop.shop/

### 사용하는 API

https://developers.naver.com/products/intro/plan/
- 데이터랩 (쇼핑인사이트)
- 검색

매일 오후 12시 데이터랩의 쇼핑인사이트 API를 호출합니다.
남/녀/남녀 카테고리별 클릭량의 상대적 비율을 조회한 값을 firestore에 아래와 같이 저장합니다.

추천 아이템은 먼저 사용자가 선택한 카테고리의 제일 최근에 업데이트된 클릭량을 created_at 필드를 참조하여 조회합니다.
그 중 클릭량이 높은 5개의 카테고리만 검색/쇼핑 API를 사용하여 조회합니다.

![firestore img](https://user-images.githubusercontent.com/34362701/83267771-a8dcda80-a1ff-11ea-9f3e-3b0baccf886c.PNG)

### 빌드 및 실행

`npm install && npm start`, `npm build`

### 스크린샷
![screenshot3](https://user-images.githubusercontent.com/34362701/83269523-2e618a00-a202-11ea-8826-bb4ffa91befa.PNG)
![screenshot5](https://user-images.githubusercontent.com/34362701/83269701-6ff23500-a202-11ea-9cbd-8c713225d744.PNG)
