class Project {
  constructor(
    ownerName,
    ownerNickname,
    ownerEmail,
    usedTemplate,
    projectId,
    projectTitle,
    description,
    startDate = null,
    endDate = null,
    category = null,
    usedLanguage = null,
    projectLink = null,
    solving = null,
    challenge = null,
    video = null,
    coverImage = null,
    images = null,
    logo = null,
    share = false
  ) {
    this.ownerName = ownerName;
    this.ownerNickname = ownerNickname;
    this.ownerEmail = ownerEmail;
    this.usedTemplate = usedTemplate;
    this.projectId = projectId;
    this.projectTitle = projectTitle;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = category;
    this.usedLanguage = usedLanguage;
    this.projectLink = projectLink;
    this.solving = solving;
    this.challenge = challenge;

    this.video = video;
    this.coverImage = coverImage;
    this.images = images;
    this.logo = logo;
    this.share = share;
  }
}

export default Project;
