

const cpDef = {
	/**
	 * @mixin bbn.cp.mixins.list
	 */
	mixins: [
		bbn.cp.mixins.list,bbn.cp.mixins.basic,
	],
	props: {
	/**
	 * @prop {Array} source
	 */
		source: {
			type: Array
		}
	},
	data(){
		return {
			current: []
		}
	}, 
	created(){
		bbn.fn.log('mounted', this.source)
		this.current = this.source
		//this.currentData = this.source;
	},
	methods: {
		setCurrent(a){
			this.current = a;
		}
	}
};

import cpHtml from './stack.html';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/stack.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-stack',
  definition: cpDef,
  template: cpHtml,
  lang: cpLang
};
