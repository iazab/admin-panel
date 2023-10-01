interface LoginForm {
    username: string,
    password: string,

}

export default function () {
    return {
        logIn(form: LoginForm) {
            return useFetch<LoginForm>("https://fakestoreapi.com/auth/login", {
                method: "POST",
                body: form,
            })
        },
    };
}
