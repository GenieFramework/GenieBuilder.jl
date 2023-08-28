
    const customblock_quasar_separator = editor => {
        editor.DomComponents.addType("separator", {
            isComponent: el => {
                if (el.tagName == 'Q-SEPARATOR') {
                    return { type: 'separator' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "spaced",
        "name": ":spaced",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "If set to true, the corresponding direction margins will be set to 8px; It can also be set to a size in CSS units, including unit name, or one of the xs|sm|md|lg|xl predefined sizes",
        "category": "content",
        "examples": [
            "12px",
            "sm",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "inset",
        "name": ":inset",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "If set to Boolean true, the left and right margins will be set to 16px. If set to 'item' then it will match a QItem's design. If set to 'item-thumbnail' then it will match the design of a QItem with a thumbnail on the left side",
        "category": "content",
        "examples": [
            "item",
            "item-thumbnail"
        ],
        "enabled": true
    },
    {
        "label": "vertical",
        "name": ":vertical",
        "type": "Boolean",
        "desc": "If set to true, the separator will be vertical.",
        "category": "content",
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name",
        "category": "style",
        "examples": [
            "16px",
            "2rem"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('separator', { label: 'Separator', content: '<q-separator />', media: '<img src="images/icons/components/ui_components/separator.png" class="blockIcon" />', category: 'Content' });
    }    

    
    const customblock_quasar_space = editor => {
        editor.DomComponents.addType("space", {
            isComponent: el => {
                if (el.tagName == 'Q-SPACE') {
                    return { type: 'space' }
                }
            },
            model: {
                defaults: {
                    traits: [],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('space', { label: 'Space', content: '<q-space />', media: '<img src="images/icons/components/ui_components/space.png" class="blockIcon" />', category: 'Content' });
    }    

    
    const customblock_quasar_toolbar = editor => {
        editor.DomComponents.addType("toolbar", {
            isComponent: el => {
                if (el.tagName == 'Q-TOOLBAR') {
                    return { type: 'toolbar' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "inset",
        "name": ":inset",
        "type": "Boolean",
        "desc": "Apply an inset to content (useful for subsequent toolbars)",
        "category": "content",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('toolbar', { label: 'Toolbar', content: '<q-toolbar />', media: '<img src="images/icons/components/ui_components/toolbar.png" class="blockIcon" />', category: 'Content' });
    }    

    
    const customblock_quasar_input = editor => {
        editor.DomComponents.addType("input", {
            isComponent: el => {
                if (el.tagName == 'Q-INPUT') {
                    return { type: 'input' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists",
        "category": "behavior",
        "examples": [
            "car_id",
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "mask",
        "name": ":mask",
        "type": "String",
        "desc": "Custom mask or one of the predefined mask names",
        "category": "behavior",
        "examples": [
            "###-##",
            "date",
            "datetime",
            "time",
            "fulltime",
            "phone",
            "card"
        ],
        "enabled": true
    },
    {
        "label": "fill-mask",
        "name": ":fill-mask",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "Fills string with specified characters (or underscore if value is not string) to fill mask's length",
        "category": "behavior",
        "examples": [
            "true",
            "'0'",
            "'_'"
        ],
        "enabled": true
    },
    {
        "label": "reverse-fill-mask",
        "name": ":reverse-fill-mask",
        "type": "Boolean",
        "desc": "Fills string from the right side of the mask",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "unmasked-value",
        "name": ":unmasked-value",
        "type": "Boolean",
        "desc": "Model will be unmasked (won't contain tokens/separation characters)",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "String",
            "Number",
            "null",
            "undefined"
        ],
        "desc": "Model of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"myText\""
        ],
        "enabled": true
    },
    {
        "label": "error",
        "name": ":error",
        "type": "Boolean",
        "desc": "Does field have validation errors?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "error-message",
        "name": ":error-message",
        "type": "String",
        "desc": "Validation error message (gets displayed only if 'error' is set to 'true')",
        "category": "content",
        "examples": [
            "Username must have at least 5 characters"
        ],
        "enabled": true
    },
    {
        "label": "no-error-icon",
        "name": ":no-error-icon",
        "type": "Boolean",
        "desc": "Hide error icon when there is an error",
        "category": "content",
        "enabled": true
    },
    {
        "label": "rules",
        "name": ":rules",
        "type": "Array",
        "desc": "Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules",
        "category": "behavior",
        "examples": [
            ":rules=\"[ val => val.length <= 3 || 'Please use maximum 3 characters' ]\"",
            ":rules=\"[ 'fulltime' ]\""
        ],
        "enabled": true
    },
    {
        "label": "reactive-rules",
        "name": ":reactive-rules",
        "type": "Boolean",
        "desc": "By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "lazy-rules",
        "name": ":lazy-rules",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "A text label that will “float” up above the input field, once the field gets focus",
        "category": "content",
        "examples": [
            "Username"
        ],
        "enabled": true
    },
    {
        "label": "stack-label",
        "name": ":stack-label",
        "type": "Boolean",
        "desc": "Label will be always shown above the field regardless of field content (if any)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hint",
        "name": ":hint",
        "type": "String",
        "desc": "Helper (hint) text which gets placed below your wrapped form component",
        "category": "content",
        "examples": [
            "Fill in between 3 and 12 characters"
        ],
        "enabled": true
    },
    {
        "label": "hide-hint",
        "name": ":hide-hint",
        "type": "Boolean",
        "desc": "Hide the helper (hint) text when field doesn't have focus",
        "category": "content",
        "enabled": true
    },
    {
        "label": "prefix",
        "name": ":prefix",
        "type": "String",
        "desc": "Prefix",
        "category": "content",
        "examples": [
            "$"
        ],
        "enabled": true
    },
    {
        "label": "suffix",
        "name": ":suffix",
        "type": "String",
        "desc": "Suffix",
        "category": "content",
        "examples": [
            "@gmail.com"
        ],
        "enabled": true
    },
    {
        "label": "label-color",
        "name": ":label-color",
        "type": "String",
        "desc": "Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "bg-color",
        "name": ":bg-color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "Boolean",
        "desc": "Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "clearable",
        "name": ":clearable",
        "type": "Boolean",
        "desc": "Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "clear-icon",
        "name": ":clear-icon",
        "type": "String",
        "desc": "Custom icon to use for the clear button when using along with 'clearable' prop",
        "category": "content",
        "examples": [
            "close"
        ],
        "enabled": true
    },
    {
        "label": "filled",
        "name": ":filled",
        "type": "Boolean",
        "desc": "Use 'filled' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "outlined",
        "name": ":outlined",
        "type": "Boolean",
        "desc": "Use 'outlined' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "borderless",
        "name": ":borderless",
        "type": "Boolean",
        "desc": "Use 'borderless' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "standout",
        "name": ":standout",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)",
        "category": "style",
        "examples": [
            "standout",
            "standout=\"bg-primary text-white\""
        ],
        "enabled": true
    },
    {
        "label": "label-slot",
        "name": ":label-slot",
        "type": "Boolean",
        "desc": "Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set",
        "category": "content",
        "enabled": true
    },
    {
        "label": "bottom-slots",
        "name": ":bottom-slots",
        "type": "Boolean",
        "desc": "Enables bottom slots ('error', 'hint', 'counter')",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-bottom-space",
        "name": ":hide-bottom-space",
        "type": "Boolean",
        "desc": "Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content",
        "category": "style",
        "enabled": true
    },
    {
        "label": "counter",
        "name": ":counter",
        "type": "Boolean",
        "desc": "Show an automatic counter on bottom right",
        "category": "content",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Applies a small standard border-radius for a squared shape of the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Remove border-radius so borders are squared; Overrides 'rounded' prop",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "item-aligned",
        "name": ":item-aligned",
        "type": "Boolean",
        "desc": "Match inner content alignment to that of QItem",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "autofocus",
        "name": ":autofocus",
        "type": "Boolean",
        "desc": "Focus field on initial component render",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "for",
        "name": ":for",
        "type": "String",
        "desc": "Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well",
        "category": "behavior",
        "examples": [
            "myFieldsId"
        ],
        "enabled": true
    },
    {
        "label": "shadow-text",
        "name": ":shadow-text",
        "type": "String",
        "desc": "Text to be displayed as shadow at the end of the text in the control; Does NOT applies to type=file",
        "category": "content",
        "examples": [
            "rest of the fill value"
        ],
        "enabled": true
    },
    {
        "label": "type",
        "name": ":type",
        "type": "String",
        "desc": "Input type",
        "category": "general",
        "examples": [
            "password"
        ],
        "enabled": true
    },
    {
        "label": "debounce",
        "name": ":debounce",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Debounce amount (in milliseconds) when updating model",
        "category": "model",
        "examples": [
            "0",
            "530"
        ],
        "enabled": true
    },
    {
        "label": "maxlength",
        "name": ":maxlength",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Specify a max length of model",
        "category": "model",
        "examples": [
            "12"
        ],
        "enabled": true
    },
    {
        "label": "autogrow",
        "name": ":autogrow",
        "type": "Boolean",
        "desc": "Make field autogrow along with its content (uses a textarea)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "input-class",
        "name": ":input-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Class definitions to be attributed to the underlying input tag",
        "category": "style",
        "examples": [
            "my-special-class",
            ":input-class=\"{ 'my-special-class': <condition> }\""
        ],
        "enabled": true
    },
    {
        "label": "input-style",
        "name": ":input-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Style definitions to be attributed to the underlying input tag",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":input-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('input', { label: 'Text', content: '<q-input />', media: '<img src="images/icons/components/ui_components/input_text_field.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_button = editor => {
        editor.DomComponents.addType("button", {
            isComponent: el => {
                if (el.tagName == 'Q-BTN') {
                    return { type: 'button' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "type",
        "name": ":type",
        "type": "String",
        "desc": "1) Define the button native type attribute (submit, reset, button) or 2) render component with <a> tag so you can access events even if disable or 3) Use 'href' prop and specify 'type' as a media tag",
        "category": "general",
        "examples": [
            "a",
            "submit",
            "button",
            "reset",
            "image/png",
            "href=\"https://quasar.dev\" target=\"_blank\""
        ],
        "enabled": true
    },
    {
        "label": "to",
        "name": ":to",
        "type": [
            "String",
            "Object"
        ],
        "desc": "Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "/home/dashboard",
            ":to=\"{ name: 'my-route-name' }\""
        ],
        "enabled": true
    },
    {
        "label": "replace",
        "name": ":replace",
        "type": "Boolean",
        "desc": "Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "enabled": true
    },
    {
        "label": "href",
        "name": ":href",
        "type": "String",
        "desc": "Native <a> link href attribute; Has priority over the 'to' and 'replace' props",
        "category": "navigation",
        "examples": [
            "https://quasar.dev",
            "href=\"https://quasar.dev\" target=\"_blank\""
        ],
        "enabled": true
    },
    {
        "label": "target",
        "name": ":target",
        "type": "String",
        "desc": "Native <a> link target attribute; Use it only with 'to' or 'href' props",
        "category": "navigation",
        "examples": [
            "_blank",
            "_self",
            "_parent",
            "_top"
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": [
            "String",
            "Number"
        ],
        "desc": "The text that will be shown on the button",
        "category": "content",
        "examples": [
            "Button Label"
        ],
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-right",
        "name": ":icon-right",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "outline",
        "name": ":outline",
        "type": "Boolean",
        "desc": "Use 'outline' design",
        "category": "style",
        "enabled": true
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "Boolean",
        "desc": "Use 'flat' design",
        "category": "style",
        "enabled": true
    },
    {
        "label": "unelevated",
        "name": ":unelevated",
        "type": "Boolean",
        "desc": "Remove shadow",
        "category": "style",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Applies a more prominent border-radius for a squared shape button",
        "category": "style",
        "enabled": true
    },
    {
        "label": "push",
        "name": ":push",
        "type": "Boolean",
        "desc": "Use 'push' design",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "glossy",
        "name": ":glossy",
        "type": "Boolean",
        "desc": "Applies a glossy effect",
        "category": "style",
        "enabled": true
    },
    {
        "label": "fab",
        "name": ":fab",
        "type": "Boolean",
        "desc": "Makes button size and shape to fit a Floating Action Button",
        "category": "style",
        "enabled": true
    },
    {
        "label": "fab-mini",
        "name": ":fab-mini",
        "type": "Boolean",
        "desc": "Makes button size and shape to fit a small Floating Action Button",
        "category": "style",
        "enabled": true
    },
    {
        "label": "padding",
        "name": ":padding",
        "type": "String",
        "desc": "Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set",
        "category": "style",
        "examples": [
            "16px",
            "10px 5px",
            "2rem",
            "xs",
            "md lg",
            "2px 2px 5px 7px"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "no-caps",
        "name": ":no-caps",
        "type": "Boolean",
        "desc": "Avoid turning label text into caps (which happens by default)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "no-wrap",
        "name": ":no-wrap",
        "type": "Boolean",
        "desc": "Avoid label text wrapping",
        "category": "content",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "ripple",
        "name": ":ripple",
        "type": [
            "Boolean",
            "Object"
        ],
        "desc": "Configure material ripple (disable it by setting it to 'false' or supply a config object)",
        "category": "style",
        "examples": [
            false,
            "{ early: true, center: true, color: 'teal', keyCodes: [] }"
        ],
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "align",
        "name": ":align",
        "type": "String",
        "desc": "Label or content alignment",
        "category": "content",
        "enabled": true
    },
    {
        "label": "stack",
        "name": ":stack",
        "type": "Boolean",
        "desc": "Stack icon and label vertically instead of on same line (like it is by default)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "stretch",
        "name": ":stretch",
        "type": "Boolean",
        "desc": "When used on flexbox parent, button will stretch to parent's height",
        "category": "content",
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "Boolean",
        "desc": "Put button into loading state (displays a QSpinner -- can be overridden by using a 'loading' slot)",
        "category": "behavior|state",
        "enabled": true
    },
    {
        "label": "On Click",
        "name": "v-on:click",
        "type": "String",
        "desc": "Run this code when the component is clicked",
        "category": "events",
		"examples": [
			"button = !button"
		],
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "round",
        "name": ":round",
        "type": "Boolean",
        "desc": "Makes a circle shaped button",
        "category": "style",
        "enabled": true
    },
    {
        "label": "percentage",
        "name": ":percentage",
        "type": "Number",
        "desc": "Percentage (0.0 < x < 100.0); To be used along 'loading' prop; Display a progress bar on the background",
        "category": "behavior",
        "examples": [
            23
        ],
        "enabled": true
    },
    {
        "label": "dark-percentage",
        "name": ":dark-percentage",
        "type": "Boolean",
        "desc": "Progress bar on the background should have dark color; To be used along with 'percentage' and 'loading' props",
        "category": "behavior",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('button', { label: 'Button', content: '<q-btn />', media: '<img src="images/icons/components/ui_components/button.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_button_group = editor => {
        editor.DomComponents.addType("button_group", {
            isComponent: el => {
                if (el.tagName == 'Q-BTN-GROUP') {
                    return { type: 'button_group' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('button_group', { label: 'Button Group', content: '<q-btn-group />', media: '<img src="images/icons/components/ui_components/button-group.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_button_dropdown = editor => {
        editor.DomComponents.addType("button_dropdown", {
            isComponent: el => {
                if (el.tagName == 'Q-BTN-DROPDOWN') {
                    return { type: 'button_dropdown' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('button_dropdown', { label: 'Button Dropdown', content: '<q-btn-dropdown />', media: '<img src="images/icons/components/ui_components/button-dropdown.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_select = editor => {
        editor.DomComponents.addType("select", {
            isComponent: el => {
                if (el.tagName == 'Q-SELECT') {
                    return { type: 'select' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists",
        "category": "behavior",
        "examples": [
            "car_id",
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-horizontal",
        "name": ":virtual-scroll-horizontal",
        "type": "Boolean",
        "desc": "Make virtual list work in horizontal mode",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-size",
        "name": ":virtual-scroll-slice-size",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Minimum number of items to render in the virtual list",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-size=\"60\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-ratio-before",
        "name": ":virtual-scroll-slice-ratio-before",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Ratio of number of items in visible zone to render before it",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-ratio-before=\"0.3\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-ratio-after",
        "name": ":virtual-scroll-slice-ratio-after",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Ratio of number of items in visible zone to render after it",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-ratio-after=\"2\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-item-size",
        "name": ":virtual-scroll-item-size",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Default size in pixels (height if vertical, width if horizontal) of an item; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-item-size=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-sticky-size-start",
        "name": ":virtual-scroll-sticky-size-start",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-sticky-size-start=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-sticky-size-end",
        "name": ":virtual-scroll-sticky-size-end",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-sticky-size-end=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "table-colspan",
        "name": ":table-colspan",
        "type": [
            "Number",
            "String"
        ],
        "desc": "The number of columns in the table (you need this if you use table-layout: fixed)",
        "category": "virtual-scroll|content",
        "examples": [
            "table-colspan=\"12\""
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Any",
        "desc": "Model of the component; Must be Array if using 'multiple' prop; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"myModel\""
        ],
        "enabled": true
    },
    {
        "label": "error",
        "name": ":error",
        "type": "Boolean",
        "desc": "Does field have validation errors?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "error-message",
        "name": ":error-message",
        "type": "String",
        "desc": "Validation error message (gets displayed only if 'error' is set to 'true')",
        "category": "content",
        "examples": [
            "Username must have at least 5 characters"
        ],
        "enabled": true
    },
    {
        "label": "no-error-icon",
        "name": ":no-error-icon",
        "type": "Boolean",
        "desc": "Hide error icon when there is an error",
        "category": "content",
        "enabled": true
    },
    {
        "label": "rules",
        "name": ":rules",
        "type": "Array",
        "desc": "Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules",
        "category": "behavior",
        "examples": [
            ":rules=\"[ val => val.length <= 3 || 'Please use maximum 3 characters' ]\"",
            ":rules=\"[ 'fulltime' ]\""
        ],
        "enabled": true
    },
    {
        "label": "reactive-rules",
        "name": ":reactive-rules",
        "type": "Boolean",
        "desc": "By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "lazy-rules",
        "name": ":lazy-rules",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "A text label that will “float” up above the input field, once the field gets focus",
        "category": "content",
        "examples": [
            "Username"
        ],
        "enabled": true
    },
    {
        "label": "stack-label",
        "name": ":stack-label",
        "type": "Boolean",
        "desc": "Label will be always shown above the field regardless of field content (if any)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hint",
        "name": ":hint",
        "type": "String",
        "desc": "Helper (hint) text which gets placed below your wrapped form component",
        "category": "content",
        "examples": [
            "Fill in between 3 and 12 characters"
        ],
        "enabled": true
    },
    {
        "label": "hide-hint",
        "name": ":hide-hint",
        "type": "Boolean",
        "desc": "Hide the helper (hint) text when field doesn't have focus",
        "category": "content",
        "enabled": true
    },
    {
        "label": "prefix",
        "name": ":prefix",
        "type": "String",
        "desc": "Prefix",
        "category": "content",
        "examples": [
            "$"
        ],
        "enabled": true
    },
    {
        "label": "suffix",
        "name": ":suffix",
        "type": "String",
        "desc": "Suffix",
        "category": "content",
        "examples": [
            "@gmail.com"
        ],
        "enabled": true
    },
    {
        "label": "label-color",
        "name": ":label-color",
        "type": "String",
        "desc": "Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "bg-color",
        "name": ":bg-color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "Boolean",
        "desc": "Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "clearable",
        "name": ":clearable",
        "type": "Boolean",
        "desc": "Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "clear-icon",
        "name": ":clear-icon",
        "type": "String",
        "desc": "Custom icon to use for the clear button when using along with 'clearable' prop",
        "category": "content",
        "examples": [
            "close"
        ],
        "enabled": true
    },
    {
        "label": "filled",
        "name": ":filled",
        "type": "Boolean",
        "desc": "Use 'filled' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "outlined",
        "name": ":outlined",
        "type": "Boolean",
        "desc": "Use 'outlined' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "borderless",
        "name": ":borderless",
        "type": "Boolean",
        "desc": "Use 'borderless' design for the field",
        "category": "style",
        "enabled": true
    },
    {
        "label": "standout",
        "name": ":standout",
        "type": [
            "Boolean",
            "String"
        ],
        "desc": "Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)",
        "category": "style",
        "examples": [
            "standout",
            "standout=\"bg-primary text-white\""
        ],
        "enabled": true
    },
    {
        "label": "label-slot",
        "name": ":label-slot",
        "type": "Boolean",
        "desc": "Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set",
        "category": "content",
        "enabled": true
    },
    {
        "label": "bottom-slots",
        "name": ":bottom-slots",
        "type": "Boolean",
        "desc": "Enables bottom slots ('error', 'hint', 'counter')",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-bottom-space",
        "name": ":hide-bottom-space",
        "type": "Boolean",
        "desc": "Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content",
        "category": "style",
        "enabled": true
    },
    {
        "label": "counter",
        "name": ":counter",
        "type": "Boolean",
        "desc": "Show an automatic counter on bottom right",
        "category": "content",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Applies a small standard border-radius for a squared shape of the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Remove border-radius so borders are squared; Overrides 'rounded' prop",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "item-aligned",
        "name": ":item-aligned",
        "type": "Boolean",
        "desc": "Match inner content alignment to that of QItem",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "autofocus",
        "name": ":autofocus",
        "type": "Boolean",
        "desc": "Focus field on initial component render",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "for",
        "name": ":for",
        "type": "String",
        "desc": "Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well",
        "category": "behavior",
        "examples": [
            "myFieldsId"
        ],
        "enabled": true
    },
    {
        "label": "multiple",
        "name": ":multiple",
        "type": "Boolean",
        "desc": "Allow multiple selection; Model must be Array",
        "category": "model|selection",
        "enabled": true
    },
    {
        "label": "display-value",
        "name": ":display-value",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Override default selection string, if not using 'selected' slot/scoped slot and if not using 'use-chips' prop",
        "category": "selection",
        "examples": [
            "Options: x, y, z"
        ],
        "enabled": true
    },
    {
        "label": "display-value-html",
        "name": ":display-value-html",
        "type": "Boolean",
        "desc": "Force render the selected option(s) as HTML; This can lead to XSS attacks so make sure that you sanitize the content; Does NOT apply when using 'selected' or 'selected-item' slots!",
        "category": "selection",
        "enabled": true
    },
    {
        "label": "options",
        "name": ":options",
        "type": "Array",
        "desc": "Available options that the user can select from. For best performance freeze the list of options.",
        "category": "options",
        "examples": [
            ":options=\"[ 'BMW', 'Samsung Phone' ]\"",
            ":options=\"[ { label: 'BMW', value: 'car' }, { label: 'Samsung Phone', value: 'phone' } ]\""
        ],
        "enabled": true
    },
    {
        "label": "option-value",
        "name": ":option-value",
        "type": [
            "Function",
            "String"
        ],
        "desc": "Property of option which holds the 'value'; If using a function then for best performance, reference it from your scope and do not define it inline",
        "category": "options",
        "examples": [
            "option-value=\"modelNumber\"",
            ":option-value=\"(item) => item === null ? null : item.modelNumber\""
        ],
        "enabled": true
    },
    {
        "label": "option-label",
        "name": ":option-label",
        "type": [
            "Function",
            "String"
        ],
        "desc": "Property of option which holds the 'label'; If using a function then for best performance, reference it from your scope and do not define it inline",
        "category": "options",
        "examples": [
            "option-label=\"itemName\"",
            ":option-label=\"(item) => item === null ? 'Null value' : item.itemName\""
        ],
        "enabled": true
    },
    {
        "label": "option-disable",
        "name": ":option-disable",
        "type": [
            "Function",
            "String"
        ],
        "desc": "Property of option which tells it's disabled; The value of the property must be a Boolean; If using a function then for best performance, reference it from your scope and do not define it inline",
        "category": "options",
        "examples": [
            "option-disable=\"cannotSelect\"",
            ":option-disable=\"(item) => item === null ? true : item.cannotSelect\""
        ],
        "enabled": true
    },
    {
        "label": "hide-selected",
        "name": ":hide-selected",
        "type": "Boolean",
        "desc": "Hides selection; Use the underlying input tag to hold the label (instead of showing it to the right of the input) of the selected option; Only works for non 'multiple' Selects",
        "category": "selection",
        "enabled": true
    },
    {
        "label": "hide-dropdown-icon",
        "name": ":hide-dropdown-icon",
        "type": "Boolean",
        "desc": "Hides dropdown icon",
        "category": "content|behavior",
        "enabled": true
    },
    {
        "label": "dropdown-icon",
        "name": ":dropdown-icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "max-values",
        "name": ":max-values",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Allow a maximum number of selections that the user can do",
        "category": "selection",
        "examples": [
            "5"
        ],
        "enabled": true
    },
    {
        "label": "options-dense",
        "name": ":options-dense",
        "type": "Boolean",
        "desc": "Dense mode for options list; occupies less space",
        "category": "options",
        "enabled": true
    },
    {
        "label": "options-dark",
        "name": ":options-dark",
        "type": "Boolean",
        "desc": "Options menu will be colored with a dark color",
        "category": "options",
        "enabled": true
    },
    {
        "label": "options-selected-class",
        "name": ":options-selected-class",
        "type": "String",
        "desc": "CSS class name for options that are active/selected; Set it to an empty string to stop applying the default (which is text-* where * is the 'color' prop value)",
        "category": "options",
        "examples": [
            "text-orange"
        ],
        "enabled": true
    },
    {
        "label": "options-html",
        "name": ":options-html",
        "type": "Boolean",
        "desc": "Force render the options as HTML; This can lead to XSS attacks so make sure that you sanitize the content; Does NOT apply when using 'option' slot!",
        "category": "options",
        "enabled": true
    },
    {
        "label": "options-cover",
        "name": ":options-cover",
        "type": "Boolean",
        "desc": "Expanded menu will cover the component (will not work along with 'use-input' prop for obvious reasons)",
        "category": "options",
        "enabled": true
    },
    {
        "label": "menu-shrink",
        "name": ":menu-shrink",
        "type": "Boolean",
        "desc": "Allow the options list to be narrower than the field (only in menu mode)",
        "category": "options",
        "enabled": true
    },
    {
        "label": "menu-anchor",
        "name": ":menu-anchor",
        "type": "String",
        "desc": "Two values setting the starting position or anchor point of the options list relative to the field (only in menu mode)",
        "category": "position",
        "examples": [
            "top left",
            "bottom right"
        ],
        "enabled": true
    },
    {
        "label": "menu-self",
        "name": ":menu-self",
        "type": "String",
        "desc": "Two values setting the options list's own position relative to its target (only in menu mode)",
        "category": "position",
        "examples": [
            "top left",
            "bottom right"
        ],
        "enabled": true
    },
    {
        "label": "menu-offset",
        "name": ":menu-offset",
        "type": "Array",
        "desc": "An array of two numbers to offset the options list horizontally and vertically in pixels (only in menu mode)",
        "category": "position",
        "examples": [
            "[8, 8]",
            "[5, 10]"
        ],
        "enabled": true
    },
    {
        "label": "popup-content-class",
        "name": ":popup-content-class",
        "type": "String",
        "desc": "Class definitions to be attributed to the popup content",
        "category": "style",
        "examples": [
            "my-special-class"
        ],
        "enabled": true
    },
    {
        "label": "popup-content-style",
        "name": ":popup-content-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Style definitions to be attributed to the popup content",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":popup-content-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "use-input",
        "name": ":use-input",
        "type": "Boolean",
        "desc": "Use an input tag where users can type",
        "category": "content",
        "enabled": true
    },
    {
        "label": "use-chips",
        "name": ":use-chips",
        "type": "Boolean",
        "desc": "Use QChip to show what is currently selected",
        "category": "selection",
        "enabled": true
    },
    {
        "label": "fill-input",
        "name": ":fill-input",
        "type": "Boolean",
        "desc": "Fills the input with current value; Useful along with 'hide-selected'; Does NOT works along with 'multiple' selection",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "new-value-mode",
        "name": ":new-value-mode",
        "type": "String",
        "desc": "Enables creation of new values and defines behavior when a new value is added: 'add' means it adds the value (even if possible duplicate), 'add-unique' adds only unique values, and 'toggle' adds or removes the value (based on if it exists or not already); When using this prop then listening for @new-value becomes optional (only to override the behavior defined by 'new-value-mode')",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "map-options",
        "name": ":map-options",
        "type": "Boolean",
        "desc": "Try to map labels of model from 'options' Array; has a small performance penalty; If you are using emit-value you will probably need to use map-options to display the label text in the select field rather than the value;  Refer to the 'Affecting model' section above",
        "category": "options",
        "enabled": true
    },
    {
        "label": "emit-value",
        "name": ":emit-value",
        "type": "Boolean",
        "desc": "Update model with the value of the selected option instead of the whole option",
        "category": "model",
        "enabled": true
    },
    {
        "label": "input-debounce",
        "name": ":input-debounce",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Debounce the input model update with an amount of milliseconds",
        "category": "content",
        "examples": [
            650
        ],
        "enabled": true
    },
    {
        "label": "input-class",
        "name": ":input-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Class definitions to be attributed to the underlying input tag",
        "category": "style",
        "examples": [
            "my-special-class",
            ":input-class=\"{ 'my-special-class': <condition> }\""
        ],
        "enabled": true
    },
    {
        "label": "input-style",
        "name": ":input-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Style definitions to be attributed to the underlying input tag",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":input-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "autocomplete",
        "name": ":autocomplete",
        "type": "String",
        "desc": "Autocomplete attribute for field",
        "category": "behavior",
        "examples": [
            "autocomplete=\"country\""
        ],
        "enabled": true
    },
    {
        "label": "transition-show",
        "name": ":transition-show",
        "type": "String",
        "desc": "Transition when showing the menu/dialog; One of Quasar's embedded transitions",
        "category": "behavior",
        "examples": [
            "fade",
            "slide-down"
        ],
        "enabled": true
    },
    {
        "label": "transition-hide",
        "name": ":transition-hide",
        "type": "String",
        "desc": "Transition when hiding the menu/dialog; One of Quasar's embedded transitions",
        "category": "behavior",
        "examples": [
            "fade",
            "slide-down"
        ],
        "enabled": true
    },
    {
        "label": "transition-duration",
        "name": ":transition-duration",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Transition duration when hiding the menu/dialog (in milliseconds, without unit)",
        "category": "behavior",
        "examples": [
            500,
            "1200"
        ],
        "enabled": true
    },
    {
        "label": "behavior",
        "name": ":behavior",
        "type": "String",
        "desc": "Overrides the default dynamic mode of showing as menu on desktop and dialog on mobiles",
        "category": "behavior",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('select', { label: 'Select', content: '<q-select />', media: '<img src="images/icons/components/ui_components/select.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_radio = editor => {
        editor.DomComponents.addType("radio", {
            isComponent: el => {
                if (el.tagName == 'Q-RADIO') {
                    return { type: 'radio' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "Number",
            "String",
            "null",
            "undefined"
        ],
        "desc": "Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"option\""
        ],
        "enabled": true
    },
    {
        "label": "val",
        "name": ":val",
        "type": [
            "Number",
            "String",
            "null",
            "undefined"
        ],
        "desc": "The actual value of the option with which model value is changed",
        "category": "model",
        "examples": [
            "opt1",
            50
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "Label to display along the radio control (or use the default slot instead of this prop)",
        "category": "label",
        "examples": [
            "label=\"Option 1\""
        ],
        "enabled": true
    },
    {
        "label": "left-label",
        "name": ":left-label",
        "type": "Boolean",
        "desc": "Label (if any specified) should be displayed on the left side of the checkbox",
        "category": "label",
        "enabled": true
    },
    {
        "label": "checked-icon",
        "name": ":checked-icon",
        "type": "String",
        "desc": "The icon to be used when selected (instead of the default design)",
        "category": "icons",
        "examples": [
            "visibility"
        ],
        "enabled": true
    },
    {
        "label": "unchecked-icon",
        "name": ":unchecked-icon",
        "type": "String",
        "desc": "The icon to be used when un-selected (instead of the default design)",
        "category": "icons",
        "examples": [
            "visibility_off"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "keep-color",
        "name": ":keep-color",
        "type": "Boolean",
        "desc": "Should the color (if specified any) be kept when checkbox is unticked?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('radio', { label: 'Radio', content: '<q-radio />', media: '<img src="images/icons/components/ui_components/radio.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_checkbox = editor => {
        editor.DomComponents.addType("checkbox", {
            isComponent: el => {
                if (el.tagName == 'Q-CHECKBOX') {
                    return { type: 'checkbox' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "Any",
            "Array"
        ],
        "desc": "Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "false",
            "['car', 'building']"
        ],
        "enabled": true
    },
    {
        "label": "val",
        "name": ":val",
        "type": "Any",
        "desc": "Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked",
        "category": "model",
        "examples": [
            "car"
        ],
        "enabled": true
    },
    {
        "label": "true-value",
        "name": ":true-value",
        "type": "Any",
        "desc": "What model value should be considered as checked/ticked/on?",
        "category": "model",
        "examples": [
            "Agreed"
        ],
        "enabled": true
    },
    {
        "label": "false-value",
        "name": ":false-value",
        "type": "Any",
        "desc": "What model value should be considered as unchecked/unticked/off?",
        "category": "model",
        "examples": [
            "Disagree"
        ],
        "enabled": true
    },
    {
        "label": "indeterminate-value",
        "name": ":indeterminate-value",
        "type": "Any",
        "desc": "What model value should be considered as 'indeterminate'?",
        "category": "behavior",
        "examples": [
            0,
            "not_answered"
        ],
        "enabled": true
    },
    {
        "label": "toggle-order",
        "name": ":toggle-order",
        "type": "String",
        "desc": "Determines toggle order of the two states ('t' stands for state of true, 'f' for state of false); If 'toggle-indeterminate' is true, then the order is: indet -> first state -> second state -> indet (and repeat), otherwise: indet -> first state -> second state -> first state -> second state -> ...",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "toggle-indeterminate",
        "name": ":toggle-indeterminate",
        "type": "Boolean",
        "desc": "When user clicks/taps on the component, should we toggle through the indeterminate state too?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "Label to display along the component (or use the default slot instead of this prop)",
        "category": "label",
        "examples": [
            "I agree with the Terms and Conditions"
        ],
        "enabled": true
    },
    {
        "label": "left-label",
        "name": ":left-label",
        "type": "Boolean",
        "desc": "Label (if any specified) should be displayed on the left side of the component",
        "category": "label",
        "enabled": true
    },
    {
        "label": "checked-icon",
        "name": ":checked-icon",
        "type": "String",
        "desc": "The icon to be used when the model is truthy (instead of the default design)",
        "category": "icons",
        "examples": [
            "visibility"
        ],
        "enabled": true
    },
    {
        "label": "unchecked-icon",
        "name": ":unchecked-icon",
        "type": "String",
        "desc": "The icon to be used when the toggle is falsy (instead of the default design)",
        "category": "icons",
        "examples": [
            "visibility_off"
        ],
        "enabled": true
    },
    {
        "label": "indeterminate-icon",
        "name": ":indeterminate-icon",
        "type": "String",
        "desc": "The icon to be used when the model is indeterminate (instead of the default design)",
        "category": "icons",
        "examples": [
            "help"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "keep-color",
        "name": ":keep-color",
        "type": "Boolean",
        "desc": "Should the color (if specified any) be kept when the component is unticked/ off?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('checkbox', { label: 'Checkbox', content: '<q-checkbox />', media: '<img src="images/icons/components/ui_components/checkbox.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_toggle = editor => {
        editor.DomComponents.addType("toggle", {
            isComponent: el => {
                if (el.tagName == 'Q-TOGGLE') {
                    return { type: 'toggle' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "Any",
            "Array"
        ],
        "desc": "Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "false",
            "['car', 'building']"
        ],
        "enabled": true
    },
    {
        "label": "val",
        "name": ":val",
        "type": "Any",
        "desc": "Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked",
        "category": "model",
        "examples": [
            "car"
        ],
        "enabled": true
    },
    {
        "label": "true-value",
        "name": ":true-value",
        "type": "Any",
        "desc": "What model value should be considered as checked/ticked/on?",
        "category": "model",
        "examples": [
            "Agreed"
        ],
        "enabled": true
    },
    {
        "label": "false-value",
        "name": ":false-value",
        "type": "Any",
        "desc": "What model value should be considered as unchecked/unticked/off?",
        "category": "model",
        "examples": [
            "Disagree"
        ],
        "enabled": true
    },
    {
        "label": "indeterminate-value",
        "name": ":indeterminate-value",
        "type": "Any",
        "desc": "What model value should be considered as 'indeterminate'?",
        "category": "behavior",
        "examples": [
            0,
            "not_answered"
        ],
        "enabled": true
    },
    {
        "label": "toggle-order",
        "name": ":toggle-order",
        "type": "String",
        "desc": "Determines toggle order of the two states ('t' stands for state of true, 'f' for state of false); If 'toggle-indeterminate' is true, then the order is: indet -> first state -> second state -> indet (and repeat), otherwise: indet -> first state -> second state -> first state -> second state -> ...",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "toggle-indeterminate",
        "name": ":toggle-indeterminate",
        "type": "Boolean",
        "desc": "When user clicks/taps on the component, should we toggle through the indeterminate state too?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "Label to display along the component (or use the default slot instead of this prop)",
        "category": "label",
        "examples": [
            "I agree with the Terms and Conditions"
        ],
        "enabled": true
    },
    {
        "label": "left-label",
        "name": ":left-label",
        "type": "Boolean",
        "desc": "Label (if any specified) should be displayed on the left side of the component",
        "category": "label",
        "enabled": true
    },
    {
        "label": "checked-icon",
        "name": ":checked-icon",
        "type": "String",
        "desc": "The icon to be used when the toggle is on",
        "category": "icons",
        "examples": [
            "visibility"
        ],
        "enabled": true
    },
    {
        "label": "unchecked-icon",
        "name": ":unchecked-icon",
        "type": "String",
        "desc": "The icon to be used when the toggle is off",
        "category": "icons",
        "examples": [
            "visibility_off"
        ],
        "enabled": true
    },
    {
        "label": "indeterminate-icon",
        "name": ":indeterminate-icon",
        "type": "String",
        "desc": "The icon to be used when the model is indeterminate",
        "category": "icons",
        "examples": [
            "help"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "keep-color",
        "name": ":keep-color",
        "type": "Boolean",
        "desc": "Should the color (if specified any) be kept when the component is unticked/ off?",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-color",
        "name": ":icon-color",
        "type": "String",
        "desc": "Override default icon color (for truthy state only); Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('toggle', { label: 'Toggle', content: '<q-toggle />', media: '<img src="images/icons/components/ui_components/toggle.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_slider = editor => {
        editor.DomComponents.addType("slider", {
            isComponent: el => {
                if (el.tagName == 'Q-SLIDER') {
                    return { type: 'slider' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Model of the component (must be between min/max)",
        "category": "main properties",
        "examples": [
            "v-model=\"positionModel\""
        ],
        "enabled": true
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "juliaType__": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "min",
        "name": ":min",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Minimum value of the model; Set track's minimum value",
        "category": "main properties",
        "examples": [
            ":min=\"0\""
        ],
        "enabled": true
    },
    {
        "label": "max",
        "name": ":max",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Maximum value of the model; Set track's maximum value",
        "category": "main properties",
        "examples": [
            ":max=\"100\""
        ],
        "enabled": true
    },
    {
        "label": "inner-min",
        "name": ":inner-min",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop",
        "category": "main properties",
        "examples": [
            ":inner-min=\"0\""
        ],
        "enabled": true
    },
    {
        "label": "inner-max",
        "name": ":inner-max",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop",
        "category": "main properties",
        "examples": [
            ":inner-max=\"100\""
        ],
        "enabled": true
    },
    {
        "label": "step",
        "name": ":step",
        "type": "Number",
        "juliaType__": "Number",
        "desc": "Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity",
        "category": "main properties",
        "examples": [
            ":step=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "snap",
        "name": ":snap",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "reverse",
        "name": ":reverse",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Work in reverse (changes direction)",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "vertical",
        "name": ":vertical",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Display in vertical direction",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "track-color",
        "name": ":track-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for the track (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "track-img",
        "name": ":track-img",
        "type": "String",
        "juliaType__": "String",
        "desc": "Apply a pattern image on the track",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "inner-track-color",
        "name": ":inner-track-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for the inner track (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "inner-track-img",
        "name": ":inner-track-img",
        "type": "String",
        "juliaType__": "String",
        "desc": "Apply a pattern image on the inner track",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "selection-color",
        "name": ":selection-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for the selection bar (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "selection-img",
        "name": ":selection-img",
        "type": "String",
        "juliaType__": "String",
        "desc": "Apply a pattern image on the selection bar",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Popup a label when user clicks/taps on the slider thumb and moves it",
        "category": "content",
        "enabled": true
    },
    {
        "label": "label-color",
        "name": ":label-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "label-text-color",
        "name": ":label-text-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "switch-label-side",
        "name": ":switch-label-side",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Switch the position of the label (top <-> bottom or left <-> right)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "label-always",
        "name": ":label-always",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Always display the label",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "markers",
        "name": ":markers",
        "type": [
            "Boolean",
            "Number"
        ],
        "juliaType__": "Bool|Number",
        "desc": "Display markers on the track, one for each possible value for the model or using a custom step (when specifying a Number)",
        "category": "content",
        "examples": [
            "markers",
            ":markers=\"5\""
        ],
        "enabled": true
    },
    {
        "label": "marker-labels",
        "name": ":marker-labels",
        "type": [
            "Boolean",
            "Array",
            "Object",
            "Function"
        ],
        "juliaType__": "Bool|Vector|Dict|Function",
        "desc": "Configure the marker labels (or show the default ones if 'true'); Array of definition Objects or Object with key-value where key is the model and the value is the marker label definition",
        "category": "content",
        "examples": [
            true,
            "[ { value: 0, label: '0%' }, { value: 5, classes: 'my-class', style: { width: '24px' } } ]",
            "{ 0: '0%', 5: { label: '5%', classes: 'my-class', style: { width: '24px' } } }",
            "val => (10 * val) + '%'",
            "val => ({ label: (10 * val) + '%', classes: 'my-class', style: { width: '24px' } })"
        ],
        "enabled": true
    },
    {
        "label": "marker-labels-class",
        "name": ":marker-labels-class",
        "type": "String",
        "juliaType__": "String",
        "desc": "CSS class(es) to apply to the marker labels container",
        "category": "style",
        "examples": [
            "text-orange"
        ],
        "enabled": true
    },
    {
        "label": "switch-marker-labels-side",
        "name": ":switch-marker-labels-side",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Switch the position of the marker labels (top <-> bottom or left <-> right)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "track-size",
        "name": ":track-size",
        "type": "String",
        "juliaType__": "String",
        "desc": "Track size (including CSS unit)",
        "category": "style",
        "examples": [
            "35px"
        ],
        "enabled": true
    },
    {
        "label": "thumb-size",
        "name": ":thumb-size",
        "type": "String",
        "juliaType__": "String",
        "desc": "Thumb size (including CSS unit)",
        "category": "style",
        "examples": [
            "20px"
        ],
        "enabled": true
    },
    {
        "label": "thumb-color",
        "name": ":thumb-color",
        "type": "String",
        "juliaType__": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "thumb-path",
        "name": ":thumb-path",
        "type": "String",
        "juliaType__": "String",
        "desc": "Set custom thumb svg path",
        "category": "style",
        "examples": [
            "M5 5 h10 v10 h-10 v-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "juliaType__": "Bool",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "juliaType__": "Number|String",
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "label-value",
        "name": ":label-value",
        "type": [
            "String",
            "Number"
        ],
        "juliaType__": "String|Number",
        "desc": "Override default label value",
        "category": "content",
        "examples": [
            ":label-value=\"model + 'px'\""
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('slider', { label: 'Slider', content: '<q-slider />', media: '<img src="images/icons/components/ui_components/slider.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_range = editor => {
        editor.DomComponents.addType("range", {
            isComponent: el => {
                if (el.tagName == 'Q-RANGE') {
                    return { type: 'range' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "min",
        "name": ":min",
        "type": "Number",
        "desc": "Minimum value of the model; Set track's minimum value",
        "category": "model",
        "examples": [
            ":min=\"0\""
        ],
        "enabled": true
    },
    {
        "label": "max",
        "name": ":max",
        "type": "Number",
        "desc": "Maximum value of the model; Set track's maximum value",
        "category": "model",
        "examples": [
            ":max=\"100\""
        ],
        "enabled": true
    },
    {
        "label": "inner-min",
        "name": ":inner-min",
        "type": "Number",
        "desc": "Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop",
        "category": "model",
        "examples": [
            ":inner-min=\"0\""
        ],
        "enabled": true
    },
    {
        "label": "inner-max",
        "name": ":inner-max",
        "type": "Number",
        "desc": "Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop",
        "category": "model",
        "examples": [
            ":inner-max=\"100\""
        ],
        "enabled": true
    },
    {
        "label": "step",
        "name": ":step",
        "type": "Number",
        "desc": "Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity",
        "category": "model",
        "examples": [
            ":step=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "snap",
        "name": ":snap",
        "type": "Boolean",
        "desc": "Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "reverse",
        "name": ":reverse",
        "type": "Boolean",
        "desc": "Work in reverse (changes direction)",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "vertical",
        "name": ":vertical",
        "type": "Boolean",
        "desc": "Display in vertical direction",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "track-color",
        "name": ":track-color",
        "type": "String",
        "desc": "Color name for the track (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "track-img",
        "name": ":track-img",
        "type": "String",
        "desc": "Apply a pattern image on the track",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "inner-track-color",
        "name": ":inner-track-color",
        "type": "String",
        "desc": "Color name for the inner track (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "inner-track-img",
        "name": ":inner-track-img",
        "type": "String",
        "desc": "Apply a pattern image on the inner track",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "selection-color",
        "name": ":selection-color",
        "type": "String",
        "desc": "Color name for the selection bar (can be 'transparent' too) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "selection-img",
        "name": ":selection-img",
        "type": "String",
        "desc": "Apply a pattern image on the selection bar",
        "category": "style",
        "examples": [
            "~assets/my-pattern.png"
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "Boolean",
        "desc": "Popup a label when user clicks/taps on the slider thumb and moves it",
        "category": "content",
        "enabled": true
    },
    {
        "label": "label-color",
        "name": ":label-color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "label-text-color",
        "name": ":label-text-color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "switch-label-side",
        "name": ":switch-label-side",
        "type": "Boolean",
        "desc": "Switch the position of the label (top <-> bottom or left <-> right)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "label-always",
        "name": ":label-always",
        "type": "Boolean",
        "desc": "Always display the label",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "markers",
        "name": ":markers",
        "type": [
            "Boolean",
            "Number"
        ],
        "desc": "Display markers on the track, one for each possible value for the model or using a custom step (when specifying a Number)",
        "category": "content",
        "examples": [
            "markers",
            ":markers=\"5\""
        ],
        "enabled": true
    },
    {
        "label": "marker-labels",
        "name": ":marker-labels",
        "type": [
            "Boolean",
            "Array",
            "Object",
            "Function"
        ],
        "desc": "Configure the marker labels (or show the default ones if 'true'); Array of definition Objects or Object with key-value where key is the model and the value is the marker label definition",
        "category": "content",
        "examples": [
            true,
            "[ { value: 0, label: '0%' }, { value: 5, classes: 'my-class', style: { width: '24px' } } ]",
            "{ 0: '0%', 5: { label: '5%', classes: 'my-class', style: { width: '24px' } } }",
            "val => (10 * val) + '%'",
            "val => ({ label: (10 * val) + '%', classes: 'my-class', style: { width: '24px' } })"
        ],
        "enabled": true
    },
    {
        "label": "marker-labels-class",
        "name": ":marker-labels-class",
        "type": "String",
        "desc": "CSS class(es) to apply to the marker labels container",
        "category": "style",
        "examples": [
            "text-orange"
        ],
        "enabled": true
    },
    {
        "label": "switch-marker-labels-side",
        "name": ":switch-marker-labels-side",
        "type": "Boolean",
        "desc": "Switch the position of the marker labels (top <-> bottom or left <-> right)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "track-size",
        "name": ":track-size",
        "type": "String",
        "desc": "Track size (including CSS unit)",
        "category": "style",
        "examples": [
            "35px"
        ],
        "enabled": true
    },
    {
        "label": "thumb-size",
        "name": ":thumb-size",
        "type": "String",
        "desc": "Thumb size (including CSS unit)",
        "category": "style",
        "examples": [
            "20px"
        ],
        "enabled": true
    },
    {
        "label": "thumb-color",
        "name": ":thumb-color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "thumb-path",
        "name": ":thumb-path",
        "type": "String",
        "desc": "Set custom thumb svg path",
        "category": "style",
        "examples": [
            "M5 5 h10 v10 h-10 v-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "Object",
            "null",
            "undefined"
        ],
        "desc": "Model of the component of type { min, max } (both values must be between global min/max); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"positionModel\""
        ],
        "enabled": true
    },
    {
        "label": "drag-range",
        "name": ":drag-range",
        "type": "Boolean",
        "desc": "User can drag range instead of just the two thumbs",
        "category": "content",
        "enabled": true
    },
    {
        "label": "drag-only-range",
        "name": ":drag-only-range",
        "type": "Boolean",
        "desc": "User can drag only the range instead and NOT the two thumbs",
        "category": "content",
        "enabled": true
    },
    {
        "label": "left-label-color",
        "name": ":left-label-color",
        "type": "String",
        "desc": "Color name for left label background from the Quasar Color Palette",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "left-label-text-color",
        "name": ":left-label-text-color",
        "type": "String",
        "desc": "Color name for left label text from the Quasar Color Palette",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "right-label-color",
        "name": ":right-label-color",
        "type": "String",
        "desc": "Color name for right label background from the Quasar Color Palette",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "right-label-text-color",
        "name": ":right-label-text-color",
        "type": "String",
        "desc": "Color name for right label text from the Quasar Color Palette",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "left-label-value",
        "name": ":left-label-value",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Override default label for min value",
        "category": "labels",
        "examples": [
            ":left-label-value=\"model.min + 'px'\""
        ],
        "enabled": true
    },
    {
        "label": "right-label-value",
        "name": ":right-label-value",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Override default label for max value",
        "category": "labels",
        "examples": [
            ":right-label-value=\"model.max + 'px'\""
        ],
        "enabled": true
    },
    {
        "label": "left-thumb-color",
        "name": ":left-thumb-color",
        "type": "String",
        "desc": "Color name (from the Quasar Color Palette) for left thumb",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "right-thumb-color",
        "name": ":right-thumb-color",
        "type": "String",
        "desc": "Color name (from the Quasar Color Palette) for right thumb",
        "category": "labels",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('range', { label: 'Range', content: '<q-range />', media: '<img src="images/icons/components/ui_components/range.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_datePicker = editor => {
        editor.DomComponents.addType("datePicker", {
            isComponent: el => {
                if (el.tagName == 'Q-DATE') {
                    return { type: 'datePicker' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "landscape",
        "name": ":landscape",
        "type": "Boolean",
        "desc": "Display the component in landscape mode",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "mask",
        "name": ":mask",
        "type": "String",
        "desc": "Mask (formatting string) used for parsing and formatting value",
        "category": "model",
        "examples": [
            "YYYY-MM-DD",
            "MMMM Do, YYYY",
            "YYYY-MM-DD HH:mm:ss"
        ],
        "enabled": true
    },
    {
        "label": "locale",
        "name": ":locale",
        "type": "Object",
        "desc": "Locale formatting options",
        "category": "model",
        "examples": [
            ":locale=\"{ monthsShort: ['Ian', 'Feb', 'Mar', '...'] }\""
        ],
        "enabled": true
    },
    {
        "label": "calendar",
        "name": ":calendar",
        "type": "String",
        "desc": "Specify calendar type",
        "category": "model",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "Boolean",
        "desc": "Applies a 'flat' design (no default shadow)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "Boolean",
        "desc": "Applies a default border to the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "String",
            "Array",
            "Object",
            "null",
            "undefined"
        ],
        "desc": "Date(s) of the component; Must be Array if using 'multiple' prop; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"myDate\"",
            "v-model=\"[myDate1, myDate2]\"",
            "v-model=\"[{ from: myDateFrom, to: myDateTo }]\"",
            "v-model=\"[myDate1, { from: myDateFrom, to: myDateTo }, myDate2]\""
        ],
        "enabled": true
    },
    {
        "label": "title",
        "name": ":title",
        "type": "String",
        "desc": "When specified, it overrides the default header title; Makes sense when not in 'minimal' mode",
        "category": "content",
        "examples": [
            "Birthday"
        ],
        "enabled": true
    },
    {
        "label": "subtitle",
        "name": ":subtitle",
        "type": "String",
        "desc": "When specified, it overrides the default header subtitle; Makes sense when not in 'minimal' mode",
        "category": "content",
        "examples": [
            "John Doe"
        ],
        "enabled": true
    },
    {
        "label": "default-year-month",
        "name": ":default-year-month",
        "type": "String",
        "desc": "The default year and month to display (in YYYY/MM format) when model is unfilled (undefined or null); Please ensure it is within the navigation min/max year-month (if using them)",
        "category": "model",
        "examples": [
            "1986/02"
        ],
        "enabled": true
    },
    {
        "label": "default-view",
        "name": ":default-view",
        "type": "String",
        "desc": "The view which will be displayed by default",
        "category": "model",
        "enabled": true
    },
    {
        "label": "years-in-month-view",
        "name": ":years-in-month-view",
        "type": "Boolean",
        "desc": "Show the years selector in months view",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "events",
        "name": ":events",
        "type": [
            "Array",
            "Function"
        ],
        "desc": "A list of events to highlight on the calendar; If using a function, it receives the date as a String and must return a Boolean (matches or not); If using a function then for best performance, reference it from your scope and do not define it inline",
        "category": "model",
        "examples": [
            ":events=\"['2018/11/05', '2018/11/06', '2018/11/09', '2018/11/23']\"",
            ":events=\"date => date[9] % 3 === 0\""
        ],
        "enabled": true
    },
    {
        "label": "event-color",
        "name": ":event-color",
        "type": [
            "String",
            "Function"
        ],
        "desc": "Color name (from the Quasar Color Palette); If using a function, it receives the date as a String and must return a String (color for the received date); If using a function then for best performance, reference it from your scope and do not define it inline",
        "category": "style",
        "examples": [
            "teal-10",
            ":event-color=\"(date) => date[9] % 2 === 0 ? 'teal' : 'orange'\""
        ],
        "enabled": true
    },
    {
        "label": "options",
        "name": ":options",
        "type": [
            "Array",
            "Function"
        ],
        "desc": "Optionally configure the days that are selectable; If using a function, it receives the date as a String and must return a Boolean (is date acceptable or not); If using a function then for best performance, reference it from your scope and do not define it inline; Incompatible with 'range' prop",
        "category": "model",
        "examples": [
            ":options=\"['2018/11/05', '2018/11/12', '2018/11/19', '2018/11/26' ]\"",
            ":options=\"date => date[9] % 3 === 0\"",
            ":options=\"date => date >= '2018/11/03' && date <= '2018/11/15'\""
        ],
        "enabled": true
    },
    {
        "label": "navigation-min-year-month",
        "name": ":navigation-min-year-month",
        "type": "String",
        "desc": "Lock user from navigating below a specific year+month (in YYYY/MM format); This prop is not used to correct the model; You might want to also use 'default-year-month' prop",
        "category": "selection",
        "examples": [
            "2020/07"
        ],
        "enabled": true
    },
    {
        "label": "navigation-max-year-month",
        "name": ":navigation-max-year-month",
        "type": "String",
        "desc": "Lock user from navigating above a specific year+month (in YYYY/MM format); This prop is not used to correct the model; You might want to also use 'default-year-month' prop",
        "category": "selection",
        "examples": [
            "2020/10"
        ],
        "enabled": true
    },
    {
        "label": "no-unset",
        "name": ":no-unset",
        "type": "Boolean",
        "desc": "Remove ability to unselect a date; It does not apply to selecting a range over already selected dates",
        "category": "selection",
        "enabled": true
    },
    {
        "label": "first-day-of-week",
        "name": ":first-day-of-week",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Sets the day of the week that is considered the first day (0 - Sunday, 1 - Monday, ...); This day will show in the left-most column of the calendar",
        "category": "model",
        "examples": [
            "first-day-of-week=\"1\"",
            ":first-day-of-week=\"selectedFirstDayOfTheWeek\""
        ],
        "enabled": true
    },
    {
        "label": "today-btn",
        "name": ":today-btn",
        "type": "Boolean",
        "desc": "Display a button that selects the current day",
        "category": "content",
        "enabled": true
    },
    {
        "label": "minimal",
        "name": ":minimal",
        "type": "Boolean",
        "desc": "Don’t display the header",
        "category": "content",
        "enabled": true
    },
    {
        "label": "multiple",
        "name": ":multiple",
        "type": "Boolean",
        "desc": "Allow multiple selection; Model must be Array",
        "category": "model|selection",
        "enabled": true
    },
    {
        "label": "range",
        "name": ":range",
        "type": "Boolean",
        "desc": "Allow range selection; Partial compatibility with 'options' prop: selected ranges might also include 'unselectable' days",
        "category": "model|selection",
        "enabled": true
    },
    {
        "label": "emit-immediately",
        "name": ":emit-immediately",
        "type": "Boolean",
        "desc": "Emit model when user browses month and year too; ONLY for single selection (non-multiple, non-range)",
        "category": "model",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('datePicker', { label: 'Date Picker', content: '<q-date :mask="\'YYYY-MM-DD\'"></q-date>', media: '<img src="images/icons/components/ui_components/date_picker.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_timePicker = editor => {
        editor.DomComponents.addType("timePicker", {
            isComponent: el => {
                if (el.tagName == 'Q-TIME') {
                    return { type: 'timePicker' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "landscape",
        "name": ":landscape",
        "type": "Boolean",
        "desc": "Display the component in landscape mode",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "mask",
        "name": ":mask",
        "type": "String",
        "desc": "Mask (formatting string) used for parsing and formatting value",
        "category": "model",
        "examples": [
            "HH:mm:ss",
            "YYYY-MM-DD HH:mm:ss",
            "HH:mm MMMM Do, YYYY"
        ],
        "enabled": true
    },
    {
        "label": "locale",
        "name": ":locale",
        "type": "Object",
        "desc": "Locale formatting options",
        "category": "model",
        "examples": [
            ":locale=\"{ monthsShort: ['Ian', 'Feb', 'Mar', '...'] }\""
        ],
        "enabled": true
    },
    {
        "label": "calendar",
        "name": ":calendar",
        "type": "String",
        "desc": "Specify calendar type",
        "category": "model",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "Boolean",
        "desc": "Applies a 'flat' design (no default shadow)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "Boolean",
        "desc": "Applies a default border to the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": [
            "String",
            "null",
            "undefined"
        ],
        "desc": "Time of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"currentTime\""
        ],
        "enabled": true
    },
    {
        "label": "format24h",
        "name": ":format24h",
        "type": "Boolean",
        "desc": "Forces 24 hour time display instead of AM/PM system",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "default-date",
        "name": ":default-date",
        "type": "String",
        "desc": "The default date to use (in YYYY/MM/DD format) when model is unfilled (undefined or null)",
        "category": "model",
        "examples": [
            "1995/02/23"
        ],
        "enabled": true
    },
    {
        "label": "options",
        "name": ":options",
        "type": "Function",
        "desc": "Optionally configure what time is the user allowed to set; Overridden by 'hour-options', 'minute-options' and 'second-options' if those are set; For best performance, reference it from your scope and do not define it inline",
        "category": "behavior",
        "examples": [
            ":options=\"(hr, min, sec) => hr <= 6\""
        ],
        "enabled": true
    },
    {
        "label": "hour-options",
        "name": ":hour-options",
        "type": "Array",
        "desc": "Optionally configure what hours is the user allowed to set; Overrides 'options' prop if that is also set",
        "category": "behavior",
        "examples": [
            ":hour-options=\"[ 3, 6, 9 ]\""
        ],
        "enabled": true
    },
    {
        "label": "minute-options",
        "name": ":minute-options",
        "type": "Array",
        "desc": "Optionally configure what minutes is the user allowed to set; Overrides 'options' prop if that is also set",
        "category": "behavior",
        "examples": [
            ":minute-options=\"[0, 15, 30, 45]\""
        ],
        "enabled": true
    },
    {
        "label": "second-options",
        "name": ":second-options",
        "type": "Array",
        "desc": "Optionally configure what seconds is the user allowed to set; Overrides 'options' prop if that is also set",
        "category": "behavior",
        "examples": [
            ":second-options=\"[0, 7, 10, 23]\""
        ],
        "enabled": true
    },
    {
        "label": "with-seconds",
        "name": ":with-seconds",
        "type": "Boolean",
        "desc": "Allow the time to be set with seconds",
        "category": "model|behavior",
        "enabled": true
    },
    {
        "label": "now-btn",
        "name": ":now-btn",
        "type": "Boolean",
        "desc": "Display a button that selects the current time",
        "category": "content",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('timePicker', { label: 'Time Picker', content: '<q-time />', media: '<img src="images/icons/components/ui_components/time.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_editor = editor => {
        editor.DomComponents.addType("editor", {
            isComponent: el => {
                if (el.tagName == 'Q-EDITOR') {
                    return { type: 'editor' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "fullscreen",
        "name": ":fullscreen",
        "type": "Boolean",
        "desc": "Fullscreen mode",
        "category": "behavior",
        "examples": [
            "v-model:fullscreen=\"isFullscreen\""
        ],
        "enabled": true
    },
    {
        "label": "no-route-fullscreen-exit",
        "name": ":no-route-fullscreen-exit",
        "type": "Boolean",
        "desc": "Changing route app won't exit fullscreen",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "String",
        "desc": "Model of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"content\""
        ],
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "Boolean",
        "desc": "Applies a 'flat' design (no borders)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; toolbar buttons are shown on one-line only",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "min-height",
        "name": ":min-height",
        "type": "String",
        "desc": "CSS unit for the minimum height of the editable area",
        "category": "style",
        "examples": [
            "15rem",
            "50vh"
        ],
        "enabled": true
    },
    {
        "label": "max-height",
        "name": ":max-height",
        "type": "String",
        "desc": "CSS unit for maximum height of the input area",
        "category": "style",
        "examples": [
            "1000px",
            "90vh"
        ],
        "enabled": true
    },
    {
        "label": "height",
        "name": ":height",
        "type": "String",
        "desc": "CSS value to set the height of the editable area",
        "category": "style",
        "examples": [
            "100px",
            "50vh"
        ],
        "enabled": true
    },
    {
        "label": "definitions",
        "name": ":definitions",
        "type": "Object",
        "desc": "Definition of commands and their buttons to be included in the 'toolbar' prop",
        "category": "toolbar",
        "examples": [
            ":definitions=\"{ save: { tip: 'Save your work', icon: 'save', label: 'Save', handler: saveWork }, upload: { tip: 'Upload to cloud', icon: 'cloud_upload', label: 'Upload', handler: uploadIt } }\""
        ],
        "enabled": true
    },
    {
        "label": "fonts",
        "name": ":fonts",
        "type": "Object",
        "desc": "Object with definitions of fonts",
        "category": "toolbar",
        "examples": [
            ":fonts=\"{ arial: 'Arial', arial_black: 'Arial Black', comic_sans: 'Comic Sans MS' }\""
        ],
        "enabled": true
    },
    {
        "label": "toolbar",
        "name": ":toolbar",
        "type": "Array",
        "desc": "An array of arrays of Objects/Strings that you use to define the construction of the elements and commands available in the toolbar",
        "category": "toolbar",
        "examples": [
            [
                "left",
                "center",
                "right",
                "justify"
            ]
        ],
        "enabled": true
    },
    {
        "label": "toolbar-color",
        "name": ":toolbar-color",
        "type": "String",
        "desc": "Font color (from the Quasar Palette) of buttons and text in the toolbar",
        "category": "toolbar",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "toolbar-text-color",
        "name": ":toolbar-text-color",
        "type": "String",
        "desc": "Text color (from the Quasar Palette) of toolbar commands",
        "category": "toolbar",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "toolbar-toggle-color",
        "name": ":toolbar-toggle-color",
        "type": "String",
        "desc": "Choose the active color (from the Quasar Palette) of toolbar commands button",
        "category": "toolbar",
        "examples": [
            "secondary",
            "blue-3"
        ],
        "enabled": true
    },
    {
        "label": "toolbar-bg",
        "name": ":toolbar-bg",
        "type": "String",
        "desc": "Toolbar background color (from Quasar Palette)",
        "category": "toolbar",
        "examples": [
            "secondary",
            "blue-3"
        ],
        "enabled": true
    },
    {
        "label": "toolbar-outline",
        "name": ":toolbar-outline",
        "type": "Boolean",
        "desc": "Toolbar buttons are rendered \"outlined\"",
        "category": "toolbar|style",
        "enabled": true
    },
    {
        "label": "toolbar-push",
        "name": ":toolbar-push",
        "type": "Boolean",
        "desc": "Toolbar buttons are rendered as a \"push-button\" type",
        "category": "toolbar|style",
        "enabled": true
    },
    {
        "label": "toolbar-rounded",
        "name": ":toolbar-rounded",
        "type": "Boolean",
        "desc": "Toolbar buttons are rendered \"rounded\"",
        "category": "toolbar|style",
        "enabled": true
    },
    {
        "label": "paragraph-tag",
        "name": ":paragraph-tag",
        "type": "String",
        "desc": "Paragraph tag to be used",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "content-style",
        "name": ":content-style",
        "type": "Object",
        "desc": "Object with CSS properties and values for styling the container of QEditor",
        "category": "style",
        "examples": [
            ":content-style=\"{ backgroundColor: '#C0C0C0' }\""
        ],
        "enabled": true
    },
    {
        "label": "content-class",
        "name": ":content-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes for the input area",
        "category": "style",
        "examples": [
            "my-special-class",
            ":content-class=\"{ 'my-special-class': <condition> }\""
        ],
        "enabled": true
    },
    {
        "label": "placeholder",
        "name": ":placeholder",
        "type": "String",
        "desc": "Text to display as placeholder",
        "category": "content",
        "examples": [
            "Type your story here ..."
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('editor', { label: 'Editor', content: '<q-editor />', media: '<img src="images/icons/components/ui_components/editor.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_knob = editor => {
        editor.DomComponents.addType("knob", {
            isComponent: el => {
                if (el.tagName == 'Q-KNOB') {
                    return { type: 'knob' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Number",
        "desc": "Any number to indicate the given value of the knob. Either use this property (along with a listener for 'update:modelValue' event) OR use the v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"myValue\""
        ],
        "enabled": true
    },
    {
        "label": "min",
        "name": ":min",
        "type": "Number",
        "desc": "The minimum value that the model (the knob value) should start at",
        "category": "model",
        "examples": [
            "20",
            "5"
        ],
        "enabled": true
    },
    {
        "label": "max",
        "name": ":max",
        "type": "Number",
        "desc": "The maximum value that the model (the knob value) should go to",
        "category": "model",
        "examples": [
            "100",
            "50"
        ],
        "enabled": true
    },
    {
        "label": "inner-min",
        "name": ":inner-min",
        "type": "Number",
        "desc": "Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop",
        "category": "model",
        "examples": [
            ":inner-min=\"0\""
        ],
        "enabled": true
    },
    {
        "label": "inner-max",
        "name": ":inner-max",
        "type": "Number",
        "desc": "Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop",
        "category": "model",
        "examples": [
            ":inner-max=\"100\""
        ],
        "enabled": true
    },
    {
        "label": "step",
        "name": ":step",
        "type": "Number",
        "desc": "A number representing steps in the value of the model, while adjusting the knob",
        "category": "model",
        "examples": [
            "1",
            "5"
        ],
        "enabled": true
    },
    {
        "label": "reverse",
        "name": ":reverse",
        "type": "Boolean",
        "desc": "Reverses the direction of progress",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "instant-feedback",
        "name": ":instant-feedback",
        "type": "Boolean",
        "desc": "No animation when model changes",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "center-color",
        "name": ":center-color",
        "type": "String",
        "desc": "Color name for the center part of the component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "track-color",
        "name": ":track-color",
        "type": "String",
        "desc": "Color name for the track of the component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "font-size",
        "name": ":font-size",
        "type": "String",
        "desc": "Size of text in CSS units, including unit name. Suggestion: use 'em' units to sync with component size",
        "category": "style",
        "examples": [
            "1em",
            "16px",
            "2rem"
        ],
        "enabled": true
    },
    {
        "label": "thickness",
        "name": ":thickness",
        "type": "Number",
        "desc": "Thickness of progress arc as a ratio (0.0 < x < 1.0) of component size",
        "category": "style",
        "examples": [
            1,
            0.3
        ],
        "enabled": true
    },
    {
        "label": "angle",
        "name": ":angle",
        "type": "Number",
        "desc": "Angle to rotate progress arc by",
        "category": "content",
        "examples": [
            0,
            40,
            90
        ],
        "enabled": true
    },
    {
        "label": "show-value",
        "name": ":show-value",
        "type": "Boolean",
        "desc": "Enables the default slot and uses it (if available), otherwise it displays the 'value' prop as text; Make sure the text has enough space to be displayed inside the component",
        "category": "content|behavior",
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('knob', { label: 'Knob', content: '<q-knob />', media: '<img src="images/icons/components/ui_components/knob.png" class="blockIcon" />', category: 'Forms' });
    }    

    
    const customblock_quasar_list = editor => {
        editor.DomComponents.addType("list", {
            isComponent: el => {
                if (el.tagName == 'Q-LIST') {
                    return { type: 'list' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "Boolean",
        "desc": "Applies a default border to the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "separator",
        "name": ":separator",
        "type": "Boolean",
        "desc": "Applies a separator between contained items",
        "category": "content",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "padding",
        "name": ":padding",
        "type": "Boolean",
        "desc": "Applies a material design-like padding on top and bottom",
        "category": "content",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('list', { label: 'List', content: '<q-list />', media: '<img src="images/icons/components/ui_components/list.png" class="blockIcon" />', category: 'Lists' });
    }    

    
    const customblock_quasar_item = editor => {
        editor.DomComponents.addType("item", {
            isComponent: el => {
                if (el.tagName == 'Q-ITEM') {
                    return { type: 'item' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "to",
        "name": ":to",
        "type": [
            "String",
            "Object"
        ],
        "desc": "Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "/home/dashboard",
            ":to=\"{ name: 'my-route-name' }\""
        ],
        "enabled": true
    },
    {
        "label": "exact",
        "name": ":exact",
        "type": "Boolean",
        "desc": "Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "enabled": true
    },
    {
        "label": "replace",
        "name": ":replace",
        "type": "Boolean",
        "desc": "Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "enabled": true
    },
    {
        "label": "active-class",
        "name": ":active-class",
        "type": "String",
        "desc": "Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "my-active-class"
        ],
        "enabled": true
    },
    {
        "label": "exact-active-class",
        "name": ":exact-active-class",
        "type": "String",
        "desc": "Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "my-exact-active-class"
        ],
        "enabled": true
    },
    {
        "label": "href",
        "name": ":href",
        "type": "String",
        "desc": "Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props",
        "category": "navigation",
        "examples": [
            "https://quasar.dev"
        ],
        "enabled": true
    },
    {
        "label": "target",
        "name": ":target",
        "type": "String",
        "desc": "Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props",
        "category": "navigation",
        "examples": [
            "_blank",
            "_self",
            "_parent",
            "_top"
        ],
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "active",
        "name": ":active",
        "type": "Boolean",
        "desc": "Put item into 'active' state",
        "category": "state",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "clickable",
        "name": ":clickable",
        "type": "Boolean",
        "desc": "Is QItem clickable? If it's the case, then it will add hover effects and emit 'click' events",
        "category": "state",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "inset-level",
        "name": ":inset-level",
        "type": "Number",
        "desc": "Apply an inset; Useful when avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu",
        "category": "content",
        "examples": [
            ":inset-level=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "String",
        "desc": "HTML tag to render; Suggestion: use 'label' when encapsulating a QCheckbox/QRadio/QToggle so that when user clicks/taps on the whole item it will trigger a model change for the mentioned components",
        "category": "content",
        "examples": [
            "div",
            "span",
            "a",
            "label",
            "div"
        ],
        "enabled": true
    },
    {
        "label": "manual-focus",
        "name": ":manual-focus",
        "type": "Boolean",
        "desc": "Put item into a manual focus state; Enables 'focused' prop which will determine if item is focused or not, rather than relying on native hover/focus states",
        "category": "state",
        "enabled": true
    },
    {
        "label": "focused",
        "name": ":focused",
        "type": "Boolean",
        "desc": "Determines focus state, ONLY if 'manual-focus' is enabled / set to true",
        "category": "state",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('item', { label: 'Item', content: '<q-item />', media: '<img src="images/icons/components/ui_components/item.png" class="blockIcon" />', category: 'Lists' });
    }    

    
    const customblock_quasar_item_label = editor => {
        editor.DomComponents.addType("item_label", {
            isComponent: el => {
                if (el.tagName == 'Q-ITEM-LABEL') {
                    return { type: 'item_label' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "overline",
        "name": ":overline",
        "type": "Boolean",
        "desc": "Renders an overline label",
        "category": "content",
        "enabled": true
    },
    {
        "label": "caption",
        "name": ":caption",
        "type": "Boolean",
        "desc": "Renders a caption label",
        "category": "content",
        "enabled": true
    },
    {
        "label": "header",
        "name": ":header",
        "type": "Boolean",
        "desc": "Renders a header label",
        "category": "content",
        "enabled": true
    },
    {
        "label": "lines",
        "name": ":lines",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Apply ellipsis when there's not enough space to render on the specified number of lines;",
        "category": "content|behavior",
        "examples": [
            "1",
            "3",
            ":lines=\"2\""
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('item_label', { label: 'Item Label', content: '<q-item-label />', media: '<img src="images/icons/components/ui_components/item.png" class="blockIcon" />', category: 'Lists' });
    }    

    
    const customblock_quasar_dataTable = editor => {
        editor.DomComponents.addType("dataTable", {
            isComponent: el => {
                if (el.tagName == 'Q-TABLE') {
                    return { type: 'dataTable' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": ":data",
        "type": "select",
        "options": []
    },
    {
        "label": "fullscreen",
        "name": ":fullscreen",
        "type": "Boolean",
        "desc": "Fullscreen mode",
        "category": "behavior",
        "examples": [
            "v-model:fullscreen=\"isFullscreen\""
        ],
        "enabled": true
    },
    {
        "label": "no-route-fullscreen-exit",
        "name": ":no-route-fullscreen-exit",
        "type": "Boolean",
        "desc": "Changing route app won't exit fullscreen",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "rows",
        "name": ":rows",
        "type": "Array",
        "desc": "Rows of data to display",
        "category": "general",
        "examples": [
            ":rows=\"myData\""
        ],
        "enabled": true
    },
    {
        "label": "row-key",
        "name": ":row-key",
        "type": [
            "String",
            "Function"
        ],
        "desc": "Property of each row that defines the unique key of each row (the result must be a primitive, not Object, Array, etc); The value of property must be string or a function taking a row and returning the desired (nested) key in the row; If supplying a function then for best performance, reference it from your scope and do not define it inline",
        "category": "general",
        "examples": [
            "row-key=\"name\"",
            ":row-key=\"row => row.name\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll",
        "name": ":virtual-scroll",
        "type": "Boolean",
        "desc": "Display data using QVirtualScroll (for non-grid mode only)",
        "category": "virtual-scroll",
        "enabled": true
    },
    {
        "label": "virtual-scroll-target",
        "name": ":virtual-scroll-target",
        "type": [
            "Element",
            "String"
        ],
        "desc": "CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one",
        "category": "behavior",
        "examples": [
            ":scroll-target=\"$refs.scrollTarget\"",
            "scroll-target=\".scroll-target-class\"",
            "scroll-target=\"#scroll-target-id\"",
            "scroll-target=\"body\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-size",
        "name": ":virtual-scroll-slice-size",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Minimum number of rows to render in the virtual list",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-size=\"60\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-ratio-before",
        "name": ":virtual-scroll-slice-ratio-before",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Ratio of number of rows in visible zone to render before it",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-ratio-before=\"0.3\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-slice-ratio-after",
        "name": ":virtual-scroll-slice-ratio-after",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Ratio of number of rows in visible zone to render after it",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-slice-ratio-after=\"2\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-item-size",
        "name": ":virtual-scroll-item-size",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Default size in pixels of a row; This value is used for rendering the initial table; Try to use a value close to the minimum size of a row",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-item-size=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-sticky-size-start",
        "name": ":virtual-scroll-sticky-size-start",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Size in pixels of the sticky header (if using one); A correct value will improve scroll precision",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-sticky-size-start=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "virtual-scroll-sticky-size-end",
        "name": ":virtual-scroll-sticky-size-end",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Size in pixels of the sticky footer part (if using one); A correct value will improve scroll precision",
        "category": "virtual-scroll",
        "examples": [
            "virtual-scroll-sticky-size-end=\"48\""
        ],
        "enabled": true
    },
    {
        "label": "table-colspan",
        "name": ":table-colspan",
        "type": [
            "Number",
            "String"
        ],
        "desc": "The number of columns in the table (you need this if you use table-layout: fixed)",
        "category": "virtual-scroll|content",
        "examples": [
            "table-colspan=\"12\""
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "icon-first-page",
        "name": ":icon-first-page",
        "type": "String",
        "desc": "Icon name following Quasar convention for stepping to first page; Make sure you have the icon library installed unless you are using 'img:' prefix",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-prev-page",
        "name": ":icon-prev-page",
        "type": "String",
        "desc": "Icon name following Quasar convention for stepping to previous page; Make sure you have the icon library installed unless you are using 'img:' prefix",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-next-page",
        "name": ":icon-next-page",
        "type": "String",
        "desc": "Icon name following Quasar convention for stepping to next page; Make sure you have the icon library installed unless you are using 'img:' prefix",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-last-page",
        "name": ":icon-last-page",
        "type": "String",
        "desc": "Icon name following Quasar convention for stepping to last page; Make sure you have the icon library installed unless you are using 'img:' prefix",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "grid",
        "name": ":grid",
        "type": "Boolean",
        "desc": "Display data as a grid instead of the default table",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "grid-header",
        "name": ":grid-header",
        "type": "Boolean",
        "desc": "Display header for grid-mode also",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; Connect with $q.screen for responsive behavior",
        "category": "style",
        "enabled": true
    },
    {
        "label": "columns",
        "name": ":columns",
        "type": "Array",
        "desc": "The column definitions (Array of Objects)",
        "category": "column",
        "examples": [
            ":columns=\"tableColumns\""
        ],
        "enabled": true
    },
    {
        "label": "visible-columns",
        "name": ":visible-columns",
        "type": "Array",
        "desc": "Array of Strings defining column names ('name' property of each column from 'columns' prop definitions); Columns marked as 'required' are not affected by this property",
        "category": "column",
        "examples": [
            ":visible-columns=\"myCols\"",
            "[ 'desc', 'carbs', 'protein' ]"
        ],
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "Boolean",
        "desc": "Put Table into 'loading' state; Notify the user something is happening behind the scenes",
        "category": "behavior|content",
        "enabled": true
    },
    {
        "label": "title",
        "name": ":title",
        "type": "String",
        "desc": "Table title",
        "category": "content",
        "examples": [
            "Device list"
        ],
        "enabled": true
    },
    {
        "label": "hide-header",
        "name": ":hide-header",
        "type": "Boolean",
        "desc": "Hide table header layer",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-bottom",
        "name": ":hide-bottom",
        "type": "Boolean",
        "desc": "Hide table bottom layer regardless of what it has to display",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-selected-banner",
        "name": ":hide-selected-banner",
        "type": "Boolean",
        "desc": "Hide the selected rows banner (if any)",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-no-data",
        "name": ":hide-no-data",
        "type": "Boolean",
        "desc": "Hide the default no data bottom layer",
        "category": "content",
        "enabled": true
    },
    {
        "label": "hide-pagination",
        "name": ":hide-pagination",
        "type": "Boolean",
        "desc": "Hide the pagination controls at the bottom",
        "category": "content",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "Boolean",
        "desc": "Applies a 'flat' design (no default shadow)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "Boolean",
        "desc": "Applies a default border to the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "separator",
        "name": ":separator",
        "type": "String",
        "desc": "Use a separator/border between rows, columns or all cells",
        "category": "content",
        "enabled": true
    },
    {
        "label": "wrap-cells",
        "name": ":wrap-cells",
        "type": "Boolean",
        "desc": "Wrap text within table cells",
        "category": "content",
        "enabled": true
    },
    {
        "label": "binary-state-sort",
        "name": ":binary-state-sort",
        "type": "Boolean",
        "desc": "Skip the third state (unsorted) when user toggles column sort direction",
        "category": "sorting",
        "enabled": true
    },
    {
        "label": "column-sort-order",
        "name": ":column-sort-order",
        "type": "String",
        "desc": "Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); It gets applied to all columns unless a column has its own sortOrder specified in the 'columns' definition prop",
        "category": "sorting",
        "enabled": true
    },
    {
        "label": "no-data-label",
        "name": ":no-data-label",
        "type": "String",
        "desc": "Override default text to display when no data is available",
        "category": "content",
        "examples": [
            "No devices available"
        ],
        "enabled": true
    },
    {
        "label": "no-results-label",
        "name": ":no-results-label",
        "type": "String",
        "desc": "Override default text to display when user filters the table and no matched results are found",
        "category": "content",
        "examples": [
            "No matched records"
        ],
        "enabled": true
    },
    {
        "label": "loading-label",
        "name": ":loading-label",
        "type": "String",
        "desc": "Override default text to display when table is in loading state (see 'loading' prop)",
        "category": "content",
        "examples": [
            "Loading devices..."
        ],
        "enabled": true
    },
    {
        "label": "selected-rows-label",
        "name": ":selected-rows-label",
        "type": "Function",
        "desc": "Text to display when user selected at least one row; For best performance, reference it from your scope and do not define it inline",
        "category": "selection",
        "examples": [
            ":selected-rows-label=\"getSelectedString\""
        ],
        "enabled": true
    },
    {
        "label": "rows-per-page-label",
        "name": ":rows-per-page-label",
        "type": "String",
        "desc": "Text to override default rows per page label at bottom of table",
        "category": "pagination",
        "examples": [
            "Records per page:"
        ],
        "enabled": true
    },
    {
        "label": "pagination-label",
        "name": ":pagination-label",
        "type": "Function",
        "desc": "Text to override default pagination label at bottom of table (unless 'pagination' scoped slot is used); For best performance, reference it from your scope and do not define it inline",
        "category": "pagination",
        "examples": [
            ":pagination-label=\"getPaginationLabel\""
        ],
        "enabled": true
    },
    {
        "label": "table-style",
        "name": ":table-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS style to apply to native HTML <table> element's wrapper (which is a DIV)",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":table-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "table-class",
        "name": ":table-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes to apply to native HTML <table> element's wrapper (which is a DIV)",
        "category": "style",
        "examples": [
            "my-special-class",
            ":table-class=\"{ 'my-special-class': [Boolean condition] }\""
        ],
        "enabled": true
    },
    {
        "label": "table-header-style",
        "name": ":table-header-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS style to apply to header of native HTML <table> (which is a TR)",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":table-header-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "table-header-class",
        "name": ":table-header-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes to apply to header of native HTML <table> (which is a TR)",
        "category": "style",
        "examples": [
            "my-special-class",
            ":table-header-class=\"{ 'my-special-class': [Boolean condition] }\""
        ],
        "enabled": true
    },
    {
        "label": "card-container-style",
        "name": ":card-container-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS style to apply to the cards container (when in grid mode)",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":card-container-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "card-container-class",
        "name": ":card-container-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes to apply to the cards container (when in grid mode)",
        "category": "style",
        "examples": [
            "my-special-class",
            "justify-center",
            ":card-container-class=\"{ 'my-special-class': [Boolean condition] }\""
        ],
        "enabled": true
    },
    {
        "label": "card-style",
        "name": ":card-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS style to apply to the card (when in grid mode) or container card (when not in grid mode)",
        "category": "style",
        "examples": [
            "background-color: #ff0000",
            ":card-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "card-class",
        "name": ":card-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes to apply to the card (when in grid mode) or container card (when not in grid mode)",
        "category": "style",
        "examples": [
            "my-special-class",
            ":card-class=\"{ 'my-special-class': [Boolean condition] }\""
        ],
        "enabled": true
    },
    {
        "label": "title-class",
        "name": ":title-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "CSS classes to apply to the title (if using 'title' prop)",
        "category": "style",
        "examples": [
            "my-special-class",
            "text-h1",
            ":title-class=\"{ 'text-h1': [Boolean condition] }\""
        ],
        "enabled": true
    },
    {
        "label": "filter",
        "name": ":filter",
        "type": [
            "String",
            "Object"
        ],
        "desc": "String/Object to filter table with; When using an Object it requires 'filter-method' to also be specified since it will be a custom filtering",
        "category": "filter",
        "examples": [
            ":filter=\"myFilterInput\""
        ],
        "enabled": true
    },
    {
        "label": "filter-method",
        "name": ":filter-method",
        "type": "Function",
        "desc": "The actual filtering mechanism; For best performance, reference it from your scope and do not define it inline",
        "category": "filter",
        "examples": [
            "(see source code)"
        ],
        "enabled": true
    },
    {
        "label": "pagination",
        "name": ":pagination",
        "type": "Object",
        "desc": "Pagination object; You can also use the 'v-model:pagination' for synching; When not synching it simply initializes the pagination on first render",
        "category": "pagination",
        "examples": [
            ":pagination=\"myInitialPagination\"",
            "v-model:pagination=\"myPagination\""
        ],
        "enabled": true
    },
    {
        "label": "rows-per-page-options",
        "name": ":rows-per-page-options",
        "type": "Array",
        "desc": "Options for user to pick (Numbers); Number 0 means 'Show all rows in one page'",
        "category": "pagination",
        "examples": [
            ":rows-per-page-options=\"[10, 20]\""
        ],
        "enabled": true
    },
    {
        "label": "selection",
        "name": ":selection",
        "type": "String",
        "desc": "Selection type",
        "category": "selection",
        "examples": [
            "multiple"
        ],
        "enabled": true
    },
    {
        "label": "selected",
        "name": ":selected",
        "type": "Array",
        "desc": "Keeps the user selection array",
        "category": "selection",
        "examples": [
            "v-model:selected=\"selection\""
        ],
        "enabled": true
    },
    {
        "label": "expanded",
        "name": ":expanded",
        "type": "Array",
        "desc": "Keeps the array with expanded rows keys",
        "category": "expansion",
        "examples": [
            "v-model:expanded=\"expanded\""
        ],
        "enabled": true
    },
    {
        "label": "sort-method",
        "name": ":sort-method",
        "type": "Function",
        "desc": "The actual sort mechanism. Function (rows, sortBy, descending) => sorted rows; For best performance, reference it from your scope and do not define it inline",
        "category": "sorting",
        "examples": [
            "(see source code)"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('dataTable', { label: 'Data Table', content: '<q-table />', media: '<img src="images/icons/components/ui_components/table.png" class="blockIcon" />', category: 'Tables' });
    }

    const customblock_quasar_tab = editor => {
        editor.DomComponents.addType("tab", {
            isComponent: el => {
                if (el.tagName == 'Q-TAB') {
                    return { type: 'tab' }
                }
            },
            model: {
                defaults: {
                    traits: [
                        {
                            "label": "icon",
                            "name": ":icon",
                            "type": "String",
                            "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
                            "category": "content",
                            "examples": [
                                "map",
                                "ion-add",
                                "img:path/to/my-icon.png",
                                "img:http://my-site.com/path/to/my-icon.png",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "label",
                            "name": ":label",
                            "type": "String",
                            "desc": "A number or string to label the tab",
                            "category": "content",
                            "examples": [
                                "Home"
                            ],
                            "enabled": true
                        },
                        {
                            "label": "alert",
                            "name": ":alert",
                            "type": "String",
                            "desc": "Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color",
                            "category": "content",
                            "examples": [
                                "alert=\"purple\"",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "alert-icon",
                            "name": ":alert-icon",
                            "type": "String",
                            "desc": "Adds a floating icon to the tab, notifying the user there are some updates; It's displayed only if 'alert' is set; Can use the color specified by 'alert' prop",
                            "category": "content",
                            "examples": [
                                "alert-icon=\"alarm-on\"",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "no-caps",
                            "name": ":no-caps",
                            "type": "Boolean",
                            "desc": "Turns off capitalizing all letters within the tab (which is the default)",
                            "category": "content",
                            "enabled": true
                        },
                        {
                            "label": "name",
                            "name": ":name",
                            "type": "String",
                            "desc": "Panel name",
                            "category": "general",
                            "examples": [
                                "home",
                                ":name=\"1\"",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "tabindex",
                            "name": ":tabindex",
                            "type": "Number",
                            "desc": "Tabindex HTML attribute value",
                            "category": "general",
                            "examples": [
                                ":tabindex=\"1\"",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "disable",
                            "name": ":disable",
                            "type": "Boolean",
                            "desc": "Put component in disabled mode",
                            "category": "state",
                            "enabled": true
                        },
                        {
                            "label": "ripple",
                            "name": ":ripple",
                            "type": [
                                "Boolean",
                                "Object"
                            ],
                            "desc": "Configure material ripple (disable it by setting it to 'false' or supply a config object)",
                            "category": "style",
                            "examples": [
                                false,
                                "{ early: true, center: true, color: 'teal', keyCodes: [] }"
                            ],
                            "enabled": true
                        },
                        {
                            "label": "content-class",
                            "name": ":content-class",
                            "type": "String",
                            "desc": "Class definitions to be attributed to the content wrapper",
                            "category": "style",
                            "examples": [
                                "my-special-class"
                            ],
                            "enabled": true
                        }
                    ], },
                    init() {
                        this.on('change:attributes', this.handleAttrChange);
                    },
                    handleAttrChange() {
                        this.render();
                    },
                    render: function () {
                        this.view.onRender();
                    },
                    updateGenieModelProperties(properties) {
                        var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                        vtextTrait.set('options', properties);
                    }
                },
                view: {
                    onRender() {
                        
                    }
                },
            });
            editor.BlockManager.add('tab', { label: 'Tab', content: '<q-tab />', media: '<img src="images/icons/components/ui_components/tabs.png" class="blockIcon" />', category: 'Other' });
        }

        const customblock_quasar_tabgroup = editor => {
            editor.DomComponents.addType("tabgroup", {
                isComponent: el => {
                    if (el.tagName == 'Q-TABS') {
                        return { type: 'tabgroup' }
                    }
                },
                model: {
                    defaults: {
                        traits: [
                            {
                                "label": "Data Binding",
                                "name": "v-model",
                                "type": "select",
                                "options": []
                            },
                            {
                                "label": "breakpoint",
                                "name": ":breakpoint",
                                "type": [
                                    "Number",
                                    "String"
                                ],
                                "desc": "Breakpoint (in pixels) of tabs container width at which the tabs automatically turn to a justify alignment",
                                "category": "behavior",
                                "examples": [
                                    ":breakpoint=\"500\""
                                ],
                                "enabled": true
                            },
                            {
                                "label": "vertical",
                                "name": ":vertical",
                                "type": "Boolean",
                                "desc": "Use vertical design (tabs one on top of each other rather than one next to the other horizontally)",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "align",
                                "name": ":align",
                                "type": "String",
                                "desc": "Horizontal alignment the tabs within the tabs container",
                                "category": "content",
                                "examples": [
                                    "left",
                                    "right",
                                    "justify"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "outside-arrows",
                                "name": ":outside-arrows",
                                "type": "Boolean",
                                "desc": "Reserve space for arrows to place them on each side of the tabs (the arrows fade when inactive)",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "mobile-arrows",
                                "name": ":mobile-arrows",
                                "type": "Boolean",
                                "desc": "Force display of arrows (if needed) on mobile",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "breakpoint",
                                "name": ":breakpoint",
                                "type": [
                                    "Number",
                                    "String"
                                ],
                                "desc": "Breakpoint (in pixels) of tabs container width at which the tabs automatically turn to a justify alignment",
                                "category": "content",
                                "examples": [
                                    ":breakpoint=\"500\""
                                ],
                                "enabled": true
                            },
                            {
                                "label": "left-icon",
                                "name": ":left-icon",
                                "type": "String",
                                "desc": "The name of an icon to replace the default arrow used to scroll through the tabs to the left, when the tabs extend past the width of the tabs container",
                                "category": "content",
                                "examples": [
                                    "my-icon"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "right-icon",
                                "name": ":right-icon",
                                "type": "String",
                                "desc": "The name of an icon to replace the default arrow used to scroll through the tabs to the right, when the tabs extend past the width of the tabs container",
                                "category": "content",
                                "examples": [
                                    "my-icon"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "switch-indicator",
                                "name": ":switch-indicator",
                                "type": "Boolean",
                                "desc": "Switches the indicator position (on left of tab for vertical mode or above the tab for default horizontal mode)",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "stretch",
                                "name": ":stretch",
                                "type": "Boolean",
                                "desc": "When used on flexbox parent, tabs will stretch to parent's height",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "shrink",
                                "name": ":shrink",
                                "type": "Boolean",
                                "desc": "By default, QTabs is set to grow to the available space; However, you can reverse that with this prop; Useful (and required) when placing the component in a QToolbar",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "narrow-indicator",
                                "name": ":narrow-indicator",
                                "type": "Boolean",
                                "desc": "Allows the indicator to be the same width as the tab's content (text or icon), instead of the whole width of the tab",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "inline-label",
                                "name": ":inline-label",
                                "type": "Boolean",
                                "desc": "Allows the text to be inline with the icon, should one be used",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "no-caps",
                                "name": ":no-caps",
                                "type": "Boolean",
                                "desc": "Turns off capitalizing all letters within the tab (which is the default)",
                                "category": "content",
                                "enabled": true
                            },
                            {
                                "label": "active-class",
                                "name": ":active-class",
                                "type": "String",
                                "desc": "CSS class name for the active tab",
                                "category": "style",
                                "examples": [
                                    "my-active-class"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "active-color",
                                "name": ":active-color",
                                "type": "String",
                                "desc": "The color to be attributed to the text of the active tab",
                                "category": "style",
                                "examples": [
                                    "primary",
                                    "teal-10"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "indicator-color",
                                "name": ":indicator-color",
                                "type": "String",
                                "desc": "The color to be attributed to the indicator (the underline) of the active tab",
                                "category": "style",
                                "examples": [
                                    "primary",
                                    "teal-10"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "active-bg-color",
                                "name": ":active-bg-color",
                                "type": "String",
                                "desc": "The color to be attributed to the background of the active tab",
                                "category": "style",
                                "examples": [
                                    "primary",
                                    "teal-10"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "content-class",
                                "name": ":content-class",
                                "type": "String",
                                "desc": "Class definitions to be attributed to the content wrapper",
                                "category": "style",
                                "examples": [
                                    "my-content-class"
                                ],
                                "enabled": true
                            },
                            {
                                "label": "dense",
                                "name": ":dense",
                                "type": "Boolean",
                                "desc": "Dense mode; occupies less space",
                                "category": "style",
                                "enabled": true
                            },

                ] },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('tabgroup', { label: 'Tabs', content: '<q-tabs />', media: '<img src="images/icons/components/ui_components/tabs.png" class="blockIcon" />', category: 'Other' });
    }

    const customblock_quasar_tabpanel = editor => {
        editor.DomComponents.addType("tabpanel", {
            isComponent: el => {
                if (el.tagName == 'Q-TAB-PANEL') {
                    return { type: 'tabpanel' }
                }
            },
            model: {
                defaults: {
                    traits: [
                        {
                            "label": "name",
                            "name": ":name",
                            "type": "Any",
                            "desc": "Panel name",
                            "category": "general",
                            "examples": [
                                "accounts",
                                ":name=\"1\""
                            ],
                            "enabled": true
                        },
                        {
                            "label": "disable",
                            "name": ":disable",
                            "type": "Boolean",
                            "desc": "Put component in disabled mode",
                            "category": "state",
                            "enabled": true
                        },
                        {
                            "label": "dark",
                            "name": ":dark",
                            "type": "Boolean",
                            "desc": "Notify the component that the background is a dark color",
                            "category": "style",
                            "enabled": true
                        }
                    ] },
                    init() {
                        this.on('change:attributes', this.handleAttrChange);
                    },
                    handleAttrChange() {
                        this.render();
                    },
                    render: function () {
                        this.view.onRender();
                    },
                    updateGenieModelProperties(properties) {
                        var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                        vtextTrait.set('options', properties);
                    }
                },
                view: {
                    onRender() {
                        
                    }
                },
            });
            editor.BlockManager.add('tabpanel', { label: 'Tab Panel', content: '<q-tab-panel />', media: '<img src="images/icons/components/ui_components/tabpanels.png" class="blockIcon" />', category: 'Other' });
        }

        const customblock_quasar_tabpanelgroup = editor => {
            editor.DomComponents.addType("tabpanelgroup", {
                isComponent: el => {
                    if (el.tagName == 'Q-TAB-PANELS') {
                        return { type: 'tabpanelgroup' }
                    }
                },
                model: {
                    defaults: {
                        traits: [
                            {
                                "label": "Data Binding",
                                "name": "v-model",
                                "type": "select",
                                "options": []
                            },
                            {
                                "label": "keep-alive",
                                "name": ":keep-alive",
                                "type": "Boolean",
                                "desc": "Equivalent to using Vue's native <keep-alive> component on the content",
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "keep-alive-include",
                                "name": ":keep-alive-include",
                                "type": [
                                    "String",
                                    "Array",
                                    "RegExp"
                                ],
                                "desc": "Equivalent to using Vue's native include prop for <keep-alive>; Values must be valid Vue component names",
                                "examples": [
                                    "a,b",
                                    "['a','b']",
                                    "/a|b/"
                                ],
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "keep-alive-exclude",
                                "name": ":keep-alive-exclude",
                                "type": [
                                    "String",
                                    "Array",
                                    "RegExp"
                                ],
                                "desc": "Equivalent to using Vue's native exclude prop for <keep-alive>; Values must be valid Vue component names",
                                "examples": [
                                    "a,b",
                                    "['a','b']",
                                    "/a|b/"
                                ],
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "keep-alive-max",
                                "name": ":keep-alive-max",
                                "type": "Number",
                                "desc": "Equivalent to using Vue's native max prop for <keep-alive>",
                                "examples": [
                                    "5"
                                ],
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "animated",
                                "name": ":animated",
                                "type": "Boolean",
                                "desc": "Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)",
                                "category": "style",
                                "enabled": true
                            },
                            {
                                "label": "infinite",
                                "name": ":infinite",
                                "type": "Boolean",
                                "desc": "Makes component appear as infinite (when reaching last panel, next one will become the first one)",
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "swipeable",
                                "name": ":swipeable",
                                "type": "Boolean",
                                "desc": "Enable swipe events (may interfere with content's touch/mouse events)",
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "transition-prev",
                                "name": ":transition-prev",
                                "type": "String",
                                "desc": "One of Quasar's embedded transitions (has effect only if 'animated' prop is set)",
                                "examples": [
                                    "fade",
                                    "slide-left",
                                    "slide-right",
                                    "slide-up",
                                    "slide-down",
                                ],
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "transition-next",
                                "name": ":transition-next",
                                "type": "String",
                                "desc": "One of Quasar's embedded transitions (has effect only if 'animated' prop is set)",
                                "examples": [
                                    "fade",
                                    "slide-left",
                                    "slide-right",
                                    "slide-up",
                                ],
                                "category": "behavior",
                                "enabled": true
                            },
                            {
                                "label": "vertical",
                                "name": ":vertical",
                                "type": "Boolean",
                                "desc": "Display tabs vertically",
                                "category": "style",
                                "enabled": true
                            }
                        ] },
                        init() {
                            this.on('change:attributes', this.handleAttrChange);
                        },
                        handleAttrChange() {
                            this.render();
                        },
                        render: function () {
                            this.view.onRender();
                        },
                        updateGenieModelProperties(properties) {
                            var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                            vtextTrait.set('options', properties);
                        }
                    },
                    view: {
                        onRender() {
                            
                        }
                    },
                });
                editor.BlockManager.add('tabpanelgroup', { label: 'Tab Panels', content: '<q-tab-panels />', media: '<img src="images/icons/components/ui_components/tabpanels.png" class="blockIcon" />', category: 'Other' });
            }

    
    const customblock_quasar_img = editor => {
        editor.DomComponents.addType("img", {
            isComponent: el => {
                if (el.tagName == 'Q-IMG') {
                    return { type: 'img' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "ratio",
        "name": ":ratio",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Force the component to maintain an aspect ratio",
        "category": "style",
        "examples": [
            ":ratio=\"4/3\"",
            ":ratio=\"16/9\"",
            "ratio=\"1\"",
            "(Number format) :ratio=\"16/9\"",
            "(String format) ratio=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "src",
        "name": ":src",
        "type": "String",
        "desc": "Path to image",
        "category": "model",
        "examples": [
            "(public folder) src=\"img/something.png\"",
            "(assets folder) src=\"~assets/my-img.gif\"",
            "(relative path format) :src=\"require('./my_img.jpg')\"",
            "(URL) src=\"https://placeimg.com/500/300/nature\""
        ],
        "enabled": true
    },
    {
        "label": "srcset",
        "name": ":srcset",
        "type": "String",
        "desc": "Same syntax as <img> srcset attribute",
        "category": "model",
        "examples": [
            "elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w"
        ],
        "enabled": true
    },
    {
        "label": "sizes",
        "name": ":sizes",
        "type": "String",
        "desc": "Same syntax as <img> sizes attribute",
        "category": "model",
        "examples": [
            "(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
        ],
        "enabled": true
    },
    {
        "label": "placeholder-src",
        "name": ":placeholder-src",
        "type": "String",
        "desc": "While waiting for your image to load, you can use a placeholder image",
        "category": "model",
        "examples": [
            "(public folder) src=\"img/some-placeholder.png\"",
            "(assets folder) src=\"~assets/my-placeholder.gif\"",
            "(relative path format) :src=\"require('./placeholder.jpg')\"",
            "(URL) src=\"https://placeimg.com/500/300/nature\""
        ],
        "enabled": true
    },
    {
        "label": "initial-ratio",
        "name": ":initial-ratio",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Use it when not specifying 'ratio' but still wanting an initial aspect ratio",
        "category": "style",
        "examples": [
            "(Number format) :initial-ratio=\"16/9\"",
            "(String format) initial-ratio=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "width",
        "name": ":width",
        "type": "String",
        "desc": "Forces image width; Must also include the unit (px or %)",
        "category": "style",
        "examples": [
            "280px",
            "70%"
        ],
        "enabled": true
    },
    {
        "label": "height",
        "name": ":height",
        "type": "String",
        "desc": "Forces image height; Must also include the unit (px or %)",
        "category": "style",
        "examples": [
            "280px",
            "70%"
        ],
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "String",
        "desc": "Lazy or immediate load; Same syntax as <img> loading attribute",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "crossorigin",
        "name": ":crossorigin",
        "type": "String",
        "desc": "Same syntax as <img> crossorigin attribute",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "decoding",
        "name": ":decoding",
        "type": "String",
        "desc": "Same syntax as <img> decoding attribute",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "referrerpolicy",
        "name": ":referrerpolicy",
        "type": "String",
        "desc": "Same syntax as <img> referrerpolicy attribute",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "fetchpriority",
        "name": ":fetchpriority",
        "type": "String",
        "desc": "Provides a hint of the relative priority to use when fetching the image",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "fit",
        "name": ":fit",
        "type": "String",
        "desc": "How the image will fit into the container; Equivalent of the object-fit prop; Can be coordinated with 'position' prop",
        "category": "style",
        "enabled": true
    },
    {
        "label": "position",
        "name": ":position",
        "type": "String",
        "desc": "The alignment of the image into the container; Equivalent of the object-position CSS prop",
        "category": "style",
        "examples": [
            "0 0",
            "20px 50px"
        ],
        "enabled": true
    },
    {
        "label": "alt",
        "name": ":alt",
        "type": "String",
        "desc": "Specifies an alternate text for the image, if the image cannot be displayed",
        "category": "content",
        "examples": [
            "Two cats"
        ],
        "enabled": true
    },
    {
        "label": "draggable",
        "name": ":draggable",
        "type": "Boolean",
        "desc": "Adds the native 'draggable' attribute",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "img-class",
        "name": ":img-class",
        "type": "String",
        "desc": "CSS classes to be attributed to the native img element",
        "category": "style",
        "examples": [
            "my-special-class"
        ],
        "enabled": true
    },
    {
        "label": "img-style",
        "name": ":img-style",
        "type": "Object",
        "desc": "Apply CSS to the native img element",
        "category": "style",
        "examples": [
            ":img-style=\"{ transform: 'rotate(45deg)' }\" "
        ],
        "enabled": true
    },
    {
        "label": "spinner-color",
        "name": ":spinner-color",
        "type": "String",
        "desc": "Color name for default Spinner (unless using a 'loading' slot)",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "spinner-size",
        "name": ":spinner-size",
        "type": "String",
        "desc": "Size in CSS units, including unit name, for default Spinner (unless using a 'loading' slot)",
        "category": "style",
        "examples": [
            "16px",
            "2rem"
        ],
        "enabled": true
    },
    {
        "label": "no-spinner",
        "name": ":no-spinner",
        "type": "Boolean",
        "desc": "Do not display the default spinner while waiting for the image to be loaded; It is overriden by the 'loading' slot when one is present",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "no-native-menu",
        "name": ":no-native-menu",
        "type": "Boolean",
        "desc": "Disables the native context menu for the image",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "no-transition",
        "name": ":no-transition",
        "type": "Boolean",
        "desc": "Disable default transition when switching between old and new image",
        "category": "behavior",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('img', { label: 'Image', content: '<q-img />', media: '<img src="images/icons/components/ui_components/img.png" class="blockIcon" />', category: 'Multimedia' });
    }    

    
    const customblock_quasar_video = editor => {
        editor.DomComponents.addType("video", {
            isComponent: el => {
                if (el.tagName == 'Q-VIDEO') {
                    return { type: 'video' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "ratio",
        "name": ":ratio",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Aspect ratio for the content; If value is a String, then avoid using a computational statement (like '16/9') and instead specify the String value of the result directly (eg. '1.7777')",
        "category": "style",
        "examples": [
            ":ratio=\"4/3\"",
            ":ratio=\"16/9\"",
            "ratio=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "src",
        "name": ":src",
        "type": "String",
        "desc": "The source url to display in an iframe",
        "category": "model",
        "examples": [
            "https://www.youtube.com/embed/k3_tw44QsZQ"
        ],
        "enabled": true
    },
    {
        "label": "title",
        "name": ":title",
        "type": "String",
        "desc": "(Accessibility) Set the native 'title' attribute value of the inner iframe being used",
        "category": "accessibility",
        "examples": [
            "My Daily Marathon"
        ],
        "enabled": true
    },
    {
        "label": "fetchpriority",
        "name": ":fetchpriority",
        "type": "String",
        "desc": "Provides a hint of the relative priority to use when fetching the iframe document",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "String",
        "desc": "Indicates how the browser should load the iframe",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "referrerpolicy",
        "name": ":referrerpolicy",
        "type": "String",
        "desc": "Indicates which referrer to send when fetching the frame's resource",
        "category": "behavior",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('video', { label: 'Video', content: '<q-video />', media: '<img src="images/icons/components/ui_components/video.png" class="blockIcon" />', category: 'Multimedia' });
    }    

    
    const customblock_quasar_avatar = editor => {
        editor.DomComponents.addType("avatar", {
            isComponent: el => {
                if (el.tagName == 'Q-AVATAR') {
                    return { type: 'avatar' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "font-size",
        "name": ":font-size",
        "type": "String",
        "desc": "The size in CSS units, including unit name, of the content (icon, text)",
        "category": "style",
        "examples": [
            "18px",
            "2rem"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Removes border-radius so borders are squared",
        "category": "style",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Applies a small standard border-radius for a squared shape of the component",
        "category": "style",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('avatar', { label: 'Avatar', content: '<q-avatar />', media: '<img src="images/icons/components/ui_components/avatar.png" class="blockIcon" />', category: 'Other' });
    }    

    
    const customblock_quasar_badge = editor => {
        editor.DomComponents.addType("badge", {
            isComponent: el => {
                if (el.tagName == 'Q-BADGE') {
                    return { type: 'badge' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "floating",
        "name": ":floating",
        "type": "Boolean",
        "desc": "Tell QBadge if it should float to the top right side of the relative positioned parent element or not",
        "category": "content",
        "enabled": true
    },
    {
        "label": "transparent",
        "name": ":transparent",
        "type": "Boolean",
        "desc": "Applies a 0.8 opacity; Useful especially for floating QBadge",
        "category": "style",
        "enabled": true
    },
    {
        "label": "multi-line",
        "name": ":multi-line",
        "type": "Boolean",
        "desc": "Content can wrap to multiple lines",
        "category": "content",
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Badge's content as string; overrides default slot if specified",
        "category": "content",
        "examples": [
            "John Doe",
            22
        ],
        "enabled": true
    },
    {
        "label": "align",
        "name": ":align",
        "type": "String",
        "desc": "Sets vertical-align CSS prop",
        "category": "content",
        "enabled": true
    },
    {
        "label": "outline",
        "name": ":outline",
        "type": "Boolean",
        "desc": "Use 'outline' design (colored text and borders only)",
        "category": "style",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Makes a rounded shaped badge",
        "category": "style",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('badge', { label: 'Badge', content: '<q-badge />', media: '<img src="images/icons/components/ui_components/badge.png" class="blockIcon" />', category: 'Other' });
    }    

    
    const customblock_quasar_banner = editor => {
        editor.DomComponents.addType("banner", {
            isComponent: el => {
                if (el.tagName == 'Q-BANNER') {
                    return { type: 'banner' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "inline-actions",
        "name": ":inline-actions",
        "type": "Boolean",
        "desc": "Display actions on same row as content",
        "category": "content",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "Boolean",
        "desc": "Applies a small standard border-radius for a squared shape of the component",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('banner', { label: 'Banner', content: '<q-banner />', media: '<img src="images/icons/components/ui_components/banner.png" class="blockIcon" />', category: 'Widgets' });
    }

    const customblock_quasar_card = editor => {
        editor.DomComponents.addType("card", {
            isComponent: el => {
                if (el.tagName == 'Q-CARD') {
                    return { type: 'card' }
                }
            },
            model: {
                defaults: {
                    traits: [
                        {
                            "label": "Data Binding",
                            "name": "v-model",
                            "type": "select",
                            "options": []
                        },
                        {
                            "label": "tag",
                            "name": ":tag",
                            "type": "String",
                            "desc": "HTML tag to render",
                            "category": "content",
                            "examples": [
                                "div",
                                "section",
                                "article",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "dark",
                            "name": ":dark",
                            "type": "Boolean",
                            "desc": "Notify the component that the background is a dark color",
                            "category": "style",
                            "enabled": true
                        },
                        {
                            "label": "square",
                            "name": ":square",
                            "type": "Boolean",
                            "desc": "Removes border-radius so borders are squared",
                            "category": "style",
                            "enabled": true
                        },
                        {
                            "label": "flat",
                            "name": ":flat",
                            "type": "Boolean",
                            "desc": "Applies a 'flat' design (no default shadow)",
                            "category": "style",
                            "enabled": true
                        },
                        {
                            "label": "bordered",
                            "name": ":bordered",
                            "type": "Boolean",
                            "desc": "Applies a default border to the component",
                            "category": "style",
                            "enabled": true
                        },
                    ],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('card', { label: 'Card', content: '<q-card />', media: '<img src="images/icons/components/ui_components/card.png" class="blockIcon" />', category: 'Widgets' });
    }    

    const customblock_quasar_cardsection = editor => {
        editor.DomComponents.addType("cardsection", {
            isComponent: el => {
                if (el.tagName == 'Q-CARD-SECTION') {
                    return { type: 'cardsection' }
                }
            },
            model: {
                defaults: {
                    traits: [
                        {
                            "label": "Data Binding",
                            "name": "v-model",
                            "type": "select",
                            "options": []
                        },
                        {
                            "label": "tag",
                            "name": ":tag",
                            "type": "String",
                            "desc": "HTML tag to render",
                            "examples": [
                                "div",
                                "section",
                            ],
                            "enabled": true
                        },
                        {
                            "label": "horizontal",
                            "name": ":horizontal",
                            "type": "Boolean",
                            "desc": "Display a horizontal section (will have no padding and can contain other QCardSection)",
                            "category": "content",
                            "enabled": true
                        }
                    ],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('cardsection', { label: 'Card Section', content: '<q-card-section />', media: '<img src="images/icons/components/ui_components/card.png" class="blockIcon" />', category: 'Widgets' });
    }    
    
    const customblock_quasar_chip = editor => {
        editor.DomComponents.addType("chip", {
            isComponent: el => {
                if (el.tagName == 'Q-CHIP') {
                    return { type: 'chip' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "QChip size name or a CSS unit including unit name",
        "category": "style",
        "examples": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
            "25px",
            "2rem"
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-right",
        "name": ":icon-right",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-remove",
        "name": ":icon-remove",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-selected",
        "name": ":icon-selected",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": [
            "String",
            "Number"
        ],
        "desc": "Chip's content as string; overrides default slot if specified",
        "category": "content",
        "examples": [
            "John Doe",
            "Book"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Boolean",
        "desc": "Model of the component determining if QChip should be rendered or not",
        "category": "model",
        "enabled": true
    },
    {
        "label": "selected",
        "name": ":selected",
        "type": "Boolean",
        "desc": "Model for QChip if it's selected or not",
        "category": "model",
        "examples": [
            "v-model:selected=\"myState\""
        ],
        "enabled": true
    },
    {
        "label": "square",
        "name": ":square",
        "type": "Boolean",
        "desc": "Sets a low value for border-radius instead of the default one, making it close to a square",
        "category": "style",
        "enabled": true
    },
    {
        "label": "outline",
        "name": ":outline",
        "type": "Boolean",
        "desc": "Display using the 'outline' design",
        "category": "style",
        "enabled": true
    },
    {
        "label": "clickable",
        "name": ":clickable",
        "type": "Boolean",
        "desc": "Is QChip clickable? If it's the case, then it will add hover effects and emit 'click' events",
        "category": "state",
        "enabled": true
    },
    {
        "label": "removable",
        "name": ":removable",
        "type": "Boolean",
        "desc": "If set, then it displays a 'remove' icon that when clicked the QChip emits 'remove' event",
        "category": "state",
        "enabled": true
    },
    {
        "label": "ripple",
        "name": ":ripple",
        "type": [
            "Boolean",
            "Object"
        ],
        "desc": "Configure material ripple (disable it by setting it to 'false' or supply a config object)",
        "category": "style",
        "examples": [
            false,
            "{ early: true, center: true, color: 'teal', keyCodes: [] }"
        ],
        "enabled": true
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Tabindex HTML attribute value",
        "category": "general",
        "examples": [
            "0",
            "100"
        ],
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('chip', { label: 'Chip', content: '<q-chip />', media: '<img src="images/icons/components/ui_components/chip.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_icon = editor => {
        editor.DomComponents.addType("icon", {
            isComponent: el => {
                if (el.tagName == 'Q-ICON') {
                    return { type: 'icon' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "String",
        "desc": "HTML tag to render, unless no icon is supplied or it's an svg icon",
        "category": "content",
        "examples": [
            "div",
            "span",
            "div",
            "i"
        ],
        "enabled": true
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "model",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "left",
        "name": ":left",
        "type": "Boolean",
        "desc": "Useful if icon is on the left side of something: applies a standard margin on the right side of Icon",
        "category": "content",
        "enabled": true
    },
    {
        "label": "right",
        "name": ":right",
        "type": "Boolean",
        "desc": "Useful if icon is on the right side of something: applies a standard margin on the left side of Icon",
        "category": "content",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('icon', { label: 'Icon', content: '<q-icon />', media: '<img src="images/icons/components/ui_components/icon.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_rating = editor => {
        editor.DomComponents.addType("rating", {
            isComponent: el => {
                if (el.tagName == 'Q-RATING') {
                    return { type: 'rating' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "String",
        "desc": "Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL",
        "category": "behavior",
        "examples": [
            "car_id"
        ],
        "enabled": true
    },
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Number",
        "desc": "Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive",
        "category": "model",
        "examples": [
            "v-model=\"rating\"",
            ":model-value=\"rating\"",
            ":model-value=\"2\""
        ],
        "enabled": true
    },
    {
        "label": "max",
        "name": ":max",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Number of icons to display",
        "category": "general",
        "examples": [
            "3",
            ":max=\"5\""
        ],
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-selected",
        "name": ":icon-selected",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Icon name following Quasar convention to be used when selected (optional); make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "icon-half",
        "name": ":icon-half",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Icon name following Quasar convention to be used when selected (optional); make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Color name for component from the Quasar Color Palette; v1.5.0+: If an array is provided each rating value will use the corresponding color in the array (0 based)",
        "category": "style",
        "examples": [
            "primary",
            "teal-10",
            "primary",
            "teal-10",
            "[\"accent\", \"grey-7\"] "
        ],
        "enabled": true
    },
    {
        "label": "color-selected",
        "name": ":color-selected",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Color name from the Quasar Palette for selected icons",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "color-half",
        "name": ":color-half",
        "type": [
            "String",
            "Array"
        ],
        "desc": "Color name from the Quasar Palette for half selected icons",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "no-dimming",
        "name": ":no-dimming",
        "type": "Boolean",
        "desc": "Does not lower opacity for unselected icons",
        "category": "style",
        "enabled": true
    },
    {
        "label": "no-reset",
        "name": ":no-reset",
        "type": "Boolean",
        "desc": "When used, disables default behavior of clicking/tapping on icon which represents current model value to reset model to 0",
        "category": "model",
        "enabled": true
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "Boolean",
        "desc": "Put component in readonly mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('rating', { label: 'Rating', content: '<q-rating />', media: '<img src="images/icons/components/ui_components/rating.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_spinner = editor => {
        editor.DomComponents.addType("spinner", {
            isComponent: el => {
                if (el.tagName == 'Q-SPINNER') {
                    return { type: 'spinner' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "size",
        "name": ":size",
        "type": "String",
        "desc": "Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)",
        "category": "style",
        "examples": [
            "16px",
            "2rem",
            "xs",
            "md"
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "thickness",
        "name": ":thickness",
        "type": "Number",
        "desc": "Override value to use for stroke-width",
        "category": "style",
        "examples": [
            "2",
            "5"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('spinner', { label: 'Spinner', content: '<q-spinner />', media: '<img src="images/icons/components/ui_components/spinner.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_tree = editor => {
        editor.DomComponents.addType("tree", {
            isComponent: el => {
                if (el.tagName == 'Q-TREE') {
                    return { type: 'tree' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "nodes",
        "name": ":nodes",
        "type": "Array",
        "desc": "The array of nodes that designates the tree structure",
        "category": "content",
        "examples": [
            "[ {...}, {...} ]"
        ],
        "enabled": true
    },
    {
        "label": "node-key",
        "name": ":node-key",
        "type": "String",
        "desc": "The property name of each node object that holds a unique node id",
        "category": "content",
        "examples": [
            "key",
            "id"
        ],
        "enabled": true
    },
    {
        "label": "label-key",
        "name": ":label-key",
        "type": "String",
        "desc": "The property name of each node object that holds the label of the node",
        "category": "content",
        "examples": [
            "name",
            "description"
        ],
        "enabled": true
    },
    {
        "label": "children-key",
        "name": ":children-key",
        "type": "String",
        "desc": "The property name of each node object that holds the list of children of the node",
        "category": "content",
        "examples": [
            "roles",
            "relatives"
        ],
        "enabled": true
    },
    {
        "label": "no-connectors",
        "name": ":no-connectors",
        "type": "Boolean",
        "desc": "Do not display the connector lines between nodes",
        "category": "style",
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "control-color",
        "name": ":control-color",
        "type": "String",
        "desc": "Color name for controls (like checkboxes) from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "String",
        "desc": "Overrides text color (if needed); Color name from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "selected-color",
        "name": ":selected-color",
        "type": "String",
        "desc": "Color name for selected nodes (from the Quasar Color Palette)",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "tick-strategy",
        "name": ":tick-strategy",
        "type": "String",
        "desc": "The type of strategy to use for the selection of the nodes",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "ticked",
        "name": ":ticked",
        "type": "Array",
        "desc": "Keys of nodes that are ticked",
        "category": "state",
        "examples": [
            "v-model:ticked=\"tickedKeys\""
        ],
        "enabled": true
    },
    {
        "label": "expanded",
        "name": ":expanded",
        "type": "Array",
        "desc": "Keys of nodes that are expanded",
        "category": "state",
        "examples": [
            "v-model:expanded=\"expandedKeys\""
        ],
        "enabled": true
    },
    {
        "label": "selected",
        "name": ":selected",
        "type": "Any",
        "desc": "Key of node currently selected",
        "category": "state",
        "examples": [
            "v-model:selected=\"selectedKey\""
        ],
        "enabled": true
    },
    {
        "label": "no-selection-unset",
        "name": ":no-selection-unset",
        "type": "Boolean",
        "desc": "Do not allow un-selection when clicking currently selected node",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "default-expand-all",
        "name": ":default-expand-all",
        "type": "Boolean",
        "desc": "Allow the tree to have all its branches expanded, when first rendered",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "accordion",
        "name": ":accordion",
        "type": "Boolean",
        "desc": "Allows the tree to be set in accordion mode",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "filter",
        "name": ":filter",
        "type": "String",
        "desc": "The text value to be used for filtering nodes",
        "category": "filter",
        "examples": [
            ":filter=\"searchText\""
        ],
        "enabled": true
    },
    {
        "label": "filter-method",
        "name": ":filter-method",
        "type": "Function",
        "desc": "The function to use to filter the tree nodes; For best performance, reference it from your scope and do not define it inline",
        "category": "filter",
        "enabled": true
    },
    {
        "label": "duration",
        "name": ":duration",
        "type": "Number",
        "desc": "Toggle animation duration (in milliseconds)",
        "category": "style",
        "examples": [
            ":duration=\"500\""
        ],
        "enabled": true
    },
    {
        "label": "no-nodes-label",
        "name": ":no-nodes-label",
        "type": "String",
        "desc": "Override default such label for when no nodes are available",
        "category": "content",
        "examples": [
            "No nodes to show!"
        ],
        "enabled": true
    },
    {
        "label": "no-results-label",
        "name": ":no-results-label",
        "type": "String",
        "desc": "Override default such label for when no nodes are available due to filtering",
        "category": "content",
        "examples": [
            "No results"
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('tree', { label: 'Tree', content: '<q-tree />', media: '<img src="images/icons/components/ui_components/tree.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_popup_proxy = editor => {
        editor.DomComponents.addType("popup_proxy", {
            isComponent: el => {
                if (el.tagName == 'Q-POPUP-PROXY') {
                    return { type: 'popup_proxy' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "target",
        "name": ":target",
        "type": [
            "Boolean",
            "String",
            "Element"
        ],
        "desc": "Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) or a DOM element it attaches the events to the specified DOM element (if it exists)",
        "category": "behavior",
        "examples": [
            ":target=\"false\"",
            ":target=\"$refs.target\"",
            "target=\".my-parent\"",
            "target=\"#target-id\""
        ],
        "enabled": true
    },
    {
        "label": "no-parent-event",
        "name": ":no-parent-event",
        "type": "Boolean",
        "desc": "Skips attaching events to the target DOM element (that trigger the element to get shown)",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "context-menu",
        "name": ":context-menu",
        "type": "Boolean",
        "desc": "Allows the component to behave like a context menu, which opens with a right mouse click (or long tap on mobile)",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Boolean",
        "desc": "Defines the state of the component (shown/hidden); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "enabled": true
    },
    {
        "label": "breakpoint",
        "name": ":breakpoint",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Breakpoint (in pixels) of window width/height (whichever is smaller) from where a Menu will get to be used instead of a Dialog",
        "category": "behavior",
        "examples": [
            992,
            ":breakpoint=\"1024\""
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('popup_proxy', { label: 'Popup Proxy', content: '<q-popup-proxy />', media: '<img src="images/icons/components/ui_components/popup-proxy.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_timeline = editor => {
        editor.DomComponents.addType("timeline", {
            isComponent: el => {
                if (el.tagName == 'Q-TIMELINE') {
                    return { type: 'timeline' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "side",
        "name": ":side",
        "type": "String",
        "desc": "Side to place the timeline entries in dense and comfortable layout; For loose layout it gets overridden by QTimelineEntry side prop",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "layout",
        "name": ":layout",
        "type": "String",
        "desc": "Layout of the timeline. Dense keeps content and labels on one side. Comfortable keeps content on one side and labels on the opposite side. Loose puts content on both sides.",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('timeline', { label: 'Timeline', content: '<q-timeline />', media: '<img src="images/icons/components/ui_components/timeline.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_timeline_entry = editor => {
        editor.DomComponents.addType("timeline_entry", {
            isComponent: el => {
                if (el.tagName == 'Q-TIMELINE-ENTRY') {
                    return { type: 'timeline_entry' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "heading",
        "name": ":heading",
        "type": "Boolean",
        "desc": "Defines a heading timeline item",
        "category": "content",
        "enabled": true
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "String",
        "desc": "Tag to use, if of type 'heading' only",
        "category": "content",
        "examples": [
            "div",
            "span",
            "h1"
        ],
        "enabled": true
    },
    {
        "label": "side",
        "name": ":side",
        "type": "String",
        "desc": "Side to place the timeline entry; Works only if QTimeline layout is loose.",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "avatar",
        "name": ":avatar",
        "type": "String",
        "desc": "URL to the avatar image; Icon takes precedence if used, so it replaces avatar",
        "category": "content",
        "examples": [
            "(public folder) src=\"img/my-bg.png\"",
            "(assets folder) src=\"~assets/my-img.png\"",
            "(relative path format) :src=\"require('./my_img.jpg')\"",
            "(URL) src=\"https://placeimg.com/500/300/nature\""
        ],
        "enabled": true
    },
    {
        "label": "color",
        "name": ":color",
        "type": "String",
        "desc": "Color name for component from the Quasar Color Palette",
        "category": "style",
        "examples": [
            "primary",
            "teal-10"
        ],
        "enabled": true
    },
    {
        "label": "title",
        "name": ":title",
        "type": "String",
        "desc": "Title of timeline entry; Is overridden if using 'title' slot",
        "category": "content",
        "examples": [
            "December party"
        ],
        "enabled": true
    },
    {
        "label": "subtitle",
        "name": ":subtitle",
        "type": "String",
        "desc": "Subtitle of timeline entry; Is overridden if using 'subtitle' slot",
        "category": "content",
        "examples": [
            "All invited"
        ],
        "enabled": true
    },
    {
        "label": "body",
        "name": ":body",
        "type": "String",
        "desc": "Body content of timeline entry; Use this prop or the default slot",
        "category": "content",
        "examples": [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('timeline_entry', { label: 'Timeline Entry', content: '<q-timeline-entry />', media: '<img src="images/icons/components/ui_components/timeline-entry.png" class="blockIcon" />', category: 'Widgets' });
    }    

    
    const customblock_quasar_expansion_item = editor => {
        editor.DomComponents.addType("expansion_item", {
            isComponent: el => {
                if (el.tagName == 'Q-EXPANSION-ITEM') {
                    return { type: 'expansion_item' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Data Binding",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "to",
        "name": ":to",
        "type": [
            "String",
            "Object"
        ],
        "desc": "Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "/home/dashboard",
            ":to=\"{ name: 'my-route-name' }\""
        ],
        "enabled": true
    },
    {
        "label": "exact",
        "name": ":exact",
        "type": "Boolean",
        "desc": "Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "enabled": true
    },
    {
        "label": "replace",
        "name": ":replace",
        "type": "Boolean",
        "desc": "Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "enabled": true
    },
    {
        "label": "active-class",
        "name": ":active-class",
        "type": "String",
        "desc": "Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "my-active-class"
        ],
        "enabled": true
    },
    {
        "label": "exact-active-class",
        "name": ":exact-active-class",
        "type": "String",
        "desc": "Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used",
        "category": "navigation",
        "examples": [
            "my-exact-active-class"
        ],
        "enabled": true
    },
    {
        "label": "href",
        "name": ":href",
        "type": "String",
        "desc": "Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props",
        "category": "navigation",
        "examples": [
            "https://quasar.dev"
        ],
        "enabled": true
    },
    {
        "label": "target",
        "name": ":target",
        "type": "String",
        "desc": "Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props",
        "category": "navigation",
        "examples": [
            "_blank",
            "_self",
            "_parent",
            "_top"
        ],
        "enabled": true
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "Boolean",
        "desc": "Put component in disabled mode",
        "category": "state",
        "enabled": true
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "Boolean",
        "desc": "Model of the component defining 'open' state; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive",
        "category": "model",
        "enabled": true
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "expand-icon",
        "name": ":expand-icon",
        "type": "String",
        "desc": "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "expanded-icon",
        "name": ":expanded-icon",
        "type": "String",
        "desc": "Expand icon name (following Quasar convention) for when QExpansionItem is expanded; When used, it also disables the rotation animation of the expand icon; Make sure you have the icon library installed unless you are using 'img:' prefix",
        "category": "content",
        "examples": [
            "map",
            "ion-add",
            "img:https://cdn.quasar.dev/logo-v2/svg/logo.svg",
            "img:path/to/some_image.png"
        ],
        "enabled": true
    },
    {
        "label": "expand-icon-class",
        "name": ":expand-icon-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Apply custom class(es) to the expand icon item section",
        "category": "style",
        "examples": [
            "text-purple"
        ],
        "enabled": true
    },
    {
        "label": "label",
        "name": ":label",
        "type": "String",
        "desc": "Header label (unless using 'header' slot)",
        "category": "content",
        "examples": [
            "My expansion item"
        ],
        "enabled": true
    },
    {
        "label": "label-lines",
        "name": ":label-lines",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!",
        "category": "content",
        "examples": [
            "1",
            "3",
            ":label-lines=\"2\""
        ],
        "enabled": true
    },
    {
        "label": "caption",
        "name": ":caption",
        "type": "String",
        "desc": "Header sub-label (unless using 'header' slot)",
        "category": "content",
        "examples": [
            "Unread message: 5"
        ],
        "enabled": true
    },
    {
        "label": "caption-lines",
        "name": ":caption-lines",
        "type": [
            "Number",
            "String"
        ],
        "desc": "Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!",
        "category": "content",
        "examples": [
            "1",
            "3",
            ":caption-lines=\"2\""
        ],
        "enabled": true
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "Boolean",
        "desc": "Notify the component that the background is a dark color",
        "category": "style",
        "enabled": true
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "Boolean",
        "desc": "Dense mode; occupies less space",
        "category": "style",
        "enabled": true
    },
    {
        "label": "duration",
        "name": ":duration",
        "type": "Number",
        "desc": "Animation duration (in milliseconds)",
        "category": "behavior",
        "examples": [
            ":duration=\"1000\""
        ],
        "enabled": true
    },
    {
        "label": "header-inset-level",
        "name": ":header-inset-level",
        "type": "Number",
        "desc": "Apply an inset to header (unless using 'header' slot); Useful when header avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu",
        "category": "content",
        "examples": [
            ":header-inset-level=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "content-inset-level",
        "name": ":content-inset-level",
        "type": "Number",
        "desc": "Apply an inset to content (changes content padding)",
        "category": "content",
        "examples": [
            ":content-inset-level=\"1\""
        ],
        "enabled": true
    },
    {
        "label": "expand-separator",
        "name": ":expand-separator",
        "type": "Boolean",
        "desc": "Apply a top and bottom separator when expansion item is opened",
        "category": "content",
        "enabled": true
    },
    {
        "label": "default-opened",
        "name": ":default-opened",
        "type": "Boolean",
        "desc": "Puts expansion item into open state on initial render; Overridden by v-model if used",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "expand-icon-toggle",
        "name": ":expand-icon-toggle",
        "type": "Boolean",
        "desc": "Applies the expansion events to the expand icon only and not to the whole header",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "switch-toggle-side",
        "name": ":switch-toggle-side",
        "type": "Boolean",
        "desc": "Switch expand icon side (from default 'right' to 'left')",
        "category": "content",
        "enabled": true
    },
    {
        "label": "dense-toggle",
        "name": ":dense-toggle",
        "type": "Boolean",
        "desc": "Use dense mode for expand icon",
        "category": "style",
        "enabled": true
    },
    {
        "label": "group",
        "name": ":group",
        "type": "String",
        "desc": "Register expansion item into a group (unique name that must be applied to all expansion items in that group) for coordinated open/close state within the group a.k.a. 'accordion mode'",
        "category": "content|behavior",
        "examples": [
            "my-emails"
        ],
        "enabled": true
    },
    {
        "label": "popup",
        "name": ":popup",
        "type": "Boolean",
        "desc": "Put expansion list into 'popup' mode",
        "category": "behavior",
        "enabled": true
    },
    {
        "label": "header-style",
        "name": ":header-style",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Apply custom style to the header",
        "category": "style",
        "examples": [
            "background: '#ff0000'",
            ":header-style=\"{ backgroundColor: '#ff0000' }\""
        ],
        "enabled": true
    },
    {
        "label": "header-class",
        "name": ":header-class",
        "type": [
            "String",
            "Array",
            "Object"
        ],
        "desc": "Apply custom class(es) to the header",
        "category": "style",
        "examples": [
            "my-custom-class",
            ":header-class=\"{ 'my-custom-class': someCondition }\""
        ],
        "enabled": true
    }
],
                },
                init() {
                    this.on('change:attributes', this.handleAttrChange);
                },
                handleAttrChange() {
                    this.render();
                },
                render: function () {
                    this.view.onRender();
                },
                updateGenieModelProperties(properties) {
                    var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                    vtextTrait.set('options', properties);
                }
            },
            view: {
                onRender() {
                    
                }
            },
        });
        editor.BlockManager.add('expansion_item', { label: 'Expansion Item', content: '<q-expansion-item />', media: '<img src="images/icons/components/ui_components/expansion_item.png" class="blockIcon" />', category: 'Other' });
    }    

    