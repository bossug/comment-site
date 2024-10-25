/* eslint-disable */
(function (exports,main_core,ui_vue3) {
    'use strict';

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
          babelHelpers.classPrivateFieldSet(this, _application, ui_vue3.BitrixVue.createApp({
            computed: {
              isUser: function isUser() {
                return false;
              }
            },
            data: function data() {
              return {
                //modalTitle: Loc.getMessages(),
                posts: [{
                  title: 'User3',
                  text: 'Content4',
                  icon: '',
                  data: '25.10.2024',
                  timeData: '',
                  letter: 'H',
                  elementId: 3,
                  id: ''
                }, {
                  title: 'User1',
                  text: 'Content1',
                  icon: '',
                  data: '2.02.2021',
                  timeData: 'вчера',
                  letter: 'U',
                  elementId: 2,
                  id: ''
                }, {
                  title: 'User2',
                  text: 'Content3',
                  icon: '',
                  data: '14.07.2024',
                  timeData: '',
                  letter: 'I',
                  elementId: 1,
                  id: ''
                }]
              };
            }
          }));
          babelHelpers.classPrivateFieldGet(this, _application).component("content-header", {
            props: ['title', 'name'],
            data: function data() {
              return {
                showComment: false
              };
            },
            methods: {
              openCommentNotAuth: function openCommentNotAuth() {
                this.showComment = true;
              },
              closeCommentNotAuth: function closeCommentNotAuth() {
                this.showComment = false;
              }
            },
            template: "\n\t\t\t\t<div class=\"comment-header\">\n\t\t\t\t\t<div class=\"comment-button-body mb-3\" v-if=\"isUser\">\n\t\t\t\t\t\t<div class=\"title\">{{name}}</div>\n\t\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"link-comment\" @click=\"newComment\">{{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"comment-button-body mb-3\" v-else>\n\t\t\t\t\t\t<div class=\"button-body\">\n\t\t\t\t\t\t\t<div class=\"title\">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>\n\t\t\t\t\t\t\t<div class=\"blockButton\">\n\t\t\t\t\t\t\t\t<div class=\"ui-ctl-label-text\" @click=\"openCommentNotAuth\" v-if=\"!showComment\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>\n\t\t\t\t\t\t\t\t<div class=\"ui-ctl-label-text\" @click=\"closeCommentNotAuth\" v-if=\"showComment\" id=\"closeComments\" role=\"button\"><i class=\"fa fa-comment\"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"ui-form form-body\" v-if=\"showComment\">\n\t\t\t\t\t\t\t<div class=\"ui-form-row\">\n\t\t\t\t\t\t\t\t<form action=\"\" id=\"addComment\" class=\"ui-ctl-w100\">\n\t\t\t\t\t\t\t\t\t<div class=\"ui-form-label\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"ui-ctl-label-text\">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"ui-form-content\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"ui-ctl ui-ctl-textarea ui-ctl-w100\">\n\t\t\t\t\t\t\t\t\t\t\t<textarea name=\"text\" class=\"ui-ctl-element require\"></textarea>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"ui-form-content mt-3\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"ui-btn ui-btn-success\" @click=\"\" id=\"buttonSendComment\">{{$Bitrix.Loc.getMessage('SEND_COMMENT')}}</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
          });
          babelHelpers.classPrivateFieldGet(this, _application).component("content-body", {
            props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id'],
            template: "\n\t\t\t\t<div class=\"comment-item\">\n\t\t\t\t\t<div class=\"header-top\">\n\t\t\t\t\t\t<div class=\"f-left\">\n\t\t\t\t\t\t\t<div class=\"f-circle\">\n\t\t\t\t\t\t\t\t<div class=\"letter\">{{letter}}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"f-content\">\n\t\t\t\t\t\t\t\t<div>{{name}}</div>\n\t\t\t\t\t\t\t\t<div v-if=\"(timedata=='')\">{{data}}</div>\n\t\t\t\t\t\t\t\t<div v-else>{{timedata}}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"text\">{{text}}</div>\n\t\t\t\t</div>\n\t\t\t"
          });
          babelHelpers.classPrivateFieldGet(this, _application).mount(this.rootNode);
        }
      }]);
      return Comments;
    }();

    exports.Comments = Comments;

}((this.BX = this.BX || {}),BX,BX.Vue3));
