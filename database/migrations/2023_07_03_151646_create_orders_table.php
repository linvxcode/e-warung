<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('products');
            $table->string('phone');
            $table->integer('qty');
            $table->bigInteger('total_price');
            $table->enum('cancel', ['Pending', 'Canceled']);
            $table->enum('status', ['Unpaid', 'Paid']);
            $table->string('received')->nullable();
            $table->string('snap_token')->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
