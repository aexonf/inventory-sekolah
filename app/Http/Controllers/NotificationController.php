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
        ]);

        $notification = Notification::where('item_id', $request->item_id)
                                     ->where('user_id', $request->user_id)
                                     ->where('status', 'borrowed')
                                     ->first();

        if (!$notification) {
            return response()->json(['message' => 'Borrow record not found'], 404);
        }

        // Update notification status
        $notification->update([
            'status' => 'returned',
            'returned_at' => now(),
        ]);

        // Update item status
        $item = Items::find($request->item_id);
        $item->status = 'available';
        $item->save();

        return response()->json(['message' => 'Item returned successfully', 'notification' => $notification], 200);
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
