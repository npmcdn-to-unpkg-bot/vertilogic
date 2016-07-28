var verti = angular.module('vertiApp', ['ui.router', 'wu.masonry']);

verti.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: '/template/masonry.html',
            controller: 'masonryController'
        });
});

verti.controller('masonryController', function ($rootScope, vertiService, $scope) {
    var vmR = $rootScope;
    var vm = $scope;
    vm.currentPage = 1;
    vm.loadDisabled = '';
    vm.nextPage = nextPage;
    vm.show = show;
    vm.hideShow = hideShow;

    initMansory();

    function nextPage() {
        if (vm.loadDisabled !== 'load-disabled') {
            var promise = vertiService.index(vm.currentPage);
            promise.then(function (result) {
                var data = result.data.result.data;
                angular.forEach(data, function (val) {
                    vmR.masonries.push(val)
                });
                if (data.length < 5) {
                    vm.loadDisabled = 'load-disabled';
                }
                vm.masonries = vmR.masonries;
                vm.currentPage++;
            });
        }
    }

    function show(id, index) {
        var item = document.querySelectorAll('.masonry-item')[index];
        item.classList.add('masonry-active');
        vm.currentItem = item;

        var promise = vertiService.show(id);
        promise.then(function (data) {
           var item = data.data.result;
            vm.itemShow = item;
            $('.show-item').css({
                'z-index': 100,
                'opacity': 1
            });
            setTimeout(function () {
                vm.currentItem.classList.remove('masonry-active');
            },500)
        });
    }

    function hideShow() {
        $('.show-item').css({
            'z-index': -1,
            'opacity': 0
        });
    }

    function initMansory() {
        var promise = vertiService.index(vm.currentPage);
        promise.then(function (result) {
            var data = result.data.result.data
            vmR.masonries = data;
            vm.masonries = vmR.masonries;
            vm.currentPage++;
        });
    }


});


verti.controller('VertiController', function ($scope, vertiService, $rootScope) {
    var vm = $scope;
    var vmR = $rootScope;
    vm.showForm = showForm;
    vm.hideForm = hideForm;
    vm.store = store;
    vm.formVal = {};
    hideForm();

    function showForm() {
        vm.buttonClass = 'hide-button';
        vm.formClass = 'active-form';
    }

    function hideForm() {
        vm.formClass = '';
        vm.buttonClass = '';
    }

    function clearBorder() {
        var input = document.getElementsByClassName('form-input');
        angular.forEach(input, function (val) {
            val.style.borderColor = 'white';
        })
    }

    function store() {
        clearBorder();
        var data = vm.formVal;
        var promise = vertiService.store(data);
        promise.then(function (data) {
            var result = data.data;
            if (result.status == 'error') {
                angular.forEach(result.result, function (val, key) {
                    document.getElementById(key).style.borderColor = 'red';
                });
            } else {
                hideForm();
                vmR.masonries.unshift(result.result);
                vm.formVal = [];
            }
        })
    }

})

verti.service('vertiService', function ($http) {
    var vm = this;
    vm.index = index;
    vm.show = show;
    vm.store = store;

    function index(page) {
        return $http.get(apiUrl + '/index?page=' + page).then(function (data) {
            return data;
        });
    }

    function show(id) {
        return $http.get(apiUrl + '/detail/' + id).then(function (data) {
            return data;
        })
    }

    function store(data) {
        return $http.post(apiUrl + '/store', data).then(function (data) {
            return data;
        })
    }
});