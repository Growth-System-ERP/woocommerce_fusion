frappe.listview_settings["WooCommerce Order"] = {
    onload: function (listview) {
        listview.page.add_action_item(__("Sync Order with GrowthSystem"), () => {
            var selectedOrders = listview.get_checked_items();
            var orderNames = selectedOrders.map(order => order.name);
            
            frappe.call({
                method: "woocommerce_fusion.tasks.sync_sales_orders.run_so_sync",
                args: {
                    woocommerce_order_names: orderNames,
                },
                callback: function(r) {
                    console.log(r);  // Check if the response is correct
                    if (r.message) {
                        listview.refresh();
                        frappe.dom.unfreeze();
                        frappe.show_alert({
                            message: __('Sync completed Successfully'),
                            indicator: 'green',
                        }, 5);
                        // Comment out this line to test if it affects the alert visibility
                        // frm.reload_doc(); 
                    } else {
                        frappe.show_alert({
                            message: __('Sync failed'),
                            indicator: 'red',
                        }, 5);
                    }
                }
            });
        });
    },
};
