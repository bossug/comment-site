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
	            modalTitle: main_core.Loc.getMessage('COMMENTS_TITLE'),
	            posts: [{
	              title: 'User1',
	              text: 'Content1',
	              icon: '',
	              data: '',
	              elementId: '',
	              id: ''
	            }, {
	              title: 'User2',
	              text: 'Content3',
	              icon: '',
	              data: '',
	              elementId: '',
	              id: ''
	            }]
	          };
	        }
	      }));
	      babelHelpers.classPrivateFieldGet(this, _application).component("content-header", {
	        props: ['title', 'name'],
	        template: "\n\t\t\t\t<div class=\"comment-header\">\n\t\t\t\t\t<div class=\"comment-button-body mb-3\" v-if=\"isUser\">\n\t\t\t\t\t\t<div class=\"title\">{{name}}</div>\n\t\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"link-comment\" @click=\"newComment\">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"comment-button-body mb-3\" v-else>\n\t\t\t\t\t\t<div class=\"title\">\u0410\u043D\u043E\u043D\u0438\u043C</div>\n\t\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"link-comment\" @click=\"newCommentNotAuth\">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
	      });
	      babelHelpers.classPrivateFieldGet(this, _application).component("content-body", {
	        props: ['title', 'text', 'icon', 'data', 'elementId', 'id'],
	        template: "\n\t\t\t\t<div>\n\t\t\t\t\t<div>{{title}}</div>\n\t\t\t\t\t<div>{{text}}</div>\n\t\t\t\t</div>\n\t\t\t"
	      });
	      babelHelpers.classPrivateFieldGet(this, _application).mount(this.rootNode);
	    }
	  }]);
	  return Comments;
	}();

	exports.Comments = Comments;

}((this.BX = this.BX || {}),BX,BX.Vue3));
