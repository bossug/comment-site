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
			computed: {
				isUser()
				{
					return false;
				}
			},
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

		this.#application.component("content-header", {
			props: ['title', 'name'],
			template: `
				<div class="comment-header">
					<div class="comment-button-body mb-3" v-if="isUser">
						<div class="title">{{name}}</div>
						<a href="javascript:void(0)" class="link-comment" @click="newComment">Написать сообщение</a>
					</div>
					<div class="comment-button-body mb-3" v-else>
						<div class="title">Аноним</div>
						<a href="javascript:void(0)" class="link-comment" @click="newCommentNotAuth">Написать сообщение</a>
					</div>
				</div>
			`,
		})
		this.#application.component("content-body", {
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
