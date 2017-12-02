import Vue from 'vue'
import $ from 'jquery'
import ListDetailFrame from '../base/listDetailFrame'
import sampleHtml from './sample.html'
import Element from 'element-ui'

(async function () {        
    Vue.use(Element)
    
    class Item {           
        id:number = null as any
        name:string = ''        
    }  

    class Filter {
        id:number = null as any
        name:string = ''
    }
    
    new Vue({        
        el: '#main',        
        components: {
            listDetailFrame: ListDetailFrame                    
        },
        template: sampleHtml,        
        data: {
            allItems: new Array<Item>(),
            currentItem: new Item(),
            items: new Array<Item>(),
            dialogVisible: false,
            filter: new Filter()
        },   
        mounted: function() {                        
            for (var i = 0; i < 10; i++) {
                var item = new Item()
                item.id = i + 1
                item.name = `name_${item.id}`
             
                this.allItems.push(item)
                this.items.push(item)
            }
        },
        methods: {            
            createNew: function() {                
                this.resetCurrentItem()
            },
            edit: function(item: Item) {                                  
                this.currentItem.id = item.id
                this.currentItem.name = item.name
            },
            regist: function() {                      
                if (this.currentItem.id) {                              
                    var item = this.items.find(x => x.id == this.currentItem.id)
                    if (item) {
                        item.name = this.currentItem.name
                    }                              
                } else {
                    var newItem = new Item()
                    if (this.items.length == 0) {
                        newItem.id = 1
                    } else {
                        newItem.id = this.items[this.items.length - 1].id + 1
                    }
                    newItem.name = this.currentItem.name
                    this.allItems.push(newItem)
                    this.items.push(newItem)
                    this.currentItem.id = newItem.id
                }
            },
            remove: function() {                
                index  = this.allItems.findIndex(x => x.id == this.currentItem.id)                                
                this.allItems.splice(index, 1)
                var index  = this.items.findIndex(x => x.id == this.currentItem.id)                                
                this.items.splice(index, 1)
                this.resetCurrentItem()
            },
            fetchItems: function() {
                this.dialogVisible = false 

                if (this.filter.id > 0) {
                    var item = this.allItems.find(x => x.id == this.filter.id)                    
                    this.items.length = 0
                    if (item) this.items.push(item)                    
                }
                else if (this.filter.name) {
                    var items = this.allItems.filter(x => x.name.indexOf(this.filter.name) == 0)
                    this.items.length = 0
                    items.forEach(x => this.items.push(x))
                }
                else {
                    this.items.length = 0
                    this.allItems.forEach(x => this.items.push(x))
                }

                this.resetCurrentItem()
            },
            resetCurrentItem: function() {
                this.currentItem.id = null as any
                this.currentItem.name = ''
            }
        }
    })
})()