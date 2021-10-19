const roles = {
    70: 'admin',
    40: 'contributor',
    10: 'observer'
}

export default roles;

export const isAssessmentAdmin = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, 70);
}

export const isAssessmentContributor = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, 40);
}

export const isAssessmentObserver = (auth, assessment) => {
    return userHasAssessmentRole(auth, assessment, 10);
}

export const isAssessmentCollaborator = (auth, assessment) => {
    return findAssessmentCollaboratorUser(auth, assessment) !== undefined;
}

const findAssessmentCollaboratorUser = (auth, assessment) => {
    if(auth && auth.loggedIn) {
        return assessment.collaborators && assessment.collaborators.filter(collaborator => collaborator.user.id === auth.user.id)[0];
    }
}

const userHasAssessmentRole = (auth, assessment, role) => {
    const user = findAssessmentCollaboratorUser(auth, assessment);
    return user && user.role === role;
}


export const getMyRole = (auth, assessment) =>  {
    const user = findAssessmentCollaboratorUser(auth, assessment);
    if(user) {
        return roles[user.role];
    }
}
