(function() {
    // Override default jQuery css() method to support CSS 'transform' property
    // uniformly across Webkit/Safari and Firefox 3.1+
    // 2009 Zachary Johnson www.zachstronaut.com
    function getTransformProperty(element) {
        // Try transform first for forward compatibility
        var properties = ['transform', 'WebkitTransform', 'MozTransform'];
        var p;
        while (p = properties.shift()) {
            if (typeof element.style[p] != 'undefined') {
                return p;
            }
        }
        // Default to transform also
        return 'transform';
    }
    
    var proxied = jQuery.fn.css;
    jQuery.fn.css = function(key, value) {
        if (key == 'transform') {
            if (typeof jQuery.props[key] == 'undefined') {
                jQuery.props[key] = getTransformProperty(this.get(0));
            }
            // We force the property mapping here because jQuery.attr() does
            // property mapping with jQuery.props when setting a CSS property,
            // but curCSS() does *not* do property mapping when *getting* a
            // CSS property.  (It probably should since it manually does it
            // for 'float' now anyway.)
            key = jQuery.props[key];
        }
        return proxied.apply(this, arguments);
    };
})();
