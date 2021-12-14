<template>
  <div class="modal flex">
      <div class="modal-content">
          <p>Jeste sigurni da želite izaći? Vaše promjene se neće spremiti!</p>
          <div class="actions flex">
              <button @click="closeModal" class="purple">Vrati se</button>
              <button @click="closeLoan" class="red">Izađi</button>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "modal",
    methods: {
        ...mapMutations(["TOGGLE_MODAL","TOGGLE_LOAN","TOGGLE_EDIT_LOAN"]),
        closeModal() {
            this.TOGGLE_MODAL();
        },
        closeLoan() {
            this.TOGGLE_MODAL();
            this.TOGGLE_LOAN();
            if(this.editLoan){
              this.TOGGLE_EDIT_LOAN();
            }
        }
    },
    computed: {
      ...mapState(["editLoan"])
    }
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #222831;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      
      .purple {
        background-color: #D65A31;
      }
      button {
        flex: 1;
      }
    }
  }
}
</style>