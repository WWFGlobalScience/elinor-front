export const state = () => ({
    error: null,
    alerts: {
        invalidCredentials: false,
        emailVerificationSent: false,
        emailVerificationRequired: false,
        passwordChangedSuccessfully: false,
        forgotPasswordEmailSent: false
    }
})

export const mutations = {
    setAlert(state, {name, value}) {
        state.alerts[name] = value;
    },
    setError(state, error) {
        state.error = error;
    },
    resetAlerts(state) {
        state.alerts = {
            invalidCredentials: false,
            emailVerificationSent: false,
            emailVerificationRequired: false,
            passwordChangedSuccessfully: false,
            forgotPasswordEmailSent: false
        };
    }
}

export const actions = {
    async signIn(state, credentials) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Login...'
        })

        try {
            await this.$auth.loginWith('local', {
                data: {
                    username: credentials.username,
                    password: credentials.password
                },
            })
            await this.dispatch('assessments/reset');
            if(!this.$auth.user.affiliation) {
                this.dispatch('popup/popupState', {active: true, component: 'popup-user-organization', title: 'Before you go'})
            }
            this.$router.push('/assessments');
        } catch (error) {
            if (error.response.data.non_field_errors) {
                if (error.response.data.non_field_errors[0] === 'E-mail is not verified.') {
                    state.commit('setAlert', {name: 'emailVerificationRequired', value: true});
                    state.commit('setAlert', {name: 'invalidCredentials', value: false});
                }

                if (error.response.data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
                    state.commit('setAlert', {name: 'invalidCredentials', value: true});
                }
            }
        }

        this.dispatch('loader/loaderState', {
            active: false,
            text: ''
        })
    },
    async signUp(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Registering...'
        })
        await this.$axios
            .$post('rest-auth/registration/', {
                username: form.username,
                email: form.email,
                password1: form.password1,
                password2: form.password2,
                first_name: form.first_name,
                last_name: form.last_name,
                affiliation: form.affiliation && form.affiliation.id,
                accept_tor: form.accept_tor,
            })
            .then((response) => {
                this.$router.push(`/status/email-verification-sent`)
            })
            .catch((e) => {
                const error = {...e.response.data};
                if(error.non_field_errors) {
                    if(error.non_field_errors[0] === "The two password fields didn't match.") {
                        error.password2 = ["The two password fields didn't match."];
                    }
                }
                setTimeout(() => {
                    this.$scrollTo('#' + Object.keys(error).filter((e) => e !== 'non_field_errors')[0], {offset: -100});
                })
                state.commit('setError', error);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: ''
                })
            });
    },
    async setUserOrganization(state, organizationId) {
        await this.$axios
            .$patch('rest-auth/user/', {
                affiliation: organizationId
            })
            .then((response) => {
                this.dispatch('popup/popupState', {
                    active: false
                })
            })
            .catch((error) => {
                state.commit('setError', error.response.data);
            });
    },
    async resendEmail(state, email) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Sending verification email...'
        })

        await this.$axios
            .$post('rest-auth/registration/resend-verification-email/', {email})
            .then((response) => {
                this.$router.push(`/status/email-verification-sent`)
            })
            .catch((error) => {
                state.commit('setError', error.response);
            });

        this.dispatch('loader/loaderState', {
            active: false,
            text: ''
        })
    },
    async forgotPassword(state, email) {
        await this.$axios
            .$post('rest-auth/password/reset/', {email})
            .finally((response) => {
                state.commit('setAlert', {name: 'forgotPasswordEmailSent', value: true});
            });
    },
    async resetForgotPassword(state) {
        state.commit('setAlert', {name: 'forgotPasswordEmailSent', value: false});
    },
    async resetPassword(state, {uid, token, password1, password2}) {
        await this.$axios
            .$post('rest-auth/password/reset/confirm/' + uid + '/' + token + '/', {
                uid,
                token,
                new_password1: password1,
                new_password2: password2,
            })
            .then((response) => {
                this.$router.push(`/status/password-changed-successfully`)
            })
            .catch((error) => {
                state.commit('setError', true);
            });
    },
    async confirmEmail(state, token) {
        await this.$axios
            .$post('rest-auth/account-confirm-email/', {key: token})
            .then((response) => {
                this.$router.push(`/status/email-confirmed-successfully`)
            })
            .catch((error) => {
                state.commit('setError', true);
            });
    },
    async logout(state) {
        await this.$auth.logout();
        await this.dispatch('assessments/reset');
        state.commit('resetAlerts')
        this.dispatch('dropdown/toggleDropdown');
        this.$router.push(`/`);
    }
}
