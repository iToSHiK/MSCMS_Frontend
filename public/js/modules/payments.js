/**
 * Resend command
 * @param commandHistoryId - commandHistory Id
 */
function reSendCommand(commandHistoryId) {
    return $.ajax({
        type: "POST",
        url: `/api/admin/payments/resend/${commandHistoryId}`,
    });
}

/**
 * Delivery items
 * @param paymentId - payment id
 */
function deliveryItems(paymentId) {
    return $.ajax({
        type: "POST",
        url: `/api/admin/payments/${paymentId}/delivery`,
    });
}

/**
 * Delete payment
 * @param id - payment id
 */
function deletePayment(id) {
    return $.ajax({
        type: "DELETE",
        url: `/api/admin/payments/${id}`
    });
}

/**
 * Add note to the payment
 * @param id - payment id
 * @param note - note text
 */
function addPaymentNote(id, note) {
    return $.ajax({
        type: "POST",
        url: `/api/admin/payments/${id}/note`,
        data: {note: note}
    });
}

/**
 * Enable Collecting Details for the payments during checkout
 * @param Request $r
 * @return JsonResponse
 */
function updateIsDetailsEnabledSetting(value) {
    $.ajax({
        type: "PATCH",
        url: "/api/admin/payments/enabledUpdate",
        data: { isDetailsEnabled: value },
        success: function() {
            toastr.success("Changes are Successfully Saved!");
        },
        error: function() {
            toastr.error("Unable to Save Changes!");
        }
    });
}
