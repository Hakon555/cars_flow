let drivers = [
    {
        id: 1,
        name: "sam",
        age: "57",
        exp: "10",
        sex: "m"
    },
    {
        id: 2,
        name: "jack",
        age: "30",
        exp: "9",
        sex: "m"
    },
    {
        id: 3,
        name: "rose",
        age: "45",
        exp: "7",
        sex: "w"
    }
];
let tracks = [
    {
        id: 1,
        name: "Reno",
        age: "5",
        cond: "0.2",
        plate: "е152ва"
    },
    {
        id: 2,
        name: "Iveco",
        age: "3",
        cond: "0.01",
        plate: "п458то"
    },
    {
        id: 3,
        name: "Volvo",
        age: "10",
        cond: "0.3",
        plate: "л857рс"
    }
];


const store = new Vuex.Store({
  state: {
    drivers: [],
    tracks: []
  },
  mutations: {
    getDrivers (state){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/getdrivers', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log("Bad request" + xhr.status);
            } else {
                //window.asd = xhr;
                state.drivers = JSON.parse(xhr.response).array;
            }
        }
    },
    getTracks (state){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/gettrucks', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log("Bad request" + xhr.status);
            } else {
                window.asd = xhr;
                state.tracks = JSON.parse(xhr.response);
            }
        }
    }
  },
});
let driversTemplate = `
    <div class="wrapper_driver">
        <h2 class="title">Водители</h2>
        <div class="banner__button banner__button_summaryInformation" @click="toggleButton">
            <a class="banner__button_text banner__button_text_summaryInformation" tabindex="0">Добавить водителя</a>
        </div>
        <div class="driver-added" v-bind:class="{active: driverAdded, red: !addingStatus}">{{driverAddedText}}</div>
        <div class="tryNow tryNow_driver" v-bind:class="{active: formShowed}">
            <form>
                <div class="form__input">
                    <div class="field">
                        <input v-model="createName" type="text" name="LAST_NAME" placeholder="ФИО" autocomplete="off" required>
                    </div>
                    <div class="field">
                        <input v-model="createAge" type="text" name="AGE" placeholder="Возраст" autocomplete="off" required>
                    </div>
                    <div class="field">
                        <input v-model="createExp" type="text" name="EXPERIENCE" placeholder="Стаж" autocomplete="off" required>
                    </div>
                    <div class="field">
                        <label style="color: #808080;font-style: italic;font-size: 20px;">Пол:</label>
                        <input v-model="createSex" type="radio" name="SEX" value="0" autocomplete="off" required>
                        <label>Женский</label>
                        <input v-model="createSex" type="radio" name="SEX" value="1" autocomplete="off" required default>
                        <label>Мужской</label>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="banner__button">
                    <a @click="addDrivers" style="padding: 13px 35px; cursor: pointer;" class="banner__button_text" tabindex="0">Отправить</a>
                </div>
            </form>
        </div>
        <div class="list_driver">
            <h2>Список водителей</h2>
            <table class="table-1">
                <tr><th class="fio-1">ФИО</th><th class="position-1">ПОЛ</th><th class="age-1">ВОЗРАСТ</th><th class="work-experience">СТАЖ</th><th class="delete">&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;УДАЛИТЬ	&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;</th></tr>

                <tr v-for="driver in drivers" :data-id="driver.id"><td>{{driver.name}}</td><td>{{(driver.sex === 1) ? "мужской" : "женский"}}</td><td>{{driver.age}}</td><td>{{driver.experience}} лет</td><td style="cursor: pointer;" @click="deleteDriver(driver.id)">X</td></tr>
            </table>
        </div>
    
    </div>`;

let tracksTemplate = `
<div class="wrapper_driver">
    <h2 class="title">Грузовики</h2>
    <div class="banner__button banner__button_summaryInformation" @click="toggleButton">
        <a class="banner__button_text banner__button_text_summaryInformation" tabindex="0">Добавить грузовик</a>
    </div>
    <div class="driver-added" v-bind:class="{active: driverAdded, red: !addingStatus}">{{driverAddedText}}</div>
    <div class="tryNow tryNow_driver" v-bind:class="{active: formShowed}">
        <form>
            <div class="form__input">
                <div class="field">
                    <input v-model="createName" type="text" name="name" placeholder="Марка" autocomplete="off" required>
                </div>
                <div class="field">
                    <input v-model="createAge" type="text" name="age" placeholder="Возраст" autocomplete="off" required>
                </div>
                <div class="field">
                    <input v-model="createDeter" type="text" name="deter" placeholder="Частота поломок" autocomplete="off" required>
                </div>
                <div class="field">
                    <input v-model="createPlate" type="text" name="plate" placeholder="Номер машины" autocomplete="off" required>
                </div>
                <div class="clear"></div>
            </div>
            <div class="banner__button">
                <a @click="addDrivers" style="padding: 13px 35px; cursor: pointer;" class="banner__button_text" tabindex="0">Отправить</a>
            </div>
        </form>
    </div>
    <div class="list_driver">
        <h2>Список грузовиков</h2>
        <table class="table-1">
            <tr><th class="fio-1">МАРКА</th><th class="position-1">ВОЗРАСТ</th><th class="age-1">ЧАСТОТА ПОЛОМОК</th><th class="work-experience">НОМЕР МАШИНЫ</th><th class="delete">&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;УДАЛИТЬ	&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;</th></tr>
            <tr v-for="driver in drivers" :data-id="driver.id"><td>{{driver.name}}</td><td>{{driver.age}}</td><td>{{driver.deter}}</td><td>{{driver.plate}}</td><td style="cursor: pointer;" @click="deleteDriver(driver.id)">X</td></tr>
        </table>
    </div>

</div>`;

let mainTemplate = `
<div>
            <h2>Как это работает?</h2>
            <div class="howWork">
                <img src="https://carsflow.pythonanywhere.com/static/withCarsFlow.png">
            </div>
            <h2>Алгоритм предсказания дает возможность</h2>
            <div class="reporting__blocks_lineone">
                <div class="reporting__blocks_lineone_content">
                    <div class="reporting__blocks_lineone_top">
                        <div class="reporting__blocks_lineone_top_content">
                            <p class="reporting__blocks_lineone_top_nalog">Просчета времени доставки груза с точностью до 98,9%</p>
                        </div>
                    </div>
                    <div class="reporting__blocks_lineone_bottom">
                        <p class="reporting__blocks_lineone_top_nalog_bottom">Просчет за счет параметров:</p>
                        <div class="reporting__blocks_lineone_top_data_content">
                            <p class="reporting__blocks_lineone_top_data_bottom"> погода, водитель, ТС, дорожные условия, возникновение ЧС</p>
                        </div>
                    </div>
                </div>
                <div class="reporting__blocks_lineone_content">
                    <div class="reporting__blocks_lineone_top" style=" background-image: url('https://carsflow.pythonanywhere.com/static/aperture_64px.png');">
                        <div class="reporting__blocks_lineone_top_content">
                            <p class="reporting__blocks_lineone_top_nalog">  Оптимизации бизнес-процессов</p>
                        </div>
                    </div>
                    <div class="reporting__blocks_lineone_bottom">
                        <p class="reporting__blocks_lineone_top_nalog_bottom"> Построение бизнес-модели</p>
                        <div class="reporting__blocks_lineone_top_data_content">
                            <p class="reporting__blocks_lineone_top_data_bottom"> на данных высокой степени точности</p>
                        </div>
                    </div>
                </div>
                <div class="reporting__blocks_lineone_content">
                    <div class="reporting__blocks_lineone_top" style=" background-image: url('https://carsflow.pythonanywhere.com/static/linegraph_64px.png');">
                        <div class="reporting__blocks_lineone_top_content">
                            <p class="reporting__blocks_lineone_top_nalog">  Регулировать FC/VC для бизнес-процессов</p>
                        </div>
                    </div>
                    <div class="reporting__blocks_lineone_bottom">
                        <p class="reporting__blocks_lineone_top_nalog_bottom">Построение механизма учета бизнес-затрат  </p>
                        <div class="reporting__blocks_lineone_top_data_content">
                            <p class="reporting__blocks_lineone_top_data_bottom">на основе точных данных</p>
                        </div>
                    </div>
                </div>
            </div>
                <div class="tryNow">
                    <h2>Начните работать с нами прямо сейчас</h2>
                    <form action="/" method="post" class="" novalidate="">
                        <div class="form__input">
                            <div class="field">
                                <input style="margin-left: 50px;" type="text" name="LAST_NAME" placeholder="ФИО" autocomplete="off">
                            </div>
                            <div class="field">
                                <input type="text" name="PHONE" placeholder="Телефон" autocomplete="off">
                            </div>
                            <div class="field">
                                <input type="text" name="EMAIL" placeholder="E-mail" autocomplete="off">
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="banner__button">
                            <a href="/" class="banner__button_text" tabindex="0">Попробовать
                                бесплатно</a>
                        </div>
                    </form>
                </div>
                </div>`;


let countTemplate = `
<div class="wrapper_timing">
    <h2>Выберите маршрут</h2>
    <input type="text" placeholder="oт" v-model="from">
    <input type="text" placeholder="до" v-model="to">
    <div class="geo-button" @click="getGeo()">Выбрать</div>
    <div class="cards"></div>

    <div id="map" style="width: 80%; height: 400px; background: grey; margin: 10px auto;" />

    <div class="select_driver">
        <p>Водитель</p>
        <select id="driver" v-model="driver" @change="onChange">
            <option v-for="driver in drivers" :data-id="driver.id" :value="driver.id">{{driver.name}}</option>
        </select>
    </div>
    <div class="select_ts">
        <p>Транспортное средство</p>
        <select id="ts" v-model="truck" @change="onChange">
            <option v-for="track in tracks" :data-id="track.id" :value="track.id">{{track.name}}</option>
        </select>
    </div>
    <div class="select_time">
        <p>Время года</p>
        <select id="time" v-model="season" @change="onChange">
            <option value="0">Лето</option>
            <option value="1">Осень</option>
            <option value="2">Зима</option>
            <option value="3">Весна</option>
        </select>
    </div>
    <div class="totalTime">
        <span>Результат:</span>
        <span class="totalTime_result">{{finishTime}}</span>
    </div>
</div>
`;


const NotFound = { template: '<h2>Page Not Found</h2>' }
const Home = { template: mainTemplate }
const Drivers = {
    template: driversTemplate,
    data: function(){
        return {
            formShowed: false,
            driverAdded: false,
            driverAddedText: "",
            addingStatus: true,
            createName: "",
            createAge: "",
            createExp: "",
            createSex: ""
        };
    },
    computed:  {
        drivers: function(){
            return store.state.drivers;
        }
    },
    methods: {
        toggleButton: function(event){
            if(this.formShowed){
                this.formShowed = false;
            }else{
                this.formShowed = true;
                this.driverAdded = false;
            }
        },
        addDrivers: function(event){
            let self = this;

            let xhr = new XMLHttpRequest();
            let body = 'name=' + encodeURIComponent(this.createName) + "&age=" + encodeURIComponent(this.createAge) + "&experience=" + encodeURIComponent(this.createExp) + "&sex=" + encodeURIComponent(this.createSex);
            console.log(body);
            xhr.open("POST", '/addDriver', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Bad request" + xhr.status);
                    self.driverAddedText = "Водитель не добавлен";
                    self.addingStatus = false;
                    self.driverAdded = true;
                    self.formShowed = false;
                } else {
                    //window.asd = xhr;
                    if(JSON.parse(xhr.response).successful === true){
                        self.driverAddedText = "Водитель добавлен";
                        self.addingStatus = true;
                        store.commit('getDrivers');
                    }else{
                        self.driverAddedText = "Водитель не добавлен";
                        self.addingStatus = false;
                    }
                    self.driverAdded = true;
                    self.formShowed = false;
                    self.createName = "";
                    self.createAge = "";
                    self.createExp = "";
                    self.createSex = "";
                }
            }
            self.createName = "";
            self.createAge = "";
            self.createExp = "";
            self.createSex = "";
        },
        deleteDriver: function(id){
            let xhr = new XMLHttpRequest();
            xhr.open("GET", '/deletedriver/' + id, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
            xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log("Bad request" + xhr.status);
            } else {
                window.asd = xhr;
                console.log("Удалён" + xhr.status);
                if(JSON.parse(xhr.response).successful){
                    store.commit('getDrivers');
                }
            }
        }
        }
    },
    created (){
        store.commit('getDrivers');
    },
    updated (){
        setMenuHeight();
    }
}
const Tracks = {
    template: tracksTemplate,
    data: function(){
        return {
            formShowed: false,
            driverAdded: false,
            driverAddedText: "",
            addingStatus: true,
            createName: "",
            createAge: "",
            createDeter: "",
            createPlate: ""
        };
    },
    computed: {
        drivers: function(){
            return store.state.tracks;
        }
    },
    methods: {
        toggleButton: function(event){
            if(this.formShowed){
                this.formShowed = false;
            }else{
                this.formShowed = true;
                this.driverAdded = false;
            }
            console.log(this.drivers);
            console.log(store.state.tracks);
        },
        addDrivers: function(event){
            let self = this;

            let xhr = new XMLHttpRequest();
            let body = 'name=' + encodeURIComponent(this.createName) + "&age=" + encodeURIComponent(this.createAge) + "&deter=" + encodeURIComponent(this.createDeter) + "&plate=" + encodeURIComponent(this.createPlate);
            console.log(body);
            xhr.open("POST", '/addtruck', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Bad request" + xhr.status);
                    self.driverAddedText = "Грузовик не добавлен";
                    self.addingStatus = false;
                    self.driverAdded = true;
                    self.formShowed = false;
                } else {
                    //window.asd = xhr;
                    if(JSON.parse(xhr.response).successful === true){
                        self.driverAddedText = "Грузовик добавлен";
                        self.addingStatus = true;
                        store.commit('getTracks');
                    }else{
                        self.driverAddedText = "Грузовик не добавлен";
                        self.addingStatus = false;
                    }
                    self.driverAdded = true;
                    self.formShowed = false;
                }
            }
            self.createName = "";
            self.createAge = "";
            self.createDeter = "";
            self.createPlate = "";
        },
        deleteDriver: function(id){
            let xhr = new XMLHttpRequest();
            xhr.open("GET", '/deletetruck/' + id, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Bad request" + xhr.status);
                } else {
                    window.asd = xhr;
                    console.log("Удалён" + xhr.status);
                    if(JSON.parse(xhr.response).successful){
                        store.commit('getTracks');
                    }
                }
            }
        }
    },
    created (){
        store.commit('getTracks');
    },
    updated (){
        setMenuHeight();
    }
}
const Count = {
    template: countTemplate,
    data: function(){
        return {
            from: "52.515691,13.381820",
            to: "52.526972,13.307319",
            truck: "",
            driver: "",
            season: "",
            distance: "",
            baseTime: "",
            finishTime: "0ч0м"
        };
    },
    computed:  {
        drivers: function(){
            return store.state.drivers;
        },
        tracks: function(){
            return store.state.tracks;
        }
    },
    methods: {
        qwe: function(){
            console.log(this.tracks);
            console.log(9999);
        },
        getGeo: function(from, to){

            let startUrl = "https://route.api.here.com/routing/7.2/calculateroute.json?app_code=1pnlqZC_FTT9ZbWMpWiubw&app_id=Q8o4mujZbnHtCuU55Plk&jsonattributes=41&language=en-us&maneuverattributes=po,ti,pt,ac,di,fj,ix&metricsystem=metric&mode=fastest;car&routeattributes=sh,gr";
            let paramFrom = "&waypoint0=geo!stopOver!" + this.from;
            let paramTo = "&waypoint1=geo!stopOver!" + this.to;
            let endUrl = startUrl + paramFrom + paramTo;

            /*console.log(paramFrom);
            console.log(paramTo);
            console.log(endUrl);*/

            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", endUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Bad request" + xhr.status);
                } else {
                    let res = JSON.parse(xhr.response).response.route[0].summary;
                    //window.asd = xhr;
                    //console.log(res.response.route[0].summary.distance);
                    //console.log(res.response.route[0].summary.baseTime);
                    //console.log(JSON.parse(xhr.response));
                    //state.drivers = JSON.parse(xhr.response).array;
                    self.distance = res.distance;
                    self.baseTime = res.baseTime;
                    self.getCount();
                }
            }
        },
        getCount: function(){

            let self = this;
            let xhr = new XMLHttpRequest();
            let body = 
            'distance=' + encodeURIComponent(this.distance) + 
            "&baseTime=" + encodeURIComponent(this.baseTime) + 
            "&firstpoint=" + encodeURIComponent(this.from) + 
            "&lastpoint=" + encodeURIComponent(this.to) +
            "&truck=" + encodeURIComponent(this.truck) +
            "&driver=" + encodeURIComponent(this.driver) +
            "&season=" + encodeURIComponent(this.season);

            console.log(body);
            xhr.open("POST", '/getcount', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Bad request" + xhr.status);
                } else {
                    let res = JSON.parse(xhr.response);
                    window.asd = xhr;
                    console.log("count success");

                    self.finishTime = res.time.replace(":", "ч") + "м";
                }
            }
        },
        onChange: function(){
            this.getCount();
        }
    },
    created (){
        store.commit('getTracks');
        store.commit('getDrivers');
    },
    mounted(){
   /**
     * Moves the map to display over Berlin
     *
     * @param  {H.Map} map      A HERE Map instance within the application
     */
    function moveMapToBerlin(map){
        map.setCenter({lat:52.5159, lng:13.3777});
        map.setZoom(14);
      }
      
      /**
       * Boilerplate map initialization code starts below:
       */
      
      //Step 1: initialize communication with the platform
      let platform = new H.service.Platform({
        app_id: 'devportal-demo-20180625',
        app_code: '9v2BkviRwi9Ot26kp2IysQ',
        useHTTPS: true
      });
      let pixelRatio = window.devicePixelRatio || 1;
      let defaultLayers = platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
      });
      
      //Step 2: initialize a map  - not specificing a location will give a whole world view.
   
      let map = new H.Map(document.getElementById('map'),
        defaultLayers.normal.map, {pixelRatio: pixelRatio});
      
      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      
      // Create the default UI components
      let ui = H.ui.UI.createDefault(map, defaultLayers);
      
      // Now use the map as required...
      moveMapToBerlin(map);

      /**
     * An event listener is added to listen to tap events on the map.
     * Clicking on the map displays an alert box containing the latitude and longitude
     * of the location pressed.
     * @param  {H.Map} map      A HERE Map instance within the application
     */
    function setUpClickListener(map) {
        // Attach an event listener to map display
        // obtain the coordinates and display in an alert box.
        map.addEventListener('tap', function (evt) {
        var coord = map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
        alert('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
            ((coord.lat > 0) ? 'N' : 'S') +
            ' ' + Math.abs(coord.lng.toFixed(4)) +
            ((coord.lng > 0) ? 'E' : 'W'));
        });
    }
    setUpClickListener(map);

    /*let parisMarker = new H.map.Marker({lat:48.8567, lng:2.3508});
    map.addObject(parisMarker);
    setTimeout(function(){map.deleteObject(parisMarker);}, 2000);*/

    },
    updated (){
        setMenuHeight();
    }
}
 
const routes = [
    { path: '/', component: Home },
    { path: '/drivers', component: Drivers},
    { path: '/tracks', component: Tracks },
    { path: '/count', component: Count },
    { path: '*', component: NotFound }
];
 
const router = new VueRouter({
    mode: 'history',
    routes: routes
});
 
const vue = new Vue({
    el: '#app',
    router: router,
    mounted (){
        setMenuHeight();
    }
});

//другие скрипты
function setMenuHeight(){
    document.getElementsByClassName("all-side-menu")[0].style.height = getComputedStyle(document.getElementsByClassName("contentPath")[0]).height;
}