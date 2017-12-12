import Vue from 'vue'
import html from './listDetailFrame.html'

export default Vue.extend({        
    template: html,
    mounted: function() {
        this.resize()        
    },
    data: function() {
        return {
            detailStyle: {
                height: '0px',
                overflow: 'auto'
            },
            sideStyle: {
                height: '0px',
                overflow: 'auto'
            }
        }
    },
    methods: {
        resize: function() {
            var self = this;
            var getHeight =  () => window.innerHeight - 310
            self.$emit("resize", getHeight())
            self.detailStyle.height = `${getHeight()}px`
            self.sideStyle.height = `${getHeight() + 30}px`

            window.addEventListener("resize", function() {                
                self.$emit("resize", getHeight())
                self.detailStyle.height = `${getHeight()}px`
                self.sideStyle.height = `${getHeight() + 30}px`
            })
        }
    }
})
