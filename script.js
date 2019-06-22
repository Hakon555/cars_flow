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
        //здесь нужен аякс запрос
        state.drivers = drivers;
        console.log(drivers);
    },
    getTracks (state){
        //здесь нужен аякс запрос
        state.tracks = tracks;
    }
  },
});
let driversTemplate = `
    <div class="wrapper_driver">
        <h2 class="title">Водители</h2>
        <div class="banner__button banner__button_summaryInformation" @click="toggleButton">
            <a class="banner__button_text banner__button_text_summaryInformation" tabindex="0">Добавить водителя</a>
        </div>
        <div class="tryNow tryNow_driver" v-bind:class="{active: formShowed}">
            <form action="/" method="post" class="" novalidate="">
                <div class="form__input">
                    <div class="field">
                        <input type="text" name="LAST_NAME" placeholder="ФИО" autocomplete="off">
                    </div>
                    <div class="field">
                        <input type="text" name="AGE" placeholder="Возраст" autocomplete="off">
                    </div>
                    <div class="field">
                        <input type="text" name="EXPERIENCE" placeholder="Стаж" autocomplete="off">
                    </div>
                    <div class="field">
                        <label style="color: #808080;font-style: italic;font-size: 20px;">Пол:</label>
                        <input type="radio" name="SEX" value="Женский" autocomplete="off">
                        <label>Женский</label>
                        <input type="radio" name="SEX" value="Мужской" autocomplete="off">
                        <label>Мужской</label>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="banner__button">
                    <a style="padding: 13px 35px;" href="/" class="banner__button_text" tabindex="0">Отправить</a>
                </div>
            </form>
        </div>
        <div class="list_driver">
            <h2>Список водителей</h2>
            <table class="table-1">
                <tr><th class="fio-1">ФИО</th><th class="position-1">ПОЛ</th><th class="age-1">ВОЗРАСТ</th><th class="work-experience">СТАЖ</th><th class="delete">&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;УДАЛИТЬ	&nbsp;	&nbsp;&nbsp;	&nbsp;&nbsp;	&nbsp;</th></tr>

                <tr v-for="driver in drivers" :data-id="driver.id"><td>{{driver.name}}</td><td>{{driver.sex}}</td><td>{{driver.age}}</td><td>{{driver.exp}} лет</td><td style="cursor: pointer;">X</td></tr>
            </table>
        </div>
    
    </div>`;
const NotFound = { template: '<h2>Page Not Found</h2>' }
const Home = { template: '<h2>Home Page</h2>' }
const Drivers = {
    template: driversTemplate,
    data: function(){
        return {
            formShowed: false
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
    template: '#tracks-template', 
}
const Count = {
    template: '#count-template', 
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
})

//другие скрипты
function setMenuHeight(){
    console.log(6787689);
    document.getElementsByClassName("all-side-menu")[0].style.height = getComputedStyle(document.getElementsByClassName("contentPath")[0]).height;
}