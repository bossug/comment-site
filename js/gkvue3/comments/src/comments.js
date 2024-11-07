import { BitrixVue, reactive } from "ui.vue3";
import { CommentItems } from "./component/comment-items";
import './comments.css'

export class Comments {
	#application;
	state = reactive({
		isVisible: false,
	});

	constructor(rootNode) {
		this.rootNode = document.querySelector(rootNode);
	}

	start() {
		this.getTemplate();
		this.showComponentAfterDelay();
	}

	async showComponentAfterDelay() {
		setTimeout(() => {
			this.state.isVisible = true;
		}, 750);
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
				<div class="comments-wrapper" :class="{ 'is-visible': state.isVisible }">
					<CommentItems/>
				</div>
			`,
		});

		this.#application.mount(this.rootNode);
	}
}