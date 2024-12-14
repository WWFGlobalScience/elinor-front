export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title',
        type: 'default',
        props: null,
        onConfirm: null,
        onClose: null,
        videoId: null,
    },
});

export const mutations = {
    popupState(
        state,
        { active, type, component, title, onConfirm, onClose, props, videoId },
    ) {
        state.popup.active = active;
        if (state.popup.active) {
            state.popup.component = component;
            state.popup.title = title;
            state.popup.type = type;
            state.popup.props = props;
            state.popup.onConfirm = onConfirm;
            state.popup.onClose = onClose;
            state.popup.videoId = videoId;
        } else {
            state.popup.component = null;
            state.popup.title = null;
            state.popup.onConfirm = null;
            state.popup.type = null;
            state.popup.videoId = null;
        }
    },
};

export const actions = {
    popupState(
        state,
        { active, type, component, title, onConfirm, onClose, props, videoId },
    ) {
        state.commit('popupState', {
            active,
            component,
            title,
            onConfirm,
            type,
            onClose,
            props,
            videoId,
        });
    },
};
