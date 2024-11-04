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

        const storedData = JSON.parse(localStorage.getItem('CUSTOM_COMMENT'));
        const isDataReadOnly = storedData !== null; // чекнем нужно ли закрыть от редактирования поля

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
            NAME: storedData ? storedData.NAME : null,
            LAST_NAME: storedData ? storedData.LAST_NAME : null,
            EMAIL: storedData ? storedData.EMAIL : null,
            text: null,
            isDataReadOnly: isDataReadOnly
        }
    },
    computed: {
        userInitials() {
            const storedData = JSON.parse(localStorage.getItem('CUSTOM_COMMENT'));
            if (storedData && storedData.NAME && storedData.LAST_NAME) {
                return `${storedData.LAST_NAME.charAt(0)}${storedData.NAME.charAt(0)}`.toUpperCase();
            }
            return '';
        },
        hasUserData() {
            const storedData = JSON.parse(localStorage.getItem('CUSTOM_COMMENT'));
            return storedData !== null;
        },
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
        },
        closeCommentAuth()
        {
            this.showComment = false;
        },
        openCommentAuth()
        {
            this.showComment = true;
        },
        buttonSendComment(path, query, userId)
        {
            const {arResult} = this;

            // Сохранение данных в LocalStorage на один год
            if (!this.isUser) {  // Только для неавторизованных пользователей
                const expirationDate = new Date();
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                localStorage.setItem('CUSTOM_COMMENT', JSON.stringify({
                    NAME: this.NAME,
                    LAST_NAME: this.LAST_NAME,
                    EMAIL: this.EMAIL,
                    expires: expirationDate.toISOString()
                }));
                this.isDataReadOnly = true;
            }

            runAction('gk:comments.CC.ResponseGkComments.setComment',{
                data: {
                    NAME: this.NAME,
                    LAST_NAME: this.LAST_NAME,
                    EMAIL: this.EMAIL,
                    text: this.text,
                    path: path,
                    query: query,
                    USER_ID: userId
                }
            }).then(function(comment){
                $('#closeComments').trigger('click');
                arResult.arrayComment = comment.data.object;
                arResult.userId = response.data.userId;
                arResult.isAdmin = response.data.isAdmin;
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
                    //arResult.arrayComment = comment.data
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
                        <div class="button-body">
                            <div class="title header-top">
                                <template v-if="isDataReadOnly">
                                    <div class="f-left">
                                        <div class="f-circle">
                                            <div class="letter">{{ userInitials }}</div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </template>
                            </div>
                            <div class="blockButton">
                                <div class="ui-ctl-label-text" @click="openCommentNotAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
                                <div class="ui-ctl-label-text" @click="closeCommentAuth" v-if="showComment" id="closeComments" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
                            </div>
                        </div>
                        <div class="ui-form form-body" v-if="showComment">
                            <form id="addComment" class="ui-ctl-w100" @submit.prevent="buttonSendComment(path, query, 0)">
                                <div class="ui-form-row-inline">
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                                <input
                                                     :disabled="isDataReadOnly"
                                                     type="text" 
                                                     v-model="NAME" 
                                                     name="NAME" 
                                                     class="ui-ctl-element">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                                <input :disabled="isDataReadOnly" type="text" v-model="LAST_NAME" name="LAST_NAME" class="ui-ctl-element">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-form-row">
                                        <div class="ui-form-label">
                                            <div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>
                                        </div>
                                        <div class="ui-form-content">
                                            <div class="ui-ctl-xs ui-ctl-textbox ui-ctl-w100">
                                                <input :disabled="isDataReadOnly" type="text" v-model="EMAIL" name="EMAIL" class="ui-ctl-element">
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