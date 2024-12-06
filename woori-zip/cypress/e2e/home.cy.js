describe('메인 페이지', () => {
    it('메인 페이지가 보이는지', () => {
        cy.visit('/'); 
        cy.contains('WOORI ZIP'); 
    });

    it('집 항목이 뜨는지', () => {
        cy.visit('/map'); 
        cy.contains('원/투룸');
        cy.contains('오피스텔');
        cy.contains('주택/빌라');
        cy.contains('아파트');
    });
});
