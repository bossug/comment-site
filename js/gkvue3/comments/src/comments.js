import {Dom, Loc} from 'main.core';
import {BitrixVue, reactive} from "ui.vue3";

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
			data() {
				return {
					modalTitle: Loc.getMessage('COMMENTS_TITLE'),
					posts: [
						{
							title: 'User1',
							text: 'Content1',
							icon: '',
							data: '',
							elementId: '',
							id: '',
						},
						{
							title: 'User2',
							text: 'Content3',
							icon: '',
							data: '',
							elementId: '',
							id: '',
						},
					]
				}
			},
		})
		this.#application.component("content-modal", {
			props: ['title'],
			template: `
				<h4>{{title}}</h4>
			`,
		})
		this.#application.component("content-second", {
			props: ['title', 'text', 'icon', 'data', 'elementId', 'id'],
			template: `
				<div>
					<div>{{title}}</div>
					<div>{{text}}</div>
				</div>
			`,
		})
		this.#application.mount(this.rootNode);
	}
}
