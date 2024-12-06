describe('OAuth 뱅킹 서버 로그인 및 마이페이지 이동 확인', () => {
    const loginUrl =
        'http://localhost:8082/woori-bank/auth?responseType=code&clientId=dd791640-09a6-4a6f-961f-a4f482c8af5a&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2FoauthRedirect';
    const username = 'wldmsrhkr';
    const password = 'wldmsrhkr123';

    it('로그인 후 마이페이지로 이동', () => {
        cy.visit(loginUrl);

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
        cy.contains('어떤 집을 찾고 계신가요').should('be.visible');
        cy.get('img[alt="Profile"]').click();

        cy.contains('마이페이지').click();
        cy.url().should('eq', 'http://localhost:3000/mypage');
    });
});


describe('OAuth 뱅킹 서버 로그인 및 마이페이지 이동 확인', () => {
    const loginUrl =
        'http://localhost:8082/woori-bank/auth?responseType=code&clientId=dd791640-09a6-4a6f-961f-a4f482c8af5a&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2FoauthRedirect';
    const username = 'wldmsrhkr';
    const password = 'wldmsrhkr123';

    it('로그인 후 마이페이지로 이동', () => {
        cy.visit(loginUrl);

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
        cy.contains('어떤 집을 찾고 계신가요').should('be.visible');
        cy.get('img[alt="Profile"]').click();

        cy.contains('마이페이지').click();
        cy.url().should('eq', 'http://localhost:3000/mypage');

        cy.contains('회원 정보 확인').should('be.visible');
        cy.contains('북마크 조회').should('be.visible');
        cy.contains('최근 본 대출 상품').should('be.visible');
    });
});



