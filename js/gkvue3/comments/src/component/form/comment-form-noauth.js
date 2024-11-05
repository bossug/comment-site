

export const CommentFormNoauth = {
    props: ['showComment', 'path', 'query'],
    data()
    {
        return {
            showComment: this.showComment,
            path: this.path,
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
            this.$emit('buttonSendComment', {
                NAME: this.NAME,
                LAST_NAME: this.LAST_NAME,
                EMAIL: this.LAST_NAME,
                text: this.text,
                userId: 0,
                path: this.path
            })
        }
    },
    template: `
        <div class="button-body">
            <div class="title">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>
            <div class="blockButton">
                <div class="ui-ctl-label-text" @click="openCommentNotAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
                <div class="ui-ctl-label-text" @click="closeCommentAuth" v-if="showComment" id="closeComments" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
            </div>
        </div>
        <div class="ui-form form-body" v-if="showComment">
            <form id="addComment" class="ui-ctl-w100" @submit.prevent="buttonSendComment">
                <div class="ui-form-row-inline">
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
    `
}