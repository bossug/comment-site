
export const Items = {
    props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'userid', 'isuser'],
    data() {
        return {
            show: true,
            comment: false,
            NAME: '',
            LAST_NAME: '',
            EMAIL: '',
            subtext: '',
            comment_id: 0
        }
    },
    methods: {
        buttonSendSubComment(id, path, userid)
        {
            this.$emit('subComment', {
                NAME: this.NAME, LAST_NAME: this.LAST_NAME,
                EMAIL: this.EMAIL, text: this.subtext, comment_id: id, path: path, USER_ID: userid
            })
        }
    },
    template: `
        <transition :duration="500">
            <div :class="{'child-item': child}" class="comment-item" :data-id="id" v-if="show">
                <div class="header-top">
                    <div class="f-left">
                        <div class="f-circle">
                            <div class="letter">{{letter}}</div>
                        </div>
                        <div class="f-content">
                            <div>{{name}}</div>
                            <div v-if="(timedata=='')">{{data}}</div>
                            <div v-else>{{timedata}}</div>
                        </div>
                    </div>
                </div>
                <div class="text">{{text}}</div>
                <div v-if="comment" class="subBlock">
                    <form class="ui-ctl-w100">
                        <template v-if="!isuser">
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
                                        <textarea v-model="subtext" name="text" class="ui-ctl-element require"></textarea>
                                    </div>
                                </div>
                                <div class="ui-form-content mt-3">
                                    <input class="ui-btn ui-btn-success" type="button" @click="buttonSendSubComment(id, path, 0)" :value="$Bitrix.Loc.getMessage('SEND_COMMENT')" />
                                </div>
                            <div>
                        </template>
                        <template v-else>
                            <div class="ui-form-row">
                                <div class="ui-form-label">
                                    <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>
                                </div>
                                <div class="ui-form-content">
                                    <div class="ui-ctl-xs ui-ctl-textarea ui-ctl-w100">
                                        <textarea v-model="subtext" class="ui-ctl-element require"></textarea>
                                    </div>
                                </div>
                                <div class="ui-form-content mt-3">
                                    <input class="ui-btn ui-btn-success" type="button" @click="buttonSendSubComment(id, path, userid)" :value="$Bitrix.Loc.getMessage('SEND_COMMENT')" />
                                </div>
                            <div>
                        </template>
                    </form>
                    
                </div>
                <div class="socnet-button">
                    <i class="fa fa-close" v-if="comment" @click="comment = !comment"></i>
                    <i class="fa fa-commenting" aria-hidden="true" title="Комментировать" @click="$emit('messageCallback', 'recomment', id)"  @click="comment = !comment" v-if="(!comment && !child)"></i>
                    <i class="fa fa-pencil" aria-hidden="true" title="Редактировать" @click="$emit('messageCallback', 'edit', id)" v-if="(isauthor == true && !child)"></i>
                    <i class="fa fa-trash" aria-hidden="true" title="удалить" @click="$emit('messageCallback', 'delete', id)" @click="show = !show" v-if="(isauthor == true)"></i>
                </div>
            </div>
        </transition>
    `
}