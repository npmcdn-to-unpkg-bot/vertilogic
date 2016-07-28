<?php

Route::get('/', function () {
    return view('vertilogic');
});


Route::group(['prefix' => 'api'], function () {
    Route::get('index', 'VertilogicController@index');
    Route::get('detail/{id}','VertilogicController@show');

    Route::post('store','VertilogicController@store');
    Route::post('update/{id}','VertilogicController@store');
    Route::post('delete/{id}','VertilogicController@delete');
});