// //일반 로그인
// describe('일반 로그인 요청', () => {
//     const apiUrl = 'http://localhost:8080/api/v1/sign-in';
//     const credentials = {
//         username: 'wldmsrhkr@naver.com',
//         password: 'wldmsrhkr123',
//     };

//     it('일반 로그인 요청', () => {
//         cy.request({
//             method: 'POST',
//             url: apiUrl,
//             body: credentials,
//             headers: { 'Content-Type': 'application/json' },
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             // 응답 데이터 확인
//             expect(response.body).to.have.property('success', true);
//             expect(response.body).to.have.property('data');
//             expect(response.body.data).to.have.property('accessToken');
//             expect(response.body.data).to.have.property('name', '곽지은');
//             expect(response.body.data).to.have.property('role', 'MEMBER');
//         });
//     });
// });

// //뱅킹 서버에서 로그인
// describe('OAuth 뱅킹 서버 로그인', () => {
//     const loginUrl = 'http://localhost:8082/woori-bank/auth?responseType=code&clientId=dd791640-09a6-4a6f-961f-a4f482c8af5a&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2FoauthRedirect';
//     const username = 'wldmsrhkr';
//     const password = 'wldmsrhkr123';

//     it('OAuth 뱅킹 서버 로그인', () => {
//         cy.visit(loginUrl);

//         cy.get('input[name="username"]').type(username);
//         cy.get('input[name="password"]').type(password); 
//         cy.get('button[type="submit"]').click();

//         cy.url().should('include', '/'); 
//         cy.contains('어떤 집을 찾고 계신가요'); 
//     });
// });  