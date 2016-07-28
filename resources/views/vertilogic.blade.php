<!DOCTYPE html>
<html lang="en" ng-app="vertiApp">
<head>
    <meta charset="UTF-8">
    <title>Vertilogic</title>
    <link rel="stylesheet" href="css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,400|Slabo+27px' rel='stylesheet' type='text/css'>
</head>
<body>
<header>
    <div class="logo container">
        <img src="images/logo.png" alt="Vertilogic">
    </div>
</header>

<main class="container" ui-view>
</main>


<div ng-controller="VertiController">
    <div class="add-button" ng-class="buttonClass" ng-click="showForm()">
        <span>+</span>
    </div>

    <div class="add-form" ng-class="formClass">
        <div class="form">
            <div class="form-head">
                <span class="title">Add Item</span>
                <span class="close" ng-click="hideForm()">X</span>
            </div>
            <form action="" ng-submit="store()">
                <input type="text" placeholder="Input Name" ng-model="formVal.name" id="name" class="form-input">
                <textarea cols="10" rows="2" placeholder="Input Description" ng-model="formVal.description" id="description"></textarea >
                <input type="text" placeholder="Input Image Url" ng-model="formVal.picture" id="picture" class="form-input">
                <input type="text" placeholder="Input Color" ng-model="formVal.color" id="color" class="form-input">
                <input type="text" placeholder="Input Size" ng-model="formVal.size" id="size" class="form-input">
                <input type="submit" value="Save">
            </form>
        </div>

    </div>
</div>


<script src="{{url('bower_components/jquery/dist/jquery.js')}}"></script>
<script src="{{url('bower_components/jquery-bridget/jquery-bridget.js')}}"></script>
<script src="{{url('bower_components/ev-emitter/ev-emitter.js')}}"></script>
<script src="{{url('bower_components/desandro-matches-selector/matches-selector.js')}}"></script>
<script src="{{url('bower_components/fizzy-ui-utils/utils.js')}}"></script>
<script src="{{url('bower_components/get-size/get-size.js')}}"></script>
<script src="{{url('bower_components/outlayer/item.js')}}"></script>
<script src="{{url('bower_components/outlayer/outlayer.js')}}"></script>
<script src="{{url('bower_components/masonry/masonry.js')}}"></script>
<script src="{{url('bower_components/imagesloaded/imagesloaded.js')}}"></script>
<script src="{{url('bower_components/angular/angular.js')}}"></script>
<script src="{{url('bower_components/angular-masonry/angular-masonry.js')}}"></script>
<script src="{{url('bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js')}}"></script>
<script src="{{url('js/vertilogic.js')}}"></script>
<script src="{{url('js/ui-route.js')}}"></script>
<script>
    var apiUrl = '{!! url('api') !!}';
</script>
</body>
</html>