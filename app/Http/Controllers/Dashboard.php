<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    public function AdminTransaction() 
    {
        return Inertia::render('Admin/AdminTransaction', [
            // 'order' => Order::latest()->get()
        ]);
    }
    public function AdminTransactionPay(Request $request, $id) 
    {
        $order = Order::findOrFail($id);

        $order->status = 'Paid';
        $order->save();

        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

    public function addProduct()
    {
        return Inertia::render('Admin/AddProduct');
    }
}
