describe('OAuth 뱅킹 서버 로그인 g후 소비 패턴 분석 확인', () => {
    const loginUrl =
    'http://localhost:8082/woori-bank/auth?responseType=code&clientId=dd791640-09a6-4a6f-961f-a4f482c8af5a&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2FoauthRedirect';
    const username = 'wldmsrhkr';
    const password = 'wldmsrhkr123';

    it('로그인 후 소비 패턴 분석 확인', () => {
        cy.visit(loginUrl);

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
        cy.contains('어떤 집을 찾고 계신가요').should('be.visible');

        cy.contains('소비 패턴 분석').click();
        
        // 고객 유형이 없는 경우
        cy.contains('고객 유형이 존재하지 않습니다.').should('be.visible');
    });
});
