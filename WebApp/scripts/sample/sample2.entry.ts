import Vue from 'vue'
import Element, { MessageBox } from 'element-ui'

var headerEl = document.querySelector("[data-panel='header']") as Element;
var listEl = document.querySelector("[data-panel='list']") as Element;
var detailEl = document.querySelector("[data-panel='detail']") as Element;
var footerEl = document.querySelector("[data-panel='footer']") as Element;

(async function () {     
    Vue.use(Element)

    new Vue({
        el: headerEl,
        template: `
        <div class="col-sm-12">
            <el-button type="primary">execute</el-button>
        </div>`
    });    

    new Vue({
        el: listEl,
        template: `
        <div class="col-sm-8">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <h1>list</h1>
                </el-tab-pane>
            </el-tabs>
        </div>`
    });    

    new Vue({
        el: detailEl,
        template: `
        <div class="col-sm-4">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <h1>detail</h1>
                </el-tab-pane>
            </el-tabs>
        </div>`
    });  
    
    new Vue({
        el: footerEl,
        template: `
        <div class="col-sm-12">
            <el-button type="primary">execute</el-button>
        </div>`
    });    
})()