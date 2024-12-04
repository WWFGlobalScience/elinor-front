export const state = () => ({
    list: [],
    pagination: { count: 0, next: 0 },
});

export const mutations = {
    setList(state, payload) {
        state.list = payload;
    },
    setPaginationCount(state, payload) {
        state.pagination.count = payload;
    },
    setPaginationNext(state, payload) {
        state.pagination.next = payload;
    },
};

export const actions = {
    async fetchDocuments(state, { page, sortBy, sortOrder }) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching documents...',
        });

        try {
            let url = 'v2/documents/';
            const params = [];

            if (sortBy)
                params.push(
                    'ordering=' + (sortOrder === 'desc' ? '-' : '') + sortBy,
                );
            if (page) params.push('page=' + page);
            url = url += '?' + params.join('&');

            const response = await this.$axios({ method: 'get', url });

            state.commit('setList', response.data.results);
            state.commit('setPaginationCount', response.data.count);
            state.commit('setPaginationNext', response.data.next);

            this.dispatch('loader/loaderState', { active: false });
        } catch (e) {
            console.error(e);
        }
    },
    async downloadDocument(state, document) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Downloading document...',
        });

        try {
            const responseType = 'blob';
            const response = await this.$axios.get(document.file, {
                responseType,
                transformRequest: (data, headers) => {
                    delete headers['Authorization'];
                    delete headers.common['Authorization'];
                    return data;
                },
            });
            const objectURL = window.URL.createObjectURL(
                new Blob([response.data]),
            );
            const link = window.document.createElement('a');
            link.href = objectURL;
            const filename = document.file.split('/').pop();
            link.setAttribute('download', filename);
            window.document.body.appendChild(link);
            link.click();

            this.dispatch('loader/loaderState', { active: false });
        } catch (e) {
            console.error(e);
        }
    },
};
