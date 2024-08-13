export const selectTodos = ({ todos }) => todos;

export const selectSearcPhrase = ({ options }) => options.SearchPhrase;

export const selectIsAbcSorting = ({ options }) => options.isAbcSorting;

export const selectSearchInput = ({ options }) => options.searchInput;

export const selectIsLoading = ({ options }) => options.isLoading;

export const selectEditingTodoId = ({ editingTodo }) => editingTodo.id;

export const selectEditingTodoTitle = ({ editingTodo }) => editingTodo.title;
