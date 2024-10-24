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
	      babelHelpers.classPrivateFieldGet(this, _application).component("content-modal", {
	        props: ['title'],
	        template: "\n\t\t\t\t<h4>{{title}}</h4>\n\t\t\t"
	      });
	      babelHelpers.classPrivateFieldGet(this, _application).component("content-second", {
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
