<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Registracija</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Ime i prezime</label>
                                <div class="col-md-6">
                                    <input
                                        id="name"
                                        type="name"
                                        class="form-control"
                                        name="name"
                                        value
                                        required
                                        autofocus
                                        v-model="form.name"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        value
                                        required
                                        autofocus
                                        v-model="form.email"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Lozinka</label>
                                <div class="col-md-6">
                                    <input
                                        id="password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        required
                                        v-model="form.password"
                                    />
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">Registriraj se</button>
                                </div>
                            </div>
                        </form>
                        <div class="loginbtn"><a @click.prevent="login">Već imaš račun? Prijavi se</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import store from "../store/index";
    export default {
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    password: ""
                },
                error: null
            };
        },
        methods : {
            submit() {
                const auth = getAuth();
                
                createUserWithEmailAndPassword(auth,this.form.email, this.form.password)
                .then(data => {
                    const user = data.user;
                    user.displayName = this.form.name;
                    store.commit("SET_LOGGED_IN", true);
                    this.$router.replace({
                        name: "Home"
                    });
                })
                
                .catch(err => {
                    this.error = err.message;
                });
            },
            login(){
                this.$router.replace({ name: "Login"});
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        position: relative;
        z-index: 2;
        margin-top: auto;
        margin-bottom: auto;
        min-height: 800px;
        display: flex;
        justify-content: center;
        background: #393E46;
        border-radius: 20px 20px;
        color: #FFFFFF;
        
        .row {
            padding: 30px;
            position: relative;
            
        }
    }
    .card {
        .card-header {
            text-align: center;
            font-size: 32px;
            color: #D65A31;
            font-weight: 600;
        }
        
    }
    input {
        outline: none;
        background: none;
        border: none;
        border-bottom: 2px solid #D65A31;
        color: #FFFFFF;
        margin-top: 20px;
        font-size: 18px;
    }
    .btn-primary {
        background-color: #D65A31;
        font-size: 20px;
        width: 100%;
       
    }
    .loginbtn {
        text-align: center;
        cursor: pointer;
        text-decoration: underline;
    }
    label {
        font-size: 20px;
    }
</style>