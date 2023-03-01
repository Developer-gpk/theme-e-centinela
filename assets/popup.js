/**
 * @author cesarmejia
 * @constructor
 */
function Popup(){

    /**
     * @type jQuery
     */
    this.$body = $('body');

    /**
     * @type jQuery
     */
    this.$document = $(document);

    /**
     * @type jQuery
     */
    this.$window = $(window);

    /**
     * @type Object
     */
    this.popup = {};

    /**
     * Center wrapper when the window resizes.
     */
    this._onWindowResize = function(){
        general.centerItem(this.popup.wrapper);
    };

    /**
     * Append and shows the elements of the popup.
     *
     * @param {jQuery} content
     */
    this.display = function(content){
        var _this = this;

        //
        this.initializeElements(content);

        // Add popup elements to the DOM.
        for(var i in this.popup){
            if(i === 'closeButton') continue;

            this.popup[i].appendTo('body');

        }

        // Show the popup.
        this.popup.background.animate({
            'opacity': '0.94'

        }, 'fast', function(){

            // Center element or elements.
            _this._onWindowResize();


            // Show popup elements to the DOM.
            for(var i in _this.popup){
                if(i === 'background' || _this.popup[i].is(':visible'))
                    continue;

                _this.popup[i].fadeIn('fast');
            }

        });

        // On resize handler.
        this.$window.on('resize.popup', function(){ _this._onWindowResize(); });

        // On escape handler.
        this.$document.on('keydown', function(event){ if(event.keyCode === 27) _this.hide(); });

        // Add popup displayed class to body.
        this.$body.addClass('popup-displayed');

    };

    /**
     * Hide and remove of the DOM the elements of the popup.
     */
    this.hide = function(){

        // Remove all elements in popup object.
        for(var i in this.popup){
            var element = this.popup[i];

            element.fadeOut('fast', function(){
                // Remove element from the DOM.
                $(this).remove();
            });
        }


        // Removes the resize handler.
        this.$window.off('resize.popup');

        // Removes the escape handler.
        this.$document.off('keydown');

        // Add popup displayed class to body.
        this.$body.removeClass('popup-displayed');

    };

    /**
     * @param {jQuery} content
     */
    this.initializeElements = function(content){
        var _this = this;

        // Create background.
        this.popup.background = $('<div>')
            .addClass('popup background');

        // Create wrapper.
        this.popup.wrapper = $('<div>')
            .addClass('popup wrapper')
            .append(content);

        // Create close button.
        this.popup.closeButton = $('<div>')
            .addClass('popup close-button')
            .appendTo(this.popup.wrapper)
            .on('click', function(){ _this.hide(); });
    };

}