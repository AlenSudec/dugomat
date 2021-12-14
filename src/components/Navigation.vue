<template>
<header class="flex">
    <div class="branding flex">
        <font-awesome-icon :icon="['fas', 'hand-holding-dollar']" />
        <h2>Dugomat</h2>
    </div>
    
    <div class="login-register">
        <div class="header__login" v-if="!user.loggedIn">
            <a @click.prevent="signIn">Prijava</a>
        </div>
        <div class="header__register" v-if="!user.loggedIn">
            <a @click.prevent="register">Registracija</a>
        </div>
        
    </div>
    <div v-if="user.loggedIn" class="dropdown">
        <div  class="dropdown__header" @click="toggleDropdown($event)">
            <span class="dropdown__email">{{user.data.email}} </span>
            <font-awesome-icon :icon="['fas', 'angle-double-down']" />
        </div>
        <div 
            ref="dContentWrap"
            class="dropdown__content">
            <ul>
                <li><a @click.prevent="signOut">Sign Out</a></li>
            </ul>
        </div>
    </div>
    
   
    
</header> 
</template>

<script>
    import { mapGetters } from "vuex";
    import { getAuth, signOut } from "firebase/auth";
    import store from "../store/index";
    
    

    export default {
        
        name: "navigation",
        computed: {
            ...mapGetters({
                user: "user"
            })
            
        },
        methods: {
            
            signOut() {
                const auth = getAuth();
                signOut(auth).then(() => {
                    this.$router.replace({
                        name: "Login"
                    });
                   
                    
                    store.commit("SET_LOGGED_IN", false);
                    
                }).catch(err => {
                    this.error = err.message;
                });
                

                
            },
            toggleDropdown(event){
                event.currentTarget.classList.toggle("is-active"); 
            },
            register () {
                this.$router.replace({
                    name: "Register"
                });
            },
            signIn () {
                this.$router.replace({
                    name: "Login"
                })
            }
        },
       
        
    };
</script>

<style lang="scss" scoped>
header{
    z-index: 99;
    flex-direction: row;
    background-color: #393E46;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .login-register {
        margin-right: 50px;
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        div {
            color: #FFFFFF;
            padding: 10px;
            background-color: #333333;
            border-radius: 10px;
            cursor: pointer;
        }
        .header__register {
            background-color: #222831;
        }
        .header__login {
            background-color: #D65A31;
        }
    }
    @media(min-width: 900px){
        min-height: 100%;
        min-width: 90px;
        flex-direction: row;
        
    }
    .dropdown {
        display: flex;
        
        flex-direction: column;
        justify-content: center;
        margin-top: 10px;
        margin-right: 40px;
        &__header {
            cursor: pointer;
            line-height: 50px;
            padding-left: 10px;
            padding-right: 10px;
            color: #FFFFFF;
            position: relative;
            text-overflow: ellipsis;
            

            &.is-active {
                
                + .dropdown__content {
                    
                    height: auto;
                    opacity: 1;
                    visibility: visible;
                }
            }
            .dropdown__email{
                margin-right: 10px;
            }
        }
        &__content{
            height: 0;
            opacity: 0;
            background: #D65A31;
            border-radius: 10px;
            text-align: center;
            width: 200px;
            position: absolute;
            overflow: hidden;
            padding: 15px 10px;
            margin-top: 90px;
            margin-left: 10px;
            color: #FFFFFF;
            transition: opacity .5s;
            visibility: hidden;
            li {
                cursor: pointer;
            }
        }
    }
    .branding {
        border-radius: 0 20px 20px 0;
        background-color: #D65A31;
        justify-content: center;
        padding: 24px;
        
        @media(min-width: 900px){
            width: 235px;
        }
        h2 {
            color: #FFFFFF;
            
        }
        
        .fa-hand-holding-dollar {
            color: #FFFFFF;
            width: auto;
            height: 35px;
            margin-right: 10px;
        }
    }
}
</style>
