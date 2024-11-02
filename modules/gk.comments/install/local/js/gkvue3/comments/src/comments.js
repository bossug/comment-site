import {BitrixVue, reactive} from "ui.vue3";
import {CommentItems} from "./component/comment-items";
import './comments.css'

export class Comments
{
	#application;

	constructor(rootNode)
	{
		this.rootNode = document.querySelector(rootNode);
	}

	start()
	{
		this.getTemplate();
	}

	getTemplate()
	{
		const context = this;
		this.#application = BitrixVue.createApp({
			components: {
				CommentItems
			},
			beforeCreate()
			{
				this.$bitrix.Application.set(context);
			},
			template: '<CommentItems/>',
		})

		this.#application.mount(this.rootNode);
	}
}
