L.Contao = L.Class.extend( {
    includes: L.Mixin.Events,

    /**
     * The map registry.
     */
    maps: {},

    /**
     * The icons registry.
     */
    icons: {},

    /**
     * Initialize Contao leaflet integration.
     */
    initialize: function() {
        L.Icon.Default.imagePath = 'assets/leaflet/libs/leaflet/images';
    },

    /**
     * Add map to map registry.
     *
     * @param id  The map id.
     * @param map The map object.
     *
     * @returns {L.Contao}
     */
    addMap: function (id, map) {
        this.maps[id] = map;

        this.fire('map:added', { id: id, map: map});

        return this;
    },

    /**
     * Get a map from the icon map. Returns null if not set.
     *
     * @param id The mapobject
     *
     * @returns {L.Map}|{*}
     */
    getMap: function (id) {
        if (typeof (this.maps[id]) === 'undefined') {
            return null;
        }

        return this.maps[id];
    },

    /**
     * Add an icon to the icon registry.
     *
     * @param id   The icon id.
     * @param icon The icon object.
     *
     * @returns {L.Contao}
     */
    addIcon: function(id, icon) {
        this.icons[id] = icon;
        this.fire('icon:added', { id: id, icon: icon});

        return this;
    },

    /**
     * Load icon definitions.
     *
     * @param icons List of icon definitions.
     *
     * @return void
     */
    loadIcons: function(icons) {
        for (var i = 0; i < icons.length; i++) {
            var icon = L[icons[i].type](icons[i].options);
            this.addIcon(icons[i].id, icon);
        }
    },

    /**
     * Get an icon by its id.
     *
     * @param id Icon id.
     *
     * @returns {L.Icon}|{L.DivIcon}|{*}
     */
    getIcon: function(id) {
        if (typeof (this.icons[id]) === 'undefined') {
            return null;
        }

        return this.icons[id];
    },

    /**
     * Point to layer callback. Adds a geo json point to the layer.
     *
     * @param feature The geo json feature.
     * @param latlng  The converted latlng.
     *
     * @returns {L.Marker}|{*}
     */
    pointToLayer: function(feature, latlng) {
        var type   = 'marker';
        var marker = null;

        if (feature.properties) {
            if (feature.properties.type) {
                type = feature.properties.type;
            }

            // constructor arguments given, use them.
            if (feature.properties.arguments) {
                marker = L[type].apply(L[type], feature.properties.arguments);
                L.Util.setOptions(marker, feature.properties.options);
            }
        }

        if (marker === null) {
            marker = L[type](latlng, feature.properties.options);
        }

        if (feature.properties) {
            if (feature.properties.radius) {
                marker.setRadius(feature.properties.radius);
            }

            if (feature.properties.icon) {
                var icon = this.getIcon(feature.properties.icon);

                if (icon) {
                    marker.setIcon(icon);
                }
            }

            this.bindPopupFromFeature(marker, feature);
        }

        this.fire('point:added', { marker: marker, feature: feature, latlng: latlng, type: type });

        return marker;
    },

    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            L.Util.setOptions(layer, feature.properties.options);

            this.bindPopupFromFeature(layer, feature);

            this.fire('feature:added', { feature: feature, layer: layer});
        }
    },

    /**
     * Bind popup from feature definitions.
     *
     * It accepts popup or popupContent as property.
     *
     * @param obj     The object
     * @param feature The geo json feature.
     */
    bindPopupFromFeature: function (obj, feature) {
        if (feature.properties) {
            if (feature.properties.popup) {
                obj.bindPopup(feature.properties.popup);
            } else if (feature.properties.popupContent) {
                obj.bindPopup(feature.properties.popupContent);
            }
        }
    }
});

window.ContaoLeaflet = new L.Contao();
