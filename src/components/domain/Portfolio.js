class Portfolio {
  // 일반적으로 처음 포트폴리오를 작성할 떄
  constructor(
    portfolioId,
    ownerId,
    userEmail,
    setTemplate,
    title,
    explanation = null,
    share = false,
    projects = null,
    category = null,
    comments = null,
    likes = null
  ) {
    this.portfolioId = portfolioId;
    this.owner = ownerId;
    this.email = userEmail;
    this.setTemplate = setTemplate;
    this.title = title;
    this.explanation = explanation;
    this.share = share;
    this.projects = projects;
    this.category = category;
    this.comments = comments;
    this.likes = likes;
  }
}

export default Portfolio;
