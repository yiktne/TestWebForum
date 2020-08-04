# 게시판 프로젝트
개인 공부용 게시판 프로젝트입니다.   
작업시 모듈들의 사용방법을 제외한 알고리즘, 데이터 구조 등은 직접 생각하면서 짜보려고 하고 있습니다.

## Backend
 Node.JS 기반으로 작성하고 있으며, DB는 mongoDB(mongoose)를 이용하여 제작하고 있습니다.
 
### 사용하고 있는 패키지
 - Express
 - mongoose
 - body-parser
 - cors
 - express-session
 - mongoose-session
 - crypto
 
### 주의사항   

 공개하지 못하는 일부 내용들은 secretdatas.js 파일에 저장하여 사용을 하고있고, 이 파일은 커밋하지 않을 예정입니다.   
 따라서 받아서 작업하시는 경우 이 내용을 따로 작성을 해 주셔야 합니다.
 
 현재 작성해주셔야 하는 부분은 다음과 같습니다.
  1. mongoURL   
    사용하실 mongoDB의 서버 URL을 여기다 넣어주시면 됩니다. node_db.js에서 이 값을 사용합니다.
  2. sessionSecret
    서버의 세션 secret 값입니다. 아무 값이나 원하시는 String값을 넣어주시면 됩니다.
  3. encryptCount
    비밀번호의 암호화 알고리즘에 필요한 값입니다. 약 100000±10000정도의 Number값을 넣어주시면 됩니다.
   
## Frontend
  React 기반으로 작성하고 있습니다.
  
  ---
  
  추후 작성 예정입니다..
