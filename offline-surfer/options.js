function saveOption(field, val){
	var store = true;

	if(field == "auto-retry-interval"){
		if(Number.isInteger(val)){
			val = Math.min(Math.max(val, 500), 180000);
		}else{
			store = false;
		}
	}else{
		store = false;
	}

	if(store){
		browser.storage.sync.set({
			field: val
		});
		console.log("Saved setting "+field+"="+val);
	}
}

$(document).on("click", ".panel [data-submit]", function(){
	var settings_panel = $(this).closest(".content");

	settings_panel.children(".field").each(function(){
		var field_label = $(this).data("field");
		var field_input = $(this).find("input");
		var field_value = field_input.val();

		if(field_input.attr("type") == "number"){
			field_value = parseInt(field_value);
		}

		saveOption(field_label, field_value);
	});
});
