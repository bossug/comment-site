import { BitrixVue, reactive } from "ui.vue3";
import { CommentItems } from "./component/comment-items";
import './comments.css'

export class Comments {
	#application;
	state = reactive({
		isVisible: false,
	});

	constructor(rootNode, options={}) {
		this.rootNode = document.querySelector(rootNode);
		this.options = options;
	}

	start() {
		this.getTemplate();
		this.showComponentAfterDelay();
	}

	async showComponentAfterDelay() {
		setTimeout(() => {
			this.state.isVisible = true;
		}, 150);
	}

	getTemplate() {
		const context = this;
		this.#application = BitrixVue.createApp({
			components: {
				CommentItems
			},
			data() {
				return {
					state: context.state
				};
			},
			beforeCreate() {
				this.$bitrix.Application.set(context);
			},
			template: `
				<CommentItems
				 	class="comments-wrapper"
				 	:class="{ 'is-visible': state.isVisible }"/>
			`,
		});

		this.#application.mount(this.rootNode);
	}
}