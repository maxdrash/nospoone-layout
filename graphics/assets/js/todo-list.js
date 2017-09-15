const tasks = nodecg.Replicant('todo-items');

tasks.on('change', data => {
	$('.js-list').empty();
	data.forEach(todo => {
		$(`<li class="container__list__item">${todo.text}</li>`).appendTo('.js-list').addClass(todo.checked ? 'container__list__item--checked' : '');
	});
});
