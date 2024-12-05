export default ({ app }, inject) => {
    const formDataStringify = (form) => {
        let formData = new FormData(form);
        let formDataToQs = {};

        formData.forEach((value, key) => (formDataToQs[key] = value));

        return formDataToQs;
    };
    inject('formDataStringify', formDataStringify);
};
