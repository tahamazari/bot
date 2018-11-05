<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//My Routes
Route::get('answers', 'Api\AnswerController@index');
Route::post('answers/store', 'Api\AnswerController@store');

//Added by auth
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

//Routes for socialite
Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');
