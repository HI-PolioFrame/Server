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
        memNumber,
        description,
        video = null,
        pictures = null,
        coverImage = null,
        logo = null,
        ownerId, // 추가된 매개변수
        ownerEmail // 추가된 매개변수
    ) {
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
        this.ownerId = ownerId; // 저장
        this.ownerEmail = ownerEmail; // 저장
    }
}

export default Hackathon;
