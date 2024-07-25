<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanHistoryResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class HistoryLoanController extends Controller
{
    /**
     * Show the loan history for the currently authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Ambil ID pengguna yang sedang login
        $userId = auth()->user()->id;

        // Ambil semua notifikasi untuk pengguna yang sedang login
        $notifications = Notification::with('item') // Muat relasi 'item'
            ->where('user_id', $userId)
            ->get();

        // Format data untuk respons
        $formattedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'item_id' => $notification->item->id,
                'item_name' => $notification->item->name,
                'status' => $notification->status,
                'borrowed_at' => $notification->borrowed_at,
                'returned_at' => $notification->returned_at,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $formattedNotifications,
        ]);
    }
}
