import {Dom, Loc} from 'main.core';
import {Items} from './items'
import {CommentFormNoauth} from "./form/comment-form-noauth";
import {CommentFormAuth} from "./form/comment-form-auth";
import {IconCommenting, IconClose} from "./icons/icon-complete";
import {reactive} from "ui.vue3";
const {runAction} = BX.ajax;
export const CommentItems = {
    components:
    {
        Items,
        CommentFormNoauth,
        CommentFormAuth,
        IconCommenting,
        IconClose
    },
    data()
    {
        let userData = BX.localStorage.get('userData');
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
            //console.log(response.data)
            arResult.arrayComment = response.data.object;
            arResult.userId = response.data.userId
            arResult.isAdmin = response.data.isAdmin
            arResult.isShow = response.data.isShow
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
            userData: userData,
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
        isShow()
        {
            return this.arResult.isShow;
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
        },
        closeCommentAuth()
        {
            this.showComment = false;
        },
        openCommentAuth()
        {
            this.showComment = true;
        },
        buttonSendComment(data)
        {
            const {arResult} = this;
            runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: {
                    NAME: data.NAME,
                    LAST_NAME: data.LAST_NAME,
                    EMAIL: data.EMAIL,
                    text: data.text,
                    path: data.path,
                    USER_ID: data.userId,
                    comment_id: data.comment_id
                }
            }).then(function(comment){
                $('.closeComments').trigger('click')
                arResult.arrayComment = comment.data.object
                arResult.userId = comment.data.userId
                arResult.isAdmin = comment.data.isAdmin
            });
        },
        buttonSendSubComment(data)
        {
            const {arResult} = this;
            runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: data
            }).then(function(comment){
                $('.fa-close').trigger('click')
                arResult.arrayComment = comment.data.object;
                arResult.userId = comment.data.userId
                arResult.isAdmin = comment.data.isAdmin
            });
        },
        buttonEditComment(data)
        {
            const {arResult} = this;
            runAction('gk:comments.CC.ResponseGkComments.editComment',{
                data: data
            }).then(function(comment){
                $('.fa-close').trigger('click')
                arResult.arrayComment = comment.data.object;
                arResult.userId = comment.data.userId
                arResult.isAdmin = comment.data.isAdmin
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
                <div class="comment-header" v-if="isShow">
                    <div class="comment-button-body mb-3" v-if="isUser">
                        <div class="title">{{name}}</div>
                        <div class="blockButton">
                            <div class="ui-ctl-label-text line-block-form" @click="openCommentAuth" v-if="!showComment" role="button">
                                <i>
                                    <IconCommenting/>
                                </i> <input class="ui-ctl-element" readonly="readonly" type="text" :placeholder="$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')">
                            </div>
                            <div class="ui-ctl-label-text closeComments" @click="closeCommentAuth" v-if="showComment" role="button">
                                <i>
                                    <IconClose/>
                                </i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}
                            </div>
                        </div>
                        <div class="ui-form form-body" v-if="showComment">
                            <CommentFormAuth
                                :showComment="showComment" 
                                :path="path" 
                                @open-comment-auth="openCommentAuth" 
                                @close-comment="closeComment" 
                                @button-send-comment="buttonSendComment"
                            />
                        </div>
                    </div>
                    <div class="comment-button-body mb-3" v-else>
                        <CommentFormNoauth 
                            :showComment="showComment" 
                            :path="path" 
                            :isFullName="isFullName" 
                            :fullName="fullName" 
                            :userData="userData" 
                            @open-comment-not-auth="openCommentNotAuth" 
                            @close-comment-auth="closeCommentAuth" 
                            @button-send-comment="buttonSendComment"
                        />
                    </div>
                </div>
                <div class="comment-body" id="comment-body">
                    <template v-for="(post, index) in arResult.arrayComment" :key="index">
                        <Items  v-if="(post.COMMENT_ID == 0)" appear :duration="{ enter: 500, leave: 500 }" 
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
                            :isFullName="isFullName" 
                            :userData="userData" 
                            @message-callback="ParentCall"
                            @sub-comment="buttonSendComment" 
                            @edit-comment="buttonEditComment"
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
                                :isfullname="isFullName" 
                                :show="true" 
                                :child="true" 
                                :path="path" 
                                :userData="userData" 
                                @edit-comment="buttonEditComment" 
                                @message-callback="ParentCall"/>
                        </template>
                    </template>
                </div>
            </div>
    `
}