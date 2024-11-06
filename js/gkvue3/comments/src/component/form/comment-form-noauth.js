
export const CommentFormNoauth = {
    props: ['showComment', 'path', 'query', 'child', 'id', 'userData'],
    data()
    {
        //BX.localStorage.remove('userData')
        //let userData = BX.localStorage.get('userData');
        return {
            showComment: this.showComment,
            child: this.child,
            path: this.path,
            text: null,
            userData: this.userData,
            fullName: null
        }
    },
    computed: {
        isFullName()
        {
            console.log(this.userData)
            if (this.userData !== null) {
                this.fullName = this.userData.LAST_NAME + ' ' + this.userData.NAME;
            }
            return this.userData !== null
        }
    },
    methods: {
        openCommentNotAuth()
        {
            this.$emit('openCommentNotAuth', true)
        },
        closeCommentAuth()
        {
            this.$emit('closeCommentAuth', false)
        },
        buttonSendComment()
        {
            if (!this.userData) {
                this.userData = BX.localStorage.set('userData', JSON.stringify({
                    NAME: this.NAME,
                    LAST_NAME: this.LAST_NAME,
                    EMAIL: this.EMAIL,
                }), 56000000)
            }
            this.$emit('buttonSendComment', {
                NAME: this.userData ? this.userData.NAME : this.NAME,
                LAST_NAME: this.userData ? this.userData.LAST_NAME : this.LAST_NAME,
                EMAIL: this.userData ? this.userData.EMAIL : this.EMAIL,
                text: this.text,
                userId: 0,
                path: this.path
            })
        },
        buttonSendSubComment(id)
        {
            if (!this.userData) {
                this.userData = BX.localStorage.set('userData', JSON.stringify({
                    NAME: this.NAME,
                    LAST_NAME: this.LAST_NAME,
                    EMAIL: this.EMAIL,
                }), 56000000)
            }
            this.$emit('buttonSendComment', {
                NAME: this.userData ? this.userData.NAME : this.NAME,
                LAST_NAME: this.userData ? this.userData.LAST_NAME : this.LAST_NAME,
                EMAIL: this.userData ? this.userData.EMAIL : this.EMAIL,
                text: this.subtext,
                userId: 0,
                path: this.path,
                comment_id: id,
            })
        }
    },
    template: `
        <template v-if="child">
            <form class="ui-ctl-w100">
                <div class="ui-form-row-inline" v-if="!isFullName">
                    <div class="ui-form-row">
                        <div class="ui-form-label">
                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>
                        </div>
                        <div class="ui-form-content">
                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                <input type="text" v-model="NAME" name="NAME" class="ui-ctl-element">
                            </div>
                        </div>
                    </div>
                    <div class="ui-form-row">
                        <div class="ui-form-label">
                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>
                        </div>
                        <div class="ui-form-content">
                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                <input type="text" v-model="LAST_NAME" name="LAST_NAME" class="ui-ctl-element">
                            </div>
                        </div>
                    </div>
                    <div class="ui-form-row">
                        <div class="ui-form-label">
                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>
                        </div>
                        <div class="ui-form-content">
                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                <input type="text" v-model="EMAIL" name="EMAIL" class="ui-ctl-element">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui-form-row">
                    <div class="ui-form-label">
                        <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>
                    </div>
                    <div class="ui-form-content">
                        <div class="ui-ctl-xs ui-ctl-textarea ui-ctl-w100">
                            <textarea v-model="subtext" name="text" class="ui-ctl-element require"></textarea>
                        </div>
                    </div>
                    <div class="ui-form-content mt-3">
                        <input class="ui-btn ui-btn-success" type="button" @click="buttonSendSubComment(id)" :value="$Bitrix.Loc.getMessage('SEND_COMMENT')" />
                    </div>
                <div>
            </form>
        </template>
        <template v-if="!child">
            <div class="button-body">
                <div class="title" v-if="!isFullName">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>
                <div class="title" v-else>{{fullName}}</div>
                <div class="blockButton">
                    <div class="ui-ctl-label-text" @click="openCommentNotAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
                    <div class="ui-ctl-label-text closeComments" @click="closeCommentAuth" v-if="showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
                </div>
            </div>
            <div class="ui-form form-body" v-if="showComment">
                <form class="ui-ctl-w100" @submit.prevent="buttonSendComment">
                    <div class="ui-form-row-inline" v-if="!isFullName">
                        <div class="ui-form-row">
                            <div class="ui-form-label">
                                <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>
                            </div>
                            <div class="ui-form-content">
                                <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                    <input type="text" v-model="NAME" name="NAME" class="ui-ctl-element">
                                </div>
                            </div>
                        </div>
                        <div class="ui-form-row">
                            <div class="ui-form-label">
                                <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>
                            </div>
                            <div class="ui-form-content">
                                <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                    <input type="text" v-model="LAST_NAME" name="LAST_NAME" class="ui-ctl-element">
                                </div>
                            </div>
                        </div>
                        <div class="ui-form-row">
                            <div class="ui-form-label">
                                <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>
                            </div>
                            <div class="ui-form-content">
                                <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                    <input type="text" v-model="EMAIL" name="EMAIL" class="ui-ctl-element">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui-form-row">
                        <div class="ui-form-label">
                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>
                        </div>
                        <div class="ui-form-content">
                            <div class="ui-ctl-xs ui-ctl-textarea ui-ctl-w100">
                                <textarea v-model="text" name="text" class="ui-ctl-element require"></textarea>
                            </div>
                        </div>
                        <div class="ui-form-content mt-3">
                            <input class="ui-btn ui-btn-success" type="submit" :value="$Bitrix.Loc.getMessage('SEND_COMMENT')" />
                        </div>
                    <div>
                </form>
            </div>
        </template>
    `
}