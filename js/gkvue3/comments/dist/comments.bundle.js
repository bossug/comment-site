/* eslint-disable */
(function (exports,main_core,ui_vue3) {
    'use strict';

    var Items = {
      props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show', 'child', 'path'],
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
        buttonSendSubComment: function buttonSendSubComment(id, path) {
          this.$emit('subComment', {
            NAME: this.NAME,
            LAST_NAME: this.LAST_NAME,
            EMAIL: this.EMAIL,
            text: this.subtext,
            comment_id: id,
            path: path
          });
        }
      },
      template: "\n        <transition :duration=\"500\">\n            <div :class=\"{'child-item': child}\" class=\"comment-item\" :data-id=\"id\" v-if=\"show\">\n                <div class=\"header-top\">\n                    <div class=\"f-left\">\n                        <div class=\"f-circle\">\n                            <div class=\"letter\">{{letter}}</div>\n                        </div>\n                        <div class=\"f-content\">\n                            <div>{{name}}</div>\n                            <div v-if=\"(timedata=='')\">{{data}}</div>\n                            <div v-else>{{timedata}}</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"text\">{{text}}</div>\n                <div v-if=\"comment\" class=\"subBlock\">\n                    <form class=\"ui-ctl-w100\">\n                        <div class=\"ui-form-row-inline\">\n                            <div class=\"ui-form-row\">\n                                <div class=\"ui-form-label\">\n                                    <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                                </div>\n                                <div class=\"ui-form-content\">\n                                    <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                        <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"ui-form-row\">\n                                <div class=\"ui-form-label\">\n                                    <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                                </div>\n                                <div class=\"ui-form-content\">\n                                    <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                        <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"ui-form-row\">\n                                <div class=\"ui-form-label\">\n                                    <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                                </div>\n                                <div class=\"ui-form-content\">\n                                    <div class=\"ui-ctl-xs ui-ctl-textbox ui-ctl-w100\">\n                                        <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form-row\">\n                            <div class=\"ui-form-label\">\n                                <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                            </div>\n                            <div class=\"ui-form-content\">\n                                <div class=\"ui-ctl-xs ui-ctl-textarea ui-ctl-w100\">\n                                    <textarea v-model=\"subtext\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                                </div>\n                            </div>\n                            <div class=\"ui-form-content mt-3\">\n                                <input class=\"ui-btn ui-btn-success\" type=\"button\" @click=\"buttonSendSubComment(id, path)\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                            </div>\n                        <div>\n                    </form>\n                </div>\n                <div class=\"socnet-button\">\n                    <i class=\"fa fa-close\" v-if=\"comment\" @click=\"comment = !comment\"></i>\n                    <i class=\"fa fa-commenting\" aria-hidden=\"true\" title=\"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\" @click=\"$emit('messageCallback', 'recomment', id)\"  @click=\"comment = !comment\" v-if=\"(!comment && !child)\"></i>\n                    <i class=\"fa fa-pencil\" aria-hidden=\"true\" title=\"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\" @click=\"$emit('messageCallback', 'edit', id)\" v-if=\"(isauthor == true && !child)\"></i>\n                    <i class=\"fa fa-trash\" aria-hidden=\"true\" title=\"\u0443\u0434\u0430\u043B\u0438\u0442\u044C\" @click=\"$emit('messageCallback', 'delete', id)\" @click=\"show = !show\" v-if=\"(isauthor == true)\"></i>\n                </div>\n            </div>\n        </transition>\n    "
    };

    var _BX$ajax = BX.ajax,
      runAction = _BX$ajax.runAction,
      prepareForm = _BX$ajax.prepareForm;
    var CommentItems = {
      components: {
        Items: Items
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
          arResult.arrayComment = response.data.object;
          arResult.isUser = response.data.isUser;
        });
        return {
          showComment: false,
          arResult: arResult,
          path: arResult.path,
          query: arResult.query,
          NAME: null,
          LAST_NAME: null,
          EMAIL: null,
          text: null
        };
      },
      computed: {
        isUser: function isUser() {
          return this.arResult.isUser;
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
        closeCommentNotAuth: function closeCommentNotAuth() {
          this.showComment = false;
        },
        buttonSendComment: function buttonSendComment() {
          var arResult = this.arResult;
          var name = this.NAME;
          runAction('gk:comments.CC.ResponseGkComments.setComment', {
            data: prepareForm(BX('addComment')).data
          }).then(function (comment) {
            $('#closeComments').trigger('click');
            arResult.arrayComment = comment.data;
          });
        },
        buttonSendSubComment: function buttonSendSubComment(data) {
          var arResult = this.arResult;
          runAction('gk:comments.CC.ResponseGkComments.setComment', {
            data: data
          }).then(function (comment) {
            $('.fa-close').trigger('click');
            arResult.arrayComment = comment.data;
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
              //arResult.arrayComment = comment.data
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
      template: "\n            <div>\n                <div class=\"comment-header\">\n                    <div class=\"comment-button-body mb-3\" v-if=\"isUser\">\n                        <div class=\"title\">{{name}}</div>\n                        <div class=\"blockButton\">\n                                <div class=\"ui-ctl-label-text\" @click=\"openCommentAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n                                <div class=\"ui-ctl-label-text\" @click=\"closeCommentAuth\" v-if=\"showComment\" id=\"closeComments\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>\n                            </div>\n                    </div>\n                    <div class=\"comment-button-body mb-3\" v-else>\n                        <div class=\"button-body\">\n                            <div class=\"title\">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>\n                            <div class=\"blockButton\">\n                                <div class=\"ui-ctl-label-text\" @click=\"openCommentNotAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n                                <div class=\"ui-ctl-label-text\" @click=\"closeCommentNotAuth\" v-if=\"showComment\" id=\"closeComments\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>\n                            </div>\n                        </div>\n                        <div class=\"ui-form form-body\" v-if=\"showComment\">\n                            <form id=\"addComment\" class=\"ui-ctl-w100\" @submit.prevent=\"buttonSendComment\">\n                                <input type=\"hidden\" name=\"path\" :value=\"path\">\n                                <input type=\"hidden\" name=\"query\" :value=\"query\">\n                                <div class=\"ui-form-row-inline\">\n                                    <div class=\"ui-form-row\">\n                                        <div class=\"ui-form-label\">\n                                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_NAME')}}</div>\n                                        </div>\n                                        <div class=\"ui-form-content\">\n                                            <div class=\"ui-ctl ui-ctl-textbox ui-ctl-w100\">\n                                                <input type=\"text\" v-model=\"NAME\" name=\"NAME\" class=\"ui-ctl-element\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-form-row\">\n                                        <div class=\"ui-form-label\">\n                                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_LAST_NAME')}}</div>\n                                        </div>\n                                        <div class=\"ui-form-content\">\n                                            <div class=\"ui-ctl ui-ctl-textbox ui-ctl-w100\">\n                                                <input type=\"text\" v-model=\"LAST_NAME\" name=\"LAST_NAME\" class=\"ui-ctl-element\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-form-row\">\n                                        <div class=\"ui-form-label\">\n                                            <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_EMAIL')}}</div>\n                                        </div>\n                                        <div class=\"ui-form-content\">\n                                            <div class=\"ui-ctl ui-ctl-textbox ui-ctl-w100\">\n                                                <input type=\"text\" v-model=\"EMAIL\" name=\"EMAIL\" class=\"ui-ctl-element\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"ui-form-row\">\n                                    <div class=\"ui-form-label\">\n                                        <div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n                                    </div>\n                                    <div class=\"ui-form-content\">\n                                        <div class=\"ui-ctl ui-ctl-textarea ui-ctl-w100\">\n                                            <textarea v-model=\"text\" name=\"text\" class=\"ui-ctl-element require\"></textarea>\n                                        </div>\n                                    </div>\n                                    <div class=\"ui-form-content mt-3\">\n                                        <input class=\"ui-btn ui-btn-success\" type=\"submit\" :value=\"$Bitrix.Loc.getMessage('SEND_COMMENT')\" />\n                                    </div>\n                                <div>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"comment-body\" id=\"comment-body\">\n                    <template v-for=\"(post, index) in arResult.arrayComment\" :key=\"index\">\n                        <Items  v-if=\"(post.COMMENT_ID == 0)\" \n                            :name=\"post.NAME\"\n                            :text=\"post.COMMENT\"\n                            :icon=\"post.icon\"\n                            :elementid=\"post.COMMENT_ID\"\n                            :data=\"post.data\"\n                            :timedata=\"post.timeData\"\n                            :letter=\"post.letter\"\n                            :id=\"post.ID\"\n                            :isauthor=\"post.author\" \n                            :show=\"true\"\n                            :child=\"false\" \n                            :path=\"path\"\n                            @message-callback=\"ParentCall\"\n                            @sub-comment=\"buttonSendSubComment\"\n                        />\n                        <template v-if=\"post.sub\"  v-for=\"(spost, sindex) in post.sub\" :key=\"sindex\">\n                            <Items \n                                :name=\"spost.NAME\"\n                                :text=\"spost.COMMENT\"\n                                :icon=\"spost.icon\"\n                                :elementid=\"spost.COMMENT_ID\"\n                                :data=\"spost.data\"\n                                :timedata=\"spost.timeData\"\n                                :letter=\"spost.letter\"\n                                :id=\"spost.ID\"\n                                :isauthor=\"spost.author\" \n                                :show=\"true\" \n                                :child=\"true\"\n                                @message-callback=\"ParentCall\"/>\n                        </template>\n                    </template>\n                </div>\n            </div>\n    "
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
