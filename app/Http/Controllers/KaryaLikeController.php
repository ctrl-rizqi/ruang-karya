<?php

namespace App\Http\Controllers;

use App\Models\Karya;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class KaryaLikeController extends Controller
{
    public function toggle(Request $request, Karya $karya): RedirectResponse
    {
        $result = $request->user()->likedKaryas()->toggle($karya->id);
        $liked = count($result['attached']) > 0;

        return back()->with('status', $liked ? 'karya-liked' : 'karya-unliked');
    }
}
