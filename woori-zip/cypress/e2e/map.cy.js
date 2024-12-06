describe('/map Page - 카테고리 메뉴 눌렀을때', () => {
    beforeEach(() => {
        cy.visit('/map');
    });

    it('버튼을 눌렀을때 "음식료품" 버튼이 나오는지', () => {
      // 카테고리 메뉴 버튼 클릭
        cy.get('button.NavBar_categoryButton__3osBF').click();

      // 음식료품 텍스트가 화면에 나타나는지 확인
        cy.contains('음식료품').should('be.visible');
    });
});


describe('/map Page - Kakao Map Rendering', () => {
    beforeEach(() => {
      cy.visit('/map');
    });
  
    it('should render the Kakao Map', () => {
      // 지도 컨테이너가 존재하는지 확인
      cy.get('#map').should('be.visible');
    });
});
