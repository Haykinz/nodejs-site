define([
	'emberjs/load',
	"views/MainView",
	"controllers/authorsController"
],function(
	em,
	MainView,
	authorsController
){
	"use strict";

	em.App = em.Application.create({
		mainView: MainView.create({}),
		authorsController: authorsController
	});

	em.App.mainView.appendTo('body');

	return em.App;
});
