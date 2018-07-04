/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function check_update() {
    chcp.fetchUpdate(function(error, data) {
        var updateBtn = document.querySelector("#update");
        if(!error) {
            updateBtn.innerHTML = "立即更新";
            updateBtn.addEventListener("click", function(event) {
                updateBtn.innerHTML = "正在升级，升级完毕应用将自动重启...";
                setTimeout(function() {
                    chcp.installUpdate(function(error) {
                        updateBtn.innerHTML = "更新完成";
                    })
                }, 4000)
            })
        } else {
            updateBtn.innerHTML = "你当前是最新版本";
        }
    })
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        check_update();
        document.querySelector("#check_update").addEventListener("click", check_update)
        console.log('Received Event: ' + id);
    }
};

app.initialize();