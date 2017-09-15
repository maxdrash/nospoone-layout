const template = $('.js-template').clone().detach();
const itemsReplicant = nodecg.Replicant('todo-items', {defaultValue: []});

$('.js-add').on('click', e => {
	if (document.querySelector('.js-input').value !== undefined) {
		itemsReplicant.value.push({
			text: document.querySelector('.js-input').value,
			checked: false
		});
		document.querySelector('.js-input').value = undefined;
		document.querySelector('.js-input').commit();
		render();
	}
});

itemsReplicant.on('change', () => {
	$('.js-rendered').remove();
	if (itemsReplicant.value.length > 0) {
		$('.js-no-items').hide();
		itemsReplicant.value.forEach((item, index) => {
			const itemTemplate = template.clone().removeClass('list__list-item--template js-list-item-template').addClass('js-rendered');
			itemTemplate.find('.js-label').text(item.text);
			itemTemplate.find('.js-delete').on('click', e => {
				e.preventDefault();
				e.stopPropagation();
				removeItem(item);
			});
			itemTemplate.find('.js-checkbox').on('click', e => {
				e.preventDefault();
				e.stopPropagation();
				toggleChecked(index);
			});
			itemTemplate.find('.js-checkbox')[0].checked = item.checked;
			itemTemplate.find('.js-label').addClass(item.checked ? 'list__list-item__label--checked' : '');
			$('.js-list').append(itemTemplate);
		});
	} else {
		$('.js-no-items').show();
	}
});

function toggleChecked(index) {
	itemsReplicant.value[index].checked = !itemsReplicant.value[index].checked;
}

function removeItem(itemToRemove) {
	itemsReplicant.value = itemsReplicant.value.filter(item => item !== itemToRemove);
}
