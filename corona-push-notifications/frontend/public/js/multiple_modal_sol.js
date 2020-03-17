/*
 * Raj: This file is responsible to display the modals in a stacked fashion. Example:
 * 1. User displays modal A
 * 2. User now wants to display modal B -> This will not work by default if a modal is already displayed
 * 3. User dismisses modal B
 * 4. Modal A should now be displayed automatically -> This does not happen all by itself 
 * 
 * Trying to solve problem for: http://stackoverflow.com/questions/18253972/bootstrap-modal-close-current-open-new
 * 
 */

var StackedModalNamespace = StackedModalNamespace || (function() {
  var _modalObjectsStack = [];
  return {
    modalStack: function() {
      return _modalObjectsStack;
    },
    currentTop: function() {
      var topModal = null;
      if (StackedModalNamespace.modalStack().length) {
        topModal = StackedModalNamespace.modalStack()[StackedModalNamespace.modalStack().length - 1];
      }
      return topModal;
    }
  };
}());

// http://stackoverflow.com/a/13992290/260665 difference between $.fn.extend and $.extend
jQuery.fn.extend({
  // https://api.jquery.com/jquery.fn.extend/
  showStackedModal: function() {
    var topModal = StackedModalNamespace.currentTop();
    StackedModalNamespace.modalStack().push(this);
    this.off('hidden.bs.modal').on('hidden.bs.modal', function() { // Subscription to the hide event
      var currentTop = StackedModalNamespace.currentTop();
      if ($(this).is(currentTop)) {
        // 4. Unwinding - If user has dismissed the top most modal we need to remove it form the stack and display the now new top modal (which happens in point 3 below)
        StackedModalNamespace.modalStack().pop();
      }
      var newTop = StackedModalNamespace.currentTop();
      if (newTop) {
        // 3. Display the new top modal (since the existing modal would have been hidden by point 2 now)
        newTop.modal('show');
      }
    });
    if (topModal) {
      // 2. If some modal is displayed, lets hide it
      topModal.modal('hide');
    } else {
      // 1. If no modal is displayed, just display the modal
      this.modal('show');
    }
  },
});


// Custom code:
$(".button1Click").on('click', function() {
  $("#Signup").showStackedModal();
});
$(".button2Click").on('click', function() {
  $("#Login").showStackedModal();
});
$(".button3Click").on('click', function() {
  $("#modal3").showStackedModal();
});
