/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

jQuery(function($) {

	var config = $('html').data('config') || {};

	// Social buttons
	$('article[data-permalink]').socialButtons(config);

	// Parallax
	setTimeout(function() {
		$('.tm-parallax-scene').parallax();
	}, 150);

	if($("body")[0].style.borderImage===undefined) $("html").addClass("js-no-borderimage");

});