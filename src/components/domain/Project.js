class Project {
    constructor(projectId, startDate = null, endDate = null, mainFeature = null, role = null, stack = null) {
        this.projectId = projectId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mainFeature = mainFeature;
        this.role = role;
        this.stack = stack;
    }
}

export default Project;