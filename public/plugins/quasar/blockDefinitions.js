
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "font-size",
        "name": ":font-size",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "square",
        "name": ":square",
        "type": "text"
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/avatar.png" />' );
                }
            },
        });
        editor.BlockManager.add('avatar', { label: 'avatar', content: '<q-avatar />', media: '<img src="images/icons/components/ui_components/avatar.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "text"
    },
    {
        "label": "floating",
        "name": ":floating",
        "type": "text"
    },
    {
        "label": "transparent",
        "name": ":transparent",
        "type": "text"
    },
    {
        "label": "multi-line",
        "name": ":multi-line",
        "type": "text"
    },
    {
        "label": "label",
        "name": ":label",
        "type": "text"
    },
    {
        "label": "align",
        "name": ":align",
        "type": "text"
    },
    {
        "label": "outline",
        "name": ":outline",
        "type": "text"
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/badge.png" />' );
                }
            },
        });
        editor.BlockManager.add('badge', { label: 'badge', content: '<q-badge />', media: '<img src="images/icons/components/ui_components/badge.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "inline-actions",
        "name": ":inline-actions",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "rounded",
        "name": ":rounded",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/banner.png" />' );
                }
            },
        });
        editor.BlockManager.add('banner', { label: 'banner', content: '<q-banner />', media: '<img src="images/icons/components/ui_components/banner.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_button_dropdown = editor => {
        editor.DomComponents.addType("button-dropdown", {
            isComponent: el => {
                if (el.tagName == 'Q-BUTTON-DROPDOWN') {
                    return { type: 'button-dropdown' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Reactive Model",
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/button-dropdown.png" />' );
                }
            },
        });
        editor.BlockManager.add('button-dropdown', { label: 'button-dropdown', content: '<q-button-dropdown />', media: '<img src="images/icons/components/ui_components/button-dropdown.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_button_group = editor => {
        editor.DomComponents.addType("button-group", {
            isComponent: el => {
                if (el.tagName == 'Q-BUTTON-GROUP') {
                    return { type: 'button-group' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Reactive Model",
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/button-group.png" />' );
                }
            },
        });
        editor.BlockManager.add('button-group', { label: 'button-group', content: '<q-button-group />', media: '<img src="images/icons/components/ui_components/button-group.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_button = editor => {
        editor.DomComponents.addType( "Button", {
            isComponent: el => {
              if( el.tagName == 'Q-BTN' ){
                return { type: 'Button'}
              }
            },
            model: {
              defaults: { 
                traits: [ 
                  { label: 'On Click', name: 'v-on:click', type:'text' },                     
                  { label: 'Label', name: 'label', type:'text' },                     
                  { label: 'Size', name: 'size', type:'text' }, 
                  { label: 'Outline', name: 'outline', type:'checkbox' }, 
                  { label: 'Flat', name: 'flat', type:'checkbox' }, 
                  { label: 'Unelevated', name: 'unelevated', type:'checkbox' }, 
                  { label: 'Rounded', name: 'rounded', type:'checkbox' }, 
                  { label: 'Push', name: 'push', type:'checkbox' }, 
                  { label: 'Glossy', name: 'glossy', type:'checkbox' }, 
                  { label: 'Fab', name: 'fab', type:'checkbox' }, 
                  { label: 'Fab-mini', name: 'fab-mini', type:'checkbox' }, 
                  { label: 'Padding', name: 'padding', type:'text' }, 
                  { label: 'Color', name: 'color', type:'text' }, 
                  { label: 'Text-color', name: 'text-color', type:'text' }, 
                  { label: 'Dense', name: 'dense', type:'checkbox' }, 
                  { label: 'Ripple', name: 'ripple', type:'text' }, 
                  { label: 'Round', name: 'round', type:'checkbox' }             
                ], 
              },
              init() {  
                this.on('change:attributes', this.handleAttrChange);
              },
              handleAttrChange() {
                this.render();
              },
              render: function(){
                this.view.onRender();
              },
              updateGenieModelProperties(properties){
                //var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
                //vtextTrait.set('options', properties );
              }
            }, 
            view: {
              onRender(){
                const { $el, model } = this;
                const bindTextTraitValue = model.getAttributes()['v-model']
                $el.empty();
                $el.append( `
                <img src="images/icons/components/ui_components/button.png" />` );
              }
            },
          });
          editor.BlockManager.add( 'Button', { label: 'Button', content: `<q-btn label="Button"/>`, media: `<img src="images/icons/components/ui_components/button.png" class="blockIcon"/>`, category: 'Quasar'   }); 
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "icon-right",
        "name": ":icon-right",
        "type": "text"
    },
    {
        "label": "icon-remove",
        "name": ":icon-remove",
        "type": "text"
    },
    {
        "label": "icon-selected",
        "name": ":icon-selected",
        "type": "text"
    },
    {
        "label": "label",
        "name": ":label",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "selected",
        "name": ":selected",
        "type": "text"
    },
    {
        "label": "square",
        "name": ":square",
        "type": "text"
    },
    {
        "label": "outline",
        "name": ":outline",
        "type": "text"
    },
    {
        "label": "clickable",
        "name": ":clickable",
        "type": "text"
    },
    {
        "label": "removable",
        "name": ":removable",
        "type": "text"
    },
    {
        "label": "ripple",
        "name": ":ripple",
        "type": "text"
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/chip.png" />' );
                }
            },
        });
        editor.BlockManager.add('chip', { label: 'chip', content: '<q-chip />', media: '<img src="images/icons/components/ui_components/chip.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "fullscreen",
        "name": ":fullscreen",
        "type": "text"
    },
    {
        "label": "no-route-fullscreen-exit",
        "name": ":no-route-fullscreen-exit",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "text"
    },
    {
        "label": "square",
        "name": ":square",
        "type": "text"
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
    },
    {
        "label": "min-height",
        "name": ":min-height",
        "type": "text"
    },
    {
        "label": "max-height",
        "name": ":max-height",
        "type": "text"
    },
    {
        "label": "height",
        "name": ":height",
        "type": "text"
    },
    {
        "label": "definitions",
        "name": ":definitions",
        "type": "text"
    },
    {
        "label": "fonts",
        "name": ":fonts",
        "type": "text"
    },
    {
        "label": "toolbar",
        "name": ":toolbar",
        "type": "text"
    },
    {
        "label": "toolbar-color",
        "name": ":toolbar-color",
        "type": "text"
    },
    {
        "label": "toolbar-text-color",
        "name": ":toolbar-text-color",
        "type": "text"
    },
    {
        "label": "toolbar-toggle-color",
        "name": ":toolbar-toggle-color",
        "type": "text"
    },
    {
        "label": "toolbar-bg",
        "name": ":toolbar-bg",
        "type": "text"
    },
    {
        "label": "toolbar-outline",
        "name": ":toolbar-outline",
        "type": "text"
    },
    {
        "label": "toolbar-push",
        "name": ":toolbar-push",
        "type": "text"
    },
    {
        "label": "toolbar-rounded",
        "name": ":toolbar-rounded",
        "type": "text"
    },
    {
        "label": "paragraph-tag",
        "name": ":paragraph-tag",
        "type": "text"
    },
    {
        "label": "content-style",
        "name": ":content-style",
        "type": "text"
    },
    {
        "label": "content-class",
        "name": ":content-class",
        "type": "text"
    },
    {
        "label": "placeholder",
        "name": ":placeholder",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/editor.png" />' );
                }
            },
        });
        editor.BlockManager.add('editor', { label: 'editor', content: '<q-editor />', media: '<img src="images/icons/components/ui_components/editor.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "text"
    },
    {
        "label": "name",
        "name": ":name",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "left",
        "name": ":left",
        "type": "text"
    },
    {
        "label": "right",
        "name": ":right",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/icon.png" />' );
                }
            },
        });
        editor.BlockManager.add('icon', { label: 'icon', content: '<q-icon />', media: '<img src="images/icons/components/ui_components/icon.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "to",
        "name": ":to",
        "type": "text"
    },
    {
        "label": "exact",
        "name": ":exact",
        "type": "text"
    },
    {
        "label": "replace",
        "name": ":replace",
        "type": "text"
    },
    {
        "label": "active-class",
        "name": ":active-class",
        "type": "text"
    },
    {
        "label": "exact-active-class",
        "name": ":exact-active-class",
        "type": "text"
    },
    {
        "label": "href",
        "name": ":href",
        "type": "text"
    },
    {
        "label": "target",
        "name": ":target",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
    },
    {
        "label": "active",
        "name": ":active",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "clickable",
        "name": ":clickable",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "inset-level",
        "name": ":inset-level",
        "type": "text"
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": "text"
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "text"
    },
    {
        "label": "manual-focus",
        "name": ":manual-focus",
        "type": "text"
    },
    {
        "label": "focused",
        "name": ":focused",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/item.png" />' );
                }
            },
        });
        editor.BlockManager.add('item', { label: 'item', content: '<q-item />', media: '<img src="images/icons/components/ui_components/item.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "text"
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "min",
        "name": ":min",
        "type": "text"
    },
    {
        "label": "max",
        "name": ":max",
        "type": "text"
    },
    {
        "label": "inner-min",
        "name": ":inner-min",
        "type": "text"
    },
    {
        "label": "inner-max",
        "name": ":inner-max",
        "type": "text"
    },
    {
        "label": "step",
        "name": ":step",
        "type": "text"
    },
    {
        "label": "reverse",
        "name": ":reverse",
        "type": "text"
    },
    {
        "label": "instant-feedback",
        "name": ":instant-feedback",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "center-color",
        "name": ":center-color",
        "type": "text"
    },
    {
        "label": "track-color",
        "name": ":track-color",
        "type": "text"
    },
    {
        "label": "font-size",
        "name": ":font-size",
        "type": "text"
    },
    {
        "label": "thickness",
        "name": ":thickness",
        "type": "text"
    },
    {
        "label": "angle",
        "name": ":angle",
        "type": "text"
    },
    {
        "label": "show-value",
        "name": ":show-value",
        "type": "text"
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/knob.png" />' );
                }
            },
        });
        editor.BlockManager.add('knob', { label: 'knob', content: '<q-knob />', media: '<img src="images/icons/components/ui_components/knob.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "separator",
        "name": ":separator",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "padding",
        "name": ":padding",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/list.png" />' );
                }
            },
        });
        editor.BlockManager.add('list', { label: 'list', content: '<q-list />', media: '<img src="images/icons/components/ui_components/list.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_popup_proxy = editor => {
        editor.DomComponents.addType("popup-proxy", {
            isComponent: el => {
                if (el.tagName == 'Q-POPUP-PROXY') {
                    return { type: 'popup-proxy' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "target",
        "name": ":target",
        "type": "text"
    },
    {
        "label": "no-parent-event",
        "name": ":no-parent-event",
        "type": "text"
    },
    {
        "label": "context-menu",
        "name": ":context-menu",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "breakpoint",
        "name": ":breakpoint",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/popup-proxy.png" />' );
                }
            },
        });
        editor.BlockManager.add('popup-proxy', { label: 'popup-proxy', content: '<q-popup-proxy />', media: '<img src="images/icons/components/ui_components/popup-proxy.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_radio = editor => {
        editor.DomComponents.addType("Radio", {
            isComponent: el => {
                if (el.tagName == 'Q-RADIO') {
                    return { type: 'Radio' }
                }
            },
            model: {
                defaults: {
                    traits: [
                        {
                            "label": "Reactive Model",
                            "name": "v-model",
                            "type": "select",
                            "options": []
                        },
                        {
                            "label": "name",
                            "name": ":name",
                            "type": "text"
                        },
                        {
                            "label": "size",
                            "name": ":size",
                            "type": "text"
                        },
                        {
                            "label": "model-value",
                            "name": ":model-value",
                            "type": "text"
                        },
                        {
                            "label": "val",
                            "name": ":val",
                            "type": "text"
                        },
                        {
                            "label": "label",
                            "name": ":label",
                            "type": "text"
                        },
                        {
                            "label": "left-label",
                            "name": ":left-label",
                            "type": "text"
                        },
                        {
                            "label": "checked-icon",
                            "name": ":checked-icon",
                            "type": "text"
                        },
                        {
                            "label": "unchecked-icon",
                            "name": ":unchecked-icon",
                            "type": "text"
                        },
                        {
                            "label": "color",
                            "name": ":color",
                            "type": "text"
                        },
                        {
                            "label": "keep-color",
                            "name": ":keep-color",
                            "type": "text"
                        },
                        {
                            "label": "dark",
                            "name": ":dark",
                            "type": "text"
                        },
                        {
                            "label": "dense",
                            "name": ":dense",
                            "type": "text"
                        },
                        {
                            "label": "disable",
                            "name": ":disable",
                            "type": "text"
                        },
                        {
                            "label": "tabindex",
                            "name": ":tabindex",
                            "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/radio.png" />' );
                }
            },
        });
        editor.BlockManager.add('radio', { label: 'radio', content: '<q-radio />', media: '<img src="images/icons/components/ui_components/radio.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "text"
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "max",
        "name": ":max",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "icon-selected",
        "name": ":icon-selected",
        "type": "text"
    },
    {
        "label": "icon-half",
        "name": ":icon-half",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "color-selected",
        "name": ":color-selected",
        "type": "text"
    },
    {
        "label": "color-half",
        "name": ":color-half",
        "type": "text"
    },
    {
        "label": "no-dimming",
        "name": ":no-dimming",
        "type": "text"
    },
    {
        "label": "no-reset",
        "name": ":no-reset",
        "type": "text"
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/rating.png" />' );
                }
            },
        });
        editor.BlockManager.add('rating', { label: 'rating', content: '<q-rating />', media: '<img src="images/icons/components/ui_components/rating.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "spaced",
        "name": ":spaced",
        "type": "text"
    },
    {
        "label": "inset",
        "name": ":inset",
        "type": "text"
    },
    {
        "label": "vertical",
        "name": ":vertical",
        "type": "text"
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/separator.png" />' );
                }
            },
        });
        editor.BlockManager.add('separator', { label: 'separator', content: '<q-separator />', media: '<img src="images/icons/components/ui_components/separator.png" class="blockIcon" />', category: 'Quasar' });
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
                    traits: [
    {
        "label": "Reactive Model",
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/space.png" />' );
                }
            },
        });
        editor.BlockManager.add('space', { label: 'space', content: '<q-space />', media: '<img src="images/icons/components/ui_components/space.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "thickness",
        "name": ":thickness",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/spinner.png" />' );
                }
            },
        });
        editor.BlockManager.add('spinner', { label: 'spinner', content: '<q-spinner />', media: '<img src="images/icons/components/ui_components/spinner.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_time = editor => {
        editor.DomComponents.addType("time", {
            isComponent: el => {
                if (el.tagName == 'Q-TIME') {
                    return { type: 'time' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "text"
    },
    {
        "label": "landscape",
        "name": ":landscape",
        "type": "text"
    },
    {
        "label": "mask",
        "name": ":mask",
        "type": "text"
    },
    {
        "label": "locale",
        "name": ":locale",
        "type": "text"
    },
    {
        "label": "calendar",
        "name": ":calendar",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "square",
        "name": ":square",
        "type": "text"
    },
    {
        "label": "flat",
        "name": ":flat",
        "type": "text"
    },
    {
        "label": "bordered",
        "name": ":bordered",
        "type": "text"
    },
    {
        "label": "readonly",
        "name": ":readonly",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "format24h",
        "name": ":format24h",
        "type": "text"
    },
    {
        "label": "default-date",
        "name": ":default-date",
        "type": "text"
    },
    {
        "label": "options",
        "name": ":options",
        "type": "text"
    },
    {
        "label": "hour-options",
        "name": ":hour-options",
        "type": "text"
    },
    {
        "label": "minute-options",
        "name": ":minute-options",
        "type": "text"
    },
    {
        "label": "second-options",
        "name": ":second-options",
        "type": "text"
    },
    {
        "label": "with-seconds",
        "name": ":with-seconds",
        "type": "text"
    },
    {
        "label": "now-btn",
        "name": ":now-btn",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/time.png" />' );
                }
            },
        });
        editor.BlockManager.add('time', { label: 'time', content: '<q-time />', media: '<img src="images/icons/components/ui_components/time.png" class="blockIcon" />', category: 'Quasar' });
    }    

    
    const customblock_quasar_timeline_entry = editor => {
        editor.DomComponents.addType("timeline-entry", {
            isComponent: el => {
                if (el.tagName == 'Q-TIMELINE-ENTRY') {
                    return { type: 'timeline-entry' }
                }
            },
            model: {
                defaults: {
                    traits: [
    {
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "heading",
        "name": ":heading",
        "type": "text"
    },
    {
        "label": "tag",
        "name": ":tag",
        "type": "text"
    },
    {
        "label": "side",
        "name": ":side",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "avatar",
        "name": ":avatar",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "title",
        "name": ":title",
        "type": "text"
    },
    {
        "label": "subtitle",
        "name": ":subtitle",
        "type": "text"
    },
    {
        "label": "body",
        "name": ":body",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/timeline-entry.png" />' );
                }
            },
        });
        editor.BlockManager.add('timeline-entry', { label: 'timeline-entry', content: '<q-timeline-entry />', media: '<img src="images/icons/components/ui_components/timeline-entry.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "side",
        "name": ":side",
        "type": "text"
    },
    {
        "label": "layout",
        "name": ":layout",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/timeline.png" />' );
                }
            },
        });
        editor.BlockManager.add('timeline', { label: 'timeline', content: '<q-timeline />', media: '<img src="images/icons/components/ui_components/timeline.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "name",
        "name": ":name",
        "type": "text"
    },
    {
        "label": "size",
        "name": ":size",
        "type": "text"
    },
    {
        "label": "model-value",
        "name": ":model-value",
        "type": "text"
    },
    {
        "label": "val",
        "name": ":val",
        "type": "text"
    },
    {
        "label": "true-value",
        "name": ":true-value",
        "type": "text"
    },
    {
        "label": "false-value",
        "name": ":false-value",
        "type": "text"
    },
    {
        "label": "indeterminate-value",
        "name": ":indeterminate-value",
        "type": "text"
    },
    {
        "label": "toggle-order",
        "name": ":toggle-order",
        "type": "text"
    },
    {
        "label": "toggle-indeterminate",
        "name": ":toggle-indeterminate",
        "type": "text"
    },
    {
        "label": "label",
        "name": ":label",
        "type": "text"
    },
    {
        "label": "left-label",
        "name": ":left-label",
        "type": "text"
    },
    {
        "label": "checked-icon",
        "name": ":checked-icon",
        "type": "text"
    },
    {
        "label": "unchecked-icon",
        "name": ":unchecked-icon",
        "type": "text"
    },
    {
        "label": "indeterminate-icon",
        "name": ":indeterminate-icon",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "keep-color",
        "name": ":keep-color",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "disable",
        "name": ":disable",
        "type": "text"
    },
    {
        "label": "tabindex",
        "name": ":tabindex",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "icon-color",
        "name": ":icon-color",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/toggle.png" />' );
                }
            },
        });
        editor.BlockManager.add('toggle', { label: 'toggle', content: '<q-toggle />', media: '<img src="images/icons/components/ui_components/toggle.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "inset",
        "name": ":inset",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/toolbar.png" />' );
                }
            },
        });
        editor.BlockManager.add('toolbar', { label: 'toolbar', content: '<q-toolbar />', media: '<img src="images/icons/components/ui_components/toolbar.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "nodes",
        "name": ":nodes",
        "type": "text"
    },
    {
        "label": "node-key",
        "name": ":node-key",
        "type": "text"
    },
    {
        "label": "label-key",
        "name": ":label-key",
        "type": "text"
    },
    {
        "label": "children-key",
        "name": ":children-key",
        "type": "text"
    },
    {
        "label": "no-connectors",
        "name": ":no-connectors",
        "type": "text"
    },
    {
        "label": "color",
        "name": ":color",
        "type": "text"
    },
    {
        "label": "control-color",
        "name": ":control-color",
        "type": "text"
    },
    {
        "label": "text-color",
        "name": ":text-color",
        "type": "text"
    },
    {
        "label": "selected-color",
        "name": ":selected-color",
        "type": "text"
    },
    {
        "label": "dense",
        "name": ":dense",
        "type": "text"
    },
    {
        "label": "dark",
        "name": ":dark",
        "type": "text"
    },
    {
        "label": "icon",
        "name": ":icon",
        "type": "text"
    },
    {
        "label": "tick-strategy",
        "name": ":tick-strategy",
        "type": "text"
    },
    {
        "label": "ticked",
        "name": ":ticked",
        "type": "text"
    },
    {
        "label": "expanded",
        "name": ":expanded",
        "type": "text"
    },
    {
        "label": "selected",
        "name": ":selected",
        "type": "text"
    },
    {
        "label": "no-selection-unset",
        "name": ":no-selection-unset",
        "type": "text"
    },
    {
        "label": "default-expand-all",
        "name": ":default-expand-all",
        "type": "text"
    },
    {
        "label": "accordion",
        "name": ":accordion",
        "type": "text"
    },
    {
        "label": "filter",
        "name": ":filter",
        "type": "text"
    },
    {
        "label": "filter-method",
        "name": ":filter-method",
        "type": "text"
    },
    {
        "label": "duration",
        "name": ":duration",
        "type": "text"
    },
    {
        "label": "no-nodes-label",
        "name": ":no-nodes-label",
        "type": "text"
    },
    {
        "label": "no-results-label",
        "name": ":no-results-label",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/tree.png" />' );
                }
            },
        });
        editor.BlockManager.add('tree', { label: 'tree', content: '<q-tree />', media: '<img src="images/icons/components/ui_components/tree.png" class="blockIcon" />', category: 'Quasar' });
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
        "label": "Reactive Model",
        "name": "v-model",
        "type": "select",
        "options": []
    },
    {
        "label": "ratio",
        "name": ":ratio",
        "type": "text"
    },
    {
        "label": "src",
        "name": ":src",
        "type": "text"
    },
    {
        "label": "title",
        "name": ":title",
        "type": "text"
    },
    {
        "label": "fetchpriority",
        "name": ":fetchpriority",
        "type": "text"
    },
    {
        "label": "loading",
        "name": ":loading",
        "type": "text"
    },
    {
        "label": "referrerpolicy",
        "name": ":referrerpolicy",
        "type": "text"
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
                    const { $el, model } = this;
                    const bindTextTraitValue = model.getAttributes()['v-model']
                    $el.empty();
                    $el.append( '<img src="images/icons/components/ui_components/video.png" />' );
                }
            },
        });
        editor.BlockManager.add('video', { label: 'video', content: '<q-video />', media: '<img src="images/icons/components/ui_components/video.png" class="blockIcon" />', category: 'Quasar' });
    }    

    