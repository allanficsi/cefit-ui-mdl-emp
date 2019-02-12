(function(namespace, $) {
	"use strict";

	var AppVendor = function() {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function() {
			o.initialize();
		});

	};
	var p = AppVendor.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function(parentSelector) {
		this._initScroller(parentSelector);
		this._initTabs(parentSelector);
		this._initTooltips(parentSelector);
		this._initPopover(parentSelector);
		this._initSortables(parentSelector);
	};

	// =========================================================================
	// SCROLLER
	// =========================================================================

	p._initScroller = function (parentSelector) {
		if (!$.isFunction($.fn.nanoScroller)) {
			return;
		}

		$.each($(parentSelector + ' .scroll'), function (e) {
			var holder = $(this);
			materialadmin.AppVendor.addScroller(holder);
		});

		materialadmin.App.callOnResize(function () {
			$.each($('.scroll-xs'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (materialadmin.App.minBreakpoint('xs')) {
					materialadmin.AppVendor.removeScroller(holder);
				}
				else {
					materialadmin.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-sm'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (materialadmin.App.minBreakpoint('sm')) {
					materialadmin.AppVendor.removeScroller(holder);
				}
				else {
					materialadmin.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-md'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (materialadmin.App.minBreakpoint('md')) {
					materialadmin.AppVendor.removeScroller(holder);
				}
				else {
					materialadmin.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-lg'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (materialadmin.App.minBreakpoint('lg')) {
					materialadmin.AppVendor.removeScroller(holder);
				}
				else {
					materialadmin.AppVendor.addScroller(holder);
				}
			});
		});
	};

	p.addScroller = function (holder) {
		holder.wrap('<div class="nano"><div class="nano-content"></div></div>');

		var scroller = holder.closest('.nano');
		scroller.css({height: holder.outerHeight()});
		scroller.nanoScroller();

		holder.css({height: 'auto'});
	};

	p.removeScroller = function (holder) {
		if (holder.parent().parent().hasClass('nano') === false) {
			return;
		}

		holder.parent().parent().nanoScroller({destroy: true});

		holder.parent('.nano-content').replaceWith(holder);
		holder.parent('.nano').replaceWith(holder);
		holder.attr('style', '');
	};
	
	// =========================================================================
	// SORTABLE
	// =========================================================================

	p._initSortables = function (parentSelector) {
		if (!$.isFunction($.fn.sortable)) {
			return;
		}

		$(parentSelector + ' [data-sortable="true"]').sortable({
			placeholder: "ui-state-highlight",
			delay: 100,
			start: function (e, ui) {
				ui.placeholder.height(ui.item.outerHeight() - 1);
			}
		});

	};
	
	// =========================================================================
	// TABS
	// =========================================================================

	p._initTabs = function (parentSelector) {
		if (!$.isFunction($.fn.tab)) {
			return;
		}
		$(parentSelector + ' [data-toggle="tabs"] a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	};
	
	// =========================================================================
	// TOOLTIPS
	// =========================================================================

	p._initTooltips = function (parentSelector) {
		if (!$.isFunction($.fn.tooltip)) {
			return;
		}
		$(parentSelector + ' [data-toggle="tooltip"]').tooltip({container: 'body'});
	};

	// =========================================================================
	// POPOVER
	// =========================================================================

	p._initPopover = function (parentSelector) {
		if (!$.isFunction($.fn.popover)) {
			return;
		}
		$(parentSelector + ' [data-toggle="popover"]').popover({container: 'body'});
	};
	
	// =========================================================================
	// DEFINE NAMESPACE
	// =========================================================================

	window.materialadmin.AppVendor = new AppVendor;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
