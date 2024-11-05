import { reactive } from "ui.vue3";
import { Loc } from "main.core";
const { runAction } = BX.ajax;

export const CommentForm = {
    props: {
        path: String,
        query: String,
        userId: Number,
        isUser: Boolean,
        isShowComment: Boolean
    },
    data() {
        return {
            NAME: "",
            LAST_NAME: "",
            EMAIL: "",
            text: "",
            nameError: "",
            lastNameError: "",
            emailError: "",
            textError: ""
        };
    },
    computed: {
        isNameValid() {
            return this.NAME.length > 4;
        },
        isLastNameValid() {
            return this.LAST_NAME.length > 4;
        },
        isEmailValid() {
            return /(.+)@(.+){2,}.(.+){2,}/.test(this.EMAIL);
        },
        isTextValid() {
            return this.text.length > 5;
        },
        isFormValid() {
            return this.isNameValid && this.isLastNameValid && this.isEmailValid && this.isTextValid;
        }
    },
    methods: {
        validateForm() {
            this.nameError = this.isNameValid ? "" : Loc.getMessage('ERROR_NAME');
            this.lastNameError = this.isLastNameValid ? "" : Loc.getMessage('ERROR_LAST_NAME');
            this.emailError = this.isEmailValid ? "" : Loc.getMessage('ERROR_EMAIL');
            this.textError = this.isTextValid ? "" : Loc.getMessage('ERROR_TEXT');
            return this.isFormValid;
        },
        sendComment() {
            if (this.validateForm()) {
                runAction("gk.comments.CC.ResponseGkComments.setComment", {
                    data: {
                        NAME: this.NAME,
                        LAST_NAME: this.LAST_NAME,
                        EMAIL: this.EMAIL,
                        text: this.text,
                        path: this.path,
                        query: this.query,
                        USER_ID: this.userId
                    }
                }).then(comment => {
                    this.$emit('comment-send', comment.data.object);
                    this.clearForm();
                });
            }
        },
        clearForm() {
            this.NAME = "";
            this.LAST_NAME = "";
            this.EMAIL = "";
            this.text = "";
            this.nameError = "";
            this.lastNameError = "";
            this.emailError = "";
            this.textError = "";
        }
    },
    template: `
        <form @submit.prevent="sendComment">
            <div v-if="!isUser">
                <div>
                    <label>{{ $Bitrix.Loc.getMessage('YOUR_NAME') }}</label>
                    <input v-model="NAME" type="text" required />        
                    <span v-if="nameError" class="error">{{ nameError }}</span>                   
                </div>
                <div>
                     <label>{{ $Bitrix.Loc.getMessage('YOUR_LAST_NAME') }}</label>
                     <input v-model="LAST_NAME" type="text" required />
                     <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
                </div>
                <div>
                    <label>{{ $Bitrix.Loc.getMessage('YOUR_EMAIL') }}</label>
                    <input v-model="EMAIL" type="email" required />
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
            </div>
            <div>
                <label>{{ $Bitrix.Loc.getMessage('YOUR_COMMENT') }}</label>
                <span v-if="textError" class="error">{{ textError }}</span>
                <textarea v-model="text" required></textarea>
            </div>
            <button type="submit" :disabled="!isFormValid">
                {{ $Bitrix.Loc.getMessage('SEND_COMMENT') }}
            </button>
        </form>
    `
};