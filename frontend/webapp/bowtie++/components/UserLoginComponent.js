/**
 * UserLoginComponent
 * Description: uses to handle the login process via the login form (see login.html)
 */

Vue.component('UserLoginComponent',  {
    props: {
        title: String
    },
    template: '#user-login',
    data: function() {
        return {
            userEmail: '',
            userPassword: '',
            errors: {
                wrongCredentialsErr: {
                    message: 'Provided credentials are wrong. Please try again.',
                    show: false
                }
            }
        }
    },
    methods: {
        // Submit the login by fetching from the api
        loginSubmit: function () {
            let params = {"email": this.userEmail, "password": this.userPassword};
            fetch(window.LOGIN, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then(res => {
                    if (res.status == 400) {
                        this.userPassword = '';
                        this.errors.wrongCredentialsErr.show = true;
                    }
                    if(!res.ok) throw new Error('Error while login.');
                    return res.json();
                })
                .then(data => this.processToken(data.token))
            .catch(error => {
                console.error(error.message);
            });
        },
        // Handle the token if the login form has been correctly submitted
        processToken: function (token) {
            localStorage.setItem('token', token);
            fetch(window.USER_INFO, {
                method: 'get',
                headers: {
                    'Authorization': 'Token ' + token
                },
            })
                .then(res => res.json())
                .then(data => this.processName(data.username));
        },
        // Handle the user information after request
        processName: function (name) {
            localStorage.setItem('username', name);
            window.location.assign(window.BASE_PATH);

        }
    }
})

let login_vue = new Vue({
    el: '#login-form-container',
    data: {
        title: 'Login'
    }
})

