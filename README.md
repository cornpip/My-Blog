## Summary

### Link
[https://cornpip.store](https://cornpip.store)

개인 블로그로 활용할 수 있는 블로그를 만드려고 합니다.  
아직 구현하지않은 기능들이 많으며 지속적으로 수정, 추가하고 있습니다.

_블로그로 구색을 갖추면 상시 호스팅 할 예정입니다._

## Develope
+ 클라이언트 : 
    + React
    + Mui 컴포넌트를 기본 구성으로 사용합니다.
    + RTK Query : 서버에서 데이터를 가져오고 캐싱합니다.
    + posting page의 editer로 react-codemirror를 사용합니다.
+ 서버 : 
    + Nest.js : [Nest.js 관련 정리](https://github.com/cornpip/react_io/blob/master/server/README.md)
    + TypeORM : [ORM 관련 정리](https://github.com/cornpip/react_io/blob/master/readmefolder/orm.md)
    + 인증 :
        + 미들웨어에서 토큰 유무와 refresh토큰을 검증하고 acc토큰을 refresh합니다. 그 다음 JwtGuard를 거쳐 JwtStrategy로 이어집니다. Strategy에서 토큰의 유효성을 검사하고 payload를 req.user에 할당할 수 있습니다.

        + JwtGuard는 전역으로 적용되고 비인가 사용자의 접근은 JwtStrategy에서 차단됩니다. 특정 라우터에서 차단을 회피하기 위해 JwtGuard에선 데코레이터의 데이터를 읽고 선택적으로 strategy로 이어지는 인증을 건너뛸 수 있습니다.

+ Database : 
    + mysql 
    + redis : access, refresh token 저장소로 활용합니다.
+ 배포 : 
    + docker-compose.yml 로 시스템을 구성하고 제가 소유한 물리 리소스를 통해 배포합니다.

## User flow

<details>
<summary> 회원가입, 로그인 </summary>
    <div>
        <img src="https://github.com/cornpip/react_io/assets/74674780/8189c142-bca1-414b-b2c9-1e2065f19456">
        <img src="https://github.com/cornpip/react_io/assets/74674780/12115f04-5e36-4e05-8cbc-c790437f669a">
        <img src="https://github.com/cornpip/react_io/assets/74674780/a7f73084-25d8-45c9-8486-b683c6545b30">
    </div>
</details>

<br/>
<details>
<summary> 로그인 상태 프로필 </summary>
<div>
    <img src="https://github.com/cornpip/react_io/assets/74674780/5aa53616-a3c6-4398-9486-e429cdc0673f">
    <img src="https://github.com/cornpip/react_io/assets/74674780/34eb912e-6cee-4797-a7c6-b57709bee495">
    <img src="https://github.com/cornpip/react_io/assets/74674780/fe4b3afd-4ddc-4283-a17e-7e1a43a2d4d6">
</div>
</details>

<br/>
<details>
<summary> 홈, 포스트 </summary>
<div>
    <img src="https://github.com/cornpip/react_io/assets/74674780/c74ccc5c-3aa7-4f99-9d0b-bdf5338e1117">
    <img src="https://github.com/cornpip/react_io/assets/74674780/01cfcc5c-37c0-4716-80f7-f49523e2f9f9">
    <img src="https://github.com/cornpip/react_io/assets/74674780/ff52c6da-fea1-4c10-82f3-39693b2737cd">
    정상적인 마크다운을 볼 수 있다.
</div>
</details>

<br/>
<details>
<summary> 업로드, 포스팅 에디터 </summary>
<div>
    <img src="https://github.com/cornpip/react_io/assets/74674780/31f4f45b-790c-48dc-a5d0-5f5c48098eb4">
    <img src="https://github.com/cornpip/react_io/assets/74674780/c3a405f7-5a8d-40dd-a98e-7aa1c5dd2059">
    에디터로 마크다운 문법을 작성하고 preview를 볼 수 있다.
</div>
</details>
