<template>
<div class="container__money">
    <font-awesome-icon :icon="['fas', 'money-bill-wave']" />
    <font-awesome-icon :icon="['fas', 'credit-card']" />
</div>
    <div class="container">
        
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Prijava</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form action="#" @submit.prevent="submit">
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
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
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
                                    <button type="submit" class="btn btn-primary">Log in</button>
                                </div>
                            </div>
                        </form>
                        <div class="registerbtn"><a @click.prevent="register">Nemaš račun? Registriraj se</a></div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import store from "../store/index";

    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                },
                error: null,
            };
        },
        methods: {
            submit() {
                    const auth = getAuth();
                    signInWithEmailAndPassword(auth, this.form.email, this.form.password)
                        .then(() => {
                            this.$router.replace({ name: "Home"});
                            store.commit("SET_LOGGED_IN", true);
                        })
                        .catch(err => {
                            this.error = err.message;
                        });
                        
            },
            register(){
                this.$router.replace({ name: "Register"});
            }
        },
        
    };
</script>
<style lang="scss" scoped>
    .container__money {
            color: #D65A31;
            opacity: 0.5;
            position: absolute;
            z-index: 0;
            overflow: none;
            .fa-money-bill-wave{
                
                transform: rotate(290deg) scale(20);
                margin-left:215px;
                margin-top: 335px;
            }
            .fa-credit-card {
                transform: rotate(290deg) scale(20);
                margin-left:1400px;
                margin-top: 335px;
            }
        }
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
    .registerbtn {
        text-align: center;
        cursor: pointer;
        text-decoration: underline;
    }
    label {
        font-size: 20px;
    }
</style>