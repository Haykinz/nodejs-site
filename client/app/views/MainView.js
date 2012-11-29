/*global console:false */

define([
	'emberjs/load',
	'models/Author',
	'controllers/authorsController',
	'requirejs/plugins/text!templates/Main.handlebars'
],function(
	em,
	Author,
	authorsController,
	mainTemplateSource
){
	"use strict";
	

	return em.View.extend({
		template: em.Handlebars.compile(mainTemplateSource),

		newAuthor: null,

		init: function() {
			this._super();
			this.refresh();
			this.newAuthor = Author.create();
		},
		
		refresh: function() {
			authorsController.getAll();
		},

		removeAuthor: function(event) {
			var authorId = event.context.get('_id');

			authorsController.api.removeAuthor(authorId, function() {
				
				authorsController.removeObject(event.context);

			}.bind(this), function(err) {
				console.log('error', err);
			}.bind(this));
		},

		createAuthor: function() {
			
			var authorName = this.newAuthor.get('name');
			
			if (authorName === undefined || authorName === null || authorName === '') {
				em.$('#authorName').focus();
				return;
			}
			
			authorsController.api.createAuthor({
				name: authorName
			},function(data) {
				
				this.newAuthor.set('_id', data.id);
				
				authorsController.pushObject(this.newAuthor);

				this.set('newAuthor', Author.create());

			}.bind(this), function(err) {
				console.log('error', err);
			}.bind(this));
		}
	});
});
