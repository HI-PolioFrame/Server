class Hackathon {
    constructor(hackId, hackName, startDate, endDate, description=null, picture=null) {
        this.hackId = hackId;
        this.hackName = hackName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.picture = picture;
    }
}

export default Hackathon;