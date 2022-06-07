export default class CheckboxGroup {
    /**
     * @param options {{}}
     */
    constructor(options) {
        this.options = {
            ...{
                class: 'checkbox-group',
                firstInit: true
            },
            ...options
        };
        this.init();
    }

    init() {
        document.addEventListener('change', (e) => {
            this.handleChange(e);
        });
        this.firstInit();
    }

    firstInit() {
        if (!this.options.firstInit) {
            return;
        }
        const elements = document.getElementsByClassName(this.options.class);
        if (elements.length === 0) {
            return;
        }
        [].slice.call(elements).forEach(element => this.changeWrapperClass(element));
    }

    /**
     * @param e {Event}
     */
    handleChange(e) {
        if (e.target.classList.contains(this.options.class)) {
            this.change(e.target);
        }
    }

    /**
     * @param input {HTMLInputElement}
     */
    change(input) {
        const groupId = input.getAttribute('data-group-id');
        const groupName = input.getAttribute('data-group-name');

        if (groupId) {
            this.selectAll(groupId, input.checked);
        } else {
            this.checkGroup(groupName);
            this.changeWrapperClass(input);
        }
    }

    /**
     * @param groupName {String}
     * @param status {Boolean}
     */
    selectAll(groupName, status) {
        document.querySelectorAll('input[data-group-name="' + groupName + '"]').forEach((element) => {
            if (element.closest(`[data-checkbox-group-skip='${groupName}']`)) {
                return;
            }
            this.changeStatus(element, status);
            this.changeWrapperClass(element);
        });
        this.triggerChange(document.querySelector('input[data-group-id="' + groupName + '"]'));
    }

    /**
     * @param input {HTMLInputElement}
     */
    changeWrapperClass(input) {
        const groupWrapper = input.getAttribute('data-group-wrapper');
        const groupWrapperClass = input.getAttribute('data-group-wrapper-class');

        if (groupWrapper && input.closest(groupWrapper)) {
            this.toggleClass(input.closest(groupWrapper), groupWrapperClass, input.checked);
        } else {
            this.toggleClass(input.parentElement, groupWrapperClass, input.checked);
        }
    }

    /**
     * @param input {HTMLInputElement}
     * @param status {Boolean}
     */
    changeStatus(input, status) {
        input.checked = status;
        this.triggerChange(input);
    }

    /**
     * @param groupName {String}
     */
    checkGroup(groupName) {
        const elementId = document.querySelector('input[data-group-id="' + groupName + '"]');
        const elements = this.checkGroupSkip(document.querySelectorAll('input[data-group-name="' + groupName + '"]'), groupName);
        const elementsChecked = this.checkGroupSkip(document.querySelectorAll('input:checked[data-group-name="' + groupName + '"]'), groupName);
        this.changeStatus(elementId, elements.length === elementsChecked.length);
    }

    /**
     * @param elements {NodeList}
     * @param groupName {String}
     */
    checkGroupSkip(elements, groupName) {
        return [...elements].filter(element => {
            if (element.closest(`[data-checkbox-group-skip='${groupName}']`)) {
                return;
            }
            return element;
        });
    }

    /**
     * @param element {HTMLElement}
     * @param className {String}
     * @param add {boolean|null}
     */
    toggleClass(element, className = '', add = false) {
        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }

    /**
     * @param input {HTMLInputElement}
     */
    triggerChange(input) {
        // without explorer
        // const event = new Event('change');
        // input.dispatchEvent(event);
        const event = document.createEvent('Event');
        event.initEvent('checkBoxGroup:change', true, true); // can bubble, and is cancellable
        input.dispatchEvent(event);
    }
}
