
export const CommentFormEdit = {
    props: ['subtext', 'id', 'path'],
    data()
    {
        return {
            edittext: this.subtext,
        }
    },
    methods: {
        buttonEditSubComment(id)
        {
            this.$emit('buttonEditComment', {
                text: this.edittext,
                id: id,
                path: this.path,
                query: this.query
            })
        }
    },
    template: `
        <div class="ui-form-row">
            <div class="ui-form-label">
                <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_EDIT_COMMENT')}}</div>
            </div>
            <div class="ui-form-content">
                <div class="ui-ctl-xs ui-ctl-textarea ui-ctl-w100">
                    <textarea v-model="edittext" class="ui-ctl-element require"></textarea>
                </div>
            </div>
            <div class="ui-form-content mt-3">
                <input class="ui-btn ui-btn-success" type="button" @click="buttonEditSubComment(id)" :value="$Bitrix.Loc.getMessage('EDIT_COMMENT')" />
            </div>
        <div>
    `
}