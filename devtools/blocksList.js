const components = [
    // Content
    { blockName: "Separator", tag: "q-separator", type: "separator", urlEnd: "QSeparator", blockCategory:"Content", enabled: true, icon: "separator" },
    { blockName: "Space", tag: "q-space", type: "space", urlEnd: "QSpace", blockCategory:"Content", enabled: true, icon: "space" },
    { blockName: "Toolbar", tag: "q-toolbar", type: "toolbar", urlEnd: "QToolbar", blockCategory:"Content", enabled: true, icon: "toolbar" },

    // Forms
    { blockName: "Text", tag: "q-input", type: "input", urlEnd: "QInput", blockCategory:"Forms", enabled: true, icon: "input_text_field" },
    { blockName: "Button", tag: "q-btn", type: "button", urlEnd: "QBtn", blockCategory:"Forms", enabled: true, icon: "button" },
    { blockName: "Button Group", tag: "q-button-group", type: "button_group", urlEnd: "QButtonGroup", blockCategory:"Forms", enabled: true, icon: "button-group" },
    { blockName: "Button Dropdown", tag: "q-button-dropdown", type: "button_dropdown", urlEnd: "QButtonDropdown", blockCategory:"Forms", enabled: true, icon: "button-dropdown" },
    { blockName: "Select", tag: "q-select", type: "select", urlEnd: "QSelect", blockCategory:"Forms", enabled: true, icon: "select" },
    { blockName: "Radio", tag: "q-radio", type: "radio", urlEnd: "QRadio", blockCategory:"Forms", enabled: true, icon: "radio" },
    { blockName: "Checkbox", tag: "q-checkbox", type: "checkbox", urlEnd: "QCheckbox", blockCategory:"Forms", enabled: true, icon: "checkbox" },
    { blockName: "Toggle", tag: "q-toggle", type: "toggle", urlEnd: "QToggle", blockCategory:"Widgets", enabled: true, icon: "toggle" },
    { blockName: "Slider", tag: "q-slider", type: "slider", urlEnd: "QSlider", blockCategory:"Forms", enabled: true, icon: "slider" },
    { blockName: "Range", tag: "q-range", type: "range", urlEnd: "QRange", blockCategory:"Forms", enabled: true, icon: "range" },
    { blockName: "Date Picker", tag: "q-date", type: "datePicker", urlEnd: "QDate", blockCategory:"Forms", enabled: true, icon: "date_picker" },
    { blockName: "Time Picker", tag: "q-time", type: "timePicker", urlEnd: "QTime", blockCategory:"Forms", enabled: true, icon: "time" },
    { blockName: "Editor", tag: "q-editor", type: "editor", urlEnd: "QEditor", blockCategory:"Forms", enabled: true, icon: "editor" },
    { blockName: "Knob", tag: "q-knob", type: "knob", urlEnd: "QKnob", blockCategory:"Forms", enabled: true, icon: "knob" },
    
    // Lists
    { blockName: "List", tag: "q-list", type: "list", urlEnd: "QList", blockCategory:"Lists", enabled: true, icon: "list" },
    { blockName: "Item", tag: "q-item", type: "item", urlEnd: "QItem", blockCategory:"Lists", enabled: true, icon: "item" },
    { blockName: "Item Label", tag: "q-item-label", type: "item_label", urlEnd: "QItemLabel", blockCategory:"Lists", enabled: true, icon: "item" },

    // Tables
    { blockName: "Table", tag: "q-table", type: "table2", urlEnd: "QTable", blockCategory:"Tables", enabled: true, icon: "table" },

    // Multimedia
    { blockName: "Image", tag: "q-img", type: "img", urlEnd: "QImg", blockCategory:"Multimedia", enabled: true, icon: "img" },
    { blockName: "Video", tag: "q-video", type: "video", urlEnd: "QVideo", blockCategory:"Multimedia", enabled: true, icon: "video" },

    // Widgets
    { blockName: "Avatar", tag: "q-avatar", type: "avatar", urlEnd: "QAvatar", blockCategory:"Other", enabled: true, icon: "avatar" },
    { blockName: "Badge", tag: "q-badge", type: "badge", urlEnd: "QBadge", blockCategory:"Other", enabled: true, icon: "badge" },
    { blockName: "Banner", tag: "q-banner", type: "banner", urlEnd: "QBanner", blockCategory:"Widgets", enabled: true, icon: "banner" },
    { blockName: "Chip", tag: "q-chip", type: "chip", urlEnd: "QChip", blockCategory:"Widgets", enabled: true, icon: "chip" },
    { blockName: "Icon", tag: "q-icon", type: "icon", urlEnd: "QIcon", blockCategory:"Widgets", enabled: true, icon: "icon" },
    { blockName: "Rating", tag: "q-rating", type: "rating", urlEnd: "QRating", blockCategory:"Widgets", enabled: true, icon: "rating" },
    { blockName: "Spinner", tag: "q-spinner", type: "spinner", urlEnd: "QSpinner", blockCategory:"Widgets", enabled: true, icon: "spinner" },
    { blockName: "Tree", tag: "q-tree", type: "tree", urlEnd: "QTree", blockCategory:"Widgets", enabled: true, icon: "tree" },


    // Utilities
    { blockName: "Popup Proxy", tag: "q-popup-proxy", type: "popup_proxy", urlEnd: "QPopupProxy", blockCategory:"Utilities", enabled: true, icon: "popup-proxy" },
    
    // Timeline
    { blockName: "Timeline", tag: "q-timeline", type: "timeline", urlEnd: "QTimeline", blockCategory:"Timeline", enabled: true, icon: "timeline" },
    { blockName: "Timeline Entry", tag: "q-timeline-entry", type: "timeline_entry", urlEnd: "QTimelineEntry", blockCategory:"Timeline", enabled: true, icon: "timeline-entry" },

    // Other
    { blockName: "Expansion Item", tag: "q-expansion-item", type: "expansion_item", urlEnd: "QExpansionItem", blockCategory:"Other", enabled: true, icon: "expansion_item" },
];

module.exports = components;