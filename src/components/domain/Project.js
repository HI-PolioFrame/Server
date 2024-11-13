class Project {
  constructor(
    ownerName,
    ownerId,
    ownerNickname,
    ownerEmail,
    usedTemplate,
    projectId,
    projectTitle,
    description,
    period,
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
    this.ownerId = ownerId;
    this.ownerNickname = ownerNickname;
    this.ownerEmail = ownerEmail;
    this.usedTemplate = usedTemplate;
    this.projectId = projectId;
    this.projectTitle = projectTitle;
    this.description = description;
    this.period = period;
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
