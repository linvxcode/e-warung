<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $product = Product::latest()->get();
        // $imageUrl = asset('storage/' . $product->img);
        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $produk = new Product();
        // $produk->name = $request->name;
        // $produk->desc = $request->desc;
        // $produk->price = $request->price;
        // // $produk->img = $request->img;
        // $produk->save();
        $validatedData = $request->validate([
            'img' => 'nullable|file|image|max:2048',
            'name' => 'required',
            'desc' => 'required',
            'price' => 'required',
            'stok' => 'required',
            'terjual' => 'nullable',
            
        ]);
        $validatedData['img'] = $request->file('img')->store('public/image', 'public');

        // if ($request->hasFile('thumbnail')) {
        //     $imagePath = $request->file('thumbnail')->store('public/image');
        //     $validatedData['thumbnail'] = $imagePath;
        // }

        Product::create($validatedData);
        // return response()->json($produk, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $productId)
    {
        
        $product = Product::findOrFail($productId->id);
        // $products = $product->find();
        
        return Inertia::render('DetailProduct', [
            'product' => $product,
        ]);
        // return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$productId)
    {
        // $validatedData = $request->validate([
        //     // 'img' => 'nullable|file|image|max:2048',
        //     'name' => 'required',
        //     'desc' => 'required',
        //     'price' => 'required',
        // ]);


        // $productId = Product::findOrFail($productId);
        // $productId->update($validatedData);

        // // return response()->json($product);

        // $validatedData = $request->validate([
        //     'name' => 'required',
        //     'desc' => 'required',
        //     'price' => 'required',
        // ]);
    
        $product = Product::findOrFail($productId);
        $img = $product->img;
        if ($request->hasFile('img')) {
                Storage::delete('public', $product->img);
                $img = $request->file('img')->store('public/image', 'public');
        }
    
        
        $product->update([
            'name' => $request->input('name'),
            'desc' => $request->input('desc'),
            'price' => $request->input('price'),
            'stok' => $request->input('stok'),
            'img' => $img
        ]);
        // return response()->json($product);
       
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($productId)
    {
        $product = Product::findOrFail($productId);
        $product->delete();
    
        // return redirect()->back()->with('success', 'Item deleted successfully.');
    }

    public function detailProduct($productId) 
    {

        $product = Product::findOrFail($productId);
        $order = Order::all();

        // Return the product details as JSON response
        return Inertia::render('DetailProduct',[
            'product' => $product,
            'order' => $order
        ]);
        // return response()->json($product);
    }
}
