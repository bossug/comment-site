import {CommentFormNoauth} from "./form/comment-form-noauth";

export const Items = {
    props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'userid', 'isuser', 'isFullName'],
    components: {
        CommentFormNoauth
    },
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
        buttonSendComment(data)
        {
            this.$emit('subComment', data)
            this.comment = false;
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
                    <template v-if="!isuser">
                        <CommentFormNoauth 
                            :showComment="comment" 
                            :path="path" 
                            :isFullName="isFullName" 
                            :fullName="fullname" 
                            :child="true" 
                            :id="id"
                            @open-comment-not-auth="openCommentNotAuth" 
                            @close-comment-auth="closeCommentAuth" 
                            @button-send-comment="buttonSendComment"
                        />
                    </template>
                    <template v-else>
                        <form class="ui-ctl-w100">
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
                        </form>
                    </template>
                    
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