<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Notification;
use App\Models\Items;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Show all notification.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $notifications = Notification::with('item', 'user')->get();

        $notifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'item_id' => $notification->item->id,
                'item_name' => $notification->item->name,
                'user_id' => $notification->user->id,
                'user_name' => $notification->user->username,
                'status' => $notification->status,
                'borrowed_at' => $notification->borrowed_at,
                'returned_at' => $notification->returned_at,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $notifications,
        ]);
    }

    /**
     * handle borrow item
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function borrowItem(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $item = Items::find($request->item_id);

        // Check if the item is already borrowed by the same user
    $existingNotification = Notification::where('item_id', $request->item_id)
                                        ->where('user_id', $request->user_id)
                                        ->where('status', 'borrowed')
                                        ->first();

 if ($existingNotification) {
        return response()->json(['message' => 'You have already borrowed this item'], 400);
    }

    // Check if the item is available for borrowing
    if ($item->status != 'available') {
        return response()->json(['message' => 'Item is not available for borrowing'], 400);
    }

    

        // Update item status
        $item->status = 'not_available';
        $item->save();

        // Create notification
        $notification = Notification::create([
            'item_id' => $item->id,
            'user_id' => $request->user_id,
            'status' => 'borrowed',
            'borrowed_at' => Carbon::now('Asia/Jakarta'),
        ]);

        return response()->json(['message' => 'Item borrowed successfully', 'notification' => $notification], 201);
    }

    /**
     * handle return item
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function returnItem(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:returned,borrowed', // Validasi status
        ]);

        $notification = Notification::where('item_id', $request->item_id)
                                     ->where('user_id', $request->user_id)
                                     ->whereIn('status', ['borrowed', 'returned'])
                                     ->first();

        if (!$notification) {
            return response()->json(['message' => 'Borrow record not found'], 404);
        }

        $item = Items::find($request->item_id);

        if ($request->status === 'borrowed' && $item->status !== 'available') {
            return response()->json(['message' => 'Item is not available for borrowing'], 400);
        }

        // Update notification status
        $notification->update([
            'status' => $request->status, // Menggunakan status dari request
            'returned_at' => ($request->status === 'returned') ? Carbon::now('Asia/Jakarta') : null,
        ]);

        // Update item status jika item dikembalikan dengan status 'returned'
        if ($request->status === 'returned') {
            $item->status = 'available';
        }  else if ($request->status === 'borrowed') {
            $item->status = 'not_available';
        }

        $item->save();

        return response()->json(['message' => 'Item status updated successfully', 'notification' => $notification], 200);
    }

    public function delete($id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $item = Items::find($notification->item_id);

        // Update item status to available if it's currently borrowed
        if ($notification->status === 'borrowed') {
            $item->status = 'available';
            $item->save();
        }

        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully'], 200);
    }
}
