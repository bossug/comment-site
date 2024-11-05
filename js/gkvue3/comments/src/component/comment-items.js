import {Dom, Loc} from 'main.core';
import {Items} from './items'
import {CommentFormNoauth} from "./form/comment-form-noauth";
import {reactive} from "ui.vue3";
const {runAction, prepareForm} = BX.ajax;
export const CommentItems = {
    components:
    {
        Items,
        CommentFormNoauth
    },
    data()
    {
        let url = new URL(location);
        const arResult = reactive({});
        arResult.path = url.pathname;
        arResult.query = url.search;
        runAction('gk:comments.CC.ResponseGkComments.getComment',{
            data: {
                path: arResult.path,
                query: arResult.query
            }
        }).then(function(response){
            console.log(response.data)
            arResult.arrayComment = response.data.object;
            arResult.userId = response.data.userId
            arResult.isAdmin = response.data.isAdmin
        })
        return {
            showComment: false,
            arResult,
            path: arResult.path,
            query: arResult.query,
            NAME: null,
            LAST_NAME: null,
            EMAIL: null,
            text: null,
            isFullName: false,
            fullName: '',
        }
    },
    computed: {
        isUser()
        {
            return this.arResult.userId > 0;
        },
        isAdmin()
        {
            return this.arResult.isAdmin;
        },
        isFormValid() {
            const { NAME, LAST_NAME, EMAIL, text } = this;
            return (
                NAME.length > 4 && LAST_NAME.length > 4 &&
                /(.+)@(.+){2,}.(.+){2,}/.test(EMAIL) &&
                text.length > 5
            );
        },
    },
    methods: {
        openCommentNotAuth()
        {
            this.showComment = true;
            console.log(this.showComment)
        },
        closeCommentAuth()
        {
            this.showComment = false;
            console.log(this.showComment)
        },
        openCommentAuth()
        {
            this.showComment = true;
        },
        buttonSendComment(data)
        {
            const {arResult} = this;
            console.log(data)
            /*runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: {
                    NAME: data.NAME,
                    LAST_NAME: data.LAST_NAME,
                    EMAIL: data.EMAIL,
                    text: data.text,
                    path: path,
                    query: query,
                    USER_ID: arResult.userId
                }
            }).then(function(comment){
                $('#closeComments').trigger('click')
                arResult.arrayComment = comment.data.object
                arResult.userId = response.data.userId
                arResult.isAdmin = response.data.isAdmin
            });*/
        },
        buttonSendSubComment(data)
        {
            const {arResult} = this;
            runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: data
            }).then(function(comment){
                $('.fa-close').trigger('click')
                arResult.arrayComment = comment.data.object;
                arResult.userId = response.data.userId
                arResult.isAdmin = response.data.isAdmin
            });
        },
        ParentCall(fmethod, id)
        {
            if (fmethod === 'delete') {
                const {arResult} = this;
                runAction('gk:comments.CC.ResponseGkComments.delComment', {
                    data: {
                        id: id,
                        path: this.path
                    }
                }).then(function (comment) {
                    let object = BX.findChild(BX('comment-body'), {className: 'comment-item' }, true, true);
                    object.forEach(function (element) {
                        if (element.getAttribute('data-id') === id) {
                            element.classList.add('delete')
                        }
                    })
                });
            }
            if (fmethod === 'edit') {

            }
        },
    },
    template: `
            <div>
                <div class="comment-header">
                    <div class="comment-button-body mb-3" v-if="isUser">
                        <div class="title">{{name}}</div>
                        <div class="blockButton">
                            <div class="ui-ctl-label-text line-block-form" @click="openCommentAuth" v-if="!showComment" role="button">
                                <i class="fa fa-comment"></i> <input class="ui-ctl-element" readonly="readonly" type="text" :placeholder="$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')">
                            </div>
                            <div class="ui-ctl-label-text" @click="closeCommentAuth" v-if="showComment" id="closeComments" role="button"><i class="fa fa-close"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
                        </div>
                        <div class="ui-form form-body" v-if="showComment">
                            <form id="addComment" class="ui-ctl-w100" @submit.prevent="buttonSendComment(path,query,arResult.userId)">
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
                    </div>
                    <div class="comment-button-body mb-3" v-else>
                        <CommentFormNoauth 
                            :showComment="showComment" 
                            :path="path" 
                            :isFullName="isFullName" 
                            :fullName="fullName" 
                            @open-comment-not-auth="openCommentNotAuth" 
                            @close-comment-auth="closeCommentAuth" 
                            @button-send-comment="buttonSendComment"
                        />
                    </div>
                </div>
                <div class="comment-body" id="comment-body">
                    <template v-for="(post, index) in arResult.arrayComment" :key="index">
                        <Items  v-if="(post.COMMENT_ID == 0)" 
                            :name="post.NAME"
                            :text="post.COMMENT"
                            :icon="post.icon"
                            :elementid="post.COMMENT_ID"
                            :data="post.data"
                            :timedata="post.timeData"
                            :letter="post.letter"
                            :id="post.ID"
                            :isauthor="post.author" 
                            :show="true"
                            :child="false" 
                            :path="path" 
                            :userid="arResult.userId" 
                            :isuser="isUser" 
                            @message-callback="ParentCall"
                            @sub-comment="buttonSendSubComment"
                        />
                        <template v-if="post.sub"  v-for="(spost, sindex) in post.sub" :key="sindex">
                            <Items 
                                :name="spost.NAME"
                                :text="spost.COMMENT"
                                :icon="spost.icon"
                                :elementid="spost.COMMENT_ID"
                                :data="spost.data"
                                :timedata="spost.timeData"
                                :letter="spost.letter"
                                :id="spost.ID"
                                :isauthor="spost.author" 
                                :show="true" 
                                :child="true" 
                                @message-callback="ParentCall"/>
                        </template>
                    </template>
                </div>
            </div>
    `
}