import Vue from 'vue'
import ListDetailFrame from '../base/listDetailFrame'
import sampleHtml from './sample.html'
import Element, { MessageBox } from 'element-ui'

(async function () {            
    Vue.use(Element)
    
    class Item {           
        id:number = 0
        name:string = ''        
    }  

    class Filter {
        id:number = 0
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
            filter: new Filter(),
            pages: [ 1, 2, 3],
            currentPage: 1,
            outputDialog: false,
            selectedLayoutCd: '0001',
            layoutCodes: [ '0001', '0002', '0003' ],
            listHeight: 0,
            detailStyle: {
                height: '0px',
                overflow: 'auto'
            },
            detailRules: {
                name: [
                  { required: true, message: 'please input name', trigger: 'blur' }
                ]
            }
        },   
        mounted: function() {                        
            for (var i = 0; i < 10; i++) {
                var item = new Item()
                item.id = i + 101
                item.name = `name_${item.id}`
             
                this.allItems.push(item)
                this.items.push(item)
            }

            this.setListHeigth()
            this.setDetailHeigth()
        },
        computed: {
            maxPage: function():number {
                return this.pages[this.pages.length - 1]
            }
        },
        methods: { 
            clearFilter: function() {
                this.filter.id = 0
                this.filter.name = ''
            },
            setListHeigth: function() {   
                setInterval(() =>{
                    var el = document.querySelector('.auto-height') as HTMLElement
                    if (el.style.height) this.listHeight = parseInt(el.style.height) - 70
                }, 500)             
            },        
            setDetailHeigth: function() {   
                setInterval(() =>{
                    var el = document.querySelector('.auto-height') as HTMLElement
                    if (el.style.height) this.detailStyle.height = `${parseInt(el.style.height) - 70}px`;
                }, 500)             
            },   
            getPageName: function(page: number): string {
                return `${page} page`;
            },
            getLayoutName: function(layoutCode: number): string {
                return `${layoutCode} layout`;
            },
            createNew: function() {        
                this.showLoding()

                this.resetCurrentItem()
            },
            edit: function(item: Item) {     
                this.showLoding()

                this.currentItem.id = item.id
                this.currentItem.name = item.name
            },
            register: async function() {                  
                var valid = await (this.$refs.detailForm as any).validate().catch(() => {})

                if (!valid) return;

                var ok = await this.$confirm('do you want to register?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'info'
                }).catch(() => {})

                if (ok) {
                    this.showLoding()

                    if (this.currentItem.id) {                              
                        var item = this.allItems.find(x => x.id == this.currentItem.id)
                        if (item) {
                            item.name = this.currentItem.name
                        }                              
                    } else {
                        var newItem = new Item()
                        if (this.allItems.length == 0) {
                            newItem.id = 1
                        } else {
                            newItem.id = this.allItems[this.allItems.length - 1].id + 1
                        }
                        newItem.name = this.currentItem.name
                        this.allItems.push(newItem)
                        this.items.push(newItem)
                        this.currentItem.id = newItem.id
                    }

                    this.$notify({
                        title: 'Success',
                        message: 'completed.',
                        type: 'success'
                    });
                }
            },
            remove: async function() {    
                var ok = await this.$confirm('do you want to remove?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).catch(() => {})
                
                if (ok) {
                    this.showLoding()

                    index  = this.allItems.findIndex(x => x.id == this.currentItem.id)                                
                    this.allItems.splice(index, 1)
                    var index  = this.items.findIndex(x => x.id == this.currentItem.id)                                
                    this.items.splice(index, 1)
                    this.resetCurrentItem()

                    this.$notify({
                        title: 'Success',
                        message: 'completed.',
                        type: 'success'
                    });
                }
            },
            showLoding: function() {
                var loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading'                    
                  });

                setTimeout(() => {
                    loading.close();
                }, 1000);
            },
            fetchItems: function() {                
                this.dialogVisible = false 

                this.showLoding()

                if (this.filter.id > 0) {
                    this.items = this.allItems.filter(x => x.id == this.filter.id)                    
                }
                else if (this.filter.name) {
                    this.items = this.allItems.filter(x => x.name.indexOf(this.filter.name) == 0)
                }
                else {
                    this.items = this.allItems.filter(x => true)
                }

                this.resetCurrentItem()
            },
            resetCurrentItem: function() {
                this.currentItem.id = 0
                this.currentItem.name = ''
            }
        }
    })
})()