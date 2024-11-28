// class Hackathon {
//     constructor(hackId, hackName, startDate, endDate, link, memNumber, description, video=null, pictures=null, coverImage=null, logo=null) {
//         this.hackId = hackId;
//         this.hackName = hackName;
//         this.startDate = startDate;
//         this.endDate = endDate;
//         this.link = link;
//         this.memNumber = memNumber;
//         this.description = description;
//         this.video = video;
//         this.pictures = pictures;
//         this.coverImage = coverImage;
//         this.logo = logo;
//         this.ownerId = ownerId; // 저장
//         this.ownerEmail = ownerEmail; // 저장
//     }
// }

// export default Hackathon;

class Hackathon {
    constructor(
        hackId,
        hackName,
        startDate,
        endDate,
        link,
        memNumber = 0,
        maxMemNumber,
        description,
        video = null,
        pictures = null,
        coverImage = null,
        logo = null,
        ownerId, 
        ownerEmail,
        participant = []
    ) {
        this.hackId = hackId;
        this.hackName = hackName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.link = link;
        this.memNumber = memNumber;
        this.maxMemNumber = maxMemNumber;
        this.description = description;
        this.video = video;
        this.pictures = pictures;
        this.coverImage = coverImage;
        this.logo = logo;
        this.ownerId = ownerId; 
        this.ownerEmail = ownerEmail;
        this.participant = participant || []; 
    }

}

export default Hackathon;
