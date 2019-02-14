# CheckboxGroup

Simple component for a group of input checkbox

## Installation

```npm i js-checkbox-group```

## How to use

Use as import module.

```
import CheckboxGroup from 'js-checkbox-group/dist/CheckboxGroup';

new CheckboxGroup();
```

In HTML page. Paste to HTML page between head tag or befor end tag body.

```
<script src="../dist/CheckboxGroup.js</script>
<script>
    new CheckboxGroup.default();
</script>
```

## Custum Event name

All of the inputs have the custom event on the change. Custom event name is ```checkBoxGroup:change```.

Example how to catch custom event if to change the input

**VanillaJs**
```
document.getElementById('inputID').addEventListener('checkBoxGroup:change', function(event) {
    console.log(event.currentTarget.checked);
})
```
**jQuery**
```
jQuery('body').on('checkBoxGroup:change', '#inputID', function(e) {
    console.log(jQuery(e.currentTarget).prop('checked'));
});
```        

Example: 
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Checkbox group</title>
    <script src="../dist/CheckboxGroups"></script>
    <script>
        new jsCheckboxGroup.default();
    </script>
</head>
<body>

<div>
    <h3><label>Fruits <input type="checkbox" class="checkbox-group" data-group-id="group1" value="1"></label></h3>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group1" value="1">Kiwi</label>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group1" value="1">Jackfruit</label>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group1" value="1">Mango</label>
</div>
<div>
    <h3><label>Animals <input type="checkbox" class="checkbox-group" data-group-id="group2" value="1"></label></h3>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group2" value="1">Tiger</label>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group2" value="1" >Sloth</label>
    <label>
        <input type="checkbox" class="checkbox-group" data-group-name="group2" value="1">Cheetah</label>
</div>

</body>
</html>
```