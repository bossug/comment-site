
export const CommentFormAuth = {
    props: ['showComment', 'path', 'query', 'id', 'child'],
    data()
    {
        return {
            showComment: this.showComment,
            path: this.path,
            text: null,
        }
    },
    computed: {},
    methods: {
        openCommentAuth()
        {
            this.$emit('openCommentAuth', true)
        },
        closeComment()
        {
            this.$emit('closeComment', false)
        },
        buttonSendComment()
        {
            this.$emit('buttonSendComment', {
                text: this.text,
                path: this.path
            })
        },
        buttonSendSubComment(id)
        {
            this.$emit('buttonSendComment', {
                text: this.subtext,
                path: this.path,
                comment_id: id,
            })
        }
    },
    template: `
        <template v-if="child">
            <form class="ui-ctl-w100">
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
                <div class="blockButton">
                    <div class="ui-ctl-label-text" @click="openCommentAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
                </div>
            </div>
            <div class="ui-form form-body" v-if="showComment">
                <form class="ui-ctl-w100" @submit.prevent="buttonSendComment">
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