class CheckboxGroup {
    constructor(options) {
        this.options = {
            ...{
                class: 'checkbox-group'
            },
            ...options
        }
        this.init();
    }
    init() {
        console.log('jedu');
        document.addEventListener('change', (e) => {
            console.log('change');
            this.handleChange(e);
        });
    }
    handleChange(e) {
        console.log(e);
        if (e.target.classList.contains(this.options.class)) {
            this.changeInput(e.target);
        }
    }
    changeInput(input) {
        const groupId = input.getAttribute('data-group-id');
        const groupName = input.getAttribute('data-group-name');
        const status = input.checked;
        console.log(status);
        if (groupId) {
            this.selectAll(groupId, status);
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
}

let checkboxGroup = new CheckboxGroup();