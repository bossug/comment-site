import {CommentFormNoauth} from "./form/comment-form-noauth";
import {CommentFormAuth} from "./form/comment-form-auth";
import {CommentFormEdit} from "./form/comment-form-edit";
import {IconClose, IconEdit, IconDelete, IconCommenting} from "./icons/icon-complete";

export const Items = {
    props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'userid', 'isuser', 'isFullName', 'userData'],
    components: {
        CommentFormNoauth,
        CommentFormAuth,
        CommentFormEdit,
        IconClose: IconClose,
        IconEdit,
        IconDelete,
        IconCommenting
    },
    data() {
        if (this.userData !== null) {
            this.fullName = this.userData.LAST_NAME + ' ' + this.userData.NAME;
        }
        return {
            show: true,
            comment: false,
            commentEdit: false,
            NAME: '',
            LAST_NAME: '',
            EMAIL: '',
            subtext: '',
            comment_id: 0,
            fullName: this.fullName,
            userData: this.userData,
        }
    },
    methods: {
        buttonSendComment(data)
        {
            this.$emit('subComment', data)
            this.comment = false;
        },
        buttonEditComment(data)
        {
            this.$emit('editComment', data)
            this.commentEdit = false;
        },
    },
    template: `
        <transition :duration="{ enter: 500, leave: 500 }" name="slide-fade">
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
                            :child="true" 
                            :id="id"
                            :userData="userData"
                            @open-comment-not-auth="openCommentNotAuth" 
                            @close-comment-auth="closeCommentAuth" 
                            @button-send-comment="buttonSendComment"
                            @full-name="fullName"
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
                <div v-if="commentEdit" class="subBlock">
                    <CommentFormEdit :subtext="text" :id="id" :path="path" @button-edit-comment="buttonEditComment"/>
                </div>
                <div class="socnet-button">
                    <i v-if="comment" @click="comment = !comment">
                      <IconClose/>
                    </i>
                    <i :title="$Bitrix.Loc.getMessage('TITLE_COMMENT')" 
                        @click="$emit('messageCallback', 'recomment', id)" 
                        @click="comment = !comment" v-if="(!comment && !child && fullName != name)">
                      <IconCommenting/>
                    </i>
                    <i :title="$Bitrix.Loc.getMessage('TITLE_EDIT')" 
                        @click="commentEdit = !commentEdit" 
                        @click="$emit('messageCallback', 'edit', id)" v-if="(isauthor == true && !child || fullName == name)">
                      <IconEdit/>
                    </i>
                    <i :title="$Bitrix.Loc.getMessage('TITLE_DELETE')" 
                        @click="$emit('messageCallback', 'delete', id)" 
                        @click="show = !show" v-if="(isauthor == true || fullName == name)">
                      <IconDelete/>
                    </i>
                </div>
            </div>
        </transition>
    `
}