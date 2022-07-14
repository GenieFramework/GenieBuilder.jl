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
                    { label: 'Reactive Model', name: 'v-model', type: 'select', options: [] },
                    { label: 'color', name: ':color', type: 'text' },
                    { label: 'text-color', name: ':text-color', type: 'text' },
                    { label: 'icon', name: ':icon', type: 'text' },
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
                $el.append( '<img src="images/icons/components/default.png" />' );
            }
        },
    });
    editor.BlockManager.add('avatar', { label: 'Avatar', content: `<q-avatar />`, media: '<img src="images/icons/components/default.png" class="blockIcon"/>', category: 'Quasar' });
}
