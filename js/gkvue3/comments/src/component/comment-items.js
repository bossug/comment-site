import {Dom, Loc} from 'main.core';
import {Items} from './items'
import {reactive} from "ui.vue3";
const {runAction, prepareForm} = BX.ajax;
export const CommentItems = {
    components:
    {
        Items
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
            arResult.arrayComment = response.data;
        })
        return {
            showComment: false,
            arResult,
            path: arResult.path,
            query: arResult.query
        }
    },
    computed: {
        isUser()
        {
            return false;
        }
    },
    methods: {
        openCommentNotAuth()
        {
            this.showComment = true;
        },
        closeCommentNotAuth()
        {
            this.showComment = false;
        },
        buttonSendComment()
        {
            const {arResult} = this;
            runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: prepareForm(BX('addComment')).data
            }).then(function(comment){
                $('#closeComments').trigger('click')
                arResult.arrayComment = comment.data
            });
        }
    },
    template: `
            <div>
                <div class="comment-header">
                    <div class="comment-button-body mb-3" v-if="isUser">
                        <div class="title">{{name}}</div>
                        <a href="javascript:void(0)" class="link-comment" @click="newComment">{{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</a>
                    </div>
                    <div class="comment-button-body mb-3" v-else>
                        <div class="button-body">
                            <div class="title">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>
                            <div class="blockButton">
                                <div class="ui-ctl-label-text" @click="openCommentNotAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
                                <div class="ui-ctl-label-text" @click="closeCommentNotAuth" v-if="showComment" id="closeComments" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
                            </div>
                        </div>
                        <div class="ui-form form-body" v-if="showComment">
                            <form id="addComment" class="ui-ctl-w100">
                                <input type="hidden" name="path" :value="path">
                                <input type="hidden" name="query" :value="query">
                                <div class="ui-form-row-inline">
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">Ваше имя</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
                                                <input type="text" name="NAME" class="ui-ctl-element">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">Ваша фамилия</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
                                                <input type="text" name="LAST_NAME" class="ui-ctl-element">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">Ваш E-mail</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
                                                <input type="text" name="EMAIL" class="ui-ctl-element">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui-form-row">
                                    <div class="ui-form-label">
                                        <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>
                                    </div>
                                    <div class="ui-form-content">
                                        <div class="ui-ctl ui-ctl-textarea ui-ctl-w100">
                                            <textarea name="text" class="ui-ctl-element require"></textarea>
                                        </div>
                                    </div>
                                    <div class="ui-form-content mt-3">
                                        <div class="ui-btn ui-btn-success" @click="buttonSendComment()" id="buttonSendComment">{{$Bitrix.Loc.getMessage('SEND_COMMENT')}}</div>
                                    </div>
                                <div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="comment-body">
                    <template v-for="(post, index) in arResult.arrayComment" :key="index">
                        <Items 
                        :name="post.USER_NAME"
                        :text="post.COMMENT"
                        :icon="post.icon"
                        :elementid="post.COMMENT_ID"
                        :data="post.data"
                        :timedata="post.timeData"
                        :letter="post.letter"/>
                    </template>
                </div>
            </div>
    `
}