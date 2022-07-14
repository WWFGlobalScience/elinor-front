export const required_fields = {
    data: [
        'name',
        'year',
        'organization',
        'person_responsible_role',
        'count_community',
        'count_academic',
        'count_government',
        'count_private',
        'count_indigenous',
        'collection_method',
        'collection_method_text',
        'consent_given',
        'consent_given_written'
    ],
    managed_area: [
        'name',
        'countries',
        'regions',
        'date_established',
        'recognition_level',
        'governance_type',
        'objectives',
        'management_authority',
        'support_sources'
    ]
};

export const initProgress = () => {
    return {
        data: {
            complete: false,
            percentage: 0,
            filled: 0,
            required: required_fields.data.length
        },
        managed_area: {
            complete: false,
            percentage: 0,
            filled: 0,
            required: required_fields.managed_area.length
        },
        survey: {
            complete: false,
            percentage: 0
        },
        collaborators: {
            complete: false,
            percentage: 0,
            filled: 0,
            required: 2
        },
        published: false,
        overall_percentage: 0
    }
};

export const calculateProgress = (assessment) => {
    const progress = initProgress();
    progress.data.filled = 0;
    for (let field of required_fields.data) {
        if (assessment[field] !== null && assessment[field] !== "") progress.data.filled++;
    }

    progress.data.percentage = progress.data.filled / progress.data.required * 100;
    progress.data.percentage = progress.data.percentage < 100 ? progress.data.percentage : 100;
    progress.data.complete = progress.data.percentage === 100;
    progress.overall_percentage += 25 * progress.data.percentage / 100;


    //MANAGED AREA
    progress.managed_area.filled = 0;
    for (let field of required_fields.managed_area) {
        const managementArea = assessment.management_area_countries;
        if (managementArea && managementArea[field]) progress.managed_area.filled++;
        else console.log(field);
    }

    progress.managed_area.percentage = progress.managed_area.filled / progress.managed_area.required * 100;
    progress.managed_area.percentage = progress.managed_area.percentage < 100 ? progress.managed_area.percentage : 100;
    progress.managed_area.complete = progress.managed_area.percentage === 100;
    progress.overall_percentage += 25 * progress.managed_area.percentage / 100;


    //SURVEY
    progress.survey.percentage = assessment.percent_complete;
    progress.survey.complete = progress.survey.percentage === 100;
    progress.overall_percentage += 25 * progress.survey.percentage / 100;


    //COLLABORATORS
    progress.collaborators.filled = assessment.collaborators.length;
    progress.collaborators.percentage = progress.collaborators.filled / progress.collaborators.required * 100;
    progress.collaborators.percentage = progress.collaborators.percentage < 100 ? progress.collaborators.percentage : 100;
    progress.collaborators.complete = progress.collaborators.percentage === 100;
    progress.overall_percentage += 25 * progress.collaborators.percentage / 100;

    return progress;
}
