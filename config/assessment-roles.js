export const roles = {
    admin: 70,
    contributor: 40,
    observer: 10
}

export const isAssessmentAdmin = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, roles.admin);
}

export const isAssessmentContributor = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, roles.contributor);
}

export const isAssessmentObserver = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, roles.observer);
}

export const isAssessmentCollaborator = (auth, assessment) => {
    return findAssessmentCollaboratorUser(auth.user, assessment) !== undefined;
}

export const findAssessmentCollaboratorUser = (user, assessment) => {
    return assessment.collaborators && assessment.collaborators.filter(collaborator => collaborator.user.id === user.id)[0];
}

const userHasAssessmentRole = (auth, assessment, role) => {
    const user = findAssessmentCollaboratorUser(auth.user, assessment);
    return user && user.role === role;
}


export const getMyRole = (auth, assessment) =>  {
    const user = findAssessmentCollaboratorUser(auth.user, assessment);
    if(user) {
        return user.role;
    }
}

export const getMyRoleName = (auth, assessment) =>  {
    const user = findAssessmentCollaboratorUser(auth.user, assessment);
    if(user) {
        return Object.keys(roles).find(key => roles[key] === user.role);
    }
}
