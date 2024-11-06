/* eslint-disable */
(function (exports,main_core,ui_vue3) {
    'use strict';

    var CommentFormNoauth = {
      props: ['showComment', 'path', 'query', 'child', 'id'],
      data: function data() {
        //BX.localStorage.remove('userData')
        var userData = BX.localStorage.get('userData');
        return {
          showComment: this.showComment,
          child: this.child,
          path: this.path,
          text: null,
          userData: userData,
          fullName: null
        };
      },
      computed: {
        isFullName: function isFullName() {
          if (this.userData !== null) {
            this.fullName = this.userData.LAST_NAME + ' ' + this.userData.NAME;
          }
          return this.userData !== null;
        }
      },
      methods: {
        openCommentNotAuth: function openCommentNotAuth() {
          this.$emit('openCommentNotAuth', true);
        },
        closeCommentAuth: function closeCommentAuth() {
          this.$emit('closeCommentAuth', false);
        },
        buttonSendComment: function buttonSendComment() {
          if (!this.userData) {
            this.userData = BX.localStorage.set('userData', JSON.stringify({
              NAME: this.NAME,
              LAST_NAME: this.LAST_NAME,
              EMAIL: this.EMAIL
            }), 56000000);
          }
          this.$emit('buttonSendComment', {
            NAME: this.userData ? this.userData.NAME : this.NAME,
            LAST_NAME: this.userData ? this.userData.LAST_NAME : this.LAST_NAME,
            EMAIL: this.userData ? this.userData.EMAIL : this.EMAIL,
            text: this.text,
            userId: 0,
            path: this.path
          });
        },
        buttonSendSubComment: function buttonSendSubComment(id) {
          if (!this.userData) {
            this.userData = BX.localStorage.set('userData', JSON.stringify({
              NAME: this.NAME,
              LAST_NAME: this.LAST_NAME,
              EMAIL: this.EMAIL
            }), 56000000);
          }
          this.$emit('buttonSendComment', {
            NAME: this.userData ? this.userData.NAME : this.NAME,
            LAST_NAME: this.userData ? this.userData.LAST_NAME : this.LAST_NAME,
            EMAIL: this.userData ? this.userData.EMAIL : this.EMAIL,
            text: this.subtext,
            userId: 0,
            path: this.path,
            comment_id: id
          });
        }
      },
      template: "\n        <template v-if=\"child\">\n            <form class=\"ui-ctl-w100\">\n                <div class=\"ui-form-row-inline\" v-if=\"!isFullName\">\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-form-row\">\n                    <div class=\"ui-form-label\">\n                        <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                    </div>\n                    <div class=\"ui-form-content\">\n                        <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                            <textarea v-model=\"subtext\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-content mt-3\">\n                        <input class=\"ui-btn ui-btn-success\" type=\"button\" @click=\"buttonSendSubComment(id)\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                    </div>\n                <div>\n            </form>\n        </template>\n        <template v-if=\"!child\">\n            <div class=\"button-body\">\n                <div class=\"title\" v-if=\"!isFullName\">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>\n                <div class=\"title\" v-else>{{fullName}}</div>\n                <div class=\"blockButton\">\n                    <div class=\"ui-ctl-label-text\" @click=\"openCommentNotAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n                    <div class=\"ui-ctl-label-text closeComments\" @click=\"closeCommentAuth\" v-if=\"showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>\n                </div>\n            </div>\n            <div class=\"ui-form form-body\" v-if=\"showComment\">\n                <form class=\"ui-ctl-w100\" @submit.prevent=\"buttonSendComment\">\n                    <div class=\"ui-form-row-inline\" v-if=\"!isFullName\">\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                                <textarea v-model=\"text\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-content mt-3\">\n                            <input class=\"ui-btn ui-btn-success\" type=\"submit\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                        </div>\n                    <div>\n                </form>\n            </div>\n        </template>\n    "
    };

    var CommentFormAuth = {
      props: ['showComment', 'path', 'query', 'id', 'child'],
      data: function data() {
        return {
          showComment: this.showComment,
          path: this.path,
          text: null
        };
      },
      computed: {},
      methods: {
        openCommentAuth: function openCommentAuth() {
          this.$emit('openCommentAuth', true);
        },
        closeComment: function closeComment() {
          this.$emit('closeComment', false);
        },
        buttonSendComment: function buttonSendComment() {
          this.$emit('buttonSendComment', {
            text: this.text,
            path: this.path
          });
        },
        buttonSendSubComment: function buttonSendSubComment(id) {
          this.$emit('buttonSendComment', {
            text: this.subtext,
            path: this.path,
            comment_id: id
          });
        }
      },
      template: "\n        <template v-if=\"child\">\n            <form class=\"ui-ctl-w100\">\n                <div class=\"ui-form-row\">\n                    <div class=\"ui-form-label\">\n                        <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                    </div>\n                    <div class=\"ui-form-content\">\n                        <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                            <textarea v-model=\"subtext\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-content mt-3\">\n                        <input class=\"ui-btn ui-btn-success\" type=\"button\" @click=\"buttonSendSubComment(id)\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                    </div>\n                <div>\n            </form>\n        </template>\n        <template v-if=\"!child\">\n            <div class=\"button-body\">\n                <div class=\"blockButton\">\n                    <div class=\"ui-ctl-label-text\" @click=\"openCommentAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n                </div>\n            </div>\n            <div class=\"ui-form form-body\" v-if=\"showComment\">\n                <form class=\"ui-ctl-w100\" @submit.prevent=\"buttonSendComment\">\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                                <textarea v-model=\"text\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-content mt-3\">\n                            <input class=\"ui-btn ui-btn-success\" type=\"submit\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                        </div>\n                    <div>\n                </form>\n            </div>\n        </template>\n    "
    };

    var IconClose = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n          <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/>\n        </svg>\n    "
    };
    var IconEdit = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\n          <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n          <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z\"/>\n        </svg>\n    "
    };
    var IconDelete = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n          <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z\"/>\n          <path d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z\"/>\n        </svg>\n    "
    };
    var IconCommenting = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-chat-dots-fill\" viewBox=\"0 0 16 16\">\n          <path d=\"M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2\"/>\n        </svg>\n    "
    };

    var Items = {
      props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'userid', 'isuser', 'isFullName'],
      components: {
        CommentFormNoauth: CommentFormNoauth,
        CommentFormAuth: CommentFormAuth,
        IconClose: IconClose,
        IconEdit: IconEdit,
        IconDelete: IconDelete,
        IconCommenting: IconCommenting
      },
      data: function data() {
        return {
          show: true,
          comment: false,
          NAME: '',
          LAST_NAME: '',
          EMAIL: '',
          subtext: '',
          comment_id: 0
        };
      },
      methods: {
        buttonSendComment: function buttonSendComment(data) {
          this.$emit('subComment', data);
          this.comment = false;
        }
      },
      template: "\n        <transition :duration=\"500\">\n            <div :class=\"{'child-item': child}\" class=\"comment-item\" :data-id=\"id\" v-if=\"show\">\n                <div class=\"header-top\">\n                    <div class=\"f-left\">\n                        <div class=\"f-circle\">\n                            <div class=\"letter\">{{letter}}</div>\n                        </div>\n                        <div class=\"f-content\">\n                            <div>{{name}}</div>\n                            <div v-if=\"(timedata=='')\">{{data}}</div>\n                            <div v-else>{{timedata}}</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"text\">{{text}}</div>\n                <div v-if=\"comment\" class=\"subBlock\">\n                    <template v-if=\"!isuser\">\n                        <CommentFormNoauth \n                            :showComment=\"comment\" \n                            :path=\"path\" \n                            :isFullName=\"isFullName\" \n                            :fullName=\"fullname\" \n                            :child=\"true\" \n                            :id=\"id\"\n                            @open-comment-not-auth=\"openCommentNotAuth\" \n                            @close-comment-auth=\"closeCommentAuth\" \n                            @button-send-comment=\"buttonSendComment\"\n                        />\n                    </template>\n                    <template v-else>\n                        <CommentFormAuth\n                            :showComment=\"comment\" \n                            :path=\"path\" \n                            :child=\"true\" \n                            :id=\"id\"\n                            @open-comment-auth=\"openCommentAuth\" \n                            @close-comment=\"closeComment\" \n                            @button-send-comment=\"buttonSendComment\"\n                        />\n                    </template>\n                </div>\n                <div class=\"socnet-button\">\n<!--                    <i class=\"fa fa-close\" v-if=\"comment\" @click=\"comment = !comment\"></i>-->\n                    <i v-if=\"comment\" @click=\"comment = !comment\">\n                      <IconClose/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_COMMENT')\" \n                        @click=\"$emit('messageCallback', 'recomment', id)\" \n                        @click=\"comment = !comment\" v-if=\"(!comment && !child)\">\n                      <IconCommenting/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_EDIT')\" \n                        @click=\"$emit('messageCallback', 'edit', id)\" v-if=\"(isauthor == true && !child)\">\n                      <IconEdit/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_DELETE')\" \n                        @click=\"$emit('messageCallback', 'delete', id)\" \n                        @click=\"show = !show\" v-if=\"(isauthor == true)\">\n                      <IconDelete/>\n                    </i>\n                </div>\n            </div>\n        </transition>\n    "
    };

    var _BX$ajax = BX.ajax,
      runAction = _BX$ajax.runAction,
      prepareForm = _BX$ajax.prepareForm;
    var CommentItems = {
      components: {
        Items: Items,
        CommentFormNoauth: CommentFormNoauth,
        CommentFormAuth: CommentFormAuth,
        IconCommenting: IconCommenting,
        IconClose: IconClose
      },
      data: function data() {
        var url = new URL(location);
        var arResult = ui_vue3.reactive({});
        arResult.path = url.pathname;
        arResult.query = url.search;
        runAction('gk:comments.CC.ResponseGkComments.getComment', {
          data: {
            path: arResult.path,
            query: arResult.query
          }
        }).then(function (response) {
          //console.log(response.data)
          arResult.arrayComment = response.data.object;
          arResult.userId = response.data.userId;
          arResult.isAdmin = response.data.isAdmin;
        });
        return {
          showComment: false,
          arResult: arResult,
          path: arResult.path,
          query: arResult.query,
          NAME: null,
          LAST_NAME: null,
          EMAIL: null,
          text: null,
          isFullName: false,
          fullName: ''
        };
      },
      computed: {
        isUser: function isUser() {
          return this.arResult.userId > 0;
        },
        isAdmin: function isAdmin() {
          return this.arResult.isAdmin;
        },
        isFormValid: function isFormValid() {
          var NAME = this.NAME,
            LAST_NAME = this.LAST_NAME,
            EMAIL = this.EMAIL,
            text = this.text;
          return NAME.length > 4 && LAST_NAME.length > 4 && /(.+)@(.+){2,}.(.+){2,}/.test(EMAIL) && text.length > 5;
        }
      },
      methods: {
        openCommentNotAuth: function openCommentNotAuth() {
          this.showComment = true;
        },
        closeCommentAuth: function closeCommentAuth() {
          this.showComment = false;
        },
        openCommentAuth: function openCommentAuth() {
          this.showComment = true;
        },
        buttonSendComment: function buttonSendComment(data) {
          var arResult = this.arResult;
          runAction('gk:comments.CC.ResponseGkComments.setComment', {
            data: {
              NAME: data.NAME,
              LAST_NAME: data.LAST_NAME,
              EMAIL: data.EMAIL,
              text: data.text,
              path: data.path,
              USER_ID: data.userId,
              comment_id: data.comment_id
            }
          }).then(function (comment) {
            $('.closeComments').trigger('click');
            arResult.arrayComment = comment.data.object;
            arResult.userId = comment.data.userId;
            arResult.isAdmin = comment.data.isAdmin;
          });
        },
        buttonSendSubComment: function buttonSendSubComment(data) {
          var arResult = this.arResult;
          runAction('gk:comments.CC.ResponseGkComments.setComment', {
            data: data
          }).then(function (comment) {
            $('.fa-close').trigger('click');
            arResult.arrayComment = comment.data.object;
            arResult.userId = comment.data.userId;
            arResult.isAdmin = comment.data.isAdmin;
          });
        },
        ParentCall: function ParentCall(fmethod, id) {
          if (fmethod === 'delete') {
            var arResult = this.arResult;
            runAction('gk:comments.CC.ResponseGkComments.delComment', {
              data: {
                id: id,
                path: this.path
              }
            }).then(function (comment) {
              var object = BX.findChild(BX('comment-body'), {
                className: 'comment-item'
              }, true, true);
              object.forEach(function (element) {
                if (element.getAttribute('data-id') === id) {
                  element.classList.add('delete');
                }
              });
            });
          }
        }
      },
      template: "\n            <div>\n                <div class=\"comment-header\">\n                    <div class=\"comment-button-body mb-3\" v-if=\"isUser\">\n                        <div class=\"title\">{{name}}</div>\n                        <div class=\"blockButton\">\n                            <div class=\"ui-ctl-label-text line-block-form\" @click=\"openCommentAuth\" v-if=\"!showComment\" role=\"button\">\n                                <i>\n                                    <IconCommenting/>\n                                </i> <input class=\"ui-ctl-element\" readonly=\"readonly\" type=\"text\" :placeholder=\"$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')\">\n                            </div>\n                            <div class=\"ui-ctl-label-text closeComments\" @click=\"closeCommentAuth\" v-if=\"showComment\" role=\"button\">\n                                <i>\n                                    <IconClose/>\n                                </i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}\n                            </div>\n                        </div>\n                        <div class=\"ui-form form-body\" v-if=\"showComment\">\n                            <CommentFormAuth\n                                :showComment=\"showComment\" \n                                :path=\"path\" \n                                @open-comment-auth=\"openCommentAuth\" \n                                @close-comment=\"closeComment\" \n                                @button-send-comment=\"buttonSendComment\"\n                            />\n                        </div>\n                    </div>\n                    <div class=\"comment-button-body mb-3\" v-else>\n                        <CommentFormNoauth \n                            :showComment=\"showComment\" \n                            :path=\"path\" \n                            :isFullName=\"isFullName\" \n                            :fullName=\"fullName\" \n                            @open-comment-not-auth=\"openCommentNotAuth\" \n                            @close-comment-auth=\"closeCommentAuth\" \n                            @button-send-comment=\"buttonSendComment\"\n                        />\n                    </div>\n                </div>\n                <div class=\"comment-body\" id=\"comment-body\">\n                    <template v-for=\"(post, index) in arResult.arrayComment\" :key=\"index\">\n                        <Items  v-if=\"(post.COMMENT_ID == 0)\" \n                            :name=\"post.NAME\"\n                            :text=\"post.COMMENT\"\n                            :icon=\"post.icon\"\n                            :elementid=\"post.COMMENT_ID\"\n                            :data=\"post.data\"\n                            :timedata=\"post.timeData\"\n                            :letter=\"post.letter\"\n                            :id=\"post.ID\"\n                            :isauthor=\"post.author\" \n                            :show=\"true\"\n                            :child=\"false\" \n                            :path=\"path\" \n                            :userid=\"arResult.userId\" \n                            :isuser=\"isUser\" \n                            :isFullName=\"isFullName\"\n                            @message-callback=\"ParentCall\"\n                            @sub-comment=\"buttonSendComment\"\n                        />\n                        <template v-if=\"post.sub\"  v-for=\"(spost, sindex) in post.sub\" :key=\"sindex\">\n                            <Items \n                                :name=\"spost.NAME\"\n                                :text=\"spost.COMMENT\"\n                                :icon=\"spost.icon\"\n                                :elementid=\"spost.COMMENT_ID\"\n                                :data=\"spost.data\"\n                                :timedata=\"spost.timeData\"\n                                :letter=\"spost.letter\"\n                                :id=\"spost.ID\"\n                                :isauthor=\"spost.author\" \n                                :isfullname=\"isFullName\" \n                                :show=\"true\" \n                                :child=\"true\" \n                                @message-callback=\"ParentCall\"/>\n                        </template>\n                    </template>\n                </div>\n            </div>\n    "
    };

    function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
    function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
    var _application = /*#__PURE__*/new WeakMap();
    var Comments = /*#__PURE__*/function () {
      function Comments(rootNode) {
        babelHelpers.classCallCheck(this, Comments);
        _classPrivateFieldInitSpec(this, _application, {
          writable: true,
          value: void 0
        });
        this.rootNode = document.querySelector(rootNode);
      }
      babelHelpers.createClass(Comments, [{
        key: "start",
        value: function start() {
          this.getTemplate();
        }
      }, {
        key: "getTemplate",
        value: function getTemplate() {
          var context = this;
          babelHelpers.classPrivateFieldSet(this, _application, ui_vue3.BitrixVue.createApp({
            components: {
              CommentItems: CommentItems
            },
            beforeCreate: function beforeCreate() {
              this.$bitrix.Application.set(context);
            },
            template: '<CommentItems/>'
          }));
          babelHelpers.classPrivateFieldGet(this, _application).mount(this.rootNode);
        }
      }]);
      return Comments;
    }();

    exports.Comments = Comments;

}((this.BX = this.BX || {}),BX,BX.Vue3));
