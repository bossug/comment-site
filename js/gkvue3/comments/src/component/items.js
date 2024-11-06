import {CommentFormNoauth} from "./form/comment-form-noauth";
import {CommentFormAuth} from "./form/comment-form-auth";

export const Items = {
    props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'userid', 'isuser', 'isFullName'],
    components: {
        CommentFormNoauth,
        CommentFormAuth
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
                        <CommentFormAuth
                            :showComment="comment" 
                            :path="path" 
                            :child="true" 
                            :id="id"
                            @open-comment-auth="openCommentAuth" 
                            @close-comment="closeComment" 
                            @button-send-comment="buttonSendComment"
                        />
                    </template>
                </div>
                <div class="socnet-button">
                    <i class="fa fa-close" v-if="comment" @click="comment = !comment"></i>
                    <i class="fa fa-commenting" aria-hidden="true" :title="$Bitrix.Loc.getMessage('TITLE_COMMENT')" 
                        @click="$emit('messageCallback', 'recomment', id)" 
                        @click="comment = !comment" v-if="(!comment && !child)"></i>
                    <i class="fa fa-pencil" aria-hidden="true" :title="$Bitrix.Loc.getMessage('TITLE_EDIT')" 
                        @click="$emit('messageCallback', 'edit', id)" v-if="(isauthor == true && !child)"></i>
                    <i class="fa fa-trash" aria-hidden="true" :title="$Bitrix.Loc.getMessage('TITLE_DELETE')" 
                        @click="$emit('messageCallback', 'delete', id)" 
                        @click="show = !show" v-if="(isauthor == true)"></i>
                </div>
            </div>
        </transition>
    `
}