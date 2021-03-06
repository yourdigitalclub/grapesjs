module.exports = require('./PropertyView').extend({

  templateInput() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    return `
      <div class="${ppfx}field ${ppfx}field-radio">
        <span id="${pfx}input-holder"></span>
      </div>
    `;
  },

  init() {
    const model = this.model;
    this.list = model.get('list') || model.get('options') || [];
    this.className = this.className + ' '+ this.pfx +'list';
  },

  onRender() {
    var pfx = this.pfx;
    var ppfx = this.ppfx;
    var itemCls = ppfx + 'radio-item-label';
    var prop = this.property;

    if(!this.$input) {
      if(this.list && this.list.length) {
        let inputStr = '';
        _.each(this.list, el => {
          var cl = el.className ? el.className + ' ' + pfx + 'icon ' + itemCls : '',
          id = prop + '-' + el.value,
          labelTxt = el.name ? el.name : el.value;
          var titleAttr = el.title ? 'title="' + el.title + '"': '';
          inputStr += '<div class="' + ppfx + 'radio-item">'+
            '<input class="'+pfx+'radio" type="radio" id="'+ id +'" name="'+prop+'" value="'+el.value+'" />'+
            '<label class="'+(cl ? cl : itemCls)+'" ' + titleAttr + ' for="'+ id +'">' + (cl ? '' : labelTxt) + '</label></div>';
        });
        this.$inputEl = $(inputStr);
        this.input = this.$inputEl.get(0);
        this.$el.find('#'+ pfx +'input-holder').html(this.$inputEl);
        this.$input = this.$inputEl.find('input[name="'+this.property+'"]');
      }
    }
  },

  getInputValue() {
    return this.$input ? this.$el.find('input:checked').val() : '';
  },

  setValue(value) {
    const model = this.model;
    var v = model.get('value') || model.getDefaultValue();

    if (value) {
      v  = value;
    }

    if(this.$input)
      this.$input.filter(`[value="${v}"]`).prop('checked', true);
  },

});
