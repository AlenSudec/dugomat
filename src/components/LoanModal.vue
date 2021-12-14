<template>
  <div
    @click="checkClick"
    ref="loanWrap"
    class="loan-wrap flex flex-column"
  >
    <form @submit.prevent="submitForm" class="loan-content">
        <Loading v-show="loading"/>
      <h1 v-if="!editLoan">Nova posudba</h1>
      <h1 v-else>Uredi posudbu</h1>
      <h1>Korisnik: {{user.data.email}}</h1>

      <!-- borrower -->
      <div class="bill-to flex flex-column">
        <h4>Osoba koja posuđuje</h4>
        <div class="input flex flex-column">
          <label for="clientName">Ime i prezime</label>
          <input required type="text" id="clientName" v-model="clientName" placeholder="Pero Perić"/>
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">E-mail</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" placeholder="pero@gmail.com"/>
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Adresa</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="clientStreetAddress"
            placeholder="Ulica Pere 18"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">Grad</label>
            <input required type="text" id="clientCity" v-model="clientCity" placeholder="Zagreb"/>
          </div>
        </div>
      </div>

      <!-- detalji posudbe -->
      <div class="loan-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="loanDate">Datum posudbe</label>
            <input
              disabled
              type="text"
              id="loanDate"
              
              v-model="loanDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Datum plaćanja</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              placeholder="xx/xx/xxxx"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Iznos roka za plaćanje (u danima)</label>
          <input type="number" id="paymentTerms" v-model="paymentTerms" placeholder="7">
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Opis posudbe</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>
        <div>
          <div class="input flex flex-column">
            <label for="loanTotal">Iznos posudbe (kn)</label>
            <input
              type="number"
              id="loanTotal"
              v-model="loanTotal"
            />
           
          </div>
        </div>
      </div>

      <!-- save/exit  -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeLoan" class="red">Odustani</button>
        </div>
        <div class="right flex">
          <button v-if="!editLoan" type="submit" @click="saveDraft" class="dark-purple">Spremi u pripremu</button>
          <button v-if="!editLoan" type="submit" @click="publishLoan" class="purple">
            Nova posudba
          </button>
          <button v-if="editLoan" class="purple" type="submit">Uredi posudbu</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import { uid } from "uid";
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading.vue";
import store from "../store/index";
export default {//name change
  name: "loanModal",
  data() {
    return {
        created : null,
        dateOptions: { year: "numeric", month: "short", day: "numeric"},
        docId: null,
        loading: null,
        clientName: null,
        clientEmail: null,
        clientStreetAddress: null,
        clientCity: null,
        loanDateUnix: null,
        loanDate: null,
        paymentTerms: null,
        paymentDueDateUnix: null,
        paymentDueDate: null,
        productDescription: null,
        loanPending: null,
        loanDraft: null,
        loanItemList: [],
        loanTotal: 0,
    };
  },
  created() {

    //get current date for loan date field
    if(!this.editLoan) {
      this.loanDateUnix = Date.now();
      this.loanDate = new Date(this.loanDateUnix).toLocaleDateString('hr-HR', this.dateOptions);
    }

    if(this.editLoan) {
      const currentLoan = this.currentLoanArray[0];
      this.docId = currentLoan.docId;
      this.clientName = currentLoan.clientName;
      this.clientEmail = currentLoan.clientEmail;
      this.clientStreetAddress = currentLoan.clientStreetAddress;
      this.clientCity = currentLoan.clientCity;
      this.loanDateUnix = currentLoan.loanDateUnix;
      this.loanDate = currentLoan.loanDate;
      this.paymentTerms = currentLoan.paymentTerms;
      this.paymentDueDateUnix = currentLoan.paymentDueDateUnix;
      this.paymentDueDate = currentLoan.paymentDueDate;
      this.productDescription = currentLoan.productDescription;
      this.loanPending = currentLoan.loanPending;
      this.loanDraft = currentLoan.loanDraft;
      this.loanTotal = currentLoan.loanTotal;
    }
  },
  components: {
      Loading,
  },
  methods: {
      ...mapMutations(["TOGGLE_LOAN", "TOGGLE_MODAL","TOGGLE_EDIT_LOAN"]),

      ...mapActions(["UPDATE_LOAN","GET_LOANS"]),

      checkClick(e) {
          
          if(e.target === this.$refs.loanWrap){
              this.TOGGLE_MODAL();
          }
      },
      closeLoan() {
        this.TOGGLE_LOAN();
        if (this.editLoan){
          this.TOGGLE_EDIT_LOAN();
        }
      },
      addNewLoanItem() {
          this.loanItemList.push({
              id: uid(),
              itemName: "",
              qty: "",
              price: 0,
              total: 0,
          });
      },
      deleteLoanItem(id){
          this.loanItemList = this.loanItemList.filter(item => item.id !== id);
      },
      publishLoan(){
          this.loanPending = true;
      },
      saveDraft() {
          this.loanDraft = true;
      },
      async uploadLoan(){
        this.loading = true;

       

        const dataBase = db.collection("loans").doc(); // change db
        await dataBase.set({
          
          created: store.state.user.data.email,
          loanId: uid(6),
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          loanDate: this.loanDate,
          loanDateUnix: this.loanDateUnix,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          loanTotal: this.loanTotal,
          loanPending: this.loanPending,
          loanDraft: this.loanDraft,
          loanPaid: null,
          
        });

        this.loading = false;
        this.TOGGLE_LOAN();
        this.GET_LOANS();
      },

      async updateLoan() {

        this.loading = true;
        
        const dataBase = db.collection("loans").doc(this.docId); // change name

        await dataBase.update({
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          loanTotal: this.loanTotal,
        });

        this.loading = false;

        const data = {
          docId: this.docId,
          routeId: this.$route.params.loanId,
        };

        this.UPDATE_LOAN(data);
      },
      submitForm() {
        if(this.editLoan){
          this.updateLoan();
          return;
        }
        this.uploadLoan();
      }
  },
  computed : {
    ...mapState(["editLoan","currentLoanArray"]),
    ...mapGetters({
      user: "user"
    }),
    
  },
  watch: {
      paymentTerms() {
          const futureDate = new Date();
          this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
          this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("hr-HR",this.dateOptions);
      }
  }
};

</script>
<style lang="scss" scoped>
.loan-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  z-index: 3;
  &::-webkit-scrollbar {
      display: none;
  }
  @media (min-width: 900px) {
    left: 0px;
  }

  .loan-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    z-index: 2;
    background-color: #2f3846;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    h1 {
      margin-bottom: 32px;
      color: #fff;
      font-size: 26px;
      &:nth-child(3){
        font-size: 15px;
      }
    }
    
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      color: #FFFFFF;
      font-size: 20px;
      margin-bottom: 24px;
    }
    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;
      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    //loan work
    .loan-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
    }

    .work-items {
      .item-list {
        width: 100%;

        //Item Table Styling
        .table-heading,
        .table-items {
          gap: 16px;
          font-size: 12px;

          .item-name {
            flex-basis: 50%;
          }
          .qty {
            flex-basis: 10%;
          }
          .price {
            flex-basis: 20%;
          }
          .total {
            flex-basis: 20%;
            align-self: center;
          }
        }
        .table-heading {
          margin-bottom: 16px;
          th {
            text-align: left;
          }
        }
        .table-items {
          position: relative;
          margin-bottom: 24px;

          img {
            position: absolute;
            top: 15px;
            right: 0;
            width: 12px;
            height: 16px;
          }
        }
      }
      .button {
        color: #fff;
        background-color: #252945;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
          margin-right: 4px;
        }
      }
    }
  }
  .save {
    margin-top: 60px;
    justify-content: space-between;
    }
    div {
      
    .right {
      justify-content: flex-end;
      .dark-purple {
        background: #393E46;
      }
      .purple {
        background: #D65A31;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }
  .label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    background: #2f3846;
    width: 100%;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    border-bottom: 2px solid #FFFFFF;
    &:focus {
                    outline: none;
                    border-bottom: 2px solid #FFFFFF;
                }


    &:focus {
      outline: none;
    }
  }
}
</style>