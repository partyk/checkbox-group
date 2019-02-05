export default class CheckboxGroup {
    constructor(options) {
        this.options = {
            ...{
                class: 'checkbox-group'
            },
            ...options
        };
        this.init();
    }
    init() {
        document.addEventListener('change', (e) => {
            this.handleChange(e);
        });
    }
    handleChange(e) {
        if (e.target.classList.contains(this.options.class)) {
            this.change(e.target);
        }
    }
    change(input) {
        const groupId = input.getAttribute('data-group-id');
        const groupName = input.getAttribute('data-group-name');

        if (groupId) {
            this.selectAll(groupId, input.checked);
        } else {
            this.checkGroup(groupName);
        }
    }
    selectAll(groupName, status) {
        document.querySelectorAll('input[data-group-name="' + groupName + '"]').forEach((e) => {
            this.changeStatus(e, status);
        });
    }
    changeStatus(input, status) {
        input.checked = status;
    }
    checkGroup(groupName) {
        const elementId = document.querySelector('input[data-group-id="' + groupName + '"]');
        const elements = document.querySelectorAll('input[data-group-name="' + groupName + '"]');
        const elementsChecked = document.querySelectorAll('input:checked[data-group-name="' + groupName + '"]');
        this.changeStatus(elementId, elements.length === elementsChecked.length);
    }
}