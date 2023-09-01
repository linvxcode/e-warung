<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\OrderController;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductsController;
use App\Models\Order;

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
    // $order = Order::select('id', 'total_price')->get();
    // $order = Order::with('user')
    $userId = auth()->id(); 

    $order = Order::where('user_id', $userId)->latest()->get();
    return Inertia::render('Welcome', [
        'order' => $order,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/shop', function(){
    // $order = Order::all();
    $userId = auth()->id(); 

    $order = Order::where('user_id', $userId)->latest()->get();
    return Inertia::render('Shop',[
        'order' => $order
    ]);
})->name("shop");

Route::get('/dashboard', function () {
    $products = Product::all();

    $productData = $products->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'image' => asset('storage/' . $product->img),
        ];
        
    });
    return Inertia::render('Dashboard',[
        'product' => $productData,
        // 'order' => Order::all(),
        'user' => User::select('id', 'name')->get()
    ]);
})->middleware('admin')->name('dashboard');

Route::get('/dashboard/admin-transaction', [Dashboard::class, 'AdminTransaction'])->middleware('admin')->name('admin-transaction');
Route::get('/dashboard/add-product', [Dashboard::class, 'addProduct'])->middleware('admin')->name('addproduct');

Route::post('/orders/{orderId}/refund', [OrderController::class, 'refund'])->name('orders.refund');
Route::get('/orders', [OrderController::class, 'order']);
Route::get('/datareport', [OrderController::class, 'dataReport']);

Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
Route::post('/orders/{order}/delete', [OrderController::class, 'accept']);

Route::post('/orders/{id}/received', [OrderController:: class, 'received']);

Route::get('/payment/snap/{id}', [OrderController::class, 'snap']);
Route::get('/payment-page/{orderId}', [OrderController::class, 'paymentPage']);
Route::post('/orders/{id}', [OrderController::class, 'updateStatus']);
Route::put('/orders/{id}/continue', [OrderController::class, 'updateStatusContinue']);


Route::post('/init-payment', [OrderController::class, 'initPayment']);

Route::post('/handle-payment-notification', [OrderControllerr::class, 'handlePaymentNotification']);


Route::get('/detailproduct/{productId}', [ProductsController::class, 'detailProduct'])->name('detailproduct');

Route::post('/create-order', [OrderController::class, 'Order']);

Route::get('/products', [ProductsController::class, 'index']);
Route::post('/products', [ProductsController::class, 'store']);
Route::get('/products/{productId}', [ProductsController::class, 'show']);
Route::put('/products/{productId}', [ProductsController::class, 'update']);
Route::delete('/products/{productId}', [ProductsController::class, 'destroy']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});
Route::get("/landingpage", []);
require __DIR__.'/auth.php';
 