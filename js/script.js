/*! http://mths.be/placeholder v2.0.7 by @mathias */
; (function (h, j, e) { var a = "placeholder" in j.createElement("input"); var f = "placeholder" in j.createElement("textarea"); var k = e.fn; var d = e.valHooks; var b = e.propHooks; var m; var l; if (a && f) { l = k.placeholder = function () { return this }; l.input = l.textarea = true } else { l = k.placeholder = function () { var n = this; n.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({ "focus.placeholder": c, "blur.placeholder": g }).data("placeholder-enabled", true).trigger("blur.placeholder"); return n }; l.input = a; l.textarea = f; m = { get: function (o) { var n = e(o); var p = n.data("placeholder-password"); if (p) { return p[0].value } return n.data("placeholder-enabled") && n.hasClass("placeholder") ? "" : o.value }, set: function (o, q) { var n = e(o); var p = n.data("placeholder-password"); if (p) { return p[0].value = q } if (!n.data("placeholder-enabled")) { return o.value = q } if (q == "") { o.value = q; if (o != j.activeElement) { g.call(o) } } else { if (n.hasClass("placeholder")) { c.call(o, true, q) || (o.value = q) } else { o.value = q } } return n } }; if (!a) { d.input = m; b.value = m } if (!f) { d.textarea = m; b.value = m } e(function () { e(j).delegate("form", "submit.placeholder", function () { var n = e(".placeholder", this).each(c); setTimeout(function () { n.each(g) }, 10) }) }); e(h).bind("beforeunload.placeholder", function () { e(".placeholder").each(function () { this.value = "" }) }) } function i(o) { var n = {}; var p = /^jQuery\d+$/; e.each(o.attributes, function (r, q) { if (q.specified && !p.test(q.name)) { n[q.name] = q.value } }); return n } function c(o, p) { var n = this; var q = e(n); if (n.value == q.attr("placeholder") && q.hasClass("placeholder")) { if (q.data("placeholder-password")) { q = q.hide().next().show().attr("id", q.removeAttr("id").data("placeholder-id")); if (o === true) { return q[0].value = p } q.focus() } else { n.value = ""; q.removeClass("placeholder"); n == j.activeElement && n.select() } } } function g() { var r; var n = this; var q = e(n); var p = this.id; if (n.value == "") { if (n.type == "password") { if (!q.data("placeholder-textinput")) { try { r = q.clone().attr({ type: "text" }) } catch (o) { r = e("<input>").attr(e.extend(i(this), { type: "text" })) } r.removeAttr("name").data({ "placeholder-password": q, "placeholder-id": p }).bind("focus.placeholder", c); q.data({ "placeholder-textinput": r, "placeholder-id": p }).before(r) } q = q.removeAttr("id").hide().prev().attr("id", p).show() } q.addClass("placeholder"); q[0].value = q.attr("placeholder") } else { q.removeClass("placeholder") } } }(this, document, jQuery));


/////// progress circle
(function ( $ ) {
    $.fn.progressCircle = function() {
        return this.each(function(){

	        	var options = {
				   percent:  this.getAttribute('data-percent') || 25,
				   size: this.getAttribute('data-size') || 220,
				   lineWidth: this.getAttribute('data-line') || 10,
				   rotate: this.getAttribute('data-rotate') || 0,
				   color: this.getAttribute('data-color') || '#666666'
				};

				var canvas = document.createElement('canvas');
				var span = document.createElement('span');
				span.textContent = options.percent + '%';

				if (typeof(G_vmlCanvasManager) !== 'undefined') {
				    G_vmlCanvasManager.initElement(canvas);
				}

				var ctx = canvas.getContext('2d');
				canvas.width = canvas.height = options.size;

				this.appendChild(span);
				this.appendChild(canvas);

				ctx.translate(options.size / 2, options.size / 2); // change center
				ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

				//imd = ctx.getImageData(0, 0, 240, 240);
				var radius = (options.size - options.lineWidth) / 2;

				var drawCircle = function(color, lineWidth, percent) {
					percent = Math.min(Math.max(0, percent || 1), 1);
					ctx.beginPath();
					ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
					ctx.strokeStyle = color;
		        	ctx.lineCap = 'round'; // butt, round or square
					ctx.lineWidth = lineWidth
					ctx.stroke();
				};

				drawCircle('#efefef', options.lineWidth, 100 / 100);
				drawCircle(options.color, options.lineWidth, options.percent / 100);
        });
    };
}( jQuery ));


$(function () {
	var $win = $(window), $doc = $(document), $body = $(document.body);

	$.ajaxSetup({ cache: false });

	$('input[placeholder], textarea[placeholder]').placeholder();

	$('.progress-circle').progressCircle();

	$('.js-select').each(function(idx, item){
		var options = $(item).data('options');
		var settings = $.extend({dir: isRtl() ? 'rtl' : 'ltr'}, options);
		$(item).select2(settings);
	});

	// display modal on top of modal
	$doc.on('show.bs.modal', '.modal', function (event) {
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function () {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});

	$('[data-sticky="sticky"]').each(function(index, item){
		var $this = $(this), options = $this.data('options');
		$this.sticky(options)
	});


	$('#noti_Button').click(function () {
		// TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
		$('#notifications').fadeToggle('fast', 'linear');
		//$('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.
		return false;
	});
	// HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
	$doc.click(function () {
		$('#notifications').hide();
	});
	$('#notifications').click(function () {
		return false;   // DO NOTHING WHEN CONTAINER IS CLICKED.
	});
	// end it


	//// search
	// add class focused to expend search input
	$('.global-search .search_input').on('focus', function () {
		$(this).parent().addClass('focused');
	}).on('blur', function () {
		var $inputVal = $(this).val();
		if (!$inputVal.length || $inputVal == '') {
			$(this).parent().removeClass('focused');
		}
	});


	//// helppers
	function isRtl() {
		return $('html').attr('dir') === 'rtl'
	}

})