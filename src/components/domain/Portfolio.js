// class Portfolio {
//   // 일반적으로 처음 포트폴리오를 작성할 떄
//   constructor(
//     portfolioId,
//     ownerId,
//     userEmail,
//     setTemplate,
//     title,
//     explanation = null,
//     share = false,
//     projects = null,
//     category = null,
//     comments = null,
//     likes = null
//   ) {
//     this.portfolioId = portfolioId;
//     this.owner = ownerId;
//     this.email = userEmail;
//     this.setTemplate = setTemplate;
//     this.title = title;
//     this.explanation = explanation;
//     this.share = share;
//     this.projects = projects;
//     this.category = category;
//     this.comments = comments;
//     this.likes = likes;
//   }
// }

class Portfolio {
  constructor(
    portfolioId,
    ownerId,
    ownerEamil,
    portfolioName,
    projects,
    usedLanguage,
    share
  ) {
    this.portfolioId = portfolioId; // 포트폴리오 ID
    this.ownerId = ownerId; // 소유자 ID
    this.ownerEmail = ownerEamil;
    this.portfolioName = portfolioName; // 포트폴리오 이름
    this.projects = projects; // 포함된 프로젝트들
    this.usedLanguage = usedLanguage; // 사용 언어
    this.share = share; // 공유 여부
  }
}

export default Portfolio;
