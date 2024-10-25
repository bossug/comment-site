import {Dom, Loc} from 'main.core';
import {BitrixVue, reactive} from "ui.vue3";
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
		const {runAction, prepareForm} = BX.ajax;
		this.#application = BitrixVue.createApp({
			setup()
			{
				let url = new URL(location);
				const arResult = reactive({
					arrayComment: [{}]
				});
				arResult.path = url.pathname;
				arResult.query = url.search;
				runAction('gk:comments.CC.ResponseGkComments.getComment',{
					data: {
						path: arResult.path,
						query: arResult.query
					}
				}).then(function(response){
					arResult.arrayComment = response.data
				})
				return {
					arResult,
				};
			},
			computed: {
				isUser()
				{
					return false;
				}
			},
			data() {
				return {
					//modalTitle: Loc.getMessages(),
					posts: this.arResult.arrayComment,
					path: this.arResult.path,
					query: this.arResult.query,
					/*posts: [
						{
							title: 'User3',
							text: 'Content4',
							icon: '',
							data: '25.10.2024',
							timeData: '',
							letter: 'H',
							elementId: 3,
							id: '',
						},
						{
							title: 'User1',
							text: 'Content1',
							icon: '',
							data: '2.02.2021',
							timeData: 'вчера',
							letter: 'U',
							elementId: 2,
							id: '',
						},
						{
							title: 'User2',
							text: 'Content3',
							icon: '',
							data: '14.07.2024',
							timeData: '',
							letter: 'I',
							elementId: 1,
							id: '',
						},
					]*/
				}
			},
		})

		this.#application.component("content-header", {
			props: ['title', 'name', 'path', 'query'],
			data()
			{
				return {
					showComment: false
				}
			},
			methods: {
				openCommentNotAuth()
				{
					this.showComment = true;
				},
				closeCommentNotAuth()
				{
					this.showComment = false;
				},
				buttonSendComment()
				{
					const {arResult} = this;
					let text = $('#addComment textarea');
					let input = $('#addComment input');
					let comment = text.val();
					console.log(arResult)
					runAction('gk:comments.CC.ResponseGkComments.setComment',{
						data: prepareForm(BX('addComment')).data
					}).then(function(comment){
						//comment.val(null)
						$('#closeComments').trigger('click')
						let list = JSON.parse(comment.data)
						$(list).each(function (i, n) {
							console.log(n)
							arResult.arrayComment.push(n)
						})
						return arResult;
					});
				}
			},
			template: `
				<div class="comment-header">
					<div class="comment-button-body mb-3" v-if="isUser">
						<div class="title">{{name}}</div>
						<a href="javascript:void(0)" class="link-comment" @click="newComment">{{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</a>
					</div>
					<div class="comment-button-body mb-3" v-else>
						<div class="button-body">
							<div class="title">{{$Bitrix.Loc.getMessage('USER_TITLE')}}</div>
							<div class="blockButton">
								<div class="ui-ctl-label-text" @click="openCommentNotAuth" v-if="!showComment" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('WRITE_TO_COMMENT')}}</div>
								<div class="ui-ctl-label-text" @click="closeCommentNotAuth" v-if="showComment" id="closeComments" role="button"><i class="fa fa-comment"></i> {{$Bitrix.Loc.getMessage('CLOSE_COMMENT')}}</div>
							</div>
						</div>
						<div class="ui-form form-body" v-if="showComment">
							<form id="addComment" class="ui-ctl-w100">
								<input type="hidden" name="path" :value="path">
								<input type="hidden" name="query" :value="query">
								<div class="ui-form-row-inline">
									<div class="ui-form-row">
										<div class="ui-form-label">
											<div class="ui-ctl-label-text">Ваше имя</div>
										</div>
										<div class="ui-form-content">
											<div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
												<input type="text" name="NAME" class="ui-ctl-element">
											</div>
										</div>
									</div>
									<div class="ui-form-row">
										<div class="ui-form-label">
											<div class="ui-ctl-label-text">Ваша фамилия</div>
										</div>
										<div class="ui-form-content">
											<div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
												<input type="text" name="LAST_NAME" class="ui-ctl-element">
											</div>
										</div>
									</div>
									<div class="ui-form-row">
										<div class="ui-form-label">
											<div class="ui-ctl-label-text">Ваш E-mail</div>
										</div>
										<div class="ui-form-content">
											<div class="ui-ctl ui-ctl-textbox ui-ctl-w100">
												<input type="text" name="EMAIL" class="ui-ctl-element">
											</div>
										</div>
									</div>
								</div>
								<div class="ui-form-row">
									<div class="ui-form-label">
										<div class="ui-ctl-label-text">{{$Bitrix.Loc.getMessage('YOUR_COMMENT')}}</div>
									</div>
									<div class="ui-form-content">
										<div class="ui-ctl ui-ctl-textarea ui-ctl-w100">
											<textarea name="text" class="ui-ctl-element require"></textarea>
										</div>
									</div>
									<div class="ui-form-content mt-3">
										<div class="ui-btn ui-btn-success" @click="buttonSendComment" id="buttonSendComment">{{$Bitrix.Loc.getMessage('SEND_COMMENT')}}</div>
									</div>
								<div>
							</form>
						</div>
					</div>
				</div>
			`,
		})
		this.#application.component("content-body", {
			props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id'],
			template: `
				<div class="comment-item">
					<div class="header-top">
						<div class="f-left">
							<div class="f-circle">
								<div class="letter">{{letter}}</div>
							</div>
							<div class="f-content">
								<div>{{name}}</div>
								<div v-if="(timedata=='')">{{data}}</div>
								<div v-else>{{timedata}}</div>
							</div>
						</div>
					</div>
					<div class="text">{{text}}</div>
				</div>
			`,
		})
		this.#application.mount(this.rootNode);
	}
}
