/* eslint-disable */
(function (exports,ui_vue3) {
    'use strict';

    var CommentFormNoauth = {
      props: ['showComment', 'path', 'query', 'child', 'id', 'userData'],
      data: function data() {
        //BX.localStorage.remove('userData')
        //let userData = BX.localStorage.get('userData');
        return {
          showComment: this.showComment,
          child: this.child,
          path: this.path,
          text: null,
          userData: this.userData,
          fullName: null
        };
      },
      computed: {
        isFullName: function isFullName() {
          console.log(this.userData);
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
            text: this.toptext,
            userId: 0,
            path: this.path
          });
          this.toptext = null;
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
          this.subtext = null;
        }
      },
      template: "\n        <template v-if=\"child\">\n            <form class=\"ui-ctl-w100\">\n                <div class=\"ui-form-row-inline\" v-if=\"!isFullName\">\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-form-row\">\n                    <div class=\"ui-form-label\">\n                        <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                    </div>\n                    <div class=\"ui-form-content\">\n                        <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                            <textarea v-model=\"subtext\" class=\"ui-ctl-element require\"></textarea>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-content mt-3\">\n                        <input class=\"ui-btn ui-btn-success\" type=\"button\" @click=\"buttonSendSubComment(id)\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                    </div>\n                <div>\n            </form>\n        </template>\n        <template v-if=\"!child\">\n            <div class=\"button-body\">\n                <div class=\"title\" v-if=\"!isFullName\">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>\n                <div class=\"title\" v-else>{{fullName}}</div>\n                <div class=\"blockButton\">\n                    <div class=\"ui-ctl-label-text\" @click=\"openCommentNotAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n                    <div class=\"ui-ctl-label-text closeComments\" @click=\"closeCommentAuth\" v-if=\"showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>\n                </div>\n            </div>\n            <div class=\"ui-form form-body\" v-if=\"showComment\">\n                <form class=\"ui-ctl-w100\" @submit.prevent=\"buttonSendComment\">\n                    <div class=\"ui-form-row-inline\" v-if=\"!isFullName\">\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                    <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui-form-row\">\n                        <div class=\"ui-form-label\">\n                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                        </div>\n                        <div class=\"ui-form-content\">\n                            <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                                <textarea v-model=\"toptext\" class=\"ui-ctl-element require\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-content mt-3\">\n                            <input class=\"ui-btn ui-btn-success\" type=\"submit\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                        </div>\n                    <div>\n                </form>\n            </div>\n        </template>\n    "
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

    var CommentFormEdit = {
      props: ['subtext', 'id', 'path'],
      data: function data() {
        return {
          edittext: this.subtext
        };
      },
      methods: {
        buttonEditSubComment: function buttonEditSubComment(id) {
          this.$emit('buttonEditComment', {
            text: this.edittext,
            id: id,
            path: this.path
          });
        }
      },
      template: "\n        <div class=\"ui-form-row\">\n            <div class=\"ui-form-label\">\n                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EDIT_COMMENT')}}</div>\n            </div>\n            <div class=\"ui-form-content\">\n                <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                    <textarea v-model=\"edittext\" class=\"ui-ctl-element require\"></textarea>\n                </div>\n            </div>\n            <div class=\"ui-form-content mt-3\">\n                <input class=\"ui-btn ui-btn-success\" type=\"button\" @click=\"buttonEditSubComment(id)\" :value=\"$Bitrix.Loc.getMessage('EDIT_COMMENT')\" />\n            </div>\n        <div>\n    "
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
    var CustomPreloader = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" width=\"50\" height=\"50\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n            <circle cx=\"25\" cy=\"25\" r=\"20\" stroke=\"#f0f2f4\" stroke-width=\"4\" fill=\"none\"/>\n            <circle cx=\"25\" cy=\"25\" r=\"20\" stroke=\"#007bff\" stroke-width=\"4\" fill=\"none\" stroke-dasharray=\"125.6\" stroke-dashoffset=\"31.4\">\n                <animate attributeName=\"stroke-dashoffset\" from=\"125.6\" to=\"502.4\" dur=\"2.25s\" repeatCount=\"indefinite\" />\n            </circle>\n        </svg>\n    "
    };
    var ArrowLeft = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-left\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8\"/>\n        </svg>\n    "
    };
    var ArrowRight = {
      template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-right\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8\"/>\n        </svg>\n    "
    };

    var Items = {
      props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path', 'query', 'userid', 'isuser', 'isFullName', 'userData'],
      components: {
        CommentFormNoauth: CommentFormNoauth,
        CommentFormAuth: CommentFormAuth,
        CommentFormEdit: CommentFormEdit,
        IconClose: IconClose,
        IconEdit: IconEdit,
        IconDelete: IconDelete,
        IconCommenting: IconCommenting
      },
      data: function data() {
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
          userData: this.userData
        };
      },
      methods: {
        buttonSendComment: function buttonSendComment(data) {
          this.$emit('subComment', data);
          this.comment = false;
        },
        buttonEditComment: function buttonEditComment(data) {
          this.$emit('editComment', data);
          this.commentEdit = false;
        }
      },
      template: "\n        <transition :duration=\"{ enter: 500, leave: 500 }\" name=\"slide-fade\">\n            <div :class=\"{'child-item': child}\" class=\"comment-item\" :data-id=\"id\" v-if=\"show\">\n                <div class=\"header-top\">\n                    <div class=\"f-left\">\n                        <div class=\"f-circle\">\n                            <div class=\"letter\">{{letter}}</div>\n                        </div>\n                        <div class=\"f-content\">\n                            <div>{{name}}</div>\n                            <div v-if=\"(timedata=='')\">{{data}}</div>\n                            <div v-else>{{timedata}}</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"text\">{{text}}</div>\n                <div v-if=\"comment\" class=\"subBlock\">\n                    <template v-if=\"!isuser\">\n                        <CommentFormNoauth \n                            :showComment=\"comment\" \n                            :path=\"path\" \n                            :query=\"query\"\n                            :isFullName=\"isFullName\" \n                            :child=\"true\" \n                            :id=\"id\"\n                            :userData=\"userData\"\n                            @open-comment-not-auth=\"openCommentNotAuth\" \n                            @close-comment-auth=\"closeCommentAuth\" \n                            @button-send-comment=\"buttonSendComment\"\n                            @full-name=\"fullName\"\n                        />\n                    </template>\n                    <template v-else>\n                        <CommentFormAuth\n                            :showComment=\"comment\" \n                            :path=\"path\" \n                            :query=\"query\" \n                            :child=\"true\" \n                            :id=\"id\"\n                            @open-comment-auth=\"openCommentAuth\" \n                            @close-comment=\"closeComment\" \n                            @button-send-comment=\"buttonSendComment\"\n                        />\n                    </template>\n                </div>\n                <div v-if=\"commentEdit\" class=\"subBlock\">\n                    <CommentFormEdit :subtext=\"text\" :id=\"id\" :path=\"path\" @button-edit-comment=\"buttonEditComment\"/>\n                </div>\n                <div class=\"socnet-button\">\n                    <i v-if=\"comment\" @click=\"comment = !comment\">\n                      <IconClose/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_COMMENT')\" \n                        @click=\"$emit('messageCallback', 'recomment', id)\" \n                        @click=\"comment = !comment\" v-if=\"(!comment && !child && fullName != name)\">\n                      <IconCommenting/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_EDIT')\" \n                        @click=\"commentEdit = !commentEdit\" \n                        @click=\"$emit('messageCallback', 'edit', id)\" v-if=\"(isauthor == true && !child || fullName == name)\">\n                      <IconEdit/>\n                    </i>\n                    <i :title=\"$Bitrix.Loc.getMessage('TITLE_DELETE')\" \n                        @click=\"$emit('messageCallback', 'delete', id)\" \n                        @click=\"show = !show\" v-if=\"(isauthor == true || fullName == name)\">\n                      <IconDelete/>\n                    </i>\n                </div>\n            </div>\n            \n        </transition>\n    "
    };

    var runAction = BX.ajax.runAction;
    var CommentItems = {
      components: {
        Items: Items,
        CommentFormNoauth: CommentFormNoauth,
        CommentFormAuth: CommentFormAuth,
        IconCommenting: IconCommenting,
        CustomPreloader: CustomPreloader,
        IconClose: IconClose,
        ArrowRight: ArrowRight,
        ArrowLeft: ArrowLeft
      },
      data: function data() {
        var userData = BX.localStorage.get('userData');
        var url = new URL(location);
        var arResult = ui_vue3.reactive({});
        arResult.path = url.pathname;
        arResult.query = url.search;
        var loading = ui_vue3.reactive({
          isLoading: true
        });
        runAction('gk:comments.CC.ResponseGkComments.getComment', {
          data: {
            path: arResult.path,
            query: arResult.query
          }
        }).then(function (response) {
          if (response.data.page > 1) {
            runAction('gk:comments.CC.ResponseGkComments.getComment', {
              data: {
                path: arResult.path,
                query: arResult.query,
                page: response.data.page
              }
            }).then(function (response) {
              //console.log(response.data)
              arResult.arrayComment = response.data.object;
              arResult.arrayCount = Object.keys(response.data.object);
              arResult.Counts = response.data.counts;
              arResult.Page = response.data.page;
              arResult.Pages = response.data.pages;
              arResult.userId = response.data.userId;
              arResult.isAdmin = response.data.isAdmin;
              arResult.isShow = response.data.isShow;
              arResult.Limit = response.data.limit;
            });
          } else {
            arResult.arrayComment = response.data.object;
            arResult.arrayCount = Object.keys(response.data.object);
            arResult.Counts = response.data.counts;
            arResult.Page = response.data.page;
            arResult.Pages = response.data.pages;
            arResult.userId = response.data.userId;
            arResult.isAdmin = response.data.isAdmin;
            arResult.isShow = response.data.isShow;
            arResult.Limit = response.data.limit;
          }

          // Устанавливаем isLoading в false, как только данные полностью загружены и обработаны, с небольшим тиймаутом
          setTimeout(function () {
            loading.isLoading = false;
          }, 1000);
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
          fullName: '',
          userData: userData,
          loading: loading,
          page: 0,
          pages: 1
        };
      },
      computed: {
        isUser: function isUser() {
          return this.arResult.userId > 0;
        },
        isAdmin: function isAdmin() {
          return this.arResult.isAdmin;
        },
        isShow: function isShow() {
          return this.arResult.isShow;
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
              query: this.arResult.query,
              USER_ID: data.userId,
              comment_id: data.comment_id,
              page: this.arResult.Pages
            }
          }).then(function (comment) {
            $('.closeComments').trigger('click');
            if (comment.data.page !== comment.data.pages) {
              runAction('gk:comments.CC.ResponseGkComments.getComment', {
                data: {
                  path: arResult.path,
                  query: arResult.query,
                  page: comment.data.page
                }
              }).then(function (comment) {
                arResult.arrayComment = comment.data.object;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.arrayCount = Object.keys(comment.data.object);
                arResult.Counts = comment.data.counts;
                arResult.Page = comment.data.page;
                arResult.Pages = comment.data.pages;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.isShow = comment.data.isShow;
              });
            } else {
              arResult.arrayComment = comment.data.object;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.arrayCount = Object.keys(comment.data.object);
              arResult.Counts = comment.data.counts;
              arResult.Page = comment.data.page;
              arResult.Pages = comment.data.pages;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.isShow = comment.data.isShow;
            }
          });
        },
        buttonSendSubComment: function buttonSendSubComment(data) {
          var arResult = this.arResult;
          runAction('gk:comments.CC.ResponseGkComments.setComment', {
            data: data
          }).then(function (comment) {
            $('.fa-close').trigger('click');
            if (comment.data.page !== comment.data.pages) {
              runAction('gk:comments.CC.ResponseGkComments.getComment', {
                data: {
                  path: arResult.path,
                  query: arResult.query,
                  page: comment.data.page
                }
              }).then(function (comment) {
                arResult.arrayComment = comment.data.object;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.arrayCount = Object.keys(comment.data.object);
                arResult.Counts = comment.data.counts;
                arResult.Page = comment.data.page;
                arResult.Pages = comment.data.pages;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.isShow = comment.data.isShow;
              });
            } else {
              arResult.arrayComment = comment.data.object;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.arrayCount = Object.keys(comment.data.object);
              arResult.Counts = comment.data.counts;
              arResult.Page = comment.data.page;
              arResult.Pages = comment.data.pages;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.isShow = comment.data.isShow;
            }
          });
        },
        buttonEditComment: function buttonEditComment(data) {
          var arResult = this.arResult;
          runAction('gk:comments.CC.ResponseGkComments.editComment', {
            data: data
          }).then(function (comment) {
            $('.fa-close').trigger('click');
            if (comment.data.page !== comment.data.pages) {
              runAction('gk:comments.CC.ResponseGkComments.getComment', {
                data: {
                  path: arResult.path,
                  query: arResult.query,
                  page: comment.data.page
                }
              }).then(function (comment) {
                arResult.arrayComment = comment.data.object;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.arrayCount = Object.keys(comment.data.object);
                arResult.Counts = comment.data.counts;
                arResult.Page = comment.data.page;
                arResult.Pages = comment.data.pages;
                arResult.userId = comment.data.userId;
                arResult.isAdmin = comment.data.isAdmin;
                arResult.isShow = comment.data.isShow;
              });
            } else {
              arResult.arrayComment = comment.data.object;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.arrayCount = Object.keys(comment.data.object);
              arResult.Counts = comment.data.counts;
              arResult.Page = comment.data.page;
              arResult.Pages = comment.data.pages;
              arResult.userId = comment.data.userId;
              arResult.isAdmin = comment.data.isAdmin;
              arResult.isShow = comment.data.isShow;
            }
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
              if (comment.data.page !== comment.data.pages) {
                runAction('gk:comments.CC.ResponseGkComments.getComment', {
                  data: {
                    path: arResult.path,
                    query: arResult.query,
                    page: comment.data.page
                  }
                }).then(function (comment) {
                  arResult.arrayComment = comment.data.object;
                  arResult.userId = comment.data.userId;
                  arResult.isAdmin = comment.data.isAdmin;
                  arResult.arrayCount = Object.keys(comment.data.object);
                  arResult.Counts = comment.data.counts;
                  arResult.Page = comment.data.page;
                  arResult.Pages = comment.data.pages;
                  arResult.userId = comment.data.userId;
                  arResult.isAdmin = comment.data.isAdmin;
                  arResult.isShow = comment.data.isShow;
                });
              }
            });
          }
        },
        getPagination: function getPagination(event) {
          var arResult = this.arResult;
          if (event === 'next') {
            this.page = arResult.Pages += 1;
          } else {
            this.page = arResult.Pages -= 1;
          }
          runAction('gk:comments.CC.ResponseGkComments.getComment', {
            data: {
              path: arResult.path,
              query: arResult.query,
              page: this.page
            }
          }).then(function (response) {
            arResult.arrayComment = response.data.object;
            arResult.arrayCount = Object.keys(response.data.object);
            arResult.Counts = response.data.counts;
            arResult.Page = response.data.page;
            arResult.Pages = response.data.pages;
            arResult.userId = response.data.userId;
            arResult.isAdmin = response.data.isAdmin;
            arResult.isShow = response.data.isShow;
            return arResult;
          });
        }
      },
      template: "\n           <template v-if=\"loading.isLoading\">\n                <transition name=\"fade\" @before-enter=\"beforeEnter\" @enter=\"enter\" @leave=\"leave\">\n                    <div class=\"custom-preloader\">\n                        <CustomPreloader />\n                    </div>\n                </transition>\n            </template>\n            <template v-else>\n               <div>\n                    <div class=\"comment-header\" v-if=\"isShow\">\n                        <div class=\"comment-button-body mb-3\" v-if=\"isUser\">\n                            <div class=\"title\">{{name}}</div>\n                            <div class=\"blockButton\">\n                                <div class=\"ui-ctl-label-text line-block-form\" @click=\"openCommentAuth\" v-if=\"!showComment\" role=\"button\">\n                                    <i>\n                                        <IconCommenting/>\n                                    </i> <input class=\"ui-ctl-element\" readonly=\"readonly\" type=\"text\" :placeholder=\"$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')\">\n                                </div>\n                                <div class=\"ui-ctl-label-text closeComments\" @click=\"closeCommentAuth\" v-if=\"showComment\" role=\"button\">\n                                    <i>\n                                        <IconClose/>\n                                    </i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}\n                                </div>\n                            </div>\n                            <div class=\"ui-form form-body\" v-if=\"showComment\">\n                                <CommentFormAuth\n                                    :showComment=\"showComment\" \n                                    :path=\"path\" \n                                    @open-comment-auth=\"openCommentAuth\" \n                                    @close-comment=\"closeComment\" \n                                    @button-send-comment=\"buttonSendComment\"\n                                />\n                            </div>\n                        </div>\n                        <div class=\"comment-button-body mb-3\" v-else>\n                            <CommentFormNoauth \n                                :showComment=\"showComment\" \n                                :path=\"path\" \n                                :isFullName=\"isFullName\" \n                                :fullName=\"fullName\" \n                                :userData=\"userData\" \n                                @open-comment-not-auth=\"openCommentNotAuth\" \n                                @close-comment-auth=\"closeCommentAuth\" \n                                @button-send-comment=\"buttonSendComment\"\n                            />\n                        </div>\n                    </div>\n                    <div class=\"comment-body\" id=\"comment-body\">\n                        <template v-for=\"(post, index) in arResult.arrayComment\" :key=\"index\">\n                            <Items  v-if=\"(post.COMMENT_ID == 0)\" appear :duration=\"{ enter: 500, leave: 500 }\" \n                                :name=\"post.NAME\"\n                                :text=\"post.COMMENT\"\n                                :icon=\"post.icon\"\n                                :elementid=\"post.COMMENT_ID\"\n                                :data=\"post.data\"\n                                :timedata=\"post.timeData\"\n                                :letter=\"post.letter\"\n                                :id=\"post.ID\"\n                                :isauthor=\"post.author\" \n                                :show=\"true\"\n                                :child=\"false\" \n                                :path=\"path\" \n                                :query=\"query\" \n                                :userid=\"arResult.userId\" \n                                :isuser=\"isUser\" \n                                :isFullName=\"isFullName\" \n                                :userData=\"userData\" \n                                @message-callback=\"ParentCall\"\n                                @sub-comment=\"buttonSendComment\" \n                                @edit-comment=\"buttonEditComment\"\n                            />\n                            <template v-if=\"post.sub\"  v-for=\"(spost, sindex) in post.sub\" :key=\"sindex\">\n                                <Items \n                                    :name=\"spost.NAME\"\n                                    :text=\"spost.COMMENT\"\n                                    :icon=\"spost.icon\"\n                                    :elementid=\"spost.COMMENT_ID\"\n                                    :data=\"spost.data\"\n                                    :timedata=\"spost.timeData\"\n                                    :letter=\"spost.letter\"\n                                    :id=\"spost.ID\"\n                                    :isauthor=\"spost.author\" \n                                    :isfullname=\"isFullName\" \n                                    :show=\"true\" \n                                    :child=\"true\" \n                                    :path=\"path\" \n                                    :query=\"query\"\n                                    :userData=\"userData\" \n                                    @edit-comment=\"buttonEditComment\" \n                                    @message-callback=\"ParentCall\"/>\n                            </template>\n                        </template>\n                        <ul class=\"ui-pagination\" v-if=\"(arResult.Page > 1)\">\n                            <li v-if=\"(arResult.Pages > 1)\" \n                                class=\"ui-btn ui-btn-link ui-btn-icon-arrow-back\" \n                                @click=\"getPagination('parent')\"\n                            >\n                                <ArrowLeft/>\n                            </li>\n                            <li v-if=\"(arResult.arrayCount.length > arResult.Limit-1)\" \n                                class=\"ui-btn ui-btn-link ui-btn-icon-arrow-next\" \n                                @click=\"getPagination('next')\"\n                            >\n                                <ArrowRight/>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </template>           \n    "
    };

    function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
        babelHelpers.defineProperty(this, "state", ui_vue3.reactive({
          isVisible: false
        }));
        this.rootNode = document.querySelector(rootNode);
      }
      babelHelpers.createClass(Comments, [{
        key: "start",
        value: function start() {
          this.getTemplate();
          this.showComponentAfterDelay();
        }
      }, {
        key: "showComponentAfterDelay",
        value: function () {
          var _showComponentAfterDelay = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  setTimeout(function () {
                    _this.state.isVisible = true;
                  }, 150);
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function showComponentAfterDelay() {
            return _showComponentAfterDelay.apply(this, arguments);
          }
          return showComponentAfterDelay;
        }()
      }, {
        key: "getTemplate",
        value: function getTemplate() {
          var context = this;
          babelHelpers.classPrivateFieldSet(this, _application, ui_vue3.BitrixVue.createApp({
            components: {
              CommentItems: CommentItems
            },
            data: function data() {
              return {
                state: context.state
              };
            },
            beforeCreate: function beforeCreate() {
              this.$bitrix.Application.set(context);
            },
            template: "\n\t\t\t\t<CommentItems class=\"comments-wrapper\" :class=\"{ 'is-visible': state.isVisible }\"/>\n\t\t\t"
          }));
          babelHelpers.classPrivateFieldGet(this, _application).mount(this.rootNode);
        }
      }]);
      return Comments;
    }();

    exports.Comments = Comments;

}((this.BX = this.BX || {}),BX.Vue3));
