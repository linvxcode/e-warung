<?php

namespace App\Http\Controllers;

use Midtrans\Snap;
use Inertia\Inertia;
use Midtrans\Config;
use App\Models\Order;
use App\Models\Token;
use App\Models\Product;
use Midtrans\Transaction;
use Midtrans\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function order()
    {
        $orders = Order::latest()->get();
        return response()->json($orders);
    }
    public function dataReport()
    {
        $orders = Order::select('id', 'name', 'products', 'qty', 'total_price', 'status', DB::raw('DATE(created_at) as created_date'))->get();
        return response()->json($orders);
        // $orders = Order::get();
        // return response()->json($orders);
    }

    public function initPayment(Request $request)
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = false;
        Config::$is3ds = false;

        $name = $request->input('name');
        $address = $request->input('address');
        $phone = $request->input('phone');
        $qty = $request->input('qty');
        $totalPrice = $request->input('total_price');
        $userId = $request->input('user_id');
        $products = $request->input('products');

        $order = Order::create([
            'name' => $name,
            'products' => $products,
            'address' => $address,
            'phone' => $phone,
            'qty' => $qty,
            'total_price' => $totalPrice,
            'user_id' => $userId
        ]);

        $timestamp = time();
        $orderId = $order->id . '_' . $timestamp;

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $order->total_price,
            ],
            'customer_details' => [
                'name' => $name,
                "first_name" => $name,
                "last_name" => "",
                'phone' => $phone,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);


        Token::create([
            'order_id' => $order->id,
            'snap_token' => $snapToken,
        ]);

        $order = Order::findOrFail($order->id);


        $order->snap_token = $snapToken;
        $order->save();

        return response()->json(['snapToken' => $snapToken, 'total_price' => $totalPrice, 'orderId' => $order->id,]);
    }


    public function paymentPage(Request $request, $orderId)
    {
        $userId = auth()->id();

        $order = Order::where('user_id', $userId)->latest()->get();

        $token = $request->query('token');
        $orderr = Order::find($orderId);
        $orderName = $orderr->name;
        $orderTotalPrice = $orderr->total_price;
        $orderStatus = $orderr->status;
        $orderImg = $orderr->img;
        $orderCreated_at = $orderr->created_at;

        // $totalPrice = $request->input('total_price');
        $name = $request->input('name');
        $token = Token::where('order_id', $orderId)->value('snap_token');

        // $status = $request->input('status');

        return Inertia::render('payment_page', compact('token', "order", 'name', 'orderId', 'orderCreated_at',  'orderName', 'orderTotalPrice', 'orderImg', 'orderStatus'));
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        // Update the order status
        $order->status = 'Paid';
        // $order->product_id += 1; 
        $order->save();


        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

    public function updateStatusContinue($id)
    {
        $order = Order::findOrFail($id);
        $order->cancel = 'Pending';
        $order->save();
        return response()->json(['message' => 'Order status updated successfully'], 200);
    }


    public function transaksi(Order $order)
    {
        $userId = auth()->id();

        $order = Order::where('user_id', $userId)->latest()->get();
        return Inertia::render('Transaction', [
            'order' => $order,
            // $orderId = $order->id,
            // 'snap_token' => Token::where('order_id',  $orderId)->value('snap_token')
        ]);
    }

    public function cancel(Order $order)
    {
        // Update the order status to "Canceled"
        $order->cancel = "Canceled";
        $order->save();

        // Return a response indicating success or failure
        return response()->json(['message' => 'Order canceled']);
    }

    public function accept(Request $request, Order $order)
    {
        $order->delete();


        return response()->json(['message' => 'Order accepted successfully.']);
    }

    public function received($id) 
    {
        $order = Order::findOrFail($id);
        $order->received = 'Received';
        $order->save();
        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

}
