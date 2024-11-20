class Hackathon {
    constructor(hackId, hackName, startDate, endDate, link, memNumber, description, video=null, pictures=null, coverImage=null, logo=null) {
        this.hackId = hackId;
        this.hackName = hackName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.link = link;
        this.memNumber = memNumber;
        this.description = description;
        this.video = video;
        this.pictures = pictures;
        this.coverImage = coverImage;
        this.logo = logo;
    }
}

export default Hackathon;