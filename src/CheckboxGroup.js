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
        this.triggerChange(document.querySelector('input[data-group-id="' + groupName + '"]'));
    }
    changeStatus(input, status) {
        input.checked = status;
        this.triggerChange(input);
    }
    checkGroup(groupName) {
        const elementId = document.querySelector('input[data-group-id="' + groupName + '"]');
        const elements = document.querySelectorAll('input[data-group-name="' + groupName + '"]');
        const elementsChecked = document.querySelectorAll('input:checked[data-group-name="' + groupName + '"]');
        this.changeStatus(elementId, elements.length === elementsChecked.length);
    }
    triggerChange(input) {
        // without explorer
        // const event = new Event('change');
        // input.dispatchEvent(event);

        const event = document.createEvent('Event');
        event.initEvent('checkBoxGroup:change', true, true); // can bubble, and is cancellable
        input.dispatchEvent(event);
    }
}